// @ts-check
import { test, expect } from '@playwright/test';

// @ts-ignore
const { default: loginActions } = require ('../tests/pmo/object/loginActions');
const { default: checkoutActions } = require ('../tests/pmo/object/checkoutActions');

test('login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  const inputUsername = page.locator('*#user-name');
  await inputUsername.fill('standard_user');
  await expect (inputUsername).toHaveValue('standard_user');

  const inputPassword = page.locator('*#password');
  await inputPassword.fill('secret_sauce');
  expect (inputPassword).toHaveValue('secret_sauce');

  const buttonLogin = page.locator('*#login-button');
  await buttonLogin.click();
  expect(page.locator('.app_logo')).toBeVisible();
});

test('checkout after login', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    expect(page.locator('.app_logo')).toBeVisible();
  
    const buttonAddToCart1 = page.locator('*#add-to-cart-sauce-labs-backpack');
    await buttonAddToCart1.click();

    const buttonAddToCart2 = page.locator('*#add-to-cart-sauce-labs-bike-light');
    await buttonAddToCart2.click();

    await page.click('.shopping_cart_link');
    expect(page.locator('.cart_list')).toBeVisible();

    await page.click('#checkout');

    const inputFirstName = page.locator('*#first-name');
    await inputFirstName.fill('Nabiilah Nada');
    expect (inputFirstName).toHaveValue('Nabiilah Nada');

    const inputLastName = page.locator('*#last-name');
    await inputLastName.fill('Iswari');
    expect (inputLastName).toHaveValue('Iswari');

    const inputPostalCode = page.locator('*#postal-code');
    await inputPostalCode.fill('40255');
    expect (inputPostalCode).toHaveValue('40255');

    await page.click('#continue');
    expect(page.locator('.cart_item')).toHaveCount(2);

    await page.click('#finish');
    expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  });

test('login with pmo', async ({ page }) => {
  const loginObj = new loginActions(page);
  await loginObj.goto();
  await loginObj.inputLogin();
})

test('checkout with pmo', async ({ page }) => {
  const loginObj = new loginActions(page);
  const checkoutObj = new checkoutActions(page);

  await loginObj.goto();
  await loginObj.inputLogin();

  await checkoutObj.addToCart();
  await checkoutObj.checkout();
});