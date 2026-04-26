# Project: qt-tauri

## Overview
`qt-tauri` is a project that aims to replicate the Qt framework's widget set using **Angular 17** for the frontend and **Tauri 2** (Rust) for the backend. It provides a web-based UI toolkit with components and state management patterns inspired by Qt.

## Tech Stack
- **Frontend:** Angular 17 (Standalone components)
- **Backend:** Tauri 2 (Rust)
- **Database:** SQLite (via `rusqlite` in Rust)
- **Styling:** CSS (per component)
- **Concurrency:** Web Workers (`heavy.worker.ts`) and `QThread` (Angular wrapper)

## Project Structure

### Frontend (`src/app/`)
- `components/widgets/`: A comprehensive collection of Qt-inspired widgets (e.g., `PushButton`, `Label`, `LineEdit`, `Calendar`, `Table`, etc.).
- `components/layouts/`: Layout management components (e.g., `VBoxLayout`, `HBoxLayout`, `GridLayout`).
- `core/`: Core logic and base classes for the framework:
    - `QProperty`: A wrapper for reactive state properties.
    - `QObjectState`: Base class for managing component state.
    - `QThread`: Utility for offloading tasks.
    - `QTableModel`: Qt-like table modeling.
    - `QMessageBox`: Utility for dialogs.
- `services/`: Desktop and system services.

### Backend (`src-tauri/`)
- `src/lib.rs`: Contains Tauri commands (`insert`, `get`), database initialization, and main entry point.
- `src/main.rs`: Calls the `run` function from `lib.rs`.
- `Cargo.toml`: Backend dependencies including `tauri`, `rusqlite`, and `serde`.

## Architecture & Patterns
- **Qt-like State Management:** The project uses `QProperty` and `QObjectState` to mimic Qt's property system. State is centralized in state classes (e.g., `UserProfileState`).
- **Widget Consistency:** Angular components are named after their Qt counterparts (e.g., `QPushButton` -> `PushButtonComponent`).
- **Tauri Integration:** The frontend communicates with the Rust backend via Tauri's `invoke` API.
- **Database:** A local SQLite database (`database.db`) is initialized in the application data directory. Currently, it manages a `users` table.

## Key Files
- `src/app/app.component.ts`: Main entry point demonstrating the use of various widgets and backend integration.
- `src-tauri/src/lib.rs`: Backend logic and database schema management.
- `src/app/components/qt-widgets.ts`: Central export file for all widgets.

## Development Workflow
- **Frontend:** `npm run start` or `ng serve`
- **Tauri (Dev):** `npm run tauri dev`
- **Build:** `npm run build` followed by `npm run tauri build`
