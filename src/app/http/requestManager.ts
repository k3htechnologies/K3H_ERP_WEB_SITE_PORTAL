export class RequestManager {
  private controllers = new Map<string, AbortController>();

  createController(requestId: string): AbortSignal {
    const controller = new AbortController();
    this.controllers.set(requestId, controller);
    return controller.signal;
  }

  cancel(requestId: string): void {
    const controller = this.controllers.get(requestId);
    if (controller) {
      controller.abort();
      this.controllers.delete(requestId);
    }
  }

  cancelAll(): void {
    for (const controller of this.controllers.values()) {
      controller.abort();
    }
    this.controllers.clear();
  }
}