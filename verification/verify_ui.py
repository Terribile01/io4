import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width': 1280, 'height': 800})
        await page.goto('http://localhost:3000')
        await asyncio.sleep(2)  # Wait for animations

        # Capture Hero and Navbar
        await page.screenshot(path='verification/hero_navbar.png')

        # Open CHI SONO drawer
        await page.click('button:has-text("CHI SONO")')
        await asyncio.sleep(1)
        await page.screenshot(path='verification/chi_sono_drawer.png')

        # Close drawer
        await page.keyboard.press('Escape')
        await asyncio.sleep(1)

        # Scroll to Services
        await page.evaluate("document.getElementById('servizi').scrollIntoView()")
        await asyncio.sleep(1)
        await page.screenshot(path='verification/servizi_section.png')

        # Open a Service Modal
        await page.evaluate("window.scrollTo(0, 0)")
        await asyncio.sleep(1)
        # Click on the first purple button
        await page.click('button:has-text("WordPress, Wix")')
        await asyncio.sleep(1)
        await page.screenshot(path='verification/service_modal.png')

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
