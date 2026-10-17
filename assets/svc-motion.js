// Services: lightweight scene motion (one image per card, transform-only) + horizontal slider.
(()=>{
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
function init(){
 const scenes=[...document.querySelectorAll('.mo[data-scene]')];
 scenes.forEach(el=>{
  const i=document.createElement('img');
  i.src='./assets/svc-'+el.dataset.scene+'.png';i.alt='';i.decoding='async';i.loading='lazy';i.className='mo-img';
  el.appendChild(i);
 });
 if(!reduce&&'IntersectionObserver' in window){
  const io=new IntersectionObserver(es=>es.forEach(e=>e.target.classList.toggle('is-on',e.isIntersecting)),{threshold:.25});
  scenes.forEach(el=>io.observe(el));
 }else scenes.forEach(el=>el.classList.add('is-on'));

 const track=document.querySelector('#hizmetler .service-grid');if(!track)return;
 const prev=document.querySelector('#hizmetler .svc-prev'),next=document.querySelector('#hizmetler .svc-next');
 const step=()=>{const c=track.querySelector('.svc');return c?c.offsetWidth+16:300};
 prev&&prev.addEventListener('click',()=>track.scrollBy({left:-step(),behavior:'smooth'}));
 next&&next.addEventListener('click',()=>track.scrollBy({left:step(),behavior:'smooth'}));
 const sync=()=>{const m=track.scrollWidth-track.clientWidth-2;prev&&(prev.disabled=track.scrollLeft<=2);next&&(next.disabled=track.scrollLeft>=m)};
 track.addEventListener('scroll',()=>requestAnimationFrame(sync),{passive:true});addEventListener('resize',sync);sync();
 // mouse drag
 let down=false,sx=0,sl=0,moved=false;
 track.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse')return;down=true;moved=false;sx=e.clientX;sl=track.scrollLeft;track.classList.add('is-drag')});
 addEventListener('pointermove',e=>{if(!down)return;const dx=e.clientX-sx;if(Math.abs(dx)>4)moved=true;track.scrollLeft=sl-dx});
 addEventListener('pointerup',()=>{if(!down)return;down=false;track.classList.remove('is-drag')});
 track.addEventListener('click',e=>{if(moved){e.preventDefault();moved=false}},true);
 track.addEventListener('dragstart',e=>e.preventDefault());
}
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init):init();
})();
