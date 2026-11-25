/* A PULSO · lógica del sitio. Los contenidos viven en js/data.js */
(() => {
  "use strict";
  const S = window.SITE;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- utilidades ---------- */
  const esc = (s = "") => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  // Escapa y resalta lo que falta por completar
  const t = (s = "") => esc(s).replace(/\[PENDIENTE[^\]]*\]/g, (m) => `<mark class="pendiente">${m}</mark>`);
  const isPend = (s) => /\[PENDIENTE/.test(String(s || ""));
  const col = (c) => `var(--c-${c || "mango"})`;

  function img(f, { sizes = "(min-width: 900px) 33vw, 100vw", cls = "", eager = false, decor = false } = {}) {
    if (!f) return "";
    const alt = decor ? "" : esc(f.alt || "");
    return `<img class="${cls}" src="${f.src}-sm.webp" srcset="${f.src}-sm.webp ${Math.min(720, f.w)}w, ${f.src}.webp ${f.w}w" sizes="${sizes}" width="${f.w}" height="${f.h}" alt="${alt}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"${decor ? ' aria-hidden="true"' : ""}>`;
  }
  const deco = (name, cls, w, h) => `<img class="deco ${cls}" src="img/collage/${name}.webp" width="${w}" height="${h}" alt="" aria-hidden="true" loading="lazy" decoding="async">`;
  const ast = (cls = "") => `<span class="ast ${cls}" aria-hidden="true">✱</span>`;
  const destello = (cls = "") => `<svg class="destello ${cls}" viewBox="0 0 40 40" aria-hidden="true"><path d="M20 0c1.5 11 5 16.5 20 20-15 3.5-18.5 9-20 20-1.5-11-5-16.5-20-20C15 16.5 18.5 11 20 0z"/></svg>`;

  function pieFoto(f, extra = "") {
    const partes = [];
    if (f.titulo) partes.push(`<strong>${t(f.titulo)}</strong>`);
    if (extra) partes.push(extra);
    const meta = [];
    if (f.direccion !== undefined) meta.push(`Dirección aproximada: ${t(f.direccion)}`);
    if (f.fecha) meta.push(`Fecha: ${t(f.fecha)}`);
    if (f.autor) meta.push(`Foto: ${t(f.autor)}`);
    if (meta.length) partes.push(`<span class="pie-meta">${meta.join(" · ")}</span>`);
    return partes.join("<br>");
  }

  const ICONOS = {
    ojo: `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M4 24s8-13 20-13 20 13 20 13-8 13-20 13S4 24 4 24z" fill="#fff" stroke="#111" stroke-width="3" stroke-linejoin="round"/><circle cx="24" cy="24" r="8" fill="var(--c-turquesa)" stroke="#111" stroke-width="3"/><circle cx="24" cy="24" r="3.5" fill="#111"/><circle cx="27" cy="21" r="1.6" fill="#fff"/></svg>`,
    pincel: `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M30 6l12 12-16 16-12-12z" fill="var(--c-mango)" stroke="#111" stroke-width="3" stroke-linejoin="round"/><path d="M14 22l12 12-4 4c-4 4-12 6-16 6 0-4 2-12 6-16z" fill="var(--c-vivo)" stroke="#111" stroke-width="3" stroke-linejoin="round"/><path d="M33 13l3 3" stroke="#111" stroke-width="3" stroke-linecap="round"/></svg>`,
    papel: `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M10 5h20l9 9v29H10z" fill="#fff" stroke="#111" stroke-width="3" stroke-linejoin="round"/><path d="M30 5v9h9" fill="none" stroke="#111" stroke-width="3" stroke-linejoin="round"/><path d="M16 21h12M16 27h8" stroke="#111" stroke-width="3" stroke-linecap="round"/><path d="M29 30l2.3 4.6 5.1.7-3.7 3.6.9 5.1-4.6-2.4-4.6 2.4.9-5.1-3.7-3.6 5.1-.7z" fill="var(--c-mango)" stroke="#111" stroke-width="2" stroke-linejoin="round"/></svg>`,
  };

  /* ---------- lightbox con grupos ---------- */
  const grupos = {};
  function registrar(grupo, items) { grupos[grupo] = items; }
  function tarjetaFoto(f, grupo, i, sizes) {
    return `<button class="foto-btn" type="button" data-grupo="${grupo}" data-i="${i}" aria-label="Ampliar foto: ${esc(f.titulo || f.alt)}">${img(f, { sizes })}</button>`;
  }

  /* ---------- 0. Navegación ---------- */
  function renderNav() {
    $("#menu").innerHTML = `<ul>${S.nav.map((n, i) => `<li><a href="#${n.id}" style="--c:${col(["vivo", "mango", "turquesa", "hoja", "letrero", "rosado", "vivo"][i % 7])}">${esc(n.texto)}</a></li>`).join("")}</ul>`;
    const btn = $("#btnMenu"), menu = $("#menu");
    btn.addEventListener("click", () => {
      const abierto = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!abierto));
      menu.classList.toggle("abierto", !abierto);
    });
    menu.addEventListener("click", (e) => {
      if (e.target.closest("a")) { btn.setAttribute("aria-expanded", "false"); menu.classList.remove("abierto"); }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.classList.contains("abierto")) { btn.setAttribute("aria-expanded", "false"); menu.classList.remove("abierto"); btn.focus(); }
    });
    const cab = $("#cabecera");
    const onScroll = () => cab.classList.toggle("solida", window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  }

  /* ---------- 1. Inicio ---------- */
  function renderHero() {
    const h = S.hero;
    $("#inicio").innerHTML = `
      <div class="hero__collage" aria-hidden="true">
        <img class="deco h-palma" src="img/collage/palma.webp" width="726" height="624" alt="">
        ${deco("nube-esponjosa", "h-nube1 flota", 800, 329)}
        ${deco("nube-esponjosa", "h-nube2 flota-lento", 800, 329)}
        ${deco("negra-sabor", "h-negra inclina", 334, 354)}
        ${deco("donde-rafa", "h-rafa inclina", 355, 532)}
        ${deco("hoy-no-fio-manana-si", "h-fio inclina", 700, 700)}
        ${deco("asado-cartel", "h-asado inclina", 810, 900)}
        ${deco("latas", "h-latas", 366, 320)}
        ${deco("pinceles-frasco", "h-pinceles", 170, 422)}
        ${deco("loro-2", "h-loro flota", 362, 384)}
        ${ast("h-ast1 gira")}${ast("h-ast2 gira")}${destello("h-dest1 titila")}${destello("h-dest2 titila")}
      </div>
      <div class="hero__centro">
        <h1 id="hero-titulo" class="hero__logo">${img(h.logo, { sizes: "(min-width: 900px) 460px, 78vw", eager: true })}</h1>
        <p class="hero__sub">${t(h.subtitulo)}</p>
        <div class="hero__botones">${h.botones.map((b) => `<a class="boton boton--${b.estilo}" href="${b.destino}">${esc(b.texto)}</a>`).join("")}</div>
        <p class="hero__frase sticker">${t(h.frase)}</p>
      </div>
      <div class="hero__cinta" aria-hidden="true">
        <div class="hero__cinta-pista">${[0, 1].map(() => [
          ["hoy-no-fio-manana-si", 700, 700], ["negra-sabor", 334, 354], ["asado-cartel", 810, 900],
          ["donde-rafa", 355, 532], ["super-combo", 415, 421], ["hoy-no-fio", 0, 0],
        ].filter((x) => x[1]).map(([n, w, h2]) => `<img src="img/collage/${n}.webp" width="${w}" height="${h2}" alt="" loading="lazy" decoding="async"><span class="ast">✱</span>`).join("")).join("")}</div>
      </div>
      <div class="borde borde--abajo" style="--borde:var(--c-rojo)"></div>`;
  }

  /* ---------- 2. El proyecto ---------- */
  function renderProyecto() {
    const p = S.proyecto;
    const coloresContenido = ["vivo", "turquesa", "hoja", "mango", "letrero"];
    $("#proyecto").innerHTML = `
      ${deco("nube-esponjosa", "p-nube flota-lento", 800, 329)}
      <div class="contenedor proyecto__grid">
        <div class="proyecto__texto">
          <h2 id="proyecto-titulo" class="rotulo rotulo--claro revela"><span class="rotulo__chico">${esc(p.antetitulo)}</span> ${esc(p.titulo)}</h2>
          ${p.parrafos.map((x) => `<p>${t(x)}</p>`).join("")}
          <h3 class="subrotulo">¿Qué contiene la cartilla?</h3>
          <ol class="contenido-lista">${p.contenido.map((c, i) => `
            <li class="etiqueta-dentada revela" style="--fondo:${col(coloresContenido[i % 5])}">
              <span class="etiqueta-dentada__num">${esc(c.num)}</span>
              <span><strong>${t(c.titulo)}</strong><br>${t(c.texto)}</span>
            </li>`).join("")}
          </ol>
        </div>
        <aside class="cartilla" aria-label="La cartilla">
          <div class="estampilla-sombra revela"><div class="estampilla">${img(p.cartilla.portada, { sizes: "(min-width: 900px) 360px, 80vw" })}</div></div>
          <div id="descargaCartilla" class="cartilla__descarga"></div>
          <p class="cartilla__detalle">${esc(p.cartilla.detalle)}</p>
          <div class="creditos sticker">
            <strong>${esc(p.creditos.institucion)}</strong><br>${esc(p.creditos.programa)}<br>${esc(p.creditos.lugar)}
          </div>
        </aside>
      </div>
      ${deco("silla", "p-silla", 361, 520)}
      <div class="borde borde--abajo" style="--borde:var(--c-hueso)"></div>`;
    initCuentaRegresiva(p.cartilla);
  }

  /* Cuenta regresiva: el botón de la cartilla se activa en cartilla.disponibleDesde */
  function initCuentaRegresiva(c) {
    const caja = $("#descargaCartilla");
    const meta = c.disponibleDesde ? new Date(c.disponibleDesde).getTime() : 0;
    const boton = `<button type="button" class="boton boton--amarillo boton--grande" id="abrirFlip">📖 Leer la cartilla</button>`;
    const activar = () => { caja.innerHTML = boton; $("#abrirFlip").addEventListener("click", () => abrirFlip(c.flipbook)); };
    if (!meta || Date.now() >= meta) { activar(); return; }
    const piezas = [["dias", "días"], ["horas", "horas"], ["min", "min"], ["seg", "seg"]];
    caja.innerHTML = `
      <div class="cuenta" role="timer" aria-labelledby="cuentaTxt">
        <p class="cuenta__titulo" id="cuentaTxt">${t(c.textoEspera)}</p>
        <div class="cuenta__fichas" aria-hidden="true">
          ${piezas.map(([k, l]) => `<span class="cuenta__ficha"><b data-k="${k}">00</b><small>${l}</small></span>`).join("")}
        </div>
        <p class="sr" aria-live="polite" id="cuentaSr"></p>
        <span class="boton boton--grande boton--bloqueado" aria-disabled="true">🔒 Leer la cartilla</span>
      </div>`;
    const dos = (n) => String(n).padStart(2, "0");
    let ultimoDia = null;
    const tick = () => {
      const r = meta - Date.now();
      if (r <= 0) { clearInterval(id); activar(); return; }
      const v = { dias: Math.floor(r / 864e5), horas: Math.floor(r / 36e5) % 24, min: Math.floor(r / 6e4) % 60, seg: Math.floor(r / 1e3) % 60 };
      $$("[data-k]", caja).forEach((el) => { el.textContent = dos(v[el.dataset.k]); });
      if (v.dias !== ultimoDia) { ultimoDia = v.dias; $("#cuentaSr").textContent = `Faltan ${v.dias} días y ${v.horas} horas.`; }
    };
    tick();
    const id = setInterval(tick, 1000);
  }

  /* Visor de la cartilla (flipbook embebido, sin descarga) */
  function abrirFlip(url) {
    const dlg = $("#visorCartilla"), marco = $("#visorMarco");
    if (!marco.querySelector("iframe")) {
      marco.innerHTML = `<iframe src="${esc(url)}" title="Cartilla A PULSO para leer en línea" allowfullscreen allow="fullscreen" loading="lazy"></iframe>`;
    }
    const origen = document.activeElement;
    dlg.showModal();
    $("#visorCerrar").focus();
    dlg.addEventListener("close", () => origen && origen.focus(), { once: true });
  }

  /* ---------- 3. Línea de tiempo: slide horizontal al bajar ---------- */
  function renderHistoria() {
    const h = S.historia, n = h.hitos.length;
    $("#historia").innerHTML = `
      <div class="hist" id="hist">
        <div class="hist__fijo">
          <div class="contenedor hist__cab">
            <h2 id="historia-titulo" class="rotulo rotulo--degradado revela">${ast()} ${esc(h.titulo)} ${ast()}</h2>
            <p class="intro">${t(h.intro)} <strong class="hist__guia" id="histPistaTxt"></strong></p>
          </div>
          <ol class="hist__pista" id="histPista" aria-label="Línea de tiempo">
            ${h.hitos.map((x, i) => `
            <li class="hito" style="--fondo:${col(x.color)}">
              <span class="hito__num" aria-hidden="true">${i + 1}/${n}</span>
              <div class="hito__img">${img(x.img, { sizes: "260px" })}</div>
              <div class="hito__cuerpo">
                <p class="hito__fecha">${esc(x.fecha)} <span class="hito__lugar">${esc(x.lugar)}</span></p>
                <h3>${t(x.titulo)}</h3>
                <p>${t(x.texto)}</p>
                <p class="hito__fuente">${t(x.fuente)}</p>
              </div>
            </li>`).join("")}
          </ol>
          <div class="hist__barra" aria-hidden="true"><span id="histProg"></span>
            ${h.hitos.map((x, i) => `<i style="left:${(i / (n - 1)) * 100}%"><b>${esc(x.fecha)}</b></i>`).join("")}
          </div>
        </div>
      </div>
      <div class="borde borde--abajo" style="--borde:var(--c-mango)"></div>`;

    const cont = $("#hist"), fijo = $(".hist__fijo", cont), pista = $("#histPista"), prog = $("#histProg"), pistaTxt = $("#histPistaTxt");
    let dist = 0, pend = false, modo = null, stickyRoto = false;
    // La sección queda fija y la pista avanza en horizontal al bajar (celular y escritorio).
    // Con movimiento reducido, o si el navegador no logra fijar la sección, pasa a carrusel manual.
    const aplicarModo = () => {
      const libre = reduceMotion || stickyRoto;
      if (libre === modo) { if (!libre) medir(); return; }
      modo = libre;
      cont.classList.toggle("hist--libre", libre);
      pistaTxt.textContent = libre ? "Desliza para recorrerlas →" : "Sigue bajando y recórrelas ↓";
      pista.style.transform = "";
      cont.style.height = "";
      if (!libre) medir(); else progLibre();
    };
    const medir = () => {
      pista.style.transform = "";
      dist = Math.max(0, pista.scrollWidth - window.innerWidth);
      // se usa el alto real del bloque fijo (svh), que no cambia cuando el navegador del celular esconde su barra
      cont.style.height = `${fijo.offsetHeight + dist}px`;
      mover();
    };
    const mover = () => {
      pend = false;
      if (modo) return;
      const r = cont.getBoundingClientRect();
      const total = cont.offsetHeight - fijo.offsetHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      pista.style.transform = `translate3d(${-p * dist}px,0,0)`;
      prog.style.width = `${p * 100}%`;
      // Respaldo: si estamos en medio del recorrido y el bloque no quedó pegado arriba, el sticky no funciona
      if (!stickyRoto && r.top < -40 && r.bottom > fijo.offsetHeight + 40 && Math.abs(fijo.getBoundingClientRect().top) > 30) {
        stickyRoto = true; aplicarModo();
      }
    };
    const progLibre = () => {
      const max = pista.scrollWidth - pista.clientWidth;
      prog.style.width = `${max > 0 ? (pista.scrollLeft / max) * 100 : 0}%`;
    };
    pista.addEventListener("scroll", () => { if (modo) progLibre(); }, { passive: true });
    window.addEventListener("scroll", () => { if (!pend && !modo) { pend = true; requestAnimationFrame(mover); } }, { passive: true });
    let ancho = window.innerWidth;
    window.addEventListener("resize", () => { if (window.innerWidth !== ancho) { ancho = window.innerWidth; if (!modo) medir(); } });
    window.addEventListener("load", () => { if (!modo) medir(); });
    aplicarModo();
  }

  /* ---------- 4. El letrerista ---------- */
  function renderLetrerista() {
    const L = S.letrerista;
    $("#letrerista").innerHTML = `
      <div class="contenedor letrerista__grid">
        <div class="letrerista__foto revela">
          <span class="circulo" aria-hidden="true"></span>
          ${img(L.foto, { sizes: "(min-width: 900px) 420px, 80vw" })}
          ${deco("pinceles-frasco", "l-pinceles", 170, 422)}
          ${deco("latas", "l-latas", 366, 320)}
          ${ast("l-ast gira")}
        </div>
        <div class="letrerista__texto">
          <h2 id="letrerista-titulo" class="titulo-img revela">
            <img src="img/titulos/yeison-titulo-v2.webp" width="1000" height="631" alt="">
            <span class="sr">${esc(L.nombre)}, ${esc(L.rol)}</span>
          </h2>
          ${L.bio.map((x) => `<p>${t(x)}</p>`).join("")}
        </div>
      </div>
      <figure class="cita contenedor revela">
        <blockquote><p>«${t(L.cita.texto)}»</p></blockquote>
        <figcaption>${t(L.cita.fuente)}</figcaption>
      </figure>
      <div class="contenedor">
        <h3 class="subrotulo subrotulo--oscuro subrotulo--centro">Consejos del maestro</h3>
        <ul class="consejos">${L.consejos.map((c, i) => `
          <li class="consejo revela" style="--fondo:${col(["vivo", "hoja", "turquesa"][i % 3])}; --giro:${[-2, 1.5, -1][i % 3]}deg; --retraso:${i * -1.3}s">
            <span class="consejo__cuerda" aria-hidden="true"></span>
            <div class="consejo__letrero">
              <span class="consejo__icono">${ICONOS[c.icono] || ""}</span>
              <span class="consejo__num">Consejo ${i + 1}</span>
              <h4>${t(c.titulo)}</h4><p>${t(c.texto)}</p>
            </div>
          </li>`).join("")}
        </ul>
        <h3 class="subrotulo subrotulo--oscuro" id="obras-titulo">Galería de obras</h3>
        <div class="filtros" role="group" aria-labelledby="obras-titulo">
          <button class="filtro" aria-pressed="true" data-tipo="*">Todas</button>
          ${L.tipos.map((x) => `<button class="filtro" aria-pressed="false" data-tipo="${esc(x)}">${esc(x)}</button>`).join("")}
        </div>
        <p class="sr" aria-live="polite" id="obrasEstado"></p>
        <div class="masonry" id="obrasGrid"></div>
      </div>
      <div class="borde borde--abajo" style="--borde:var(--c-petroleo)"></div>`;

    const pintarObras = (tipo) => {
      const items = L.obras.filter((o) => tipo === "*" || o.tipo === tipo);
      registrar("obras", items.map((o) => ({ ...o, pie: pieFoto(o, `<span class="pie-tipo">${esc(o.tipo)}</span>`) })));
      $("#obrasGrid").innerHTML = items.map((o, i) => `<div class="masonry__item">${tarjetaFoto(o, "obras", i, "(min-width: 1100px) 30vw, (min-width: 640px) 45vw, 92vw")}</div>`).join("");
      $("#obrasEstado").textContent = `${items.length} obras`;
    };
    pintarObras("*");
    $$(".filtros .filtro", $("#letrerista")).forEach((b) => b.addEventListener("click", () => {
      $$(".filtros .filtro", $("#letrerista")).forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      pintarObras(b.dataset.tipo);
    }));
  }

  /* ---------- 5. Entrevistas ---------- */
  function reproductor(ep, i) {
    const e = ep.embed || {};
    if (e.id) {
      const url = e.tipo === "spotify"
        ? `https://open.spotify.com/embed/episode/${encodeURIComponent(e.id)}`
        : `https://www.youtube-nocookie.com/embed/${encodeURIComponent(e.id)}`;
      const alto = e.tipo === "spotify" ? 232 : 315;
      return `<div class="reproductor reproductor--${e.tipo}"><iframe src="${url}" title="${esc(ep.ep)}: ${esc(ep.titulo)}" height="${alto}" loading="lazy" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" allowfullscreen></iframe></div>`;
    }
    return `<div class="reproductor reproductor--espera" role="note">
      <span class="play" aria-hidden="true">▶</span>
      <p><strong>Reproductor de ${e.tipo === "spotify" ? "Spotify" : "YouTube"}</strong><br><mark class="pendiente">[PENDIENTE: enlace del episodio]</mark></p>
    </div>`;
  }
  function renderEntrevistas() {
    const E = S.entrevistas;
    $("#entrevistas").innerHTML = `
      ${deco("nube-esponjosa", "e-nube flota", 800, 329)}
      <div class="contenedor">
        <h2 id="entrevistas-titulo" class="rotulo rotulo--amarillo revela">${esc(E.titulo)}</h2>
        <p class="intro intro--claro">${t(E.intro)}</p>
        <div class="episodios${E.episodios.length === 1 ? " episodios--uno" : ""}">
          ${E.episodios.map((ep, i) => {
            registrar(`ep${i}`, ep.galeria.map((g) => ({ ...g, pie: pieFoto(g, `${esc(ep.ep)} · ${esc(ep.invitado)}`) })));
            return `
            <article class="afiche revela" style="--fondo:${col(ep.color)}">
              <header class="afiche__cab">
                <span class="afiche__ep">${esc(ep.ep)}</span>
                ${destello("afiche__destello")}
                <h3 class="afiche__titulo">${t(ep.titulo)}</h3>
                <p class="afiche__con">con <strong>${esc(ep.invitado)}</strong></p>
              </header>
              <div class="afiche__cuerpo">
                <div class="afiche__media">
                  <div class="estampilla-sombra"><div class="estampilla estampilla--blanca">${ep.video
                    ? `<video class="afiche__video" src="${ep.video.src}" poster="${ep.video.poster}" muted loop playsinline preload="none" aria-label="${esc(ep.video.alt)}"></video>`
                    : img(ep.miniatura, { sizes: "(min-width: 900px) 520px, 90vw" })}</div></div>
                </div>
                <div class="afiche__info">
                  <dl class="afiche__meta">
                    <div><dt>${esc(ep.etiquetaFecha || "Fecha")}</dt><dd>${t(ep.fecha)}</dd></div>
                    <div><dt>Duración</dt><dd>${t(ep.duracion)}</dd></div>
                  </dl>
                  ${reproductor(ep, i)}
                  ${ep.transcripcion && ep.transcripcion.length ? `<details class="transcripcion">
                    <summary>Leer la transcripción</summary>
                    <div>${ep.transcripcion.map((p) => `<p>${t(p)}</p>`).join("")}</div>
                  </details>` : ""}
                </div>
              </div>
              <ul class="tira" aria-label="Fotos de la sesión">
                ${ep.galeria.map((g, j) => `<li>${tarjetaFoto(g, `ep${i}`, j, "160px")}</li>`).join("")}
              </ul>
            </article>`;
          }).join("")}
        </div>
      </div>
      <div class="borde borde--abajo" style="--borde:var(--c-hoja)"></div>`;
  }

  /* ---------- 6. Barrios: el mapa es la navegación ---------- */
  function mapaSVG(lista) {
    // Formas aproximadas e ilustrativas (no a escala)
    const formas = {
      "barrio-abajo": "M8 18 C 20 6, 40 10, 44 22 C 48 36, 40 50, 26 52 C 12 54, 2 40, 8 18 Z",
      "el-centro": "M42 24 C 58 18, 80 24, 80 40 C 82 56, 70 62, 54 60 C 42 58, 38 44, 42 24 Z",
      "san-roque": "M28 58 C 40 54, 62 58, 68 68 C 74 82, 60 94, 44 92 C 28 90, 20 76, 28 58 Z",
    };
    return `<svg class="mapa__svg" viewBox="0 0 100 100" role="group" aria-label="Mapa ilustrado: toca un barrio para ver sus letreros">
      <defs><pattern id="olas" width="8" height="4" patternUnits="userSpaceOnUse"><path d="M0 2 Q2 0 4 2 T8 2" fill="none" stroke="#fff" stroke-width=".5" opacity=".6"/></pattern></defs>
      <path d="M84 0 C 90 20, 86 40, 92 60 C 96 76, 90 90, 94 100 L100 100 L100 0 Z" fill="var(--c-turquesa)"/>
      <path class="mapa__olas" d="M84 0 C 90 20, 86 40, 92 60 C 96 76, 90 90, 94 100 L100 100 L100 0 Z" fill="url(#olas)"/>
      <text x="95" y="48" class="mapa__rio" transform="rotate(84 95 48)">Río Magdalena</text>
      ${lista.map((b) => `<path class="mapa__barrio" d="${formas[b.id] || ""}" fill="${col(b.color)}" data-barrio="${b.id}"/>`).join("")}
      ${lista.map((b) => `
        <g class="mapa__punto" data-barrio="${b.id}" tabindex="0" role="button" aria-pressed="false" aria-label="Ver los letreros de ${esc(b.nombre)}">
          <circle class="mapa__onda" cx="${b.mapa.x}" cy="${b.mapa.y}" r="4.4"/>
          <circle class="mapa__onda mapa__onda--2" cx="${b.mapa.x}" cy="${b.mapa.y}" r="4.4"/>
          <circle class="mapa__pin" cx="${b.mapa.x}" cy="${b.mapa.y}" r="4.4"/>
          <text x="${b.mapa.x}" y="${b.mapa.y - 7}" text-anchor="middle" class="mapa__nombre">${esc(b.nombre)}</text>
        </g>`).join("")}
    </svg>`;
  }
  function renderBarrios() {
    const B = S.barrios;
    $("#barrios").innerHTML = `
      ${deco("carreta-coco", "b-carreta", 500, 450)}
      ${deco("loro-1", "b-loro flota", 199, 326)}
      <div class="contenedor">
        <h2 id="barrios-titulo" class="rotulo rotulo--claro revela">${esc(B.titulo)}</h2>
        <p class="intro intro--claro">${t(B.intro)}</p>
        <div class="barrios__grid">
          <div class="mapa revela">
            ${mapaSVG(B.lista)}
            <p class="mapa__pista" id="mapaPista" aria-hidden="true"><span class="mapa__mano">👆</span> ¡Toca un barrio!</p>
            <p class="mapa__nota">${t(B.nota)}</p>
          </div>
          <div id="panel-barrio" class="barrio-panel" tabindex="-1" aria-live="polite"></div>
        </div>
      </div>
      <div class="borde borde--abajo" style="--borde:var(--c-vivo)"></div>`;

    const mapa = $(".mapa", $("#barrios"));
    const puntos = $$(".mapa__punto", mapa);
    let actual = 0, tocado = false, tour = null;

    const mostrar = (id) => {
      actual = B.lista.findIndex((x) => x.id === id);
      const b = B.lista[actual], sig = B.lista[(actual + 1) % B.lista.length];
      $$(".mapa__barrio, .mapa__punto", mapa).forEach((el) => el.classList.toggle("activo", el.dataset.barrio === id));
      puntos.forEach((pt) => pt.setAttribute("aria-pressed", String(pt.dataset.barrio === id)));
      registrar("barrio", b.fotos.map((f) => ({ ...f, pie: pieFoto(f, `Barrio: ${esc(b.nombre)}`) })));
      const panel = $("#panel-barrio");
      panel.style.setProperty("--fondo", col(b.color));
      panel.innerHTML = `
        <div class="barrio-panel__cab">
          <h3 class="sticker sticker--barrio">${esc(b.nombre)}</h3>
          <p>${t(b.descripcion)}</p>
        </div>
        <div class="masonry masonry--barrio">${b.fotos.map((f, i) => `
          <figure class="masonry__item marco-amarillo">
            ${tarjetaFoto(f, "barrio", i, "(min-width: 1100px) 22vw, (min-width: 640px) 45vw, 92vw")}
            <figcaption><span>${t(f.titulo)}</span><small>${[f.fecha, f.autor].filter(Boolean).map(t).join(" · ")}</small></figcaption>
          </figure>`).join("")}
        </div>
        <div class="barrio-fin">
          <p>¿Ya viste ${esc(b.nombre)}? La vuelta sigue.</p>
          <button class="barrio-sig" type="button" data-barrio="${sig.id}" style="--sig:${col(sig.color)}">
            <small>Siguiente barrio</small><span>${esc(sig.nombre)} <span aria-hidden="true">→</span></span>
          </button>
        </div>`;
      $(".barrio-sig", panel).addEventListener("click", (e) => { usar(); ir(e.currentTarget.dataset.barrio, true); });
    };
    // Al primer toque se apagan las pistas
    const usar = () => {
      if (tocado) return;
      tocado = true; mapa.classList.add("mapa--usado"); clearInterval(tour);
      $$(".mapa__barrio", mapa).forEach((el) => el.classList.remove("brilla"));
    };
    const ir = (id, siempre = false) => {
      mostrar(id);
      const panel = $("#panel-barrio");
      if (siempre || window.matchMedia("(max-width: 999px)").matches) panel.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      panel.focus({ preventScroll: true });
    };
    mostrar(B.lista[0].id);

    $$(".mapa__punto, .mapa__barrio", mapa).forEach((el) => {
      el.addEventListener("click", () => { usar(); ir(el.dataset.barrio); });
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); usar(); ir(el.dataset.barrio); }
        const k = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
        if (k && el.classList.contains("mapa__punto")) { e.preventDefault(); const j = (puntos.indexOf(el) + k + puntos.length) % puntos.length; puntos[j].focus(); }
      });
    });

    // Recorrido de invitación: los barrios se iluminan por turnos hasta que el usuario toca uno
    if (!reduceMotion) {
      const formas = $$(".mapa__barrio", mapa); let k = 0;
      const io = new IntersectionObserver((en) => {
        if (!en[0].isIntersecting || tour || tocado) return;
        tour = setInterval(() => {
          formas.forEach((f, i) => f.classList.toggle("brilla", i === k % formas.length)); k++;
        }, 1100);
        io.disconnect();
      }, { threshold: 0.2 });
      io.observe(mapa);
    }
  }

  /* ---------- 7. Taller ---------- */
  function comparacion(c, i) {
    const capa = (f, etiqueta) => f
      ? img(f, { sizes: "(min-width: 900px) 560px, 92vw" })
      : `<div class="espera"><span>${etiqueta}</span><mark class="pendiente">[PENDIENTE: foto]</mark></div>`;
    return `<figure class="comparar revela">
      <div class="comparar__marco" style="--pos:50%">
        <div class="comparar__capa comparar__antes">${capa(c.antes, "Antes")}</div>
        <div class="comparar__capa comparar__despues">${capa(c.despues, "Después")}</div>
        <span class="comparar__linea" aria-hidden="true"></span>
        <span class="comparar__etq comparar__etq--a" aria-hidden="true">Antes</span>
        <span class="comparar__etq comparar__etq--d" aria-hidden="true">Después</span>
        <input class="comparar__rango" type="range" min="0" max="100" value="50" aria-label="Comparar antes y después: ${esc(c.titulo)}">
      </div>
      <figcaption><strong>${t(c.titulo)}</strong> · ${t(c.pie)}</figcaption>
    </figure>`;
  }
  function grafica(r) {
    const filas = r.datos.map((d) => {
      const vacio = d.valor === null || d.valor === undefined || d.valor === "";
      const w = vacio ? 100 : Math.max(0, Math.min(100, Number(d.valor)));
      return `<li class="barra-fila">
        <span class="barra-fila__etq">${t(d.etiqueta)}</span>
        <span class="barra-fila__pista"><span class="barra${vacio ? " barra--vacia" : ""}" style="--w:${w}%; --c:${col(d.color)}"></span></span>
        <span class="barra-fila__val">${vacio ? '<mark class="pendiente">[PENDIENTE]</mark>' : esc(d.valor + r.unidad)}</span>
      </li>`;
    }).join("");
    return `<figure class="grafica revela"><figcaption>${t(r.pregunta)}</figcaption><ul class="barras" role="list">${filas}</ul></figure>`;
  }
  function renderTaller() {
    const T = S.taller;
    registrar("taller", T.galeria.map((f) => ({ ...f, pie: pieFoto(f, "Taller con estudiantes, IUB") })));
    $("#taller").innerHTML = `
      ${deco("aerosol", "t-aerosol", 285, 433)}
      <div class="contenedor">
        <h2 id="taller-titulo" class="rotulo rotulo--amarillo revela">${esc(T.titulo)}</h2>
        <p class="intro intro--claro">${t(T.intro)}</p>
        <ol class="proceso">${T.proceso.map((p, i) => `<li class="revela"><span class="num-circulo">${i + 1}</span><strong>${t(p.titulo)}</strong><span>${t(p.texto)}</span></li>`).join("")}</ol>

        ${T.comparaciones && T.comparaciones.length ? `<h3 class="subrotulo">Antes y después</h3>
        <div class="comparaciones">${T.comparaciones.map(comparacion).join("")}</div>` : ""}

        <h3 class="subrotulo">Así fue el taller</h3>
        <div class="taller__media">
          <div class="masonry masonry--taller">${T.galeria.map((f, i) => `<div class="masonry__item">${tarjetaFoto(f, "taller", i, "(min-width: 1100px) 22vw, (min-width: 640px) 45vw, 92vw")}</div>`).join("")}</div>
          <div class="videos">${T.videos.map((v) => `<video class="video-loop${v.vertical ? " video-loop--v" : ""}" src="${v.src}" poster="${v.poster}" muted loop playsinline preload="none" controls aria-label="${esc(v.alt)}"></video>`).join("")}</div>
        </div>

        <h3 class="subrotulo">${esc(T.titDatos || "Lo que dijeron")}</h3>
        <ul class="globos">${T.testimonios.map((g, i) => `<li class="globo revela${g.cifra ? " globo--dato" : ""}" style="--fondo:${col(g.color)}; --giro:${[-2, 1, -1][i % 3]}deg">
          ${g.cifra ? `<strong class="globo__cifra">${esc(g.cifra)}</strong><p>${t(g.texto)}</p>` : `<p>${t(g.texto)}</p><span>— ${t(g.autor)}</span>`}
        </li>`).join("")}</ul>

        <h3 class="subrotulo">${esc(T.titResultados || "Resultados")}</h3>
        <div class="graficas">${T.resultados.map(grafica).join("")}</div>
        ${T.fuenteDatos ? `<p class="fuente-datos">${t(T.fuenteDatos)}</p>` : ""}
      </div>
      <div class="borde borde--abajo" style="--borde:var(--c-hueso)"></div>`;

    $$(".comparar__marco").forEach((m) => {
      const r = $(".comparar__rango", m);
      r.addEventListener("input", () => m.style.setProperty("--pos", r.value + "%"));
    });
  }

  /* ---------- 8. El oficio ---------- */
  function renderOficio() {
    const O = S.oficio;
    $("#oficio").innerHTML = `
      ${deco("pinceles-manojo", "o-pinceles", 900, 606)}
      ${deco("mano-lapiz", "o-mano", 900, 319)}
      <div class="contenedor">
        <h2 id="oficio-titulo" class="titulo-img titulo-img--centro revela">
          <img src="img/titulos/ocho-pasos-v2.webp" width="1000" height="453" alt="">
          <span class="sr">${esc(O.titulo)}</span>
        </h2>
        <p class="intro intro--centro">${t(O.intro)}</p>
        <div class="letra-viva revela" id="letraViva">
          <div class="escenario" id="escenario">
            <div class="escenario__letra" aria-hidden="true">
              ${O.pasos.map((p, i) => `<img src="img/pasos/h${i + 1}.webp" alt="" data-i="${i}" ${i ? 'loading="lazy"' : ""} decoding="async">`).join("")}
              ${ast("escenario__ast gira")}
            </div>
            <div class="escenario__info" aria-live="polite">
              <p class="escenario__paso">Paso <b id="pasoNum">1</b> de ${O.pasos.length}</p>
              <h3 id="pasoTitulo">${t(O.pasos[0].titulo)}</h3>
              <p id="pasoTexto">${t(O.pasos[0].texto)}</p>
              <div class="escenario__ctrl">
                <button class="boton-redondo" type="button" data-mover="-1" aria-label="Paso anterior">‹</button>
                <button class="boton-redondo escenario__play" type="button" id="pasoPlay" aria-label="Pausar">❚❚</button>
                <button class="boton-redondo" type="button" data-mover="1" aria-label="Paso siguiente">›</button>
              </div>
            </div>
            <div class="escenario__barra" aria-hidden="true"><span id="pasoBarra"></span></div>
          </div>
          <ol class="pasos-tira" aria-label="Los 8 pasos">
            ${O.pasos.map((p, i) => `<li><button type="button" class="pasos-tira__btn" data-i="${i}" aria-pressed="${i === 0}">
              <img src="img/pasos/h${i + 1}-sm.webp" alt="" loading="lazy" decoding="async"><span><b>${i + 1}</b> ${t(p.titulo)}</span>
            </button></li>`).join("")}
          </ol>
        </div>
        <div class="recuadros">${O.recuadros.map((r) => `<div class="recuadro revela"><h3>${t(r.titulo)}</h3><p>${t(r.texto)}</p></div>`).join("")}</div>
        <div class="descarga revela">
          ${deco("latas", "d-latas", 366, 320)}
          <div>
            <h3 class="rotulo rotulo--chico">${esc(O.plantillas.titulo)}</h3>
            <p>${t(O.plantillas.texto)}</p>
            <a class="boton boton--rojo boton--grande" href="${O.plantillas.archivo}" download>Descargar plantillas</a>
            <p class="cartilla__detalle">${esc(O.plantillas.detalle)}</p>
          </div>
        </div>
      </div>`;
  }

  /* La letra que se transforma: avanza sola mientras está en pantalla */
  function initLetraViva() {
    const O = S.oficio, n = O.pasos.length, caja = $("#letraViva");
    const imgs = $$(".escenario__letra img", caja), btns = $$(".pasos-tira__btn", caja);
    const colores = ["hueso", "mango", "turquesa", "rosado", "hueso", "mango", "turquesa", "rosado"];
    let i = 0, timer = null, enVista = false, pausado = reduceMotion;
    const DUR = 2800;
    const ir = (k) => {
      i = (k + n) % n;
      imgs.forEach((im, j) => im.classList.toggle("activa", j === i));
      btns.forEach((b, j) => b.setAttribute("aria-pressed", String(j === i)));
      $("#pasoNum").textContent = i + 1;
      $("#pasoTitulo").innerHTML = t(O.pasos[i].titulo);
      $("#pasoTexto").innerHTML = t(O.pasos[i].texto);
      $("#escenario").style.setProperty("--fondo", col(colores[i % colores.length]));
      $("#escenario").classList.toggle("escenario--oscuro", ["petroleo", "hoja", "vivo"].includes(colores[i % colores.length]));
      const barra = $("#pasoBarra"); barra.style.animation = "none"; void barra.offsetWidth;
      barra.style.animation = pausado || !enVista ? "none" : `llenar ${DUR}ms linear forwards`;
      barra.style.width = pausado ? `${((i + 1) / n) * 100}%` : "";
    };
    const arrancar = () => { clearInterval(timer); if (!pausado && enVista) timer = setInterval(() => ir(i + 1), DUR); ir(i); };
    const parar = () => { pausado = true; clearInterval(timer); $("#pasoPlay").textContent = "▶"; $("#pasoPlay").setAttribute("aria-label", "Reproducir"); ir(i); };
    $("#pasoPlay").addEventListener("click", () => {
      if (pausado) { pausado = false; $("#pasoPlay").textContent = "❚❚"; $("#pasoPlay").setAttribute("aria-label", "Pausar"); arrancar(); } else parar();
    });
    $$("[data-mover]", caja).forEach((b) => b.addEventListener("click", () => { parar(); ir(i + Number(b.dataset.mover)); }));
    btns.forEach((b) => b.addEventListener("click", () => { parar(); ir(Number(b.dataset.i)); }));
    if (reduceMotion) { $("#pasoPlay").textContent = "▶"; $("#pasoPlay").setAttribute("aria-label", "Reproducir"); }
    new IntersectionObserver((en) => { enVista = en[0].isIntersecting; if (enVista) arrancar(); else clearInterval(timer); }, { threshold: 0.35 }).observe($("#escenario"));
    ir(0);
  }

  /* ---------- 9. Pie ---------- */
  function renderPie() {
    const F = S.footer;
    const qrUrl = F.qr.url || location.origin + location.pathname;
    const colores = ["vivo", "mango", "turquesa", "hoja", "letrero", "rosado"];
    const banderines = Array.from({ length: 24 }, (_, i) => `<span style="--c:${col(colores[i % 6])}"></span>`).join("");
    $("#pie").innerHTML = `
      <div class="banderines" aria-hidden="true">${banderines}</div>
      <div class="contenedor pie__grid">
        <div class="pie__marca">
          <img src="img/logo-a-pulso-xs.webp" width="216" height="240" alt="A PULSO" loading="lazy">
          <p class="pie__lema">${esc(F.lema)}</p>
          <figure class="qr">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=8&data=${encodeURIComponent(qrUrl)}" width="160" height="160" alt="Código QR con el enlace a este sitio" loading="lazy">
            <figcaption>${esc(F.qr.texto)}</figcaption>
          </figure>
        </div>
        <div class="pie__creditos">
          <h2 class="rotulo rotulo--chico rotulo--amarillo">Créditos</h2>
          <dl>${F.equipo.map((e) => `<div><dt>${esc(e.rol)}</dt><dd>${t(e.nombres)}</dd></div>`).join("")}
            <div><dt>Asesoría</dt><dd>${t(F.asesor)}</dd></div>
          </dl>
          <h3 class="pie__sub">Agradecimientos</h3>
          ${F.agradecimientos.map((a) => `<p>${t(a)}</p>`).join("")}
          <details class="pie__refs">
            <summary>Referencias</summary>
            <ul>${F.referencias.map((r) => `<li>${t(r)}</li>`).join("")}</ul>
          </details>
        </div>
      </div>
      <p class="pie__derechos">${esc(F.derechos)} · ${esc(S.proyecto.creditos.institucion)} · ${esc(S.proyecto.creditos.programa)}</p>`;
  }

  /* ---------- Lightbox ---------- */
  function initVisor() {
    const dlg = $("#visorCartilla");
    $("#visorCerrar").addEventListener("click", () => dlg.close());
    dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
  }
  function initLightbox() {
    const dlg = $("#lightbox"), im = $("#lbImg"), pie = $("#lbPie"), cuenta = $("#lbCuenta");
    let grupo = null, i = 0, origen = null;
    const mostrar = () => {
      const it = grupos[grupo][i];
      im.src = `${it.src}.webp`; im.alt = it.alt || ""; im.width = it.w; im.height = it.h;
      pie.innerHTML = it.pie || "";
      cuenta.textContent = `${i + 1} de ${grupos[grupo].length}`;
      const varias = grupos[grupo].length > 1;
      $("#lbPrev").hidden = !varias; $("#lbNext").hidden = !varias;
    };
    const mover = (d) => { const n = grupos[grupo].length; i = (i + d + n) % n; mostrar(); };
    document.addEventListener("click", (e) => {
      const b = e.target.closest(".foto-btn");
      if (!b) return;
      grupo = b.dataset.grupo; i = Number(b.dataset.i); origen = b;
      mostrar();
      if (typeof dlg.showModal === "function") dlg.showModal(); else dlg.setAttribute("open", "");
      $("#lbCerrar").focus();
    });
    $("#lbPrev").addEventListener("click", () => mover(-1));
    $("#lbNext").addEventListener("click", () => mover(1));
    $("#lbCerrar").addEventListener("click", () => dlg.close());
    dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") { e.preventDefault(); mover(-1); }
      if (e.key === "ArrowRight") { e.preventDefault(); mover(1); }
    });
    dlg.addEventListener("close", () => { if (origen) origen.focus(); });
    // deslizar en celular
    let tx = null;
    dlg.addEventListener("touchstart", (e) => { tx = e.touches[0].clientX; }, { passive: true });
    dlg.addEventListener("touchend", (e) => { if (tx === null) return; const dx = e.changedTouches[0].clientX - tx; if (Math.abs(dx) > 50) mover(dx < 0 ? 1 : -1); tx = null; });
  }

  /* ---------- Animaciones al entrar en pantalla ---------- */
  function initRevela() {
    const els = $$(".revela");
    if (reduceMotion || !("IntersectionObserver" in window)) { els.forEach((el) => el.classList.add("visible")); return; }
    // Los títulos que "se pintan" empiezan recortados (clip-path), así que el
    // observador mira a su contenedor y no al título.
    const destino = new Map();
    const io = new IntersectionObserver((entradas) => entradas.forEach((en) => {
      if (!en.isIntersecting) return;
      (destino.get(en.target) || [en.target]).forEach((el) => el.classList.add("visible"));
      io.unobserve(en.target);
    }), { rootMargin: "0px 0px -8% 0px", threshold: 0 });
    els.forEach((el) => {
      if (el.matches(".rotulo, .titulo-img")) {
        const p = el.parentElement;
        destino.set(p, [...(destino.get(p) || []), el]);
        io.observe(p);
      } else io.observe(el);
    });
    // los videos se reproducen solo cuando están en pantalla
    const vio = new IntersectionObserver((entradas) => entradas.forEach((en) => {
      const v = en.target;
      if (en.isIntersecting) { v.preload = "auto"; v.play().catch(() => {}); } else v.pause();
    }), { threshold: 0.4 });
    $$("video").forEach((v) => vio.observe(v));
  }

  /* ---------- arranque ---------- */
  document.title = S.meta.titulo;
  renderNav(); renderHero(); renderProyecto(); renderHistoria(); renderLetrerista();
  renderEntrevistas(); renderBarrios(); renderTaller(); renderOficio(); renderPie();
  initLightbox(); initVisor(); initLetraViva(); initRevela();
})();
