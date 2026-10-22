# renovate-config

> **This is NOT a general-purpose Renovate preset.** It only serves
> [rondodevs](https://github.com/rondodevs)' own projects: the Craft CMS sites built on
> [`craft-php`](https://github.com/rondodevs/craft-php) and
> [`nuxt-layers`](https://github.com/rondodevs/nuxt-layers). It is public only so
> it can run from a single place; don't extend it or rely on it in your projects.

Self-hosted [Renovate](https://docs.renovatebot.com), run by GitHub Actions
from this repo. The Craft projects need nothing committed; a repo can add its
own `renovate.json` to override the defaults below.

## How it works

- [`config.js`](config.js) holds all the rules.
- [`.github/workflows/renovate.yml`](.github/workflows/renovate.yml) runs it
  every day at 05:00 UTC (and on demand via *Run workflow*).
- Repos are picked by GitHub topic: every `rondodevs/*` repo with the topic
  **`renovate`** is processed. Add or remove the topic to opt a project in or out.

Rules:

- Composer only by default (Craft CMS and plugins); PHP itself comes from the base image.
  Nuxt projects use the [`nuxt`](#nuxt-projects) preset instead.
- Monday morning: one PR per project grouping all minor/patch updates.
- Security fixes: a separate PR as soon as an advisory is published.
- Major updates (e.g. Craft 5 → 6): never automatic, approve them from the
  Dependency Dashboard issue in each project.
- First day of the month: lock file maintenance (refreshes transitive deps).
- Only `composer.lock` is updated; version ranges in `composer.json` stay as they are.

## Nuxt projects

[`nuxt.json5`](nuxt.json5) is a preset for nuxt-layers and the `*-frontend` sites. Add the
`renovate` topic to the repo and commit this `renovate.json`:

```json
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": ["github>rondodevs/renovate-config:nuxt.json5"]
}
```

On top of the rules above it enables npm + GitHub Actions, keeps separate PRs for
Nuxt (with Vue and Nuxt modules), ESLint and GitHub Actions, skips releases younger
than 3 days and merges patch updates and lock file maintenance once CI passes. Without
CI in the repo those merge right away. Groups in a repo's own config need a `groupSlug`
too, or they share the `craft-minor-patch` branch set by `config.js`.

## Setup

The workflow needs a `RENOVATE_TOKEN` secret: a classic personal access token
with the `repo` scope, from an account that can access the projects.

Logs are kept at `warn` level because Actions logs of a public repo are public.
The manual *dry run* option logs at `info` level (repo names, planned updates):
use it sparingly.

## Credits

Built and maintained by [plcd.nl](https://plcd.nl).
