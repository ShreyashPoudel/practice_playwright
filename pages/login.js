import  dotenv from 'dotenv';
dotenv.config();

export class LoginPage {
    constructor(page) {
        this.page = page;

        //locators
        this.getStartedLink = page.getByRole('link', {name: 'Get Started'});
        this.emailInput = page.getByRole('textbox', {name: 'Email Address'});
        this.passwordInput = page.getByRole('textbox', {name: 'Password'});
        this.submitButton = page.locator('button[type="submit"]');
    }

    async goto() {
        await this.page.goto(process.env.URL);
    }

    async login(email = process.env.EMAIL, password = process.env.PASSWORD) {
        await this.goto();
        await this.getStartedLink.click();
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
    }
}