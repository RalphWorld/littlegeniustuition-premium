/* ============ LITTLE GENIUS — SHARED NAV / CURSOR / REVEALS ============ */
(function(){
const reduced = window.matchMedia('(prefers-reduced-motion:reduce)').matches;

// CURSOR
const ci=document.getElementById('ci'),co=document.getElementById('co');
if(ci&&co&&!reduced){
  let mx=innerWidth/2,my=innerHeight/2,ox=mx,oy=my;
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY},{passive:true});
  (function lc(){
    ox+=(mx-ox)*.09;oy+=(my-oy)*.09;
    ci.style.left=mx+'px';ci.style.top=my+'px';
    co.style.left=ox+'px';co.style.top=oy+'px';
    requestAnimationFrame(lc);
  })();
  document.addEventListener('mousedown',()=>{co.style.transform='translate(-50%,-50%) scale(.7)'},{passive:true});
  document.addEventListener('mouseup',()=>{co.style.transform='translate(-50%,-50%) scale(1)'},{passive:true});
}

// NAV SCROLLED STATE (rAF-batched)
const nav=document.getElementById('nav');
let ticking=false;
function onScroll(){
  ticking=false;
  if(nav)nav.classList.toggle('s',scrollY>60);
}
window.addEventListener('scroll',()=>{
  if(!ticking){ticking=true;requestAnimationFrame(onScroll);}
},{passive:true});
onScroll();

// ACTIVE NAV LINK
const page=(location.pathname.split('/').pop()||'index.html');
document.querySelectorAll('.nlinks a, .nav-mobile a').forEach(a=>{
  const href=a.getAttribute('href');
  if(href===page||(page===''&&href==='index.html'))a.classList.add('active');
});

// MOBILE NAV TOGGLE
const burger=document.getElementById('nav-burger');
const mobileMenu=document.getElementById('nav-mobile');
if(burger&&mobileMenu){
  burger.addEventListener('click',()=>{
    const open=mobileMenu.classList.toggle('open');
    mobileMenu.style.display=open?'flex':'none';
  });
}

// REVEALS
document.querySelectorAll('.r').forEach(el=>{
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('v');obs.disconnect();}});
  },{threshold:.1});
  obs.observe(el);
});

// SHARED TOAST HELPER
window.lgToast=function(msg,isError){
  const t=document.getElementById('toast');
  if(!t)return;
  t.textContent=msg;
  t.classList.toggle('error',!!isError);
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),4000);
};

// HERO VIDEO: attempt load of first-frame static video
document.querySelectorAll('.hv video').forEach(v=>v.load());
})();
