import test from '@playwright/test'

require('./plants/changed.json').slice(0, 149).forEach(plant => {
  test('make screenshot: ' + plant, async ({ page }) => {
    await page.setViewportSize({ width: 450, height: 800 })
    // page.on('console', msg => console.log(msg.text()))
    await page.goto(`http://${plant}.localhost:4000/plants/${plant}/index.html`)
    await page.evaluate(() => window.frameRate(80))
    await page.waitForFunction(() => !window.isLooping() || window.frameCount === 1000)
    await page.locator('canvas').screenshot({ path: `./screenshots/${plant}.png` })
  })
})
