# 🙏 우리집 가정예배 앱

말씀의지혜 채널과 연동된 가족 가정예배 앱입니다.

## 🚀 실행 방법 (2줄)

터미널에서:

```bash
cd family-worship-app
npm install
npm run dev
```

그리고 Chrome에서 접속:

```
http://localhost:5173
```

## 📁 구성

- React + Vite + Tailwind CSS
- 6개 시간대별 BGM 플레이어 (GitHub + jsDelivr CDN)
- 6개 재생목록 (말씀의지혜 YouTube)
- 8편 어린이 성경 이야기
- 가족 기도 노트 + 즐겨찾기
- localStorage로 데이터 영구 저장

## 🎵 BGM 저장소

MP3 파일은 https://github.com/junho908-svg/family-worship-bgm 에서 관리합니다.
새 곡 추가하려면:
1. 해당 GitHub 저장소에 MP3 업로드
2. `src/App.jsx`의 `BGM_CATEGORIES` 배열에 항목 추가

## 🌐 배포 (Vercel)

```bash
npm install -g vercel
vercel
```

## 🙏 대표님 가족과 모든 가정에 주님의 은혜가 함께하시길
