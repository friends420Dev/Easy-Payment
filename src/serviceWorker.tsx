// Define the configuration interface for the service worker registration callbacks.
// These are common callbacks used in service worker setups, especially with tools like Create React App.
interface Config {
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
}
const PUBLIC_URL = `https://backend.payment-backend88.com`
// Determines if the current environment is localhost.
// This is used to apply specific service worker checks for local development.
const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 are considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

/**
 * Registers a service worker for production environments.
 * It checks for service worker support and registers it if conditions are met.
 *
 * @param config Optional configuration object with `onUpdate` and `onSuccess` callbacks.
 */
export function register(config?: Config): void {
  // Only register the service worker in production mode and if the browser supports service workers.
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // The URL constructor is available in all browsers that support SW.
    // PUBLIC_URL is typically an environment variable pointing to the base URL of your app.
    const publicUrl = new URL(PUBLIC_URL as string, window.location.href);

    // Our service worker won't work if PUBLIC_URL is on a different origin
    // from what our page is served on. This might happen if a CDN is used to
    // serve assets.
    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    // Add a 'load' event listener to register the service worker once the page is fully loaded.
    window.addEventListener('load', () => {
      // Construct the full URL to the service worker script.
      // `import.meta.env.PUBLIC_URL` is used here, assuming it's correctly configured in Vite.
      const swUrl: string = `${(PUBLIC_URL || '') as string}/service-worker.js`;

      if (isLocalhost) {
        // This is running on localhost. Let's check if a service worker still exists or not.
        checkValidServiceWorker(swUrl, config);

        // Add some additional logging for localhost, pointing developers to the
        // service worker/PWA documentation.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA'
          );
        });
      } else {
        // Not localhost. Just register the service worker.
        registerValidSW(swUrl, config);
      }
    });
  }
}

/**
 * Registers the service worker.
 * This function handles the actual registration logic and callbacks.
 *
 * @param swUrl The URL of the service worker script.
 * @param config Optional configuration object.
 */
function registerValidSW(swUrl: string, config?: Config): void {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration: ServiceWorkerRegistration) => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // At this point, the updated precached content has been fetched,
              // but the previous service worker will still serve the older
              // content until all client tabs are closed.
              console.log(
                'New content is available and will be used when all ' +
                  'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
              );

              // Execute the onUpdate callback if provided.
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a "Content is cached for offline use." message.
              console.log('Content is cached for offline use.');

              // Execute the onSuccess callback if provided.
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch((error: Error) => {
      console.error('Error during service worker registration:', error);
    });
}

/**
 * Checks if a valid service worker is already present.
 * This is primarily for development to help clear out old service workers.
 *
 * @param swUrl The URL of the service worker script.
 * @param config Optional configuration object.
 */
function checkValidServiceWorker(swUrl: string, config?: Config): void {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' },
  })
    .then((response: Response) => {
      // Ensure service worker exists, and that we really are getting a JS file.
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then((registration: ServiceWorkerRegistration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log('No internet connection found. App is running in offline mode.');
    });
}
export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}