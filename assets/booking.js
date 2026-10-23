/* BARTSS randevu veri katmanı. Site ve yönetim paneli aynı dosyayı kullanır.
   Varsayılan: tarayıcı belleği (demo). Canlıda assets/booking-config.js içine Supabase bilgileri yazılırsa
   tüm ziyaretçiler aynı doluluğu görür ve yönetici panelinden yönetilir (bkz. supabase-schema.sql). */
(function(){
const CFG=window.BARTSS_BOOKING_CFG||{};
const REMOTE=!!(CFG.supabaseUrl&&CFG.supabaseKey);
const LS='bartss-booking-v1',TK='bartss-admin-token';
const DEF={workdays:[1,2,3,4,5],start:'10:00',end:'18:00',slot:30,breakStart:'12:30',breakEnd:'13:30',lead:12,horizon:45,blocked:[],meetUrl:'',email:'hello@bartss.com',notice:''};
const rd=()=>{try{return JSON.parse(localStorage.getItem(LS))||{}}catch(e){return{}}};
const wr=d=>localStorage.setItem(LS,JSON.stringify(d));
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,7);
const pad=n=>String(n).padStart(2,'0');
const iso=d=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
const mins=t=>{const [h,m]=t.split(':').map(Number);return h*60+m};
const hm=m=>pad(Math.floor(m/60))+':'+pad(m%60);
const token=()=>{try{return sessionStorage.getItem(TK)||''}catch(e){return''}};
async function sb(path,o={}){const r=await fetch(CFG.supabaseUrl+'/rest/v1/'+path,{method:o.method||'GET',body:o.body?JSON.stringify(o.body):undefined,headers:{apikey:CFG.supabaseKey,Authorization:'Bearer '+(o.auth?token():CFG.supabaseKey),'Content-Type':'application/json',Prefer:'return=representation'}});if(!r.ok)throw new Error(await r.text());return r.status===204?null:r.json()}

const B={
 remote:REMOTE,
 iso,mins,hm,
 async settings(){
  if(REMOTE){try{const r=await sb('settings?id=eq.1&select=data');return{...DEF,...((r[0]&&r[0].data)||{})}}catch(e){return{...DEF}}}
  return{...DEF,...(rd().settings||{})};
 },
 async saveSettings(s){
  if(REMOTE){await sb('settings?id=eq.1',{method:'PATCH',auth:1,body:{data:s}});return s}
  const d=rd();d.settings=s;wr(d);return s;
 },
 async busy(){
  if(REMOTE){const r=await sb('busy?select=date,time');return r}
  return(rd().bookings||[]).filter(b=>b.status!=='cancelled').map(b=>({date:b.date,time:b.time}));
 },
 async create(b){
  const rec={id:uid(),status:'pending',created:new Date().toISOString(),...b};
  if(REMOTE){const{id,created,...x}=rec;await sb('bookings',{method:'POST',body:x});return rec}
  const d=rd();d.bookings=d.bookings||[];
  if(d.bookings.some(x=>x.date===rec.date&&x.time===rec.time&&x.status!=='cancelled'))throw new Error('taken');
  d.bookings.push(rec);wr(d);return rec;
 },
 async list(){
  if(REMOTE)return sb('bookings?select=*&order=date.asc,time.asc',{auth:1});
  return(rd().bookings||[]).slice().sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time));
 },
 async update(id,patch){
  if(REMOTE){await sb('bookings?id=eq.'+id,{method:'PATCH',auth:1,body:patch});return}
  const d=rd();const i=(d.bookings||[]).findIndex(x=>x.id===id);if(i>-1){Object.assign(d.bookings[i],patch);wr(d)}
 },
 async remove(id){
  if(REMOTE){await sb('bookings?id=eq.'+id,{method:'DELETE',auth:1});return}
  const d=rd();d.bookings=(d.bookings||[]).filter(x=>x.id!==id);wr(d);
 },
 async addLead(l){
  const rec={id:uid(),created:new Date().toISOString(),status:'new',...l};
  try{if(REMOTE){const{id,created,...x}=rec;await sb('leads',{method:'POST',body:x})}else{const d=rd();d.leads=d.leads||[];d.leads.push(rec);wr(d)}}catch(e){}
  return rec;
 },
 async leads(){
  if(REMOTE)return sb('leads?select=*&order=created.desc',{auth:1});
  return(rd().leads||[]).slice().reverse();
 },
 async updateLead(id,patch){
  if(REMOTE){await sb('leads?id=eq.'+id,{method:'PATCH',auth:1,body:patch});return}
  const d=rd();const i=(d.leads||[]).findIndex(x=>x.id===id);if(i>-1){Object.assign(d.leads[i],patch);wr(d)}
 },
 async login(email,pass){
  if(REMOTE){const r=await fetch(CFG.supabaseUrl+'/auth/v1/token?grant_type=password',{method:'POST',headers:{apikey:CFG.supabaseKey,'Content-Type':'application/json'},body:JSON.stringify({email,password:pass})});const j=await r.json();if(!r.ok||!j.access_token)return false;sessionStorage.setItem(TK,j.access_token);return true}
  const d=rd();const p=d.adminPass||'bartss2026';if(pass===p){sessionStorage.setItem(TK,'local');return true}return false;
 },
 isAuthed(){return!!token()},
 logout(){try{sessionStorage.removeItem(TK)}catch(e){}},
 setLocalPass(p){const d=rd();d.adminPass=p;wr(d)},
 /* gün için slot listesi */
 slots(s,dateStr,busy,now){
  now=now||new Date();const d=new Date(dateStr+'T00:00:00');
  if(!s.workdays.includes(d.getDay())||s.blocked.includes(dateStr))return[];
  const out=[],a=mins(s.start),z=mins(s.end),bs=s.breakStart?mins(s.breakStart):0,be=s.breakEnd?mins(s.breakEnd):0;
  for(let m=a;m+s.slot<=z;m+=s.slot){
   if(s.breakStart&&m<be&&m+s.slot>bs)continue;
   const t=hm(m),at=new Date(dateStr+'T'+t+':00');
   let state='free';
   if(at-now<s.lead*3600e3)state='past';
   else if(busy.some(b=>b.date===dateStr&&b.time===t))state='busy';
   out.push({time:t,state});
  }
  return out;
 },
 ics(b,s){
  const d=b.date.replace(/-/g,''),t=b.time.replace(':','')+'00',e=hm(mins(b.time)+15).replace(':','')+'00';
  return['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//BARTSS//TR','BEGIN:VEVENT','UID:'+b.id+'@bartss','DTSTAMP:'+new Date().toISOString().replace(/[-:]/g,'').slice(0,15)+'Z','DTSTART;TZID=Europe/Istanbul:'+d+'T'+t,'DTEND;TZID=Europe/Istanbul:'+d+'T'+e,'SUMMARY:BARTSS tanışma görüşmesi','DESCRIPTION:'+(s.meetUrl?'Google Meet: '+s.meetUrl:'Bağlantı e-postayla gönderilecek'),'END:VEVENT','END:VCALENDAR'].join('\r\n');
 }
};
window.BARTSS_BOOKING=B;
})();
