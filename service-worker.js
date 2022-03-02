/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["css/index.css","8b0bf073fd8ca868fdd9aedda25d3f8f"],["index.html","a08953a912e87743d806c5060c6697a9"],["js/REACT/react-dom.development.js","88578c9e36c5e2851239c6791534426f"],["js/REACT/react-dom.production.min.js","23bfe7e99565ee8f34afd63c06f4c24b"],["js/REACT/react.development.js","a196c1033fead7b0dfc80028d2da6c92"],["js/REACT/react.development.jsm","050d12db188d842277b15742daab5a02"],["js/REACT/react.production.min.js","61699b70cf57abe63fdf5f4007d36ec1"],["js/REACT/react.production.min.jsm","885ef15c3acae04f72e04677864c1c9b"],["js/THREE/CSS2DRenderer.js","219c8fb491bf2f9468387402a1709ffc"],["js/THREE/DRACOLoader.js","49ffea2381128f352c53949d0e5428dc"],["js/THREE/GLTFLoader.js","d9c12cab898133fb203f50b786193023"],["js/THREE/OrbitControls.js","2d69a5784e9d63b67ce57d785f5a3732"],["js/THREE/SkeletonUtils.js","3dac1f5152afb8ce79af143561406c18"],["js/THREE/draco_decoder.wasm","07458752c1ac837fcee9288dac8d3c5b"],["js/THREE/draco_wasm_wrapper.js","92166c0fa3f566b2ba676c4a2e2488d7"],["js/THREE/three.js","4479fe1b28bb28eb256c4edefd229e9f"],["js/THREE/three.min.js","80c8fffdfa793893406e95e5ef9e9ef6"],["js/THREE/threex.atmospherematerial.js","58c1fbdcd0a9cbe3a3b527351cedff5e"],["js/THREE/threex.dilategeometry.js","53d9468807d17c361058bb478410f7a8"],["js/THREE/threex.geometricglowmesh.js","2fd03f07b725293c2946db14f4ca72cc"],["js/anim.js","bb29b540453df92a9dd8a9fed4741138"],["js/index.js","9bd4c12c3c7104f556c75cb7aa8a42dd"],["js/init.js","5d79bd05f426beca8f0a8a5ce15ea52a"],["manifest.json","0d1f98a52a7af81e63005342b5dc339e"],["package-lock.json","ae3def8a88f40942a433008d25804478"],["package.json","b2b8bd7eb540fbace17e821decd4e6cc"],["res/FILES/RGB LEDs.glb","bef8232989d4e9a0c795975968d5eebc"],["res/FILES/top4x4.glb","40e4a57a2c417a1c63b9b4f80fca1708"],["res/GLB/RGB LEDs.glb","922e1554e770a20960b7f8fcd50d8c7d"],["res/GLB/RGB LEDs2.glb","bef8232989d4e9a0c795975968d5eebc"],["res/GLB/top4x4.glb","40e4a57a2c417a1c63b9b4f80fca1708"],["res/icon.webp","12ee2e84d11778ce19f1d3358f71978a"],["res/img/ComponentWebp/Buzzer.webp","b1d5af1ec5ff527bdf4e55964e92e991"],["res/img/ComponentWebp/DC_Motor.webp","a709aad955f58c49b8dc871e04e84843"],["res/img/ComponentWebp/IR Detector Sensor.webp","b0ec2271b632f9327dd76e91d8101a27"],["res/img/ComponentWebp/IR Transceiver & Remote.webp","6f93b7cc8e744c5bd824df01c7aba848"],["res/img/ComponentWebp/Joystick.webp","08c1528e82508ad34adc795b956158fd"],["res/img/ComponentWebp/Keys.webp","bc6d41048b318a58332aa255ff816599"],["res/img/ComponentWebp/LED_Display.webp","7ac42a52b6613e29ad059ddefd5715e4"],["res/img/ComponentWebp/Light_Sensor.webp","b35ca07384aa585055a4397620bd105b"],["res/img/ComponentWebp/Micro-Controller.webp","6f6d451c307a694744b29e125f5265af"],["res/img/ComponentWebp/RFID.webp","6f999d5a229fc22f83f3add935523890"],["res/img/ComponentWebp/RGB_LEDs.webp","66c288daa2e8cd0c2d20d358638ac885"],["res/img/ComponentWebp/RTC.webp","fe1870f6ddc85044715f522e31e968d6"],["res/img/ComponentWebp/Rotary_Knob.webp","afdc60b5b3722032ab40b80f35f0aece"],["res/img/ComponentWebp/Soil_Moisture_Sensor.webp","312c31020d0e7e2652129562d21491d9"],["res/img/ComponentWebp/Sound_Sensor.webp","937893d93dea33e7d8fd55fed6bc3628"],["res/img/ComponentWebp/Switch.webp","bb9599c46e8a83b7ef6398618344baae"],["res/img/ComponentWebp/Temperature_&_Humidity_Sensor.webp","e6dfedff969c7c8621b9fda17d4e0485"],["res/img/ComponentWebp/Ultrasonic_Sensor.webp","67263bbf121b3e6925087833b5a72f2c"],["res/img/ComponentWebp/WiFi_Module.webp","e129a710b740e7f5032af21e07a201f8"],["res/img/Environments.webp","12ee2e84d11778ce19f1d3358f71978a"],["res/img/Explore.webp","12ee2e84d11778ce19f1d3358f71978a"],["res/img/MiniProjects.webp","12ee2e84d11778ce19f1d3358f71978a"],["res/img/Simulator.webp","12ee2e84d11778ce19f1d3358f71978a"]];
var cacheName = 'sw-precache-v3-sw-precache-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







