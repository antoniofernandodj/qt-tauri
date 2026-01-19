// src/app/components/widgets/qdesktopwidget.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ScreenGeometry {
  width: number;
  height: number;
}

@Injectable({
  providedIn: 'root'
})
export class DesktopWidgetService {
  constructor() {}

  screenGeometry(): ScreenGeometry {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  screenGeometryChanges(): Observable<ScreenGeometry> {
    return new Observable(subscriber => {
      subscriber.next(this.screenGeometry());
      const handler = () => subscriber.next(this.screenGeometry());
      window.addEventListener('resize', handler);
      return () => window.removeEventListener('resize', handler);
    });
  }

  screenOrientation(): 'portrait' | 'landscape' {
    return window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
  }


  screenOrientationChanges(): Observable<'portrait' | 'landscape'> {
    return new Observable(subscriber => {
      const emit = () => subscriber.next(this.screenOrientation());
      emit();
      window.addEventListener('resize', emit);
      return () => window.removeEventListener('resize', emit);
    });
  }

  isSmallScreen(maxWidth: number = 768): boolean {
    return window.innerWidth <= maxWidth;
  }

  isLargeScreen(minWidth: number = 1200): boolean {
    return window.innerWidth >= minWidth;
  }

  screenBreakpoints(breakpoints: number[] = [576, 768, 992, 1200]): Observable<number> {
    return new Observable(subscriber => {
      const emit = () => {
        const width = window.innerWidth;
        const bp = breakpoints.find(b => width <= b) || breakpoints[breakpoints.length - 1];
        subscriber.next(bp);
      };
      emit();
      window.addEventListener('resize', emit);
      return () => window.removeEventListener('resize', emit);
    });
  }

  isFullscreen(): boolean {
    return !!document.fullscreenElement;
  }

  toggleFullscreen(): void {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  mousePosition(): Observable<{ x: number; y: number }> {
    return new Observable(subscriber => {
      const handler = (event: MouseEvent) => subscriber.next({ x: event.clientX, y: event.clientY });
      window.addEventListener('mousemove', handler);
      return () => window.removeEventListener('mousemove', handler);
    });
  }

  screenPixelRatio(): number {
    return window.devicePixelRatio;
  }

}
