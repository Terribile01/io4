import { test, expect } from '@playwright/test';

test('verify roi calculator enhancements', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Wait for the ROI calculator to be visible
  const calculator = page.locator('#roi-calculator-widget');
  await calculator.scrollIntoViewIfNeeded();

  // Check for the new educational text
  await expect(page.getByText('Trascina i cursori per definire lo status della tua attività')).toBeVisible();
  await expect(page.getByText('Serve per supporre una metrica aderente partendo dalla tua reale capacità')).toBeVisible();
  await expect(page.getByText('Rappresenta il costo medio che paghi alle piattaforme')).toBeVisible();
  await expect(page.getByText('È la capacità del tuo sito di convertire i visitatori in contatti reali')).toBeVisible();
  await expect(page.getByText('Indica la tua efficacia commerciale nel trasformare un preventivo')).toBeVisible();
  await expect(page.getByText('Il valore economico medio generato da un cliente acquisito')).toBeVisible();

  // Check for chat suggestion
  await expect(page.getByText('Hai dubbi su questi valori?')).toBeVisible();
  await expect(page.getByText('Chiedi aiuto alla nostra AI in chat')).toBeVisible();

  // Take screenshot
  await calculator.screenshot({ path: 'verification/roi_calculator_updated.png' });
});
