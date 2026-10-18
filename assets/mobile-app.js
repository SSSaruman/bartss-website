(()=>{
const R=document.documentElement,sc=document.currentScript;
const root=(sc&&sc.src||'').replace(/assets\/mobile-app\.js.*$/,'')||'./';
function init(){
 if(document.querySelector('.m-burger'))return;
 const host=document.querySelector('.nav')||document.querySelector('.bs-header-inner');if(!host)return;
 const b=document.createElement('button');b.className='m-burger';b.type='button';b.setAttribute('aria-label','Menü');b.setAttribute('aria-expanded','false');b.innerHTML='<i></i><i></i><i></i>';host.appendChild(b);
 const home=root+'index.html',S=[['marka-kimligi','Marka & Görsel Kimlik'],['mekan-kimligi','Mekan & İç Mekan Kimliği'],['web-ui-ux','Web & UI/UX'],['3d-motion','3D & Motion'],['ai-otomasyon','AI & Otomasyon'],['sosyal-medya','Sosyal Medya']];
 const subs=S.map(s=>'<a href="'+root+'hizmetler/'+s[0]+'.html">'+s[1]+'</a>').join('');
 const L=[['#projeler','İşlerimiz'],['#yapay-zeka','AI Sistemler'],['#surec','Süreç'],['#hakkimda','Hakkımızda'],['#iletisim','İletişim']].map(l=>'<a href="'+home+l[0]+'">'+l[1]+'</a>').join('');
 const d=document.createElement('div');d.className='m-drawer';d.setAttribute('aria-label','Menü');
 d.innerHTML='<div class="m-top"><div class="m-lang" role="group" aria-label="Dil / Language"><button type="button" data-lang="tr" aria-pressed="true">TR</button><button type="button" data-lang="en" aria-pressed="false">EN</button></div><button class="m-close" type="button" aria-label="Menüyü kapat">×</button></div><nav class="m-main"><a href="'+home+'#hizmetler">Hizmetler</a><div class="m-sub">'+subs+'</div>'+L+'</nav><div class="m-acts"><a class="m-ghost" href="#">Panel</a><a class="m-cta" href="'+home+'#iletisim">Toplantı planla</a></div><a class="m-brand" href="'+home+'">BARTSS ✳</a>';
 document.body.appendChild(d);
 const set=o=>{R.classList.toggle('m-open',o);b.setAttribute('aria-expanded',o)};
 const sync=()=>{const en=R.classList.contains('lang-en');d.querySelectorAll('[data-lang]').forEach(x=>x.setAttribute('aria-pressed',String((x.dataset.lang==='en')===en)))};document.addEventListener('bartss:lang',sync);
 b.onclick=()=>set(!R.classList.contains('m-open'));
 d.addEventListener('click',e=>{const l=e.target.closest('[data-lang]');if(l){window.bartssSetLang&&window.bartssSetLang(l.dataset.lang);sync();return}if(e.target.closest('a,.m-close'))set(false)});
 addEventListener('keydown',e=>e.key==='Escape'&&set(false));
 addEventListener('resize',()=>innerWidth>760&&set(false));
 setTimeout(sync,500);
 const g=document.querySelector('.bt-grid');
 if(g){const p=document.createElement('div');p.className='bt-pop';p.hidden=true;g.appendChild(p);
  g.addEventListener('click',e=>{const it=e.target.closest('.bt-item');if(!it||innerWidth>760)return;const on=it.classList.contains('on');g.querySelectorAll('.bt-item.on').forEach(x=>x.classList.remove('on'));if(on){p.hidden=true;return}it.classList.add('on');p.innerHTML='<b>'+it.querySelector('strong').textContent+'</b>'+it.querySelector('span').textContent;p.hidden=false;const items=[...g.querySelectorAll('.bt-item')],i=items.indexOf(it),rowEnd=Math.min(items.length-1,Math.floor(i/4)*4+3);items[rowEnd].after(p)})}
}
function extras(){
 const mq=matchMedia('(max-width:760px)');
 [['#araclar','.bt-head','.bt-grid,.bt-footer'],['#surec','.jr-head','.jr'],['#butce','.bh-head','.bh-cards,.bh-price']].forEach(f=>{
  const s=document.querySelector(f[0]),h=s&&s.querySelector(f[1]);if(!h||s.querySelector('.m-foldbtn'))return;
  const items=[...s.querySelectorAll(f[2])];if(!items.length)return;
  const w=document.createElement('div');w.className='m-peek';items[0].before(w);items.forEach(x=>w.appendChild(x));
  const b=document.createElement('button');b.type='button';b.className='m-foldbtn';b.innerHTML='<span>Devamını göster</span><svg viewBox=\"0 0 24 24\" width=\"18\" height=\"18\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m6 5 6 6 6-6\"/><path d=\"m6 12 6 6 6-6\"/></svg>';w.after(b);
  const sh=()=>{b.style.display=mq.matches?'flex':'none'};sh();mq.addEventListener&&mq.addEventListener('change',sh);
  b.onclick=()=>{const o=!w.classList.contains('open');b.classList.toggle('on',o);b.firstChild.textContent=o?'Daha az göster':'Devamını göster';
   if(o){w.classList.add('open');w.classList.remove('full');w.style.maxHeight=w.scrollHeight+'px';setTimeout(()=>{if(w.classList.contains('open'))w.classList.add('full')},600)}
   else{w.classList.remove('full');w.style.maxHeight=w.scrollHeight+'px';void w.offsetHeight;w.classList.remove('open');w.style.maxHeight=''}};
 });
 document.querySelectorAll('.editorial-work-grid').forEach(g=>{
  g.querySelectorAll('img,a').forEach(x=>x.setAttribute('draggable','false'));
  let sx=0,sl=0,moved=0;
  let down=false;
  g.addEventListener('pointerdown',e=>{if(e.pointerType==='touch')return;down=true;moved=0;sx=e.clientX;sl=g.scrollLeft;g.classList.add('m-drag')});
  addEventListener('pointermove',e=>{if(!down)return;const dx=e.clientX-sx;if(Math.abs(dx)>4)moved=1;g.scrollLeft=sl-dx});
  addEventListener('pointerup',()=>{if(down){down=false;g.classList.remove('m-drag')}});
  g.addEventListener('click',e=>{if(moved){e.preventDefault();e.stopPropagation();moved=0}},true);
 });
}
function foot(){
 document.querySelectorAll('.bf-up').forEach(u=>u.addEventListener('click',e=>{e.preventDefault();scrollTo({top:0,behavior:'smooth'});document.documentElement.scrollTop=0}));
 document.querySelectorAll('.bf-columns>div,.bs-foot-grid>div').forEach(c=>{const l=c.querySelector('.bf-label,small');if(!l)return;l.setAttribute('role','button');l.tabIndex=0;l.setAttribute('aria-expanded','false');const t=()=>{if(innerWidth>760)return;const on=!c.classList.contains('m-on');document.querySelectorAll('.bf-columns>div.m-on,.bs-foot-grid>div.m-on').forEach(o=>{o.classList.remove('m-on');const x=o.querySelector('.bf-label,small');x&&x.setAttribute('aria-expanded','false')});if(on){c.classList.add('m-on');l.setAttribute('aria-expanded','true')}};l.addEventListener('click',t);l.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();t()}})});
 const ft=document.querySelector('.bartss-footer,.bs-footer');
 const chk=()=>{const wa=document.querySelector('.bx-wa');if(!wa||!ft)return;wa.classList.toggle('m-away',ft.getBoundingClientRect().top<innerHeight-40)};
 addEventListener('scroll',chk,{passive:true});addEventListener('resize',chk);setTimeout(chk,800);
}
const go=()=>{init();extras();foot();const sv=document.querySelector('#butce .bh-chart svg');if(sv){const mq2=matchMedia('(max-width:760px)'),ap=()=>sv.setAttribute('preserveAspectRatio',mq2.matches?'none':'xMidYMid meet');ap();mq2.addEventListener&&mq2.addEventListener('change',ap)}};
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',go):go();
})()