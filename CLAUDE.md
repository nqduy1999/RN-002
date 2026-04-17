# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Start Expo development server
yarn start

# Run on iOS simulator
yarn ios

# Run on Android emulator
yarn android

# Run on web
yarn web

# Lint
yarn lint
```

No test framework is configured in this project.

## Path Aliases

All source imports use aliases defined in `jsconfig.json`:

| Alias | Resolves to |
|---|---|
| `@/*` | `./*` |
| `@assets/*` | `./assets/*` |
| `@common/*` | `./common/*` |
| `@hooks/*` | `./hooks/*` |
| `@constants/*` | `./constants/*` |
| `@resources/*` | `./resources/*` |
| `@redux/*` | `./redux/*` |
| `@services/*` | `./services/*` |

Always use these aliases rather than relative paths.

## Architecture

This is an Expo React Native app (iOS/Android/Web) for an employee recognition and benefits platform. It supports multiple brand variants (generic, nestle, AIA, DHL) via build version theming.

### Routing

Uses **Expo Router** (file-based routing) in `app/`. Entry point is `app/_layout.jsx` which sets up providers. The current tab structure is in `app/(tabs)/`.

### State Management

Redux with `redux-thunk`. Each feature module under `redux/` follows a consistent pattern:

```
redux/<feature>/
  actions.js      # Action type constants
  reducers.js     # State reducers
  operations.js   # Thunk operations (async API calls)
  api.js          # API call functions using baseApi
  selectors.js    # State selectors
```

Current modules: `auth`, `app`, `recognition`, `newsAndDocuments`, `notifications`, `wallet`, `profile`, `flexibleBenefits`, `socialWall`.

The root store is assembled in `redux/index.js`.

### API Layer

`services/remote/baseApi.js` — Axios instance with:
- JWT Bearer token injection via interceptor
- Response error normalization
- Support for multipart/form-data (S3 uploads)

`services/remote/apiEndpoints.js` — All endpoint URL constants.

Local services (`services/local/`) handle persistent storage: `auth-tokens.js`, `themes.js`, `languages.js`, `networks.js`.

### UI Components

Reusable components live in `common/components/<category>/`. Categories include: `text`, `input`, `button`, `modal`, `gradient`, `background`, `list`, `image`, `icon`, `swiper`, `datepicker`, etc.

### Resources

`resources/` contains:
- `palette.js` — Color constants
- `dimensions.js` — Spacing/size constants
- `images.js` — Image asset registry
- `enum-types/` — Shared enumerations (roles, gender, category, etc.)
- `string/` — i18n string resources (Vietnamese/English)
- `build_version/` — Per-brand theming and assets (generic, nestle, AIA, DHL)
- `icomoon/` — Custom icon font

### Authentication

Supports multiple auth methods: username/password, Office365 OAuth, Google OAuth, SSO. Tokens are stored via `services/local/auth-tokens.js`. Session timeout is handled by `hooks/useTimeoutSession.js`.

### Multi-brand Support

Brand-specific assets, colors, and strings are organized under `resources/build_version/`. The active brand is determined at build time via `react-native-config` environment variables.
