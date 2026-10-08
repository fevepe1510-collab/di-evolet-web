(()=>{
  const A='assets/';
  const chapters=[
    {eyebrow:'01 — UNA ACTITUD',head:'Un rojo<br><em>inolvidable.</em>',desc:'Una galleta con carácter. Color profundo, textura generosa y una forma de destacar que no necesita presentación.',img:'red-cut.png',alt:'Galleta roja Evolet',detail:'red_open.webp',detailAlt:'Galleta roja abierta',detailText:'El rojo se lleva todas las miradas.',ghost:'RED'},
    {eyebrow:'02 — INTENSIDAD',head:'Todo el<br><em>carácter del cacao.</em>',desc:'Detalles de chocolate, capas de textura y una presencia que transforma lo cotidiano en un pequeño acontecimiento.',img:'chocolate-cut.png',alt:'Galleta con detalles de chocolate',detail:'choc_duo.webp',detailAlt:'Dúo de galletas con chocolate',detailText:'Una interpretación más intensa.',ghost:'CACAO'},
    {eyebrow:'03 — EL INTERIOR IMPORTA',head:'Por fuera.<br><em>Por dentro.</em>',desc:'Una sorpresa verde que se descubre al partirla. A veces, el mejor momento está justo en el centro.',img:'green-cut.png',alt:'Galleta con relleno verde',detail:'green_crack.webp',detailAlt:'Galleta abierta mostrando su relleno',detailText:'Un centro que se roba la escena.',ghost:'CENTER'},
    {eyebrow:'04 — LO ESENCIAL',head:'Dorada.<br><em>Y nada más que decir.</em>',desc:'Una versión clara, dorada y delicada. Porque a veces los detalles más pequeños terminan siendo los más importantes.',img:'hero-cut.png',alt:'Galleta clara con caramelo',detail:'cream.webp',detailAlt:'Galleta clásica color crema',detailText:'La sencillez también sorprende.',ghost:'GOLD'}
  ];
  let active=0,lock=0;
  const panel=document.getElementById('story-panel'),story=document.getElementById('experiencia'),storyImg=document.getElementById('story-product'),storySide=document.getElementById('story-side-image'),storyBtns=[...document.querySelectorAll('.story-dot')];
  const E=id=>document.getElementById(id);
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function activate(i){
    i=Math.max(0,Math.min(3,i)); if(active===i) return;active=i;const ch=chapters[i];
    panel.dataset.active=String(i);storyImg.classList.add('switching');
    E('story-eyebrow').textContent=ch.eyebrow;E('story-heading').innerHTML=ch.head;E('story-desc').textContent=ch.desc;E('story-ghost').textContent=ch.ghost;
    E('story-count').textContent=String(i+1).padStart(2,'0');E('story-side-title').textContent=ch.detailText;
    E('story-progress').style.width=((i+1)/4*100)+'%';
    storyBtns.forEach((btn,j)=>{btn.classList.toggle('is-active',i===j);btn.setAttribute('aria-pressed',i===j?'true':'false');});
    const key=++lock;
    const done=()=>{if(key!==lock)return;storyImg.src=A+ch.img;storyImg.alt=ch.alt;storySide.src=A+ch.detail;storySide.alt=ch.detailAlt;storyImg.classList.remove('switching');};
    if(reduced)done();else window.setTimeout(done,190);
  }
  let ticking=false;
  function onScroll(){if(ticking)return;ticking=true;requestAnimationFrame(()=>{
    const nav=E('topbar');nav.classList.toggle('is-sticky',window.scrollY>80);
    if(window.innerWidth>820 && story){let r=story.getBoundingClientRect(); if(r.top<=0 && r.bottom>innerHeight){const length=story.offsetHeight-innerHeight;const pct=Math.max(0,Math.min(.9999,-r.top/length));activate(Math.floor(pct*4));}else if(r.top>0&&r.top<innerHeight){activate(0);}else if(r.bottom<=innerHeight&&r.bottom>0){activate(3);}}
    ticking=false;
  });}
  addEventListener('scroll',onScroll,{passive:true});onScroll();
  storyBtns.forEach(btn=>{btn.setAttribute('aria-pressed',btn.classList.contains('is-active')?'true':'false');btn.addEventListener('click',()=>{let i=Number(btn.dataset.story);activate(i);if(window.innerWidth>820){const dist=story.offsetHeight-innerHeight;const offset=story.getBoundingClientRect().top+window.scrollY;window.scrollTo({top:offset+dist*((i+.28)/4),behavior:reduced?'instant':'smooth'});}})});
  const menu=E('mobile-menu'),hamb=document.querySelector('.hamburger');
  function toggleMenu(force){const open=typeof force==='boolean'?force:!menu.classList.contains('open');menu.classList.toggle('open',open);hamb.classList.toggle('open',open);hamb.setAttribute('aria-expanded',String(open));hamb.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');menu.setAttribute('aria-hidden',String(!open));document.body.style.overflow=open?'hidden':'';}
  hamb.addEventListener('click',()=>toggleMenu());menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>toggleMenu(false)));
  const filters=[...document.querySelectorAll('.filter-button')],cards=[...document.querySelectorAll('.product-card')];
  const groupByFlavor={chocolate:['Nucita','Chips de chocolate','Red Velvet Nutella','Macadamia con chocolate blanco','Oreo con chocolate blanco','Kinder'],frutal:['Lulo','Maracuyá','Coco arequipe'],especial:['Pistacho','Café y crema de almendras']};
  function applyFilter(type){filters.forEach(b=>b.classList.toggle('active',b.dataset.filter===type));cards.forEach(c=>{let term=(document.getElementById('catalog-search')?.value||'').trim().toLocaleLowerCase('es');let matches=type==='all'||(groupByFlavor[type]||[]).includes(c.dataset.title);let hide=!matches||!c.dataset.title.toLocaleLowerCase('es').includes(term);c.classList.toggle('is-hidden',hide);c.setAttribute('aria-hidden',String(hide));});const n=cards.filter(c=>!c.classList.contains('is-hidden')).length;const no=E('catalog-no-results');if(no)no.hidden=n!==0;}
  let currentFlavorFilter='all';filters.forEach(b=>b.addEventListener('click',()=>{currentFlavorFilter=b.dataset.filter;applyFilter(currentFlavorFilter)}));E('catalog-search')?.addEventListener('input',()=>applyFilter(currentFlavorFilter));
  const modal=E('product-modal'),modalImg=E('modal-image'),modalDetail=E('modal-detail'),closeBtn=modal.querySelector('.modal-close');let focusedBefore;
  function openModal(c){focusedBefore=document.activeElement;E('modal-title').textContent=c.dataset.title;E('modal-sub').textContent=c.dataset.sub;modalImg.src=A+c.dataset.photo;modalImg.alt='Foto de '+c.dataset.title;modalDetail.src=A+c.dataset.detail;modalDetail.alt='Detalle de '+c.dataset.title;modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';closeBtn.focus();}
  function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';if(focusedBefore)focusedBefore.focus();}
  cards.forEach(c=>c.addEventListener('click',()=>openModal(c)));
  modal.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',closeModal));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(modal.classList.contains('open'))closeModal();else toggleMenu(false);}if(e.key==='Tab'&&modal.classList.contains('open')){const list=[...modal.querySelectorAll('button,a')].filter(e=>e.offsetParent);if(!list.length)return;const fst=list[0],last=list[list.length-1];if(e.shiftKey&&document.activeElement===fst){e.preventDefault();last.focus();}if(!e.shiftKey&&document.activeElement===last){e.preventDefault();fst.focus();}}});
  const track=E('gallery-track');E('gallery-prev').addEventListener('click',()=>track.scrollBy({left:-330,behavior:'smooth'}));E('gallery-next').addEventListener('click',()=>track.scrollBy({left:330,behavior:'smooth'}));
  E('year').textContent=String(new Date().getFullYear());
  const io='IntersectionObserver' in window?new IntersectionObserver(entries=>{for(const ent of entries){if(ent.isIntersecting){ent.target.classList.add('in-view');io.unobserve(ent.target);}}},{rootMargin:'0px 0px -9% 0px',threshold:.05}):null;
  if(io){document.querySelectorAll('.product-card,.beyond-tile,.intro-row,.gift-content,.final-left').forEach(e=>{e.classList.add('will-reveal');io.observe(e)});} 
  // Vídeos ambientales: sólo se reproducen cuando están visibles. Las personas
  // que prefieren movimiento reducido pueden reproducirlos manualmente.
  const vids=[...document.querySelectorAll('video')];
  if ('IntersectionObserver' in window) {
    const videoIO=new IntersectionObserver(entries=>entries.forEach(ent=>{
      const v=ent.target;
      if(ent.isIntersecting){if(!reduced && !v.dataset.userPaused) v.play().catch(()=>{});}
      else v.pause();
    }),{threshold:.14});vids.forEach(v=>videoIO.observe(v));
  }
  // Red Velvet: play/pause, sonido y progreso. El clic abre el producto real
  // dentro de la colección existente, sin duplicar fichas de catálogo.
  const feature=E('velvet-film-video');
  const featurePause=E('velvet-film-pause'),featureSound=E('velvet-film-sound');
  if(feature && featurePause && featureSound){
    const status=E('velvet-film-status'),progress=E('velvet-film-progress');
    function updateFeatureUI(){
      const paused=feature.paused;
      featurePause.innerHTML=paused?'Reproducir <span aria-hidden="true">▶</span>':'Pausar <span aria-hidden="true">Ⅱ</span>';
      featurePause.setAttribute('aria-label',paused?'Reproducir video':'Pausar video');
      featurePause.setAttribute('aria-pressed',String(!paused));
      featureSound.innerHTML=feature.muted?'Sonido <span aria-hidden="true">↗</span>':'Silenciar <span aria-hidden="true">↘</span>';
      featureSound.setAttribute('aria-label',feature.muted?'Activar sonido del video':'Silenciar video');
      featureSound.setAttribute('aria-pressed',String(!feature.muted));
      status.textContent=paused?'VIDEO EN PAUSA':'EN REPRODUCCIÓN';
    }
    featurePause.addEventListener('click',()=>{
      if(feature.paused){feature.dataset.userPaused='';feature.play().catch(()=>{});}else{feature.dataset.userPaused='true';feature.pause();}
      updateFeatureUI();
    });
    featureSound.addEventListener('click',()=>{
      feature.muted=!feature.muted;
      if(feature.paused && !reduced){feature.dataset.userPaused='';feature.play().catch(()=>{});}
      updateFeatureUI();
    });
    feature.addEventListener('timeupdate',()=>{if(feature.duration>0)progress.style.width=((feature.currentTime/feature.duration)*100)+'%';});
    feature.addEventListener('play',updateFeatureUI);
    feature.addEventListener('pause',updateFeatureUI);
    feature.addEventListener('volumechange',updateFeatureUI);
    if(reduced){feature.removeAttribute('autoplay');feature.pause();feature.dataset.userPaused='true';}
    updateFeatureUI();
    E('velvet-film-product').addEventListener('click',()=>{
      const redCard=document.querySelector('.product-card[data-title="Red Velvet Nutella"]');
      if(redCard)redCard.click();else E('coleccion')?.scrollIntoView({behavior:reduced?'instant':'smooth'});
    });
  }

})();

/* Pedidos Bigg ($13.000) y caja Mini x6 ($39.000), con subtotal verificable. */
(()=>{
  const conf=window.EVOLET_CONFIG||{};
  const $=id=>document.getElementById(id);
  const cards=[...document.querySelectorAll('.product-card')];
  const products=new Map(cards.map(c=>[c.dataset.title,{title:c.dataset.title,photo:c.dataset.photo,price:13000,kind:'bigg'}]));
  const BOX='Caja Mini Cookies x6';
  products.set(BOX,{title:BOX,photo:'mini-poster.webp',price:39000,kind:'mini'});
  const money=n=>'$'+Math.round(n).toLocaleString('es-CO');
  const cart=new Map();
  try{let saved=JSON.parse(localStorage.getItem('evolet-cart-v3')||'[]');if(Array.isArray(saved))for(const entry of saved){if(products.has(entry.title)&&Number.isInteger(entry.qty)&&entry.qty>0&&entry.qty<=99)cart.set(entry.title,entry.qty);}}catch{}
  const fab=$('selection-fab'),overlay=$('selection-overlay'),list=$('selection-items'),count=$('selection-count'),feedback=$('selection-feedback'),toast=$('selection-toast'),total=$('selection-total'),send=$('selection-send');
  let lastFocus=null,timer;
  function safe(s){return String(s).replace(/[&<>"']/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));}
  function notice(s){toast.textContent=s;toast.classList.add('active');clearTimeout(timer);timer=setTimeout(()=>toast.classList.remove('active'),3800);}
  function save(){try{localStorage.setItem('evolet-cart-v3',JSON.stringify([...cart].map(([title,qty])=>({title,qty}))));}catch{}}
  function subtotal(){return [...cart.entries()].reduce((sum,[title,qty])=>sum+products.get(title).price*qty,0);}
  function render(){let q=[...cart.values()].reduce((x,y)=>x+y,0);count.textContent=q;fab.hidden=q===0;fab.setAttribute('aria-label',`Ver pedido con ${q} productos. Total ${money(subtotal())} pesos`);total.textContent=money(subtotal())+' COP';
    list.innerHTML=q?[...cart.entries()].map(([name,qty])=>{let p=products.get(name);return `<div class="selection-item"><img src="assets/${encodeURIComponent(p.photo)}" alt=""><div><h3>${safe(name)}</h3><small>${p.kind==='mini'?'MINI / CAJA X6':'BIGG / UNIDAD'} · ${money(p.price)} · ${money(qty*p.price)}</small></div><div class="selection-qty"><button type="button" data-change="-1" data-title="${safe(name)}" aria-label="Reducir ${safe(name)}">−</button><span>${qty}</span><button type="button" data-change="1" data-title="${safe(name)}" aria-label="Aumentar ${safe(name)}">+</button></div></div>`;}).join(''):'<p class="selection-empty">Tu pedido está vacío. Explora los sabores y elige tus favoritas.</p>';
    send.disabled=q===0;send.textContent=conf.whatsapp?'Enviar pedido por WhatsApp ↗':'Copiar pedido y abrir Instagram ↗';save();}
  function open(){lastFocus=document.activeElement;overlay.classList.add('open');overlay.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';feedback.textContent='';overlay.querySelector('.selection-close').focus();}
  function close(){overlay.classList.remove('open');overlay.setAttribute('aria-hidden','true');document.body.style.overflow='';lastFocus?.focus?.();}
  function add(title){if(!products.has(title))return;cart.set(title,Math.min(99,(cart.get(title)||0)+1));render();notice('Agregado al pedido.');}
  fab.addEventListener('click',open);
  document.querySelectorAll('[data-open-order]').forEach(btn=>btn.addEventListener('click',open));
  $('add-mini-box')?.addEventListener('click',()=>{add(BOX);open();});
  overlay.querySelectorAll('[data-selection-close]').forEach(el=>el.addEventListener('click',close));
  list.addEventListener('click',e=>{let b=e.target.closest('button[data-change]');if(!b)return;let t=b.dataset.title;let next=Math.max(0,Math.min(99,(cart.get(t)||0)+Number(b.dataset.change)));next?cart.set(t,next):cart.delete(t);render();});
  $('add-to-selection').addEventListener('click',()=>{let title=$('modal-title').textContent;add(title);document.querySelector('#product-modal .modal-close').click();open();});
  function message(items){const hasMini=items.some(([title])=>products.get(title).kind==='mini');return `${conf.orderIntro||'Hola, EVOLET 👋 Quiero confirmar el siguiente pedido:'}

${items.map(([title,qty])=>{let p=products.get(title);return `• ${qty} ${p.kind==='mini'?'caja(s) x6':'unidad(es)'} de ${title} (${p.kind==='mini'?'Mini Cookies':'Bigg Cookies'}) — ${money(qty*p.price)}`}).join('\n')}

TOTAL ESTIMADO: ${money(subtotal())} COP
El total no incluye envío.${hasMini?'\nLa caja Mini x6 es surtida; por favor confirmen su composición.':''}

Mis datos:
• Nombre:
• Ciudad / barrio:
• Entrega o recogida:

Por favor confírmenme disponibilidad, costo del envío y medios de pago.`;}
  async function contact(msg){const phone=String(conf.whatsapp||'').replace(/\D/g,'');
    if(phone){window.open('https://wa.me/'+phone+'?text='+encodeURIComponent(msg),'_blank','noopener,noreferrer');notice('Abriendo WhatsApp');return;}
    let w=window.open(conf.instagram||'https://www.instagram.com/di_evolet/','_blank','noopener,noreferrer');try{await navigator.clipboard.writeText(msg);feedback.textContent='Pedido copiado. Pégalo en el chat de Instagram con EVOLET.';notice('Pedido copiado');}catch{feedback.textContent='Copia este mensaje para enviarlo a EVOLET: '+msg;notice('Revisa el pedido y cópialo');}if(!w)feedback.textContent+=' Si no se abrió Instagram, usa el enlace del pie de página.';
  }
  send.addEventListener('click',()=>{if(cart.size)contact(message([...cart]));});
  $('ask-single').addEventListener('click',()=>{let name=$('modal-title').textContent;if(!products.has(name))return;add(name);document.querySelector('#product-modal .modal-close').click();open();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&overlay.classList.contains('open'))close();if(e.key==='Tab'&&overlay.classList.contains('open')){let nodes=[...overlay.querySelectorAll('button:not([disabled]),a[href]')].filter(n=>n.offsetParent);if(!nodes.length)return;let f=nodes[0],l=nodes.at(-1);if(e.shiftKey&&document.activeElement===f){e.preventDefault();l.focus()}else if(!e.shiftKey&&document.activeElement===l){e.preventDefault();f.focus()}}});
  render();
})();
