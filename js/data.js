/* =====================================================================
   A PULSO · Archivo único de contenidos
   ---------------------------------------------------------------------
   Todo lo que se ve en el sitio sale de este archivo: textos, fotos,
   barrios, episodios, trabajos de estudiantes y créditos.

   Cómo editar:
   - Cambia los textos entre comillas. No borres las comas ni las llaves.
   - Todo lo marcado con [PENDIENTE] lo debe completar el equipo.
     Mientras tenga [PENDIENTE], el sitio lo muestra resaltado.
   - Fotos: ponlas en /img/<carpeta>/ en dos tamaños: nombre.webp
     (grande, máx. 1600 px) y nombre-sm.webp (máx. 720 px).
     En "w" y "h" va el tamaño de la versión grande en píxeles.
   ===================================================================== */

/* Atajo para describir una foto: ruta (sin .webp), ancho, alto y datos */
const foto = (src, w, h, datos = {}) => ({ src, w, h, ...datos });

const EQUIPO_FOTO = "Y. Martínez";

window.SITE = {
  meta: {
    titulo: "A PULSO · El oficio letrerista del Centro Histórico de Barranquilla",
    descripcion:
      "Proyecto editorial sobre el oficio letrerista y el patrimonio gráfico del Centro Histórico de Barranquilla: galería, entrevistas, recorrido por barrios y talleres.",
  },

  nav: [
    { id: "proyecto", texto: "El proyecto" },
    { id: "historia", texto: "Historia" },
    { id: "letrerista", texto: "El letrerista" },
    { id: "entrevistas", texto: "Entrevistas" },
    { id: "barrios", texto: "Barrios" },
    { id: "taller", texto: "Taller" },
    { id: "oficio", texto: "El oficio" },
  ],

  /* ---------------- 1. INICIO ---------------- */
  hero: {
    logo: foto("img/logo-apulso", 1073, 1100, { alt: "A PULSO, escrito en letra rotulada a pincel con degradado amarillo, rojo y verde" }),
    subtitulo:
      "Proyecto editorial sobre el oficio letrerista y el patrimonio gráfico del Centro Histórico de Barranquilla",
    frase: "Barranquilla se escribe a mano. Ven a conocer a quienes la pintan.",
    botones: [
      { texto: "Ver la galería", destino: "#barrios", estilo: "amarillo" },
      { texto: "Conoce el proyecto", destino: "#proyecto", estilo: "rojo" },
    ],
  },

  /* ---------------- 2. EL PROYECTO ---------------- */
  proyecto: {
    antetitulo: "¿Qué es",
    titulo: "A PULSO?",
    parrafos: [
      "Una cartilla y una galería sobre los letreros pintados a mano del Centro Histórico de Barranquilla.",
      "Caminamos Barrio Abajo, El Centro y San Roque, entramos al taller de Yeison Romero y lo juntamos todo en una guía para que tú también aprendas a hacer letras a pulso.",
    ],
    contenido: [
      { num: "1", titulo: "La historia", texto: "De Pompeya a Barranquilla." },
      { num: "2", titulo: "El letrerista", texto: "Yeison Romero y su oficio." },
      { num: "3", titulo: "El oficio", texto: "Herramientas, trazos y el proceso paso a paso." },
      { num: "4", titulo: "Consejos del maestro", texto: "Lo que debes saber para empezar." },
      { num: "5", titulo: "Plantillas", texto: "Para imprimir y practicar." },
    ],
    cartilla: {
      portada: foto("img/portada-cartilla", 900, 1350, { alt: "Portada de la cartilla A PULSO: el título en letra rotulada sobre una pared blanca con una hoja de palma" }),
      /* Flipbook para leer en línea (no se descarga) */
      flipbook: "https://heyzine.com/flip-book/86956347db.html#page/1",
      detalle: "83 páginas · Lectura en línea",
      /* El botón para leer se habilita solo en esta fecha (hora de Colombia, UTC-5).
         Deja "" para que esté disponible desde ya. */
      disponibleDesde: "2026-12-04T00:00:00-05:00",
      textoEspera: "La cartilla se podrá leer en línea el 4 de diciembre de 2026",
    },
    creditos: {
      institucion: "Institución Universitaria de Barranquilla",
      programa: "Programa de Diseño Gráfico",
      lugar: "Barranquilla, Colombia · 2026",
    },
  },

  /* ---------------- 3. LÍNEA DE TIEMPO ----------------
     color: rojo | vivo | hoja | petroleo | turquesa | mango | letrero  */
  historia: {
    titulo: "Historia del letrerismo",
    intro: "2.000 años de letras pintadas en 7 paradas. Sigue bajando y recórrelas.",
    hitos: [
      {
        fecha: "Siglo I d. C.", lugar: "Pompeya", color: "hoja",
        titulo: "Campañas a pincel",
        texto: "Sus muros conservan unos 2.500 avisos electorales pintados a pincel.",
        img: foto("img/hitos/pompeya-fragmento", 222, 215, { alt: "Fragmento de muro romano con una inscripción pintada en letras rojas" }),
        fuente: "Fuentes: Larwood y Hotten (1866/1908); Campbell (s. f.); Museo Archeologico Nazionale di Napoli (s. f.). Imagen: fragmento «L·ALBVCIVM·AED», S. Granata, MANN.",
      },
      {
        fecha: "1393", lugar: "Inglaterra", color: "vivo",
        titulo: "Sin letrero, sin cerveza",
        texto: "El rey Ricardo II obligó a las cervecerías a colgar un letrero en la puerta.",
        img: foto("img/hitos/jarra-1393", 200, 283, { alt: "Jarra de cerveza de cerámica decorada, con tapa de metal" }),
        fuente: "Fuente: Inn Sign Society (s. f.).",
      },
      {
        fecha: "1440", lugar: "Alemania", color: "turquesa",
        titulo: "Llega la imprenta",
        texto: "La letra impresa se repite idéntica; la pintada sigue siendo única.",
        img: foto("img/hitos/imprenta", 552, 458, { alt: "Prensa de imprenta antigua de hierro y madera" }),
        fuente: "Fuente: Encyclopaedia Britannica (s. f.).",
      },
      {
        fecha: "Siglo XVIII", lugar: "Europa y América", color: "mango",
        titulo: "Nace el oficio",
        texto: "Las fachadas se vuelven anuncio y el pintor de letreros aprende en el taller.",
        img: foto("img/hitos/movers", 592, 424, { alt: "Letrero antiguo pintado a mano que dice West Haven Trucking Co., Movers, Storage" }),
        fuente: "Fuentes: Lennie (2015); Checa-Artasu y Castro Rodríguez (2015). Imagen: Cristian Roldan Art.",
      },
      {
        fecha: "1891 – 1903", lugar: "México y Estados Unidos", color: "letrero",
        titulo: "Un inspector y un manual",
        texto: "México vigila la ortografía de los rótulos y en EE. UU. sale un manual para rotular a pincel.",
        img: foto("img/hitos/mexico-manual", 647, 900, { alt: "Bandera de México sobre la Catedral Metropolitana y la portada de un manual antiguo de rotulación" }),
        fuente: "Fuentes: Sánchez Parra (2020); Thompson (1903).",
      },
      {
        fecha: "1960 – 1990", lugar: "Colombia", color: "rojo",
        titulo: "Llega a Colombia",
        texto: "En 1960 ya se enseñaba en Bogotá; el vinilo de los 90 lo reduce, pero no lo borra.",
        img: foto("img/collage/ruteros", 417, 333, { alt: "Tablas de ruta de buses pintadas a mano con nombres de barrios de Bogotá" }),
        fuente: "Fuente: Martínez Vergara y Lozano Arango (2023). Imagen: A. Puentes, People’s Graphic Design Archive.",
      },
      {
        fecha: "Siglo XXI", lugar: "Barranquilla", color: "petroleo",
        titulo: "Hoy, en Barranquilla",
        texto: "Sigue vivo en las fachadas del Centro. Aquí empezamos a documentarlo.",
        img: foto("img/collage/super-combo", 415, 421, { alt: "Letrero pintado a mano: Super Combo, jugo más empanada" }),
        fuente: "Fuente: Martínez Vergara (2023). Imagen: Archivo Popular de Lujo.",
      },
    ],
  },

  /* ---------------- 4. EL LETRERISTA ---------------- */
  letrerista: {
    nombre: "Yeison Romero",
    rol: "Artista plástico",
    foto: foto("img/collage/yeison", 635, 895, { alt: "Retrato en blanco y negro de Yeison Romero, de frente, con camiseta oscura" }),
    bio: [
      "Yeison tiene 28 años y lleva más de quince con un pincel en la mano. Todo empezó en la infancia, entre dibujos, caricaturas y calcomanías, y creció de la mano de su familia y de maestros como Dairo Barrionuevo, José Llanos, Néstor Loaiza y Wilberto Echeverría. Con ellos entendió que este es un oficio vivo: se hereda, y se aprende haciendo.",
      "Hoy es un referente del arte picotero. Su firma brilla en picós y turbos como El Timbalero, El Gran Fredy y El Sibanicú, y sus murales le ponen color a Rebolo, Las Nieves, la Ciudadela 20 de Julio, Carrizal y el Gran Malecón.",
      "Su método mezcla lo de siempre con lo de ahora: cada obra nace como un boceto a lápiz, pasa por el computador y termina en gran formato. La cuadrícula le da la perspectiva; el círculo cromático, todo el sabor.",
    ],
    cita: {
      texto: "Antes de coger un pincel, debes observar.",
      fuente: "Yeison Romero, entrevista del 3 de octubre de 2026",
    },
    consejos: [
      { icono: "ojo", titulo: "Aprende a mirar", texto: "Antes de coger el pincel, observa cómo se mueve la mano." },
      { icono: "pincel", titulo: "Busca un maestro", texto: "Los secretos del oficio se aprenden al lado de alguien que ya lo sabe." },
      { icono: "papel", titulo: "¡No botes tus errores!", texto: "Guárdalos: mañana verás cuánto has mejorado." },
    ],
    /* tipo: debe coincidir con uno de "tipos" */
    tipos: ["Picós", "Telones y murales", "Letreros"],
    obras: [
      foto("img/obras/obras-01", 1600, 1204, { tipo: "Picós", alt: "Panel fluorescente con un DJ con sombrero, notas musicales y consolas de sonido", autor: "Archivo de Yeison Romero" }),
      foto("img/obras/obras-02", 1600, 969, { tipo: "Picós", alt: "Yeison pinta un panel con un guerrero indígena con penacho en colores fluorescentes", autor: "Archivo de Yeison Romero" }),
      foto("img/obras/obras-04", 1600, 1238, { tipo: "Picós", alt: "Panel con dos retratos de hombres, panteras y vegetación en tonos neón", autor: "Archivo de Yeison Romero" }),
      foto("img/obras/obras-03", 1600, 899, { tipo: "Telones y murales", alt: "Telón gigante en una tribuna de estadio con un personaje que mira con binoculares", autor: "Archivo de Yeison Romero" }),
      foto("img/obras/obras-06", 1440, 1378, { tipo: "Picós", alt: "Panel con un retrato y un personaje musculoso entre planetas y llamas", autor: "Archivo de Yeison Romero" }),
      foto("img/obras/obras-07", 1600, 1200, { tipo: "Picós", alt: "Yeison trabaja sobre un panel de picó tendido en el piso del taller", autor: "Archivo de Yeison Romero" }),
      foto("img/obras/obras-08", 1440, 1440, { tipo: "Picós", alt: "Panel enmarcado con una percusionista tocando congas y un micrófono", autor: "Archivo de Yeison Romero" }),
      foto("img/obras/obras-05", 1600, 1202, { tipo: "Telones y murales", alt: "Telón de barra desplegado en la tribuna de un estadio lleno", autor: "Archivo de Yeison Romero" }),
      foto("img/obras/obras-09", 1200, 1600, { tipo: "Picós", alt: "Yeison pinta una superficie curva con un rostro rojo", autor: "Archivo de Yeison Romero" }),
      foto("img/obras/obras-10", 1204, 1600, { tipo: "Picós", alt: "Picó completo con bafles plateados y paneles pintados en colores neón", autor: "Archivo de Yeison Romero" }),
      foto("img/obras/obras-11", 1600, 1220, { tipo: "Picós", alt: "Panel con una figura mitológica de barba larga sobre un mar en llamas", autor: "Archivo de Yeison Romero" }),
      foto("img/obras/obras-12", 1107, 960, { tipo: "Picós", alt: "Yeison pinta un retrato de un hombre con gorra militar", autor: "Archivo de Yeison Romero" }),
      foto("img/obras/obras-13", 1204, 1600, { tipo: "Telones y murales", alt: "Gran tela con un ave de fuego y la palabra NEXUS colgada frente a un edificio", autor: "Archivo de Yeison Romero" }),
      foto("img/obras/obras-14", 1600, 1067, { tipo: "Telones y murales", alt: "Telón con letras grandes extendido en la tribuna de un estadio", autor: "Archivo de Yeison Romero" }),
      foto("img/entrevista-1/entrevista-1-09", 1600, 1200, { tipo: "Letreros", titulo: "A PULSO en degradado neón", alt: "Letrero A PULSO con letras que gotean en verde, amarillo y rojo sobre fondo azul con un disco", autor: EQUIPO_FOTO, fecha: "6 de noviembre de 2026" }),
      foto("img/entrevista-2/entrevista-2-10", 1600, 1200, { tipo: "Letreros", titulo: "A PULSO en letra bloque", alt: "Letrero A PULSO pintado en verde, amarillo y rojo sobre papel amarillo", autor: EQUIPO_FOTO, fecha: "3 de octubre de 2026" }),
      foto("img/entrevista-2/entrevista-2-07", 1200, 1600, { tipo: "Letreros", titulo: "Abecedario tipo bloque", alt: "Abecedario completo pintado a pincel en azul sobre papel amarillo", autor: EQUIPO_FOTO, fecha: "3 de octubre de 2026" }),
      foto("img/entrevista-2/entrevista-2-02", 1600, 1200, { tipo: "Letreros", alt: "Dos canecas pintadas con el número 23 en letras de colores", autor: EQUIPO_FOTO, fecha: "3 de octubre de 2026" }),
    ],
  },

  /* ---------------- 5. ENTREVISTAS ----------------
     embed.tipo: "youtube" (id del video) o "spotify" (id del episodio).
     Mientras el id esté vacío se muestra el afiche de espera. */
  entrevistas: {
    titulo: "Entrevistas",
    intro: "Dale play y siéntate en el taller con Yeison: cómo empezó y cómo nace una letra.",
    episodios: [
      {
        ep: "Ep. 1",
        titulo: "El arte de hacer letras",
        invitado: "Yeison Romero",
        fecha: "14 de noviembre de 2026",
        etiquetaFecha: "Publicado",
        duracion: "11 min",
        color: "vivo",
        /* Video corto del taller que acompaña al episodio */
        video: { src: "video/yeison-taller.mp4", poster: "video/yeison-taller.webp", alt: "Yeison Romero trabaja con aerógrafo en su taller" },
        miniatura: foto("img/entrevista-1/entrevista-1-02", 1200, 1600, { alt: "Yeison Romero pinta con aerógrafo un panel azul con las letras A PULSO" }),
        embed: { tipo: "spotify", id: "3kzMPGXn6pcVPbKgYFKvu5" },
        /* Deja la lista vacía para ocultar la transcripción */
        transcripcion: [],
        galeria: [
          foto("img/entrevista-2/entrevista-2-05", 1600, 900, { alt: "Yeison pinta un abecedario en azul sobre papel amarillo", autor: EQUIPO_FOTO, fecha: "3 de octubre de 2026" }),
          foto("img/entrevista-2/entrevista-2-09", 1600, 900, { alt: "Yeison concentrado mientras pinta un letrero en su mesa de trabajo", autor: EQUIPO_FOTO, fecha: "3 de octubre de 2026" }),
          foto("img/entrevista-2/entrevista-2-03", 1600, 1200, { alt: "Latas de pintura en aerosol de colores sobre una mesa del taller", autor: EQUIPO_FOTO, fecha: "3 de octubre de 2026" }),
          foto("img/entrevista-2/entrevista-2-04", 1600, 1200, { alt: "Panel pintado con un tiburón y un guerrero en llamas", autor: EQUIPO_FOTO, fecha: "3 de octubre de 2026" }),
          foto("img/entrevista-2/entrevista-2-01", 1200, 1600, { alt: "Un telón con letras se pinta extendido en el piso de la calle", autor: EQUIPO_FOTO, fecha: "3 de octubre de 2026" }),
          foto("img/entrevista-1/entrevista-1-03", 1200, 1600, { alt: "Detalle del aerógrafo sobre letras azules en el panel", autor: EQUIPO_FOTO, fecha: "6 de noviembre de 2026" }),
          foto("img/entrevista-1/entrevista-1-05", 900, 1600, { alt: "Letras minúsculas en degradado pintadas sobre papel en el piso", autor: EQUIPO_FOTO, fecha: "6 de noviembre de 2026" }),
          foto("img/entrevista-1/entrevista-1-08", 1200, 1600, { alt: "Yeison agachado pinta un abecedario con efectos sobre papel", autor: EQUIPO_FOTO, fecha: "6 de noviembre de 2026" }),
          foto("img/entrevista-1/entrevista-1-01", 1600, 1200, { alt: "Panel terminado con un beisbolista y la palabra Hollywood en neón", autor: EQUIPO_FOTO, fecha: "6 de noviembre de 2026" }),
          foto("img/entrevista-1/entrevista-1-10", 1200, 1600, { alt: "Yeison pinta con aerosol el contorno de un abecedario", autor: EQUIPO_FOTO, fecha: "6 de noviembre de 2026" }),
        ],
      },
    ],
  },

  /* ---------------- 6. RECORRIDO POR BARRIOS ----------------
     mapa: posición del punto en el mapa ilustrado (0 a 100). */
  barrios: {
    titulo: "Recorrido por barrios",
    intro: "Tres barrios del Centro Histórico y un montón de letreros por descubrir. Toca uno en el mapa y sal a caminar con nosotros.",
    nota: "Mapa ilustrado, no está a escala.",
    lista: [
      {
        id: "barrio-abajo", nombre: "Barrio Abajo", color: "vivo",
        descripcion: "Aquí las esquinas se pintan de arriba abajo: murales, casetas y letreros que te dicen, sin preguntar, en qué barrio estás.",
        mapa: { x: 24, y: 34 },
        fotos: [
          foto("img/barrio-abajo/barrio-abajo-02", 1200, 1600, { titulo: "Restaurante La Negra del Sabor", alt: "Letrero de caballete con las palabras Restaurante La Negra del Sabor frente a una fachada amarilla", fecha: "25 de octubre de 2026", autor: EQUIPO_FOTO }),
          foto("img/barrio-abajo/barrio-abajo-05", 1200, 1600, { titulo: "Barrio Abajo, 1er tesoro cultural", alt: "Muro blanco pintado con el texto Barrio Abajo, primer tesoro cultural de Barranquilla, y un personaje", fecha: "25 de octubre de 2026", autor: EQUIPO_FOTO }),
          foto("img/barrio-abajo/barrio-abajo-03", 1200, 1600, { titulo: "Muro de barra futbolera", alt: "Muro de bloques con escudo, banderas y letras pintadas a mano", fecha: "25 de octubre de 2026", autor: EQUIPO_FOTO }),
          foto("img/barrio-abajo/barrio-abajo-06", 1600, 1200, { titulo: "Casa esquinera pintada", alt: "Casa esquinera cubierta de murales de colores bajo un árbol", fecha: "25 de octubre de 2026", autor: EQUIPO_FOTO }),
          foto("img/barrio-abajo/barrio-abajo-04", 1200, 1600, { titulo: "Hostal Barrio Abajo", alt: "Fachada amarilla con el letrero Hostal Barrio Abajo y figuras de carnaval pintadas", fecha: "25 de octubre de 2026", autor: EQUIPO_FOTO }),
          foto("img/barrio-abajo/barrio-abajo-07", 1600, 1200, { titulo: "Caseta El Toro Sentado", alt: "Fachada blanca y azul con el letrero Caseta El Toro Sentado y cuadros pintados arriba", fecha: "25 de octubre de 2026", autor: EQUIPO_FOTO }),
          foto("img/barrio-abajo/barrio-abajo-08", 1200, 1600, { titulo: "Dotaciones y señalización", alt: "Fachada gris con letreros pintados de dotaciones, elementos de protección personal y señalización", fecha: "25 de octubre de 2026", autor: EQUIPO_FOTO }),
        ],
      },
      {
        id: "el-centro", nombre: "El Centro", color: "petroleo",
        descripcion: "El corazón del comercio: maderas, colchones y puertas, con la lista de productos pintada en la fachada para que nadie se pierda.",
        mapa: { x: 60, y: 44 },
        fotos: [
          foto("img/el-centro/el-centro-01", 896, 1195, { titulo: "Hilera de fachadas", alt: "Calle con fachadas amarilla, roja y azul y letreros pintados, entre ellos Maderas Ríos Mar", autor: EQUIPO_FOTO }),
          foto("img/el-centro/el-centro-07", 896, 1195, { titulo: "Maderas Ríos Mar", alt: "Fachada amarilla con el letrero Maderas Ríos Mar y una lista de maderas: cedro, roble, cativo, ceiba", autor: EQUIPO_FOTO }),
          foto("img/el-centro/el-centro-03", 896, 1195, { titulo: "Distribuciones Cano", alt: "Fachada azul y amarilla con el letrero Distribuciones Cano: colchones, clóset, somier, comedor", autor: EQUIPO_FOTO }),
          foto("img/el-centro/el-centro-04", 896, 1195, { titulo: "Puertas y ventanas Alix", alt: "Fachada verde con el letrero Puertas y ventanas Alix y la palabra cocinas", autor: EQUIPO_FOTO }),
          foto("img/el-centro/el-centro-02", 896, 1195, { titulo: "Fachada azul", alt: "Fachada azul intensa con letreros verticales pintados a mano y cortina metálica", autor: EQUIPO_FOTO }),
          foto("img/el-centro/el-centro-05", 1053, 1024, { titulo: "Aluminios El Viejo Pedro", alt: "Fachada roja y azul con el letrero Aluminios El Viejo Pedro", autor: EQUIPO_FOTO }),
          foto("img/el-centro/el-centro-06", 896, 1195, { titulo: "Inversiones Shadannis", alt: "Fachada amarilla con el letrero Inversiones Shadannis, clóset y puertas, y una cortina verde", autor: EQUIPO_FOTO }),
        ],
      },
      {
        id: "san-roque", nombre: "San Roque", color: "hoja",
        descripcion: "Restaurantes, tiendas y misceláneas donde cada letrero tiene su propia letra: cursiva, bloque y todo lo que hay en el medio.",
        mapa: { x: 48, y: 74 },
        fotos: [
          foto("img/san-roque/san-roque-03", 1200, 1600, { titulo: "Restaurante La Vieja Elvira", alt: "Letrero de pie con las palabras Restaurante La Vieja Elvira y un plato pintado", fecha: "25 de octubre de 2026", autor: EQUIPO_FOTO }),
          foto("img/san-roque/san-roque-04", 1600, 1200, { titulo: "Tienda y estadero", alt: "Fachada roja y blanca con el letrero Tienda y Estadero y un paisaje pintado", fecha: "25 de octubre de 2026", autor: EQUIPO_FOTO }),
          foto("img/san-roque/san-roque-02", 1200, 1600, { titulo: "Todo lo puedo en Cristo", alt: "Letrero pintado que dice Todo lo puedo en Cristo que me fortalece, Filipenses 4:13", fecha: "25 de octubre de 2026", autor: EQUIPO_FOTO }),
          foto("img/san-roque/san-roque-01", 1600, 1200, { titulo: "Distribuidora", alt: "Fachada blanca y azul con la palabra Distribuidora en letra cursiva roja", fecha: "25 de octubre de 2026", autor: EQUIPO_FOTO }),
          foto("img/san-roque/san-roque-09", 1600, 1200, { titulo: "Maderas La Campiña", alt: "Fachada con el letrero Maderas La Campiña y una lista de maderas: canelo, mazábalo, roble, cedro", fecha: "25 de octubre de 2026", autor: EQUIPO_FOTO }),
          foto("img/san-roque/san-roque-05", 1200, 1600, { titulo: "En Barranquilla me quedo", alt: "Mural con escudo de fútbol, flores y la frase En Barranquilla me quedo", fecha: "25 de octubre de 2026", autor: EQUIPO_FOTO }),
          foto("img/san-roque/san-roque-06", 1600, 1200, { titulo: "Reflectores y canaletas", alt: "Muro con letreros pintados: venta de reflectores, canaletas, lámparas y gabinetes", fecha: "25 de octubre de 2026", autor: EQUIPO_FOTO }),
          foto("img/san-roque/san-roque-07", 1200, 1600, { titulo: "Miscelánea", alt: "Casa morada con el letrero de una miscelánea en letras blancas", fecha: "25 de octubre de 2026", autor: EQUIPO_FOTO }),
          foto("img/san-roque/san-roque-08", 1200, 1600, { titulo: "Tienda El Bacano", alt: "Pared blanca con el letrero Tienda El Bacano junto a una cortina azul", fecha: "25 de octubre de 2026", autor: EQUIPO_FOTO }),
          foto("img/san-roque/san-roque-10", 1600, 1200, { titulo: "Maderas Brittany", alt: "Muro con cuadros rojos y blancos y el letrero Maderas Brittany", fecha: "25 de octubre de 2026", autor: EQUIPO_FOTO }),
          foto("img/san-roque/san-roque-11", 1600, 1200, { titulo: "Se vende esta propiedad", alt: "Fachada blanca con letreros Se vende esta propiedad y Puertas y ventanas El Cedro", fecha: "25 de octubre de 2026", autor: EQUIPO_FOTO }),
          foto("img/san-roque/san-roque-12", 1600, 1200, { titulo: "D. Jr., materiales para colchones", alt: "Fachada amarilla con letreros de venta de telas, espumas y forros para colchones", fecha: "25 de octubre de 2026", autor: EQUIPO_FOTO }),
          foto("img/san-roque/san-roque-13", 1200, 1600, { titulo: "Biselados Kimberly", alt: "Fachada azul con el letrero Biselados Kimberly en letras blancas", fecha: "25 de octubre de 2026", autor: EQUIPO_FOTO }),
        ],
      },
    ],
  },

  /* ---------------- 7. TALLER CON ESTUDIANTES ---------------- */
  taller: {
    titulo: "Taller con estudiantes",
    intro: "Pusimos a prueba la cartilla con estudiantes de la IUB en noviembre de 2026. Así les fue.",
    proceso: [
      { titulo: "Trazos básicos", texto: "Rectas, curvas y arcos." },
      { titulo: "Abecedario bloque", texto: "Letra por letra, sobre plantilla." },
      { titulo: "Letra con efectos", texto: "Volumen, degradado y sombra." },
      { titulo: "Evaluación", texto: "[PENDIENTE: describir cómo se evaluó la cartilla.]" },
    ],
    /* Comparaciones antes/después: deja antes/despues en null para ver el espacio de espera */
    comparaciones: [
      { titulo: "[PENDIENTE: ejercicio 1]", antes: null, despues: null, pie: "[PENDIENTE: nombre del estudiante o anónimo, fecha]" },
    ],
    galeria: [
      foto("img/taller/taller-03", 1200, 1600, { alt: "Estudiante rellena con resaltador el abecedario con efectos", autor: EQUIPO_FOTO, fecha: "18 de noviembre de 2026" }),
      foto("img/taller/taller-06", 1600, 1200, { alt: "Tres estudiantes practican sobre las plantillas en una mesa", autor: EQUIPO_FOTO, fecha: "18 de noviembre de 2026" }),
      foto("img/taller/taller-02", 1200, 1600, { alt: "Estudiante practica el abecedario con pincel y una paleta de pintura", autor: EQUIPO_FOTO, fecha: "11 de noviembre de 2026" }),
      foto("img/taller/taller-04", 1600, 1200, { alt: "Estudiantes trabajan con plantillas junto a una tableta y un portátil", autor: EQUIPO_FOTO, fecha: "18 de noviembre de 2026" }),
      foto("img/taller/taller-01", 900, 1600, { alt: "Estudiante practica trazos curvos en amarillo sobre una plantilla", autor: EQUIPO_FOTO, fecha: "11 de noviembre de 2026" }),
      foto("img/taller/taller-05", 1600, 1200, { alt: "Grupo de estudiantes conversa alrededor de un portátil con la cartilla", autor: EQUIPO_FOTO, fecha: "18 de noviembre de 2026" }),
      foto("img/taller/taller-07", 900, 1600, { alt: "Estudiante pinta letras con marcadores sobre una hoja de práctica", autor: EQUIPO_FOTO, fecha: "18 de noviembre de 2026" }),
    ],
    videos: [
      { src: "video/taller-clip-1.mp4", poster: "video/taller-clip-1.webp", alt: "Estudiante practica letras sobre la plantilla", vertical: true },
      { src: "video/taller-clip-3.mp4", poster: "video/taller-clip-3.webp", alt: "Tres estudiantes practican en la mesa de trabajo", vertical: false },
      { src: "video/taller-clip-4.mp4", poster: "video/taller-clip-4.webp", alt: "Estudiante con resaltador sobre el abecedario con efectos", vertical: true },
    ],
    testimonios: [
      { texto: "[PENDIENTE: testimonio corto de un estudiante]", autor: "[PENDIENTE: nombre o “Estudiante de Diseño Gráfico”]", color: "mango" },
      { texto: "[PENDIENTE: testimonio corto de un estudiante]", autor: "[PENDIENTE]", color: "turquesa" },
      { texto: "[PENDIENTE: testimonio corto de un estudiante]", autor: "[PENDIENTE]", color: "rosado" },
    ],
    /* Resultados: cambia valor: null por el número real (0 a 100 si es %).
       Mientras sea null la barra se muestra punteada con [PENDIENTE]. */
    resultados: [
      { pregunta: "[PENDIENTE: pregunta 1 de la evaluación]", unidad: "%", datos: [
        { etiqueta: "[PENDIENTE]", valor: null, color: "vivo" },
        { etiqueta: "[PENDIENTE]", valor: null, color: "mango" },
        { etiqueta: "[PENDIENTE]", valor: null, color: "hoja" },
      ] },
      { pregunta: "[PENDIENTE: pregunta 2 de la evaluación]", unidad: "%", datos: [
        { etiqueta: "[PENDIENTE]", valor: null, color: "turquesa" },
        { etiqueta: "[PENDIENTE]", valor: null, color: "letrero" },
        { etiqueta: "[PENDIENTE]", valor: null, color: "petroleo" },
      ] },
    ],
  },

  /* ---------------- 8. EL OFICIO PASO A PASO ---------------- */
  oficio: {
    titulo: "El proceso de rotulación en 8 pasos",
    intro: "De una letra sencilla a un letrero con todo el sabor, en 8 pasos.",
    pasos: [
      { titulo: "Estructura base", texto: "Arranca con una letra simple." },
      { titulo: "Grosor", texto: "Engruesa los trazos verticales." },
      { titulo: "Remates", texto: "Juega con las serifas." },
      { titulo: "Suavizado", texto: "Redondea las puntas." },
      { titulo: "Estilo", texto: "Prueba otras formas, como el estilo western." },
      { titulo: "Florituras", texto: "Deja que la letra se salga de la línea." },
      { titulo: "Ornamentación", texto: "Suma adornos." },
      { titulo: "Efectos finales", texto: "Sombras, contornos y brillos." },
    ],
    recuadros: [
      { titulo: "De la mente a la pared", texto: "Idea, boceto a lápiz y, cuando está perfecto, a la pared." },
      { titulo: "El truco de la cuadrícula", texto: "Una cuadrícula como la del cuaderno y tus letras no se tuercen." },
    ],
    plantillas: {
      titulo: "Plantillas de práctica",
      texto: "Cuadrícula, trazos y abecedarios hechos por Yeison Romero. Imprímelas y ¡manos a la obra!",
      archivo: "descargas/a-pulso-plantillas-practica.pdf",
      detalle: "PDF · 13 páginas · 0,9 MB",
    },
  },

  /* ---------------- 9. PIE DE PÁGINA ---------------- */
  footer: {
    equipo: [
      { rol: "Investigación, documentación y trabajo de campo", nombres: "Kasay Romero, Gianna Sánchez y Yuliana Martínez" },
      { rol: "Dirección de arte y diseño editorial", nombres: "Kasay Romero" },
      { rol: "Diseño gráfico e ilustración", nombres: "Kasay Romero, Gianna Sánchez y Yuliana Martínez" },
      { rol: "Fotografía y registro audiovisual", nombres: "Yuliana Martínez" },
      { rol: "Edición y redacción", nombres: "Gianna Sánchez y Yuliana Martínez" },
      { rol: "Corrección de textos", nombres: "Yuliana Martínez" },
      { rol: "Con la participación de", nombres: "el letrerista Yeison Romero y la magíster en Educación, Arte y Cultura Teolinda Berrio" },
    ],
    asesor: "[PENDIENTE: nombre del asesor o asesora]",
    agradecimientos: [
      "A Yeison Romero, por abrirnos su taller y compartir su oficio.",
      "Al diseñador Luis Corena, por su mirada crítica y honesta.",
      "A quienes siguen llenando de color las calles de Barranquilla.",
    ],
    referencias: [
      "Campbell, V. (s. f.). How to win an election in ancient Rome. History Today.",
      "Checa-Artasu, M. M., y Castro Rodríguez, M. P. (2015). El rótulo popular, común denominador del paisaje urbano en México. Instituto Mora.",
      "Engelmann, E. (2002). Safari tipográfico: gráfica y tipografía popular de las calles de Santiago de Chile. ARQ, (50), 44–45.",
      "Inn Sign Society. (s. f.). Inn signs.",
      "Martínez Vergara, R., y Lozano Arango, J. J. (2023). Cuatro reflexiones sobre la rotulación popular, una práctica de diseño en Colombia. Desacatos, (73), 12–29.",
      "Museo Archeologico Nazionale di Napoli. (s. f.). Elections in Pompeii [Exposición en línea]. Google Arts & Culture.",
      "Sánchez Parra, C. (2020). La publicidad de las tiendas por departamentos de la ciudad de México en los albores del siglo XX. Historia Mexicana, 69(4), 1597–1646.",
      "Thompson, W. A. (1903). Modern show card lettering, designs, etc. The Thompson School of Lettering.",
    ],
    /* Si url queda vacío, el QR apunta a la dirección actual del sitio */
    qr: { url: "", texto: "¡Escanéame y comparte!" },
    lema: "Hecho a pulso en Barranquilla",
    derechos: "© 2026 A PULSO. Todos los derechos reservados.",
  },
};
