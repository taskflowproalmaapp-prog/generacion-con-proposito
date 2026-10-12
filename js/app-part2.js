'use strict';

  /* ─────────────────────────────────────────────────
     OBJETO GLOBAL BRV
     Cada módulo extiende este objeto en su propio
     bloque <script> sin sobrescribir lo existente.
  ───────────────────────────────────────────────── */
  window.BRV = window.BRV || {};

  /* ══════════════════════════════════════════════════════════════
     BRV.bible — CAPA CENTRAL DE DATOS
     Fuente única de verdad para TODOS los módulos.
     Lee directamente de BIBLE_FULL (31,102 versículos).
  ══════════════════════════════════════════════════════════════ */
  BRV.bible = (function() {

    /* Catálogo de los 66 libros con metadatos */
    const BOOKS = [
      {id:'gn',name:'Génesis',abbr:'Gn',t:'AT',chapters:50},
      {id:'ex',name:'Éxodo',abbr:'Ex',t:'AT',chapters:40},
      {id:'lv',name:'Levítico',abbr:'Lv',t:'AT',chapters:27},
      {id:'nm',name:'Números',abbr:'Nm',t:'AT',chapters:36},
      {id:'dt',name:'Deuteronomio',abbr:'Dt',t:'AT',chapters:34},
      {id:'jos',name:'Josué',abbr:'Jos',t:'AT',chapters:24},
      {id:'jue',name:'Jueces',abbr:'Jue',t:'AT',chapters:21},
      {id:'rt',name:'Rut',abbr:'Rt',t:'AT',chapters:4},
      {id:'1sm',name:'1 Samuel',abbr:'1 S',t:'AT',chapters:31},
      {id:'2sm',name:'2 Samuel',abbr:'2 S',t:'AT',chapters:24},
      {id:'1re',name:'1 Reyes',abbr:'1 R',t:'AT',chapters:22},
      {id:'2re',name:'2 Reyes',abbr:'2 R',t:'AT',chapters:25},
      {id:'1cr',name:'1 Crónicas',abbr:'1 Cr',t:'AT',chapters:29},
      {id:'2cr',name:'2 Crónicas',abbr:'2 Cr',t:'AT',chapters:36},
      {id:'esd',name:'Esdras',abbr:'Esd',t:'AT',chapters:10},
      {id:'ne',name:'Nehemías',abbr:'Neh',t:'AT',chapters:13},
      {id:'est',name:'Ester',abbr:'Est',t:'AT',chapters:10},
      {id:'job',name:'Job',abbr:'Job',t:'AT',chapters:42},
      {id:'sal',name:'Salmos',abbr:'Sal',t:'AT',chapters:150},
      {id:'pr',name:'Proverbios',abbr:'Pr',t:'AT',chapters:31},
      {id:'ec',name:'Eclesiastés',abbr:'Ec',t:'AT',chapters:12},
      {id:'cnt',name:'Cantares',abbr:'Cnt',t:'AT',chapters:8},
      {id:'is',name:'Isaías',abbr:'Is',t:'AT',chapters:66},
      {id:'jer',name:'Jeremías',abbr:'Jer',t:'AT',chapters:52},
      {id:'lm',name:'Lamentaciones',abbr:'Lm',t:'AT',chapters:5},
      {id:'ez',name:'Ezequiel',abbr:'Ez',t:'AT',chapters:48},
      {id:'dn',name:'Daniel',abbr:'Dn',t:'AT',chapters:12},
      {id:'os',name:'Oseas',abbr:'Os',t:'AT',chapters:14},
      {id:'jl',name:'Joel',abbr:'Jl',t:'AT',chapters:3},
      {id:'am',name:'Amós',abbr:'Am',t:'AT',chapters:9},
      {id:'ab',name:'Abdías',abbr:'Abd',t:'AT',chapters:1},
      {id:'jon',name:'Jonás',abbr:'Jon',t:'AT',chapters:4},
      {id:'miq',name:'Miqueas',abbr:'Miq',t:'AT',chapters:7},
      {id:'na',name:'Nahúm',abbr:'Nah',t:'AT',chapters:3},
      {id:'hab',name:'Habacuc',abbr:'Hab',t:'AT',chapters:3},
      {id:'sof',name:'Sofonías',abbr:'Sof',t:'AT',chapters:3},
      {id:'hag',name:'Hageo',abbr:'Hag',t:'AT',chapters:2},
      {id:'zac',name:'Zacarías',abbr:'Zac',t:'AT',chapters:14},
      {id:'mal',name:'Malaquías',abbr:'Mal',t:'AT',chapters:4},
      {id:'mt',name:'Mateo',abbr:'Mt',t:'NT',chapters:28},
      {id:'mr',name:'Marcos',abbr:'Mr',t:'NT',chapters:16},
      {id:'lc',name:'Lucas',abbr:'Lc',t:'NT',chapters:24},
      {id:'jn',name:'Juan',abbr:'Jn',t:'NT',chapters:21},
      {id:'hch',name:'Hechos',abbr:'Hch',t:'NT',chapters:28},
      {id:'ro',name:'Romanos',abbr:'Ro',t:'NT',chapters:16},
      {id:'1co',name:'1 Corintios',abbr:'1 Co',t:'NT',chapters:16},
      {id:'2co',name:'2 Corintios',abbr:'2 Co',t:'NT',chapters:13},
      {id:'ga',name:'Gálatas',abbr:'Gá',t:'NT',chapters:6},
      {id:'ef',name:'Efesios',abbr:'Ef',t:'NT',chapters:6},
      {id:'fil',name:'Filipenses',abbr:'Fil',t:'NT',chapters:4},
      {id:'col',name:'Colosenses',abbr:'Col',t:'NT',chapters:4},
      {id:'1ts',name:'1 Tesalonicenses',abbr:'1 Ts',t:'NT',chapters:5},
      {id:'2ts',name:'2 Tesalonicenses',abbr:'2 Ts',t:'NT',chapters:3},
      {id:'1tm',name:'1 Timoteo',abbr:'1 Ti',t:'NT',chapters:6},
      {id:'2tm',name:'2 Timoteo',abbr:'2 Ti',t:'NT',chapters:4},
      {id:'tit',name:'Tito',abbr:'Tit',t:'NT',chapters:3},
      {id:'flm',name:'Filemón',abbr:'Flm',t:'NT',chapters:1},
      {id:'he',name:'Hebreos',abbr:'He',t:'NT',chapters:13},
      {id:'stg',name:'Santiago',abbr:'Stg',t:'NT',chapters:5},
      {id:'1pe',name:'1 Pedro',abbr:'1 P',t:'NT',chapters:5},
      {id:'2pe',name:'2 Pedro',abbr:'2 P',t:'NT',chapters:3},
      {id:'1jn',name:'1 Juan',abbr:'1 Jn',t:'NT',chapters:5},
      {id:'2jn',name:'2 Juan',abbr:'2 Jn',t:'NT',chapters:1},
      {id:'3jn',name:'3 Juan',abbr:'3 Jn',t:'NT',chapters:1},
      {id:'jud',name:'Judas',abbr:'Jud',t:'NT',chapters:1},
      {id:'ap',name:'Apocalipsis',abbr:'Ap',t:'NT',chapters:22},
    ];

    /* Índices de búsqueda rápida por nombre */
    const byId = {};
    const byName = {};
    BOOKS.forEach((b, i) => {
      b.order = i;
      byId[b.id] = b;
      byName[b.name.toLowerCase()] = b;
      byName[b.abbr.toLowerCase().replace(/\s/g,'')] = b;
      /* Variantes sin acento */
      byName[norm(b.name)] = b;
    });
    /* Alias comunes */
    const ALIASES = {
      'salmo':'sal','salmos':'sal','genesis':'gn','exodo':'ex','levitico':'lv',
      'numeros':'nm','deuteronomio':'dt','josue':'jos','jueces':'jue',
      'cronicas':'1cr','apocalipsis':'ap','hechos':'hch','filipenses':'fil',
      'corintios':'1co','tesalonicenses':'1ts','timoteo':'1tm','pedro':'1pe',
      'juan':'jn','mateo':'mt','marcos':'mr','lucas':'lc','romanos':'ro',
      'galatas':'ga','efesios':'ef','colosenses':'col','hebreos':'he',
      'santiago':'stg','judas':'jud','isaias':'is','jeremias':'jer',
      'ezequiel':'ez','daniel':'dn','proverbios':'pr','eclesiastes':'ec',
      'cantares':'cnt','lamentaciones':'lm','oseas':'os','abdias':'ab',
      'jonas':'jon','miqueas':'miq','nahum':'na','habacuc':'hab',
      'sofonias':'sof','hageo':'hag','zacarias':'zac','malaquias':'mal',
      'rut':'rt','ester':'est','esdras':'esd','nehemias':'ne','tito':'tit',
      'filemon':'flm',
    };

    function norm(s) {
      return String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    }

    /* ── Resuelve un nombre de libro a su objeto ── */
    function resolveBook(name) {
      if (!name) return null;
      const n = norm(name.trim());
      /* Exacto */
      if (byName[n]) return byName[n];
      if (ALIASES[n]) return byId[ALIASES[n]];
      /* Maneja números: "1 juan", "1juan", "primera de juan" */
      const numMatch = n.match(/^([123])\s*(?:de\s+)?(.+)$/);
      if (numMatch) {
        const num = numMatch[1];
        const rest = numMatch[2].trim();
        const restId = ALIASES[rest] || (byName[rest] ? byName[rest].id : null);
        if (restId) {
          const baseId = restId.replace(/^[123]/, '');
          const tryId = num + baseId;
          if (byId[tryId]) return byId[tryId];
        }
        const directId = num + (rest.substring(0,2));
        if (byId[directId]) return byId[directId];
      }
      /* Prefijo: busca el primer libro cuyo nombre comience con n */
      for (const b of BOOKS) {
        if (norm(b.name).startsWith(n) && n.length >= 3) return b;
      }
      return null;
    }

    /* ── Obtiene versículos de un capítulo ── */
    function getChapter(bookId, chapter) {
      const key = bookId + '-' + chapter;
      if (typeof BIBLE_FULL !== 'undefined' && BIBLE_FULL[key]) return BIBLE_FULL[key];
      return [];
    }

    /* ── Obtiene un versículo individual ── */
    function getVerse(bookId, chapter, verse) {
      const verses = getChapter(bookId, chapter);
      const found = verses.find(v => v.n === verse);
      return found ? found.t : null;
    }

    /* ── Construye referencia legible: "Juan 3:16" ── */
    function makeRef(bookId, chapter, verse) {
      const b = byId[bookId];
      const name = b ? b.name : bookId;
      return verse ? (name + ' ' + chapter + ':' + verse) : (name + ' ' + chapter);
    }

    /* ── Parsea una referencia "Juan 3:16" o "Juan 3" ── */
    function parseRef(q) {
      const m = q.trim().match(/^(.+?)\s+(\d+)(?::(\d+)(?:-(\d+))?)?$/);
      if (!m) return null;
      const book = resolveBook(m[1]);
      if (!book) return null;
      return {
        book, bookId: book.id,
        chapter: parseInt(m[2]),
        verse: m[3] ? parseInt(m[3]) : null,
        verseEnd: m[4] ? parseInt(m[4]) : null,
      };
    }

    /* ── BÚSQUEDA: por referencia o por texto ──
       Busca en TODOS los 31,102 versículos.
       Devuelve [{r:'Juan 3:16', t:'AT'|'NT', v:'texto'}] ── */
    function search(query, opts) {
      opts = opts || {};
      const limit = opts.limit || 200;
      const testament = opts.testament || 'ALL';
      const bookFilter = opts.bookFilter || '';
      if (!query || query.trim().length < 2) return [];
      const raw = query.trim();
      const results = [];

      /* 1a. ¿Es solo un nombre de libro? → mostrar inicio del libro */
      const bookOnly = resolveBook(raw);
      if (bookOnly && !/\d/.test(raw)) {
        const verses = getChapter(bookOnly.id, 1);
        const out = [];
        verses.slice(0, limit).forEach(v => {
          out.push({ r: makeRef(bookOnly.id, 1, v.n), t: bookOnly.t, v: v.t,
                     bookId: bookOnly.id, chapter: 1, verse: v.n });
        });
        if (out.length) return out;
      }

      /* 1b. ¿Es una referencia? */
      const ref = parseRef(raw);
      if (ref) {
        const verses = getChapter(ref.bookId, ref.chapter);
        verses.forEach(v => {
          /* Filtro por versículo o rango */
          if (ref.verse) {
            if (ref.verseEnd) {
              if (v.n < ref.verse || v.n > ref.verseEnd) return;
            } else if (v.n !== ref.verse) return;
          }
          results.push({
            r: makeRef(ref.bookId, ref.chapter, v.n),
            t: ref.book.t,
            v: v.t,
            bookId: ref.bookId, chapter: ref.chapter, verse: v.n,
          });
        });
        return results.slice(0, limit);
      }

      /* 2. Búsqueda por palabra(s) clave en TODA la Biblia */
      if (typeof BIBLE_FULL === 'undefined') return [];
      const words = norm(raw).split(/\s+/).filter(w => w.length > 1);
      if (!words.length) return [];

      const scored = [];
      for (const b of BOOKS) {
        if (testament !== 'ALL' && b.t !== testament) continue;
        if (bookFilter && b.id !== bookFilter) continue;
        for (let ch = 1; ch <= b.chapters; ch++) {
          const verses = getChapter(b.id, ch);
          for (const v of verses) {
            const vn = norm(v.t);
            let score = 0;
            for (const w of words) {
              let idx = vn.indexOf(w), count = 0;
              while (idx !== -1) { count++; idx = vn.indexOf(w, idx + w.length); }
              score += count * 3;
            }
            if (score > 0) {
              scored.push({
                r: makeRef(b.id, ch, v.n), t: b.t, v: v.t,
                bookId: b.id, chapter: ch, verse: v.n,
                score, order: b.order,
              });
            }
          }
        }
        if (scored.length > limit * 4) break; /* corta si ya hay muchos */
      }

      /* Ordenar por relevancia */
      if (opts.sort === 'canonical') {
        scored.sort((a, b) => a.order - b.order || a.chapter - b.chapter || a.verse - b.verse);
      } else {
        scored.sort((a, b) => b.score - a.score || a.order - b.order);
      }
      return scored.slice(0, limit);
    }

    /* ── Versículo aleatorio de toda la Biblia ── */
    function randomVerse() {
      if (typeof BIBLE_FULL === 'undefined') return null;
      const keys = Object.keys(BIBLE_FULL);
      const key = keys[Math.floor(Math.random() * keys.length)];
      const verses = BIBLE_FULL[key];
      const v = verses[Math.floor(Math.random() * verses.length)];
      const bookId = key.substring(0, key.lastIndexOf('-'));
      const chapter = parseInt(key.substring(key.lastIndexOf('-')+1));
      const b = byId[bookId];
      return {
        r: makeRef(bookId, chapter, v.n),
        t: b ? b.t : 'AT',
        v: v.t, bookId, chapter, verse: v.n,
      };
    }

    /* ── Obtiene un rango de versículos como texto unido ── */
    function getRange(bookId, chapter, vFrom, vTo) {
      const verses = getChapter(bookId, chapter);
      if (!verses.length) return null;
      const from = vFrom || 1;
      const to = vTo || from;
      const sel = verses.filter(v => v.n >= from && v.n <= to);
      if (!sel.length) return null;
      const b = byId[bookId];
      const name = b ? b.name : bookId;
      let ref;
      if (from === to) ref = name + ' ' + chapter + ':' + from;
      else ref = name + ' ' + chapter + ':' + from + '-' + to;
      /* Une los versículos, con números si son varios */
      let text;
      if (sel.length === 1) {
        text = sel[0].t;
      } else {
        text = sel.map(v => v.t).join(' ');
      }
      return { r: ref, v: text, t: b ? b.t : 'AT', bookId, chapter, verseFrom: from, verseTo: to, verses: sel };
    }

    return {
      BOOKS,
      getBooks: () => BOOKS,
      getBook: (id) => byId[id],
      resolveBook,
      getChapter, getVerse, makeRef, parseRef,
      search, randomVerse, norm,
      getRange,
    };
  })();

  /* ── 1. ROUTER ── */
  BRV.router = {
    current: 'home',

    /**
     * Navega a una página por su nombre (coincide con data-page="...")
     * @param {string} page
     */
    go(page) {
      // Ocultar todas las páginas
      document.querySelectorAll('[data-page]').forEach(el => {
        el.classList.remove('brv-active');
      });

      // Mostrar la solicitada
      const target = document.querySelector(`[data-page="${page}"]`);
      if (target) {
        target.classList.add('brv-active');
        window.scrollTo({ top: 0, behavior: 'instant' });
        this.current = page;
      } else {
        console.warn(`BRV.router.go: página "${page}" no encontrada`);
        return;
      }

      // Actualizar nav links
      document.querySelectorAll('[data-nav]').forEach(a => {
        a.classList.toggle('active', a.dataset.nav === page);
      });

      // Hook — cada módulo puede registrar BRV.router.hooks[page]
      if (BRV.router.hooks && BRV.router.hooks[page]) {
        BRV.router.hooks[page]();
      }
    },

    /** Mapa de hooks para módulos futuros */
    hooks: {}
  };

  /* ── 2. UI HELPERS ── */
  BRV.ui = {
    mobileOpen: false,

    toggleMobile() {
      this.mobileOpen = !this.mobileOpen;
      const menu = document.getElementById('brv-mobile-menu');
      const ham  = document.getElementById('brv-hamburger');
      menu.classList.toggle('open', this.mobileOpen);
      ham.classList.toggle('open', this.mobileOpen);
    },

    closeMobile() {
      this.mobileOpen = false;
      document.getElementById('brv-mobile-menu').classList.remove('open');
      document.getElementById('brv-hamburger').classList.remove('open');
    },

    /**
     * Toast de notificación reutilizable por todos los módulos
     * @param {string} msg
     * @param {'info'|'success'|'warn'} type
     */
    toast(msg, type = 'info') {
      let toast = document.getElementById('brv-toast');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'brv-toast';
        toast.style.cssText = `
          position:fixed; bottom:28px; right:28px; z-index:9999;
          background:var(--brv-gold); color:#0B0E14;
          padding:12px 22px; border-radius:10px;
          font-size:14px; font-weight:700;
          box-shadow:0 6px 28px rgba(0,0,0,.5);
          transform:translateY(80px); opacity:0;
          transition:all .28s cubic-bezier(.4,0,.2,1);
          pointer-events:none; max-width:320px; line-height:1.4;
        `;
        document.body.appendChild(toast);
      }
      toast.textContent = msg;
      if (type === 'success') toast.style.background = '#2ECC71';
      else if (type === 'warn') toast.style.background = '#E74C3C';
      else toast.style.background = 'var(--brv-gold)';

      toast.style.transform = 'translateY(0)';
      toast.style.opacity   = '1';
      clearTimeout(BRV.ui._toastTimer);
      BRV.ui._toastTimer = setTimeout(() => {
        toast.style.transform = 'translateY(80px)';
        toast.style.opacity   = '0';
      }, 3000);
    },

    /** Aplica tema claro/oscuro */
    setTheme(theme) {
      if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
      localStorage.setItem('brv_theme', theme);
    }
  };

  /* ── 3. STORAGE — capa de persistencia ── */
  BRV.storage = {
    get(key, fallback = null) {
      try {
        const val = localStorage.getItem('brv_' + key);
        return val !== null ? JSON.parse(val) : fallback;
      } catch { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem('brv_' + key, JSON.stringify(value)); }
      catch(e) { console.warn('BRV.storage.set error:', e); }
    },
    remove(key) { localStorage.removeItem('brv_' + key); }
  };

  /* ── 4. HOME MODULE ── */
  BRV.home = (function() {

    const VERSES_OF_DAY = [
      { text: 'Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.', ref: 'Juan 3:16' },
      { text: 'El SEÑOR es mi pastor; nada me faltará.', ref: 'Salmos 23:1' },
      { text: 'Todo lo puedo en Cristo que me fortalece.', ref: 'Filipenses 4:13' },
      { text: 'No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo.', ref: 'Isaías 41:10' },
      { text: 'Y sabemos que a los que aman a Dios, todas las cosas les ayudan a bien.', ref: 'Romanos 8:28' },
      { text: 'Porque yo sé los pensamientos que tengo acerca de vosotros, dice el SEÑOR, pensamientos de paz, y no de mal, para daros el fin que esperáis.', ref: 'Jeremías 29:11' },
      { text: 'Confía en el SEÑOR con todo tu corazón, y no te apoyes en tu propia prudencia.', ref: 'Proverbios 3:5' },
      { text: 'Mas buscad primeramente el reino de Dios y su justicia, y todas estas cosas os serán añadidas.', ref: 'Mateo 6:33' },
      { text: 'Encomienda al SEÑOR tu camino, y confía en él; y él hará.', ref: 'Salmos 37:5' },
      { text: 'El que habita al abrigo del Altísimo morará bajo la sombra del Omnipotente.', ref: 'Salmos 91:1' },
      { text: 'Echando toda vuestra ansiedad sobre él, porque él tiene cuidado de vosotros.', ref: '1 Pedro 5:7' },
      { text: 'Toda la Escritura es inspirada por Dios, y útil para enseñar, para redargüir, para corregir, para instruir en justicia.', ref: '2 Timoteo 3:16' },
      { text: 'Porque por gracia sois salvos por medio de la fe; y esto no de vosotros, pues es don de Dios.', ref: 'Efesios 2:8' },
      { text: 'Y la paz de Dios, que sobrepasa todo entendimiento, guardará vuestros corazones y vuestros pensamientos en Cristo Jesús.', ref: 'Filipenses 4:7' },
      { text: 'En ti confiarán los que conocen tu nombre, por cuanto tú, oh SEÑOR, no desamparaste a los que te buscaron.', ref: 'Salmos 9:10' }
    ];

    let randomIdx = -1;

    function setVOD() {
      const idx = new Date().getDate() % VERSES_OF_DAY.length;
      const v = VERSES_OF_DAY[idx];
      document.getElementById('brv-vod-text').textContent = `"${v.text}"`;
      document.getElementById('brv-vod-ref').textContent  = `— ${v.ref}`;
      randomIdx = idx;
    }

    function randomVerse() {
      let newIdx;
      do { newIdx = Math.floor(Math.random() * VERSES_OF_DAY.length); }
      while (newIdx === randomIdx && VERSES_OF_DAY.length > 1);
      randomIdx = newIdx;
      const v = VERSES_OF_DAY[newIdx];
      const quote = document.getElementById('brv-random-quote');
      const ref   = document.getElementById('brv-random-ref');
      quote.style.opacity = '0';
      ref.style.opacity   = '0';
      setTimeout(() => {
        quote.innerHTML = `"${v.text.replace(/(fe|amor|paz|esperanza|gracia|confía|Dios|Cristo)/gi,
          w => `<strong>${w}</strong>`)}"`;
        ref.textContent = `— ${v.ref}`;
        quote.style.transition = 'opacity .4s';
        ref.style.transition   = 'opacity .4s';
        quote.style.opacity = '1';
        ref.style.opacity   = '1';
      }, 200);
    }

    function initParticles() {
      const container = document.getElementById('brv-particles');
      if (!container) return;
      const count = 55;
      for (let i = 0; i < count; i++) {
        const el = document.createElement('div');
        const isLarge = Math.random() < 0.35;
        el.className = 'brv-particle ' + (isLarge ? 'large' : 'small');
        const size = isLarge
          ? (Math.random() * 5 + 4)
          : (Math.random() * 2.5 + 1);
        const drift = (Math.random() - 0.5) * 60;
        el.style.cssText = `
          width:${size}px; height:${size}px;
          left:${Math.random() * 100}%;
          --drift:${drift}px;
          animation-duration:${6 + Math.random() * 10}s;
          animation-delay:${-Math.random() * 14}s;
        `;
        container.appendChild(el);
      }
    }

    function initScrollEffect() {
      const navbar = document.getElementById('brv-navbar');
      window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
      }, { passive: true });
    }

    function init() {
      setVOD();
      initParticles();
      initScrollEffect();
      // Restaurar tema guardado
      const savedTheme = BRV.storage.get('theme', 'dark');
      BRV.ui.setTheme(savedTheme);
    }

    return { init, randomVerse };
  })();

  /* ── INIT ── */
  /* init coordinado al final */

  /* ══════════════════════════════════════════════════════════════
     MÓDULO 2 — LECTOR BÍBLICO
  ══════════════════════════════════════════════════════════════ */
  BRV.reader = (function() {

    /* ── Catálogo completo de los 66 libros ── */
    const BOOKS = [
      // ANTIGUO TESTAMENTO
      {id:'gn',  name:'Génesis',           abbr:'Gn',  t:'AT', chapters:50},
      {id:'ex',  name:'Éxodo',             abbr:'Ex',  t:'AT', chapters:40},
      {id:'lv',  name:'Levítico',          abbr:'Lv',  t:'AT', chapters:27},
      {id:'nm',  name:'Números',           abbr:'Nm',  t:'AT', chapters:36},
      {id:'dt',  name:'Deuteronomio',      abbr:'Dt',  t:'AT', chapters:34},
      {id:'jos', name:'Josué',             abbr:'Jos', t:'AT', chapters:24},
      {id:'jue', name:'Jueces',            abbr:'Jue', t:'AT', chapters:21},
      {id:'rt',  name:'Rut',               abbr:'Rt',  t:'AT', chapters:4},
      {id:'1sm', name:'1 Samuel',          abbr:'1Sa', t:'AT', chapters:31},
      {id:'2sm', name:'2 Samuel',          abbr:'2Sa', t:'AT', chapters:24},
      {id:'1re', name:'1 Reyes',           abbr:'1Re', t:'AT', chapters:22},
      {id:'2re', name:'2 Reyes',           abbr:'2Re', t:'AT', chapters:25},
      {id:'1cr', name:'1 Crónicas',        abbr:'1Cr', t:'AT', chapters:29},
      {id:'2cr', name:'2 Crónicas',        abbr:'2Cr', t:'AT', chapters:36},
      {id:'esd', name:'Esdras',            abbr:'Esd', t:'AT', chapters:10},
      {id:'ne',  name:'Nehemías',          abbr:'Ne',  t:'AT', chapters:13},
      {id:'est', name:'Ester',             abbr:'Est', t:'AT', chapters:10},
      {id:'job', name:'Job',               abbr:'Job', t:'AT', chapters:42},
      {id:'sal', name:'Salmos',            abbr:'Sal', t:'AT', chapters:150},
      {id:'pr',  name:'Proverbios',        abbr:'Pr',  t:'AT', chapters:31},
      {id:'ec',  name:'Eclesiastés',       abbr:'Ec',  t:'AT', chapters:12},
      {id:'cnt', name:'Cantares',          abbr:'Cnt', t:'AT', chapters:8},
      {id:'is',  name:'Isaías',            abbr:'Is',  t:'AT', chapters:66},
      {id:'jer', name:'Jeremías',          abbr:'Jer', t:'AT', chapters:52},
      {id:'lm',  name:'Lamentaciones',     abbr:'Lm',  t:'AT', chapters:5},
      {id:'ez',  name:'Ezequiel',          abbr:'Ez',  t:'AT', chapters:48},
      {id:'dn',  name:'Daniel',            abbr:'Dn',  t:'AT', chapters:12},
      {id:'os',  name:'Oseas',             abbr:'Os',  t:'AT', chapters:14},
      {id:'jl',  name:'Joel',              abbr:'Jl',  t:'AT', chapters:3},
      {id:'am',  name:'Amós',              abbr:'Am',  t:'AT', chapters:9},
      {id:'ab',  name:'Abdías',            abbr:'Abd', t:'AT', chapters:1},
      {id:'jon', name:'Jonás',             abbr:'Jon', t:'AT', chapters:4},
      {id:'miq', name:'Miqueas',           abbr:'Miq', t:'AT', chapters:7},
      {id:'na',  name:'Nahúm',             abbr:'Na',  t:'AT', chapters:3},
      {id:'hab', name:'Habacuc',           abbr:'Hab', t:'AT', chapters:3},
      {id:'sof', name:'Sofonías',          abbr:'Sof', t:'AT', chapters:3},
      {id:'hag', name:'Hageo',             abbr:'Hag', t:'AT', chapters:2},
      {id:'zac', name:'Zacarías',          abbr:'Zac', t:'AT', chapters:14},
      {id:'mal', name:'Malaquías',         abbr:'Mal', t:'AT', chapters:4},
      // NUEVO TESTAMENTO
      {id:'mt',  name:'Mateo',             abbr:'Mt',  t:'NT', chapters:28},
      {id:'mr',  name:'Marcos',            abbr:'Mr',  t:'NT', chapters:16},
      {id:'lc',  name:'Lucas',             abbr:'Lc',  t:'NT', chapters:24},
      {id:'jn',  name:'Juan',              abbr:'Jn',  t:'NT', chapters:21},
      {id:'hch', name:'Hechos',            abbr:'Hch', t:'NT', chapters:28},
      {id:'ro',  name:'Romanos',           abbr:'Ro',  t:'NT', chapters:16},
      {id:'1co', name:'1 Corintios',       abbr:'1Co', t:'NT', chapters:16},
      {id:'2co', name:'2 Corintios',       abbr:'2Co', t:'NT', chapters:13},
      {id:'ga',  name:'Gálatas',           abbr:'Ga',  t:'NT', chapters:6},
      {id:'ef',  name:'Efesios',           abbr:'Ef',  t:'NT', chapters:6},
      {id:'fil', name:'Filipenses',        abbr:'Fil', t:'NT', chapters:4},
      {id:'col', name:'Colosenses',        abbr:'Col', t:'NT', chapters:4},
      {id:'1ts', name:'1 Tesalonicenses',  abbr:'1Ts', t:'NT', chapters:5},
      {id:'2ts', name:'2 Tesalonicenses',  abbr:'2Ts', t:'NT', chapters:3},
      {id:'1tm', name:'1 Timoteo',         abbr:'1Ti', t:'NT', chapters:6},
      {id:'2tm', name:'2 Timoteo',         abbr:'2Ti', t:'NT', chapters:4},
      {id:'tit', name:'Tito',              abbr:'Tit', t:'NT', chapters:3},
      {id:'flm', name:'Filemón',           abbr:'Flm', t:'NT', chapters:1},
      {id:'he',  name:'Hebreos',           abbr:'He',  t:'NT', chapters:13},
      {id:'stg', name:'Santiago',          abbr:'Stg', t:'NT', chapters:5},
      {id:'1pe', name:'1 Pedro',           abbr:'1Pe', t:'NT', chapters:5},
      {id:'2pe', name:'2 Pedro',           abbr:'2Pe', t:'NT', chapters:3},
      {id:'1jn', name:'1 Juan',            abbr:'1Jn', t:'NT', chapters:5},
      {id:'2jn', name:'2 Juan',            abbr:'2Jn', t:'NT', chapters:1},
      {id:'3jn', name:'3 Juan',            abbr:'3Jn', t:'NT', chapters:1},
      {id:'jud', name:'Judas',             abbr:'Jud', t:'NT', chapters:1},
      {id:'ap',  name:'Apocalipsis',       abbr:'Ap',  t:'NT', chapters:22},
    ];

    /* ── Base de datos de versículos representativos ── */
    const VERSE_DATA = {
      'jn-3':  [{n:1,t:'Había un hombre de los fariseos que se llamaba Nicodemo, un principal entre los judíos.'},{n:2,t:'Este vino a Jesús de noche, y le dijo: Rabí, sabemos que has venido de Dios como maestro; porque nadie puede hacer estas señales que tú haces, si no está Dios con él.'},{n:3,t:'Respondió Jesús y le dijo: De cierto, de cierto te digo, que el que no naciere de nuevo, no puede ver el reino de Dios.'},{n:4,t:'Nicodemo le dijo: ¿Cómo puede un hombre nacer siendo viejo? ¿Puede acaso entrar por segunda vez en el vientre de su madre, y nacer?'},{n:5,t:'Respondió Jesús: De cierto, de cierto te digo, que el que no naciere de agua y del Espíritu, no puede entrar en el reino de Dios.'},{n:6,t:'Lo que es nacido de la carne, carne es; y lo que es nacido del Espíritu, espíritu es.'},{n:7,t:'No te maravilles de que te dije: Os es necesario nacer de nuevo.'},{n:8,t:'El viento sopla de donde quiere, y oyes su sonido; mas ni sabes de dónde viene, ni a dónde va; así es todo aquel que es nacido del Espíritu.'},{n:9,t:'Respondió Nicodemo y le dijo: ¿Cómo puede hacerse esto?'},{n:10,t:'Respondió Jesús y le dijo: ¿Eres tú maestro de Israel, y no sabes esto?'},{n:11,t:'De cierto, de cierto te digo, que lo que sabemos hablamos, y lo que hemos visto, testificamos; y no recibís nuestro testimonio.'},{n:12,t:'Si os he dicho cosas terrenales, y no creéis, ¿cómo creeréis si os dijere las celestiales?'},{n:13,t:'Nadie subió al cielo, sino el que descendió del cielo; el Hijo del Hombre, que está en el cielo.'},{n:14,t:'Y como Moisés levantó la serpiente en el desierto, así es necesario que el Hijo del Hombre sea levantado,'},{n:15,t:'para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.'},{n:16,t:'Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.'},{n:17,t:'Porque no envió Dios a su Hijo al mundo para condenar al mundo, sino para que el mundo sea salvo por él.'},{n:18,t:'El que en él cree, no es condenado; pero el que no cree, ya ha sido condenado, porque no ha creído en el nombre del unigénito Hijo de Dios.'},{n:19,t:'Y esta es la condenación: que la luz vino al mundo, y los hombres amaron más las tinieblas que la luz, porque sus obras eran malas.'},{n:20,t:'Porque todo aquel que hace lo malo, aborrece la luz y no viene a la luz, para que sus obras no sean reprendidas.'},{n:21,t:'Mas el que practica la verdad viene a la luz, para que sea manifiesto que sus obras son hechas en Dios.'},{n:22,t:'Después de esto, vino Jesús con sus discípulos a la tierra de Judea, y estuvo allí con ellos, y bautizaba.'},{n:23,t:'Juan bautizaba también en Enón, junto a Salim, porque había allí muchas aguas; y venían, y eran bautizados.'},{n:24,t:'Porque Juan no había sido aún encarcelado.'},{n:25,t:'Entonces hubo discusión entre los discípulos de Juan y los judíos acerca de la purificación.'},{n:26,t:'Y vinieron a Juan y le dijeron: Rabí, mira que el que estaba contigo al otro lado del Jordán, de quien tú diste testimonio, bautiza, y todos van a él.'},{n:27,t:'Respondió Juan y dijo: No puede el hombre recibir nada, si no le fuere dado del cielo.'},{n:28,t:'Vosotros mismos me sois testigos de que dije: Yo no soy el Cristo, sino que soy enviado delante de él.'},{n:29,t:'El que tiene la esposa, es el esposo; mas el amigo del esposo, que está a su lado y le oye, se goza grandemente de la voz del esposo; así pues, este mi gozo está cumplido.'},{n:30,t:'Es necesario que él crezca, pero que yo mengüe.'},{n:31,t:'El que de arriba viene, es sobre todos; el que es de la tierra, es terrenal, y cosas terrenales habla; el que viene del cielo, es sobre todos.'},{n:32,t:'Y lo que vio y oyó, esto testifica; y nadie recibe su testimonio.'},{n:33,t:'El que recibe su testimonio, éste atestigua que Dios es verdadero.'},{n:34,t:'Porque el que Dios envió, las palabras de Dios habla; pues Dios no da el Espíritu por medida.'},{n:35,t:'El Padre ama al Hijo, y todas las cosas ha entregado en su mano.'},{n:36,t:'El que cree en el Hijo tiene vida eterna; pero el que rehúsa creer en el Hijo no verá la vida, sino que la ira de Dios está sobre él.'}],
      'sal-23': [{n:1,t:'El SEÑOR es mi pastor; nada me faltará.'},{n:2,t:'En lugares de delicados pastos me hará descansar; junto a aguas de reposo me pastoreará.'},{n:3,t:'Confortará mi alma; me guiará por sendas de justicia por amor de su nombre.'},{n:4,t:'Aunque ande en valle de sombra de muerte, no temeré mal alguno, porque tú estarás conmigo; tu vara y tu cayado me infundirán aliento.'},{n:5,t:'Aderezas mesa delante de mí en presencia de mis angustiadores; unges mi cabeza con aceite; mi copa está rebosando.'},{n:6,t:'Ciertamente el bien y la misericordia me seguirán todos los días de mi vida, y en la casa del SEÑOR moraré por largos días.'}],
      'sal-119': [{n:1,t:'Bienaventurados los perfectos de camino, los que andan en la ley del SEÑOR.'},{n:2,t:'Bienaventurados los que guardan sus testimonios, y con todo el corazón le buscan.'},{n:3,t:'Pues no hacen iniquidad los que andan en sus caminos.'},{n:4,t:'Tú encargaste tus mandamientos, para que los guardemos con diligencia.'},{n:5,t:'¡Ojalá fuesen ordenados mis caminos para guardar tus estatutos!'},{n:6,t:'Entonces no sería yo avergonzado, cuando atendiese a todos tus mandamientos.'},{n:7,t:'Te alabaré con rectitud de corazón cuando aprendiere tus justos juicios.'},{n:8,t:'Tus estatutos guardaré; no me dejes enteramente.'},{n:9,t:'¿Con qué limpiará el joven su camino? Con guardar tu palabra.'},{n:10,t:'Con todo mi corazón te he buscado; no me dejes divagar de tus mandamientos.'},{n:11,t:'En mi corazón he guardado tus dichos, para no pecar contra ti.'},{n:12,t:'Bendito tú, oh SEÑOR; enséñame tus estatutos.'},{n:13,t:'Con mis labios he contado todos los juicios de tu boca.'},{n:14,t:'Me he gozado en el camino de tus testimonios más que de toda riqueza.'},{n:15,t:'En tus mandamientos meditaré; consideraré tus caminos.'},{n:16,t:'Me regocijaré en tus estatutos; no me olvidaré de tus palabras.'},{n:105,t:'Lámpara es a mis pies tu palabra, y lumbrera a mi camino.'},{n:106,t:'Juré y ratifiqué que guardaré tus justos juicios.'},{n:107,t:'Afligido estoy en gran manera; vivifícame, oh SEÑOR, conforme a tu palabra.'},{n:108,t:'Te ruego, oh SEÑOR, que te sean agradables los sacrificios voluntarios de mi boca, y me enseñes tus juicios.'}],
      'gn-1':  [{n:1,t:'En el principio creó Dios los cielos y la tierra.'},{n:2,t:'Y la tierra estaba desordenada y vacía, y las tinieblas estaban sobre la faz del abismo, y el Espíritu de Dios se movía sobre la faz de las aguas.'},{n:3,t:'Y dijo Dios: Sea la luz; y fue la luz.'},{n:4,t:'Y vio Dios que la luz era buena; y separó Dios la luz de las tinieblas.'},{n:5,t:'Y llamó Dios a la luz Día, y a las tinieblas llamó Noche. Y fue la tarde y la mañana un día.'},{n:6,t:'Luego dijo Dios: Haya expansión en medio de las aguas, y separe las aguas de las aguas.'},{n:7,t:'E hizo Dios la expansión, y separó las aguas que estaban debajo de la expansión, de las aguas que estaban sobre la expansión. Y fue así.'},{n:8,t:'Y llamó Dios a la expansión Cielos. Y fue la tarde y la mañana el día segundo.'},{n:9,t:'Dijo también Dios: Júntense las aguas que están debajo de los cielos en un lugar, y descúbrase lo seco. Y fue así.'},{n:10,t:'Y llamó Dios a lo seco Tierra, y a la reunión de las aguas llamó Mares. Y vio Dios que era bueno.'},{n:11,t:'Después dijo Dios: Produzca la tierra hierba verde, hierba que dé semilla; árbol de fruto que dé fruto según su género, que su semilla esté en él, sobre la tierra. Y fue así.'},{n:12,t:'Produjo, pues, la tierra hierba verde, hierba que da semilla según su naturaleza, y árbol que da fruto, cuya semilla está en él, según su género. Y vio Dios que era bueno.'},{n:13,t:'Y fue la tarde y la mañana el día tercero.'},{n:14,t:'Dijo luego Dios: Haya lumbreras en la expansión de los cielos para separar el día de la noche; y sirvan de señales para las estaciones, para días y años.'},{n:15,t:'Y sean por lumbreras en la expansión de los cielos para alumbrar sobre la tierra. Y fue así.'},{n:16,t:'E hizo Dios las dos grandes lumbreras; la lumbrera mayor para que señorease en el día, y la lumbrera menor para que señorease en la noche; hizo también las estrellas.'},{n:17,t:'Y las puso Dios en la expansión de los cielos para alumbrar sobre la tierra,'},{n:18,t:'y para señorear en el día y en la noche, y para separar la luz de las tinieblas. Y vio Dios que era bueno.'},{n:19,t:'Y fue la tarde y la mañana el día cuarto.'},{n:20,t:'Dijo Dios: Produzcan las aguas seres vivientes, y aves que vuelen sobre la tierra, en la abierta expansión de los cielos.'},{n:21,t:'Y creó Dios los grandes monstruos marinos, y todo ser viviente que se mueve, que las aguas produjeron según su género, y toda ave alada según su especie. Y vio Dios que era bueno.'},{n:22,t:'Y Dios los bendijo, diciendo: Fructificad y multiplicaos, y llenad las aguas en los mares, y multiplíquense las aves en la tierra.'},{n:23,t:'Y fue la tarde y la mañana el día quinto.'},{n:24,t:'Luego dijo Dios: Produzca la tierra seres vivientes según su género, bestias y serpientes y animales de la tierra según su especie. Y fue así.'},{n:25,t:'E hizo Dios animales de la tierra según su género, y ganado según su género, y todo animal que se arrastra sobre la tierra según su especie. Y vio Dios que era bueno.'},{n:26,t:'Entonces dijo Dios: Hagamos al hombre a nuestra imagen, conforme a nuestra semejanza; y señoree en los peces del mar, en las aves de los cielos, en las bestias, en toda la tierra, y en todo animal que se arrastra sobre la tierra.'},{n:27,t:'Y creó Dios al hombre a su imagen, a imagen de Dios lo creó; varón y hembra los creó.'},{n:28,t:'Y los bendijo Dios, y les dijo: Fructificad y multiplicaos; llenad la tierra, y sojuzgadla, y señoread en los peces del mar, en las aves de los cielos, y en todas las bestias que se mueven sobre la tierra.'},{n:29,t:'Y dijo Dios: He aquí que os he dado toda planta que da semilla, que está sobre toda la tierra, y todo árbol en que hay fruto y que da semilla; os serán para comer.'},{n:30,t:'Y a toda bestia de la tierra, y a todas las aves de los cielos, y a todo lo que se arrastra sobre la tierra, en que hay vida, toda planta verde les será para comer. Y fue así.'},{n:31,t:'Y vio Dios todo lo que había hecho, y he aquí que era bueno en gran manera. Y fue la tarde y la mañana el día sexto.'}],
      'ro-8':  [{n:1,t:'Ahora, pues, ninguna condenación hay para los que están en Cristo Jesús, los que no andan conforme a la carne, sino conforme al Espíritu.'},{n:2,t:'Porque la ley del Espíritu de vida en Cristo Jesús me ha librado de la ley del pecado y de la muerte.'},{n:3,t:'Porque lo que era imposible para la ley, por cuanto era débil por la carne, Dios, enviando a su Hijo en semejanza de carne de pecado y a causa del pecado, condenó al pecado en la carne.'},{n:4,t:'Para que la justicia de la ley se cumpliese en nosotros, que no andamos conforme a la carne, sino conforme al Espíritu.'},{n:5,t:'Porque los que son de la carne piensan en las cosas de la carne; pero los que son del Espíritu, en las cosas del Espíritu.'},{n:6,t:'Porque el ocuparse de la carne es muerte, pero el ocuparse del Espíritu es vida y paz.'},{n:7,t:'Por cuanto los designios de la carne son enemistad contra Dios; porque no se sujetan a la ley de Dios, ni tampoco pueden.'},{n:8,t:'Y los que viven según la carne no pueden agradar a Dios.'},{n:9,t:'Mas vosotros no vivís según la carne, sino según el Espíritu, si es que el Espíritu de Dios mora en vosotros. Y si alguno no tiene el Espíritu de Cristo, no es de él.'},{n:10,t:'Pero si Cristo está en vosotros, el cuerpo en verdad está muerto a causa del pecado, mas el espíritu vive a causa de la justicia.'},{n:11,t:'Y si el Espíritu de aquel que levantó de los muertos a Jesús mora en vosotros, el que levantó de los muertos a Cristo Jesús vivificará también vuestros cuerpos mortales por su Espíritu que mora en vosotros.'},{n:12,t:'Así que, hermanos, deudores somos, no a la carne, para que vivamos conforme a la carne.'},{n:13,t:'Porque si vivís conforme a la carne, moriréis; mas si por el Espíritu hacéis morir las obras de la carne, viviréis.'},{n:14,t:'Porque todos los que son guiados por el Espíritu de Dios, éstos son hijos de Dios.'},{n:15,t:'Pues no habéis recibido el espíritu de esclavitud para estar otra vez en temor, sino que habéis recibido el espíritu de adopción, por el cual clamamos: ¡Abba, Padre!'},{n:16,t:'El Espíritu mismo da testimonio a nuestro espíritu, de que somos hijos de Dios.'},{n:17,t:'Y si hijos, también herederos; herederos de Dios y coherederos con Cristo, si es que padecemos juntamente con él, para que juntamente con él seamos glorificados.'},{n:18,t:'Pues tengo por cierto que las aflicciones del tiempo presente no son comparables con la gloria venidera que en nosotros ha de manifestarse.'},{n:19,t:'Porque el anhelo ardiente de la creación es el aguardar la manifestación de los hijos de Dios.'},{n:20,t:'Porque la creación fue sujetada a vanidad, no por su propia voluntad, sino por causa del que la sujetó en esperanza.'},{n:21,t:'Porque también la creación misma será libertada de la esclavitud de corrupción, a la libertad gloriosa de los hijos de Dios.'},{n:22,t:'Porque sabemos que toda la creación gime a una, y a una está con dolores de parto hasta ahora.'},{n:23,t:'Y no sólo ella, sino que también nosotros mismos, que tenemos las primicias del Espíritu, nosotros también gemimos dentro de nosotros mismos, esperando la adopción, la redención de nuestro cuerpo.'},{n:24,t:'Porque en esperanza fuimos salvos; pero la esperanza que se ve, no es esperanza; porque lo que alguno ve, ¿a qué esperarlo?'},{n:25,t:'Pero si esperamos lo que no vemos, con paciencia lo aguardamos.'},{n:26,t:'Y de igual manera el Espíritu nos ayuda en nuestra debilidad; pues qué hemos de pedir como conviene, no lo sabemos, pero el Espíritu mismo intercede por nosotros con gemidos indecibles.'},{n:27,t:'Mas el que escudriña los corazones sabe cuál es la intención del Espíritu, porque conforme a la voluntad de Dios intercede por los santos.'},{n:28,t:'Y sabemos que a los que aman a Dios, todas las cosas les ayudan a bien, esto es, a los que conforme a su propósito son llamados.'},{n:29,t:'Porque a los que antes conoció, también los predestinó para que fuesen hechos conformes a la imagen de su Hijo, para que él sea el primogénito entre muchos hermanos.'},{n:30,t:'Y a los que predestinó, a éstos también llamó; y a los que llamó, a éstos también justificó; y a los que justificó, a éstos también glorificó.'},{n:31,t:'¿Qué, pues, diremos a esto? Si Dios es por nosotros, ¿quién contra nosotros?'},{n:32,t:'El que no escatimó ni a su propio Hijo, sino que lo entregó por todos nosotros, ¿cómo no nos dará también con él todas las cosas?'},{n:33,t:'¿Quién acusará a los escogidos de Dios? Dios es el que justifica.'},{n:34,t:'¿Quién es el que condenará? Cristo es el que murió; más aun, el que también resucitó, el que además está a la diestra de Dios, el que también intercede por nosotros.'},{n:35,t:'¿Quién nos separará del amor de Cristo? ¿Tribulación, o angustia, o persecución, o hambre, o desnudez, o peligro, o espada?'},{n:36,t:'Como está escrito: Por causa de ti somos muertos todo el tiempo; somos contados como ovejas de matadero.'},{n:37,t:'Antes, en todas estas cosas somos más que vencedores por medio de aquel que nos amó.'},{n:38,t:'Por lo cual estoy seguro de que ni la muerte, ni la vida, ni ángeles, ni principados, ni potestades, ni lo presente, ni lo por venir,'},{n:39,t:'ni lo alto, ni lo profundo, ni ninguna otra cosa creada nos podrá separar del amor de Dios, que es en Cristo Jesús Señor nuestro.'}],
      'fil-4': [{n:1,t:'Así que, hermanos míos amados y deseados, gozo y corona mía, estad así firmes en el Señor, amados.'},{n:2,t:'Ruego a Evodia y a Síntique, que sean de un mismo sentir en el Señor.'},{n:3,t:'Asimismo te ruego también a ti, compañero fiel, que ayudes a éstas que combatieron juntamente conmigo en el evangelio, con Clemente también y los demás colaboradores míos, cuyos nombres están en el libro de la vida.'},{n:4,t:'Regocijaos en el Señor siempre. Otra vez digo: ¡Regocijaos!'},{n:5,t:'Vuestra gentileza sea conocida de todos los hombres. El Señor está cerca.'},{n:6,t:'Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios en toda oración y ruego, con acción de gracias.'},{n:7,t:'Y la paz de Dios, que sobrepasa todo entendimiento, guardará vuestros corazones y vuestros pensamientos en Cristo Jesús.'},{n:8,t:'Por lo demás, hermanos, todo lo que es verdadero, todo lo honesto, todo lo justo, todo lo puro, todo lo amable, todo lo que es de buen nombre; si hay virtud alguna, si algo digno de alabanza, en esto pensad.'},{n:9,t:'Lo que aprendisteis y recibisteis y oísteis y visteis en mí, esto haced; y el Dios de paz estará con vosotros.'},{n:10,t:'En gran manera me gocé en el Señor de que ya al fin habéis revivido vuestro cuidado de mí; de lo cual también estabais solícitos, pero os faltaba la oportunidad.'},{n:11,t:'No lo digo porque tenga escasez, pues he aprendido a contentarme, cualquiera que sea mi situación.'},{n:12,t:'Sé vivir humildemente, y sé tener abundancia; en todo y por todo estoy enseñado, así para estar saciado como para tener hambre, así para tener abundancia como para padecer necesidad.'},{n:13,t:'Todo lo puedo en Cristo que me fortalece.'},{n:14,t:'Sin embargo, bien hicisteis en participar conmigo en mi tribulación.'},{n:15,t:'Y sabéis también vosotros, oh filipenses, que al principio de la predicación del evangelio, cuando partí de Macedonia, ninguna iglesia participó conmigo en razón de dar y recibir, sino vosotros solos.'},{n:16,t:'Pues aun a Tesalónica me enviasteis lo necesario una y otra vez.'},{n:17,t:'No es que busque dádivas, sino que busco fruto que abunde en vuestra cuenta.'},{n:18,t:'Pero todo lo he recibido, y tengo abundancia; estoy lleno, habiendo recibido de Epafrodito lo que enviasteis; olor fragante, sacrificio acepto, agradable a Dios.'},{n:19,t:'Mi Dios, pues, suplirá todo lo que os falta conforme a sus riquezas en gloria en Cristo Jesús.'},{n:20,t:'Al Dios y Padre nuestro sea gloria por los siglos de los siglos. Amén.'},{n:21,t:'Saludad a todos los santos en Cristo Jesús. Los hermanos que están conmigo os saludan.'},{n:22,t:'Todos los santos os saludan, y especialmente los de la casa de César.'},{n:23,t:'La gracia de nuestro Señor Jesucristo sea con todos vosotros. Amén.'}],
      'is-53': [{n:1,t:'¿Quién ha creído a nuestro anuncio? ¿y sobre quién se ha manifestado el brazo de Jehová?'},{n:2,t:'Subirá cual renuevo delante de él, y como raíz de tierra seca; no hay parecer en él, ni hermosura; le veremos, mas sin atractivo para que le deseemos.'},{n:3,t:'Despreciado y desechado entre los hombres, varón de dolores, experimentado en quebranto; y como que escondimos de él el rostro, fue menospreciado, y no lo estimamos.'},{n:4,t:'Ciertamente llevó él nuestras enfermedades, y sufrió nuestros dolores; y nosotros le tuvimos por azotado, por herido de Dios y abatido.'},{n:5,t:'Mas él herido fue por nuestras rebeliones, molido por nuestros pecados; el castigo de nuestra paz fue sobre él, y por su llaga fuimos nosotros curados.'},{n:6,t:'Todos nosotros nos descarriamos como ovejas, cada cual se apartó por su camino; mas Jehová cargó en él el pecado de todos nosotros.'},{n:7,t:'Angustiado él, y afligido, no abrió su boca; como cordero fue llevado al matadero; y como oveja delante de sus trasquiladores, enmudeció, y no abrió su boca.'},{n:8,t:'Por cárcel y por juicio fue quitado; y su generación, ¿quién la contará? Porque fue cortado de la tierra de los vivientes, y por la rebelión de mi pueblo fue herido.'},{n:9,t:'Y se dispuso con los impíos su sepultura, mas con los ricos fue en su muerte; aunque nunca hizo maldad, ni hubo engaño en su boca.'},{n:10,t:'Con todo eso, Jehová quiso quebrantarle, sujetándole a padecimiento. Cuando haya puesto su vida en expiación por el pecado, verá linaje, vivirá por largos días, y la voluntad de Jehová será en su mano prosperada.'},{n:11,t:'Verá el fruto de la aflicción de su alma, y quedará satisfecho; por su conocimiento justificará mi siervo justo a muchos, y llevará las iniquidades de ellos.'},{n:12,t:'Por tanto, yo le daré parte con los grandes, y con los fuertes repartirá despojos; por cuanto derramó su vida hasta la muerte, y fue contado con los pecadores, habiendo él llevado el pecado de muchos, y orado por los transgresores.'}],
      'jer-29': [{n:1,t:'Estas son las palabras de la carta que el profeta Jeremías envió de Jerusalén a los ancianos que habían quedado de los que fueron transportados, y a los sacerdotes y profetas y a todo el pueblo que Nabucodonosor llevó cautivo de Jerusalén a Babilonia.'},{n:2,t:'(Después que salió el rey Jeconías, y la reina madre, los del palacio, los príncipes de Judá y de Jerusalén, y los artesanos y los herreros de Jerusalén.)'},{n:3,t:'La envió por mano de Elasa hijo de Safán y de Gemarías hijo de Hilcías, a quienes Sedequías rey de Judá envió a Babilonia, a Nabucodonosor rey de Babilonia. Decía:'},{n:4,t:'Así ha dicho Jehová de los ejércitos, Dios de Israel, a todos los de la cautividad que hice transportar de Jerusalén a Babilonia:'},{n:5,t:'Edificad casas, y habitadlas; y plantad huertos, y comed el fruto de ellos.'},{n:6,t:'Casaos, y engendrad hijos e hijas; dad mujeres a vuestros hijos, y dad maridos a vuestras hijas, para que tengan hijos e hijas; y multiplicaos ahí, y no os disminuyáis.'},{n:7,t:'Y procurad la paz de la ciudad a la cual os hice transportar, y rogad por ella a Jehová; porque en su paz tendréis vosotros paz.'},{n:8,t:'Porque así ha dicho Jehová de los ejércitos, Dios de Israel: No os engañen vuestros profetas que están entre vosotros, ni vuestros adivinos; ni atendáis a los sueños que soñáis.'},{n:9,t:'Porque falsamente os profetizan ellos en mi nombre; no los envié, ha dicho Jehová.'},{n:10,t:'Porque así dijo Jehová: Cuando en Babilonia se cumplan los setenta años, yo os visitaré, y despertaré sobre vosotros mi buena palabra, para haceros volver a este lugar.'},{n:11,t:'Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal, para daros el fin que esperáis.'},{n:12,t:'Entonces me invocaréis, y vendréis y oraréis a mí, y yo os oiré.'},{n:13,t:'Y me buscaréis y me hallaréis, porque me buscaréis de todo vuestro corazón.'},{n:14,t:'Y seré hallado por vosotros, dice Jehová, y haré volver vuestra cautividad, y os reuniré de todas las naciones y de todos los lugares adonde os arrojé, dice Jehová; y os haré volver al lugar de donde os hice llevar.'}],
    };

    /* Banco de versículos de relleno para capítulos sin datos exactos */
    const FILL_POOL = [
      'Alabad a Jehová, porque él es bueno; porque para siempre es su misericordia.',
      'El que habita al abrigo del Altísimo morará bajo la sombra del Omnipotente.',
      'Encomienda al Señor tu camino, y confía en él; y él hará.',
      'Dios es nuestro amparo y fortaleza, nuestro pronto auxilio en las tribulaciones.',
      'Porque yo soy Jehová tu Dios, que te sostiene de tu mano derecha, y te dice: No temas, yo te ayudo.',
      'Bástate mi gracia; porque mi poder se perfecciona en la debilidad.',
      '¿A dónde me iré de tu Espíritu? ¿Y a dónde huiré de tu presencia?',
      'Jehová es mi fortaleza y mi escudo; en él confió mi corazón, y fui ayudado.',
      'Fíate de Jehová de todo tu corazón, y no te apoyes en tu propia prudencia.',
      'En todo tiempo ama el amigo, y es como un hermano en tiempo de angustia.',
      'El principio de la sabiduría es el temor de Jehová; los insensatos desprecian la sabiduría y la enseñanza.',
      'El hombre mira lo que está delante de sus ojos, pero Jehová mira el corazón.',
      '¿No te lo he mandado yo? Esfuérzate y sé valiente; no temas ni te acobardes.',
      'Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito.',
      'Mas el justo por la fe vivirá; y si retrocediere, no agradará a mi alma.',
      'Toda la Escritura es inspirada divinamente y útil para enseñar.',
      'Y la paz de Dios, que sobrepasa todo entendimiento, guardará vuestros corazones.',
      'Pues no nos ha dado Dios espíritu de cobardía, sino de poder, de amor y de dominio propio.',
      'Mas gracias sean dadas a Dios, que nos da la victoria por medio de nuestro Señor Jesucristo.',
      'Porque en él fueron creadas todas las cosas, las que hay en los cielos y las que hay en la tierra.',
      'Si alguno está en Cristo, nueva criatura es; las cosas viejas pasaron.',
      'El amor sufre mucho, y es benigno; el amor no tiene envidia.',
      'La fe es la certeza de lo que se espera, la convicción de lo que no se ve.',
      'Acercaos a Dios, y él se acercará a vosotros.',
      'Humillaos delante del Señor, y él os exaltará.',
    ];

    /* ── Estado interno ── */
    let state = {
      testament: 'AT',
      bookId:    null,
      chapter:   null,
      fontSize:  'md',
      readChapters: BRV.storage.get('readChapters', {}),
      mobileDrawerMode: 'books',
    };

    /* ── Genera versículos para un capítulo ── */
    function getVerses(bookId, chapter) {
      /* Fuente única: BRV.bible */
      const verses = BRV.bible.getChapter(bookId, chapter);
      if (verses && verses.length) return verses;
      /* Fallback de seguridad */
      const key = bookId + '-' + chapter;
      if (VERSE_DATA[key]) return VERSE_DATA[key];
      return [{n:1, t:'(Capítulo no disponible)'}];
    }

    /* ── Renderiza lista de libros ── */
    function renderBooks(testament) {
      const list = document.getElementById('brv-books-list');
      if (!list) return;
      const filtered = testament === 'ALL' ? BOOKS :
                       BOOKS.filter(b => b.t === testament);
      let html = '';
      let lastT = null;
      for (const b of filtered) {
        if (testament === 'ALL' && b.t !== lastT) {
          lastT = b.t;
          html += `<div class="brv-testament-label">${b.t === 'AT' ? 'Antiguo Testamento' : 'Nuevo Testamento'}</div>`;
        }
        const isActive = b.id === state.bookId;
        html += `<div class="brv-book-item${isActive ? ' active' : ''}"
                      role="option" aria-selected="${isActive}"
                      onclick="BRV.reader.selectBook('${b.id}')">
          <span>${b.name}</span>
          <span class="brv-book-item-ch">${b.chapters}</span>
        </div>`;
      }
      list.innerHTML = html;
    }

    /* ── Renderiza grid de capítulos ── */
    function renderChapters(bookId) {
      const book = BOOKS.find(b => b.id === bookId);
      if (!book) return;
      document.getElementById('brv-ch-book-name').textContent = book.name;
      document.getElementById('brv-ch-book-meta').textContent =
        (book.t === 'AT' ? 'Antiguo Testamento' : 'Nuevo Testamento') +
        ' · ' + book.chapters + ' capítulos';
      const grid = document.getElementById('brv-chapters-grid');
      const readKey = bookId;
      let html = '';
      for (let c = 1; c <= book.chapters; c++) {
        const isActive = c === state.chapter;
        const isRead   = state.readChapters[readKey] && state.readChapters[readKey].includes(c);
        html += `<button class="brv-ch-btn${isActive ? ' active' : isRead ? ' read' : ''}"
                         onclick="BRV.reader.selectChapter(${c})"
                         aria-label="Capítulo ${c}" aria-pressed="${isActive}">${c}</button>`;
      }
      grid.innerHTML = html;
    }

    /* ── Renderiza versículos ── */
    function renderVerses(bookId, chapter) {
      const book = BOOKS.find(b => b.id === bookId);
      if (!book) return;
      const verses = getVerses(bookId, chapter);
      /* Toolbar */
      const toolbar = document.getElementById('brv-verses-toolbar');
      const welcome = document.getElementById('brv-reader-welcome');
      toolbar.style.display = 'flex';
      welcome.style.display  = 'none';
      /* Título */
      document.getElementById('brv-verses-title').firstChild.textContent = book.name + ' ';
      document.getElementById('brv-verses-subtitle').textContent = 'Capítulo ' + chapter + ' · ' + verses.length + ' versículos';
      /* Botones prev/next */
      document.getElementById('brv-nav-prev').disabled = chapter <= 1;
      document.getElementById('brv-nav-next').disabled = chapter >= book.chapters;
      /* Chip de ubicación mobile */
      const locChip = document.getElementById('brv-pt-location');
      if (locChip) { locChip.textContent = book.abbr + ' ' + chapter; locChip.style.display = 'block'; }
      /* Versículos */
      const content = document.getElementById('brv-verses-content');
      content.innerHTML = verses.map(v => `
        <div class="brv-verse" id="brv-v-${v.n}" onclick="BRV.reader.toggleVerse(${v.n})">
          <span class="brv-verse-num" aria-label="Versículo ${v.n}">${v.n}</span>
          <span class="brv-verse-text">${v.t}</span>
          <div class="brv-verse-actions" role="group" aria-label="Acciones versículo ${v.n}">
            <button class="brv-vact" title="Favorito"
                    onclick="event.stopPropagation();BRV.reader.favVerse(${v.n},'${esc(v.t)}','${book.name} ${chapter}:${v.n}')"
                    aria-label="Guardar en favoritos">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </button>
            <button class="brv-vact" title="Copiar"
                    onclick="event.stopPropagation();BRV.reader.copyVerse('${esc(v.t)}','${book.name} ${chapter}:${v.n}')"
                    aria-label="Copiar versículo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
            </button>
            <button class="brv-vact" title="Proyectar"
                    onclick="event.stopPropagation();BRV.reader.projectVerse('${esc(v.t)}','${book.name} ${chapter}:${v.n}')"
                    aria-label="Proyectar versículo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
            </button>
          </div>
        </div>
      `).join('');
      /* Marcar capítulo como leído */
      if (!state.readChapters[bookId]) state.readChapters[bookId] = [];
      if (!state.readChapters[bookId].includes(chapter)) {
        state.readChapters[bookId].push(chapter);
        BRV.storage.set('readChapters', state.readChapters);
      }
      /* Scroll al tope */
      document.getElementById('brv-verses-scroll').scrollTop = 0;
    }

    /* ── Helper: escape para atributos ── */
    function esc(s) {
      return s.replace(/'/g, "'").replace(/"/g, '&quot;').replace(/\n/g, ' ');
    }

    /* ── API pública ── */
    function filterTestament(t, btn) {
      document.querySelectorAll('.brv-test-tab').forEach(b => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-selected', b === btn);
      });
      state.testament = t;
      renderBooks(t);
    }

    function selectBook(bookId) {
      state.bookId  = bookId;
      state.chapter = null;
      renderBooks(state.testament);
      renderChapters(bookId);
      /* En móvil: al seleccionar libro, muestra capítulos */
      if (window.innerWidth <= 900) {
        openMobileDrawer('chapters');
        document.getElementById('brv-pt-books').classList.remove('active');
        document.getElementById('brv-pt-chapters').classList.add('active');
      }
    }

    function selectChapter(ch) {
      state.chapter = ch;
      renderChapters(state.bookId);
      renderVerses(state.bookId, ch);
      if (window.innerWidth <= 900) closeMobileDrawer();
      /* Historial */
      if (window.BRV.favorites) {
        const b = BOOKS.find(x => x.id === state.bookId);
        BRV.favorites && BRV.favorites.addHistory &&
          BRV.favorites.addHistory(b.name + ' ' + ch, '📖');
      }
    }

    function changeChapter(delta) {
      const book = BOOKS.find(b => b.id === state.bookId);
      if (!book) return;
      const newCh = state.chapter + delta;
      if (newCh < 1 || newCh > book.chapters) return;
      selectChapter(newCh);
    }

    function toggleVerse(n) {
      document.getElementById('brv-v-' + n)?.classList.toggle('selected');
    }

    function favVerse(n, text, ref) {
      if (BRV.favorites && BRV.favorites.addFavorite) {
        BRV.favorites.addFavorite(ref, text.split("'").join("'"));
      } else {
        /* Guardado directo si el módulo 8 no está cargado aún */
        const favs = BRV.storage.get('favorites', []);
        if (!favs.find(f => f.ref === ref)) {
          favs.unshift({ ref, text: text.split("'").join("'"), date: new Date().toLocaleDateString('es') });
          BRV.storage.set('favorites', favs);
          BRV.ui.toast('⭐ Guardado en favoritos', 'success');
        } else {
          BRV.ui.toast('Ya está en favoritos');
        }
      }
    }

    function copyVerse(text, ref) {
      const clean = text.split("'").join("'");
      navigator.clipboard.writeText(`"${clean}" — ${ref}`)
        .then(() => BRV.ui.toast('📋 Versículo copiado', 'success'))
        .catch(() => BRV.ui.toast('No se pudo copiar'));
    }

    function copyChapter() {
      const book  = BOOKS.find(b => b.id === state.bookId);
      if (!book) return;
      const verses = getVerses(state.bookId, state.chapter);
      const text   = `${book.name} ${state.chapter}\n\n` +
        verses.map(v => `${v.n} ${v.t}`).join('\n');
      navigator.clipboard.writeText(text)
        .then(() => BRV.ui.toast('📋 Capítulo copiado', 'success'))
        .catch(() => BRV.ui.toast('No se pudo copiar'));
    }

    function projectVerse(text, ref) {
      /* Almacena el versículo para que el módulo 4 lo recoja */
      BRV.storage.set('projVerse', { text: text.split("'").join("'"), ref });
      BRV.ui.toast('📽 Listo para proyectar');
    }

    function setFontSize(size, btn) {
      state.fontSize = size;
      const scroll = document.getElementById('brv-verses-scroll');
      scroll.className = scroll.className.replace(/brv-fs-[a-z]+/g, '').trim();
      scroll.classList.add('brv-fs-' + size);
      document.querySelectorAll('.brv-fs-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      BRV.storage.set('readerFontSize', size);
    }

    function openMobileDrawer(mode) {
      state.mobileDrawerMode = mode;
      const drawer  = document.getElementById('brv-mobile-drawer');
      const dcont   = document.getElementById('brv-drawer-content');
      const dtitle  = document.getElementById('brv-drawer-title');
      if (mode === 'books') {
        dtitle.textContent = 'Libros de la Biblia';
        /* Clona la lista de libros */
        const cloned = document.getElementById('brv-books-list').cloneNode(true);
        cloned.querySelectorAll('.brv-book-item').forEach(el => {
          const id = el.getAttribute('onclick').match(/selectBook.'([^']+)'./)?.[1];
          if (id) {
            el.setAttribute('onclick', `BRV.reader.selectBook('${id}')`);
          }
        });
        /* Añade también los tabs de testamento */
        const tabs = `<div style="padding:10px 12px 6px;display:flex;gap:4px;">
          <button class="brv-test-tab${state.testament==='AT'?' active':''}" onclick="BRV.reader.filterTestament('AT',this)">A.T.</button>
          <button class="brv-test-tab${state.testament==='NT'?' active':''}" onclick="BRV.reader.filterTestament('NT',this)">N.T.</button>
          <button class="brv-test-tab${state.testament==='ALL'?' active':''}" onclick="BRV.reader.filterTestament('ALL',this)">Todos</button>
        </div>`;
        dcont.innerHTML = tabs;
        dcont.appendChild(cloned);
      } else {
        dtitle.textContent = 'Capítulos';
        const book = BOOKS.find(b => b.id === state.bookId);
        if (!book) { dcont.innerHTML = '<p style="padding:20px;color:var(--brv-text-2);font-size:13px;">Selecciona un libro primero.</p>'; }
        else {
          dcont.innerHTML = `<div style="padding:12px 12px 6px;font-family:var(--brv-font-display);font-size:15px;color:var(--brv-gold-light);">${book.name}</div>
            <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:4px;padding:8px 12px;">
            ${Array.from({length:book.chapters},(_,i)=>{
              const c=i+1, isA=c===state.chapter;
              return `<button class="brv-ch-btn${isA?' active':''}" onclick="BRV.reader.selectChapter(${c})">${c}</button>`;
            }).join('')}
            </div>`;
        }
      }
      drawer.classList.add('open');
      drawer.style.display = 'block';
    }

    function closeMobileDrawer(e) {
      if (e && e.target !== document.getElementById('brv-mobile-drawer') &&
          !e.target.classList.contains('brv-mobile-drawer-overlay')) return;
      document.getElementById('brv-mobile-drawer').classList.remove('open');
      setTimeout(() => { document.getElementById('brv-mobile-drawer').style.display = 'none'; }, 320);
    }

    /* ── Hook de inicialización al entrar a la página ── */
    BRV.router.hooks['reader'] = function() {
      const savedFs = BRV.storage.get('readerFontSize', 'md');
      state.fontSize = savedFs;
      const scroll = document.getElementById('brv-verses-scroll');
      if (scroll) {
        scroll.className = scroll.className.replace(/brv-fs-[a-z]+/g, '').trim();
        scroll.classList.add('brv-fs-' + savedFs);
      }
      /* Sincronizar botones fs */
      document.querySelectorAll('.brv-fs-btn').forEach(b => {
        const oc = b.getAttribute('onclick') || ''; const m = oc.match(/setFontSize.'([a-z]+)'/); const sz = m ? m[1] : null;
        b.classList.toggle('active', sz === savedFs);
      });
      renderBooks(state.testament);
      /* Si había un libro activo, restaurarlo */
      if (state.bookId) renderChapters(state.bookId);
    };

    /* ── Init (primer carga) ── */
    function init() {
      renderBooks('AT');
    }

    return {
      filterTestament,
      selectBook,
      selectChapter,
      changeChapter,
      toggleVerse,
      favVerse,
      copyVerse,
      copyChapter,
      projectVerse,
      setFontSize,
      openMobileDrawer,
      closeMobileDrawer,
      getBooks: () => BOOKS,
      init,
    };
  })();

  /* Inicializa el reader en el primer load */
  /* init coordinado al final */

  /* ══════════════════════════════════════════════════════════════
     MÓDULO 3 — BUSCADOR DE VERSÍCULOS
  ══════════════════════════════════════════════════════════════ */
  BRV.search = (function() {

    /* ─────────────────────────────────────────────────
       BASE DE VERSÍCULOS COMPLETA
       Cubre los textos más buscados de la Biblia RV1960
    ───────────────────────────────────────────────── */
    const VERSES = [
      // GÉNESIS
      {r:'Génesis 1:1',   t:'AT', v:'En el principio creó Dios los cielos y la tierra.'},
      {r:'Génesis 1:27',  t:'AT', v:'Y creó Dios al hombre a su imagen, a imagen de Dios lo creó; varón y hembra los creó.'},
      {r:'Génesis 1:31',  t:'AT', v:'Y vio Dios todo lo que había hecho, y he aquí que era bueno en gran manera.'},
      {r:'Génesis 2:24',  t:'AT', v:'Por tanto, dejará el hombre a su padre y a su madre, y se unirá a su mujer, y serán una sola carne.'},
      {r:'Génesis 3:15',  t:'AT', v:'Y pondré enemistad entre ti y la mujer, y entre tu simiente y la simiente suya; ésta te herirá en la cabeza, y tú le herirás en el calcañar.'},
      {r:'Génesis 12:2',  t:'AT', v:'Y haré de ti una nación grande, y te bendeciré, y engrandeceré tu nombre, y serás bendición.'},
      {r:'Génesis 15:6',  t:'AT', v:'Y creyó a Jehová, y le fue contado por justicia.'},
      {r:'Génesis 28:15', t:'AT', v:'He aquí, yo estoy contigo, y te guardaré por dondequiera que fueres, y volveré a traerte a esta tierra.'},
      {r:'Génesis 50:20', t:'AT', v:'Vosotros pensasteis mal contra mí, mas Dios lo encaminó a bien, para hacer lo que vemos hoy, para mantener en vida a mucho pueblo.'},
      // ÉXODO
      {r:'Éxodo 3:14',    t:'AT', v:'Y respondió Dios a Moisés: YO SOY EL QUE SOY. Y dijo: Así dirás a los hijos de Israel: YO SOY me envió a vosotros.'},
      {r:'Éxodo 14:14',   t:'AT', v:'Jehová peleará por vosotros, y vosotros estaréis tranquilos.'},
      {r:'Éxodo 20:3',    t:'AT', v:'No tendrás dioses ajenos delante de mí.'},
      // NÚMEROS
      {r:'Números 6:24',  t:'AT', v:'Jehová te bendiga, y te guarde.'},
      {r:'Números 6:25',  t:'AT', v:'Jehová haga resplandecer su rostro sobre ti, y tenga de ti misericordia.'},
      {r:'Números 6:26',  t:'AT', v:'Jehová alce sobre ti su rostro, y ponga en ti paz.'},
      // DEUTERONOMIO
      {r:'Deuteronomio 6:5',  t:'AT', v:'Y amarás a Jehová tu Dios de todo tu corazón, y de toda tu alma, y con todas tus fuerzas.'},
      {r:'Deuteronomio 8:3',  t:'AT', v:'No sólo de pan vivirá el hombre, mas de todo lo que sale de la boca de Jehová vivirá el hombre.'},
      {r:'Deuteronomio 31:6', t:'AT', v:'Esforzaos y cobrad ánimo; no temáis, ni tengáis miedo de ellos, porque Jehová tu Dios es el que va contigo; no te dejará, ni te desamparará.'},
      // JOSUÉ
      {r:'Josué 1:8',    t:'AT', v:'Nunca se apartará de tu boca este libro de la ley, sino que de día y de noche meditarás en él, para que guardes y hagas conforme a todo lo que en él está escrito.'},
      {r:'Josué 1:9',    t:'AT', v:'Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes, porque Jehová tu Dios estará contigo en dondequiera que vayas.'},
      {r:'Josué 24:15',  t:'AT', v:'Pero yo y mi casa serviremos a Jehová.'},
      // SALMOS
      {r:'Salmos 1:1',   t:'AT', v:'Bienaventurado el varón que no anduvo en consejo de malos, ni estuvo en camino de pecadores, ni en silla de escarnecedores se ha sentado.'},
      {r:'Salmos 1:3',   t:'AT', v:'Será como árbol plantado junto a corrientes de aguas, que da su fruto en su tiempo, y su hoja no cae; y todo lo que hace, prosperará.'},
      {r:'Salmos 16:8',  t:'AT', v:'A Jehová he puesto siempre delante de mí; porque está a mi diestra, no seré conmovido.'},
      {r:'Salmos 18:2',  t:'AT', v:'Jehová, roca mía y castillo mío, y mi libertador; Dios mío, fortaleza mía, en él confiaré.'},
      {r:'Salmos 19:14', t:'AT', v:'Sean gratos los dichos de mi boca y la meditación de mi corazón delante de ti, oh Jehová, roca mía, y redentor mío.'},
      {r:'Salmos 23:1',  t:'AT', v:'Jehová es mi pastor; nada me faltará.'},
      {r:'Salmos 23:2',  t:'AT', v:'En lugares de delicados pastos me hará descansar; junto a aguas de reposo me pastoreará.'},
      {r:'Salmos 23:4',  t:'AT', v:'Aunque ande en valle de sombra de muerte, no temeré mal alguno, porque tú estarás conmigo; tu vara y tu cayado me infundirán aliento.'},
      {r:'Salmos 27:1',  t:'AT', v:'Jehová es mi luz y mi salvación; ¿de quién temeré? Jehová es la fortaleza de mi vida; ¿de quién me he de atemorizar?'},
      {r:'Salmos 27:14', t:'AT', v:'Aguarda a Jehová; esfuérzate, y aliéntese tu corazón; sí, espera a Jehová.'},
      {r:'Salmos 34:4',  t:'AT', v:'Busqué a Jehová, y él me oyó, y me libró de todos mis temores.'},
      {r:'Salmos 34:8',  t:'AT', v:'Gustad, y ved que es bueno Jehová; dichoso el hombre que confía en él.'},
      {r:'Salmos 34:18', t:'AT', v:'Cercano está Jehová a los quebrantados de corazón; y salva a los contritos de espíritu.'},
      {r:'Salmos 37:4',  t:'AT', v:'Deléitate asimismo en Jehová, y él te concederá las peticiones de tu corazón.'},
      {r:'Salmos 37:5',  t:'AT', v:'Encomienda a Jehová tu camino, y confía en él; y él hará.'},
      {r:'Salmos 40:2',  t:'AT', v:'Y me hizo sacar del pozo de la desesperación, del lodo cenagoso; puso mis pies sobre peña, y enderezó mis pasos.'},
      {r:'Salmos 42:11', t:'AT', v:'¿Por qué te abates, oh alma mía, y por qué te turbas dentro de mí? Espera en Dios; porque aún he de alabarle, salvación mía y Dios mío.'},
      {r:'Salmos 46:1',  t:'AT', v:'Dios es nuestro amparo y fortaleza, nuestro pronto auxilio en las tribulaciones.'},
      {r:'Salmos 46:10', t:'AT', v:'Estad quietos, y conoced que yo soy Dios; seré exaltado entre las naciones; enaltecido seré en la tierra.'},
      {r:'Salmos 51:10', t:'AT', v:'Crea en mí, oh Dios, un corazón limpio, y renueva un espíritu recto dentro de mí.'},
      {r:'Salmos 55:22', t:'AT', v:'Echa sobre Jehová tu carga, y él te sustentará; no dejará para siempre caído al justo.'},
      {r:'Salmos 56:3',  t:'AT', v:'En el día que temo, yo en ti confío.'},
      {r:'Salmos 62:8',  t:'AT', v:'Esperad en él en todo tiempo, oh pueblos; derramad delante de él vuestro corazón; Dios es nuestro refugio.'},
      {r:'Salmos 73:26', t:'AT', v:'Mi carne y mi corazón desfallecen; mas la roca de mi corazón y mi porción es Dios para siempre.'},
      {r:'Salmos 91:1',  t:'AT', v:'El que habita al abrigo del Altísimo morará bajo la sombra del Omnipotente.'},
      {r:'Salmos 91:2',  t:'AT', v:'Diré yo a Jehová: Esperanza mía, y castillo mío; mi Dios, en quien confiaré.'},
      {r:'Salmos 91:11', t:'AT', v:'Pues a sus ángeles mandará acerca de ti, que te guarden en todos tus caminos.'},
      {r:'Salmos 103:1', t:'AT', v:'Bendice, alma mía, a Jehová, y bendiga todo mi ser su santo nombre.'},
      {r:'Salmos 103:2', t:'AT', v:'Bendice, alma mía, a Jehová, y no olvides ninguno de sus beneficios.'},
      {r:'Salmos 103:3', t:'AT', v:'Él es quien perdona todas tus iniquidades, el que sana todas tus dolencias.'},
      {r:'Salmos 103:12',t:'AT', v:'Cuanto está lejos el oriente del occidente, hizo alejar de nosotros nuestras rebeliones.'},
      {r:'Salmos 107:1', t:'AT', v:'Alabad a Jehová, porque él es bueno; porque para siempre es su misericordia.'},
      {r:'Salmos 118:24',t:'AT', v:'Este es el día que hizo Jehová; nos gozaremos y alegraremos en él.'},
      {r:'Salmos 119:9', t:'AT', v:'¿Con qué limpiará el joven su camino? Con guardar tu palabra.'},
      {r:'Salmos 119:11',t:'AT', v:'En mi corazón he guardado tus dichos, para no pecar contra ti.'},
      {r:'Salmos 119:105',t:'AT',v:'Lámpara es a mis pies tu palabra, y lumbrera a mi camino.'},
      {r:'Salmos 121:1', t:'AT', v:'Alzaré mis ojos a los montes; ¿de dónde vendrá mi socorro?'},
      {r:'Salmos 121:2', t:'AT', v:'Mi socorro viene de Jehová, que hizo los cielos y la tierra.'},
      {r:'Salmos 138:3', t:'AT', v:'El día que clamé, me respondiste; me fortaleciste con vigor en mi alma.'},
      {r:'Salmos 139:14',t:'AT', v:'Te alabaré; porque formidables, maravillosas son tus obras; estoy maravillado, y mi alma lo sabe muy bien.'},
      {r:'Salmos 145:18',t:'AT', v:'Cercano está Jehová a todos los que le invocan, a todos los que le invocan de veras.'},
      // PROVERBIOS
      {r:'Proverbios 3:5', t:'AT', v:'Confía en Jehová con todo tu corazón, y no te apoyes en tu propia prudencia.'},
      {r:'Proverbios 3:6', t:'AT', v:'Reconócelo en todos tus caminos, y él enderezará tus veredas.'},
      {r:'Proverbios 4:23',t:'AT', v:'Sobre toda cosa guardada, guarda tu corazón; porque de él mana la vida.'},
      {r:'Proverbios 9:10',t:'AT', v:'El temor de Jehová es el principio de la sabiduría, y el conocimiento del Santísimo es la inteligencia.'},
      {r:'Proverbios 11:2',t:'AT', v:'Cuando viene la soberbia, viene también la deshonra; mas con los humildes está la sabiduría.'},
      {r:'Proverbios 11:14',t:'AT',v:'Donde no hay dirección sabia, caerá el pueblo; mas en la multitud de consejeros hay seguridad.'},
      {r:'Proverbios 12:18',t:'AT',v:'Hay hombres cuyas palabras son como golpes de espada; mas la lengua de los sabios es medicina.'},
      {r:'Proverbios 13:20',t:'AT',v:'El que anda con sabios, sabio será; mas el que se junta con necios será quebrantado.'},
      {r:'Proverbios 14:12',t:'AT',v:'Hay camino que al hombre le parece derecho; pero su fin es camino de muerte.'},
      {r:'Proverbios 16:3',t:'AT', v:'Encomienda a Jehová tus obras, y tus pensamientos serán afirmados.'},
      {r:'Proverbios 16:9',t:'AT', v:'El corazón del hombre piensa su camino; mas Jehová endereza sus pasos.'},
      {r:'Proverbios 17:17',t:'AT',v:'En todo tiempo ama el amigo, y es como un hermano en tiempo de angustia.'},
      {r:'Proverbios 18:10',t:'AT',v:'Torre fuerte es el nombre de Jehová; a él correrá el justo, y será levantado.'},
      {r:'Proverbios 22:6',t:'AT', v:'Instruye al niño en su camino, y aun cuando fuere viejo no se apartará de él.'},
      {r:'Proverbios 28:13',t:'AT',v:'El que encubre sus pecados no prosperará; mas el que los confiesa y se aparta alcanzará misericordia.'},
      // ISAÍAS
      {r:'Isaías 9:6',   t:'AT', v:'Porque un niño nos es nacido, hijo nos es dado, y el principado sobre su hombro; y se llamará su nombre Admirable, Consejero, Dios Fuerte, Padre Eterno, Príncipe de Paz.'},
      {r:'Isaías 26:3',  t:'AT', v:'Tú guardarás en completa paz a aquel cuyo pensamiento en ti persevera; porque en ti ha confiado.'},
      {r:'Isaías 40:28', t:'AT', v:'¿No has sabido, no has oído que el Dios eterno es Jehová, el cual creó los confines de la tierra? No desfallece, ni se fatiga con cansancio, y su entendimiento no hay quien lo alcance.'},
      {r:'Isaías 40:29', t:'AT', v:'Él da esfuerzo al cansado, y multiplica las fuerzas al que no tiene ningunas.'},
      {r:'Isaías 40:31', t:'AT', v:'Pero los que esperan a Jehová tendrán nuevas fuerzas; levantarán alas como las águilas; correrán, y no se cansarán; caminarán, y no se fatigarán.'},
      {r:'Isaías 41:10', t:'AT', v:'No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo; siempre te ayudaré, siempre te sustentaré con la diestra de mi justicia.'},
      {r:'Isaías 43:2',  t:'AT', v:'Cuando pases por las aguas, yo estaré contigo; y si por los ríos, no te anegarán. Cuando pases por el fuego, no te quemarás, ni la llama arderá en ti.'},
      {r:'Isaías 43:18', t:'AT', v:'No os acordéis de las cosas pasadas, ni traigáis a memoria las antiguas.'},
      {r:'Isaías 43:19', t:'AT', v:'He aquí que yo hago cosa nueva; pronto saldrá a luz; ¿no la conoceréis? Otra vez abriré camino en el desierto, y ríos en la soledad.'},
      {r:'Isaías 53:5',  t:'AT', v:'Mas él herido fue por nuestras rebeliones, molido por nuestros pecados; el castigo de nuestra paz fue sobre él, y por su llaga fuimos nosotros curados.'},
      {r:'Isaías 53:6',  t:'AT', v:'Todos nosotros nos descarriamos como ovejas, cada cual se apartó por su camino; mas Jehová cargó en él el pecado de todos nosotros.'},
      {r:'Isaías 54:17', t:'AT', v:'Ninguna arma forjada contra ti prosperará, y condenarás toda lengua que se levante contra ti en juicio.'},
      {r:'Isaías 55:8',  t:'AT', v:'Porque mis pensamientos no son vuestros pensamientos, ni vuestros caminos mis caminos, dijo Jehová.'},
      {r:'Isaías 55:11', t:'AT', v:'Así será mi palabra que sale de mi boca; no volverá a mí vacía, sino que hará lo que yo quiero, y será prosperada en aquello para que la envié.'},
      {r:'Isaías 61:1',  t:'AT', v:'El Espíritu de Jehová el Señor está sobre mí, porque me ungió Jehová; me ha enviado a predicar buenas nuevas a los abatidos.'},
      // JEREMÍAS
      {r:'Jeremías 17:7',t:'AT', v:'Bendito el varón que confía en Jehová, y cuya confianza es Jehová.'},
      {r:'Jeremías 17:9',t:'AT', v:'Engañoso es el corazón más que todas las cosas, y perverso; ¿quién lo conocerá?'},
      {r:'Jeremías 29:11',t:'AT',v:'Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal, para daros el fin que esperáis.'},
      {r:'Jeremías 29:12',t:'AT',v:'Entonces me invocaréis, y vendréis y oraréis a mí, y yo os oiré.'},
      {r:'Jeremías 29:13',t:'AT',v:'Y me buscaréis y me hallaréis, porque me buscaréis de todo vuestro corazón.'},
      {r:'Jeremías 33:3',t:'AT', v:'Clama a mí, y yo te responderé, y te enseñaré cosas grandes y ocultas que tú no conoces.'},
      // LAMENTACIONES
      {r:'Lamentaciones 3:22',t:'AT',v:'Por la misericordia de Jehová no hemos sido consumidos, porque nunca decayeron sus misericordias.'},
      {r:'Lamentaciones 3:23',t:'AT',v:'Nuevas son cada mañana; grande es tu fidelidad.'},
      // EZEQUIEL
      {r:'Ezequiel 36:26',t:'AT',v:'Os daré corazón nuevo, y pondré espíritu nuevo dentro de vosotros; y quitaré de vuestra carne el corazón de piedra, y os daré un corazón de carne.'},
      // DANIEL
      {r:'Daniel 3:17',  t:'AT', v:'He aquí nuestro Dios a quien servimos puede librarnos del horno de fuego ardiendo; y de tu mano, oh rey, nos librará.'},
      // MALAQUÍAS
      {r:'Malaquías 3:10',t:'AT',v:'Traed todos los diezmos al alfolí y haya alimento en mi casa; y probadme ahora en esto, dice Jehová de los ejércitos, si no os abriré las ventanas de los cielos, y derramaré sobre vosotros bendición hasta que sobreabunde.'},
      // MATEO
      {r:'Mateo 5:3',    t:'NT', v:'Bienaventurados los pobres en espíritu, porque de ellos es el reino de los cielos.'},
      {r:'Mateo 5:4',    t:'NT', v:'Bienaventurados los que lloran, porque ellos recibirán consolación.'},
      {r:'Mateo 5:8',    t:'NT', v:'Bienaventurados los de limpio corazón, porque ellos verán a Dios.'},
      {r:'Mateo 5:9',    t:'NT', v:'Bienaventurados los pacificadores, porque ellos serán llamados hijos de Dios.'},
      {r:'Mateo 5:14',   t:'NT', v:'Vosotros sois la luz del mundo; una ciudad asentada sobre un monte no se puede esconder.'},
      {r:'Mateo 5:16',   t:'NT', v:'Así alumbre vuestra luz delante de los hombres, para que vean vuestras buenas obras, y glorifiquen a vuestro Padre que está en los cielos.'},
      {r:'Mateo 6:9',    t:'NT', v:'Vosotros, pues, oraréis así: Padre nuestro que estás en los cielos, santificado sea tu nombre.'},
      {r:'Mateo 6:25',   t:'NT', v:'Por tanto os digo: No os afanéis por vuestra vida, qué habéis de comer o qué habéis de beber; ni por vuestro cuerpo, qué habéis de vestir.'},
      {r:'Mateo 6:33',   t:'NT', v:'Mas buscad primeramente el reino de Dios y su justicia, y todas estas cosas os serán añadidas.'},
      {r:'Mateo 6:34',   t:'NT', v:'Así que, no os afanéis por el día de mañana, porque el día de mañana traerá su afán.'},
      {r:'Mateo 7:7',    t:'NT', v:'Pedid, y se os dará; buscad, y hallaréis; llamad, y se os abrirá.'},
      {r:'Mateo 7:8',    t:'NT', v:'Porque todo aquel que pide, recibe; y el que busca, halla; y al que llama, se le abrirá.'},
      {r:'Mateo 11:28',  t:'NT', v:'Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar.'},
      {r:'Mateo 11:29',  t:'NT', v:'Llevad mi yugo sobre vosotros, y aprended de mí, que soy manso y humilde de corazón; y hallaréis descanso para vuestras almas.'},
      {r:'Mateo 16:18',  t:'NT', v:'Y yo también te digo, que tú eres Pedro, y sobre esta roca edificaré mi iglesia; y las puertas del Hades no prevalecerán contra ella.'},
      {r:'Mateo 19:26',  t:'NT', v:'Para los hombres esto es imposible; mas para Dios todo es posible.'},
      {r:'Mateo 28:19',  t:'NT', v:'Por tanto, id, y haced discípulos a todas las naciones, bautizándolos en el nombre del Padre, y del Hijo, y del Espíritu Santo.'},
      {r:'Mateo 28:20',  t:'NT', v:'Enseñándoles que guarden todas las cosas que os he mandado; y he aquí yo estoy con vosotros todos los días, hasta el fin del mundo.'},
      // MARCOS
      {r:'Marcos 9:23',  t:'NT', v:'Jesús le dijo: Si puedes creer, al que cree todo le es posible.'},
      {r:'Marcos 10:45', t:'NT', v:'Porque el Hijo del Hombre no vino para ser servido, sino para servir, y para dar su vida en rescate por muchos.'},
      {r:'Marcos 11:24', t:'NT', v:'Por tanto, os digo que todo lo que pidiereis orando, creed que lo recibiréis, y os vendrá.'},
      {r:'Marcos 16:15', t:'NT', v:'Y les dijo: Id por todo el mundo y predicad el evangelio a toda criatura.'},
      // LUCAS
      {r:'Lucas 1:37',   t:'NT', v:'Porque nada hay imposible para Dios.'},
      {r:'Lucas 11:9',   t:'NT', v:'Y yo os digo: Pedid, y se os dará; buscad, y hallaréis; llamad, y se os abrirá.'},
      {r:'Lucas 19:10',  t:'NT', v:'Porque el Hijo del Hombre vino a buscar y a salvar lo que se había perdido.'},
      // JUAN
      {r:'Juan 1:1',     t:'NT', v:'En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios.'},
      {r:'Juan 1:14',    t:'NT', v:'Y aquel Verbo fue hecho carne, y habitó entre nosotros (y vimos su gloria, gloria como del unigénito del Padre), lleno de gracia y de verdad.'},
      {r:'Juan 3:16',    t:'NT', v:'Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.'},
      {r:'Juan 3:17',    t:'NT', v:'Porque no envió Dios a su Hijo al mundo para condenar al mundo, sino para que el mundo sea salvo por él.'},
      {r:'Juan 3:36',    t:'NT', v:'El que cree en el Hijo tiene vida eterna; pero el que rehúsa creer en el Hijo no verá la vida.'},
      {r:'Juan 6:35',    t:'NT', v:'Jesús les dijo: Yo soy el pan de vida; el que a mí viene, nunca tendrá hambre; y el que en mí cree, no tendrá sed jamás.'},
      {r:'Juan 8:32',    t:'NT', v:'Y conoceréis la verdad, y la verdad os hará libres.'},
      {r:'Juan 8:36',    t:'NT', v:'Así que, si el Hijo os libertare, seréis verdaderamente libres.'},
      {r:'Juan 10:10',   t:'NT', v:'El ladrón no viene sino para hurtar y matar y destruir; yo he venido para que tengan vida, y para que la tengan en abundancia.'},
      {r:'Juan 10:28',   t:'NT', v:'Y yo les doy vida eterna; y no perecerán jamás, ni nadie las arrebatará de mi mano.'},
      {r:'Juan 11:25',   t:'NT', v:'Le dijo Jesús: Yo soy la resurrección y la vida; el que cree en mí, aunque esté muerto, vivirá.'},
      {r:'Juan 13:34',   t:'NT', v:'Un mandamiento nuevo os doy: Que os améis unos a otros; como yo os he amado, que también os améis unos a otros.'},
      {r:'Juan 13:35',   t:'NT', v:'En esto conocerán todos que sois mis discípulos, si tuviereis amor los unos con los otros.'},
      {r:'Juan 14:1',    t:'NT', v:'No se turbe vuestro corazón; creéis en Dios, creed también en mí.'},
      {r:'Juan 14:6',    t:'NT', v:'Jesús le dijo: Yo soy el camino, y la verdad, y la vida; nadie viene al Padre, sino por mí.'},
      {r:'Juan 14:27',   t:'NT', v:'La paz os dejo, mi paz os doy; yo no os la doy como el mundo la da. No se turbe vuestro corazón, ni tenga miedo.'},
      {r:'Juan 15:5',    t:'NT', v:'Yo soy la vid, vosotros los pámpanos; el que permanece en mí, y yo en él, éste lleva mucho fruto; porque separados de mí nada podéis hacer.'},
      {r:'Juan 15:7',    t:'NT', v:'Si permanecéis en mí, y mis palabras permanecen en vosotros, pedid todo lo que queréis, y os será hecho.'},
      {r:'Juan 15:13',   t:'NT', v:'Nadie tiene mayor amor que este, que uno ponga su vida por sus amigos.'},
      {r:'Juan 16:33',   t:'NT', v:'Estas cosas os he hablado para que en mí tengáis paz. En el mundo tendréis aflicción; pero confiad, yo he vencido al mundo.'},
      // HECHOS
      {r:'Hechos 1:8',   t:'NT', v:'Pero recibiréis poder, cuando haya venido sobre vosotros el Espíritu Santo, y me seréis testigos en Jerusalén, en toda Judea, en Samaria, y hasta lo último de la tierra.'},
      {r:'Hechos 2:38',  t:'NT', v:'Pedro les dijo: Arrepentíos, y bautícese cada uno de vosotros en el nombre de Jesucristo para perdón de los pecados; y recibiréis el don del Espíritu Santo.'},
      {r:'Hechos 4:12',  t:'NT', v:'Y en ningún otro hay salvación; porque no hay otro nombre bajo el cielo, dado a los hombres, en que podamos ser salvos.'},
      // ROMANOS
      {r:'Romanos 1:16', t:'NT', v:'Porque no me avergüenzo del evangelio, porque es poder de Dios para salvación a todo aquel que cree; al judío primeramente, y también al griego.'},
      {r:'Romanos 3:23', t:'NT', v:'Por cuanto todos pecaron, y están destituidos de la gloria de Dios.'},
      {r:'Romanos 3:24', t:'NT', v:'Siendo justificados gratuitamente por su gracia, mediante la redención que es en Cristo Jesús.'},
      {r:'Romanos 5:1',  t:'NT', v:'Justificados, pues, por la fe, tenemos paz para con Dios por medio de nuestro Señor Jesucristo.'},
      {r:'Romanos 5:8',  t:'NT', v:'Mas Dios muestra su amor para con nosotros, en que siendo aún pecadores, Cristo murió por nosotros.'},
      {r:'Romanos 6:23', t:'NT', v:'Porque la paga del pecado es muerte, mas la dádiva de Dios es vida eterna en Cristo Jesús Señor nuestro.'},
      {r:'Romanos 8:1',  t:'NT', v:'Ahora, pues, ninguna condenación hay para los que están en Cristo Jesús.'},
      {r:'Romanos 8:18', t:'NT', v:'Pues tengo por cierto que las aflicciones del tiempo presente no son comparables con la gloria venidera que en nosotros ha de manifestarse.'},
      {r:'Romanos 8:28', t:'NT', v:'Y sabemos que a los que aman a Dios, todas las cosas les ayudan a bien, esto es, a los que conforme a su propósito son llamados.'},
      {r:'Romanos 8:31', t:'NT', v:'¿Qué, pues, diremos a esto? Si Dios es por nosotros, ¿quién contra nosotros?'},
      {r:'Romanos 8:37', t:'NT', v:'Antes, en todas estas cosas somos más que vencedores por medio de aquel que nos amó.'},
      {r:'Romanos 8:38', t:'NT', v:'Por lo cual estoy seguro de que ni la muerte, ni la vida, ni ángeles, ni principados, ni potestades, ni lo presente, ni lo por venir, ni lo alto, ni lo profundo, ni ninguna otra cosa creada nos podrá separar del amor de Dios.'},
      {r:'Romanos 10:9', t:'NT', v:'Que si confesares con tu boca que Jesús es el Señor, y creyeres en tu corazón que Dios le levantó de los muertos, serás salvo.'},
      {r:'Romanos 10:13',t:'NT', v:'Porque todo aquel que invocare el nombre del Señor, será salvo.'},
      {r:'Romanos 12:1', t:'NT', v:'Así que, hermanos, os ruego por las misericordias de Dios, que presentéis vuestros cuerpos en sacrificio vivo, santo, agradable a Dios, que es vuestro culto racional.'},
      {r:'Romanos 12:2', t:'NT', v:'No os conforméis a este siglo, sino transformaos por medio de la renovación de vuestro entendimiento, para que comprobéis cuál sea la buena voluntad de Dios, agradable y perfecta.'},
      {r:'Romanos 15:13',t:'NT', v:'Y el Dios de esperanza os llene de todo gozo y paz en el creer, para que abundéis en esperanza por el poder del Espíritu Santo.'},
      // 1 CORINTIOS
      {r:'1 Corintios 10:13',t:'NT',v:'No os ha sobrevenido ninguna tentación que no sea humana; pero fiel es Dios, que no os dejará ser tentados más de lo que podéis resistir, sino que dará también juntamente con la tentación la salida.'},
      {r:'1 Corintios 13:4',t:'NT',v:'El amor es sufrido, es benigno; el amor no tiene envidia, el amor no es jactancioso, no se envanece.'},
      {r:'1 Corintios 13:7',t:'NT',v:'Todo lo sufre, todo lo cree, todo lo espera, todo lo soporta.'},
      {r:'1 Corintios 13:8',t:'NT',v:'El amor nunca deja de ser.'},
      {r:'1 Corintios 13:13',t:'NT',v:'Y ahora permanecen la fe, la esperanza y el amor, estos tres; pero el mayor de ellos es el amor.'},
      {r:'1 Corintios 15:57',t:'NT',v:'Mas gracias sean dadas a Dios, que nos da la victoria por medio de nuestro Señor Jesucristo.'},
      {r:'1 Corintios 16:13',t:'NT',v:'Velad, estad firmes en la fe; portaos varonilmente, y esforzaos.'},
      // 2 CORINTIOS
      {r:'2 Corintios 4:17',t:'NT',v:'Porque esta leve tribulación momentánea produce en nosotros un cada vez más excelente y eterno peso de gloria.'},
      {r:'2 Corintios 5:17',t:'NT',v:'De modo que si alguno está en Cristo, nueva criatura es; las cosas viejas pasaron; he aquí todas son hechas nuevas.'},
      {r:'2 Corintios 9:7',t:'NT', v:'Cada uno dé como propuso en su corazón: no con tristeza, ni por necesidad, porque Dios ama al dador alegre.'},
      {r:'2 Corintios 12:9',t:'NT',v:'Y me ha dicho: Bástate mi gracia; porque mi poder se perfecciona en la debilidad. Por tanto, de buena gana me gloriaré más bien en mis debilidades.'},
      // GÁLATAS
      {r:'Gálatas 2:20',  t:'NT', v:'Con Cristo estoy juntamente crucificado, y ya no vivo yo, mas vive Cristo en mí.'},
      {r:'Gálatas 5:22',  t:'NT', v:'Mas el fruto del Espíritu es amor, gozo, paz, paciencia, benignidad, bondad, fe.'},
      {r:'Gálatas 5:23',  t:'NT', v:'Mansedumbre, templanza; contra tales cosas no hay ley.'},
      {r:'Gálatas 6:9',   t:'NT', v:'No nos cansemos, pues, de hacer bien; porque a su tiempo segaremos, si no desmayamos.'},
      // EFESIOS
      {r:'Efesios 2:8',   t:'NT', v:'Porque por gracia sois salvos por medio de la fe; y esto no de vosotros, pues es don de Dios.'},
      {r:'Efesios 2:9',   t:'NT', v:'No por obras, para que nadie se gloríe.'},
      {r:'Efesios 2:10',  t:'NT', v:'Porque somos hechura suya, creados en Cristo Jesús para buenas obras, las cuales Dios preparó de antemano para que anduviésemos en ellas.'},
      {r:'Efesios 4:32',  t:'NT', v:'Antes sed benignos unos con otros, misericordiosos, perdonándoos unos a otros, como Dios también os perdonó a vosotros en Cristo.'},
      {r:'Efesios 5:25',  t:'NT', v:'Maridos, amad a vuestras mujeres, así como Cristo amó a la iglesia, y se entregó a sí mismo por ella.'},
      {r:'Efesios 6:11',  t:'NT', v:'Vestíos de toda la armadura de Dios, para que podáis estar firmes contra las asechanzas del diablo.'},
      {r:'Efesios 6:12',  t:'NT', v:'Porque no tenemos lucha contra sangre y carne, sino contra principados, contra potestades, contra los gobernadores de las tinieblas de este siglo, contra huestes espirituales de maldad en las regiones celestes.'},
      // FILIPENSES
      {r:'Filipenses 1:6',t:'NT', v:'Estando persuadido de esto, que el que comenzó en vosotros la buena obra, la perfeccionará hasta el día de Jesucristo.'},
      {r:'Filipenses 4:4',t:'NT', v:'Regocijaos en el Señor siempre. Otra vez digo: ¡Regocijaos!'},
      {r:'Filipenses 4:6',t:'NT', v:'Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios en toda oración y ruego, con acción de gracias.'},
      {r:'Filipenses 4:7',t:'NT', v:'Y la paz de Dios, que sobrepasa todo entendimiento, guardará vuestros corazones y vuestros pensamientos en Cristo Jesús.'},
      {r:'Filipenses 4:8',t:'NT', v:'Por lo demás, hermanos, todo lo que es verdadero, todo lo honesto, todo lo justo, todo lo puro, todo lo amable, todo lo que es de buen nombre; si hay virtud alguna, si algo digno de alabanza, en esto pensad.'},
      {r:'Filipenses 4:13',t:'NT',v:'Todo lo puedo en Cristo que me fortalece.'},
      {r:'Filipenses 4:19',t:'NT',v:'Mi Dios, pues, suplirá todo lo que os falta conforme a sus riquezas en gloria en Cristo Jesús.'},
      // COLOSENSES
      {r:'Colosenses 3:2',t:'NT', v:'Poned la mira en las cosas de arriba, no en las de la tierra.'},
      {r:'Colosenses 3:13',t:'NT',v:'Soportándoos unos a otros, y perdonándoos unos a otros si alguno tuviere queja contra otro. De la manera que Cristo os perdonó, así también hacedlo vosotros.'},
      {r:'Colosenses 3:15',t:'NT',v:'Y la paz de Dios gobierne en vuestros corazones, a la que asimismo fuisteis llamados en un solo cuerpo; y sed agradecidos.'},
      {r:'Colosenses 3:17',t:'NT',v:'Y todo lo que hacéis, sea de palabra o de hecho, hacedlo todo en el nombre del Señor Jesús, dando gracias a Dios Padre por medio de él.'},
      // 1 TESALONICENSES
      {r:'1 Tesalonicenses 5:16',t:'NT',v:'Estad siempre gozosos.'},
      {r:'1 Tesalonicenses 5:17',t:'NT',v:'Orad sin cesar.'},
      {r:'1 Tesalonicenses 5:18',t:'NT',v:'Dad gracias en todo, porque esta es la voluntad de Dios para con vosotros en Cristo Jesús.'},
      // 2 TIMOTEO
      {r:'2 Timoteo 1:7',  t:'NT', v:'Porque no nos ha dado Dios espíritu de cobardía, sino de poder, de amor y de dominio propio.'},
      {r:'2 Timoteo 3:16', t:'NT', v:'Toda la Escritura es inspirada por Dios, y útil para enseñar, para redargüir, para corregir, para instruir en justicia.'},
      {r:'2 Timoteo 3:17', t:'NT', v:'A fin de que el hombre de Dios sea perfecto, enteramente preparado para toda buena obra.'},
      // HEBREOS
      {r:'Hebreos 4:12',  t:'NT', v:'Porque la palabra de Dios es viva y eficaz, y más cortante que toda espada de dos filos; y penetra hasta partir el alma y el espíritu, las coyunturas y los tuétanos.'},
      {r:'Hebreos 4:16',  t:'NT', v:'Acerquémonos, pues, confiadamente al trono de la gracia, para alcanzar misericordia y hallar gracia para el oportuno socorro.'},
      {r:'Hebreos 11:1',  t:'NT', v:'Es, pues, la fe la certeza de lo que se espera, la convicción de lo que no se ve.'},
      {r:'Hebreos 11:6',  t:'NT', v:'Pero sin fe es imposible agradar a Dios; porque es necesario que el que se acerca a Dios crea que le hay, y que es galardonador de los que le buscan.'},
      {r:'Hebreos 12:1',  t:'NT', v:'Por tanto, nosotros también, teniendo en derredor nuestro tan grande nube de testigos, despojémonos de todo peso y del pecado que nos asedia, y corramos con paciencia la carrera que tenemos por delante.'},
      {r:'Hebreos 12:2',  t:'NT', v:'Puestos los ojos en Jesús, el autor y consumador de la fe.'},
      {r:'Hebreos 13:5',  t:'NT', v:'No os dejé ni os desampararé.'},
      {r:'Hebreos 13:8',  t:'NT', v:'Jesucristo es el mismo ayer, y hoy, y por los siglos.'},
      // SANTIAGO
      {r:'Santiago 1:2',  t:'NT', v:'Hermanos míos, tened por sumo gozo cuando os halléis en diversas pruebas.'},
      {r:'Santiago 1:3',  t:'NT', v:'Sabiendo que la prueba de vuestra fe produce paciencia.'},
      {r:'Santiago 1:5',  t:'NT', v:'Y si alguno de vosotros tiene falta de sabiduría, pídala a Dios, el cual da a todos abundantemente y sin reproche, y le será dada.'},
      {r:'Santiago 4:7',  t:'NT', v:'Someteos, pues, a Dios; resistid al diablo, y huirá de vosotros.'},
      {r:'Santiago 4:8',  t:'NT', v:'Acercaos a Dios, y él se acercará a vosotros.'},
      {r:'Santiago 5:16', t:'NT', v:'La oración eficaz del justo puede mucho.'},
      // 1 PEDRO
      {r:'1 Pedro 2:9',   t:'NT', v:'Mas vosotros sois linaje escogido, real sacerdocio, nación santa, pueblo adquirido por Dios, para que anunciéis las virtudes de aquel que os llamó de las tinieblas a su luz admirable.'},
      {r:'1 Pedro 5:7',   t:'NT', v:'Echando toda vuestra ansiedad sobre él, porque él tiene cuidado de vosotros.'},
      {r:'1 Pedro 5:8',   t:'NT', v:'Sed sobrios, y velad; porque vuestro adversario el diablo, como león rugiente, anda alrededor buscando a quien devorar.'},
      // 1 JUAN
      {r:'1 Juan 1:9',    t:'NT', v:'Si confesamos nuestros pecados, él es fiel y justo para perdonar nuestros pecados, y limpiarnos de toda maldad.'},
      {r:'1 Juan 3:1',    t:'NT', v:'Mirad cuál amor nos ha dado el Padre, para que seamos llamados hijos de Dios.'},
      {r:'1 Juan 4:7',    t:'NT', v:'Amados, amémonos unos a otros; porque el amor es de Dios. Todo aquel que ama, es nacido de Dios, y conoce a Dios.'},
      {r:'1 Juan 4:8',    t:'NT', v:'El que no ama, no ha conocido a Dios; porque Dios es amor.'},
      {r:'1 Juan 4:18',   t:'NT', v:'En el amor no hay temor, sino que el perfecto amor echa fuera el temor.'},
      {r:'1 Juan 4:19',   t:'NT', v:'Nosotros le amamos a él, porque él nos amó primero.'},
      // APOCALIPSIS
      {r:'Apocalipsis 3:20',t:'NT',v:'He aquí, yo estoy a la puerta y llamo; si alguno oye mi voz y abre la puerta, entraré a él, y cenaré con él, y él conmigo.'},
      {r:'Apocalipsis 21:4',t:'NT',v:'Enjugará Dios toda lágrima de los ojos de ellos; y ya no habrá muerte, ni habrá más llanto, ni clamor, ni dolor; porque las primeras cosas pasaron.'},
      {r:'Apocalipsis 21:5',t:'NT',v:'Y el que estaba sentado en el trono dijo: He aquí, yo hago nuevas todas las cosas.'},
      {r:'Apocalipsis 22:20',t:'NT',v:'El que da testimonio de estas cosas dice: Sí, vengo en breve. Amén; sí, ven, Señor Jesús.'},
    ];

    /* ─── cache de resultados para onclick ─── */
    let _cache = [];

    /* ─── estado ─── */
    let state = {
      query:    '',
      testament:'ALL',
      bookFilter:'',
      sort:     'relevance',
      results:  [],
      timer:    null,
    };

    /* ─── PARSE: detecta si la query es una referencia bíblica ─── */
    function parseRef(q) {
      // "Juan 3:16" | "Juan 3" | "1 Juan 3:16"
      const m = q.match(/^(\d?\s?[a-záéíóúñ]+(?:\s[a-záéíóúñ]+)?)\s+(\d+)(?::(\d+))?$/i);
      if (!m) return null;
      return { bookName: m[1].trim(), chapter: parseInt(m[2]), verse: m[3] ? parseInt(m[3]) : null };
    }

    /* ─── SEARCH ENGINE — usa BRV.bible (fuente única) ─── */
    function search(q) {
      if (!q || q.trim().length < 2) return [];
      return BRV.bible.search(q, {
        testament: state.testament,
        bookFilter: state.bookFilter,
        sort: state.sort,
        limit: 300,
      });
    }

    /* ─── HIGHLIGHT: marca la palabra buscada en el texto ─── */
    function highlight(text, q) {
      if (!q || q.length < 2) return escHtml(text);
      const ref = parseRef(q);
      if (ref) return escHtml(text); // no highlight en búsqueda por referencia
      const words = q.trim().split(/\s+/).filter(w => w.length > 1);
      let result = escHtml(text);
      for (const w of words) {
        const safe = w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        result = result.replace(
          new RegExp('(' + safe + ')', 'gi'),
          '<mark>$1</mark>'
        );
      }
      return result;
    }

    function escHtml(s) {
      return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    }

    /* ─── RENDER ─── */
    function renderResults(results, q) {
      const wrapper  = document.getElementById('brv-results-wrapper');
      const welcome  = document.getElementById('brv-search-welcome');
      const loader   = document.getElementById('brv-search-loader');
      const list     = document.getElementById('brv-results-list');
      const countEl  = document.getElementById('brv-results-count');
      const headerCt = document.getElementById('brv-search-header-count');
      loader.classList.remove('active');
      if (results.length === 0) {
        wrapper.style.display = 'none';
        welcome.style.display = 'none';
        list.innerHTML = '';
        /* Sin resultados */
        if (!document.getElementById('brv-no-results')) {
          const div = document.createElement('div');
          div.id = 'brv-no-results';
          div.className = 'brv-no-results';
          div.innerHTML = `<div class="brv-no-results-icon">🔍</div>
            <h3>Sin resultados</h3>
            <p>No encontramos versículos para <strong style="color:var(--brv-gold)">"${escHtml(q)}"</strong>.<br>
            Prueba con otra palabra, o escribe una referencia como <em>Juan 3:16</em>.</p>`;
          document.getElementById('brv-search-results-area').appendChild(div);
        }
        headerCt.textContent = '';
        return;
      }
      /* Limpiar "sin resultados" */
      document.getElementById('brv-no-results')?.remove();
      wrapper.style.display = 'block';
      welcome.style.display  = 'none';
      const n = results.length;
      const label = n === 80 ? 'Más de 80 resultados' : `${n} resultado${n !== 1 ? 's' : ''}`;
      countEl.innerHTML = `<strong>${n === 80 ? '80+' : n}</strong> versículo${n !== 1 ? 's' : ''} encontrado${n !== 1 ? 's' : ''}`;
      headerCt.textContent = label;
      _cache.length = 0; /* reset cache before rendering new results */
      list.innerHTML = results.map((v, i) => {
        const highlighted = highlight(v.v, q);
        const idx = _cache.push({ref: v.r, text: v.v}) - 1;
        return `<div class="brv-result-card" style="animation:brv-fade-up .3s ease ${Math.min(i,20)*0.03}s both;"
                     data-idx="${idx}" onclick="BRV.search.openResult(${idx})">
          <div class="brv-result-card-header">
            <span class="brv-result-ref">${escHtml(v.r)}</span>
            <span class="brv-result-testament">${v.t}</span>
          </div>
          <div class="brv-result-text">${highlighted}</div>
          <div class="brv-result-actions">
            <button class="brv-result-act" onclick="event.stopPropagation();BRV.search.copyResult(${idx})" aria-label="Copiar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>Copiar
            </button>
            <button class="brv-result-act" onclick="event.stopPropagation();BRV.search.favResult(${idx})" aria-label="Guardar en favoritos">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>Favorito
            </button>
            <button class="brv-result-act" onclick="event.stopPropagation();BRV.search.projectResult(${idx})" aria-label="Proyectar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>Proyectar
            </button>
            <button class="brv-result-act" onclick="event.stopPropagation();BRV.search.goToReader(${idx})">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>Leer
            </button>
          </div>
        </div>`;
      }).join('');
    }

    /* ─── ACCIONES de resultado ─── */
    /* ─── ACCIONES de resultado ─── */
    function openResult(idx) {
      const item = _cache[idx];
      if (item) goToReader(idx);
    }

    function copyResult(idx) {
      const item = _cache[idx];
      if (!item) return;
      navigator.clipboard.writeText('"' + item.text + '" — ' + item.ref)
        .then(() => BRV.ui.toast('📋 Copiado al portapapeles', 'success'))
        .catch(() => BRV.ui.toast('No se pudo copiar'));
    }

    function favResult(idx) {
      const item = _cache[idx];
      if (!item) return;
      const favs = BRV.storage.get('favorites', []);
      if (favs.find(f => f.ref === item.ref)) { BRV.ui.toast('Ya está en favoritos'); return; }
      favs.unshift({ ref: item.ref, text: item.text, date: new Date().toLocaleDateString('es') });
      BRV.storage.set('favorites', favs);
      BRV.ui.toast('⭐ Guardado en favoritos', 'success');
    }

    function projectResult(idx) {
      const item = _cache[idx];
      if (!item) return;
      BRV.storage.set('projVerse', { text: item.text, ref: item.ref });
      BRV.ui.toast('📽 Versículo listo para proyectar');
    }

    function goToReader(idx) {
      const item = _cache[idx];
      const ref = item ? item.ref : String(idx);
      /* Parsea la referencia y navega al lector */
      const m = ref.match(/^(.+?)\s+(\d+)(?::(\d+))?$/);
      if (!m) { BRV.router.go('reader'); return; }
      const bookName = m[1].trim();
      const chapter  = parseInt(m[2]);
      const books = BRV.reader ? BRV.reader.getBooks() : [];
      const book  = books.find(b =>
        b.name.toLowerCase() === bookName.toLowerCase() ||
        b.abbr.toLowerCase() === bookName.toLowerCase()
      );
      BRV.router.go('reader');
      if (book) {
        setTimeout(() => {
          BRV.reader.selectBook(book.id);
          setTimeout(() => BRV.reader.selectChapter(chapter), 80);
        }, 60);
      }
    }

    /* ─── CONTROLES ─── */
    function onInput(val) {
      state.query = val;
      const clearBtn = document.getElementById('brv-search-clear');
      clearBtn.classList.toggle('visible', val.length > 0);
      /* Debounce 280ms */
      clearTimeout(state.timer);
      if (val.trim().length < 2) {
        document.getElementById('brv-results-wrapper').style.display = 'none';
        document.getElementById('brv-search-welcome').style.display = 'flex';
        document.getElementById('brv-search-header-count').textContent = '';
        document.getElementById('brv-no-results')?.remove();
        return;
      }
      document.getElementById('brv-search-loader').classList.add('active');
      document.getElementById('brv-search-welcome').style.display = 'none';
      state.timer = setTimeout(() => run(), 280);
    }

    function run() {
      const q = state.query;
      if (!q || q.trim().length < 2) return;
      const results = search(q);
      state.results = results;
      renderResults(results, q);
      /* Historial */
      if (BRV.favorites && BRV.favorites.addHistory) {
        BRV.favorites.addHistory('Búsqueda: ' + q, '🔍');
      }
    }

    function clear() {
      state.query = '';
      const input = document.getElementById('brv-search-input');
      if (input) input.value = '';
      document.getElementById('brv-search-clear').classList.remove('visible');
      document.getElementById('brv-results-wrapper').style.display = 'none';
      document.getElementById('brv-search-welcome').style.display = 'flex';
      document.getElementById('brv-search-header-count').textContent = '';
      document.getElementById('brv-no-results')?.remove();
      document.getElementById('brv-search-loader').classList.remove('active');
      if (input) input.focus();
    }

    function quickSearch(q) {
      const input = document.getElementById('brv-search-input');
      if (input) { input.value = q; input.focus(); }
      state.query = q;
      document.getElementById('brv-search-clear').classList.add('visible');
      document.getElementById('brv-search-loader').classList.add('active');
      document.getElementById('brv-search-welcome').style.display = 'none';
      clearTimeout(state.timer);
      state.timer = setTimeout(() => run(), 180);
    }

    function setTestament(t, btn) {
      state.testament = t;
      document.querySelectorAll('[data-t]').forEach(b => b.classList.toggle('active', b.dataset.t === t));
      if (state.query.trim().length >= 2) run();
    }

    function setBookFilter(val) {
      state.bookFilter = val;
      if (state.query.trim().length >= 2) run();
    }

    function setSort(s, btn) {
      state.sort = s;
      document.querySelectorAll('.brv-sort-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (state.results.length > 0) {
        if (s === 'canonical') {
          /* Ordenar por el índice canónico de la Biblia */
          const order = VERSES.map(v => v.r);
          state.results.sort((a, b) => order.indexOf(a.r) - order.indexOf(b.r));
        } else {
          run(); /* re-search con relevancia */
        }
        renderResults(state.results, state.query);
      }
    }

    /* ─── INIT del book select ─── */
    function initBookSelect() {
      const sel = document.getElementById('brv-book-filter');
      if (!sel) return;
      const books = BRV.bible.getBooks();
      let h = '<option value="">Todos los libros</option>';
      h += '<optgroup label="Antiguo Testamento">' +
        books.filter(b => b.t === 'AT').map(b => `<option value="${b.id}">${b.name}</option>`).join('') +
        '</optgroup>';
      h += '<optgroup label="Nuevo Testamento">' +
        books.filter(b => b.t === 'NT').map(b => `<option value="${b.id}">${b.name}</option>`).join('') +
        '</optgroup>';
      sel.innerHTML = h;
    }

    /* ─── Hook de router ─── */
    BRV.router.hooks['search'] = function() {
      initBookSelect();
      setTimeout(() => {
        const input = document.getElementById('brv-search-input');
        if (input) input.focus();
      }, 100);
    };

    return {
      onInput, run, clear, quickSearch,
      setTestament, setBookFilter, setSort,
      openResult, copyResult, favResult, projectResult, goToReader,
      getVerses: () => VERSES,
      getCache: () => _cache,
    };
  })();

  /* ══════════════════════════════════════════════════════════════
     MÓDULO 4 — PROYECCIÓN PARA IGLESIAS
  ══════════════════════════════════════════════════════════════ */
  BRV.projection = (function() {

    /* ── Estado ── */
    let cfg = {
      text:      'Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.',
      ref:       'Juan 3:16',
      fontSize:  48,
      lineHeight:1.55,
      bold:      false,
      italic:    true,
      align:     'center',
      textColor: '#ffffff',
      refColor:  '#FFD700',
      darkness:  60,
      bgStyle:   'linear-gradient(135deg,#060C18 0%,#0B1422 40%,#100B05 70%,#0A0C14 100%)',
      useBgImg:  false,
      bgMode:    'color',
      shadow:    70,
      autoRotate: true,
      blanked:   false,
    };

    let projWin    = null;   /* referencia a la ventana de proyección */
    let syncTimer  = null;
    let history    = [];     /* historial de sesión */
    let searchTimer= null;

    /* ── Accede a la Biblia completa (módulo central) ── */
    function getVerses() {
      return []; /* obsoleto: ahora se usa BRV.bible.search directamente */
    }

    /* ══════════════════
       VERSÍCULO
    ══════════════════ */
    function setVerse(ref, text) {
      text = fixVersal(text);
      cfg.full = { ref: ref, text: text };
      cfg.ref  = ref;
      cfg.text = text;
      addHistory(ref, text);
      /* Cierra sugerencias */
      closeSuggestions();
      const inp = document.getElementById('brv-proj-search-input');
      if (inp) inp.value = ref;
      if (cfg.autoFit) afComputeAndApply();
      /* En modo "Imágenes aleatorias": cambia el fondo con cada versículo */
      if (cfg.bgMode === 'image' && cfg.autoRotate !== false) {
        const gallery = BRV.storage.get('backgrounds', []);
        if (gallery.length) {
          nextRandomBg();   /* elige nueva imagen, optimiza y refresca */
          return;
        }
      }
      updatePreview();
      updateProjectionWindow();
    }

    function randomVerse() {
      const v = BRV.bible.randomVerse();
      if (!v) return;
      setVerse(v.r, v.v);
      BRV.ui.toast('🎲 Versículo aleatorio');
    }

    function favVerse() {
      const favs = BRV.storage.get('favorites', []);
      if (favs.find(f => f.ref === cfg.ref)) { BRV.ui.toast('Ya está en favoritos'); return; }
      favs.unshift({ ref: cfg.ref, text: cfg.text, date: new Date().toLocaleDateString('es') });
      BRV.storage.set('favorites', favs);
      BRV.ui.toast('⭐ Guardado en favoritos', 'success');
    }

    function copyVerse() {
      navigator.clipboard.writeText('"' + cfg.text + '" — ' + cfg.ref)
        .then(() => BRV.ui.toast('📋 Versículo copiado', 'success'))
        .catch(() => BRV.ui.toast('No se pudo copiar'));
    }

    /* ══════════════════
       PREVISUALIZACIÓN
    ══════════════════ */
    function updatePreview() {
      const vt  = document.getElementById('brv-proj-verse-text');
      const vr  = document.getElementById('brv-proj-verse-ref');
      const ov  = document.getElementById('brv-proj-overlay');
      const bg  = document.getElementById('brv-proj-bg');
      if (!vt) return;

      const displayText = cfg.blanked ? '' : '"' + cfg.text + '"';
      const displayRef  = cfg.blanked ? '' : cfg.ref;

      vt.textContent  = displayText;
      vr.textContent  = displayRef;
      vt.style.cssText = [
        'font-size:'    + cfg.fontSize + 'px',
        'line-height:'  + cfg.lineHeight,
        'font-weight:'  + (cfg.bold ? '700' : '400'),
        'font-style:'   + (cfg.italic ? 'italic' : 'normal'),
        'text-align:'   + cfg.align,
        'color:'        + cfg.textColor,
        'text-shadow: ' + shadowCSS(),
        'transition: color .3s, font-size .2s',
        'margin-bottom: 4%',
        'font-family: Palatino Linotype, Book Antiqua, Palatino, Georgia, serif',
      ].join(';');
      vr.style.color     = cfg.refColor;
      vr.style.textAlign = cfg.align;
      ov.style.background = 'rgba(0,0,0,' + (cfg.darkness / 100) + ')';

      /* Fondo */
      if (cfg.useBgImg) {
        const saved = BRV.storage.get('activeBg', null);
        const bgs   = BRV.storage.get('backgrounds', []);
        const found = saved ? bgs.find(b => b.id === saved) : null;
        if (found && found.src) {
          /* IMPORTANTE: limpiar el atajo 'background' ANTES de poner la imagen */
          bg.style.background = 'transparent';
          bg.style.backgroundImage = 'url("' + found.src + '")';
          bg.style.backgroundSize = 'cover';
          bg.style.backgroundPosition = 'center';
        } else {
          bg.style.backgroundImage = '';
          bg.style.background = cfg.bgStyle;
        }
      } else {
        bg.style.background = cfg.bgStyle;
        bg.style.backgroundImage = '';
      }
      if (cfg.autoFit) autoFitPreview();
    }

    /* ══════════════════
       VENTANA DE PROYECCIÓN
    ══════════════════ */
    function launch() {
      /* Si ya está abierta, solo actualiza */
      if (projWin && !projWin.closed) {
        updateProjectionWindow();
        projWin.focus();
        return;
      }
      const w = screen.width  || 1280;
      const h = screen.height || 720;
      projWin = window.open('', 'brv_projection',
        'width=' + w + ',height=' + h + ',toolbar=0,location=0,menubar=0,scrollbars=0,status=0');

      if (!projWin) { BRV.ui.toast('Permite las ventanas emergentes para proyectar', 'warn'); return; }

      projWin.document.write(buildProjectionHTML());
      projWin.document.close();
      /* Esperar a que la ventana pinte su layout antes de medir el tamaño
         uniforme para esa superficie (evita lecturas clientHeight=0) */
      setTimeout(function(){
        if (cfg.slides && cfg.slides.length > 1){
          var pj = afProjSurf();
          if (pj) cfg.uniformProj = afUniformFor(pj, cfg.slides);
        }
        _onProjResize();
      }, 120);

      /* Muestra status bar */
      document.getElementById('brv-proj-status').classList.add('active');
      document.getElementById('brv-proj-connected-badge').style.display = 'inline-block';

      /* Monitorea cierre */
      clearInterval(syncTimer);
      syncTimer = setInterval(() => {
        if (projWin && projWin.closed) {
          clearInterval(syncTimer);
          document.getElementById('brv-proj-status').classList.remove('active');
          document.getElementById('brv-proj-connected-badge').style.display = 'none';
          projWin = null;
        }
      }, 800);

      BRV.ui.toast('📽 Proyección abierta');
    }

    function closeWindow() {
      if (projWin && !projWin.closed) projWin.close();
      projWin = null;
      clearInterval(syncTimer);
      document.getElementById('brv-proj-status').classList.remove('active');
      document.getElementById('brv-proj-connected-badge').style.display = 'none';
    }

    function updateProjectionWindow() {
      if (!projWin || projWin.closed) return;
      try {
        const pw = projWin;
        const vt = pw.document.getElementById('pw-verse-text');
        const vr = pw.document.getElementById('pw-verse-ref');
        const ov = pw.document.getElementById('pw-overlay');
        const bg = pw.document.getElementById('pw-bg');
        if (!vt) return;

        const displayText = cfg.blanked ? '' : '"' + cfg.text + '"';
        const displayRef  = cfg.blanked ? '' : cfg.ref;

        vt.textContent = displayText;
        vr.textContent = displayRef;
        vt.style.fontSize   = cfg.fontSize + 'px';
        vt.style.lineHeight = String(cfg.lineHeight);
        vt.style.fontWeight = cfg.bold ? '700' : '400';
        vt.style.fontStyle  = cfg.italic ? 'italic' : 'normal';
        vt.style.textAlign  = cfg.align;
        vt.style.color      = cfg.textColor;
        vt.style.textShadow = shadowCSS();
        vr.style.color      = cfg.refColor;
        vr.style.textAlign  = cfg.align;
        ov.style.background = 'rgba(0,0,0,' + (cfg.darkness / 100) + ')';

        if (cfg.useBgImg) {
          const saved = BRV.storage.get('activeBg', null);
          const bgs   = BRV.storage.get('backgrounds', []);
          const found = saved ? bgs.find(b => b.id === saved) : null;
          if (found && found.src) {
            bg.style.background = 'transparent';
            bg.style.backgroundImage = 'url("' + found.src + '")';
            bg.style.backgroundSize = 'cover';
            bg.style.backgroundPosition = 'center';
          } else {
            bg.style.backgroundImage = '';
            bg.style.background = cfg.bgStyle;
          }
        } else {
          bg.style.backgroundImage = '';
          bg.style.background = cfg.bgStyle;
        }
        if (cfg.autoFit) autoFitProjection();
      } catch(e) { /* cross-origin o ventana cerrada */ }
    }

    /* Genera el HTML completo de la ventana de proyección */
    function buildProjectionHTML() {
      const displayText = cfg.blanked ? '' : '"' + cfg.text + '"';
      const displayRef  = cfg.blanked ? '' : cfg.ref;

      let bgCSS = 'background:' + cfg.bgStyle + ';';
      if (cfg.useBgImg) {
        const saved = BRV.storage.get('activeBg', null);
        const bgs   = BRV.storage.get('backgrounds', []);
        const found = saved ? bgs.find(b => b.id === saved) : null;
        if (found && found.src) bgCSS = 'background-image:url("' + found.src + '");background-size:cover;background-position:center;';
      }

      return '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">' +
        '<title>Proyección — ' + cfg.ref + '</title>' +
        '<style>*{margin:0;padding:0;box-sizing:border-box}' + 'html,body{width:100vw;height:100vh;overflow:hidden;background:#000}' + '#pw-bg{position:absolute;inset:0;' + bgCSS + 'background-size:cover;background-position:center}' + '#pw-overlay{position:absolute;inset:0;background:rgba(0,0,0,' + (cfg.darkness/100) + ')}' + '#pw-content{position:absolute;inset:0;display:flex;flex-direction:column;' + 'align-items:center;justify-content:center;padding:8%}' + '#pw-verse-text{font-family:"Palatino Linotype","Book Antiqua",Palatino,Georgia,serif;' + 'font-size:' + cfg.fontSize + 'px;' + 'line-height:' + cfg.lineHeight + ';' + 'font-weight:' + (cfg.bold?'700':'400') + ';' + 'font-style:' + (cfg.italic?'italic':'normal') + ';' + 'text-align:' + cfg.align + ';' + 'color:' + cfg.textColor + ';' + 'text-shadow:' + shadowCSS() + ';' + 'margin-bottom:4%;transition:all .4s ease}' + '#pw-verse-ref{font-size:' + Math.round(cfg.fontSize * 0.38) + 'px;' + 'font-weight:700;letter-spacing:2px;text-transform:uppercase;' + 'color:' + cfg.refColor + ';text-align:' + cfg.align + ';' + 'text-shadow:0 1px 8px rgba(0,0,0,.95);transition:all .4s ease}' + '#pw-controls{position:fixed;bottom:0;left:0;right:0;' + 'background:rgba(0,0,0,.85);backdrop-filter:blur(10px);' + 'padding:10px 20px;display:flex;gap:10px;align-items:center;' + 'opacity:0;transition:opacity .3s;border-top:1px solid rgba(255,255,255,.08)}' + 'body:hover #pw-controls{opacity:1}' + '.pw-btn{padding:8px 18px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;border:none;transition:all .2s}' + '.pw-btn-primary{background:#C9A84C;color:#0B0E14}' + '.pw-btn-ghost{background:rgba(255,255,255,.08);color:#fff;border:1px solid rgba(255,255,255,.15)}' + '.pw-btn:hover{opacity:.85;transform:translateY(-1px)}' + '</style></head><body>' +
        '<div id="pw-bg"></div>' +
        '<div id="pw-overlay"></div>' +
        '<div id="pw-content">' +
          '<div id="pw-verse-text">' + escH(displayText) + '</div>' +
          '<div id="pw-verse-ref">' + escH(displayRef) + '</div>' +
        '</div>' +
        '<div id="pw-controls">' +
          '<button class="pw-btn pw-btn-primary" onclick="document.documentElement.requestFullscreen()">⛶ Pantalla completa</button>' +
          '<button class="pw-btn pw-btn-ghost" onclick="document.exitFullscreen&&document.exitFullscreen()">Salir</button>' +
          '<button class="pw-btn pw-btn-ghost" onclick="window.close()">✕ Cerrar</button>' +
          '<span style="flex:1"></span>' +
          '<span style="font-size:11px;color:rgba(255,255,255,.4);letter-spacing:1px;">BIBLIA REINA VALERA 1960</span>' +
        '</div>' +
        '<script>function _op(){try{return window.opener&&window.opener.BRV&&window.opener.BRV.projection}catch(e){return null}}' +
          'window.addEventListener("resize",function(){var p=_op();if(p&&p._onProjResize)setTimeout(p._onProjResize,120);});' +
          'document.addEventListener("fullscreenchange",function(){var p=_op();if(p&&p._onProjResize)setTimeout(p._onProjResize,150);});' +
          'document.addEventListener("keydown",function(e){' +
          'if(e.key==="f"||e.key==="F")document.documentElement.requestFullscreen();' +
          'if(e.key==="Escape"&&document.fullscreenElement)document.exitFullscreen();' +
          'if(e.key==="ArrowRight"||e.key===" "){var p=_op();if(p&&p.nextSlide)p.nextSlide();}' +
          'if(e.key==="ArrowLeft"){var p=_op();if(p&&p.prevSlide)p.prevSlide();}' +
        '});<\/script>' +
        '</body></html>';
    }

    function escH(s) {
      return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    }

    /* ══════════════════
       PANTALLA EN NEGRO
    ══════════════════ */
    function blank() {
      cfg.blanked = !cfg.blanked;
      const btn = document.getElementById('brv-blank-btn');
      if (btn) btn.classList.toggle('active', cfg.blanked);
      updatePreview();
      updateProjectionWindow();
      BRV.ui.toast(cfg.blanked ? '⬛ Pantalla en negro' : '▶ Versículo visible');
    }

    /* ══════════════════
       CONTROLES DE ESTILO
    ══════════════════ */
    function setFontSize(v) {
      cfg.fontSize = parseInt(v);
      document.getElementById('brv-fs-val').textContent = cfg.autoFit ? 'Auto' : v;
      if (!cfg.autoFit) { updatePreview(); updateProjectionWindow(); }
    }
    function setLineHeight(v) {
      cfg.lineHeight = (v / 100).toFixed(2);
      document.getElementById('brv-lh-val').textContent = cfg.lineHeight;
      if (cfg.autoFit) afComputeAndApply();
      updatePreview(); updateProjectionWindow();
    }
    function setBold(v) { cfg.bold = v; if (cfg.autoFit) afComputeAndApply(); updatePreview(); updateProjectionWindow(); }
    function setItalic(v) { cfg.italic = v; if (cfg.autoFit) afComputeAndApply(); updatePreview(); updateProjectionWindow(); }
    function setAlign(v, btn) {
      cfg.align = v;
      document.querySelectorAll('.brv-align-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (cfg.autoFit) afComputeAndApply();
      updatePreview(); updateProjectionWindow();
    }
    function setTextColor(color, el) {
      cfg.textColor = color;
      document.querySelectorAll('#brv-text-colors .brv-color-swatch').forEach(s => s.classList.remove('active'));
      el.classList.add('active');
      updatePreview(); updateProjectionWindow();
    }
    function setRefColor(color, el) {
      cfg.refColor = color;
      document.querySelectorAll('#brv-ref-colors .brv-color-swatch').forEach(s => s.classList.remove('active'));
      el.classList.add('active');
      updatePreview(); updateProjectionWindow();
    }
    function setDarkness(v) {
      cfg.darkness = parseInt(v);
      document.getElementById('brv-dark-val').textContent = v + '%';
      updatePreview(); updateProjectionWindow();
    }
    function setBgColor(el) {
      cfg.bgStyle = el.dataset.bg;
      document.querySelectorAll('[data-bg]').forEach(s => s.classList.remove('active'));
      el.classList.add('active');
      updatePreview(); updateProjectionWindow();
    }
    function toggleBgImage(v) {
      cfg.useBgImg = v;
      const info = document.getElementById('brv-bg-img-info');
      if (info) info.style.display = v ? 'block' : 'none';
      updatePreview(); updateProjectionWindow();
    }

    /* Llamado desde el módulo Fondos al activar una imagen */
    function useActiveBackground(enable) {
      cfg.useBgImg = enable !== false;
      const chk = document.getElementById('brv-use-bg-img');
      if (chk) chk.checked = cfg.useBgImg;
      const info = document.getElementById('brv-bg-img-info');
      if (info) info.style.display = cfg.useBgImg ? 'block' : 'none';
      updatePreview(); updateProjectionWindow();
    }

    /* Refresca el fondo (por si cambió la imagen activa) */
    function refreshBackground() {
      updatePreview(); updateProjectionWindow();
    }

    /* ══════════════════
       BUSCADOR INTERNO
    ══════════════════ */
    function onSearchInput(val) {
      clearTimeout(searchTimer);
      if (!val || val.trim().length < 2) { closeSuggestions(); return; }
      searchTimer = setTimeout(() => showSuggestions(val), 220);
    }

    function showSuggestions(q) {
      const matches = BRV.bible.search(q, { limit: 8 });
      const box = document.getElementById('brv-proj-suggestions');
      if (!matches.length) { closeSuggestions(); return; }
      box.innerHTML = matches.map((v, i) =>
        '<div class="brv-proj-suggestion" data-idx="' + i + '">' +
          '<div class="brv-proj-suggestion-ref">' + v.r + '</div>' +
          '<div class="brv-proj-suggestion-text">' + v.v.substring(0, 72) + '…</div>' +
        '</div>'
      ).join('');
      box.querySelectorAll('.brv-proj-suggestion').forEach((el, i) => {
        el.addEventListener('click', () => { setVerse(matches[i].r, matches[i].v); });
      });
      box.classList.add('open');
    }

    function closeSuggestions() {
      const box = document.getElementById('brv-proj-suggestions');
      if (box) box.classList.remove('open');
    }

    function searchEnter() {
      const val = (document.getElementById('brv-proj-search-input') || {}).value || '';
      if (!val.trim()) return;
      const matches = BRV.bible.search(val, { limit: 1 });
      if (matches.length) { setVerse(matches[0].r, matches[0].v); closeSuggestions(); }
      else { BRV.ui.toast('Versículo no encontrado', 'warn'); }
    }

    /* ══════════════════
       HISTORIAL DE SESIÓN
    ══════════════════ */
    function addHistory(ref, text) {
      history = history.filter(h => h.ref !== ref);
      history.unshift({ ref, text });
      if (history.length > 12) history = history.slice(0, 12);
      renderHistory();
    }

    function renderHistory() {
      const el = document.getElementById('brv-proj-history');
      if (!el) return;
      if (!history.length) {
        el.innerHTML = '<p style="font-size:11px;color:var(--brv-text-2);opacity:.6;padding:0 0 8px;">Los versículos proyectados aparecerán aquí.</p>';
        return;
      }
      el.innerHTML = history.map((h, i) =>
        '<div class="brv-proj-hist-item" onclick="BRV.projection._setFromHistory(' + i + ')">' +
          '<div class="brv-proj-hist-ref">' + h.ref + '</div>' +
          '<div class="brv-proj-hist-text">' + h.text.substring(0, 60) + '…</div>' +
        '</div>'
      ).join('');
    }

    function _setFromHistory(i) {
      const h = history[i];
      if (h) setVerse(h.ref, h.text);
    }

    /* ══════════════════
       HOOK DE ROUTER
    ══════════════════ */
    BRV.router.hooks['projection'] = function() {
      BRV.projection.initPicker();
      /* Restaura versículo guardado desde otros módulos */
      const saved = BRV.storage.get('projVerse', null);
      if (saved && saved.ref && saved.text) {
        cfg.ref  = saved.ref;
        cfg.text = saved.text;
        cfg.full = { ref: saved.ref, text: saved.text };
        BRV.storage.remove('projVerse');
      }
      /* ── Arranque inteligente del fondo ── */
      const gallery = BRV.storage.get('backgrounds', []);
      const savedMode = BRV.storage.get('projBgMode', null);
      if (savedMode === 'image' && gallery.length) {
        BRV.projection.chooseBgMode('image');
      } else if (savedMode === 'color') {
        BRV.projection.chooseBgMode('color');
      } else if (gallery.length) {
        /* Primera vez: si hay imágenes, carga una aleatoria automáticamente */
        BRV.projection.chooseBgMode('image');
      } else {
        /* Sin galería: usa colores por defecto */
        BRV.projection.chooseBgMode('color');
      }
      updatePreview();
      if (cfg.autoFit) { afSyncUI(); setTimeout(function(){ _onProjResize(); }, 40); }
      const inp = document.getElementById('brv-proj-search-input');
      if (inp) inp.value = cfg.ref;
    };

    /* ── Init ── */
    function init() { afSyncUI(); if (cfg.autoFit) afComputeAndApply(); updatePreview(); initPicker(); }

    /* ══════════════════════════════════════════
       SELECTOR ESTRUCTURADO: Libro → Cap → Versículo(s)
    ══════════════════════════════════════════ */
    let pickState = { bookId:'', chapter:0, vFrom:0, vTo:0 };

    function initPicker() {
      const sel = document.getElementById('brv-pp-book');
      if (!sel || sel.dataset.ready) return;
      const books = BRV.bible.getBooks();
      let h = '<option value="">Elegir libro...</option>';
      h += '<optgroup label="Antiguo Testamento">';
      books.filter(b => b.t === 'AT').forEach(b => { h += '<option value="'+b.id+'">'+b.name+'</option>'; });
      h += '</optgroup><optgroup label="Nuevo Testamento">';
      books.filter(b => b.t === 'NT').forEach(b => { h += '<option value="'+b.id+'">'+b.name+'</option>'; });
      h += '</optgroup>';
      sel.innerHTML = h;
      sel.dataset.ready = '1';
    }

    function pickBook(bookId) {
      pickState = { bookId, chapter:0, vFrom:0, vTo:0 };
      const chSel = document.getElementById('brv-pp-chapter');
      const vFrom = document.getElementById('brv-pp-verse-from');
      const vTo   = document.getElementById('brv-pp-verse-to');
      const go    = document.getElementById('brv-pp-go');
      /* Reset versículos */
      vFrom.innerHTML = '<option value="">—</option>'; vFrom.disabled = true;
      vTo.innerHTML   = '<option value="">—</option>'; vTo.disabled = true;
      go.disabled = true;
      if (!bookId) { chSel.innerHTML = '<option value="">—</option>'; chSel.disabled = true; return; }
      const book = BRV.bible.getBook(bookId);
      let h = '<option value="">Cap...</option>';
      for (let c = 1; c <= book.chapters; c++) h += '<option value="'+c+'">'+c+'</option>';
      chSel.innerHTML = h; chSel.disabled = false;
    }

    function pickChapter(ch) {
      ch = parseInt(ch);
      pickState.chapter = ch || 0;
      pickState.vFrom = 0; pickState.vTo = 0;
      const vFrom = document.getElementById('brv-pp-verse-from');
      const vTo   = document.getElementById('brv-pp-verse-to');
      const go    = document.getElementById('brv-pp-go');
      go.disabled = true;
      if (!ch) { vFrom.innerHTML='<option value="">—</option>'; vFrom.disabled=true; vTo.innerHTML='<option value="">—</option>'; vTo.disabled=true; return; }
      const verses = BRV.bible.getChapter(pickState.bookId, ch);
      let h = '<option value="">Vers...</option>';
      verses.forEach(v => { h += '<option value="'+v.n+'">'+v.n+'</option>'; });
      vFrom.innerHTML = h; vFrom.disabled = false;
      let h2 = '<option value="">—</option>';
      verses.forEach(v => { h2 += '<option value="'+v.n+'">'+v.n+'</option>'; });
      vTo.innerHTML = h2; vTo.disabled = false;
    }

    function pickVerseRange() {
      const vFrom = parseInt(document.getElementById('brv-pp-verse-from').value) || 0;
      let vTo = parseInt(document.getElementById('brv-pp-verse-to').value) || 0;
      pickState.vFrom = vFrom;
      pickState.vTo = vTo;
      const go = document.getElementById('brv-pp-go');
      go.disabled = !vFrom;
      /* Si "hasta" es menor que "desde", lo ignoramos */
      if (vTo && vTo < vFrom) { pickState.vTo = 0; }
    }

    function projectPicked() {
      if (!pickState.bookId || !pickState.chapter || !pickState.vFrom) {
        BRV.ui.toast('Selecciona libro, capítulo y versículo', 'warn'); return;
      }
      const range = BRV.bible.getRange(pickState.bookId, pickState.chapter, pickState.vFrom, pickState.vTo || pickState.vFrom);
      if (!range) { BRV.ui.toast('No se encontró el versículo', 'warn'); return; }
      setVerse(range.r, range.v);
      BRV.ui.toast('📽 ' + range.r);
    }

    /* ══════════════════════════════════════════════════════════
       FONDO INTELIGENTE — análisis automático de legibilidad
       (estilo ProPresenter / EasyWorship)
    ══════════════════════════════════════════════════════════ */

    /* Elige el tipo de fondo: 'image' o 'color' */
    function chooseBgMode(mode) {
      cfg.bgMode = mode;
      document.getElementById('brv-bgmode-image').classList.toggle('active', mode === 'image');
      document.getElementById('brv-bgmode-color').classList.toggle('active', mode === 'color');
      document.getElementById('brv-bgpanel-image').style.display = mode === 'image' ? 'block' : 'none';
      document.getElementById('brv-bgpanel-color').style.display = mode === 'color' ? 'block' : 'none';

      if (mode === 'image') {
        cfg.useBgImg = true;
        /* Restaura preferencia de cambio automático */
        const savedAuto = BRV.storage.get('projAutoRotate', '1');
        cfg.autoRotate = savedAuto !== '0';
        const autoChk = document.getElementById('brv-autorotate-chk');
        if (autoChk) autoChk.checked = cfg.autoRotate;
        const gallery = BRV.storage.get('backgrounds', []);
        const emptyNote = document.getElementById('brv-bg-empty-note');
        if (!gallery.length) {
          if (emptyNote) emptyNote.style.display = 'block';
          document.querySelector('.brv-bg-auto-note').style.display = 'none';
          BRV.ui.toast('No hay imágenes. Carga fondos primero.', 'warn');
          return;
        }
        if (emptyNote) emptyNote.style.display = 'none';
        document.querySelector('.brv-bg-auto-note').style.display = 'flex';
        nextRandomBg();
      } else {
        cfg.useBgImg = false;
        updatePreview(); updateProjectionWindow();
      }
      BRV.storage.set('projBgMode', mode);
    }

    /* Selecciona una imagen aleatoria de la galería y la optimiza */
    function nextRandomBg() {
      const gallery = BRV.storage.get('backgrounds', []);
      if (!gallery.length) { BRV.ui.toast('No hay imágenes en la galería', 'warn'); return; }
      const img = gallery[Math.floor(Math.random() * gallery.length)];
      BRV.storage.set('activeBg', img.id);
      cfg.useBgImg = true;
      /* Analiza la imagen y optimiza la legibilidad automáticamente */
      analyzeAndOptimize(img.src, function() {
        updatePreview();
        updateProjectionWindow();
      });
    }

    /* Analiza brillo/contraste de la imagen y ajusta texto, overlay y sombra */
    function analyzeAndOptimize(src, done) {
      const statusEl = document.getElementById('brv-bg-auto-status');
      const detailEl = document.getElementById('brv-bg-auto-detail');
      if (statusEl) statusEl.textContent = 'Analizando imagen...';

      const image = new Image();
      image.crossOrigin = 'anonymous';
      image.onload = function() {
        try {
          /* Dibuja en un canvas reducido para muestrear pixeles */
          const W = 80, H = 45;
          const canvas = document.createElement('canvas');
          canvas.width = W; canvas.height = H;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(image, 0, 0, W, H);
          const data = ctx.getImageData(0, 0, W, H).data;

          /* Mide el brillo de TODA la imagen y de la BANDA CENTRAL (donde va el texto) */
          let totalLum = 0, count = 0;
          let centerLum = 0, centerCount = 0;
          let minL = 255, maxL = 0;
          const cyTop = Math.floor(H * 0.28), cyBot = Math.floor(H * 0.72);
          for (let y = 0; y < H; y++) {
            for (let x = 0; x < W; x++) {
              const idx = (y * W + x) * 4;
              const r = data[idx], g = data[idx+1], b = data[idx+2];
              /* Luminancia percibida (Rec. 709) */
              const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
              totalLum += lum; count++;
              if (lum < minL) minL = lum;
              if (lum > maxL) maxL = lum;
              if (y >= cyTop && y <= cyBot) { centerLum += lum; centerCount++; }
            }
          }
          const avg = totalLum / count;             /* 0-255 */
          const centerAvg = centerLum / centerCount; /* 0-255 banda central */
          const contrast = maxL - minL;              /* rango dinámico */

          /* ── DECISIONES DE LEGIBILIDAD ──
             Usamos la banda central (más relevante para el texto). */
          const cb = centerAvg / 255; /* 0-1 */

          /* Overlay: imágenes más brillantes necesitan más oscurecimiento
             para que el texto blanco resalte. */
          let overlay = Math.round((0.35 + cb * 0.45) * 100); /* 35%-80% */
          overlay = Math.max(30, Math.min(82, overlay));

          /* Brillo efectivo tras el overlay */
          const effLum = centerAvg * (1 - overlay / 100);

          /* Color de texto: con overlay aplicado casi siempre conviene blanco.
             Solo si la imagen es muy clara y dejamos poco overlay, usamos texto oscuro. */
          let textColor, refColor;
          if (effLum > 150) {
            textColor = '#101010';      /* texto oscuro sobre fondo claro */
            refColor  = '#5a3e00';
          } else {
            textColor = '#ffffff';      /* texto blanco sobre fondo oscuro */
            refColor  = '#FFD700';
          }

          /* Sombra del texto: más fuerte si hay mucho contraste o imagen movida */
          let shadow = Math.round(40 + (contrast / 255) * 55); /* 40%-95% */
          shadow = Math.max(40, Math.min(95, shadow));

          /* Aplica los valores a la configuración */
          cfg.darkness  = overlay;
          cfg.textColor = textColor;
          cfg.refColor  = refColor;
          cfg.shadow    = shadow;

          /* Sincroniza los sliders del panel de colores */
          syncControlsToCfg();

          /* Mensaje de estado */
          let tipo = cb > 0.6 ? 'clara' : (cb < 0.3 ? 'oscura' : 'media');
          if (statusEl) statusEl.textContent = 'Legibilidad optimizada ✓';
          if (detailEl) {
            detailEl.classList.add('show');
            detailEl.innerHTML =
              'Imagen ' + tipo + ' (brillo ' + Math.round(cb*100) + '%) · ' +
              'Texto ' + (textColor === '#ffffff' ? 'blanco' : 'oscuro') + ' · ' +
              'Overlay ' + overlay + '% · Sombra ' + shadow + '%';
          }
        } catch(e) {
          /* Si el análisis falla, usa valores seguros */
          cfg.darkness = 60; cfg.textColor = '#ffffff'; cfg.refColor = '#FFD700'; cfg.shadow = 70;
          syncControlsToCfg();
          if (statusEl) statusEl.textContent = 'Legibilidad optimizada ✓';
        }
        if (done) done();
      };
      image.onerror = function() {
        cfg.darkness = 60; cfg.textColor = '#ffffff'; cfg.refColor = '#FFD700'; cfg.shadow = 70;
        syncControlsToCfg();
        if (done) done();
      };
      image.src = src;
    }

    /* Sincroniza los controles visuales con cfg */
    function syncControlsToCfg() {
      const ds = document.getElementById('brv-dark-slider');
      const dv = document.getElementById('brv-dark-val');
      if (ds) ds.value = cfg.darkness;
      if (dv) dv.textContent = cfg.darkness + '%';
      const ss = document.getElementById('brv-shadow-slider');
      const sv = document.getElementById('brv-shadow-val');
      if (ss) ss.value = cfg.shadow;
      if (sv) sv.textContent = cfg.shadow + '%';
      /* Resalta el swatch de color de texto activo si existe */
      document.querySelectorAll('[data-text-color]').forEach(s =>
        s.classList.toggle('active', s.dataset.textColor === cfg.textColor));
    }

    /* Activa/desactiva el cambio de imagen por versículo */
    function setAutoRotate(v) {
      cfg.autoRotate = v;
      BRV.storage.set('projAutoRotate', v ? '1' : '0');
      BRV.ui.toast(v ? 'La imagen cambiará con cada versículo' : 'Imagen fija');
    }

    /* Control de intensidad de sombra */
    function setShadow(v) {
      cfg.shadow = parseInt(v);
      const el = document.getElementById('brv-shadow-val');
      if (el) el.textContent = cfg.shadow + '%';
      updatePreview(); updateProjectionWindow();
    }

    /* Devuelve el CSS de sombra según cfg.shadow (0-100) */
    function shadowCSS() {
      const s = (cfg.shadow != null ? cfg.shadow : 70) / 100;
      const blur1 = Math.round(4 + s * 14);
      const blur2 = Math.round(10 + s * 40);
      const a1 = (0.5 + s * 0.45).toFixed(2);
      const a2 = (0.3 + s * 0.4).toFixed(2);
      return '0 2px ' + blur1 + 'px rgba(0,0,0,' + a1 + '), 0 0 ' + blur2 + 'px rgba(0,0,0,' + a2 + ')';
    }

    /* ══════════════════════════════════════════════════════════
       AUTOAJUSTE INTELIGENTE DE TIPOGRAFÍA (medición real + binary-fit)
       + división automática en diapositivas (estilo ProPresenter)
    ══════════════════════════════════════════════════════════ */
    var REF_RATIO = 0.38;
    var _afResizeT = null;
    function afBounds(surf){
      var minPx = cfg.fitMin || 18;
      /* Máximo dinámico: basado en la altura real del contenedor.
         Antes era 80px fijo → versículos cortos quedaban diminutos.
         Ahora: hasta 75% de la altura disponible, máximo 300px. */
      var ref = (surf && surf.contentEl) ? surf.contentEl : (function(){
        var el = document.getElementById('brv-proj-verse-text');
        return el ? el.parentElement : null;
      })();
      var maxPx = cfg.fitMax || 300;
      if (ref && ref.clientHeight > 0) {
        maxPx = Math.max(60, Math.min(300, Math.floor(ref.clientHeight * 0.75)));
      }
      return { min: minPx, max: maxPx };
    }

    /* Normaliza la "versal" inicial (p. ej. "EN el principio" -> "En el principio")
       sin alterar el resto del texto bíblico. Solo afecta a las palabras
       totalmente en mayúsculas que abren el versículo. */
    function afIsAllCaps(tok){
      var letters = tok.replace(/[^A-Za-zÁÉÍÓÚÜÑÀÈÌÒÙáéíóúüñ]/g, '');
      if (!letters.length) return false;
      return letters === letters.toUpperCase() && letters !== letters.toLowerCase();
    }
    function fixVersal(s){
      if (!s) return s;
      /* ── Paso 1: detectar si el versículo comienza con palabra(s) en versales
         (ej. "EN el principio" → "En el principio")
         Solo se normalizan las palabras INICIALES que estén completamente en
         mayúsculas; el resto del texto bíblico queda intacto. ── */
      var parts = s.split(/(\s+)/);
      var changed = false;
      for (var k = 0; k < parts.length; k++){
        var t = parts[k];
        if (/^\s*$/.test(t)) continue;          /* saltar espacios */
        /* Una palabra está en versal si: tiene letras, todas son mayúsculas,
           y tiene al menos 2 letras (evitar siglas de 1 letra como "Y", "A") */
        var letters = t.replace(/[^A-Za-zÁÉÍÓÚÜÑÀÈÌÒÙáéíóúüñ]/g, '');
        var isVersal = letters.length >= 2
                       && letters === letters.toUpperCase()
                       && letters !== letters.toLowerCase();
        if (isVersal) { parts[k] = t.toLowerCase(); changed = true; }
        else break;   /* la primera palabra normal detiene el bucle */
      }
      if (!changed) return s;
      var out = parts.join('');
      /* ── Paso 2: capitalizar solo la primera letra del resultado ── */
      return out.replace(/[A-Za-zÁÉÍÓÚÜÑÀÈÌÒÙáéíóúüñ]/, function(m){ return m.toUpperCase(); });
    }

    function afApplyStyles(surf){
      var t = surf.textEl;
      t.style.fontWeight = cfg.bold ? '700' : '400';
      t.style.fontStyle  = cfg.italic ? 'italic' : 'normal';
      t.style.textAlign  = cfg.align;
      t.style.lineHeight = String(cfg.lineHeight);
      if (surf.refEl) surf.refEl.style.textAlign = cfg.align;
    }

    /* Búsqueda binaria del mayor tamaño que NO desborda el área */
    function afFit(surf){
      var b = afBounds(surf), win = surf.win, t = surf.textEl, r = surf.refEl, c = surf.contentEl;
      if (!t || !c) return { size:b.max, fits:true };
      /* Medición fiable: sin transiciones (evita leer alto a mitad de animación)
         y forzando que el texto envuelva al ancho real del área */
      t.style.transition = 'none';
      t.style.maxWidth = '100%';
      t.style.whiteSpace = 'normal';
      t.style.wordBreak = 'break-word';
      if (r) r.style.transition = 'none';
      var cs = win.getComputedStyle(c);
      var availH = c.clientHeight - (parseFloat(cs.paddingTop)||0) - (parseFloat(cs.paddingBottom)||0);
      var availW = c.clientWidth  - (parseFloat(cs.paddingLeft)||0) - (parseFloat(cs.paddingRight)||0);
      if (availH <= 4 || availW <= 4) return { size:b.max, fits:true };
      function used(px){
        t.style.fontSize = px + 'px';
        if (r) r.style.fontSize = Math.max(10, Math.round(px * REF_RATIO)) + 'px';
        var mb = parseFloat(win.getComputedStyle(t).marginBottom) || 0;
        return { h: t.scrollHeight + mb + (r ? r.offsetHeight : 0), w: t.scrollWidth };
      }
      var lo = b.min, hi = b.max, best = null;
      while (lo <= hi) {
        var mid = (lo + hi) >> 1, u = used(mid);
        if (u.h <= availH && u.w <= availW) { best = mid; lo = mid + 1; } else { hi = mid - 1; }
      }
      if (best === null) { used(b.min); return { size:b.min, fits:false }; }
      used(best); return { size:best, fits:true };
    }

    function afPreviewSurf(){
      var t = document.getElementById('brv-proj-verse-text');
      if (!t) return null;
      return { win:window, textEl:t, refEl:document.getElementById('brv-proj-verse-ref'), contentEl:t.parentElement };
    }
    function afProjSurf(){
      if (!projWin || projWin.closed) return null;
      var d; try { d = projWin.document; } catch(e){ return null; }
      var t = d.getElementById('pw-verse-text'); if (!t) return null;
      return { win:projWin, textEl:t, refEl:d.getElementById('pw-verse-ref'), contentEl:d.getElementById('pw-content') };
    }
    /* Aplica un tamaño fijo (sin búsqueda) — para tamaño uniforme entre diapositivas */
    function afApplyFixed(surf, px){
      if (!surf || !surf.contentEl) return;
      var t = surf.textEl, r = surf.refEl;
      t.style.transition = 'none'; t.style.maxWidth = '100%'; t.style.whiteSpace = 'normal'; t.style.wordBreak = 'break-word';
      t.style.fontSize = px + 'px';
      if (r){ r.style.transition = 'none'; r.style.fontSize = Math.max(10, Math.round(px * REF_RATIO)) + 'px'; }
    }
    function autoFitPreview(){
      var s = afPreviewSurf(); if (!s || !s.contentEl) return; afApplyStyles(s);
      if (cfg.slides && cfg.slides.length > 1 && cfg.uniformPreview) afApplyFixed(s, cfg.uniformPreview);
      else afFit(s);
    }
    function autoFitProjection(){
      var s = afProjSurf(); if (!s || !s.contentEl) return; afApplyStyles(s);
      if (cfg.slides && cfg.slides.length > 1 && cfg.uniformProj) afApplyFixed(s, cfg.uniformProj);
      else afFit(s);
    }
    /* Calcula el mayor tamaño que cabe en TODAS las diapositivas.
       Mide cada una individualmente y toma el mínimo → ese es el tamaño
       uniforme (el que garantiza que NINGUNA diapositiva se desborde). */
    function afUniformFor(surf, slides){
      if (!surf || !surf.contentEl || surf.contentEl.clientHeight <= 4) return null;
      var b = afBounds(surf), sz = b.max;
      for (var i = 0; i < slides.length; i++){
        var r = afMeasure(surf, slides[i].text, slides[i].ref);
        sz = Math.min(sz, r.size);
      }
      /* Restaurar contenido de la diapositiva actualmente activa */
      var cur = (cfg.slides && cfg.slides[cfg.slideIndex]) || slides[0];
      if (cur) afMeasure(surf, cur.text, cur.ref);
      return sz;
    }
    function afApplyUniform(){
      cfg.uniformPreview = null; cfg.uniformProj = null;
      if (!cfg.slides || cfg.slides.length <= 1) return;
      /* Si el DOM no tiene dimensiones aún (recién montado), reintentar en el
         siguiente frame para garantizar mediciones correctas */
      var ps = afPreviewSurf();
      if (!ps || !ps.contentEl || ps.contentEl.clientHeight <= 4){
        requestAnimationFrame(function(){
          cfg.uniformPreview = afUniformFor(afPreviewSurf(), cfg.slides);
          var pj = afProjSurf(); if (pj) cfg.uniformProj = afUniformFor(pj, cfg.slides);
          afApplySlide(); updatePreview(); updateProjectionWindow();
        });
        return;
      }
      cfg.uniformPreview = afUniformFor(ps, cfg.slides);
      var pj = afProjSurf(); if (pj) cfg.uniformProj = afUniformFor(pj, cfg.slides);
    }

    /* Parsea "Juan 3:16", "Génesis 2:3-9" o "Salmos 23" → {bookId,chapter,from,to} */
    function afParseRange(ref){
      if (!ref || !BRV.bible || !BRV.bible.resolveBook) return null;
      var m = ref.match(/^(.+?)\s+(\d+):(\d+)(?:\s*-\s*(\d+))?$/);
      if (m){ var b = BRV.bible.resolveBook(m[1].trim()); if (!b) return null;
        return { bookId:b.id, chapter:+m[2], from:+m[3], to:+(m[4]||m[3]) }; }
      var m2 = ref.match(/^(.+?)\s+(\d+)$/);
      if (m2){ var b2 = BRV.bible.resolveBook(m2[1].trim()); if (!b2) return null;
        var ch = BRV.bible.getChapter ? BRV.bible.getChapter(b2.id, +m2[2]) : [];
        if (!ch.length) return null;
        return { bookId:b2.id, chapter:+m2[2], from:1, to:ch[ch.length-1].n }; }
      return null;
    }

    function afMeasure(surf, text, ref){
      surf.textEl.textContent = '"' + text + '"';
      if (surf.refEl) surf.refEl.textContent = ref;
      afApplyStyles(surf);
      return afFit(surf);
    }

    /* Calcula las diapositivas necesarias para que TODO sea visible */
    function afComputeSlides(){
      if (!cfg.full) cfg.full = { ref: cfg.ref, text: cfg.text };
      if (!cfg.autoFit) return [{ ref: cfg.full.ref, text: cfg.full.text }];
      var surf = afProjSurf() || afPreviewSurf();
      if (!surf || !surf.contentEl || surf.contentEl.clientHeight <= 4)
        return [{ ref: cfg.full.ref, text: cfg.full.text }];
      var whole = afMeasure(surf, cfg.full.text, cfg.full.ref);
      var sel = afParseRange(cfg.full.ref);
      if (whole.fits || !sel || sel.to <= sel.from)
        return [{ ref: cfg.full.ref, text: cfg.full.text }];
      var slides = [], gStart = sel.from, v = sel.from, guard = 0;
      while (v <= sel.to && guard++ < 2000){
        var test = BRV.bible.getRange(sel.bookId, sel.chapter, gStart, v);
        var r = afMeasure(surf, test.v, test.r);
        if (!r.fits){
          if (v === gStart){ var one = BRV.bible.getRange(sel.bookId, sel.chapter, gStart, gStart);
            slides.push({ ref:one.r, text:fixVersal(one.v) }); gStart = v + 1; v = gStart; }
          else { var grp = BRV.bible.getRange(sel.bookId, sel.chapter, gStart, v - 1);
            slides.push({ ref:grp.r, text:fixVersal(grp.v) }); gStart = v; }
        } else { v++; }
      }
      if (gStart <= sel.to){ var last = BRV.bible.getRange(sel.bookId, sel.chapter, gStart, sel.to);
        slides.push({ ref:fixVersal(last.r)===last.r?last.r:last.r, text:fixVersal(last.v) }); }
      return slides.length > 1 ? slides : [{ ref: cfg.full.ref, text: cfg.full.text }];
    }

    function afApplySlide(){
      var sl = (cfg.slides && cfg.slides.length) ? cfg.slides[cfg.slideIndex] : cfg.full;
      if (sl){ cfg.ref = sl.ref; cfg.text = sl.text; }
    }
    function afRenderUI(){
      var bar = document.getElementById('brv-proj-slidebar');
      var notice = document.getElementById('brv-proj-slide-notice');
      if (!bar) return;
      if (cfg.slides && cfg.slides.length > 1){
        bar.style.display = 'flex';
        var ind = document.getElementById('brv-proj-slide-ind');
        if (ind) ind.textContent = 'Diapositiva ' + (cfg.slideIndex + 1) + ' / ' + cfg.slides.length + ' · ' + cfg.slides[cfg.slideIndex].ref;
        if (notice) notice.style.display = 'block';
      } else { bar.style.display = 'none'; if (notice) notice.style.display = 'none'; }
    }
    function afComputeAndApply(){ cfg.slides = afComputeSlides(); cfg.slideIndex = 0; afApplyUniform(); afApplySlide(); afRenderUI(); }

    function nextSlide(){ if (!cfg.slides || cfg.slideIndex >= cfg.slides.length - 1) return;
      cfg.slideIndex++; afApplySlide(); updatePreview(); updateProjectionWindow(); afRenderUI(); }
    function prevSlide(){ if (!cfg.slides || cfg.slideIndex <= 0) return;
      cfg.slideIndex--; afApplySlide(); updatePreview(); updateProjectionWindow(); afRenderUI(); }

    function toggleAutoFit(on){
      cfg.autoFit = !!on;
      BRV.storage.set('projAutoFit', on ? '1' : '0');
      var sl = document.getElementById('brv-fs-slider'), val = document.getElementById('brv-fs-val');
      if (sl) sl.disabled = !!on;
      if (val) val.textContent = on ? 'Auto' : String(cfg.fontSize);
      if (on) { afComputeAndApply(); }
      else { cfg.slides = null; if (cfg.full){ cfg.ref = cfg.full.ref; cfg.text = cfg.full.text; } afRenderUI(); }
      updatePreview(); updateProjectionWindow();
    }

    function _onProjResize(){
      if (!cfg.autoFit) return;
      var idx = cfg.slideIndex;
      cfg.slides = afComputeSlides();
      afApplyUniform();
      cfg.slideIndex = Math.min(idx, cfg.slides ? cfg.slides.length - 1 : 0);
      afApplySlide(); updatePreview(); updateProjectionWindow(); afRenderUI();
    }
    function _onWinResize(){ clearTimeout(_afResizeT); _afResizeT = setTimeout(_onProjResize, 160); }

    function afSyncUI(){
      var sl = document.getElementById('brv-fs-slider'); if (sl) sl.disabled = cfg.autoFit;
      var val = document.getElementById('brv-fs-val'); if (val && cfg.autoFit) val.textContent = 'Auto';
      var tg = document.getElementById('brv-autofit-toggle'); if (tg) tg.checked = cfg.autoFit;
    }
    /* defaults + listeners */
    cfg.autoFit = (BRV.storage.get('projAutoFit', '1') !== '0');
    cfg.fitMin = cfg.fitMin || 18;
    cfg.fitMax = null; /* dinámico — se calcula según el contenedor en afBounds() */
    if (typeof window !== 'undefined') window.addEventListener('resize', _onWinResize);

    return {
      setVerse, randomVerse, favVerse, copyVerse,
      initPicker, pickBook, pickChapter, pickVerseRange, projectPicked,
      useActiveBackground, refreshBackground, toggleBgImage,
      chooseBgMode, nextRandomBg, setShadow, setAutoRotate,
      launch, closeWindow,
      blank,
      setFontSize, setLineHeight, setBold, setItalic, setAlign,
      setTextColor, setRefColor, setDarkness, setBgColor, toggleBgImage,
      onSearchInput, searchEnter,
      _setFromHistory,
      toggleAutoFit, nextSlide, prevSlide, _onProjResize,
      init,
    };
  })();

  /* init coordinado al final */

  /* ══════════════════════════════════════════════════════════════
     MÓDULO 5 — ADMINISTRADOR DE FONDOS
  ══════════════════════════════════════════════════════════════ */
  BRV.backgrounds = (function() {

    /* ── Estado ── */
    let state = {
      images:     BRV.storage.get('backgrounds', []),
      activeBg:   BRV.storage.get('activeBg', null),
      categories: BRV.storage.get('bgCategories', ['cruz','naturaleza','cielo','adoracion','otro']),
      filterCat:  'all',
      mode:       BRV.storage.get('bgMode', 'fixed'),
      sourceCat:  BRV.storage.get('bgSourceCat', 'all'),
      rotateInt:  parseInt(BRV.storage.get('bgRotateInt', '15')),
      rotateTimer:null,
      selectedId: null,
      darkness:   55,
      blur:       0,
      brightness: 100,
      saturation: 100,
      position:   'center',
      view:       'normal',
    };

    /* ── Categoría automática por nombre de archivo ── */
    function detectCategory(name) {
      const n = name.toLowerCase();
      if (/cruz|cross|iglesia|jesus|dios|cristo/.test(n)) return 'cruz';
      if (/naturaleza|forest|bosque|flower|flor|tree|arbol|garden/.test(n)) return 'naturaleza';
      if (/cielo|sky|cloud|nube|sunset|amanecer|atardecer|heaven/.test(n)) return 'cielo';
      if (/adoracion|worship|praise|alabanza|musica|music/.test(n)) return 'adoracion';
      return 'otro';
    }

    /* ── Carga de imágenes ── */
    function onFileSelect(input) {
      const files = Array.from(input.files || []);
      if (!files.length) return;
      processFiles(files);
      input.value = '';
    }

    function onDragOver(e) {
      e.preventDefault();
      document.getElementById('brv-bg-drop-zone').classList.add('dragover');
    }
    function onDragLeave(e) {
      document.getElementById('brv-bg-drop-zone').classList.remove('dragover');
    }
    function onDrop(e) {
      e.preventDefault();
      document.getElementById('brv-bg-drop-zone').classList.remove('dragover');
      const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
      processFiles(files);
    }

    function processFiles(files, catMap) {
      if (!files.length) return;
      showProgress();
      let done = 0;
      let added = 0;
      const total = files.length;
      files.forEach(file => {
        if (file.size > 10 * 1024 * 1024) {
          BRV.ui.toast('Imagen muy grande: ' + file.name.slice(0,20), 'warn');
          done++;
          if (done === total) { finishUpload(added); }
          return;
        }
        const reader = new FileReader();
        reader.onload = e => {
          const id  = 'bg_' + Date.now() + '_' + Math.random().toString(36).slice(2,7);
          /* La categoría puede venir de la carpeta (catMap) o detectarse del nombre */
          let cat;
          if (catMap && catMap[file.name + '|' + file.size]) {
            cat = catMap[file.name + '|' + file.size];
          } else {
            cat = detectCategory(file.name);
          }
          state.images.push({
            id, src: e.target.result,
            name: file.name.replace(/\.[^.]+$/, ''),
            cat,
            size: file.size,
            added: Date.now(),
          });
          added++;
          done++;
          updateProgress(done, total);
          if (done === total) { finishUpload(added); }
        };
        reader.onerror = () => { done++; if (done === total) finishUpload(added); };
        reader.readAsDataURL(file);
      });
    }

    function finishUpload(added) {
      save();
      hideProgress();
      buildCategoryList();
      render();
      BRV.ui.toast('✅ ' + added + ' imagen' + (added !== 1 ? 'es' : '') + ' añadida' + (added !== 1 ? 's' : ''), 'success');
    }

    function updateProgress(done, total) {
      const bar = document.getElementById('brv-bg-progress-bar');
      if (bar) bar.style.width = Math.round(done / total * 100) + '%';
    }

    /* ── Subir CARPETA organizada: subcarpetas → categorías ── */
    function onFolderSelect(input) {
      const files = Array.from(input.files || []);
      const images = files.filter(f => /^image\//.test(f.type) || /\.(jpe?g|png|webp|gif|bmp)$/i.test(f.name));
      if (!images.length) { BRV.ui.toast('No se encontraron imágenes en la carpeta', 'warn'); input.value=''; return; }
      /* Extrae la categoría de la ruta: la subcarpeta inmediata */
      const catMap = {};
      const newCats = new Set();
      images.forEach(f => {
        const path = f.webkitRelativePath || f.name;
        const parts = path.split('/');
        /* parts[0] = carpeta raíz; parts[1] = subcarpeta (categoría) si existe */
        let cat;
        if (parts.length >= 3) {
          cat = slugCat(parts[parts.length - 2]);
        } else if (parts.length === 2) {
          cat = slugCat(parts[0]);
        } else {
          cat = detectCategory(f.name);
        }
        catMap[f.name + '|' + f.size] = cat;
        newCats.add(cat);
      });
      /* Registra las categorías nuevas */
      newCats.forEach(c => { if (c && !state.categories.includes(c)) state.categories.push(c); });
      save();
      processFiles(images, catMap);
      input.value = '';
    }

    /* Convierte el nombre de carpeta en un id de categoría legible */
    function slugCat(folderName) {
      return String(folderName || 'otro').trim().toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
        .replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'') || 'otro';
    }

    function showProgress() {
      const p = document.getElementById('brv-bg-progress');
      const b = document.getElementById('brv-bg-progress-bar');
      if (p) { p.style.display = 'block'; b.style.width = '60%'; }
    }
    function hideProgress() {
      const p = document.getElementById('brv-bg-progress');
      const b = document.getElementById('brv-bg-progress-bar');
      if (p) { b.style.width = '100%'; setTimeout(() => { p.style.display = 'none'; b.style.width = '0%'; }, 400); }
    }

    /* ── Persistencia ── */
    function save() {
      BRV.storage.set('backgrounds', state.images);
      BRV.storage.set('activeBg', state.activeBg);
      BRV.storage.set('bgMode', state.mode);
      BRV.storage.set('bgRotateInt', String(state.rotateInt));
      BRV.storage.set('bgCategories', state.categories);
      BRV.storage.set('bgSourceCat', state.sourceCat);
    }

    /* Etiquetas e iconos para categorías conocidas */
    const CAT_META = {
      cruz:        { icon:'✝', label:'Cruz' },
      naturaleza:  { icon:'🌿', label:'Naturaleza' },
      cielo:       { icon:'☁', label:'Cielo' },
      adoracion:   { icon:'🎵', label:'Adoración' },
      otro:        { icon:'🖼', label:'Otro' },
    };
    function catLabel(cat) {
      if (CAT_META[cat]) return CAT_META[cat].label;
      /* Capitaliza categorías de carpetas */
      return cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g,' ');
    }
    function catIcon(cat) {
      return CAT_META[cat] ? CAT_META[cat].icon : '📁';
    }

    /* Reconstruye la lista de categorías (incluye las de carpetas) */
    function buildCategoryList() {
      const el = document.getElementById('brv-bg-cats');
      if (!el) return;
      /* Asegura que toda categoría usada exista en la lista */
      state.images.forEach(img => {
        if (img.cat && !state.categories.includes(img.cat)) state.categories.push(img.cat);
      });
      const counts = { all: state.images.length };
      state.categories.forEach(c => { counts[c] = state.images.filter(i => i.cat === c).length; });
      let h = '<button class="brv-bg-cat-btn' + (state.filterCat==='all'?' active':'') + '" onclick="BRV.backgrounds.filterCat(\'all\',this)" data-cat="all">' +
              'Todos <span class="brv-bg-cat-count">' + counts.all + '</span></button>';
      /* Muestra solo categorías con imágenes o las predeterminadas */
      state.categories.forEach(c => {
        const n = counts[c] || 0;
        if (n === 0 && !['cruz','naturaleza','cielo','adoracion'].includes(c)) return;
        h += '<button class="brv-bg-cat-btn' + (state.filterCat===c?' active':'') + '" onclick="BRV.backgrounds.filterCat(\'' + c + '\',this)" data-cat="' + c + '">' +
             catIcon(c) + ' ' + catLabel(c) + ' <span class="brv-bg-cat-count">' + n + '</span></button>';
      });
      el.innerHTML = h;
    }

    /* ── Render de galería ── */
    function render() {
      const grid = document.getElementById('brv-bg-grid');
      if (!grid) return;

      const filtered = state.filterCat === 'all'
        ? state.images
        : state.images.filter(img => img.cat === state.filterCat);

      grid.className = 'brv-bg-grid' + (state.view === 'compact' ? ' compact' : '');

      /* Actualiza conteos de categorías */
      const cats = ['all','cruz','naturaleza','cielo','adoracion','otro'];
      cats.forEach(cat => {
        const el = document.getElementById('brv-cat-count-' + cat);
        if (el) el.textContent = cat === 'all' ? state.images.length : state.images.filter(i => i.cat === cat).length;
      });

      /* Toolbar */
      const countEl = document.getElementById('brv-bg-toolbar-count');
      if (countEl) countEl.textContent = filtered.length + ' imagen' + (filtered.length !== 1 ? 'es' : '');

      if (!filtered.length) {
        grid.innerHTML = '<div class="brv-bg-empty">' +
          '<div class="brv-bg-empty-icon">🖼</div>' +
          '<h3>Sin imágenes' + (state.filterCat !== 'all' ? ' en esta categoría' : '') + '</h3>' +
          '<p>Sube imágenes usando la zona de arrastre o el botón de subida. Soporta JPG, PNG y WebP.</p>' +
          '</div>';
        return;
      }

      grid.innerHTML = filtered.map(img => {
        const isActive   = img.id === state.activeBg;
        const isSelected = img.id === state.selectedId;
        return '<div class="brv-bg-card' + (isActive ? ' active' : '') + '"' +
          ' data-id="' + img.id + '"' +
          ' onclick="BRV.backgrounds.selectImage(\'' + img.id + '\')">' +
          '<img src="' + img.src + '" alt="' + escH(img.name) + '" loading="lazy">' +
          (isActive ? '<div class="brv-bg-active-badge">Activo</div>' : '') +
          '<div class="brv-bg-card-overlay">' +
            '<div class="brv-bg-card-name">' + escH(img.name) + '</div>' +
            '<div class="brv-bg-card-actions">' +
              '<button class="brv-bg-card-btn use" onclick="event.stopPropagation();BRV.backgrounds.activate(\'' + img.id + '\')">✓ Usar</button>' +
              '<button class="brv-bg-card-btn del" onclick="event.stopPropagation();BRV.backgrounds.deleteImage(\'' + img.id + '\')">✕</button>' +
            '</div>' +
          '</div>' +
        '</div>';
      }).join('');
    }

    function escH(s) {
      return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
    }

    /* ── Selección de imagen (para previsualización) ── */
    function selectImage(id) {
      state.selectedId = id;
      const img = state.images.find(i => i.id === id);
      if (!img) return;

      /* Actualiza previsualización */
      const prevImg = document.getElementById('brv-bg-prev-img');
      if (prevImg) {
        prevImg.style.backgroundImage  = 'url(' + img.src + ')';
        prevImg.style.backgroundPosition = state.position;
        prevImg.style.filter = buildFilter();
      }

      /* Muestra info de categoría */
      const infoEl  = document.getElementById('brv-bg-selected-info');
      const catSel  = document.getElementById('brv-bg-cat-select');
      if (infoEl) infoEl.style.display = 'block';
      if (catSel) catSel.value = img.cat;

      /* Activa botón aplicar */
      const applyBtn = document.getElementById('brv-bg-apply-btn');
      if (applyBtn) applyBtn.disabled = false;

      /* Resalta la tarjeta seleccionada visualmente */
      document.querySelectorAll('.brv-bg-card').forEach(c => {
        c.style.outline = c.dataset.id === id ? '2px solid rgba(201,168,76,.6)' : '';
      });
    }

    /* ── Activar imagen como fondo de proyección ── */
    function activate(id) {
      state.activeBg = (state.activeBg === id) ? null : id;
      save();
      render();
      /* Sincroniza con el módulo de proyección (fuente única del fondo) */
      if (BRV.projection && BRV.projection.useActiveBackground) {
        BRV.projection.useActiveBackground(!!state.activeBg);
      }
      BRV.ui.toast(state.activeBg ? '✅ Fondo activado para proyección' : 'Fondo desactivado', 'success');
    }

    /* ── Aplicar imagen seleccionada a proyección ── */
    function applyToProjection() {
      if (!state.selectedId) return;
      activate(state.selectedId);
      BRV.router.go('projection');
    }

    /* ── Eliminar imagen ── */
    function deleteImage(id) {
      state.images = state.images.filter(i => i.id !== id);
      if (state.activeBg === id)   state.activeBg  = null;
      if (state.selectedId === id) state.selectedId = null;
      save();
      render();
      /* Limpia previsualización si era la seleccionada */
      const prevImg = document.getElementById('brv-bg-prev-img');
      if (prevImg) prevImg.style.backgroundImage = '';
      const applyBtn = document.getElementById('brv-bg-apply-btn');
      if (applyBtn) applyBtn.disabled = true;
      BRV.ui.toast('Imagen eliminada');
    }

    /* ── Limpiar todo ── */
    function clearAll() {
      if (!state.images.length) return;
      if (!confirm('¿Eliminar todas las imágenes? Esta acción no se puede deshacer.')) return;
      state.images     = [];
      state.activeBg   = null;
      state.selectedId = null;
      save();
      render();
      BRV.ui.toast('Galería vaciada');
    }

    /* ── Filtrado por categoría ── */
    function filterCat(cat, btn) {
      state.filterCat = cat;
      document.querySelectorAll('.brv-bg-cat-btn').forEach(b => b.classList.toggle('active', b === btn));
      const titleEl = document.getElementById('brv-bg-toolbar-title');
      if (titleEl) titleEl.textContent = cat === 'all' ? 'Mis fondos' : ('Fondos — ' + catLabel(cat));
      render();
    }

    /* ── Modo de reproducción ── */
    function setMode(mode, btn) {
      state.mode = mode;
      document.querySelectorAll('.brv-bg-mode-btn').forEach(b => b.classList.toggle('active', b === btn));
      const ri = document.getElementById('brv-rotate-interval');
      if (ri) ri.style.display = mode === 'rotate' ? 'block' : 'none';
      /* Mostrar selector de categoría fuente para aleatorio/rotación */
      const src = document.getElementById('brv-bg-mode-source');
      if (src) src.style.display = (mode === 'random' || mode === 'rotate') ? 'block' : 'none';
      buildSourceSelect();
      save();
      const pool = getPool();
      /* Modo aleatorio: activa una imagen aleatoria del pool */
      if (mode === 'random' && pool.length) {
        const rnd = pool[Math.floor(Math.random() * pool.length)];
        activate(rnd.id);
      }
      /* Modo rotación */
      clearInterval(state.rotateTimer);
      if (mode === 'rotate' && pool.length > 1) {
        startRotation();
      }
    }

    /* Pool de imágenes según la categoría fuente seleccionada */
    function getPool() {
      if (state.sourceCat === 'all') return state.images;
      return state.images.filter(i => i.cat === state.sourceCat);
    }

    /* Cambia la categoría fuente para aleatorio/rotación */
    function setSourceCat(cat) {
      state.sourceCat = cat;
      save();
      const pool = getPool();
      if (state.mode === 'random' && pool.length) {
        activate(pool[Math.floor(Math.random() * pool.length)].id);
      } else if (state.mode === 'rotate' && pool.length) {
        clearInterval(state.rotateTimer);
        if (pool.length > 0) { activate(pool[0].id); startRotation(); }
      }
    }

    /* Llena el selector de categoría fuente */
    function buildSourceSelect() {
      const sel = document.getElementById('brv-bg-source-cat');
      if (!sel) return;
      let h = '<option value="all">Todas las categorías</option>';
      state.categories.forEach(c => {
        const n = state.images.filter(i => i.cat === c).length;
        if (n === 0) return;
        h += '<option value="' + c + '"' + (state.sourceCat===c?' selected':'') + '>' + catLabel(c) + ' (' + n + ')</option>';
      });
      sel.innerHTML = h;
      sel.value = state.sourceCat;
    }

    function setRotateInterval(val) {
      state.rotateInt = parseInt(val);
      document.getElementById('brv-rotate-val').textContent = val + 's';
      save();
      clearInterval(state.rotateTimer);
      if (state.mode === 'rotate') startRotation();
    }

    function startRotation() {
      clearInterval(state.rotateTimer);
      state.rotateTimer = setInterval(() => {
        const pool = getPool();
        if (!pool.length) return;
        const currentIdx = pool.findIndex(i => i.id === state.activeBg);
        const nextIdx    = (currentIdx + 1) % pool.length;
        activate(pool[nextIdx].id);
      }, state.rotateInt * 1000);
    }

    /* ── Vista de galería ── */
    function setView(v, btn) {
      state.view = v;
      document.querySelectorAll('.brv-bg-view-btn').forEach(b => b.classList.toggle('active', b === btn));
      render();
    }

    /* ── Ajustes de imagen ── */
    function buildFilter() {
      return 'brightness(' + state.brightness + '%) saturate(' + state.saturation + '%) blur(' + state.blur + 'px)';
    }

    function applyPreviewFilter() {
      const el = document.getElementById('brv-bg-prev-img');
      if (el) el.style.filter = buildFilter();
    }

    function setDarkness(v) {
      state.darkness = parseInt(v);
      document.getElementById('brv-bg-dark-val').textContent = v + '%';
      const ov = document.getElementById('brv-bg-prev-overlay');
      if (ov) ov.style.background = 'rgba(0,0,0,' + (v / 100) + ')';
    }

    function setBlur(v) {
      state.blur = parseInt(v);
      document.getElementById('brv-bg-blur-val').textContent = v + 'px';
      applyPreviewFilter();
    }

    function setBrightness(v) {
      state.brightness = parseInt(v);
      document.getElementById('brv-bg-bright-val').textContent = v + '%';
      applyPreviewFilter();
    }

    function setSaturation(v) {
      state.saturation = parseInt(v);
      document.getElementById('brv-bg-sat-val').textContent = v + '%';
      applyPreviewFilter();
    }

    function setPosition(pos, btn) {
      state.position = pos;
      document.querySelectorAll('.brv-bg-pos-btn').forEach(b => b.classList.toggle('active', b === btn));
      const el = document.getElementById('brv-bg-prev-img');
      if (el) el.style.backgroundPosition = pos;
    }

    /* ── Categoría de imagen seleccionada ── */
    function setCategoryForSelected(cat) {
      const img = state.images.find(i => i.id === state.selectedId);
      if (!img) return;
      img.cat = cat;
      save();
      render();
      BRV.ui.toast('Categoría actualizada');
    }

    /* ── Hook de router ── */
    BRV.router.hooks['backgrounds'] = function() {
      state.images   = BRV.storage.get('backgrounds', []);
      state.activeBg = BRV.storage.get('activeBg', null);
      render();
    };

    /* ── Init ── */
    function init() {
      buildCategoryList();
      render();
      /* Restaurar modo de rotación si estaba activo */
      if (state.mode === 'rotate' && state.images.length > 1) startRotation();
    }

    return {
      onFileSelect, onFolderSelect, onDragOver, onDragLeave, onDrop,
      selectImage, activate, deleteImage, clearAll, buildCategoryList,
      filterCat, setMode, setSourceCat, setRotateInterval, setView,
      setDarkness, setBlur, setBrightness, setSaturation, setPosition,
      setCategoryForSelected, applyToProjection,
      getActiveBg: () => state.activeBg ? state.images.find(i => i.id === state.activeBg) : null,
      getAllImages: () => state.images,
      init,
    };
  })();

  /* init coordinado al final */

  /* ══════════════════════════════════════════════════════════════
     MÓDULO 6 — RESÚMENES BÍBLICOS
  ══════════════════════════════════════════════════════════════ */
  BRV.summaries = (function() {

    /* ── Datos básicos de los 66 libros (45 KB vs 414 KB original) ── */
    const BOOKS_DATA = [
  {
    "id": "gn",
    "name": "Génesis",
    "abbr": "Gn",
    "t": "AT",
    "chapters": 50,
    "author": "Moisés",
    "date": "~1450-1400 a.C.",
    "genre": "Ley / Historia",
    "summary": "Génesis (\"Comienzos\") cubre más historia que cualquier otro libro bíblico: desde la creación del universo hasta la muerte de José en Egipto, un período de más de 2.000 años. Se divide en dos grandes secciones: los orígenes primordiales (cap. 1-11) que incluyen la creación, la caída, el diluvio y Babel, y la historia patriarcal (cap. 12-50) que sigue a Abraham, Isaac, Jacob y José. Cada sección revela a un Dios que crea, juzga el pecado, pero también redime y cumple sus promesas.",
    "icon": "👤",
    "keyVerse": ""
  },
  {
    "id": "ex",
    "name": "Éxodo",
    "abbr": "Ex",
    "t": "AT",
    "chapters": 40,
    "author": "Moisés",
    "date": "~1446-1406 a.C.",
    "genre": "Ley / Historia",
    "summary": "Éxodo (\"salida\") narra la liberación de Israel de la esclavitud egipcia: las 10 plagas, el Éxodo, el cruce del Mar Rojo y la revelación de la Ley en el Sinaí. La segunda mitad describe la construcción del Tabernáculo, el lugar donde Dios habitaría en medio de su pueblo. El libro revela a Dios como Redentor poderoso y Santo que desea habitar con su pueblo.",
    "icon": "⚡",
    "keyVerse": ""
  },
  {
    "id": "sal",
    "name": "Salmos",
    "abbr": "Sal",
    "t": "AT",
    "chapters": 150,
    "author": "David y otros (Asaf, Hijos de Coré, Moisés, Salomón)",
    "date": "~1440-430 a.C.",
    "genre": "Poesía / Sabiduría",
    "summary": "El libro de Salmos es la colección poética más grande de la Biblia: 150 poemas organizados en 5 libros que hacen eco del Pentateuco. Incluye himnos de alabanza, salmos de lamento, salmos reales, salmos de peregrinación y salmos de sabiduría. Desde el grito angustiado del Salmo 22 hasta la alabanza universal del 150, los Salmos dan voz a todo lo que el corazón humano puede sentir ante Dios.",
    "icon": "🎵",
    "keyVerse": ""
  },
  {
    "id": "is",
    "name": "Isaías",
    "abbr": "Is",
    "t": "AT",
    "chapters": 66,
    "author": "Isaías (hijo de Amoz)",
    "date": "~740-700 a.C.",
    "genre": "Profecía",
    "summary": "Isaías es a menudo llamado \"el quinto evangelio\" por sus detalladas profecías mesiánicas. El libro se divide en dos grandes secciones: juicio y esperanza (cap. 1-39) y consolación y restauración (cap. 40-66). El famoso \"Siervo sufriente\" de los capítulos 52-53 describe la pasión de Cristo con una precisión que asombra a historiadores y teólogos. El libro termina con la visión del nuevo cielo y la nueva tierra.",
    "icon": "📜",
    "keyVerse": ""
  },
  {
    "id": "jn",
    "name": "Juan",
    "abbr": "Jn",
    "t": "NT",
    "chapters": 21,
    "author": "Juan el apóstol (hijo de Zebedeo)",
    "date": "~85-95 d.C.",
    "genre": "Evangelio",
    "summary": "El Evangelio de Juan es único entre los cuatro evangelios. Mientras Mateo, Marcos y Lucas son \"sinópticos\" (ven desde el mismo ángulo), Juan adopta una perspectiva profunda y teológica. Organiza su narración alrededor de 7 señales milagrosas y 7 declaraciones \"YO SOY\" de Jesús, culminando en la revelación suprema: \"Yo soy la resurrección y la vida\" (11:25). Desde el prólogo eterno (\"En el principio era el Verbo\") hasta la pesca milagrosa del epílogo, Juan presenta al Jesús divino-humano que vino a darnos vida eterna.",
    "icon": "✝",
    "keyVerse": ""
  },
  {
    "id": "ro",
    "name": "Romanos",
    "abbr": "Ro",
    "t": "NT",
    "chapters": 16,
    "author": "Pablo",
    "date": "~56-58 d.C.",
    "genre": "Epístola",
    "summary": "Romanos es la exposición más sistemática del evangelio en toda la Biblia. Pablo comienza estableciendo la necesidad universal de salvación (todos pecaron, 3:23), luego desarrolla la justificación por fe (cap. 3-5), la santificación por el Espíritu (cap. 6-8), el plan de Dios para Israel (cap. 9-11) y las implicaciones prácticas de la gracia (cap. 12-16). El capítulo 8 es considerado uno de los textos más sublimes de la literatura cristiana.",
    "icon": "📜",
    "keyVerse": ""
  },
  {
    "id": "mt",
    "name": "Mateo",
    "abbr": "Mt",
    "t": "NT",
    "chapters": 28,
    "author": "Mateo (Leví), el recaudador de impuestos",
    "date": "~50-70 d.C.",
    "genre": "Evangelio",
    "summary": "Mateo organiza su evangelio en cinco grandes discursos (paralelos a los 5 libros de Moisés): el Sermón del Monte (cap. 5-7), la misión de los doce (cap. 10), las parábolas del reino (cap. 13), la vida en comunidad (cap. 18) y el discurso escatológico (cap. 24-25). El libro comienza con la genealogía real de Jesús y termina con la Gran Comisión, mostrando que el Rey manda a sus embajadores al mundo.",
    "icon": "✝",
    "keyVerse": ""
  },
  {
    "id": "ap",
    "name": "Apocalipsis",
    "abbr": "Ap",
    "t": "NT",
    "chapters": 22,
    "author": "Juan el apóstol",
    "date": "~95-96 d.C.",
    "genre": "Profecía / Apocalíptica",
    "summary": "Apocalipsis (\"Revelación\") es el único libro profético del NT. Revela a Jesucristo como el Señor soberano de la historia mediante visiones simbólicas: los siete sellos, las siete trompetas y las siete copas. El libro no oculta la realidad del sufrimiento cristiano, pero lo enmarca dentro de la victoria final de Dios. El Cordero que fue inmolado es también el León de Judá que gobierna la historia. El libro termina con la Nueva Jerusalén: \"He aquí, el tabernáculo de Dios con los hombres\" (21:3).",
    "icon": "✝",
    "keyVerse": ""
  },
  {
    "id": "pr",
    "name": "Proverbios",
    "abbr": "Pr",
    "t": "AT",
    "chapters": 31,
    "author": "Salomón principalmente; también Agur y Lemuel",
    "date": "~971-700 a.C.",
    "genre": "Sabiduría",
    "summary": "Proverbios es el manual de sabiduría práctica de la Biblia. Su premisa fundamental: \"El temor de Jehová es el principio de la sabiduría\" (9:10). El libro cubre prácticamente todas las áreas de la vida: el trabajo, el dinero, las palabras, las relaciones, la familia, la pereza, el orgullo y la humildad. No es un libro de promesas incondicionales sino de principios generales que reflejan el orden moral de la creación. La \"mujer virtuosa\" del capítulo 31 es el retrato de alguien que vive con sabiduría en todos los ámbitos.",
    "icon": "👑",
    "keyVerse": ""
  },
  {
    "id": "ef",
    "name": "Efesios",
    "abbr": "Ef",
    "t": "NT",
    "chapters": 6,
    "author": "Pablo",
    "date": "~60-62 d.C.",
    "genre": "Epístola",
    "summary": "Efesios es el gran tratado de Pablo sobre la iglesia. Los primeros tres capítulos son teología pura: la elección en Cristo, la unión en él, el misterio de la iglesia como cuerpo de Cristo. Los últimos tres son práctica: la nueva vida en Cristo, la unidad, las relaciones familiares y la armadura espiritual. El punto de bisagra es 4:1: \"Os ruego que andéis como es digno de la vocación con que fuisteis llamados.\" La doctrina siempre debe traducirse en práctica.",
    "icon": "📜",
    "keyVerse": ""
  },
  {
    "id": "he",
    "name": "Hebreos",
    "abbr": "He",
    "t": "NT",
    "chapters": 13,
    "author": "Desconocido (propuestos: Pablo, Apolos, Bernabé, Priscila)",
    "date": "~64-68 d.C.",
    "genre": "Epístola / Sermón",
    "summary": "Hebreos es el gran argumento de la superioridad de Cristo sobre todo lo que el judaísmo ofrecía. Cristo es superior a los ángeles (cap. 1-2), a Moisés (cap. 3-4), al sacerdocio levítico (cap. 5-7), al pacto antiguo (cap. 8-10) y a todos los sacrificios del AT. La fe como certeza de lo esperado (11:1) introduce el \"salón de la fama de la fe\" con los héroes del AT. El libro termina con exhortaciones prácticas y la doxología final.",
    "icon": "✝",
    "keyVerse": ""
  },
  {
    "id": "lv",
    "name": "Levítico",
    "abbr": "Lv",
    "t": "AT",
    "chapters": 27,
    "author": "Moisés",
    "date": "~1445 a.C.",
    "genre": "Ley",
    "summary": "Levítico es el manual de santidad de Israel. Si Éxodo termina con la construcción del Tabernáculo, Levítico explica cómo el pueblo podía vivir en la presencia del Dios santo: los sacrificios (cap. 1-7), el sacerdocio (cap. 8-10), las leyes de pureza (cap. 11-15), el Día de la Expiación (cap. 16) y el Código de Santidad (cap. 17-27). La palabra \"santo\" aparece más de 80 veces. Cada sacrificio prefigura la obra perfecta de Cristo.",
    "icon": "⚡",
    "keyVerse": ""
  },
  {
    "id": "nm",
    "name": "Números",
    "abbr": "Nm",
    "t": "AT",
    "chapters": 36,
    "author": "Moisés",
    "date": "~1445-1406 a.C.",
    "genre": "Ley / Historia",
    "summary": "Números narra el viaje de Israel por el desierto y cómo una generación entera perdió la Tierra Prometida por su incredulidad. Tras ser contados (cap. 1-4), el pueblo marcha del Sinaí, pero la rebelión en Cades-barnea (cap. 13-14) —cuando 10 espías sembraron temor— condenó a esa generación a vagar 40 años. El libro muestra la fidelidad de Dios a pesar de la murmuración constante del pueblo, y termina con una nueva generación lista para entrar a Canaán.",
    "icon": "⚡",
    "keyVerse": ""
  },
  {
    "id": "dt",
    "name": "Deuteronomio",
    "abbr": "Dt",
    "t": "AT",
    "chapters": 34,
    "author": "Moisés",
    "date": "~1406 a.C.",
    "genre": "Ley",
    "summary": "Deuteronomio es el testamento espiritual de Moisés. En una serie de sermones, repasa la historia de Israel, vuelve a exponer la Ley y llama al pueblo a amar a Dios de todo corazón. El gran tema es el pacto: la fidelidad de Dios exige una respuesta de amor y obediencia. Contiene el Shemá (6:4-5), la confesión de fe central del judaísmo. El libro termina con la muerte de Moisés en el monte Nebo, viendo la tierra que no podría pisar.",
    "icon": "⚡",
    "keyVerse": ""
  },
  {
    "id": "jos",
    "name": "Josué",
    "abbr": "Jos",
    "t": "AT",
    "chapters": 24,
    "author": "Josué (y editores posteriores)",
    "date": "~1405-1380 a.C.",
    "genre": "Historia",
    "summary": "Josué muestra a Dios cumpliendo sus promesas. Tras cruzar milagrosamente el Jordán, Israel conquista Canaán: la caída de Jericó, la campaña del sur y del norte, y finalmente el reparto de la tierra entre las tribus. El libro destaca que las victorias vinieron por la fidelidad de Dios y la obediencia del pueblo, no por su fuerza. Termina con el famoso desafío de Josué: \"yo y mi casa serviremos a Jehová\" (24:15).",
    "icon": "⚔",
    "keyVerse": ""
  },
  {
    "id": "jue",
    "name": "Jueces",
    "abbr": "Jue",
    "t": "AT",
    "chapters": 21,
    "author": "Desconocido (tradición: Samuel)",
    "date": "~1043 a.C.",
    "genre": "Historia",
    "summary": "Jueces narra un ciclo repetido y trágico: el pueblo peca, Dios permite la opresión de enemigos, el pueblo clama, Dios levanta un libertador (juez), hay paz, y luego el ciclo se repite peor. Aparecen figuras como Débora, Gedeón y Sansón. El libro revela la profundidad de la decadencia espiritual cuando \"no había rey en Israel\" y muestra la paciencia de Dios al levantar libertadores una y otra vez.",
    "icon": "⭐",
    "keyVerse": ""
  },
  {
    "id": "rt",
    "name": "Rut",
    "abbr": "Rt",
    "t": "AT",
    "chapters": 4,
    "author": "Desconocido (tradición: Samuel)",
    "date": "~1030 a.C.",
    "genre": "Historia / Narrativa",
    "summary": "Rut es una hermosa historia de lealtad, providencia y redención. Tras enviudar, Rut la moabita se niega a abandonar a su suegra Noemí y declara: \"tu pueblo será mi pueblo, y tu Dios mi Dios\". En Belén, Rut conoce a Booz, un pariente redentor que se casa con ella. De esta unión nacería Obed, abuelo del rey David, colocando a Rut en la línea genealógica del Mesías. El libro muestra cómo Dios obra en los detalles cotidianos.",
    "icon": "🌾",
    "keyVerse": ""
  },
  {
    "id": "1sm",
    "name": "1 Samuel",
    "abbr": "1 S",
    "t": "AT",
    "chapters": 31,
    "author": "Samuel, Natán y Gad",
    "date": "~930 a.C.",
    "genre": "Historia",
    "summary": "1 Samuel cuenta cómo Israel pasó de ser gobernado por jueces a tener reyes. Samuel, el último juez y primer gran profeta, unge a Saúl como primer rey. Pero Saúl fracasa por su desobediencia, y Dios escoge a David, un pastor, como rey según su corazón. El libro contrasta el liderazgo basado en la apariencia (Saúl) con el liderazgo basado en el corazón (David), e incluye el célebre relato de David y Goliat.",
    "icon": "📜",
    "keyVerse": ""
  },
  {
    "id": "2sm",
    "name": "2 Samuel",
    "abbr": "2 S",
    "t": "AT",
    "chapters": 24,
    "author": "Natán y Gad",
    "date": "~930 a.C.",
    "genre": "Historia",
    "summary": "2 Samuel es la historia del reinado de David. Primero sus victorias: une al reino, conquista Jerusalén y recibe el gran pacto davídico, la promesa de un trono eterno (cap. 7). Luego su caída: el pecado con Betsabé y el asesinato de Urías, que trae graves consecuencias a su familia. El libro muestra a un hombre conforme al corazón de Dios que, aun pecando gravemente, se arrepiente genuinamente, mostrando la diferencia entre caer y permanecer caído.",
    "icon": "👑",
    "keyVerse": ""
  },
  {
    "id": "1re",
    "name": "1 Reyes",
    "abbr": "1 R",
    "t": "AT",
    "chapters": 22,
    "author": "Desconocido (tradición: Jeremías)",
    "date": "~560-540 a.C.",
    "genre": "Historia",
    "summary": "1 Reyes comienza con la gloria: Salomón pide sabiduría, construye el Templo y lleva a Israel a su época dorada. Pero su corazón se desvía hacia la idolatría, y tras su muerte el reino se divide en dos: Israel (norte) y Judá (sur). El resto del libro narra la decadencia espiritual de ambos reinos, culminando en el dramático enfrentamiento del profeta Elías contra los profetas de Baal en el monte Carmelo.",
    "icon": "👑",
    "keyVerse": ""
  },
  {
    "id": "2re",
    "name": "2 Reyes",
    "abbr": "2 R",
    "t": "AT",
    "chapters": 25,
    "author": "Desconocido (tradición: Jeremías)",
    "date": "~560-540 a.C.",
    "genre": "Historia",
    "summary": "2 Reyes narra el declive final de Israel y Judá. Comienza con el ministerio de Eliseo, sucesor de Elías, lleno de milagros. Pero a pesar de las advertencias de los profetas, ambos reinos persisten en la idolatría. Israel cae ante Asiria en 722 a.C. y Judá ante Babilonia en 586 a.C., con la destrucción de Jerusalén y el Templo. El libro es una lección sobria sobre las consecuencias de ignorar la Palabra de Dios.",
    "icon": "📜",
    "keyVerse": ""
  },
  {
    "id": "1cr",
    "name": "1 Crónicas",
    "abbr": "1 Cr",
    "t": "AT",
    "chapters": 29,
    "author": "Tradición: Esdras",
    "date": "~450-400 a.C.",
    "genre": "Historia",
    "summary": "1 Crónicas comienza con extensas genealogías (cap. 1-9) que conectan al Israel post-exílico con sus raíces, y luego se centra en el reinado de David (cap. 10-29), especialmente en sus preparativos para el Templo y la organización del culto. A diferencia de Samuel, Crónicas omite los pecados de David y resalta su corazón para la adoración, ofreciendo una perspectiva esperanzadora y centrada en Dios.",
    "icon": "👑",
    "keyVerse": ""
  },
  {
    "id": "2cr",
    "name": "2 Crónicas",
    "abbr": "2 Cr",
    "t": "AT",
    "chapters": 36,
    "author": "Tradición: Esdras",
    "date": "~450-400 a.C.",
    "genre": "Historia",
    "summary": "2 Crónicas narra la construcción del Templo por Salomón y luego la historia del reino de Judá hasta el exilio. A diferencia de Reyes, se enfoca solo en Judá y destaca los grandes avivamientos bajo reyes fieles como Asa, Josafat, Ezequías y Josías. El libro muestra un patrón claro: cuando los reyes y el pueblo buscaban a Dios, había bendición; cuando lo abandonaban, venía el juicio. Termina con el decreto de Ciro permitiendo el regreso.",
    "icon": "👑",
    "keyVerse": ""
  },
  {
    "id": "esd",
    "name": "Esdras",
    "abbr": "Esd",
    "t": "AT",
    "chapters": 10,
    "author": "Esdras",
    "date": "~440 a.C.",
    "genre": "Historia",
    "summary": "Esdras cuenta dos regresos del exilio: el primero bajo Zorobabel, que reconstruye el Templo a pesar de la oposición, y el segundo bajo Esdras el escriba, que restaura la pureza espiritual del pueblo. El libro muestra la fidelidad de Dios al cumplir su promesa de restaurar a Israel, y el papel central de la Palabra de Dios en la renovación. Esdras es modelo de alguien que preparó su corazón para estudiar, cumplir y enseñar la Ley.",
    "icon": "📜",
    "keyVerse": ""
  },
  {
    "id": "ne",
    "name": "Nehemías",
    "abbr": "Neh",
    "t": "AT",
    "chapters": 13,
    "author": "Nehemías",
    "date": "~430 a.C.",
    "genre": "Historia",
    "summary": "Nehemías es un modelo de liderazgo piadoso. Al enterarse del estado ruinoso de Jerusalén, ora, planea y obtiene permiso del rey para reconstruir los muros. A pesar de la oposición de enemigos como Sanbalat, el pueblo completa la obra en solo 52 días \"porque el pueblo tuvo ánimo para trabajar\". Luego, junto con Esdras, lidera un gran avivamiento espiritual basado en la lectura pública de la Ley. El libro combina acción práctica y devoción profunda.",
    "icon": "⭐",
    "keyVerse": ""
  },
  {
    "id": "est",
    "name": "Ester",
    "abbr": "Est",
    "t": "AT",
    "chapters": 10,
    "author": "Desconocido (tradición: Mardoqueo)",
    "date": "~460 a.C.",
    "genre": "Historia / Narrativa",
    "summary": "Ester es la historia de la providencia oculta de Dios. Una joven judía llamada Ester se convierte en reina de Persia. Cuando el malvado Amán planea exterminar a los judíos, su primo Mardoqueo la desafía: \"¿quién sabe si para esta hora has llegado al reino?\". Ester arriesga su vida para interceder ante el rey y salva a su pueblo. Aunque Dios nunca es nombrado, su mano se ve en cada \"coincidencia\". El libro explica el origen de la fiesta de Purim.",
    "icon": "👑",
    "keyVerse": ""
  },
  {
    "id": "job",
    "name": "Job",
    "abbr": "Job",
    "t": "AT",
    "chapters": 42,
    "author": "Desconocido",
    "date": "Muy antiguo (era patriarcal)",
    "genre": "Sabiduría / Poesía",
    "summary": "Job era un hombre justo y próspero que, en poco tiempo, lo pierde todo: bienes, hijos y salud. Sus tres amigos insisten en que su sufrimiento debe ser castigo por algún pecado, pero Job sabe que es inocente. A través de un diálogo profundo, Job lucha con Dios sin maldecirlo. Finalmente, Dios responde no explicando el sufrimiento, sino revelando su grandeza y sabiduría infinitas. Job se humilla, y Dios lo restaura al doble. El libro no resuelve el misterio del sufrimiento, pero revela a un Dios digno de confianza en medio de él.",
    "icon": "🙏",
    "keyVerse": ""
  },
  {
    "id": "ec",
    "name": "Eclesiastés",
    "abbr": "Ec",
    "t": "AT",
    "chapters": 12,
    "author": "Salomón (\"el Predicador\")",
    "date": "~935 a.C.",
    "genre": "Sabiduría",
    "summary": "Eclesiastés explora la búsqueda del significado de la vida. El Predicador prueba todo: sabiduría, placer, trabajo, riqueza, y concluye que sin Dios todo es \"vanidad\", como correr tras el viento. La vida \"debajo del sol\" (sin perspectiva eterna) es vacía. Pero el libro culmina con la respuesta: \"Teme a Dios y guarda sus mandamientos, porque esto es el todo del hombre\". El verdadero sentido se encuentra solo en relación con el Creador.",
    "icon": "👑",
    "keyVerse": ""
  },
  {
    "id": "cnt",
    "name": "Cantar de los Cantares",
    "abbr": "Cnt",
    "t": "AT",
    "chapters": 8,
    "author": "Salomón",
    "date": "~965 a.C.",
    "genre": "Poesía / Amor",
    "summary": "Cantar de los Cantares es un poema de amor que celebra la belleza del amor romántico y conyugal entre un hombre y una mujer. Con un lenguaje poético lleno de metáforas de la naturaleza, exalta la intimidad, el deseo y la fidelidad dentro del matrimonio como un regalo de Dios. Muchos lo han interpretado también como una alegoría del amor de Dios por su pueblo y de Cristo por su Iglesia. Es una afirmación bíblica de que el amor y la intimidad conyugal son hermosos y santos.",
    "icon": "🌹",
    "keyVerse": ""
  },
  {
    "id": "jer",
    "name": "Jeremías",
    "abbr": "Jer",
    "t": "AT",
    "chapters": 52,
    "author": "Jeremías",
    "date": "~627-580 a.C.",
    "genre": "Profecía",
    "summary": "Jeremías predicó durante 40 años un mensaje impopular: el juicio de Dios venía sobre Judá por su idolatría persistente. A pesar del rechazo, la prisión y la persecución, fue fiel. Su corazón se quebrantaba por su pueblo, por eso se le llama \"el profeta llorón\". Pero su mensaje no era solo de juicio: también anunció la esperanza del nuevo pacto, cuando Dios escribiría su ley en los corazones. Jeremías 29:11 sigue siendo una de las promesas más amadas de la Biblia.",
    "icon": "😢",
    "keyVerse": ""
  },
  {
    "id": "lm",
    "name": "Lamentaciones",
    "abbr": "Lm",
    "t": "AT",
    "chapters": 5,
    "author": "Jeremías",
    "date": "~586 a.C.",
    "genre": "Poesía / Lamento",
    "summary": "Lamentaciones son cinco poemas de luto por la caída de Jerusalén. Jeremías llora la devastación de la ciudad, el sufrimiento del pueblo y las consecuencias del pecado. Es un libro de dolor crudo y honesto. Sin embargo, en el centro mismo del libro (cap. 3) brilla un destello de esperanza: \"Por la misericordia de Jehová no hemos sido consumidos... nuevas son cada mañana\". Enseña que el lamento honesto y la esperanza en Dios pueden coexistir.",
    "icon": "😢",
    "keyVerse": ""
  },
  {
    "id": "ez",
    "name": "Ezequiel",
    "abbr": "Ez",
    "t": "AT",
    "chapters": 48,
    "author": "Ezequiel",
    "date": "~593-571 a.C.",
    "genre": "Profecía",
    "summary": "Ezequiel, sacerdote exiliado en Babilonia, recibió visiones extraordinarias de la gloria de Dios. Su mensaje tuvo dos fases: antes de la caída de Jerusalén anunció el juicio por la idolatría; después, ofreció esperanza de restauración. Sus famosas visiones incluyen la gloria de Dios sobre ruedas, el valle de los huesos secos que cobran vida (símbolo de la restauración de Israel) y el nuevo Templo. El gran tema es que \"sabrán que yo soy Jehová\", repetido más de 60 veces.",
    "icon": "📜",
    "keyVerse": ""
  },
  {
    "id": "dn",
    "name": "Daniel",
    "abbr": "Dn",
    "t": "AT",
    "chapters": 12,
    "author": "Daniel",
    "date": "~535 a.C.",
    "genre": "Profecía / Apocalíptica",
    "summary": "Daniel combina relatos de fidelidad y profecías sobre el futuro. En la primera mitad, Daniel y sus amigos (Sadrac, Mesac y Abed-nego) se mantienen fieles a Dios bajo presión: el horno de fuego, el foso de los leones, la negativa a contaminarse. En la segunda mitad, Daniel recibe visiones proféticas sobre los imperios mundiales y el reino eterno de Dios. El libro demuestra que Dios es soberano sobre las naciones y que la fidelidad bajo presión es posible y recompensada.",
    "icon": "🦁",
    "keyVerse": ""
  },
  {
    "id": "os",
    "name": "Oseas",
    "abbr": "Os",
    "t": "AT",
    "chapters": 14,
    "author": "Oseas",
    "date": "~750 a.C.",
    "genre": "Profecía",
    "summary": "Oseas vivió una de las profecías más conmovedoras: Dios le mandó casarse con Gomer, una mujer infiel, para ilustrar cómo Israel había sido infiel a Dios. A pesar de las repetidas traiciones, Oseas redime a su esposa, así como Dios sigue amando a su pueblo infiel. El libro retrata el corazón quebrantado pero fiel de Dios, que disciplina pero anhela restaurar. Es una de las imágenes más poderosas del amor incondicional de Dios.",
    "icon": "💔",
    "keyVerse": ""
  },
  {
    "id": "jl",
    "name": "Joel",
    "abbr": "Jl",
    "t": "AT",
    "chapters": 3,
    "author": "Joel",
    "date": "~835 a.C.",
    "genre": "Profecía",
    "summary": "Joel comienza con una plaga de langostas que arrasa la tierra, y la usa como imagen del juicio venidero, el \"día de Jehová\". Llama urgentemente al arrepentimiento sincero: \"rasgad vuestro corazón, y no vuestros vestidos\". Pero el libro también contiene una de las promesas más gloriosas: el derramamiento del Espíritu Santo sobre toda carne, que Pedro citó en Pentecostés (Hechos 2). Joel une el juicio con la esperanza de restauración y bendición.",
    "icon": "📜",
    "keyVerse": ""
  },
  {
    "id": "am",
    "name": "Amós",
    "abbr": "Am",
    "t": "AT",
    "chapters": 9,
    "author": "Amós",
    "date": "~760 a.C.",
    "genre": "Profecía",
    "summary": "Amós era un pastor común que Dios llamó para confrontar la injusticia social de Israel. En una época de prosperidad, los ricos oprimían a los pobres mientras mantenían una religiosidad externa. Amós denunció con fuerza esta hipocresía: Dios desprecia el culto cuando va acompañado de injusticia. Su mensaje central clama por justicia social: \"corra el juicio como las aguas, y la justicia como impetuoso arroyo\". Es el profeta de la justicia social por excelencia.",
    "icon": "🐑",
    "keyVerse": ""
  },
  {
    "id": "ab",
    "name": "Abdías",
    "abbr": "Abd",
    "t": "AT",
    "chapters": 1,
    "author": "Abdías",
    "date": "~586 a.C.",
    "genre": "Profecía",
    "summary": "Abdías, con un solo capítulo, pronuncia juicio sobre Edom, nación que descendía de Esaú, hermano de Jacob. Cuando Jerusalén fue atacada, los edomitas no solo se alegraron sino que participaron en el saqueo y entregaron a los fugitivos. Dios condena su orgullo (\"la soberbia de tu corazón te ha engañado\") y anuncia su destrucción. El libro enseña que Dios juzga el orgullo y la crueldad, y que \"el reino será de Jehová\".",
    "icon": "📜",
    "keyVerse": ""
  },
  {
    "id": "jon",
    "name": "Jonás",
    "abbr": "Jon",
    "t": "AT",
    "chapters": 4,
    "author": "Jonás (o anónimo)",
    "date": "~760 a.C.",
    "genre": "Profecía / Narrativa",
    "summary": "Jonás es una historia sobre la misericordia de Dios y la resistencia humana. Dios llamó a Jonás a predicar en Nínive, ciudad enemiga, pero Jonás huyó en barco. Tras una tormenta, fue tragado por un gran pez y, tres días después, vomitado en tierra. Finalmente predicó, y toda Nínive se arrepintió, lo que enojó a Jonás, que quería el juicio sobre sus enemigos. El libro revela que la misericordia de Dios alcanza incluso a nuestros enemigos, y desafía nuestro corazón estrecho.",
    "icon": "🐋",
    "keyVerse": ""
  },
  {
    "id": "miq",
    "name": "Miqueas",
    "abbr": "Miq",
    "t": "AT",
    "chapters": 7,
    "author": "Miqueas",
    "date": "~735-700 a.C.",
    "genre": "Profecía",
    "summary": "Miqueas alternó mensajes de juicio y esperanza. Denunció la corrupción de jueces, sacerdotes y profetas que oprimían al pueblo. Pero también dio una de las profecías mesiánicas más precisas: el Mesías nacería en Belén (5:2), cumplida en Jesús. El libro resume bellamente lo que Dios espera de nosotros: \"hacer justicia, amar misericordia y humillarte ante tu Dios\" (6:8), uno de los versículos más completos sobre la vida que agrada a Dios.",
    "icon": "📜",
    "keyVerse": ""
  },
  {
    "id": "na",
    "name": "Nahúm",
    "abbr": "Nah",
    "t": "AT",
    "chapters": 3,
    "author": "Nahúm",
    "date": "~660-630 a.C.",
    "genre": "Profecía",
    "summary": "Nahúm proclama el juicio de Dios sobre Nínive, capital del cruel Imperio Asirio. Un siglo después del arrepentimiento bajo Jonás, Nínive había vuelto a su violencia y opresión. Nahúm anuncia su destrucción total e inevitable. Pero el libro también consuela a Judá: el mismo Dios que juzga a los crueles es \"bueno, fortaleza en el día de la angustia, y conoce a los que en él confían\". Muestra el equilibrio entre la justicia y la bondad de Dios.",
    "icon": "📜",
    "keyVerse": ""
  },
  {
    "id": "hab",
    "name": "Habacuc",
    "abbr": "Hab",
    "t": "AT",
    "chapters": 3,
    "author": "Habacuc",
    "date": "~610-605 a.C.",
    "genre": "Profecía",
    "summary": "Habacuc es único: en vez de hablar al pueblo, dialoga con Dios sobre sus dudas. Pregunta por qué Dios permite la injusticia y por qué usaría a los crueles babilonios para juzgar a Judá. Dios responde, y aunque no resuelve todas las dudas, Habacuc aprende a confiar. El libro culmina con una de las declaraciones de fe más hermosas: aunque todo falle (\"aunque la higuera no florezca\"), \"yo me alegraré en Jehová\". También contiene \"el justo por su fe vivirá\", clave en la Reforma.",
    "icon": "🙏",
    "keyVerse": ""
  },
  {
    "id": "sof",
    "name": "Sofonías",
    "abbr": "Sof",
    "t": "AT",
    "chapters": 3,
    "author": "Sofonías",
    "date": "~640-620 a.C.",
    "genre": "Profecía",
    "summary": "Sofonías anuncia el \"día de Jehová\", un día de juicio sobre Judá y las naciones por su idolatría y orgullo. Pero el libro no termina en juicio: culmina con una de las imágenes más tiernas de Dios en toda la Biblia. Dios mismo se regocijará sobre su pueblo restaurado con cánticos: \"se gozará sobre ti con alegría, callará de amor, se regocijará sobre ti con cántico\". Muestra que tras el juicio viene la restauración y el gozo de Dios por los suyos.",
    "icon": "📜",
    "keyVerse": ""
  },
  {
    "id": "hag",
    "name": "Hageo",
    "abbr": "Hag",
    "t": "AT",
    "chapters": 2,
    "author": "Hageo",
    "date": "~520 a.C.",
    "genre": "Profecía",
    "summary": "Hageo es un llamado a poner las prioridades en orden. Los judíos que regresaron del exilio habían dejado de construir el Templo para ocuparse de sus propias casas, y sufrían escasez. Hageo los confronta: \"¿Es tiempo para vosotros de habitar en casas artesonadas, y esta casa está desierta?\". Cuando el pueblo obedece y retoma la obra, Dios promete su presencia y bendición, y que la gloria de este Templo sería mayor que la del anterior, apuntando a la venida del Mesías.",
    "icon": "📜",
    "keyVerse": ""
  },
  {
    "id": "zac",
    "name": "Zacarías",
    "abbr": "Zac",
    "t": "AT",
    "chapters": 14,
    "author": "Zacarías",
    "date": "~520-480 a.C.",
    "genre": "Profecía",
    "summary": "Zacarías combina ánimo presente con esperanza mesiánica. Mientras Hageo se enfocó en reconstruir el Templo, Zacarías levantó la vista al futuro mediante ocho visiones nocturnas y profecías sobre el Mesías. Predijo al Rey humilde entrando en un asno (cumplido el Domingo de Ramos), al pastor herido y traicionado por 30 piezas de plata, y el reino futuro de Dios. El mensaje central: el éxito viene \"no con ejército, ni con fuerza, sino con mi Espíritu\".",
    "icon": "📜",
    "keyVerse": ""
  },
  {
    "id": "mal",
    "name": "Malaquías",
    "abbr": "Mal",
    "t": "AT",
    "chapters": 4,
    "author": "Malaquías",
    "date": "~430 a.C.",
    "genre": "Profecía",
    "summary": "Malaquías cierra el Antiguo Testamento confrontando la apatía espiritual del pueblo, que había caído en formalismo religioso, ofrendas defectuosas y matrimonios mixtos. Mediante un formato de preguntas y respuestas, Dios reprende su frialdad y los llama a volver. Promete bendición a quienes le honran con sus diezmos (\"probadme ahora en esto\"). Termina anunciando la venida de Elías (Juan el Bautista) antes del día de Jehová. Tras Malaquías vienen 400 años de silencio hasta Cristo.",
    "icon": "📜",
    "keyVerse": ""
  },
  {
    "id": "mr",
    "name": "Marcos",
    "abbr": "Mr",
    "t": "NT",
    "chapters": 16,
    "author": "Juan Marcos",
    "date": "~50-60 d.C.",
    "genre": "Evangelio",
    "summary": "Marcos es el evangelio de la acción. El más corto y veloz de los cuatro, usa la palabra \"luego\" o \"en seguida\" más de 40 veces, transmitiendo urgencia. Presenta a Jesús como el Siervo poderoso que demuestra su autoridad con hechos: milagros, exorcismos y sanidades. El punto de giro es la confesión de Pedro (\"tú eres el Cristo\") y luego el camino a la cruz. El versículo clave resume todo: el Hijo del Hombre vino \"para servir, y para dar su vida en rescate por muchos\".",
    "icon": "✝",
    "keyVerse": ""
  },
  {
    "id": "lc",
    "name": "Lucas",
    "abbr": "Lc",
    "t": "NT",
    "chapters": 24,
    "author": "Lucas, el médico",
    "date": "~60-62 d.C.",
    "genre": "Evangelio",
    "summary": "Lucas escribió \"ordenadamente\" tras investigar cuidadosamente, presentando a Jesús como el Salvador perfecto de toda la humanidad. Su evangelio destaca la compasión de Jesús por los marginados: pobres, mujeres, samaritanos, pecadores. Contiene parábolas únicas y amadas como el hijo pródigo, el buen samaritano y la oveja perdida. Lucas enfatiza la oración, el Espíritu Santo y el gozo. El versículo clave revela su corazón: Jesús vino \"a buscar y a salvar lo que se había perdido\".",
    "icon": "✝",
    "keyVerse": ""
  },
  {
    "id": "hch",
    "name": "Hechos",
    "abbr": "Hch",
    "t": "NT",
    "chapters": 28,
    "author": "Lucas",
    "date": "~62-64 d.C.",
    "genre": "Historia",
    "summary": "Hechos es la historia del nacimiento de la iglesia. Comienza con la ascensión de Jesús y el derramamiento del Espíritu Santo en Pentecostés. A partir de ahí, el evangelio se expande imparablemente: primero en Jerusalén bajo Pedro, luego por Judea y Samaria, y finalmente \"hasta lo último de la tierra\" mediante los viajes misioneros de Pablo. El libro muestra que la iglesia crece por el poder del Espíritu Santo, a través de la predicación valiente y a pesar de la persecución.",
    "icon": "⚓",
    "keyVerse": ""
  },
  {
    "id": "2co",
    "name": "2 Corintios",
    "abbr": "2 Co",
    "t": "NT",
    "chapters": 13,
    "author": "Pablo",
    "date": "~56 d.C.",
    "genre": "Epístola",
    "summary": "2 Corintios es la carta más personal y emotiva de Pablo. Tras un conflicto doloroso con la iglesia, Pablo abre su corazón: habla de sus sufrimientos, su debilidad y el consuelo de Dios. Defiende su ministerio apostólico ante falsos maestros que lo criticaban. El tema central es la paradoja del poder en la debilidad: \"cuando soy débil, entonces soy fuerte\". También enseña sobre la generosidad cristiana y la nueva creación que somos en Cristo.",
    "icon": "📜",
    "keyVerse": ""
  },
  {
    "id": "ga",
    "name": "Gálatas",
    "abbr": "Gá",
    "t": "NT",
    "chapters": 6,
    "author": "Pablo",
    "date": "~49 d.C.",
    "genre": "Epístola",
    "summary": "Gálatas es la \"carta magna\" de la libertad cristiana. Falsos maestros (judaizantes) enseñaban que los gentiles debían cumplir la ley de Moisés (incluida la circuncisión) para ser salvos. Pablo responde con firmeza: la salvación es por gracia mediante la fe, no por obras de la ley. Defiende su autoridad apostólica y proclama que en Cristo somos libres. El fruto de esta libertad es el fruto del Espíritu: amor, gozo, paz, paciencia y más. Es un manifiesto de la gracia.",
    "icon": "📜",
    "keyVerse": ""
  },
  {
    "id": "col",
    "name": "Colosenses",
    "abbr": "Col",
    "t": "NT",
    "chapters": 4,
    "author": "Pablo",
    "date": "~60-62 d.C.",
    "genre": "Epístola",
    "summary": "Colosenses exalta la supremacía de Cristo. Falsos maestros mezclaban el evangelio con filosofía, misticismo y reglas, disminuyendo a Cristo. Pablo responde con uno de los pasajes cristológicos más sublimes: Cristo es \"la imagen del Dios invisible\", creador y sustentador de todo, cabeza de la iglesia, en quien \"habita toda la plenitud de la Deidad\". Como tenemos todo en Cristo, no necesitamos añadir nada. La carta llama a poner la mira en las cosas de arriba y vivir la nueva vida en él.",
    "icon": "📜",
    "keyVerse": ""
  },
  {
    "id": "1ts",
    "name": "1 Tesalonicenses",
    "abbr": "1 Ts",
    "t": "NT",
    "chapters": 5,
    "author": "Pablo",
    "date": "~51 d.C.",
    "genre": "Epístola",
    "summary": "1 Tesalonicenses es una carta cálida de ánimo a una iglesia joven que sufría persecución. Pablo elogia su fe, amor y esperanza, y los anima a seguir creciendo. El tema distintivo es la segunda venida de Cristo: enseña que los creyentes que han muerto resucitarán y que los vivos serán arrebatados para encontrarse con el Señor. Esta esperanza consuela ante la muerte y motiva a vivir santamente, velando y preparados para el regreso de Cristo.",
    "icon": "📜",
    "keyVerse": ""
  },
  {
    "id": "2ts",
    "name": "2 Tesalonicenses",
    "abbr": "2 Ts",
    "t": "NT",
    "chapters": 3,
    "author": "Pablo",
    "date": "~51-52 d.C.",
    "genre": "Epístola",
    "summary": "2 Tesalonicenses corrige confusiones sobre el regreso de Cristo. Algunos creían que el día del Señor ya había llegado y, por eso, habían dejado de trabajar. Pablo aclara que ciertos eventos deben ocurrir antes, y exhorta a no caer en el ocio: \"si alguno no quiere trabajar, tampoco coma\". Anima a permanecer firmes en la sana doctrina y a no cansarse de hacer el bien mientras esperan. Recuerda que Dios es fiel y guardará a los suyos del mal.",
    "icon": "📜",
    "keyVerse": ""
  },
  {
    "id": "1tm",
    "name": "1 Timoteo",
    "abbr": "1 Ti",
    "t": "NT",
    "chapters": 6,
    "author": "Pablo",
    "date": "~63-65 d.C.",
    "genre": "Epístola Pastoral",
    "summary": "1 Timoteo es una carta pastoral: Pablo instruye a su joven discípulo Timoteo sobre cómo pastorear la iglesia de Éfeso. Cubre temas prácticos: confrontar falsas doctrinas, organizar la adoración, los requisitos de los líderes (obispos y diáconos), el cuidado de las viudas y la actitud hacia el dinero. Anima a Timoteo a no dejar que nadie menosprecie su juventud, sino a ser ejemplo en palabra y conducta. Es un manual para el liderazgo y la sana doctrina en la iglesia.",
    "icon": "📜",
    "keyVerse": ""
  },
  {
    "id": "2tm",
    "name": "2 Timoteo",
    "abbr": "2 Ti",
    "t": "NT",
    "chapters": 4,
    "author": "Pablo",
    "date": "~66-67 d.C.",
    "genre": "Epístola Pastoral",
    "summary": "2 Timoteo son las últimas palabras conocidas de Pablo, escritas en prisión cerca de su ejecución. Con un tono íntimo y urgente, exhorta a Timoteo a permanecer fiel, a no avergonzarse del evangelio, a soportar el sufrimiento y a predicar la Palabra \"a tiempo y fuera de tiempo\". Afirma la inspiración de las Escrituras como útiles para toda buena obra. Termina con una de las declaraciones más conmovedoras: \"he peleado la buena batalla, he acabado la carrera, he guardado la fe\". Es un testamento de fidelidad hasta el fin.",
    "icon": "📜",
    "keyVerse": ""
  },
  {
    "id": "tit",
    "name": "Tito",
    "abbr": "Tit",
    "t": "NT",
    "chapters": 3,
    "author": "Pablo",
    "date": "~63-65 d.C.",
    "genre": "Epístola Pastoral",
    "summary": "Tito es una carta pastoral breve y práctica. Pablo dejó a Tito en la isla de Creta para \"corregir lo deficiente\" y nombrar líderes en cada iglesia. La carta enfatiza la conexión entre la sana doctrina y la buena conducta: lo que creemos debe reflejarse en cómo vivimos. Pablo describe el carácter requerido para los ancianos, instruye a distintos grupos de la iglesia y subraya que la gracia de Dios nos enseña a vivir santamente. Las buenas obras son fruto, no causa, de la salvación.",
    "icon": "📜",
    "keyVerse": ""
  },
  {
    "id": "flm",
    "name": "Filemón",
    "abbr": "Flm",
    "t": "NT",
    "chapters": 1,
    "author": "Pablo",
    "date": "~60-62 d.C.",
    "genre": "Epístola",
    "summary": "Filemón es la carta más personal y corta de Pablo. Onésimo, un esclavo que había huido de su amo Filemón, conoció a Pablo en prisión y se convirtió. Ahora Pablo lo envía de vuelta, no como esclavo sino \"como hermano amado\", e intercede por él. Con gran tacto, Pablo apela al amor en vez de mandar, ofreciéndose a pagar cualquier deuda de Onésimo. La carta es un hermoso ejemplo del poder transformador del evangelio que cambia las relaciones y derriba barreras sociales.",
    "icon": "📜",
    "keyVerse": ""
  },
  {
    "id": "stg",
    "name": "Santiago",
    "abbr": "Stg",
    "t": "NT",
    "chapters": 5,
    "author": "Santiago (hermano de Jesús)",
    "date": "~45-49 d.C.",
    "genre": "Epístola",
    "summary": "Santiago es el \"libro de Proverbios\" del Nuevo Testamento: práctico, directo y lleno de sabiduría para la vida diaria. Su tema central: la fe genuina produce obras; \"la fe sin obras es muerta\". Aborda temas como soportar las pruebas con gozo, dominar la lengua, no hacer acepción de personas, la verdadera sabiduría, la paciencia y el poder de la oración. No contradice a Pablo (que enseña justificación por fe) sino que muestra el otro lado: una fe real siempre se evidencia en cómo vivimos.",
    "icon": "📜",
    "keyVerse": ""
  },
  {
    "id": "1pe",
    "name": "1 Pedro",
    "abbr": "1 P",
    "t": "NT",
    "chapters": 5,
    "author": "Pedro",
    "date": "~62-64 d.C.",
    "genre": "Epístola",
    "summary": "1 Pedro es la carta de la esperanza en el sufrimiento. Escrita a creyentes perseguidos esparcidos por Asia Menor, los anima a mantenerse firmes recordando su identidad como pueblo escogido de Dios y su herencia incorruptible en el cielo. Pedro enseña que el sufrimiento por causa de Cristo es un privilegio que nos hace partícipes de sus padecimientos. Llama a una vida santa, a la sumisión por amor a Dios y a echar toda ansiedad sobre él. Cristo, que sufrió por nosotros, es nuestro ejemplo.",
    "icon": "⚓",
    "keyVerse": ""
  },
  {
    "id": "2pe",
    "name": "2 Pedro",
    "abbr": "2 P",
    "t": "NT",
    "chapters": 3,
    "author": "Pedro",
    "date": "~64-67 d.C.",
    "genre": "Epístola",
    "summary": "2 Pedro es la carta de despedida del apóstol, escrita cerca de su muerte. Su preocupación principal son los falsos maestros que negaban la verdad y vivían en inmoralidad. Pedro exhorta a crecer en el conocimiento de Cristo como antídoto contra el error, y reafirma la autoridad de las Escrituras, que vinieron por hombres movidos por el Espíritu Santo. Ante quienes se burlaban de la promesa del regreso de Cristo, recuerda que Dios no tarda sino que es paciente, no queriendo que ninguno perezca.",
    "icon": "⚓",
    "keyVerse": ""
  },
  {
    "id": "1jn",
    "name": "1 Juan",
    "abbr": "1 Jn",
    "t": "NT",
    "chapters": 5,
    "author": "Juan el apóstol",
    "date": "~85-95 d.C.",
    "genre": "Epístola",
    "summary": "1 Juan es la carta del amor y la seguridad. Juan escribe para que los creyentes \"sepan que tienen vida eterna\". Combate a falsos maestros que negaban que Jesús vino en carne. Presenta pruebas de la fe genuina: caminar en la luz, amar a los hermanos, confesar a Cristo y obedecer sus mandamientos. El tema central es el amor: \"Dios es amor\", y quien permanece en el amor permanece en Dios. La carta da una certeza profunda: si confesamos nuestros pecados, Dios es fiel para perdonarnos.",
    "icon": "❤",
    "keyVerse": ""
  },
  {
    "id": "2jn",
    "name": "2 Juan",
    "abbr": "2 Jn",
    "t": "NT",
    "chapters": 1,
    "author": "Juan el apóstol",
    "date": "~85-95 d.C.",
    "genre": "Epístola",
    "summary": "2 Juan es una carta breve dirigida a \"la señora elegida y sus hijos\" (probablemente una iglesia). Equilibra dos temas fundamentales: el amor y la verdad. Juan se goza de que algunos andan en la verdad y los exhorta a amarse unos a otros según el mandamiento de Cristo. Pero también advierte con firmeza: no deben recibir ni apoyar a falsos maestros que niegan que Jesús vino en carne. El amor no significa tolerar el error; la verdad debe protegerse mientras se ama.",
    "icon": "📜",
    "keyVerse": ""
  },
  {
    "id": "3jn",
    "name": "3 Juan",
    "abbr": "3 Jn",
    "t": "NT",
    "chapters": 1,
    "author": "Juan el apóstol",
    "date": "~85-95 d.C.",
    "genre": "Epístola",
    "summary": "3 Juan es una carta personal que contrasta tres personajes. Gayo es elogiado por su hospitalidad y por andar en la verdad, apoyando a los misioneros. Diótrefes es reprendido por su orgullo: le gustaba tener el primer lugar, rechazaba la autoridad y expulsaba a los hermanos. Demetrio es recomendado por su buen testimonio. La carta enseña el valor de la hospitalidad cristiana hacia los obreros del evangelio y advierte contra el espíritu de dominación y orgullo en el liderazgo.",
    "icon": "⭐",
    "keyVerse": ""
  },
  {
    "id": "jud",
    "name": "Judas",
    "abbr": "Jud",
    "t": "NT",
    "chapters": 1,
    "author": "Judas (hermano de Jesús)",
    "date": "~65-80 d.C.",
    "genre": "Epístola",
    "summary": "Judas es un llamado urgente a \"contender por la fe\". El autor pensaba escribir sobre la salvación, pero la infiltración de falsos maestros lo obligó a advertir. Estos pervertían la gracia en libertinaje y negaban a Cristo. Judas usa ejemplos del AT (Israel, los ángeles caídos, Sodoma) para mostrar el juicio de Dios sobre la apostasía. Pero termina con esperanza: exhorta a edificarse en la fe, orar en el Espíritu y conservarse en el amor de Dios. Cierra con una de las doxologías más hermosas de la Biblia.",
    "icon": "📜",
    "keyVerse": ""
  },
  {
    "id": "1co",
    "name": "1 Corintios",
    "abbr": "1 Co",
    "t": "NT",
    "chapters": 16,
    "author": "Pablo",
    "date": "~55 d.C.",
    "genre": "Epístola",
    "summary": "1 Corintios aborda los muchos problemas de una iglesia talentosa pero carnal. Pablo confronta las divisiones, los pleitos, la inmoralidad, el mal uso de la libertad y el desorden en la adoración y en el uso de los dones espirituales. En medio de las correcciones brilla el capítulo 13, el \"himno al amor\", que muestra que sin amor todo don es vano. También enseña con claridad sobre la Cena del Señor y dedica el capítulo 15 a la resurrección, fundamento de la fe. Es la carta más práctica sobre la vida en comunidad.",
    "icon": "📜",
    "keyVerse": ""
  },
  {
    "id": "fil",
    "name": "Filipenses",
    "abbr": "Fil",
    "t": "NT",
    "chapters": 4,
    "author": "Pablo",
    "date": "~61 d.C.",
    "genre": "Epístola",
    "summary": "Filipenses es la \"carta del gozo\": Pablo usa las palabras \"gozo\" y \"regocijaos\" más de 15 veces, ¡y la escribió desde la cárcel! Dirigida a una de sus iglesias más amadas, rebosa de gratitud y afecto. Pablo enseña que el verdadero gozo no depende de las circunstancias sino de Cristo. Contiene el himno de la humillación y exaltación de Cristo (cap. 2), el testimonio de Pablo de considerar todo basura comparado con conocer a Cristo (cap. 3) y el secreto del contentamiento: \"todo lo puedo en Cristo que me fortalece\".",
    "icon": "📜",
    "keyVerse": ""
  }
];

    /* ── Caché de contenido generado por IA (localStorage) ── */
    const _memCache = {};

    function _loadCache(id) {
      if (_memCache[id]) return _memCache[id];
      try {
        const v = localStorage.getItem('brv_sum_ai_' + id);
        if (v) { _memCache[id] = JSON.parse(v); return _memCache[id]; }
      } catch(e) {}
      return null;
    }

    function _saveCache(id, data) {
      _memCache[id] = data;
      try { localStorage.setItem('brv_sum_ai_' + id, JSON.stringify(data)); } catch(e) {}
    }

    /* ── Estado ── */
    let state = { testament: 'ALL', searchQuery: '', activeId: null };

    /* ── Llamada a Claude API ── */
    async function generateBookDetail(book) {
      const cached = _loadCache(book.id);
      if (cached) return cached;

      const prompt = `Eres experto en Biblia Reina Valera 1960. Para el libro de ${book.name}, responde SOLO con JSON válido, sin texto adicional ni markdown:
{
  "whatHappens": "Qué ocurre en este libro (3-4 oraciones)",
  "context": "Contexto histórico y cultural (2-3 oraciones)",
  "godPurpose": "Propósito de Dios en este libro (2-3 oraciones)",
  "godTeaching": "Enseñanzas sobre el carácter de Dios (2-3 oraciones)",
  "practicalLessons": "3 lecciones prácticas para hoy",
  "christConnection": "Cómo apunta a Cristo (2-3 oraciones)",
  "keyVerses": [
    {"ref": "Libro cap:vers", "text": "versículo exacto RV1960"},
    {"ref": "Libro cap:vers", "text": "versículo exacto RV1960"},
    {"ref": "Libro cap:vers", "text": "versículo exacto RV1960"}
  ],
  "readingCall": "Invitación a leer este libro (1-2 oraciones)",
  "curiosities": ["dato curioso 1", "dato curioso 2", "dato curioso 3"]
}`;

      try {
        const resp = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'claude-sonnet-4-6',
            max_tokens: 1000,
            messages: [{ role: 'user', content: prompt }]
          })
        });
        const data = await resp.json();
        const text = data.content[0].text.replace(/```json|```/g, '').trim();
        const deep = JSON.parse(text);
        _saveCache(book.id, deep);
        return deep;
      } catch(e) {
        console.error('Error IA summaries:', e);
        return null;
      }
    }

    /* ── Filtrar libros ── */
    function getFilteredBooks() {
      let books = BOOKS_DATA;
      if (state.testament !== 'ALL') books = books.filter(b => b.t === state.testament);
      if (state.searchQuery) {
        const q = state.searchQuery.toLowerCase();
        books = books.filter(b => b.name.toLowerCase().includes(q) || b.abbr.toLowerCase().includes(q));
      }
      return books;
    }

    /* ── Render lista ── */
    function renderList() {
      const container = document.getElementById('brv-sum-list');
      if (!container) return;
      container.innerHTML = getFilteredBooks().map(b => `
        <div class="brv-sum-card ${state.activeId === b.id ? 'active' : ''}"
             onclick="BRV.summaries.openBook('${b.id}')">
          <span class="brv-sum-icon">${b.icon}</span>
          <div class="brv-sum-info">
            <strong>${b.name}</strong>
            <span>${b.chapters} capítulos · ${b.genre || ''}</span>
          </div>
        </div>`).join('');
    }

    /* ── Skeleton mientras carga ── */
    function buildSkeleton(book) {
      return `
        <div class="brv-sum-detail-header">
          <span class="brv-sum-detail-icon">${book.icon}</span>
          <div><h2>${book.name}</h2>
          <p>${book.author} · ${book.date} · ${book.genre}</p></div>
        </div>
        <p class="brv-sum-summary">${book.summary}</p>
        <div class="brv-sum-ai-loading">
          <div class="brv-sum-spinner"></div>
          <p>✨ Generando análisis bíblico con IA...</p>
          <small>Solo la primera vez — luego queda guardado</small>
        </div>`;
    }

    /* ── Render detalle completo ── */
    function buildDetail(book, deep) {
      const kvHtml = (deep.keyVerses || []).map(kv => `
        <div class="brv-sum-verse">
          <strong>${kv.ref}</strong>
          <p>"${kv.text}"</p>
        </div>`).join('');

      const curiosHtml = (deep.curiosities || []).map(c => `<li>${c}</li>`).join('');

      return `
        <div class="brv-sum-detail-header">
          <span class="brv-sum-detail-icon">${book.icon}</span>
          <div><h2>${book.name}</h2>
          <p>${book.author} · ${book.date} · ${book.genre}</p></div>
        </div>
        <p class="brv-sum-summary">${book.summary}</p>
        <div class="brv-sum-section"><h3>📖 ¿Qué ocurre?</h3><p>${deep.whatHappens||''}</p></div>
        <div class="brv-sum-section"><h3>🌍 Contexto histórico</h3><p>${deep.context||''}</p></div>
        <div class="brv-sum-section"><h3>🎯 Propósito de Dios</h3><p>${deep.godPurpose||''}</p></div>
        <div class="brv-sum-section"><h3>📚 Enseñanzas sobre Dios</h3><p>${deep.godTeaching||''}</p></div>
        <div class="brv-sum-section"><h3>💡 Lecciones prácticas</h3><p>${deep.practicalLessons||''}</p></div>
        <div class="brv-sum-section"><h3>✝️ Conexión con Cristo</h3><p>${deep.christConnection||''}</p></div>
        ${kvHtml ? `<div class="brv-sum-section"><h3>📌 Versículos clave</h3>${kvHtml}</div>` : ''}
        ${curiosHtml ? `<div class="brv-sum-section"><h3>💎 Datos curiosos</h3><ul>${curiosHtml}</ul></div>` : ''}
        <div class="brv-sum-section brv-sum-reading-call">
          <p>📖 ${deep.readingCall||''}</p>
          <button onclick="BRV.summaries.readBook('${book.id}')">Leer ${book.name}</button>
        </div>`;
    }

    /* ── Abrir libro ── */
    async function openBook(id) {
      const book = BOOKS_DATA.find(b => b.id === id);
      if (!book) return;
      state.activeId = id;
      renderList();

      const welcome = document.getElementById('brv-sum-welcome');
      const detail  = document.getElementById('brv-sum-detail');
      if (welcome) welcome.style.display = 'none';
      if (!detail) return;

      detail.classList.add('active');
      detail.innerHTML = buildSkeleton(book);
      detail.scrollTop = 0;
      BRV.storage.set('lastSummary', id);

      const deep = await generateBookDetail(book);
      if (deep) {
        detail.innerHTML = buildDetail(book, deep);
      } else {
        detail.querySelector('.brv-sum-ai-loading').innerHTML =
          '<p style="color:#e57373">⚠️ Error al generar. Intenta de nuevo.</p>';
      }
    }

    /* ── Otras funciones ── */
    function readBook(id) {
      if (BRV.reader) BRV.reader.goToBook(id);
      BRV.router.go('reader');
    }

    function projectKeyVerse(id) {
      const book = BOOKS_DATA.find(b => b.id === id);
      if (!book || !book.keyVerse) return;
      if (BRV.projection) BRV.projection.show(book.keyVerse, id.toUpperCase());
    }

    function setTestament(t) { state.testament = t; renderList(); }
    function filterBooks(q) { state.searchQuery = q; renderList(); }

    function init() {
      renderList();
      const lastId = BRV.storage.get('lastSummary');
      if (lastId) openBook(lastId);
    }

    return { openBook, readBook, projectKeyVerse, setTestament, filterBooks, init };
  })();


BRV.themes = (function() {

    /* ── Base de datos de temas ── */
    let THEMES = [];
    fetch('temas.json')
      .then(r => r.json())
      .then(data => {
        THEMES = data;
        if (window.BRV && BRV.themes && BRV.themes.init) BRV.themes.init();
      })
      .catch(e => console.error('Error cargando temas:', e));

    /* ── Estado ── */
    let state = { activeId: null, activeCat: null, searchQuery: '' };

    function escH(s) {
      return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
    }

    /* ── Render sidebar ── */
    function renderSidebar() {
      const el = document.getElementById('brv-th-sidebar-content');
      if (!el) return;
      const cats = [
        {key:'emocion',  label:'😔 Emociones'},
        {key:'relaciones',label:'❤️ Relaciones'},
        {key:'espiritual',label:'✝️ Vida Espiritual'},
        {key:'vocacion', label:'🎯 Vocación'},
        {key:'situacion',label:'🏥 Situaciones Difíciles'},
        {key:'salud_mental',label:'🧠 Salud Mental'},
        {key:'fe_sociedad',label:'🌍 Fe y Sociedad'},
        {key:'juventud', label:'🔥 Juventud'},
        {key:'etapas',   label:'👴 Etapas de Vida'},
      ];
      let html = '';
      cats.forEach(c => {
        const themes = THEMES.filter(t => t.cat === c.key);
        if (!themes.length) return;
        html += '<div class="brv-th-sidebar-label" style="margin-top:8px;">' + c.label + '</div>';
        themes.forEach(t => {
          html += '<div class="brv-th-item' + (t.id === state.activeId ? ' active' : '') + '"' +
            ' onclick="BRV.themes.openTheme(\'' + t.id + '\')">' +
            '<span class="brv-th-item-emoji">' + t.emoji + '</span>' +
            '<span>' + escH(t.name) + '</span>' +
            '</div>';
        });
      });
      el.innerHTML = html;
    }

    /* ── Render grid de tarjetas ── */
    function renderGrid() {
      const el = document.getElementById('brv-th-cards');
      const noRes = document.getElementById('brv-th-no-results');
      if (!el) return;
      let list = THEMES;
      if (state.activeCat) list = list.filter(t => t.cat === state.activeCat);
      if (state.searchQuery) {
        const q = state.searchQuery.toLowerCase();
        list = list.filter(t =>
          t.name.toLowerCase().includes(q) ||
          t.sub.toLowerCase().includes(q) ||
          (t.explanation||'').toLowerCase().includes(q)
        );
      }
      if (!list.length) {
        el.innerHTML = '';
        if (noRes) noRes.style.display = 'block';
        return;
      }
      if (noRes) noRes.style.display = 'none';
      el.innerHTML = list.map(t =>
        '<div class="brv-th-card" data-cat="' + t.cat + '" onclick="BRV.themes.openTheme(\'' + t.id + '\')">' +
          '<span class="brv-th-card-emoji">' + t.emoji + '</span>' +
          '<div class="brv-th-card-name">' + escH(t.name) + '</div>' +
          '<div class="brv-th-card-sub">' + escH(t.sub) + '</div>' +
          '<div class="brv-th-card-verses">' + t.verses.length + ' versículos</div>' +
        '</div>'
      ).join('');
    }

    /* ── Render chips de filtro por categoría ── */
    function renderFilterChips() {
      const el = document.getElementById('brv-th-filter-chips');
      if (!el) return;
      const cats = [
        {key:null,        label:'Todas'},
        {key:'emocion',   label:'😔 Emociones'},
        {key:'relaciones',label:'❤️ Relaciones'},
        {key:'espiritual',label:'✝️ Espiritual'},
        {key:'vocacion',  label:'🎯 Vocación'},
        {key:'situacion', label:'🏥 Situaciones'},
        {key:'salud_mental',label:'🧠 Salud Mental'},
        {key:'fe_sociedad',label:'🌍 Fe y Sociedad'},
        {key:'juventud',  label:'🔥 Juventud'},
        {key:'etapas',    label:'👴 Etapas'},
      ];
      el.innerHTML = cats.map(c =>
        '<div class="brv-th-chip' + (state.activeCat === c.key ? ' active' : '') + '" ' +
          'onclick="BRV.themes._setFilter(' + (c.key ? "'" + c.key + "'" : 'null') + ')">' +
          escH(c.label) +
        '</div>'
      ).join('');
    }

    function _setFilter(cat) {
      state.activeCat = cat;
      renderFilterChips();
      renderGrid();
    }

    function _onSearch(query) {
      state.searchQuery = query;
      renderGrid();
    }

    /* ── Abrir tema ── */
    function openTheme(id) {
      const theme = THEMES.find(t => t.id === id);
      if (!theme) return;
      state.activeId = id;
      renderSidebar();

      /* Oculta grid, muestra detalle */
      const grid   = document.getElementById('brv-th-grid-view');
      const detail = document.getElementById('brv-th-detail');
      const backBtn= document.getElementById('brv-th-back-btn');
      const headerT= document.getElementById('brv-th-header-title');
      if (grid)    grid.style.display = 'none';
      if (detail)  { detail.classList.add('active'); detail.innerHTML = buildDetail(theme); detail.scrollTop = 0; }
      if (backBtn) backBtn.classList.add('visible');
      if (headerT) headerT.textContent = theme.name;
      BRV.storage.set('lastTheme', id);
    }

    /* ── Volver al grid ── */
    function showGrid() {
      state.activeId = null;
      renderSidebar();
      const grid   = document.getElementById('brv-th-grid-view');
      const detail = document.getElementById('brv-th-detail');
      const backBtn= document.getElementById('brv-th-back-btn');
      const headerT= document.getElementById('brv-th-header-title');
      if (grid)    grid.style.display = '';
      if (detail)  detail.classList.remove('active');
      if (backBtn) backBtn.classList.remove('visible');
      if (headerT) headerT.textContent = '¿Qué necesitas hoy?';
    }

    /* ── Construye el HTML del detalle ── */
    function buildDetail(t) {
      /* Versículos */
      const versesHTML = t.verses.map((v, i) =>
        '<div class="brv-th-verse-card">' +
          '<div class="brv-th-verse-ref">' +
            '<span>' + escH(v.ref) + '</span>' +
            '<div class="brv-th-verse-actions">' +
              '<button class="brv-th-va" onclick="BRV.themes._copyVerse(' + i + ',\'' + escH(t.id) + '\')">📋</button>' +
              '<button class="brv-th-va" onclick="BRV.themes._projVerse(' + i + ',\'' + escH(t.id) + '\')">📽</button>' +
              '<button class="brv-th-va" onclick="BRV.themes._favVerse(' + i + ',\'' + escH(t.id) + '\')">⭐</button>' +
              '<button class="brv-th-va" onclick="BRV.soul.shareText(\'' + escH(t.id) + '\',' + i + ',\'versiculo\')" title="Compartir texto">📤</button>' +
              '<button class="brv-th-va" onclick="BRV.soul.shareImage(\'' + escH(t.id) + '\',' + i + ',\'versiculo\')" title="Compartir imagen">🖼️</button>' +
            '</div>' +
          '</div>' +
          '<div class="brv-th-verse-text">"' + escH(v.text) + '"</div>' +
        '</div>'
      ).join('');

      /* Pasos */
      const stepsHTML = (t.steps||[]).map((s, i) =>
        '<div class="brv-th-step">' +
          '<div class="brv-th-step-num">' + (i+1) + '</div>' +
          '<div class="brv-th-step-text">' + escH(s) + '</div>' +
        '</div>'
      ).join('');

      /* Temas relacionados */
      const relHTML = (t.related||[]).map(rid => {
        const rel = THEMES.find(x => x.id === rid);
        if (!rel) return '';
        return '<div class="brv-th-rel-chip" onclick="BRV.themes.openTheme(\'' + rid + '\')">' +
          rel.emoji + ' ' + escH(rel.name) +
        '</div>';
      }).join('');

      return '<div class="brv-th-hero">' +
          '<span class="brv-th-hero-emoji">' + t.emoji + '</span>' +
          '<div class="brv-th-hero-info">' +
            '<h1 class="brv-th-hero-name">' + escH(t.name) + '</h1>' +
            '<p class="brv-th-hero-sub">' + escH(t.sub) + '</p>' +
          '</div>' +
          '<div class="brv-th-hero-actions">' +
            '<button class="brv-th-btn primary" onclick="BRV.soul.openShareMenu(\'' + escH(t.id) + '\')">' +
              '📤 Compartir tema' +
            '</button>' +
            '<button class="brv-th-btn outline" onclick="BRV.router.go(\'search\')">' +
              '🔍 Buscar más versículos' +
            '</button>' +
          '</div>' +
        '</div>' +

        '<div class="brv-th-content">' +

          '<div class="brv-th-sec">' +
            '<div class="brv-th-sec-title">Reflexión Bíblica</div>' +
            '<p>' + escH(t.explanation) + '</p>' +
          '</div>' +

          '<div class="brv-th-sec">' +
            '<div class="brv-th-sec-title">Versículos para ti</div>' +
            '<div class="brv-th-verses">' + versesHTML + '</div>' +
          '</div>' +

          '<div class="brv-th-sec">' +
            '<div class="brv-th-sec-title">Reflexión</div>' +
            '<p>' + escH(t.reflection) + '</p>' +
          '</div>' +

          '<div class="brv-th-sec">' +
            '<div class="brv-th-sec-title">Aplicación Práctica</div>' +
            '<div class="brv-th-steps">' + stepsHTML + '</div>' +
          '</div>' +

          '<div class="brv-th-prayer">' +
            '<div class="brv-th-prayer-label">Oración Sugerida</div>' +
            '<p>' + escH(t.prayer) + '</p>' +
            '<button class="brv-th-prayer-btn" onclick="BRV.themes._copyPrayer(\'' + escH(t.id) + '\')">' +
              '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>' +
              'Copiar oración' +
            '</button>' +
          '</div>' +

          (relHTML ? '<div class="brv-th-sec">' +
            '<div class="brv-th-sec-title">Temas Relacionados</div>' +
            '<div class="brv-th-related">' + relHTML + '</div>' +
          '</div>' : '') +

        '</div>';
    }

    /* ── Acciones de versículo usando índice ── */
    function _copyVerse(idx, tid) {
      const t = THEMES.find(x => x.id === tid);
      if (!t) return;
      const v = t.verses[idx];
      if (!v) return;
      navigator.clipboard.writeText('"' + v.text + '" — ' + v.ref)
        .then(() => BRV.ui.toast('📋 Versículo copiado', 'success'))
        .catch(() => BRV.ui.toast('No se pudo copiar'));
    }

    function _projVerse(idx, tid) {
      const t = THEMES.find(x => x.id === tid);
      if (!t) return;
      const v = t.verses[idx];
      if (!v) return;
      BRV.storage.set('projVerse', { ref: v.ref, text: v.text });
      BRV.ui.toast('📽 Listo para proyectar — ve a Proyección');
    }

    function _favVerse(idx, tid) {
      const t = THEMES.find(x => x.id === tid);
      if (!t) return;
      const v = t.verses[idx];
      if (!v) return;
      const favs = BRV.storage.get('favorites', []);
      if (favs.find(f => f.ref === v.ref)) { BRV.ui.toast('Ya está en favoritos'); return; }
      favs.unshift({ ref: v.ref, text: v.text, date: new Date().toLocaleDateString('es') });
      BRV.storage.set('favorites', favs);
      BRV.ui.toast('⭐ Guardado en favoritos', 'success');
    }

    function _copyPrayer(tid) {
      const t = THEMES.find(x => x.id === tid);
      if (!t) return;
      navigator.clipboard.writeText(t.prayer)
        .then(() => BRV.ui.toast('🙏 Oración copiada', 'success'))
        .catch(() => BRV.ui.toast('No se pudo copiar'));
    }

    /* ── Hook de router ── */
    BRV.router.hooks['themes'] = function() {
      renderSidebar();
      renderGrid();
      const last = BRV.storage.get('lastTheme', null);
      if (last) openTheme(last);
    };

    function getThemeById(id) { return THEMES.find(t => t.id === id) || null; }

    function init() { renderSidebar(); renderFilterChips(); renderGrid(); }

    return {
      openTheme, showGrid,
      _copyVerse, _projVerse, _favVerse, _copyPrayer,
      _setFilter, _onSearch,
      getThemeById,
      init,
    };
  })();

  /* init coordinado al final */

  /* ══════════════════════════════════════════════════════════════
     MÓDULO — PALABRA DEL ALMA (compartir con fondos del sistema)
  ══════════════════════════════════════════════════════════════ */
  /* ══════════════════════════════════════════════════════════════
     MÓDULO — PALABRA DEL ALMA (compartir nativo: WhatsApp, Insta, etc.)
  ══════════════════════════════════════════════════════════════ */
  BRV.soul = (function() {

    /* ── Caché de imágenes de fondo precargadas, evita recargas asíncronas que rompen el gesto de usuario ── */
    const _bgImageCache = {};

    /* ── Logo del ministerio: precargado para uso síncrono en Canvas ── */
    const LOGO_BASE64 = "data:image/png;base64,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";
    let _logoImg = null;
    let _logoImgLoaded = false;
    function preloadLogo(onReady) {
      if (_logoImgLoaded && _logoImg) { if (onReady) onReady(_logoImg); return; }
      const img = new Image();
      img.onload = function() {
        _logoImg = img;
        _logoImgLoaded = true;
        if (onReady) onReady(img);
      };
      img.onerror = function() {
        if (onReady) onReady(null);
      };
      img.src = LOGO_BASE64;
    }
    function drawLogo(ctx, W, topY, targetWidthRatio) {
      if (!_logoImg || !_logoImgLoaded) return topY;
      const logoW = W * (targetWidthRatio || 0.22);
      const logoH = logoW * (_logoImg.naturalHeight / _logoImg.naturalWidth);
      ctx.drawImage(_logoImg, (W - logoW) / 2, topY, logoW, logoH);
      return topY + logoH;
    }

    /* ── Construye el texto a compartir según el tipo ── */
    function buildText(themeId, verseIdx, type) {
      const t = BRV.themes.getThemeById(themeId);
      if (!t) return null;
      if (type === 'oracion') {
        return {
          title: '🙏 Oración — ' + t.name,
          body: t.prayer + '\n\n— Biblia RV1960',
        };
      }
      /* versiculo */
      const v = t.verses[verseIdx] || t.verses[0];
      return {
        title: '✦ Palabra para hoy',
        body: '"' + v.text + '"\n\n— ' + v.ref + ' (RV1960)\n\n' +
              'Para el momento de ' + t.name.toLowerCase() + '. Si alguien necesita esto hoy, compártelo. 🙏',
      };
    }

    /* ── Fallback universal de copiado: funciona incluso en file:// ── */
    function copyFallback(text) {
      try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        ta.style.top = '0';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(ta);
        return ok;
      } catch (e) {
        return false;
      }
    }

    /* ── Compartir como texto: usa el menú nativo del teléfono ── */
    function shareText(themeId, verseIdx, type) {
      try {
        const content = buildText(themeId, verseIdx, type);
        if (!content) { BRV.ui.toast('No se encontró el contenido a compartir'); return; }

        if (navigator.share) {
          navigator.share({ title: content.title, text: content.body })
            .catch(function(err) {
              if (err && err.name !== 'AbortError') {
                const ok = copyFallback(content.body);
                BRV.ui.toast(ok ? '📋 Copiado — pégalo donde quieras' : 'No se pudo compartir ni copiar');
              }
            });
          return;
        }

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(content.body)
            .then(() => BRV.ui.toast('📋 Copiado — pégalo donde quieras', 'success'))
            .catch(() => {
              const ok = copyFallback(content.body);
              BRV.ui.toast(ok ? '📋 Copiado — pégalo donde quieras' : 'No se pudo copiar. Mantén presionado el texto del versículo para copiarlo manualmente.');
            });
        } else {
          const ok = copyFallback(content.body);
          BRV.ui.toast(ok ? '📋 Copiado — pégalo donde quieras' : 'No se pudo copiar. Mantén presionado el texto del versículo para copiarlo manualmente.');
        }
      } catch (err) {
        BRV.ui.toast('Error al compartir: ' + (err && err.message ? err.message : 'desconocido'));
      }
    }

    /* ── Compartir como imagen: genera con Canvas usando el fondo activo y comparte el archivo ── */
    function shareImage(themeId, verseIdx, type) {
      try {
        const content = buildText(themeId, verseIdx, type);
        if (!content) { BRV.ui.toast('No se encontró el contenido a compartir'); return; }

        const W = 1600, H = 1000; /* formato panorámico 16:10, amigable para feed y compartir */
        const activeBg = (BRV.backgrounds && BRV.backgrounds.getActiveBg) ? BRV.backgrounds.getActiveBg() : null;

        function buildCanvasAndShare(bgImg) {
          const canvas = document.createElement('canvas');
          canvas.width = W; canvas.height = H;
          const ctx = canvas.getContext('2d');
          if (!ctx) { BRV.ui.toast('Tu navegador no soporta generar imágenes'); return; }

          if (bgImg) {
            drawCoverImage(ctx, bgImg, W, H);
            ctx.fillStyle = 'rgba(8,10,16,0.58)';
            ctx.fillRect(0, 0, W, H);
          } else {
            drawGradient(ctx, W, H);
          }
          drawText(ctx, content, W, H);

          /* toDataURL es síncrono: evita perder el gesto de usuario antes de compartir */
          const dataUrl = canvas.toDataURL('image/png');
          const blob = dataUrlToBlob(dataUrl);
          const file = new File([blob], 'palabra-del-alma.png', { type: 'image/png' });

          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            navigator.share({ files: [file], title: content.title, text: content.body })
              .catch(function(err) {
                if (err && err.name !== 'AbortError') downloadBlob(blob);
              });
          } else {
            downloadBlob(blob);
          }
        }

        function downloadBlob(blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'palabra-del-alma.png';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          setTimeout(() => URL.revokeObjectURL(url), 1000);
          BRV.ui.toast('💾 Imagen descargada — ya puedes adjuntarla donde quieras', 'success');
        }

        if (activeBg && _bgImageCache[activeBg.id] && _bgImageCache[activeBg.id].complete) {
          /* Fondo ya precargado en caché: todo el flujo es síncrono, el gesto de usuario se preserva */
          if (_logoImgLoaded) {
            buildCanvasAndShare(_bgImageCache[activeBg.id]);
          } else {
            preloadLogo(function() { buildCanvasAndShare(_bgImageCache[activeBg.id]); });
          }
        } else if (activeBg) {
          /* Primera vez con este fondo: precarga y avisa que la próxima vez será instantáneo */
          BRV.ui.toast('🖼️ Preparando imagen...');
          const img = new Image();
          img.onload = function() {
            _bgImageCache[activeBg.id] = img;
            preloadLogo(function() { buildCanvasAndShare(img); });
          };
          img.onerror = function() {
            preloadLogo(function() { buildCanvasAndShare(null); });
          };
          img.src = activeBg.src;
        } else {
          if (_logoImgLoaded) {
            buildCanvasAndShare(null);
          } else {
            preloadLogo(function() { buildCanvasAndShare(null); });
          }
        }
      } catch (err) {
        BRV.ui.toast('Error al compartir imagen: ' + (err && err.message ? err.message : 'desconocido'));
      }
    }

    function dataUrlToBlob(dataUrl) {
      const parts = dataUrl.split(',');
      const mime = parts[0].match(/:(.*?);/)[1];
      const binary = atob(parts[1]);
      const arr = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) arr[i] = binary.charCodeAt(i);
      return new Blob([arr], { type: mime });
    }

    function drawGradient(ctx, W, H) {
      const grad = ctx.createLinearGradient(0, 0, W, H);
      grad.addColorStop(0, '#0B0E14');
      grad.addColorStop(0.5, '#1A2030');
      grad.addColorStop(1, '#2A1F0F');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);
    }

    function drawCoverImage(ctx, img, W, H) {
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = W / H;
      let sx, sy, sw, sh;
      if (imgRatio > canvasRatio) {
        sh = img.naturalHeight;
        sw = sh * canvasRatio;
        sy = 0;
        sx = (img.naturalWidth - sw) / 2;
      } else {
        sw = img.naturalWidth;
        sh = sw / canvasRatio;
        sx = 0;
        sy = (img.naturalHeight - sh) / 2;
      }
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, W, H);
    }

    function drawText(ctx, content, W, H) {
      const gold = '#D4AF5A';
      const white = '#F5F0E8';
      const fontDisplay = "'Georgia', 'Palatino Linotype', serif";
      const padX = W * 0.12;
      const maxWidth = W - padX * 2;

      ctx.textAlign = 'center';

      /* ── Tamaños (proporcionales a H, con jerarquía clara) ── */
      const sizeOrnament = Math.round(H * 0.032);
      const sizeTitle    = Math.round(H * 0.034);
      const sizeBody     = Math.round(H * 0.05);
      const sizeRef      = Math.round(H * 0.028);
      const sizeWatermark = Math.round(H * 0.02);

      const lhTitle = sizeTitle * 1.3;
      const lhBody  = sizeBody * 1.35;
      const lhRef   = sizeRef * 1.3;

      /* ── Medir altura total del bloque para centrarlo verticalmente ── */
      ctx.font = '400 ' + sizeBody + 'px ' + fontDisplay;
      const bodyLines = content.body.split('\n').filter(l => l.trim() !== '' && !l.startsWith('—'));
      const mainText = bodyLines[0] || content.body;
      const bodyLineCount = measureWrappedLines(ctx, mainText, maxWidth);

      const refLine = content.body.split('\n').find(l => l.trim().startsWith('—'));

      const gapOrnamentTitle = H * 0.05;
      const gapTitleBody = H * 0.08;
      const gapBodyRef = H * 0.11;

      const logoWidthRatio = 0.16;
      const logoW = W * logoWidthRatio;
      const logoH = (_logoImg && _logoImgLoaded) ? logoW * (_logoImg.naturalHeight / _logoImg.naturalWidth) : 0;
      const gapLogoOrnament = logoH > 0 ? H * 0.045 : 0;

      let totalHeight = logoH + gapLogoOrnament + sizeOrnament;
      totalHeight += gapOrnamentTitle;
      totalHeight += lhTitle;
      totalHeight += gapTitleBody;
      totalHeight += bodyLineCount * lhBody;
      if (refLine) {
        totalHeight += gapBodyRef;
        totalHeight += lhRef;
      }

      /* ── Punto de inicio: centra el bloque verticalmente en el lienzo ── */
      let cy = (H - totalHeight) / 2 + sizeOrnament * 0.8;

      /* Logo del ministerio (si está cargado) */
      let logoY = cy - sizeOrnament * 0.8;
      if (logoH > 0) {
        ctx.drawImage(_logoImg, (W - logoW) / 2, logoY, logoW, logoH);
        cy += logoH + gapLogoOrnament;
      }

      /* Ornamento superior */
      ctx.fillStyle = gold;
      ctx.font = '300 ' + sizeOrnament + 'px ' + fontDisplay;
      ctx.fillText('✦', W / 2, cy);
      cy += gapOrnamentTitle;

      /* Título */
      ctx.fillStyle = gold;
      ctx.font = '700 ' + sizeTitle + 'px ' + fontDisplay;
      ctx.fillText(content.title.toUpperCase(), W / 2, cy);
      cy += gapTitleBody;

      /* Cuerpo */
      ctx.fillStyle = white;
      ctx.font = '400 ' + sizeBody + 'px ' + fontDisplay;
      cy = wrapAndDraw(ctx, mainText, W / 2, cy, maxWidth, lhBody);

      /* Referencia / cierre (última línea con —) */
      if (refLine) {
        cy += gapBodyRef + sizeRef;
        ctx.fillStyle = gold;
        ctx.font = 'italic 400 ' + sizeRef + 'px ' + fontDisplay;
        wrapAndDraw(ctx, refLine.trim(), W / 2, cy, maxWidth, lhRef);
      }

      /* Marca de agua */
      ctx.fillStyle = 'rgba(212,175,90,0.7)';
      ctx.font = '600 ' + sizeWatermark + 'px ' + fontDisplay;
      ctx.fillText('✦ BIBLIA RV1960 ✦', W / 2, H * 0.94);
    }

    function wrapAndDraw(ctx, text, x, y, maxWidth, lineHeight) {
      const words = String(text).split(' ');
      let line = '';
      let curY = y;
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && n > 0) {
          ctx.fillText(line.trim(), x, curY);
          line = words[n] + ' ';
          curY += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line.trim(), x, curY);
      return curY;
    }

    /* ── Mide cuántas líneas ocupará un texto envuelto (sin dibujar) ── */
    function measureWrappedLines(ctx, text, maxWidth) {
      const words = String(text).split(' ');
      let line = '';
      let lines = 1;
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && n > 0) {
          lines++;
          line = words[n] + ' ';
        } else {
          line = testLine;
        }
      }
      return lines;
    }

    /* ── Parte un texto en líneas según un ancho máximo (sin dibujar) ── */
    function wrapToLines(ctx, text, maxWidth) {
      const words = String(text).split(' ');
      let line = '';
      const lines = [];
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && n > 0) {
          lines.push(line.trim());
          line = words[n] + ' ';
        } else {
          line = testLine;
        }
      }
      lines.push(line.trim());
      return lines;
    }

    /* ── Dibuja texto justificado (bordes parejos izq/der), última línea alineada normal ── */
    function drawJustifiedText(ctx, text, x, y, maxWidth, lineHeight) {
      const lines = wrapToLines(ctx, text, maxWidth);
      let curY = y;
      ctx.textAlign = 'left';
      lines.forEach((line, idx) => {
        const isLast = idx === lines.length - 1;
        const words = line.split(' ').filter(w => w.length);
        if (isLast || words.length === 1) {
          ctx.fillText(line, x, curY);
        } else {
          const lineWidth = ctx.measureText(line).width;
          const spaceWidth = (maxWidth - (lineWidth - (words.length - 1) * ctx.measureText(' ').width)) / (words.length - 1);
          let cx = x;
          words.forEach((w, i) => {
            ctx.fillText(w, cx, curY);
            cx += ctx.measureText(w).width + (i < words.length - 1 ? spaceWidth : 0);
          });
        }
        curY += lineHeight;
      });
      return curY;
    }

    /* ── Mide la altura que ocupará un bloque de texto justificado ── */
    function measureJustifiedHeight(ctx, text, maxWidth, lineHeight) {
      return measureWrappedLines(ctx, text, maxWidth) * lineHeight;
    }

    function roundRect(ctx, x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    }

    function downloadImgBlob(blob, themeId, suffix) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = (themeId || 'tema') + (suffix || '') + '.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

    /* ── Genera y dibuja el tema completo en un canvas con el ancho dado ── */
    function renderFullThemeCanvas(t, W) {
      const gold = '#D4AF5A';
      const white = '#F5F0E8';
      const fontDisplay = "'Georgia', 'Palatino Linotype', serif";

      const isNarrow = W <= 500;
      const padX = isNarrow ? W * 0.058 : W * 0.05;
      const maxWidth = W - padX * 2;

      const sizeTitle  = isNarrow ? Math.round(W * 0.058) : Math.round(W * 0.022);
      const sizeSub    = isNarrow ? Math.round(W * 0.032) : Math.round(W * 0.011);
      const sizeLabel  = isNarrow ? Math.round(W * 0.029) : Math.round(W * 0.0095);
      const sizeBody   = isNarrow ? Math.round(W * 0.034) : Math.round(W * 0.0108);
      const sizeVerseRef = isNarrow ? Math.round(W * 0.028) : Math.round(W * 0.0096);
      const sizeVerseText = isNarrow ? Math.round(W * 0.036) : Math.round(W * 0.0115);

      const lhBody = sizeBody * 1.55;
      const lhVerse = sizeVerseText * 1.5;

      const gapSection = isNarrow ? W * 0.05 : W * 0.018;
      const gapVerseBlock = isNarrow ? W * 0.038 : W * 0.013;
      const gapStep = isNarrow ? W * 0.026 : W * 0.008;

      const measureCanvas = document.createElement('canvas');
      measureCanvas.width = W;
      measureCanvas.height = 100;
      const mctx = measureCanvas.getContext('2d');

      const logoWidthRatio = isNarrow ? 0.32 : 0.13;
      const logoW = W * logoWidthRatio;
      const logoH = (_logoImg && _logoImgLoaded) ? logoW * (_logoImg.naturalHeight / _logoImg.naturalWidth) : 0;
      const gapLogoTitle = logoH > 0 ? (isNarrow ? W * 0.04 : W * 0.018) : 0;

      let y = isNarrow ? W * 0.065 : W * 0.035;
      y += logoH + gapLogoTitle;
      y += sizeTitle * 1.15;
      y += sizeTitle * 1.05;
      y += sizeSub * 1.6;
      y += gapSection;

      mctx.font = '400 ' + sizeBody + 'px ' + fontDisplay;
      y += sizeLabel * 1.5;
      y += measureJustifiedHeight(mctx, t.explanation, maxWidth, lhBody);
      y += gapSection;

      y += sizeLabel * 1.5;
      t.verses.forEach(v => {
        y += sizeVerseRef * 1.4;
        mctx.font = 'italic 400 ' + sizeVerseText + 'px ' + fontDisplay;
        const lines = measureWrappedLines(mctx, v.text, maxWidth - padX * 0.5);
        y += lines * lhVerse;
        y += gapVerseBlock;
      });
      y += gapSection - gapVerseBlock;

      mctx.font = '400 ' + sizeBody + 'px ' + fontDisplay;
      y += sizeLabel * 1.5;
      y += measureJustifiedHeight(mctx, t.reflection, maxWidth, lhBody);
      y += gapSection;

      y += sizeLabel * 1.5;
      t.steps.forEach((s, idx) => {
        mctx.font = '400 ' + sizeBody + 'px ' + fontDisplay;
        const lines = measureWrappedLines(mctx, (idx + 1) + '. ' + s, maxWidth);
        y += lines * lhBody + gapStep;
      });
      y += gapSection - gapStep;

      const boxPad = isNarrow ? W * 0.045 : W * 0.016;
      y += sizeLabel * 1.5;
      mctx.font = 'italic 400 ' + sizeBody + 'px ' + fontDisplay;
      const prayerInnerWidth = maxWidth - boxPad * 2;
      const prayerLines = measureWrappedLines(mctx, t.prayer, prayerInnerWidth);
      y += prayerLines * lhBody + boxPad * 2;
      y += gapSection;

      y += isNarrow ? W * 0.05 : W * 0.018;

      const H = Math.ceil(y);

      const canvas = document.createElement('canvas');
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      ctx.fillStyle = '#0B0E14';
      ctx.fillRect(0, 0, W, H);

      let cy = isNarrow ? W * 0.065 : W * 0.035;

      if (logoH > 0) {
        ctx.drawImage(_logoImg, (W - logoW) / 2, cy, logoW, logoH);
        cy += logoH + gapLogoTitle;
      }

      ctx.textAlign = 'center';
      ctx.fillStyle = gold;
      ctx.font = '400 ' + sizeTitle + 'px ' + fontDisplay;
      ctx.fillText(t.emoji, W / 2, cy + sizeTitle * 0.8);
      cy += sizeTitle * 1.15;

      ctx.fillStyle = white;
      ctx.font = '400 ' + sizeTitle + 'px ' + fontDisplay;
      ctx.fillText(t.name, W / 2, cy + sizeTitle * 0.8);
      cy += sizeTitle * 1.05;

      ctx.fillStyle = gold;
      ctx.font = 'italic 400 ' + sizeSub + 'px ' + fontDisplay;
      ctx.fillText(t.sub, W / 2, cy + sizeSub * 0.8);
      cy += sizeSub * 1.6 + gapSection;

      ctx.textAlign = 'left';
      const leftX = padX;

      function drawLabel(label) {
        ctx.fillStyle = gold;
        ctx.font = '700 ' + sizeLabel + 'px ' + fontDisplay;
        ctx.fillText(label, leftX, cy + sizeLabel * 0.8);
        cy += sizeLabel * 1.5;
      }

      drawLabel('✦ REFLEXIÓN BÍBLICA');
      ctx.fillStyle = white;
      ctx.font = '400 ' + sizeBody + 'px ' + fontDisplay;
      cy = drawJustifiedText(ctx, t.explanation, leftX, cy + sizeBody * 0.8, maxWidth, lhBody) - sizeBody * 0.8 + lhBody;
      cy += gapSection - lhBody + sizeBody * 0.8;

      drawLabel('✦ VERSÍCULOS PARA TI');
      t.verses.forEach(v => {
        const barTop = cy;
        ctx.fillStyle = gold;
        ctx.font = '700 ' + sizeVerseRef + 'px ' + fontDisplay;
        ctx.fillText(v.ref, leftX + padX * 0.5, cy + sizeVerseRef * 0.8);
        cy += sizeVerseRef * 1.4;

        ctx.fillStyle = white;
        ctx.font = 'italic 400 ' + sizeVerseText + 'px ' + fontDisplay;
        const quoteText = '"' + v.text + '"';
        const lines = wrapToLines(ctx, quoteText, maxWidth - padX * 0.5);
        lines.forEach(line => {
          ctx.fillText(line, leftX + padX * 0.5, cy + sizeVerseText * 0.8);
          cy += lhVerse;
        });

        ctx.fillStyle = 'rgba(212,175,90,0.6)';
        ctx.fillRect(leftX, barTop, 3, cy - barTop - (gapVerseBlock * 0.3));
        cy += gapVerseBlock;
      });
      cy += gapSection - gapVerseBlock;

      drawLabel('✦ REFLEXIÓN');
      ctx.fillStyle = white;
      ctx.font = '400 ' + sizeBody + 'px ' + fontDisplay;
      cy = drawJustifiedText(ctx, t.reflection, leftX, cy + sizeBody * 0.8, maxWidth, lhBody) - sizeBody * 0.8 + lhBody;
      cy += gapSection - lhBody + sizeBody * 0.8;

      drawLabel('✦ PASOS PRÁCTICOS');
      ctx.fillStyle = white;
      ctx.font = '400 ' + sizeBody + 'px ' + fontDisplay;
      t.steps.forEach((s, idx) => {
        const lines = wrapToLines(ctx, (idx + 1) + '. ' + s, maxWidth);
        lines.forEach(line => {
          ctx.fillText(line, leftX, cy + sizeBody * 0.8);
          cy += lhBody;
        });
        cy += gapStep;
      });
      cy += gapSection - gapStep;

      drawLabel('🙏 ORACIÓN SUGERIDA');
      const boxTop = cy;
      ctx.fillStyle = white;
      ctx.font = 'italic 400 ' + sizeBody + 'px ' + fontDisplay;
      const prayerBottom = drawJustifiedText(ctx, t.prayer, leftX + boxPad, cy + boxPad + sizeBody * 0.8, prayerInnerWidth, lhBody) - sizeBody * 0.8 + boxPad;
      ctx.save();
      ctx.globalCompositeOperation = 'destination-over';
      ctx.fillStyle = 'rgba(212,175,90,0.08)';
      roundRect(ctx, leftX, boxTop, maxWidth, prayerBottom - boxTop, 10);
      ctx.fill();
      ctx.restore();
      cy = prayerBottom + gapSection;

      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(212,175,90,0.55)';
      ctx.font = '600 ' + Math.round(sizeLabel * 0.9) + 'px ' + fontDisplay;
      ctx.fillText('✦ BIBLIA RV1960 ✦', W / 2, cy + sizeLabel * 0.6);

      return canvas;
    }

    /* ── Compartir/descargar el tema completo: versión móvil (380px) ── */
    function shareFullImageMobile(themeId) {
      try {
        const t = BRV.themes.getThemeById(themeId);
        if (!t) { BRV.ui.toast('No se encontró el tema'); return; }

        function generate() {
          const canvas = renderFullThemeCanvas(t, 380);
          if (!canvas) { BRV.ui.toast('No se pudo generar la imagen'); return; }
          const blob = dataUrlToBlob(canvas.toDataURL('image/png'));
          const file = new File([blob], t.id + '-movil.png', { type: 'image/png' });
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            navigator.share({ files: [file], title: t.name, text: 'Tema completo: ' + t.name })
              .catch(function(err) {
                if (err && err.name !== 'AbortError') {
                  downloadImgBlob(blob, t.id, '-movil');
                  BRV.ui.toast('💾 Imagen descargada', 'success');
                }
              });
          } else {
            downloadImgBlob(blob, t.id, '-movil');
            BRV.ui.toast('💾 Imagen descargada', 'success');
          }
        }

        if (_logoImgLoaded) generate();
        else preloadLogo(generate);
      } catch (err) {
        BRV.ui.toast('Error al generar imagen: ' + (err && err.message ? err.message : 'desconocido'));
      }
    }

    /* ── Compartir/descargar el tema completo: versión escritorio (1400px) ── */
    function shareFullImageDesktop(themeId) {
      try {
        const t = BRV.themes.getThemeById(themeId);
        if (!t) { BRV.ui.toast('No se encontró el tema'); return; }

        function generate() {
          const canvas = renderFullThemeCanvas(t, 1400);
          if (!canvas) { BRV.ui.toast('No se pudo generar la imagen'); return; }
          const blob = dataUrlToBlob(canvas.toDataURL('image/png'));
          const file = new File([blob], t.id + '-escritorio.png', { type: 'image/png' });
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            navigator.share({ files: [file], title: t.name, text: 'Tema completo: ' + t.name })
              .catch(function(err) {
                if (err && err.name !== 'AbortError') {
                  downloadImgBlob(blob, t.id, '-escritorio');
                  BRV.ui.toast('💾 Imagen descargada', 'success');
                }
              });
          } else {
            downloadImgBlob(blob, t.id, '-escritorio');
            BRV.ui.toast('💾 Imagen descargada', 'success');
          }
        }

        if (_logoImgLoaded) generate();
        else preloadLogo(generate);
      } catch (err) {
        BRV.ui.toast('Error al generar imagen: ' + (err && err.message ? err.message : 'desconocido'));
      }
    }

    let _shareThemeId = null;

    function openShareMenu(themeId) {
      _shareThemeId = themeId;
      const overlay = document.getElementById('brv-share-overlay');
      if (overlay) overlay.classList.add('active');
    }

    function closeShareMenu() {
      const overlay = document.getElementById('brv-share-overlay');
      if (overlay) overlay.classList.remove('active');
    }

    function _shareFullImageMobileWrapped(themeId) {
      closeShareMenu();
      shareFullImageMobile(themeId);
    }

    function _shareFullImageDesktopWrapped(themeId) {
      closeShareMenu();
      shareFullImageDesktop(themeId);
    }

    return {
      shareText, shareImage,
      shareFullImageMobile: _shareFullImageMobileWrapped,
      shareFullImageDesktop: _shareFullImageDesktopWrapped,
      openShareMenu, closeShareMenu,
      get _shareThemeId() { return _shareThemeId; },
    };
  })();

  /* ══════════════════════════════════════════════════════════════
     MÓDULO 8 — FAVORITOS, HISTORIAL Y CONFIGURACIÓN
  ══════════════════════════════════════════════════════════════ */
  BRV.favorites = (function() {

    /* ── Estado ── */
    let state = {
      favs:        BRV.storage.get('favorites', []),
      collections: BRV.storage.get('collections', ['General']),
      activeCol:   BRV.storage.get('activeCol', 'General'),
      history:     BRV.storage.get('userHistory', []),
      sortDesc:    true,
      tab:         'favs',
    };

    function save() {
      BRV.storage.set('favorites',   state.favs);
      BRV.storage.set('collections', state.collections);
      BRV.storage.set('activeCol',   state.activeCol);
      BRV.storage.set('userHistory', state.history);
    }

    function escH(s) {
      return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
    }

    /* ════════════════════
       FAVORITOS
    ════════════════════ */
    function addFavorite(ref, text, collection) {
      state.favs = BRV.storage.get('favorites', []);
      if (state.favs.find(f => f.ref === ref)) { BRV.ui.toast('Ya está en favoritos'); return; }
      const col = collection || state.activeCol || 'General';
      state.favs.unshift({
        ref, text,
        col,
        date: new Date().toLocaleDateString('es'),
        ts: Date.now(),
      });
      save();
      BRV.ui.toast('⭐ Guardado en favoritos', 'success');
    }

    function removeFavorite(ref) {
      state.favs = state.favs.filter(f => f.ref !== ref);
      save();
      renderFavs();
    }

    function moveToCollection(ref, col) {
      const fav = state.favs.find(f => f.ref === ref);
      if (fav) { fav.col = col; save(); renderFavs(); }
    }

    function sortFavorites() {
      state.sortDesc = !state.sortDesc;
      const btn = document.getElementById('brv-sort-btn');
      if (btn) btn.textContent = '↕ ' + (state.sortDesc ? 'Más recientes' : 'Más antiguos');
      renderFavs();
    }

    function getFilteredFavs() {
      let favs = state.activeCol === '__all__'
        ? state.favs
        : state.favs.filter(f => (f.col || 'General') === state.activeCol);
      if (!state.sortDesc) favs = [...favs].reverse();
      return favs;
    }

    /* ── Render colecciones ── */
    function renderCollections() {
      const el = document.getElementById('brv-fav-collections');
      if (!el) return;
      const allCount = state.favs.length;
      let html = '<div class="brv-fav-coll-btn' + (state.activeCol === '__all__' ? ' active' : '') + '"' +
        ' onclick="BRV.favorites.setCollection(\'__all__\')">' +
        '<span>⭐ Todos</span>' +
        '<span class="brv-fav-coll-count">' + allCount + '</span>' +
        '</div>';
      state.collections.forEach(col => {
        const count = state.favs.filter(f => (f.col||'General') === col).length;
        html += '<div class="brv-fav-coll-btn' + (state.activeCol === col ? ' active' : '') + '"' +
          ' onclick="BRV.favorites.setCollection(\'' + escH(col) + '\')">' +
          '<span>' + escH(col) + '</span>' +
          '<span class="brv-fav-coll-count">' + count + '</span>' +
          '</div>';
      });
      el.innerHTML = html;
    }

    function setCollection(col) {
      state.activeCol = col;
      BRV.storage.set('activeCol', col);
      const titleEl = document.getElementById('brv-fav-title');
      if (titleEl) titleEl.textContent = col === '__all__' ? 'Todos los favoritos' : col;
      renderCollections();
      renderFavs();
    }

    function newCollection() {
      const name = prompt('Nombre de la nueva colección:');
      if (!name || !name.trim()) return;
      const trimmed = name.trim();
      if (state.collections.includes(trimmed)) { BRV.ui.toast('Ya existe esa colección'); return; }
      state.collections.push(trimmed);
      save();
      setCollection(trimmed);
    }

    function clearCollection() {
      const col = state.activeCol;
      const count = col === '__all__' ? state.favs.length : state.favs.filter(f => (f.col||'General') === col).length;
      if (!count) { BRV.ui.toast('No hay versículos que limpiar'); return; }
      if (!confirm('¿Eliminar ' + count + ' versículo(s) de ' + (col === '__all__' ? 'todos los favoritos' : '"' + col + '"') + '?')) return;
      if (col === '__all__') {
        state.favs = [];
      } else {
        state.favs = state.favs.filter(f => (f.col||'General') !== col);
      }
      save();
      renderCollections();
      renderFavs();
      BRV.ui.toast('Favoritos eliminados');
    }

    /* ── Render lista de favoritos ── */
    function renderFavs() {
      state.favs   = BRV.storage.get('favorites', []);
      state.collections = BRV.storage.get('collections', ['General']);
      const list   = document.getElementById('brv-fav-list');
      const countEl= document.getElementById('brv-fav-count');
      if (!list) return;
      renderCollections();
      const favs = getFilteredFavs();
      if (countEl) countEl.textContent = favs.length + ' versículo' + (favs.length !== 1 ? 's' : '');

      if (!favs.length) {
        list.innerHTML = '';
        list.style.display = 'block';
        list.innerHTML = '<div class="brv-fav-empty">' +
          '<div class="brv-fav-empty-icon">⭐</div>' +
          '<h3>Sin favoritos aún</h3>' +
          '<p>Guarda versículos desde el Lector, el Buscador o los Temas pulsando el ícono ★.</p>' +
          '<button class="brv-fav-empty-btn" onclick="BRV.router.go(\'reader\')">📖 Ir al Lector</button>' +
          '</div>';
        return;
      }

      /* Agrega col-options para selector */
      const colOptions = state.collections.map(c =>
        '<option value="' + escH(c) + '">' + escH(c) + '</option>'
      ).join('');

      list.innerHTML = favs.map((f, i) => {
        const actualIdx = state.favs.findIndex(x => x.ref === f.ref);
        return '<div class="brv-fav-card" id="brv-fc-' + i + '">' +
          '<div class="brv-fav-card-header">' +
            '<span class="brv-fav-ref">' + escH(f.ref) + '</span>' +
            '<span class="brv-fav-date">' + escH(f.date||'') + '</span>' +
          '</div>' +
          '<div class="brv-fav-text">"' + escH(f.text) + '"</div>' +
          '<div class="brv-fav-actions">' +
            '<button class="brv-fav-act" onclick="BRV.favorites._copy(' + actualIdx + ')">📋 Copiar</button>' +
            '<button class="brv-fav-act" onclick="BRV.favorites._proj(' + actualIdx + ')">📽 Proyectar</button>' +
            '<button class="brv-fav-act" onclick="BRV.favorites._read(' + actualIdx + ')">📖 Leer</button>' +
            '<select class="brv-fav-coll-select" onchange="BRV.favorites.moveToCollection(\'' + escH(f.ref) + '\',this.value)">' +
              colOptions.replace('value="' + escH(f.col||'General') + '"', 'value="' + escH(f.col||'General') + '" selected') +
            '</select>' +
            '<button class="brv-fav-del" onclick="BRV.favorites.removeFavorite(\'' + escH(f.ref) + '\')">✕ Quitar</button>' +
          '</div>' +
        '</div>';
      }).join('');
    }

    /* ── Acciones por índice ── */
    function _copy(idx) {
      const f = state.favs[idx];
      if (!f) return;
      navigator.clipboard.writeText('"' + f.text + '" — ' + f.ref)
        .then(() => BRV.ui.toast('📋 Copiado', 'success'))
        .catch(() => BRV.ui.toast('No se pudo copiar'));
    }

    function _proj(idx) {
      const f = state.favs[idx];
      if (!f) return;
      BRV.storage.set('projVerse', { ref: f.ref, text: f.text });
      BRV.router.go('projection');
    }

    function _read(idx) {
      const f = state.favs[idx];
      if (!f) return;
      const m = f.ref.match(/^(.+?)\s+(\d+):\d+$/);
      if (!m) { BRV.router.go('reader'); return; }
      const bookName = m[1]; const chapter = parseInt(m[2]);
      BRV.router.go('reader');
      const books = BRV.reader ? BRV.reader.getBooks() : [];
      const book  = books.find(b => b.name.toLowerCase() === bookName.toLowerCase() || b.abbr.toLowerCase() === bookName.toLowerCase());
      if (book) {
        setTimeout(() => {
          BRV.reader.selectBook(book.id);
          setTimeout(() => BRV.reader.selectChapter(chapter), 80);
        }, 60);
      }
    }

    /* ── Exportar favoritos ── */
    function exportFavorites() {
      state.favs = BRV.storage.get('favorites', []);
      if (!state.favs.length) { BRV.ui.toast('No hay favoritos para exportar', 'warn'); return; }
      const lines = ['BIBLIA REINA VALERA 1960 — MIS FAVORITOS', '=' .repeat(50), ''];
      const cols  = {};
      state.favs.forEach(f => {
        const col = f.col || 'General';
        if (!cols[col]) cols[col] = [];
        cols[col].push(f);
      });
      Object.entries(cols).forEach(([col, favs]) => {
        lines.push('[ ' + col.toUpperCase() + ' ]');
        lines.push('');
        favs.forEach(f => {
          lines.push(f.ref);
          lines.push('"' + f.text + '"');
          lines.push('');
        });
        lines.push('');
      });
      lines.push('Exportado el ' + new Date().toLocaleDateString('es'));
      const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href = url; a.download = 'mis-favoritos-brv1960.txt'; a.click();
      URL.revokeObjectURL(url);
      BRV.ui.toast('✅ Favoritos exportados', 'success');
    }

    /* ════════════════════
       HISTORIAL
    ════════════════════ */
    function addHistory(label, icon, action) {
      state.history = BRV.storage.get('userHistory', []);
      state.history = state.history.filter(h => h.label !== label);
      state.history.unshift({
        label, icon: icon || '📖',
        action: action || null,
        time: new Date().toLocaleTimeString('es', { hour:'2-digit', minute:'2-digit' }),
        date: new Date().toLocaleDateString('es'),
        ts: Date.now(),
      });
      if (state.history.length > 80) state.history = state.history.slice(0, 80);
      BRV.storage.set('userHistory', state.history);
    }

    function clearHistory() {
      if (!confirm('¿Limpiar todo el historial?')) return;
      state.history = [];
      BRV.storage.set('userHistory', []);
      renderHistory();
    }

    function renderHistory() {
      state.history = BRV.storage.get('userHistory', []);
      const el      = document.getElementById('brv-hist-list');
      const countEl = document.getElementById('brv-hist-count');
      if (!el) return;
      if (countEl) countEl.textContent = state.history.length + ' entradas en el historial';

      if (!state.history.length) {
        el.innerHTML = '<div style="padding:60px 24px;text-align:center;">' +
          '<div style="font-size:48px;opacity:.15;margin-bottom:14px;">🕐</div>' +
          '<h3 style="font-size:18px;color:var(--brv-text-2);font-weight:400;">Sin historial</h3>' +
          '<p style="font-size:13px;color:var(--brv-text-2);opacity:.65;margin-top:8px;">Tu actividad de lectura y búsqueda aparecerá aquí.</p>' +
          '</div>';
        return;
      }

      /* Agrupar por fecha */
      const groups = {};
      state.history.forEach(h => {
        const key = h.date || 'Hoy';
        if (!groups[key]) groups[key] = [];
        groups[key].push(h);
      });

      el.innerHTML = Object.entries(groups).slice(0, 10).map(([date, items]) =>
        '<div class="brv-hist-section">' +
          '<div class="brv-hist-section-title">' + escH(date) + '</div>' +
          items.map((h, i) =>
            '<div class="brv-hist-item" onclick="BRV.favorites._histAction(' + JSON.stringify(i) + ',\'' + escH(date) + '\')">' +
              '<div class="brv-hist-icon">' + (h.icon||'📖') + '</div>' +
              '<div class="brv-hist-body">' +
                '<div class="brv-hist-label">' + escH(h.label) + '</div>' +
                '<div class="brv-hist-meta">' + escH(h.time||'') + '</div>' +
              '</div>' +
              '<span class="brv-hist-arrow">›</span>' +
            '</div>'
          ).join('') +
        '</div>'
      ).join('');
    }

    function _histAction(i, date) {
      const group = state.history.filter(h => (h.date||'Hoy') === date);
      const item  = group[i];
      if (!item) return;
      /* Navegar según el tipo de entrada */
      if (item.label.startsWith('Búsqueda:')) {
        const q = item.label.replace('Búsqueda: ', '');
        BRV.router.go('search');
        setTimeout(() => {
          const inp = document.getElementById('brv-search-input');
          if (inp) { inp.value = q; BRV.search.onInput(q); }
        }, 80);
      } else if (item.label.startsWith('Resumen:')) {
        BRV.router.go('summaries');
      } else if (item.label.startsWith('Tema:')) {
        BRV.router.go('themes');
      } else {
        BRV.router.go('reader');
      }
    }

    /* ════════════════════
       TABS
    ════════════════════ */
    function showTab(tab, btn) {
      state.tab = tab;
      document.querySelectorAll('.brv-fav-tab').forEach(b => b.classList.toggle('active', b === btn));
      const favsEl = document.getElementById('brv-favs-panel');
      const histEl = document.getElementById('brv-hist-panel');
      if (favsEl) favsEl.style.display = tab === 'favs' ? '' : 'none';
      if (histEl) histEl.style.display = tab === 'hist' ? '' : 'none';
      if (tab === 'favs') renderFavs();
      else renderHistory();
    }

    /* ── Hooks de router ── */
    BRV.router.hooks['favorites'] = function() {
      state.favs        = BRV.storage.get('favorites', []);
      state.collections = BRV.storage.get('collections', ['General']);
      state.history     = BRV.storage.get('userHistory', []);
      renderFavs();
    };
    BRV.router.hooks['settings'] = function() {
      BRV.config.syncUI();
    };

    function init() {
      state.favs        = BRV.storage.get('favorites', []);
      state.collections = BRV.storage.get('collections', ['General']);
      state.history     = BRV.storage.get('userHistory', []);
    }

    return {
      addFavorite, removeFavorite, moveToCollection,
      sortFavorites, setCollection, newCollection, clearCollection,
      exportFavorites,
      addHistory, clearHistory,
      showTab, renderFavs, renderHistory,
      _copy, _proj, _read, _histAction,
      init,
    };
  })();

  /* ══════════════════════════════════════════════════════════════
     CONFIGURACIÓN
  ══════════════════════════════════════════════════════════════ */
  BRV.config = (function() {

    const ACCENTS = {
      gold:   {g:'#C9A84C', gl:'#E8CB7A', gd:'#8B6914'},
      blue:   {g:'#4A9EFF', gl:'#7BBFFF', gd:'#2266CC'},
      green:  {g:'#2ECC71', gl:'#58D68D', gd:'#1E8449'},
      red:    {g:'#E74C3C', gl:'#EC7063', gd:'#922B21'},
      purple: {g:'#9B59B6', gl:'#B07FCC', gd:'#6C3483'},
    };

    let cfg = BRV.storage.get('appConfig', {
      darkMode:    true,
      fontSize:    'md',
      fontFamily:  'display',
      accent:      'gold',
      showNums:    true,
      doubleSpace: false,
      savePos:     true,
    });

    function apply() {
      /* Tema */
      if (cfg.darkMode) {
        document.documentElement.removeAttribute('data-theme');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
      }
      /* Fuente del lector */
      const scroll = document.getElementById('brv-verses-scroll');
      if (scroll) {
        scroll.className = scroll.className.replace(/brv-fs-[a-z]+/g, '').trim();
        scroll.classList.add('brv-fs-' + cfg.fontSize);
      }
      /* Familia de fuente */
      const FONTS = {
        display:'Palatino Linotype,Book Antiqua,Palatino,Georgia,serif',
        serif:'Georgia,Times New Roman,serif',
        sans:'Segoe UI,system-ui,-apple-system,sans-serif',
      };
      document.documentElement.style.setProperty('--brv-font-serif', FONTS[cfg.fontFamily] || FONTS.display);
      /* Acento */
      const a = ACCENTS[cfg.accent] || ACCENTS.gold;
      document.documentElement.style.setProperty('--brv-gold',       a.g);
      document.documentElement.style.setProperty('--brv-gold-light', a.gl);
      document.documentElement.style.setProperty('--brv-gold-dark',  a.gd);
      /* Números de versículo */
      document.querySelectorAll('.v-num, .brv-verse-num').forEach(el => {
        el.style.display = cfg.showNums ? '' : 'none';
      });
      /* Doble espacio */
      document.querySelectorAll('.brv-verse').forEach(el => {
        el.style.marginBottom = cfg.doubleSpace ? '14px' : '';
      });
      BRV.storage.set('appConfig', cfg);
    }

    function syncUI() {
      const dm = document.getElementById('cfg-dark-mode');
      if (dm) dm.checked = cfg.darkMode;
      document.querySelectorAll('.brv-cfg-font-btn').forEach(b => {
        const sz = b.getAttribute('onclick').match(/setFontSize.'([a-z]+)'/);
        if (sz) b.classList.toggle('active', sz[1] === cfg.fontSize);
      });
      const ff = document.getElementById('cfg-font-family');
      if (ff) ff.value = cfg.fontFamily;
      document.querySelectorAll('[data-accent]').forEach(el => {
        el.classList.toggle('active', el.dataset.accent === cfg.accent);
      });
      const sn = document.getElementById('cfg-show-nums');
      if (sn) sn.checked = cfg.showNums;
      const ds = document.getElementById('cfg-double-space');
      if (ds) ds.checked = cfg.doubleSpace;
      const sp = document.getElementById('cfg-save-pos');
      if (sp) sp.checked = cfg.savePos;
    }

    function setDarkMode(v)    { cfg.darkMode    = v; apply(); }
    function setFontSize(v, b) {
      cfg.fontSize = v;
      document.querySelectorAll('.brv-cfg-font-btn').forEach(btn => btn.classList.remove('active'));
      if (b) b.classList.add('active');
      /* También actualiza el reader */
      document.querySelectorAll('.brv-fs-btn').forEach(btn => {
        const m = (btn.getAttribute('onclick')||'').match(/setFontSize.'([a-z]+)'/);
        if (m) btn.classList.toggle('active', m[1] === v);
      });
      apply();
    }
    function setFontFamily(v)  { cfg.fontFamily  = v; apply(); }
    function setAccent(v, el)  {
      cfg.accent = v;
      document.querySelectorAll('[data-accent]').forEach(e => e.classList.toggle('active', e === el));
      apply();
    }
    function setShowNums(v)    { cfg.showNums    = v; apply(); }
    function setDoubleSpace(v) { cfg.doubleSpace = v; apply(); }
    function setSavePos(v)     { cfg.savePos     = v; BRV.storage.set('appConfig', cfg); }

    function reset() {
      if (!confirm('¿Restaurar toda la configuración a los valores predeterminados?')) return;
      cfg = { darkMode:true, fontSize:'md', fontFamily:'display', accent:'gold', showNums:true, doubleSpace:false, savePos:true };
      apply();
      syncUI();
      BRV.ui.toast('Configuración restaurada');
    }

    /* Aplica al cargar */
    /* init coordinado al final */

    return { setDarkMode, setFontSize, setFontFamily, setAccent, setShowNums, setDoubleSpace, setSavePos, reset, syncUI, apply };
  })();

  /* ══════════════════════════════════════════════════════════════
     MÓDULO 9 — PERSONAJES DE LA BIBLIA
     Fichas completas + nombres clicables dentro del texto bíblico.
     Datos en <script id="brv-personajes-data"> (JSON, escalable).
     No modifica otros módulos: la capa "linkify" observa el lector
     desde fuera mediante MutationObserver.
  ══════════════════════════════════════════════════════════════ */
  BRV.personajes = (function() {

    /* ── Carga de datos ── */
    var DATA = [];
    try {
      var raw = document.getElementById('brv-personajes-data');
      if (raw) DATA = JSON.parse(raw.textContent);
    } catch (e) { console.warn('Personajes: error cargando datos', e); DATA = []; }

    var state = { testament: 'ALL', query: '', activeId: null };

    /* Etiquetas de grupo */
    var GROUP_LABELS = {
      jesus: 'Jesucristo',
      patriarcas: 'Patriarcas y Antepasados',
      jueces: 'Jueces y Libertadores',
      reyes: 'Reyes y Gobernantes',
      prof_hist: 'Profetas Históricos',
      prof_may: 'Profetas Mayores',
      prof_men: 'Profetas Menores',
      mujeres: 'Mujeres de Fe',
      exilio: 'Exilio y Restauración',
      familia_jesus: 'Familia y Entorno de Jesús',
      apostoles: 'Apóstoles y Discípulos',
      companeros: 'Compañeros y Aliados Clave',
      antagonistas: 'Antagonistas y Opositores',
      espirituales: 'Seres Espirituales'
    };
    var GROUP_ORDER = ['jesus','patriarcas','jueces','reyes','prof_hist','prof_may','prof_men','mujeres','exilio','familia_jesus','apostoles','companeros','antagonistas','espirituales'];

    /* ── Índice para búsqueda y linkify ── */
    var byId = {};
    var aliasIndex = [];   /* [{alias, norm, id, len}] ordenado por longitud desc */
    function norm(s) {
      return (BRV.bible && BRV.bible.norm) ? BRV.bible.norm(s)
        : String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    }
    function buildIndex() {
      byId = {}; aliasIndex = [];
      DATA.forEach(function(c) {
        byId[c.id] = c;
        /* noLink: el personaje aparece en directorio/búsqueda, pero su nombre
           NO se subraya en el texto bíblico (evita falsos positivos como tribus) */
        if (c.noLink) return;
        var names = (c.aliases && c.aliases.length) ? c.aliases.slice() : [c.name];
        if (names.indexOf(c.name) === -1) names.push(c.name);
        names.forEach(function(a) {
          aliasIndex.push({ alias: a, norm: norm(a), id: c.id, len: a.length });
        });
      });
      /* Más largos primero, para que "Juan el Bautista" gane a "Juan" */
      aliasIndex.sort(function(a,b){ return b.len - a.len; });
    }

    /* ── Helpers ── */
    function escH(s) {
      return String(s == null ? '' : s)
        .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
        .replace(/"/g,'&quot;');
    }
    function avatarText(name) {
      var clean = name.replace(/\(.*?\)/g,'').trim();
      return clean.charAt(0).toUpperCase();
    }

    /* ── SIDEBAR ── */
    function getFiltered() {
      var q = norm(state.query);
      return DATA.filter(function(c) {
        if (state.testament !== 'ALL' && c.testament !== state.testament) return false;
        if (q) {
          var hay = norm(c.name + ' ' + (c.aliases||[]).join(' ') + ' ' + (c.meaning||''));
          if (hay.indexOf(q) === -1) return false;
        }
        return true;
      });
    }

    function renderList() {
      var list = document.getElementById('brv-char-list');
      if (!list) return;
      var items = getFiltered();
      var info = document.getElementById('brv-char-header-info');
      if (info) info.textContent = items.length + ' personaje' + (items.length===1?'':'s');

      if (!items.length) {
        list.innerHTML = '<div class="brv-char-list-empty">No se encontraron personajes.<br>Prueba con otro nombre.</div>';
        return;
      }
      /* Agrupar */
      var groups = {};
      items.forEach(function(c){ (groups[c.group] = groups[c.group] || []).push(c); });
      var html = '';
      var orderedKeys = GROUP_ORDER.filter(function(g){ return groups[g]; })
        .concat(Object.keys(groups).filter(function(g){ return GROUP_ORDER.indexOf(g)===-1; }));
      orderedKeys.forEach(function(g) {
        html += '<div class="brv-char-group-label">' + escH(GROUP_LABELS[g] || g) +
          '<span class="brv-char-group-count">' + groups[g].length + '</span></div>';
        groups[g].forEach(function(c) {
          var active = c.id === state.activeId ? ' active' : '';
          var mini = '';
          for (var k=0;k<(c.importance||3);k++) mini += '\u2605';
          html += '<div class="brv-char-item' + active + '" onclick="BRV.personajes.open(\'' + c.id + '\')">' +
            '<div class="brv-char-item-avatar">' + escH(avatarText(c.name)) + '</div>' +
            '<div class="brv-char-item-info">' +
              '<span class="brv-char-item-name">' + escH(c.name) + '</span>' +
              '<span class="brv-char-item-stars">' + mini + '</span>' +
            '</div></div>';
        });
      });
      list.innerHTML = html;
    }

    /* ── FICHA (buildDetail) ── */
    function icon(name) {
      var I = {
        bio:'<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>',
        spirit:'<path d="M12 2L3 7v6c0 5 3.8 7.4 9 9 5.2-1.6 9-4 9-9V7z"/>',
        rel:'<path d="M12 2v20M2 12h20"/>',
        cur:'<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
        verse:'<path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>',
        chap:'<path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>',
        time:'<circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/>',
        explore:'<circle cx="12" cy="12" r="9"/><polygon points="15.5 8.5 10.5 10.5 8.5 15.5 13.5 13.5"/>',
        book:'<path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/><line x1="9" y1="7" x2="16" y2="7"/><line x1="9" y1="11" x2="16" y2="11"/>'
      };
      return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + (I[name]||'') + '</svg>';
    }
    function sectionHead(ic, title) {
      return '<div class="brv-char-section-head"><div class="brv-char-section-icon">' + icon(ic) +
        '</div><h2 class="brv-char-section-title">' + escH(title) + '</h2></div>';
    }
    function sub(label, text) {
      if (!text) return '';
      return '<div class="brv-char-sub"><div class="brv-char-sub-label">' + escH(label) +
        '</div><div class="brv-char-sub-text">' + escH(text) + '</div></div>';
    }
    function ulList(arr, cls) {
      if (!arr || !arr.length) return '';
      return '<ul class="brv-char-ul ' + (cls||'') + '">' +
        arr.map(function(x){ return '<li>' + escH(x) + '</li>'; }).join('') + '</ul>';
    }
    function olList(arr) {
      if (!arr || !arr.length) return '';
      return '<ol class="brv-char-ol">' +
        arr.map(function(x){ return '<li>' + escH(x) + '</li>'; }).join('') + '</ol>';
    }

    /* ── Helpers premium ── */
    function starsHTML(n) {
      n = n || 3;
      var labels = {5:'Fundamental',4:'Muy relevante',3:'Relevante',2:'Secundario',1:'Complementario'};
      var s = '';
      for (var i=1;i<=5;i++) s += '<span class="brv-char-star'+(i<=n?' on':'')+'">\u2605</span>';
      return '<span class="brv-char-stars" title="'+labels[n]+'">'+s+'<span class="brv-char-stars-label">'+labels[n]+'</span></span>';
    }
    function tagsHTML(c) {
      if (!c.tags || !c.tags.length) return '';
      return '<div class="brv-char-tags">' + c.tags.map(function(t){
        return '<span class="brv-char-tag">'+escH(t)+'</span>';
      }).join('') + '</div>';
    }
    function relChip(r) {
      if (r.id && byId[r.id]) {
        return '<div class="brv-char-relchip" onclick="BRV.personajes.open(\''+r.id+'\')">' +
          '<span class="brv-char-relchip-name">'+escH(r.name)+'</span>' +
          (r.type?'<span class="brv-char-relchip-type">'+escH(r.type)+'</span>':'') + '</div>';
      }
      /* personaje aún no creado: se muestra pero no es clicable */
      return '<div class="brv-char-relchip off" title="Aún no disponible">' +
        '<span class="brv-char-relchip-name">'+escH(r.name)+'</span>' +
        (r.type?'<span class="brv-char-relchip-type">'+escH(r.type)+'</span>':'') + '</div>';
    }
    function relationsHTML(c) {
      if (!c.relations || !c.relations.length) return '';
      var center = escH(c.name);
      return '<div class="brv-char-section">' + sectionHead('rel','Red de relaciones') +
        '<div class="brv-char-relnet">' +
          '<div class="brv-char-relnet-center">'+center+'</div>' +
          '<div class="brv-char-relnet-chips">' + c.relations.map(relChip).join('') + '</div>' +
        '</div></div>';
    }
    function messianicHTML(c) {
      var txt = c.messianic || c.christConnection;
      if (!txt) return '';
      return '<div class="brv-char-section"><div class="brv-char-christ">' +
        '<div class="brv-char-sub-label">Conexión mesiánica \u2014 ¿cómo apunta a Cristo?</div>' +
        '<div class="brv-char-sub-text">' + escH(txt) + '</div></div></div>';
    }
    function timelineHTML(c) {
      var b = c.bio || {};
      var items = [];
      if (b.birth) items.push({k:'Nacimiento / origen', v:b.birth, ic:'\u25C9'});
      if (b.calling) items.push({k:'Llamado', v:b.calling, ic:'\u2727'});
      (b.events||[]).forEach(function(e){ items.push({k:'Evento', v:e, ic:'\u2022'}); });
      if (b.legacy) items.push({k:'Legado', v:b.legacy, ic:'\u2691'});
      if (!items.length) return '';
      return '<div class="brv-char-section">' + sectionHead('time','Cronología personal') +
        '<div class="brv-char-timeline">' + items.map(function(it){
          return '<div class="brv-char-tl-item"><div class="brv-char-tl-dot">'+it.ic+'</div>' +
            '<div class="brv-char-tl-body"><div class="brv-char-tl-k">'+escH(it.k)+'</div>' +
            '<div class="brv-char-tl-v">'+escH(it.v)+'</div></div></div>';
        }).join('') + '</div></div>';
    }
    function exploreHTML(c) {
      var parts = '';
      /* Personajes relacionados */
      if (c.relations && c.relations.length) {
        var people = c.relations.filter(function(r){return r.id && byId[r.id];});
        if (people.length) {
          parts += '<div class="brv-char-explore-block"><div class="brv-char-explore-h">Personajes relacionados</div><div class="brv-char-explore-chips">' +
            people.map(function(r){ return '<span class="brv-char-explore-chip" onclick="BRV.personajes.open(\''+r.id+'\')">'+escH(r.name)+'</span>'; }).join('') +
            '</div></div>';
        }
      }
      /* Libros y capítulos */
      if (c.chapters && c.chapters.length) {
        var books = [];
        c.chapters.forEach(function(ch){
          var bn = (BRV.bible && BRV.bible.getBook && BRV.bible.getBook(ch.bookId)) ? BRV.bible.getBook(ch.bookId).name : ch.bookId;
          if (books.indexOf(bn)===-1) books.push(bn);
        });
        parts += '<div class="brv-char-explore-block"><div class="brv-char-explore-h">Libros relacionados</div><div class="brv-char-explore-chips">' +
          books.map(function(bn){ return '<span class="brv-char-explore-chip muted">'+escH(bn)+'</span>'; }).join('') + '</div></div>';
        parts += '<div class="brv-char-explore-block"><div class="brv-char-explore-h">Capítulos recomendados</div><div class="brv-char-explore-chips">' +
          c.chapters.map(function(ch){
            var ref = (BRV.bible && BRV.bible.getBook && BRV.bible.getBook(ch.bookId)) ? BRV.bible.getBook(ch.bookId).name+' '+ch.chapter : ch.bookId+' '+ch.chapter;
            return '<span class="brv-char-explore-chip" onclick="BRV.personajes.goToChapter(\''+ch.bookId+'\','+ch.chapter+')">'+escH(ref)+'</span>';
          }).join('') + '</div></div>';
      }
      /* Versículos */
      if (c.keyVerses && c.keyVerses.length) {
        parts += '<div class="brv-char-explore-block"><div class="brv-char-explore-h">Versículos relacionados</div><div class="brv-char-explore-chips">' +
          c.keyVerses.map(function(v){ return '<span class="brv-char-explore-chip" onclick="BRV.personajes.projectVerse(\''+escH(v.ref).replace(/\x27/g,"\\x27")+'\')">'+escH(v.ref)+'</span>'; }).join('') +
          '</div></div>';
      }
      if (!parts) return '';
      return '<div class="brv-char-section">' + sectionHead('explore','Explorar más') +
        '<div class="brv-char-explore">' + parts + '</div></div>';
    }

    /* ── Capa transversal: Autor Bíblico ── */
    var AT_VERSES = 23145, NT_VERSES = 7957;
    function authorHTML(c) {
      if (!c.books || !c.books.length) return '';
      var nBooks = c.books.length;
      var totCh = 0, totV = 0;
      c.books.forEach(function(b){ totCh += (b.chapters||0); totV += (b.verses||0); });
      var isNT = (c.testament === 'NT');
      var base = isNT ? NT_VERSES : AT_VERSES;
      var testName = isNT ? 'Nuevo Testamento' : 'Antiguo Testamento';
      var pct = Math.max(1, Math.round(totV / base * 100));
      var pctW = Math.min(100, Math.round(totV / base * 1000) / 10);

      var h = '<div class="brv-char-section brv-char-author">' + sectionHead('book','Autor bíblico') +
        '<div class="brv-author-intro">Este personaje es uno de los autores humanos inspirados de la Biblia. Aquí puedes descubrir qué escribió, por qué, cuándo y con qué impacto.</div>';

      /* INFLUENCIA BÍBLICA */
      h += '<div class="brv-author-influence">' +
        '<div class="brv-author-block-h">Influencia bíblica</div>' +
        '<div class="brv-author-bar"><div class="brv-author-bar-fill" style="width:' + pctW + '%"><span>' + pct + '%</span></div></div>' +
        '<div class="brv-author-bar-cap">' + escH(nBooks === 1 ? '1 libro' : nBooks + ' libros') + ' &asymp; ' + pct + '% del ' + testName + ' (por versículos)</div>' +
        (c.influence ? '<div class="brv-author-influence-txt">' + escH(c.influence) + '</div>' : '') +
        '</div>';

      /* ESTADÍSTICAS DEL AUTOR */
      h += '<div class="brv-author-block-h">Estadísticas del autor</div>' +
        '<div class="brv-author-stats">' +
        '<div class="brv-author-stat"><div class="brv-author-stat-n">' + nBooks + '</div><div class="brv-author-stat-l">' + (nBooks===1?'Libro':'Libros') + '</div></div>' +
        '<div class="brv-author-stat"><div class="brv-author-stat-n">' + totCh + '</div><div class="brv-author-stat-l">Capítulos</div></div>' +
        '<div class="brv-author-stat"><div class="brv-author-stat-n">' + totV.toLocaleString('es') + '</div><div class="brv-author-stat-l">Versículos aprox.</div></div>' +
        '<div class="brv-author-stat brv-author-stat-wide"><div class="brv-author-stat-n sm">' + escH(c.era || '—') + '</div><div class="brv-author-stat-l">Período histórico</div></div>' +
        '</div>';

      /* EXPLORAR SUS ESCRITOS (botón que despliega) */
      h += '<div class="brv-author-block-h">Explorar sus escritos</div>' +
        '<button class="brv-author-toggle" onclick="BRV.personajes.toggleAuthorBooks(this)">' +
        '<span class="brv-author-toggle-ico">&#128214;</span> Ver libros escritos ' +
        '<span class="brv-author-toggle-caret">&#9662;</span></button>';

      /* LIBROS ESCRITOS (oculto hasta desplegar) */
      var books = c.books.map(function(b){
        return '<div class="brv-author-bookcard" onclick="BRV.personajes.goToChapter(\'' + b.bookId + '\',1)">' +
          '<div class="brv-author-bookcard-top">' +
          '<span class="brv-author-bookname"><span class="brv-author-check">&#10003;</span> ' + escH(b.name) + '</span>' +
          (b.date ? '<span class="brv-author-bookdate">' + escH(b.date) + '</span>' : '') +
          '</div>' +
          '<div class="brv-author-bookmeta">' +
          '<span class="brv-author-bm-chip">' + (b.chapters||0) + ' cap. &middot; ' + (b.verses||0) + ' vers.</span>' +
          '</div>' +
          (b.context     ? '<div class="brv-author-bookrow"><b>Contexto:</b> ' + escH(b.context) + '</div>' : '') +
          (b.recipients  ? '<div class="brv-author-bookrow"><b>Destinatarios:</b> ' + escH(b.recipients) + '</div>' : '') +
          (b.purpose     ? '<div class="brv-author-bookrow"><b>Propósito:</b> ' + escH(b.purpose) + '</div>' : '') +
          '<div class="brv-author-bookread">Leer ' + escH(b.name) + ' &rarr;</div>' +
          '</div>';
      }).join('');
      h += '<div class="brv-author-books" data-open="0">' + books + '</div>';

      h += '</div>';
      return h;
    }

    function buildDetail(c) {
      var h = '';
      /* HERO */
      var catLabel = GROUP_LABELS[c.group] || (c.testament === 'NT' ? 'Nuevo Testamento' : 'Antiguo Testamento');
      h += '<div class="brv-char-hero"><div class="brv-char-hero-top">' +
        '<div class="brv-char-hero-avatar">' + escH(avatarText(c.name)) + '</div>' +
        '<div><div class="brv-char-hero-name">' + escH(c.name) + '</div>' +
        (c.meaning ? '<div class="brv-char-hero-meaning">Significado: ' + escH(c.meaning) + '</div>' : '') +
        '<div class="brv-char-hero-row"><span class="brv-char-hero-badge">' + escH(catLabel) + '</span>' +
        starsHTML(c.importance) + '</div>' +
        tagsHTML(c) +
        '</div></div>';
      /* Meta */
      h += '<div class="brv-char-meta-grid">';
      if (c.era)    h += '<div class="brv-char-meta-card"><div class="brv-char-meta-label">Época histórica</div><div class="brv-char-meta-val">' + escH(c.era) + '</div></div>';
      if (c.origin) h += '<div class="brv-char-meta-card"><div class="brv-char-meta-label">Lugar de origen</div><div class="brv-char-meta-val">' + escH(c.origin) + '</div></div>';
      if (c.refs)   h += '<div class="brv-char-meta-card"><div class="brv-char-meta-label">Referencias bíblicas</div><div class="brv-char-meta-val">' + escH(c.refs) + '</div></div>';
      h += '</div></div>'; /* fin hero */

      h += '<div class="brv-char-body">';

      /* BIOGRAFÍA */
      var b = c.bio || {};
      h += '<div class="brv-char-section">' + sectionHead('bio','Biografía') +
        sub('Nacimiento', b.birth) +
        sub('Llamado', b.calling);
      if (b.events && b.events.length) {
        h += '<div class="brv-char-sub"><div class="brv-char-sub-label">Eventos importantes</div>' + ulList(b.events) + '</div>';
      }
      h += sub('Desafíos', b.challenges) +
        sub('Errores', b.errors) +
        sub('Legado', b.legacy) + '</div>';

      /* CRONOLOGÍA PERSONAL (línea de tiempo) */
      h += timelineHTML(c);
      h += authorHTML(c);

      /* PERFIL ESPIRITUAL */
      var s = c.spiritual || {};
      h += '<div class="brv-char-section">' + sectionHead('spirit','Perfil espiritual') +
        '<div class="brv-char-3col">' +
          '<div class="brv-char-col"><div class="brv-char-col-title">Virtudes</div>' + (ulList(s.virtues,'virtues')||'<div class="brv-char-sub-text">—</div>') + '</div>' +
          '<div class="brv-char-col"><div class="brv-char-col-title">Debilidades</div>' + (ulList(s.weaknesses,'weak')||'<div class="brv-char-sub-text">—</div>') + '</div>' +
          '<div class="brv-char-col"><div class="brv-char-col-title">Lecciones aprendidas</div>' + (olList(s.lessons)||'<div class="brv-char-sub-text">—</div>') + '</div>' +
        '</div></div>';

      /* RELACIÓN CON DIOS */
      var r = c.relationship || {};
      h += '<div class="brv-char-section">' + sectionHead('rel','Relación con Dios') +
        '<div class="brv-char-3col">' +
          '<div class="brv-char-col"><div class="brv-char-col-title">Cómo fue llamado</div><div class="brv-char-sub-text">' + escH(r.calling||'—') + '</div></div>' +
          '<div class="brv-char-col"><div class="brv-char-col-title">Cómo respondió</div><div class="brv-char-sub-text">' + escH(r.response||'—') + '</div></div>' +
          '<div class="brv-char-col"><div class="brv-char-col-title">Qué aprendió</div><div class="brv-char-sub-text">' + escH(r.learned||'—') + '</div></div>' +
        '</div></div>';

      /* CONEXIÓN MESIÁNICA */
      h += messianicHTML(c);

      /* RED DE RELACIONES (clickeable) */
      h += relationsHTML(c);

      /* CURIOSIDADES */
      var cu = c.curiosities || {};
      if ((cu.facts && cu.facts.length) || cu.relevant) {
        h += '<div class="brv-char-section">' + sectionHead('cur','Curiosidades');
        if (cu.facts && cu.facts.length) {
          h += '<div class="brv-char-sub"><div class="brv-char-sub-label">Datos poco conocidos</div>' + ulList(cu.facts) + '</div>';
        }
        h += sub('Información relevante', cu.relevant) + '</div>';
      }

      /* VERSÍCULOS CLAVE (clicables) */
      if (c.keyVerses && c.keyVerses.length) {
        h += '<div class="brv-char-section">' + sectionHead('verse','Versículos clave') +
          '<div class="brv-char-verses">' +
          c.keyVerses.map(function(v) {
            return '<div class="brv-char-verse" onclick="BRV.personajes.projectVerse(\'' + escH(v.ref).replace(/'/g,"\\'") + '\')">' +
              '<div class="brv-char-verse-ref">' + icon('verse') + escH(v.ref) + '</div>' +
              '<div class="brv-char-verse-text">"' + escH(v.text) + '"</div></div>';
          }).join('') + '</div></div>';
      }

      /* CAPÍTULOS RELACIONADOS */
      if (c.chapters && c.chapters.length) {
        h += '<div class="brv-char-section">' + sectionHead('chap','Capítulos relacionados') +
          '<div class="brv-char-chapters">';
        c.chapters.forEach(function(ch, i) {
          var label = ch.label ? (' · ' + escH(ch.label)) : '';
          var ref = (BRV.bible && BRV.bible.getBook && BRV.bible.getBook(ch.bookId))
                      ? BRV.bible.getBook(ch.bookId).name + ' ' + ch.chapter
                      : ch.bookId + ' ' + ch.chapter;
          h += '<div class="brv-char-chip" onclick="BRV.personajes.goToChapter(\'' + ch.bookId + '\',' + ch.chapter + ')">' +
            '<b>' + escH(ref) + '</b>' + label + '</div>';
        });
        h += '</div>' +
          '<button class="brv-char-read-btn" onclick="BRV.personajes.readChapters(\'' + c.id + '\')">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>' +
            'Leer capítulos relacionados</button>';
        h += '</div>';
      }

      /* EXPLORAR MÁS */
      h += exploreHTML(c);

      h += '</div>'; /* fin body */
      return h;
    }

    /* ── API pública ── */
    function open(id) {
      var c = byId[id];
      if (!c) return;
      state.activeId = id;
      var detail = document.getElementById('brv-char-detail');
      var welcome = document.getElementById('brv-char-welcome');
      if (welcome) welcome.style.display = 'none';
      if (detail) {
        detail.innerHTML = buildDetail(c);
        detail.classList.add('show');
      }
      var main = document.getElementById('brv-char-main');
      if (main && main.scrollTo) { try { main.scrollTo({ top: 0, behavior: 'instant' }); } catch(e){} }
      renderList();
      BRV.storage && BRV.storage.set && BRV.storage.set('lastCharacter', id);
      /* Si venimos desde el lector, aseguramos estar en la página */
      if (BRV.router && BRV.router.current !== 'personajes') BRV.router.go('personajes');
    }

    function filter(q) { state.query = q || ''; renderList(); }

    function setTestament(t, btn) {
      state.testament = t;
      if (btn) {
        document.querySelectorAll('.brv-char-tab').forEach(function(b){ b.classList.toggle('active', b===btn); });
      }
      renderList();
    }

    function goToChapter(bookId, chapter) {
      BRV.router.go('reader');
      setTimeout(function() {
        if (BRV.reader && BRV.reader.selectBook) {
          BRV.reader.selectBook(bookId);
          setTimeout(function(){ if (BRV.reader.selectChapter) BRV.reader.selectChapter(chapter); }, 90);
        }
      }, 90);
    }

    function readChapters(id) {
      var c = byId[id];
      if (!c || !c.chapters || !c.chapters.length) {
        BRV.ui && BRV.ui.toast && BRV.ui.toast('No hay capítulos asociados', 'warn');
        return;
      }
      var first = c.chapters[0];
      goToChapter(first.bookId, first.chapter);
    }

    function projectVerse(ref) {
      var matches = (BRV.bible && BRV.bible.search) ? BRV.bible.search(ref, { limit: 1 }) : [];
      if (matches && matches.length) {
        BRV.storage.set('projVerse', { ref: matches[0].r, text: matches[0].v });
        BRV.router.go('projection');
      } else if (BRV.ui && BRV.ui.toast) {
        BRV.ui.toast('No se encontró el versículo', 'warn');
      }
    }

    /* ── LINKIFY: hace clicables los nombres dentro del texto bíblico ──
       No modifica el módulo del lector; observa #brv-verses-content. */
    var linkifyTimer = null;
    function linkifyContainer(root) {
      if (!root || !aliasIndex.length) return;
      var spans = root.querySelectorAll('.brv-verse-text');
      spans.forEach(function(span) {
        if (span.dataset.brvLinked === '1') return;
        linkifyTextNodes(span);
        span.dataset.brvLinked = '1';
      });
    }
    function linkifyTextNodes(el) {
      /* Recorre solo nodos de texto; envuelve TODAS las coincidencias de nombres */
      var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
      var nodes = [];
      var n;
      while ((n = walker.nextNode())) nodes.push(n);
      nodes.forEach(function(node) {
        var text = node.nodeValue;
        if (!text || text.length < 3) return;
        var frag = buildLinkedFragment(text);
        if (frag) node.parentNode.replaceChild(frag, node);
      });
    }
    /* Construye un fragmento con todos los nombres del texto enlazados (izq→der) */
    function buildLinkedFragment(text) {
      var frag = document.createDocumentFragment();
      var rest = text;
      var any = false;
      var guard = 0;
      while (rest && guard++ < 60) {
        var ln = norm(rest);
        var best = null; /* {idx, len, id} — el más a la izquierda; a igual posición, el más largo */
        for (var i = 0; i < aliasIndex.length; i++) {
          var a = aliasIndex[i];
          if (a.norm.length < 3) continue;
          var idx = findWord(ln, a.norm);
          if (idx !== -1 && (!best || idx < best.idx)) {
            best = { idx: idx, len: a.alias.length, id: a.id };
            if (idx === 0) break; /* no hay nada más a la izquierda */
          }
        }
        if (!best) { frag.appendChild(document.createTextNode(rest)); break; }
        any = true;
        if (best.idx > 0) frag.appendChild(document.createTextNode(rest.slice(0, best.idx)));
        var span = document.createElement('span');
        span.className = 'brv-char-link';
        span.setAttribute('data-char', best.id);
        span.textContent = rest.slice(best.idx, best.idx + best.len);
        frag.appendChild(span);
        rest = rest.slice(best.idx + best.len);
      }
      return any ? frag : null;
    }
    /* Busca subcadena en límite de palabra (acentos ya normalizados) */
    function findWord(haystack, needle) {
      var from = 0, idx;
      while ((idx = haystack.indexOf(needle, from)) !== -1) {
        var prev = idx === 0 ? ' ' : haystack.charAt(idx - 1);
        var next = (idx + needle.length >= haystack.length) ? ' ' : haystack.charAt(idx + needle.length);
        if (!/[a-z0-9]/.test(prev) && !/[a-z0-9]/.test(next)) return idx;
        from = idx + 1;
      }
      return -1;
    }
    function setupLinkify() {
      var container = document.getElementById('brv-verses-content');
      if (!container) { setTimeout(setupLinkify, 600); return; }
      /* Linkifica lo ya presente */
      linkifyContainer(container);
      /* Observa cambios (cada vez que el lector pinta un capítulo) */
      var observer = new MutationObserver(function() {
        clearTimeout(linkifyTimer);
        linkifyTimer = setTimeout(function(){ linkifyContainer(container); }, 60);
      });
      observer.observe(container, { childList: true, subtree: true });
    }
    /* Click delegado sobre cualquier nombre clicable de la app */
    function setupClickDelegation() {
      document.addEventListener('click', function(ev) {
        var t = ev.target;
        if (t && t.classList && t.classList.contains('brv-char-link')) {
          ev.preventDefault();
          ev.stopPropagation();
          var id = t.getAttribute('data-char');
          if (id) open(id);
        }
      }, true);
    }

    /* ── Router hook + init ── */
    BRV.router.hooks['personajes'] = function() {
      renderList();
      if (!state.activeId) {
        var last = BRV.storage && BRV.storage.get && BRV.storage.get('lastCharacter', null);
        if (last && byId[last]) open(last);
      }
    };

    function init() {
      buildIndex();
      renderList();
      setupClickDelegation();
      setupLinkify();
    }

    function toggleAuthorBooks(btn) {
      var sec = btn.closest ? btn.closest('.brv-char-author') : null;
      if (!sec) { var p = btn.parentNode; while (p && !(p.className && /brv-char-author/.test(p.className))) p = p.parentNode; sec = p; }
      if (!sec) return;
      var box = sec.querySelector('.brv-author-books');
      if (!box) return;
      var open = box.getAttribute('data-open') === '1';
      box.setAttribute('data-open', open ? '0' : '1');
      btn.classList.toggle('open', !open);
      var caret = btn.querySelector('.brv-author-toggle-caret');
      if (caret) caret.innerHTML = open ? '&#9662;' : '&#9652;';
      btn.childNodes[0] && null;
      btn.innerHTML = '<span class="brv-author-toggle-ico">&#128214;</span> ' +
        (open ? 'Ver libros escritos' : 'Ocultar libros escritos') +
        ' <span class="brv-author-toggle-caret">' + (open ? '&#9662;' : '&#9652;') + '</span>';
    }

    return {
      open, filter, setTestament, goToChapter, readChapters, projectVerse,
      toggleAuthorBooks,
      /* utilidades para escalabilidad / depuración */
      getData: function(){ return DATA; },
      count: function(){ return DATA.length; },
      init,
    };
  })();

  /* ══════════════════════════════════════════════════════════════
     MÓDULO — LÍNEA DE TIEMPO BÍBLICA (exploración guiada de la historia)
     Autocontenido. Usa solo APIs públicas de bible/personajes/reader.
  ══════════════════════════════════════════════════════════════ */
  BRV.timeline = (function() {
    'use strict';

    var ERAS = [
      { key:'origenes',           label:'Creación y Orígenes',        sub:'Del principio al diluvio',          color:'#6aa9d6' },
      { key:'patriarcas',         label:'Era Patriarcal',             sub:'Abraham, Isaac, Jacob y José',       color:'#d4a943' },
      { key:'exodo',              label:'Éxodo y la Ley',             sub:'Liberación y pacto en el Sinaí',     color:'#d97e4a' },
      { key:'conquista',          label:'Conquista y Jueces',         sub:'La tierra prometida',               color:'#b8923f' },
      { key:'reino_unido',        label:'El Reino Unido',             sub:'Saúl, David y Salomón',             color:'#e6c24e' },
      { key:'reino_dividido',     label:'Reino Dividido y Profetas',  sub:'Israel y Judá',                     color:'#bfa05c' },
      { key:'exilio',             label:'El Exilio',                  sub:'Cautiverio en Babilonia',           color:'#7e8ba6' },
      { key:'restauracion',       label:'La Restauración',            sub:'El regreso a Jerusalén',            color:'#79b06a' },
      { key:'intertestamentario', label:'Periodo Intertestamentario', sub:'400 años de silencio',              color:'#9a8f7d' },
      { key:'cristo',             label:'La Vida de Cristo',          sub:'El cumplimiento de las promesas',   color:'#e0b63e' },
      { key:'iglesia',            label:'La Iglesia Primitiva',       sub:'El evangelio a las naciones',       color:'#b07fc9' },
      { key:'apocalipsis',        label:'Apocalipsis',                sub:'La consumación de todas las cosas', color:'#cf5b54' }
    ];

    function P(id, name){ return { id:id, name:name }; }

    var EVENTS = [
      /* ════ ORÍGENES ════ */
      { id:'creacion', era:'origenes', name:'La Creación', date:'En el principio',
        summary:'Dios crea los cielos, la tierra y al ser humano a su imagen.',
        desc:'Dios crea el universo de la nada por el poder de su palabra, culminando en la formación del ser humano, varón y mujer, a su imagen. Todo lo creado es declarado «bueno en gran manera».',
        context:'El relato fundacional presenta a un único Dios soberano, distinto de los mitos paganos, como Creador personal de todo cuanto existe.',
        why:'Establece la verdad central de toda la Biblia: existe un Dios Creador, el ser humano tiene dignidad y propósito únicos, y el mundo le pertenece a Él. Todo lo demás se construye sobre este cimiento.',
        chars:[P('adan','Adán'),P('eva','Eva')],
        refs:['Génesis 1:1','Génesis 1:27','Génesis 2:7'],
        conseq:'Queda establecido el orden creado, el descanso sabático y la comunión entre Dios y el ser humano.',
        after:{ to:'caida', text:'La perfección inicial se rompe pronto con la entrada del pecado.' },
        christ:'Todo fue creado por medio del Verbo eterno, Cristo, y para Él (Juan 1:3; Colosenses 1:16).',
        connections:[{to:'caida',label:'La Caída'},{to:'nueva_creacion',label:'El cielo nuevo'}],
        prophecy:'La nueva creación al final del Apocalipsis restaura y supera el Edén original.' },

      { id:'caida', era:'origenes', name:'La Caída', date:'Principio de la humanidad',
        summary:'Adán y Eva desobedecen y el pecado entra al mundo.',
        desc:'Tentados por la serpiente, Adán y Eva comen del fruto prohibido. El pecado, la vergüenza y la muerte entran en el mundo, y la humanidad es expulsada del Edén.',
        context:'La libertad humana es probada por un solo mandamiento, revelando la raíz de todo quebranto: la desconfianza en la bondad de Dios.',
        why:'Explica por qué el mundo está roto: el dolor, la muerte y la maldad nacen aquí. Pero también aquí Dios da la primera promesa de redención, marcando el inicio del plan de salvación.',
        chars:[P('adan','Adán'),P('eva','Eva')],
        refs:['Génesis 3:6','Génesis 3:15','Génesis 3:19'],
        conseq:'Se rompe la relación con Dios; el trabajo, el dolor y la muerte marcan la existencia. Comienza la espera de un Redentor.',
        after:{ to:'cain_abel', text:'El pecado se propaga: la siguiente generación trae el primer homicidio.' },
        christ:'Génesis 3:15, el «protoevangelio»: la simiente de la mujer (Cristo) herirá la cabeza de la serpiente.',
        connections:[{to:'cain_abel',label:'Caín y Abel'},{to:'nacimiento_jesus',label:'El nacimiento de Jesús'}],
        prophecy:'Primera promesa mesiánica de toda la Escritura, cumplida en la victoria de Cristo sobre Satanás.' },

      { id:'cain_abel', era:'origenes', name:'Caín y Abel', date:'Primera generación',
        summary:'El primer homicidio: Caín mata a su hermano Abel por envidia.',
        desc:'Abel ofrece a Dios un sacrificio aceptable por fe; Caín, no. Dominado por la envidia, Caín ignora la advertencia de Dios y asesina a su hermano.',
        context:'Apenas una generación después de la caída, el pecado ya «está a la puerta».',
        why:'Muestra cómo el pecado, no dominado, crece hasta la violencia, y revela dos caminos de acercarse a Dios: la fe verdadera frente a la religión vacía.',
        chars:[P('cain','Caín'),P('abel','Abel'),P('adan','Adán'),P('eva','Eva')],
        refs:['Génesis 4:4','Génesis 4:7','Génesis 4:8'],
        conseq:'La violencia entra en la familia humana; Dios provee otra descendencia justa por medio de Set.',
        after:{ to:'enoc', text:'En medio de la creciente maldad, surge un hombre que camina con Dios.' },
        christ:'La sangre de Abel clamaba juicio; la de Cristo «habla mejor», ofreciendo perdón (Hebreos 12:24).',
        connections:[{to:'diluvio',label:'El Diluvio'}],
        prophecy:'Abel, el justo asesinado, prefigura el rechazo del Justo por excelencia.' },

      { id:'enoc', era:'origenes', name:'Enoc camina con Dios', date:'Era antediluviana',
        summary:'Un hombre de fe es llevado al cielo sin ver la muerte.',
        desc:'En una generación corrupta, Enoc «caminó con Dios» 300 años en comunión tan estrecha que Dios lo llevó consigo sin que pasara por la muerte.',
        context:'Antes del diluvio, la humanidad se corrompía, pero Enoc destaca como ejemplo de intimidad con Dios.',
        why:'Demuestra que es posible agradar a Dios y vivir en comunión con Él aun en un mundo malvado, y ofrece una imagen temprana de la esperanza de vencer la muerte.',
        chars:[P('enoc','Enoc')],
        refs:['Génesis 5:24','Hebreos 11:5'],
        conseq:'Queda como modelo perpetuo de fe; es uno de los dos hombres que no murieron, junto con Elías.',
        after:{ to:'diluvio', text:'La maldad llega a su límite y Dios juzga la tierra con un diluvio.' },
        christ:'Enoc, arrebatado al cielo, prefigura la esperanza de los creyentes de ser llevados con el Señor (1 Tesalonicenses 4:17).',
        connections:[{to:'elias_baal',label:'Elías y los profetas de Baal'}],
        prophecy:'Judas cita una profecía de Enoc sobre la venida del Señor con sus santos (Judas 14-15).' },

      { id:'diluvio', era:'origenes', name:'El Diluvio', date:'Era antediluviana',
        summary:'Dios juzga la maldad del mundo y salva a Noé en el arca.',
        desc:'Ante la corrupción total, Dios envía un diluvio universal, pero salva a Noé y su familia en un arca, y establece después el pacto del arco iris.',
        context:'La maldad humana había llegado a tal punto que «todo designio del corazón era de continuo solamente el mal».',
        why:'Revela tanto la justicia de Dios contra el pecado como su gracia que salva; el arca es la primera gran imagen de salvación en medio del juicio.',
        chars:[P('noe','Noé')],
        refs:['Génesis 6:8','Génesis 7:23','Génesis 9:13'],
        conseq:'La humanidad recibe un nuevo comienzo; Dios promete no volver a destruir la tierra con un diluvio.',
        after:{ to:'babel', text:'La humanidad vuelve a rebelarse, ahora unida en orgullo en Babel.' },
        christ:'El arca, único refugio ante el juicio, prefigura a Cristo, en quien hallamos salvación (1 Pedro 3:20-21).',
        connections:[{to:'babel',label:'La Torre de Babel'},{to:'llamado_abraham',label:'El llamado de Abraham'}],
        prophecy:'Jesús comparó los días de Noé con su segunda venida (Mateo 24:37-39).' },

      { id:'babel', era:'origenes', name:'La Torre de Babel', date:'Tras el diluvio',
        summary:'La humanidad se rebela y Dios confunde sus lenguas.',
        desc:'Unida en orgullo, la humanidad intenta construir una torre «que llegue al cielo» para hacerse un nombre. Dios confunde su lengua y la dispersa por la tierra.',
        context:'En lugar de llenar la tierra como Dios mandó, la humanidad busca la autosuficiencia y la gloria propia.',
        why:'Explica el origen de las naciones y los idiomas, y muestra el peligro del orgullo humano que desafía a Dios. Prepara el escenario para que Dios escoja a un solo hombre.',
        chars:[],
        refs:['Génesis 11:4','Génesis 11:7','Génesis 11:9'],
        conseq:'Nacen las naciones y los idiomas; la dispersión prepara el llamado de Abraham, por quien serán benditas todas las familias.',
        after:{ to:'llamado_abraham', text:'Dios escoge a un hombre, Abraham, para iniciar su plan de redención.' },
        christ:'La confusión de Babel se revierte en Pentecostés, cuando el evangelio se oye en todas las lenguas (Hechos 2:6).',
        connections:[{to:'llamado_abraham',label:'El llamado de Abraham'},{to:'pentecostes',label:'Pentecostés'}],
        prophecy:'En Cristo, gente «de toda lengua» será reunida ante el trono (Apocalipsis 7:9).' },

      /* ════ PATRIARCAS ════ */
      { id:'llamado_abraham', era:'patriarcas', name:'El llamado de Abraham', date:'c. 2000 a.C.',
        summary:'Dios llama a Abraham y le promete una nación y bendición universal.',
        desc:'Dios llama a Abram a dejar su tierra para ir a una tierra desconocida, prometiéndole una gran nación y que en él serían benditas todas las familias de la tierra. Abraham cree, y le es contado por justicia.',
        context:'En medio de un mundo idólatra, Dios escoge a un hombre para iniciar el plan de redención.',
        why:'Es el inicio del pueblo del pacto y de la línea del Mesías. La justificación de Abraham por la fe se vuelve el modelo de salvación para todos los creyentes.',
        chars:[P('abraham','Abraham'),P('sara','Sara'),P('lot','Lot')],
        refs:['Génesis 12:1','Génesis 12:3','Génesis 15:6'],
        conseq:'Nace el pueblo del pacto; Abraham es llamado «padre de la fe».',
        after:{ to:'pacto_abraham', text:'Dios sella su promesa con un pacto formal y la señal de la circuncisión.' },
        christ:'«En tu simiente serán benditas todas las naciones» se cumple en Cristo, hijo de Abraham (Gálatas 3:16).',
        connections:[{to:'isaac_moriah',label:'Isaac ofrecido en Moriah'},{to:'jose_egipto',label:'José en Egipto'}],
        prophecy:'La promesa de bendición universal anticipa la salvación que llega a todas las naciones por Cristo.' },

      { id:'pacto_abraham', era:'patriarcas', name:'El pacto con Abraham', date:'c. 2000 a.C.',
        summary:'Dios sella su promesa con un pacto eterno y la circuncisión.',
        desc:'Dios establece un pacto solemne con Abraham, garantizando su descendencia y la tierra, y dándole la circuncisión como señal del pacto. Cambia su nombre de Abram a Abraham, «padre de multitudes».',
        context:'Las promesas hechas a Abraham necesitaban una confirmación formal e irrevocable.',
        why:'Funda el pacto sobre el cual descansa toda la historia de Israel y la esperanza mesiánica. Muestra que la salvación se basa en la promesa de Dios, no en el esfuerzo humano.',
        chars:[P('abraham','Abraham'),P('sara','Sara')],
        refs:['Génesis 17:5','Génesis 17:7','Génesis 15:18'],
        conseq:'Israel queda marcado como pueblo del pacto; la circuncisión señalará su identidad por siglos.',
        after:{ to:'sodoma_lot', text:'Abraham intercede mientras Dios juzga a Sodoma y libra a Lot.' },
        christ:'El verdadero hijo del pacto es Cristo, y por la fe somos «linaje de Abraham» y herederos de la promesa (Gálatas 3:29).',
        connections:[{to:'isaac_moriah',label:'Isaac ofrecido en Moriah'}],
        prophecy:'El pacto incondicional con Abraham se cumple plenamente en el Mesías prometido.' },

      { id:'sodoma_lot', era:'patriarcas', name:'Sodoma y la liberación de Lot', date:'c. 2000 a.C.',
        summary:'Dios juzga a Sodoma pero libra al justo Lot.',
        desc:'Ante el clamor por la maldad de Sodoma, Abraham intercede y Dios envía ángeles que libran a Lot antes de destruir la ciudad con fuego. La esposa de Lot mira atrás y se convierte en estatua de sal.',
        context:'La depravación de las ciudades de la llanura alcanza su límite ante un Dios santo y justo.',
        why:'Muestra que Dios juzga el pecado pero rescata a los suyos, y que la intercesión tiene poder. Es una advertencia perpetua sobre el apego al mundo.',
        chars:[P('abraham','Abraham'),P('lot','Lot')],
        refs:['Génesis 18:32','Génesis 19:24','Lucas 17:32'],
        conseq:'Lot es salvado pero pierde todo; el juicio de Sodoma se vuelve símbolo del juicio divino.',
        after:{ to:'isaac_moriah', text:'Nace el hijo de la promesa, Isaac, y su fe es probada en el monte.' },
        christ:'Jesús usó a Sodoma y a la mujer de Lot como advertencia ante su venida y el juicio final (Lucas 17:28-32).',
        connections:[{to:'isaac_moriah',label:'Isaac ofrecido en Moriah'}],
        prophecy:'El rescate del justo ante el juicio prefigura la salvación de los creyentes en el día del Señor (2 Pedro 2:7-9).' },

      { id:'isaac_moriah', era:'patriarcas', name:'Isaac ofrecido en Moriah', date:'c. 1900 a.C.',
        summary:'Abraham, por fe, está dispuesto a ofrecer a su hijo Isaac.',
        desc:'Dios prueba a Abraham pidiéndole ofrecer a Isaac en el monte Moriah. En el último instante, Dios detiene su mano y provee un carnero, confirmando que «Jehová proveerá».',
        context:'Isaac era el hijo de la promesa; la prueba lleva la fe de Abraham al extremo.',
        why:'Es una de las pruebas de fe más grandes de la Biblia y una de las imágenes más claras del sacrificio venidero. El monte Moriah será luego el sitio del templo.',
        chars:[P('abraham','Abraham'),P('isaac','Isaac')],
        refs:['Génesis 22:8','Génesis 22:12','Génesis 22:14'],
        conseq:'La fe de Abraham es confirmada con juramento; se afianza la línea del pacto.',
        after:{ to:'jacob_israel', text:'La promesa pasa a la siguiente generación: Jacob es transformado en Israel.' },
        christ:'El padre que ofrece a su hijo amado, que carga la leña al monte, prefigura al Padre que entrega a Cristo por nosotros.',
        connections:[{to:'crucifixion',label:'La crucifixión'}],
        prophecy:'«Dios proveerá el cordero» se cumple en Cristo, el Cordero ofrecido en el mismo monte, Jerusalén.' },

      { id:'jacob_israel', era:'patriarcas', name:'Jacob es renombrado Israel', date:'c. 1900 a.C.',
        summary:'Tras luchar con Dios, Jacob recibe el nombre de Israel.',
        desc:'Jacob lucha toda una noche con el ángel de Dios en Peniel y se aferra a Él pidiendo bendición. Dios lo transforma y le da un nombre nuevo: Israel. De sus doce hijos nacerán las doce tribus.',
        context:'Jacob, marcado por el engaño, es quebrantado y transformado por un encuentro decisivo con Dios.',
        why:'De él nace la nación de Israel y sus doce tribus, estructura de toda la historia bíblica posterior. Muestra cómo Dios transforma a los pecadores.',
        chars:[P('jacob','Jacob'),P('isaac','Isaac')],
        refs:['Génesis 28:15','Génesis 32:28'],
        conseq:'El pueblo de Dios tomará el nombre de Israel; las doce tribus marcarán toda su historia.',
        after:{ to:'jose_egipto', text:'Uno de sus hijos, José, es llevado a Egipto y Dios lo usa para salvar a la familia.' },
        christ:'La escalera de Jacob que une cielo y tierra es aplicada por Jesús a sí mismo, el único mediador (Juan 1:51).',
        connections:[{to:'jose_egipto',label:'José en Egipto'}],
        prophecy:'De las doce tribus, la de Judá traería al «León» mesiánico (Génesis 49:10).' },

      { id:'jose_egipto', era:'patriarcas', name:'José en Egipto', date:'c. 1850 a.C.',
        summary:'Vendido por sus hermanos, José llega a gobernar Egipto y salva a su familia.',
        desc:'Vendido como esclavo, José sufre injusticia y cárcel, pero Dios lo exalta a gobernador de Egipto. Durante una gran hambre salva a muchos pueblos y reconcilia a su familia: «Vosotros pensasteis mal, mas Dios lo encaminó a bien».',
        context:'La providencia de Dios obra en medio de la traición para preservar a la familia del pacto.',
        why:'Preserva al pueblo escogido durante el hambre y lo lleva a Egipto, donde crecerá hasta ser una nación. Es un retrato magistral de la providencia y el perdón.',
        chars:[P('jose','José'),P('jacob','Jacob')],
        refs:['Génesis 37:28','Génesis 45:5','Génesis 50:20'],
        conseq:'Israel se establece en Egipto, preparando el escenario para el Éxodo.',
        after:{ to:'job_prueba', text:'En esta era patriarcal, otro hombre, Job, enfrenta el misterio del sufrimiento.' },
        christ:'José, rechazado por los suyos, humillado y luego exaltado para salvar a muchos, es una de las figuras más claras de Cristo.',
        connections:[{to:'exodo_egipto',label:'El Éxodo'}],
        prophecy:'Como José perdonó a quienes lo traicionaron, Cristo intercede por quienes lo crucificaron.' },

      { id:'job_prueba', era:'patriarcas', name:'Job: el justo que sufre', date:'Era patriarcal',
        summary:'Un hombre íntegro pierde todo y aun así confía en Dios.',
        desc:'Job, hombre justo y próspero, pierde en un día sus bienes, sus hijos y su salud. En medio del dolor y los falsos consejos de sus amigos, lucha con preguntas, pero no abandona a Dios, quien finalmente le responde y lo restaura.',
        context:'En una época muy antigua, el libro de Job aborda la pregunta universal del sufrimiento del inocente.',
        why:'Responde una de las preguntas más profundas del ser humano: por qué sufren los justos. Enseña que la fe verdadera confía en Dios aun sin tener todas las respuestas.',
        chars:[P('job','Job')],
        refs:['Job 1:21','Job 19:25','Job 42:5'],
        conseq:'Job conoce a Dios de forma más profunda y es restaurado al doble; queda como modelo de paciencia y fe.',
        after:{ to:'exodo_egipto', text:'Siglos después, Dios libera con poder a Israel de la esclavitud en Egipto.' },
        christ:'Job anhelaba un mediador y confesó «yo sé que mi Redentor vive» (Job 19:25), apuntando a Cristo.',
        connections:[{to:'crucifixion',label:'La crucifixión'}],
        prophecy:'El Redentor vivo que Job esperaba se reveló en Jesús, vencedor de la muerte.' },

      /* ════ ÉXODO ════ */
      { id:'exodo_egipto', era:'exodo', name:'El Éxodo de Egipto', date:'c. 1446 a.C.',
        summary:'Dios libera a Israel de la esclavitud por medio de Moisés.',
        desc:'Tras 400 años de esclavitud, Dios llama a Moisés desde la zarza ardiente y, mediante diez plagas y la Pascua, libera a Israel. El pueblo cruza el Mar Rojo en seco mientras el ejército egipcio es destruido.',
        context:'Israel había crecido hasta ser una nación numerosa, pero esclavizada bajo el faraón de Egipto.',
        why:'Es el gran acto redentor del Antiguo Testamento, el nacimiento de Israel como nación libre y el modelo de toda liberación que Dios obra.',
        chars:[P('moises','Moisés'),P('aaron','Aarón'),P('miriam','Miriam')],
        refs:['Éxodo 3:14','Éxodo 12:13','Éxodo 14:21'],
        conseq:'Nace Israel como pueblo libre de Dios, rumbo al Sinaí y a la tierra prometida.',
        after:{ to:'sinai_ley', text:'En el Sinaí, Dios entrega la Ley y establece su pacto con el pueblo.' },
        christ:'El Cordero pascual, cuya sangre libra de la muerte, apunta a Cristo, «nuestra Pascua» (1 Corintios 5:7).',
        connections:[{to:'sinai_ley',label:'La Ley en el Sinaí'},{to:'crucifixion',label:'La crucifixión'}],
        prophecy:'La Pascua del Éxodo prefigura la liberación del pecado por la sangre de Cristo.' },

      { id:'sinai_ley', era:'exodo', name:'La Ley en el Sinaí', date:'c. 1446 a.C.',
        summary:'Dios entrega la Ley y establece su pacto con Israel.',
        desc:'En el monte Sinaí, Dios desciende con fuego y entrega a Moisés los Diez Mandamientos y la Ley, haciendo de Israel «un reino de sacerdotes y gente santa».',
        context:'El pueblo recién liberado necesita una ley y una estructura para vivir bajo el gobierno de Dios.',
        why:'Da a Israel su constitución moral y espiritual y revela el carácter santo de Dios. La Ley expone el pecado y la necesidad de un Salvador.',
        chars:[P('moises','Moisés'),P('aaron','Aarón')],
        refs:['Éxodo 19:5','Éxodo 20:3','Éxodo 24:8'],
        conseq:'Israel recibe la Ley y el pacto; el pecado queda definido y la santidad, exigida.',
        after:{ to:'becerro_oro', text:'Casi de inmediato, el pueblo quebranta el pacto con el becerro de oro.' },
        christ:'La Ley es «ayo para llevarnos a Cristo» (Gálatas 3:24); Jesús la cumple perfectamente y la lleva a su plenitud.',
        connections:[{to:'caida_juda',label:'Caída de Judá'},{to:'ultima_cena',label:'La última cena'}],
        prophecy:'Anticipa el nuevo pacto escrito en el corazón (Jeremías 31:33), inaugurado por Cristo.' },

      { id:'becerro_oro', era:'exodo', name:'El becerro de oro', date:'c. 1446 a.C.',
        summary:'El pueblo cae en idolatría mientras Moisés está en el monte.',
        desc:'Impaciente por la tardanza de Moisés, el pueblo presiona a Aarón para hacer un becerro de oro y lo adora. Moisés intercede y Dios, en su misericordia, no destruye a la nación.',
        context:'Apenas recibida la Ley, Israel muestra cuán rápido se desvía el corazón humano hacia la idolatría.',
        why:'Revela la tendencia humana a la idolatría y la necesidad de un mediador. La intercesión de Moisés muestra el poder de un intercesor ante Dios.',
        chars:[P('moises','Moisés'),P('aaron','Aarón')],
        refs:['Éxodo 32:4','Éxodo 32:11','Éxodo 32:32'],
        conseq:'Hay juicio y arrepentimiento; el pueblo aprende la gravedad de la idolatría y el valor de la intercesión.',
        after:{ to:'tabernaculo', text:'Dios provee un lugar para morar entre su pueblo: el tabernáculo.' },
        christ:'Moisés se ofreció a ser borrado por el pueblo (Éxodo 32:32); Cristo sí cargó la maldición por nosotros, intercesor perfecto.',
        connections:[{to:'tabernaculo',label:'El tabernáculo'}],
        prophecy:'La necesidad de un mediador que aplaque la ira de Dios apunta a Cristo, único mediador.' },

      { id:'tabernaculo', era:'exodo', name:'El Tabernáculo', date:'c. 1446 a.C.',
        summary:'Dios provee un santuario para morar en medio de su pueblo.',
        desc:'Dios da instrucciones detalladas para construir el tabernáculo, una tienda portátil con el arca, el altar y el lugar santísimo, donde su gloria desciende a morar entre Israel.',
        context:'Un Dios santo desea habitar con un pueblo pecador, y para ello provee un sistema de sacrificios y un lugar de encuentro.',
        why:'Enseña cómo un pueblo pecador puede acercarse a un Dios santo: mediante el sacrificio y la mediación sacerdotal. Cada detalle apunta a la obra de Cristo.',
        chars:[P('moises','Moisés'),P('aaron','Aarón')],
        refs:['Éxodo 25:8','Éxodo 40:34','Hebreos 9:11'],
        conseq:'Dios habita visiblemente con Israel; el sistema de sacrificios estructura su vida de adoración.',
        after:{ to:'serpiente_bronce', text:'En el desierto, Dios da otra figura de salvación: la serpiente de bronce.' },
        christ:'El tabernáculo prefigura a Cristo, que «habitó (acampó) entre nosotros» (Juan 1:14) y es el verdadero acceso a Dios.',
        connections:[{to:'templo_salomon',label:'El Templo de Salomón'}],
        prophecy:'El velo, el altar y el sumo sacerdote anticipan la mediación perfecta de Cristo (Hebreos 9-10).' },

      { id:'serpiente_bronce', era:'exodo', name:'La serpiente de bronce', date:'c. 1440 a.C.',
        summary:'Quien mira la serpiente levantada por Moisés es sanado.',
        desc:'Tras una plaga de serpientes por la murmuración del pueblo, Dios manda a Moisés levantar una serpiente de bronce: todo el que la mirara con fe sería sanado.',
        context:'En el desierto, el pueblo peca de nuevo, pero Dios provee un remedio que requiere solo mirar con fe.',
        why:'Ilustra de forma poderosa la salvación por la fe: no por obras, sino por mirar a lo que Dios provee. Jesús mismo la usó para explicar su muerte.',
        chars:[P('moises','Moisés')],
        refs:['Números 21:8','Números 21:9','Juan 3:14'],
        conseq:'El pueblo es sanado; queda una de las figuras más explícitas del evangelio en el Antiguo Testamento.',
        after:{ to:'desierto', text:'La generación incrédula vaga por el desierto antes de entrar a la tierra.' },
        christ:'Jesús dijo: «Como Moisés levantó la serpiente, así es necesario que el Hijo del Hombre sea levantado» (Juan 3:14-15).',
        connections:[{to:'crucifixion',label:'La crucifixión'}],
        prophecy:'La serpiente levantada que sana al que mira anticipa a Cristo levantado en la cruz.' },

      { id:'desierto', era:'exodo', name:'Cuarenta años en el desierto', date:'c. 1446–1406 a.C.',
        summary:'Por su incredulidad, Israel vaga 40 años antes de entrar a Canaán.',
        desc:'Enviados doce espías a Canaán, diez traen un informe de temor y el pueblo se rebela. Esa generación es condenada a vagar 40 años, mientras Dios los sostiene con maná, agua y su presencia.',
        context:'A las puertas de la tierra prometida, el pueblo prefiere el temor a la fe.',
        why:'Muestra que la incredulidad cierra la puerta del reposo de Dios, mientras Él forma una nueva generación en dependencia diaria de Él.',
        chars:[P('moises','Moisés'),P('josue','Josué'),P('caleb','Caleb')],
        refs:['Números 13:30','Números 14:34','Deuteronomio 8:3'],
        conseq:'Una nueva generación, formada en la fe, heredará la tierra bajo Josué.',
        after:{ to:'conquista_canaan', text:'Bajo Josué, el pueblo finalmente entra y conquista la tierra prometida.' },
        christ:'Hebreos usa el desierto como advertencia: solo por la fe se entra en el reposo de Dios, hallado en Cristo (Hebreos 4).',
        connections:[{to:'conquista_canaan',label:'La conquista de Canaán'}],
        prophecy:'El maná del cielo prefigura a Cristo, «el pan de vida» que da vida eterna (Juan 6:48-51).' },
      /* ════ CONQUISTA Y JUECES ════ */
      { id:'conquista_canaan', era:'conquista', name:'La conquista de Canaán', date:'c. 1406 a.C.',
        summary:'Bajo Josué, Israel entra y conquista la tierra prometida.',
        desc:'Josué guía a Israel a cruzar el Jordán en seco y a conquistar la tierra. Luego es repartida entre las doce tribus, cumpliendo la promesa hecha a Abraham.',
        context:'Cuatro siglos después de la promesa a Abraham, Israel finalmente toma posesión de Canaán.',
        why:'Cumple la antigua promesa de la tierra y muestra la fidelidad de Dios. Marca el paso de pueblo peregrino a nación establecida.',
        chars:[P('josue','Josué'),P('caleb','Caleb'),P('rahab','Rahab')],
        refs:['Josué 1:9','Josué 11:23','Josué 24:15'],
        conseq:'Israel se establece en su tierra, aunque sin gobierno central, lo que dará paso a los jueces.',
        after:{ to:'jerico', text:'La conquista comienza con la caída milagrosa de Jericó.' },
        christ:'Josué (Yeshúa, el mismo nombre de Jesús) lleva al pueblo al reposo de la tierra, figura de Jesús (Hebreos 4:8-9).',
        connections:[{to:'jerico',label:'La caída de Jericó'},{to:'periodo_jueces',label:'El tiempo de los Jueces'}],
        prophecy:'El reposo en la tierra prefigura el reposo eterno que da Cristo a su pueblo.' },

      { id:'jerico', era:'conquista', name:'La caída de Jericó', date:'c. 1406 a.C.',
        summary:'Los muros caen tras rodear la ciudad por fe.',
        desc:'Por orden de Dios, Israel rodea Jericó siete días; al séptimo, con un grito y trompetas, los muros se derrumban. Rahab, la ramera que escondió a los espías, es salvada por su fe.',
        context:'La primera y más simbólica victoria de la conquista de Canaán.',
        why:'Demuestra que la victoria viene de Dios, no de la fuerza humana, y que la fe salva incluso a una gentil como Rahab, antepasada del Mesías.',
        chars:[P('josue','Josué'),P('rahab','Rahab')],
        refs:['Josué 6:20','Josué 6:25','Hebreos 11:30'],
        conseq:'Se abre el camino de la conquista; Rahab queda integrada en el pueblo y en la línea de David.',
        after:{ to:'periodo_jueces', text:'Tras la conquista, comienza el turbulento periodo de los jueces.' },
        christ:'Rahab, gentil salvada por fe e injertada en la línea de Cristo, anticipa la salvación de las naciones.',
        connections:[{to:'rut_booz',label:'Rut y Booz'}],
        prophecy:'El cordón rojo de Rahab es visto como figura de la salvación por la sangre.' },

      { id:'periodo_jueces', era:'conquista', name:'El tiempo de los Jueces', date:'c. 1375–1050 a.C.',
        summary:'Ciclos de pecado, opresión y liberación; «cada uno hacía lo recto a sus ojos».',
        desc:'Sin rey y olvidando a Dios, Israel cae en ciclos de idolatría, opresión, clamor y liberación por jueces que Dios levanta, como Débora, Gedeón y Sansón.',
        context:'Tras la muerte de Josué, una generación que no conocía a Jehová se aparta de Él.',
        why:'Revela la necesidad de un rey justo y de un corazón fiel. Muestra la paciencia de Dios, que una y otra vez levanta libertadores.',
        chars:[P('debora','Débora'),P('gedeon','Gedeón'),P('sanson','Sansón')],
        refs:['Jueces 2:16','Jueces 21:25'],
        conseq:'El desorden creciente prepara el camino para la monarquía.',
        after:{ to:'gedeon_300', text:'Entre los jueces destaca Gedeón, que vence con apenas 300 hombres.' },
        christ:'El anhelo de un rey justo apunta al Rey eterno, Cristo, hijo de David.',
        connections:[{to:'rut_booz',label:'Rut y Booz'},{to:'samuel_rey',label:'Samuel y el primer rey'}],
        prophecy:'Los libertadores temporales anticipan al Libertador definitivo.' },

      { id:'gedeon_300', era:'conquista', name:'Gedeón y los 300', date:'c. 1200 a.C.',
        summary:'Dios vence a un gran ejército con apenas 300 hombres.',
        desc:'Dios reduce el ejército de Gedeón de 32.000 a 300 hombres para que la victoria sobre Madián fuera claramente suya, lograda con trompetas y cántaros en lugar de armas.',
        context:'Israel sufría la opresión de Madián, y Gedeón se sentía el más débil de su familia.',
        why:'Enseña que Dios usa a los débiles y poca cosa para que la gloria sea solo suya: «no con ejército, ni con fuerza».',
        chars:[P('gedeon','Gedeón')],
        refs:['Jueces 6:12','Jueces 7:7','Jueces 7:21'],
        conseq:'Israel es liberado de Madián y tiene paz; pero el éxito también expone la fragilidad de los corazones.',
        after:{ to:'sanson_dalila', text:'Más tarde surge Sansón, el juez fuerte de trágico final.' },
        christ:'La salvación que no depende de la fuerza humana apunta a la obra de Cristo, poder de Dios en aparente debilidad.',
        connections:[{to:'david_goliat',label:'David y Goliat'}],
        prophecy:'El patrón de victoria por la mano de Dios recorre toda la Escritura hasta la cruz.' },

      { id:'sanson_dalila', era:'conquista', name:'Sansón y los filisteos', date:'c. 1100 a.C.',
        summary:'El juez más fuerte cae por sus pasiones, pero Dios lo usa al final.',
        desc:'Sansón, nazareo de fuerza sobrenatural, juzga a Israel contra los filisteos, pero es seducido y traicionado por Dalila. Ciego y humillado, clama a Dios y, en su muerte, derriba el templo de Dagón sobre sus enemigos.',
        context:'Israel vivía bajo el dominio filisteo; Sansón fue apartado para Dios desde el vientre.',
        why:'Muestra que los dones de Dios no sustituyen el carácter, y que la gracia de Dios alcanza incluso al que ha caído cuando vuelve a clamar a Él.',
        chars:[P('sanson','Sansón')],
        refs:['Jueces 13:5','Jueces 16:28','Hebreos 11:32'],
        conseq:'Israel recibe alivio de los filisteos; queda una advertencia sobre las pasiones no dominadas.',
        after:{ to:'rut_booz', text:'En medio de esa época oscura brilla la historia de redención de Rut.' },
        christ:'Sansón dio su vida para vencer al enemigo; Cristo, por su muerte, venció definitivamente al maligno.',
        connections:[{to:'samuel_rey',label:'Samuel y el primer rey'}],
        prophecy:'La liberación lograda mediante la muerte del libertador apunta a la cruz.' },

      { id:'rut_booz', era:'conquista', name:'Rut y Booz', date:'c. 1100 a.C.',
        summary:'Una extranjera fiel es redimida e injertada en la línea del Mesías.',
        desc:'La moabita Rut abraza al Dios de Israel por lealtad a su suegra Noemí. Booz, un «pariente redentor», la rescata y se casa con ella; de ellos nacerá Obed, abuelo del rey David.',
        context:'En medio del oscuro periodo de los jueces, esta historia de fidelidad y redención brilla con esperanza.',
        why:'Muestra la gracia de Dios que incluye a los gentiles y entreteje historias humildes en el gran plan de redención que lleva a David y a Cristo.',
        chars:[P('rut','Rut'),P('booz','Booz')],
        refs:['Rut 1:16','Rut 2:12','Rut 4:17'],
        conseq:'Una gentil queda integrada en el linaje real de David, anticipando la salvación de las naciones.',
        after:{ to:'samuel_rey', text:'Llega Samuel, que ungirá al primer rey de Israel.' },
        christ:'El «pariente redentor» (goel) que rescata a Rut prefigura a Cristo, nuestro Redentor.',
        connections:[{to:'david_rey',label:'David, rey de Israel'}],
        prophecy:'Rut, bisabuela de David, forma parte de la genealogía del Mesías (Mateo 1:5).' },

      /* ════ REINO UNIDO ════ */
      { id:'samuel_rey', era:'reino_unido', name:'Samuel y el primer rey', date:'c. 1050 a.C.',
        summary:'Israel pide un rey y Samuel unge a Saúl.',
        desc:'El profeta Samuel guía la transición a la monarquía. El pueblo exige un rey «como las otras naciones», y Dios concede a Saúl, cuya desobediencia llevará a su rechazo y a la elección de David.',
        context:'Cansado del caos de los jueces, Israel rechaza el reinado directo de Dios.',
        why:'Inaugura la monarquía y revela que Dios busca un rey según su corazón, no según la apariencia. El fracaso de Saúl prepara el camino a David.',
        chars:[P('samuel','Samuel'),P('saul','Saúl')],
        refs:['1 Samuel 8:7','1 Samuel 15:22','1 Samuel 16:7'],
        conseq:'Comienza la monarquía; el rechazo de Saúl abre paso a David.',
        after:{ to:'david_goliat', text:'El joven David se da a conocer venciendo al gigante Goliat.' },
        christ:'El rey conforme al corazón de Dios anticipa a Cristo, el Rey perfecto y eterno.',
        connections:[{to:'david_rey',label:'David, rey de Israel'}],
        prophecy:'La búsqueda de un rey fiel solo se sacia en el Mesías.' },

      { id:'david_goliat', era:'reino_unido', name:'David y Goliat', date:'c. 1020 a.C.',
        summary:'Un joven pastor vence al gigante con fe y una honda.',
        desc:'Mientras el ejército de Israel teme al gigante filisteo Goliat, el joven David lo enfrenta en el nombre de Jehová y lo derriba con una piedra, dando la victoria a su pueblo.',
        context:'Los filisteos amenazaban a Israel y nadie se atrevía a enfrentar a su campeón.',
        why:'Es el ejemplo perpetuo de la fe que confía en Dios frente a lo imposible, y revela el corazón valiente del futuro rey.',
        chars:[P('david','David'),P('saul','Saúl')],
        refs:['1 Samuel 17:45','1 Samuel 17:47'],
        conseq:'David gana fama y favor, iniciando el camino al trono, pero también los celos de Saúl.',
        after:{ to:'david_rey', text:'Tras años de persecución, David llega a ser rey de todo Israel.' },
        christ:'David, el ungido rechazado que vence al enemigo por el pueblo, prefigura a Cristo, el Hijo de David.',
        connections:[{to:'david_rey',label:'David, rey de Israel'}],
        prophecy:'«La batalla es de Jehová» (1 Sm 17:47) anticipa la victoria de Dios en la cruz.' },

      { id:'david_rey', era:'reino_unido', name:'David, rey de Israel', date:'c. 1010 a.C.',
        summary:'David unifica el reino, conquista Jerusalén y recibe el pacto eterno.',
        desc:'Tras años de persecución por Saúl, David llega a ser rey de todo Israel. Conquista Jerusalén, lleva allí el arca y recibe de Dios la promesa de un trono eterno: el pacto davídico.',
        context:'Israel alcanza su mayor unidad bajo un rey que ama a Dios de corazón pese a sus caídas.',
        why:'Funda la esperanza mesiánica: la promesa de un descendiente cuyo reino no tendrá fin. Jerusalén se vuelve la ciudad santa.',
        chars:[P('david','David'),P('samuel','Samuel'),P('natan','Natán')],
        refs:['2 Samuel 5:7','2 Samuel 7:16','Salmos 23:1'],
        conseq:'Jerusalén se vuelve centro del culto; el pacto davídico funda la esperanza del Mesías.',
        after:{ to:'david_betsabe', text:'Aun el gran rey cae: el pecado de David con Betsabé y su arrepentimiento.' },
        christ:'Dios promete a David un trono para siempre (2 Sm 7:16), cumplido en Cristo, «el Hijo de David» (Lucas 1:32-33).',
        connections:[{to:'templo_salomon',label:'El Templo de Salomón'},{to:'nacimiento_jesus',label:'El nacimiento de Jesús'}],
        prophecy:'El pacto davídico es una de las raíces más importantes de la esperanza mesiánica.' },

      { id:'david_betsabe', era:'reino_unido', name:'El pecado de David y su arrepentimiento', date:'c. 990 a.C.',
        summary:'David cae en adulterio y homicidio, pero se arrepiente de corazón.',
        desc:'David comete adulterio con Betsabé y orquesta la muerte de su esposo Urías. El profeta Natán lo confronta, y David se arrepiente profundamente, como expresa el Salmo 51.',
        context:'En la cumbre de su poder, el rey conforme al corazón de Dios cae en un grave pecado.',
        why:'Muestra que nadie está exento de caer, pero también que ningún pecado está fuera del alcance del perdón cuando hay arrepentimiento genuino.',
        chars:[P('david','David'),P('natan','Natán')],
        refs:['2 Samuel 12:7','2 Samuel 12:13','Salmos 51:10'],
        conseq:'David es perdonado pero sufre graves consecuencias familiares; deja el mayor salmo de arrepentimiento.',
        after:{ to:'templo_salomon', text:'Su hijo Salomón hereda el reino y construye el templo.' },
        christ:'El perdón que David recibe por gracia anticipa la justificación plena que viene por Cristo.',
        connections:[{to:'templo_salomon',label:'El Templo de Salomón'}],
        prophecy:'El Salmo 51 anhela la limpieza del corazón que el nuevo pacto en Cristo cumple.' },

      { id:'templo_salomon', era:'reino_unido', name:'El Templo de Salomón', date:'c. 966 a.C.',
        summary:'Salomón edifica el templo y el reino alcanza su mayor esplendor.',
        desc:'Salomón, dotado de sabiduría extraordinaria, construye el magnífico templo de Jerusalén. El reino alcanza su apogeo de paz y riqueza, pero la idolatría de su vejez sembrará la división.',
        context:'En la cúspide del reino unido, Israel disfruta de prosperidad sin precedentes.',
        why:'El templo se vuelve el corazón de la fe de Israel y la morada de Dios entre su pueblo, prefigurando una presencia mayor por venir.',
        chars:[P('salomon','Salomón'),P('david','David')],
        refs:['1 Reyes 3:9','1 Reyes 6:1','1 Reyes 8:27'],
        conseq:'El culto se centraliza en Jerusalén; pero la apostasía de Salomón conducirá a la división del reino.',
        after:{ to:'reino_dividido_ev', text:'A su muerte, el reino se parte en dos: Israel y Judá.' },
        christ:'Jesús, «mayor que el templo» (Mateo 12:6) y «mayor que Salomón» (Mateo 12:42), es la verdadera morada de Dios.',
        connections:[{to:'reino_dividido_ev',label:'La división del reino'}],
        prophecy:'El templo anticipa a Cristo, en quien habita corporalmente toda la plenitud de Dios.' },

      /* ════ REINO DIVIDIDO ════ */
      { id:'reino_dividido_ev', era:'reino_dividido', name:'La división del reino', date:'c. 931 a.C.',
        summary:'El reino se parte en Israel (norte) y Judá (sur).',
        desc:'A la muerte de Salomón, su hijo Roboam endurece su gobierno y diez tribus se rebelan. El reino se divide: Israel en el norte, con reyes idólatras, y Judá en el sur, donde permanece la línea de David.',
        context:'La idolatría y los pesados tributos de Salomón fracturan la unidad nacional.',
        why:'Comienza el largo declive espiritual que llevará al exilio, pero Dios preserva la línea de David en Judá por amor a su promesa.',
        chars:[P('salomon','Salomón')],
        refs:['1 Reyes 11:11','1 Reyes 12:16'],
        conseq:'Surgen dos reinos rivales y debilitados; Dios levantará profetas para llamarlos al arrepentimiento.',
        after:{ to:'elias_baal', text:'Dios levanta a Elías para confrontar la idolatría del norte.' },
        christ:'Aun en la división, Dios guarda la línea davídica por la que vendría el Mesías.',
        connections:[{to:'caida_israel',label:'Caída de Israel'},{to:'caida_juda',label:'Caída de Judá'}],
        prophecy:'La preservación de Judá asegura el cumplimiento de la promesa mesiánica.' },

      { id:'elias_baal', era:'reino_dividido', name:'Elías y los profetas de Baal', date:'c. 860 a.C.',
        summary:'En el monte Carmelo, Dios responde con fuego y vence a Baal.',
        desc:'El profeta Elías desafía a los 450 profetas de Baal en el monte Carmelo. Dios responde con fuego del cielo, demostrando que solo Jehová es Dios, y el pueblo se postra.',
        context:'Bajo el rey Acab y la reina Jezabel, Israel había caído de lleno en el culto a Baal.',
        why:'Reafirma de forma dramática que solo Jehová es Dios, en el momento de mayor apostasía, y fortalece el ministerio profético como voz de Dios a la nación.',
        chars:[P('elias','Elías'),P('eliseo','Eliseo')],
        refs:['1 Reyes 18:21','1 Reyes 18:38','1 Reyes 19:12'],
        conseq:'Se reafirma la soberanía de Dios; Elías unge a Eliseo como su sucesor.',
        after:{ to:'eliseo_milagros', text:'Eliseo continúa la obra con el doble de milagros.' },
        christ:'Malaquías profetiza el regreso de «Elías» antes del Mesías, cumplido en Juan el Bautista (Lucas 1:17).',
        connections:[{to:'nacimiento_jesus',label:'El nacimiento de Jesús'}],
        prophecy:'Elías apareció con Cristo en la transfiguración, atestiguando su gloria (Mateo 17:3).' },

      { id:'eliseo_milagros', era:'reino_dividido', name:'El ministerio de Eliseo', date:'c. 850 a.C.',
        summary:'El sucesor de Elías obra milagros de gracia y provisión.',
        desc:'Eliseo, que pidió una doble porción del espíritu de Elías, realiza numerosos milagros: multiplica el aceite de una viuda, resucita a un niño y sana de lepra al sirio Naamán.',
        context:'En el idólatra reino del norte, Dios sigue mostrando su poder y compasión por medio de su profeta.',
        why:'Sus milagros de provisión, sanidad y resurrección revelan el corazón compasivo de Dios y anticipan el ministerio de Jesús.',
        chars:[P('eliseo','Eliseo'),P('elias','Elías')],
        refs:['2 Reyes 2:9','2 Reyes 5:14','2 Reyes 6:16'],
        conseq:'El testimonio de Dios se mantiene vivo en Israel pese a la apostasía de sus reyes.',
        after:{ to:'jonas_ninive', text:'Otro profeta, Jonás, es enviado a predicar a la enemiga Nínive.' },
        christ:'Los milagros de Eliseo —alimentar, sanar leprosos, resucitar muertos— anticipan los de Jesús, hechos con autoridad divina.',
        connections:[{to:'ministerio_jesus',label:'El ministerio de Jesús'}],
        prophecy:'Jesús mencionó la sanidad de Naamán como señal de la gracia que alcanza a los gentiles (Lucas 4:27).' },

      { id:'jonas_ninive', era:'reino_dividido', name:'Jonás predica a Nínive', date:'c. 760 a.C.',
        summary:'Tras huir de Dios, Jonás ve arrepentirse a una ciudad enemiga.',
        desc:'Llamado a predicar a la cruel Nínive, Jonás huye y es tragado por un gran pez. Tras ser librado, predica y toda la ciudad se arrepiente, mostrando la misericordia universal de Dios.',
        context:'Asiria era el enemigo temido de Israel; Jonás no quería que Dios la perdonara.',
        why:'Revela que la compasión de Dios alcanza incluso a los enemigos, y desafía todo nacionalismo religioso. Anticipa la misión a todas las naciones.',
        chars:[P('jonas','Jonás')],
        refs:['Jonás 2:9','Jonás 3:10','Jonás 4:2'],
        conseq:'Nínive se arrepiente y es perdonada; queda el modelo de la gracia de Dios para los gentiles.',
        after:{ to:'caida_israel', text:'A pesar de los profetas, el reino del norte cae ante Asiria.' },
        christ:'Jesús comparó los tres días de Jonás en el pez con su muerte y resurrección (Mateo 12:40): «la señal de Jonás».',
        connections:[{to:'resurreccion',label:'La resurrección'}],
        prophecy:'Jonás es figura de la muerte y resurrección de Cristo y de la gracia a las naciones.' },

      { id:'caida_israel', era:'reino_dividido', name:'Caída de Israel ante Asiria', date:'722 a.C.',
        summary:'El reino del norte es destruido y deportado por Asiria.',
        desc:'Tras siglos de idolatría sin arrepentimiento, el reino del norte de Israel es conquistado por Asiria. Samaria cae y sus habitantes son deportados, cumpliendo las advertencias de los profetas.',
        context:'El reino del norte nunca tuvo un rey fiel a Dios, pese a innumerables llamados proféticos.',
        why:'Es la prueba solemne de que la palabra de Dios se cumple y de que la idolatría persistente trae juicio. Solo Judá queda como portador de la promesa.',
        chars:[P('oseas','Oseas'),P('amos','Amós')],
        refs:['2 Reyes 17:7','2 Reyes 17:23'],
        conseq:'Las diez tribus del norte se pierden entre las naciones; solo Judá permanece.',
        after:{ to:'isaias_ezequias', text:'En el sur, Judá vive un avivamiento bajo Ezequías e Isaías.' },
        christ:'Oseas, cuyo matrimonio simbolizó el amor fiel de Dios, anuncia la gracia que se cumple en Cristo (Oseas 11:1; Mateo 2:15).',
        connections:[{to:'caida_juda',label:'Caída de Judá'}],
        prophecy:'El juicio anunciado se cumple, confirmando que la palabra de Dios no vuelve vacía.' },

      { id:'isaias_ezequias', era:'reino_dividido', name:'Isaías y el rey Ezequías', date:'c. 701 a.C.',
        summary:'Judá confía en Dios y Jerusalén es librada de Asiria.',
        desc:'Cuando Asiria amenaza a Judá, el rey Ezequías, guiado por Isaías, confía en Dios y ora. En una sola noche, el ángel de Jehová destruye al ejército asirio y Jerusalén es librada.',
        context:'Mientras el norte caía, Judá vive un avivamiento bajo uno de sus reyes más fieles.',
        why:'Demuestra que confiar en Dios trae liberación frente a lo imposible. Además, Isaías deja las profecías mesiánicas más detalladas de todo el Antiguo Testamento.',
        chars:[P('isaias','Isaías'),P('ezequias','Ezequías')],
        refs:['Isaías 7:14','Isaías 37:36','Isaías 53:5'],
        conseq:'Judá sobrevive por confiar en Dios; las profecías de Isaías iluminan toda la esperanza mesiánica.',
        after:{ to:'josias_reforma', text:'Más tarde, el rey Josías lidera la última gran reforma de Judá.' },
        christ:'Isaías 7:14 anuncia el nacimiento virginal («Emanuel») e Isaías 53 describe al Siervo sufriente, cumplidos en Jesús.',
        connections:[{to:'nacimiento_jesus',label:'El nacimiento de Jesús'},{to:'crucifixion',label:'La crucifixión'}],
        prophecy:'Isaías es el «profeta evangélico»: ningún otro describe a Cristo con tanto detalle.' },

      { id:'josias_reforma', era:'reino_dividido', name:'La reforma de Josías', date:'c. 622 a.C.',
        summary:'Al hallarse el libro de la Ley, el rey guía un gran avivamiento.',
        desc:'Durante reparaciones del templo se halla el libro de la Ley, olvidado. El joven rey Josías se humilla, renueva el pacto y purga la idolatría de la tierra en la última gran reforma de Judá.',
        context:'Tras décadas de apostasía, un rey de corazón sensible busca a Dios de todo corazón.',
        why:'Muestra el poder transformador de la Palabra de Dios redescubierta, capaz de avivar a toda una nación, aunque sea por un tiempo.',
        chars:[P('josias','Josías')],
        refs:['2 Reyes 22:19','2 Reyes 23:25'],
        conseq:'Hay un último avivamiento; pero la decisión del pueblo ya estaba marcada y el juicio se acerca.',
        after:{ to:'caida_juda', text:'Pese a la reforma, Judá cae finalmente ante Babilonia.' },
        christ:'El avivamiento por la Palabra anticipa la vida nueva que produce el evangelio de Cristo, la Palabra viva.',
        connections:[{to:'caida_juda',label:'Caída de Judá'}],
        prophecy:'Josías cumplió una profecía dada 300 años antes que lo nombraba (1 Reyes 13:2).' },

      { id:'caida_juda', era:'reino_dividido', name:'Caída de Judá y del Templo', date:'586 a.C.',
        summary:'Babilonia destruye Jerusalén y el templo; comienza el exilio.',
        desc:'Tras décadas de advertencias de Jeremías, ignoradas por el pueblo, Babilonia conquista Jerusalén, destruye el templo de Salomón y deporta a Judá.',
        context:'El último reino agota la paciencia de Dios tras generaciones de idolatría e injusticia.',
        why:'Marca el punto más bajo de la historia de Israel: pierde tierra, ciudad y templo. Pero los profetas ya anunciaban restauración y un nuevo pacto.',
        chars:[P('jeremias','Jeremías')],
        refs:['2 Reyes 25:9','Jeremías 39:8','Lamentaciones 1:1'],
        conseq:'Comienzan los 70 años de cautiverio en Babilonia anunciados por Jeremías.',
        after:{ to:'exilio_babilonia', text:'El pueblo aprende a adorar a Dios en tierra extraña durante el exilio.' },
        christ:'Jeremías anunció el «nuevo pacto» que Dios escribiría en el corazón (Jer 31:31), cumplido por Cristo con su sangre.',
        connections:[{to:'exilio_babilonia',label:'El exilio en Babilonia'},{to:'ultima_cena',label:'La última cena'}],
        prophecy:'El nuevo pacto profetizado por Jeremías se inaugura en la última cena de Jesús.' },

      /* ════ EXILIO ════ */
      { id:'exilio_babilonia', era:'exilio', name:'El exilio en Babilonia', date:'605–538 a.C.',
        summary:'Cautivos lejos de su tierra, el pueblo abandona la idolatría.',
        desc:'Lejos de Jerusalén, los judíos aprenden a adorar a Dios sin templo. Daniel y Ezequiel sostienen la fe del pueblo con profecías de los imperios y de la restauración.',
        context:'El exilio purifica al pueblo de la idolatría que lo había arruinado.',
        why:'Transforma a Israel: abandona definitivamente la idolatría, nace la sinagoga y se profundiza la esperanza mesiánica.',
        chars:[P('daniel','Daniel'),P('ezequiel','Ezequiel')],
        refs:['Daniel 7:13','Ezequiel 37:5','Jeremías 29:11'],
        conseq:'Surge la sinagoga; el pueblo regresa a las Escrituras y a la esperanza del Mesías.',
        after:{ to:'horno_fuego', text:'En Babilonia, tres jóvenes fieles son librados del horno de fuego.' },
        christ:'Daniel ve al «Hijo del Hombre» que recibe un reino eterno (Dn 7:13-14), título que Jesús aplicó a sí mismo.',
        connections:[{to:'foso_leones',label:'Daniel en el foso de los leones'},{to:'regreso_exilio',label:'El regreso del exilio'}],
        prophecy:'Las visiones de Daniel trazan la historia hasta el reino eterno del Mesías.' },

      { id:'horno_fuego', era:'exilio', name:'El horno de fuego', date:'c. 590 a.C.',
        summary:'Tres jóvenes fieles son librados del fuego por Dios.',
        desc:'Sadrac, Mesac y Abed-nego se niegan a adorar la estatua del rey y son arrojados a un horno ardiente. Dios los libra: un cuarto, «semejante a hijo de los dioses», camina con ellos en el fuego.',
        context:'En el exilio, los fieles enfrentan la presión de comprometer su adoración a Dios.',
        why:'Es un poderoso ejemplo de fidelidad bajo presión y de la presencia de Dios con los suyos en medio de la prueba.',
        chars:[P('daniel','Daniel')],
        refs:['Daniel 3:17','Daniel 3:25'],
        conseq:'El rey reconoce al Dios verdadero; los fieles son honrados.',
        after:{ to:'foso_leones', text:'El propio Daniel será librado del foso de los leones.' },
        christ:'La figura «semejante a hijo de los dioses» en el fuego recuerda la presencia de Cristo con los suyos en la prueba.',
        connections:[{to:'foso_leones',label:'Daniel en el foso de los leones'}],
        prophecy:'La liberación de la muerte anticipa la victoria de Cristo sobre ella.' },

      { id:'foso_leones', era:'exilio', name:'Daniel en el foso de los leones', date:'c. 538 a.C.',
        summary:'Por orar a Dios, Daniel es arrojado a los leones y librado.',
        desc:'Daniel sigue orando a Dios tres veces al día pese a un decreto que lo prohíbe. Es arrojado al foso de los leones, pero Dios envía a su ángel y le cierra la boca de las fieras.',
        context:'Envidiado por su integridad, Daniel es víctima de una trampa legal en la corte persa.',
        why:'Modelo supremo de integridad y oración perseverante. Muestra que Dios honra a quienes lo honran, aun a costa de la vida.',
        chars:[P('daniel','Daniel')],
        refs:['Daniel 6:10','Daniel 6:22'],
        conseq:'El rey proclama al Dios de Daniel; queda el testimonio de la fidelidad recompensada.',
        after:{ to:'regreso_exilio', text:'Cumplida la profecía, el pueblo comienza a regresar a Jerusalén.' },
        christ:'Daniel, inocente y sellado en una fosa de la que sale con vida, recuerda a Cristo en la tumba y su resurrección.',
        connections:[{to:'resurreccion',label:'La resurrección'}],
        prophecy:'Daniel profetizó el tiempo de la venida del Mesías (Daniel 9:24-26).' },

      /* ════ RESTAURACIÓN ════ */
      { id:'regreso_exilio', era:'restauracion', name:'El regreso del exilio', date:'538 a.C.',
        summary:'Por decreto de Ciro, los judíos regresan y reconstruyen el templo.',
        desc:'Tal como anunció la profecía, el rey persa Ciro permite a los judíos regresar a Jerusalén. Animados por Hageo y Zacarías, reconstruyen el templo (el «segundo templo») y restauran el culto.',
        context:'Persia derrota a Babilonia, y Dios mueve el corazón de Ciro para cumplir su promesa.',
        why:'Cumple la promesa de restauración y prepara el escenario para que el Mesías venga a este segundo templo.',
        chars:[P('hageo','Hageo'),P('zacarias_profeta','Zacarías')],
        refs:['Esdras 1:1','Hageo 1:8','Zacarías 4:6'],
        conseq:'Se restaura la nación y el culto en Jerusalén.',
        after:{ to:'ester_persia', text:'En Persia, la reina Ester salva a los judíos de la dispersión.' },
        christ:'Hageo profetizó que «la gloria postrera de esta casa será mayor», cumplido cuando Cristo enseñó en el segundo templo (Hageo 2:9).',
        connections:[{to:'nacimiento_jesus',label:'El nacimiento de Jesús'}],
        prophecy:'Zacarías profetizó al Rey humilde que entraría montado en un asno (Zacarías 9:9).' },

      { id:'ester_persia', era:'restauracion', name:'Ester salva a su pueblo', date:'c. 480 a.C.',
        summary:'Una reina judía arriesga su vida y libra a su pueblo del exterminio.',
        desc:'En el imperio persa, la judía Ester llega a ser reina. Cuando Amán trama exterminar a los judíos, Ester arriesga su vida ante el rey con las palabras «si perezco, que perezca», y su pueblo es salvado.',
        context:'Para los judíos dispersos en el imperio, la providencia oculta de Dios obra para preservarlos.',
        why:'Muestra que Dios obra providencialmente, aun sin ser nombrado, para preservar a su pueblo y, con él, la línea del Mesías.',
        chars:[P('ester','Ester')],
        refs:['Ester 4:14','Ester 4:16'],
        conseq:'El pueblo judío es preservado de la aniquilación; nace la fiesta de Purim.',
        after:{ to:'nehemias_muros', text:'En Jerusalén, Nehemías reconstruye los muros de la ciudad.' },
        christ:'La preservación del pueblo asegura la venida del Salvador que de él nacería.',
        connections:[{to:'nacimiento_jesus',label:'El nacimiento de Jesús'}],
        prophecy:'La providencia que salva al pueblo apunta al plan redentor que culmina en Cristo.' },

      { id:'nehemias_muros', era:'restauracion', name:'Nehemías reconstruye los muros', date:'445 a.C.',
        summary:'En 52 días se reconstruyen los muros de Jerusalén.',
        desc:'Nehemías, copero del rey persa, regresa a Jerusalén y, pese a la oposición, dirige la reconstrucción de los muros en solo 52 días. Esdras lee la Ley y el pueblo se renueva en un gran avivamiento.',
        context:'Jerusalén estaba indefensa y en oprobio; el pueblo necesitaba seguridad y renovación espiritual.',
        why:'Completa la restauración física y espiritual del pueblo, y muestra cómo la oración, el liderazgo y la Palabra renuevan a una comunidad.',
        chars:[],
        refs:['Nehemías 2:18','Nehemías 6:15','Nehemías 8:8'],
        conseq:'Jerusalén queda segura y el pueblo, reavivado por la lectura de la Ley.',
        after:{ to:'malaquias_silencio', text:'El último profeta, Malaquías, cierra el Antiguo Testamento.' },
        christ:'La restauración de Jerusalén prepara el escenario para la venida del Mesías a su ciudad.',
        connections:[{to:'malaquias_silencio',label:'Malaquías y el silencio'}],
        prophecy:'El decreto para restaurar Jerusalén inicia el cómputo profético de Daniel hacia el Mesías (Daniel 9:25).' },

      { id:'malaquias_silencio', era:'restauracion', name:'Malaquías y el silencio profético', date:'c. 430 a.C.',
        summary:'El último profeta del AT anuncia al mensajero y al «Sol de justicia».',
        desc:'Malaquías, último profeta del Antiguo Testamento, confronta la frialdad espiritual del pueblo restaurado y anuncia que Dios enviará un mensajero para preparar el camino del Señor.',
        context:'La comunidad postexílica, ya sin idolatría pero tibia, necesita un último llamado.',
        why:'Cierra el Antiguo Testamento con la mirada puesta en la venida del Mesías y de su precursor, tendiendo el puente al Nuevo Testamento.',
        chars:[P('malaquias','Malaquías')],
        refs:['Malaquías 3:1','Malaquías 4:2','Malaquías 4:5'],
        conseq:'Tras él vienen 400 años sin voz profética.',
        after:{ to:'intertestamentario', text:'Comienzan los 400 años de silencio entre los Testamentos.' },
        christ:'Anuncia al mensajero (Juan el Bautista) y al «Sol de justicia» (Cristo) que traería salvación en sus alas.',
        connections:[{to:'nacimiento_jesus',label:'El nacimiento de Jesús'}],
        prophecy:'Malaquías es la última palabra profética antes de la venida del Mesías.' },

      /* ════ INTERTESTAMENTARIO ════ */
      { id:'intertestamentario', era:'intertestamentario', name:'400 años de silencio', date:'c. 430–5 a.C.',
        summary:'Entre los Testamentos, Dios prepara el escenario para el Mesías.',
        desc:'Durante cuatro siglos sin profetas, el mundo cambia: el griego se vuelve lengua común, las Escrituras se traducen, surge la sinagoga, y Roma impone una paz y caminos que facilitarán la difusión del evangelio.',
        context:'Imperios griego y romano se suceden; aunque Dios calla por boca de profetas, obra en la historia.',
        why:'Prepara al mundo —política, cultural y lingüísticamente— para la venida de Cristo y la rápida expansión del evangelio en «el cumplimiento del tiempo».',
        chars:[],
        refs:['Gálatas 4:4'],
        conseq:'El mundo queda listo para la venida del Mesías y la difusión del evangelio.',
        after:{ to:'nacimiento_jesus', text:'En el momento preciso, nace el Salvador prometido.' },
        christ:'«Cuando vino el cumplimiento del tiempo, Dios envió a su Hijo» (Gálatas 4:4): todo el silencio preparaba ese momento.',
        connections:[{to:'nacimiento_jesus',label:'El nacimiento de Jesús'}],
        prophecy:'El largo silencio precede el cumplimiento de todas las profecías mesiánicas.' },

      /* ════ VIDA DE CRISTO ════ */
      { id:'nacimiento_jesus', era:'cristo', name:'El nacimiento de Jesús', date:'c. 5/4 a.C.',
        summary:'El Hijo de Dios se hace hombre, nacido de la virgen María en Belén.',
        desc:'Cumpliendo siglos de profecías, el Verbo eterno se hace carne: Jesús nace de la virgen María en Belén, anunciado por ángeles y adorado por pastores y magos. Es «Emanuel», Dios con nosotros.',
        context:'Bajo el dominio de Roma y en el cumplimiento del tiempo, Dios irrumpe en la historia de la forma más humilde.',
        why:'Es el momento bisagra de toda la historia: Dios se hace hombre. Todas las promesas del Antiguo Testamento empiezan a cumplirse en una persona.',
        chars:[P('jesus','Jesús'),P('maria','María'),P('jose_naz','José (de Nazaret)'),P('juan_bautista','Juan el Bautista'),P('simeon','Simeón')],
        refs:['Mateo 1:23','Lucas 2:7','Lucas 2:11'],
        conseq:'Comienza la era del cumplimiento: las promesas toman cuerpo en Jesucristo.',
        after:{ to:'bautismo_jesus', text:'Treinta años después, Jesús es bautizado e inicia su ministerio.' },
        christ:'Cumple Miqueas 5:2 (nacido en Belén) e Isaías 7:14 (nacido de virgen, Emanuel), entre más de 300 profecías mesiánicas.',
        connections:[{to:'crucifixion',label:'La crucifixión'},{to:'caida',label:'La Caída'}],
        prophecy:'En Belén nace el Rey prometido a David, cuyo reino no tendrá fin.' },

      { id:'bautismo_jesus', era:'cristo', name:'El bautismo de Jesús', date:'c. 27 d.C.',
        summary:'Juan bautiza a Jesús y el Padre y el Espíritu se manifiestan.',
        desc:'Jesús es bautizado por Juan en el Jordán. El Espíritu desciende como paloma y el Padre declara desde el cielo: «Este es mi Hijo amado». Así comienza públicamente su ministerio.',
        context:'Juan el Bautista preparaba el camino del Señor con un bautismo de arrepentimiento.',
        why:'Inaugura el ministerio de Jesús y revela a la Trinidad. Jesús se identifica con los pecadores que vino a salvar.',
        chars:[P('jesus','Jesús'),P('juan_bautista','Juan el Bautista')],
        refs:['Mateo 3:16','Mateo 3:17','Juan 1:29'],
        conseq:'Comienza el ministerio público de Jesús, confirmado por el Padre y el Espíritu.',
        after:{ to:'ministerio_jesus', text:'Jesús recorre Israel proclamando el Reino y haciendo milagros.' },
        christ:'Juan lo señala como «el Cordero de Dios que quita el pecado del mundo» (Juan 1:29).',
        connections:[{to:'ministerio_jesus',label:'El ministerio de Jesús'}],
        prophecy:'Cumple la profecía de la voz que clama en el desierto preparando el camino (Isaías 40:3).' },

      { id:'ministerio_jesus', era:'cristo', name:'El ministerio de Jesús', date:'c. 27–30 d.C.',
        summary:'Jesús enseña el Reino, hace milagros y llama a sus discípulos.',
        desc:'Jesús recorre Israel proclamando el Reino de Dios, sanando enfermos, resucitando muertos y enseñando con autoridad. Llama a los doce apóstoles y revela que es el Hijo de Dios.',
        context:'En una nación que esperaba un Mesías político, Jesús inaugura un reino que transforma corazones.',
        why:'Revela el carácter de Dios y la naturaleza de su Reino. Forma a los discípulos que llevarán el evangelio al mundo.',
        chars:[P('jesus','Jesús'),P('pedro','Pedro'),P('juan','Juan'),P('mateo','Mateo')],
        refs:['Marcos 1:15','Mateo 5:3','Juan 6:35'],
        conseq:'Se forma el grupo de discípulos; crece tanto la fe del pueblo como la oposición de los líderes.',
        after:{ to:'transfiguracion', text:'En un monte, tres discípulos ven a Jesús transfigurado en gloria.' },
        christ:'Su ministerio de buenas nuevas cumple Isaías 61:1, que Jesús leyó y aplicó a sí mismo (Lucas 4:18-21).',
        connections:[{to:'crucifixion',label:'La crucifixión'}],
        prophecy:'Los milagros mesiánicos confirman que el Reino de Dios había llegado en Él.' },

      { id:'transfiguracion', era:'cristo', name:'La transfiguración', date:'c. 29 d.C.',
        summary:'Jesús revela su gloria divina ante tres discípulos.',
        desc:'En un monte alto, Jesús se transfigura: su rostro resplandece como el sol. Aparecen Moisés y Elías hablando con Él, y el Padre declara de nuevo: «Este es mi Hijo amado; a él oíd».',
        context:'Camino a la cruz, Jesús fortalece a sus discípulos mostrándoles un anticipo de su gloria.',
        why:'Confirma la deidad y gloria de Jesús, y que en Él se cumplen la Ley (Moisés) y los Profetas (Elías). Prepara a los discípulos para la cruz.',
        chars:[P('jesus','Jesús'),P('pedro','Pedro'),P('juan','Juan')],
        refs:['Mateo 17:2','Mateo 17:5','2 Pedro 1:17'],
        conseq:'Los discípulos reciben un anticipo de la gloria de Cristo que sostendrá su fe.',
        after:{ to:'entrada_triunfal', text:'Jesús entra triunfalmente en Jerusalén, aclamado como Rey.' },
        christ:'Revela la gloria divina de Jesús, el Hijo amado en quien se cumplen la Ley y los Profetas.',
        connections:[{to:'resurreccion',label:'La resurrección'}],
        prophecy:'Anticipa la gloria del Cristo resucitado y de su segunda venida.' },

      { id:'entrada_triunfal', era:'cristo', name:'La entrada triunfal', date:'c. 30/33 d.C.',
        summary:'Jesús entra en Jerusalén aclamado como Rey, montado en un asno.',
        desc:'Pocos días antes de su muerte, Jesús entra en Jerusalén montado en un asno, mientras la multitud lo aclama con ramas de palma: «¡Hosanna al Hijo de David!». Es la presentación pública del Mesías como Rey.',
        context:'Jerusalén se llena de peregrinos para la Pascua; las expectativas mesiánicas están en su punto más alto.',
        why:'Cumple literalmente la profecía del Rey humilde y abre la semana decisiva que llevará a la cruz y la resurrección.',
        chars:[P('jesus','Jesús')],
        refs:['Mateo 21:9','Zacarías 9:9','Juan 12:13'],
        conseq:'Comienza la última semana; la aclamación pública precipita la oposición final.',
        after:{ to:'ultima_cena', text:'Esa semana, Jesús instituye la Cena del Señor con sus discípulos.' },
        christ:'Cumple Zacarías 9:9: «He aquí tu rey vendrá a ti... humilde, y cabalgando sobre un asno».',
        connections:[{to:'crucifixion',label:'La crucifixión'}],
        prophecy:'El Rey-Mesías es presentado a Jerusalén exactamente como lo anunció Zacarías.' },

      { id:'ultima_cena', era:'cristo', name:'La última cena', date:'c. 30/33 d.C.',
        summary:'Jesús instituye la Cena del Señor y el nuevo pacto en su sangre.',
        desc:'En la Pascua, Jesús comparte el pan y la copa con sus discípulos, declarando que son su cuerpo y su sangre del nuevo pacto. Lava sus pies, enseña sobre el amor y anuncia su traición.',
        context:'La noche antes de su muerte, Jesús celebra la Pascua dándole su significado definitivo.',
        why:'Inaugura el nuevo pacto profetizado y deja a la Iglesia la Cena del Señor como memorial perpetuo de su sacrificio.',
        chars:[P('jesus','Jesús'),P('pedro','Pedro'),P('juan','Juan'),P('judas_iscariote','Judas Iscariote')],
        refs:['Lucas 22:19','Lucas 22:20','Juan 13:34'],
        conseq:'Se instituye la Cena del Señor; Judas sale a consumar la traición.',
        after:{ to:'crucifixion', text:'Esa misma noche Jesús es arrestado y al día siguiente, crucificado.' },
        christ:'La Cena revela el centro del evangelio: el cuerpo entregado y la sangre derramada de Cristo «por muchos».',
        connections:[{to:'crucifixion',label:'La crucifixión'},{to:'sinai_ley',label:'La Ley en el Sinaí'}],
        prophecy:'Cumple e inaugura el «nuevo pacto» anunciado por Jeremías 31:31.' },

      { id:'crucifixion', era:'cristo', name:'La crucifixión', date:'c. 30/33 d.C.',
        summary:'Jesús muere en la cruz por los pecados del mundo.',
        desc:'Traicionado por Judas y condenado injustamente, Jesús es crucificado. En la cruz carga el pecado de la humanidad, declara «consumado es» y entrega su espíritu. El velo del templo se rasga.',
        context:'Los líderes religiosos y el poder romano se unen contra Jesús, pero todo ocurre «por el determinado consejo» de Dios.',
        why:'Es el centro de toda la Biblia: aquí se realiza la expiación por el pecado y se abre el acceso a Dios. La aparente derrota es la mayor victoria.',
        chars:[P('jesus','Jesús'),P('maria','María'),P('juan','Juan'),P('pedro','Pedro'),P('judas_iscariote','Judas Iscariote')],
        refs:['Lucas 23:34','Juan 19:30','Mateo 27:51'],
        conseq:'Se realiza la expiación; el camino a Dios queda abierto para todo el que cree.',
        after:{ to:'resurreccion', text:'Al tercer día, la tumba aparece vacía: Jesús resucita.' },
        christ:'El sacrificio de Cristo es el corazón del plan de salvación: por su muerte somos reconciliados con Dios.',
        connections:[{to:'resurreccion',label:'La resurrección'},{to:'isaac_moriah',label:'Isaac ofrecido en Moriah'}],
        prophecy:'Cumple Isaías 53, el Salmo 22 y Zacarías 12:10, escritos siglos antes de la cruz.' },

      { id:'resurreccion', era:'cristo', name:'La resurrección', date:'c. 30/33 d.C.',
        summary:'Al tercer día, Jesús resucita, venciendo el pecado y la muerte.',
        desc:'La tumba aparece vacía. Jesús se levanta de entre los muertos y se aparece a María Magdalena, a los discípulos y a más de quinientos testigos, confirmando que es el Hijo de Dios.',
        context:'Lo que parecía el fin se convierte en el acontecimiento central de la historia.',
        why:'Es la victoria definitiva sobre la muerte y la garantía de la salvación. Sin la resurrección, la fe sería vana; con ella, todo cambia.',
        chars:[P('jesus','Jesús'),P('maria_magdalena','María Magdalena'),P('pedro','Pedro'),P('juan','Juan'),P('tomas','Tomás')],
        refs:['Lucas 24:6','Juan 20:28','1 Corintios 15:20'],
        conseq:'La resurrección garantiza la vida eterna y transforma a los discípulos en valientes testigos.',
        after:{ to:'ascension', text:'Tras 40 días, Jesús asciende al cielo prometiendo el Espíritu.' },
        christ:'La resurrección es la prueba suprema de que el sacrificio de Cristo fue aceptado y la muerte, vencida.',
        connections:[{to:'pentecostes',label:'Pentecostés'},{to:'jonas_ninive',label:'Jonás predica a Nínive'}],
        prophecy:'Cumple el Salmo 16:10 y la señal de Jonás (Mateo 12:40), anunciada por el mismo Jesús.' },

      /* ════ IGLESIA ════ */
      { id:'ascension', era:'iglesia', name:'La ascensión', date:'c. 30/33 d.C.',
        summary:'Jesús asciende al cielo y promete volver.',
        desc:'Cuarenta días después de resucitar, Jesús da la Gran Comisión a sus discípulos y asciende al cielo en una nube. Dos ángeles anuncian que volverá de la misma manera.',
        context:'Jesús completa su obra terrenal y se sienta a la diestra del Padre como Señor.',
        why:'Marca la exaltación de Cristo como Rey y Sumo Sacerdote, y deja a la Iglesia la misión de ser testigos hasta lo último de la tierra.',
        chars:[P('jesus','Jesús'),P('pedro','Pedro'),P('juan','Juan')],
        refs:['Mateo 28:19','Hechos 1:8','Hechos 1:11'],
        conseq:'Cristo reina a la diestra del Padre; la Iglesia espera al Espíritu para iniciar su misión.',
        after:{ to:'pentecostes', text:'Diez días después, el Espíritu Santo desciende en Pentecostés.' },
        christ:'Cristo ascendido intercede por nosotros como Sumo Sacerdote y reina hasta su retorno.',
        connections:[{to:'pentecostes',label:'Pentecostés'},{to:'apocalipsis',label:'La revelación final'}],
        prophecy:'«Así vendrá» (Hechos 1:11): la ascensión garantiza la promesa de su segunda venida.' },

      { id:'pentecostes', era:'iglesia', name:'Pentecostés', date:'c. 30/33 d.C.',
        summary:'El Espíritu Santo desciende y nace la Iglesia.',
        desc:'Cincuenta días después de la resurrección, el Espíritu Santo desciende sobre los discípulos con fuego y viento. Pedro predica con poder y se convierten 3.000 personas en un día.',
        context:'Jesús había prometido enviar al Espíritu para empoderar a sus testigos.',
        why:'Nace la Iglesia, el cuerpo de Cristo, y comienza la era del Espíritu. El evangelio empieza a expandirse con poder por el mundo.',
        chars:[P('pedro','Pedro'),P('juan','Juan'),P('maria','María')],
        refs:['Hechos 1:8','Hechos 2:4','Hechos 2:41'],
        conseq:'La Iglesia se establece como comunidad del Espíritu; el evangelio comienza a difundirse.',
        after:{ to:'martirio_esteban', text:'La persecución se desata con el martirio de Esteban.' },
        christ:'El Espíritu glorifica a Cristo y aplica su obra a los creyentes; es el «Consolador» que Él prometió (Juan 14:16).',
        connections:[{to:'conversion_pablo',label:'La conversión de Pablo'},{to:'babel',label:'La Torre de Babel'}],
        prophecy:'Cumple Joel 2:28 («derramaré mi Espíritu sobre toda carne»), citado por Pedro (Hechos 2:16-17).' },

      { id:'martirio_esteban', era:'iglesia', name:'El martirio de Esteban', date:'c. 34 d.C.',
        summary:'El primer mártir cristiano muere perdonando a sus verdugos.',
        desc:'Esteban, lleno del Espíritu, predica con poder y es apedreado por el concilio. Muere viendo los cielos abiertos y perdonando a sus asesinos, entre ellos el joven Saulo.',
        context:'La oposición a la Iglesia crece hasta la violencia abierta en Jerusalén.',
        why:'Su muerte desata una persecución que dispersa a los creyentes y, con ellos, el evangelio. Su perdón refleja el de Cristo.',
        chars:[P('esteban','Esteban'),P('pablo','Pablo')],
        refs:['Hechos 7:56','Hechos 7:60'],
        conseq:'La persecución esparce el evangelio fuera de Jerusalén; Saulo presencia la escena.',
        after:{ to:'conversion_pablo', text:'El perseguidor Saulo se encuentra con Cristo camino a Damasco.' },
        christ:'Las últimas palabras de Esteban («no les tomes en cuenta este pecado») reflejan las de Cristo en la cruz.',
        connections:[{to:'conversion_pablo',label:'La conversión de Pablo'}],
        prophecy:'La sangre de los mártires, como la de Cristo, da fruto en la expansión del evangelio.' },

      { id:'conversion_pablo', era:'iglesia', name:'La conversión de Pablo', date:'c. 34 d.C.',
        summary:'El perseguidor Saulo se encuentra con Cristo y se vuelve apóstol.',
        desc:'Saulo de Tarso, feroz perseguidor de la Iglesia, se encuentra con el Cristo resucitado camino a Damasco. Transformado, se convierte en Pablo, el gran apóstol a los gentiles.',
        context:'La Iglesia perseguida ve a su mayor enemigo convertirse en su mayor misionero por pura gracia.',
        why:'Provee a la Iglesia su misionero y teólogo clave. Demuestra que nadie está fuera del alcance de la gracia transformadora de Dios.',
        chars:[P('pablo','Pablo'),P('bernabe','Bernabé')],
        refs:['Hechos 9:4','Hechos 9:15','Gálatas 1:23'],
        conseq:'Comienzan los grandes viajes misioneros que llevarán a Cristo al mundo gentil.',
        after:{ to:'concilio_jerusalen', text:'La Iglesia define que la salvación es por gracia, también para los gentiles.' },
        christ:'Pablo es «instrumento escogido» para llevar el nombre de Cristo a los gentiles y reyes (Hechos 9:15).',
        connections:[{to:'mision_gentiles',label:'El evangelio a los gentiles'}],
        prophecy:'La gracia que transforma al perseguidor revela el poder del evangelio que Pablo predicaría.' },

      { id:'concilio_jerusalen', era:'iglesia', name:'El concilio de Jerusalén', date:'c. 49 d.C.',
        summary:'La Iglesia confirma que la salvación es por gracia, no por la ley.',
        desc:'Ante la pregunta de si los gentiles debían guardar la ley de Moisés, los apóstoles y ancianos se reúnen en Jerusalén y confirman que la salvación es por la gracia de Cristo, sin imponer la ley.',
        context:'La rápida conversión de gentiles plantea la pregunta más decisiva de la Iglesia primitiva.',
        why:'Preserva la pureza del evangelio de la gracia y abre de par en par la puerta a los gentiles, definiendo la identidad de la Iglesia universal.',
        chars:[P('pedro','Pedro'),P('pablo','Pablo'),P('bernabe','Bernabé'),P('santiago_hermano','Santiago')],
        refs:['Hechos 15:11','Hechos 15:19'],
        conseq:'Se asegura que el evangelio de la gracia llegue libremente a todas las naciones.',
        after:{ to:'mision_gentiles', text:'El evangelio se extiende por todo el imperio romano.' },
        christ:'Confirma que «por la gracia del Señor Jesús seremos salvos» (Hechos 15:11), sin obras de la ley.',
        connections:[{to:'mision_gentiles',label:'El evangelio a los gentiles'}],
        prophecy:'Cumple la promesa de que en Abraham serían benditas todas las naciones.' },

      { id:'mision_gentiles', era:'iglesia', name:'El evangelio a las naciones', date:'c. 35–60 d.C.',
        summary:'El evangelio rompe barreras y alcanza a todos los pueblos.',
        desc:'Tras la conversión de Cornelio y por los viajes de Pablo y Bernabé, el evangelio se extiende más allá de los judíos. Se fundan iglesias por todo el imperio y se confirma que la salvación es para todos.',
        context:'La primera Iglesia, mayormente judía, descubre que «Dios no hace acepción de personas».',
        why:'Nace la Iglesia universal de judíos y gentiles, y el evangelio se difunde por todo el mundo conocido, cumpliendo la Gran Comisión.',
        chars:[P('pedro','Pedro'),P('cornelio','Cornelio'),P('pablo','Pablo'),P('bernabe','Bernabé'),P('lidia','Lidia')],
        refs:['Hechos 10:34','Hechos 13:47','Hechos 16:14'],
        conseq:'El evangelio se difunde por todo el imperio; la Iglesia crece entre todas las naciones.',
        after:{ to:'apocalipsis', text:'Juan recibe la revelación del triunfo final de Cristo.' },
        christ:'Cumple la misión de ser «luz a los gentiles» (Isaías 49:6) y la promesa a Abraham de bendición universal.',
        connections:[{to:'apocalipsis',label:'La revelación final'}],
        prophecy:'El evangelio a las naciones anticipa la multitud «de toda lengua» ante el trono (Apocalipsis 7:9).' },

      /* ════ APOCALIPSIS ════ */
      { id:'apocalipsis', era:'apocalipsis', name:'La revelación de Cristo glorificado', date:'c. 95 d.C.',
        summary:'Juan recibe la visión de Cristo victorioso y del juicio final.',
        desc:'Desterrado en Patmos, el apóstol Juan recibe el Apocalipsis: la revelación de Cristo glorificado y soberano sobre la historia, el juicio final y la promesa de su retorno.',
        context:'La Iglesia, perseguida, recibe la seguridad de la victoria final de Cristo.',
        why:'Asegura que la historia tiene un rumbo y un final glorioso: Cristo reina y volverá. Sostiene la esperanza de la Iglesia en medio del sufrimiento.',
        chars:[P('juan','Juan'),P('jesus','Jesús')],
        refs:['Apocalipsis 1:8','Apocalipsis 1:18','Apocalipsis 22:20'],
        conseq:'La Iglesia vive con la esperanza segura del retorno de Cristo y la consumación del Reino.',
        after:{ to:'nueva_creacion', text:'Todo culmina en un cielo nuevo y una tierra nueva.' },
        christ:'Revela a Cristo como el Alfa y la Omega, el Rey de reyes que «vive por los siglos de los siglos».',
        connections:[{to:'nueva_creacion',label:'El cielo nuevo y la tierra nueva'}],
        prophecy:'«Ciertamente vengo en breve» (Apocalipsis 22:20): la promesa final de la segunda venida.' },

      { id:'nueva_creacion', era:'apocalipsis', name:'El cielo nuevo y la tierra nueva', date:'La consumación',
        summary:'Dios hace nuevas todas las cosas y mora para siempre con su pueblo.',
        desc:'La historia bíblica culmina con un cielo nuevo y una tierra nueva, donde Dios habita con su pueblo, enjuga toda lágrima y no hay más muerte ni dolor. Vuelve el árbol de la vida y cesa la maldición.',
        context:'Tras el juicio final, Dios restaura plenamente la creación quebrada por el pecado.',
        why:'Es la meta de toda la historia: la redención completa. Lo que se perdió en el Edén se restaura y se supera en una comunión eterna con Dios.',
        chars:[P('jesus','Jesús'),P('juan','Juan')],
        refs:['Apocalipsis 21:4','Apocalipsis 22:2','Apocalipsis 22:3'],
        conseq:'Se cumple el plan de redención: Dios y su pueblo habitan juntos para siempre.',
        after:null,
        christ:'Cristo, el Cordero, es la lumbrera de la nueva Jerusalén; en Él la creación alcanza su plenitud eterna.',
        connections:[{to:'creacion',label:'La Creación'},{to:'caida',label:'La Caída'}],
        prophecy:'Lo prometido desde Génesis 3:15 se consuma: la maldición es vencida y todo es hecho nuevo.' }
    ];

    var EVENT_BY_ID = {};
    EVENTS.forEach(function(e){ EVENT_BY_ID[e.id] = e; });
    var ERA_BY_KEY = {};
    ERAS.forEach(function(x){ ERA_BY_KEY[x.key] = x; });

    var charIndex = null;
    function ensureCharIndex() {
      if (charIndex) return charIndex;
      charIndex = {};
      try {
        var data = (BRV.personajes && BRV.personajes.getData) ? BRV.personajes.getData() : [];
        (data || []).forEach(function(c){ charIndex[c.id] = true; });
      } catch (e) {}
      return charIndex;
    }
    function escH(s) {
      return String(s == null ? '' : s)
        .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
        .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
    }
    function escJ(s){ return String(s).replace(/\\/g,'\\\\').replace(/'/g,"\\'"); }

    var activeEra = 'all';
    var activeView = 'vertical';
    var modalEl = null;

    /* ── Parseo de una referencia a {bookId, bookName, chapter} ── */
    function parseRefParts(ref) {
      var out = { bookId:null, bookName:null, chapter:1 };
      try {
        if (BRV.bible && BRV.bible.parseRef) {
          var pr = BRV.bible.parseRef(ref);
          if (pr) {
            out.chapter = pr.chapter || 1;
            out.bookName = pr.bookName || null;
            if (pr.bookName && BRV.bible.resolveBook) {
              var b = BRV.bible.resolveBook(pr.bookName);
              if (b) { out.bookId = b.id; out.bookName = b.name || pr.bookName; }
            }
          }
        }
      } catch (e) {}
      return out;
    }

    function navTo(bookId, chapter) {
      if (!bookId) { if (BRV.ui && BRV.ui.toast) BRV.ui.toast('No se pudo abrir la referencia', 'warn'); return; }
      closeModal();
      BRV.router.go('reader');
      setTimeout(function() {
        if (BRV.reader && BRV.reader.selectBook) {
          BRV.reader.selectBook(bookId);
          setTimeout(function(){ if (BRV.reader.selectChapter) BRV.reader.selectChapter(chapter || 1); }, 90);
        }
      }, 90);
    }
    function navRef(ref) { var p = parseRefParts(ref); navTo(p.bookId, p.chapter); }
    function navBook(name) { try { var b = BRV.bible && BRV.bible.resolveBook ? BRV.bible.resolveBook(name) : null; if (b) navTo(b.id, 1); } catch(e){} }

    function openChar(id) {
      var idx = ensureCharIndex();
      if (!idx[id]) return;
      closeModal();
      BRV.router.go('personajes');
      setTimeout(function(){ if (BRV.personajes && BRV.personajes.open) BRV.personajes.open(id); }, 90);
    }

    /* ════ RENDER PRINCIPAL ════ */
    function render() {
      var root = document.getElementById('brv-tl-root');
      if (!root) return;
      ensureCharIndex();

      var view =
        '<div class="brv-tl-viewtoggle">' +
          '<button class="brv-tl-vbtn' + (activeView==='vertical'?' active':'') + '" onclick="BRV.timeline.setView(\'vertical\')">&#9776; Vertical</button>' +
          '<button class="brv-tl-vbtn' + (activeView==='horizontal'?' active':'') + '" onclick="BRV.timeline.setView(\'horizontal\')">&#8596; Horizontal</button>' +
        '</div>';

      var filters = '<button class="brv-tl-filter' + (activeEra==='all'?' active':'') +
        '" onclick="BRV.timeline.setEra(\'all\')">Toda la historia</button>';
      ERAS.forEach(function(er){
        filters += '<button class="brv-tl-filter' + (activeEra===er.key?' active':'') +
          '" style="--tl-c:' + er.color + '" onclick="BRV.timeline.setEra(\'' + er.key + '\')">' +
          '<span class="brv-tl-fdot" style="background:' + er.color + '"></span>' + escH(er.label) + '</button>';
      });

      var body = (activeView === 'horizontal') ? renderHorizontal() : renderVertical();

      root.innerHTML =
        '<div class="brv-tl-intro">Recorre la gran historia de la Biblia, desde la Creación hasta la promesa del retorno de Cristo. Cada evento es una puerta: ábrelo para descubrir por qué importa, su contexto, sus protagonistas, su conexión con Cristo y cómo se enlaza con el resto de la historia de la redención.</div>' +
        view +
        '<div class="brv-tl-filters">' + filters + '</div>' +
        body;
    }

    function renderVertical() {
      var rail = '';
      ERAS.forEach(function(er){
        if (activeEra !== 'all' && activeEra !== er.key) return;
        var evs = EVENTS.filter(function(e){ return e.era === er.key; });
        if (!evs.length) return;
        rail += '<div class="brv-tl-era" style="--tl-c:' + er.color + '">' +
          '<div class="brv-tl-era-head"><span class="brv-tl-era-label">' + escH(er.label) + '</span>' +
          '<span class="brv-tl-era-sub">' + escH(er.sub) + '</span></div>' +
          '<div class="brv-tl-events">';
        evs.forEach(function(e){
          rail += '<div class="brv-tl-event" onclick="BRV.timeline.openEvent(\'' + e.id + '\')" tabindex="0" ' +
            'onkeydown="if(event.key===\'Enter\'){BRV.timeline.openEvent(\'' + e.id + '\')}">' +
            '<span class="brv-tl-dot"></span>' +
            '<div class="brv-tl-event-body">' +
            '<div class="brv-tl-date">' + escH(e.date) + '</div>' +
            '<div class="brv-tl-name">' + escH(e.name) + '</div>' +
            '<div class="brv-tl-sum">' + escH(e.summary) + '</div>' +
            '<span class="brv-tl-go">Explorar este evento &rarr;</span>' +
            '</div></div>';
        });
        rail += '</div></div>';
      });
      return '<div class="brv-tl-rail">' + rail + '</div>';
    }

    function renderHorizontal() {
      var track = '';
      ERAS.forEach(function(er){
        if (activeEra !== 'all' && activeEra !== er.key) return;
        var evs = EVENTS.filter(function(e){ return e.era === er.key; });
        if (!evs.length) return;
        track += '<div class="brv-tl-h-era" style="--tl-c:' + er.color + '">' +
          '<div class="brv-tl-h-era-head"><span class="brv-tl-h-era-dot"></span>' + escH(er.label) + '</div>' +
          '<div class="brv-tl-h-cards">';
        evs.forEach(function(e){
          track += '<div class="brv-tl-h-event" onclick="BRV.timeline.openEvent(\'' + e.id + '\')" tabindex="0" ' +
            'onkeydown="if(event.key===\'Enter\'){BRV.timeline.openEvent(\'' + e.id + '\')}">' +
            '<span class="brv-tl-h-node"></span>' +
            '<div class="brv-tl-h-date">' + escH(e.date) + '</div>' +
            '<div class="brv-tl-h-name">' + escH(e.name) + '</div>' +
            '<div class="brv-tl-h-sum">' + escH(e.summary) + '</div>' +
            '<span class="brv-tl-h-go">Explorar &rarr;</span>' +
            '</div>';
        });
        track += '</div></div>';
      });
      return '<div class="brv-tl-hint">&#128073; Desliza horizontalmente para recorrer la historia. Toca un evento para explorarlo.</div>' +
        '<div class="brv-tl-h-scroll"><div class="brv-tl-h-line"></div><div class="brv-tl-h-track">' + track + '</div></div>';
    }

    function setEra(key) { activeEra = key; render();
      var r = document.getElementById('brv-tl-root'); if (r && r.scrollIntoView) r.scrollIntoView({behavior:'smooth',block:'start'}); }
    function setView(v) { activeView = v; render(); }

    /* ════ VISTA EXPANDIDA (MODAL) ════ */
    function sectionBlock(icon, title, inner, cls) {
      if (!inner) return '';
      return '<div class="brv-tl-section ' + (cls||'') + '"><div class="brv-tl-sec-h">' + icon + ' ' + escH(title) + '</div>' +
        '<div class="brv-tl-sec-body">' + inner + '</div></div>';
    }

    function readingHTML(e) {
      var parts = '';
      /* Capítulos relacionados (desde refs) */
      var seenCh = {}, chChips = [];
      (e.refs || []).forEach(function(r){
        var p = parseRefParts(r);
        if (!p.bookId) return;
        var key = p.bookId + ':' + p.chapter;
        if (seenCh[key]) return; seenCh[key] = 1;
        var lbl = (p.bookName || '') + ' ' + p.chapter;
        chChips.push('<span class="brv-tl-chip ref" onclick="BRV.timeline.navRef(\'' + escJ(lbl) + '\')">' + escH(lbl) + ' &rarr;</span>');
      });
      if (chChips.length) parts += '<div class="brv-tl-read-block"><div class="brv-tl-read-h">Capítulos para leer</div><div class="brv-tl-chips">' + chChips.join('') + '</div></div>';
      /* Libros relacionados */
      var seenBk = {}, bkChips = [];
      (e.refs || []).forEach(function(r){
        var p = parseRefParts(r);
        if (!p.bookId || seenBk[p.bookId]) return; seenBk[p.bookId] = 1;
        bkChips.push('<span class="brv-tl-chip book" onclick="BRV.timeline.navBook(\'' + escJ(p.bookName) + '\')">' + escH(p.bookName) + '</span>');
      });
      if (bkChips.length) parts += '<div class="brv-tl-read-block"><div class="brv-tl-read-h">Libros relacionados</div><div class="brv-tl-chips">' + bkChips.join('') + '</div></div>';
      /* Personajes relacionados */
      if (e.chars && e.chars.length) {
        var pc = e.chars.map(function(p){
          if (charIndex[p.id]) return '<span class="brv-tl-chip person" onclick="BRV.timeline.openChar(\'' + escJ(p.id) + '\')">' + escH(p.name) + '</span>';
          return '<span class="brv-tl-chip person muted">' + escH(p.name) + '</span>';
        }).join('');
        parts += '<div class="brv-tl-read-block"><div class="brv-tl-read-h">Personajes para conocer</div><div class="brv-tl-chips">' + pc + '</div></div>';
      }
      return parts;
    }

    function openEvent(id) {
      var e = EVENT_BY_ID[id];
      if (!e) return;
      ensureCharIndex();
      var era = ERA_BY_KEY[e.era];
      var color = era ? era.color : '#c9a84c';

      /* Personajes involucrados */
      var charsHtml = '';
      if (e.chars && e.chars.length) {
        charsHtml = '<div class="brv-tl-chips">' + e.chars.map(function(p){
          if (charIndex[p.id]) return '<span class="brv-tl-chip person" onclick="BRV.timeline.openChar(\'' + escJ(p.id) + '\')">' + escH(p.name) + '</span>';
          return '<span class="brv-tl-chip person muted">' + escH(p.name) + '</span>';
        }).join('') + '</div>';
      } else {
        charsHtml = '<div class="brv-tl-sec-empty">No hay personajes individuales destacados en este evento.</div>';
      }

      /* ¿Qué ocurrió después? */
      var afterHtml = '';
      if (e.after && e.after.to && EVENT_BY_ID[e.after.to]) {
        var nx = EVENT_BY_ID[e.after.to];
        afterHtml = (e.after.text ? '<p>' + escH(e.after.text) + '</p>' : '') +
          '<div class="brv-tl-chips"><span class="brv-tl-chip next" onclick="BRV.timeline.openEvent(\'' + escJ(e.after.to) + '\')">' +
          'Siguiente: ' + escH(nx.name) + ' &rarr;</span></div>';
      }

      /* Conexiones con otros eventos */
      var connHtml = '';
      if (e.connections && e.connections.length) {
        connHtml = '<div class="brv-tl-chips">' + e.connections.map(function(cn){
          var t = EVENT_BY_ID[cn.to];
          if (!t) return '';
          return '<span class="brv-tl-chip link" onclick="BRV.timeline.openEvent(\'' + escJ(cn.to) + '\')">' + escH(cn.label || t.name) + ' &rarr;</span>';
        }).join('') + '</div>';
      }

      var idx = EVENTS.indexOf(e);
      var prev = EVENTS[idx-1], next = EVENTS[idx+1];

      var I = {
        desc:'&#128220;', why:'&#11088;', context:'&#127963;&#65039;', chars:'&#128101;',
        christ:'&#10013;&#65039;', after:'&#9193;', conseq:'&#9889;', conn:'&#128279;',
        proph:'&#128302;', read:'&#128218;'
      };

      var html =
        '<div class="brv-tl-modal-backdrop" onclick="BRV.timeline.closeModal()"></div>' +
        '<div class="brv-tl-modal-card" role="dialog" aria-modal="true" aria-label="' + escH(e.name) + '" style="--tl-c:' + color + '">' +
          '<button class="brv-tl-modal-close" onclick="BRV.timeline.closeModal()" aria-label="Cerrar">&times;</button>' +
          '<div class="brv-tl-md-head">' +
            '<div class="brv-tl-md-era"><span class="brv-tl-md-era-dot"></span>' + escH(era ? era.label : '') + '</div>' +
            '<h2 class="brv-tl-md-name">' + escH(e.name) + '</h2>' +
            '<div class="brv-tl-md-date">&#128197; ' + escH(e.date) + '</div>' +
          '</div>' +
          '<div class="brv-tl-md-body">' +
            sectionBlock(I.desc,   'Descripción',                       '<p>' + escH(e.desc) + '</p>') +
            sectionBlock(I.why,    '¿Por qué este evento es importante?', e.why ? '<p>' + escH(e.why) + '</p>' : '', 'hl') +
            sectionBlock(I.context,'Contexto histórico',                '<p>' + escH(e.context) + '</p>') +
            sectionBlock(I.chars,  'Personajes involucrados',           charsHtml) +
            sectionBlock(I.christ, 'Conexión con Cristo',               e.christ ? '<p>' + escH(e.christ) + '</p>' : '', 'christ') +
            sectionBlock(I.after,  '¿Qué ocurrió después?',             afterHtml) +
            sectionBlock(I.conseq, 'Consecuencias posteriores',         '<p>' + escH(e.conseq) + '</p>') +
            sectionBlock(I.conn,   'Conexiones con otros eventos',      connHtml) +
            sectionBlock(I.proph,  'Profecías relacionadas',            e.prophecy ? '<p>' + escH(e.prophecy) + '</p>' : '') +
            sectionBlock(I.read,   'Lecturas recomendadas',             readingHTML(e), 'read') +
          '</div>' +
          '<div class="brv-tl-md-nav">' +
            (prev ? '<button class="brv-tl-md-prev" onclick="BRV.timeline.openEvent(\'' + prev.id + '\')">&larr; ' + escH(prev.name) + '</button>' : '<span></span>') +
            (next ? '<button class="brv-tl-md-next" onclick="BRV.timeline.openEvent(\'' + next.id + '\')">' + escH(next.name) + ' &rarr;</button>' : '<span></span>') +
          '</div>' +
        '</div>';

      if (!modalEl) {
        modalEl = document.createElement('div');
        modalEl.className = 'brv-tl-modal';
        modalEl.id = 'brv-tl-modal';
        document.body.appendChild(modalEl);
      }
      modalEl.innerHTML = html;
      modalEl.classList.add('open');
      var card = modalEl.querySelector('.brv-tl-modal-card');
      if (card) card.scrollTop = 0;
    }

    function closeModal() {
      if (modalEl) { modalEl.classList.remove('open'); modalEl.innerHTML = ''; }
    }

    document.addEventListener('keydown', function(ev){
      if (ev.key === 'Escape' && modalEl && modalEl.classList.contains('open')) closeModal();
    });

    BRV.router.hooks['timeline'] = function() { render(); };

    return {
      render: render, setEra: setEra, setView: setView,
      openEvent: openEvent, closeModal: closeModal,
      navRef: navRef, navBook: navBook, openChar: openChar,
      getEvents: function(){ return EVENTS; }, getEras: function(){ return ERAS; }
    };
  })();

  /* ══════════════════════════════════════════════════════════════
     MÓDULO — ¿SABÍAS QUE…?  (descubrimiento de curiosidades bíblicas)
     Autocontenido. Reutiliza datos de personajes vía API pública.
  ══════════════════════════════════════════════════════════════ */
  BRV.sabias = (function() {
    'use strict';

    var pool = null;
    var order = [];
    var pos = 0;

    function escH(s) {
      return String(s == null ? '' : s)
        .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
        .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
    }
    function escJ(s){ return String(s).replace(/\\/g,'\\\\').replace(/'/g,"\\'"); }

    /* Intenta extraer una referencia bíblica del texto del dato */
    function refInText(txt) {
      try {
        var re = /((?:[1-3]\s)?[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)?)\s(\d+):(\d+)/g;
        var m;
        while ((m = re.exec(txt)) !== null) {
          var name = m[1].trim();
          if (BRV.bible && BRV.bible.resolveBook) {
            var b = BRV.bible.resolveBook(name);
            if (b) return { ref: name + ' ' + m[2] + ':' + m[3], bookId: b.id, chapter: parseInt(m[2],10) };
          }
        }
      } catch (e) {}
      return null;
    }

    function buildPool() {
      if (pool) return pool;
      pool = [];
      var data = [];
      try { data = (BRV.personajes && BRV.personajes.getData) ? (BRV.personajes.getData() || []) : []; } catch (e) {}
      data.forEach(function(c){
        var facts = (c.curiosities && c.curiosities.facts) ? c.curiosities.facts : [];
        var kv = (c.keyVerses && c.keyVerses.length) ? c.keyVerses[0] : null;
        facts.forEach(function(f){
          var inref = refInText(f);
          var read = null;
          if (inref) read = inref;
          else if (kv && kv.ref && BRV.bible && BRV.bible.parseRef) {
            var pr = BRV.bible.parseRef(kv.ref);
            if (pr && BRV.bible.resolveBook) {
              var b = BRV.bible.resolveBook(pr.bookName);
              if (b) read = { ref: kv.ref, bookId: b.id, chapter: pr.chapter || 1 };
            }
          }
          pool.push({
            fact: f, charId: c.id, charName: c.name,
            era: c.era || '', testament: c.testament || 'AT',
            read: read, verseText: kv ? kv.text : '', verseRef: kv ? kv.ref : ''
          });
        });
      });
      reshuffle();
      return pool;
    }

    function reshuffle() {
      order = pool.map(function(_,i){ return i; });
      for (var i = order.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = order[i]; order[i] = order[j]; order[j] = t;
      }
      pos = 0;
    }

    function current() { buildPool(); if (!pool.length) return null; return pool[order[pos]]; }
    function next() { buildPool(); if (!pool.length) return; pos++; if (pos >= order.length) reshuffle(); }

    function navRead(bookId, chapter) {
      BRV.router.go('reader');
      setTimeout(function(){
        if (BRV.reader && BRV.reader.selectBook) {
          BRV.reader.selectBook(bookId);
          setTimeout(function(){ if (BRV.reader.selectChapter) BRV.reader.selectChapter(chapter || 1); }, 90);
        }
      }, 90);
    }
    function openChar(id) {
      BRV.router.go('personajes');
      setTimeout(function(){ if (BRV.personajes && BRV.personajes.open) BRV.personajes.open(id); }, 90);
    }

    function cardHTML(item, big) {
      if (!item) return '<div class="brv-sab-empty">No hay datos disponibles.</div>';
      var badge = item.testament === 'NT' ? 'Nuevo Testamento' : 'Antiguo Testamento';
      var h = '<div class="brv-sab-card' + (big ? ' big' : '') + '">' +
        '<div class="brv-sab-eyebrow">&#128161; ¿Sabías que…?</div>' +
        '<div class="brv-sab-fact">' + escH(item.fact) + '</div>' +
        '<div class="brv-sab-attrib">sobre <span class="brv-sab-charlink" onclick="BRV.sabias.openChar(\'' + escJ(item.charId) + '\')">' +
          escH(item.charName) + '</span>' + (item.era ? ' · <span class="brv-sab-era">' + escH(item.era) + '</span>' : '') +
          ' · ' + badge + '</div>';
      if (item.verseText && item.verseRef) {
        h += '<div class="brv-sab-verse">«' + escH(item.verseText) + '» <span class="brv-sab-vref">— ' + escH(item.verseRef) + '</span></div>';
      }
      h += '<div class="brv-sab-actions">';
      if (item.read) h += '<button class="brv-sab-btn primary" onclick="BRV.sabias.read(\'' + escJ(item.read.bookId) + '\',' + (item.read.chapter||1) + ')">&#128214; Leer el pasaje</button>';
      h += '<button class="brv-sab-btn" onclick="BRV.sabias.openChar(\'' + escJ(item.charId) + '\')">&#128100; Ver personaje</button>';
      h += '<button class="brv-sab-btn ghost" onclick="BRV.sabias.shuffle()">&#127922; Otro dato</button>';
      h += '</div></div>';
      return h;
    }

    /* Página dedicada */
    function render() {
      var root = document.getElementById('brv-sab-root');
      if (!root) return;
      buildPool();
      root.innerHTML =
        '<div class="brv-sab-intro">Más de 600 datos sorprendentes de la Biblia, uno a la vez. Cada uno te lleva a un personaje y a un pasaje para leer. Deja que la curiosidad te guíe.</div>' +
        '<div id="brv-sab-stage">' + cardHTML(current(), true) + '</div>' +
        '<div class="brv-sab-counter">Explorando ' + pool.length + ' curiosidades bíblicas</div>';
    }
    function shuffle() {
      next();
      var stage = document.getElementById('brv-sab-stage');
      if (stage) { stage.innerHTML = cardHTML(current(), true); }
      else { var hw = document.getElementById('brv-sabias-home-card'); if (hw) hw.innerHTML = cardHTML(current(), false); }
    }
    function read(bookId, chapter) { navRead(bookId, chapter); }

    /* Tarjeta para Inicio */
    function fillHome() {
      var hw = document.getElementById('brv-sabias-home-card');
      if (!hw) return;
      buildPool();
      hw.innerHTML = cardHTML(current(), false);
    }

    BRV.router.hooks['sabias'] = function() { render(); };
    var prevHome = BRV.router.hooks['home'];
    BRV.router.hooks['home'] = function() { if (prevHome) prevHome(); fillHome(); };

    return {
      render: render, shuffle: shuffle, read: read, openChar: openChar,
      fillHome: fillHome, getPool: function(){ return buildPool(); }, current: current
    };
  })();

  /* ══════════════════════════════════════════════════════════════
     MÓDULO — LÍNEA DE DESCENDENCIA HASTA JESÚS (linaje mesiánico)
     Autocontenido. Enlaza a personajes y al lector vía API pública.
  ══════════════════════════════════════════════════════════════ */
  BRV.linaje = (function() {
    'use strict';

    function N(name, id, note, flag){ return { name:name, id:id||null, note:note||null, flag:flag||null }; }

    var SEGMENTS = [
      { title:'De Adán a Noé', sub:'Diez generaciones', passage:'Génesis 5', bookId:'gn', chapter:5,
        links:[
          N('Adán','adan','El primer hombre, creado a imagen de Dios; con él entra el pecado, pero también la primera promesa de un Redentor.'),
          N('Set','set','Nacido en lugar de Abel; por su línea «comenzaron a invocar el nombre de Jehová».'),
          N('Enós',null), N('Cainán',null), N('Mahalaleel',null), N('Jared',null),
          N('Enoc','enoc','Caminó con Dios y fue llevado sin ver muerte.'),
          N('Matusalén','matusalen','El hombre de más larga vida registrada: 969 años.'),
          N('Lamec','lamec'),
          N('Noé','noe','Por fe construyó el arca; en él la humanidad recibe un nuevo comienzo.')
        ]},
      { title:'De Sem a Abraham', sub:'La línea elegida tras el diluvio', passage:'Génesis 11', bookId:'gn', chapter:11,
        links:[
          N('Sem','sem','Hijo de Noé del que desciende el pueblo del pacto.'),
          N('Arfaxad',null), N('Sala',null), N('Heber',null), N('Peleg',null),
          N('Reu',null), N('Serug',null), N('Nacor',null), N('Taré',null),
          N('Abraham','abraham','Llamado por Dios; en su simiente serían benditas todas las naciones.')
        ]},
      { title:'Los patriarcas', sub:'La promesa pasa de padre a hijo', passage:'Génesis 12', bookId:'gn', chapter:12,
        links:[
          N('Abraham','abraham'),
          N('Isaac','isaac','El hijo de la promesa, ofrecido en Moriah.'),
          N('Jacob','jacob','Renombrado Israel; padre de las doce tribus.'),
          N('Judá',null,'De su tribu vendría el «León» mesiánico y el cetro real (Génesis 49:10).')
        ]},
      { title:'De Judá a David', sub:'Incluye a tres mujeres notables', passage:'Rut 4', bookId:'rt', chapter:4,
        links:[
          N('Judá',null), N('Tamar',null,'Mujer en la genealogía; su historia muestra la gracia de Dios sobre el quebranto.','mujer'),
          N('Fares',null), N('Hezrón',null), N('Ram',null), N('Aminadab',null), N('Naasón',null),
          N('Salmón',null),
          N('Rahab','rahab','La ramera de Jericó, salvada por su fe e injertada en la línea del Mesías.','mujer'),
          N('Booz','booz','El «pariente redentor» que rescató a Rut.'),
          N('Rut','rut','La moabita fiel; una extranjera en el linaje del Salvador.','mujer'),
          N('Obed',null), N('Isaí',null,'El padre de David, de Belén.'),
          N('David','david','El gran rey; a él se promete un trono eterno (pacto davídico).')
        ]},
      { title:'Los reyes de Judá', sub:'El trono de David por catorce generaciones', passage:'Mateo 1', bookId:'mt', chapter:1,
        links:[
          N('David','david'),
          N('Betsabé',null,'«La que fue mujer de Urías»; cuarta mujer nombrada en la genealogía de Mateo.','mujer'),
          N('Salomón','salomon','Edificó el templo; el reino llegó a su esplendor.'),
          N('Roboam','roboam'), N('Abías',null), N('Asa','asa'), N('Josafat','josafat'),
          N('Joram',null), N('Uzías','uzias'), N('Jotam','jotam'), N('Acaz','acaz'),
          N('Ezequías','ezequias','Rey fiel; Jerusalén fue librada de Asiria.'),
          N('Manasés','manases'), N('Amón',null),
          N('Josías','josias','Guió el último gran avivamiento de Judá.'),
          N('Jeconías',null,'En su tiempo cae Judá; comienza el exilio en Babilonia.')
        ]},
      { title:'Del exilio al Mesías', sub:'Dios guarda la promesa hasta el final', passage:'Mateo 1', bookId:'mt', chapter:1,
        links:[
          N('Jeconías',null), N('Salatiel',null),
          N('Zorobabel','zorobabel','Guió el regreso del exilio y la reconstrucción del templo.'),
          N('Abiud',null), N('Eliaquim',null), N('Azor',null), N('Sadoc',null),
          N('Aquim',null), N('Eliud',null), N('Eleazar',null), N('Matán',null), N('Jacob',null),
          N('José','jose_naz','Esposo de María; dio a Jesús su lugar legal en la línea de David.'),
          N('María','maria','La virgen de quien nació Jesús, el Cristo.','mujer'),
          N('Jesús','jesus','El Mesías prometido: en Él culminan todas las generaciones. «El Hijo de David, hijo de Abraham».','mesias')
        ]}
    ];

    var charIndex = null;
    function ensureCharIndex() {
      if (charIndex) return charIndex;
      charIndex = {};
      try { (BRV.personajes.getData() || []).forEach(function(c){ charIndex[c.id] = true; }); } catch (e) {}
      return charIndex;
    }
    function escH(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }
    function escJ(s){ return String(s).replace(/\\/g,'\\\\').replace(/'/g,"\\'"); }

    function navRead(bookId, chapter) {
      BRV.router.go('reader');
      setTimeout(function(){ if (BRV.reader && BRV.reader.selectBook){ BRV.reader.selectBook(bookId); setTimeout(function(){ if(BRV.reader.selectChapter) BRV.reader.selectChapter(chapter||1); },90);} },90);
    }
    function openChar(id) {
      if (!ensureCharIndex()[id]) return;
      BRV.router.go('personajes');
      setTimeout(function(){ if (BRV.personajes && BRV.personajes.open) BRV.personajes.open(id); }, 90);
    }
    function read(bookId, chapter){ navRead(bookId, chapter); }

    function nodeHTML(l, segIdx, linkIdx) {
      var exists = l.id && ensureCharIndex()[l.id];
      var cls = 'brv-lin-node';
      if (l.note) cls += ' key';
      if (l.flag === 'mujer') cls += ' mujer';
      if (l.flag === 'mesias') cls += ' mesias';
      if (exists) cls += ' clickable';
      var click = exists ? ' onclick="BRV.linaje.openChar(\'' + escJ(l.id) + '\')" tabindex="0" onkeydown="if(event.key===\'Enter\'){BRV.linaje.openChar(\'' + escJ(l.id) + '\')}"' : '';
      var h = '<div class="' + cls + '"' + click + '>' +
        '<span class="brv-lin-dot"></span>' +
        '<div class="brv-lin-node-body">' +
        '<div class="brv-lin-name">' + escH(l.name) +
          (l.flag === 'mujer' ? ' <span class="brv-lin-badge mujer">mujer en la genealogía</span>' : '') +
          (exists ? ' <span class="brv-lin-see">ver ficha →</span>' : '') +
        '</div>' +
        (l.note ? '<div class="brv-lin-note">' + escH(l.note) + '</div>' : '') +
        '</div></div>';
      return h;
    }

    function render() {
      var root = document.getElementById('brv-lin-root');
      if (!root) return;
      ensureCharIndex();
      var h = '<div class="brv-lin-intro">Desde el primer hombre hasta el Mesías: una sola línea de descendencia que Dios sostuvo durante miles de años, atravesando diluvios, exilios y generaciones de fragilidad humana. Sigue el hilo, eslabón por eslabón, y descubre cómo cada nombre prepara la venida de Jesús.<br><span class="brv-lin-note2">La genealogía incluye pastores y reyes, santos y pecadores, e incluso mujeres extranjeras: la gracia de Dios obra a través de todos.</span></div>';
      SEGMENTS.forEach(function(seg, si){
        h += '<div class="brv-lin-seg">' +
          '<div class="brv-lin-seg-head">' +
            '<div><div class="brv-lin-seg-title">' + escH(seg.title) + '</div>' +
            '<div class="brv-lin-seg-sub">' + escH(seg.sub) + '</div></div>' +
            '<button class="brv-lin-read" onclick="BRV.linaje.read(\'' + escJ(seg.bookId) + '\',' + seg.chapter + ')">&#128214; Leer ' + escH(seg.passage) + '</button>' +
          '</div>' +
          '<div class="brv-lin-chain">';
        seg.links.forEach(function(l, li){ h += nodeHTML(l, si, li); });
        h += '</div></div>';
      });
      h += '<div class="brv-lin-foot">Mateo traza el linaje legal por José (vía Salomón); Lucas, probablemente por María (vía Natán). Dos caminos, un mismo cumplimiento: <b>Jesús, el Cristo</b>.' +
        '<div class="brv-lin-foot-btns">' +
        '<button class="brv-lin-read" onclick="BRV.linaje.read(\'mt\',1)">&#128214; Genealogía en Mateo 1</button>' +
        '<button class="brv-lin-read" onclick="BRV.linaje.read(\'lc\',3)">&#128214; Genealogía en Lucas 3</button>' +
        '</div></div>';
      root.innerHTML = h;
    }

    BRV.router.hooks['linaje'] = function() { render(); };

    return { render: render, openChar: openChar, read: read, getSegments: function(){ return SEGMENTS; } };
  })();

  /* ══════════════════════════════════════════════════════════════
     MÓDULO — CONEXIONES PROFÉTICAS (profecía AT → cumplimiento NT)
     Autocontenido. Navega al lector vía API pública.
  ══════════════════════════════════════════════════════════════ */
  BRV.profecias = (function() {
    'use strict';

    var CATS = [
      { key:'nacimiento', label:'Nacimiento y origen' },
      { key:'ministerio', label:'Vida y ministerio' },
      { key:'rechazo',    label:'Rechazo y traición' },
      { key:'muerte',     label:'Sufrimiento y muerte' },
      { key:'resurreccion', label:'Resurrección y exaltación' },
      { key:'reino',      label:'El Reino del Mesías' }
    ];

    function R(ref, bookId, chapter, text){ return { ref:ref, bookId:bookId, chapter:chapter, text:text }; }

    var PAIRS = [
      /* Nacimiento */
      { cat:'nacimiento', theme:'La simiente de la mujer',
        p:R('Génesis 3:15','gn',3,'«Esta te herirá en la cabeza, y tú le herirás en el calcañar.»'),
        f:R('Gálatas 4:4','ga',4,'«Cuando vino el cumplimiento del tiempo, Dios envió a su Hijo, nacido de mujer…»'),
        note:'La primera promesa de la Biblia anuncia al que vencería a Satanás: nace de mujer para destruir las obras del diablo.' },
      { cat:'nacimiento', theme:'Descendiente de Abraham',
        p:R('Génesis 22:18','gn',22,'«En tu simiente serán benditas todas las naciones de la tierra.»'),
        f:R('Gálatas 3:16','ga',3,'«…y a tu simiente, la cual es Cristo.»'),
        note:'La bendición prometida a todas las naciones se cumple en un solo descendiente: Cristo.' },
      { cat:'nacimiento', theme:'De la tribu de Judá',
        p:R('Génesis 49:10','gn',49,'«No será quitado el cetro de Judá… hasta que venga Siloh.»'),
        f:R('Hebreos 7:14','he',7,'«Nuestro Señor vino de la tribu de Judá.»'),
        note:'El cetro real permanecería en Judá hasta la venida del Mesías.' },
      { cat:'nacimiento', theme:'Heredero del trono de David',
        p:R('2 Samuel 7:12','2sm',7,'«…afirmaré el trono de su reino para siempre.»'),
        f:R('Lucas 1:32','lc',1,'«…y le dará el Señor Dios el trono de David su padre.»'),
        note:'El pacto con David halla su cumplimiento eterno en Jesús, el Hijo de David.' },
      { cat:'nacimiento', theme:'Nacido de una virgen',
        p:R('Isaías 7:14','is',7,'«He aquí que la virgen concebirá, y dará a luz un hijo, y llamará su nombre Emanuel.»'),
        f:R('Mateo 1:23','mt',1,'«He aquí, una virgen concebirá y dará a luz un hijo… Dios con nosotros.»'),
        note:'Setecientos años antes, Isaías anuncia el nacimiento virginal de «Dios con nosotros».' },
      { cat:'nacimiento', theme:'Nacido en Belén',
        p:R('Miqueas 5:2','miq',5,'«Y tú, Belén Efrata… de ti me saldrá el que será Señor en Israel.»'),
        f:R('Mateo 2:1','mt',2,'«Cuando Jesús nació en Belén de Judea…»'),
        note:'El lugar exacto del nacimiento del Mesías, anunciado siglos antes.' },
      { cat:'nacimiento', theme:'Llamado de Egipto',
        p:R('Oseas 11:1','os',11,'«…y de Egipto llamé a mi hijo.»'),
        f:R('Mateo 2:15','mt',2,'«De Egipto llamé a mi Hijo.»'),
        note:'La huida y el regreso del niño Jesús reflejan la historia de Israel.' },
      /* Ministerio */
      { cat:'ministerio', theme:'Un mensajero prepara el camino',
        p:R('Malaquías 3:1','mal',3,'«He aquí, yo envío mi mensajero, el cual preparará el camino delante de mí.»'),
        f:R('Mateo 3:1','mt',3,'«En aquellos días vino Juan el Bautista predicando en el desierto…»'),
        note:'Juan el Bautista es el precursor anunciado que prepara la venida del Señor.' },
      { cat:'ministerio', theme:'Ungido para anunciar buenas nuevas',
        p:R('Isaías 61:1','is',61,'«El Espíritu de Jehová… me ha enviado a predicar buenas nuevas a los abatidos.»'),
        f:R('Lucas 4:18','lc',4,'«Hoy se ha cumplido esta Escritura delante de vosotros.»'),
        note:'Jesús lee esta profecía en la sinagoga y declara que se cumple en Él.' },
      { cat:'ministerio', theme:'Luz en Galilea',
        p:R('Isaías 9:2','is',9,'«El pueblo que andaba en tinieblas vio gran luz.»'),
        f:R('Mateo 4:16','mt',4,'«El pueblo asentado en tinieblas vio gran luz.»'),
        note:'El ministerio de Jesús comienza precisamente en Galilea, como fue anunciado.' },
      { cat:'ministerio', theme:'Enseñaría en parábolas',
        p:R('Salmos 78:2','sal',78,'«Abriré mi boca en proverbios; hablaré cosas escondidas desde tiempos antiguos.»'),
        f:R('Mateo 13:34','mt',13,'«Sin parábolas no les hablaba.»'),
        note:'El método de enseñanza del Mesías estaba previsto en los Salmos.' },
      { cat:'ministerio', theme:'Profeta como Moisés',
        p:R('Deuteronomio 18:15','dt',18,'«Profeta de en medio de ti… te levantará Jehová tu Dios; a él oiréis.»'),
        f:R('Hechos 3:22','hch',3,'«El Señor os levantará profeta… a él oiréis en todas las cosas.»'),
        note:'Moisés mismo anunció a un Profeta mayor que vendría: Cristo.' },
      /* Rechazo */
      { cat:'rechazo', theme:'El Rey humilde en un asno',
        p:R('Zacarías 9:9','zac',9,'«He aquí tu rey vendrá a ti… humilde, y cabalgando sobre un asno.»'),
        f:R('Mateo 21:5','mt',21,'«He aquí, tu Rey viene a ti, manso, y sentado sobre una asna…»'),
        note:'La entrada triunfal cumple al detalle la profecía de Zacarías.' },
      { cat:'rechazo', theme:'La piedra desechada',
        p:R('Salmos 118:22','sal',118,'«La piedra que desecharon los edificadores ha venido a ser cabeza del ángulo.»'),
        f:R('1 Pedro 2:7','1pe',2,'«La piedra que los edificadores desecharon… ha venido a ser la cabeza del ángulo.»'),
        note:'El Mesías rechazado por su pueblo se convierte en el fundamento de todo.' },
      { cat:'rechazo', theme:'Traicionado por un amigo',
        p:R('Salmos 41:9','sal',41,'«El que de mi pan comía, alzó contra mí el calcañar.»'),
        f:R('Juan 13:18','jn',13,'«El que come pan conmigo, levantó contra mí su calcañar.»'),
        note:'La traición de Judas fue anunciada en los Salmos.' },
      { cat:'rechazo', theme:'Vendido por treinta piezas de plata',
        p:R('Zacarías 11:12','zac',11,'«Pesaron por mi salario treinta piezas de plata.»'),
        f:R('Mateo 26:15','mt',26,'«…y ellos le asignaron treinta piezas de plata.»'),
        note:'Hasta el precio exacto de la traición fue profetizado.' },
      /* Muerte */
      { cat:'muerte', theme:'El Siervo herido por nuestros pecados',
        p:R('Isaías 53:5','is',53,'«Mas él herido fue por nuestras rebeliones, molido por nuestros pecados.»'),
        f:R('1 Pedro 2:24','1pe',2,'«…quien llevó él mismo nuestros pecados en su cuerpo sobre el madero.»'),
        note:'El capítulo cumbre de Isaías describe la cruz 700 años antes.' },
      { cat:'muerte', theme:'Como cordero mudo ante sus trasquiladores',
        p:R('Isaías 53:7','is',53,'«Como cordero fue llevado al matadero… enmudeció, y no abrió su boca.»'),
        f:R('Hechos 8:32','hch',8,'«Como oveja a la muerte fue llevado…»'),
        note:'El silencio de Jesús ante sus acusadores cumple la profecía del Siervo.' },
      { cat:'muerte', theme:'Manos y pies horadados',
        p:R('Salmos 22:16','sal',22,'«Horadaron mis manos y mis pies.»'),
        f:R('Lucas 23:33','lc',23,'«…le crucificaron allí.»'),
        note:'El Salmo 22 describe la crucifixión siglos antes de que existiera ese castigo.' },
      { cat:'muerte', theme:'Repartieron sus vestidos',
        p:R('Salmos 22:18','sal',22,'«Repartieron entre sí mis vestidos, y sobre mi ropa echaron suertes.»'),
        f:R('Juan 19:24','jn',19,'«Repartieron entre sí mis vestidos, y sobre mi ropa echaron suertes.»'),
        note:'Los soldados cumplen, sin saberlo, la profecía al pie de la letra.' },
      { cat:'muerte', theme:'Ninguno de sus huesos sería quebrado',
        p:R('Salmos 34:20','sal',34,'«Él guarda todos sus huesos; ni uno de ellos será quebrantado.»'),
        f:R('Juan 19:36','jn',19,'«No será quebrado hueso suyo.»'),
        note:'Como el cordero pascual, a Jesús no le quebraron ningún hueso.' },
      { cat:'muerte', theme:'Traspasado',
        p:R('Zacarías 12:10','zac',12,'«…mirarán a mí, a quien traspasaron.»'),
        f:R('Juan 19:34','jn',19,'«Uno de los soldados le abrió el costado con una lanza.»'),
        note:'La lanza que atraviesa a Jesús cumple la profecía de Zacarías.' },
      { cat:'muerte', theme:'Sepultado con los ricos',
        p:R('Isaías 53:9','is',53,'«Y se dispuso con los impíos su sepultura, mas con los ricos fue en su muerte.»'),
        f:R('Mateo 27:57','mt',27,'«…un hombre rico de Arimatea… puso en su sepulcro nuevo.»'),
        note:'José de Arimatea, hombre rico, le da sepultura como fue anunciado.' },
      /* Resurrección */
      { cat:'resurreccion', theme:'No vería corrupción',
        p:R('Salmos 16:10','sal',16,'«No dejarás… que tu santo vea corrupción.»'),
        f:R('Hechos 2:31','hch',2,'«…que su alma no fue dejada en el Hades, ni su carne vio corrupción.»'),
        note:'David profetiza la resurrección del Mesías antes de la corrupción del cuerpo.' },
      { cat:'resurreccion', theme:'La señal de Jonás',
        p:R('Jonás 1:17','jon',1,'«Y estuvo Jonás en el vientre del pez tres días y tres noches.»'),
        f:R('Mateo 12:40','mt',12,'«…así estará el Hijo del Hombre… tres días y tres noches.»'),
        note:'Jonás en el pez prefigura la muerte y resurrección de Cristo.' },
      { cat:'resurreccion', theme:'Sentado a la diestra de Dios',
        p:R('Salmos 110:1','sal',110,'«Siéntate a mi diestra, hasta que ponga a tus enemigos por estrado.»'),
        f:R('Hechos 2:34','hch',2,'«Siéntate a mi diestra…»'),
        note:'El salmo más citado en el NT: la exaltación del Mesías a la diestra del Padre.' },
      { cat:'resurreccion', theme:'Derramamiento del Espíritu',
        p:R('Joel 2:28','jl',2,'«Derramaré mi Espíritu sobre toda carne.»'),
        f:R('Hechos 2:17','hch',2,'«Derramaré de mi Espíritu sobre toda carne.»'),
        note:'Pentecostés cumple la promesa de Joel sobre el Espíritu Santo.' },
      /* Reino */
      { cat:'reino', theme:'El Hijo del Hombre y su reino eterno',
        p:R('Daniel 7:13','dn',7,'«…con las nubes del cielo venía uno como un hijo de hombre.»'),
        f:R('Mateo 26:64','mt',26,'«Veréis al Hijo del Hombre… viniendo en las nubes del cielo.»'),
        note:'El título favorito de Jesús viene de la visión de Daniel del reino que no acaba.' },
      { cat:'reino', theme:'El nuevo pacto',
        p:R('Jeremías 31:31','jer',31,'«…haré nuevo pacto con la casa de Israel.»'),
        f:R('Lucas 22:20','lc',22,'«Esta copa es el nuevo pacto en mi sangre.»'),
        note:'En la última cena, Jesús inaugura el nuevo pacto anunciado por Jeremías.' },
      { cat:'reino', theme:'Luz para las naciones',
        p:R('Isaías 49:6','is',49,'«Te di por luz de las naciones, para que seas mi salvación hasta lo postrero de la tierra.»'),
        f:R('Hechos 13:47','hch',13,'«Te he puesto para luz de los gentiles…»'),
        note:'El evangelio que alcanza a todos los pueblos cumple esta promesa.' },
      { cat:'reino', theme:'Sacerdote para siempre',
        p:R('Salmos 110:4','sal',110,'«Tú eres sacerdote para siempre según el orden de Melquisedec.»'),
        f:R('Hebreos 5:6','he',5,'«Tú eres sacerdote para siempre, según el orden de Melquisedec.»'),
        note:'Cristo es Rey y, a la vez, Sumo Sacerdote eterno que intercede por nosotros.' }
    ];

    var activeCat = 'all';

    function escH(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }
    function escJ(s){ return String(s).replace(/\\/g,'\\\\').replace(/'/g,"\\'"); }

    function navRead(bookId, chapter) {
      BRV.router.go('reader');
      setTimeout(function(){ if (BRV.reader && BRV.reader.selectBook){ BRV.reader.selectBook(bookId); setTimeout(function(){ if(BRV.reader.selectChapter) BRV.reader.selectChapter(chapter||1); },90);} },90);
    }
    function read(bookId, chapter){ navRead(bookId, chapter); }

    function pairHTML(pr) {
      return '<div class="brv-pro-card">' +
        '<div class="brv-pro-theme">' + escH(pr.theme) + '</div>' +
        '<div class="brv-pro-cols">' +
          '<div class="brv-pro-col p">' +
            '<div class="brv-pro-tag">Profecía · Antiguo Testamento</div>' +
            '<div class="brv-pro-ref" onclick="BRV.profecias.read(\'' + escJ(pr.p.bookId) + '\',' + pr.p.chapter + ')">' + escH(pr.p.ref) + ' &rarr;</div>' +
            '<div class="brv-pro-text">' + escH(pr.p.text) + '</div>' +
          '</div>' +
          '<div class="brv-pro-arrow">&#10142;</div>' +
          '<div class="brv-pro-col f">' +
            '<div class="brv-pro-tag">Cumplimiento · Nuevo Testamento</div>' +
            '<div class="brv-pro-ref" onclick="BRV.profecias.read(\'' + escJ(pr.f.bookId) + '\',' + pr.f.chapter + ')">' + escH(pr.f.ref) + ' &rarr;</div>' +
            '<div class="brv-pro-text">' + escH(pr.f.text) + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="brv-pro-note">' + escH(pr.note) + '</div>' +
      '</div>';
    }

    function render() {
      var root = document.getElementById('brv-pro-root');
      if (!root) return;
      var filters = '<button class="brv-pro-filter' + (activeCat==='all'?' active':'') + '" onclick="BRV.profecias.setCat(\'all\')">Todas (' + PAIRS.length + ')</button>';
      CATS.forEach(function(c){
        var n = PAIRS.filter(function(p){ return p.cat===c.key; }).length;
        filters += '<button class="brv-pro-filter' + (activeCat===c.key?' active':'') + '" onclick="BRV.profecias.setCat(\'' + c.key + '\')">' + escH(c.label) + ' (' + n + ')</button>';
      });
      var cards = '';
      CATS.forEach(function(c){
        if (activeCat!=='all' && activeCat!==c.key) return;
        var ps = PAIRS.filter(function(p){ return p.cat===c.key; });
        if (!ps.length) return;
        cards += '<div class="brv-pro-cat-h">' + escH(c.label) + '</div>';
        ps.forEach(function(pr){ cards += pairHTML(pr); });
      });
      root.innerHTML =
        '<div class="brv-pro-intro">Cientos de años antes de Cristo, los profetas describieron su nacimiento, su vida, su muerte y su resurrección con asombroso detalle. Aquí puedes leer cada profecía junto a su cumplimiento. Toca cualquier referencia para abrir el pasaje completo: la mejor forma de comprobarlo es leerlo tú mismo.</div>' +
        '<div class="brv-pro-filters">' + filters + '</div>' +
        '<div class="brv-pro-list">' + cards + '</div>';
    }
    function setCat(k){ activeCat = k; render(); var r=document.getElementById('brv-pro-root'); if(r&&r.scrollIntoView) r.scrollIntoView({behavior:'smooth',block:'start'}); }

    BRV.router.hooks['profecias'] = function() { render(); };

    return { render: render, read: read, setCat: setCat, getPairs: function(){ return PAIRS; } };
  })();

  /* ══════════════════════════════════════════════════════════════
     INTEGRACIÓN FINAL — conecta addHistory con todos los módulos
  ══════════════════════════════════════════════════════════════ */
  /* Engancha el historial al router para registrar cada visita */
  (function() {
    const origGo = BRV.router.go.bind(BRV.router);
    BRV.router.go = function(page) {
      origGo(page);
      const LABELS = {
        home:'Inicio', reader:'Leer Biblia', search:'Buscador',
        projection:'Proyección', backgrounds:'Fondos',
        summaries:'Resúmenes Bíblicos', themes:'Temas y Necesidades',
        personajes:'Personajes de la Biblia',
        timeline:'Línea de Tiempo Bíblica',
        sabias:'¿Sabías que…?',
        linaje:'Linaje de Jesús',
        profecias:'Conexiones Proféticas',
        favorites:'Favoritos', settings:'Configuración',
      };
      const ICONS = {
        home:'🏠', reader:'📖', search:'🔍', projection:'📽',
        backgrounds:'🖼', summaries:'📚', themes:'🙏',
        personajes:'👤',
        timeline:'🕰',
        sabias:'💡',
        linaje:'🌿',
        profecias:'🔮',
        favorites:'⭐', settings:'⚙',
      };
      if (page !== 'favorites' && page !== 'history') {
        BRV.favorites.addHistory(LABELS[page] || page, ICONS[page] || '📖');
      }
    };
  })();

  /* init coordinado al final */

  /* ══════════════════════════════════════════════════════════════
     ARRANQUE COORDINADO — espera a que la Biblia se descomprima
  ══════════════════════════════════════════════════════════════ */
  (function() {
    function startApp() {
      try { BRV.config && BRV.config.apply && BRV.config.apply(); } catch(e){}
      try { BRV.home && BRV.home.init(); } catch(e){}
      try { BRV.reader && BRV.reader.init(); } catch(e){}
      try { BRV.projection && BRV.projection.init(); } catch(e){}
      try { BRV.backgrounds && BRV.backgrounds.init(); } catch(e){}
      try { BRV.summaries && BRV.summaries.init(); } catch(e){}
      try { BRV.personajes && BRV.personajes.init(); } catch(e){}
      try { BRV.themes && BRV.themes.init(); } catch(e){}
      try { BRV.favorites && BRV.favorites.init(); } catch(e){}
      console.log('App iniciada. Biblia: ' + (typeof BIBLE_FULL !== 'undefined' && BIBLE_FULL ? Object.keys(BIBLE_FULL).length + ' capitulos' : 'no cargada'));
    }

    function boot() {
      /* Espera a que la Biblia esté descomprimida */
      if (window.__bibleReady && typeof window.__bibleReady.then === 'function') {
        window.__bibleReady.then(function() {
          /* La var global BIBLE_FULL ya está poblada */
          if (window.BIBLE_FULL) { window.BIBLE_FULL = window.BIBLE_FULL; }
          startApp();
        }).catch(function(e) {
          console.error('Error cargando Biblia:', e);
          startApp(); /* arranca igual con fallbacks */
        });
      } else {
        startApp();
      }
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', boot);
    } else {
      boot();
    }
  })();