# ROADMAP.md — qt-tauri Widget Library

Tracks what has been built, what exists as a stub, and what is missing compared to the full Qt 6 widget set. The goal is a web-based toolkit that is as feature-complete and production-ready as Qt Widgets.

---

## Legend

| Symbol | Meaning |
|--------|---------|
| ✅ | Implemented — real logic, inputs, outputs, Qt-style CSS |
| 🟡 | Stub — directory and selector exist, no real logic yet |
| ❌ | Not started — no file exists |

---

## Layouts

| Qt Class | Component | Status | Notes |
|---|---|---|---|
| `QVBoxLayout` | `VBoxLayoutComponent` | ✅ | `spacing`, `flex` input |
| `QHBoxLayout` | `HBoxLayoutComponent` | ✅ | `spacing`, `flex` input |
| `QGridLayout` | `GridLayoutComponent` | ✅ | Basic grid via CSS grid |
| `QFormLayout` | `FormLayoutComponent` | ✅ | Label+field rows |
| `QStackedLayout` | `StackedLayoutComponent` | ✅ | Index-driven page switching |
| `QBoxLayout` (base) | — | ❌ | Covered by VBox/HBox |
| `QSpacerItem` | — | ❌ | Could be a simple flex spacer component |

---

## Basic Widgets

| Qt Class | Component | Status | Notes |
|---|---|---|---|
| `QPushButton` | `PushButtonComponent` | ✅ | kind: secondary/primary/destructive/ghost; checked state |
| `QCheckBox` | `CheckBoxComponent` | ✅ | tristate support, QProperty binding |
| `QRadioButton` | `RadioButtonComponent` | ✅ | group-aware |
| `QRadioGroup` | `RadioGroupComponent` | ✅ | manages exclusive selection |
| `QButtonGroup` | `ButtonGroupComponent` | ✅ | exclusive toggle, checked CSS state |
| `QCommandLinkButton` | `CommandLinkButtonComponent` | ✅ | text, description and default icon |
| `QToolButton` | `ToolButtonComponent` | 🟡 | binds `Action`, no styling/popup |
| `QLabel` | `LabelComponent` | ✅ | alignment, wordWrap, rich HTML |
| `QLineEdit` | `LineEditComponent` | ✅ | placeholder, maxLength, readOnly, password, clearButton |
| `QTextEdit` | `TextEditComponent` | ✅ | plain/HTML, readOnly, placeholder |
| `QPlainTextEdit` | — | ❌ | plain-text-only variant of TextEdit |
| `QTextBrowser` | `TextBrowserComponent` | 🟡 | stub only |
| `QSpinBox` | `SpinBoxComponent` | ✅ | min/max/step/prefix/suffix, QProperty |
| `QDoubleSpinBox` | `DoubleSpinBoxComponent` | 🟡 | stub only — trivial extension of SpinBox |
| `QSlider` | `SliderComponent` | ✅ | horizontal/vertical, tick marks, QProperty |
| `QDial` | `DialEditComponent` | ✅ | mouse-drag knob, min/max/model |
| `QScrollBar` | `ScrollBarComponent` | 🟡 | stub only |
| `QRangeSlider` | `RangeSliderComponent` | 🟡 | stub only |
| `QComboBox` | `ComboBoxComponent` | ✅ | items array, QProperty binding |
| `QFontComboBox` | `FontComboboxComponent` | 🟡 | stub only |
| `QEditableComboBox` | `EditableComboBoxComponent` | 🟡 | stub only — editable variant |
| `QProgressBar` | `ProgressBarComponent` | ✅ | min/max/value, indeterminate, orientation |
| `QCalendarWidget` | `CalendarWidgetComponent` | ✅ | month grid, prev/next navigation, selected date output |
| `QDateTimeEdit` | `DateTimeEditComponent` | ✅ | date+time pickers, min/max, QProperty |
| `QDateEdit` | `DateEditComponent` | ✅ | date-only picker |
| `QTimeEdit` | `TimeEditComponent` | ✅ | time-only picker |
| `QLCDNumber` | — | ❌ | segmented display, number/hex/oct modes |
| `QKeySequenceEdit` | — | ❌ | captures keyboard shortcuts |
| `QAbstractButton` | — | ❌ | shared base class (internal) |
| `QAbstractSlider` | — | ❌ | shared base class (internal) |
| `QAbstractSpinBox` | — | ❌ | shared base class (internal) |

---

## Container / Compound Widgets

| Qt Class | Component | Status | Notes |
|---|---|---|---|
| `QFrame` | `FrameComponent` | ✅ | box/panel/styled variants, display:contents trick |
| `QGroupBox` | `GroupBoxComponent` | ✅ | checkable, disabled, title |
| `QTabWidget` | `TabWidgetComponent` | ✅ | dynamic tabs, active tab tracking |
| `QTabBar` | `TabBarComponent` | 🟡 | stub only |
| `QStackedWidget` | `StackedWidgetComponent` | ✅ | page navigation, prev/next signals |
| `QSplitter` | `SplitterComponent` | ✅ | horizontal/vertical, drag handle, collapsible |
| `QSplitterHandle` | `SplitterHandleComponent` | 🟡 | stub — should be internal to Splitter |
| `QToolBox` | `ToolBoxComponent` | ✅ | collapsible panels, active item |
| `QScrollArea` | `ScrollAreaComponent` | ✅ | overflow scroll, flex-fill |
| `QMainWindow` | `MainWindowComponent` | 🟡 | thin wrapper around SafeArea, no dock/toolbar slots |
| `QCentralWidget` | `CentralWidgetComponent` | 🟡 | thin `<div>` wrapper only |
| `QDockWidget` | — | ❌ | detachable side panels |
| `QMdiArea` | — | ❌ | multiple document interface container |
| `QMdiSubWindow` | — | ❌ | floating child windows inside MdiArea |
| `QSizeGrip` | — | ❌ | resize handle for windows/dialogs |
| `QRubberBand` | — | ❌ | selection rectangle overlay |
| `QLine` / `QFrame (HLine/VLine)` | `LineComponent` + `SeparatorComponent` | 🟡 / ✅ | Separator done; Line stub |

---

## Dialogs

| Qt Class | Component | Status | Notes |
|---|---|---|---|
| `QDialog` | `DialogComponent` | 🟡 | stub — needs modal overlay + close logic |
| `QDialogButtonBox` | `DialogButtonBoxComponent` | 🟡 | stub — standardized OK/Cancel/Apply buttons |
| `QMessageBox` | `MessageBoxComponent` + service | ✅ | information/question/warning/critical |
| `QColorDialog` | `ColorDialogComponent` | ✅ | color picker with hex/RGB/HSL |
| `QFileDialog` | `FileDialogComponent` | 🟡 | stub — requires Tauri FS API integration |
| `QFontDialog` | — | ❌ | font picker |
| `QInputDialog` | `InputDialogComponent` | 🟡 | stub — text/int/double/item input |
| `QErrorMessage` | `ErrorMessageComponent` | 🟡 | stub |
| `QProgressDialog` | `ProgressDialogComponent` | 🟡 | stub — modal with ProgressBar + Cancel |
| `QWizard` | `WizardComponent` | 🟡 | stub — multi-step form wizard |
| `QWizardPage` | — | ❌ | individual wizard step |

---

## Menus, Toolbars & Actions

| Qt Class | Component | Status | Notes |
|---|---|---|---|
| `QMenuBar` | `MenuBarComponent` | ✅ | renders menus, closeAll() |
| `QMenu` | `MenuComponent` | ✅ | open/close, items, separators |
| `QAction` / `Action` | `Action` (core) | ✅ | text, icon, handler, enabled, checked |
| `QToolBar` | `ToolBarComponent` | 🟡 | renders `Action` items, no overflow |
| `QToolButton` | `ToolButtonComponent` | 🟡 | binds `Action`, no menu-arrow |
| `QShortcut` | `ShortcutComponent` | 🟡 | stub — keyboard shortcut registration |
| `QStatusBar` | `StatusBarComponent` | ✅ | left message + right permanent widget |
| `QStatusTip` | `StatusTipComponent` | 🟡 | stub |
| `QToolTip` | `ToolTipComponent` | 🟡 | stub — CSS tooltip exists natively, Angular wrapper missing |
| `QContextMenu` | `ContextMenuComponent` | 🟡 | stub — right-click menu |
| `QSystemTrayIcon` | `SystemTrayIconComponent` | ✅ | simulated (no native tray — Tauri tray not yet wired) |

---

## Item Views (Model/View)

| Qt Class | Component | Status | Notes |
|---|---|---|---|
| `QTableView` | `TableViewComponent` | ✅ | QTableModel binding, headers, rows |
| `QTableWidget` | — | ❌ | convenience table with built-in item model |
| `QListView` | `ListViewComponent` | 🟡 | stub only |
| `QListWidget` | — | ❌ | convenience list with built-in items |
| `QTreeView` | `TreeViewComponent` | 🟡 | stub only |
| `QTreeWidget` | — | ❌ | convenience tree with built-in items |
| `QColumnView` | `ColumnViewComponent` | 🟡 | stub only |
| `QHeaderView` | — | ❌ | resizable column/row headers |
| `QIconView` | `IconViewComponent` | 🟡 | stub only |
| `QAbstractItemView` | — | ❌ | shared base class (internal) |
| `QSortFilterProxyModel` | — | ❌ | client-side sorting & filtering |
| `QStandardItemModel` | `SimpleTableModel` (partial) | 🟡 | only flat table; no tree, no icons |
| `QItemDelegate` | — | ❌ | custom cell rendering |

---

## Core Framework

| Qt Concept | Implementation | Status | Notes |
|---|---|---|---|
| `QProperty<T>` | `core/property.ts` | ✅ | wraps Angular `signal()` |
| `QObjectState` | `core/qobjectState.ts` | ✅ | reset(), toObject() over QProperty fields |
| `QThread` | `core/qthread.ts` | ✅ | Web Worker wrapper |
| `QTableModel` | `core/qtable-model.ts` | ✅ | SimpleTableModel, QModelIndex, QItemSelectionModel |
| `QMessageBox` service | `core/message-box.ts` | ✅ | injectable dialog service |
| `Action` | `core/action.ts` | ✅ | menu/toolbar action data object |
| `Separator` | `core/separator.ts` | ✅ | menu separator marker |
| `QSettings` | — | ❌ | persisted key-value store (use localStorage / Tauri store) |
| `QClipboard` | — | ❌ | system clipboard read/write |
| `QMimeData` | — | ❌ | drag-and-drop MIME payload |
| `QScreen` | `DesktopWidgetService` (partial) | 🟡 | geometry events; no DPI awareness |
| `QEvent` bus | — | ❌ | custom inter-component event propagation |
| `QPalette` / theme API | CSS variables only | 🟡 | dark/light auto via `prefers-color-scheme`; no runtime switching |
| `QStyle` / `QStyleOption` | CSS variables only | 🟡 | Fusion style approximated; no runtime style swapping |
| Accessibility (`QAccessible`) | — | ❌ | ARIA roles, screen reader support |
| Internationalization (`QTranslator`) | — | ❌ | runtime locale switching |

---

## Drag & Drop

| Qt Concept | Component | Status | Notes |
|---|---|---|---|
| `QDrag` | `DragComponent` | ✅ | HTML5 drag source with payload |
| `QDropEvent` / drop target | `DropComponent` | ✅ | accepts types, emits drop payload |
| `QMimeData` | — | ❌ | structured MIME payload (currently plain string) |

---

## Pages & Navigation (project-specific)

| Page | Status | Notes |
|---|---|---|
| `HomeComponent` | ✅ | landing nav cards |
| `GalleryComponent` | ✅ | full widget showcase |
| `FusionComponent` | ✅ | Qt Fusion style demo |

---

## Phase Roadmap

### Phase 1 — Foundation ✅ COMPLETE
Core reactive primitives (`QProperty`, `QObjectState`, `QThread`, `QTableModel`), all basic input widgets (button, checkbox, radio, line-edit, spin-box, combo-box, slider, dial, progress-bar, text-edit, label, date/time pickers), all four layout managers, GroupBox, Frame, ScrollArea, Splitter, Tabs, StackedWidget, ToolBox, MessageBox, ColorDialog, StatusBar, MenuBar, Menu, DragDrop, design system CSS variables with automatic dark mode.

### Phase 2 — Complete the Stubs (high value, low effort)
Priority order:

1. **`QDoubleSpinBox`** — trivial: reuse SpinBox with `step=0.1`, `decimals` input.
2. **`QDialog`** — modal overlay + ESC/backdrop close + `accepted`/`rejected` signals.
3. **`QDialogButtonBox`** — standard button sets (OK/Cancel/Apply/Close) inside a Dialog.
4. **`QInputDialog`** — text/number input in a Dialog.
5. **`QProgressDialog`** — Dialog wrapping ProgressBar with a Cancel button.
6. **`QContextMenu`** — position-aware right-click menu (reuse MenuComponent).
7. **`QListView` / `QListWidget`** — vertical scrollable item list, selectable rows.
8. **`QCalendarWidget`** — month grid, prev/next navigation, selected date output.
9. **`QRangeSlider`** — dual-handle slider for min/max range selection.
10. **`QTextBrowser`** — read-only TextEdit with link navigation.
11. **`QToolTip`** — Angular directive wrapping CSS `title` or a positioned overlay.
12. **`QShortcut`** — `@HostListener('keydown')` directive registering key combos.
13. **`QLCDNumber`** — 7-segment CSS display.
14. **`QLine`** / horizontal-vertical separator — trivial CSS `<hr>` wrapper.

### Phase 3 — Advanced Widgets (medium effort)
1. **`QTreeView` / `QTreeWidget`** — recursive expandable nodes, selection model.
2. **`QTableWidget`** — convenience wrapper: built-in item model, inline cell editing.
3. **`QDockWidget`** — dockable/floatable panel inside QMainWindow.
4. **`QWizard` + `QWizardPage`** — multi-step form with Back/Next/Finish flow.
5. **`QHeaderView`** — sortable, resizable column headers for TableView/TreeView.
6. **`QFontDialog`** — font family/size/style picker.
7. **`QFileDialog`** — Tauri FS picker integration (`dialog.open` / `dialog.save`).
8. **`QMdiArea` + `QMdiSubWindow`** — floating subwindow workspace.
9. **`QKeySequenceEdit`** — keyboard shortcut capture field.
10. **`QPlainTextEdit`** — plain-only variant of TextEdit (no rich text overhead).

### Phase 4 — Framework Maturity (high effort)
1. **`QSortFilterProxyModel`** — client-side sort + filter layer over any QTableModel.
2. **`QItemDelegate`** — custom cell rendering/editing per column.
3. **`QSettings`** — persistent key-value store backed by `localStorage` or Tauri store plugin.
4. **`QClipboard`** — read/write system clipboard via the Clipboard API.
5. **`QEvent` bus** — typed inter-component event propagation (optional — Angular services may suffice).
6. **`QPalette` / runtime theme switching** — programmatic light/dark/custom theme toggle without OS dependency.
7. **`QStyle` API** — runtime style selection (Fusion, Windows, Breeze) by swapping CSS variable sets.
8. **`QScreen` / DPI** — pixel-ratio-aware sizing, multi-monitor support via Tauri.
9. **Accessibility (ARIA)** — roles, labels, and keyboard navigation on every widget.
10. **Internationalization** — `QTranslator`-style locale service with runtime string replacement.

### Phase 5 — Polish & Ecosystem
1. Full Fusion style parity with Qt 6 — audit every widget against Qt source screenshots.
2. Storybook / standalone demo page for every widget (replace/extend the Gallery page).
3. Comprehensive keyboard navigation on all widgets (Tab order, Arrow key handling).
4. Animation layer — `QPropertyAnimation`-style transitions driven by CSS or Angular Animations.
5. Print support — `QPrintDialog`, `QPrintPreviewDialog` via browser `window.print()`.
6. Widget theming docs — how to write a custom theme by overriding CSS variable sets.
7. Published npm package so the widget library can be used independently of Tauri.

---

## Summary Counts

| Category | Total Qt widgets | ✅ Done | 🟡 Stub | ❌ Missing |
|---|---|---|---|---|
| Layouts | 7 | 5 | 0 | 2 |
| Basic Widgets | 24 | 13 | 8 | 3 |
| Container/Compound | 16 | 8 | 5 | 3 |
| Dialogs | 11 | 3 | 6 | 2 |
| Menus & Actions | 10 | 5 | 4 | 1 |
| Item Views | 10 | 1 | 4 | 5 |
| Core Framework | 14 | 6 | 3 | 5 |
| Drag & Drop | 3 | 2 | 0 | 1 |
| **Total** | **95** | **43 (45%)** | **30 (32%)** | **22 (23%)** |

Completing Phase 2 (stub → real) would bring the "done" count to ~75%, with only the advanced model/view and framework infrastructure left for Phases 3–4.
