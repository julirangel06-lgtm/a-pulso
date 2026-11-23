# A PULSO · sitio web

Sitio de una sola página del proyecto editorial **A PULSO**, sobre el oficio letrerista y el patrimonio gráfico del Centro Histórico de Barranquilla.

## Cómo editar el contenido

Todo el contenido está en **`js/data.js`**: textos, fotos, barrios, episodios, trabajos del taller, gráficas y créditos.

- Lo marcado con `[PENDIENTE]` falta por completar. Mientras esté así, el sitio lo muestra con un resaltado amarillo rayado.
- **Fotos nuevas:** guárdalas en `img/<carpeta>/` en dos tamaños, en formato WebP:
  - `nombre.webp`: versión grande, de 1600 px como máximo.
  - `nombre-sm.webp`: versión pequeña, de 720 px como máximo.

  En `data.js` agrégalas con `foto("img/carpeta/nombre", ancho, alto, { alt, titulo, fecha, autor, direccion })`. El ancho y el alto son los de la versión grande.
- **Episodios:** en `embed` pon `tipo: "youtube"` y el id del video (lo que va después de `v=`), o `tipo: "spotify"` y el id del episodio.
- **Gráficas:** cambia `valor: null` por el número real.
- **Antes / después:** en `comparaciones`, cambia `antes: null` y `despues: null` por una foto escrita con `foto(...)`.
- **Código QR:** si `footer.qr.url` queda vacío, el QR apunta a la dirección del sitio.

## Estructura

```
index.html          estructura de la página
css/styles.css      estilos (paleta, marcos, bordes, animaciones)
js/data.js          contenido editable
js/app.js           galerías, lightbox, pestañas, mapa, línea de tiempo
img/                fotos (WebP) y recortes de collage de la cartilla
video/              clips cortos sin sonido
descargas/          cartilla y plantillas en PDF
```

No necesita instalar nada ni compilar. Para verlo en tu computador, ejecuta `python3 -m http.server` en esta carpeta y abre http://localhost:8000.
