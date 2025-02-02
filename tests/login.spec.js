// @ts-check
import { test, expect } from '@playwright/test';

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

    await page.fill('#first-name', 'Nabiilah Nad');
    await page.fill('#last-name', 'Iswari');
    await page.fill('#postal-code', '40255');

    await page.click('#continue');
    expect(page.locator('.cart_item')).toHaveCount(2);

    await page.click('#finish');
    expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  });
