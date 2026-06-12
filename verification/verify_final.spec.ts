import { test, expect } from '@playwright/test';

test('Verify main page UI elements', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');

  // Take screenshot of hero and navbar
  await page.screenshot({ path: 'verification/final_hero.png' });

  // Scroll to footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'verification/final_footer.png' });

  // Open mobile menu to check it
  const menuBtn = page.locator('button[aria-label="Menu"]');
  await menuBtn.click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'verification/final_menu.png' });
});
