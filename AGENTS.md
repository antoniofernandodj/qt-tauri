# AGENTS.md

Shared project documentation for all AI coding agents working in this repository.

See **[`ROADMAP.md`](./ROADMAP.md)** for the full widget roadmap — what is done, what is a stub, and what is missing compared to the Qt 6 widget set.

## What this project is

`qt-tauri` reimplements the Qt widget set as web components: Angular 17 provides the UI, Tauri 2 (Rust) provides the native shell and backend. The goal is a web-based UI toolkit whose component names, state patterns, and layout model mirror Qt.

## Commands

```bash
# Desktop dev (starts Angular + Tauri shell)
yarn tauri dev

# Frontend only (Angular dev server on :4200)
yarn start

# Build frontend only
yarn build

# Build desktop app
yarn tauri build

# Build & sign Android APK
make build

# Install APK directly to connected Android device via adb
make installapp

# Copy APK to Android device via MTP
make copy
```

> Note: `tauri.conf.json` sets `devUrl: http://localhost:1420` — if Angular serves on a different port, adjust `angular.json` or the tauri config to match.

## Architecture

### Frontend (`src/app/`)

**`core/`** — framework primitives:
- `QProperty<T>` — wraps Angular `signal()` with a `.value` getter/setter and `reset()`. The reactive primitive used by all widget inputs.
- `QObjectState` — `@Injectable()` base class for grouped state. Subclass it, declare fields as `QProperty` instances, and register via `providers: [MyState]` at the component level; `inject(MyState)` returns the scoped instance. Provides `reset()`, `toObject()`, `isValid`, `markAllAsTouched()`, and `errors()`.
- `QThread` — thin wrapper around Web Workers (`heavy.worker.ts`) for offloading expensive work.
- `QTableModel` / `QItemSelectionModel` / `QModelIndex` — Qt-style table model abstraction used by `TableViewComponent`.
- `QMessageBox` — injectable service for `information`/`question`/`warning` dialogs.
- `Action` — data object for menu/toolbar actions (text, icon, handler).

**`components/widgets/`** — standalone Angular components, each named after its Qt counterpart (e.g. `PushButtonComponent` = `QPushButton`). Every widget is standalone and self-contained with its own CSS.

**`components/layouts/`** — `VBoxLayoutComponent`, `HBoxLayoutComponent`, `GridLayoutComponent`, `FormLayoutComponent` — structural containers that mirror Qt layout managers.

**`pages/`** — routed page components: `HomeComponent` (landing nav), `GalleryComponent` (widget showcase), `FusionComponent` (Qt Fusion style demo).

**`services/`** — `DesktopWidgetService` exposes screen geometry and change events.

### Backend (`src-tauri/src/lib.rs`)

- SQLite database initialized on startup at `app_data_dir/database.db` via `rusqlite`.
- Current schema: `users(id, name, email)`.
- Tauri commands registered: `insert`, `get`, `command_name`.
- Frontend calls backend via `invoke('command_name', payload)` from `@tauri-apps/api/core`.

### Design system (`src/styles.css`)

Global CSS custom properties define colors, typography, spacing, radius, shadows, and transitions under `:root`. All widget CSS files consume these variables. Dark mode is handled automatically via `prefers-color-scheme: dark`. Button surface colors are defined as CSS variables (`--button-bg`, `--button-bg-hover`, `--button-bg-active`, `--button-bg-disabled`) so they adapt to the OS theme automatically.

## Key conventions

- All Angular components are **standalone** — import what you need directly in the component's `imports` array.
- Widget inputs use `QProperty<T>` rather than plain Angular `@Input()` fields when the value needs to be reactive and resettable.
- State classes (like `UserProfileState`) extend `QObjectState` and are provided at the component level via `providers: [MyState]`, then injected with `inject(MyState)`.
- New Tauri commands must be added to the `invoke_handler!` macro in `lib.rs` and registered with the correct argument names (Tauri maps snake_case Rust params to camelCase JS).
- Widget visual style targets Qt Fusion — compact, no glow effects, small border-radius (2-3px), static fills. Avoid modern web aesthetics (large radius, drop shadows, shimmer animations).
