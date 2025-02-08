import checkoutPage from "../locator/checkoutPage";
import { expect } from "@playwright/test";

export default class checkoutActions {
    /**
     * 
     * @param {import('@playwright/test').Page} page 
     */
    constructor(page) {
        this.page = page;
        this.checkoutPage = new checkoutPage();

        this.clickButtonAddToCart1 = page.locator(this.checkoutPage.clickButtonAddToCart1);
        this.clickButtonAddToCart2 = page.locator(this.checkoutPage.clickButtonAddToCart2);
        this.clickButtonCart = page.locator(this.checkoutPage.clickButtonCart);
        this.cartList = page.locator(this.checkoutPage.cartList);
        this.clickButtonCheckout = page.locator(this.checkoutPage.clickButtonCheckout);
        this.inputFirstName = page.locator(this.checkoutPage.inputFirstName);
        this.inputLastName = page.locator(this.checkoutPage.inputLastName);
        this.inputPostalCode = page.locator(this.checkoutPage.inputPostalCode);
        this.clickButtonContinue = page.locator(this.checkoutPage.clickButtonContinue);
        this.cartItem = page.locator(this.checkoutPage.cartItem);
        this.clickButtonFinish = page.locator(this.checkoutPage.clickButtonFinish);
        this.completeOrder = page.locator(this.checkoutPage.completeOrder);
    }

    async addToCart() {
        await this.clickButtonAddToCart1.click();
        await this.clickButtonAddToCart2.click();
    }

    async checkout() {
        await this.clickButtonCart.click();
        await expect(this.cartList).toBeVisible();

        await this.clickButtonCheckout.click();
        await this.inputFirstName.fill('Nabiilah Nada');
        await expect(this.inputFirstName).toHaveValue('Nabiilah Nada');

        await this.inputLastName.fill('Iswari');
        await expect(this.inputLastName).toHaveValue('Iswari');

        await this.inputPostalCode.fill('40255');
        await expect(this.inputPostalCode).toHaveValue('40255');

        await this.clickButtonContinue.click();
        await expect(this.cartItem).toHaveCount(2);

        await this.clickButtonFinish.click();
        await expect(this.completeOrder).toHaveText('Thank you for your order!');
    }
}
