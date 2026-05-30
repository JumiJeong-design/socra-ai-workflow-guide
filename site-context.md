# Product Context — AI Workflow 가이드 웹 서비스

## 서비스 개요
이 웹 서비스는 **프로덕트 디자이너를 위한 AI Workflow / 운영 문서 구축 가이드**다.
디자이너가 AI와 협업할 때 필요한 문서 체계(product context, design system context, agent rules 등)를 어떻게 구축하고 운영할지 안내하는 단일 페이지 참고 문서다.

## 타겟 사용자
- 주 대상: Socra AI 팀 프로덕트 디자이너
- 배경 수준: Figma, AI 도구 기본 사용 가능 / 개발 코드 직접 작성 불필요
- 사용 맥락: 업무 중 참고용 (긴 읽기 아닌 구간별 조회)

## 핵심 UX 원칙
1. **스캔 우선** — 목차 고정, 현재 위치 하이라이트(scroll-spy)로 긴 문서도 길을 잃지 않게
2. **단계별 가이드는 독립 조회** — Step 0~8 각각이 독립적으로 읽혀야 함. 앞뒤 맥락 없이도 이해 가능해야 함
3. **코드/프롬프트 예시는 복사 가능하게** — 실무에서 바로 쓸 수 있는 형태

## 레이아웃 구조
```
[사이드바 260px 고정] + [메인 콘텐츠 max-width 900px]
모바일(≤900px): 사이드바 슬라이드 드로어, 상단 고정 topbar
```

## 디자인 시스템 토큰 (Socra AI)
| 토큰 | 값 | 용도 |
|---|---|---|
| --bg | #F7F8FC | 페이지 배경 |
| --bg-card | #FFFFFF | 카드, 사이드바 배경 |
| --text-primary | #090C32 | 본문 제목, 강조 텍스트 |
| --text-secondary | #464A65 | 일반 본문 |
| --text-muted | #9398AC | 레이블, 메타 정보 |
| --border | #E0E2ED | 카드/구분선 테두리 |
| --accent | #664FFF | SocraPurple — 강조, 활성 상태 |
| --blue | #4050FF | SocraBlue — 보조 포인트 |
| --green | #1DB755 | SocraGreen — 완료/성공 상태 |
| --orange | #D4660A | 경고/주의 |

폰트: Pretendard Variable (본문 15px / 라인높이 1.75)

## 컴포넌트 사용 기준
- `.card` — 독립적인 개념 단위. 카드끼리 시각적으로 동일 레벨
- `.highlight` — accent-dim 배경. 섹션 내 핵심 요약 1개만 사용
- `.callout` — 왼쪽 컬러 세로선. 주의사항·팁. green/orange 변형 사용
- `.phase` — 단계 헤더 + 바디 구조. Step 0~8 같은 순서형 콘텐츠
- `.compare` — 2열 비교. bad/good 패턴 또는 동등 비교
- `.flow` — 프로세스 흐름. 화살표로 연결된 단계 나열
- **금지**: 카드 상단 컬러 테두리(border-top accent), 그라디언트 배경

## AI 작업 규칙
- 인라인 `<style>` 추가 금지 — 반드시 `ai-workflow-guide.css`에만 스타일 작성
- 새 컴포넌트 추가 시 위 디자인 토큰만 사용, 하드코딩 컬러값 금지
- 반응형 필수: 모바일(≤640px), 태블릿(≤900px) 브레이크포인트 준수
- 콘텐츠 추가는 `<section id="...">` 단위로, 사이드바 nav에도 동시 반영
