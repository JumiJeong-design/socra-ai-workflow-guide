# Component Update Playbook

## When To Use

Figma component, Git component spec, or design token 중 하나가 바뀌어 다른 쪽과 sync가 필요한 경우 사용한다.

## Steps

1. 변경이 Figma-origin인지 Git-origin인지 표시한다.
2. affected component와 Figma node를 확인한다.
3. variant, state, token, accessibility 영향 범위를 정리한다.
4. `socra-ai-product-design/design-system/sync/sync-log.md`에 변경 의도를 기록한다.
5. component spec과 sync checklist를 업데이트한다.
6. PR에서 Figma link, sync log entry, affected spec을 연결한다.

## Done Criteria

- 컴포넌트 이름과 Git 문서 slug가 대응된다.
- Figma node id가 spec에 남아 있다.
- 변경된 state/variant가 누락 없이 문서화됐다.
- 디자이너 판단이 필요한 항목은 open question으로 남았다.

## Source Worklog

- Pending first promoted worklog entry.
