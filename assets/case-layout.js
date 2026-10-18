(()=>{const m=location.pathname.replace(/\.html$/,'').match(/(konsept|projeler)\/([^/]+)$/);if(!m)return;const slug=m[2];
const KON={nexa:['AI & OTOMASYON','Çok kanallı içerik üretimi'],orbit:['3D & MOTION','Premium ürün lansmanı'],kinetic:['WEB & UI/UX','Yaratıcı ekipler için yazılım']};
const q=(r,s)=>r.querySelector(s),T=e=>e?e.textContent.trim():'',mk=(t,c,h)=>{const e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e};
const go=()=>{const main=document.querySelector('main');if(!main||main.querySelector('.cl'))return;
 const hero=q(main,'.hero'),stage=q(main,'.stage'),himg=q(main,'.heroimg');let A=!!(hero&&stage&&KON[slug]),B=!!(hero&&himg&&slug!=='hedef');if(!A&&!B)return;
 const h1=q(hero,'h1').innerHTML,secs=[...main.children].filter(x=>x!==hero);
 const root=mk('div','cl');const cta=secs.find(s=>s.matches('.cta,.end'))||[...secs].reverse().find(s=>/Projenizi anlatın|iletişime geç/.test(s.textContent));
 if(A){
  const sub=T(q(hero,'.subtitle')),desc=T(q(hero,'.desc')),note=T(q(hero,'.note')),sx=n=>secs.find(s=>T(q(s,'.eyebrow')).startsWith(n)),b1=sx('01'),b2=sx('02'),b3=sx('03'),b4=sx('04');
  const tiles=b3?[...b3.querySelectorAll('.tile')]:[],scope=tiles.slice(0,3).map(t=>T(t).replace(/^\d+/,'').trim()).join(' / ');
  const hs=mk('section','hero cl-hero',`<div class="cl-top"><span>BARTSS / STÜDYO KONSEPTİ / 2026</span><span>01 — ${KON[slug][0]}</span></div><h1>${h1}</h1><p class="cl-lead"><b>${sub}</b>${desc}</p><div class="meta"><div>SEKTÖR<strong>${KON[slug][1]}</strong></div><div>KAPSAM<strong>${scope}</strong></div><div>PROJE TÜRÜ<strong>Bağımsız kurgusal konsept</strong></div></div>`);
  root.append(hs);const fig=mk('figure','photo cl-visual');fig.style.margin='14px 0 0';fig.append(stage);root.append(fig,mk('p','disclaimer cl-note',note));
  const st=mk('section','cl-story');[[b1,'01 / KURGUSAL BRIEF'],[b2,'02 / STRATEJİ']].forEach(x=>{if(!x[0])return;st.append(mk('article','cl-card',`<span class="cl-eb">${x[1]}</span><h2>${T(q(x[0],'h2'))}</h2><p>${T(q(x[0],'.text'))}</p>`))});root.append(st);
  if(b4){const g=q(b4,'.gallery'),sec=mk('section','cl-sec','<span class="cl-eb">03 / TASARIM SİSTEMİ</span><h2>'+T(q(b4,'h2'))+'</h2>');if(g)sec.append(g);const nt=q(b4,'.note,.text,p:last-child');if(nt&&!g.contains(nt))sec.append(mk('p','cl-note',T(nt)));root.append(sec)}
  if(tiles.length){const sec=mk('section','cl-sec','<span class="cl-eb">04 / ÖRNEK TESLİM KAPSAMI</span><h2>Müşteri böyle bir projede ne alır?</h2>');const d=mk('div','cl-del');tiles.forEach(t=>d.append(mk('div','',`<small>${t.querySelector('span')?T(t.querySelector('span')):''} / ÇIKTI</small>${T(t).replace(/^\d+/,'').trim()}`)));sec.append(d);root.append(sec)}
 }else{
  const tag=T(q(hero,'.tag')).split('/').map(x=>x.trim()),lead=T(q(hero,'.lead')),meta=q(main,'.meta'),sx=n=>secs.find(s=>T(q(s,'.tag')).startsWith(n)),note=(main.querySelector('p[style*="font-size:12px"]')||{}).textContent||'';
  const hs=mk('section','hero cl-hero',`<div class="cl-top"><span>BARTSS / SEÇİLİ İŞLER</span><span>01 — ${tag.slice(2).join(' / ')}</span></div><h1>${h1}</h1><p class="cl-lead">${lead}</p>`);if(meta)hs.append(meta);root.append(hs);
  const fig=mk('figure','photo cl-visual');fig.append(himg);root.append(fig,mk('p','disclaimer cl-note',note.trim()));
  const st=mk('section','cl-story');st.style.setProperty('--n',3);[['01','TASARIM SORUSU'],['02','YARATICI YÖN'],['03','UYGULAMA']].forEach(x=>{const s=sx(x[0]);if(!s)return;st.append(mk('article','cl-card',`<span class="cl-eb">${x[0]} / ${x[1]}</span><h2>${T(q(s,'h2'))}</h2><p>${T(q(s,'.split>p,p'))}</p>`))});root.append(st);
  const a4=sx('04');if(a4){const sec=mk('section','cl-sec','<span class="cl-eb">04 / GÖRSEL ARŞİV</span><h2>'+T(q(a4,'h2'))+'</h2>');sec.append(q(a4,'.gallery'));root.append(sec)}
  const a5=sx('05');if(a5){const rel=[...a5.querySelectorAll('.related')],sec=mk('section','cl-sec','<span class="cl-eb">05 / İLGİLİ DİSİPLİNLER</span><h2>Bu işte hangi beceriler öne çıkıyor?</h2>');if(rel[0]){rel[0].classList.add('cl-links');sec.append(rel[0])}if(rel[1]){sec.append(mk('span','cl-eb','DİĞER ÇALIŞMALAR'));rel[1].classList.add('cl-links');rel[1].style.marginTop='12px';sec.append(rel[1])}root.append(sec)}
 }
 main.innerHTML='';main.append(root);if(cta){cta.classList.add('cta');main.append(cta)}
 document.dispatchEvent(new Event('cl-ready'))};
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',go):go()})()