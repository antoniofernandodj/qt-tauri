import {
  ApplicationRef,
  createComponent,
  EnvironmentInjector,
  inject
} from '@angular/core';
import { MessageBoxComponent } from '../components/widgets/message-box/message-box.component';


export type MessageBoxType =
  | 'information'
  | 'warning'
  | 'success'
  | 'critical'
  | 'question';

export type MessageBoxResult =
  | 'ok'
  | 'cancel'
  | 'yes'
  | 'no';

export interface MessageBoxOptions {
  title: string;
  text: string;
  type: MessageBoxType;
  buttons: MessageBoxResult[];
}


export class QMessageBox {

  private appRef = inject(ApplicationRef);
  private injector = inject(EnvironmentInjector);

  private show(
    options: MessageBoxOptions
  ): Promise<MessageBoxResult> {

    return new Promise(resolve => {

      /* =========================
         Create host element
         ========================= */

      const host = document.createElement('div');
      document.body.appendChild(host);

      /* =========================
         Create component
         ========================= */

      const ref = createComponent(MessageBoxComponent, {
        environmentInjector: this.injector,
        hostElement: host
      });

      ref.instance.options = options;

      /* =========================
         Attach to app
         ========================= */

      this.appRef.attachView(ref.hostView);

      /* =========================
         Handle close
         ========================= */

      ref.instance.closed.subscribe(result => {
        resolve(result);

        this.appRef.detachView(ref.hostView);
        ref.destroy();
        host.remove();
      });

    });
  }

  /* =========================
     Public API
     ========================= */

  information(title: string, text: string): Promise<void> {
    return this.show({
      title,
      text,
      type: 'information',
      buttons: ['ok']
    }).then(() => {});
  }

  warning(title: string, text: string): Promise<void> {
    return this.show({
      title,
      text,
      type: 'warning',
      buttons: ['ok']
    }).then(() => {});
  }

  critical(title: string, text: string): Promise<void> {
    return this.show({
      title,
      text,
      type: 'critical',
      buttons: ['ok']
    }).then(() => {});
  }

  async question(
    title: string,
    text: string
  ): Promise<boolean> {
    const r = await this.show({
      title,
      text,
      type: 'question',
      buttons: ['yes', 'no']
    });
    return r === 'yes';
  }
}
