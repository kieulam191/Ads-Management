import timenode from 'timer-node';

const { Timer, Time, TimerOptions } = timenode;

const timer = new Timer({
    label: 'test-timer',
});

export function getTS() {
    return Date.now();
}

export function start() {
    timer.start();
}


export function stop() {
    timer.stop();
}

export function getMinute() {
    return timer.time().m;
}

export function isRunning() {
   return timer.isRunning();
}

export function convertTS(dateTime = Date()) {
    return new Date(dateTime).toISOString();
}