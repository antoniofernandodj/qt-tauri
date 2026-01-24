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

      const host = document.createElement('div');
      document.body.appendChild(host);

      const ref = createComponent(MessageBoxComponent, {
        environmentInjector: this.injector,
        hostElement: host
      });

      ref.instance.options = options;

      this.appRef.attachView(ref.hostView);

      ref.instance.closed.subscribe(result => {
        resolve(result);

        this.appRef.detachView(ref.hostView);
        ref.destroy();
        host.remove();
      });

    });
  }

  async information(title: string, text: string): Promise<void> {
    await this.show({
      title,
      text,
      type: 'information',
      buttons: ['ok']
    });
  }

  async warning(title: string, text: string): Promise<void> {
    await this.show({
      title,
      text,
      type: 'warning',
      buttons: ['ok']
    });
  }

  async critical(title: string, text: string): Promise<void> {
    await this.show({
      title,
      text,
      type: 'critical',
      buttons: ['ok']
    });
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
