// Ancienne adresse : ce service worker efface le cache hors ligne de l'ancienne page puis se retire,
// pour que les téléphones suivent la redirection vers e-chicane.lsa-pf.org.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.map(k => caches.delete(k))))
    .then(() => self.registration.unregister())
    .then(() => self.clients.matchAll()).then(cs => cs.forEach(c => c.navigate(c.url))));
});
