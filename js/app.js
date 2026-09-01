(function(){

/* ============================================================
   CONTENIDO — verificado contra Pró, Anatomía Clínica (Panamericana)
   ============================================================ */

// Plantilla reutilizable de sub-actividades para módulos aún sin contenido.
// Cada módulo nuevo obtiene su propia copia (no se comparte por referencia).
function SUB_ACTIVITY_TEMPLATE(){
  return [
    { id:'mc', title:'Preguntas de selección múltiple', icon:'📝', ready:false },
    { id:'match', title:'Relacionar, completar y otras actividades', icon:'🔗', ready:false },
    { id:'img', title:'Actividades con imágenes anatómicas', icon:'🖼️', ready:false },
    { id:'cases', title:'Resolución de casos clínicos', icon:'🩺', ready:false },
    { id:'mix', title:'Repaso combinado (elige cuántas preguntas)', icon:'🎲', ready:false, isMix:true, standalone:true }
  ];
}

const MODULES = {
  A: {
    id:'A',
    title:'Divisiones del sistema esquelético',
    subtitle:'Axial vs. apendicular · cinturas · huesos supernumerarios',
    levels:[
      { id:'l1', title:'Reconocimiento', type:'sort',
        instructions:'Arrastra (o toca y luego toca el destino) cada hueso hacia la división del esqueleto a la que pertenece.',
        buckets:[ {key:'axial', label:'Esqueleto axial'}, {key:'apendicular', label:'Esqueleto apendicular'} ],
        items:[
          {term:'Cráneo', cat:'axial'},
          {term:'Columna vertebral', cat:'axial'},
          {term:'Costillas', cat:'axial'},
          {term:'Esternón', cat:'axial'},
          {term:'Escápula', cat:'apendicular'},
          {term:'Clavícula', cat:'apendicular'},
          {term:'Húmero', cat:'apendicular'},
          {term:'Coxal', cat:'apendicular'},
          {term:'Fémur', cat:'apendicular'},
          {term:'Carpo', cat:'apendicular'}
        ]
      },
      { id:'l2', title:'Identificación', type:'mc',
        questions:[
          {q:'¿Cuántos huesos constantes conforma el esqueleto del adulto?', opts:['186','200','206','212'], correct:2,
            explain:'El esqueleto óseo está formado por 206 huesos constantes: 200 huesos y los 6 huesecillos del oído (Pró).'},
          {q:'¿Qué huesos forman la cintura del miembro superior?', opts:['Húmero y radio','Escápula y clavícula','Coxal y sacro','Carpo y metacarpo'], correct:1,
            explain:'La escápula y la clavícula forman la cintura (cingulum) del miembro superior, que lo relaciona con el esqueleto axial.'},
          {q:'¿Qué hueso forma la cintura del miembro inferior?', opts:['Fémur','Sacro','Coxal','Rótula'], correct:2,
            explain:'El coxal forma la cintura del miembro inferior (cintura pélvica).'},
          {q:'En el adulto, el coxal resulta de la fusión de tres huesos separados en el niño. ¿Cuáles?', opts:['Sacro, cóccix e ilion','Ilion, isquion y pubis','Fémur, coxal y sacro','Pubis, sacro y fémur'], correct:1,
            explain:'Con la edad, el ilion, el isquion y el pubis se sueldan para formar el coxal.'},
          {q:'Los huesos accesorios que aparecen asociados a las suturas craneales se llaman:', opts:['Huesos sesamoideos','Huesos suturales','Huesos neumáticos','Huesos largos'], correct:1,
            explain:'Los huesos supernumerarios pueden ser suturales (en las suturas craneales) o sesamoideos (asociados a tendones y articulaciones).'},
          {q:'¿Qué huesos componen la "porción libre" del miembro superior?', opts:['Escápula y clavícula','Húmero, cúbito, radio, carpo, metacarpo y falanges','Solo el coxal','Cráneo y columna'], correct:1,
            explain:'Cada miembro tiene una cintura (que lo une al esqueleto axial) y una porción libre, formada por el resto de sus huesos.'}
        ]
      },
      { id:'l3', title:'Relaciones', type:'mc', introLabel:'Elige el intruso',
        questions:[
          {q:'Elige el intruso — el que NO pertenece al mismo grupo:', opts:['Cráneo','Columna vertebral','Escápula','Esternón'], correct:2,
            explain:'La escápula es apendicular (cintura escapular); cráneo, columna vertebral y esternón pertenecen al esqueleto axial.'},
          {q:'Elige el intruso:', opts:['Húmero','Cúbito','Radio','Costillas'], correct:3,
            explain:'Las costillas son axiales; húmero, cúbito y radio pertenecen al miembro superior (apendicular).'},
          {q:'Elige el intruso:', opts:['Frontal','Parietal','Occipital','Clavícula'], correct:3,
            explain:'La clavícula es apendicular; frontal, parietal y occipital forman parte del cráneo (axial).'},
          {q:'Elige el intruso:', opts:['Vértebras','Sacro','Cóccix','Coxal'], correct:3,
            explain:'El coxal es apendicular (cintura pélvica); vértebras, sacro y cóccix forman parte de la columna vertebral, que es axial.'},
          {q:'Elige el intruso:', opts:['Carpo','Metacarpo','Falanges','Esternón'], correct:3,
            explain:'El esternón es axial; carpo, metacarpo y falanges son parte de la porción libre del miembro superior (apendicular).'}
        ]
      },
      { id:'l4', title:'Aplicación', type:'mc',
        questions:[
          {q:'Un paciente sufre una fractura de clavícula tras una caída sobre el hombro. ¿A qué división del esqueleto pertenece este hueso y qué función cumple?',
            opts:['Esqueleto axial; forma parte del cráneo','Esqueleto apendicular; forma parte de la cintura escapular que conecta el miembro superior con el esqueleto axial','Esqueleto axial; forma parte de la columna vertebral','Esqueleto apendicular; forma parte de la porción libre del miembro superior'], correct:1,
            explain:'La clavícula, junto con la escápula, forma la cintura escapular (apendicular), que conecta el miembro superior con el tronco.'},
          {q:'Una radiografía muestra una fractura en el sacro. ¿Qué división y qué región están afectadas?',
            opts:['Apendicular; cintura pélvica','Axial; columna vertebral','Apendicular; porción libre del miembro inferior','Axial; cráneo'], correct:1,
            explain:'El sacro forma parte de la columna vertebral (axial), a diferencia del coxal, que sí es la cintura pélvica (apendicular).'}
        ]
      }
    ]
  },
  B: {
    id:'B',
    title:'Clasificación ósea y accidentes óseos',
    subtitle:'Forma de los huesos · relieves y depresiones · aplicación clínica',
    levels:[
      { id:'l1', title:'Reconocimiento', type:'sort',
        instructions:'Clasifica cada hueso según su forma general.',
        buckets:[
          {key:'largo', label:'Largo'}, {key:'plano', label:'Plano'},
          {key:'corto', label:'Corto'}, {key:'irregular', label:'Irregular'},
          {key:'sesamoideo', label:'Sesamoideo'}
        ],
        items:[
          {term:'Húmero', cat:'largo'},
          {term:'Tibia', cat:'largo'},
          {term:'Escápula', cat:'plano'},
          {term:'Occipital', cat:'plano'},
          {term:'Calcáneo', cat:'corto'},
          {term:'Huesos del carpo', cat:'corto'},
          {term:'Vértebra', cat:'irregular'},
          {term:'Esfenoides', cat:'irregular'},
          {term:'Rótula', cat:'sesamoideo'}
        ]
      },
      { id:'l2', title:'Identificación', type:'match',
        instructions:'Toca un término y luego su definición correcta.',
        pairs:[
          ['Tuberosidad','Protuberancia ósea redondeada, de relieve rugoso, para inserción muscular o ligamentosa'],
          ['Tubérculo','Protuberancia ósea de menor tamaño que la tuberosidad'],
          ['Cresta','Reborde óseo elevado'],
          ['Espina','Protrusión ósea puntiaguda'],
          ['Fosa','Depresión o excavación donde se alojan estructuras anatómicas'],
          ['Surco','Depresión lineal, en forma de canal'],
          ['Foramen','Agujero o perforación por donde pasan vasos o nervios'],
          ['Cóndilo','Saliente articular, parte de un complejo articular']
        ]
      },
      { id:'l3', title:'Relaciones', type:'mc',
        questions:[
          {q:'La "tuberosidad deltoidea" del húmero (inserción del músculo deltoides) es una:', opts:['Saliente articular','Saliente extraarticular','Cavidad no articular','Foramen'], correct:1,
            explain:'Es una saliente extraarticular: irregular y rugosa, destinada a la inserción muscular.'},
          {q:'El "cóndilo" del húmero es una:', opts:['Saliente articular','Saliente extraarticular','Cavidad articular','Foramen'], correct:0,
            explain:'El cóndilo es una saliente articular, parte de un complejo articular.'},
          {q:'La "fosa intercondílea" del fémur es una:', opts:['Saliente articular','Saliente extraarticular','Cavidad no articular','Foramen nutricio'], correct:2,
            explain:'Es una cavidad no articular: una depresión (fosa) ubicada entre los cóndilos femorales.'},
          {q:'El "foramen mandibular", por donde pasan el nervio y los vasos alveolares inferiores, es:', opts:['Una saliente extraarticular','Una cavidad articular','Un foramen (agujero) de transmisión','Una cresta'], correct:2,
            explain:'Es un foramen: un orificio por donde pasan estructuras vasculonerviosas.'},
          {q:'El "epicóndilo" medial del fémur es una:', opts:['Saliente extraarticular','Saliente articular','Cavidad articular','Escotadura'], correct:0,
            explain:'El epicóndilo es una saliente extraarticular: un relieve óseo relacionado por proximidad con un cóndilo.'}
        ]
      },
      { id:'l4', title:'Aplicación', type:'mc',
        questions:[
          {q:'Una paciente adulta mayor sufre una caída y presenta el miembro inferior acortado y en rotación lateral, con dolor intenso en la cadera. ¿Qué relación existe entre la pérdida de hueso trabecular (esponjoso) y este tipo de fractura?',
            opts:['Ninguna; el hueso esponjoso no influye en la resistencia ósea','La pérdida de hueso trabecular por osteoporosis debilita la epífisis femoral, aumentando el riesgo de fractura','Solo afecta al hueso compacto de la diáfisis, no a la epífisis','La rótula, al ser sesamoidea, es la causante de este tipo de fractura'], correct:1,
            explain:'Las fracturas intracapsulares del fémur suelen deberse a la pérdida de masa ósea por la edad (osteoporosis posmenopáusica o senil), sea del hueso trabecular o del cortical.'},
          {q:'¿Por qué las fracturas de maxilar son frecuentes en accidentes de tránsito, según su forma ósea?',
            opts:['El maxilar es un hueso largo, resistente a impactos frontales','El maxilar es un hueso irregular, expuesto directamente en la cara ante traumatismos','El maxilar es sesamoideo y está protegido por tendones','El maxilar es neumático y no tiene relevancia clínica'], correct:1,
            explain:'La causa más frecuente de fracturas de maxilar son los accidentes de tránsito; como hueso irregular de la cara, queda directamente expuesto al traumatismo.'}
        ]
      }
    ]
  },
  C: { id:'C', title:'Huesos del cráneo y cuello', subtitle:'Selecciona el tipo de actividad', placeholder:true, levels:[], subActivities:SUB_ACTIVITY_TEMPLATE() },
  D: { id:'D', title:'Huesos de la columna vertebral', subtitle:'Selecciona el tipo de actividad', placeholder:true, levels:[], subActivities:SUB_ACTIVITY_TEMPLATE() },
  E: { id:'E', title:'Huesos del tórax', subtitle:'Selecciona el tipo de actividad', placeholder:true, levels:[], subActivities:SUB_ACTIVITY_TEMPLATE() },
  F: { id:'F', title:'Huesos de la cintura escapular y miembro superior', subtitle:'Selecciona el tipo de actividad', placeholder:true, levels:[], subActivities:SUB_ACTIVITY_TEMPLATE() }
};

const CATEGORIES = {
  oseo: {
    id:'oseo',
    emoji:'🦴',
    title:'Estructuras y funciones del sistema óseo',
    subtitle:'Divisiones del esqueleto, clasificación ósea, accidentes óseos y más',
    moduleIds:['A','B','C','D','E','F']
  }
};

/* ============================================================
   ESTADO
   ============================================================ */
const state = {
  view:'welcome',
  student:{name:'', code:''},
  progress:{}, // e.g. progress['A-l1'] = {correct, total}
  timers:{}, // e.g. timers['A'] = {status:'not_started'|'in_progress'|'completed', elapsedSec:0}
  currentCategory:null,
  currentModule:null,
  currentSubActivity:null,
  currentLevelIdx:0,
  bossPool:null,
  bossIdx:0,
  bossScore:0,
  bossTimer:null,
  bossTimeLeft:0,
  dashboardRows:null,
  dashboardProfiles:null,
  dashboardActivityId:null,
  dashboardError:null,
  monitorPass:'',
  monitorAuthed:false,
  saved:false
};

function homeView(){
  if(state.currentCategory) return 'menu';
  if(state.student.code) return 'categories';
  return 'welcome';
}

/* ============================================================
   CRONÓMETRO POR ACTIVIDAD (módulo)
   Reutilizable: cualquier módulo (actual o futuro) obtiene
   cronómetro automáticamente solo con tener un id en MODULES.
   ============================================================ */
let _activeTimerModule=null;   // id del módulo con el cronómetro corriendo, o null si está en pausa
let _activeTimerStartTs=null;  // Date.now() de cuándo arrancó el tramo activo actual
let _timerTickHandle=null;     // setInterval del refresco visual cada segundo

function ensureTimer(modId){
  if(!state.timers[modId]) state.timers[modId]={status:'not_started', elapsedSec:0};
  return state.timers[modId];
}

function formatHMS(totalSeconds){
  const s = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(s/3600);
  const m = Math.floor((s%3600)/60);
  const sec = s%60;
  return [h,m,sec].map(n=>String(n).padStart(2,'0')).join(':');
}

function currentElapsed(modId){
  const t = ensureTimer(modId);
  let extra=0;
  if(_activeTimerModule===modId && _activeTimerStartTs){
    extra = (Date.now()-_activeTimerStartTs)/1000;
  }
  return t.elapsedSec + extra;
}

function startModuleTimer(modId){
  const t = ensureTimer(modId);
  if(t.status==='completed') return; // tiempo final ya congelado
  if(_activeTimerModule===modId && _activeTimerStartTs) return; // ya corriendo
  pauseActiveTimer(); // por si había otro módulo corriendo
  t.status='in_progress';
  _activeTimerModule=modId;
  _activeTimerStartTs=Date.now();
  startTimerTick();
  saveProfile();
}

function pauseActiveTimer(){
  if(_activeTimerModule && _activeTimerStartTs){
    const t = ensureTimer(_activeTimerModule);
    if(t.status!=='completed'){
      t.elapsedSec += (Date.now()-_activeTimerStartTs)/1000;
    }
    saveProfile();
  }
  _activeTimerModule=null;
  _activeTimerStartTs=null;
  stopTimerTick();
}

function completeModuleTimer(modId){
  const t = ensureTimer(modId);
  if(_activeTimerModule===modId && _activeTimerStartTs){
    t.elapsedSec += (Date.now()-_activeTimerStartTs)/1000;
    _activeTimerModule=null; _activeTimerStartTs=null;
    stopTimerTick();
  }
  t.status='completed';
  saveProfile();
}

function startTimerTick(){
  stopTimerTick();
  _timerTickHandle=setInterval(()=>{
    if(!_activeTimerModule) return;
    const el = document.getElementById('liveTimerBadge');
    if(el) el.textContent='⏱ '+formatHMS(currentElapsed(_activeTimerModule));
  }, 1000);
}
function stopTimerTick(){
  if(_timerTickHandle){ clearInterval(_timerTickHandle); _timerTickHandle=null; }
}

// Pausa el cronómetro si el estudiante cambia de pestaña / minimiza / sale del Artifact,
// y lo reanuda automáticamente al volver, siempre que siga en la vista de ese módulo.
document.addEventListener('visibilitychange', ()=>{
  if(document.hidden){
    pauseActiveTimer();
  } else if(state.currentModule && ['sort','match','mc','levelDone'].includes(state.view)){
    startModuleTimer(state.currentModule);
  }
});

function goToDashboard(){
  if(state.monitorAuthed){ state.view='dashboard'; render(); }
  else { state.view='monitorLogin'; render(); }
}

function levelKey(mod, lvlId){ return mod+'-'+lvlId; }

const SHEETS_API_URL='https://script.google.com/macros/s/AKfycbxdfEGUbL_7xhcQj6RwdvmWcRrjgMnk9pY4XUuHNEp1fErhIxY89bot9l0ji9RTqnkd/exec';

async function apiGet(params){
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(SHEETS_API_URL + '?' + qs);
  if(!res.ok) throw new Error('HTTP ' + res.status);
  const data = await res.json();
  if(!data.ok) throw new Error(data.error || 'error desconocido del servidor');
  return data;
}

async function apiPost(body){
  const res = await fetch(SHEETS_API_URL, {
    method:'POST',
    headers:{'Content-Type':'text/plain;charset=utf-8'}, // evita el preflight CORS con Apps Script
    body: JSON.stringify(body)
  });
  if(!res.ok) throw new Error('HTTP ' + res.status);
  const data = await res.json();
  if(!data.ok) throw new Error(data.error || 'error desconocido del servidor');
  return data;
}

async function checkStorageDiag(diagEl){
  try{
    await apiGet({action:'ping'});
    diagEl.textContent = '✅ Guardado conectado a tu hoja de Google Sheets.';
    diagEl.style.borderColor='var(--good-dark)'; diagEl.style.background='var(--good-soft)'; diagEl.style.color='var(--good-dark)';
  }catch(err){
    diagEl.textContent = '⚠️ No se pudo conectar con la hoja de Google. Detalle: '+(err&&err.message?err.message:String(err));
    diagEl.style.borderColor='var(--bad)'; diagEl.style.background='var(--bad-soft)'; diagEl.style.color='var(--bad)';
    console.error('Backend diag error', err);
  }
}

async function saveProfile(){
  try{
    if(!state.student.code) return;
    await apiPost({
      action:'saveProfile',
      code: state.student.code, name: state.student.name,
      progress: state.progress, timers: state.timers, saved: state.saved
    });
  }catch(e){ console.error('No se pudo guardar el perfil', e); }
}

async function loadProfile(code){
  try{
    const data = await apiGet({action:'getProfile', code: code});
    if(!data.profile) return null;
    const p = data.profile;
    return {
      name: p.name || '',
      code: p.code || code,
      progress: p.progress ? JSON.parse(p.progress) : {},
      timers: p.timers ? JSON.parse(p.timers) : {},
      saved: String(p.saved).toUpperCase()==='TRUE'
    };
  }catch(e){ console.error('No se pudo cargar el perfil', e); return null; }
}

async function resetProfile(){
  state.progress={};
  state.timers={};
  state.saved=false;
  state.view='menu';
  render();
  await saveProfile();
}

function logout(){
  state.student={name:'',code:''};
  state.progress={};
  state.timers={};
  state.saved=false;
  state.currentCategory=null;
  state._confirmingReset=false;
  state.view='welcome';
  render();
}

function allLevelsFlat(){
  const out=[];
  Object.values(MODULES).forEach(m=>m.levels.forEach(l=>out.push({mod:m.id,l})));
  return out;
}

/* ============================================================
   HELPERS
   ============================================================ */
function el(tag, cls, html){
  const e=document.createElement(tag);
  if(cls) e.className=cls;
  if(html!==undefined) e.innerHTML=html;
  return e;
}
function shuffle(arr){
  const a=arr.slice();
  for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}
function pct(correct,total){ return total? Math.round((correct/total)*100) : 0; }

const MODULE_TIMER_VIEWS = ['sort','match','mc','levelDone'];

function render(){
  if(_activeTimerModule && !(MODULE_TIMER_VIEWS.includes(state.view) && state.currentModule===_activeTimerModule)){
    pauseActiveTimer();
  }
  const app=document.getElementById('app');
  app.innerHTML='';
  if(state.view!=='welcome'){ app.appendChild(topStrip()); }
  const views={
    welcome: viewWelcome,
    categories: viewCategories,
    menu: viewMenu,
    sort: viewSort,
    match: viewMatch,
    mc: viewMC,
    levelDone: viewLevelDone,
    boss: viewBoss,
    bossDone: viewBossDone,
    report: viewReport,
    dashboard: viewDashboard,
    monitorLogin: viewMonitorLogin,
    comingSoon: viewComingSoon,
    dashboardActivity: viewDashboardActivity,
    moduleSubmenu: viewModuleSubmenu
  };
  try{
    app.appendChild(views[state.view]());
  }catch(err){
    console.error('Render error en vista "'+state.view+'":', err);
    app.appendChild(errorCard(err));
  }
}

function errorCard(err){
  const wrap=el('div');
  const card=el('div','card');
  card.style.borderColor='var(--bad)';
  card.appendChild(el('div','eyebrow','⚠️ ALGO SALIÓ MAL'));
  card.appendChild(el('h1','','No se pudo mostrar esta pantalla'));
  card.appendChild(el('p','','Detalle técnico: '+esc(err && err.message ? err.message : String(err))));
  const homeBtn=el('button','btn btn-primary btn-block','Volver al inicio');
  homeBtn.onclick=()=>{ state.view=homeView(); render(); };
  card.appendChild(homeBtn);
  wrap.appendChild(card);
  return wrap;
}

function topStrip(){
  const wrap=el('div','topstrip');
  const brand=el('div','brand','<span class="dot"></span> Morfo-Trainer');
  const readout=el('div','readout');
  const doneCount = Object.keys(state.progress).length;
  const totalLevels = allLevelsFlat().length;
  readout.innerHTML = '<span>'+ (state.student.name? esc(state.student.name):'Invitado') +'</span><span>NIVELES <span class="v">'+doneCount+'/'+totalLevels+'</span></span>';
  wrap.appendChild(brand); wrap.appendChild(readout);
  return wrap;
}

function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g, c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

function backButton(label, cb){
  const b=el('button','backlink backlink-invert','← '+label);
  b.onclick=cb;
  return b;
}

function sessionBar(){
  const bar=el('div','sessionbar');
  const initial = (state.student.name||'?').trim().charAt(0).toUpperCase() || '?';

  const left=el('div','sleft');
  left.appendChild(el('div','savatar', esc(initial)));
  const info=el('div','sinfo');
  info.innerHTML = '<div class="sname">'+esc(state.student.name)+'</div><div class="scode">Código '+esc(state.student.code)+'</div>';
  left.appendChild(info);
  bar.appendChild(left);

  const logoutBtn=el('button','btn slogout','Cerrar sesión');
  logoutBtn.onclick=()=>{ logout(); };
  bar.appendChild(logoutBtn);

  return bar;
}

/* ============================================================
   VISTA: BIENVENIDA
   ============================================================ */
function viewWelcome(){
  const wrap=el('div');
  const card=el('div','card');
  card.appendChild(el('div','logo-mark','🦴'));
  card.appendChild(el('div','eyebrow','MORFOFISIOLOGÍA I · VACS'));
  card.appendChild(el('h1','','Morfo-Trainer'));
  card.appendChild(el('p','lede','Entrenamiento virtual de anatomía ósea. Ingresa con tu código estudiantil para empezar o continuar donde dejaste.'));

  const diag=el('div','');
  diag.style.cssText='border:2.5px solid var(--line-strong);border-radius:12px;padding:10px 12px;margin-bottom:16px;font-size:12.5px;font-weight:700;';
  diag.textContent='Comprobando guardado…';
  card.appendChild(diag);
  checkStorageDiag(diag);

  const codeLabel=el('label','','Código estudiantil');
  const codeInput=document.createElement('input');
  codeInput.type='text'; codeInput.placeholder='Ej. 2025262056'; codeInput.value=state.student.code;
  card.appendChild(codeLabel); card.appendChild(codeInput);

  const nameDisplay=el('div','');
  nameDisplay.style.cssText='min-height:20px;margin:2px 0 16px;font-weight:800;font-size:14.5px;';
  card.appendChild(nameDisplay);

  const errMsg=el('p','footnote','');
  errMsg.style.color='var(--bad)'; errMsg.style.display='none';
  card.appendChild(errMsg);

  const startBtn=el('button','btn btn-primary btn-block','Ingresar →');

  let confirmedName=null;
  let lastLookupCode=null;

  async function doLookup(){
    const code=codeInput.value.trim();
    if(!code){ confirmedName=null; lastLookupCode=null; nameDisplay.textContent=''; return null; }
    if(code===lastLookupCode) return confirmedName;
    nameDisplay.textContent='Buscando tu nombre en la lista del curso…';
    nameDisplay.style.color='var(--ink-dim)';
    try{
      const data=await apiGet({action:'lookupName', code});
      if(code!==codeInput.value.trim()) return confirmedName; // el código cambió mientras esperábamos
      lastLookupCode=code;
      if(data.name){
        confirmedName=data.name;
        nameDisplay.textContent='👋 '+data.name;
        nameDisplay.style.color='var(--good-dark)';
      } else {
        confirmedName=null;
        nameDisplay.textContent='⚠️ Ese código no está en la lista del curso. Verifica que esté bien escrito, o avísale a tu profesor.';
        nameDisplay.style.color='var(--bad)';
      }
      return confirmedName;
    }catch(e){
      lastLookupCode=null;
      nameDisplay.textContent='⚠️ No se pudo verificar el código ahora mismo. Intenta de nuevo.';
      nameDisplay.style.color='var(--bad)';
      return null;
    }
  }

  codeInput.addEventListener('blur', doLookup);
  codeInput.addEventListener('keydown', (e)=>{ if(e.key==='Enter'){ e.preventDefault(); startBtn.click(); } });
  codeInput.addEventListener('input', ()=>{
    confirmedName=null; lastLookupCode=null; nameDisplay.textContent='';
  });

  startBtn.onclick=async ()=>{
    const code=codeInput.value.trim();
    if(!code){
      errMsg.textContent='Ingresa tu código estudiantil para continuar.';
      errMsg.style.display='block';
      return;
    }
    errMsg.style.display='none';
    startBtn.disabled=true; startBtn.textContent='Verificando…';
    const name = await doLookup();
    if(!name){
      startBtn.disabled=false; startBtn.textContent='Ingresar →';
      errMsg.textContent='Ese código no está en la lista del curso. Verifica que esté bien escrito.';
      errMsg.style.display='block';
      return;
    }
    startBtn.textContent='Entrando…';
    try{
      const existing = await loadProfile(code);
      state.student.code = code;
      state.student.name = name;
      if(existing){
        state.progress = existing.progress || {};
        state.timers = existing.timers || {};
        state.saved = !!existing.saved;
      } else {
        state.progress = {};
        state.timers = {};
        state.saved = false;
      }
      state.currentCategory=null;
      state.view='categories';
      render();
      saveProfile();
    }catch(e){
      startBtn.disabled=false; startBtn.textContent='Ingresar →';
      errMsg.textContent='No se pudo verificar tu perfil. Detalle: '+(e&&e.message?e.message:String(e));
      errMsg.style.display='block';
    }
  };
  card.appendChild(el('div','', '')).appendChild(startBtn);

  const dashBtn=el('button','btn btn-ghost btn-block','Soy el monitor — ver panel del grupo');
  dashBtn.style.marginTop='10px';
  dashBtn.onclick=()=>{ goToDashboard(); };
  card.appendChild(dashBtn);

  wrap.appendChild(card);
  return wrap;
}

/* ============================================================
   VISTA: MENÚ DE MÓDULOS
   ============================================================ */
function viewCategories(){
  const wrap=el('div');
  const outer=el('div','card');

  outer.appendChild(el('h1','','¿Qué quieres entrenar?'));
  outer.appendChild(el('p','','Elige un tema del curso para ver sus actividades.'));
  outer.appendChild(sessionBar());

  const grid=el('div','modgrid');
  Object.values(CATEGORIES).forEach(cat=>{
    let total=0, done=0, sumPct=0;
    cat.moduleIds.forEach(mid=>{
      const mod=MODULES[mid]; if(!mod) return;
      mod.levels.forEach(l=>{
        total++;
        const p=state.progress[levelKey(mod.id,l.id)];
        if(p){ done++; sumPct+=pct(p.correct,p.total); }
      });
    });
    const avg = done? Math.round(sumPct/done):0;

    const catBtn=el('button','modcard');
    catBtn.innerHTML =
      '<div class="mtitle">'+cat.emoji+' '+esc(cat.title)+'</div>'+
      '<div class="msub">'+esc(cat.subtitle)+'</div>'+
      '<div class="progressbar"><i style="width:'+(total? done/total*100:0)+'%"></i></div>'+
      '<div class="pct">'+done+' / '+total+' niveles completados'+(done? ' · promedio '+avg+'%':'')+'</div>';
    catBtn.onclick=()=>{ state.currentCategory=cat.id; state.view='menu'; render(); };
    grid.appendChild(catBtn);
  });
  outer.appendChild(grid);

  wrap.appendChild(outer);
  return wrap;
}

function viewMenu(){
  const cat = CATEGORIES[state.currentCategory];
  if(!cat){ state.view='categories'; return viewCategories(); }

  const wrap=el('div');
  wrap.appendChild(backButton('Cambiar de tema', ()=>{ state.currentCategory=null; state.view='categories'; render(); }));

  const infoCard=el('div','card');
  infoCard.style.marginBottom='16px';
  infoCard.appendChild(el('div','eyebrow', cat.emoji+' '+cat.title.toUpperCase()));
  infoCard.appendChild(el('h1','','Panel de entrenamiento'));
  infoCard.appendChild(el('p','','Elige un módulo. Cada uno avanza en cuatro niveles: reconocimiento, identificación, relaciones y aplicación.'));
  infoCard.appendChild(sessionBar());
  wrap.appendChild(infoCard);

  const outer=el('div','card');
  outer.appendChild(el('div','section-title','Temas'));

  const grid=el('div','modgrid');
  cat.moduleIds.forEach((mid, idx)=>{
    const mod=MODULES[mid]; if(!mod) return;
    const num = String(idx+1).padStart(2,'0');
    const modBtn=el('button','modcard');

    if(mod.placeholder){
      modBtn.innerHTML =
        '<div class="mhead"><span class="modnum">'+num+'</span><span class="mtitle">'+esc(mod.title)+'</span></div>'+
        '<div class="msub">'+esc(mod.subtitle)+'</div>'+
        '<span class="soontag">🔧 Próximamente</span>';
      modBtn.onclick=()=>{
        state.currentModule=mod.id;
        state.currentSubActivity=null;
        state.view = (mod.subActivities && mod.subActivities.length) ? 'moduleSubmenu' : 'comingSoon';
        render();
      };
    } else {
      const total=mod.levels.length;
      let done=0, sumPct=0;
      mod.levels.forEach(l=>{ const p=state.progress[levelKey(mod.id,l.id)]; if(p){done++; sumPct+=pct(p.correct,p.total);} });
      const avg = done? Math.round(sumPct/done):0;
      const timerT = state.timers[mid];
      const timeLabel = timerT && (timerT.elapsedSec>0 || timerT.status!=='not_started') ? '⏱ '+formatHMS(currentElapsed(mid))+(timerT.status==='completed'?' (final)':'') : '';

      modBtn.innerHTML =
        '<div class="mhead"><span class="modnum">'+num+'</span><span class="mtitle">'+esc(mod.title)+'</span></div>'+
        '<div class="msub">'+esc(mod.subtitle)+'</div>'+
        '<div class="progressbar"><i style="width:'+(done/total*100)+'%"></i></div>'+
        '<div class="pct">'+done+' / '+total+' niveles completados'+(done? ' · promedio '+avg+'%':'')+'</div>'+
        (timeLabel? '<div class="modtime">'+timeLabel+'</div>':'');
      modBtn.onclick=()=>{ goToLevel(mod.id, firstIncompleteLevelIdx(mod)); };
    }
    grid.appendChild(modBtn);
  });
  outer.appendChild(grid);

  const bossBtn=el('button','btn btn-block','🏆  Boss Battle — repaso cronometrado (mezcla los módulos de este tema)');
  bossBtn.style.marginTop='16px';
  bossBtn.onclick=startBoss;
  outer.appendChild(bossBtn);

  const resetZone=el('div','');
  resetZone.style.marginTop='18px';
  if(!state._confirmingReset){
    const resetBtn=el('button','btn btn-ghost btn-block','↻  Reiniciar mis actividades (borra todo mi progreso)');
    resetBtn.style.borderColor='var(--bad)'; resetBtn.style.color='var(--bad)';
    resetBtn.onclick=()=>{ state._confirmingReset=true; render(); };
    resetZone.appendChild(resetBtn);
  } else {
    const warn=el('div','');
    warn.style.border='3px solid var(--bad)';
    warn.style.borderRadius='16px';
    warn.style.padding='16px';
    warn.style.background='var(--bad-soft)';
    warn.innerHTML='<p class="lede" style="margin-bottom:14px;">¿Seguro que quieres borrar <b>todo</b> tu progreso ('+esc(state.student.name)+', código '+esc(state.student.code)+') y empezar de nuevo?</p>';
    const row=el('div','row');
    const yesBtn=el('button','btn btn-primary', 'Sí, borrar y empezar de nuevo');
    yesBtn.style.background='var(--bad)'; yesBtn.style.borderColor='var(--bad-dark)'; yesBtn.style.boxShadow='0 5px 0 var(--bad-dark)';
    yesBtn.onclick=()=>{ state._confirmingReset=false; resetProfile(); };
    const noBtn=el('button','btn btn-ghost', 'Cancelar');
    noBtn.onclick=()=>{ state._confirmingReset=false; render(); };
    row.appendChild(yesBtn); row.appendChild(noBtn);
    warn.appendChild(row);
    resetZone.appendChild(warn);
  }
  outer.appendChild(resetZone);

  wrap.appendChild(outer);
  return wrap;
}

function viewModuleSubmenu(){
  const mod = MODULES[state.currentModule];
  const wrap=el('div');
  wrap.appendChild(backButton('Volver al panel', ()=>{ state.view='menu'; render(); }));

  const card=el('div','card');
  card.appendChild(el('div','eyebrow','🔧 EN CONSTRUCCIÓN'));
  card.appendChild(el('h1','', mod? esc(mod.title) : 'Actividad'));
  card.appendChild(el('p','','Elige el tipo de actividad. Tu profesor las va habilitando una por una.'));

  const grid=el('div','modgrid');
  const standaloneWrap=el('div','');
  standaloneWrap.style.marginTop='16px';

  function makeSubBtn(sub){
    const subBtn=el('button', sub.standalone? 'btn btn-block' : 'modcard');
    if(sub.standalone){
      subBtn.innerHTML = sub.icon+'  '+esc(sub.title)+(sub.ready? '' : '  · 🔧 Próximamente');
    } else {
      subBtn.innerHTML =
        '<div class="mhead"><span class="modnum">'+sub.icon+'</span><span class="mtitle">'+esc(sub.title)+'</span></div>'+
        (sub.ready? '<div class="progressbar"><i style="width:0%"></i></div><div class="pct">0 / 0 niveles completados</div>' : '<span class="soontag">🔧 Próximamente</span>');
    }
    subBtn.onclick=()=>{
      state.currentSubActivity = sub.id;
      state.view='comingSoon';
      render();
    };
    return subBtn;
  }

  (mod.subActivities||[]).forEach(sub=>{
    if(sub.standalone){ standaloneWrap.appendChild(makeSubBtn(sub)); }
    else { grid.appendChild(makeSubBtn(sub)); }
  });
  card.appendChild(grid);
  card.appendChild(standaloneWrap);

  wrap.appendChild(card);
  return wrap;
}

function viewComingSoon(){
  const mod = MODULES[state.currentModule];
  const sub = mod && mod.subActivities ? mod.subActivities.find(s=>s.id===state.currentSubActivity) : null;
  const backTarget = (mod && mod.subActivities && mod.subActivities.length) ? 'moduleSubmenu' : 'menu';

  const wrap=el('div');
  wrap.appendChild(backButton(backTarget==='moduleSubmenu'?'Volver a las actividades':'Volver al panel', ()=>{ state.view=backTarget; render(); }));
  const card=el('div','card');
  card.appendChild(el('div','eyebrow','🔧 PENDIENTE DE CONFIGURACIÓN'));
  card.appendChild(el('h1','', sub? esc(sub.title) : (mod? esc(mod.title) : 'Actividad')));
  if(sub){ card.appendChild(el('p','lede', esc(mod.title))); }
  card.appendChild(el('p','','Esta actividad todavía no tiene contenido cargado. Tu profesor la va a habilitar próximamente — vuelve a intentarlo más adelante.'));
  const backBtn=el('button','btn btn-primary btn-block', backTarget==='moduleSubmenu'?'Volver a las actividades':'Volver al panel');
  backBtn.onclick=()=>{ state.view=backTarget; render(); };
  card.appendChild(backBtn);
  wrap.appendChild(card);
  return wrap;
}

function firstIncompleteLevelIdx(mod){
  for(let i=0;i<mod.levels.length;i++){
    if(!state.progress[levelKey(mod.id, mod.levels[i].id)]) return i;
  }
  return 0;
}

function goToLevel(modId, idx){
  state.currentModule=modId;
  state.currentLevelIdx=idx;
  const mod=MODULES[modId];
  const level=mod.levels[idx];
  state.view = level.type; // 'sort' | 'match' | 'mc'
  state._levelRuntime = null;
  render();
  startModuleTimer(modId);
}

function levelNav(mod, level, idx){
  const nav=el('div','levelrow');
  mod.levels.forEach((l,i)=>{
    const done = !!state.progress[levelKey(mod.id,l.id)];
    const cls='levelchip'+(done?' done':'')+(i===idx?' active':'');
    const chip=el('button',cls, (i+1)+' · '+l.title);
    if(i!==idx){ chip.onclick=()=>{ goToLevel(mod.id, i); }; }
    else { chip.disabled=true; }
    nav.appendChild(chip);
  });
  return nav;
}

const OPTION_LETTERS = ['A','B','C','D','E','F'];

function questionCounter(current, total){
  const box=el('div','qcounter');
  const label=el('span','qcounter-label','PREGUNTA '+current+' / '+total);
  box.appendChild(label);
  return box;
}

function buildOptionBtn(optText, i){
  const btn=el('button','opt');
  btn.innerHTML = '<span class="optletter">'+(OPTION_LETTERS[i]||(i+1))+'</span><span class="opttext">'+esc(optText)+'</span>';
  return btn;
}

function timerBadge(modId){
  const t = ensureTimer(modId);
  const badge = el('div','timerbadge'+(t.status==='completed'?' done':''));
  badge.id='liveTimerBadge';
  badge.textContent = (t.status==='completed'?'✓ ':'⏱ ') + formatHMS(currentElapsed(modId)) + (t.status==='completed'?' (tiempo final)':'');
  return badge;
}

function levelHeaderRow(mod, level, idx){
  const row = el('div','levelheader');
  const left = el('div','lhtitle');
  left.appendChild(el('div','eyebrow','<span class="num">0'+(idx+1)+'</span> '+mod.title.toUpperCase()));
  left.appendChild(el('h2','', level.title));
  row.appendChild(left);
  row.appendChild(timerBadge(mod.id));
  return row;
}

function practiceBanner(modId){
  const t = ensureTimer(modId);
  if(t.status!=='completed') return el('div','');
  const box = el('div','practicebanner','🔓 Ya completaste esta actividad — practica los niveles que quieras, las veces que quieras. El tiempo ya no se contabiliza.');
  return box;
}

/* ============================================================
   VISTA: NIVEL DE ORDENAMIENTO (SORT)
   ============================================================ */
function viewSort(){
  const mod=MODULES[state.currentModule];
  const level=mod.levels[state.currentLevelIdx];
  const wrap=el('div');
  wrap.appendChild(backButton('Volver al panel', ()=>{ state.view='menu'; render(); }));

  const card=el('div','card');
  card.appendChild(levelHeaderRow(mod, level, state.currentLevelIdx));
  card.appendChild(practiceBanner(mod.id));
  card.appendChild(levelNav(mod, level, state.currentLevelIdx));
  card.appendChild(el('p','', level.instructions));

  if(!state._levelRuntime){
    state._levelRuntime = { remaining: shuffle(level.items), placed:{}, correct:0, wrong:0, selectedChip:null };
    level.buckets.forEach(b=> state._levelRuntime.placed[b.key]=[]);
  }
  const rt = state._levelRuntime;

  const sortwrap=el('div','sortwrap');
  const bank=el('div','bank');
  if(rt.remaining.length===0){ bank.appendChild(el('div','',''));  }
  rt.remaining.forEach((item, idx)=>{
    const chip=el('div','chip', esc(item.term));
    chip.dataset.idx=idx;
    attachChipInteractions(chip, item, level, rt, mod);
    bank.appendChild(chip);
  });
  sortwrap.appendChild(bank);

  const bucketsWrap=el('div','buckets');
  level.buckets.forEach(b=>{
    const bucketEl=el('div','bucket');
    bucketEl.dataset.cat=b.key;
    bucketEl.appendChild(el('span','blabel', b.label));
    const placedWrap=el('div','placed');
    (rt.placed[b.key]||[]).forEach(term=>{
      placedWrap.appendChild(el('div','chip', esc(term)));
    });
    bucketEl.appendChild(placedWrap);
    bucketEl.appendChild(el('div','scanflash'));
    attachBucketDropTarget(bucketEl, b, level, rt, mod);
    bucketsWrap.appendChild(bucketEl);
  });
  sortwrap.appendChild(bucketsWrap);

  card.appendChild(sortwrap);

  const status=el('p','');
  status.style.marginTop='14px';
  status.innerHTML = '<span class="tag-good">'+rt.correct+' correctas</span>' + (rt.wrong? '  ·  <span class="tag-bad">'+rt.wrong+' errores</span>':'');
  card.appendChild(status);

  wrap.appendChild(card);
  return wrap;
}

function attachChipInteractions(chip, item, level, rt, mod){
  // click-to-select fallback
  chip.addEventListener('click', (e)=>{
    if(chip._dragged) { chip._dragged=false; return; }
    document.querySelectorAll('.chip.selected').forEach(c=>c.classList.remove('selected'));
    rt.selectedChip = item;
    chip.classList.add('selected');
  });

  // pointer-based drag
  let startX=0, startY=0, origRect=null;
  chip.addEventListener('pointerdown', (e)=>{
    chip.setPointerCapture(e.pointerId);
    startX=e.clientX; startY=e.clientY;
    origRect=chip.getBoundingClientRect();
    chip._dragged=false;
  });
  chip.addEventListener('pointermove', (e)=>{
    if(origRect===null) return;
    const dx=e.clientX-startX, dy=e.clientY-startY;
    if(!chip._dragging && (Math.abs(dx)>6 || Math.abs(dy)>6)){
      chip._dragging=true;
      chip._dragged=true;
      chip.classList.add('dragging');
      chip.style.width=origRect.width+'px';
    }
    if(chip._dragging){
      chip.style.left=(origRect.left+dx)+'px';
      chip.style.top=(origRect.top+dy)+'px';
      document.querySelectorAll('.bucket').forEach(b=>{
        const r=b.getBoundingClientRect();
        const over = e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom;
        b.classList.toggle('hover', over);
      });
    }
  });
  chip.addEventListener('pointerup', (e)=>{
    if(chip._dragging){
      chip.classList.remove('dragging');
      chip.style.left=''; chip.style.top=''; chip.style.width='';
      let target=null;
      document.querySelectorAll('.bucket').forEach(b=>{
        if(b.classList.contains('hover')) target=b;
        b.classList.remove('hover');
      });
      if(target){ handleDrop(item, target.dataset.cat, level, rt, mod); }
    }
    chip._dragging=false; origRect=null;
  });
}

function attachBucketDropTarget(bucketEl, bucketDef, level, rt, mod){
  bucketEl.addEventListener('click', ()=>{
    if(rt.selectedChip){
      handleDrop(rt.selectedChip, bucketDef.key, level, rt, mod);
      rt.selectedChip=null;
    }
  });
}

function handleDrop(item, targetCat, level, rt, mod){
  const isCorrect = item.cat===targetCat;
  const idx = rt.remaining.indexOf(item);
  if(idx===-1) return;
  if(isCorrect){
    rt.remaining.splice(idx,1);
    rt.placed[targetCat].push(item.term);
    rt.correct++;
    flashScan(targetCat);
  } else {
    rt.wrong++;
    flashShake(targetCat);
  }
  render();
  if(isCorrect && rt.remaining.length===0){
    setTimeout(()=> finishLevel(mod.id, level.id, rt.correct, level.items.length), 450);
  }
}

function flashScan(cat){
  requestAnimationFrame(()=>{
    const b=document.querySelector('.bucket[data-cat="'+cssEsc(cat)+'"] .scanflash');
    if(b){ b.classList.remove('play'); void b.offsetWidth; b.classList.add('play'); }
  });
}
function flashShake(cat){
  requestAnimationFrame(()=>{
    const b=document.querySelector('.bucket[data-cat="'+cssEsc(cat)+'"]');
    if(b){ b.classList.remove('shake'); void b.offsetWidth; b.classList.add('shake'); }
  });
}
function cssEsc(s){ return String(s).replace(/"/g,'\\"'); }

/* ============================================================
   VISTA: NIVEL DE EMPAREJAR (MATCH)
   ============================================================ */
function viewMatch(){
  const mod=MODULES[state.currentModule];
  const level=mod.levels[state.currentLevelIdx];
  const wrap=el('div');
  wrap.appendChild(backButton('Volver al panel', ()=>{ state.view='menu'; render(); }));

  const card=el('div','card');
  card.appendChild(levelHeaderRow(mod, level, state.currentLevelIdx));
  card.appendChild(practiceBanner(mod.id));
  card.appendChild(levelNav(mod, level, state.currentLevelIdx));
  card.appendChild(el('p','', level.instructions));

  if(!state._levelRuntime){
    const terms = level.pairs.map((p,i)=>({text:p[0], pairId:i}));
    const defs = level.pairs.map((p,i)=>({text:p[1], pairId:i}));
    state._levelRuntime = {
      terms: shuffle(terms), defs: shuffle(defs),
      matched:new Set(), selectedTerm:null, selectedDef:null, wrong:0
    };
  }
  const rt = state._levelRuntime;

  const grid=el('div','matchgrid');
  const colA=el('div','matchcol');
  rt.terms.forEach(t=>{
    const isMatched = rt.matched.has(t.pairId);
    const btn=el('button','mitem term'+(isMatched?' matched':'')+(rt.selectedTerm===t?' selected':''), esc(t.text));
    btn.disabled=isMatched;
    btn.onclick=()=>{ rt.selectedTerm=t; afterMatchInteraction(rt, level, mod); };
    colA.appendChild(btn);
  });
  const colB=el('div','matchcol');
  rt.defs.forEach(d=>{
    const isMatched = rt.matched.has(d.pairId);
    const btn=el('button','mitem'+(isMatched?' matched':'')+(rt.selectedDef===d?' selected':''), esc(d.text));
    btn.disabled=isMatched;
    btn.onclick=()=>{ rt.selectedDef=d; afterMatchInteraction(rt, level, mod); };
    colB.appendChild(btn);
  });
  grid.appendChild(colA); grid.appendChild(colB);
  card.appendChild(grid);

  const status=el('p','');
  status.style.marginTop='14px';
  status.innerHTML = '<span class="tag-good">'+rt.matched.size+' / '+level.pairs.length+' emparejados</span>'+(rt.wrong? '  ·  <span class="tag-bad">'+rt.wrong+' errores</span>':'');
  card.appendChild(status);

  wrap.appendChild(card);
  return wrap;
}

function tryMatch(rt, level){
  if(rt.selectedTerm && rt.selectedDef){
    if(rt.selectedTerm.pairId===rt.selectedDef.pairId){
      rt.matched.add(rt.selectedTerm.pairId);
    } else {
      rt.wrong++;
    }
    rt.selectedTerm=null; rt.selectedDef=null;
  }
}

function afterMatchInteraction(rt, level, mod){
  tryMatch(rt, level);
  render();
  if(rt.matched.size===level.pairs.length){
    const total = level.pairs.length + rt.wrong;
    setTimeout(()=> finishLevel(mod.id, level.id, level.pairs.length, total), 450);
  }
}

/* ============================================================
   VISTA: NIVEL DE OPCIÓN MÚLTIPLE (MC)
   ============================================================ */
function viewMC(){
  const mod=MODULES[state.currentModule];
  const level=mod.levels[state.currentLevelIdx];
  const wrap=el('div');
  wrap.appendChild(backButton('Volver al panel', ()=>{ state.view='menu'; render(); }));

  const card=el('div','card');
  card.appendChild(levelHeaderRow(mod, level, state.currentLevelIdx));
  card.appendChild(practiceBanner(mod.id));
  card.appendChild(levelNav(mod, level, state.currentLevelIdx));

  if(!state._levelRuntime){
    state._levelRuntime = { qIdx:0, correct:0, answered:false, selected:null };
  }
  const rt = state._levelRuntime;
  const q = level.questions[rt.qIdx];

  card.appendChild(questionCounter(rt.qIdx+1, level.questions.length));
  card.appendChild(el('div','qprompt', esc(q.q)));

  const optsWrap=el('div','opts');
  q.opts.forEach((optText, i)=>{
    const btn=buildOptionBtn(optText, i);
    if(rt.answered){
      btn.disabled=true;
      if(i===q.correct) btn.classList.add('correct');
      else if(i===rt.selected) btn.classList.add('wrong');
    }
    btn.onclick=()=>{
      if(rt.answered) return;
      rt.answered=true; rt.selected=i;
      if(i===q.correct) rt.correct++;
      render();
    };
    optsWrap.appendChild(btn);
  });
  card.appendChild(optsWrap);

  if(rt.answered){
    const isCorrect = rt.selected===q.correct;
    const box=el('div','explainbox');
    box.innerHTML = '<span class="'+(isCorrect?'tag-good':'tag-bad')+'">'+(isCorrect?'✓ CORRECTO':'✕ REVISA ESTO')+'</span><br><br>'+esc(q.explain);
    card.appendChild(box);

    const nextBtn=el('button','btn btn-primary btn-block', rt.qIdx+1<level.questions.length? 'Siguiente pregunta →' : 'Terminar nivel');
    nextBtn.style.marginTop='16px';
    nextBtn.onclick=()=>{
      if(rt.qIdx+1<level.questions.length){
        rt.qIdx++; rt.answered=false; rt.selected=null; render();
      } else {
        finishLevel(mod.id, level.id, rt.correct, level.questions.length);
      }
    };
    card.appendChild(nextBtn);
  }

  wrap.appendChild(card);
  return wrap;
}

function finishLevel(modId, levelId, correct, total){
  const key=levelKey(modId, levelId);
  state.progress[key] = { correct, total };
  state._levelRuntime=null;
  state.view='levelDone';
  render();
  const mod = MODULES[modId];
  const allDone = mod.levels.every(l=> !!state.progress[levelKey(modId, l.id)]);
  if(allDone){ completeModuleTimer(modId); }
  saveProfile();
  autoSaveResult();
}

/* ============================================================
   VISTA: NIVEL COMPLETADO
   ============================================================ */
function starsFor(score){
  return score>=90?3:score>=70?2:score>=1?1:0;
}
function starRow(count){
  const row=el('div','starrow');
  for(let i=0;i<3;i++){
    row.appendChild(el('span','star'+(i<count?' on':''), '★'));
  }
  return row;
}

function viewLevelDone(){
  const mod=MODULES[state.currentModule];
  const idx=state.currentLevelIdx;
  const level=mod.levels[idx];
  const p=state.progress[levelKey(mod.id, level.id)];
  const score=pct(p.correct,p.total);

  const wrap=el('div');
  const card=el('div','card');
  card.appendChild(el('div','eyebrow','NIVEL COMPLETADO'));
  card.appendChild(el('h1','', level.title));
  card.appendChild(starRow(starsFor(score)));
  card.appendChild(el('p','lede', 'Módulo: '+mod.title));
  card.appendChild(timerBadge(mod.id));

  const statgrid=el('div','statgrid');
  const s1=el('div','stat'); s1.innerHTML='<div class="slabel">Puntaje</div><div class="sval '+(score>=80?'good':score>=60?'warn':'bad')+'">'+score+'%</div>';
  const s2=el('div','stat'); s2.innerHTML='<div class="slabel">Aciertos</div><div class="sval">'+p.correct+' / '+p.total+'</div>';
  statgrid.appendChild(s1); statgrid.appendChild(s2);
  card.appendChild(statgrid);

  const hasNext = idx+1 < mod.levels.length;
  if(hasNext){
    const nextBtn=el('button','btn btn-primary btn-block', 'Siguiente nivel: '+mod.levels[idx+1].title+' →');
    nextBtn.onclick=()=>{ goToLevel(mod.id, idx+1); };
    card.appendChild(nextBtn);
  } else {
    const doneMsg=el('p','', '¡Completaste todos los niveles de este módulo!');
    doneMsg.style.color='var(--good)'; doneMsg.style.marginTop='16px';
    card.appendChild(doneMsg);
  }

  const menuBtn=el('button','btn btn-ghost btn-block', 'Volver al panel');
  menuBtn.style.marginTop='10px';
  menuBtn.onclick=()=>{ state.view='menu'; render(); };
  card.appendChild(menuBtn);

  wrap.appendChild(card);
  return wrap;
}

/* ============================================================
   BOSS BATTLE
   ============================================================ */
function buildBossPool(moduleIds){
  const ids = moduleIds || Object.keys(MODULES);
  const pool=[];
  ids.forEach(mid=>{
    const mod = MODULES[mid];
    if(!mod) return;
    mod.levels.forEach(level=>{
      if(level.type==='mc'){
        level.questions.forEach(q=>pool.push({ q:q.q, opts:q.opts, correct:q.correct, explain:q.explain }));
      }
    });
  });
  return shuffle(pool);
}

function startBoss(){
  const cat = CATEGORIES[state.currentCategory];
  const pool=buildBossPool(cat ? cat.moduleIds : null);
  state.bossPool = pool.slice(0, Math.min(10,pool.length));
  state.bossIdx=0; state.bossScore=0;
  state.bossAnswered=false; state.bossSelected=null;
  state.view='boss';
  render();
  startBossTimer();
}

function startBossTimer(){
  clearInterval(state.bossTimer);
  state.bossTimeLeft = 15000;
  const totalTime=15000;
  const startTs=Date.now();
  state.bossTimer = setInterval(()=>{
    const elapsed = Date.now()-startTs;
    state.bossTimeLeft = Math.max(0, totalTime-elapsed);
    const bar=document.getElementById('bossTimerFill');
    if(bar) bar.style.width=(state.bossTimeLeft/totalTime*100)+'%';
    if(state.bossTimeLeft<=0){
      clearInterval(state.bossTimer);
      if(!state.bossAnswered){ state.bossAnswered=true; state.bossSelected=-1; render(); }
    }
  }, 100);
}

function viewBoss(){
  const wrap=el('div');
  wrap.appendChild(backButton('Salir del Boss Battle', ()=>{ clearInterval(state.bossTimer); state.view='menu'; render(); }));

  const card=el('div','card');
  card.appendChild(el('div','eyebrow','🏆 BOSS BATTLE'));

  const bosshead=el('div','bosshead');
  bosshead.innerHTML = '<span class="bossscore">PREGUNTA '+(state.bossIdx+1)+' / '+state.bossPool.length+'</span><span class="bossscore">PUNTAJE <b>'+state.bossScore+'</b></span>';
  card.appendChild(bosshead);

  const timerbar=el('div','timerbar');
  timerbar.appendChild(el('i','',''));
  timerbar.querySelector('i').id='bossTimerFill';
  timerbar.querySelector('i').style.width='100%';
  card.appendChild(timerbar);

  const q=state.bossPool[state.bossIdx];
  card.appendChild(el('div','qprompt', esc(q.q)));

  const optsWrap=el('div','opts');
  q.opts.forEach((optText,i)=>{
    const btn=buildOptionBtn(optText, i);
    if(state.bossAnswered){
      btn.disabled=true;
      if(i===q.correct) btn.classList.add('correct');
      else if(i===state.bossSelected) btn.classList.add('wrong');
    }
    btn.onclick=()=>{
      if(state.bossAnswered) return;
      clearInterval(state.bossTimer);
      state.bossAnswered=true; state.bossSelected=i;
      if(i===q.correct) state.bossScore++;
      render();
    };
    optsWrap.appendChild(btn);
  });
  card.appendChild(optsWrap);

  if(state.bossAnswered){
    const box=el('div','explainbox');
    const isCorrect = state.bossSelected===q.correct;
    box.innerHTML = '<span class="'+(isCorrect?'tag-good':'tag-bad')+'">'+(isCorrect?'✓ CORRECTO':(state.bossSelected===-1?'⏱ TIEMPO AGOTADO':'✕ REVISA ESTO'))+'</span><br><br>'+esc(q.explain);
    card.appendChild(box);

    const nextBtn=el('button','btn btn-primary btn-block', state.bossIdx+1<state.bossPool.length? 'Siguiente →':'Ver resultado final');
    nextBtn.style.marginTop='16px';
    nextBtn.onclick=()=>{
      if(state.bossIdx+1<state.bossPool.length){
        state.bossIdx++; state.bossAnswered=false; state.bossSelected=null;
        render(); startBossTimer();
      } else {
        state.progress['BOSS'] = { correct: state.bossScore, total: state.bossPool.length };
        state.view='bossDone'; render();
        saveProfile();
        autoSaveResult();
      }
    };
    card.appendChild(nextBtn);
  }

  wrap.appendChild(card);
  return wrap;
}

function viewBossDone(){
  const p=state.progress['BOSS'];
  const score=pct(p.correct,p.total);
  const wrap=el('div');
  const card=el('div','card');
  card.appendChild(el('div','eyebrow','RESULTADO — BOSS BATTLE'));
  card.appendChild(el('h1','','¡Reto completado!'));
  card.appendChild(starRow(starsFor(score)));
  const statgrid=el('div','statgrid');
  statgrid.innerHTML =
    '<div class="stat"><div class="slabel">Puntaje</div><div class="sval '+(score>=80?'good':score>=60?'warn':'bad')+'">'+score+'%</div></div>'+
    '<div class="stat"><div class="slabel">Correctas</div><div class="sval">'+p.correct+' / '+p.total+'</div></div>';
  card.appendChild(statgrid);
  const menuBtn=el('button','btn btn-primary btn-block','Volver al panel');
  menuBtn.onclick=()=>{ state.view='menu'; render(); };
  card.appendChild(menuBtn);
  wrap.appendChild(card);
  return wrap;
}

/* ============================================================
   INFORME
   ============================================================ */
function computeReport(){
  const rows=[];
  Object.values(MODULES).forEach(mod=>{
    mod.levels.forEach(level=>{
      const p=state.progress[levelKey(mod.id, level.id)];
      if(p) rows.push({ modTitle:mod.title, levelTitle:level.title, correct:p.correct, total:p.total, score:pct(p.correct,p.total) });
    });
  });
  const boss=state.progress['BOSS'];
  let totalCorrect=0, totalQ=0;
  rows.forEach(r=>{ totalCorrect+=r.correct; totalQ+=r.total; });
  const overall = totalQ? pct(totalCorrect,totalQ):0;
  const strengths = rows.filter(r=>r.score>=80).map(r=>r.modTitle+' — '+r.levelTitle);
  const developing = rows.filter(r=>r.score>=60 && r.score<80).map(r=>r.modTitle+' — '+r.levelTitle);
  const weak = rows.filter(r=>r.score<60).map(r=>r.modTitle+' — '+r.levelTitle);
  return { rows, boss, overall, strengths, developing, weak, totalCorrect, totalQ };
}

async function autoSaveResult(){
  try{
    if(!state.student.code) return;
    const rep = computeReport();
    if(rep.rows.length===0) return; // nada que reportar todavía
    await apiPost({
      action:'saveResult',
      name: state.student.name, code: state.student.code,
      timestamp: new Date().toISOString(),
      overall: rep.overall, totalCorrect: rep.totalCorrect, totalQ: rep.totalQ,
      rows: rep.rows, boss: rep.boss || null
    });
    state.saved = true;
  }catch(e){ console.error('No se pudo autoguardar el informe', e); }
}

function viewReport(){
  const rep = computeReport();
  const wrap=el('div');
  wrap.appendChild(backButton('Volver al panel', ()=>{ state.view='menu'; render(); }));

  const card=el('div','card');
  card.appendChild(el('div','eyebrow','INFORME INDIVIDUAL'));
  card.appendChild(el('h1','', esc(state.student.name)));
  if(rep.rows.length===0){
    card.appendChild(el('p','','Aún no has completado ningún nivel. Entrena al menos un módulo para generar tu informe.'));
    wrap.appendChild(card);
    return wrap;
  }

  card.appendChild(el('p','lede', 'Completaste '+rep.rows.length+' de '+allLevelsFlat().length+' niveles, con un desempeño general de <b style="color:var(--ink)">'+rep.overall+'%</b> ('+rep.totalCorrect+' de '+rep.totalQ+' respuestas correctas).'+(rep.boss? ' En el Boss Battle obtuviste '+pct(rep.boss.correct,rep.boss.total)+'%.':'')));

  const statgrid=el('div','statgrid');
  statgrid.innerHTML =
    '<div class="stat"><div class="slabel">General</div><div class="sval '+(rep.overall>=80?'good':rep.overall>=60?'warn':'bad')+'">'+rep.overall+'%</div></div>'+
    '<div class="stat"><div class="slabel">Fortalezas</div><div class="sval good">'+rep.strengths.length+'</div></div>'+
    '<div class="stat"><div class="slabel">A reforzar</div><div class="sval '+(rep.weak.length? 'bad':'good')+'">'+rep.weak.length+'</div></div>';
  card.appendChild(statgrid);

  if(rep.strengths.length){
    card.appendChild(el('div','section-title','Fortalezas'));
    const ul=el('ul','plain'); rep.strengths.forEach(s=>ul.appendChild(el('li','',esc(s)))); card.appendChild(ul);
  }
  if(rep.developing.length){
    card.appendChild(el('div','section-title','En desarrollo'));
    const ul=el('ul','plain'); rep.developing.forEach(s=>ul.appendChild(el('li','',esc(s)))); card.appendChild(ul);
  }
  if(rep.weak.length){
    card.appendChild(el('div','section-title','Temas prioritarios para reforzar'));
    const ul=el('ul','plain'); rep.weak.forEach(s=>ul.appendChild(el('li','',esc(s)))); card.appendChild(ul);
  } else if(rep.rows.length>0){
    card.appendChild(el('div','section-title','Recomendación'));
    card.appendChild(el('p','','Buen dominio general. Puedes repasar con el Boss Battle para mantener el nivel bajo presión de tiempo.'));
  }

  const statusBox=el('div','');
  statusBox.style.cssText='border:2.5px solid '+(state.saved?'var(--good-dark)':'var(--line-strong)')+';border-radius:14px;padding:14px 16px;margin-top:18px;background:'+(state.saved?'var(--good-soft)':'var(--panel-2)')+';font-weight:700;font-size:13.5px;color:'+(state.saved?'var(--good-dark)':'var(--ink-dim)')+';';
  statusBox.textContent = state.saved
    ? '✓ Este informe se guarda automáticamente cada vez que terminas un nivel — tu monitor ya lo puede ver.'
    : 'Sincronizando con tu monitor…';
  card.appendChild(statusBox);
  if(!state.saved){ autoSaveResult().then(()=>{ statusBox.textContent='✓ Este informe se guarda automáticamente cada vez que terminas un nivel — tu monitor ya lo puede ver.'; statusBox.style.borderColor='var(--good-dark)'; statusBox.style.background='var(--good-soft)'; statusBox.style.color='var(--good-dark)'; }); }

  const saveErr=el('p','footnote','');
  saveErr.style.color='var(--bad)';
  const syncBtn=el('button','btn btn-ghost btn-block','↻ Sincronizar de nuevo');
  syncBtn.style.marginTop='10px';
  syncBtn.onclick=async ()=>{
    syncBtn.disabled=true; syncBtn.textContent='Sincronizando…'; saveErr.textContent='';
    try{
      await autoSaveResult();
      syncBtn.textContent='✓ Sincronizado';
      setTimeout(()=>{ render(); }, 700);
    }catch(err){
      syncBtn.disabled=false; syncBtn.textContent='↻ Sincronizar de nuevo';
      saveErr.textContent = 'Detalle: ' + (err && err.message ? err.message : String(err));
    }
  };
  card.appendChild(syncBtn);
  card.appendChild(saveErr);
  card.appendChild(el('p','footnote','Este resultado se guarda de forma compartida para que tu monitor pueda verlo en el panel del grupo, junto con tu nombre y código.'));

  wrap.appendChild(card);
  return wrap;
}

function slug(s){ return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'') || 'anon'; }

/* ============================================================
   PANEL DEL MONITOR
   ============================================================ */
function mapResultsRows(results){
  const rows=[];
  (results || []).forEach(r=>{
    try{
      rows.push({
        name: r.name, code: r.code, timestamp: r.timestamp,
        overall: Number(r.overall)||0, totalCorrect: Number(r.totalCorrect)||0, totalQ: Number(r.totalQ)||0,
        rows: r.rows ? JSON.parse(r.rows) : [],
        boss: r.boss ? JSON.parse(r.boss) : null
      });
    }catch(e){
      console.error('Fila de resultados dañada, se omite:', r, e);
    }
  });
  rows.sort((a,b)=> (b.timestamp||'').localeCompare(a.timestamp||''));
  return rows;
}

function mapProfilesRows(profiles){
  const rows=[];
  (profiles || []).forEach(p=>{
    try{
      rows.push({
        name: p.name, code: p.code, updated_at: p.updated_at,
        progress: p.progress ? JSON.parse(p.progress) : {},
        timers: p.timers ? JSON.parse(p.timers) : {}
      });
    }catch(e){
      console.error('Fila de perfil dañada, se omite:', p, e);
    }
  });
  return rows;
}

// Estadísticas de UN estudiante en UN módulo, combinando progreso + cronómetro
function moduleStatsFromProfile(profileRow, modId){
  const mod = MODULES[modId];
  if(!mod || !mod.levels.length) return null;
  const progress = profileRow.progress || {};
  const timers = profileRow.timers || {};
  let done=0, sumScore=0;
  mod.levels.forEach(l=>{
    const p = progress[modId+'-'+l.id];
    if(p){ done++; sumScore += pct(p.correct,p.total); }
  });
  const total = mod.levels.length;
  const avgScore = done? Math.round(sumScore/done) : null;
  const t = timers[modId] || {status:'not_started', elapsedSec:0};
  return { done, total, avgScore, status:t.status||'not_started', elapsedSec:t.elapsedSec||0 };
}

function viewMonitorLogin(){
  const wrap=el('div');
  wrap.appendChild(backButton('Volver', ()=>{ state.view = homeView(); render(); }));

  const card=el('div','card');
  card.appendChild(el('div','eyebrow','ACCESO RESTRINGIDO'));
  card.appendChild(el('h1','','Panel del monitor'));
  card.appendChild(el('p','','Esta vista es solo para el monitor del curso. Ingresa la clave para continuar.'));

  const passLabel=el('label','','Clave de monitor');
  const passInput=document.createElement('input');
  passInput.type='password'; passInput.placeholder='••••••';
  card.appendChild(passLabel); card.appendChild(passInput);

  const errMsg=el('p','footnote','');
  errMsg.style.color='var(--bad)'; errMsg.style.display='none';
  card.appendChild(errMsg);

  const goBtn=el('button','btn btn-primary btn-block','Entrar al panel →');
  goBtn.onclick=async ()=>{
    const pass=passInput.value;
    if(!pass){ errMsg.textContent='Ingresa la clave.'; errMsg.style.display='block'; return; }
    errMsg.style.display='none';
    goBtn.disabled=true; goBtn.textContent='Verificando…';
    try{
      const [resData, profData] = await Promise.all([
        apiGet({action:'listResults', pass}),
        apiGet({action:'listProfiles', pass})
      ]);
      state.monitorPass = pass;
      state.monitorAuthed = true;
      state.dashboardRows = mapResultsRows(resData.results);
      state.dashboardProfiles = mapProfilesRows(profData.profiles);
      state.dashboardError = null;
      state.dashboardActivityId = null;
      state.view='dashboard';
      render();
    }catch(e){
      goBtn.disabled=false; goBtn.textContent='Entrar al panel →';
      errMsg.textContent='Clave incorrecta. Detalle: '+(e&&e.message?e.message:String(e));
      errMsg.style.display='block';
    }
  };
  passInput.addEventListener('keydown', (e)=>{ if(e.key==='Enter'){ e.preventDefault(); goBtn.click(); } });
  card.appendChild(el('div','', '')).appendChild(goBtn);

  wrap.appendChild(card);
  return wrap;
}

async function loadDashboard(){
  try{
    const [resData, profData] = await Promise.all([
      apiGet({action:'listResults', pass: state.monitorPass}),
      apiGet({action:'listProfiles', pass: state.monitorPass})
    ]);
    state.dashboardRows = mapResultsRows(resData.results);
    state.dashboardProfiles = mapProfilesRows(profData.profiles);
    state.dashboardError = null;
  }catch(err){
    state.dashboardRows = [];
    state.dashboardProfiles = [];
    state.dashboardError = err && err.message ? err.message : String(err);
    console.error('Dashboard load error', err);
  }
  render();
}

const STATUS_LABEL = { not_started:'No iniciada', in_progress:'En progreso', completed:'Completada' };

function viewDashboard(){
  const wrap=el('div');
  wrap.appendChild(backButton('Salir del panel del monitor', ()=>{
    state.monitorAuthed=false;
    state.monitorPass='';
    state.dashboardRows=null;
    state.dashboardProfiles=null;
    state.view = homeView();
    render();
  }));

  const card=el('div','card');
  card.appendChild(el('div','eyebrow','PANEL DEL MONITOR'));
  card.appendChild(el('h1','','Resultados del grupo'));
  card.appendChild(el('p','','Vista general de todos los estudiantes, y el detalle de cada actividad con puntaje y tiempo invertido.'));

  if(state.dashboardRows===null || state.dashboardProfiles===null){
    card.appendChild(el('p','','Cargando…'));
    wrap.appendChild(card);
    loadDashboard();
    return wrap;
  }

  const rows=state.dashboardRows;
  const profiles=state.dashboardProfiles;
  const refreshBtn=el('button','btn btn-ghost','↻ Actualizar');
  refreshBtn.onclick=()=>{ state.dashboardRows=null; state.dashboardProfiles=null; render(); };
  card.appendChild(refreshBtn);

  if(rows.length===0 && profiles.length===0){
    if(state.dashboardError){
      const errBox=el('p','footnote', 'No se pudieron cargar los datos. Detalle: '+esc(state.dashboardError));
      errBox.style.color='var(--bad)';
      card.appendChild(errBox);
    } else {
      card.appendChild(el('p','','Todavía no hay actividad registrada.'));
    }
    wrap.appendChild(card);
    return wrap;
  }

  // ---- Botones por actividad (con puntaje + tiempo por estudiante al entrar) ----
  card.appendChild(el('div','section-title','Actividades'));
  const grid=el('div','modgrid');
  Object.values(CATEGORIES).forEach(cat=>{
    cat.moduleIds.forEach((mid,idx)=>{
      const mod=MODULES[mid];
      if(!mod || !mod.levels.length) return; // aún sin contenido, se omite del panel
      const num=String(idx+1).padStart(2,'0');
      let touched=0, sumScore=0, scoredCount=0, sumTime=0;
      profiles.forEach(p=>{
        const st = moduleStatsFromProfile(p, mid);
        if(!st || st.status==='not_started') return;
        touched++;
        sumTime += st.elapsedSec;
        if(st.avgScore!==null){ sumScore+=st.avgScore; scoredCount++; }
      });
      const avg = scoredCount? Math.round(sumScore/scoredCount) : null;
      const avgTime = touched? sumTime/touched : 0;

      const actBtn=el('button','modcard');
      actBtn.innerHTML =
        '<div class="mhead"><span class="modnum">'+num+'</span><span class="mtitle">'+esc(mod.title)+'</span></div>'+
        '<div class="msub">'+touched+' estudiante'+(touched===1?'':'s')+' con actividad'+(avg!==null? ' · promedio '+avg+'%':'')+'</div>'+
        (touched? '<div class="modtime">⏱ prom. '+formatHMS(avgTime)+'</div>' : '<span class="soontag">Sin datos aún</span>');
      actBtn.onclick=()=>{ state.dashboardActivityId=mid; state.view='dashboardActivity'; render(); };
      grid.appendChild(actBtn);
    });
  });
  card.appendChild(grid);

  // ---- Resumen general por estudiante ----
  card.appendChild(el('div','section-title','Resumen general ('+rows.length+' informes enviados)'));
  if(rows.length===0){
    card.appendChild(el('p','','Ningún estudiante ha enviado su informe todavía (se envía automáticamente al completar un nivel).'));
  } else {
    const table=document.createElement('table');
    table.innerHTML = '<thead><tr><th>Nombre</th><th>Código</th><th class="mono">General</th><th class="mono">Fecha</th></tr></thead>';
    const tbody=document.createElement('tbody');
    rows.forEach(r=>{
      const tr=document.createElement('tr');
      const color = r.overall>=80?'var(--good-soft)': r.overall>=60?'var(--amber-soft)':'var(--bad-soft)';
      const fg = r.overall>=80?'var(--good)': r.overall>=60?'var(--amber)':'var(--bad)';
      const date = r.timestamp? new Date(r.timestamp).toLocaleString('es-CO',{dateStyle:'short',timeStyle:'short'}) : '—';
      tr.innerHTML = '<td>'+esc(r.name||'—')+'</td><td class="mono">'+esc(r.code||'—')+'</td>'+
        '<td class="mono"><span class="pillscore" style="background:'+color+';color:'+fg+'">'+r.overall+'%</span></td>'+
        '<td class="mono">'+date+'</td>';
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    card.appendChild(table);
  }

  card.appendChild(el('p','footnote','Cada estudiante inicia sesión con su código estudiantil, así que cada fila corresponde a una persona (no hay riesgo de duplicados por nombres repetidos).'));

  wrap.appendChild(card);
  return wrap;
}

function viewDashboardActivity(){
  const mod = MODULES[state.dashboardActivityId];
  const wrap=el('div');
  wrap.appendChild(backButton('Volver al panel del monitor', ()=>{ state.view='dashboard'; render(); }));

  const card=el('div','card');
  card.appendChild(el('div','eyebrow','DETALLE DE ACTIVIDAD'));
  card.appendChild(el('h1','', mod? esc(mod.title) : 'Actividad'));

  const profiles = state.dashboardProfiles || [];
  const students=[];
  profiles.forEach(p=>{
    const st = moduleStatsFromProfile(p, state.dashboardActivityId);
    if(st && st.status!=='not_started'){ students.push({name:p.name, code:p.code, ...st}); }
  });

  if(students.length===0){
    card.appendChild(el('p','','Todavía ningún estudiante ha comenzado esta actividad.'));
    wrap.appendChild(card);
    return wrap;
  }

  students.sort((a,b)=> b.elapsedSec - a.elapsedSec);

  const total = students.length;
  const completed = students.filter(s=>s.status==='completed').length;
  const avgTime = students.reduce((a,s)=>a+s.elapsedSec,0)/total;
  const scored = students.filter(s=>s.avgScore!==null);
  const avgScore = scored.length? Math.round(scored.reduce((a,s)=>a+s.avgScore,0)/scored.length) : null;

  const statgrid=el('div','statgrid');
  statgrid.innerHTML =
    '<div class="stat"><div class="slabel">Estudiantes</div><div class="sval">'+total+'</div></div>'+
    '<div class="stat"><div class="slabel">Completaron</div><div class="sval '+(completed===total?'good':'warn')+'">'+completed+' / '+total+'</div></div>'+
    '<div class="stat"><div class="slabel">Tiempo prom.</div><div class="sval">'+formatHMS(avgTime)+'</div></div>';
  card.appendChild(statgrid);
  if(avgScore!==null){
    card.appendChild(el('p','footnote','Puntaje promedio del grupo en esta actividad: <b style="color:var(--ink)">'+avgScore+'%</b>'));
  }

  card.appendChild(el('div','section-title','Por estudiante (ordenado por tiempo, de mayor a menor)'));
  const table=document.createElement('table');
  table.innerHTML = '<thead><tr><th>Nombre</th><th>Código</th><th>Estado</th><th class="mono">Puntaje</th><th class="mono">Tiempo</th></tr></thead>';
  const tbody=document.createElement('tbody');
  students.forEach(s=>{
    const tr=document.createElement('tr');
    const statusColor = s.status==='completed'?'var(--good-dark)': 'var(--gold-dark)';
    const scoreTxt = s.avgScore!==null ? s.avgScore+'% ('+s.done+'/'+s.total+')' : (s.done+'/'+s.total+' niveles');
    tr.innerHTML =
      '<td>'+esc(s.name||'—')+'</td>'+
      '<td class="mono">'+esc(s.code||'—')+'</td>'+
      '<td><span style="color:'+statusColor+';font-weight:800;">'+STATUS_LABEL[s.status]+'</span></td>'+
      '<td class="mono">'+esc(scoreTxt)+'</td>'+
      '<td class="mono">'+formatHMS(s.elapsedSec)+'</td>';
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  card.appendChild(table);

  wrap.appendChild(card);
  return wrap;
}

/* ============================================================
   INIT
   ============================================================ */
render();

})();
