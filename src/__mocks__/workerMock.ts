class WorkerMock {
    postMessage() {}
    addEventListener() {}
}

// Глобальный мок для Worker
global.Worker = WorkerMock as typeof Worker;

export default WorkerMock;
