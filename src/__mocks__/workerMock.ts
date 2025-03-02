class WorkerMock {
    postMessage() {}
    addEventListener() {}
}

// Глобальный мок для Worker
global.Worker = WorkerMock as any;

export default WorkerMock;
