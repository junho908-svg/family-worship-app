import { useState, useEffect, useRef } from 'react';
import {
  Home, BookOpen, Heart, Sparkles, Users, Play, Check, Plus, X, Star,
  ChevronRight, ChevronLeft, Award, Flame, Music, Clock, Send,
  Smile, MessageCircle, Gift, Feather, Sunrise,
  Pause, SkipForward, SkipBack, Volume2, Timer, Music2
} from 'lucide-react';

// ============ 데이터 ============
const todayVerses = [
  { ref: '빌립보서 4:13', text: '내게 능력 주시는 자 안에서 내가 모든 것을 할 수 있느니라', theme: '용기' },
  { ref: '시편 23:1', text: '여호와는 나의 목자시니 내게 부족함이 없으리로다', theme: '평안' },
  { ref: '잠언 3:5-6', text: '네 마음을 다하여 여호와를 신뢰하고 네 명철을 의지하지 말라', theme: '신뢰' },
  { ref: '요한복음 3:16', text: '하나님이 세상을 이처럼 사랑하사 독생자를 주셨으니', theme: '사랑' },
  { ref: '마태복음 6:33', text: '너희는 먼저 그의 나라와 그의 의를 구하라', theme: '우선순위' },
  { ref: '이사야 41:10', text: '두려워하지 말라 내가 너와 함께 함이라', theme: '위로' },
  { ref: '시편 119:105', text: '주의 말씀은 내 발에 등이요 내 길에 빛이니이다', theme: '인도' },
];

const bibleStories = [
  {
    id: 1, title: '다윗과 골리앗', emoji: '🪨', theme: '용기', color: '#E9A94D',
    lesson: '하나님과 함께라면, 아무리 작아도 결코 작지 않아요.',
    story: `사울 왕의 군인들이 덜덜 떨고 있었어요.
3미터가 넘는 거인 골리앗이 고래고래 소리쳤거든요.
"나와 싸워볼 사람 있으면 나와봐라!"

그때, 양을 치던 꼬마 다윗이 앞으로 걸어 나왔어요.
"제가 가서 싸울게요!"

골리앗은 다윗을 보고 크게 웃었어요. 하지만 다윗은 웃지 않았어요.
"너는 칼과 창으로 오지만, 나는 살아 계신 하나님의 이름으로 너에게 간다!"

다윗은 강가에서 고른 매끈한 돌 하나를 물맷돌에 넣고 휙— 돌렸어요.
돌은 골리앗의 이마에 정확히 맞았고, 거대한 몸이 쿵! 하고 쓰러졌어요.

그날 모두가 알게 되었어요.
하나님과 함께하는 사람은, 아무리 작아도 결코 작지 않다는 것을.`,
    verse: { ref: '사무엘상 17:47', text: '전쟁은 여호와께 속한 것인즉 여호와께서 너희를 우리 손에 넘기시리라' }
  },
  {
    id: 2, title: '노아의 방주', emoji: '🌈', theme: '순종', color: '#7BA098',
    lesson: '보이지 않아도, 하나님 말씀은 반드시 이루어져요.',
    story: `하나님께서 노아에게 말씀하셨어요.
"큰 배를 지으렴. 아주 많은 비가 올 거란다."

그런데 그때는 비가 한 방울도 내린 적이 없었어요.
사람들은 노아를 보고 깔깔 웃었어요.
"배 짓는 아저씨 좀 봐! 여긴 바다도 없는데!"

그래도 노아는 하나님 말씀을 믿고,
100년이 넘도록 망치질을 멈추지 않았어요. 쿵, 쿵, 쿵.

드디어 방주가 완성되자, 짐승들이 둘씩 짝을 지어 들어왔어요.
사자도, 토끼도, 기린도, 참새도.

그리고 정말로, 하늘에서 비가 쏟아지기 시작했답니다.

비가 그친 뒤 하나님은 하늘에 예쁜 무지개를 그려 주셨어요.
"약속할게. 다시는 물로 세상을 심판하지 않을게."`,
    verse: { ref: '창세기 6:22', text: '노아가 그와 같이 하여 하나님이 자기에게 명하신 대로 다 준행하였더라' }
  },
  {
    id: 3, title: '다니엘과 사자굴', emoji: '🦁', theme: '믿음', color: '#D4756B',
    lesson: '기도를 멈추지 않는 사람 곁에, 하나님이 함께하세요.',
    story: `다니엘은 매일 세 번, 창문을 열고 하나님께 기도했어요.
아침에도, 점심에도, 저녁에도.

어느 날 나쁜 사람들이 왕을 꾀어 새 법을 만들었어요.
"한 달 동안 왕 말고 다른 누구에게도 기도하면 안 된다! 어기면 사자굴에 던진다!"

하지만 다니엘은 창문을 열고, 똑같이 무릎을 꿇었어요.
"하나님, 오늘도 감사합니다..."

결국 다니엘은 사자굴에 던져졌어요.
굴 안에는 사흘이나 굶은 사자들이 어흥! 어흥! 울부짖고 있었어요.

그런데 놀라운 일이 벌어졌어요.
사자들이 마치 강아지처럼 조용히 엎드린 거예요.
하나님이 천사를 보내 사자들의 입을 막아주셨거든요.

다음 날 아침, 왕이 달려가 외쳤어요.
"다니엘! 살아 있느냐?"
"네, 하나님이 지켜주셨어요!"`,
    verse: { ref: '다니엘 6:22', text: '나의 하나님이 이미 그의 천사를 보내어 사자들의 입을 봉하셨으므로 그들이 나를 상해하지 아니하였나이다' }
  },
  {
    id: 4, title: '요셉의 꿈', emoji: '✨', theme: '용서', color: '#9B7EBD',
    lesson: '용서는, 제일 마음이 큰 사람만 할 수 있는 일이에요.',
    story: `요셉은 하나님이 주신 특별한 꿈을 꾸었어요.
"언젠가 너는 큰 사람이 될 거야."

그런데 형들은 그 꿈 이야기를 듣고 요셉을 시기했어요.
질투심에 사로잡힌 형들은 요셉을 저 멀리 이집트로 팔아버렸지요.

요셉은 얼마나 억울했을까요.
감옥에도 갇혔어요. 그래도 어디에서든 하나님만 붙들었어요.

시간이 흘러, 놀랍게도 요셉은 이집트의 총리가 되었어요!
그때 큰 가뭄이 들어, 형들이 굶주린 채 곡식을 사러 이집트로 왔어요.

형들은 총리가 된 요셉을 알아보지 못했지만,
요셉은 한눈에 형들을 알아봤어요.

요셉은 울면서 형들을 끌어안았어요.
"형님들, 저예요. 요셉이에요.
미워하지 않아요. 하나님이 우리 모두를 살리시려고,
저를 먼저 이곳에 보내신 거예요."`,
    verse: { ref: '창세기 50:20', text: '당신들은 나를 해하려 하였으나 하나님은 그것을 선으로 바꾸사 오늘과 같이 많은 백성의 생명을 구원하게 하시려 하셨나니' }
  },
  {
    id: 5, title: '모세와 홍해', emoji: '🌊', theme: '능력', color: '#5B9AA0',
    lesson: '하나님이 길을 여시면, 길이 없던 곳에도 길이 생겨요.',
    story: `400년 동안 노예로 살던 이스라엘 백성이 드디어 이집트를 떠났어요.
그런데 얼마 못 가 큰일이 났어요!

앞에는 끝없는 홍해 바다,
뒤에는 파라오의 군대가 "두두두두!" 먼지를 날리며 쫓아오고 있었어요.

사람들이 모세에게 소리쳤어요.
"모세! 우리 다 죽게 생겼어요!"

모세는 조용히 말했어요.
"두려워하지 마세요. 여호와께서 우리를 위해 싸우실 거예요."

모세가 하나님 말씀대로 지팡이를 바다 위로 높이 들자—
쏴아아아!
바닷물이 좌우로 쩍 갈라지며, 한가운데에 마른 길이 생겼어요!

이스라엘 백성은 환호하며 마른 땅 위를 걸어 홍해를 건넜답니다.
건너편에 도착해 뒤를 돌아보니,
갈라졌던 바다는 다시 합쳐져 있었어요.`,
    verse: { ref: '출애굽기 14:14', text: '여호와께서 너희를 위하여 싸우시리니 너희는 가만히 있을지니라' }
  },
  {
    id: 6, title: '아기 예수님', emoji: '⭐', theme: '사랑', color: '#E8A87C',
    lesson: '예수님은 너와 나를 사랑하셔서, 하늘에서 내려오셨어요.',
    story: `그날 밤, 하늘에 유난히 큰 별 하나가 반짝이고 있었어요.
별빛 아래 작은 마을 베들레헴,
숙소가 없어 마구간 한쪽에서,
특별한 아기가 태어났어요.

이름은 예수.

하늘의 하나님이 너무너무 우리를 사랑하셔서,
직접 작은 아기의 모습으로 이 땅에 오신 거예요.

들판의 양치기들이 제일 먼저 달려왔어요.
천사들이 하늘에 가득 나타나 기쁜 소식을 전해주었거든요.
"오늘 너희를 구원할 분이 나셨다!"

멀리 동방에서는 박사들이 별을 따라 먼 길을 걸어와,
황금과 유향과 몰약을 선물로 드렸어요.

아기 예수님은 구유에 누워 새근새근 주무셨지만,
이 작은 아기가 바로, 온 우주를 바꾸실 분이셨어요.
바로 너 한 사람을 구원하시려고요.`,
    verse: { ref: '요한복음 3:16', text: '하나님이 세상을 이처럼 사랑하사 독생자를 주셨으니 이는 그를 믿는 자마다 멸망하지 않고 영생을 얻게 하려 하심이라' }
  },
  {
    id: 7, title: '선한 사마리아인', emoji: '💝', theme: '이웃', color: '#A8C686',
    lesson: '사랑은 말이 아니라, 발걸음으로 하는 거예요.',
    story: `예수님이 이야기 하나를 들려주셨어요.

어떤 사람이 길을 가다가 강도를 만났어요.
강도들은 그 사람을 때리고, 돈을 빼앗고,
길가에 쓰러뜨린 채 가버렸어요.

제사장이 그 길을 지나갔어요.
"에고, 난 지금 바빠!"
못 본 척 피해 갔어요.

레위인도 지나갔어요.
"휴, 나랑 상관없는 일이야."
역시 모른 척 지나갔어요.

그때, 모두가 싫어하던 사마리아 사람이 지나갔어요.
그는 쓰러진 사람을 보자 마음이 찢어지게 아팠어요.

상처에 기름을 바르고, 깨끗한 천으로 싸매고,
자기 나귀에 조심조심 태워 여관으로 데려갔어요.
여관 주인에게 돈까지 주며 "잘 돌봐주세요" 부탁했지요.

예수님이 물으셨어요.
"자, 누가 진짜 이웃이니?"`,
    verse: { ref: '누가복음 10:27', text: '네 마음을 다하며 목숨을 다하며 힘을 다하며 뜻을 다하여 주 너의 하나님을 사랑하고 또한 네 이웃을 네 자신 같이 사랑하라' }
  },
  {
    id: 8, title: '오병이어', emoji: '🍞', theme: '나눔', color: '#F4A261',
    lesson: '작은 것이라도 주님 손에 드리면, 큰 기적이 됩니다.',
    story: `온종일 예수님 말씀을 들으려고 사람들이 산으로 모여들었어요.
어느덧 해가 저물고,
배에서 꼬르륵— 꼬르륵— 소리가 났어요.

사람이 무려 5천 명이나 되는데, 먹을 게 하나도 없었어요.
제자들은 걱정이 가득했어요.

그때 한 꼬마가 쭈뼛쭈뼛 앞으로 나왔어요.
"저... 제 도시락이라도 괜찮으시면..."

보리 떡 다섯 개와 작은 물고기 두 마리.
5천 명에게는 너무너무 작은 양이었지만,
예수님은 그 작은 도시락을 받으시고 하늘을 우러러 감사기도를 드리셨어요.

그리고 떡을 떼어 나누어 주기 시작하셨는데—
어, 어?
먹고, 먹어도, 계속 나오는 거예요!

그날 5천 명이 모두 배부르게 먹고도,
남은 조각이 열두 광주리나 되었답니다.`,
    verse: { ref: '요한복음 6:11', text: '예수께서 떡을 가져 축사하신 후에 앉아 있는 자들에게 나눠 주시고 물고기도 그렇게 그들의 원대로 주시니라' }
  },
];

const dailyQuiz = [
  { q: '다윗이 골리앗을 이길 때 사용한 것은?', options: ['칼', '물맷돌', '창', '활'], answer: 1 },
  { q: '노아가 지은 큰 배의 이름은?', options: ['방주', '나룻배', '범선', '요트'], answer: 0 },
  { q: '예수님이 태어나신 곳은?', options: ['예루살렘', '나사렛', '베들레헴', '가버나움'], answer: 2 },
  { q: '다니엘이 들어간 굴에 있던 동물은?', options: ['호랑이', '늑대', '사자', '곰'], answer: 2 },
];

const worshipSteps = {
  short: [
    { icon: '🕊️', title: '마음 모으기', duration: '1분', desc: '조용히 눈을 감고 하나님 앞에 나아가요.', tip: '가족이 손을 맞잡아 보세요.' },
    { icon: '📖', title: '말씀 읽기', duration: '2분', desc: '오늘의 말씀을 함께 천천히 읽어요.', tip: '아이가 있다면 한 구절씩 번갈아 읽어요.' },
    { icon: '💬', title: '짧은 나눔', duration: '1분', desc: '말씀에서 느낀 점을 한마디씩 나눠요.', tip: '짧아도 괜찮아요. 한 문장이면 충분해요.' },
    { icon: '🙏', title: '기도', duration: '1분', desc: '한 사람씩 돌아가며 짧게 기도해요.', tip: '아이부터 시작하면 좋아요.' },
  ],
  medium: [
    { icon: '🎵', title: '찬양', duration: '2분', desc: '함께 아는 찬양 한 곡을 불러요.', tip: '찬양을 고르지 못했다면 말씀의지혜 채널을 틀어요.' },
    { icon: '🕊️', title: '마음 모으기', duration: '1분', desc: '조용히 기도하며 마음을 준비해요.', tip: '오늘 감사한 일을 한 가지씩 떠올려 보세요.' },
    { icon: '📖', title: '말씀 읽기', duration: '2분', desc: '오늘의 말씀을 함께 읽어요.', tip: '읽고 나서 잠시 침묵 속에 머물러도 좋아요.' },
    { icon: '💡', title: '나눔', duration: '3분', desc: '말씀 속에서 마음에 와닿은 구절과 이유를 나눠요.', tip: '평가하지 말고 들어주기만 해요.' },
    { icon: '🙏', title: '기도', duration: '2분', desc: '가족 기도 제목을 나누고 함께 기도해요.', tip: '한 사람씩 돌아가며 기도해요.' },
  ],
  long: [
    { icon: '🎵', title: '찬양', duration: '3분', desc: '2~3절까지 마음을 담아 찬양해요.', tip: '아이들이 좋아하는 찬양도 섞어 주세요.' },
    { icon: '🕊️', title: '감사와 회개', duration: '2분', desc: '지난 하루 감사와 회개할 것을 나눠요.', tip: '솔직하게 마음을 여는 시간이에요.' },
    { icon: '📖', title: '말씀 읽기', duration: '3분', desc: '오늘의 본문을 천천히 두 번 읽어요.', tip: '두 번째는 특별히 마음에 닿는 구절에 집중해요.' },
    { icon: '💡', title: '묵상과 나눔', duration: '4분', desc: '말씀이 오늘 우리 삶에 어떻게 적용될지 나눠요.', tip: '아이에게도 꼭 물어봐 주세요.' },
    { icon: '🙏', title: '중보 기도', duration: '3분', desc: '가족, 교회, 이웃을 위해 기도해요.', tip: '기도 제목을 미리 적어두면 좋아요.' },
  ]
};

const familyQuestions = [
  '오늘 하루 가장 감사한 일 한 가지는?',
  '오늘 말씀에서 가장 마음에 남는 단어는?',
  '이번 주 하나님께 여쭤보고 싶은 것은?',
  '우리 가족이 함께 기도하고 싶은 것은?',
  '이 말씀을 내일 어떻게 살아낼 수 있을까요?',
  '오늘 하루 내가 누군가에게 전하고 싶은 사랑은?',
];

const kidsQuestions = [
  '오늘 예수님께 칭찬받을 만한 일은 뭐였어?',
  '오늘 누구를 위해 기도해 주고 싶어?',
  '말씀에서 나온 사람 중에 누가 제일 멋있어?',
  '하나님이 오늘 나에게 주신 선물이 있다면?',
];

const praiseSongs = [
  '주 안에 있는 나에게',
  '예수님이 좋은 걸',
  '나는 주의 친구',
  '주님 말씀하시면',
  '날 구원하신 주 감사',
  '은혜 아니면',
];

// ============ BGM 라이브러리 ============
// 말씀의지혜 찬양쉼터 오리지널 BGM 15곡 · GitHub + jsDelivr CDN
// jsDelivr는 GitHub 저장소를 오디오 스트리밍에 최적화된 CDN으로 자동 서빙
const GITHUB_USER = 'junho908-svg';
const GITHUB_REPO = 'family-worship-bgm';
const GITHUB_BRANCH = 'main';
const toGitHubRawUrl = (filename) =>
  `https://cdn.jsdelivr.net/gh/${GITHUB_USER}/${GITHUB_REPO}@${GITHUB_BRANCH}/${encodeURIComponent(filename)}`;

// 말씀의지혜 마스코트 (로고몽)
// ?v=숫자를 바꾸면 캐시를 무시하고 최신 이미지를 가져옵니다
const LOGOMONG_URL = `https://cdn.jsdelivr.net/gh/${GITHUB_USER}/${GITHUB_REPO}@${GITHUB_BRANCH}/logomong.png?v=3`;

// 앱 버전 (베타 단계 - 가족·교회 피드백을 받으며 발전 중)
const APP_VERSION = '0.9.1';
const APP_STAGE = 'BETA';
const APP_RELEASE_DATE = '2026.04.21';

const BGM_CATEGORIES = [
  {
    id: 'dawn',
    name: '새벽기도',
    icon: '🌅',
    color: '#9B7EBD',
    desc: '새벽 4~6시, 하나님과의 고요한 만남',
    timeRange: [4, 7],
    tracks: [
      { id: 'dawn-1', title: '주님 내가 여기 있사오니', filename: '주님내가여기있사오니.mp3', duration: 240, url: toGitHubRawUrl('주님내가여기있사오니.mp3') },
      { id: 'dawn-2', title: '주님의 시선', filename: '주님의시선.mp3', duration: 240, url: toGitHubRawUrl('주님의시선.mp3') },
      { id: 'dawn-3', title: '공감하시네', filename: '공감하시네.mp3', duration: 240, url: toGitHubRawUrl('공감하시네.mp3') },
    ]
  },
  {
    id: 'morning',
    name: '아침 묵상',
    icon: '☀️',
    color: '#E9A94D',
    desc: '하루를 여는 감사와 찬양',
    timeRange: [7, 11],
    tracks: [
      { id: 'morning-1', title: '나는 오늘을 살리', filename: '나는오늘을살리.mp3', duration: 240, url: toGitHubRawUrl('나는오늘을살리.mp3') },
      { id: 'morning-2', title: '삶의 작은 일에도', filename: '삶의작은일에도.mp3', duration: 240, url: toGitHubRawUrl('삶의작은일에도.mp3') },
      { id: 'morning-3', title: '하나님의 은혜', filename: '하나님의은혜.mp3', duration: 240, url: toGitHubRawUrl('하나님의은혜.mp3') },
    ]
  },
  {
    id: 'prayer',
    name: '기도 찬양',
    icon: '🙏',
    color: '#D4756B',
    desc: '간절한 마음을 담아 드리는 기도',
    timeRange: [11, 14],
    tracks: [
      { id: 'prayer-1', title: '내 모습 이대로', filename: '내모습이대로.mp3', duration: 240, url: toGitHubRawUrl('내모습이대로.mp3') },
      { id: 'prayer-2', title: '요게벳의 노래', filename: '요게벳의 노래.mp3', duration: 240, url: toGitHubRawUrl('요게벳의 노래.mp3') },
    ]
  },
  {
    id: 'meditation',
    name: '말씀 묵상',
    icon: '📖',
    color: '#7BA098',
    desc: '말씀이 내 마음에 새겨지는 시간',
    timeRange: [14, 18],
    tracks: [
      { id: 'meditation-1', title: '하나님 아버지의 마음', filename: '하나님아버지의마음.mp3', duration: 240, url: toGitHubRawUrl('하나님아버지의마음.mp3') },
      { id: 'meditation-2', title: '그런 사랑', filename: '그런사랑.mp3', duration: 240, url: toGitHubRawUrl('그런사랑.mp3') },
    ]
  },
  {
    id: 'evening',
    name: '저녁 예배',
    icon: '🌙',
    color: '#5B9AA0',
    desc: '하루를 돌아보며 드리는 감사',
    timeRange: [18, 22],
    tracks: [
      { id: 'evening-1', title: '입례', filename: '입례.mp3', duration: 180, url: toGitHubRawUrl('입례.mp3') },
      { id: 'evening-2', title: '예배합니다', filename: '예배합니다.mp3', duration: 240, url: toGitHubRawUrl('예배합니다.mp3') },
      { id: 'evening-3', title: '십자가 그 사랑', filename: '십자가그사랑.mp3', duration: 240, url: toGitHubRawUrl('십자가그사랑.mp3') },
    ]
  },
  {
    id: 'sleep',
    name: '잠들기 전',
    icon: '😴',
    color: '#A8C686',
    desc: '평안 중에 주님의 품으로',
    timeRange: [22, 4],
    tracks: [
      { id: 'sleep-1', title: '밤이나 낮이나', filename: '밤이나낮이나.mp3', duration: 240, url: toGitHubRawUrl('밤이나낮이나.mp3') },
      { id: 'sleep-2', title: '은혜', filename: '은혜.mp3', duration: 240, url: toGitHubRawUrl('은혜.mp3') },
    ]
  },
];

const getRecommendedCategory = () => {
  const hour = new Date().getHours();
  return BGM_CATEGORIES.find(c => {
    const [start, end] = c.timeRange;
    if (start < end) return hour >= start && hour < end;
    return hour >= start || hour < end; // 자정을 넘는 경우 (sleep)
  }) || BGM_CATEGORIES[1];
};

const getWelcomeMessage = () => {
  const hour = new Date().getHours();
  if (hour >= 4 && hour < 7) return {
    greeting: '거룩한 새벽입니다',
    subtext: '주님과의 고요한 만남을\n지금 시작해요',
    ambient: '별빛이 머무는 시간'
  };
  if (hour >= 7 && hour < 11) return {
    greeting: '은혜로운 아침이에요',
    subtext: '오늘도 주님과 동행하는\n귀한 하루의 시작',
    ambient: '햇살이 스며드는 시간'
  };
  if (hour >= 11 && hour < 14) return {
    greeting: '평안한 낮시간이에요',
    subtext: '하루의 중심에서\n주님을 기억하는 순간',
    ambient: '은혜가 가득한 시간'
  };
  if (hour >= 14 && hour < 18) return {
    greeting: '말씀이 깊어지는 오후예요',
    subtext: '마음에 새겨지는\n고요한 묵상의 시간',
    ambient: '금빛이 따뜻한 시간'
  };
  if (hour >= 18 && hour < 22) return {
    greeting: '따뜻한 저녁시간이에요',
    subtext: '하루를 돌아보며\n감사를 드리는 시간',
    ambient: '가족이 모이는 시간'
  };
  return {
    greeting: '평온한 밤이에요',
    subtext: '주님 품 안에서\n하루를 맡기는 시간',
    ambient: '달빛이 비추는 시간'
  };
};

const isValidUrl = (url) => url && (url.startsWith('http') || url.startsWith('blob:'));

// ============ 말씀의지혜 YouTube 연동 ============
// 각 재생목록의 id 값만 YouTube Studio에서 복사해 교체하면 됩니다.
// 찾는 법: Studio → 콘텐츠 → 재생목록 → 제목 클릭 → "YouTube에서 보기" → URL의 ?list= 뒤 문자열
const CHANNEL_ID = 'UCXmdxQf-6a7u2K3RefaPmww';
const PLAYLISTS = [
  {
    id: 'PLYJ866XA7ij3lxxziA3l5QE1hkXg5bpr9',
    title: '매일 10분 말씀 산책',
    subtitle: '지친 마음에 평안을 주는 묵상',
    count: 7,
    icon: '☀️',
    color: '#E9A94D',
    tag: '묵상',
    recommended: true,
  },
  {
    id: 'PLYJ866XA7ij3Sg-RURz_y16sq-d3ThKI8',
    title: '기도해도 응답이 없을 때',
    subtitle: '하나님의 침묵을 이해하는 말씀',
    count: 9,
    icon: '🕊️',
    color: '#9B7EBD',
    tag: '기도',
  },
  {
    id: 'PLYJ866XA7ij0jP5SBulfWRPf_nmSiAkci',
    title: '번아웃 크리스천을 위한 말씀',
    subtitle: '착한 사람 증후군·관계 피로 치유',
    count: 7,
    icon: '🌿',
    color: '#7BA098',
    tag: '치유',
  },
  {
    id: 'PLYJ866XA7ij0SW6eYM4QNTGHLeQEvdXT3',
    title: '고난 중의 기다림',
    subtitle: '하나님의 때를 기다리는 사람을 위한',
    count: 8,
    icon: '🌊',
    color: '#5B9AA0',
    tag: '인내',
  },
  {
    id: 'PLYJ866XA7ij2JmLoif44sqqpF2YRQoMxU',
    title: '하나님의 뜻 분별하는 법',
    subtitle: '진짜 응답과 내 욕심을 구별하는 지혜',
    count: 6,
    icon: '🧭',
    color: '#C9A961',
    tag: '분별',
  },
  {
    id: 'PLYJ866XA7ij0qeFQsP6JdW62qmOgH_-OJ',
    title: '크리스천 재정 성경 말씀',
    subtitle: '돈 걱정·통장 불안에서 자유로워지는 법',
    count: 5,
    icon: '💰',
    color: '#D4756B',
    tag: '재정',
  },
];
const isValidPlaylistId = (id) => id && id.startsWith('PL') && !id.startsWith('PLACE') && !id.includes('REPLACE');

// ============ 메인 ============
export default function FamilyWorship() {
  const [tab, setTab] = useState('home');
  const [streak, setStreak] = useState(0);
  const [stickers, setStickers] = useState(0);
  const [lastDate, setLastDate] = useState(null);
  const [prayers, setPrayers] = useState([]);
  const [answered, setAnswered] = useState([]);
  const [completedStories, setCompletedStories] = useState([]);
  const [loading, setLoading] = useState(true);

  // BGM 상태
  const audioRef = useRef(null);
  const [currentTrack, setCurrentTrack] = useState(null); // { track, category }
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [sleepTimer, setSleepTimer] = useState(null); // minutes remaining
  const [showPlayerModal, setShowPlayerModal] = useState(false);
  const [welcomeShown, setWelcomeShown] = useState(false);
  const sleepTimerRef = useRef(null);

  const [verseIndex] = useState(() => {
    const day = new Date().getDate();
    return day % todayVerses.length;
  });
  const verse = todayVerses[verseIndex];

  // 로드
  useEffect(() => {
    const load = async () => {
      try {
        const get = async (k, def) => {
          try {
            if (typeof window !== 'undefined' && window.storage) {
              const r = await window.storage.get(k);
              return r?.value ? JSON.parse(r.value) : def;
            }
            // Vite/브라우저 환경: localStorage 폴백
            const r = localStorage.getItem(k);
            return r ? JSON.parse(r) : def;
          } catch { return def; }
        };
        setStreak(await get('streak', 0));
        setStickers(await get('stickers', 0));
        setLastDate(await get('lastDate', null));
        setPrayers(await get('prayers', []));
        setAnswered(await get('answered', []));
        setCompletedStories(await get('completedStories', []));
        setFavorites(await get('favorites', []));
      } catch (e) { /* noop */ }
      setLoading(false);
    };
    load();
  }, []);

  // BGM 오디오 이벤트 연결
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setProgress(audio.currentTime);
    const onDur = () => setDuration(audio.duration || 0);
    const onEnd = () => handleNextTrack();
    const onError = (e) => {
      console.error('🔴 BGM 재생 에러');
      console.error('에러 객체:', audio.error);
      console.error('에러 코드:', audio.error?.code);
      console.error('에러 메시지:', audio.error?.message);
      console.error('재생 시도한 URL:', audio.src);
      console.error('네트워크 상태:', audio.networkState);
      console.error('재생 상태:', audio.readyState);
    };
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onDur);
    audio.addEventListener('ended', onEnd);
    audio.addEventListener('error', onError);
    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', onDur);
      audio.removeEventListener('ended', onEnd);
      audio.removeEventListener('error', onError);
    };
  }, [currentTrack]);

  // 슬립 타이머
  useEffect(() => {
    if (sleepTimer === null) return;
    if (sleepTimer <= 0) {
      setIsPlaying(false);
      audioRef.current?.pause();
      setSleepTimer(null);
      return;
    }
    sleepTimerRef.current = setTimeout(() => setSleepTimer(sleepTimer - 1), 60000);
    return () => clearTimeout(sleepTimerRef.current);
  }, [sleepTimer]);

  const save = async (key, val) => {
    try {
      if (typeof window !== 'undefined' && window.storage) {
        await window.storage.set(key, JSON.stringify(val));
      } else {
        // Vite/브라우저 환경: localStorage 폴백
        localStorage.setItem(key, JSON.stringify(val));
      }
    } catch (e) { /* noop */ }
  };

  // BGM 컨트롤
  const playTrack = (track, category) => {
    if (!isValidUrl(track.url)) {
      alert('이 곡의 URL이 아직 설정되지 않았어요.\n코드 상단 BGM_CATEGORIES에서 해당 트랙의 url을 채워주세요.');
      return;
    }
    const audio = audioRef.current;
    if (!audio) return;

    // 새 트랙으로 상태 업데이트
    setCurrentTrack({ track, category });

    // src 변경 및 명시적 load
    audio.src = track.url;
    audio.load();

    // ⭐ 사용자 제스처 컨텍스트 안에서 즉시 play() 호출 (setTimeout 없이)
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error('🔴 재생 실패:', err.name, '-', err.message);
        console.error('실패한 URL:', track.url);
        setIsPlaying(false);
        if (err.name === 'NotAllowedError') {
          alert('⚠️ 브라우저 자동재생 정책 차단\n\n재생 버튼을 다시 한 번 눌러주세요.');
        } else if (err.name === 'NotSupportedError') {
          alert('⚠️ 이 오디오 형식을 재생할 수 없어요.\n\n파일 URL을 확인해주세요.');
        }
      });
    }
  };

  const togglePlay = () => {
    if (!currentTrack) return;
    if (isPlaying) { audioRef.current?.pause(); setIsPlaying(false); }
    else { audioRef.current?.play().then(() => setIsPlaying(true)).catch(() => {}); }
  };

  const handleNextTrack = () => {
    if (!currentTrack) return;
    const cat = currentTrack.category;
    const idx = cat.tracks.findIndex(t => t.id === currentTrack.track.id);
    const next = cat.tracks[(idx + 1) % cat.tracks.length];
    playTrack(next, cat);
  };

  const handlePrevTrack = () => {
    if (!currentTrack) return;
    const cat = currentTrack.category;
    const idx = cat.tracks.findIndex(t => t.id === currentTrack.track.id);
    const prev = cat.tracks[(idx - 1 + cat.tracks.length) % cat.tracks.length];
    playTrack(prev, cat);
  };

  const seekTo = (sec) => {
    if (audioRef.current) audioRef.current.currentTime = sec;
    setProgress(sec);
  };

  const toggleFavorite = async (trackId) => {
    const next = favorites.includes(trackId)
      ? favorites.filter(id => id !== trackId)
      : [...favorites, trackId];
    setFavorites(next);
    await save('favorites', next);
  };

  const startSleepTimer = (minutes) => setSleepTimer(minutes);
  const cancelSleepTimer = () => { setSleepTimer(null); clearTimeout(sleepTimerRef.current); };

  // 웰컴 게이트에서 진입 - 시간대에 맞는 첫 재생 가능한 트랙 자동 시작
  const handleEnterApp = () => {
    const rec = getRecommendedCategory();
    const playable = rec.tracks.find(t => isValidUrl(t.url));
    if (playable) {
      playTrack(playable, rec);
    }
    setWelcomeShown(true);
  };

  const markWorshipDone = async () => {
    const today = new Date().toDateString();
    if (lastDate === today) return;
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    const newStreak = lastDate === yesterday ? streak + 1 : 1;
    setStreak(newStreak);
    setLastDate(today);
    setStickers(stickers + 3);
    await save('streak', newStreak);
    await save('lastDate', today);
    await save('stickers', stickers + 3);
  };

  const addPrayer = async (text) => {
    if (!text.trim()) return;
    const newPrayers = [{ id: Date.now(), text, date: new Date().toLocaleDateString('ko-KR') }, ...prayers];
    setPrayers(newPrayers);
    await save('prayers', newPrayers);
  };

  const answerPrayer = async (id) => {
    const p = prayers.find(x => x.id === id);
    if (!p) return;
    const newPrayers = prayers.filter(x => x.id !== id);
    const newAnswered = [{ ...p, answeredDate: new Date().toLocaleDateString('ko-KR') }, ...answered];
    setPrayers(newPrayers);
    setAnswered(newAnswered);
    setStickers(stickers + 2);
    await save('prayers', newPrayers);
    await save('answered', newAnswered);
    await save('stickers', stickers + 2);
  };

  const deletePrayer = async (id) => {
    const newPrayers = prayers.filter(x => x.id !== id);
    setPrayers(newPrayers);
    await save('prayers', newPrayers);
  };

  const completeStory = async (id) => {
    if (completedStories.includes(id)) return;
    const next = [...completedStories, id];
    setCompletedStories(next);
    setStickers(stickers + 1);
    await save('completedStories', next);
    await save('stickers', stickers + 1);
  };

  const bgmControls = {
    currentTrack, isPlaying, progress, duration, favorites, sleepTimer,
    playTrack, togglePlay, handleNextTrack, handlePrevTrack, seekTo,
    toggleFavorite, startSleepTimer, cancelSleepTimer,
    openPlayerModal: () => setShowPlayerModal(true),
  };

  return (
    <div className="min-h-screen w-full" style={{ background: 'linear-gradient(180deg, #FFF8EC 0%, #FDF2E2 100%)' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Gaegu:wght@400;700&family=Gowun+Dodum&family=Nanum+Myeongjo:wght@400;700;800&display=swap');
        .font-display { font-family: 'Gaegu', cursive; }
        .font-body { font-family: 'Gowun Dodum', sans-serif; }
        .font-serif-ko { font-family: 'Nanum Myeongjo', serif; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        @keyframes pop { 0% { transform: scale(0.5); opacity: 0; } 60% { transform: scale(1.15); opacity: 1; } 100% { transform: scale(1); } }
        @keyframes shine { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes bounce-y { 0%,100% { transform: translateY(0); } 25% { transform: translateY(-8px); } 75% { transform: translateY(-4px); } }
        @keyframes wave { 0%,100% { transform: rotate(-5deg); } 50% { transform: rotate(5deg); } }
        @keyframes wiggle { 0%,100% { transform: rotate(0deg) scale(1); } 25% { transform: rotate(-4deg) scale(1.02); } 75% { transform: rotate(4deg) scale(1.02); } }
        @keyframes celebrate { 0%,100% { transform: scale(1) rotate(0deg); } 25% { transform: scale(1.1) rotate(-8deg); } 50% { transform: scale(1.15) rotate(0deg); } 75% { transform: scale(1.1) rotate(8deg); } }
        @keyframes peek { 0% { transform: translateX(0) rotate(0); } 25% { transform: translateX(-3px) rotate(-3deg); } 75% { transform: translateX(3px) rotate(3deg); } 100% { transform: translateX(0) rotate(0); } }
        .anim-fade-up { animation: fadeUp 0.6s ease-out forwards; }
        .anim-float { animation: float 3s ease-in-out infinite; }
        .anim-pop { animation: pop 0.5s ease-out forwards; }
        .anim-rotate { animation: rotate 10s linear infinite; }
        .anim-slide-up { animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .anim-bounce-y { animation: bounce-y 2s ease-in-out infinite; }
        .anim-wave { animation: wave 2.5s ease-in-out infinite; transform-origin: bottom center; }
        .anim-wiggle { animation: wiggle 3s ease-in-out infinite; }
        .anim-celebrate { animation: celebrate 0.8s ease-in-out infinite; }
        .anim-peek { animation: peek 4s ease-in-out infinite; }
        .shine-text {
          background: linear-gradient(90deg, #E9A94D 0%, #D4756B 50%, #E9A94D 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shine 3s linear infinite;
        }
        .paper-card {
          background: #FFFDF7;
          border: 1px solid #F0E2C6;
          box-shadow: 0 1px 2px rgba(74,63,53,0.04), 0 8px 24px -8px rgba(74,63,53,0.12);
        }
        .soft-inset {
          background: #FFF8EC;
          box-shadow: inset 0 1px 3px rgba(74,63,53,0.06);
        }
        .stamp-glow {
          box-shadow: 0 0 0 3px #FFFDF7, 0 0 0 5px #E9A94D, 0 4px 16px -4px rgba(233,169,77,0.5);
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { scrollbar-width: none; }

        /* ===== v0.9.1 패치: iOS Safari 호환성 개선 ===== */
        /* 한국어 어절 단위 줄바꿈 (모든 텍스트에 적용) */
        body, p, h1, h2, h3, h4, h5, h6, span, div, button, a, li {
          word-break: keep-all;
          overflow-wrap: break-word;
        }
        /* iOS 텍스트 자동 크기 조절 방지 (가로/세로 회전 시) */
        html { -webkit-text-size-adjust: 100%; text-size-adjust: 100%; }
        /* iPhone 노치 / 홈 인디케이터 안전 영역 */
        body {
          padding-top: env(safe-area-inset-top);
          padding-bottom: env(safe-area-inset-bottom);
        }
        /* 탭 하이라이트 색상 제거 (iOS) */
        * { -webkit-tap-highlight-color: transparent; }
        /* 이미지 드래그 방지 (iOS) */
        img { -webkit-user-drag: none; user-select: none; }
      `}</style>

      {/* 전역 오디오 엘리먼트 */}
      <audio ref={audioRef} preload="auto" />

      {/* 웰컴 게이트 (앱 첫 진입 시) */}
      {!loading && !welcomeShown && (
        <WelcomeGate onEnter={handleEnterApp} verse={verse} />
      )}

      <div className={`font-body max-w-[480px] mx-auto pt-2 px-4 min-h-screen transition-all ${currentTrack ? 'pb-44' : 'pb-28'}`}>
        {loading && (
          <div className="flex items-center justify-center min-h-[80vh]">
            <div className="text-[#4A3F35] font-display text-2xl anim-float">가정예배를 준비하고 있어요...</div>
          </div>
        )}
        {!loading && welcomeShown && (
          <>
            <Header streak={streak} stickers={stickers} />

            {tab === 'home' && (
              <HomeTab
                verse={verse}
                streak={streak}
                stickers={stickers}
                onStartWorship={() => setTab('worship')}
                onOpenBGM={() => setTab('bgm')}
                lastDate={lastDate}
                bgmControls={bgmControls}
              />
            )}
            {tab === 'worship' && (
              <WorshipTab verse={verse} onDone={markWorshipDone} alreadyDone={lastDate === new Date().toDateString()} />
            )}
            {tab === 'kids' && (
              <KidsTab
                stickers={stickers}
                completedStories={completedStories}
                onCompleteStory={completeStory}
                onEarnSticker={(n) => { const ns = stickers + n; setStickers(ns); save('stickers', ns); }}
              />
            )}
            {tab === 'prayer' && (
              <PrayerTab
                prayers={prayers}
                answered={answered}
                onAdd={addPrayer}
                onAnswer={answerPrayer}
                onDelete={deletePrayer}
              />
            )}
            {tab === 'bgm' && <BGMTab bgmControls={bgmControls} />}
            {tab === 'channel' && <ChannelTab />}
          </>
        )}

        {/* 미니 플레이어 */}
        {currentTrack && !showPlayerModal && (
          <MiniPlayer {...bgmControls} />
        )}

        {/* 풀 플레이어 모달 */}
        {showPlayerModal && currentTrack && (
          <FullPlayerModal {...bgmControls} onClose={() => setShowPlayerModal(false)} />
        )}

        <BottomNav tab={tab} setTab={setTab} />
      </div>
    </div>
  );
}

// ============ 헤더 ============
function Header({ streak, stickers }) {
  return (
    <div className="flex items-center justify-between py-4 anim-fade-up">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Logomong size={100} animate="float" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <div className="font-display text-2xl leading-none text-[#4A3F35]">우리집 예배</div>
            <span
              className="text-[9px] font-bold tracking-wider px-1.5 py-0.5 rounded-md text-white"
              style={{
                background: 'linear-gradient(135deg, #E9A94D, #D4756B)',
                boxShadow: '0 2px 6px -2px rgba(212, 117, 107, 0.5)'
              }}
            >
              BETA
            </span>
          </div>
          <div className="text-[11px] text-[#8B7355] mt-1 tracking-wider">v{APP_VERSION} · 로고몽과 함께</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 px-3 py-1.5 rounded-full paper-card">
          <Flame className="w-3.5 h-3.5 text-[#D4756B]" fill="#D4756B" />
          <span className="font-display text-sm font-bold text-[#4A3F35]">{streak}일</span>
        </div>
        <div className="flex items-center gap-1 px-3 py-1.5 rounded-full paper-card">
          <Star className="w-3.5 h-3.5 text-[#E9A94D]" fill="#E9A94D" />
          <span className="font-display text-sm font-bold text-[#4A3F35]">{stickers}</span>
        </div>
      </div>
    </div>
  );
}

// ============ 홈 탭 ============
function HomeTab({ verse, streak, stickers, onStartWorship, onOpenBGM, lastDate, bgmControls }) {
  const todayDone = lastDate === new Date().toDateString();
  const today = new Date();
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const dayStr = `${today.getMonth() + 1}월 ${today.getDate()}일 ${days[today.getDay()]}요일`;
  const rec = getRecommendedCategory();
  const firstTrack = rec.tracks[0];
  const [showWeeklyModal, setShowWeeklyModal] = useState(false);
  const [shareToast, setShareToast] = useState(null);

  // 이번 주 출석 일수 계산 (간단 버전: streak와 todayDone 기반)
  const weekDayCount = Math.min(streak, today.getDay() + (todayDone ? 1 : 0));

  // 말씀 공유 (카톡, 메신저 등)
  const shareVerse = async () => {
    const text = `📖 오늘의 말씀\n\n"${verse.text}"\n\n— ${verse.ref}\n#${verse.theme}\n\n우리집 가정예배에서 함께 나눠요 🙏`;

    // 1순위: 모바일 네이티브 공유 시트 (카톡/메신저/문자 자동 포함)
    if (navigator.share) {
      try {
        await navigator.share({ title: '오늘의 말씀', text });
        return;
      } catch (e) {
        if (e.name === 'AbortError') return; // 사용자가 취소
        // 다른 에러면 클립보드 폴백으로
      }
    }

    // 2순위: 클립보드 복사
    try {
      await navigator.clipboard.writeText(text);
      setShareToast('📋 말씀이 복사됐어요! 카톡에 붙여넣어 보세요');
      setTimeout(() => setShareToast(null), 3000);
      return;
    } catch (e) {
      // 3순위: 구식 폴백 (HTTP 환경 등)
      try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        setShareToast('📋 말씀이 복사됐어요! 카톡에 붙여넣어 보세요');
        setTimeout(() => setShareToast(null), 3000);
      } catch {
        setShareToast('⚠️ 복사 실패. 직접 선택해서 복사해주세요');
        setTimeout(() => setShareToast(null), 3000);
      }
    }
  };

  return (
    <div className="space-y-4 anim-fade-up">
      {/* 날짜 + 인사 */}
      <div className="px-1">
        <div className="text-[11px] text-[#8B7355] tracking-[0.2em] uppercase">{dayStr}</div>
        <h1 className="font-serif-ko text-[26px] leading-tight text-[#4A3F35] mt-1" style={{ fontWeight: 800 }}>
          오늘도 주님과<br/>
          <span className="shine-text">함께하는 하루</span>
        </h1>
      </div>

      {/* 오늘의 말씀 카드 */}
      <div className="relative rounded-[28px] p-6 overflow-hidden" style={{
        background: 'linear-gradient(135deg, #FFF4D6 0%, #FFE0C7 50%, #FFD4C2 100%)',
        boxShadow: '0 12px 32px -12px rgba(233,169,77,0.35)'
      }}>
        <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full opacity-40" style={{ background: 'radial-gradient(circle, #FFEAB0, transparent 70%)' }} />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full opacity-30" style={{ background: 'radial-gradient(circle, #FFB894, transparent 70%)' }} />

        <div className="relative">
          <div className="flex items-center gap-1.5 mb-3">
            <Feather className="w-3.5 h-3.5 text-[#8B5E3C]" />
            <span className="text-[10px] font-bold text-[#8B5E3C] tracking-[0.3em]">TODAY'S VERSE</span>
          </div>
          <div className="inline-block px-2.5 py-1 rounded-full bg-white/60 backdrop-blur-sm mb-3">
            <span className="text-[11px] font-bold text-[#8B5E3C]">#{verse.theme}</span>
          </div>
          <p className="font-serif-ko text-[19px] leading-[1.65] text-[#4A3F35]" style={{ fontWeight: 700 }}>
            “{verse.text}”
          </p>
          <div className="mt-4 flex items-center gap-2">
            <div className="h-px flex-1 bg-[#8B5E3C]/30" />
            <span className="font-display text-sm font-bold text-[#8B5E3C]">{verse.ref}</span>
          </div>
        </div>
      </div>

      {/* 예배 시작 버튼 */}
      <button
        onClick={onStartWorship}
        className="w-full relative overflow-hidden rounded-[24px] p-5 text-left transition-transform active:scale-[0.98]"
        style={{
          background: todayDone
            ? 'linear-gradient(135deg, #7BA098, #5B9AA0)'
            : 'linear-gradient(135deg, #4A3F35, #2D3436)',
          boxShadow: '0 10px 28px -8px rgba(74,63,53,0.35)'
        }}
      >
        <div className="absolute top-2 right-2 opacity-10">
          <BookOpen className="w-24 h-24 text-white" />
        </div>
        <div className="relative">
          <div className="text-[10px] text-white/70 tracking-[0.2em] mb-1">
            {todayDone ? 'TODAY COMPLETED' : 'LET\'S BEGIN'}
          </div>
          <div className="font-display text-2xl text-white font-bold leading-tight">
            {todayDone ? '오늘 예배 완료했어요 ✨' : '지금 가정예배 시작하기'}
          </div>
          <div className="text-sm text-white/80 mt-1">
            {todayDone ? '내일 또 만나요!' : '5분부터 시작할 수 있어요'}
          </div>
          <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm">
            <Play className="w-3 h-3 text-white" fill="white" />
            <span className="text-xs font-bold text-white">
              {todayDone ? '다시 보기' : '시작'}
            </span>
          </div>
        </div>
      </button>

      {/* 빠른 메뉴 */}
      <div className="grid grid-cols-3 gap-2.5">
        <QuickCard icon="🌱" title="어린이" desc="성경 이야기" color="#A8C686" />
        <QuickCard icon="🙏" title="기도 노트" desc={`${0}개`} color="#D4756B" />
        <QuickCard icon="✨" title="말씀의지혜" desc="최신 영상" color="#9B7EBD" />
      </div>

      {/* 지금 듣기 — 시간대별 BGM 추천 */}
      <button
        onClick={() => {
          if (isValidUrl(firstTrack.url)) bgmControls.playTrack(firstTrack, rec);
          else onOpenBGM();
        }}
        className="w-full rounded-[24px] p-5 text-left relative overflow-hidden transition-transform active:scale-[0.98]"
        style={{
          background: `linear-gradient(135deg, ${rec.color}, ${rec.color}dd)`,
          boxShadow: `0 10px 28px -8px ${rec.color}80`
        }}
      >
        <div className="absolute -right-2 -bottom-2 text-7xl opacity-25 anim-float">{rec.icon}</div>
        <div className="absolute top-3 right-3 w-14 h-14 rounded-full bg-white/15 backdrop-blur-sm anim-rotate" />
        <div className="relative">
          <div className="flex items-center gap-1.5 mb-1">
            <Music2 className="w-3 h-3 text-white/90" />
            <span className="text-[10px] font-bold tracking-[0.2em] text-white/90">NOW PLAYING</span>
          </div>
          <div className="font-display text-xl font-bold text-white leading-tight">
            지금은 <span className="underline decoration-white/40 decoration-2 underline-offset-2">{rec.name}</span>의 시간
          </div>
          <div className="text-sm text-white/90 mt-1">{rec.desc}</div>
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm">
            <Play className="w-3 h-3 text-white" fill="white" />
            <span className="text-xs font-bold text-white">찬양 틀기 · {firstTrack.title}</span>
          </div>
        </div>
      </button>

      {/* 이번 주 출석 (클릭 가능) */}
      <button
        onClick={() => setShowWeeklyModal(true)}
        className="w-full paper-card rounded-[20px] p-5 text-left transition-transform active:scale-[0.98] hover:shadow-lg"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="font-display text-lg text-[#4A3F35] font-bold">이번 주 우리 가족</div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{
            background: 'linear-gradient(135deg, #FFF4D6, #FFE0C7)'
          }}>
            <span className="text-[10px] font-bold text-[#8B5E3C]">자세히</span>
            <ChevronRight className="w-3 h-3 text-[#D4756B]" strokeWidth={2.5} />
          </div>
        </div>
        <div className="flex items-center justify-between mb-3">
          <div className="text-[11px] text-[#8B7355]">연속 {streak}일 🔥</div>
          <div className="text-[11px] text-[#8B7355]">{weekDayCount}/7일 출석</div>
        </div>
        <div className="flex justify-between">
          {days.map((d, i) => {
            const active = i < today.getDay() || (i === today.getDay() && todayDone);
            const todayIdx = i === today.getDay();
            return (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div className="text-[10px] text-[#8B7355] font-bold">{d}</div>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${todayIdx ? 'stamp-glow' : ''}`}
                  style={{
                    background: active ? 'linear-gradient(135deg, #E9A94D, #D4756B)' : '#F5EBD8',
                    color: active ? 'white' : '#C4B59A'
                  }}>
                  {active ? <Check className="w-4 h-4" strokeWidth={3} /> : <span className="text-xs font-bold">{i + (today.getDate() - today.getDay())}</span>}
                </div>
              </div>
            );
          })}
        </div>
      </button>

      {/* 가족 말씀 공유 */}
      <div className="rounded-[20px] p-5 relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, #E8F4E4 0%, #F0EBDA 100%)'
      }}>
        <div className="absolute -right-4 -top-4 text-6xl opacity-20">💌</div>
        <div className="relative">
          <div className="text-[10px] font-bold text-[#5A7A52] tracking-wider mb-1">FAMILY SHARE</div>
          <div className="font-display text-lg text-[#4A3F35] font-bold leading-tight">
            오늘 말씀, 가족과<br/>카톡으로 나눠요
          </div>
          <button
            onClick={shareVerse}
            className="mt-3 px-4 py-2 rounded-full bg-white text-[#5A7A52] text-xs font-bold shadow-sm flex items-center gap-1.5 transition-transform active:scale-95"
          >
            <Send className="w-3 h-3" />
            말씀 보내기
          </button>
        </div>
      </div>

      {/* 공유 토스트 */}
      {shareToast && (
        <div
          className="fixed bottom-32 left-1/2 -translate-x-1/2 z-[60] px-5 py-3 rounded-2xl text-white text-sm font-bold anim-pop max-w-[90%]"
          style={{
            background: 'linear-gradient(135deg, #4A3F35, #2D3436)',
            boxShadow: '0 10px 30px -8px rgba(74,63,53,0.4)'
          }}
        >
          {shareToast}
        </div>
      )}

      {/* 이번 주 우리 가족 모달 */}
      {showWeeklyModal && (
        <WeeklyAttendanceModal
          weekDayCount={weekDayCount}
          streak={streak}
          stickers={stickers}
          todayDone={todayDone}
          onClose={() => setShowWeeklyModal(false)}
          onStartWorship={() => { setShowWeeklyModal(false); onStartWorship(); }}
        />
      )}
    </div>
  );
}

function QuickCard({ icon, title, desc, color }) {
  return (
    <div className="paper-card rounded-2xl p-3 text-center transition-transform active:scale-95 cursor-pointer">
      <div className="text-2xl mb-1 anim-float" style={{ animationDelay: Math.random() + 's' }}>{icon}</div>
      <div className="font-display text-sm font-bold text-[#4A3F35] leading-none">{title}</div>
      <div className="text-[10px] mt-1" style={{ color }}>{desc}</div>
    </div>
  );
}

// ============ 이번 주 가족 격려 모달 ============
function WeeklyAttendanceModal({ weekDayCount, streak, stickers, todayDone, onClose, onStartWorship }) {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysLeftThisWeek = 6 - dayOfWeek;

  // 출석 일수에 따른 격려 메시지
  const messages = [
    { range: [0, 0], emoji: '🌱', title: '이번 주의 시작이에요', body: '아직 늦지 않았어요. 오늘 한 번의 예배가 가족 신앙의 첫 씨앗이 됩니다.' },
    { range: [1, 2], emoji: '☀️', title: '잘 시작하셨어요!', body: '꾸준함이 가장 어려운데, 이미 발걸음을 떼셨네요. 이번 주도 함께 걸어가요.' },
    { range: [3, 4], emoji: '🌳', title: '한 주의 절반을 넘었어요', body: '우리 가족이 하나님 앞에 자주 모였네요. 이 시간들이 평생의 뿌리가 됩니다.' },
    { range: [5, 5], emoji: '🌟', title: '거의 완벽한 한 주!', body: '하루만 더 함께하면 완전 출석이에요. 마지막 한 걸음까지 응원합니다.' },
    { range: [6, 7], emoji: '👑', title: '한 주 완전 출석!', body: '믿을 수 없는 충성이에요. 하나님께서 이 가족의 헌신을 기뻐하실 거예요.' },
  ];
  const msg = messages.find(m => weekDayCount >= m.range[0] && weekDayCount <= m.range[1]) || messages[0];

  // 다가오는 추천
  const nextRec = todayDone
    ? `내일도 ${dayOfWeek === 6 ? '주일 가족 예배' : '저녁 가정 예배'}로 만나요`
    : '오늘 아직 예배 시간을 만들지 못하셨어요';

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 anim-fade-up"
      style={{ background: 'rgba(74, 63, 53, 0.55)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="relative max-w-[420px] w-full max-h-[85vh] overflow-y-auto rounded-[28px] anim-pop"
        style={{
          background: 'linear-gradient(180deg, #FFFDF7 0%, #FFF8EC 100%)',
          boxShadow: '0 20px 60px -10px rgba(74,63,53,0.4)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#FFF8EC] flex items-center justify-center z-10"
        >
          <X className="w-4 h-4 text-[#8B7355]" />
        </button>

        {/* 컬러 배너 */}
        <div className="rounded-t-[28px] p-6 pb-12 relative overflow-hidden text-center" style={{
          background: 'linear-gradient(135deg, #E9A94D 0%, #D4756B 100%)'
        }}>
          <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-white/15" />
          <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full bg-white/10" />
          <div className="relative">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="text-5xl anim-float">{msg.emoji}</div>
              <Logomong size={160} animate="bounce" glow />
            </div>
            <div className="text-[10px] tracking-[0.3em] text-white/80 font-bold">FAMILY OF THE WEEK</div>
            <h2 className="font-serif-ko text-2xl font-bold text-white mt-1 leading-tight" style={{ fontWeight: 800 }}>
              {msg.title}
            </h2>
          </div>
        </div>

        {/* 본문 */}
        <div className="px-6 pb-6 -mt-6 relative">
          {/* 메시지 카드 */}
          <div className="paper-card rounded-2xl p-5 mb-4">
            <p className="text-sm text-[#4A3F35] leading-[1.8] text-center">
              {msg.body}
            </p>
          </div>

          {/* 통계 3종 */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <StatCell icon="🔥" value={streak} label="연속 출석" color="#D4756B" />
            <StatCell icon="📅" value={`${weekDayCount}/7`} label="이번 주" color="#E9A94D" />
            <StatCell icon="⭐" value={stickers} label="총 스티커" color="#9B7EBD" />
          </div>

          {/* 진행 바 */}
          <div className="paper-card rounded-2xl p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#4A3F35]">이번 주 출석률</span>
              <span className="text-xs text-[#8B7355]">{weekDayCount} / 7일</span>
            </div>
            <div className="h-2 rounded-full bg-[#F5EBD8] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${(weekDayCount / 7) * 100}%`,
                  background: 'linear-gradient(90deg, #E9A94D, #D4756B)'
                }}
              />
            </div>
            <div className="text-[10px] text-[#8B7355] mt-2 text-center">
              {daysLeftThisWeek > 0
                ? `이번 주에 ${daysLeftThisWeek}일 더 남았어요`
                : '이번 주의 마지막 날이에요'}
            </div>
          </div>

          {/* 다음 예배 추천 */}
          <div className="rounded-2xl p-4 mb-4 relative overflow-hidden" style={{
            background: 'linear-gradient(135deg, #E8F4E4, #F0EBDA)'
          }}>
            <div className="absolute -right-2 -top-2 text-4xl opacity-20">📿</div>
            <div className="relative">
              <div className="text-[10px] font-bold text-[#5A7A52] tracking-wider mb-1">NEXT WORSHIP</div>
              <div className="text-sm font-bold text-[#4A3F35]">{nextRec}</div>
            </div>
          </div>

          {/* 액션 버튼 */}
          {!todayDone && (
            <button
              onClick={onStartWorship}
              className="w-full py-4 rounded-2xl font-display text-base font-bold text-white"
              style={{
                background: 'linear-gradient(135deg, #4A3F35, #2D3436)',
                boxShadow: '0 8px 20px -8px rgba(74,63,53,0.4)'
              }}
            >
              지금 예배 시작하기 🙏
            </button>
          )}
          {todayDone && (
            <div className="text-center py-3">
              <div className="text-2xl mb-1">✨</div>
              <div className="text-sm font-bold text-[#7BA098]">오늘 예배 완료!</div>
              <div className="text-[11px] text-[#8B7355] mt-0.5">내일 또 만나요</div>
            </div>
          )}

          {/* 격려 말씀 */}
          <div className="mt-5 pt-4 border-t border-dashed border-[#F0E2C6] text-center">
            <div className="font-serif-ko text-xs text-[#8B7355] leading-relaxed italic">
              "오직 나와 내 집은 여호와를 섬기겠노라"
            </div>
            <div className="text-[10px] text-[#C4B59A] mt-1 font-bold">— 여호수아 24:15</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCell({ icon, value, label, color }) {
  return (
    <div className="paper-card rounded-xl p-3 text-center">
      <div className="text-xl mb-0.5">{icon}</div>
      <div className="font-display text-lg font-bold leading-none" style={{ color }}>{value}</div>
      <div className="text-[9px] text-[#8B7355] mt-1 font-bold">{label}</div>
    </div>
  );
}

// ============ 로고몽 마스코트 (재사용 컴포넌트) ============
function Logomong({ size = 80, animate = 'float', className = '', style = {}, glow = false, circleBg = true }) {
  const [errored, setErrored] = useState(false);
  const animClass = {
    float: 'anim-float',
    bounce: 'anim-bounce-y',
    wave: 'anim-wave',
    wiggle: 'anim-wiggle',
    celebrate: 'anim-celebrate',
    peek: 'anim-peek',
    none: ''
  }[animate] || '';

  const containerStyle = circleBg ? {
    width: size,
    height: size,
    borderRadius: '50%',
    background: 'white',
    overflow: 'hidden',
    boxShadow: glow
      ? '0 0 0 3px rgba(255, 220, 100, 0.4), 0 8px 24px -4px rgba(233, 169, 77, 0.5)'
      : '0 4px 12px -2px rgba(74, 63, 53, 0.18), 0 0 0 1px rgba(74, 63, 53, 0.06)',
    ...style
  } : {
    width: size,
    height: size,
    ...style
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={containerStyle}
    >
      {!circleBg && glow && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(255, 220, 100, 0.45) 0%, transparent 65%)',
            filter: 'blur(8px)',
            transform: 'scale(1.2)',
          }}
        />
      )}
      {errored ? (
        <div
          className={`relative ${animClass} flex items-center justify-center`}
          style={{ width: '100%', height: '100%', fontSize: size * 0.7, lineHeight: 1 }}
        >
          🐑
        </div>
      ) : (
        <img
          src={LOGOMONG_URL}
          alt="로고몽"
          className={`relative ${animClass}`}
          style={{
            width: '92%',
            height: '92%',
            objectFit: 'contain',
            objectPosition: 'center',
            filter: !circleBg && glow ? 'drop-shadow(0 4px 12px rgba(233, 169, 77, 0.4))' : 'none'
          }}
          onError={() => setErrored(true)}
        />
      )}
    </div>
  );
}

// ============ 로고몽 + 말풍선 ============
function LogomongSpeech({ message, size = 90, color = '#E9A94D' }) {
  // 큰 사이즈(120px+)일 때는 세로 배치, 작은 사이즈는 가로 배치
  const isLarge = size >= 120;

  if (isLarge) {
    // 세로 배치: 로고몽 위, 말풍선 아래 (모바일 친화적)
    return (
      <div className="flex flex-col items-center gap-3">
        <Logomong size={size} animate="bounce" glow />
        <div
          className="relative rounded-2xl px-5 py-3 w-full"
          style={{
            background: `linear-gradient(135deg, white, ${color}10)`,
            border: `2px solid ${color}40`,
            boxShadow: `0 4px 12px -4px ${color}30`
          }}
        >
          {/* 위쪽 화살표 (말풍선 꼬리) */}
          <div
            className="absolute left-1/2 top-[-9px] w-0 h-0"
            style={{
              transform: 'translateX(-50%)',
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderBottom: `9px solid ${color}40`
            }}
          />
          <div
            className="absolute left-1/2 top-[-6px] w-0 h-0"
            style={{
              transform: 'translateX(-50%)',
              borderLeft: '7px solid transparent',
              borderRight: '7px solid transparent',
              borderBottom: '7px solid white'
            }}
          />
          <p
            className="font-display text-base font-bold text-[#4A3F35] leading-snug text-center"
            style={{
              wordBreak: 'keep-all',
              overflowWrap: 'break-word',
              whiteSpace: 'normal'
            }}
          >
            {message}
          </p>
        </div>
      </div>
    );
  }

  // 작은 사이즈: 기존 가로 배치 유지 (한글 줄바꿈만 개선)
  return (
    <div className="flex items-end gap-3">
      <div style={{ flexShrink: 0 }}>
        <Logomong size={size} animate="bounce" glow />
      </div>
      <div
        className="relative rounded-2xl px-4 py-3 flex-1"
        style={{
          background: `linear-gradient(135deg, white, ${color}10)`,
          border: `2px solid ${color}40`,
          boxShadow: `0 4px 12px -4px ${color}30`,
          minWidth: 0
        }}
      >
        <div
          className="absolute left-[-9px] bottom-4 w-0 h-0"
          style={{
            borderTop: '6px solid transparent',
            borderBottom: '6px solid transparent',
            borderRight: `9px solid ${color}40`
          }}
        />
        <div
          className="absolute left-[-6px] bottom-4 w-0 h-0"
          style={{
            borderTop: '6px solid transparent',
            borderBottom: '6px solid transparent',
            borderRight: '8px solid white'
          }}
        />
        <p
          className="font-display text-base font-bold text-[#4A3F35] leading-snug"
          style={{
            wordBreak: 'keep-all',
            overflowWrap: 'break-word'
          }}
        >
          {message}
        </p>
      </div>
    </div>
  );
}

// ============ 예배 탭 ============
function WorshipTab({ verse, onDone, alreadyDone }) {
  const [mode, setMode] = useState(null); // 'short' | 'medium' | 'long'
  const [step, setStep] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!mode || done) return;
    const timer = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(timer);
  }, [mode, done]);

  if (!mode) {
    return (
      <div className="space-y-4 anim-fade-up">
        <div>
          <div className="text-[11px] text-[#8B7355] tracking-[0.2em] uppercase">WORSHIP TIME</div>
          <h2 className="font-serif-ko text-[24px] text-[#4A3F35] mt-1" style={{ fontWeight: 800 }}>
            오늘은 얼마나<br/>시간이 있으세요?
          </h2>
          <p className="text-sm text-[#8B7355] mt-2">짧아도 괜찮아요. 꾸준한 것이 가장 소중해요.</p>
        </div>

        {[
          { key: 'short', time: '5분', title: '짧고 단단하게', desc: '바쁜 평일 저녁에 딱 좋아요', color: '#7BA098', icon: '☀️' },
          { key: 'medium', time: '10분', title: '균형 잡힌 예배', desc: '찬양부터 기도까지 골고루', color: '#E9A94D', icon: '🌼' },
          { key: 'long', time: '15분', title: '여유롭게 묵상', desc: '주말 아침에 추천해요', color: '#D4756B', icon: '🌷' }
        ].map(opt => (
          <button
            key={opt.key}
            onClick={() => setMode(opt.key)}
            className="w-full paper-card rounded-[20px] p-5 text-left transition-all active:scale-[0.98] hover:shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl" style={{ background: opt.color + '20' }}>
                {opt.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-2xl font-bold" style={{ color: opt.color }}>{opt.time}</span>
                  <span className="font-display text-base font-bold text-[#4A3F35]">{opt.title}</span>
                </div>
                <div className="text-xs text-[#8B7355] mt-0.5">{opt.desc}</div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#C4B59A]" />
            </div>
          </button>
        ))}
      </div>
    );
  }

  const steps = worshipSteps[mode];
  const current = steps[step];
  const progress = ((step + 1) / steps.length) * 100;

  if (done) {
    return <WorshipComplete elapsed={elapsed} onContinue={() => { onDone(); setMode(null); setStep(0); setDone(false); setElapsed(0); }} />;
  }

  const mm = String(Math.floor(elapsed / 60)).padStart(2, '0');
  const ss = String(elapsed % 60).padStart(2, '0');

  return (
    <div className="space-y-4 anim-fade-up">
      {/* 프로그래스 + 타이머 */}
      <div className="paper-card rounded-2xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-[#8B7355]">STEP {step + 1} / {steps.length}</span>
          <div className="flex items-center gap-1 text-[#4A3F35]">
            <Clock className="w-3.5 h-3.5" />
            <span className="font-display text-sm font-bold">{mm}:{ss}</span>
          </div>
        </div>
        <div className="h-1.5 rounded-full soft-inset overflow-hidden">
          <div className="h-full rounded-full transition-all duration-500" style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #E9A94D, #D4756B)'
          }} />
        </div>
      </div>

      {/* 단계 카드 */}
      <div className="rounded-[28px] p-6 relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, #FFFDF7, #FFF4D6)',
        boxShadow: '0 8px 24px -8px rgba(74,63,53,0.15)'
      }}>
        <div className="text-7xl mb-3 anim-pop" key={step}>{current.icon}</div>
        <div className="text-[10px] tracking-[0.3em] text-[#8B5E3C] font-bold">{current.duration}</div>
        <h3 className="font-serif-ko text-2xl font-bold text-[#4A3F35] mt-1">{current.title}</h3>
        <p className="text-[15px] text-[#4A3F35] mt-3 leading-relaxed">{current.desc}</p>
        <div className="mt-4 p-3 rounded-xl bg-white/60 backdrop-blur-sm border border-[#F0E2C6]">
          <div className="text-[10px] font-bold text-[#8B5E3C] mb-1">💡 TIP</div>
          <div className="text-sm text-[#4A3F35]">{current.tip}</div>
        </div>
      </div>

      {/* 단계별 보조 콘텐츠 */}
      {current.title.includes('말씀') && (
        <div className="paper-card rounded-2xl p-4">
          <div className="text-[10px] font-bold text-[#8B5E3C] tracking-wider mb-2">오늘의 본문</div>
          <p className="font-serif-ko text-base text-[#4A3F35] leading-relaxed" style={{ fontWeight: 700 }}>
            “{verse.text}”
          </p>
          <div className="text-right mt-2 text-xs font-bold text-[#8B5E3C]">— {verse.ref}</div>
        </div>
      )}

      {current.title.includes('나눔') && (
        <div className="paper-card rounded-2xl p-4">
          <div className="text-[10px] font-bold text-[#8B5E3C] tracking-wider mb-3">나눔 질문</div>
          <div className="space-y-2">
            {familyQuestions.slice(0, 3).map((q, i) => (
              <div key={i} className="flex gap-2 text-sm text-[#4A3F35]">
                <span className="font-display font-bold text-[#E9A94D]">{i + 1}.</span>
                <span>{q}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-[#F0E2C6]">
            <div className="text-[10px] font-bold text-[#D4756B] tracking-wider mb-2">🌱 어린이를 위한 질문</div>
            <div className="text-sm text-[#4A3F35]">{kidsQuestions[Math.floor(Math.random() * kidsQuestions.length)]}</div>
          </div>
        </div>
      )}

      {current.title.includes('찬양') && (
        <div className="paper-card rounded-2xl p-4">
          <div className="text-[10px] font-bold text-[#8B5E3C] tracking-wider mb-2">오늘의 찬양 추천</div>
          <div className="grid grid-cols-2 gap-2">
            {praiseSongs.slice(0, 4).map((s, i) => (
              <div key={i} className="flex items-center gap-2 p-2 rounded-lg soft-inset">
                <Music className="w-3 h-3 text-[#E9A94D]" />
                <span className="text-xs text-[#4A3F35] truncate">{s}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 다음/이전 */}
      <div className="flex gap-2">
        {step > 0 && (
          <button
            onClick={() => setStep(step - 1)}
            className="paper-card px-5 py-4 rounded-2xl flex items-center gap-1 text-sm font-bold text-[#4A3F35]"
          >
            <ChevronLeft className="w-4 h-4" /> 이전
          </button>
        )}
        <button
          onClick={() => step === steps.length - 1 ? setDone(true) : setStep(step + 1)}
          className="flex-1 py-4 rounded-2xl font-display text-lg font-bold text-white flex items-center justify-center gap-2"
          style={{
            background: 'linear-gradient(135deg, #4A3F35, #2D3436)',
            boxShadow: '0 8px 20px -8px rgba(74,63,53,0.4)'
          }}
        >
          {step === steps.length - 1 ? '예배 마치기 🙏' : '다음 순서로'}
          {step !== steps.length - 1 && <ChevronRight className="w-5 h-5" />}
        </button>
      </div>

      {step === 0 && (
        <button
          onClick={() => setMode(null)}
          className="w-full text-xs text-[#8B7355] underline"
        >
          시간 다시 고르기
        </button>
      )}
    </div>
  );
}

function WorshipComplete({ elapsed, onContinue }) {
  const mm = Math.floor(elapsed / 60);
  return (
    <div className="pt-8 text-center anim-fade-up">
      {/* 로고몽 + 별: 안전한 flex column 레이아웃 */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative">
          <Logomong size={180} animate="celebrate" glow />
          {/* 별을 로고몽 우측 상단에 작게 띄움 (컨테이너 안에서 안전하게) */}
          <div
            className="absolute text-4xl anim-pop"
            style={{
              top: '-8px',
              right: '-8px',
              filter: 'drop-shadow(0 2px 8px rgba(255,200,80,0.6))'
            }}
          >
            🌟
          </div>
        </div>
      </div>
      <h2 className="font-serif-ko text-3xl font-bold text-[#4A3F35] mt-4" style={{ fontWeight: 800 }}>
        예배를 잘 마쳤어요
      </h2>
      <p className="text-[#8B7355] mt-2">오늘 {mm}분 동안 함께 하나님 앞에 섰어요</p>

      <div className="mt-8 paper-card rounded-[28px] p-6 text-left">
        <div className="text-center mb-4">
          <div className="inline-block px-4 py-1.5 rounded-full text-white text-xs font-bold" style={{
            background: 'linear-gradient(135deg, #E9A94D, #D4756B)'
          }}>
            +3 스티커 획득!
          </div>
        </div>
        <div
          className="font-serif-ko text-[15px] text-[#4A3F35] leading-relaxed text-center"
          style={{ fontWeight: 700, wordBreak: 'keep-all' }}
        >
          “주께서 너에게 복을 주시고<br/>너를 지키시기를 원하며<br/>
          주께서 그 얼굴을 네게 비추사<br/>은혜 베푸시기를 원하노라”
        </div>
        <div className="text-center mt-3 text-xs text-[#8B5E3C] font-bold">민수기 6:24-25</div>
      </div>

      <button
        onClick={onContinue}
        className="mt-8 w-full py-4 rounded-2xl font-display text-lg font-bold text-white"
        style={{ background: 'linear-gradient(135deg, #7BA098, #5B9AA0)' }}
      >
        홈으로 돌아가기
      </button>
    </div>
  );
}

// ============ 어린이 탭 ============
function KidsTab({ stickers, completedStories, onCompleteStory, onEarnSticker }) {
  const [view, setView] = useState('home'); // 'home' | 'story' | 'quiz'
  const [selectedStory, setSelectedStory] = useState(null);

  if (view === 'story' && selectedStory) {
    return <StoryView story={selectedStory} onBack={() => setView('home')} onComplete={() => {
      onCompleteStory(selectedStory.id);
      setView('home');
    }} completed={completedStories.includes(selectedStory.id)} />;
  }

  if (view === 'quiz') {
    return <QuizView onBack={() => setView('home')} onCorrect={() => onEarnSticker(1)} />;
  }

  const kidsMessages = [
    "오늘은 어떤 성경 이야기 들어볼까?",
    "스티커 모으는 재미가 쏠쏠해요!",
    "퀴즈로 말씀을 더 잘 기억해요",
    "예수님은 너를 정말 사랑하셔",
    "오늘도 멋진 하루를 보내자!",
    "성경 속에는 보물 같은 이야기가 가득해",
  ];
  const todayMsg = kidsMessages[new Date().getDate() % kidsMessages.length];

  return (
    <div className="space-y-5 anim-fade-up">
      <div>
        <div className="text-[11px] text-[#8B7355] tracking-[0.2em] uppercase">FOR KIDS</div>
        <h2 className="font-serif-ko text-[24px] text-[#4A3F35] mt-1" style={{ fontWeight: 800 }}>
          어린이 <span className="shine-text">천국</span> 🌱
        </h2>
      </div>

      {/* 로고몽 인사 카드 */}
      <div className="rounded-[24px] p-5 relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, #FFF4D6 0%, #FFE9B5 50%, #FFD4A3 100%)',
        boxShadow: '0 10px 28px -10px rgba(233,169,77,0.4)'
      }}>
        <div className="absolute top-2 right-2 text-2xl opacity-30 anim-float">✨</div>
        <div className="absolute bottom-3 left-3 text-xl opacity-30 anim-float" style={{ animationDelay: '1s' }}>⭐</div>
        <LogomongSpeech message={todayMsg} size={200} color="#E9A94D" />
      </div>

      {/* 스티커 통 */}
      <div className="rounded-[24px] p-5 relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, #FFE7B5 0%, #FFD4A3 100%)'
      }}>
        <div className="absolute -top-4 -right-2 text-6xl anim-float">⭐</div>
        <div className="relative">
          <div className="text-[10px] font-bold text-[#8B5E3C] tracking-wider">MY STICKERS</div>
          <div className="font-display text-5xl font-bold text-[#4A3F35] mt-1">
            {stickers}<span className="text-2xl text-[#8B5E3C]"> 개</span>
          </div>
          <div className="text-sm text-[#8B5E3C] mt-1">우와! 많이 모았어요 ✨</div>
          <div className="mt-3 flex gap-1">
            {[...Array(Math.min(stickers, 10))].map((_, i) => (
              <div key={i} className="text-lg anim-pop" style={{ animationDelay: (i * 0.05) + 's' }}>
                {['🌟', '💫', '⭐', '✨', '🌠'][i % 5]}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 퀴즈 버튼 */}
      <button
        onClick={() => setView('quiz')}
        className="w-full rounded-[24px] p-5 text-left relative overflow-hidden transition-transform active:scale-[0.98]"
        style={{
          background: 'linear-gradient(135deg, #A8C686 0%, #7BA098 100%)',
          boxShadow: '0 8px 20px -8px rgba(123,160,152,0.5)'
        }}
      >
        <div className="absolute -right-2 -bottom-2 text-7xl opacity-30">🎯</div>
        <div className="relative">
          <div className="text-[10px] tracking-[0.2em] text-white/80 font-bold">DAILY QUIZ</div>
          <div className="font-display text-2xl font-bold text-white mt-1">오늘의 성경 퀴즈</div>
          <div className="text-sm text-white/90 mt-0.5">맞히면 스티커 +1 🌟</div>
        </div>
      </button>

      {/* 성경 이야기 */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="font-display text-xl font-bold text-[#4A3F35]">📚 성경 이야기</h3>
          <span className="text-xs text-[#8B7355]">{completedStories.length}/{bibleStories.length} 완료</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {bibleStories.map(story => {
            const done = completedStories.includes(story.id);
            return (
              <button
                key={story.id}
                onClick={() => { setSelectedStory(story); setView('story'); }}
                className="paper-card rounded-2xl p-4 text-left relative overflow-hidden transition-all active:scale-95"
              >
                {done && (
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: story.color }}>
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                )}
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-3xl mb-2" style={{ background: story.color + '25' }}>
                  {story.emoji}
                </div>
                <div className="font-display text-base font-bold text-[#4A3F35] leading-tight">{story.title}</div>
                <div className="text-[10px] font-bold mt-1" style={{ color: story.color }}>#{story.theme}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 오늘의 미션 */}
      <div className="paper-card rounded-[20px] p-5">
        <div className="flex items-center gap-2 mb-2">
          <Gift className="w-4 h-4 text-[#D4756B]" />
          <span className="font-display text-lg font-bold text-[#4A3F35]">오늘의 사랑 미션</span>
        </div>
        <div className="soft-inset rounded-xl p-3 text-sm text-[#4A3F35]">
          🤗 가족 한 사람에게 “고마워” 라고 말해보기
        </div>
        <button
          onClick={() => onEarnSticker(1)}
          className="mt-3 w-full py-2.5 rounded-xl text-white text-sm font-bold"
          style={{ background: 'linear-gradient(135deg, #D4756B, #E9A94D)' }}
        >
          해냈어요! 스티커 받기 🌟
        </button>
      </div>
    </div>
  );
}

function StoryView({ story, onBack, onComplete, completed }) {
  return (
    <div className="space-y-4 anim-fade-up">
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-[#8B7355]">
        <ChevronLeft className="w-4 h-4" /> 돌아가기
      </button>

      <div className="rounded-[28px] p-8 text-center relative overflow-hidden" style={{
        background: `linear-gradient(135deg, ${story.color}30, ${story.color}10)`,
      }}>
        <div className="text-8xl mb-4 anim-pop">{story.emoji}</div>
        <h2 className="font-display text-3xl font-bold text-[#4A3F35]">{story.title}</h2>
        <div className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: story.color }}>
          #{story.theme}
        </div>
      </div>

      <div className="paper-card rounded-2xl p-5">
        <div className="text-[10px] font-bold text-[#8B5E3C] tracking-wider mb-3">오늘의 이야기 ✨</div>
        <p className="text-[15px] text-[#4A3F35] leading-[1.9] font-body whitespace-pre-line">
          {story.story}
        </p>
        <div className="mt-5 p-4 rounded-xl flex items-start gap-3" style={{ background: story.color + '15' }}>
          <Logomong size={110} animate="bounce" className="flex-shrink-0 mt-1" />
          <div className="flex-1">
            <div className="text-[10px] font-bold tracking-wider mb-1" style={{ color: story.color }}>💡 로고몽이 알려주는 오늘의 배움</div>
            <div className="text-sm text-[#4A3F35] font-bold leading-relaxed">{story.lesson}</div>
          </div>
        </div>
      </div>

      {/* 성경 구절 카드 */}
      <div className="rounded-2xl p-5 relative overflow-hidden" style={{
        background: `linear-gradient(135deg, ${story.color}20, #FFF8EC)`,
        border: `1px solid ${story.color}40`
      }}>
        <div className="absolute -right-4 -top-4 text-5xl opacity-20">📖</div>
        <div className="relative">
          <div className="flex items-center gap-1.5 mb-2">
            <Feather className="w-3 h-3" style={{ color: story.color }} />
            <span className="text-[10px] font-bold tracking-[0.2em]" style={{ color: story.color }}>
              BIBLE VERSE
            </span>
          </div>
          <p className="font-serif-ko text-[15px] leading-[1.7] text-[#4A3F35]" style={{ fontWeight: 700 }}>
            “{story.verse.text}”
          </p>
          <div className="mt-3 flex items-center gap-2">
            <div className="h-px flex-1" style={{ background: story.color + '50' }} />
            <span className="font-display text-sm font-bold" style={{ color: story.color }}>
              {story.verse.ref}
            </span>
          </div>
        </div>
      </div>

      <div className="paper-card rounded-2xl p-5">
        <div className="font-display text-lg font-bold text-[#4A3F35] mb-3">🗣️ 가족과 이야기해봐요</div>
        <div className="space-y-2">
          {['이 이야기에서 제일 기억에 남는 장면은?', '나라면 어떻게 했을까?', '하나님이 오늘 나에게 주시는 말씀은?'].map((q, i) => (
            <div key={i} className="flex gap-2 text-sm text-[#4A3F35]">
              <span className="font-display font-bold" style={{ color: story.color }}>Q{i + 1}</span>
              <span>{q}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onComplete}
        disabled={completed}
        className="w-full py-4 rounded-2xl font-display text-lg font-bold text-white disabled:opacity-50"
        style={{
          background: completed ? '#C4B59A' : `linear-gradient(135deg, ${story.color}, #4A3F35)`,
          boxShadow: '0 8px 20px -8px rgba(74,63,53,0.4)'
        }}
      >
        {completed ? '이미 읽었어요 ✓' : '다 읽었어요! 🌟 (+1 스티커)'}
      </button>
    </div>
  );
}

function QuizView({ onBack, onCorrect }) {
  const [qIdx] = useState(() => Math.floor(Math.random() * dailyQuiz.length));
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const q = dailyQuiz[qIdx];

  const choose = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === q.answer;
    setResult(correct);
    if (correct) onCorrect();
  };

  return (
    <div className="space-y-4 anim-fade-up">
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-[#8B7355]">
        <ChevronLeft className="w-4 h-4" /> 돌아가기
      </button>

      <div className="rounded-[28px] p-6" style={{
        background: 'linear-gradient(135deg, #A8C686 30%, #7BA098 100%)'
      }}>
        <div className="text-[10px] tracking-[0.3em] text-white/80 font-bold">QUIZ</div>
        <div className="font-display text-2xl text-white font-bold mt-1 leading-tight">
          {q.q}
        </div>
      </div>

      <div className="space-y-2">
        {q.options.map((opt, i) => {
          const isChosen = selected === i;
          const isAnswer = i === q.answer;
          let bg = '#FFFDF7', color = '#4A3F35', border = '#F0E2C6';
          if (selected !== null) {
            if (isAnswer) { bg = '#A8C686'; color = 'white'; border = '#A8C686'; }
            else if (isChosen) { bg = '#D4756B'; color = 'white'; border = '#D4756B'; }
          }
          return (
            <button
              key={i}
              onClick={() => choose(i)}
              className="w-full p-4 rounded-2xl text-left font-display text-lg font-bold transition-all flex items-center justify-between"
              style={{ background: bg, color, border: `1px solid ${border}` }}
            >
              <span>{['🍎', '🍊', '🍇', '🍓'][i]} {opt}</span>
              {selected !== null && isAnswer && <Check className="w-5 h-5" strokeWidth={3} />}
              {selected !== null && isChosen && !isAnswer && <X className="w-5 h-5" strokeWidth={3} />}
            </button>
          );
        })}
      </div>

      {result !== null && (
        <div className="paper-card rounded-2xl p-5 text-center anim-pop">
          <div className="text-5xl mb-2">{result ? '🎉' : '💪'}</div>
          <div className="font-display text-xl font-bold text-[#4A3F35]">
            {result ? '정답이에요! +1 🌟' : '아쉬워요. 괜찮아요!'}
          </div>
          <div className="text-sm text-[#8B7355] mt-1">
            {result ? '잘했어요!' : '다음엔 맞힐 수 있어요.'}
          </div>
          <button onClick={onBack} className="mt-4 px-5 py-2 rounded-full text-white text-sm font-bold" style={{
            background: 'linear-gradient(135deg, #E9A94D, #D4756B)'
          }}>
            돌아가기
          </button>
        </div>
      )}
    </div>
  );
}

// ============ 기도 탭 ============
function PrayerTab({ prayers, answered, onAdd, onAnswer, onDelete }) {
  const [text, setText] = useState('');
  const [view, setView] = useState('active'); // 'active' | 'answered'

  return (
    <div className="space-y-4 anim-fade-up">
      <div>
        <div className="text-[11px] text-[#8B7355] tracking-[0.2em] uppercase">PRAYER NOTES</div>
        <h2 className="font-serif-ko text-[24px] text-[#4A3F35] mt-1" style={{ fontWeight: 800 }}>
          우리 가족의 <span className="shine-text">기도 노트</span>
        </h2>
      </div>

      {/* 입력 */}
      <div className="paper-card rounded-[20px] p-4">
        <div className="flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="기도 제목을 적어보세요..."
            className="flex-1 px-3 py-2.5 rounded-xl soft-inset text-sm text-[#4A3F35] outline-none font-body"
            onKeyDown={(e) => { if (e.key === 'Enter') { onAdd(text); setText(''); } }}
          />
          <button
            onClick={() => { onAdd(text); setText(''); }}
            className="w-11 h-11 rounded-xl flex items-center justify-center text-white"
            style={{ background: 'linear-gradient(135deg, #D4756B, #E9A94D)' }}
          >
            <Plus className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* 탭 */}
      <div className="flex gap-2 px-1">
        <button
          onClick={() => setView('active')}
          className="flex-1 py-2.5 rounded-xl font-display text-sm font-bold transition-all"
          style={{
            background: view === 'active' ? '#4A3F35' : '#FFFDF7',
            color: view === 'active' ? 'white' : '#4A3F35',
            border: '1px solid #F0E2C6'
          }}
        >
          🙏 기도 중 ({prayers.length})
        </button>
        <button
          onClick={() => setView('answered')}
          className="flex-1 py-2.5 rounded-xl font-display text-sm font-bold transition-all"
          style={{
            background: view === 'answered' ? '#4A3F35' : '#FFFDF7',
            color: view === 'answered' ? 'white' : '#4A3F35',
            border: '1px solid #F0E2C6'
          }}
        >
          ✨ 응답 ({answered.length})
        </button>
      </div>

      {/* 리스트 */}
      {view === 'active' ? (
        <div className="space-y-2">
          {prayers.length === 0 ? (
            <div className="paper-card rounded-2xl p-8 text-center">
              <div className="mb-4 flex justify-center">
                <Logomong size={180} animate="wiggle" />
              </div>
              <div className="font-display text-base text-[#4A3F35] font-bold">아직 기도 제목이 없어요</div>
              <div className="text-xs text-[#8B7355] mt-1">오늘 하나님께 드리고 싶은 기도를 적어보세요</div>
            </div>
          ) : prayers.map(p => (
            <div key={p.id} className="paper-card rounded-2xl p-4 anim-fade-up">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#D4756B20' }}>
                  <Heart className="w-4 h-4 text-[#D4756B]" fill="#D4756B" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-[#4A3F35] leading-relaxed">{p.text}</div>
                  <div className="text-[10px] text-[#8B7355] mt-1">{p.date}</div>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => onAnswer(p.id)}
                  className="flex-1 py-2 rounded-lg text-xs font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #A8C686, #7BA098)' }}
                >
                  ✨ 응답받았어요 (+2🌟)
                </button>
                <button
                  onClick={() => onDelete(p.id)}
                  className="px-3 py-2 rounded-lg text-xs text-[#8B7355] soft-inset"
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {answered.length === 0 ? (
            <div className="paper-card rounded-2xl p-8 text-center">
              <div className="mb-4 flex justify-center">
                <Logomong size={180} animate="float" glow />
              </div>
              <div className="font-display text-base text-[#4A3F35] font-bold">응답 받은 기도가 여기에 쌓여요</div>
              <div className="text-xs text-[#8B7355] mt-1">하나님의 신실하심을 기록해요</div>
            </div>
          ) : answered.map(p => (
            <div key={p.id} className="rounded-2xl p-4 relative overflow-hidden" style={{
              background: 'linear-gradient(135deg, #E8F4E4, #F0EBDA)'
            }}>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-white">
                  <Sparkles className="w-4 h-4 text-[#5A7A52]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-[#4A3F35] leading-relaxed line-through opacity-60">{p.text}</div>
                  <div className="text-[10px] text-[#5A7A52] font-bold mt-1">✨ {p.answeredDate} 응답</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============ 채널 탭 ============
function ChannelTab() {
  const defaultIdx = Math.max(0, PLAYLISTS.findIndex(p => p.recommended));
  const [selectedIdx, setSelectedIdx] = useState(defaultIdx);
  const current = PLAYLISTS[selectedIdx];
  const validReady = isValidPlaylistId(current.id);

  return (
    <div className="space-y-4 anim-fade-up">
      <div>
        <div className="text-[11px] text-[#8B7355] tracking-[0.2em] uppercase">SERMON PLAYLISTS</div>
        <h2 className="font-serif-ko text-[24px] text-[#4A3F35] mt-1" style={{ fontWeight: 800 }}>
          <span className="shine-text">말씀의지혜</span> 단일 재생목록
        </h2>
        <p className="text-xs text-[#8B7355] mt-1">주제별 4개 시리즈를 앱에서 바로 시청</p>
      </div>

      {/* 현재 선택된 재생목록 카드 (헤더) */}
      <div className="rounded-[20px] p-4 flex items-center gap-3 transition-all" style={{
        background: `linear-gradient(135deg, ${current.color}25, ${current.color}08)`,
        border: `1px solid ${current.color}40`
      }}>
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0" style={{
          background: 'white',
          boxShadow: `0 4px 12px -4px ${current.color}60`
        }}>
          {current.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-[9px] font-bold tracking-wider px-1.5 py-0.5 rounded text-white" style={{ background: current.color }}>
              #{current.tag}
            </span>
            <span className="text-[10px] text-[#8B7355]">{current.count}편</span>
          </div>
          <div className="font-display text-base font-bold text-[#4A3F35] leading-tight truncate">
            {current.title}
          </div>
          <div className="text-[11px] text-[#8B7355] mt-0.5 truncate">{current.subtitle}</div>
        </div>
      </div>

      {/* 플레이어 */}
      {validReady ? (
        <div className="rounded-[20px] overflow-hidden paper-card">
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, background: '#000' }}>
            <iframe
              key={current.id}
              src={`https://www.youtube.com/embed/videoseries?list=${current.id}&rel=0&modestbranding=1`}
              title={current.title}
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              style={{
                position: 'absolute', top: 0, left: 0,
                width: '100%', height: '100%', border: 0
              }}
            />
          </div>
          <div className="p-3 flex items-center justify-between">
            <div className="text-[10px] text-[#8B7355]">
              ▶ 앱 안에서 자동 재생 · 전체화면 지원
            </div>
            <a
              href={`https://www.youtube.com/playlist?list=${current.id}`}
              target="_blank"
              rel="noreferrer"
              className="px-2.5 py-1 rounded-full text-[10px] font-bold text-white"
              style={{ background: current.color }}
            >
              YouTube ↗
            </a>
          </div>
        </div>
      ) : (
        <PlaylistSetupGuide />
      )}

      {/* 재생목록 선택 그리드 */}
      <div>
        <div className="flex items-center justify-between mb-2 px-1">
          <h3 className="font-display text-lg font-bold text-[#4A3F35]">📚 재생목록 선택</h3>
          <span className="text-[10px] text-[#8B7355]">탭하여 전환</span>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {PLAYLISTS.map((p, i) => {
            const selected = i === selectedIdx;
            const ready = isValidPlaylistId(p.id);
            return (
              <button
                key={i}
                onClick={() => setSelectedIdx(i)}
                className="relative rounded-2xl p-3 text-left transition-all active:scale-95"
                style={{
                  background: selected ? `linear-gradient(135deg, ${p.color}, ${p.color}dd)` : '#FFFDF7',
                  border: selected ? `1px solid ${p.color}` : '1px solid #F0E2C6',
                  boxShadow: selected ? `0 8px 20px -8px ${p.color}80` : '0 1px 2px rgba(74,63,53,0.04)'
                }}
              >
                {!ready && (
                  <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold" style={{
                    background: '#FFE0C7', color: '#D4756B'
                  }}>!</div>
                )}
                {selected && ready && (
                  <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-white flex items-center justify-center">
                    <Check className="w-2.5 h-2.5" style={{ color: p.color }} strokeWidth={3.5} />
                  </div>
                )}
                <div className="text-2xl mb-1.5">{p.icon}</div>
                <div className="font-display text-[13px] font-bold leading-tight line-clamp-2" style={{
                  color: selected ? 'white' : '#4A3F35'
                }}>
                  {p.title}
                </div>
                <div className="flex items-center gap-1 mt-1.5">
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{
                    background: selected ? 'rgba(255,255,255,0.25)' : p.color + '20',
                    color: selected ? 'white' : p.color
                  }}>
                    #{p.tag}
                  </span>
                  <span className="text-[9px]" style={{ color: selected ? 'rgba(255,255,255,0.8)' : '#8B7355' }}>
                    {p.count}편
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 활용 팁 */}
      <div className="paper-card rounded-2xl p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{
            background: 'linear-gradient(135deg, #FFF4D6, #FFE0C7)'
          }}>
            <Sparkles className="w-5 h-5 text-[#E9A94D]" />
          </div>
          <div className="flex-1">
            <div className="font-display text-base font-bold text-[#4A3F35] leading-tight">
              이럴 때 이 재생목록을
            </div>
            <ul className="mt-2 space-y-1.5 text-xs text-[#4A3F35] leading-relaxed">
              <li className="flex gap-2"><span style={{ color: '#E9A94D' }} className="font-bold">☀️</span><span><b>매일 10분 말씀 산책</b> — 아침 QT · 가정예배 전</span></li>
              <li className="flex gap-2"><span style={{ color: '#9B7EBD' }} className="font-bold">🕊️</span><span><b>기도해도 응답 없을 때</b> — 기도가 막막할 때</span></li>
              <li className="flex gap-2"><span style={{ color: '#7BA098' }} className="font-bold">🌿</span><span><b>번아웃 크리스천</b> — 관계에 지쳤을 때</span></li>
              <li className="flex gap-2"><span style={{ color: '#5B9AA0' }} className="font-bold">🌊</span><span><b>고난 중의 기다림</b> — 긴 터널을 지날 때</span></li>
              <li className="flex gap-2"><span style={{ color: '#C9A961' }} className="font-bold">🧭</span><span><b>하나님의 뜻 분별</b> — 중요한 결정 앞에서</span></li>
              <li className="flex gap-2"><span style={{ color: '#D4756B' }} className="font-bold">💰</span><span><b>크리스천 재정</b> — 재정 불안이 있을 때</span></li>
            </ul>
          </div>
        </div>
      </div>

      {/* 채널 카드 */}
      <a
        href={`https://www.youtube.com/channel/${CHANNEL_ID}`}
        target="_blank"
        rel="noreferrer"
        className="block rounded-[24px] overflow-hidden relative transition-transform active:scale-[0.98]"
        style={{
          background: 'linear-gradient(135deg, #2D3436, #4A3F35)',
          boxShadow: '0 10px 28px -12px rgba(74,63,53,0.45)'
        }}
      >
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 20% 20%, #E9A94D 0%, transparent 40%), radial-gradient(circle at 80% 80%, #D4756B 0%, transparent 40%)'
        }} />
        <div className="relative p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{
            background: 'linear-gradient(135deg, #E9A94D, #D4756B)'
          }}>
            <BookOpen className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-serif-ko text-xl font-bold text-white">말씀의지혜 채널</div>
            <div className="text-[11px] text-white/70 mt-0.5">전체 영상 · 구독 · 알림 설정</div>
          </div>
          <ChevronRight className="w-5 h-5 text-white/70" />
        </div>
      </a>
    </div>
  );
}

function PlaylistSetupGuide() {
  return (
    <div className="rounded-[20px] p-5 relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #FFF4D6, #FFE0C7)',
      border: '2px dashed #E9A94D'
    }}>
      <div className="absolute -right-4 -top-4 text-6xl opacity-20">📺</div>
      <div className="relative">
        <div className="inline-block px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-sm mb-2">
          <span className="text-[10px] font-bold text-[#8B5E3C] tracking-wider">⚙️ SETUP NEEDED</span>
        </div>
        <div className="font-display text-lg font-bold text-[#4A3F35] leading-tight">
          이 재생목록의 ID가<br/>아직 설정되지 않았어요
        </div>

        <div className="mt-4 space-y-2">
          <StepRow num="1" text="YouTube Studio → 콘텐츠 → 재생목록" />
          <StepRow num="2" text="해당 재생목록 제목 클릭" />
          <StepRow num="3" text="'YouTube에서 보기' 클릭 후 URL 복사" />
          <StepRow num="4" text="코드 상단 PLAYLISTS 배열의 id 값에 붙여넣기" />
        </div>

        <div className="mt-4 p-3 rounded-xl bg-white/70 backdrop-blur-sm">
          <div className="text-[10px] font-bold text-[#8B5E3C] tracking-wider mb-1">📋 예시 URL</div>
          <div className="font-mono text-[10px] text-[#4A3F35] break-all leading-relaxed">
            youtube.com/playlist?list=<span className="font-bold text-[#D4756B]">PLrAXtmErZgOe...</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepRow({ num, text }) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[11px] font-bold text-white" style={{
        background: 'linear-gradient(135deg, #E9A94D, #D4756B)'
      }}>
        {num}
      </div>
      <div className="text-xs text-[#4A3F35] leading-relaxed pt-0.5">{text}</div>
    </div>
  );
}

// ============ 웰컴 게이트 (앱 첫 진입) ============
function WelcomeGate({ onEnter, verse }) {
  const rec = getRecommendedCategory();
  const msg = getWelcomeMessage();
  const willPlay = rec.tracks.find(t => isValidUrl(t.url));
  const [particles] = useState(() =>
    [...Array(18)].map(() => ({
      left: Math.random() * 100,
      size: 2 + Math.random() * 4,
      duration: 8 + Math.random() * 10,
      delay: Math.random() * 12,
      opacity: 0.25 + Math.random() * 0.45
    }))
  );

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden" style={{
      background: `linear-gradient(180deg, ${rec.color} 0%, ${rec.color}dd 45%, ${rec.color}99 100%)`
    }}>
      <style>{`
        @keyframes particleRise {
          0% { transform: translateY(110vh); opacity: 0; }
          10% { opacity: var(--o, 0.5); }
          90% { opacity: var(--o, 0.5); }
          100% { transform: translateY(-10vh); opacity: 0; }
        }
        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 0.15; }
          50% { transform: scale(1.2); opacity: 0.3; }
        }
        @keyframes welcomeFadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .particle {
          position: absolute;
          border-radius: 50%;
          background: white;
          pointer-events: none;
          animation: particleRise linear infinite;
        }
        .breath-orb {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.4), transparent 70%);
          animation: breathe 6s ease-in-out infinite;
        }
        .welcome-fade { animation: welcomeFadeIn 0.9s ease-out forwards; opacity: 0; }
        .welcome-fade-1 { animation-delay: 0.1s; }
        .welcome-fade-2 { animation-delay: 0.3s; }
        .welcome-fade-3 { animation-delay: 0.5s; }
        .welcome-fade-4 { animation-delay: 0.75s; }
      `}</style>

      {/* 호흡하는 빛 orb들 */}
      <div className="breath-orb" style={{ width: '320px', height: '320px', top: '10%', left: '-10%' }} />
      <div className="breath-orb" style={{ width: '280px', height: '280px', bottom: '10%', right: '-15%', animationDelay: '2s' }} />

      {/* 파티클 */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              '--o': p.opacity
            }}
          />
        ))}
      </div>

      {/* 컨텐츠 */}
      <div className="relative max-w-[480px] mx-auto h-full flex flex-col items-center justify-center px-8 py-12">
        {/* 시간대 아이콘 + 로고몽 */}
        <div className="relative welcome-fade welcome-fade-1">
          <div className="w-40 h-40 rounded-full flex items-center justify-center text-8xl bg-white/15 backdrop-blur-md" style={{
            boxShadow: '0 20px 60px -10px rgba(0,0,0,0.25)'
          }}>
            <span className="anim-float" style={{ animationDuration: '4s' }}>{rec.icon}</span>
          </div>
          <div className="absolute -inset-3 rounded-full border border-white/20 pointer-events-none anim-rotate" style={{ animationDuration: '30s' }} />
          <div className="absolute -inset-7 rounded-full border border-white/10 pointer-events-none anim-rotate" style={{ animationDuration: '45s', animationDirection: 'reverse' }} />

          {/* 로고몽이 빼꼼! */}
          <div className="absolute -right-16 -bottom-10 anim-peek">
            <Logomong size={200} animate="bounce" glow />
          </div>
        </div>

        {/* 인사말 */}
        <div className="mt-8 text-center welcome-fade welcome-fade-2">
          <div className="text-[10px] tracking-[0.35em] text-white/70 font-bold mb-3 uppercase">
            {msg.ambient}
          </div>
          <h1 className="font-serif-ko text-[28px] font-bold text-white leading-tight" style={{ fontWeight: 800 }}>
            {msg.greeting}
          </h1>
          <p className="text-sm text-white/90 leading-relaxed mt-3 whitespace-pre-line">
            {msg.subtext}
          </p>
        </div>

        {/* 오늘의 말씀 */}
        <div className="mt-8 w-full rounded-[22px] p-5 bg-white/12 backdrop-blur-md border border-white/20 welcome-fade welcome-fade-3">
          <div className="flex items-center gap-1.5 mb-2">
            <Feather className="w-3 h-3 text-white/90" />
            <span className="text-[10px] font-bold tracking-[0.2em] text-white/90">오늘의 말씀</span>
          </div>
          <p className="font-serif-ko text-[14px] text-white leading-[1.7]" style={{ fontWeight: 700 }}>
            “{verse.text}”
          </p>
          <div className="mt-2 flex items-center gap-2">
            <div className="h-px flex-1 bg-white/30" />
            <span className="text-[11px] font-bold text-white/90">{verse.ref}</span>
          </div>
        </div>

        {/* 들어가기 버튼 */}
        <button
          onClick={onEnter}
          className="mt-8 w-full py-4 rounded-[20px] bg-white font-display text-lg font-bold flex items-center justify-center gap-2 transition-transform active:scale-[0.97] welcome-fade welcome-fade-4"
          style={{
            color: rec.color,
            boxShadow: '0 15px 40px -10px rgba(0,0,0,0.35)'
          }}
        >
          {willPlay ? (
            <>
              <Music2 className="w-5 h-5" />
              찬양과 함께 들어가기
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              오늘의 예배 시작하기
            </>
          )}
        </button>

        {willPlay && (
          <div className="mt-3 flex items-center gap-1.5 welcome-fade welcome-fade-4">
            <div className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse" />
            <span className="text-[11px] text-white/80">
              곧 재생될 곡 · <b className="text-white">{willPlay.title}</b>
            </span>
          </div>
        )}

        {!willPlay && (
          <div className="mt-3 text-[10px] text-white/70 text-center welcome-fade welcome-fade-4 px-4">
            ※ BGM 파일을 연결하면 이 시간대에 어울리는<br/>
            찬양이 자동으로 흘러나와요
          </div>
        )}

        {/* 베타 버전 안내 */}
        <div className="mt-6 welcome-fade welcome-fade-4 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <span className="text-[9px] font-bold tracking-[0.2em] text-white/90">BETA</span>
            <span className="text-[10px] text-white/70">·</span>
            <span className="text-[10px] text-white/80 font-bold">v{APP_VERSION}</span>
            <span className="text-[10px] text-white/70">·</span>
            <span className="text-[10px] text-white/80">함께 만들어가요</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ BGM 탭 (찬양쉼터) ============
function BGMTab({ bgmControls }) {
  const [selectedCat, setSelectedCat] = useState(() => getRecommendedCategory());
  const hasAnyUrl = BGM_CATEGORIES.some(c => c.tracks.some(t => isValidUrl(t.url)));
  const allTracks = BGM_CATEGORIES.flatMap(c => c.tracks.map(t => ({ ...t, category: c })));
  const favoriteTracks = allTracks.filter(t => bgmControls.favorites.includes(t.id));

  return (
    <div className="space-y-4 anim-fade-up">
      <div>
        <div className="text-[11px] text-[#8B7355] tracking-[0.2em] uppercase">SACRED SOUNDS</div>
        <h2 className="font-serif-ko text-[24px] text-[#4A3F35] mt-1" style={{ fontWeight: 800 }}>
          우리집 <span className="shine-text">찬양쉼터</span> 🎵
        </h2>
        <p className="text-xs text-[#8B7355] mt-1">하루의 모든 순간, 찬양과 함께하세요</p>
      </div>

      {!hasAnyUrl && <BGMSetupGuide />}

      {/* 시간대별 추천 (지금 이 시간에) */}
      <RecommendedNow bgmControls={bgmControls} />

      {/* 카테고리 그리드 */}
      <div>
        <div className="flex items-center justify-between mb-2 px-1">
          <h3 className="font-display text-lg font-bold text-[#4A3F35]">🎨 장르별 찬양</h3>
          <span className="text-[10px] text-[#8B7355]">탭하여 전환</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {BGM_CATEGORIES.map((c) => {
            const selected = c.id === selectedCat.id;
            const ready = c.tracks.some(t => isValidUrl(t.url));
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCat(c)}
                className="relative rounded-2xl p-3 text-center transition-all active:scale-95"
                style={{
                  background: selected ? `linear-gradient(135deg, ${c.color}, ${c.color}dd)` : '#FFFDF7',
                  border: selected ? `1px solid ${c.color}` : '1px solid #F0E2C6',
                  boxShadow: selected ? `0 8px 20px -8px ${c.color}80` : '0 1px 2px rgba(74,63,53,0.04)'
                }}
              >
                {!ready && (
                  <div className="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-bold" style={{
                    background: '#FFE0C7', color: '#D4756B'
                  }}>!</div>
                )}
                <div className="text-2xl mb-1">{c.icon}</div>
                <div className="font-display text-[11px] font-bold leading-tight" style={{
                  color: selected ? 'white' : '#4A3F35'
                }}>
                  {c.name}
                </div>
                <div className="text-[9px] mt-0.5" style={{ color: selected ? 'rgba(255,255,255,0.8)' : '#8B7355' }}>
                  {c.tracks.length}곡
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 선택된 카테고리의 곡 리스트 */}
      <div className="paper-card rounded-[20px] p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-lg" style={{
            background: selectedCat.color + '25'
          }}>
            {selectedCat.icon}
          </div>
          <div className="flex-1">
            <div className="font-display text-base font-bold text-[#4A3F35] leading-none">{selectedCat.name}</div>
            <div className="text-[10px] text-[#8B7355] mt-0.5">{selectedCat.desc}</div>
          </div>
        </div>
        <div className="space-y-1.5">
          {selectedCat.tracks.map((t, i) => (
            <TrackRow
              key={t.id}
              track={t}
              category={selectedCat}
              index={i}
              bgmControls={bgmControls}
            />
          ))}
        </div>
      </div>

      {/* 즐겨찾기 */}
      {favoriteTracks.length > 0 && (
        <div className="paper-card rounded-[20px] p-4">
          <div className="flex items-center gap-2 mb-3">
            <Heart className="w-4 h-4 text-[#D4756B]" fill="#D4756B" />
            <div className="font-display text-base font-bold text-[#4A3F35]">우리집 플레이리스트</div>
            <span className="text-[10px] text-[#8B7355] ml-auto">{favoriteTracks.length}곡</span>
          </div>
          <div className="space-y-1.5">
            {favoriteTracks.map((t, i) => (
              <TrackRow
                key={t.id}
                track={t}
                category={t.category}
                index={i}
                bgmControls={bgmControls}
                showCategoryIcon
              />
            ))}
          </div>
        </div>
      )}

      {/* 슬립 타이머 안내 */}
      <div className="rounded-[20px] p-4 relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, #E8F4E4, #F0EBDA)'
      }}>
        <div className="absolute -right-2 -top-2 text-5xl opacity-20">😴</div>
        <div className="relative">
          <div className="font-display text-sm font-bold text-[#4A3F35]">💡 아이 재울 때 꿀팁</div>
          <div className="text-xs text-[#5A7A52] mt-1 leading-relaxed">
            '잠들기 전' 카테고리에서 찬양을 틀고, 풀 플레이어의 슬립 타이머를 30분으로 맞춰두세요.
            아이가 잠든 뒤 음악이 자동으로 꺼져요.
          </div>
        </div>
      </div>
    </div>
  );
}

function RecommendedNow({ bgmControls }) {
  const rec = getRecommendedCategory();
  const t = rec.tracks[0];
  return (
    <div className="rounded-[24px] p-5 relative overflow-hidden" style={{
      background: `linear-gradient(135deg, ${rec.color}25, ${rec.color}08)`,
      border: `1px solid ${rec.color}40`
    }}>
      <div className="flex items-center gap-3">
        <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0" style={{
          background: `linear-gradient(135deg, ${rec.color}, ${rec.color}aa)`,
          boxShadow: `0 8px 20px -8px ${rec.color}80`
        }}>
          <span className="anim-float">{rec.icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3" style={{ color: rec.color }} />
            <span className="text-[10px] font-bold tracking-wider" style={{ color: rec.color }}>지금 이 시간</span>
          </div>
          <div className="font-display text-lg font-bold text-[#4A3F35] leading-tight mt-0.5">
            {rec.name}
          </div>
          <div className="text-[11px] text-[#8B7355] truncate">{t.title}</div>
        </div>
        <button
          onClick={() => bgmControls.playTrack(t, rec)}
          className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 text-white"
          style={{
            background: rec.color,
            boxShadow: `0 4px 14px -2px ${rec.color}80`
          }}
        >
          <Play className="w-5 h-5" fill="white" strokeWidth={0} />
        </button>
      </div>
    </div>
  );
}

function TrackRow({ track, category, index, bgmControls, showCategoryIcon }) {
  const isCurrent = bgmControls.currentTrack?.track?.id === track.id;
  const isFav = bgmControls.favorites.includes(track.id);
  const ready = isValidUrl(track.url);
  const mm = Math.floor(track.duration / 60);
  const ss = String(track.duration % 60).padStart(2, '0');

  return (
    <div className="flex items-center gap-3 p-2 rounded-xl transition-colors" style={{
      background: isCurrent ? category.color + '15' : 'transparent'
    }}>
      <button
        onClick={() => bgmControls.playTrack(track, category)}
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-white"
        style={{ background: isCurrent ? category.color : '#F5EBD8' }}
      >
        {isCurrent && bgmControls.isPlaying
          ? <Pause className="w-4 h-4" fill="white" strokeWidth={0} />
          : <Play className="w-4 h-4" style={{ color: isCurrent ? 'white' : '#8B7355' }} fill={isCurrent ? 'white' : '#8B7355'} strokeWidth={0} />
        }
      </button>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          {showCategoryIcon && <span className="text-xs">{category.icon}</span>}
          <div className="font-display text-sm font-bold text-[#4A3F35] truncate" style={{
            color: isCurrent ? category.color : '#4A3F35'
          }}>
            {track.title}
          </div>
        </div>
        <div className="text-[10px] text-[#8B7355] mt-0.5">
          {ready ? `${mm}:${ss}` : '⚠ URL 미설정'}
        </div>
      </div>
      <button
        onClick={() => bgmControls.toggleFavorite(track.id)}
        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
      >
        <Heart className="w-4 h-4" style={{ color: isFav ? '#D4756B' : '#C4B59A' }} fill={isFav ? '#D4756B' : 'none'} />
      </button>
    </div>
  );
}

function BGMSetupGuide() {
  return (
    <div className="rounded-[20px] p-5 relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #FFF4D6, #FFE0C7)',
      border: '2px dashed #E9A94D'
    }}>
      <div className="absolute -right-4 -top-4 text-6xl opacity-20">🎵</div>
      <div className="relative">
        <div className="inline-block px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-sm mb-2">
          <span className="text-[10px] font-bold text-[#8B5E3C] tracking-wider">⚙️ BGM 연결하기</span>
        </div>
        <div className="font-display text-base font-bold text-[#4A3F35] leading-tight">
          대표님의 BGM을<br/>3단계로 연결하세요
        </div>
        <div className="mt-3 space-y-1.5">
          <div className="flex items-start gap-2">
            <div className="w-4 h-4 rounded-full bg-[#E9A94D] flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0 mt-0.5">1</div>
            <div className="text-xs text-[#4A3F35]">MP3를 Google Drive에 업로드 → 우클릭 → "링크가 있는 모든 사용자"</div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-4 h-4 rounded-full bg-[#D4756B] flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0 mt-0.5">2</div>
            <div className="text-xs text-[#4A3F35]">공유 링크의 FILE_ID 복사 (<span className="font-mono">/d/<b>FILE_ID</b>/view</span>)</div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-4 h-4 rounded-full bg-[#7BA098] flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0 mt-0.5">3</div>
            <div className="text-xs text-[#4A3F35]">코드 상단 BGM_CATEGORIES의 url에 붙여넣기</div>
          </div>
        </div>
        <div className="mt-3 p-2.5 rounded-lg bg-white/70 backdrop-blur-sm">
          <div className="text-[9px] font-bold text-[#8B5E3C] tracking-wider mb-1">📋 URL 형식</div>
          <div className="font-mono text-[10px] text-[#4A3F35] break-all leading-relaxed">
            https://drive.google.com/uc?export=download&id=<span className="font-bold text-[#D4756B]">FILE_ID</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ 미니 플레이어 ============
function MiniPlayer({ currentTrack, isPlaying, progress, duration, togglePlay, handleNextTrack, openPlayerModal }) {
  const { track, category } = currentTrack;
  const progressPct = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <div className="fixed bottom-[64px] left-0 right-0 z-40 px-3 anim-slide-up">
      <div className="max-w-[480px] mx-auto">
        <div className="rounded-2xl overflow-hidden" style={{
          background: `linear-gradient(135deg, ${category.color}ee, ${category.color}cc)`,
          backdropFilter: 'blur(20px)',
          boxShadow: `0 -4px 20px -4px ${category.color}60`
        }}>
          {/* 프로그레스 바 */}
          <div className="h-0.5 bg-white/20">
            <div className="h-full bg-white transition-all" style={{ width: `${progressPct}%` }} />
          </div>

          <div className="flex items-center gap-2 p-2 pr-3">
            <button
              onClick={openPlayerModal}
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-xl bg-white/20"
            >
              <span className={isPlaying ? 'anim-rotate inline-block' : 'inline-block'} style={{ animationDuration: '8s' }}>
                {category.icon}
              </span>
            </button>
            <button
              onClick={openPlayerModal}
              className="flex-1 min-w-0 text-left"
            >
              <div className="font-display text-sm font-bold text-white truncate leading-none">{track.title}</div>
              <div className="text-[10px] text-white/80 mt-0.5 truncate">{category.name}</div>
            </button>
            <button
              onClick={togglePlay}
              className="w-9 h-9 rounded-full bg-white flex items-center justify-center flex-shrink-0"
            >
              {isPlaying
                ? <Pause className="w-4 h-4" fill={category.color} strokeWidth={0} style={{ color: category.color }} />
                : <Play className="w-4 h-4 ml-0.5" fill={category.color} strokeWidth={0} style={{ color: category.color }} />
              }
            </button>
            <button
              onClick={handleNextTrack}
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            >
              <SkipForward className="w-4 h-4 text-white" fill="white" strokeWidth={0} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ 풀 플레이어 모달 ============
function FullPlayerModal({
  currentTrack, isPlaying, progress, duration, favorites, sleepTimer,
  togglePlay, handleNextTrack, handlePrevTrack, seekTo, toggleFavorite,
  startSleepTimer, cancelSleepTimer, onClose
}) {
  const { track, category } = currentTrack;
  const [showTimer, setShowTimer] = useState(false);
  const isFav = favorites.includes(track.id);
  const mm = String(Math.floor(progress / 60)).padStart(2, '0');
  const ss = String(Math.floor(progress % 60)).padStart(2, '0');
  const dmm = String(Math.floor(duration / 60)).padStart(2, '0');
  const dss = String(Math.floor(duration % 60)).padStart(2, '0');

  return (
    <div className="fixed inset-0 z-50 anim-slide-up" style={{
      background: `linear-gradient(180deg, ${category.color}, ${category.color}dd 50%, ${category.color}aa)`
    }}>
      <div className="max-w-[480px] mx-auto h-full flex flex-col px-6 pb-8 pt-6">
        {/* 상단 바 */}
        <div className="flex items-center justify-between">
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <ChevronLeft className="w-5 h-5 text-white" strokeWidth={2.5} />
          </button>
          <div className="text-center">
            <div className="text-[10px] font-bold tracking-[0.3em] text-white/80">NOW PLAYING</div>
            <div className="font-display text-sm font-bold text-white">{category.name}</div>
          </div>
          <button
            onClick={() => setShowTimer(!showTimer)}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center relative"
          >
            <Timer className="w-4 h-4 text-white" />
            {sleepTimer !== null && (
              <div className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-white px-1 flex items-center justify-center text-[9px] font-bold" style={{ color: category.color }}>
                {sleepTimer}
              </div>
            )}
          </button>
        </div>

        {/* 슬립 타이머 패널 */}
        {showTimer && (
          <div className="mt-4 p-4 rounded-2xl bg-white/15 backdrop-blur-md anim-fade-up">
            <div className="text-xs font-bold text-white/90 mb-2">⏰ 슬립 타이머</div>
            <div className="grid grid-cols-4 gap-2">
              {[15, 30, 45, 60].map(m => (
                <button
                  key={m}
                  onClick={() => { startSleepTimer(m); setShowTimer(false); }}
                  className="py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold"
                >
                  {m}분
                </button>
              ))}
            </div>
            {sleepTimer !== null && (
              <button
                onClick={() => { cancelSleepTimer(); setShowTimer(false); }}
                className="mt-2 w-full py-2 rounded-xl bg-white/20 text-white text-xs font-bold"
              >
                타이머 취소 ({sleepTimer}분 남음)
              </button>
            )}
          </div>
        )}

        {/* 앨범 아트 (큰 아이콘) */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative">
            <div className="w-60 h-60 rounded-full flex items-center justify-center text-[140px] bg-white/15 backdrop-blur-sm" style={{
              boxShadow: '0 20px 60px -10px rgba(0,0,0,0.3)'
            }}>
              <span className={isPlaying ? 'anim-rotate inline-block' : 'inline-block'} style={{ animationDuration: '12s' }}>
                {category.icon}
              </span>
            </div>
            <div className="absolute -inset-2 rounded-full border-2 border-white/20 pointer-events-none" />
          </div>
        </div>

        {/* 제목 */}
        <div className="text-center mb-6">
          <h2 className="font-serif-ko text-2xl font-bold text-white leading-tight" style={{ fontWeight: 800 }}>
            {track.title}
          </h2>
          <div className="text-sm text-white/80 mt-1">말씀의지혜 찬양쉼터</div>
        </div>

        {/* 프로그레스 */}
        <div className="mb-6">
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={progress}
            onChange={(e) => seekTo(Number(e.target.value))}
            className="w-full h-1 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, white 0%, white ${(progress/(duration||1))*100}%, rgba(255,255,255,0.3) ${(progress/(duration||1))*100}%)`
            }}
          />
          <div className="flex justify-between mt-2 text-[11px] text-white/80 font-mono">
            <span>{mm}:{ss}</span>
            <span>{dmm}:{dss}</span>
          </div>
        </div>

        {/* 컨트롤 */}
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={() => toggleFavorite(track.id)}
            className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center"
          >
            <Heart className="w-5 h-5 text-white" fill={isFav ? 'white' : 'none'} />
          </button>
          <button
            onClick={handlePrevTrack}
            className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center"
          >
            <SkipBack className="w-5 h-5 text-white" fill="white" strokeWidth={0} />
          </button>
          <button
            onClick={togglePlay}
            className="w-16 h-16 rounded-full bg-white flex items-center justify-center"
            style={{ boxShadow: '0 8px 24px -4px rgba(0,0,0,0.3)' }}
          >
            {isPlaying
              ? <Pause className="w-6 h-6" fill={category.color} strokeWidth={0} style={{ color: category.color }} />
              : <Play className="w-6 h-6 ml-1" fill={category.color} strokeWidth={0} style={{ color: category.color }} />
            }
          </button>
          <button
            onClick={handleNextTrack}
            className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center"
          >
            <SkipForward className="w-5 h-5 text-white" fill="white" strokeWidth={0} />
          </button>
          <button
            onClick={onClose}
            className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {sleepTimer !== null && (
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm">
              <Timer className="w-3 h-3 text-white" />
              <span className="text-[11px] font-bold text-white">{sleepTimer}분 후 꺼짐</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============ 바텀 네비게이션 ============
function BottomNav({ tab, setTab }) {
  const items = [
    { key: 'home', icon: Home, label: '홈' },
    { key: 'worship', icon: BookOpen, label: '예배' },
    { key: 'kids', icon: Smile, label: '어린이' },
    { key: 'prayer', icon: Heart, label: '기도' },
    { key: 'bgm', icon: Music2, label: '찬양' },
    { key: 'channel', icon: Play, label: '영상' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40">
      <div className="max-w-[480px] mx-auto px-3 pb-3 pt-2">
        <div className="rounded-[22px] p-1 flex items-center justify-between" style={{
          background: 'rgba(255,253,247,0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid #F0E2C6',
          boxShadow: '0 -4px 20px -4px rgba(74,63,53,0.12)'
        }}>
          {items.map(item => {
            const Icon = item.icon;
            const active = tab === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setTab(item.key)}
                className="flex-1 py-1.5 rounded-2xl flex flex-col items-center gap-0.5 transition-all"
                style={{
                  background: active ? 'linear-gradient(135deg, #E9A94D20, #D4756B20)' : 'transparent'
                }}
              >
                <Icon className="w-[18px] h-[18px]" style={{ color: active ? '#D4756B' : '#8B7355' }} strokeWidth={active ? 2.5 : 2} />
                <span className="text-[9px] font-bold" style={{ color: active ? '#D4756B' : '#8B7355' }}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
