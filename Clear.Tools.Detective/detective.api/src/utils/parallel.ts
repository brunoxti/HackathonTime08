export default class Parallel {
    public static async run(actions: Function[], maxThreads = 2): Promise<any[]> {
        return new Promise((resolve, reject) => {
            let running = 0;
            let result = new Array();
            let order = 0;
            let index = 0;

            const run = () => {
                for (let i = running; i < maxThreads && index < actions.length; i++) {
                    running++;
                    const currentOrder = order++;
                    const action = actions[index++];
                    action()
                        .then(x => result.push({ order: currentOrder, data: x }))
                        .then(x => onFinish())
                }
            }

            const onFinish = () => {
                if (result.length == actions.length) {
                    result.sort((a, b) => a.order - b.order);
                    resolve(result.map(x => x.data));
                    console.log("Finished all thread ");
                    return;
                }

                console.log("Finished thread " + (result.length) + " of " + actions.length);
                running--;
                run();
            }

            run();
        });
    }
}