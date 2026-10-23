/* BARTSS ortak ayarlar ve eklentiler. Yayından önce AYARLAR bloğunu doldurun. */
(function(){
const AYARLAR={
 SITE_URL:'https://www.bartss.com',
 WHATSAPP:'905334718530',      // ülke kodlu, + ve boşluksuz
 TELEFON:'+90 533 471 85 30',
 EMAIL:'alparkayabas@gmail.com',
 TAKVIM_URL:'',                // 15 dk tanışma görüşmesi bağlantısı (Calendly vb.), boşsa gizlenir
 GA4_ID:'',                    // örn. G-XXXXXXXXXX; doluysa çerez izni sorulur
 CLARITY_ID:''
};
window.BARTSS_AYAR=AYARLAR;
const D=document,tr=(navigator.language||'tr').slice(0,2)!=='en';
const root=(()=>{const s=D.currentScript&&D.currentScript.src||'';return s.replace(/assets\/site-extras\.js.*$/,'')})();
const wa=t=>'https://wa.me/'+AYARLAR.WHATSAPP+(t?'?text='+encodeURIComponent(t):'');
const el=(h)=>{const t=D.createElement('template');t.innerHTML=h.trim();return t.content.firstChild};
function ready(f){D.readyState!=='loading'?f():D.addEventListener('DOMContentLoaded',f)}
ready(()=>{
 D.querySelectorAll('[data-wa]').forEach(a=>a.href=wa(a.dataset.wa));
 // atla bağlantısı
 const main=D.querySelector('main');if(main&&!main.id)main.id='icerik';
 if(main&&!D.querySelector('.skip-link'))D.body.prepend(el('<a class="skip-link" href="#icerik">İçeriğe geç</a>'));
 // dış bağlantı güvenliği
 D.querySelectorAll('a[target="_blank"]').forEach(a=>{const r=new Set((a.rel||'').split(' ').filter(Boolean));r.add('noopener');r.add('noreferrer');a.rel=[...r].join(' ')});

 // Başa dön (tüm sayfalar, sonradan eklenen footer dahil)
 D.addEventListener('click',ev=>{const u=ev.target.closest&&ev.target.closest('.bf-up');if(!u)return;ev.preventDefault();const go=()=>{try{window.scrollTo({top:0,behavior:'smooth'})}catch(_){window.scrollTo(0,0)}};go();setTimeout(()=>{if((window.pageYOffset||D.documentElement.scrollTop||D.body.scrollTop)>0){D.documentElement.scrollTop=0;D.body.scrollTop=0}},900)});
 // tek açık akordeon (SSS vb.)
 D.addEventListener('toggle',ev=>{const d=ev.target;if(!(d instanceof HTMLDetailsElement)||!d.open)return;const p=d.parentElement;if(!p)return;p.querySelectorAll(':scope>details[open]').forEach(o=>{if(o!==d)o.open=false})},true);
 // iletişim formu
 const f=D.getElementById('contactForm');
 if(f){
  const set=(id,v)=>{const n=D.getElementById(id);if(n)n.href=v};
  set('ctWa',wa('Merhaba, BARTSS ile çalışmak istiyorum.'));set('ctTel','tel:'+AYARLAR.TELEFON.replace(/\s/g,''));set('ctMail','mailto:'+AYARLAR.EMAIL);
  const tx=(id,v)=>{const n=D.getElementById(id);if(n)n.textContent=v};tx('ctTelTxt',AYARLAR.TELEFON);tx('ctMailTxt',AYARLAR.EMAIL);
  const cal=D.getElementById('ctCal');if(cal){if(AYARLAR.TAKVIM_URL)cal.href=AYARLAR.TAKVIM_URL;else{cal.removeAttribute('target')}}
  const msg=()=>{const v=n=>(f.elements[n].value||'').trim();return ['Merhaba, BARTSS için yeni proje talebi:','Ad: '+v('ad'),'İletişim: '+v('iletisim'),'Konu: '+v('konu'),'Çalışma: '+(v('butce')||'-'),'Zaman: '+((f.elements.zaman&&f.elements.zaman.value)||'-'),'Not: '+(v('mesaj')||'-')].join('\n')};
  const ok=()=>{if(f.elements.website.value)return false;if(!f.checkValidity()){f.reportValidity();return false}return true};
  const done=D.getElementById('formDone');
  const fin=()=>{try{window.BARTSS_BOOKING&&BARTSS_BOOKING.addLead({kind:'brief',name:(f.elements.ad.value||'').trim(),contact:(f.elements.iletisim.value||'').trim(),topic:f.elements.konu.value,detail:[f.elements.butce.value,f.elements.zaman&&f.elements.zaman.value,(f.elements.mesaj&&f.elements.mesaj.value)||''].filter(Boolean).join(' · ')})}catch(_){}if(done){done.hidden=false;done.focus&&done.focus()}};
  f.addEventListener('click',e=>{const t=e.target.closest('[data-send]');if(!t)return;e.preventDefault();if(!ok())return;
   if(t.dataset.send==='wa')window.open(wa(msg()),'_blank','noopener');else location.href='mailto:'+AYARLAR.EMAIL+'?subject='+encodeURIComponent('Yeni proje talebi: '+f.elements.konu.value)+'&body='+encodeURIComponent(msg());
   fin();
   if(window.gtag)gtag('event','generate_lead',{method:t.dataset.send})});
  f.addEventListener('submit',e=>e.preventDefault());
  if(f.classList.contains('bx-steps')){
   const st=[...f.querySelectorAll('.bx-step')],bar=f.querySelector('.bx-bar i'),cnt=f.querySelector('.bx-count'),nx=f.querySelector('.bx-next'),bk=f.querySelector('.bx-back'),sum=D.getElementById('bxSum');let n=0;
   const sel=k=>[...f.querySelectorAll('.bx-chips[data-for="'+k+'"] [aria-pressed="true"]')].map(b=>b.textContent.trim());
   const can=()=>n===0?sel('konu').length>0:n===1?sel('butce').length>0:true;
   const show=i=>{n=i;st.forEach((s,k)=>s.hidden=k!==i);bar.style.width=((i+1)/3*100)+'%';cnt.textContent='Adım '+(i+1)+' / 3';bk.hidden=i===0;nx.hidden=i===2;nx.disabled=!can();
    if(i===2&&sum)sum.textContent=[sel('konu').join(', '),sel('butce').join(''),sel('zaman').join('')].filter(Boolean).join(' · ');
    const lg=st[i].querySelector('legend');const top=f.getBoundingClientRect().top;if(top<0)scrollBy({top:top-90,behavior:'smooth'})};
   f.addEventListener('click',e=>{const c=e.target.closest('.bx-chips button');if(!c)return;const g=c.parentElement;
    if(g.dataset.multi)c.setAttribute('aria-pressed',c.getAttribute('aria-pressed')!=='true');else{const on=c.getAttribute('aria-pressed')==='true';g.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed','false'));c.setAttribute('aria-pressed',!on)}
    f.elements[g.dataset.for].value=sel(g.dataset.for).join(', ');nx.disabled=!can()});
   nx.addEventListener('click',()=>can()&&show(n+1));bk.addEventListener('click',()=>show(n-1));
  }
 }
 // bölüm göstergesi (ana sayfa)
 if(D.getElementById('hizmetler')&&D.getElementById('iletisim')){
  const L=[['hizmetler','Hizmetler'],['projeler','Çalışmalar'],['yapay-zeka','AI'],['surec','Süreç'],['araclar','Araçlar'],['hakkimda','Hakkımızda'],['butce','Bütçe'],['sss','SSS'],['notlar','Notlar'],['iletisim','İletişim']].filter(x=>D.getElementById(x[0]));
  const nav=el('<nav class="bx-dots" aria-label="Sayfa bölümleri">'+L.map(x=>'<a href="#'+x[0]+'" data-s="'+x[0]+'" aria-label="'+x[1]+'"><span>'+x[1]+'</span><i></i></a>').join('')+'</nav>');D.body.append(nav);
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){nav.querySelectorAll('a').forEach(a=>a.classList.toggle('on',a.dataset.s===e.target.id))}}),{rootMargin:'-40% 0px -55% 0px'});L.forEach(x=>io.observe(D.getElementById(x[0])));
 }
 // çerez izni (yalnızca izleme kodu tanımlıysa)
 if(AYARLAR.GA4_ID||AYARLAR.CLARITY_ID){
  const k='bartss-consent',v=localStorage.getItem(k);
  const load=()=>{if(AYARLAR.GA4_ID){const s=D.createElement('script');s.async=1;s.src='https://www.googletagmanager.com/gtag/js?id='+AYARLAR.GA4_ID;D.head.append(s);window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config',AYARLAR.GA4_ID,{anonymize_ip:true})}
   if(AYARLAR.CLARITY_ID){(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,D,'clarity','script',AYARLAR.CLARITY_ID)}};
  if(v==='1')load();
  else if(!v){const bn=el('<div class="bx-cookie" role="dialog" aria-label="Çerez tercihi"><p>Siteyi geliştirmek için anonim ölçüm çerezleri kullanıyoruz. <a href="'+root+'gizlilik-kvkk.html#cerezler">Ayrıntılar</a></p><div><button type="button" data-c="0">Reddet</button><button type="button" data-c="1" class="p">Kabul et</button></div></div>');
   bn.addEventListener('click',e=>{const c=e.target.closest('[data-c]');if(!c)return;localStorage.setItem(k,c.dataset.c);bn.remove();if(c.dataset.c==='1')load()});D.body.append(bn)}
 }
});
})();
