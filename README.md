# renovate-config

> **This is NOT a general-purpose Renovate preset.** It only serves
> [rondodevs](https://github.com/rondodevs)' own Craft CMS projects built on
> [`craft-php`](https://github.com/rondodevs/craft-php). It is public only so
> it can run from a single place; don't extend it or rely on it in your projects.

Self-hosted [Renovate](https://docs.renovatebot.com), run by GitHub Actions
from this repo. Nothing is committed to the projects themselves.

## How it works

- [`config.js`](config.js) holds all the rules.
- [`.github/workflows/renovate.yml`](.github/workflows/renovate.yml) runs it
  every day at 05:00 UTC (and on demand via *Run workflow*).
- Repos are picked by GitHub topic: every `rondodevs/*` repo with the topic
  **`renovate`** is processed. Add or remove the topic to opt a project in or out.

Rules:

- Composer only (Craft CMS and plugins); PHP itself comes from the base image.
- Monday morning: one PR per project grouping all minor/patch updates.
- Security fixes: a separate PR as soon as an advisory is published.
- Major updates (e.g. Craft 5 → 6): never automatic, approve them from the
  Dependency Dashboard issue in each project.
- First day of the month: lock file maintenance (refreshes transitive deps).
- Only `composer.lock` is updated; version ranges in `composer.json` stay as they are.

## Setup

The workflow needs a `RENOVATE_TOKEN` secret: a classic personal access token
with the `repo` scope, from an account that can access the projects.

Logs are kept at `warn` level because Actions logs of a public repo are public.
The manual *dry run* option logs at `info` level (repo names, planned updates):
use it sparingly.

## Credits

Built and maintained by [plcd.nl](https://plcd.nl).
