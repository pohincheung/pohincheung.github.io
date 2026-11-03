import { chromium } from '@playwright/test';
const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
const page=await browser.newPage();
const errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const width of [1280,390]){
 await page.setViewportSize({width,height:900});
 for(const route of ['/','/reading/','/investing/','/life/','/about/','/dashboard/','/posts/welcome/']){
 const r=await page.goto('http://127.0.0.1:4322'+route);if(r.status()!==200)throw Error(route+' failed');
 if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('overflow '+route);
 console.log(width,route,'OK');
 }
 await page.goto('http://127.0.0.1:4322/dashboard/');await page.locator('summary').click();if(await page.locator('tbody tr').count()!==10)throw Error('data table');
 await page.goto('http://127.0.0.1:4322/');await page.screenshot({path:`preview-${width}.png`,fullPage:true});
 await page.getByRole('link',{name:'读书笔记',exact:true}).click();await page.getByRole('link',{name:/示例：如何写/}).click();if(!page.url().includes('/posts/welcome/'))throw Error('navigation');
}
await browser.close();if(errors.length)throw Error(errors.join('\n'));console.log('Browser checks passed');

