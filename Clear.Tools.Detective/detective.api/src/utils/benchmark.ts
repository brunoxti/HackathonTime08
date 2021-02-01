export default class Benchmark {
    static async duration(action: Function): Promise<number> {
        const startTime = process.hrtime.bigint();
        await action();
        const endTime = process.hrtime.bigint();
        const diff = Math.ceil((Number(endTime) - Number(startTime)) / 1000000);
        return diff;
    }
}