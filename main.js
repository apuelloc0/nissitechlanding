/* ── PARTICLE CANVAS ── */
const c = document.getElementById('bgc');
const ctx = c.getContext('2d');
let W, H, pts = [];
function resize(){ W = c.width = window.innerWidth; H = c.height = window.innerHeight }
resize(); window.addEventListener('resize', resize);
class P {
  constructor(){ this.reset() }
  reset(){
    this.x = Math.random()*W; this.y = Math.random()*H;
    this.s = Math.random()*1.4+.3;
    this.vx = (Math.random()-.5)*.25; this.vy = -(Math.random()*.3+.04);
    this.life = 0; this.maxL = Math.random()*220+80;
    const cols=['61,142,245','34,201,138','167,139,250','0,200,255'];
    this.col = cols[Math.floor(Math.random()*cols.length)];
  }
  tick(){
    this.life++; if(this.life>this.maxL) this.reset();
    this.x+=this.vx; this.y+=this.vy;
    const a = Math.sin((this.life/this.maxL)*Math.PI)*.5;
    ctx.beginPath(); ctx.arc(this.x,this.y,this.s,0,Math.PI*2);
    ctx.fillStyle=`rgba(${this.col},${a})`; ctx.fill();
  }
}
for(let i=0;i<90;i++){const p=new P();p.life=Math.floor(Math.random()*p.maxL);pts.push(p)}
function loop(){ ctx.clearRect(0,0,W,H); pts.forEach(p=>p.tick()); requestAnimationFrame(loop) }
loop();

/* ── SCROLL REVEAL ── */
const obs = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');obs.unobserve(e.target)}});
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

/* ── NAV SHRINK ── */
window.addEventListener('scroll',()=>{
  document.querySelector('nav').style.padding = window.scrollY>60 ? '8px 32px' : '12px 32px';
});

/* ── HAMBURGER ── */
function toggleMenu(){
  document.getElementById('burger').classList.toggle('open');
  document.getElementById('mobileMenu').classList.toggle('open');
  document.body.style.overflow = document.getElementById('mobileMenu').classList.contains('open') ? 'hidden' : '';
}
function closeMenu(){
  document.getElementById('burger').classList.remove('open');
  document.getElementById('mobileMenu').classList.remove('open');
  document.body.style.overflow = '';
}

/* ── ACTIVE NAV LINK ── */
const navLinks = document.querySelectorAll('.nav-links a');
const mobileLinks = document.querySelectorAll('.nav-mobile a:not(.nav-mobile-cta)');
const sections = document.querySelectorAll('section[id]');
const observer2 = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      navLinks.forEach(a=>{
        a.classList.toggle('active', a.getAttribute('href')==='#'+e.target.id);
      });
      mobileLinks.forEach(a=>{
        const isActive = a.getAttribute('href')==='#'+e.target.id;
        a.style.color = isActive ? 'var(--cyan)' : '';
        a.style.textShadow = isActive ? '0 0 28px rgba(0,200,255,.5)' : '';
      });
    }
  });
},{rootMargin:'-40% 0px -55% 0px'});
sections.forEach(s=>observer2.observe(s));

/* ── STATS ANIMATION ── */
const stats = document.querySelectorAll('.stat-num');
const animateStats = () => {
  stats.forEach(stat => {
    const target = +stat.getAttribute('data-target');
    const suffix = stat.getAttribute('data-suffix') || '';
    const duration = 2000; 
    const increment = target / (duration / 16);
    let current = 0;
    const updateCount = () => {
      current += increment;
      if (current < target) {
        stat.textContent = Math.ceil(current) + suffix;
        requestAnimationFrame(updateCount);
      } else {
        stat.textContent = target + suffix;
      }
    };
    updateCount();
  });
};
// Iniciar animación cuando cargue la página
window.addEventListener('load', animateStats);

/* ── INYECCIÓN DE IMÁGENES (desde images64.js) ── */
document.addEventListener("DOMContentLoaded", () => {
  // Verificamos que el archivo de imágenes se haya cargado
  if (typeof images === 'undefined') return;

  // 1. Hero Banner (IMAGEN 1 -> images.imagen1)
  const hero = document.getElementById('hero-banner');
  if (hero && images.imagen1) {
    const img = document.createElement('img');
    img.src = images.imagen1;
    img.className = 'banner-img';
    img.alt = 'Hero Banner';
    // Insertamos al principio, donde estaba el comentario
    hero.insertBefore(img, hero.firstChild);
  }

  // 2. Logo Navbar (IMAGEN 2 -> images.imagen2)
  const brand = document.querySelector('.nav-brand');
  if (brand && images.imagen2) {
    const img = document.createElement('img');
    img.src = images.imagen2;
    img.className = 'nav-logo';
    img.alt = 'Nissi Tech Logo';
    brand.insertBefore(img, brand.firstChild);
  }

  // 3. Workers (IMAGEN 3 a 7 -> images.imagen3 a images.imagen7)
  const avatars = document.querySelectorAll('.wavatar');
  avatars.forEach((el, index) => {
    const key = 'imagen' + (index + 3); // index 0 es imagen3, index 4 es imagen7
    if (images[key]) el.innerHTML = `<img src="${images[key]}" alt="Worker">`;
  });
});

// CONEXION A WHATSAPP-------------------------


function enviarWhatsApp(event) {
  event.preventDefault();
  const nombre = document.getElementById('name').value;
  const tel = document.getElementById('whatsapp_user').value;
  const email = document.getElementById('email').value;
  const vol = document.getElementById('volume').value;
  const msg = document.getElementById('textarea').value;

  const miNumero = "51982247314"; // PON TU NÚMERO AQUÍ
  const texto = `*NUEVO LEAD NISSI TECH*%0A*Nombre:* ${nombre}%0A*WhatsApp:* ${tel}%0A*Email:* ${email}%0A*Volumen:* ${vol}%0A*Interés:* ${msg}`;
  
  window.open(`https://wa.me/${miNumero}?text=${texto}`, '_blank');
}


// SLIDER CAROUSEL----------------------


