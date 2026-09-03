/*
 * firebase-messaging-sw.js
 *
 * THIS FILE IS THE WEB EQUIVALENT OF THE ANDROID BACKGROUND ISOLATE.
 *
 * On Android, a push that arrives while the app is killed spawns a background
 * Dart isolate and runs firebaseMessagingBackgroundHandler() — real app code,
 * with no UI. A browser has no such mechanism: when the tab is closed there is
 * no Flutter engine, no Dart VM, and no way to start one.
 *
 * What the browser has instead is a service worker: plain JavaScript, living
 * outside the Flutter bundle, that the browser itself wakes to handle a push.
 * So the logic that mobile keeps in
 * lib/core/service/background_notification_handler.dart is duplicated here in
 * JS. There is no way to share it. When the payload contract changes on the
 * server, BOTH files have to change — that is the cost of the platform, and
 * writing it down is cheaper than rediscovering it.
 *
 * IMPORTANT: this file must sit at the ROOT of the deployed site
 * (https://your-domain/firebase-messaging-sw.js). firebase_messaging registers
 * it by that exact path. Anything under web/ is copied to the root of
 * build/web, so leaving it here is correct — but if you deploy the app into a
 * SUBDIRECTORY, the worker's scope no longer covers the page and push stops
 * working silently. Deploy at a domain or subdomain root.
 *
 * ---------------------------------------------------------------------------
 * BEFORE THIS WORKS, FILL IN THE CONFIG BELOW.
 * ---------------------------------------------------------------------------
 * These are the same values you paste into
 * lib/core/platform/web_firebase_options.dart. They cannot be shared: this is
 * a JavaScript file the browser loads on its own, with no access to anything
 * compiled from Dart.
 *
 * Firebase console -> Project settings -> Your apps -> Web app -> firebaseConfig
 */

importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'PASTE_ME',
  appId: 'PASTE_ME',
  messagingSenderId: '645575499795',
  projectId: 'niya-equb',
  authDomain: 'niya-equb.firebaseapp.com',
  storageBucket: 'niya-equb.firebasestorage.app',
});

const messaging = firebase.messaging();

/*
 * Only DATA-ONLY messages reach this handler.
 *
 * If the server sends a `notification` block, the browser draws the
 * notification itself and this callback still fires — producing two
 * notifications for one message. The mobile app hits the same problem and
 * solves it by having the server send data-only payloads with title/body
 * inside `data`, which the code below reads. Keep the server doing that.
 */
messaging.onBackgroundMessage(function (payload) {
  console.log('[sw] background message', payload);

  const data = payload.data || {};
  const type = data.type;
  const groupName = data.equb_group_name;

  let title = (payload.notification && payload.notification.title) || data.title;
  let body = (payload.notification && payload.notification.body) || data.body;

  /*
   * Same fallback ladder as background_notification_handler.dart. A draw
   * notification arrives data-only with no human-readable body, so the copy is
   * assembled client-side from the type. Keeping the two in step matters: this
   * is what the user reads when the app is closed, which is most of the time.
   */
  if (!title) title = 'Niya Umrah Equb';

  if (!body) {
    if (type === 'equb_draw_started') {
      title = 'Equb Draw Started';
      body = groupName ? groupName + ' is drawing now!' : 'A new draw has started!';
    } else if (type === 'equb_draw_completed') {
      title = 'Equb Draw Completed';
      body = groupName
        ? 'A winner has been found in ' + groupName + '!'
        : 'A new winner has been announced!';
    } else if (type === 'azan' || type === 'prayer_time') {
      title = data.title || 'Prayer time';
      body = data.body || 'It is time for prayer.';
    } else {
      body = 'New update in your Equb group';
    }
  }

  return self.registration.showNotification(title, {
    body: body,
    icon: '/icons/Icon-192.png',
    badge: '/icons/Icon-192.png',
    /*
     * Collapses repeats of the same logical event rather than stacking them,
     * matching the single-id autoCancel behaviour of the Android channel. One
     * tag per group, so a draw update replaces the previous one instead of
     * burying it.
     */
    tag: data.equb_group_id ? 'niya-equb-group-' + data.equb_group_id : 'niya-equb',
    renotify: true,
    /*
     * The click handler below needs the payload, and a Notification cannot
     * carry arbitrary state any other way.
     */
    data: data,
  });
});

/*
 * Tapping the notification should land the user on the right screen, the same
 * way _navigateToEqubDetail does in Dart.
 *
 * The route is passed as a URL fragment rather than a path, because the app is
 * a single-page bundle: a path would ask the server for a document that does
 * not exist. main.dart's router reads it on start-up, and an already-open tab
 * is focused rather than duplicated.
 */
self.addEventListener('notificationclick', function (event) {
  event.notification.close();

  const data = event.notification.data || {};
  const groupId = data.equb_group_id;
  const target = groupId ? '/#/equb-detail?groupId=' + groupId : '/';

  event.waitUntil(
    clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then(function (windowClients) {
        /*
         * Focus an existing tab if there is one. Opening a second copy of a
         * financial app is disorienting and, worse, leaves the user looking at
         * a stale session in the tab they were already using.
         */
        for (let i = 0; i < windowClients.length; i++) {
          const client = windowClients[i];
          if ('focus' in client) {
            client.postMessage({ type: 'notification-click', data: data });
            return client.focus();
          }
        }
        if (clients.openWindow) return clients.openWindow(target);
      })
  );
});

/*
 * Take over immediately on update rather than waiting for every tab to close.
 * Without this, a user with the app pinned keeps the previous worker — and
 * therefore the previous notification copy — indefinitely.
 */
self.addEventListener('install', function () {
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim());
});
