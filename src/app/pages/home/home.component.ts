import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],

  styles: [`
    .qt-home {
      padding: 32px 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .qt-home-title {
      margin: 0;
      font-size: 20px;
      font-weight: 600;
      color: var(--color-text-primary);
    }

    .qt-home-subtitle {
      margin: 0 0 20px;
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
    }

    .qt-home-grid {
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 100%;
      max-width: 340px;
    }

    .qt-home-card {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 14px 16px;
      background: linear-gradient(180deg, var(--color-bg-hover), var(--color-bg-secondary));
      border: 1px solid var(--color-border-medium);
      border-radius: 4px;
      text-decoration: none;
      cursor: pointer;
      transition: border-color var(--transition-fast), background var(--transition-fast);
    }

    .qt-home-card:hover {
      border-color: var(--color-accent-primary);
      background: var(--color-bg-hover);
    }

    .qt-home-card-icon {
      font-size: 20px;
    }

    .qt-home-card-label {
      font-size: var(--font-size-md);
      font-weight: 500;
      color: var(--color-text-primary);
    }

    .qt-home-card-desc {
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
    }
  `],

  template: `
    <div class="qt-home">
      <h2 class="qt-home-title">qt-tauri</h2>
      <p class="qt-home-subtitle">Widget library demos</p>

      <div class="qt-home-grid">

        <a routerLink="/gallery" class="qt-home-card">
          <div class="qt-home-card-icon">⬛</div>
          <div class="qt-home-card-label">Widget Gallery</div>
          <div class="qt-home-card-desc">Buttons, sliders, inputs, progress bars and more</div>
        </a>

        <a routerLink="/fusion" class="qt-home-card">
          <div class="qt-home-card-icon">🪟</div>
          <div class="qt-home-card-label">Qt Fusion Demo</div>
          <div class="qt-home-card-desc">Groups, tabs, table, dial and datetime controls</div>
        </a>

        <a routerLink="/calendar" class="qt-home-card">
          <div class="qt-home-card-icon">📅</div>
          <div class="qt-home-card-label">QCalendarWidget</div>
          <div class="qt-home-card-desc">Month grid and navigation demo</div>
        </a>

        <a routerLink="/command-link-button" class="qt-home-card">
          <div class="qt-home-card-icon">🔗</div>
          <div class="qt-home-card-label">QCommandLinkButton</div>
          <div class="qt-home-card-desc">Title and description button demo</div>
        </a>

      </div>
    </div>
  `,

})
export class HomeComponent {}
