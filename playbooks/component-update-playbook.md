# Component Update Playbook

## When To Use

Figma component, Git component spec, code component, or Storybook story 중 하나가 바뀌어 sync 판단이 필요한 경우 사용한다.

## First Decision

변경을 바로 sync하지 않는다. 먼저 Figma source의 상태를 판단한다.

| Status | Action |
| --- | --- |
| `exploration` | worklog/context만 남기고 Git spec/code/Storybook은 바꾸지 않는다. |
| `candidate` | 비교와 논의용으로 기록하되 implementation contract로 보지 않는다. |
| `approved component` | Git spec, sync map, Storybook mapping을 확인한다. |
| `archived` | rationale로 필요한 경우만 링크한다. |

## Hard Stop

AI must stop before changing code, preview, or Storybook if it has not extracted or cited the visual source.

Required source evidence:

- Figma node id and extracted values, or
- Figma variables, or
- existing Git component spec, or
- sync log / ADR decision.

Do not guess colors, spacing, radius, typography, sizes, labels, or state styling. If the source is incomplete, add an open question and keep implementation status as `pending`.

## Steps

1. 변경이 Figma-origin, Git-spec-origin, code-origin, Storybook-origin 중 무엇인지 표시한다.
2. Figma source가 `exploration`, `candidate`, `approved`, `archived` 중 어디인지 확인한다.
3. approved component가 아니면 Git spec으로 승격하지 않는다.
4. approved component라면 affected component와 Figma node를 확인한다.
5. Figma node/variables에서 variant, state, token, typography, radius, spacing, size 값을 추출한다.
6. 추출값을 `design-system/preview/*-figma-audit.md` 또는 component spec에 기록한다.
7. `socra-ai-product-design/design-system/sync/sync-log.md`에 변경 의도를 기록한다.
8. component spec, sync checklist, Storybook mapping을 업데이트한다.
9. 구현이 있다면 preview/Storybook에서 audit/spec과 값이 맞는지 검증한다.
10. PR에서 Figma link, extraction audit, sync log entry, affected spec, Storybook story를 연결한다.

## Done Criteria

- Figma source status가 명확하다.
- Exploration/Candidate 작업이 실수로 implementation contract가 되지 않았다.
- Approved component의 이름과 Git 문서 slug가 대응된다.
- Figma node id가 spec에 남아 있다.
- 변경된 state/variant가 누락 없이 문서화됐다.
- 구현된 visual value가 Figma extraction audit/spec과 대응된다.
- Storybook status가 `pending`, `implemented`, `verified` 중 하나로 표시된다.
- 디자이너 판단이 필요한 항목은 open question으로 남았다.

## Source Worklog

- Pending first promoted worklog entry.
