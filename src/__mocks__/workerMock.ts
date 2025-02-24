class WorkerMock {
  constructor(stringUrl: string) {
    // Mock constructor
  }
  postMessage(msg: any) {
    // Mock postMessage
  }
  addEventListener(type: string, listener: EventListener) {
    // Mock addEventListener
  }
}

global.Worker = WorkerMock as any;
