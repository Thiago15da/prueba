import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
const base=process.env.SITE_URL||'http://127.0.0.1:8765/';
await mkdir('test-results',{recursive:true});
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const failures=[];
async function check(name,fn){try{await fn();console.log('PASS',name)}catch(e){failures.push({name,message:String(e)});console.error('FAIL',name,String(e))}}
const desktop=await browser.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1});
const errors=[];
desktop.on('pageerror',e=>errors.push('desktop:'+e.message));
await desktop.goto(base,{waitUntil:'domcontentloaded'});
await desktop.waitForTimeout(3500);
await check('Marca, propuesta y contacto correctos',async()=>{
 assert.match(await desktop.title(),/BOZZETTO/);
 assert.match(await desktop.locator('h1').innerText(),/habitar/i);
 assert.equal(await desktop.locator('h1').count(),1);
 assert.equal(await desktop.locator('body').innerText().then(s=>/PIKININUS|OHANA|ACV Constructora/.test(s)),false);
 assert.ok(await desktop.locator('a[href*="595971505963"]').count()>0);
 assert.equal(await desktop.locator('img[src="assets/bozzetto-mark.svg"]').count(),3);
});
await check('Entrada cinematográfica se retira automáticamente',async()=>{
 const rect=await desktop.locator('#opening').boundingBox();
 assert.ok(rect&&rect.y+rect.height<5,'la cortina sigue bloqueando la web');
 await desktop.locator('a[href="#colecciones"]').first().click();
 assert.equal(await desktop.evaluate(()=>location.hash),'#colecciones');
});
await check('Fotografía hero real carga',async()=>{
 const loaded=await desktop.locator('.hero-image img').evaluate(el=>el.complete&&el.naturalWidth>0);
 assert.ok(loaded,'la imagen principal de Unsplash no cargó');
});
await check('Tarjeta de colección completa el interés',async()=>{
 await desktop.locator('a[data-interest="Dormitorios y vestidores"]').click();
 assert.equal(await desktop.locator('#interest').inputValue(),'Dormitorios y vestidores');
});
await check('Moodboard cambia estilos sin errores',async()=>{
 await desktop.locator('#tab-contraste').click();
 assert.equal(await desktop.locator('#tab-contraste').getAttribute('aria-selected'),'true');
 assert.match(await desktop.locator('#moodTitle').innerText(),/contraste/i);
 await desktop.locator('#tab-calma').focus();
 await desktop.keyboard.press('ArrowLeft');
 assert.equal(await desktop.locator('#tab-contraste').getAttribute('aria-selected'),'true');
 await desktop.locator('#tab-natural').click();
 await desktop.locator('#moodContact').click();
 assert.equal(await desktop.locator('#style').inputValue(),'Natural y cálido');
});
await check('Formulario genera enlace correcto a WhatsApp',async()=>{
 await desktop.locator('#clientName').fill('María Demo');
 await desktop.locator('#interest').selectOption({label:'Diseño y muebles a medida'});
 await desktop.locator('#city').fill('Asunción');
 await desktop.locator('#details').fill('Quiero un vestidor a medida');
 await desktop.evaluate(()=>{window.__sent='';window.open=(url)=>{window.__sent=url;return {}}});
 await desktop.locator('#contactForm button[type=submit]').click();
 const link=await desktop.evaluate(()=>window.__sent);
 assert.match(link,/https:\/\/wa.me\/595971505963\?text=/);
 const decoded=decodeURIComponent(link);
 assert.match(decoded,/María Demo/);assert.match(decoded,/vestidor a medida/);
});
await desktop.goto(base,{waitUntil:'domcontentloaded'});
await desktop.waitForTimeout(3300);
await desktop.evaluate(async()=>{for(let y=0;y<document.documentElement.scrollHeight;y+=600){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,45))}window.scrollTo(0,0)});
await desktop.screenshot({path:'test-results/bozzetto-desktop.png',fullPage:true,animations:'disabled'});

const mobile=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true});
mobile.on('pageerror',e=>errors.push('mobile:'+e.message));
await mobile.goto(base,{waitUntil:'domcontentloaded'});
await mobile.waitForTimeout(3300);
await check('Móvil sin scroll horizontal',async()=>{
 const v=await mobile.evaluate(()=>({scroll:document.documentElement.scrollWidth,width:window.innerWidth}));
 assert.ok(v.scroll<=v.width+2,JSON.stringify(v));
});
await check('Menú móvil abre, navega y cierra',async()=>{
 await mobile.locator('#menuToggle').click();
 assert.equal(await mobile.locator('#menuToggle').getAttribute('aria-expanded'),'true');
 await mobile.locator('#mobilePanel a[href="#showroom"]').click();
 assert.equal(await mobile.evaluate(()=>location.hash),'#showroom');
 assert.equal(await mobile.locator('#menuToggle').getAttribute('aria-expanded'),'false');
});
await check('No hay errores JavaScript en ambos dispositivos',async()=>{assert.deepEqual(errors,[])});
await mobile.goto(base,{waitUntil:'domcontentloaded'});
await mobile.waitForTimeout(3400);
await mobile.evaluate(async()=>{for(let y=0;y<document.documentElement.scrollHeight;y+=500){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,45))}window.scrollTo(0,0)});
await mobile.screenshot({path:'test-results/bozzetto-mobile.png',fullPage:true,animations:'disabled'});
await browser.close();
if(failures.length){console.error('FAILURES',JSON.stringify(failures,null,2));process.exitCode=1}
else console.log('OK: 9 pruebas completas y capturas escritorio/móvil');
