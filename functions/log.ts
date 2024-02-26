export function log(...args: any[]) {
    const date = new Date();
    console.log(date.toTimeString() + ': ', ...args);
}
