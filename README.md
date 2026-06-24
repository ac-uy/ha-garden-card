# HA Garden Card

[![GitHub Release](https://img.shields.io/github/release/ac-uy/ha-garden-card.svg?style=flat-square)](https://github.com/ac-uy/ha-garden-card/releases)
[![HACS](https://img.shields.io/badge/HACS-Custom-orange.svg?style=flat-square)](https://hacs.xyz/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://github.com/ac-uy/ha-garden-card/blob/master/LICENSE)

A custom Home Assistant Lovelace card for garden and backyard management. Visualize your garden with an interactive image, colored zone overlays, irrigation controls, and robot mower status — all in one card.

## Features

- **Garden image with zone overlays** — Draw polygon zones on your garden photo for a visual map of irrigation areas
- **Irrigation control** — Start/stop zones, set duration, view progress and remaining time
- **Water animation** — Animated effects on active zones for instant visual feedback
- **Robot mower panel** — Battery level, activity state, and start/dock/pause controls
- **Pool cleaner panel** — Optional pool cleaner zone with animation
- **Visual polygon editor** — Draw and adjust zone shapes directly on your garden image
- **Responsive layout** — Adapts to mobile, tablet, and wall panel sizes
- **Dark/light theme support** — Follows your HA theme automatically
- **Visual card editor** — Configure everything without writing YAML

## Installation

### HACS (Recommended)

1. Open HACS in your Home Assistant instance
2. Click the three dots menu (top right) → **Custom repositories**
3. Add `ac-uy/ha-garden-card` with category **Lovelace**
4. Search for "Garden Card" and click **Download**
5. Hard refresh your browser

### Manual Installation

1. Download `ha-garden-card.js` from the [latest release](https://github.com/ac-uy/ha-garden-card/releases/latest)
2. Copy it to your `config/www/` directory
3. Add the resource in **Settings → Dashboards → Resources**:
   - URL: `/local/ha-garden-card.js`
   - Type: JavaScript Module

## Configuration

### Visual Editor

The card includes a full visual editor — no YAML required:

1. Add a new card to your dashboard
2. Search for "Garden Card" in the card picker
3. Use the editor to configure:
   - **Card title** and **garden image URL**
   - **Zones** — Add zones with name, entity, color, and polygon shape
   - **Polygon editor** — Click on the image to draw zone boundaries
   - **Mower** — Select your lawn_mower entity and battery sensor

### YAML Configuration

```yaml
type: custom:ha-garden-card
title: My Garden
image: /local/garden.jpg
layout: compact          # optional: "compact" for narrower layout
zones_columns: 2         # optional: number of columns for zone controls
zones:
  - id: front-lawn
    name: Front Lawn
    entity: switch.irrigation_zone_5
    color: "#4CAF50"
    polygon:
      - [10, 20]
      - [50, 15]
      - [55, 60]
      - [8, 65]
    duration_entity: number.irrigation_zone_5_duration
    countdown_entity: sensor.irrigation_zone_5_time_remaining
mower:
  entity: lawn_mower.mymower
  battery_entity: sensor.mymower_battery
pool:
  entity: switch.pool_cleaner
```

### Configuration Options

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `type` | string | ✅ | Must be `custom:ha-garden-card` |
| `title` | string | ❌ | Card title displayed at the top |
| `image` | string | ❌ | URL to your garden/backyard image |
| `layout` | string | ❌ | `"compact"` for narrower layout |
| `zones_columns` | number | ❌ | Number of columns for zone controls |
| `zones` | array | ❌ | List of zone configurations |
| `mower` | object | ❌ | Robot mower configuration |
| `pool` | object | ❌ | Pool cleaner configuration |

### Zone Configuration

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `id` | string | ✅ | Unique zone identifier |
| `name` | string | ✅ | Display name for the zone |
| `entity` | string | ❌ | Entity ID (`switch.*`, `valve.*`, or `input_boolean.*`) |
| `color` | string | ✅ | Hex color for the zone overlay (e.g., `#4CAF50`) |
| `polygon` | array | ❌ | Array of `[x%, y%]` coordinate pairs (minimum 3 points) |
| `duration_entity` | string | ❌ | `number.*` entity for setting irrigation duration |
| `countdown_entity` | string | ❌ | `sensor.*` entity showing remaining time |

**Polygon coordinates** are percentage-based (0–100) relative to the image dimensions. Use the visual polygon editor to draw zones interactively.

### Mower Configuration

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `entity` | string | ✅ | `lawn_mower.*` entity ID |
| `battery_entity` | string | ❌ | `sensor.*` entity for battery level (0–100) |

### Pool Cleaner Configuration

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `entity` | string | ✅ | `switch.*`, `vacuum.*`, or `input_boolean.*` entity |

### Supported Entity Types

| Domain | Zone Control | Service Called |
|--------|-------------|---------------|
| `switch.*` | Start / Stop | `switch.turn_on` / `switch.turn_off` |
| `valve.*` | Open / Close | `valve.open` / `valve.close` |
| `input_boolean.*` | Toggle | `input_boolean.turn_on` / `input_boolean.turn_off` |

## Companion Integrations

This card works well with:

- **[Inkbird Irrigation Integration](https://github.com/ac-uy/ha-inkbird-irrigation)** — Local Tuya control for Inkbird IIC-600
- **[Cecotec GrassHopper Integration](https://github.com/ac-uy/ha-cecotec-grasshopper)** — Robot mower control via cloud API

## Development

```bash
git clone https://github.com/ac-uy/ha-garden-card.git
cd ha-garden-card
npm install
npm run build    # Production build
npm test         # Run all tests
```

### Project Structure

```
ha-garden-card/
├── src/
│   ├── ha-garden-card.ts          # Main card component
│   ├── components/                # UI components
│   ├── editor/                    # Visual card editor
│   ├── models/                    # Types and validation
│   └── utils/                     # Helpers (coordinates, time, layout)
├── tests/
│   ├── unit/                      # Unit tests
│   └── property/                  # Property-based tests (fast-check)
├── dist/                          # Built output
└── hacs.json                      # HACS configuration
```

## License

MIT

## Support

If you find this useful, consider buying me a coffee ☕ or some tokens 🤖:

[![PayPal](https://img.shields.io/badge/PayPal-Donate-blue.svg?style=flat-square&logo=paypal)](https://paypal.me/AndresCastro965?locale.x=es_ES&country.x=ES)
