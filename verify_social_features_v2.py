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
        footer_sharing = page.locator('div.flex.flex-wrap.gap-3').last
        if await footer_sharing.is_visible():
            await footer_sharing.screenshot(path="/home/jules/verification/footer_sharing_suite_crop.png")

        await page.screenshot(path="/home/jules/verification/footer_full.png", full_page=True)

        # Open blog post
        blog_button = page.locator('button:has-text("Leggi di più")').first
        await blog_button.click()
        await page.wait_for_timeout(2000)

        # Scroll blog modal to bottom to see sharing buttons
        modal = page.locator('div[role="dialog"] >> div.overflow-y-auto')
        await modal.evaluate("el => el.scrollTo(0, el.scrollHeight)")
        await page.wait_for_timeout(1000)

        await page.screenshot(path="/home/jules/verification/blog_modal_bottom.png")

        # Check for TTS buttons (should be at top)
        await modal.evaluate("el => el.scrollTo(0, 0)")
        await page.wait_for_timeout(1000)
        await page.screenshot(path="/home/jules/verification/blog_modal_top.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(verify())
