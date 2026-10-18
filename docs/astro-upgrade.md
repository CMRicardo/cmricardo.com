# Astro 7 upgrade

Updated from Astro 6.2.1 to 7.4.0, with official integrations upgraded together:

- `@astrojs/mdx`: 5.0.4 → 8.1.0
- `@astrojs/react`: 5.0.4 → 7.1.0

Stable npm versions verified on 18 October 2026.

## Migration review

Reviewed the [Astro 7 migration guide](https://docs.astro.build/en/guides/upgrade-to/v7/)
and the official [Astro](https://github.com/withastro/astro/blob/main/packages/astro/CHANGELOG.md),
[MDX](https://github.com/withastro/astro/blob/main/packages/integrations/mdx/CHANGELOG.md),
and [React](https://github.com/withastro/astro/blob/main/packages/integrations/react/CHANGELOG.md)
changelogs.

- Current Astro and integrations require Node 22.22.0 or newer. Declared this in
  `package.json`; validated locally using Node 24.19.0.
- Astro 7 changes the default whitespace handling to JSX rules. Explicitly set
  `compressHTML: true` to retain existing spacing between inline elements.
- Vite 8, Oxc, and the Rust compiler require no additional project configuration
  changes. There are no custom Babel transforms or integration hooks to migrate.
- The native Sätteri Markdown pipeline supports the existing MDX content and
  Shiki themes. There are no remark, rehype, or recma plugins to migrate.
- Removed experimental flags, database/transition internals, reserved
  `src/fetch.ts`, and container-renderer imports are not used by this project.
- Added the official Astro template checker to `pnpm typecheck`. Removed three
  React-style `key` attributes from Astro templates that the checker rejects.
  These removals do not change the rendered design.

The original blog layout and article content are retained. Design experiments
and their preview assets have been removed.

## Validation

- `pnpm build`: homepage, archive, and both MDX article routes build successfully.
- `pnpm typecheck`: Astro template checks and TypeScript checks pass. An existing
  deprecation hint remains for the clipboard fallback's `document.execCommand`.
