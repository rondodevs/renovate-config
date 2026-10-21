# renovate-config

Shared [Renovate](https://docs.renovatebot.com) config for our Craft CMS / PHP
projects. Each project only needs a `renovate.json` with:

```json
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": ["github>rondodevs/renovate-config"]
}
```

What it does:

- Composer only (Craft CMS and plugins); PHP itself comes from the base image.
- Every Monday morning: one PR per project grouping all minor/patch updates.
- Security fixes: a separate PR as soon as an advisory is published.
- Major updates (e.g. Craft 5 → 6): never automatic, approve them from the
  Dependency Dashboard issue.
- First day of the month: lock file maintenance (refreshes transitive deps).
- Only the lock file is updated; version ranges in `composer.json` stay as they are.

Built and maintained by [plcd.nl](https://plcd.nl).
