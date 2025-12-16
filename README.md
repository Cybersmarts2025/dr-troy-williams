# DrTroyWilliams.net

## Source of truth

I maintain this project through local development on my machine using Dyad and GitHub.
This repository is the single source of truth.
All deployments are built from GitHub and published through Vercel.

## Local development

Prerequisites
Node.js and npm installed

Install dependencies
npm install

Run the development server
npm run dev

## Deployment

Vercel is connected to the GitHub main branch.
Production deployments are triggered by commits to main.

## Security baseline

I do not commit secrets to this repository.
Environment variables are managed in Vercel and local .env.local files that are not committed.
