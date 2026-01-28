import { Component } from "@angular/core";

@Component({
    standalone: true,
    selector: "QSafeArea",
    template: `<div class="safe-area"></div>`,
    styles: [`
      .safe-area {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 40px;
            background-color: rgba(255, 255, 157, 0.226);
            z-index: 1000;
            pointer-events: none; /* não bloqueia cliques */
        }
    `]
})
export class SafeAreaComponent { }
