# HA Garden Card

A custom Home Assistant Lovelace card for garden and backyard management. Visualize your garden with an interactive image, colored zone overlays, irrigation controls, and robot mower status — all in one card.

![Garden Card Preview](docs/screenshots/card-preview.png)

## Features

- **Garden image with zone overlays** — Draw polygon zones on your garden photo for a visual map of irrigation areas
- **Irrigation control** — Start/stop zones, set duration, view progress and remaining time
- **Water animation** — Animated effects on active zones for instant visual feedback
- **Robot mower panel** — Battery level, activity state, and start/dock/pause controls
- **Schedule visualization** — See upcoming irrigation times per zone
- **Visual polygon editor** — Draw and adjust zone shapes directly on your garden image
- **Responsive layout** — Adapts to mobile, tablet, and wall panel sizes
- **Dark/light theme support** — Follows your HA theme automatically
- **Visual card editor** — Configure everything without writing YAML

## Screenshots

| Card View | Zone Editor | Mower Panel |
|-----------|-------------|-------------|
| ![Card](docs/screenshots/card-view.png) | ![Editor](docs/screenshots/zone-editor.png) | ![Mower](docs/screenshots/mower-panel.png) |

| Dark Mode | Mobile Layout |
|-----------|---------------|
| ![Dark](docs/screenshots/dark-mode.png) | ![Mobile](docs/screenshots/mobile-layout.png) |

## Installation

### HACS (Recommended)

1. Open HACS in your Home Assistant instance
2. Click the three dots menu (top right) → **Custom repositories**
3. Add this repository URL with category **Lovelace**
4. Search for "Garden Card" in HACS and click **Download**
5. Restart Home Assistant
6. Add the resource in **Settings → Dashboards → Resources**:
   - URL: `/hacsfiles/ha-garden-card/ha-garden-card.js`
   - Type: JavaScript Module

### Manual Installation

1. Download `ha-garden-card.js` from the [latest release](https://github.com/your-username/ha-garden-card/releases/latest)
2. Copy it to your `config/www/` directory
3. Add the resource in **Settings → Dashboards → Resources**:
   - URL: `/local/ha-garden-card.js`
   - Type: JavaScript Module
4. Restart Home Assistant or clear your browser cache

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
image: /local/images/garden.jpg
zones:
  - id: front-lawn
    name: Front Lawn
    entity: switch.irrigation_front
    color: "#4CAF50"
    polygon:
      - [10, 20]
      - [50, 15]
      - [55, 60]
      - [8, 65]
    duration_entity: number.irrigation_front_duration
    countdown_entity: sensor.irrigation_front_remaining
    schedule_entity: sensor.irrigation_front_next_run
  - id: flower-bed
    name: Flower Bed
    entity: valve.flower_bed
    color: "#E91E63"
    polygon:
      - [60, 10]
      - [95, 12]
      - [92, 55]
      - [58, 50]
    duration_entity: number.flower_bed_duration
    countdown_entity: sensor.flower_bed_remaining
mower:
  entity: lawn_mower.robot_mower
  battery_entity: sensor.robot_mower_battery
```

### Configuration Options

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `type` | string | ✅ | Must be `custom:ha-garden-card` |
| `title` | string | ❌ | Card title displayed at the top |
| `image` | string | ❌ | URL to your garden/backyard image |
| `zones` | array | ✅ | List of zone configurations (at least one) |
| `mower` | object | ❌ | Robot mower configuration |

### Zone Configuration

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `id` | string | ✅ | Unique zone identifier |
| `name` | string | ✅ | Display name for the zone |
| `entity` | string | ✅ | Entity ID (`switch.*`, `valve.*`, or `input_boolean.*`) |
| `color` | string | ✅ | Hex color for the zone overlay (e.g., `#4CAF50`) |
| `polygon` | array | ✅ | Array of `[x%, y%]` coordinate pairs (minimum 3 points) |
| `duration_entity` | string | ❌ | `number.*` entity for setting irrigation duration |
| `countdown_entity` | string | ❌ | `sensor.*` entity showing remaining time in seconds |
| `schedule_entity` | string | ❌ | Entity with `next_run` attribute or datetime state |

**Polygon coordinates** are percentage-based (0–100) relative to the image dimensions:
- `[0, 0]` = top-left corner
- `[100, 100]` = bottom-right corner
- Minimum 3 points required to form a polygon

You can use the visual polygon editor in the card configuration UI to draw zones interactively instead of writing coordinates manually.

### Mower Configuration

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `entity` | string | ✅ | `lawn_mower.*` entity ID |
| `battery_entity` | string | ❌ | `sensor.*` entity for battery level (0–100) |

The mower panel displays:
- **Activity state**: mowing, docked, paused, returning, or error
- **Battery level**: percentage with appropriate icon
- **Controls**: Start mowing, dock, and pause buttons
- **Error state**: Warning icon with error description when applicable

### Supported Entity Types

| Domain | Zone Control | Service Called |
|--------|-------------|---------------|
| `switch.*` | Start / Stop | `switch.turn_on` / `switch.turn_off` |
| `valve.*` | Open / Close | `valve.open` / `valve.close` |
| `input_boolean.*` | Toggle | `input_boolean.turn_on` / `input_boolean.turn_off` |

## Theming

The card automatically adapts to your Home Assistant theme:

- **Dark mode** — Adjusted overlay opacity, light text, dark card background
- **Light mode** — Standard overlay opacity, dark text, light card background
- **Active zone glow** — Subtle box-shadow using the zone's configured color
- **Smooth transitions** — 200ms+ CSS transitions for all state changes
- **Rounded corners** — 12px border-radius consistent with Mushroom card styling

### CSS Custom Properties

The card reads these HA theme variables:

| Variable | Usage |
|----------|-------|
| `--primary-color` | Accent elements, active indicators |
| `--card-background-color` | Card container background |
| `--primary-text-color` | Main text color |
| `--secondary-text-color` | Subtitles, schedule badges |
| `--disabled-text-color` | Unavailable zone text |

## Responsive Layout

The card adapts its layout based on container width:

| Width | Layout | Description |
|-------|--------|-------------|
| < 400px | Compact | Single column, zones stacked below image |
| 400–800px | Medium | Two-column grid for zone controls |
| > 800px | Wide | Side-by-side image and controls |

All interactive elements maintain a minimum 44×44px touch target for accessibility.

## Development

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
git clone https://github.com/your-username/ha-garden-card.git
cd ha-garden-card
npm install
```

### Commands

| Command | Description |
|---------|-------------|
| `npm run build` | Build production bundle to `dist/ha-garden-card.js` |
| `npm run dev` | Build with watch mode for development |
| `npm test` | Run all tests (unit + property-based) |
| `npm run test:watch` | Run tests in watch mode |

### Project Structure

```
ha-garden-card/
├── src/
│   ├── ha-garden-card.ts          # Main card component
│   ├── components/
│   │   ├── garden-image-layer.ts  # Image + SVG polygon overlay
│   │   ├── zone-control.ts        # Per-zone control panel
│   │   ├── duration-control.ts    # Duration slider
│   │   ├── progress-bar.ts        # Progress indicator
│   │   ├── mower-panel.ts         # Mower status + controls
│   │   ├── schedule-view.ts       # Schedule badges
│   │   └── water-animation.ts     # Animation styles/patterns
│   ├── editor/
│   │   ├── ha-garden-card-editor.ts  # Visual card editor
│   │   └── zone-editor.ts            # Polygon drawing tool
│   ├── models/
│   │   ├── types.ts               # TypeScript interfaces
│   │   └── config-validator.ts    # Configuration validation
│   └── utils/
│       ├── coordinates.ts         # Pixel-to-percent conversion
│       ├── time-format.ts         # Time formatting (M:SS)
│       ├── progress.ts            # Progress calculation
│       ├── layout.ts              # Responsive breakpoints
│       └── schedule-parser.ts     # Schedule entity parsing
├── tests/
│   ├── unit/                      # Example-based unit tests
│   └── property/                  # Property-based tests (fast-check)
├── dist/                          # Built output (single JS bundle)
├── hacs.json                      # HACS configuration
├── package.json
├── rollup.config.mjs
├── tsconfig.json
└── vitest.config.ts
```

### Testing

The project uses [Vitest](https://vitest.dev/) for testing and [fast-check](https://fast-check.dev/) for property-based tests.

- **Unit tests** verify specific scenarios and edge cases
- **Property-based tests** verify universal correctness properties across randomized inputs (100+ iterations per property)

### Local Development with Home Assistant

1. Run `npm run build` to generate `dist/ha-garden-card.js`
2. Copy the file to your HA `config/www/` directory
3. Add as a resource: `/local/ha-garden-card.js` (type: module)
4. Hard-refresh your browser (Ctrl+Shift+R) to load changes

## License

MIT
