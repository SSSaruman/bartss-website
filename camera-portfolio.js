
(()=>{
const studioArt=document.querySelector('.studio-svg'),rail=document.querySelector('#story'),world=document.querySelector('#world-art'),studio=document.querySelector('#studio'),monitor=document.querySelector('#monitor'),screen=document.querySelector('#monitor-screen'),intro=document.querySelector('#world-label'),cue=document.querySelector('#scroll-cue'),copy=document.querySelector('#creator-copy'),nav=document.querySelector('#nav'),tip=document.querySelector('#technical-label'),progressEl=document.querySelector('#progress');
const clamp=(a,min=0,max=1)=>Math.max(min,Math.min(max,a));const mix=(a,b,t)=>a+(b-a)*t;const ease=t=>t*t*(3-2*t);
let raf=0,latest=0;
function render(){
 raf=0;
 studioArt.setAttribute('viewBox',window.innerWidth<800?'530 -180 1200 1510':'0 0 1600 900');
 const rect=rail.getBoundingClientRect();
 const range=rail.offsetHeight-window.innerHeight;
 const p=range>0?clamp(-rect.top/range):0;
 latest=p;

 // SHOT 01: We start INSIDE the monitor. Only its screen is visible.
 // The scene never travels toward the monitor. The camera starts inside it.
 const terrain=ease(clamp((p-.03)/.30));
 world.setAttribute('viewBox',`0 ${Math.round(mix(0,720,terrain))} 1600 900`);

 // SHOT 02: A real backwards dolly. The ENTIRE room, screen and monitor
 // transform together as a single camera view: no screen overlay shrink/fade.
 // Separate reveals: screen edges -> complete monitor -> desk and room.
 // Each interval begins at the prior interval's exact scale (no camera jump).
 const vw=window.innerWidth, vh=window.innerHeight;
 const mx=monitor.offsetLeft+monitor.clientLeft+screen.offsetWidth/2;
 const my=monitor.offsetTop+monitor.clientTop+screen.offsetHeight/2;
 const zoom=Math.max(vw/screen.offsetWidth,vh/screen.offsetHeight)*1.065;
 const edgeScale=Math.min(zoom,Math.max(2.9,zoom*.60));
 const monitorScale=Math.min(edgeScale,Math.max(1.55,zoom*.28));
 const scale=p<.54?mix(zoom,edgeScale,ease(clamp((p-.35)/.19)))
   :p<.73?mix(edgeScale,monitorScale,ease(clamp((p-.54)/.19)))
   :mix(monitorScale,1,ease(clamp((p-.73)/.21)));
 const pull=clamp((zoom-scale)/(zoom-1));
 const tx=mix(vw/2-mx*zoom,0,pull);
 const ty=mix(vh/2-my*zoom,0,pull);
 studio.style.transform=`translate3d(${tx.toFixed(3)}px,${ty.toFixed(3)}px,0) scale(${scale.toFixed(5)})`;

 // The opening type leaves before the screen border emerges. The creator
 // only appears after the camera reveals the workspace.
 intro.style.opacity=String(1-ease(clamp((p-.15)/.19)));
 intro.style.transform=`translate(-50%,${-25*ease(clamp(p/.31))}px)`;
 cue.style.opacity=String(1-ease(clamp((p-.08)/.17)));
 const end=ease(clamp((p-.94)/.055));
 copy.style.opacity=String(end);
 copy.style.transform=`translateY(${mix(20,0,end)}px)`;
 const light=p>.58||rect.bottom<window.innerHeight*.7;
 if(nav)nav.classList.toggle('is-light',light);
 tip.classList.toggle('dark',p>.6);
 tip.textContent=p<.33?'01 / MONİTÖRÜN İÇİNDE':p<.73?'02 / MONİTÖR ORTAYA ÇIKIYOR':'03 / ODA VE TASARIMCI';
 progressEl.style.height=`${Math.round(p*100)}%`;
}
function schedule(){if(!raf)raf=requestAnimationFrame(render)}document.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);window.addEventListener('load',schedule);render();
// Reduced motion: still navigable; scroll movement follows directly with no easing animation loops.
})();
