# OpenBridge website

A static, responsive website for the student-led OpenBridge free tutoring initiative.

## Website

The production website is deployed automatically to GitHub Pages whenever `main` is updated:

**https://intouchktakizawa.github.io/openbridge/**

The deployable site is stored in `dist/`. GitHub Actions publishes that directory without a separate build step.

## Editing portraits

Tutor portraits live in `dist/assets/` and are referenced by both the cards and the full profile dialogs in `dist/index.html`. Keep descriptive alt text. Card portraits fill their frames; dialog portraits show the complete image. Hover or keyboard focus reveals a summary, and either the portrait or “More about me” opens the full profile. Close with the top-right X, Escape, or the backdrop.

## Before public launch

- Replace the contact placeholder with an official, monitored contact route.
- Connect the interest form to an approved form or backend.
- Confirm and publish the safeguarding, consent, scheduling, supervision, and reporting process.
- Review tutor biographies and portraits with Kenta, Gao, Cooper, and responsible adults.
- Confirm whether the name should remain `OpenBridge` or become `FFA OpenBridge`.
