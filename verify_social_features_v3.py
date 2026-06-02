import asyncio
from playwright.async_api import async_playwright
import os

async def verify():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(viewport={'width': 1280, 'height': 800})
        page = await context.new_page()

        # Go to the app
        await page.goto("http://localhost:3000")
        await page.wait_for_timeout(5000) # Wait for images and animations

        # Take screenshot of footer
        # Scroll to bottom
        await page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        await page.wait_for_timeout(2000)

        # Find the sharing suite in footer
        # The footer sharing suite is in a div with "Condividi Facilissimo Web"
        footer_sharing_label = page.locator('text=Condividi Facilissimo Web')
        if await footer_sharing_label.is_visible():
            # Get the parent container that holds the buttons
            footer_sharing_container = page.locator('div:has(> text="Condividi Facilissimo Web")').last
            await footer_sharing_container.screenshot(path="/home/jules/verification/footer_sharing_suite_crop_v2.png")

        await page.screenshot(path="/home/jules/verification/footer_full_v2.png", full_page=True)

        # Open blog post - corrected text "Leggi tutto"
        blog_button = page.locator('text=Leggi tutto').first
        await blog_button.click()
        await page.wait_for_timeout(2000)

        # Check for TTS buttons (should be at top)
        # The modal has role="dialog"
        modal = page.locator('div[role="dialog"]')
        # Scroll to top of modal content
        modal_content = modal.locator('div.overflow-y-auto')
        await modal_content.evaluate("el => el.scrollTo(0, 0)")
        await page.wait_for_timeout(1000)
        await modal.screenshot(path="/home/jules/verification/blog_modal_top_v2.png")

        # Scroll blog modal to bottom to see sharing buttons
        await modal_content.evaluate("el => el.scrollTo(0, el.scrollHeight)")
        await page.wait_for_timeout(1000)
        await modal.screenshot(path="/home/jules/verification/blog_modal_bottom_v2.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(verify())
