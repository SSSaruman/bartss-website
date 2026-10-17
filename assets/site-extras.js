/* BARTSS ortak ayarlar ve eklentiler. Yayından önce AYARLAR bloğunu doldurun. */
(function(){
const AYARLAR={
 SITE_URL:'https://www.bartss.com',
 WHATSAPP:'905000000000',      // ülke kodlu, + ve boşluksuz
 TELEFON:'+90 500 000 00 00',
 EMAIL:'merhaba@bartss.com',
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
 // sabit WhatsApp
 if(!D.querySelector('.bx-wa')){D.body.append(el('<a class="bx-wa" href="'+wa('Merhaba, BARTSS ile çalışmak istiyorum.')+'" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp ile yazın"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.8 14.2c-.2.7-1.4 1.3-1.9 1.3-.5.1-1.1.1-1.8-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5.1-4.5-.1-.2-1.200-1.600-1.200-3s.8-2.100 1-2.400c.3-.3.600-.3.800-.3h.600c.2 0 .4 0 .6.500l.8 2c.1.200.1.400 0 .600l-.4.600c-.1.200-.3.300-.1.600.2.300.8 1.300 1.700 2.100 1.100 1 2.100 1.300 2.400 1.500.3.100.5.100.6-.1l.9-1.100c.2-.3.400-.2.600-.1l1.900.9c.3.100.5.200.5.300.100.100.100.700-.1 1.400Z"/></svg><span>WhatsApp</span></a>'))}
 // iletişim formu
 const f=D.getElementById('contactForm');
 if(f){
  const set=(id,v)=>{const n=D.getElementById(id);if(n)n.href=v};
  set('ctWa',wa('Merhaba, BARTSS ile çalışmak istiyorum.'));set('ctTel','tel:'+AYARLAR.TELEFON.replace(/\s/g,''));set('ctMail','mailto:'+AYARLAR.EMAIL);
  const tx=(id,v)=>{const n=D.getElementById(id);if(n)n.textContent=v};tx('ctTelTxt',AYARLAR.TELEFON);tx('ctMailTxt',AYARLAR.EMAIL);
  const cal=D.getElementById('ctCal');if(cal){AYARLAR.TAKVIM_URL?cal.href=AYARLAR.TAKVIM_URL:cal.remove()}
  const msg=()=>{const v=n=>(f.elements[n].value||'').trim();return ['Merhaba, BARTSS için yeni proje talebi:','Ad: '+v('ad'),'İletişim: '+v('iletisim'),'Konu: '+v('konu'),'Bütçe: '+(v('butce')||'-'),'Not: '+(v('mesaj')||'-')].join('\n')};
  const ok=()=>{if(f.elements.website.value)return false;if(!f.checkValidity()){f.reportValidity();return false}return true};
  const done=D.getElementById('formDone');
  const fin=()=>{if(done){done.hidden=false;done.focus&&done.focus()}};
  f.addEventListener('click',e=>{const t=e.target.closest('[data-send]');if(!t)return;e.preventDefault();if(!ok())return;
   if(t.dataset.send==='wa')window.open(wa(msg()),'_blank','noopener');else location.href='mailto:'+AYARLAR.EMAIL+'?subject='+encodeURIComponent('Yeni proje talebi: '+f.elements.konu.value)+'&body='+encodeURIComponent(msg());
   fin();
   if(window.gtag)gtag('event','generate_lead',{method:t.dataset.send})});
  f.addEventListener('submit',e=>e.preventDefault());
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
