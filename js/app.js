(function(){

/* ============================================================
   CONTENIDO — verificado contra Pró, Anatomía Clínica (Panamericana)
   ============================================================ */

// Plantilla reutilizable de sub-actividades para módulos aún sin contenido.
// Cada módulo nuevo obtiene su propia copia (no se comparte por referencia).
function SUB_ACTIVITY_TEMPLATE(){
  return [
    { id:'mc', title:'Preguntas de selección múltiple', icon:'📝', ready:false },
    { id:'completar', title:'Preguntas de completar', icon:'✍️', ready:false },
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
  F: { id:'F', title:'Huesos de la cintura escapular y miembro superior', subtitle:'Selecciona el tipo de actividad', placeholder:true, levels:[], subActivities:SUB_ACTIVITY_TEMPLATE() },
  G: { id:'G', title:'Huesos de la pelvis y del miembro inferior', subtitle:'Selecciona el tipo de actividad', placeholder:true, levels:[], subActivities:SUB_ACTIVITY_TEMPLATE() },
  H: { id:'H', title:'Histología, fisiología y envejecimiento del tejido óseo', subtitle:'Selecciona una actividad', placeholder:true, levels:[], subActivities:[], groupedActivities:true },
  I: { id:'I', title:'Articulaciones: generalidades y clasificación', subtitle:'Selecciona una actividad', placeholder:true, levels:[], subActivities:[], groupedActivities:true }
};

// Actividad "señalar estructuras": imágenes con flechas ya dibujadas por el
// profesor; el estudiante toca cada marcador y escribe el nombre. Se arma a
// mano (no viene de Sheets) porque cada punto necesita su coordenada exacta
// sobre la imagen, algo poco práctico de mantener en una hoja de cálculo.
MODULES.G.levels.push({
  id:'img', type:'imgLabel', title:'Actividades con imágenes anatómicas',
  instructions:'Toca cada marcador y escribe el nombre de la estructura que señala la flecha. No importan las mayúsculas ni las tildes.',
  images:[
    { file:'assets/img/oseo/miembro-inferior/coxal-1.png', label:'Coxal · vista 1', points:[
      {n:1, x:78.11, y:14.85, answers:['Cresta ilíaca','Zona intermedia','Línea intermedia']},
      {n:2, x:94.45, y:28.19, answers:['Espina ilíaca anterior superior','Espina ilíaca anterosuperior']},
      {n:3, x:84.89, y:45.61, answers:['Espina ilíaca anterior inferior','Espina ilíaca anteroinferior']},
      {n:4, x:85,    y:57.05, answers:['Cara semilunar']},
      {n:5, x:82,    y:66.31, answers:['Fosa acetabular']},
      {n:6, x:81.78, y:72.94, answers:['Escotadura acetabular']},
      {n:7, x:85,    y:85.72, answers:['Foramen obturado']},
      {n:8, x:20.56, y:85.53, answers:['Tuberosidad isquiática','Tuberosidad ciática']},
      {n:9, x:20.89, y:76.46, answers:['Escotadura ciática menor','Escotadura isquiática menor']},
      {n:10, x:15.11, y:71.37, answers:['Espina ciática','Espina isquiática']},
      {n:11, x:25.45, y:61.92, answers:['Limbo acetabular']},
      {n:12, x:17,    y:56.13, answers:['Escotadura ciática mayor','Escotadura isquiática mayor']},
      {n:13, x:12.11, y:51.04, answers:['Espina ilíaca posterior inferior','Espina ilíaca posteroinferior']},
      {n:14, x:5.22,  y:42.61, answers:['Espina ilíaca posterior superior','Espina ilíaca posterosuperior']},
      {n:15, x:23.11, y:19.88, answers:['Línea glútea anterior']}
    ]},
    { file:'assets/img/oseo/miembro-inferior/coxal-2.png', label:'Coxal · vista 2', points:[
      {n:1, x:21,    y:16.06, answers:['Fosa ilíaca']},
      {n:2, x:16.45, y:56.95, answers:['Línea arqueada']},
      {n:3, x:21.11, y:69.45, answers:['Pecten del pubis']}
    ]},
    { file:'assets/img/oseo/miembro-inferior/coxal-3.png', label:'Coxal · vista 3', points:[
      {n:1, x:89.56, y:20.86, answers:['Tuberosidad del ilion','Tuberosidad ilíaca']},
      {n:2, x:88.67, y:46.88, answers:['Cara auricular','Carilla auricular']},
      {n:3, x:81.22, y:66.46, answers:['Espina ciática','Espina isquiática']},
      {n:4, x:12.11, y:79.79, answers:['Tubérculo del pubis']}
    ]},
    { file:'assets/img/oseo/miembro-inferior/femur-1.png', label:'Fémur · vista 1', points:[
      {n:1, x:59.45, y:8,     answers:['Cabeza del fémur','Cabeza femoral']},
      {n:2, x:60.89, y:16.15, answers:['Cuello del fémur','Cuello femoral']},
      {n:3, x:55.56, y:24.76, answers:['Trocánter menor']},
      {n:4, x:25.67, y:15.32, answers:['Trocánter mayor']},
      {n:5, x:30.33, y:23.83, answers:['Línea intertrocantérica']},
      {n:6, x:66.78, y:92.2,  answers:['Superficie articular','Cara rotuliana']}
    ]},
    { file:'assets/img/oseo/miembro-inferior/femur-2.png', label:'Fémur · vista 2', points:[
      {n:1, x:67.67, y:10.5,  answers:['Fosa trocantérica']},
      {n:2, x:78.22, y:18.46, answers:['Cresta intertrocantérica']},
      {n:3, x:67.45, y:29.87, answers:['Tuberosidad glútea']},
      {n:4, x:64.22, y:44.66, answers:['Línea áspera']},
      {n:5, x:60,    y:72.23, answers:['Línea supracondílea lateral']},
      {n:6, x:57.56, y:88.81, answers:['Cóndilo lateral']},
      {n:7, x:56.45, y:93.09, answers:['Fosa intercondílea']},
      {n:8, x:26.45, y:90.59, answers:['Cóndilo medial']},
      {n:9, x:22,    y:75.03, answers:['Cara poplítea']},
      {n:10, x:32.56, y:68.27, answers:['Línea supracondílea medial']},
      {n:11, x:44.78, y:32.53, answers:['Línea espiral','Línea pectínea']}
    ]},
    { file:'assets/img/oseo/miembro-inferior/tibia-perone-1.png', label:'Tibia y peroné · vista 1', points:[
      {n:1, x:34.33, y:8.28,  answers:['Cóndilo lateral']},
      {n:2, x:71,    y:9.67,  answers:['Cóndilo medial']},
      {n:3, x:73,    y:20.99, answers:['Tuberosidad tibial','Tuberosidad de la tibia']},
      {n:4, x:65.78, y:44.55, answers:['Borde anterior','Borde anterior de la tibia']},
      {n:5, x:73.67, y:89.18, answers:['Maléolo medial']},
      {n:6, x:32.33, y:92.51, answers:['Maléolo lateral']},
      {n:7, x:26.78, y:49.31, answers:['Cuerpo del peroné','Cuerpo de la fíbula']},
      {n:8, x:26.45, y:16.24, answers:['Cabeza del peroné']}
    ]},
    { file:'assets/img/oseo/miembro-inferior/tibia-perone-2.png', label:'Tibia y peroné · vista 2', points:[
      {n:1, x:35.11, y:9.48,  answers:['Tubérculo intercondíleo medial']},
      {n:2, x:67.11, y:10.13, answers:['Tubérculo intercondíleo lateral']},
      {n:3, x:36.45, y:31.43, answers:['Línea para el músculo sóleo','Línea del sóleo','Línea del músculo sóleo']}
    ]},
    { file:'assets/img/oseo/miembro-inferior/pie-1.png', label:'Pie', points:[
      {n:1, x:24.22, y:16.43, answers:['Falange proximal del hallux','Primera falange proximal','Falange proximal del primer dedo del pie']},
      {n:2, x:38.22, y:3.74,  answers:['Falange medial del segundo dedo del pie']},
      {n:3, x:66.89, y:10.13, answers:['Falange distal del cuarto dedo del pie']},
      {n:4, x:71.67, y:37.18, answers:['Quinto metatarsiano del pie','5 metatarsiano del pie']},
      {n:5, x:72.78, y:48.11, answers:['Cuneiforme lateral']},
      {n:6, x:75,    y:57.09, answers:['Tubérculo del quinto metatarsiano del pie']},
      {n:7, x:66.67, y:64.58, answers:['Cuboides']},
      {n:8, x:73.11, y:78.47, answers:['Calcáneo']},
      {n:9, x:32.22, y:76.53, answers:['Astrágalo','Cuello del astrágalo','Cuello astragalino']},
      {n:10, x:25.33, y:65.14, answers:['Navicular','Escafoides tarsiano']},
      {n:11, x:27.67, y:57.73, answers:['Cuneiforme intermedio']},
      {n:12, x:26.78, y:50.69, answers:['Cuneiforme medial']},
      {n:13, x:22.56, y:37.34, answers:['Primer metatarsiano del pie']}
    ]}
  ]
});
MODULES.G.subActivities.find(s=>s.id==='img').ready = true;
MODULES.G.subActivities = MODULES.G.subActivities.filter(s=> s.id !== 'cases');

// Módulo H — histología, formación y consolidación ósea. Contenido entregado
// por el profesor (banco de actividades). Se arma a mano, como el módulo G,
// porque incluye tipos de actividad (varias respuestas correctas, ordenar
// en secuencia) que todavía no vienen del flujo de Google Sheets.
// A diferencia de C-G, las actividades de H se agrupan bajo botones por
// bloque temático (mod.groupedActivities + level.group) — dentro de cada
// botón se navega con chips numerados + "Siguiente actividad", como los
// módulos A/B, pero el alcance de los chips se limita a las actividades
// que comparten `group` (histología/fisiología) y `kind` (diversa/quiz)
// con el sub-botón elegido. Estructura de 2 niveles: los 2 botones de
// arriba (Histología/Fisiología) tienen `children` — al tocarlos se
// muestran sus 2 sub-botones (Actividades varias / Selección múltiple)
// en vez de entrar directo a un nivel (ver `state._subMenuParent`).
MODULES.H.subActivities = [
  { id:'h-histologia', title:'Histología, formación, consolidación y fracturas', icon:'🦴', ready:true, group:'histologia',
    children:[
      { id:'h-histologia-diversas', title:'Actividades varias', icon:'🧩', ready:true, group:'histologia', kind:'diverse' },
      { id:'h-histologia-quiz', title:'Preguntas de selección múltiple', icon:'✅', ready:true, group:'histologia', kind:'quiz' }
    ]
  },
  { id:'h-fisiologia', title:'Fisiología ósea', icon:'⚗️', ready:true, group:'fisiologia',
    children:[
      { id:'h-fisiologia-diversas', title:'Actividades varias', icon:'🧩', ready:true, group:'fisiologia', kind:'diverse' },
      { id:'h-fisiologia-quiz', title:'Preguntas de selección múltiple', icon:'✅', ready:true, group:'fisiologia', kind:'quiz' }
    ]
  }
];

MODULES.H.levels = [
  { id:'h-act1', group:'histologia', kind:'diverse', type:'match', title:'Células óseas: célula ↔ función',
    instructions:'Toca un término y luego su definición correcta.',
    pairs:[
      ['Osteogénica','Célula madre derivada del mesénquima; única capaz de dividirse; da origen a los osteoblastos'],
      ['Osteoblasto','Secreta la matriz osteoide e inicia la calcificación del hueso nuevo'],
      ['Osteocito','Célula ósea madura que mantiene el metabolismo diario; ya no se divide'],
      ['Osteoclasto','Célula gigante multinucleada que realiza la resorción ósea']
    ]
  },
  { id:'h-act2', group:'histologia', kind:'quiz', type:'mcMulti', title:'Hueso compacto: varias respuestas correctas',
    instructions:'Selecciona TODAS las opciones correctas. Puedes obtener puntaje parcial.',
    questions:[
      { q:'Seleccione todas las características correctas del hueso compacto.',
        opts:[
          'Está organizado en osteonas (sistemas de Havers)',
          'Representa aproximadamente el 80% del esqueleto',
          'Resiste la flexión y la carga de peso',
          'Forma la capa externa de los huesos y la diáfisis de los huesos largos',
          'Está formado por trabéculas',
          'Aloja directamente la médula ósea roja en sus espacios'
        ],
        correct:[0,1,2,3]
      }
    ]
  },
  { id:'h-act4', group:'histologia', kind:'diverse', type:'sort', title:'Clasificar: hueso compacto vs. esponjoso',
    instructions:'Arrastra (o toca y luego toca la columna) cada término a donde corresponda.',
    buckets:[ {key:'compacto', label:'Hueso compacto'}, {key:'esponjoso', label:'Hueso esponjoso'} ],
    items:[
      {term:'Osteona / sistema de Havers', cat:'compacto'},
      {term:'Laminillas concéntricas', cat:'compacto'},
      {term:'~80% del esqueleto', cat:'compacto'},
      {term:'Resiste la flexión', cat:'compacto'},
      {term:'Diáfisis', cat:'compacto'},
      {term:'Trabécula', cat:'esponjoso'},
      {term:'Médula ósea roja', cat:'esponjoso'},
      {term:'~20% del esqueleto', cat:'esponjoso'},
      {term:'Hemopoyesis', cat:'esponjoso'},
      {term:'Epífisis', cat:'esponjoso'}
    ]
  },
  { id:'h-act5', group:'histologia', kind:'diverse', type:'sequence', title:'Osificación endocondral: ordene los pasos',
    instructions:'Arrastra los pasos (o usa las flechas) hasta ordenarlos correctamente, de principio a fin.',
    steps:[
      {title:'Aparición del molde cartilaginoso', text:'Condroblastos forman el molde de cartílago hialino; aparece el pericondrio.'},
      {title:'Crecimiento del molde cartilaginoso', text:'Se alarga (crecimiento intersticial) y se engrosa (crecimiento por aposición).'},
      {title:'Aparición del centro primario de osificación', text:'Una arteria nutricia induce la formación de hueso desde el centro de la diáfisis hacia los extremos.'},
      {title:'Aparición de la cavidad medular', text:'Los osteoclastos destruyen trabéculas recién formadas y abren un espacio hueco en la diáfisis.'},
      {title:'Aparición del centro secundario de osificación', text:'Vasos epifisarios ingresan (al nacer); el hueso crece del centro de cada epífisis hacia la superficie.'},
      {title:'Formación del cartílago articular y la placa epifisaria', text:'El cartílago restante se reparte entre la superficie articular y la placa de crecimiento.'}
    ]
  },
  { id:'h-act6', group:'histologia', kind:'diverse', type:'sequence', title:'Osificación intramembranosa: ordene los pasos',
    instructions:'Arrastra los pasos (o usa las flechas) hasta ordenarlos correctamente, de principio a fin.',
    steps:[
      {title:'Aparición del centro de osificación', text:'Los osteoblastos secretan matriz osteoide.'},
      {title:'Calcificación', text:'Se depositan calcio y otras sales minerales; la matriz osteoide se endurece.'},
      {title:'Formación de trabéculas', text:'La matriz osteoide se diferencia en trabéculas que se fusionan y forman hueso esponjoso.'},
      {title:'Formación del periostio', text:'El mesénquima periférico se transforma en periostio; una capa de hueso compacto reemplaza las capas superficiales de hueso esponjoso.'}
    ]
  },
  { id:'h-act7', group:'histologia', kind:'diverse', type:'sort', title:'¿Etapa específica de la vida o toda la vida?',
    instructions:'Arrastra (o toca y luego toca la columna) cada proceso a donde corresponda.',
    buckets:[ {key:'especifica', label:'Etapa específica de la vida'}, {key:'toda_la_vida', label:'A lo largo de toda la vida'} ],
    items:[
      {term:'Formación de huesos embrionarios y fetales', cat:'especifica'},
      {term:'Crecimiento óseo (lactancia, infancia, adolescencia)', cat:'especifica'},
      {term:'Remodelación ósea', cat:'toda_la_vida'},
      {term:'Consolidación de fracturas', cat:'toda_la_vida'}
    ]
  },
  { id:'h-act8', group:'histologia', kind:'diverse', type:'match', title:'Factores del crecimiento óseo: factor ↔ función',
    instructions:'Toca un término y luego su definición correcta.',
    pairs:[
      ['Vitamina A','Estimula la actividad de los osteoblastos'],
      ['Vitamina C','Necesaria para sintetizar colágeno, la principal proteína del hueso'],
      ['Vitamina D','Estimula la absorción intestinal de calcio de la dieta'],
      ['Vitaminas K y B12','Necesarias para la síntesis de las proteínas del hueso'],
      ['Estrógenos','Cierran la placa epifisaria (antes en mujeres, por sus mayores niveles)'],
      ['Insulina','Promueve el crecimiento óseo aumentando la síntesis de proteínas óseas']
    ]
  },
  { id:'h-act9', group:'histologia', kind:'diverse', type:'match', title:'Tipos de fractura: nombre ↔ descripción',
    instructions:'Toca un término y luego su definición correcta.',
    pairs:[
      ['Expuesta','Los cabos óseos protruyen a través de la piel (en la cerrada, la piel está indemne)'],
      ['Conminuta','El hueso está astillado, aplastado o roto en múltiples fragmentos'],
      ['En tallo verde','Un lado del hueso se rompe, el otro se dobla; solo ocurre en niños'],
      ['Impactada','Un cabo de la fractura queda encajado dentro del otro'],
      ['Pott','Fractura del extremo distal del peroné, con lesión de la articulación tibio-peronea'],
      ['Pouteau-Colles','Fractura del extremo distal del radio, con desplazamiento dorsal del fragmento']
    ]
  },
  { id:'h-act10', group:'histologia', kind:'diverse', type:'sequence', title:'Consolidación ósea: ordene las fases',
    instructions:'Arrastra los pasos (o usa las flechas) hasta ordenarlos correctamente, de principio a fin.',
    noteAfterCheck:'Recuerda: el callo óseo dura entre 3 y 4 SEMANAS, no meses — es el error más frecuente en este tema.',
    steps:[
      {title:'Hematoma fracturario', text:'Se forma entre 6 y 8 horas tras la lesión; puede prolongarse varias semanas mientras fagocitos y osteoclastos limpian el tejido necrosado.'},
      {title:'Callo fibrocartilaginoso', text:'Fibroblastos y condroblastos producen colágeno y fibrocartílago, uniendo temporalmente los fragmentos.'},
      {title:'Callo óseo', text:'Osteoblastos producen trabéculas de hueso esponjoso; se mantiene entre 3 y 4 semanas (no meses).'},
      {title:'Remodelación ósea', text:'Osteoclastos reabsorben las áreas necróticas; el hueso esponjoso es reemplazado por hueso compacto; puede tardar meses.'}
    ]
  },
  { id:'h-act11', group:'histologia', kind:'diverse', type:'sort', title:'Clasificar: reducción cerrada o abierta',
    instructions:'Arrastra (o toca y luego toca la columna) cada característica a donde corresponda.',
    buckets:[ {key:'cerrada', label:'Reducción cerrada'}, {key:'abierta', label:'Reducción abierta'} ],
    items:[
      {term:'Los cabos óseos se alinean por manipulación manual', cat:'cerrada'},
      {term:'La piel permanece intacta', cat:'cerrada'},
      {term:'Se inmoviliza después con yeso o férula', cat:'cerrada'},
      {term:'Se alinean mediante cirugía', cat:'abierta'},
      {term:'Se usan tornillos, placas, clavos o alambres', cat:'abierta'},
      {term:'Requiere incisión quirúrgica (fijación interna)', cat:'abierta'}
    ]
  },
  { id:'h-act12', group:'fisiologia', kind:'diverse', type:'match', title:'Las 6 funciones del hueso',
    instructions:'Toca un término y luego su definición correcta.',
    pairs:[
      ['Sostén','Soporta tejidos blandos y permite la inserción muscular'],
      ['Protección','Protege órganos internos vitales'],
      ['Movimiento','Los músculos traccionan el hueso para generar desplazamiento'],
      ['Homeostasis mineral','Almacena el 99% del calcio corporal; libera o capta Ca²⁺'],
      ['Producción de células sanguíneas','Médula ósea roja: hemopoyesis'],
      ['Reserva de triglicéridos','Médula ósea amarilla: reserva energética']
    ]
  },
  { id:'h-act13', group:'fisiologia', kind:'quiz', type:'mc', title:'Calcemia: verdadero o falso',
    instructions:'Indica si la afirmación es verdadera o falsa.',
    questions:[
      { q:'El 99% del calcio corporal está en el hueso.', opts:['Verdadero','Falso'], correct:0 },
      { q:'El rango normal de calcemia es de 9 a 11 mg/100 mL.', opts:['Verdadero','Falso'], correct:0 },
      { q:'Todo el calcio en la sangre circula libre.', opts:['Verdadero','Falso'], correct:1,
        explain:'Solo el 45-50% está libre; el resto está unido a proteínas o complejado.' },
      { q:'Un exceso de Ca²⁺ en sangre puede causar paro cardíaco.', opts:['Verdadero','Falso'], correct:0 },
      { q:'Un déficit de Ca²⁺ en sangre puede causar paro respiratorio.', opts:['Verdadero','Falso'], correct:0 }
    ]
  },
  { id:'h-act14', group:'fisiologia', kind:'diverse', type:'sort', title:'PTH vs. calcitonina',
    instructions:'Arrastra (o toca y luego toca la columna) cada efecto a la hormona que corresponde.',
    buckets:[ {key:'pth', label:'Eleva la calcemia (PTH)'}, {key:'calcitonina', label:'Disminuye la calcemia (Calcitonina)'} ],
    items:[
      {term:'Secretada por las paratiroides', cat:'pth'},
      {term:'Estímulo: ↓ Ca²⁺ circulante', cat:'pth'},
      {term:'Estimula la disolución de cristales de CaPO₄ en el hueso', cat:'pth'},
      {term:'Estimula la resorción renal de Ca²⁺', cat:'pth'},
      {term:'Estimula la producción de 1,25-dihidroxivitamina D₃', cat:'pth'},
      {term:'Secretada por células parafoliculares de la tiroides', cat:'calcitonina'},
      {term:'Estímulo: ↑ Ca²⁺ circulante', cat:'calcitonina'},
      {term:'Inhibe la disolución de cristales de CaPO₄ en el hueso', cat:'calcitonina'},
      {term:'Estimula la excreción renal de Ca²⁺ y PO₄³⁻', cat:'calcitonina'}
    ]
  },
  { id:'h-act15', group:'fisiologia', kind:'diverse', type:'sequence', title:'Síntesis de vitamina D: ordene la ruta',
    instructions:'Arrastra los pasos (o usa las flechas) hasta ordenarlos correctamente, de principio a fin.',
    steps:[
      {title:'Piel: formación de previtamina D₃', text:'El 7-dehidrocolesterol (provitamina D₃) se convierte en previtamina D₃ por acción de la radiación UV.'},
      {title:'Piel: isomerización térmica', text:'La previtamina D₃ se transforma en colecalciferol (vitamina D₃).'},
      {title:'Hígado: formación de calcidiol', text:'La 25-hidroxilasa (CYP2R1) convierte el colecalciferol en calcidiol (25-hidroxivitamina D₃).'},
      {title:'Riñón: formación de calcitriol', text:'La alfa-1-hidroxilasa (CYP27B1) convierte el calcidiol en calcitriol (1,25-dihidroxivitamina D₃), la forma activa.'},
      {title:'Acción del calcitriol', text:'Actúa sobre el intestino (↑ absorción de Ca²⁺ y fosfato), el hueso (↑ resorción) y el riñón (↓ excreción de Ca²⁺).'}
    ]
  },
  { id:'h-act16', group:'fisiologia', kind:'diverse', type:'match', title:'Órgano, enzima y producto',
    instructions:'Toca un órgano y luego la enzima/producto que le corresponde.',
    pairs:[
      ['Piel','7-dehidrocolesterol → colecalciferol'],
      ['Hígado','25-hidroxilasa (CYP2R1) → calcidiol'],
      ['Riñón','Alfa-1-hidroxilasa (CYP27B1) → calcitriol']
    ]
  },
  { id:'h-act17', group:'fisiologia', kind:'diverse', type:'sequence', title:'Las 4 etapas de la remodelación ósea',
    instructions:'Arrastra los pasos (o usa las flechas) hasta ordenarlos correctamente, de principio a fin.',
    steps:[
      {title:'Niñez / adolescencia', text:'Se forma más hueso del que se pierde.'},
      {title:'Adultez joven', text:'Depósito y resorción son aproximadamente equivalentes.'},
      {title:'Edad media', text:'↓ hormonas sexuales → la resorción empieza a superar al depósito.'},
      {title:'Edad avanzada', text:'La resorción osteoclástica excede de forma sostenida al depósito osteoblástico.'}
    ]
  }
];

// Módulo I — articulaciones. Mismo tratamiento que H: contenido entregado
// por el profesor, agrupado bajo un solo botón con navegación por chips.
MODULES.I.subActivities = [
  { id:'i-all', title:'Articulaciones: generalidades y clasificación', icon:'🦵', ready:true }
];
MODULES.I.levels = [
  { id:'i-act1', type:'match', title:'Clasificación estructural ↔ funcional',
    instructions:'Toca un término y luego su definición correcta.',
    pairs:[
      ['Fibrosa','Sinartrosis (inmóvil)'],
      ['Cartilaginosa','Anfiartrosis (movimiento limitado)'],
      ['Sinovial','Diartrosis (gran rango de movimiento)']
    ]
  },
  { id:'i-act2', type:'match', title:'Subtipo y ejemplo',
    instructions:'Toca un subtipo y luego su ejemplo correcto.',
    pairs:[
      ['Sutura','Sutura coronal del cráneo'],
      ['Sindesmosis','Articulación tibioperonea distal'],
      ['Membrana interósea','Entre radio y cúbito'],
      ['Sincondrosis','Placa epifisaria'],
      ['Sínfisis','Sínfisis del pubis']
    ]
  },
  { id:'i-act3', type:'sort', title:'Clasificar: fibrosa o cartilaginosa',
    instructions:'Arrastra (o toca y luego toca la columna) cada término a donde corresponda.',
    buckets:[ {key:'fibrosa', label:'Fibrosa'}, {key:'cartilaginosa', label:'Cartilaginosa'} ],
    items:[
      {term:'Sutura', cat:'fibrosa'},
      {term:'Sindesmosis', cat:'fibrosa'},
      {term:'Membrana interósea', cat:'fibrosa'},
      {term:'Sincondrosis', cat:'cartilaginosa'},
      {term:'Sínfisis', cat:'cartilaginosa'}
    ]
  },
  { id:'i-act4', type:'match', title:'Componentes de la articulación sinovial',
    instructions:'Toca un componente y luego su función correcta.',
    pairs:[
      ['Cartílago hialino','Reduce el rozamiento y amortigua los golpes'],
      ['Cápsula articular','Fibras elásticas que envuelven la articulación'],
      ['Ligamentos de sostén','Resisten el estiramiento y limitan el movimiento'],
      ['Membrana sinovial','Forma la cavidad articular'],
      ['Líquido sinovial','Lubrica, amortigua, oxigena y nutre']
    ]
  },
  { id:'i-act5', type:'sort', title:'Bursas o vainas tendinosas',
    instructions:'Arrastra (o toca y luego toca la columna) cada característica a donde corresponda.',
    buckets:[ {key:'bursas', label:'Bursas'}, {key:'vainas', label:'Vainas tendinosas'} ],
    items:[
      {term:'Pequeños sacos con líquido sinovial', cat:'bursas'},
      {term:'Absorben impactos entre tejidos duros y blandos', cat:'bursas'},
      {term:'Se ubican cerca de articulaciones en general', cat:'bursas'},
      {term:'Tubos/membranas dobles que envuelven tendones', cat:'vainas'},
      {term:'Facilitan el deslizamiento del tendón', cat:'vainas'},
      {term:'Típicas de manos y pies', cat:'vainas'}
    ]
  },
  { id:'i-act6', type:'match', title:'Mnemotecnia CATETER',
    instructions:'Toca un tipo de articulación sinovial y luego su ejemplo correcto.',
    pairs:[
      ['Condílea','Radiocarpiana (muñeca)'],
      ['Artrodia','Intercarpianas'],
      ['Trocoide','Atlantoaxoidea'],
      ['Enartrosis','Hombro y cadera'],
      ['Troclear / gínglimo','Codo, tobillo'],
      ['Encaje recíproco','Carpometacarpiana del pulgar']
    ]
  },
  { id:'i-act7', type:'match', title:'Clasificación por región',
    instructions:'Toca una articulación y luego su clasificación correcta.',
    pairs:[
      ['Suturas craneales','Fibrosa (sutura) — sinartrosis'],
      ['Atlantoaxoidea','Sinovial (trocoide) — diartrosis, uniaxial'],
      ['Cuerpos intervertebrales','Cartilaginosa (sínfisis) — anfiartrosis'],
      ['Esternocostal, 1.er par','Cartilaginosa (sincondrosis) — sinartrosis'],
      ['Sacroilíaca','Sinovial (artrodia) — diartrosis'],
      ['Sínfisis del pubis','Cartilaginosa (sínfisis) — anfiartrosis'],
      ['Radiocubital','Sinovial (trocoide) — diartrosis, uniaxial']
    ]
  },
  { id:'i-act8', type:'mc', title:'Casos regionales: verdadero o falso',
    instructions:'Indica si la afirmación es verdadera o falsa.',
    questions:[
      { q:'La articulación esternocostal del 1.er par de costillas es sinovial.', opts:['Verdadero','Falso'], correct:1,
        explain:'Es cartilaginosa (sincondrosis), a diferencia del 2.º al 7.º par, que sí son sinoviales.' },
      { q:'La sacroilíaca aumenta su movimiento durante el embarazo.', opts:['Verdadero','Falso'], correct:0 },
      { q:'La escapulotorácica es una articulación sinovial verdadera.', opts:['Verdadero','Falso'], correct:1,
        explain:'Es una unión muscular (sisarcosis), no una articulación verdadera.' },
      { q:'La tibioperonea proximal y la distal son del mismo tipo estructural.', opts:['Verdadero','Falso'], correct:1,
        explain:'La proximal es sinovial (artrodia) y la distal es fibrosa (sindesmosis).' }
    ]
  }
];

const CATEGORIES = {
  oseo: {
    id:'oseo',
    emoji:'🦴',
    title:'Estructuras y funciones del sistema óseo',
    subtitle:'Divisiones del esqueleto, clasificación ósea, accidentes óseos y más',
    moduleIds:['A','B','C','D','E','F','G','H','I']
  },
  muscular: {
    id:'muscular',
    emoji:'💪',
    title:'Estructuras y funciones del sistema muscular',
    subtitle:'Tipos de músculo, componentes del músculo esquelético, grupos musculares y acciones',
    moduleIds:[]
  },
  nervioso: {
    id:'nervioso',
    emoji:'🧠',
    title:'Estructuras y funciones del sistema nervioso',
    subtitle:'Organización del SNC y del SNP, neurona y neuroglía, vías y reflejos',
    moduleIds:[]
  }
};

// Restricción temporal: solo estos módulos están habilitados; el resto
// aparece con candado y no se puede entrar. Vaciar el arreglo para
// reabrir todo. Boss Battle se deshabilita solo si no queda ningún
// módulo jugable fuera de esta lista.
const LOCKED_MODULE_IDS = ['A','B','C','D','E','F'];
function isModuleLocked(modId){ return LOCKED_MODULE_IDS.indexOf(modId) !== -1; }

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
  _subMenuParent:null, // id del sub-botón padre elegido (submenú de 2 niveles, p. ej. módulo H)
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
  saved:false,
  doubts:{},            // dudas del estudiante (reflejo del listener de Firestore)
  dashboardDoubts:null, // dudas de todo el grupo (listener del monitor)
  dashboardImgDisputas:null // disputas de "señalar estructuras" pendientes de revisar
};

function homeView(){
  if(state.currentCategory) return 'menu';
  if(state.student.code) return 'categories';
  return 'welcome';
}

/* ============================================================
   FIRESTORE — solo las "dudas" viven aquí (tiempo real).
   El resto (perfiles, progreso, resultados, contenido) sigue en
   Google Sheets / Apps Script.
   ============================================================ */
let _fs = null;          // instancia de Firestore
let _fsReady = null;     // Promise<boolean> — true cuando la sesión anónima está lista
let _doubtsUnsub = null; // listener de las dudas del estudiante
let _monDoubtsUnsub = null;

function initFirestore(){
  if(_fsReady) return _fsReady;
  _fsReady = new Promise(function(resolve){
    try{
      if(!window.MORFO_FIREBASE || typeof firebase === 'undefined'){ resolve(false); return; }
      firebase.initializeApp(window.MORFO_FIREBASE);
      _fs = firebase.firestore();
      firebase.auth().signInAnonymously()
        .then(function(){ resolve(true); })
        .catch(function(e){ console.error('Firebase auth anónima', e); resolve(false); });
    }catch(e){ console.error('Firebase init', e); resolve(false); }
  });
  return _fsReady;
}

function doubtDocId(code, key){
  return String(code) + '__' + String(key).replace(/[^A-Za-z0-9_-]/g, '_');
}

// Re-render diferido para los listeners: espera a que el usuario deje de
// escribir para no perderle el foco de un input.
let _fsRenderT = null;
function scheduleFsRender(){
  clearTimeout(_fsRenderT);
  _fsRenderT = setTimeout(function(){
    const ae = document.activeElement;
    if(ae && (ae.tagName === 'INPUT' || ae.tagName === 'TEXTAREA')){ scheduleFsRender(); return; }
    render();
  }, 450);
}

function subscribeStudentDoubts(code){
  if(!_fs || !code) return;
  if(_doubtsUnsub){ _doubtsUnsub(); _doubtsUnsub = null; }
  _doubtsUnsub = _fs.collection('dudas').where('code', '==', String(code)).onSnapshot(
    function(snap){
      const map = {};
      snap.forEach(function(doc){ const d = doc.data(); if(d && d.key) map[d.key] = d; });
      state.doubts = map;
      if(state.student.code) scheduleFsRender();
    },
    function(err){ console.error('Listener dudas (estudiante)', err); }
  );
}

function subscribeMonitorDoubts(){
  if(!_fs) return;
  if(_monDoubtsUnsub){ _monDoubtsUnsub(); _monDoubtsUnsub = null; }
  _monDoubtsUnsub = _fs.collection('dudas').onSnapshot(
    function(snap){
      const arr = [];
      snap.forEach(function(doc){
        const d = doc.data();
        if(d && d.q && d.key){ arr.push({ student: d.student || '—', code: d.code || '—', key: d.key, rec: d }); }
      });
      state.dashboardDoubts = arr;
      if(state.monitorAuthed) scheduleFsRender();
    },
    function(err){
      console.error('Listener dudas (monitor)', err);
      state.dashboardDoubts = [];
      state._doubtError = 'No se pudieron cargar las dudas en tiempo real.';
      if(state.monitorAuthed) scheduleFsRender();
    }
  );
}

let _monProfUnsub = null, _monResUnsub = null;

function unsubscribeDoubts(){
  if(_doubtsUnsub){ _doubtsUnsub(); _doubtsUnsub = null; }
  if(_monDoubtsUnsub){ _monDoubtsUnsub(); _monDoubtsUnsub = null; }
}
function unsubscribeMonitor(){
  if(_monDoubtsUnsub){ _monDoubtsUnsub(); _monDoubtsUnsub = null; }
  if(_monProfUnsub){ _monProfUnsub(); _monProfUnsub = null; }
  if(_monResUnsub){ _monResUnsub(); _monResUnsub = null; }
  unsubscribeMonImgDisputes();
}

/* ============================================================
   DISPUTAS DE "SEÑALAR ESTRUCTURAS" — un estudiante puede marcar
   una respuesta incorrecta como "creo que también es correcta" con
   una justificación; el monitor la revisa y, si la aprueba, queda
   agregada como respuesta válida para todos desde ese momento
   (colección "imgAnswerOverrides"), sin tocar el código.
   ============================================================ */
function imgOverrideKey(modId, levelId, imgFile, n){
  // Los ids de documento de Firestore no pueden tener "/" (se interpretaría
  // como una ruta con más colecciones); el nombre del archivo sí los trae.
  const safeFile = String(imgFile).replace(/[\/.]/g, '_');
  return modId + '__' + levelId + '__' + safeFile + '__' + n;
}

let _imgOverrides = {};
let _imgOverridesLoaded = false;
let _imgOverridesPromise = null;
function loadImgOverrides(){
  // Si Firestore aún no está listo, no lo intenta (evita re-intentarlo en
  // cada render); vuelve a llamarse solo cuando algo más ya causó un
  // render legítimo. Se marca "cargado" pase lo que pase para no
  // reintentar sin parar en la misma sesión ante un error puntual.
  if(_imgOverridesLoaded || !_fs) return Promise.resolve();
  if(_imgOverridesPromise) return _imgOverridesPromise;
  _imgOverridesPromise = _fs.collection('imgAnswerOverrides').get().then(function(snap){
    const map = {};
    snap.forEach(function(doc){
      const d = doc.data();
      if(d && Array.isArray(d.extra)) map[doc.id] = d.extra;
    });
    _imgOverrides = map;
  }).catch(function(e){
    console.error('loadImgOverrides', e);
  }).then(function(){
    _imgOverridesLoaded = true;
    _imgOverridesPromise = null;
  });
  return _imgOverridesPromise;
}

function submitImgDispute(mod, level, img, p, typedVal, justificacion){
  if(!_fs) return Promise.resolve(false);
  try{
    const id = imgOverrideKey(mod.id, level.id, img.file, p.n) + '__' + String(state.student.code || 'x') + '__' + Date.now();
    return _fs.collection('imgDisputas').doc(id).set({
      code: String(state.student.code || ''),
      name: state.student.name || '',
      mod: mod.id, levelId: level.id,
      imgFile: img.file, imgLabel: img.label || '',
      pointN: p.n,
      typed: String(typedVal || ''),
      acceptedAnswers: p.answers || [],
      justificacion: String(justificacion || ''),
      createdAt: new Date().toISOString(),
      resolved: false
    }).then(function(){ return true; }).catch(function(e){ console.error('submitImgDispute', e); return false; });
  }catch(e){
    console.error('submitImgDispute (síncrono)', e);
    return Promise.resolve(false);
  }
}

let _monImgDisputesUnsub = null;
function subscribeMonitorImgDisputes(){
  if(!_fs) return;
  if(_monImgDisputesUnsub){ _monImgDisputesUnsub(); _monImgDisputesUnsub = null; }
  // Trae todas (no solo las pendientes) para poder mostrar también las ya
  // resueltas en su propia sección, igual que las dudas.
  _monImgDisputesUnsub = _fs.collection('imgDisputas').onSnapshot(
    function(snap){
      const arr = [];
      snap.forEach(function(doc){ arr.push(Object.assign({ id: doc.id }, doc.data())); });
      state.dashboardImgDisputas = arr;
      if(state.monitorAuthed) scheduleFsRender();
    },
    function(err){
      console.error('Listener disputas (monitor)', err);
      state.dashboardImgDisputas = [];
      if(state.monitorAuthed) scheduleFsRender();
    }
  );
}
function unsubscribeMonImgDisputes(){
  if(_monImgDisputesUnsub){ _monImgDisputesUnsub(); _monImgDisputesUnsub = null; }
}

function approveImgDispute(dispute){
  if(!_fs) return;
  try{
    const key = imgOverrideKey(dispute.mod, dispute.levelId, dispute.imgFile, dispute.pointN);
    const ref = _fs.collection('imgAnswerOverrides').doc(key);
    ref.get().then(function(snap){
      const cur = (snap.exists && Array.isArray(snap.data().extra)) ? snap.data().extra.slice() : [];
      if(cur.indexOf(dispute.typed) === -1) cur.push(dispute.typed);
      return ref.set({ extra: cur });
    }).then(function(){
      return _fs.collection('imgDisputas').doc(dispute.id).update({ resolved: true, approved: true });
    }).then(function(){
      const cur = (_imgOverrides[key] || []).slice();
      if(cur.indexOf(dispute.typed) === -1) cur.push(dispute.typed);
      _imgOverrides[key] = cur;
    }).catch(function(e){ console.error('approveImgDispute', e); });
  }catch(e){
    console.error('approveImgDispute (síncrono)', e);
  }
}
function rejectImgDispute(dispute){
  if(!_fs) return;
  _fs.collection('imgDisputas').doc(dispute.id).update({ resolved: true, approved: false })
    .catch(function(e){ console.error('rejectImgDispute', e); });
}

/* ============================================================
   PERFILES en Firestore (colección "perfiles", doc = código).
   Durante la transición se sigue escribiendo también en Sheets y,
   al cargar, gana el más reciente (por updated_at).
   ============================================================ */
function fsProfileRef(code){ return _fs.collection('perfiles').doc(String(code)); }

// progress/timers se guardan como TEXTO JSON en Firestore (igual que en
// Sheets): así no chocan con el límite de "arrays anidados" de Firestore
// (los snapshots de reanudación tienen array de arrays).
function parseMaybeJson(v){
  if(v && typeof v === 'object') return v;      // ya venía como objeto (formato viejo)
  try{ return v ? JSON.parse(v) : {}; }catch(e){ return {}; }
}

async function getFsProfile(code){
  if(!_fs) return null;
  try{
    const snap = await fsProfileRef(code).get();
    if(!snap.exists) return null;
    const p = snap.data();
    return { name:p.name||'', code:String(code),
             progress: parseMaybeJson(p.progress), timers: parseMaybeJson(p.timers),
             saved:!!p.saved, updated_at: p.updated_at || '' };
  }catch(e){ console.error('getFsProfile', e); return null; }
}

async function loadProfileFromSheets(code){
  try{
    const data = await apiGet({ action:'getProfile', code: code });
    if(!data.profile) return null;
    const p = data.profile;
    return {
      name: p.name || '',
      code: p.code || code,
      progress: p.progress ? JSON.parse(p.progress) : {},
      timers: p.timers ? JSON.parse(p.timers) : {},
      saved: String(p.saved).toUpperCase() === 'TRUE',
      updated_at: p.updated_at || ''
    };
  }catch(e){ console.error('getProfile (Sheets)', e); return null; }
}

function seedFsProfile(code, prof){
  if(!_fs || !prof) return;
  try{
    fsProfileRef(code).set({
      name: prof.name || '',
      progress: JSON.stringify(prof.progress || {}),
      timers: JSON.stringify(prof.timers || {}),
      saved: !!prof.saved, updated_at: prof.updated_at || new Date().toISOString()
    }).catch(function(e){ console.error('seedFsProfile', e); });
  }catch(e){ console.error('seedFsProfile (sync)', e); }
}

// Listener del monitor: todos los perfiles en tiempo real.
function subscribeMonitorProfiles(){
  if(!_fs) return;
  if(_monProfUnsub){ _monProfUnsub(); _monProfUnsub = null; }
  _monProfUnsub = _fs.collection('perfiles').onSnapshot(function(snap){
    const rows = [];
    snap.forEach(function(doc){
      const p = doc.data();
      rows.push({ name:p.name||'', code:doc.id, updated_at:p.updated_at||'',
                  progress: parseMaybeJson(p.progress), timers: parseMaybeJson(p.timers) });
    });
    state.dashboardProfiles = rows;
    if(state.monitorAuthed) scheduleFsRender();
  }, function(err){
    console.error('Listener perfiles (monitor)', err);
    // Firestore no disponible (p. ej. reglas sin publicar) → cae a Sheets
    apiGet({ action:'listProfiles', pass: state.monitorPass })
      .then(function(pd){ state.dashboardProfiles = mapProfilesRows(pd.profiles); if(state.monitorAuthed) render(); })
      .catch(function(){ state.dashboardProfiles = []; if(state.monitorAuthed) render(); });
  });
}

// Una vez: sube a Firestore los perfiles que solo estén en Sheets.
async function gapFillProfiles(){
  if(!_fs) return;
  try{
    const [sheetData, fsSnap] = await Promise.all([
      apiGet({ action:'listProfiles', pass: state.monitorPass }),
      _fs.collection('perfiles').get()
    ]);
    const have = {};
    fsSnap.forEach(function(d){ have[d.id] = true; });
    const missing = (sheetData.profiles || []).filter(function(r){ return r.code && !have[String(r.code)]; });
    if(!missing.length) return;
    const batch = _fs.batch();
    missing.forEach(function(r){
      // r.progress / r.timers ya vienen como texto JSON desde Sheets
      batch.set(fsProfileRef(r.code), {
        name: r.name || '',
        progress: typeof r.progress === 'string' ? r.progress : JSON.stringify(r.progress || {}),
        timers: typeof r.timers === 'string' ? r.timers : JSON.stringify(r.timers || {}),
        saved: String(r.saved).toUpperCase() === 'TRUE',
        updated_at: r.updated_at || new Date().toISOString()
      });
    });
    await batch.commit();
  }catch(e){ console.error('gapFillProfiles', e); }
}

/* ---- RESULTADOS (informes) en Firestore, colección "resultados" ---- */
function resultRowFromDoc(id, r){
  let rowsArr = [], boss = null;
  try{ rowsArr = r.rows ? (typeof r.rows === 'string' ? JSON.parse(r.rows) : r.rows) : []; }catch(e){}
  try{ boss = r.boss ? (typeof r.boss === 'string' ? JSON.parse(r.boss) : r.boss) : null; }catch(e){}
  return { name:r.name, code:id, timestamp:r.timestamp || '',
           overall:Number(r.overall)||0, totalCorrect:Number(r.totalCorrect)||0, totalQ:Number(r.totalQ)||0,
           rows: rowsArr, boss: boss };
}

function subscribeMonitorResults(){
  if(!_fs) return;
  if(_monResUnsub){ _monResUnsub(); _monResUnsub = null; }
  _monResUnsub = _fs.collection('resultados').onSnapshot(function(snap){
    const rows = [];
    snap.forEach(function(doc){ rows.push(resultRowFromDoc(doc.id, doc.data())); });
    rows.sort(function(a,b){ return String(b.timestamp||'').localeCompare(String(a.timestamp||'')); });
    state.dashboardRows = rows;
    if(state.monitorAuthed) scheduleFsRender();
  }, function(err){
    console.error('Listener resultados (monitor)', err);
    apiGet({ action:'listResults', pass: state.monitorPass })
      .then(function(rd){ state.dashboardRows = mapResultsRows(rd.results); if(state.monitorAuthed) render(); })
      .catch(function(){ state.dashboardRows = []; if(state.monitorAuthed) render(); });
  });
}

// Una vez: sube a Firestore los informes que solo estén en Sheets.
async function gapFillResults(){
  if(!_fs) return;
  try{
    const [sheetData, fsSnap] = await Promise.all([
      apiGet({ action:'listResults', pass: state.monitorPass }),
      _fs.collection('resultados').get()
    ]);
    const have = {};
    fsSnap.forEach(function(d){ have[d.id] = true; });
    const missing = (sheetData.results || []).filter(function(r){ return r.code && !have[String(r.code)]; });
    if(!missing.length) return;
    const batch = _fs.batch();
    missing.forEach(function(r){
      batch.set(_fs.collection('resultados').doc(String(r.code)), {
        name: r.name || '', code: String(r.code), timestamp: r.timestamp || '',
        overall: Number(r.overall)||0, totalCorrect: Number(r.totalCorrect)||0, totalQ: Number(r.totalQ)||0,
        rows: typeof r.rows === 'string' ? r.rows : JSON.stringify(r.rows || []),
        boss: typeof r.boss === 'string' ? r.boss : JSON.stringify(r.boss || null)
      });
    });
    await batch.commit();
  }catch(e){ console.error('gapFillResults', e); }
}

/* ============================================================
   AVISO DE VERSIÓN NUEVA
   Compara la versión de este app.js con la que sirve index.html.
   ============================================================ */
function runningAppVersion(){
  const s = document.querySelector('script[src*="app.js?v="]');
  const m = s && s.src.match(/app\.js\?v=(\d+)/);
  return m ? Number(m[1]) : 0;
}
let _updateShown = false, _lastUpdateCheck = 0;
async function checkForUpdate(){
  const mine = runningAppVersion();
  if(!mine || _updateShown) return;
  const now = Date.now();
  if(now - _lastUpdateCheck < 60000) return;
  _lastUpdateCheck = now;
  try{
    const html = await fetch('index.html?_=' + now, { cache:'no-store' }).then(function(r){ return r.text(); });
    const m = html.match(/app\.js\?v=(\d+)/);
    if(m && Number(m[1]) > mine){ _updateShown = true; showUpdateBanner(); }
  }catch(e){}
}
function showUpdateBanner(){
  if(document.getElementById('updateBanner')) return;
  const b = document.createElement('div');
  b.id = 'updateBanner';
  b.className = 'update-banner';
  b.appendChild(el('span','', 'Hay una versión nueva de Morfo-Trainer.'));
  const r = el('button','update-reload','↻ Recargar');
  r.type = 'button';
  r.onclick = function(){ location.reload(); };
  b.appendChild(r);
  document.body.appendChild(b);
}

// Traslada a Firestore, una sola vez, las dudas que quedaron guardadas
// dentro del perfil (formato viejo state.progress['@dudas']).
async function migrateDoubtsToFirestore(){
  const old = state.progress && state.progress['@dudas'];
  if(!old || typeof old !== 'object' || !Object.keys(old).length) return;
  if(!_fs) return;
  const code = state.student.code, student = state.student.name;
  try{
    const batch = _fs.batch();
    Object.keys(old).forEach(function(k){
      const rec = old[k];
      if(!rec || !rec.q) return;
      const ref = _fs.collection('dudas').doc(doubtDocId(code, k));
      batch.set(ref, Object.assign({ code:code, student:student, key:k, nota:'' }, rec), { merge:true });
    });
    await batch.commit();
    delete state.progress['@dudas'];
    saveProfile();
  }catch(e){ console.error('Migración de dudas a Firestore', e); }
}

function levelBackTarget(){
  const mod = MODULES[state.currentModule];
  return (mod && mod.subActivities && mod.subActivities.length) ? 'moduleSubmenu' : 'menu';
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
// Reloj compacto para la cabecera: MM:SS si es menos de una hora.
function formatClock(totalSeconds){
  const s = Math.max(0, Math.floor(totalSeconds));
  if(s < 3600){
    return String(Math.floor(s/60)).padStart(2,'0') + ':' + String(s%60).padStart(2,'0');
  }
  return formatHMS(s);
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
    if(el) el.textContent='⏱ '+formatClock(currentElapsed(_activeTimerModule));
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
  } else if(state.currentModule && MODULE_TIMER_VIEWS.includes(state.view)){
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

async function checkStorageDiag(badgeEl){
  // Aprovecha las precargas (contenido + Firebase) en vez de un ping aparte.
  const res = await Promise.all([ loadDynamicContent(), initFirestore() ]);
  let ok = _dynamicContentLoaded || res[1] === true;
  if(!ok){
    try{ await apiGet({action:'ping'}); ok = true; }catch(e){}
  }
  if(ok){
    badgeEl.className = 'auth-conn is-ok';
    badgeEl.innerHTML = '<span class="dot"></span> Conectado';
    badgeEl.title = 'Tu progreso se guarda automáticamente.';
    badgeEl.removeAttribute('role');
  }else{
    badgeEl.className = 'auth-conn is-err';
    badgeEl.innerHTML = '<span class="dot"></span> Sin conexión con el servidor — tu progreso no se guardará';
    badgeEl.title = 'No se pudo conectar con el servidor.';
    badgeEl.setAttribute('role','alert');
    console.error('Backend diag error');
  }
}

async function saveProfile(){
  if(!state.student.code) return;
  const code = String(state.student.code);
  const now = new Date().toISOString();
  const progress = state.progress || {}, timers = state.timers || {};
  // Firestore es el primario. progress/timers van como texto JSON.
  if(_fs){
    try{
      await fsProfileRef(code).set({
        name: state.student.name || '',
        progress: JSON.stringify(progress), timers: JSON.stringify(timers),
        saved: !!state.saved, updated_at: now
      });
    }catch(e){ console.error('saveProfile (Firestore)', e); }
  }
  // Durante la transición, también en Sheets (respaldo, y para que el profe lo vea)
  try{
    await apiPost({
      action:'saveProfile',
      code: code, name: state.student.name,
      progress: progress, timers: timers, saved: state.saved
    });
  }catch(e){ console.error('saveProfile (Sheets)', e); }
}

async function loadProfile(code){
  code = String(code);
  // Firestore es rápido (~100 ms). Si tiene el perfil, se usa y punto;
  // en segundo plano se comprueba si Sheets quedó más nuevo (raro).
  const fs = await getFsProfile(code);
  if(fs){
    loadProfileFromSheets(code).then(function(sh){
      if(sh && String(sh.updated_at || '') > String(fs.updated_at || '')){
        seedFsProfile(code, sh);
      }
    }).catch(function(){});
    return fs;
  }
  // No está en Firestore: puede ser nuevo, o de antes de la migración.
  const sh = await loadProfileFromSheets(code);
  if(sh){ seedFsProfile(code, sh); return sh; }
  return null;
}

/* ============================================================
   CONTENIDO DINÁMICO DESDE GOOGLE SHEETS
   Se fusiona con MODULES una sola vez por sesión. Nunca pisa un
   nivel que ya exista escrito a mano (A y B se quedan intactos).
   ============================================================ */
let _dynamicContentLoaded = false;

const DEFAULT_LEVEL_TITLES = {
  l1:'Reconocimiento', l2:'Identificación', l3:'Relaciones', l4:'Aplicación',
  mc:'Selección múltiple', match:'Relacionar y emparejar',
  completar:'Preguntas de completar',
  sort:'Clasificación', img:'Imágenes anatómicas', cases:'Casos clínicos'
};

function groupRows(rows, keyFn){
  const out={};
  (rows||[]).forEach(r=>{
    const k=keyFn(r);
    if(!out[k]) out[k]=[];
    out[k].push(r);
  });
  return out;
}

function addDynamicLevel(modId, nivelId, meta, buildFn){
  const mod = MODULES[modId];
  if(!mod) return; // el módulo no existe en el código, se ignora la fila
  if(!mod.levels) mod.levels=[];
  if(mod.levels.some(l=>l.id===nivelId)) return; // ya hay contenido verificado a mano, no se pisa
  const level = buildFn();
  level.id = nivelId;
  level.title = (meta && meta.titulo) || DEFAULT_LEVEL_TITLES[nivelId] || nivelId;
  mod.levels.push(level);
  // si el módulo usa sub-botones (C-F), marca el que corresponda como listo para jugar
  if(mod.subActivities){
    const sub = mod.subActivities.find(s=>s.id===nivelId);
    if(sub) sub.ready = true;
  }
}

function mergeDynamicContent(data){
  const metaByKey = {};
  (data.niveles||[]).forEach(n=>{ metaByKey[n.modulo+'|'+n.nivel] = n; });

  const mcGroups = groupRows(data.mc, r=>r.modulo+'|'+r.nivel);
  Object.entries(mcGroups).forEach(([key, rows])=>{
    const [modId, nivelId] = key.split('|');
    if(!modId || !nivelId) return;
    addDynamicLevel(modId, nivelId, metaByKey[key], ()=>({
      type:'mc',
      questions: rows.map(r=>({
        q: r.pregunta,
        opts: [r.opcion_a, r.opcion_b, r.opcion_c, r.opcion_d].filter(o=>o!==undefined && String(o).trim()!==''),
        correct: 'ABCD'.indexOf(String(r.correcta||'').trim().toUpperCase()),
        explain: r.explicacion || ''
      })).filter(q=>q.q && q.opts.length>=2 && q.correct>=0)
    }));
  });

  const matchGroups = groupRows(data.match, r=>r.modulo+'|'+r.nivel);
  Object.entries(matchGroups).forEach(([key, rows])=>{
    const [modId, nivelId] = key.split('|');
    if(!modId || !nivelId) return;
    const meta = metaByKey[key];
    addDynamicLevel(modId, nivelId, meta, ()=>({
      type:'match',
      instructions: (meta && meta.instrucciones) || 'Toca un término y luego su definición correcta.',
      pairs: rows.filter(r=>r.termino && r.definicion).map(r=>[r.termino, r.definicion])
    }));
  });

  const sortGroups = groupRows(data.sort, r=>r.modulo+'|'+r.nivel);
  Object.entries(sortGroups).forEach(([key, rows])=>{
    const [modId, nivelId] = key.split('|');
    if(!modId || !nivelId) return;
    const meta = metaByKey[key];
    const validRows = rows.filter(r=>r.item && r.categoria);
    const cats = [...new Set(validRows.map(r=>r.categoria))];
    addDynamicLevel(modId, nivelId, meta, ()=>({
      type:'sort',
      instructions: (meta && meta.instrucciones) || 'Clasifica cada elemento en su categoría.',
      buckets: cats.map(c=>({ key:c, label: c.charAt(0).toUpperCase()+c.slice(1) })),
      items: validRows.map(r=>({ term:r.item, cat:r.categoria }))
    }));
  });

  const fillGroups = groupRows(data.completar, r=>r.modulo+'|'+r.nivel);
  Object.entries(fillGroups).forEach(([key, rows])=>{
    const [modId, nivelId] = key.split('|');
    if(!modId || !nivelId) return;
    const meta = metaByKey[key];
    addDynamicLevel(modId, nivelId, meta, ()=>({
      type:'completar',
      instructions: (meta && meta.instrucciones) || 'Escribe la palabra o palabras que completan cada frase. No importan mayúsculas ni tildes.',
      questions: rows.map(r=>({
        q: r.pregunta,
        answers: String(r.respuestas||'').split('/').map(s=>s.trim()).filter(Boolean),
        explain: r.explicacion || ''
      })).filter(q=>q.q && q.answers.length)
    }));
  });
}

let _dynamicContentPromise = null;
function loadDynamicContent(){
  if(_dynamicContentLoaded) return Promise.resolve();
  if(_dynamicContentPromise) return _dynamicContentPromise;   // ya en curso: no dupliques
  _dynamicContentPromise = (async ()=>{
    try{
      const data = await apiGet({action:'getContent'});
      mergeDynamicContent(data);
      _dynamicContentLoaded = true;
    }catch(e){
      console.error('No se pudo cargar contenido dinámico de Sheets', e);
    }
    _dynamicContentPromise = null; // terminó: permite recargar
  })();
  return _dynamicContentPromise;
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
  unsubscribeDoubts();
  unsubscribeMonitor();
  state.student={name:'',code:''};
  state.progress={};
  state.timers={};
  state.saved=false;
  state.doubts={};
  state.dashboardDoubts=null;
  state.dashboardImgDisputas=null;
  state.dashboardProfiles=null;
  state.dashboardRows=null;
  state._monitorTab=null;
  state.monitorAuthed=false;
  state.monitorPass='';
  state.currentCategory=null;
  state.currentModule=null;
  state._levelRuntime=null;
  state._confirmingReset=false;
  state.view='welcome';
  render();
}

// Niveles de los módulos ACTIVOS (los bloqueados no cuentan para totales).
function allLevelsFlat(){
  const out=[];
  Object.values(MODULES).forEach(m=>{
    if(isModuleLocked(m.id)) return;
    m.levels.forEach(l=>out.push({mod:m.id,l}));
  });
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

const MODULE_TIMER_VIEWS = ['sort','match','mc','completar','imgLabel','mcMulti','sequence','levelDone'];

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
    completar: viewFill,
    imgLabel: viewImgLabel,
    mcMulti: viewMcMulti,
    sequence: viewSequence,
    levelDone: viewLevelDone,
    boss: viewBoss,
    bossDone: viewBossDone,
    report: viewReport,
    dashboard: viewDashboard,
    monitorLogin: viewMonitorLogin,
    comingSoon: viewComingSoon,
    dashboardActivity: viewDashboardActivity,
    moduleSubmenu: viewModuleSubmenu,
    doubts: viewDoubts
  };
  try{
    app.appendChild(views[state.view]());
  }catch(err){
    console.error('Render error en vista "'+state.view+'":', err);
    app.appendChild(errorCard(err));
  }
}

function errorCard(err){
  const wrap=el('div','home');
  const card=el('div','notice-card');
  card.appendChild(el('div','n-eyebrow','Algo salió mal'));
  card.appendChild(el('h1','','No se pudo mostrar esta pantalla'));
  card.appendChild(el('p','n-body','Detalle técnico: '+esc(err && err.message ? err.message : String(err))));
  const homeBtn=el('button','act-btn','Volver al inicio');
  homeBtn.type='button';
  homeBtn.onclick=()=>{ state.view=homeView(); render(); };
  card.appendChild(homeBtn);
  wrap.appendChild(card);
  return wrap;
}

function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g, c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

// El nombre en la hoja del curso puede venir como "Nombre - MONITOR".
function parseStudent(){
  const raw = String(state.student.name || '').trim();
  const m = raw.match(/^(.*?)\s*[-–·|]\s*(monitor)\s*$/i);
  if(m) return { name: m[1].trim() || raw, role: 'Monitor' };
  return { name: raw, role: null };
}

function badge(text, variant){
  return el('span', 'badge' + (variant ? ' badge--'+variant : ''), esc(text));
}

// Barra de progreso reutilizable. opts: { unit, avg, hideMeta }
function progressBar(done, total, opts){
  opts = opts || {};
  const frac = total ? Math.max(0, Math.min(1, done/total)) : 0;
  const isDone = total > 0 && done >= total;
  const wrap = el('div','progress');
  wrap.innerHTML =
    '<div class="track"><i class="'+(isDone?'is-done':'')+'" style="width:'+Math.round(frac*100)+'%"></i></div>' +
    (opts.hideMeta ? '' :
      '<div class="meta"><b>'+done+'</b> de <b>'+total+'</b> '+esc(opts.unit || 'niveles')+
      (opts.avg!=null && done>0 ? ' · promedio '+opts.avg+'%' : '')+'</div>');
  return wrap;
}

/* ============================================================
   ENCABEZADO FIJO — marca · identidad · cerrar sesión · menú
   Aparece en todas las vistas menos "welcome". Concentra la
   navegación rápida entre pantallas.
   ============================================================ */
function topStrip(){
  const h = el('div','app-header');

  const bar = el('div','app-bar');

  const brand = el('div','app-brand');
  brand.appendChild(brandMark('sm'));
  brand.appendChild(el('span','name','Morfo-Trainer'));
  bar.appendChild(brand);

  if(state.student.code){
    const su = parseStudent();
    const user = el('div','app-user');
    const who = el('div','app-who');
    who.appendChild(el('span','nm', esc(su.name || 'Invitado')));
    if(su.role) who.appendChild(badge(su.role, 'role'));
    who.appendChild(el('span','code', esc(state.student.code)));
    user.appendChild(who);
    const out = el('button','app-logout','Cerrar sesión');
    out.type = 'button';
    out.onclick = ()=>{ logout(); };
    user.appendChild(out);
    bar.appendChild(user);
  } else {
    const out = el('button','app-logout','Salir');
    out.type = 'button';
    out.onclick = ()=>{ logout(); };
    bar.appendChild(out);
  }
  h.appendChild(bar);

  if(state.student.code || state.monitorAuthed){ h.appendChild(navRow()); }
  return h;
}

// Menú de navegación rápida (fila de pestañas dentro del encabezado).
function navRow(){
  const nav = el('nav','app-nav');
  nav.setAttribute('aria-label','Navegación');
  const v = state.view;
  const inTheme = ['menu','moduleSubmenu','comingSoon','sort','match','mc','completar','imgLabel','mcMulti','sequence','levelDone','boss','bossDone'].indexOf(v) !== -1;
  const inDash = ['dashboard','monitorLogin','dashboardActivity'].indexOf(v) !== -1;

  function link(label, active, onClick){
    const b = el('button','app-nav-link' + (active ? ' is-active' : ''), esc(label));
    b.type = 'button';
    if(active) b.setAttribute('aria-current','page');
    b.onclick = onClick;
    return b;
  }

  if(state.student.code){
    nav.appendChild(link('Temas', v === 'categories', ()=>{
      state.currentCategory = null; state.view = 'categories'; render();
    }));
    if(state.currentCategory){
      nav.appendChild(link('Módulos', inTheme, ()=>{ state.view = 'menu'; render(); }));
    }
    nav.appendChild(link('Mi informe', v === 'report', ()=>{ state.view = 'report'; render(); }));

    const dd = getDoubts();
    const nDoubts = dd ? Object.keys(dd).length : 0;
    if(nDoubts){
      const nAns = Object.keys(dd).filter(function(kk){ return dd[kk].respuesta; }).length;
      nav.appendChild(link('Mis dudas' + (nAns ? ' · ' + nAns : ''), v === 'doubts', ()=>{ state.view = 'doubts'; render(); }));
    }
  }

  if(parseStudent().role === 'Monitor' || state.monitorAuthed){
    nav.appendChild(link('Panel del grupo', inDash, ()=>{ goToDashboard(); }));
  }

  if(state.student.code){
    const flat = allLevelsFlat();
    const total = flat.length;
    const doneC = flat.filter(x=> !!state.progress[levelKey(x.mod, x.l.id)]).length;
    const prog = el('span','app-nav-progress', doneC + '/' + total + ' niveles');
    nav.appendChild(prog);
  }
  return nav;
}

function backButton(label, cb){
  const b=el('button','backlink backlink-invert','← '+label);
  b.onclick=cb;
  return b;
}

/* ============================================================
   MARCA — bone-mark reutilizable (login, topStrip, etc.)
   ============================================================ */
function brandMark(cls){
  const m = el('div', 'brandmark' + (cls ? ' ' + cls : ''));
  m.setAttribute('aria-hidden','true');
  m.innerHTML = '<img src="assets/logo.png" alt="" decoding="async">';
  return m;
}

/* ============================================================
   VISTA: BIENVENIDA / INGRESO
   Estructura: marca → formulario (código + CTA) → acción de
   monitor (discreta) → estado de conexión (discreto si todo OK).
   La lógica de autenticación es idéntica a la anterior.
   ============================================================ */
function viewWelcome(){
  const wrap = el('div','auth');
  const card = el('div','auth-card');

  // --- marca ---
  const brand = el('div','auth-brand');
  brand.appendChild(brandMark());
  brand.appendChild(el('p','auth-eyebrow','Morfofisiología I · VACS'));
  brand.appendChild(el('h1','auth-wordmark','Morfo-Trainer'));
  brand.appendChild(el('p','auth-tagline','Entrena la anatomía de los sistemas óseo, muscular y nervioso con ejercicios interactivos.'));
  card.appendChild(brand);

  // --- formulario ---
  const form = el('form','auth-form');
  form.setAttribute('novalidate','');

  const field = el('div','field');
  const lbl = el('label','field-label','Código estudiantil');
  lbl.htmlFor = 'authCode';
  const codeInput = document.createElement('input');
  codeInput.type = 'text';
  codeInput.id = 'authCode';
  codeInput.className = 'field-input';
  codeInput.placeholder = 'Ej. 2025262056';
  codeInput.value = state.student.code || '';
  codeInput.autocomplete = 'off';
  codeInput.autocapitalize = 'off';
  codeInput.spellcheck = false;
  codeInput.setAttribute('inputmode','numeric');
  codeInput.setAttribute('aria-describedby','authHint');
  const hint = el('div','field-hint');
  hint.id = 'authHint';
  hint.setAttribute('aria-live','polite');
  hint.textContent = 'Te identifica en la lista del curso y autocompleta tu nombre.';
  field.appendChild(lbl);
  field.appendChild(codeInput);
  field.appendChild(hint);
  form.appendChild(field);

  const startBtn = el('button','btn-cta','Continuar entrenamiento →');
  startBtn.type = 'submit';
  form.appendChild(startBtn);
  card.appendChild(form);

  // --- acción de monitor (discreta) ---
  const dashBtn = el('button','auth-link','¿Eres monitor? Ver el panel del grupo →');
  dashBtn.type = 'button';
  dashBtn.onclick = ()=>{ goToDashboard(); };
  card.appendChild(dashBtn);

  // --- estado de conexión: dentro de la tarjeta, verde si todo OK ---
  const conn = el('div','auth-conn is-checking','<span class="dot"></span> Comprobando conexión…');
  card.appendChild(conn);
  checkStorageDiag(conn);

  wrap.appendChild(card);

  /* ---------- lógica (sin cambios) ---------- */
  let confirmedName = null;
  let lastLookupCode = null;

  function setHint(text, kind){
    hint.textContent = text;
    hint.className = 'field-hint' + (kind === 'ok' ? ' is-ok' : kind === 'error' ? ' is-error' : '');
    field.classList.toggle('has-error', kind === 'error');
  }
  function setBusy(on, label){
    startBtn.disabled = on || !codeInput.value.trim();
    startBtn.classList.toggle('is-loading', !!on);
    startBtn.setAttribute('aria-busy', on ? 'true' : 'false');
    if(label) startBtn.textContent = label;
    else if(!on) startBtn.textContent = 'Continuar entrenamiento →';
  }

  async function doLookup(){
    const code = codeInput.value.trim();
    if(!code){ confirmedName=null; lastLookupCode=null; setHint('Te identifica en la lista del curso y autocompleta tu nombre.', ''); return null; }
    if(code===lastLookupCode) return confirmedName;
    setHint('Buscando tu nombre en la lista del curso…', '');
    try{
      const data = await apiGet({action:'lookupName', code});
      if(code!==codeInput.value.trim()) return confirmedName; // el código cambió mientras esperábamos
      lastLookupCode = code;
      if(data.name){
        confirmedName = data.name;
        setHint('Hola, ' + data.name + '.', 'ok');
      } else {
        confirmedName = null;
        setHint('Ese código no está en la lista del curso. Verifica que esté bien escrito o avísale a tu profesor.', 'error');
      }
      return confirmedName;
    }catch(e){
      lastLookupCode = null;
      setHint('No se pudo verificar el código ahora mismo. Intenta de nuevo.', 'error');
      return null;
    }
  }

  let _lookupT = null;
  codeInput.addEventListener('blur', doLookup);
  codeInput.addEventListener('input', ()=>{
    confirmedName = null; lastLookupCode = null;
    setHint('Te identifica en la lista del curso y autocompleta tu nombre.', '');
    startBtn.disabled = !codeInput.value.trim();
    // Adelanta la verificación mientras el usuario deja de escribir, para
    // que al pulsar "Continuar" el nombre ya esté listo.
    clearTimeout(_lookupT);
    if(codeInput.value.trim().length >= 7){
      _lookupT = setTimeout(function(){ doLookup(); }, 650);
    }
  });
  startBtn.disabled = !codeInput.value.trim();

  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const code = codeInput.value.trim();
    if(!code){ setHint('Escribe tu código estudiantil para continuar.', 'error'); codeInput.focus(); return; }
    setBusy(true, 'Verificando…');

    // Arranca en paralelo (el contenido y Firebase ya vienen precargados).
    const pProfile = loadProfile(code);
    const pContent = loadDynamicContent();
    const pFs = initFirestore();

    let existing, fsOk;
    try{
      [existing, fsOk] = await Promise.all([ pProfile, pFs ]);
    }catch(err){
      setBusy(false);
      setHint('No se pudo conectar. Detalle: ' + (err && err.message ? err.message : String(err)), 'error');
      return;
    }

    // Si el alumno ya tiene perfil, su nombre viene de ahí (rápido). Solo se
    // valida contra la lista del curso cuando es la primera vez (o usa la
    // caché del adelanto que se hace al escribir el código).
    let name = existing && existing.name;
    if(!name){
      name = await doLookup();
      if(!name){
        setBusy(false);
        if(!field.classList.contains('has-error')) setHint('Ese código no está en la lista del curso. Verifica que esté bien escrito.', 'error');
        return;
      }
    }

    startBtn.textContent = 'Entrando…';
    try{
      state._fsOk = fsOk;
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
      state.currentCategory = null;
      state.view = 'categories';
      render();
      saveProfile();
      if(fsOk){
        subscribeStudentDoubts(code);
        migrateDoubtsToFirestore();
      }
      // el contenido llega en segundo plano; re-render cuando esté
      pContent.then(function(){ state._triedContent = true; if(state.student.code) render(); });
    }catch(err){
      setBusy(false);
      setHint('No se pudo cargar tu perfil. Detalle: ' + (err && err.message ? err.message : String(err)), 'error');
    }
  });

  return wrap;
}

/* ============================================================
   VISTA: SELECCIÓN DE TEMA (home)
   ============================================================ */
function categoryStats(cat){
  let total=0, done=0, sumPct=0, hasUnlocked=false, pendingContent=false;
  cat.moduleIds.forEach(mid=>{
    const mod=MODULES[mid];
    if(!mod || isModuleLocked(mid)) return;
    hasUnlocked = true;
    if(mod.placeholder && !mod.levels.length && !_dynamicContentLoaded) pendingContent = true;
    mod.levels.forEach(l=>{
      total++;
      const p=state.progress[levelKey(mod.id,l.id)];
      if(p){ done++; sumPct+=pct(p.correct,p.total); }
    });
  });
  return {
    total, done,
    avg: done ? Math.round(sumPct/done) : 0,
    hasUnlocked, pendingContent,
    locked: !hasUnlocked || (total===0 && !pendingContent),
    completed: total>0 && done>=total,
    inProgress: done>0 && done<total
  };
}

function courseCard(cat){
  const s = categoryStats(cat);
  const kind = s.locked ? 'locked' : s.completed ? 'done' : s.inProgress ? 'progress' : 'default';
  const card = el(s.locked ? 'div' : 'button', 'course-card is-'+kind);
  if(!s.locked){ card.type = 'button'; }

  const head = el('div','course-head');
  head.appendChild(el('div','course-icon', cat.emoji || '📚'));
  if(s.locked) head.appendChild(badge('Próximamente','locked'));
  else if(s.pendingContent) head.appendChild(badge('Cargando…','progress'));
  else if(s.completed) head.appendChild(badge('Completado','done'));
  else if(s.inProgress) head.appendChild(badge('En curso','progress'));
  card.appendChild(head);

  card.appendChild(el('div','course-title', esc(cat.title)));
  card.appendChild(el('p','course-desc', esc(cat.subtitle)));

  if(s.locked){
    card.appendChild(el('p','course-desc','Este tema todavía no tiene actividades disponibles.'));
  } else if(s.pendingContent){
    card.appendChild(el('p','course-desc','Cargando actividades…'));
    card.onclick = ()=>{ state.currentCategory = cat.id; state.view = 'menu'; render(); };
  } else {
    card.appendChild(progressBar(s.done, s.total, { avg: s.avg }));
    card.onclick = ()=>{ state.currentCategory = cat.id; state.view = 'menu'; render(); };
  }
  return card;
}

function viewCategories(){
  const wrap = el('div','home');

  const head = el('div','home-head');
  head.appendChild(el('h1','','¿Qué quieres entrenar?'));
  head.appendChild(el('p','','Elige un tema para empezar tu entrenamiento.'));
  wrap.appendChild(head);

  const grid = el('div','course-grid');
  Object.values(CATEGORIES).forEach(cat=> grid.appendChild(courseCard(cat)));
  wrap.appendChild(grid);

  return wrap;
}

function moduleCard(mod, num){
  // módulo real con niveles (A/B): tarjeta con progreso
  if(!mod.placeholder){
    const total = mod.levels.length;
    let done = 0, sumPct = 0;
    mod.levels.forEach(l=>{ const p = state.progress[levelKey(mod.id, l.id)]; if(p){ done++; sumPct += pct(p.correct, p.total); } });
    const avg = done ? Math.round(sumPct / done) : 0;
    const kind = done >= total ? 'is-done' : done > 0 ? 'is-progress' : '';
    const timerT = state.timers[mod.id];
    const timeLabel = timerT && (timerT.elapsedSec > 0 || timerT.status !== 'not_started')
      ? '⏱ ' + formatHMS(currentElapsed(mod.id)) + (timerT.status === 'completed' ? ' · tiempo final' : '') : '';

    const card = el('button','mod-card' + (kind ? ' ' + kind : ''));
    card.type = 'button';
    const head = el('div','mod-head');
    head.appendChild(el('span','mod-num', esc(num)));
    head.appendChild(el('span','mod-title2', esc(mod.title)));
    card.appendChild(head);
    if(mod.subtitle) card.appendChild(el('p','mod-sub', esc(mod.subtitle)));
    card.appendChild(progressBar(done, total, { avg: avg }));
    if(timeLabel) card.appendChild(el('div','mod-meta', timeLabel));
    card.onclick = ()=>{ goToLevel(mod.id, firstIncompleteLevelIdx(mod)); };
    return card;
  }

  // módulo con sub-actividades (C–H)
  const subs = mod.subActivities || [];
  const anyReady = subs.some(s=> s.ready);
  const readyCount = subs.filter(s=> s.ready).length;
  const card = el('button','mod-card' + (anyReady ? ' is-ready' : ''));
  card.type = 'button';
  const head = el('div','mod-head');
  head.appendChild(el('span','mod-num', esc(num)));
  head.appendChild(el('span','mod-title2', esc(mod.title)));
  if(anyReady) head.appendChild(badge(readyCount + (readyCount === 1 ? ' actividad' : ' actividades'), 'progress'));
  card.appendChild(head);
  card.appendChild(el('p','mod-sub', anyReady
    ? 'Elige el tipo de actividad para practicar.'
    : 'Tu profesor irá habilitando las actividades de este módulo.'));
  card.onclick = ()=>{
    state.currentModule = mod.id;
    state.currentSubActivity = null;
    state._subMenuParent = null;
    state.view = (subs.length) ? 'moduleSubmenu' : 'comingSoon';
    render();
  };
  return card;
}

// Pantalla de espera mientras se descargan las preguntas del profesor.
function contentLoadingView(title, backLabel, backCb){
  const wrap = el('div','home');
  if(backCb) wrap.appendChild(backButton(backLabel || 'Volver', backCb));
  const head = el('div','home-head');
  head.appendChild(el('h1','', esc(title || 'Cargando…')));
  wrap.appendChild(head);
  const nc = el('div','notice-card');
  const failed = !_dynamicContentLoaded && !_dynamicContentPromise && state._triedContent;
  if(failed){
    nc.appendChild(el('div','n-eyebrow','Sin conexión'));
    nc.appendChild(el('h1','','No se pudieron cargar las actividades'));
    nc.appendChild(el('p','n-body','Revisa tu conexión e inténtalo de nuevo.'));
    const b = el('button','act-btn','↻ Reintentar');
    b.type = 'button';
    b.onclick = function(){ loadDynamicContent().then(function(){ render(); }); };
    nc.appendChild(b);
  }else{
    nc.appendChild(el('div','n-eyebrow','Un momento'));
    nc.appendChild(el('h1','','Cargando actividades'));
    nc.appendChild(el('p','n-body','Estamos descargando las preguntas. La primera vez toma unos segundos.'));
    loadDynamicContent().then(function(){ state._triedContent = true; render(); });
  }
  wrap.appendChild(nc);
  return wrap;
}

function viewMenu(){
  const cat = CATEGORIES[state.currentCategory];
  if(!cat){ state.view='categories'; return viewCategories(); }

  if(categoryStats(cat).pendingContent){
    return contentLoadingView(cat.title, 'Cambiar de tema', ()=>{ state.currentCategory=null; state.view='categories'; render(); });
  }

  const wrap = el('div','home');

  const head = el('div','home-head');
  head.appendChild(el('h1','', esc(cat.title)));
  head.appendChild(el('p','','Elige un módulo para entrenar. Tu avance se guarda automáticamente.'));
  wrap.appendChild(head);

  const unlocked = [], locked = [];
  cat.moduleIds.forEach((mid, idx)=>{
    const mod = MODULES[mid];
    if(!mod) return;
    const num = String(idx + 1).padStart(2, '0');
    (isModuleLocked(mid) ? locked : unlocked).push({ mod, mid, num });
  });

  if(unlocked.length){
    const list = el('div','mod-list');
    unlocked.forEach(({mod, num})=> list.appendChild(moduleCard(mod, num)));
    wrap.appendChild(list);
  }

  const bossPlayable = cat.moduleIds.some(mid=>{
    const m = MODULES[mid];
    return m && !isModuleLocked(mid) && m.levels.some(l=>l.type==='mc');
  });
  if(bossPlayable){
    const boss = el('button','boss-cta');
    boss.type = 'button';
    boss.innerHTML = '<span class="bc-title">🏆 Boss Battle</span>' +
      '<span class="bc-sub">Repaso cronometrado que mezcla las preguntas de los módulos de este tema.</span>';
    boss.onclick = startBoss;
    wrap.appendChild(boss);
  }

  if(locked.length){
    wrap.appendChild(el('div','menu-label','Aún no disponibles'));
    const list = el('div','mod-list');
    locked.forEach(({mod, num})=>{
      const card = el('div','mod-card is-locked');
      const hd = el('div','mod-head');
      hd.appendChild(el('span','mod-num','🔒'));
      hd.appendChild(el('span','mod-title2', esc(num + ' · ' + mod.title)));
      card.appendChild(hd);
      list.appendChild(card);
    });
    wrap.appendChild(list);
  }

  wrap.appendChild(resetZone());
  return wrap;
}

// Zona de reinicio de progreso (compartida por el panel del tema).
function resetZone(){
  const zone = el('div','reset-zone');
  if(!state._confirmingReset){
    const btn = el('button','reset-link','↻ Reiniciar mi progreso de todos los temas');
    btn.type = 'button';
    btn.onclick = ()=>{ state._confirmingReset = true; render(); };
    zone.appendChild(btn);
    return zone;
  }
  const box = el('div','reset-confirm');
  box.appendChild(el('p','',
    '¿Seguro que quieres borrar <b>todo</b> tu progreso (' + esc(state.student.name) +
    ', código ' + esc(state.student.code) + ') y empezar de nuevo? Esta acción no se puede deshacer.'));
  const row = el('div','row');
  const yes = el('button','act-btn danger','Sí, borrar y empezar de nuevo');
  yes.type = 'button';
  yes.onclick = ()=>{ state._confirmingReset = false; resetProfile(); };
  const no = el('button','act-btn is-ghost','Cancelar');
  no.type = 'button';
  no.onclick = ()=>{ state._confirmingReset = false; render(); };
  row.appendChild(yes); row.appendChild(no);
  box.appendChild(row);
  zone.appendChild(box);
  return zone;
}

function viewModuleSubmenu(){
  const mod = MODULES[state.currentModule];
  if(mod && mod.placeholder && !mod.levels.length && !_dynamicContentLoaded){
    return contentLoadingView(mod.title, 'Volver al panel', ()=>{ state.view='menu'; render(); });
  }
  const wrap = el('div','home');

  // Sub-menú de 2 niveles: un sub-botón puede declarar `children` (p. ej.
  // Histología/Fisiología en el módulo H) — al tocarlo se entra a ver sus
  // hijos (Actividades varias / Selección múltiple) en vez de un nivel.
  // `state._subMenuParent` guarda el id del padre elegido, o null en la
  // vista de arriba de todo.
  const topSubs = (mod && mod.subActivities) || [];
  const parent = state._subMenuParent ? topSubs.find(s=> s.id === state._subMenuParent) : null;
  const subs = parent ? (parent.children || []) : topSubs;

  wrap.appendChild(backButton(parent ? 'Volver a ' + mod.title : 'Volver al panel', ()=>{
    if(parent){ state._subMenuParent = null; } else { state.view='menu'; }
    render();
  }));

  const head = el('div','home-head');
  head.appendChild(el('h1','', esc(parent ? parent.title : (mod ? mod.title : 'Actividad'))));
  head.appendChild(el('p','','Elige el tipo de actividad. Tu profesor las habilita una por una.'));
  wrap.appendChild(head);

  const regular = subs.filter(s=> !s.standalone);
  const standalone = subs.filter(s=> s.standalone);

  function subCard(sub){
    if(sub.children && sub.children.length){
      // Botón padre: agrega el progreso de TODOS sus hijos (sin filtrar
      // por `kind`) y, al tocarlo, entra a la lista de hijos.
      const childLevels = mod.levels.filter(l=> l.group === sub.group);
      let doneCount = 0, sumPct = 0;
      childLevels.forEach(l=>{
        const p = state.progress[levelKey(mod.id, l.id)];
        if(p){ doneCount++; sumPct += pct(p.correct, p.total); }
      });
      const totalCount = childLevels.length;
      const avg = doneCount ? Math.round(sumPct/doneCount) : 0;
      const allDone = totalCount>0 && doneCount>=totalCount;
      const kind = allDone ? 'is-done' : doneCount>0 ? 'is-progress' : 'is-ready';
      const card = el('button','mod-card ' + kind);
      card.type = 'button';
      const hd = el('div','mod-head');
      hd.appendChild(el('span','mod-num', esc(sub.icon || '•')));
      hd.appendChild(el('span','mod-title2', esc(sub.title)));
      hd.appendChild(badge(doneCount+'/'+totalCount+' actividades', allDone ? 'done' : 'progress'));
      card.appendChild(hd);
      card.appendChild(progressBar(doneCount, totalCount, { unit:'actividades', avg: avg }));
      card.onclick = ()=>{ state._subMenuParent = sub.id; render(); };
      return card;
    }
    const grouped = mod.groupedActivities;
    // Si el sub-botón declara `group` y/o `kind`, sus chips/progreso se
    // limitan a los niveles que compartan esos mismos campos (p. ej.
    // Histología vs. Fisiología, y dentro de cada una, actividades
    // "diversas" vs. de "selección múltiple y completar" en el módulo H);
    // el campo que no se declare no filtra (abarca todos los valores).
    const groupLevels = grouped ? mod.levels.filter(l=>
      (sub.group == null || l.group === sub.group) &&
      (sub.kind == null || l.kind === sub.kind)
    ) : null;
    let doneInfo = null, doneCount = 0, totalCount = 0, avg = 0;
    if(grouped){
      totalCount = groupLevels.length;
      let sumPct = 0;
      groupLevels.forEach(l=>{
        const p = state.progress[levelKey(mod.id, l.id)];
        if(p){ doneCount++; sumPct += pct(p.correct, p.total); }
      });
      avg = doneCount ? Math.round(sumPct/doneCount) : 0;
    } else {
      doneInfo = state.progress[levelKey(mod.id, sub.id)];
    }
    const allDone = grouped ? (totalCount>0 && doneCount>=totalCount) : !!doneInfo;
    const kind = !sub.ready ? 'is-soon' : allDone ? 'is-done' : (grouped && doneCount>0) ? 'is-progress' : 'is-ready';
    const card = el('button','mod-card ' + kind);
    card.type = 'button';
    const hd = el('div','mod-head');
    hd.appendChild(el('span','mod-num', esc(sub.icon || '•')));
    hd.appendChild(el('span','mod-title2', esc(sub.title)));
    if(!sub.ready) hd.appendChild(badge('Próximamente','locked'));
    else if(grouped) hd.appendChild(badge(doneCount+'/'+totalCount+' actividades', allDone ? 'done' : 'progress'));
    else if(doneInfo) hd.appendChild(badge('Completado','done'));
    else hd.appendChild(badge('Disponible','progress'));
    card.appendChild(hd);
    if(grouped){
      card.appendChild(progressBar(doneCount, totalCount, { unit:'actividades', avg: avg }));
    } else if(sub.ready && doneInfo){
      card.appendChild(el('div','mod-meta','✓ ' + pct(doneInfo.correct, doneInfo.total) + '% en tu último intento'));
    } else if(!sub.ready){
      card.appendChild(el('p','mod-sub','Todavía no tiene contenido cargado.'));
    }
    card.onclick = ()=>{
      if(sub.ready){
        if(grouped){
          let gi = groupLevels.findIndex(l=> !state.progress[levelKey(mod.id, l.id)]);
          if(gi === -1) gi = 0;
          goToLevel(mod.id, mod.levels.indexOf(groupLevels[gi]));
          return;
        }
        const idx = mod.levels.findIndex(l=> l.id === sub.id);
        if(idx >= 0){ goToLevel(mod.id, idx); return; }
      }
      state.currentSubActivity = sub.id;
      state.view = 'comingSoon';
      render();
    };
    return card;
  }

  if(regular.length){
    const list = el('div','mod-list');
    regular.forEach(sub=> list.appendChild(subCard(sub)));
    wrap.appendChild(list);
  }
  if(standalone.length){
    wrap.appendChild(el('div','menu-label','Repaso'));
    const list = el('div','mod-list');
    standalone.forEach(sub=> list.appendChild(subCard(sub)));
    wrap.appendChild(list);
  }

  return wrap;
}

function viewComingSoon(){
  const mod = MODULES[state.currentModule];
  const sub = mod && mod.subActivities ? mod.subActivities.find(s=>s.id===state.currentSubActivity) : null;
  const backTarget = (mod && mod.subActivities && mod.subActivities.length) ? 'moduleSubmenu' : 'menu';
  const backLabel = backTarget === 'moduleSubmenu' ? 'Volver a las actividades' : 'Volver al panel';

  const wrap = el('div','home');
  wrap.appendChild(backButton(backLabel, ()=>{ state.view = backTarget; render(); }));

  const card = el('div','notice-card');
  card.appendChild(el('div','n-eyebrow','Pendiente de configuración'));
  card.appendChild(el('h1','', sub ? esc(sub.title) : (mod ? esc(mod.title) : 'Actividad')));
  if(sub && mod) card.appendChild(el('p','n-sub', esc(mod.title)));
  card.appendChild(el('p','n-body','Esta actividad todavía no tiene contenido cargado. Tu profesor la habilitará próximamente — vuelve a intentarlo más adelante.'));
  const btn = el('button','act-btn', backLabel);
  btn.type = 'button';
  btn.onclick = ()=>{ state.view = backTarget; render(); };
  card.appendChild(btn);

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
  state.view = level.type; // 'sort' | 'match' | 'mc' | 'completar'
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
   ACTIVITY LAYOUT — contenedor común para todas las actividades
   Devuelve { root, content, actions, feedback }.
   Cada view* solo llena content/actions; header, progreso,
   feedback y acciones comparten estructura y estilos.
   ============================================================ */
const ACTIVITY_TYPE_LABEL = {
  mc:'Selección múltiple',
  completar:'Preguntas de completar',
  sort:'Clasificar',
  match:'Relacionar',
  truefalse:'Verdadero o falso',
  label:'Identificar estructuras',
  hotspot:'Señala la estructura',
  imgLabel:'Señalar estructuras',
  mcMulti:'Varias respuestas correctas',
  sequence:'Ordenar en secuencia'
};

function beginActivity(opts){
  const mod = opts.mod, level = opts.level, idx = opts.idx;
  const root = el('div','act');

  const back = el('button','act-back','← Volver al panel');
  back.type = 'button';
  back.onclick = opts.backTo || (()=>{ state.view = levelBackTarget(); render(); });
  root.appendChild(back);

  const card = el('div','act-card');
  root.appendChild(card);

  const head = el('div','act-head');

  const topline = el('div','act-topline');
  topline.appendChild(el('span','act-topic', esc(String(mod.title).toUpperCase())));
  const t = ensureTimer(mod.id);
  const timer = el('span','act-timer'+(t.status==='completed'?' is-done':''));
  timer.id = 'liveTimerBadge';
  timer.textContent = (t.status==='completed'?'✓ ':'⏱ ') + formatClock(currentElapsed(mod.id));
  topline.appendChild(timer);
  head.appendChild(topline);

  // "multi": módulos con progresión real de niveles (A/B, y H por ser
  // groupedActivities). Los módulos con sub-actividades sueltas (C–G) tratan
  // cada nivel como una actividad independiente. Si el nivel actual tiene
  // `group`/`kind` (p. ej. H separa Histología/Fisiología, y dentro de cada
  // una, diversas vs. selección múltiple), los chips se limitan a los
  // niveles que compartan esos mismos campos con el nivel actual.
  const multi = mod.levels.length > 1 && (!mod.subActivities || mod.groupedActivities);
  const groupLevels = multi ? mod.levels.filter(l=>
    l.group === level.group && l.kind === level.kind
  ) : null;
  const groupIdx = multi ? groupLevels.indexOf(level) : idx;
  head.appendChild(el('div','act-type',
    multi ? ('Nivel '+(groupIdx+1)+' · '+esc(level.title))
          : esc(ACTIVITY_TYPE_LABEL[level.type] || level.title || 'Actividad')));

  if(multi){
    const chips = el('div','act-levels');
    groupLevels.forEach((l,gi)=>{
      const i = mod.levels.indexOf(l);
      const done = !!state.progress[levelKey(mod.id, l.id)];
      const b = el('button', (done && i!==idx) ? 'done' : '', String(gi+1));
      b.type = 'button';
      b.title = l.title;
      if(i===idx){ b.setAttribute('aria-current','true'); b.disabled = true; }
      else { b.onclick = ()=> goToLevel(mod.id, i); }
      chips.appendChild(b);
    });
    head.appendChild(chips);
  }

  if(opts.progress){
    const frac = Math.max(0, Math.min(1, opts.progress.frac || 0));
    const pr = el('div','act-progress');
    const row = el('div','act-progress-row');
    row.appendChild(el('span','', esc(opts.progress.label || '')));
    row.appendChild(el('span','', Math.round(frac*100)+'%'));
    pr.appendChild(row);
    pr.appendChild(el('div','act-bar','<i style="width:'+Math.round(frac*100)+'%"></i>'));
    head.appendChild(pr);
  }
  card.appendChild(head);

  const body = el('div','act-body');
  card.appendChild(body);

  if(t.status === 'completed'){
    body.appendChild(el('div','act-note','🔓 Ya completaste esta actividad — puedes practicar libremente; el tiempo ya no cuenta.'));
  }

  const fb = el('div','act-feedback');
  fb.hidden = true;
  card.appendChild(fb);

  const actions = el('div','act-actions');
  card.appendChild(actions);

  return {
    root: root,
    content: body,
    actions: actions,
    feedback: function(o){
      if(!o){ fb.hidden = true; fb.innerHTML = ''; return; }
      fb.hidden = false;
      fb.className = 'act-feedback ' + (o.ok ? 'is-correct' : 'is-wrong');
      fb.innerHTML =
        '<span class="fx">'+(o.ok?'✓':'✕')+'</span>'+
        '<div><div class="ft">'+esc(o.title || (o.ok ? '¡Correcto!' : 'No es correcto'))+'</div>'+
        (o.body ? '<div class="fb">'+o.body+'</div>' : '')+
        '</div>';
    }
  };
}

/* ============================================================
   VISTA: NIVEL DE ORDENAMIENTO (SORT)
   ============================================================ */
function viewSort(){
  const mod=MODULES[state.currentModule];
  const level=mod.levels[state.currentLevelIdx];
  const idx=state.currentLevelIdx;

  if(!state._levelRuntime){
    state._levelRuntime = { remaining: shuffle(level.items), placed:{}, correct:0, wrong:0, selectedChip:null };
    level.buckets.forEach(b=> state._levelRuntime.placed[b.key]=[]);
  }
  const rt = state._levelRuntime;
  const totalItems = level.items.length;
  const done = totalItems - rt.remaining.length;

  const A = beginActivity({ mod:mod, level:level, idx:idx,
    progress:{ label: done+' de '+totalItems+' clasificadas', frac: done/totalItems } });

  if(level.instructions){ A.content.appendChild(el('p','act-instr', esc(level.instructions))); }

  const bank=el('div','sort-bank');
  rt.remaining.forEach((item, i)=>{
    const chip=el('div','chip', esc(item.term));
    chip.dataset.idx=i;
    attachChipInteractions(chip, item, level, rt, mod);
    bank.appendChild(chip);
  });
  if(rt.remaining.length===0){ bank.appendChild(el('div','sort-bank-empty','✓ Todo clasificado')); }
  A.content.appendChild(bank);

  const bucketsWrap=el('div','sort-buckets');
  level.buckets.forEach(b=>{
    const bucketEl=el('div','bucket');
    bucketEl.dataset.cat=b.key;
    bucketEl.appendChild(el('span','blabel', esc(b.label)));
    const placedWrap=el('div','placed');
    (rt.placed[b.key]||[]).forEach(term=>{
      placedWrap.appendChild(el('div','chip is-placed', esc(term)));
    });
    bucketEl.appendChild(placedWrap);
    bucketEl.appendChild(el('div','scanflash'));
    attachBucketDropTarget(bucketEl, b, level, rt, mod);
    bucketsWrap.appendChild(bucketEl);
  });
  A.content.appendChild(bucketsWrap);

  if(rt.wrong>0){
    A.feedback({ ok:false, title:'Sigue intentando',
      body: '<b>'+rt.wrong+'</b> '+(rt.wrong===1?'ubicación incorrecta':'ubicaciones incorrectas')+' hasta ahora.' });
  }
  return A.root;
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
  const idx=state.currentLevelIdx;

  if(!state._levelRuntime){
    const terms = level.pairs.map((p,i)=>({text:p[0], pairId:i}));
    const defs = level.pairs.map((p,i)=>({text:p[1], pairId:i}));
    state._levelRuntime = {
      terms: shuffle(terms), defs: shuffle(defs),
      matched:new Set(), selectedTerm:null, selectedDef:null, wrong:0
    };
  }
  const rt = state._levelRuntime;
  const totalPairs = level.pairs.length;

  const A = beginActivity({ mod:mod, level:level, idx:idx,
    progress:{ label: rt.matched.size+' de '+totalPairs+' emparejados', frac: rt.matched.size/totalPairs } });

  if(level.instructions){ A.content.appendChild(el('p','act-instr', esc(level.instructions))); }

  const grid=el('div','match-grid');
  const colA=el('div','match-col');
  rt.terms.forEach(tm=>{
    const isMatched = rt.matched.has(tm.pairId);
    const btn=el('button','match-item is-term'+(isMatched?' is-matched':'')+(rt.selectedTerm===tm?' is-selected':''), esc(tm.text));
    btn.type='button';
    btn.disabled=isMatched;
    btn.onclick=()=>{ rt.selectedTerm=tm; afterMatchInteraction(rt, level, mod); };
    colA.appendChild(btn);
  });
  const colB=el('div','match-col');
  rt.defs.forEach(d=>{
    const isMatched = rt.matched.has(d.pairId);
    const btn=el('button','match-item'+(isMatched?' is-matched':'')+(rt.selectedDef===d?' is-selected':''), esc(d.text));
    btn.type='button';
    btn.disabled=isMatched;
    btn.onclick=()=>{ rt.selectedDef=d; afterMatchInteraction(rt, level, mod); };
    colB.appendChild(btn);
  });
  grid.appendChild(colA); grid.appendChild(colB);
  A.content.appendChild(grid);

  if(rt.wrong>0){
    A.feedback({ ok:false, title:'Sigue intentando',
      body: '<b>'+rt.wrong+'</b> '+(rt.wrong===1?'intento fallido':'intentos fallidos')+'.' });
  }
  return A.root;
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
  const idx=state.currentLevelIdx;

  if(!state._levelRuntime){
    // Reanuda el avance parcial si lo hay; si no, nuevo intento
    // (baraja el orden de las preguntas y el de las opciones de cada una).
    state._levelRuntime = loadResume(mod.id, level.id, 'mc', level) || {
      qIdx:0, correct:0, answered:false, selected:null, pending:null,
      qOrder: shuffle(level.questions.map((_,i)=>i)),
      optOrder: level.questions.map(qq=> shuffle(qq.opts.map((_,i)=>i)))
    };
  }
  const rt = state._levelRuntime;
  const qi = rt.qOrder[rt.qIdx];
  const q = level.questions[qi];
  const perm = rt.optOrder[qi]; // índices originales, en el orden barajado a mostrar
  const total = level.questions.length;

  const A = beginActivity({ mod:mod, level:level, idx:idx,
    progress:{ label:'Pregunta '+(rt.qIdx+1)+' de '+total,
               frac:(rt.qIdx + (rt.answered?1:0)) / total } });

  A.content.appendChild(el('p','act-prompt', esc(q.q)));

  const isTF = q.opts.length === 2;
  const optsWrap = el('div','act-options '+(isTF ? 'tf' : (q.opts.length>2 ? 'cols-2' : '')));
  perm.forEach((origIdx, displayIdx)=>{
    const btn = el('button','opt2');
    btn.type = 'button';
    btn.innerHTML = (isTF ? '' : '<span class="k">'+(OPTION_LETTERS[displayIdx]||(displayIdx+1))+'</span>')
      + '<span class="t">'+esc(q.opts[origIdx])+'</span>';
    if(rt.answered){
      btn.disabled = true;
      if(origIdx===q.correct) btn.classList.add('is-correct');
      else if(origIdx===rt.selected) btn.classList.add('is-wrong');
    } else if(rt.pending===origIdx){
      btn.classList.add('is-selected');
      btn.setAttribute('aria-pressed','true');
    }
    if(!rt.answered){
      btn.onclick = ()=>{ rt.pending = origIdx; render(); };
    }
    optsWrap.appendChild(btn);
  });
  A.content.appendChild(optsWrap);

  appendDoubtControl(A, { mod:mod, level:level, origQIdx:qi, qText:q.q });

  const last = rt.qIdx+1 >= total;
  const mainBtn = el('button','act-btn',
    rt.answered ? (last ? 'Finalizar actividad →' : 'Continuar →') : 'Comprobar respuesta →');
  if(!rt.answered){
    mainBtn.disabled = (rt.pending===null);
    mainBtn.onclick = ()=>{
      if(rt.pending===null) return;
      rt.selected = rt.pending;
      rt.answered = true;
      if(rt.selected===q.correct) rt.correct++;
      render();
    };
  } else {
    mainBtn.onclick = ()=>{
      if(last){ finishLevel(mod.id, level.id, rt.correct, total); }
      else {
        rt.qIdx++; rt.answered=false; rt.selected=null; rt.pending=null;
        saveResume(mod.id, level.id, 'mc', rt);
        render();
      }
    };
  }
  A.actions.appendChild(mainBtn);
  appendResetControl(A, mod, level, rt, rt.qIdx > 0 || rt.answered);

  if(rt.answered){
    const ok = rt.selected===q.correct;
    A.feedback({ ok:ok, body: q.explain ? esc(q.explain) : (ok ? 'Respuesta correcta.' : '') });
  }

  return A.root;
}

/* ============================================================
   VISTA: SELECCIÓN MÚLTIPLE DE VARIAS RESPUESTAS (mcMulti)
   El estudiante marca TODAS las opciones que crea correctas.
   Puntaje parcial por pregunta: (aciertos − errores) / total de
   opciones correctas, sin bajar de 0 — para no premiar marcarlas todas.
   ============================================================ */
function viewMcMulti(){
  const mod=MODULES[state.currentModule];
  const level=mod.levels[state.currentLevelIdx];
  const idx=state.currentLevelIdx;

  if(!state._levelRuntime){
    state._levelRuntime = loadResume(mod.id, level.id, 'mcMulti', level) || {
      qIdx:0, correctSum:0, answered:false, selected:[], lastScore:0,
      qOrder: shuffle(level.questions.map((_,i)=>i)),
      optOrder: level.questions.map(qq=> shuffle(qq.opts.map((_,i)=>i)))
    };
  }
  const rt = state._levelRuntime;
  const qi = rt.qOrder[rt.qIdx];
  const q = level.questions[qi];
  const perm = rt.optOrder[qi];
  const total = level.questions.length;

  const A = beginActivity({ mod:mod, level:level, idx:idx,
    progress:{ label:'Pregunta '+(rt.qIdx+1)+' de '+total,
               frac:(rt.qIdx + (rt.answered?1:0)) / total } });

  if(level.instructions){ A.content.appendChild(el('p','act-instr', esc(level.instructions))); }
  A.content.appendChild(el('p','act-prompt', esc(q.q)));
  A.content.appendChild(el('p','act-instr','Marca todas las que apliquen.'));

  const optsWrap = el('div','act-options cols-2');
  perm.forEach((origIdx, displayIdx)=>{
    const isCorrect = q.correct.indexOf(origIdx) !== -1;
    const isSelected = rt.selected.indexOf(origIdx) !== -1;
    const btn = el('button','opt2');
    btn.type = 'button';
    btn.innerHTML = '<span class="k">'+(OPTION_LETTERS[displayIdx]||(displayIdx+1))+'</span><span class="t">'+esc(q.opts[origIdx])+'</span>';
    if(rt.answered){
      btn.disabled = true;
      if(isCorrect && isSelected) btn.classList.add('is-correct');
      else if(isCorrect && !isSelected) btn.classList.add('is-missed');
      else if(!isCorrect && isSelected) btn.classList.add('is-wrong');
    } else {
      if(isSelected){ btn.classList.add('is-selected'); btn.setAttribute('aria-pressed','true'); }
      btn.onclick = ()=>{
        const i = rt.selected.indexOf(origIdx);
        if(i===-1) rt.selected.push(origIdx); else rt.selected.splice(i,1);
        render();
      };
    }
    optsWrap.appendChild(btn);
  });
  A.content.appendChild(optsWrap);

  appendDoubtControl(A, { mod:mod, level:level, origQIdx:qi, qText:q.q });

  const last = rt.qIdx+1 >= total;
  const mainBtn = el('button','act-btn',
    rt.answered ? (last ? 'Finalizar actividad →' : 'Continuar →') : 'Comprobar respuesta →');
  if(!rt.answered){
    mainBtn.disabled = rt.selected.length===0;
    mainBtn.onclick = ()=>{
      if(rt.selected.length===0) return;
      const tp = rt.selected.filter(i=> q.correct.indexOf(i)!==-1).length;
      const fp = rt.selected.length - tp;
      const score = Math.max(0, (tp - fp) / q.correct.length);
      rt.correctSum += score;
      rt.lastScore = score;
      rt.answered = true;
      render();
    };
  } else {
    mainBtn.onclick = ()=>{
      if(last){ finishLevel(mod.id, level.id, Math.round(rt.correctSum*10)/10, total); }
      else {
        rt.qIdx++; rt.answered=false; rt.selected=[];
        saveResume(mod.id, level.id, 'mcMulti', rt);
        render();
      }
    };
  }
  A.actions.appendChild(mainBtn);
  appendResetControl(A, mod, level, rt, rt.qIdx > 0 || rt.answered);

  if(rt.answered){
    const pct100 = Math.round((rt.lastScore||0)*100);
    const ok = pct100 === 100;
    let body = '<b>'+pct100+'%</b> de esta pregunta' + (pct100<100 ? ' (se resta por cada opción incorrecta marcada)' : '') + '.';
    if(q.explain) body += '<br>' + esc(q.explain);
    A.feedback({ ok: ok, title: ok ? '¡Correcto!' : (pct100>0 ? 'Parcialmente correcto' : 'No es correcto'), body: body });
  }

  return A.root;
}

/* ============================================================
   VISTA: ORDENAR EN SECUENCIA (sequence)
   El estudiante arrastra (o usa ▲▼) los pasos hasta ordenarlos.
   Puntaje parcial: pasos en la posición correcta / total de pasos.
   ============================================================ */
function viewSequence(){
  const mod=MODULES[state.currentModule];
  const level=mod.levels[state.currentLevelIdx];
  const idx=state.currentLevelIdx;
  const steps = level.steps;
  const total = steps.length;

  if(!state._levelRuntime){
    state._levelRuntime = loadResume(mod.id, level.id, 'sequence', level) || {
      order: shuffle(steps.map((_,i)=>i)), answered:false, score:0, touched:false
    };
  }
  const rt = state._levelRuntime;

  const A = beginActivity({ mod:mod, level:level, idx:idx,
    progress:{ label: rt.answered ? 'Comprobado' : 'Ordena los pasos', frac: rt.answered ? 1 : 0 } });

  if(level.instructions){ A.content.appendChild(el('p','act-instr', esc(level.instructions))); }

  const list = el('div','seq-list');
  function renderItems(){
    list.innerHTML = '';
    rt.order.forEach(function(stepIdx, pos){
      const step = steps[stepIdx];
      const isRight = stepIdx === pos;
      const item = el('div','seq-item' + (rt.answered ? (isRight ? ' is-correct' : ' is-wrong') : ''));
      item.dataset.step = stepIdx;
      item._stepIdx = stepIdx;
      item.appendChild(el('span','seq-num', String(pos+1)));
      if(!rt.answered) item.appendChild(el('span','seq-handle','⠿'));
      const body = el('div','seq-body');
      body.appendChild(el('div','seq-title', esc(step.title)));
      if(step.text) body.appendChild(el('div','seq-text', esc(step.text)));
      item.appendChild(body);
      if(!rt.answered){
        const arrows = el('div','seq-arrows');
        const up = el('button','seq-arrow','▲'); up.type='button'; up.disabled = pos===0;
        up.onclick = ()=>{ if(pos>0){ const o=rt.order; [o[pos-1],o[pos]]=[o[pos],o[pos-1]]; rt.touched=true; saveResume(mod.id, level.id, 'sequence', rt); render(); } };
        const down = el('button','seq-arrow','▼'); down.type='button'; down.disabled = pos===total-1;
        down.onclick = ()=>{ if(pos<total-1){ const o=rt.order; [o[pos+1],o[pos]]=[o[pos],o[pos+1]]; rt.touched=true; saveResume(mod.id, level.id, 'sequence', rt); render(); } };
        arrows.appendChild(up); arrows.appendChild(down);
        item.appendChild(arrows);
        attachSeqDrag(item, rt, level, mod, list);
      } else if(!isRight){
        item.appendChild(el('div','seq-correctpos', 'Va en el puesto ' + (stepIdx+1)));
      }
      list.appendChild(item);
    });
  }
  renderItems();
  A.content.appendChild(list);

  const mainBtn = el('button','act-btn', rt.answered ? 'Finalizar actividad →' : 'Comprobar orden →');
  mainBtn.type = 'button';
  if(!rt.answered){
    mainBtn.onclick = ()=>{
      let right = 0;
      rt.order.forEach(function(stepIdx, pos){ if(stepIdx===pos) right++; });
      rt.score = right / total;
      rt.answered = true;
      render();
    };
  } else {
    mainBtn.onclick = ()=>{
      finishLevel(mod.id, level.id, Math.round(rt.score*10)/10, 1);
    };
  }
  A.actions.appendChild(mainBtn);
  appendResetControl(A, mod, level, rt, rt.touched || rt.answered);

  if(rt.answered){
    const pct100 = Math.round(rt.score*100);
    let body = '<b>'+pct100+'%</b> en la posición correcta.';
    if(level.noteAfterCheck) body += '<br>' + esc(level.noteAfterCheck);
    A.feedback({ ok: pct100===100, title: pct100===100 ? '¡Orden correcto!' : 'Revisa el orden correcto arriba', body: body });
  }

  return A.root;
}

function attachSeqDrag(itemEl, rt, level, mod, container){
  let startY=0, origRect=null, dragging=false;
  itemEl.addEventListener('pointerdown', (e)=>{
    if(e.target.closest('.seq-arrows')) return;
    itemEl.setPointerCapture(e.pointerId);
    startY = e.clientY;
    origRect = itemEl.getBoundingClientRect();
    dragging = false;
  });
  itemEl.addEventListener('pointermove', (e)=>{
    if(origRect===null) return;
    const dy = e.clientY - startY;
    if(!dragging && Math.abs(dy) > 6){
      dragging = true;
      itemEl.classList.add('dragging');
      itemEl.style.width = origRect.width + 'px';
      itemEl.style.left = origRect.left + 'px';
    }
    if(dragging){
      itemEl.style.top = (origRect.top + dy) + 'px';
      const stepIdx = itemEl._stepIdx;
      const siblings = Array.from(container.querySelectorAll('.seq-item')).filter(function(el2){ return el2!==itemEl; });
      const curCenterY = origRect.top + dy + origRect.height/2;
      let targetIndex = siblings.length;
      for(let i=0;i<siblings.length;i++){
        const r = siblings[i].getBoundingClientRect();
        if(curCenterY < r.top + r.height/2){ targetIndex = i; break; }
      }
      const curIdx = rt.order.indexOf(stepIdx);
      if(curIdx !== -1){
        rt.order.splice(curIdx,1);
        rt.order.splice(targetIndex,0,stepIdx);
      }
      rt.order.forEach(function(si){
        if(si===stepIdx) return;
        const el2 = container.querySelector('.seq-item[data-step="'+si+'"]');
        if(el2) container.appendChild(el2);
      });
      container.appendChild(itemEl);
      const items = Array.from(container.querySelectorAll('.seq-item'));
      items.forEach(function(el2, i){
        const numEl = el2.querySelector('.seq-num');
        if(numEl) numEl.textContent = String(i+1);
      });
    }
  });
  itemEl.addEventListener('pointerup', ()=>{
    if(dragging){
      itemEl.classList.remove('dragging');
      itemEl.style.top=''; itemEl.style.left=''; itemEl.style.width='';
      rt.touched = true;
      saveResume(mod.id, level.id, 'sequence', rt);
      render();
    }
    dragging = false; origRect = null;
  });
}

// Botón discreto "reiniciar" al final de una actividad por preguntas;
// aparece sólo cuando hay avance que reiniciar. Doble toque para confirmar.
function appendResetControl(A, mod, level, rt, hasProgress){
  if(!hasProgress) return;
  const btn = el('button','act-reset','↻ Reiniciar y empezar de nuevo');
  btn.type = 'button';
  btn.onclick = ()=>{
    if(btn._armed){
      clearResume(mod.id, level.id);
      state._levelRuntime = null;
      render();
      return;
    }
    btn._armed = true;
    btn.textContent = 'Toca otra vez para reiniciar el avance';
    btn.classList.add('is-armed');
    setTimeout(()=>{ btn._armed = false; btn.textContent = '↻ Reiniciar y empezar de nuevo'; btn.classList.remove('is-armed'); }, 3500);
  };
  A.actions.appendChild(btn);
}

/* ============================================================
   VISTA: NIVEL DE COMPLETAR (FILL)
   El estudiante escribe la respuesta. La comparación ignora
   mayúsculas, tildes, puntuación y las conjunciones "y"/"e".
   ============================================================ */
function normFill(s){
  return String(s==null?'':s)
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'')  // quita tildes/dieresis
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g,' ')                      // quita puntuación
    .split(/\s+/).filter(w=> w && w!=='y' && w!=='e') // quita conjunciones sueltas
    .join(' ')
    .trim();
}
function fillMatches(typed, q){
  const t = normFill(typed);
  if(!t) return false;
  return (q.answers||[]).some(a=> normFill(a) === t);
}

/* ============================================================
   CORRECCIÓN PARA "SEÑALAR ESTRUCTURAS" (imgLabel)
   Igual de tolerante que normFill (sin tildes ni mayúsculas),
   pero además avisa cuando la única diferencia es una tilde:
   sigue contando como correcta, con una nota aclaratoria.
   ============================================================ */
function normLabel(s){
  return String(s==null?'':s)
    .normalize('NFD').replace(/[̀-ͯ]/g,'')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g,' ')
    .replace(/\s+/g,' ')
    .trim();
}
function describeAccentDiff(typedLower, ansLower){
  const wt = typedLower.split(' '), wa = ansLower.split(' ');
  const parts = [];
  for(let i=0;i<wa.length;i++){
    if(wt[i] !== wa[i]) parts.push('"'+wa[i]+'"');
  }
  return parts.length ? ('Recuerda escribir con tilde: ' + parts.join(', ') + '.') : null;
}
// Distancia de edición (Levenshtein) simple, para tolerar una letra de
// más/menos/cambiada (errores de tipeo reales, no solo tildes).
function levenshtein(a, b){
  const m = a.length, n = b.length;
  if(!m) return n; if(!n) return m;
  const dp = new Array(n+1);
  for(let j=0;j<=n;j++) dp[j]=j;
  for(let i=1;i<=m;i++){
    let prev = dp[0]; dp[0]=i;
    for(let j=1;j<=n;j++){
      const tmp = dp[j];
      dp[j] = a[i-1]===b[j-1] ? prev : 1+Math.min(prev, dp[j], dp[j-1]);
      prev = tmp;
    }
  }
  return dp[n];
}
function checkLabelAnswer(typed, answers){
  const t = normLabel(typed);
  if(!t) return null;
  const list = answers || [];
  for(const ans of list){
    if(normLabel(ans) === t){
      const typedLower = String(typed).trim().toLowerCase().replace(/\s+/g,' ');
      const ansLower = String(ans).trim().toLowerCase();
      if(typedLower === ansLower) return { correct:true, accentNote:null, correctAnswer:ans };
      return { correct:true, accentNote: describeAccentDiff(typedLower, ansLower), correctAnswer: ans };
    }
  }
  // Sin coincidencia exacta (ni ignorando tildes): admite una sola letra de
  // diferencia en respuestas suficientemente largas, para no penalizar un
  // error de tipeo real. Muestra la ortografía correcta de todas formas.
  let best = null;
  for(const ans of list){
    const na = normLabel(ans);
    if(na.length < 5) continue;
    const dist = levenshtein(t, na);
    if(dist === 1 && (!best || dist < best.dist)) best = { ans, dist };
  }
  if(best){
    return { correct:true, accentNote: 'Revisa la ortografía: se escribe "' + best.ans + '".', correctAnswer: best.ans };
  }
  return { correct:false, accentNote:null, correctAnswer: (list && list[0]) || '' };
}

function viewFill(){
  const mod=MODULES[state.currentModule];
  const level=mod.levels[state.currentLevelIdx];
  const idx=state.currentLevelIdx;

  if(!state._levelRuntime){
    state._levelRuntime = loadResume(mod.id, level.id, 'completar', level) || {
      qIdx:0, correct:0, answered:false, wasCorrect:false, typed:[],
      qOrder: shuffle(level.questions.map((_,i)=>i))
    };
  }
  const rt = state._levelRuntime;
  const q = level.questions[rt.qOrder[rt.qIdx]];
  const total = level.questions.length;
  if(!Array.isArray(rt.typed)) rt.typed = [];

  const A = beginActivity({ mod:mod, level:level, idx:idx,
    progress:{ label:'Pregunta '+(rt.qIdx+1)+' de '+total,
               frac:(rt.qIdx + (rt.answered?1:0)) / total } });
  const card = A.content;
  if(level.instructions){ card.appendChild(el('p','act-instr', esc(level.instructions))); }

  // --- enunciado con el/los huecos convertidos en campos de texto en línea ---
  const stateCls = rt.answered ? (rt.wasCorrect ? ' ok' : ' bad') : '';
  const parts = String(q.q).split(/_{2,}/);
  const blanks = Math.max(1, parts.length - 1);
  const inputs = [];

  function fitInline(inp, base){ inp.size = Math.max(base, (inp.value||'').length + 2); }
  function makeInput(i, base){
    const inp = document.createElement('input');
    inp.type = 'text';
    inp.className = 'fillinline' + stateCls;
    inp.value = rt.typed[i] || '';
    inp.disabled = rt.answered;
    inp.setAttribute('aria-label', 'Respuesta '+(i+1));
    fitInline(inp, base);
    if(!rt.answered){
      inp.addEventListener('input', ()=>{ rt.typed[i] = inp.value; fitInline(inp, base); });
      inp.addEventListener('keydown', (e)=>{ if(e.key==='Enter'){ e.preventDefault(); submit(); } });
    }
    return inp;
  }

  const prompt = el('div','act-prompt');
  if(parts.length < 2){
    // enunciado sin hueco marcado: campo al final
    prompt.appendChild(document.createTextNode(q.q + ' '));
    const inp = makeInput(0, 16);
    inputs.push(inp);
    prompt.appendChild(inp);
  } else {
    const base = blanks === 1
      ? Math.min(24, Math.max(11, Math.max.apply(null, q.answers.map(a=>a.length)) + 3))
      : 10;
    parts.forEach((txt, i)=>{
      if(txt) prompt.appendChild(document.createTextNode(txt));
      if(i < parts.length - 1){
        const inp = makeInput(inputs.length, base);
        inputs.push(inp);
        prompt.appendChild(inp);
      }
    });
  }
  card.appendChild(prompt);

  appendDoubtControl(A, { mod:mod, level:level, origQIdx:rt.qOrder[rt.qIdx], qText:q.q });

  const last = rt.qIdx+1 >= total;
  const mainBtn = el('button','act-btn',
    rt.answered ? (last ? 'Finalizar actividad →' : 'Continuar →') : 'Comprobar respuesta →');

  function submit(){
    const vals = inputs.map(x=>x.value);
    if(!vals.join('').trim()) return;
    rt.typed = vals;
    rt.wasCorrect = fillMatches(vals.join(' '), q);
    if(rt.wasCorrect) rt.correct++;
    rt.answered = true;
    render();
  }

  if(!rt.answered){
    mainBtn.onclick = submit;
    setTimeout(()=>{ try{ if(inputs[0]) inputs[0].focus(); }catch(e){} }, 0);
  } else {
    let body = '';
    if(!rt.wasCorrect){
      body += 'La respuesta es <b>'+esc(q.answers[0])+'</b>';
      const firstSet = normFill(q.answers[0]).split(' ').sort().join(' ');
      const alts = q.answers.slice(1).filter(a=> normFill(a).split(' ').sort().join(' ') !== firstSet);
      if(alts.length){ body += ' <span style="opacity:.75">(también: '+esc(alts.join(', '))+')</span>'; }
      if(q.explain){ body += '<br>'; }
    }
    if(q.explain){ body += esc(q.explain); }
    A.feedback({ ok:rt.wasCorrect, body: body || (rt.wasCorrect ? 'Respuesta correcta.' : '') });
    mainBtn.onclick=()=>{
      if(last){ finishLevel(mod.id, level.id, rt.correct, total); }
      else {
        rt.qIdx++; rt.answered=false; rt.wasCorrect=false; rt.typed=[];
        saveResume(mod.id, level.id, 'completar', rt);
        render();
      }
    };
  }
  A.actions.appendChild(mainBtn);
  appendResetControl(A, mod, level, rt, rt.qIdx > 0 || rt.answered);

  return A.root;
}

/* ============================================================
   VISTA: SEÑALAR ESTRUCTURAS SOBRE UNA IMAGEN (imgLabel)
   Una imagen por "pantalla", con marcadores en las puntas de las
   flechas ya dibujadas. Tocar un marcador abre un panel para
   escribir el nombre; no hace falta que quepan todas las cajas de
   texto a la vez. Un punto ya respondido queda fijo (sin reintento),
   igual que en "completar".
   ============================================================ */
function viewImgLabel(){
  const mod = MODULES[state.currentModule];
  const level = mod.levels[state.currentLevelIdx];
  const idx = state.currentLevelIdx;

  if(!state._levelRuntime){
    state._levelRuntime = loadResume(mod.id, level.id, 'imgLabel', level) || { imgIdx:0, answers:{}, active:null };
  }
  if(!_imgOverridesLoaded && _fs){ loadImgOverrides().then(render); }
  const rt = state._levelRuntime;
  const images = level.images;
  const totalImgs = images.length;
  const img = images[rt.imgIdx];
  const points = img.points;

  function pKey(n){ return rt.imgIdx + '-' + n; }
  const answeredInImg = points.filter(p=> rt.answers[pKey(p.n)]).length;
  const allAnsweredInImg = answeredInImg === points.length;

  const totalPointsAll = images.reduce((s,im)=> s + im.points.length, 0);
  const answeredAll = Object.keys(rt.answers).length;
  const allDoneOverall = answeredAll === totalPointsAll;

  function isImgDone(i){
    return images[i].points.every(p=> rt.answers[i + '-' + p.n]);
  }

  const A = beginActivity({ mod:mod, level:level, idx:idx,
    progress:{ label:'Imagen ' + (rt.imgIdx+1) + ' de ' + totalImgs,
               frac: totalPointsAll ? answeredAll / totalPointsAll : 0 } });
  const card = A.content;
  if(level.instructions) card.appendChild(el('p','act-instr', esc(level.instructions)));

  const picker = el('div','imglabel-picker');
  images.forEach((im, i)=>{
    const cls = 'imglabel-pick' + (i===rt.imgIdx ? ' is-current' : '') + (isImgDone(i) ? ' is-done' : '');
    const b = el('button', cls, (isImgDone(i) ? '✓ ' : '') + esc(im.label || ('Imagen ' + (i+1))));
    b.type = 'button';
    if(i===rt.imgIdx){ b.disabled = true; }
    else { b.onclick = ()=>{ rt.imgIdx = i; rt.active = null; saveResume(mod.id, level.id, 'imgLabel', rt); render(); }; }
    picker.appendChild(b);
  });
  card.appendChild(picker);

  const wrap = el('div','imglabel-wrap');
  const imgEl = document.createElement('img');
  imgEl.className = 'imglabel-img';
  imgEl.src = img.file;
  imgEl.alt = '';
  wrap.appendChild(imgEl);

  points.forEach(p=>{
    const ans = rt.answers[pKey(p.n)];
    const isActive = rt.active && rt.active.n === p.n;
    const cls = 'imglabel-marker' + (ans ? (ans.correct ? ' is-correct' : ' is-wrong') : '') + (isActive ? ' is-active' : '');
    const marker = el('button', cls, ans ? (ans.correct ? '✓' : '✕') : String(p.n));
    marker.type = 'button';
    marker.style.left = p.x + '%';
    marker.style.top = p.y + '%';
    marker.onclick = ()=>{
      rt.active = { n: p.n };
      render();
      setTimeout(()=>{ try{ const i=document.getElementById('imglabelInput'); if(i) i.focus(); }catch(e){} }, 0);
    };
    wrap.appendChild(marker);
  });
  card.appendChild(wrap);
  card.appendChild(el('div','imglabel-count', answeredInImg + ' de ' + points.length + ' estructuras señaladas en esta imagen'));

  if(rt.active){
    const p = points.find(pp=> pp.n === rt.active.n);
    const already = rt.answers[pKey(p.n)];
    const panel = el('div','imglabel-panel');
    panel.appendChild(el('div','imglabel-panel-label', 'Estructura N.º ' + p.n));

    if(already){
      const readout = el('div','imglabel-panel-readout' + (already.correct ? ' is-ok' : ' is-bad'),
        already.correct
          ? '✓ Correcto — escribiste “' + esc(already.value) + '”.' + (already.accentNote ? '<br><small>' + esc(already.accentNote) + '</small>' : '')
          : '✕ Escribiste “' + esc(already.value) + '”. La respuesta correcta es “' + esc(already.correctAnswer) + '”.');
      panel.appendChild(readout);

      if(!already.correct){
        if(already.disputed){
          panel.appendChild(el('div','imglabel-dispute-sent','✓ Enviado para revisión del monitor.'));
        } else if(rt.active.disputing){
          const ta = document.createElement('textarea');
          ta.className = 'imglabel-dispute-input';
          ta.rows = 2;
          ta.maxLength = 500;
          ta.placeholder = '¿Por qué crees que tu respuesta también es correcta? (opcional)';
          panel.appendChild(ta);
          const disputeRow = el('div','row');
          const sendBtn = el('button','act-btn is-ghost','Enviar para revisión');
          sendBtn.type = 'button';
          sendBtn.onclick = ()=>{
            sendBtn.disabled = true; sendBtn.textContent = 'Enviando…';
            submitImgDispute(mod, level, img, p, already.value, ta.value.trim()).then(function(ok){
              if(ok){ already.disputed = true; saveResume(mod.id, level.id, 'imgLabel', rt); }
              render();
            });
          };
          const cancelDispute = el('button','act-btn is-ghost','Cancelar');
          cancelDispute.type = 'button';
          cancelDispute.onclick = ()=>{ rt.active.disputing = false; render(); };
          disputeRow.appendChild(sendBtn); disputeRow.appendChild(cancelDispute);
          panel.appendChild(disputeRow);
        } else {
          const disputeToggle = el('button','imglabel-dispute-toggle','¿Crees que tu respuesta también es correcta? Márcala para revisión →');
          disputeToggle.type = 'button';
          disputeToggle.onclick = ()=>{ rt.active.disputing = true; render(); };
          panel.appendChild(disputeToggle);
        }
      }

      const closeBtn = el('button','act-btn','Continuar →');
      closeBtn.type = 'button';
      closeBtn.onclick = ()=>{ rt.active = null; render(); };
      panel.appendChild(closeBtn);
    } else {
      const inp = document.createElement('input');
      inp.type = 'text';
      inp.id = 'imglabelInput';
      inp.className = 'imglabel-input';
      inp.autocomplete = 'off';
      inp.placeholder = 'Escribe el nombre de la estructura…';
      const submit = ()=>{
        const val = inp.value.trim();
        if(!val) return;
        const extra = _imgOverrides[imgOverrideKey(mod.id, level.id, img.file, p.n)] || [];
        const res = checkLabelAnswer(val, p.answers.concat(extra));
        rt.answers[pKey(p.n)] = { value: val, correct: res.correct, accentNote: res.accentNote, correctAnswer: res.correctAnswer, disputed:false };
        saveResume(mod.id, level.id, 'imgLabel', rt);
        render();
      };
      inp.addEventListener('keydown', (e)=>{ if(e.key==='Enter'){ e.preventDefault(); submit(); } });
      panel.appendChild(inp);
      const row = el('div','row');
      const okBtn = el('button','act-btn','Comprobar');
      okBtn.type = 'button';
      okBtn.onclick = submit;
      const cancelBtn = el('button','act-btn is-ghost','Cancelar');
      cancelBtn.type = 'button';
      cancelBtn.onclick = ()=>{ rt.active = null; render(); };
      row.appendChild(okBtn); row.appendChild(cancelBtn);
      panel.appendChild(row);
      setTimeout(()=>{ try{ inp.focus(); }catch(e){} }, 0);
    }
    card.appendChild(panel);
  }

  if(allAnsweredInImg && !rt.active){
    const mainBtn = el('button','act-btn', allDoneOverall ? 'Finalizar actividad →' : 'Siguiente imagen →');
    mainBtn.type = 'button';
    mainBtn.onclick = ()=>{
      if(allDoneOverall){
        const totalCorrect = Object.keys(rt.answers).filter(k=> rt.answers[k].correct).length;
        finishLevel(mod.id, level.id, totalCorrect, totalPointsAll);
      } else {
        rt.imgIdx = (rt.imgIdx + 1) % totalImgs;
        rt.active = null;
        saveResume(mod.id, level.id, 'imgLabel', rt);
        render();
      }
    };
    A.actions.appendChild(mainBtn);
  }
  appendResetControl(A, mod, level, rt, answeredAll > 0);

  return A.root;
}

function finishLevel(modId, levelId, correct, total){
  const key=levelKey(modId, levelId);
  state.progress[key] = { correct, total };
  delete state.progress[resumeKey(modId, levelId)]; // ya no hay avance parcial que reanudar
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
   REANUDAR AVANCE PARCIAL (dentro de un nivel de preguntas)
   El snapshot vive dentro de state.progress con clave "@r:<mod>-<lvl>",
   así se guarda y se restaura junto con el perfil sin tocar el backend.
   Solo aplica a actividades por preguntas (mc, completar).
   ============================================================ */
function resumeKey(modId, levelId){ return '@r:' + modId + '-' + levelId; }

function loadResume(modId, levelId, type, level){
  if(state.progress[levelKey(modId, levelId)]) return null;     // ya completado
  const s = state.progress[resumeKey(modId, levelId)];
  if(!s || s.type !== type) return null;
  if(type === 'imgLabel'){
    if(!s.answers || typeof s.answers !== 'object') return null;
    if(!Object.keys(s.answers).length) return null;
    const totalImgs = (level.images || []).length;
    const imgIdx = Math.min(Math.max(0, s.imgIdx|0), Math.max(0, totalImgs - 1));
    return { imgIdx: imgIdx, answers: s.answers, active: null };
  }
  if(type === 'sequence'){
    const total = (level.steps || []).length;
    if(!Array.isArray(s.order) || s.order.length !== total) return null;
    if(!s.order.some(function(si,i){ return si!==i; })) return null; // no movió nada, empieza igual que uno nuevo
    return { order: s.order.slice(), answered:false, score:0, touched:true };
  }
  const n = level.questions.length;
  if(!Array.isArray(s.qOrder) || s.qOrder.length !== n) return null; // el contenido cambió
  const qIdx = Math.min(Math.max(0, s.qIdx|0), n - 1);
  if(qIdx <= 0) return null;
  if(type === 'mc'){
    if(!Array.isArray(s.optOrder) || s.optOrder.length !== n) return null;
    return { qIdx:qIdx, correct:s.correct|0, answered:false, selected:null, pending:null,
             qOrder:s.qOrder, optOrder:s.optOrder };
  }
  if(type === 'mcMulti'){
    if(!Array.isArray(s.optOrder) || s.optOrder.length !== n) return null;
    return { qIdx:qIdx, correctSum:s.correctSum||0, answered:false, selected:[], lastScore:0,
             qOrder:s.qOrder, optOrder:s.optOrder };
  }
  if(type === 'completar'){
    return { qIdx:qIdx, correct:s.correct|0, answered:false, wasCorrect:false, typed:[],
             qOrder:s.qOrder };
  }
  return null;
}

function saveResume(modId, levelId, type, rt){
  const k = resumeKey(modId, levelId);
  if(type === 'imgLabel'){
    if(!Object.keys(rt.answers).length){ delete state.progress[k]; }
    else { state.progress[k] = { type:'imgLabel', imgIdx: rt.imgIdx, answers: rt.answers }; }
    saveProfile();
    return;
  }
  if(type === 'sequence'){
    if(!rt.order.some(function(si,i){ return si!==i; })){ delete state.progress[k]; }
    else { state.progress[k] = { type:'sequence', order: rt.order }; }
    saveProfile();
    return;
  }
  const n = rt.qOrder ? rt.qOrder.length : 0;
  if(rt.qIdx <= 0 || rt.qIdx >= n){
    delete state.progress[k];
  } else if(type === 'mcMulti'){
    state.progress[k] = { type:type, qIdx:rt.qIdx, correctSum:rt.correctSum||0, qOrder:rt.qOrder, optOrder:rt.optOrder };
  } else {
    const s = { type:type, qIdx:rt.qIdx, correct:rt.correct|0, qOrder:rt.qOrder };
    if(type === 'mc') s.optOrder = rt.optOrder;
    state.progress[k] = s;
  }
  saveProfile();
}

function clearResume(modId, levelId){
  delete state.progress[resumeKey(modId, levelId)];
  saveProfile();
}

/* ============================================================
   DUDAS DEL ESTUDIANTE (preguntas marcadas para el monitor)
   Viven en la colección Firestore "dudas", un documento por
   (código, pregunta), sincronizadas en tiempo real con listeners.
   ============================================================ */
function doubtKey(modId, levelId, origQIdx){ return modId + '|' + levelId + '|' + origQIdx; }

// Las dudas del estudiante viven en Firestore (state.doubts es el reflejo
// local que mantiene el listener en tiempo real).
function getDoubts(){
  const d = state.doubts;
  return (d && typeof d === 'object' && Object.keys(d).length) ? d : null;
}
function isDoubtMarked(k){ return !!(state.doubts && state.doubts[k]); }

function addDoubt(k, rec){
  const code = state.student.code, student = state.student.name || '';
  const full = Object.assign({ code:String(code), student:String(student), key:k }, rec);
  if(!state.doubts) state.doubts = {};
  state.doubts[k] = full; // optimista; el listener confirma
  if(_fs){
    _fs.collection('dudas').doc(doubtDocId(code, k)).set(full).catch(function(e){
      console.error('addDoubt', e);
      state._fsWriteErr = 'No se pudo guardar la duda (sin conexión). Intenta de nuevo.';
      render();
    });
  } else {
    state._fsWriteErr = 'El servidor de dudas no está listo. Recarga la página e intenta de nuevo.';
  }
}
function updateDoubtNote(k, nota){
  const d = state.doubts;
  if(!d || !d[k] || d[k].nota === nota) return;
  d[k].nota = nota;
  if(_fs){
    _fs.collection('dudas').doc(doubtDocId(state.student.code, k)).update({ nota: nota })
      .catch(function(e){ console.error('updateDoubtNote', e); });
  }
}
function removeDoubt(k){
  const d = state.doubts;
  if(!d || !d[k]) return;
  delete d[k];
  if(_fs){
    _fs.collection('dudas').doc(doubtDocId(state.student.code, k)).delete()
      .catch(function(e){ console.error('removeDoubt', e); });
  }
}

// Control "no entiendo esta pregunta" para actividades por preguntas.
// ctx: { mod, level, origQIdx, qText }
function appendDoubtControl(A, ctx){
  if(state._fsOk === false) return; // sin servidor de dudas, no se ofrece marcar
  const k = doubtKey(ctx.mod.id, ctx.level.id, ctx.origQIdx);
  const marked = isDoubtMarked(k);
  const d = marked ? getDoubts()[k] : null;
  const solved = !!(d && d.resuelta);

  const answer = (d && d.respuesta) || '';
  const wrap = el('div','act-doubt' + (marked ? ' is-on' : '') + (solved || answer ? ' is-resolved' : ''));
  const btn = el('button','act-doubt-toggle',
    answer ? '💬 Tu monitor respondió esta duda'
    : solved ? '✓ Tu monitor marcó esta duda como resuelta'
    : marked ? '✓ Duda marcada — la verá tu monitor'
    : '🚩 No entiendo esta pregunta');
  btn.type = 'button';
  btn.setAttribute('aria-pressed', marked ? 'true' : 'false');
  btn.onclick = ()=>{
    if(isDoubtMarked(k)){
      removeDoubt(k);
    } else {
      addDoubt(k, {
        q: String(ctx.qText || '').slice(0, 500),
        nota: '',
        mod: ctx.mod.id,
        modT: ctx.mod.title || '',
        lvlT: ctx.level.title || '',
        tipo: ctx.level.type || '',
        t: new Date().toISOString()
      });
    }
    render();
  };
  wrap.appendChild(btn);

  if(marked && !answer){
    const ta = document.createElement('textarea');
    ta.className = 'act-doubt-note';
    ta.rows = 2;
    ta.maxLength = 600;
    ta.placeholder = '¿Qué parte no te queda clara? (opcional)';
    ta.value = (d && d.nota) || '';
    ta.addEventListener('blur', ()=>{ updateDoubtNote(k, ta.value.trim()); });
    wrap.appendChild(ta);
  }
  if(answer){
    const ans = el('div','doubt-answer');
    ans.appendChild(el('div','da-label','💬 Respuesta de tu monitor'));
    ans.appendChild(el('p','da-text', esc(answer)));
    wrap.appendChild(ans);
  }
  if(state._fsWriteErr){
    wrap.appendChild(el('p','act-instr', '⚠ ' + esc(state._fsWriteErr)));
  }
  A.content.appendChild(wrap);
}

// Agrupa las dudas por pregunta (misma clave = misma pregunta, aunque la
// marquen varios estudiantes). Ordena: preguntas con más pendientes primero.
function groupDoubts(doubts){
  const map = {};
  doubts.forEach(function(e){
    let g = map[e.key];
    if(!g){
      g = { key:e.key, mod:e.rec.mod||'', modT:e.rec.modT||e.rec.mod||'Módulo',
            lvlT:e.rec.lvlT||'', tipo:e.rec.tipo||'', q:e.rec.q, entries:[] };
      map[e.key] = g;
    }
    g.entries.push(e);
  });
  const groups = Object.keys(map).map(function(k){ return map[k]; });
  groups.forEach(function(g){
    g.total = g.entries.length;
    g.pendCount = g.entries.filter(function(x){ return !x.rec.resuelta; }).length;
    g.allResolved = g.pendCount === 0;
    g.lastT = g.entries.reduce(function(m,x){ return (x.rec.t||'') > m ? (x.rec.t||'') : m; }, '');
    g.entries.sort(function(a,b){
      const r = (a.rec.resuelta?1:0) - (b.rec.resuelta?1:0);
      return r !== 0 ? r : String(a.student).localeCompare(String(b.student));
    });
  });
  groups.sort(function(a,b){
    if(a.allResolved !== b.allResolved) return a.allResolved ? 1 : -1;
    if(b.pendCount !== a.pendCount) return b.pendCount - a.pendCount;
    return String(b.lastT).localeCompare(String(a.lastT));
  });
  return groups;
}

function doubtRef(code, key){
  return _fs.collection('dudas').doc(doubtDocId(code, key));
}
function doubtErrText(e){
  return 'No se pudo actualizar la duda. Detalle: ' + (e && e.message ? e.message : String(e));
}
const FS_DEL = function(){ return firebase.firestore.FieldValue.delete(); };

// El monitor marca / reabre una duda. Escritura optimista + Firestore.
async function setDoubtResolved(code, key, resolved, rec){
  const prevR = rec.resuelta, prevAt = rec.resueltaAt;
  if(resolved){ rec.resuelta = true; rec.resueltaAt = new Date().toISOString(); }
  else { delete rec.resuelta; delete rec.resueltaAt; }
  state._doubtError = null;
  render();
  if(!_fs) return;
  try{
    await doubtRef(code, key).update(resolved
      ? { resuelta:true, resueltaAt: rec.resueltaAt }
      : { resuelta: FS_DEL(), resueltaAt: FS_DEL() });
  }catch(e){
    if(prevR){ rec.resuelta = prevR; rec.resueltaAt = prevAt; }
    else { delete rec.resuelta; delete rec.resueltaAt; }
    state._doubtError = doubtErrText(e);
    render();
  }
}

// Resuelve (o reabre) toda una pregunta: todos los estudiantes cuyo estado
// no coincida con `resolved`.
async function resolveDoubtGroup(group, resolved){
  const targets = group.entries.filter(function(x){ return !!x.rec.resuelta !== !!resolved; });
  if(!targets.length || !_fs) return;
  const undo = targets.map(function(x){ return { rec:x.rec, r:x.rec.resuelta, at:x.rec.resueltaAt }; });
  const now = new Date().toISOString();
  targets.forEach(function(x){
    if(resolved){ x.rec.resuelta = true; x.rec.resueltaAt = now; }
    else { delete x.rec.resuelta; delete x.rec.resueltaAt; }
  });
  state._doubtError = null;
  render();
  try{
    await Promise.all(targets.map(function(x){
      return doubtRef(x.code, x.key).update(resolved
        ? { resuelta:true, resueltaAt: now }
        : { resuelta: FS_DEL(), resueltaAt: FS_DEL() });
    }));
  }catch(e){
    undo.forEach(function(u){
      if(u.r){ u.rec.resuelta = u.r; u.rec.resueltaAt = u.at; }
      else { delete u.rec.resuelta; delete u.rec.resueltaAt; }
    });
    state._doubtError = doubtErrText(e);
    render();
  }
}

// El monitor escribe una respuesta para toda la pregunta (la ven los
// estudiantes en tiempo real). Responder también marca la duda como resuelta.
async function answerDoubtGroup(group, respuesta){
  if(!_fs) return;
  const undo = group.entries.map(function(x){
    return { rec:x.rec, resp:x.rec.respuesta, respAt:x.rec.respuestaAt, r:x.rec.resuelta, at:x.rec.resueltaAt };
  });
  const now = new Date().toISOString();
  group.entries.forEach(function(x){
    x.rec.respuesta = respuesta; x.rec.respuestaAt = now;
    x.rec.resuelta = true; x.rec.resueltaAt = now;
  });
  state._doubtError = null;
  state._resolvedOpen = true;
  render();
  try{
    await Promise.all(group.entries.map(function(x){
      return doubtRef(x.code, x.key).update({
        respuesta: respuesta, respuestaAt: now, resuelta: true, resueltaAt: now
      });
    }));
  }catch(e){
    undo.forEach(function(u){
      if(u.resp !== undefined) u.rec.respuesta = u.resp; else delete u.rec.respuesta;
      if(u.respAt !== undefined) u.rec.respuestaAt = u.respAt; else delete u.rec.respuestaAt;
      if(u.r) u.rec.resuelta = u.r; else delete u.rec.resuelta;
      if(u.at !== undefined) u.rec.resueltaAt = u.at; else delete u.rec.resueltaAt;
    });
    state._doubtError = doubtErrText(e);
    render();
  }
}

/* ============================================================
   VISTA: MIS DUDAS (estudiante) — preguntas marcadas + respuestas
   ============================================================ */
function viewDoubts(){
  const wrap = el('div','home');
  const head = el('div','home-head');
  head.appendChild(el('h1','','Mis dudas'));
  head.appendChild(el('p','','Las preguntas que marcaste y las respuestas de tu monitor. Se actualiza en vivo.'));
  wrap.appendChild(head);

  const d = getDoubts();
  const items = d ? Object.keys(d).map(function(k){ return { k:k, rec:d[k] }; }) : [];
  items.sort(function(a,b){
    const aa = a.rec.respuesta ? 0 : a.rec.resuelta ? 1 : 2;
    const bb = b.rec.respuesta ? 0 : b.rec.resuelta ? 1 : 2;
    if(aa !== bb) return aa - bb;
    return String(b.rec.t || '').localeCompare(String(a.rec.t || ''));
  });

  if(!items.length){
    const nc = el('div','notice-card');
    nc.appendChild(el('div','n-eyebrow','Sin dudas marcadas'));
    nc.appendChild(el('h1','','Todavía no marcaste ninguna pregunta'));
    nc.appendChild(el('p','n-body','Durante una actividad, toca "🚩 No entiendo esta pregunta" para pedirle una explicación a tu monitor. Su respuesta aparecerá aquí.'));
    wrap.appendChild(nc);
    return wrap;
  }

  const list = el('div','mydoubt-list');
  items.forEach(function(it){
    const rec = it.rec;
    const card = el('div','mydoubt' + (rec.respuesta ? ' has-answer' : ''));

    const meta = el('div','mydoubt-meta');
    const tipoTxt = ACTIVITY_TYPE_LABEL[rec.tipo] || '';
    meta.appendChild(el('span','doubt-tag', esc((rec.modT || rec.mod || 'Módulo') + (tipoTxt ? ' · ' + tipoTxt : ''))));
    meta.appendChild(el('span','mydoubt-status ' + (rec.respuesta ? 'is-answered' : rec.resuelta ? 'is-done' : 'is-wait'),
      rec.respuesta ? 'Respondida' : rec.resuelta ? 'Resuelta' : 'Esperando respuesta'));
    card.appendChild(meta);

    card.appendChild(el('p','doubt-q', '“' + esc(rec.q) + '”'));
    if(rec.lvlT) card.appendChild(el('div','dgroup-lvl', esc(rec.lvlT)));
    if(rec.nota) card.appendChild(el('p','mydoubt-note', 'Tu nota: ' + esc(rec.nota)));

    if(rec.respuesta){
      const ans = el('div','doubt-answer');
      ans.appendChild(el('div','da-label','💬 Respuesta de tu monitor'));
      ans.appendChild(el('p','da-text', esc(rec.respuesta)));
      card.appendChild(ans);
    } else {
      card.appendChild(el('p','mydoubt-hint','Tu monitor todavía no responde esta pregunta.'));
    }

    const rm = el('button','act-reset','Quitar esta duda');
    rm.type = 'button';
    rm.onclick = function(){
      if(rm._armed){ removeDoubt(it.k); render(); return; }
      rm._armed = true;
      rm.textContent = 'Toca otra vez para quitarla';
      rm.classList.add('is-armed');
      setTimeout(function(){ rm._armed = false; rm.textContent = 'Quitar esta duda'; rm.classList.remove('is-armed'); }, 3000);
    };
    card.appendChild(rm);
    list.appendChild(card);
  });
  wrap.appendChild(list);
  return wrap;
}

// Tarjeta de una pregunta con dudas (panel del monitor).
function doubtGroupCard(g){
  const card = el('div','dgroup' + (g.allResolved ? ' is-resolved' : ''));

  const top = el('div','dgroup-top');
  const tipoTxt = ACTIVITY_TYPE_LABEL[g.tipo] || '';
  top.appendChild(el('span','doubt-tag', esc(g.modT + (tipoTxt ? ' · ' + tipoTxt : ''))));
  top.appendChild(el('span','dgroup-count' + (g.pendCount ? '' : ' is-done'),
    g.allResolved ? ('✓ ' + g.total + (g.total === 1 ? ' marca' : ' marcas'))
                  : (g.pendCount + ' de ' + g.total + ' sin resolver')));
  const bulk = el('button','doubt-resolve', g.pendCount ? '✓ Resolver todas' : '↺ Reabrir todas');
  bulk.type = 'button';
  bulk.onclick = function(){ resolveDoubtGroup(g, g.pendCount > 0); };
  top.appendChild(bulk);
  card.appendChild(top);

  card.appendChild(el('p','doubt-q', '“' + esc(g.q) + '”'));
  if(g.lvlT) card.appendChild(el('div','dgroup-lvl', esc(g.lvlT)));

  const ul = el('ul','dgroup-students');
  g.entries.forEach(function(e){
    const done = !!e.rec.resuelta;
    const li = el('li','dg-row' + (done ? ' is-done' : ''));
    const main = el('div','dg-main');
    main.appendChild(el('span','dg-name', esc(e.student)));
    if(e.rec.nota) main.appendChild(el('span','dg-note', '“' + esc(e.rec.nota) + '”'));
    li.appendChild(main);
    const t = el('button','dg-toggle', done ? '↺' : '✓');
    t.type = 'button';
    t.title = (done ? 'Reabrir para ' : 'Marcar resuelta para ') + e.student;
    t.setAttribute('aria-label', t.title);
    t.onclick = function(){ setDoubtResolved(e.code, e.key, !done, e.rec); };
    li.appendChild(t);
    ul.appendChild(li);
  });
  card.appendChild(ul);

  // ---- respuesta del monitor (la ven los estudiantes) ----
  const answered = (g.entries.find(function(e){ return e.rec.respuesta; }) || {}).rec;
  const ansWrap = el('div','dg-answer');
  ansWrap.appendChild(el('div','dg-answer-label',
    answered ? '💬 Tu respuesta (visible para los estudiantes)' : '💬 Responder a los estudiantes'));
  const ta = document.createElement('textarea');
  ta.className = 'dg-answer-input';
  ta.rows = 3;
  ta.maxLength = 1500;
  ta.placeholder = 'Escribe la explicación que verán los estudiantes que marcaron esta pregunta…';
  ta.value = answered ? answered.respuesta : '';
  ansWrap.appendChild(ta);
  const send = el('button','act-btn is-ghost', answered ? 'Actualizar respuesta' : 'Enviar respuesta');
  send.type = 'button';
  send.onclick = function(){
    const txt = ta.value.trim();
    if(!txt){ ta.focus(); return; }
    send.disabled = true; send.textContent = 'Enviando…';
    answerDoubtGroup(g, txt);
  };
  ansWrap.appendChild(send);
  card.appendChild(ansWrap);

  return card;
}

function imgDisputeCard(d){
  const card = el('div','dgroup' + (d.resolved ? ' is-resolved' : ''));
  const top = el('div','dgroup-top');
  top.appendChild(el('span','doubt-tag', esc((d.imgLabel || d.imgFile) + ' · punto ' + d.pointN)));
  if(d.resolved){
    top.appendChild(el('span','dgroup-count is-done', d.approved ? '✓ Aprobada' : '✕ Descartada'));
  }
  card.appendChild(top);
  card.appendChild(el('p','doubt-q', esc(d.name || d.code) + ' (' + esc(d.code) + ') escribió: “' + esc(d.typed) + '”'));
  if(d.acceptedAnswers && d.acceptedAnswers.length){
    card.appendChild(el('div','dgroup-lvl', 'Respuestas aceptadas en ese momento: ' + esc(d.acceptedAnswers.join(' / '))));
  }
  if(d.justificacion){
    card.appendChild(el('div','imgdispute-note', '💬 “' + esc(d.justificacion) + '”'));
  }
  if(!d.resolved){
    const row = el('div','row');
    const approve = el('button','act-btn', '✓ Aprobar como correcta');
    approve.type = 'button';
    approve.onclick = function(){ approve.disabled = true; approve.textContent = 'Aprobando…'; approveImgDispute(d); };
    const reject = el('button','act-btn is-ghost', 'Descartar');
    reject.type = 'button';
    reject.onclick = function(){ reject.disabled = true; rejectImgDispute(d); };
    row.appendChild(approve); row.appendChild(reject);
    card.appendChild(row);
  }
  return card;
}

/* ============================================================
   VISTA: NIVEL COMPLETADO (resultado)
   ============================================================ */
const RESULT_TIERS = [
  { min:90, label:'¡Excelente!', cls:'good' },
  { min:70, label:'¡Muy bien!', cls:'good' },
  { min:50, label:'Vas bien — sigue practicando', cls:'warn' },
  { min:0,  label:'Repasa este tema y vuelve a intentarlo', cls:'bad' }
];
function resultTier(score){
  for(let i=0;i<RESULT_TIERS.length;i++){ if(score>=RESULT_TIERS[i].min) return RESULT_TIERS[i]; }
  return RESULT_TIERS[RESULT_TIERS.length-1];
}

function viewLevelDone(){
  const mod=MODULES[state.currentModule];
  const idx=state.currentLevelIdx;
  const level=mod.levels[idx];
  const p=state.progress[levelKey(mod.id, level.id)];
  const score=pct(p.correct, p.total);
  const tier=resultTier(score);
  const multi = mod.levels.length > 1 && (!mod.subActivities || mod.groupedActivities);
  const groupLevels = multi ? mod.levels.filter(l=>
    l.group === level.group && l.kind === level.kind
  ) : null;
  const groupIdx = multi ? groupLevels.indexOf(level) : idx;
  const t = ensureTimer(mod.id);

  const root = el('div','act');
  const back = el('button','act-back','← Volver al panel');
  back.type='button';
  back.onclick=()=>{ state.view=levelBackTarget(); render(); };
  root.appendChild(back);

  const card = el('div','act-card result-card');
  card.appendChild(el('div','act-topic', esc(String(mod.title).toUpperCase())));
  card.appendChild(el('div','result-eyebrow','Actividad completada'));
  card.appendChild(el('div','act-type',
    multi ? ('Nivel '+(groupIdx+1)+' · '+esc(level.title))
          : esc(ACTIVITY_TYPE_LABEL[level.type] || level.title || 'Actividad')));

  card.appendChild(el('div','result-score '+tier.cls, score+'%'));
  card.appendChild(el('div','result-label', tier.label));

  const stats = el('div','result-stats');
  stats.innerHTML =
    '<span><b>'+p.correct+'</b> de <b>'+p.total+'</b> aciertos</span>'+
    '<span>⏱ '+formatClock(currentElapsed(mod.id))+(t.status==='completed'?' · tiempo final':'')+'</span>';
  card.appendChild(stats);

  const actions = el('div','act-actions');
  const hasNext = multi && groupIdx+1 < groupLevels.length;
  if(hasNext){
    const nextLevel = groupLevels[groupIdx+1];
    const nextBtn = el('button','act-btn', 'Siguiente: '+esc(nextLevel.title)+' →');
    nextBtn.type='button';
    nextBtn.onclick=()=>{ goToLevel(mod.id, mod.levels.indexOf(nextLevel)); };
    actions.appendChild(nextBtn);
  }
  const backLabel = levelBackTarget()==='moduleSubmenu' ? 'Volver a las actividades' : 'Volver al panel';
  const menuBtn = el('button', hasNext ? 'act-btn is-ghost' : 'act-btn', backLabel);
  menuBtn.type='button';
  menuBtn.onclick=()=>{ state.view=levelBackTarget(); render(); };
  actions.appendChild(menuBtn);
  card.appendChild(actions);

  root.appendChild(card);
  return root;
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
        level.questions.forEach(q=>{
          const perm = shuffle(q.opts.map((_,i)=>i)); // baraja opciones
          pool.push({
            q:q.q,
            opts: perm.map(i=>q.opts[i]),
            correct: perm.indexOf(q.correct),
            explain:q.explain
          });
        });
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
  const totalTime = 15000;
  state.bossTimeLeft = totalTime;
  const startTs = Date.now();
  state.bossTimer = setInterval(()=>{
    const elapsed = Date.now() - startTs;
    state.bossTimeLeft = Math.max(0, totalTime - elapsed);
    const frac = state.bossTimeLeft / totalTime;
    const fill = document.getElementById('bossTimerFill');
    if(fill) fill.style.width = (frac * 100) + '%';
    const barWrap = document.getElementById('bossTimerBar');
    if(barWrap) barWrap.classList.toggle('low', frac <= 0.34);
    const clock = document.getElementById('bossClock');
    if(clock) clock.textContent = '⏱ ' + Math.ceil(state.bossTimeLeft / 1000) + 's';
    if(state.bossTimeLeft <= 0){
      clearInterval(state.bossTimer);
      if(!state.bossAnswered){ state.bossAnswered = true; state.bossSelected = -1; render(); }
    }
  }, 100);
}

function viewBoss(){
  const root = el('div','act');

  const back = el('button','act-back','← Salir del Boss Battle');
  back.type = 'button';
  back.onclick = ()=>{ clearInterval(state.bossTimer); state.view='menu'; render(); };
  root.appendChild(back);

  const card = el('div','act-card');
  root.appendChild(card);

  const q = state.bossPool[state.bossIdx];
  const total = state.bossPool.length;
  const timeLeft = state.bossTimeLeft != null ? state.bossTimeLeft : 15000;

  const head = el('div','act-head');
  const topline = el('div','act-topline');
  topline.appendChild(el('span','act-topic','🏆 Boss Battle'));
  const clock = el('span','act-timer');
  clock.id = 'bossClock';
  clock.textContent = '⏱ ' + Math.ceil(timeLeft / 1000) + 's';
  topline.appendChild(clock);
  head.appendChild(topline);

  head.appendChild(el('div','act-type','Reto cronometrado'));

  const pr = el('div','act-progress');
  const prow = el('div','act-progress-row');
  prow.appendChild(el('span','', 'Pregunta ' + (state.bossIdx + 1) + ' de ' + total));
  prow.appendChild(el('span','', 'Puntaje <b>' + state.bossScore + '</b>'));
  pr.appendChild(prow);
  const bar = el('div','act-bar is-timer');
  bar.id = 'bossTimerBar';
  bar.innerHTML = '<i id="bossTimerFill" style="width:' + (timeLeft / 15000 * 100) + '%"></i>';
  pr.appendChild(bar);
  head.appendChild(pr);
  card.appendChild(head);

  const body = el('div','act-body');
  body.appendChild(el('p','act-prompt', esc(q.q)));

  const opts = el('div','act-options cols-2');
  q.opts.forEach((optText, i)=>{
    const btn = el('button','opt2');
    btn.type = 'button';
    btn.innerHTML = '<span class="k">' + (OPTION_LETTERS[i] || (i + 1)) +
      '</span><span class="t">' + esc(optText) + '</span>';
    if(state.bossAnswered){
      btn.disabled = true;
      if(i === q.correct) btn.classList.add('is-correct');
      else if(i === state.bossSelected) btn.classList.add('is-wrong');
    }
    btn.onclick = ()=>{
      if(state.bossAnswered) return;
      clearInterval(state.bossTimer);
      state.bossAnswered = true; state.bossSelected = i;
      if(i === q.correct) state.bossScore++;
      render();
    };
    opts.appendChild(btn);
  });
  body.appendChild(opts);
  card.appendChild(body);

  if(state.bossAnswered){
    const isCorrect = state.bossSelected === q.correct;
    const fb = el('div','act-feedback ' + (isCorrect ? 'is-correct' : 'is-wrong'));
    const title = isCorrect ? '¡Correcto!'
      : state.bossSelected === -1 ? 'Se acabó el tiempo'
      : 'Revisa esto';
    fb.innerHTML =
      '<span class="fx">' + (isCorrect ? '✓' : '✕') + '</span>' +
      '<div><div class="ft">' + title + '</div>' +
      (q.explain ? '<div class="fb">' + esc(q.explain) + '</div>' : '') + '</div>';
    card.appendChild(fb);

    const actions = el('div','act-actions');
    const last = state.bossIdx + 1 >= total;
    const nextBtn = el('button','act-btn', last ? 'Ver resultado final →' : 'Siguiente pregunta →');
    nextBtn.type = 'button';
    nextBtn.onclick = ()=>{
      if(!last){
        state.bossIdx++; state.bossAnswered = false; state.bossSelected = null;
        render(); startBossTimer();
      } else {
        state.progress['BOSS'] = { correct: state.bossScore, total: total };
        state.view = 'bossDone'; render();
        saveProfile();
        autoSaveResult();
      }
    };
    actions.appendChild(nextBtn);
    card.appendChild(actions);
  }

  return root;
}

function viewBossDone(){
  const p = state.progress['BOSS'] || { correct:0, total:0 };
  const score = pct(p.correct, p.total);
  const tier = resultTier(score);

  const root = el('div','act');
  const back = el('button','act-back','← Volver al panel');
  back.type = 'button';
  back.onclick = ()=>{ state.view='menu'; render(); };
  root.appendChild(back);

  const card = el('div','act-card result-card');
  card.appendChild(el('div','act-topic','🏆 Boss Battle'));
  card.appendChild(el('div','result-eyebrow','Reto completado'));
  card.appendChild(el('div','act-type','Repaso combinado cronometrado'));
  card.appendChild(el('div','result-score ' + tier.cls, score + '%'));
  card.appendChild(el('div','result-label', tier.label));

  const stats = el('div','result-stats');
  stats.innerHTML = '<span><b>' + p.correct + '</b> de <b>' + p.total + '</b> aciertos</span>';
  card.appendChild(stats);

  const actions = el('div','act-actions');
  const menuBtn = el('button','act-btn','Volver al panel');
  menuBtn.type = 'button';
  menuBtn.onclick = ()=>{ state.view='menu'; render(); };
  actions.appendChild(menuBtn);
  card.appendChild(actions);

  root.appendChild(card);
  return root;
}

/* ============================================================
   INFORME
   ============================================================ */
function computeReport(){
  const rows=[];
  Object.values(MODULES).forEach(mod=>{
    if(isModuleLocked(mod.id)) return; // los temas bloqueados no entran al informe
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
  if(!state.student.code) return;
  const rep = computeReport();
  if(rep.rows.length===0) return; // nada que reportar todavía
  const code = String(state.student.code);
  const ts = new Date().toISOString();
  if(_fs){
    try{
      await _fs.collection('resultados').doc(code).set({
        name: state.student.name || '', code: code, timestamp: ts,
        overall: rep.overall, totalCorrect: rep.totalCorrect, totalQ: rep.totalQ,
        rows: JSON.stringify(rep.rows), boss: JSON.stringify(rep.boss || null)
      });
      state.saved = true;
    }catch(e){ console.error('autoSaveResult (Firestore)', e); }
  }
  // transición: también en Sheets
  try{
    await apiPost({
      action:'saveResult',
      name: state.student.name, code: code, timestamp: ts,
      overall: rep.overall, totalCorrect: rep.totalCorrect, totalQ: rep.totalQ,
      rows: rep.rows, boss: rep.boss || null
    });
    state.saved = true;
  }catch(e){ console.error('autoSaveResult (Sheets)', e); }
}

function viewReport(){
  const rep = computeReport();
  const wrap=el('div','home');
  wrap.appendChild(backButton('Volver', ()=>{ state.view=homeView(); render(); }));

  const card=el('div','panel');
  const head=el('div','panel-head');
  head.appendChild(el('div','panel-eyebrow','Informe individual'));
  head.appendChild(el('h1','', esc(state.student.name)));
  card.appendChild(head);

  if(rep.rows.length===0){
    card.appendChild(el('p','panel-lead','Aún no has completado ningún nivel. Entrena al menos un módulo para generar tu informe.'));
    wrap.appendChild(card);
    return wrap;
  }

  card.appendChild(el('p','panel-lead', 'Completaste '+rep.rows.length+' de '+allLevelsFlat().length+' niveles, con un desempeño general de <b>'+rep.overall+'%</b> ('+rep.totalCorrect+' de '+rep.totalQ+' respuestas correctas).'+(rep.boss? ' En el Boss Battle obtuviste '+pct(rep.boss.correct,rep.boss.total)+'%.':'')));

  const stats=el('div','stat-row');
  stats.innerHTML =
    '<div class="stat-cell"><span class="k">General</span><span class="v '+(rep.overall>=80?'good':rep.overall>=60?'warn':'bad')+'">'+rep.overall+'%</span></div>'+
    '<div class="stat-cell"><span class="k">Fortalezas</span><span class="v good">'+rep.strengths.length+'</span></div>'+
    '<div class="stat-cell"><span class="k">A reforzar</span><span class="v '+(rep.weak.length? 'bad':'good')+'">'+rep.weak.length+'</span></div>';
  card.appendChild(stats);

  function bullets(title, items, cls){
    card.appendChild(el('div','panel-section', title));
    const ul=el('ul','tag-list'+(cls?' '+cls:'')); items.forEach(s=>ul.appendChild(el('li','',esc(s)))); card.appendChild(ul);
  }
  if(rep.strengths.length) bullets('Fortalezas', rep.strengths, 'is-good');
  if(rep.developing.length) bullets('En desarrollo', rep.developing, 'is-warn');
  if(rep.weak.length){
    bullets('Temas prioritarios para reforzar', rep.weak, 'is-bad');
  } else if(rep.rows.length>0){
    card.appendChild(el('div','panel-section','Recomendación'));
    card.appendChild(el('p','panel-foot','Buen dominio general. Puedes repasar con el Boss Battle para mantener el nivel bajo presión de tiempo.'));
  }

  const statusBox=el('div','panel-note'+(state.saved?' is-ok':''));
  statusBox.textContent = state.saved
    ? '✓ Este informe se guarda automáticamente cada vez que terminas un nivel — tu monitor ya lo puede ver.'
    : 'Sincronizando con tu monitor…';
  card.appendChild(statusBox);
  if(!state.saved){ autoSaveResult().then(()=>{ statusBox.textContent='✓ Este informe se guarda automáticamente cada vez que terminas un nivel — tu monitor ya lo puede ver.'; statusBox.classList.add('is-ok'); }); }

  const saveErr=el('p','panel-note is-bad','');
  saveErr.hidden=true;
  const syncBtn=el('button','act-btn is-ghost','↻ Sincronizar de nuevo');
  syncBtn.type='button';
  syncBtn.onclick=async ()=>{
    syncBtn.disabled=true; syncBtn.textContent='Sincronizando…'; saveErr.hidden=true;
    try{
      await autoSaveResult();
      syncBtn.textContent='✓ Sincronizado';
      setTimeout(()=>{ render(); }, 700);
    }catch(err){
      syncBtn.disabled=false; syncBtn.textContent='↻ Sincronizar de nuevo';
      saveErr.textContent = 'No se pudo sincronizar. Detalle: ' + (err && err.message ? err.message : String(err));
      saveErr.hidden=false;
    }
  };
  card.appendChild(syncBtn);
  card.appendChild(saveErr);
  card.appendChild(el('p','panel-foot','Este resultado se guarda de forma compartida para que tu monitor pueda verlo en el panel del grupo, junto con tu nombre y código.'));

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
  const wrap=el('div','home');
  wrap.appendChild(backButton('Volver', ()=>{ state.view = homeView(); render(); }));

  const card=el('div','panel');
  const head=el('div','panel-head');
  head.appendChild(el('div','panel-eyebrow','Acceso restringido'));
  head.appendChild(el('h1','','Panel del monitor'));
  card.appendChild(head);
  card.appendChild(el('p','panel-lead','Esta vista es solo para el monitor del curso. Ingresa la clave para continuar.'));

  const field=el('div','field');
  const passLabel=el('label','field-label','Clave de monitor');
  passLabel.htmlFor='monitorPass';
  const passInput=document.createElement('input');
  passInput.type='password'; passInput.id='monitorPass'; passInput.className='field-input';
  passInput.placeholder='••••••'; passInput.autocomplete='off';
  const hint=el('div','field-hint'); hint.setAttribute('aria-live','polite');
  field.appendChild(passLabel); field.appendChild(passInput); field.appendChild(hint);
  card.appendChild(field);

  const goBtn=el('button','act-btn','Entrar al panel →');
  goBtn.type='button';
  function setErr(msg){
    hint.textContent = msg || '';
    hint.className = 'field-hint' + (msg ? ' is-error' : '');
    field.classList.toggle('has-error', !!msg);
  }
  goBtn.onclick=async ()=>{
    const pass=passInput.value;
    if(!pass){ setErr('Ingresa la clave.'); passInput.focus(); return; }
    setErr('');
    goBtn.disabled=true; goBtn.textContent='Verificando…';
    try{
      await Promise.all([
        apiGet({action:'listResults', pass}), // solo valida la clave del lado del servidor
        loadDynamicContent()                  // para saber qué actividades están habilitadas
      ]);
      state.monitorPass = pass;
      state.monitorAuthed = true;
      state.dashboardRows = null;      // los llenan los listeners de Firestore
      state.dashboardProfiles = null;
      state.dashboardDoubts = null;
      state.dashboardImgDisputas = null;
      state._monitorTab = null;
      state.dashboardError = null;
      state.dashboardActivityId = null;
      state.view='dashboard';
      render();
      initFirestore().then(function(ok){
        if(ok){
          subscribeMonitorDoubts();
          subscribeMonitorProfiles();
          subscribeMonitorResults();
          subscribeMonitorImgDisputes();
          gapFillProfiles();
          gapFillResults();
          loadImgOverrides();
        } else {
          state.dashboardDoubts = [];
          state.dashboardImgDisputas = [];
          state._doubtError = 'Sin conexión con la base de datos en tiempo real.';
          Promise.all([
            apiGet({action:'listResults', pass: state.monitorPass}),
            apiGet({action:'listProfiles', pass: state.monitorPass})
          ]).then(function(r){
            state.dashboardRows = mapResultsRows(r[0].results);
            state.dashboardProfiles = mapProfilesRows(r[1].profiles);
            render();
          }).catch(function(){ state.dashboardRows = []; state.dashboardProfiles = []; render(); });
        }
        render();
      });
    }catch(e){
      goBtn.disabled=false; goBtn.textContent='Entrar al panel →';
      setErr('Clave incorrecta. Detalle: '+(e&&e.message?e.message:String(e)));
    }
  };
  passInput.addEventListener('keydown', (e)=>{ if(e.key==='Enter'){ e.preventDefault(); goBtn.click(); } });
  card.appendChild(goBtn);

  wrap.appendChild(card);
  return wrap;
}

const STATUS_LABEL = { not_started:'No iniciada', in_progress:'En progreso', completed:'Completada' };

function viewDashboard(){
  const wrap=el('div','home');
  wrap.appendChild(backButton('Salir del panel del monitor', ()=>{
    state.monitorAuthed=false;
    state.monitorPass='';
    state.dashboardRows=null;
    state.dashboardProfiles=null;
    state.dashboardDoubts=null;
    state.dashboardImgDisputas=null;
    state._monitorTab=null;
    unsubscribeMonitor();
    state.view = homeView();
    render();
  }));

  const card=el('div','panel');
  const head=el('div','panel-head');
  head.appendChild(el('div','panel-eyebrow','Panel del monitor'));
  head.appendChild(el('h1','','Resultados del grupo'));
  card.appendChild(head);
  card.appendChild(el('p','panel-lead','Vista general de todos los estudiantes, y el detalle de cada actividad con puntaje y tiempo invertido.'));

  if(state.dashboardRows===null && state.dashboardProfiles===null){
    card.appendChild(el('p','panel-lead','Cargando…'));
    wrap.appendChild(card);
    return wrap;
  }

  const rows=state.dashboardRows || [];
  const profiles=state.dashboardProfiles || [];

  const allGroups = groupDoubts(state.dashboardDoubts || []);
  const totalPend = allGroups.reduce(function(s,g){ return s + g.pendCount; }, 0);
  const disputes = state.dashboardImgDisputas;
  const pendingDisputes = disputes ? disputes.length : 0;
  const totalPendingAll = totalPend + pendingDisputes;

  // ---- franja de resumen (de un vistazo, siempre visible) ----
  const defaultTab = totalPend ? 'dudas' : pendingDisputes ? 'disputas' : 'actividades';
  const tab = state._monitorTab || defaultTab;
  const stats = el('div','stat-row');
  function statCell(icon, value, label, cellTab){
    const c = el('button','stat-cell is-clickable' + (tab===cellTab ? ' is-active':''));
    c.type = 'button';
    c.innerHTML = '<span class="k">'+icon+' '+esc(label)+'</span><span class="v">'+value+'</span>';
    c.onclick = function(){ state._monitorTab = cellTab; render(); };
    return c;
  }
  stats.appendChild(statCell('🚩', totalPend, 'Dudas pendientes', 'dudas'));
  stats.appendChild(statCell('✏️', pendingDisputes, 'Por revisar', 'disputas'));
  stats.appendChild(statCell('👥', profiles.length, 'Perfiles', 'perfiles'));
  stats.appendChild(statCell('📊', rows.length, 'Informes', 'informes'));
  card.appendChild(stats);

  // ---- pestañas: una por estadística, cada una independiente ----
  const tabsRow = el('div','panel-tabs');
  function tabBtn(id, label, badge){
    const b = el('button','panel-tab' + (tab===id ? ' is-active':''),
      esc(label) + (badge ? ' <span class="panel-tab-badge">'+badge+'</span>' : ''));
    b.type = 'button';
    b.onclick = function(){ state._monitorTab = id; render(); };
    return b;
  }
  tabsRow.appendChild(tabBtn('dudas', 'Dudas', totalPend || ''));
  tabsRow.appendChild(tabBtn('disputas', 'Por revisar', pendingDisputes || ''));
  tabsRow.appendChild(tabBtn('actividades', 'Actividades'));
  tabsRow.appendChild(tabBtn('perfiles', 'Perfiles'));
  tabsRow.appendChild(tabBtn('informes', 'Informes'));
  card.appendChild(tabsRow);

  if(tab === 'dudas'){
    // ---- Dudas de los estudiantes (agrupadas por pregunta, en tiempo real) ----
    if(state._doubtError){
      card.appendChild(el('p','panel-note is-bad', esc(state._doubtError)));
    }

    if(state.dashboardDoubts === null){
      card.appendChild(el('p','panel-foot','Cargando dudas…'));
    } else if(!allGroups.length){
      card.appendChild(el('p','panel-foot','Ningún estudiante ha marcado preguntas con dudas todavía. Aparecen aquí cuando alguien toca "No entiendo esta pregunta" durante una actividad.'));
    } else {
      const totalMarks = allGroups.reduce(function(s,g){ return s + g.total; }, 0);
      card.appendChild(el('p','panel-foot',
        allGroups.length + ' pregunta' + (allGroups.length===1?'':'s') + ' · ' +
        totalMarks + ' marca' + (totalMarks===1?'':'s') + ' en total'));

      // filtro por módulo (solo si hay dudas de más de un módulo)
      const modsWithDoubts = [];
      allGroups.forEach(function(g){
        if(!modsWithDoubts.some(function(m){ return m.id === g.mod; })){
          modsWithDoubts.push({ id:g.mod, label:g.modT });
        }
      });
      if(state._doubtFilter && !modsWithDoubts.some(function(m){ return m.id === state._doubtFilter; })){
        state._doubtFilter = '';
      }
      if(modsWithDoubts.length > 1){
        const chips = el('div','dfilter');
        const mk = function(id, label, count){
          const b = el('button','dfilter-chip' + ((state._doubtFilter||'') === id ? ' is-active' : ''),
            esc(label) + ' (' + count + ')');
          b.type = 'button';
          b.onclick = function(){ state._doubtFilter = id; render(); };
          return b;
        };
        chips.appendChild(mk('', 'Todos', allGroups.length));
        modsWithDoubts.forEach(function(m){
          chips.appendChild(mk(m.id, m.label, allGroups.filter(function(g){ return g.mod === m.id; }).length));
        });
        card.appendChild(chips);
      }

      const flt = state._doubtFilter || '';
      const shown = flt ? allGroups.filter(function(g){ return g.mod === flt; }) : allGroups;
      const active = shown.filter(function(g){ return !g.allResolved; });
      const done = shown.filter(function(g){ return g.allResolved; });

      card.appendChild(el('div','panel-section','Por responder' + (active.length ? ' · ' + active.length : '')));
      if(active.length){
        const list = el('div','dgroup-list');
        active.forEach(function(g){ list.appendChild(doubtGroupCard(g)); });
        card.appendChild(list);
      } else {
        card.appendChild(el('p','panel-foot','No hay preguntas pendientes en esta vista. 🎉'));
      }

      card.appendChild(el('div','panel-section','Respondidas' + (done.length ? ' · ' + done.length : '')));
      if(done.length){
        const list = el('div','dgroup-list');
        done.forEach(function(g){ list.appendChild(doubtGroupCard(g)); });
        card.appendChild(list);
      } else {
        card.appendChild(el('p','panel-foot','Todavía no has respondido ninguna.'));
      }
    }
  }

  if(tab === 'disputas'){
    // ---- Disputas de "señalar estructuras" (respuestas marcadas por revisar) ----
    if(disputes === null){
      card.appendChild(el('p','panel-foot','Cargando…'));
    } else if(!disputes.length){
      card.appendChild(el('p','panel-foot','Ningún estudiante ha marcado una respuesta para revisión todavía. Aparecen aquí cuando alguien usa "¿Crees que tu respuesta también es correcta?" en "Señalar estructuras".'));
    } else {
      const pending = disputes.filter(function(d){ return !d.resolved; });
      const resolved = disputes.filter(function(d){ return d.resolved; });

      card.appendChild(el('div','panel-section','Por responder' + (pending.length ? ' · ' + pending.length : '')));
      if(pending.length){
        const list = el('div','dgroup-list');
        pending.forEach(function(d){ list.appendChild(imgDisputeCard(d)); });
        card.appendChild(list);
      } else {
        card.appendChild(el('p','panel-foot','No hay respuestas pendientes de revisar. 🎉'));
      }

      card.appendChild(el('div','panel-section','Respondidas' + (resolved.length ? ' · ' + resolved.length : '')));
      if(resolved.length){
        const list = el('div','dgroup-list');
        resolved.forEach(function(d){ list.appendChild(imgDisputeCard(d)); });
        card.appendChild(list);
      } else {
        card.appendChild(el('p','panel-foot','Todavía no has respondido ninguna.'));
      }
    }
  }

  if(tab === 'actividades'){
    // ---- Actividades (puntaje + tiempo por estudiante al entrar) ----
    // Solo se muestran las que están habilitadas para los estudiantes: no
    // bloqueadas y con contenido cargado. Al habilitar una nueva, aparece aquí.
    const refreshBtn=el('button','act-btn is-ghost', state._reloadingContent ? 'Buscando…' : '↻ Buscar contenido nuevo');
    refreshBtn.type='button';
    refreshBtn.disabled = !!state._reloadingContent;
    refreshBtn.onclick=()=>{
      state._reloadingContent = true; render();
      _dynamicContentLoaded = false;
      loadDynamicContent().then(function(){ state._reloadingContent = false; render(); });
    };
    card.appendChild(refreshBtn);

    if(state.dashboardProfiles === null){
      card.appendChild(el('p','panel-foot','Cargando datos de los estudiantes…'));
    }
    const grid=el('div','mod-list');
    let anyActivity=false;
    Object.values(CATEGORIES).forEach(cat=>{
      cat.moduleIds.forEach((mid,idx)=>{
        const mod=MODULES[mid];
        if(!mod || isModuleLocked(mid) || !mod.levels.length) return;
        anyActivity=true;
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

        const actBtn=el('button','mod-card'+(touched?' is-ready':''));
        actBtn.type='button';
        const hd=el('div','mod-head');
        hd.appendChild(el('span','mod-num', esc(num)));
        hd.appendChild(el('span','mod-title2', esc(mod.title)));
        actBtn.appendChild(hd);
        actBtn.appendChild(el('p','mod-sub', touched
          ? (touched+' estudiante'+(touched===1?'':'s')+' con actividad'+(avg!==null? ' · promedio '+avg+'%':''))
          : 'Sin datos todavía'));
        if(touched) actBtn.appendChild(el('div','mod-meta','⏱ prom. '+formatHMS(avgTime)));
        actBtn.onclick=()=>{ state.dashboardActivityId=mid; state.view='dashboardActivity'; render(); };
        grid.appendChild(actBtn);
      });
    });
    if(anyActivity){ card.appendChild(grid); }
    else { card.appendChild(el('p','panel-foot','Todavía no hay módulos con contenido cargado.')); }
  }

  if(tab === 'perfiles'){
    // ---- Perfiles registrados (nombre, código, avance, última actividad) ----
    if(state.dashboardProfiles === null){
      card.appendChild(el('p','panel-foot','Cargando perfiles…'));
    } else if(profiles.length === 0){
      card.appendChild(el('p','panel-foot','Todavía no hay ningún estudiante registrado (se crea un perfil automáticamente la primera vez que alguien entra con su código).'));
    } else {
      const sorted = profiles.slice().sort(function(a,b){ return String(b.updated_at||'').localeCompare(String(a.updated_at||'')); });
      const dw = el('div','data-wrap');
      const table = document.createElement('table');
      table.className = 'data-table';
      table.innerHTML = '<thead><tr><th>Nombre</th><th class="mono">Código</th><th class="mono">Niveles completados</th><th class="mono">Última actividad</th></tr></thead>';
      const tbody = document.createElement('tbody');
      sorted.forEach(function(p){
        const doneCount = Object.keys(p.progress || {}).filter(function(k){ return k.indexOf('@') !== 0; }).length;
        const date = p.updated_at ? new Date(p.updated_at).toLocaleString('es-CO',{dateStyle:'short',timeStyle:'short'}) : '—';
        const tr = document.createElement('tr');
        tr.innerHTML = '<td>'+esc(p.name||'—')+'</td><td class="mono">'+esc(p.code||'—')+'</td>'+
          '<td class="mono">'+doneCount+'</td><td class="mono">'+esc(date)+'</td>';
        tbody.appendChild(tr);
      });
      table.appendChild(tbody);
      dw.appendChild(table);
      card.appendChild(dw);
    }
    card.appendChild(el('p','panel-foot','Se crea un perfil automáticamente la primera vez que un estudiante entra con su código, aunque todavía no complete ninguna actividad.'));
  }

  if(tab === 'informes'){
    // ---- Informes enviados por estudiante (en tiempo real) ----
    if(state.dashboardRows === null){
      card.appendChild(el('p','panel-foot','Cargando informes…'));
    } else if(rows.length===0){
      card.appendChild(el('p','panel-foot','Ningún estudiante ha enviado su informe todavía (se envía automáticamente al completar un nivel).'));
    } else {
      const dw=el('div','data-wrap');
      const table=document.createElement('table');
      table.className='data-table';
      table.innerHTML = '<thead><tr><th>Nombre</th><th class="mono">Código</th><th class="mono">General</th><th class="mono">Fecha</th></tr></thead>';
      const tbody=document.createElement('tbody');
      rows.forEach(r=>{
        const tr=document.createElement('tr');
        const cls = r.overall>=80?'good': r.overall>=60?'warn':'bad';
        const date = r.timestamp? new Date(r.timestamp).toLocaleString('es-CO',{dateStyle:'short',timeStyle:'short'}) : '—';
        tr.innerHTML = '<td>'+esc(r.name||'—')+'</td><td class="mono">'+esc(r.code||'—')+'</td>'+
          '<td class="mono"><span class="pill-score '+cls+'">'+r.overall+'%</span></td>'+
          '<td class="mono">'+esc(date)+'</td>';
        tbody.appendChild(tr);
      });
      table.appendChild(tbody);
      dw.appendChild(table);
      card.appendChild(dw);
    }
    card.appendChild(el('p','panel-foot','Cada estudiante inicia sesión con su código estudiantil, así que cada fila corresponde a una persona (no hay riesgo de duplicados por nombres repetidos).'));
  }

  wrap.appendChild(card);
  return wrap;
}

function viewDashboardActivity(){
  const mod = MODULES[state.dashboardActivityId];
  const wrap=el('div','home');
  wrap.appendChild(backButton('Volver al panel del monitor', ()=>{ state.view='dashboard'; render(); }));

  const card=el('div','panel');
  const head=el('div','panel-head');
  head.appendChild(el('div','panel-eyebrow','Detalle de actividad'));
  head.appendChild(el('h1','', mod? esc(mod.title) : 'Actividad'));
  card.appendChild(head);

  const profiles = state.dashboardProfiles || [];
  const students=[];
  profiles.forEach(p=>{
    const st = moduleStatsFromProfile(p, state.dashboardActivityId);
    if(st && st.status!=='not_started'){ students.push({name:p.name, code:p.code, ...st}); }
  });

  if(students.length===0){
    card.appendChild(el('p','panel-lead','Todavía ningún estudiante ha comenzado esta actividad.'));
    wrap.appendChild(card);
    return wrap;
  }

  students.sort((a,b)=> b.elapsedSec - a.elapsedSec);

  const total = students.length;
  const completed = students.filter(s=>s.status==='completed').length;
  const avgTime = students.reduce((a,s)=>a+s.elapsedSec,0)/total;
  const scored = students.filter(s=>s.avgScore!==null);
  const avgScore = scored.length? Math.round(scored.reduce((a,s)=>a+s.avgScore,0)/scored.length) : null;

  const stats=el('div','stat-row');
  stats.innerHTML =
    '<div class="stat-cell"><span class="k">Estudiantes</span><span class="v">'+total+'</span></div>'+
    '<div class="stat-cell"><span class="k">Completaron</span><span class="v '+(completed===total?'good':'warn')+'">'+completed+' / '+total+'</span></div>'+
    '<div class="stat-cell"><span class="k">Tiempo prom.</span><span class="v">'+formatHMS(avgTime)+'</span></div>'+
    (avgScore!==null ? '<div class="stat-cell"><span class="k">Puntaje prom.</span><span class="v '+(avgScore>=80?'good':avgScore>=60?'warn':'bad')+'">'+avgScore+'%</span></div>' : '');
  card.appendChild(stats);

  card.appendChild(el('div','panel-section','Por estudiante · ordenado por tiempo'));
  const dw=el('div','data-wrap');
  const table=document.createElement('table');
  table.className='data-table';
  table.innerHTML = '<thead><tr><th>Nombre</th><th class="mono">Código</th><th>Estado</th><th class="mono">Puntaje</th><th class="mono">Tiempo</th></tr></thead>';
  const tbody=document.createElement('tbody');
  students.forEach(s=>{
    const tr=document.createElement('tr');
    const stCls = s.status==='completed'?'done':'wip';
    const scoreTxt = s.avgScore!==null ? s.avgScore+'% ('+s.done+'/'+s.total+')' : (s.done+'/'+s.total+' niveles');
    tr.innerHTML =
      '<td>'+esc(s.name||'—')+'</td>'+
      '<td class="mono">'+esc(s.code||'—')+'</td>'+
      '<td><span class="tag-state '+stCls+'">'+esc(STATUS_LABEL[s.status])+'</span></td>'+
      '<td class="mono">'+esc(scoreTxt)+'</td>'+
      '<td class="mono">'+formatHMS(s.elapsedSec)+'</td>';
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  dw.appendChild(table);
  card.appendChild(dw);

  wrap.appendChild(card);
  return wrap;
}

/* ============================================================
   INIT
   ============================================================ */
// Precarga mientras el usuario escribe su código: así el login es casi
// instantáneo (no espera ni la sesión de Firebase ni las preguntas).
initFirestore();
loadDynamicContent();
render();

setTimeout(checkForUpdate, 20000);
setInterval(checkForUpdate, 6 * 60 * 1000);
document.addEventListener('visibilitychange', function(){ if(!document.hidden) checkForUpdate(); });

})();
