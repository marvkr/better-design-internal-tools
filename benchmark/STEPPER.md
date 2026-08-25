# Shared onboarding Stepper

Every released app consumes `ix-onboarding-stepper` through the documented
Better Design registry path and imports `OnboardingStepper` from
`@/components/ui/ix-onboarding-stepper`.

The source was reconciled to Better Design PR
[`#818`](https://github.com/marvkr/better-design-app/pull/818) at reviewed
head `c20915cf8b3d8df72f4305a6430a01cb3c903a75`.

- Main component SHA-256:
  `f80854f443750103b1cb693f995b3d03fb6487b3ff20a677a2725fc10862311b`
- Progress style: `segments`
- Label mode: `current`
- Reached-step behavior: backward navigation only
- Rendered flow checks: 390px and 1440px viewports, keyboard activation, four
  semantic steps, and no horizontal overflow
- Final visible spacing review: 85/100, with no critical or serious findings

The 14 released apps use `gpt-5.6-luna`. The paused issue-triage treatment is
not included.
