# FuriousSmile.FS - 아트 커미션 포트폴리오 웹사이트

> **FuriousSmile** 작가의 오리지널 캐릭터 포트폴리오 전시 및 아트 커미션 안내를 위한 프리미엄 반응형 웹사이트입니다.

소셜 미디어(X, 디스코드 등)에 분산되어 있던 작품 포트폴리오와 커미션 의뢰 양식, 그림 갤러리 등을, 고객들에게 직관적이고 안심할 수 있는 의뢰 경험을 제공합니다.

---

## 주요 기능 (Key Features)

### 1. 인터랙티브 무한 롤링 갤러리 (Marquee Gallery)

- **무한 루프 롤링 트랙**: 작품들을 부드럽게 좌우로 회전시키는 회전초밥형 슬라이더입니다.
- **드래그 앤 스와이프**: 사용자가 마우스로 직접 드래그하여 속도를 조절하거나 빠르게 이동할 수 있는 가속도 메커니즘이 포함되어 있습니다.

### 2. 고품질 작품 상세 모달 (Artwork Detail Modal)

- 갤러리의 작품을 클릭하면 **2열 레이아웃**의 상세 보기 모달이 표시됩니다.
- 왼쪽에는 고해상도 원본 이미지가 배치되며, 오른쪽에는 작품의 제목, 작가, 제작일, 작품의 상세 배경 설정(세계관/OC 스토리)이 상세하게 제공됩니다.

### 3. 마우스 트래킹 툴팁 (Interactive Tooltip)

- 커미션 타입 안내 카드 등에 마우스 호버 시 **"자세한 내용은 상담을 통해 알려드립니다!"** 등과 같은 안내 말풍선 툴팁이 마우스 커서의 움직임을 실시간으로 따라다니며 시각적 흥미와 정보를 함께 제공합니다.

### 4. 신체 범위별 안내 가이드 (Commission Range Sheet)

- 일러스트 작업의 범위를 한눈에 비교할 수 있는 가이드 일러스트와 함께 상반신(Half Body), 전신(Full Body)의 명확한 작업 범위와 가격 기준을 테이블 형태로 제공합니다.

### 5. UI & 애니메이션 (Premium Aesthetics)

- 어두운 배경에 부드러운 네온 블러(Blur Glow) 효과를 활용한 모던 다크 테마가 적용되어 있습니다.
- 반응형 웹 디자인을 지원하여 스마트폰(iOS/Android), 태블릿, 데스크톱 환경에서 최적의 비율로 감상할 수 있습니다.

---

## 기술 스택 (Tech Stack)

- **Markup**: HTML5 (웹 접근성 및 SEO를 위한 시맨틱 구조 설계)
- **Styling**: CSS3 (Vanilla CSS, 커스텀 그리드 시스템, `@keyframes` 애니메이션, 글래스모피즘 효과)
- **Script**: JavaScript (ES6+ Vanilla JS, 마우스 트래킹, 터치/드래그 스크롤 물리 엔진 로직 구현)
- **Typography**: Google Fonts (Noto Sans KR, Outfit)

---

## 프로젝트 구조 (Directory Structure)

```text
d:\personality_website
├── .git/                 # 깃 버전 관리 디렉토리
├── images/               # 웹사이트에 사용된 캐릭터 및 커미션 작품 이미지 자원
├── index.html            # 메인 랜딩 페이지 마크업
├── index.css             # 스타일 및 프리미엄 비주얼 효과 스타일시트
├── index.js              # 롤링 갤러리 드래그, 모달 제어, 마우스 트래킹 툴팁 등 인터랙션 스크립트
├── prd.md                # 제품 요구사항 명세서 (Product Requirement Document)
└── README.md             # 프로젝트 소개 문서 (현재 파일)
```

---

## 로컬 실행 방법 (How to Run)

웹 브라우저에서 즉시 실행이 가능하며 별도의 빌드 과정이 필요하지 않습니다.

1. **단순 실행**:
   - `index.html` 파일을 더블 클릭하여 실행하거나 브라우저 창으로 드래그 앤 드롭합니다.

2. **개발용 로컬 서버 실행 (추천)**:
   - VS Code의 **Live Server** 익스텐션을 활성화하여 실행합니다.
   - 또는 터미널에서 다음 명령을 실행하여 로컬 서버를 구동할 수 있습니다.
     ```bash
     # npm을 이용한 serve 실행
     npx serve .
     ```

---

## 소셜 채널 안내 (Artist Social Links)

웹사이트 하단 및 인트로 영역에서 연결되는 작가님의 주요 채널입니다.

- **X (Twitter)**: [@FuriousSmile](https://x.com/FuriousSmile)
- **카카오톡 오픈채팅**: [문의하기](https://open.kakao.com/o/s55xsgEi)
- **DeviantArt**: [FuriousSmileFS](https://www.deviantart.com/FuriousSmileFS)
- **Pixiv**: [프로필 페이지](https://www.pixiv.net/users/50106406/)
- **Instagram**: [@doyoon_fs](https://www.instagram.com/doyoon_fs)

---

> **알림**: 세부 문구나 프로필 소개, 갤러리 데이터 등 구체적인 텍스트는 목적에 맞춰 자유롭게 수정하여 사용할 수 있습니다.
