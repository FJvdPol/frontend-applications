/*
=== Start source ===
Register serviceworker
from Matt Gaunt
via https://developers.google.com/web/fundamentals/primers/service-workers/
*/
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
    .register('/sw.js')
    .then((registration) => {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope)
    }.catch(err) => {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err)
    })
  })
}
/* === End source === */
