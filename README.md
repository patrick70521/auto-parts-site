# Asia Pacific Trading — Marketing Site

Marketing website for [Asia Pacific Trading](https://www.asia-pacifictrading.com), inspired by professional auto-parts retail layouts (category browse, vehicle fitment UI, policies).

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with part finder and categories |
| `/about` | Company overview |
| `/contact` | Contact form (mailto) |
| `/policies/returns` | Return policy and warranty |
| `/categories/[slug]` | Category landing pages |

## Branding

Edit [`data/site.ts`](data/site.ts) for business name, contact email, phone, address, and website URL.

## Build

```bash
npm run build
npm start
```
