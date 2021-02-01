export default class AsyncFunction {
    public static create(args: string[], functionBody: string) {
        const fn = new Function(...args, `
        return (async () => {
            ${functionBody}
        })()`);

        return fn;
    }
}