// ============================================================
// 우리집 가정예배 - Service Worker v0.9.6
// 오프라인 사용 + 자동 업데이트
// ============================================================

const CACHE_VERSION = 'v0.9.14';
const CACHE_NAME = `family-worship-${CACHE_VERSION}`;

// 핵심 파일만 미리 캐싱 (Pre-cache)
// 나머지는 사용자 방문 시 자동 캐싱
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json'
];

// ============================================================
// install: Service Worker 설치 + 핵심 파일 캐싱
// ============================================================
self.addEventListener('install', (event) => {
  console.log('[SW] 설치 시작');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] 핵심 파일 캐싱');
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => self.skipWaiting()) // 즉시 활성화
  );
});

// ============================================================
// activate: 옛 버전 캐시 청소
// ============================================================
self.addEventListener('activate', (event) => {
  console.log('[SW] 활성화 시작');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName.startsWith('family-worship-') && cacheName !== CACHE_NAME) {
            console.log('[SW] 옛 캐시 삭제:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim()) // 모든 탭 즉시 제어
  );
});

// ============================================================
// fetch: 네트워크 요청 처리 (Network First 전략)
// ============================================================
// 전략 설명:
// 1) 네트워크에서 먼저 가져옴 (항상 최신)
// 2) 네트워크 실패 시 캐시 사용 (오프라인 폴백)
// 3) 성공한 응답은 캐시에 저장 (다음에 빠르게)
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // POST 등 GET 외 요청은 캐싱 안 함
  if (request.method !== 'GET') return;

  // chrome-extension, blob 등 비표준 URL 제외
  if (!request.url.startsWith('http')) return;

  // 1차: jsDelivr CDN의 BGM 오디오 파일 → 캐시 우선 (Cache First)
  // 한 번 받으면 거의 안 바뀌고, 용량 크므로 캐시 우선
  if (request.url.includes('raw.githubusercontent.com') && request.url.match(/\.(mp3|m4a|ogg|wav)/i)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // 2차: 이미지 파일 → 캐시 우선 (Cache First)
  if (request.url.match(/\.(png|jpg|jpeg|gif|webp|svg)$/i)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // 3차: YouTube embed → 네트워크 우선 (캐싱 안 함)
  if (request.url.includes('youtube.com') || request.url.includes('youtube-nocookie.com')) {
    event.respondWith(fetch(request).catch(() => new Response('오프라인 상태입니다', { status: 503 })));
    return;
  }

  // 4차: 기본 — Network First (최신 우선, 오프라인 시 캐시)
  event.respondWith(networkFirst(request));
});

// ============================================================
// 전략 1: Cache First (캐시 우선)
// 이미지·오디오 같이 거의 안 바뀌는 자산용
// ============================================================
async function cacheFirst(request) {
  try {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);
    if (cached) return cached;

    const response = await fetch(request);
    if (response && response.status === 200) {
      // 캐시에 저장 (응답 복제 - 한 번만 읽을 수 있어서)
      cache.put(request, response.clone());
    }
    return response;
  } catch (e) {
    console.error('[SW] cacheFirst 실패:', request.url);
    return new Response('오프라인 상태입니다', { status: 503 });
  }
}

// ============================================================
// 전략 2: Network First (네트워크 우선)
// HTML·JS 같이 자주 바뀌는 자산용
// ============================================================
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response && response.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch (e) {
    // 네트워크 실패 시 캐시에서 폴백
    const cached = await caches.match(request);
    if (cached) {
      console.log('[SW] 오프라인 - 캐시 사용:', request.url);
      return cached;
    }
    // 캐시에도 없으면 오프라인 페이지 (HTML 요청 시)
    if (request.mode === 'navigate') {
      const cachedIndex = await caches.match('/index.html');
      if (cachedIndex) return cachedIndex;
    }
    return new Response('오프라인 상태입니다', { status: 503 });
  }
}

// ============================================================
// message: 앱에서 'SKIP_WAITING' 메시지 받으면 즉시 업데이트
// ============================================================
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

console.log('[SW] Service Worker 로드 완료 -', CACHE_VERSION);
