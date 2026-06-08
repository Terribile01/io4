import asyncio
from playwright.async_api import async_playwright
import os

async def run_verification():
    async with async_playwright() as p:
        # Test mobile viewport for height: 100dvh check
        browser = await p.chromium.launch()
        iphone_13 = p.devices['iPhone 13']
        context = await browser.new_context(**iphone_13)
        page = await context.new_page()

        print("Opening page on mobile...")
        await page.goto("http://localhost:3000")

        # Open chat
        print("Opening chat...")
        await page.click('button:has(svg.lucide-message-square)')
        await asyncio.sleep(1)

        # Take screenshot of full screen chat on mobile
        print("Taking mobile chat screenshot...")
        await page.screenshot(path="verification/mobile_chat.png")

        # Verify chat is visible
        chat_header = page.get_by_text("Assistente Facilissimo")
        is_visible = await chat_header.is_visible()
        print(f"Chat visible on mobile: {is_visible}")

        # Desktop check for INP (general layout)
        print("Switching to desktop...")
        desktop_context = await browser.new_context(viewport={'width': 1280, 'height': 800})
        desktop_page = await desktop_context.new_page()
        await desktop_page.goto("http://localhost:3000")
        await desktop_page.screenshot(path="verification/desktop_layout.png")

        await browser.close()

if __name__ == "__main__":
    if not os.path.exists("verification"):
        os.makedirs("verification")
    asyncio.run(run_verification())
