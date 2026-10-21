// Self-hosted Renovate config for rondodevs' own Craft CMS projects
// (the ones built on ghcr.io/rondodevs/craft-php). Not meant for general use.
//
// Which repos: rondodevs repos with the GitHub topic "renovate". Add/remove
// the topic on a repo to opt it in/out — nothing is committed to the
// projects themselves.
module.exports = {
  platform: 'github',
  autodiscover: true,
  autodiscoverFilter: ['rondodevs/*'],
  autodiscoverTopics: ['renovate'],
  onboarding: false,
  requireConfig: 'optional',
  gitAuthor: 'Renovate Bot <renovate@plcd.nl>',

  extends: ['config:recommended', ':dependencyDashboard'],
  timezone: 'Europe/Rome',

  // Composer only (Craft CMS and plugins): PHP and system packages come
  // from the craft-php base image, which rebuilds weekly.
  enabledManagers: ['composer'],
  // Update composer.lock only; version ranges in composer.json stay as they are.
  rangeStrategy: 'update-lockfile',

  schedule: ['before 9am on monday'],
  prConcurrentLimit: 3,
  labels: ['dependencies'],

  packageRules: [
    {
      description: 'Our own plugins installed from local path repositories (not on Packagist)',
      matchPackageNames: ['plcdnl/*'],
      enabled: false,
    },
    {
      description: 'One weekly PR with all minor/patch updates (Craft + plugins)',
      matchUpdateTypes: ['minor', 'patch'],
      groupName: 'Craft and plugins (minor/patch)',
      groupSlug: 'craft-minor-patch',
    },
    {
      description: 'Major updates (e.g. Craft 5 → 6) only on demand from the Dependency Dashboard',
      matchUpdateTypes: ['major'],
      dependencyDashboardApproval: true,
    },
  ],

  // Security fixes: separate PR on any day (the workflow runs daily).
  vulnerabilityAlerts: {
    enabled: true,
    labels: ['security'],
    schedule: ['at any time'],
  },
  osvVulnerabilityAlerts: true,

  lockFileMaintenance: {
    enabled: true,
    schedule: ['before 9am on the first day of the month'],
  },
};
