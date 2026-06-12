import { test, expect } from '@playwright/test';

test('verify chi sono drawer and favicon', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Check favicon link
  const favicon = await page.locator('link[rel="icon"]');
  await expect(favicon).toHaveAttribute('href', '/favicon.jfif');

  // Trigger Chi Sono drawer (from Navbar hamburger -> mobile menu might be open or need to click)
  // Or just use the Footer "CHI SONO" link which is easier
  const chiSonoFooter = page.locator('footer button:has-text("CHI SONO")');
  await chiSonoFooter.scrollIntoViewIfNeeded();
  await chiSonoFooter.click();

  // Check drawer content
  const drawer = page.locator('h2:has-text("Chi Sono")');
  await expect(drawer).toBeVisible();

  const img = page.locator('img[alt="Maria Teresa Rogani"]');
  await expect(img).toHaveAttribute('src', '/assets/uploads/maria%20teresa%20rogani.jpg');

  const bio = page.locator('text=Il mio approccio al web nasce da basi solide');
  await expect(bio).toBeVisible();

  const skillsList = page.locator('ul:has-text("Grafica Pubblicitaria")');
  await expect(skillsList).toBeVisible();

  await page.screenshot({ path: 'verification/chi_sono_updated.png', fullPage: false });
});
