/* Ana sayfa randevu paneli (Google Meet). Veri: assets/booking.js */
(function(){
const B=window.BARTSS_BOOKING,root=document.getElementById('chMeet');if(!B||!root)return;
const en=()=>document.documentElement.classList.contains('lang-en'),t=(a,b)=>en()?b:a;
const MN=()=>en()?['January','February','March','April','May','June','July','August','September','October','November','December']:['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];
const DN=()=>en()?['Mon','Tue','Wed','Thu','Fri','Sat','Sun']:['Pzt','Sal','Çar','Per','Cum','Cmt','Paz'];
const H=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
let S=null,busy=[],cur=new Date(),selD=null,selT=null,done=null,loaded=false,err='';cur.setDate(1);
const longDate=d=>{const x=new Date(d+'T00:00:00');return en()?x.toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long'}):x.toLocaleDateString('tr-TR',{weekday:'long',day:'numeric',month:'long'})};
async function load(){try{[S,busy]=await Promise.all([B.settings(),B.busy()])}catch(e){S=await B.settings();busy=[]}loaded=true;draw()}
function dayState(ds){const now=new Date(),d=new Date(ds+'T00:00:00'),last=new Date(now.getTime()+S.horizon*864e5);
 if(d>last)return{k:'off'};if(S.blocked.includes(ds))return{k:'closed'};
 const all=B.slots(S,ds,[],new Date(0));if(!all.length)return{k:'off'};
 const sl=B.slots(S,ds,busy,now),free=sl.filter(x=>x.state==='free').length,taken=sl.filter(x=>x.state==='busy').length;
 if(!sl.length||sl.every(x=>x.state==='past'))return{k:'off'};
 return{k:free?'free':'full',free,ratio:all.length?taken/all.length:0}}
function draw(){
 if(!loaded){root.innerHTML='<div class="cm"><p class="cm-n">'+t('Yükleniyor…','Loading…')+'</p></div>';return}
 if(done){const b=done,mail='mailto:'+encodeURIComponent(S.email)+'?subject='+encodeURIComponent('Randevu: '+b.date+' '+b.time)+'&body='+encodeURIComponent('Merhaba, '+b.date+' saat '+b.time+' için tanışma görüşmesi talep ettim.\nAd: '+b.name+'\nİletişim: '+b.contact);
  root.innerHTML='<div class="cm cm-ok"><div class="cm-tick">✓</div><h3>'+t('Randevu talebiniz alındı','Your booking request is in')+'</h3><p><b>'+longDate(b.date)+'</b><br>'+b.time+' · '+t('15 dakika','15 minutes')+'</p><p class="cm-n">'+t('Onaylandığında Google Meet bağlantısı '+H(b.contact)+' adresine veya numarasına iletilir.','Once confirmed, the Google Meet link is sent to '+H(b.contact)+'.')+'</p><div class="cm-acts"><button type="button" class="bx-btn" id="cmIcs">'+t('Takvime ekle','Add to calendar')+'</button><a class="bx-btn o" href="'+mail+'">'+t('E-posta ile de bildir','Also notify by email')+'</a><button type="button" class="bx-btn o" id="cmNew">'+t('Yeni randevu','New booking')+'</button></div></div>';return}
 const y=cur.getFullYear(),mo=cur.getMonth(),n=new Date(y,mo+1,0).getDate(),lead=(cur.getDay()+6)%7,today=new Date();today.setDate(1);today.setHours(0,0,0,0);
 let l='<div class="cm-l"><div class="cm-h"><b>'+MN()[mo]+' '+y+'</b><span><button type="button" id="cmP" aria-label="'+t('Önceki ay','Previous month')+'"'+(cur<=today?' disabled':'')+'>‹</button><button type="button" id="cmN" aria-label="'+t('Sonraki ay','Next month')+'">›</button></span></div><div class="cm-cal" role="grid">'+DN().map(d=>'<i>'+d+'</i>').join('')+'<span></span>'.repeat(lead);
 for(let i=1;i<=n;i++){const ds=y+'-'+String(mo+1).padStart(2,'0')+'-'+String(i).padStart(2,'0'),st=dayState(ds),dis=st.k!=='free';
  l+='<button type="button" class="cm-d '+st.k+(selD===ds?' sel':'')+'" data-d="'+ds+'"'+(dis?' disabled':'')+' aria-label="'+longDate(ds)+(st.k==='free'?', '+st.free+' '+t('boş saat','free slots'):st.k==='full'?', '+t('dolu','full'):'')+'">'+i+(st.k==='free'||st.k==='full'?'<u style="--r:'+Math.round((st.ratio||1)*100)+'%"></u>':'')+'</button>'}
 l+='</div><p class="cm-leg"><span class="a"></span>'+t('Müsait','Available')+' <span class="b"></span>'+t('Dolu','Full')+' <span class="c"></span>'+t('Kapalı','Closed')+'</p></div>';
 let r='<div class="cm-r">';
 if(!selD){r+='<p class="cm-hint">'+t('Önce bir gün seçin.','Pick a day first.')+'</p>'}
 else if(!selT){const sl=B.slots(S,selD,busy);r+='<div class="cm-s"><b>'+longDate(selD)+'</b><div class="cm-slots">'+sl.map(s=>'<button type="button" class="cm-t '+s.state+'" data-t="'+s.time+'"'+(s.state!=='free'?' disabled':'')+'>'+s.time+(s.state==='busy'?'<small>'+t('Dolu','Full')+'</small>':'')+'</button>').join('')+'</div></div>'}
 else{r+='<div class="cm-sum"><span><b>'+longDate(selD)+'</b> · '+selT+'</span><button type="button" id="cmChg">'+t('Değiştir','Change')+'</button></div><form class="cm-f" id="cmF" novalidate><label>'+t('Adınız','Your name')+'<input name="name" required autocomplete="name"></label><label>'+t('E-posta veya telefon','Email or phone')+'<input name="contact" required autocomplete="email"></label><label>'+t('Not (isteğe bağlı)','Note (optional)')+'<input name="note"></label><label class="cm-k"><input type="checkbox" name="k" required><span>'+t('KVKK aydınlatma metnini okudum, bilgilerimin randevu için kullanılmasını kabul ediyorum.','I have read the privacy notice and agree that my details are used for this booking.')+'</span></label>'+(err?'<p class="cm-e" role="alert">'+err+'</p>':'')+'<button class="bx-btn" type="submit">'+t('Randevuyu al','Book')+'</button></form>'}
 r+='</div>';
 root.innerHTML='<div class="cm cm2">'+(S.notice?'<p class="cm-notice">'+H(S.notice)+'</p>':'')+'<div class="cm-g">'+l+r+'</div></div>'}
root.addEventListener('click',e=>{const t0=e.target;
 if(t0.closest('#cmP')){cur.setMonth(cur.getMonth()-1);draw();return}if(t0.closest('#cmN')){cur.setMonth(cur.getMonth()+1);draw();return}
 const d=t0.closest('[data-d]');if(d&&!d.disabled){selD=d.dataset.d;selT=null;err='';draw();return}
 const tm=t0.closest('[data-t]');if(tm&&!tm.disabled){selT=tm.dataset.t;err='';draw();const f=root.querySelector('#cmF input');f&&f.focus({preventScroll:true});return}
 if(t0.closest('#cmChg')){selT=null;draw();return}
 if(t0.closest('#cmNew')){done=null;selD=selT=null;draw();return}
 if(t0.closest('#cmIcs')){const b=done,blob=new Blob([B.ics(b,S)],{type:'text/calendar'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='bartss-gorusme.ics';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500)}});
root.addEventListener('submit',async e=>{e.preventDefault();const f=e.target,v=n=>(f.elements[n].value||'').trim();
 if(!v('name')||!v('contact')||!f.elements.k.checked){err=t('Ad, iletişim bilgisi ve KVKK onayı gerekli.','Name, contact and consent are required.');draw();return}
 try{done=await B.create({date:selD,time:selT,name:v('name'),contact:v('contact'),note:v('note')});busy.push({date:selD,time:selT});err=''}
 catch(x){busy=await B.busy().catch(()=>busy);selT=null;err=t('Bu saat az önce doldu, lütfen başka bir saat seçin.','That slot was just taken, please pick another.')}
 draw()});
document.addEventListener('bartss:lang',draw);
window.bartssMeetOpen=()=>{if(!loaded)load();else B.busy().then(b=>{busy=b;draw()}).catch(()=>{})};
draw();
})();
