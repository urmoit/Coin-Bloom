# Coin Bloom – Idle Garden Tycoon

**Coin Bloom** is an original idle/clicker game: grow your garden empire, wait for cycles to fill, collect coins, and hire managers to automate. Unique name — safe to publish.

## Run locally

```bash
cd idle
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Features

- **Click cycle**: Each venture has a cycle time (better ventures = longer wait). A **progress bar** fills; when it’s full you can click again. Timer shows “Next in M:SS”.
- **No automation at start**: You must click to collect until you hire a **Manager** for that venture.
- **Slow builds**: Buying new units starts a build (8+ seconds); timer shows “Building… M:SS”.
- **Every 10 owned**: **2× production** milestone (10 → 2×, 20 → 4×, 30 → 8×). Badge shows the multiplier.
- **Theme**: Garden / growth (Seed Cart, Flower Stall, Beehive, Orchard, Solar Bloom, etc.).
- **Animations**: Progress bar fill, “Ready” pulse, collect pop (+coins), icon bounce, card appear.

## Ventures (original theme)

Seed Cart → Flower Stall → Herb Garden → Beehive → Orchard → Vineyard → Greenhouse → Tree Nursery → Botanical Lab → Solar Bloom.

Start with a little cash, buy your first Seed Cart, wait for the build, then click when the bar is full. Hire managers in the **Managers** tab to automate.
