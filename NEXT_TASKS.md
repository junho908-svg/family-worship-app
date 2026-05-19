# v0.9.16 작업 예정

## iOS PWA 스플래시 (apple-touch-startup-image)
- iOS는 manifest background_color 미적용
- apple-touch-startup-image 별도 생성 필요
- 다양한 디바이스 해상도별 이미지 세트 (iPhone 14 Pro Max, iPhone 14, iPhone SE 등)

## 잔존 깜빡임 최적화 (선택)
- v0.9.15 push 후 모바일 PWA 재설치 시: 새 manifest 적용으로 흰 배경 깜빡임 해결됨
- 단, PWA를 첫 설치하는 신규 사용자는 처음부터 정상
- 베타 테스터 안내 메시지: "더 부드러운 첫 화면을 위해 홈 화면 아이콘 재설치 권장"

## 로딩 → 홈 페이드 아웃 (선택, 우선순위 낮음)
- 현재: loading=false 시 SplashScreen 즉시 컷
- 개선안: autoHide=false 모드에서도 데이터 로드 완료 감지하면 300ms 페이드 아웃
- 실제 사용자 경험상 이미 충분히 자연스러워서 우선순위 낮음

---

## v0.9.15 완료 항목 (참고)
- ✅ A안: 로딩 화면을 SplashScreen으로 통합 (완료 커밋 f7587cc)
  - SplashScreen.jsx에 autoHide prop 추가 (기본값 true, 기존 동작 호환)
  - Promise.all minDelay 1초 보장 패턴 적용
  - BottomNav / MiniPlayer / PwaInstallBanner / PwaInstallModal → !loading 블록으로 이동
  - 모바일 실측 통과 (PWA 재설치 후 정상 작동 확인)

## v0.9.14 완료 항목 (참고)
- ✅ 로고 클릭 시 SplashScreen 표시 (헤더 button 변환, 760c11d)
- ✅ PWA 로딩 배경색 #FFF4D2 통일 (manifest / index.css / theme-color, 07538ac)
