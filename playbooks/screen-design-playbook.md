# Screen Design Playbook

## When To Use

Socra 제품의 새 화면이나 주요 화면 개편을 AI와 함께 설계할 때 사용한다.

## Principle

화면 설계는 Figma에서 자유롭게 탐색하되, approved screen이 되기 전까지 Git spec, code, Storybook의 구현 계약으로 보지 않는다.

## Figma Screen States

| Status | Meaning | Action |
| --- | --- | --- |
| `exploration` | 구조, 톤, layout을 자유롭게 실험 | worklog/context only |
| `candidate` | 제품 방향으로 가능성 있는 안 | compare and review |
| `approved screen` | 구현 기준으로 합의된 화면 | Git spec and Storybook mapping |
| `archived` | 버린 안 또는 과거 실험 | keep only as rationale |

## Steps

1. 화면의 핵심 사용자 목적을 한 문장으로 적는다.
2. Figma screen status를 `exploration`, `candidate`, `approved screen`, `archived` 중 하나로 표시한다.
3. Exploration 단계에서는 빠른 조합과 시각 실험을 우선하고 Git spec으로 옮기지 않는다.
4. Candidate 단계에서는 AI design review로 정보 구조, 상태, 접근성, 컴포넌트 gap을 비교한다.
5. Approved screen이 되면 필요한 기존 design system component를 확정한다.
6. 반복 가능한 gap은 `socra-ai-product-design`에 component spec 초안을 만든다.
7. 구현 대상이면 Storybook 또는 product preview에서 구현 상태를 검증한다.
8. 결정된 패턴은 workflow guide나 playbook으로 승격할지 판단한다.

## Done Criteria

- 화면의 Figma status가 명확하다.
- Exploration/Candidate 화면이 실수로 구현 기준이 되지 않았다.
- Approved screen은 디자인 시스템 컴포넌트 기반으로 설명된다.
- 새 컴포넌트 후보와 one-off UI가 구분된다.
- open question과 designer judgment가 분리되어 있다.
- 구현된 화면 또는 컴포넌트는 Storybook/product preview 검증 경로가 있다.

## Source Worklog

- Pending first promoted worklog entry.
