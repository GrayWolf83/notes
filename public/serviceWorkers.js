const staticCacheName = 'static-site-v1'
const dynamicCacheName = 'dynamic-site-v1'

const cacheExceptions = [
	'identitytoolkit.googleapis.com/v1',
	'firebasedatabase.app',
	'chrome-extension',
]

const ASSETS = ['/', '/index.html']

self.addEventListener('install', async (e) => {
	const cache = await caches.open(staticCacheName)
	await cache.addAll(ASSETS)
})

self.addEventListener('activate', async (event) => {
	const cachesKeysArr = await caches.keys()

	await Promise.all(
		cachesKeysArr
			.filter(
				(key) => key !== staticCacheName && key !== dynamicCacheName,
			)
			.map((key) => caches.delete(key)),
	)
})

self.addEventListener('fetch', async (event) => {
	const hasException = cacheExceptions.some((item) =>
		event.request.url.includes(item),
	)

	if (hasException) {
		event.respondWith(fetch(event.request))
	} else {
		event.respondWith(cacheFirst(event.request))
	}
})

async function cacheFirst(request) {
	const cached = await caches.match(request)
	try {
		return (
			cached ??
			(await fetch(request).then((response) => {
				return networkFirst(request)
			}))
		)
	} catch (error) {
		return networkFirst(request)
	}
}

async function networkFirst(request) {
	const cache = await caches.open(dynamicCacheName)
	try {
		const response = await fetch(request)
		await cache.put(request, response.clone())
		return response
	} catch (error) {
		const cached = await cache.match(request)
		return cached ?? caches.match('/offline.html')
	}
}
