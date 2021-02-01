export default class IntranetActions {
    static username;
    static password;
    static login(username = null, password = null) {
        if (username && password) {
            this.username = username;
            this.password = password;
        }

        return async (page) => {
            const retry = 3;
            let isLogged = false;
            console.log("Starting Login to Intranet");
            for (let i = 0; i < retry; i++) {
                await page.goto("http://hml.clear.com.br/intranet/signin/Index?controller=SignIn", {
                    timeout: 0
                });
                await page.type('#username', this.username);
                await page.type('#password', this.password);
                await page.click('.bt_blue_tab');
                console.log('Login button clicked');
                await page.waitForSelector('#container_footer');

                if (await page.$("#form_id") != null) {
                    console.log('Login failed, retrying');
                    continue;
                }

                isLogged = true;
                console.log('Logged with success');
                break;
            }

            if (!isLogged)
                throw "Login error: Verify if username and password are right";
        }
    }
}