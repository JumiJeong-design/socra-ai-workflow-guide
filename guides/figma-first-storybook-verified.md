# Figma-First, Storybook-Verified

## Purpose

Socra의 디자인 시스템 협업은 Figma의 탐색성을 보호하면서, 승인된 디자인만 Git spec과 Storybook으로 검증한다.

이 원칙은 Code Connect를 중심으로 두지 않는다. Code Connect는 있으면 좋은 보조 연결이고, 핵심 운영 모델은 Figma, Git spec, Code, Storybook의 역할 분리다.

## Operating Model

| Surface | Role |
| --- | --- |
| Figma | Design exploration, visual judgment, future direction |
| Git spec | Approved design contract |
| Code | Implementation source |
| Storybook | Implementation review surface |
| Code Connect | Optional bridge when permission and code paths are ready |

## Figma Zones

Figma 전체를 sync 대상으로 보지 않는다. AI는 먼저 Figma 안의 작업이 어느 zone에 있는지 판단한다.

| Zone | Meaning | Sync Rule |
| --- | --- | --- |
| Exploration | 자유 실험, 시각 방향 테스트, 버려질 수 있는 아이디어 | Do not sync to Git/Storybook |
| Candidates | 제품 방향으로 가능성 있는 안 | Record context, but do not treat as implementation contract |
| Components | 승인된 디자인 시스템 컴포넌트 | Sync to Git spec and Storybook mapping |
| Screens | 승인된 제품 화면 기준 | Sync only when marked approved |
| Archive | 버린 안, 과거 실험, 비교용 히스토리 | Do not sync unless referenced as rationale |

## AI Rules

- Do not convert every Figma experiment into Git documentation.
- Before writing a spec, identify whether the source is exploration, candidate, approved component, or approved screen.
- Treat approved `Components` and approved `Screens` as sync targets.
- Treat Storybook as implementation verification, not as the design exploration surface.
- Treat Git spec as the contract between design intent and implementation.
- Treat Code Connect as optional; do not block workflow on it.

## Sync Flow

```text
Figma Exploration
-> Figma Candidates
-> Approved Component / Screen
-> Git spec
-> Code implementation
-> Storybook review
-> Verified sync
```

## Decision Rule

If Figma, Git spec, Code, and Storybook disagree:

1. Decide whether the Figma source is exploratory or approved.
2. If exploratory, do not change code or Storybook yet.
3. If approved, update Git spec first.
4. Then decide whether Code or Figma should change.
5. Verify implementation in Storybook.
6. Record the decision in product-design sync log or ADR when the rule changes.

## Source Worklog

- Pending first promoted worklog entry.
