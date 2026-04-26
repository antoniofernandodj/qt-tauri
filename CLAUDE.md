# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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

**`core/`** — framework primitives, the foundation everything else builds on:
- `QProperty<T>` — wraps Angular `signal()` with a `.value` getter/setter and `reset()`. This is the reactive primitive used by all widget inputs.
- `QObjectState` — base class for grouped state. Subclass it and declare fields as `QProperty` instances; `reset()` and `toObject()` iterate them automatically.
- `QThread` — thin wrapper around Web Workers (`heavy.worker.ts`) for offloading expensive work.
- `QTableModel` / `QItemSelectionModel` / `QModelIndex` — Qt-style table model abstraction used by `TableViewComponent`.
- `QMessageBox` — injectable service for `information`/`question`/`warning` dialogs.
- `Action` — data object for menu/toolbar actions (text, icon, handler).

**`components/widgets/`** — 60+ standalone Angular components, each named after its Qt counterpart (e.g. `PushButtonComponent` = `QPushButton`). Every widget is standalone and self-contained with its own CSS.

**`components/layouts/`** — `VBoxLayoutComponent`, `HBoxLayoutComponent`, `GridLayoutComponent`, `FormLayoutComponent` — structural containers that mirror Qt layout managers.

**`services/`** — `DesktopWidgetService` exposes screen geometry and change events.

### Backend (`src-tauri/src/lib.rs`)

- SQLite database initialized on startup at `app_data_dir/database.db` via `rusqlite`.
- Current schema: `users(id, name, email)`.
- Tauri commands registered: `insert`, `get`, `command_name`.
- Frontend calls backend via `invoke('command_name', payload)` from `@tauri-apps/api/core`.

### Design system (`src/styles.css`)

Global CSS custom properties define colors, typography, spacing, radius, shadows, and transitions under `:root`. All widget CSS files consume these variables. Dark mode is handled automatically via `prefers-color-scheme: dark`.

## Key conventions

- All Angular components are **standalone** — import what you need directly in the component's `imports` array.
- Widget inputs use `QProperty<T>` rather than plain Angular `@Input()` fields when the value needs to be reactive and resettable.
- State classes (like `UserProfileState`) extend `QObjectState` and are provided at the component level via `providers: [MyState]`, then injected with `inject(MyState)`.
- New Tauri commands must be added to the `invoke_handler!` macro in `lib.rs` and registered with the correct argument names (Tauri maps snake_case Rust params to camelCase JS).
