from playwright.sync_api import Page, expect, sync_playwright

def test_roi_calculator_enhancements(page: Page):
    print("Navigating to homepage...")
    page.goto("http://localhost:3000/")

    print("Locating calculator...")
    calculator = page.locator("#roi-calculator-widget")
    calculator.scroll_into_view_if_needed()

    print("Verifying text...")
    expect(page.get_by_text("Trascina i cursori per definire lo status della tua attività")).to_be_visible()

    print("Taking screenshot...")
    calculator.screenshot(path="verification/roi_calculator_updated.png")
    print("Screenshot saved.")

if __name__ == "__main__":
    with sync_playwright() as p:
        print("Launching browser...")
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            test_roi_calculator_enhancements(page)
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()
