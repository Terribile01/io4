import asyncio
from playwright.async_api import async_playwright

async def verify_glassmorphism():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Set viewport
        await page.set_viewport_size({"width": 1280, "height": 800})

        # Navigate to the app
        await page.goto("http://localhost:3000")
        await page.wait_for_timeout(2000)

        # 1. Main Home Page (NavBar and Hero CTA)
        await page.screenshot(path="/home/jules/verification/glass_home.png")

        # 2. Open CHI SONO Drawer
        await page.click("button:has-text('CHI SONO')")
        await page.wait_for_timeout(1000)
        await page.screenshot(path="/home/jules/verification/glass_drawer.png")

        # Close drawer (click overlay)
        await page.mouse.click(100, 400)
        await page.wait_for_timeout(1000)

        # 3. Open Service Modal
        # Trigger first service button in Hero
        await page.click("button:has-text('WordPress')")
        await page.wait_for_timeout(1000)
        await page.screenshot(path="/home/jules/verification/glass_modal.png")

        # Close modal
        await page.keyboard.press("Escape")
        await page.wait_for_timeout(500)

        # 4. Scroll to Contact Form
        await page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        await page.wait_for_timeout(1000)
        await page.screenshot(path="/home/jules/verification/glass_footer_contact.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(verify_glassmorphism())
