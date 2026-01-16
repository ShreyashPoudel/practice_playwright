import {test, expect} from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'

test('POM Test', async({page}) => {
    //Login
    const login = new LoginPage(page)
    login.gotoLoginPage()
    login.login("shreyash", "shreyash@123")
    await page.waitForTimeout(3000)
    //Home

    //Cart
})