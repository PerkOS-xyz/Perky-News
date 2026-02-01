# Netlify Deployment - Perky News

## Site Info
- **URL:** https://perky-news.netlify.app
- **Site ID:** 557a30eb-22a4-4385-9458-6c7a744caceb
- **Deploy method:** CLI (not git-linked)

## Deploy Commands

### 1. Build the app
```bash
cd /root/neo/perky-news/App
npm run build
```

### 2. Deploy to Netlify
```bash
# Preview deploy (creates temp URL)
npx netlify deploy

# Production deploy (updates live site)
npx netlify deploy --prod
```

## Environment Variables
Set in Netlify dashboard or via CLI:
```bash
npx netlify env:set NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID "your_id"
npx netlify env:set NEXT_PUBLIC_X402_WALLET "0xc2564e41B7F5Cb66d2d99466450CfebcE9e8228f"
```

## Auth Token
```
NETLIFY_AUTH_TOKEN=nfp_gxJMVtmRBedPTStPELRZBqHi44BEmbthf167
```

Add to ~/.bashrc:
```bash
export NETLIFY_AUTH_TOKEN="nfp_gxJMVtmRBedPTStPELRZBqHi44BEmbthf167"
```

## Workflow
1. Make changes
2. `npm run build` (must pass)
3. `git add -A && git commit -m "feat: description" && git push`
4. `npx netlify deploy --prod`
5. Verify at https://perky-news.netlify.app

## Troubleshooting
- If deploy fails, check build logs: `npx netlify deploy --prod 2>&1`
- Site logs: https://app.netlify.com/sites/perky-news/deploys
