export class QThread {
  private worker?: Worker;

  start(iterations: number, onFinished: (result: number) => void) {

    if (this.worker) {
      throw new Error('Thread already running');
    }

    this.worker = new Worker(
      new URL('../heavy.worker', import.meta.url),
      { type: 'module' }
    );

    this.worker.onmessage = ({ data }) => {
      if (data.type === 'finished') {
        onFinished(data.result);
        this.quit();
      }
    };

    this.worker.onerror = (err) => {
      console.error('Worker error', err);
      this.quit();
    };

    this.worker.postMessage({ iterations });
  }

  quit() {
    this.worker?.terminate();
    this.worker = undefined;
  }
}
