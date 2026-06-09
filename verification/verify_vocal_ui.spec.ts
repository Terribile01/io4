import { test, expect } from '@playwright/test';

test('verify vocal ui buttons family', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Wait for auto-open
  await page.waitForTimeout(4000);

  // Check if chat is open
  const chatHeader = page.locator('text=Teresa | Facilissimo Web');
  await expect(chatHeader).toBeVisible();

  // Check for Speaker button (Volume2) in the first message
  const speakerButton = page.locator('button[title="Ascolta risposta"]').first();
  await expect(speakerButton).toBeVisible();

  // Check for Microphone button (Mic)
  const micButton = page.locator('button[title="Parla con Teresa"]');
  await expect(micButton).toBeVisible();

  await page.screenshot({ path: 'vocal_ui_check.png', fullPage: false });
});
