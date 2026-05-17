---
layout: ../../layouts/blog-post-layout.astro
title: "Deploy SST apps with GitHub Actions"
slug: 'deploy-sst-apps'
author: "Ricardo Corrales"
date: "17 May 2026"
summary: "AWS console could be overwhelming, especially if we..."
tags: ['infrastructure', 'devops']
---

AWS console could be overwhelming, especially if we only need to deploy or side
project or quickly see results online.

[SST](https://sst.dev) is a IaC framework for typescript. It makes really easy
to deploy serverless applications on your own infrastructure.

Let's say we have a monorepo with a web and server apps and we want to
deploy them to AWS on the same domain.

```text
my-app/
├── apps/
│   ├── web/
│   └── server/
├── packages/
├── package.json
```

First we install and init SST in our project:

```bash
pnpm dlx sst@latest init
```

This will add SST to our dependencies and create a `sst.config.ts` file in our
project root.

SST allow us to create **components** which are used to
handle our infrastructure.

For example, we can have a Function component to render our server app and a
StaticSite component to render our web app.

```ts title="sst.config.ts"
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
     return {
       name: "my-app",
       removal: input?.stage === "production" ? "retain" : "remove",
       protect: ["production"].includes(input?.stage),
       home: "aws",
     };
  },
  async run() {
     // API
     const api = new sst.aws.Function("Backend", {
       streaming: true,
       timeout: "15 minutes",
       handler: "./apps/server/src/lambda.handler",
       transform: {
         function: {
           runtime: "nodejs24.x",
         },
       },
     });
     // Frontend
     new sst.aws.StaticSite("Frontend", {
       path: "./apps/web",
       build: {
         command: "pnpm run --filter web build",
         output: "dist",
       },
       dev: {
         command: "pnpm --filter web dev",
       },
     });
  },
});
```

> [!NOTE]
> We don't have to import sst because it's available globally in the config file.

## Deployment

`SST` has a CLI that we can use, so let's add a package json script to deploy
our app.

```json title="package.json"
{
  "scripts": {
    "deploy": "sst deploy --stage production"
  }
}
```

> We could add one script per stage, (`pnpm deploy:beta`, `pnpm deploy:production`).

Running `pnpm deploy` will allow us to deploy our app, but we don't want to
manually do this, so let's create a GitHub Action to automate this process.

Inside `.github/workflows/deploy.yml` we can add the following:

```yaml title=".github/workflows/deploy.yml"
name: Deploy to production stage

on:
  push:
    branches: [main]
  workflow_dispatch:

concurrency:
  group: deploy-production
  cancel-in-progress: false

jobs:
  deploy:
    name: Deploy to production stage
    runs-on: ubuntu-latest
    timeout-minutes: 30

    permissions:
      id-token: write
      contents: read

    steps:
      - name: Checkout code
        uses: actions/checkout@v6

      - name: Setup pnpm
        uses: pnpm/action-setup@v6
        with:
          version: 11

      - name: Setup Node.js
        uses: actions/setup-node@v6
        with:
          node-version: 24
          cache: "pnpm"

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Deployment
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        run: pnpm run deploy
```

This workflow will run on every push to the main branch and it will also be
available to run manually from the Actions tab in GitHub.

Now step by step:

1. Checkout the repo.
2. Setup pnpm and Node.js.
3. Install dependencies.
4. Run the deploy script with the AWS credentials stored in GitHub Secrets.

With this we have the bare minimum to deploy our SST app with CI/CD, then you
can add more steps to run linters, test, etc.
