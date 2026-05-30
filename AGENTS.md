# AGENTS.md

이 파일은 Codex 등 에이전트가 이 폴더에서 시작할 때 자동으로 로드되는 진입점입니다.

이 레포는 `socra-ai-workflow-guide` 정적 사이트 소스이며, AI 워크플로우·프로세스·시행착오를 정제해서 쌓아두는 **위키 채널**입니다.

## 세션 시작 시

1. `JumiJeong-design/jumi-worklog` 레포에서 최근 날짜 파일 1~2개를 읽어 맥락 파악
2. 오늘 날짜 worklog 파일이 없으면 세션 종료 시 생성
3. 이 레포 작업 내용은 jumi-worklog 날짜 파일에 합산 기록

## AI 도구별 진입점

| 도구 | 진입점 |
|------|--------|
| Claude Code | `CLAUDE.md` + SessionStart 훅 (`~/.claude/settings.json`) |
| Codex | 이 파일(`AGENTS.md`) |

## 버전 업데이트 시 체크리스트

버전을 올릴 때 아래 4개 파일을 모두 수정한다:

1. `sidebar.html` — 버전 텍스트 (`v0.X`)
2. `ai-workflow-guide.html` — 상단 버전 배지 + 인라인 changelog 항목
3. `changelog.html` — 버전 섹션 신규 추가
4. 필요 시 `index.html` — 신규 카드 추가

## 공통 스킬

프로젝트 무관 공통 스킬은 `JumiJeong-design/jumi-worklog/skills/` 에 있다.
사용자가 아래 트리거를 입력하면 해당 SKILL.md를 읽어서 실행한다.

| 트리거 | 스킬 | 위치 |
|--------|------|------|
| `워크로그 써줘`, `오늘 정리해줘`, `/write-worklog` | write-worklog | `jumi-worklog/skills/write-worklog/SKILL.md` |
