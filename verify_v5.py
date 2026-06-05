import asyncio
from playwright.async_api import async_playwright

async def verify():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(viewport={'width': 1280, 'height': 2000})
        page = await context.new_page()

        await page.goto("http://localhost:3000")
        await page.wait_for_timeout(3000)

        # Screenshot of the hero/background
        await page.screenshot(path="/home/jules/verification/v5_hero.png")

        # Scroll to footer
        await page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        await page.wait_for_timeout(2000)
        await page.screenshot(path="/home/jules/verification/v5_footer.png")

        # Open Blog
        await page.get_by_text("Leggi tutto").first.click()
        await page.wait_for_timeout(2000)

        # Top of modal
        await page.screenshot(path="/home/jules/verification/v5_blog_top.png")

        # Scroll modal
        await page.mouse.wheel(0, 2000)
        await page.wait_for_timeout(1000)
        await page.screenshot(path="/home/jules/verification/v5_blog_bottom.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(verify())
