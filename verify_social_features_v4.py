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

        # Take screenshot of the whole page to see the background and layout
        await page.screenshot(path="/home/jules/verification/full_page_v3.png", full_page=True)

        # Scroll to bottom to see footer sharing
        await page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        await page.wait_for_timeout(2000)
        await page.screenshot(path="/home/jules/verification/footer_v3.png")

        # Open blog post
        blog_button = page.get_by_text("Leggi tutto").first
        await blog_button.click()
        await page.wait_for_timeout(2000)

        # Take screenshot of blog modal (top)
        await page.screenshot(path="/home/jules/verification/blog_modal_top_v3.png")

        # Scroll blog modal to bottom
        modal_content = page.locator('div[role="dialog"] div.overflow-y-auto')
        await modal_content.evaluate("el => el.scrollTo(0, el.scrollHeight)")
        await page.wait_for_timeout(1000)
        await page.screenshot(path="/home/jules/verification/blog_modal_bottom_v3.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(verify())
