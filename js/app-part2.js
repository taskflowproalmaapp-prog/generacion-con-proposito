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

    /* ── Base de datos completa de los 66 libros ── */
    const BOOKS_DATA = [
      { id:'gn', deep:{whatHappens:'Génesis narra los grandes comienzos: la creación del universo y del ser humano, la entrada del pecado al mundo a través de Adán y Eva, el diluvio en tiempos de Noé, la dispersión de las naciones en Babel, y el llamado de Abraham para formar un pueblo escogido. La segunda mitad sigue a las cuatro generaciones de patriarcas —Abraham, Isaac, Jacob y José— a través de los cuales Dios comienza a cumplir su promesa de bendecir a todas las familias de la tierra. Es la historia del origen de todo y, sobre todo, del origen del plan de redención de Dios.',context:{general:'Génesis cubre más tiempo que cualquier otro libro de la Biblia: desde la creación hasta la muerte de José en Egipto (alrededor del 1805 a.C.). Moisés lo compiló durante el peregrinaje por el desierto, para que Israel entendiera de dónde venía y quién era su Dios.',political:'El mundo de los patriarcas era un mosaico de ciudades-estado y pueblos nómadas en la Media Luna Fértil. Imperios como Egipto y las ciudades de Mesopotamia (Ur, donde nació Abraham) dominaban la región. Abraham fue llamado a dejar la avanzada civilización de Ur para vivir como peregrino en una tierra prometida pero aún no poseída.',cultural:'Era una cultura de pactos, genealogías y honor familiar, donde la descendencia y la tierra lo eran todo. El politeísmo y la idolatría eran universales; cada pueblo tenía sus dioses. Que Abraham adorara a un solo Dios invisible era radicalmente contracultural.',spiritual:'La humanidad había caído en una idolatría generalizada tras Babel. En medio de esa oscuridad espiritual, Dios escoge a un hombre, Abraham, no por sus méritos sino por gracia, para iniciar un pueblo que conociera y proclamara al Dios verdadero.'},godPurpose:'Dios se revela como el Creador soberano que hace todo "bueno", y como el Redentor que no abandona a su creación caída. Desde el primer pecado, Dios ya anuncia un plan de rescate (Génesis 3:15, la primera promesa del Mesías). A través de Abraham, Dios establece un pacto de gracia: bendecir al mundo entero por medio de su descendencia.',godTeaching:'Dios quería enseñar que Él es el origen y dueño de todo, que el pecado tiene consecuencias reales pero que su gracia es mayor, y que Él es fiel a sus promesas aunque tarden generaciones en cumplirse. La fe de Abraham —creer a Dios contra toda evidencia— se convierte en el modelo de toda relación con Dios.',consequences:'De la familia de Abraham nació la nación de Israel, el pueblo a través del cual vendrían las Escrituras y, finalmente, el Mesías. La historia de José, que termina el libro, prepara el escenario para el Éxodo: explica cómo Israel llegó a Egipto, donde crecería hasta convertirse en una nación. Cada promesa de Génesis se va desarrollando a lo largo de toda la Biblia hasta su cumplimiento en Cristo.',practicalLessons:['Dios tiene un propósito desde el principio: nada en tu vida es un accidente, así como nada en la creación lo fue.','El pecado siempre trae consecuencias, pero la gracia de Dios siempre ofrece un camino de regreso, como lo mostró con Adán, Caín y Noé.','La fe consiste en obedecer a Dios aunque no veamos el camino completo, como Abraham que salió "sin saber a dónde iba".','Dios puede transformar el mal en bien: lo que los hermanos de José pensaron para mal, Dios lo encaminó a bien para salvar muchas vidas (Génesis 50:20).'],christConnection:'Génesis apunta a Cristo desde su primera página. La promesa de Génesis 3:15 —que la simiente de la mujer aplastaría la cabeza de la serpiente— es el primer anuncio del Evangelio: Jesús vencería a Satanás en la cruz. Abraham, dispuesto a ofrecer a su hijo Isaac, prefigura al Padre que entregó a su Hijo unigénito. El cordero que sustituyó a Isaac en el monte anticipa al Cordero de Dios. Y la promesa de bendecir a "todas las familias de la tierra" a través de la descendencia de Abraham se cumple en Jesús, en quien judíos y gentiles son bendecidos.',keyVerses:[{ref:'Génesis 1:1',text:'En el principio creó Dios los cielos y la tierra.'},{ref:'Génesis 3:15',text:'Y pondré enemistad entre ti y la mujer, y entre tu simiente y la simiente suya; esta te herirá en la cabeza, y tú le herirás en el calcañar.'},{ref:'Génesis 12:3',text:'Bendeciré a los que te bendijeren, y a los que te maldijeren maldeciré; y serán benditas en ti todas las familias de la tierra.'},{ref:'Génesis 50:20',text:'Vosotros pensasteis mal contra mí, mas Dios lo encaminó a bien, para hacer lo que vemos hoy, para mantener en vida a mucho pueblo.'}],readingCall:'Génesis es la puerta de entrada a toda la Biblia: sin él, no se entiende el resto. Te invitamos a leer sus 50 capítulos y descubrir cómo cada promesa que Dios hace aquí comienza un hilo que recorre toda la Escritura hasta llegar a Cristo. Empieza por los primeros 12 capítulos esta semana y verás el plan de Dios desplegarse desde el primer versículo.'},  name:'Génesis',       abbr:'Gn',  t:'AT', chapters:50,
        author:'Moisés', date:'~1450-1400 a.C.', genre:'Ley / Historia',
        context:'El primer libro de la Biblia narra los comienzos del universo, la humanidad, el pecado y el plan redentor de Dios. Fue escrito durante el éxodo de Israel de Egipto.',
        summary:'Génesis ("Comienzos") cubre más historia que cualquier otro libro bíblico: desde la creación del universo hasta la muerte de José en Egipto, un período de más de 2.000 años. Se divide en dos grandes secciones: los orígenes primordiales (cap. 1-11) que incluyen la creación, la caída, el diluvio y Babel, y la historia patriarcal (cap. 12-50) que sigue a Abraham, Isaac, Jacob y José. Cada sección revela a un Dios que crea, juzga el pecado, pero también redime y cumple sus promesas.',
        purpose:'Revelar quién es Dios como Creador y Redentor, explicar el origen del pecado y establecer los fundamentos del pacto de Dios con su pueblo.',
        themes:['Creación','Caída y pecado','Pacto de Dios','Providencia divina','Familia y genealogías','Fe y obediencia'],
        keyVerse:{ref:'Génesis 1:1', text:'En el principio creó Dios los cielos y la tierra.'},
        characters:[
          {name:'Adán',role:'Primer hombre',icon:'👤'},
          {name:'Eva',role:'Primera mujer',icon:'👤'},
          {name:'Noé',role:'Hombre justo, constructor del arca',icon:'⛵'},
          {name:'Abraham',role:'Padre de la fe',icon:'⭐'},
          {name:'Isaac',role:'Hijo de la promesa',icon:'✝'},
          {name:'Jacob',role:'Padre de las 12 tribus',icon:'🌿'},
          {name:'José',role:'Soñador y redentor',icon:'🌾'},
        ],
        teaching:'Dios es el soberano Creador que no improvisa. Desde el primer capítulo se ve su plan de redención: la simiente de la mujer aplastaría la cabeza de la serpiente (3:15). A pesar del fracaso humano, Dios siempre preserva un remanente fiel.',
        application:'Nuestra vida tiene un propósito porque fuimos creados a imagen de Dios. El pecado tiene consecuencias reales, pero la gracia de Dios siempre es mayor. Podemos confiar en sus promesas aunque el tiempo de cumplimiento sea largo.',
        curiosities:['Génesis cubre más tiempo que todos los demás libros de la Biblia juntos.','La palabra "creó" (bara) en 1:1 se usa solo con Dios como sujeto en todo el AT.','El nombre "José" aparece más veces en Génesis que ningún otro personaje.','La historia de Génesis confirma que la salvación siempre ha sido por fe (15:6).'],
        timeline:[
          {period:'Eternidad pasada', desc:'Dios existe antes de todo lo creado'},
          {period:'Creación', desc:'Dios crea los cielos y la tierra en seis días'},
          {period:'La Caída', desc:'Adán y Eva desobedecen; el pecado entra al mundo'},
          {period:'Diluvio (~2300 a.C.)', desc:'Noé construye el arca; Dios renueva la tierra'},
          {period:'Torre de Babel', desc:'Los pueblos son dispersados por el mundo'},
          {period:'Abraham (~2000 a.C.)', desc:'Dios llama a Abraham y establece el pacto'},
          {period:'Patriarcas', desc:'Isaac, Jacob, las 12 tribus y José en Egipto'},
        ],
      },
      { id:'ex', deep:{whatHappens:'Éxodo relata cómo Dios libera a Israel de la esclavitud en Egipto. Tras 400 años de opresión, Dios levanta a Moisés, le habla desde una zarza ardiente y lo envía ante el Faraón. Vienen las diez plagas, la Pascua, y la salida milagrosa cruzando el Mar Rojo. Luego, en el monte Sinaí, Dios entrega los Diez Mandamientos y establece su pacto con Israel, dándoles instrucciones para construir el Tabernáculo, el lugar donde Él habitaría en medio de su pueblo.',context:{general:'Los eventos ocurren alrededor del 1446 a.C. Israel había crecido de 70 personas a una multitud de quizás dos millones, y los egipcios, temerosos, los habían esclavizado.',political:'Egipto era la superpotencia del mundo antiguo, gobernada por un Faraón considerado divino. Israel era una minoría esclavizada sin derechos ni poder. El enfrentamiento entre Moisés y el Faraón era, en el fondo, un choque entre el Dios verdadero y los dioses de Egipto.',cultural:'Egipto adoraba a decenas de dioses ligados a la naturaleza: el Nilo, el sol, las ranas, el ganado. Cada una de las diez plagas fue un golpe directo contra un dios egipcio específico, demostrando que solo Jehová es el Dios verdadero.',spiritual:'Israel había estado rodeado de idolatría egipcia por siglos y apenas conocía al Dios de sus padres. Dios usa la liberación para revelarse: "sabrán que yo soy Jehová". El Sinaí marca el nacimiento de Israel como nación bajo el pacto con Dios.'},godPurpose:'Dios se revela como el Libertador poderoso y fiel que escucha el clamor de los oprimidos y cumple las promesas hechas a Abraham. Establece su pacto con Israel, les da su Ley como guía de vida, y diseña el Tabernáculo para mostrar que su mayor deseo es habitar en medio de su pueblo.',godTeaching:'Dios quería enseñar que la salvación es obra suya, no del esfuerzo humano: Israel no se liberó a sí mismo, Dios lo hizo. También enseña que la libertad tiene un propósito: ser un pueblo santo que adore y obedezca a Dios. La Ley no era para salvarlos, sino para mostrarles cómo vivir como pueblo redimido.',consequences:'Israel se convierte oficialmente en la nación del pacto, con una Ley, un sistema de adoración y la presencia de Dios en medio de ellos. La Pascua se convierte en la fiesta central del calendario judío, celebrada hasta hoy. El Éxodo se vuelve el evento fundacional de Israel, al que la Biblia se refiere una y otra vez como prueba del poder y amor de Dios.',practicalLessons:['Dios ve, escucha y actúa ante el sufrimiento de su pueblo; ningún clamor sincero le es indiferente.','Dios usa personas imperfectas: Moisés era tartamudo y temeroso, pero Dios lo capacitó para una misión imposible.','La liberación no es solo "salir de" algo, sino "salir para" servir a Dios; fuimos rescatados con un propósito.','La obediencia a los mandamientos de Dios no es una carga, sino el camino de bendición para un pueblo ya redimido.'],christConnection:'El Éxodo es la imagen más poderosa de la salvación en el Antiguo Testamento, y todo apunta a Cristo. El cordero de la Pascua, cuya sangre en los dinteles salvaba de la muerte, prefigura a Jesús, "nuestra Pascua que ha sido sacrificada" (1 Corintios 5:7). Así como Israel fue liberado de la esclavitud de Egipto por la sangre del cordero, nosotros somos liberados de la esclavitud del pecado por la sangre de Cristo. Moisés, el mediador entre Dios y el pueblo, anticipa a Jesús, el mediador del nuevo pacto. Y el Tabernáculo, donde Dios habitaba con su pueblo, se cumple en Cristo, quien "habitó entre nosotros" (Juan 1:14).',keyVerses:[{ref:'Éxodo 3:14',text:'Y respondió Dios a Moisés: YO SOY EL QUE SOY... Así dirás a los hijos de Israel: YO SOY me envió a vosotros.'},{ref:'Éxodo 14:14',text:'Jehová peleará por vosotros, y vosotros estaréis tranquilos.'},{ref:'Éxodo 20:2-3',text:'Yo soy Jehová tu Dios, que te saqué de la tierra de Egipto, de casa de servidumbre. No tendrás dioses ajenos delante de mí.'}],readingCall:'Éxodo es la historia de redención más grande del Antiguo Testamento y la base para entender la salvación en Cristo. Te invitamos a leer sus 40 capítulos: vive el drama de las plagas, el cruce del Mar Rojo y el encuentro con Dios en el Sinaí. Lee especialmente los capítulos 12 a 14 y descubre por qué la Pascua apunta directamente a la cruz.'},  name:'Éxodo',         abbr:'Ex',  t:'AT', chapters:40,
        author:'Moisés', date:'~1446-1406 a.C.', genre:'Ley / Historia',
        context:'Éxodo continúa donde Génesis termina. Israel lleva 400 años en Egipto como esclavos cuando Dios levanta a Moisés para liberarlos.',
        summary:'Éxodo ("salida") narra la liberación de Israel de la esclavitud egipcia: las 10 plagas, el Éxodo, el cruce del Mar Rojo y la revelación de la Ley en el Sinaí. La segunda mitad describe la construcción del Tabernáculo, el lugar donde Dios habitaría en medio de su pueblo. El libro revela a Dios como Redentor poderoso y Santo que desea habitar con su pueblo.',
        purpose:'Mostrar que Dios escucha el clamor de su pueblo, actúa para liberarlo y desea vivir en medio de él en santidad.',
        themes:['Liberación y redención','La ley de Dios','Presencia de Dios','Adoración y culto','Identidad de Israel'],
        keyVerse:{ref:'Éxodo 14:14', text:'Jehová peleará por vosotros, y vosotros estaréis tranquilos.'},
        characters:[
          {name:'Moisés',role:'Líder y legislador',icon:'⚡'},
          {name:'Aarón',role:'Sumo sacerdote',icon:'🕊'},
          {name:'Faraón',role:'Rey opresor',icon:'👑'},
          {name:'Miriam',role:'Profetisa',icon:'🎵'},
          {name:'Jetro',role:'Suegro de Moisés',icon:'🌿'},
        ],
        teaching:'Dios ve el sufrimiento de su pueblo y actúa con poder soberano. La Pascua prefigura la redención de Cristo: el cordero sin defecto cuya sangre salva. La Ley no es un medio de salvación sino una guía para vivir en comunión con Dios.',
        application:'En cada momento de opresión, Dios escucha nuestro clamor. Así como Israel fue liberado de la esclavitud física, Cristo nos libera de la esclavitud del pecado. La obediencia a la Palabra de Dios nos protege y nos lleva a la vida plena.',
        curiosities:['Las 10 plagas desafían directamente a los dioses de Egipto, cada plaga ataca a una deidad.','El nombre de Dios "YO SOY" (Éxodo 3:14) aparece aquí por primera vez.','El Tabernáculo era tan preciso en sus dimensiones que tipificaba la persona y obra de Cristo.','Moisés pasó 80 años preparándose antes de iniciar su ministerio de 40 años.'],
        timeline:[
          {period:'Israel en Egipto (430 años)', desc:'José murió; los israelitas fueron esclavizados'},
          {period:'Nacimiento de Moisés (~1526 a.C.)', desc:'Salvado por la hija del Faraón'},
          {period:'Moisés huye (40 años)', desc:'Huye a Madián tras matar a un egipcio'},
          {period:'La zarza ardiente', desc:'Dios llama a Moisés; las 10 plagas sobre Egipto'},
          {period:'El Éxodo (~1446 a.C.)', desc:'Israel sale de Egipto; cruce del Mar Rojo'},
          {period:'Sinaí', desc:'La Ley es dada; el Tabernáculo es construido'},
        ],
      },
      { id:'sal', deep:{whatHappens:'Salmos es el libro de oración y adoración de Israel: 150 poemas y cánticos que expresan toda la gama de la experiencia humana ante Dios. Hay salmos de alabanza desbordante, de lamento profundo, de arrepentimiento, de confianza, de acción de gracias y de súplica. Escritos por David, Asaf, los hijos de Coré, Salomón, Moisés y otros, recogen siglos de fe vivida. No narran una historia lineal, sino que abren el corazón del creyente ante Dios en cada circunstancia de la vida.',context:{general:'Los salmos fueron compuestos a lo largo de unos 1000 años, desde Moisés (Salmo 90) hasta el período post-exílico. David escribió cerca de la mitad. Se reunieron en cinco "libros" que reflejan los cinco libros de Moisés.',political:'Muchos salmos nacen en medio de guerras, persecuciones y crisis nacionales. David escribió varios huyendo de Saúl o de su hijo Absalón. Otros reflejan el dolor del exilio en Babilonia (como el Salmo 137).',cultural:'La poesía hebrea no rima sonidos sino ideas (paralelismo): repite o contrasta pensamientos. Los salmos se cantaban con instrumentos en el Templo y en las casas, siendo el "himnario" del pueblo de Dios.',spiritual:'Los salmos enseñan que Dios desea una relación honesta y total: podemos llevarle nuestra alegría, pero también nuestra ira, miedo y duda. Modelan una fe que no esconde nada ante Dios.'},godPurpose:'Dios usa los Salmos para enseñarnos a orar y adorar con sinceridad absoluta. A través de ellos, revela que le importa cada emoción humana y que la adoración no depende de las circunstancias. Los Salmos también contienen profecías mesiánicas asombrosamente precisas sobre el Cristo venidero.',godTeaching:'Dios quería enseñar que la verdadera espiritualidad es honesta: el creyente puede clamar "¿hasta cuándo, Señor?" y a la vez confiar plenamente. Los Salmos enseñan que la adoración y el lamento no se excluyen, y que Dios es refugio, pastor, roca y rey en toda situación.',consequences:'Los Salmos se convirtieron en el corazón de la adoración de Israel y luego de la Iglesia. Jesús los citó constantemente, incluso desde la cruz. Han consolado a creyentes en cada generación y siguen siendo el lenguaje universal de la oración cristiana, traducidos y cantados en todos los idiomas.',practicalLessons:['Puedes ser completamente honesto con Dios: Él recibe tanto tu alabanza como tu queja y tu llanto.','La adoración no depende de cómo te sientes; los Salmos enseñan a alabar a Dios en medio del dolor.','En la angustia, recordar quién es Dios y lo que ha hecho transforma el lamento en confianza, como ocurre una y otra vez en los salmos.','Memorizar salmos te da palabras para orar cuando no sabes qué decir.'],christConnection:'Los Salmos son uno de los libros más citados por Jesús y los apóstoles, y contienen profecías mesiánicas extraordinarias. El Salmo 22 describe la crucifixión con siglos de anticipación: las manos y pies horadados, los huesos contados, la ropa repartida a suertes; Jesús lo citó desde la cruz: "Dios mío, Dios mío, ¿por qué me has desamparado?". El Salmo 110 anuncia al Mesías como Rey y Sacerdote eterno. El Salmo 16 profetiza la resurrección: "no dejarás mi alma en el Seol". Jesús mismo dijo que los Salmos hablaban de Él (Lucas 24:44).',keyVerses:[{ref:'Salmos 23:1',text:'Jehová es mi pastor; nada me faltará.'},{ref:'Salmos 46:1',text:'Dios es nuestro amparo y fortaleza, nuestro pronto auxilio en las tribulaciones.'},{ref:'Salmos 119:105',text:'Lámpara es a mis pies tu palabra, y lumbrera a mi camino.'},{ref:'Salmos 51:10',text:'Crea en mí, oh Dios, un corazón limpio, y renueva un espíritu recto dentro de mí.'}],readingCall:'Los Salmos son el mejor lugar para aprender a orar. Te invitamos a leerlos no de corrido, sino uno por día, haciéndolos tu propia oración. Comienza con los más amados —Salmos 1, 23, 51, 91 y 121— y descubre cómo expresan exactamente lo que tu corazón siente pero no sabe decir. Deja que se conviertan en el lenguaje de tu conversación diaria con Dios.'}, name:'Salmos',         abbr:'Sal', t:'AT', chapters:150,
        author:'David y otros (Asaf, Hijos de Coré, Moisés, Salomón)', date:'~1440-430 a.C.', genre:'Poesía / Sabiduría',
        context:'Los Salmos son el himnario de Israel, compostos a lo largo de casi mil años. Reflejan toda la gama de la experiencia humana ante Dios.',
        summary:'El libro de Salmos es la colección poética más grande de la Biblia: 150 poemas organizados en 5 libros que hacen eco del Pentateuco. Incluye himnos de alabanza, salmos de lamento, salmos reales, salmos de peregrinación y salmos de sabiduría. Desde el grito angustiado del Salmo 22 hasta la alabanza universal del 150, los Salmos dan voz a todo lo que el corazón humano puede sentir ante Dios.',
        purpose:'Enseñar al pueblo de Dios a adorarle con autenticidad, a llevar sus lamentos a él con honestidad y a confiar en su fidelidad en todo tiempo.',
        themes:['Alabanza y adoración','Lamento y súplica','Confianza en Dios','Ley y Palabra de Dios','Mesías prometido','Fidelidad de Dios'],
        keyVerse:{ref:'Salmos 23:1', text:'Jehová es mi pastor; nada me faltará.'},
        characters:[
          {name:'David',role:'Autor principal (~73 salmos)',icon:'🎵'},
          {name:'Asaf',role:'Músico levita',icon:'🎶'},
          {name:'Moisés',role:'Autor del Salmo 90',icon:'⚡'},
          {name:'Salomón',role:'Rey sabio',icon:'👑'},
          {name:'Hijos de Coré',role:'Grupo de músicos',icon:'🎵'},
        ],
        teaching:'La oración auténtica incluye tanto la alabanza como el lamento. Dios no se ofende con las preguntas honestas de su pueblo. Los Salmos mesiánicos (2, 22, 110) describen al Cristo con una precisión asombrosa cumplida en Jesús.',
        application:'Cada situación de la vida tiene un salmo que la refleja. En la alegría, en el dolor, en el miedo o en la gratitud, los Salmos nos enseñan el lenguaje de la oración. Son el manual de adoración de la iglesia de todos los tiempos.',
        curiosities:['El Salmo 119 es el capítulo más largo de toda la Biblia (176 versículos) y habla exclusivamente de la Palabra de Dios.','El Salmo 22 describe la crucifixión con detalles precisos 1000 años antes de que ocurriera.','El Salmo 117 es el capítulo más corto de la Biblia (2 versículos) y está en el centro del AT.','Hay al menos 7 "salmos mesiánicos" que predicen al Cristo.'],
        timeline:[
          {period:'~1440 a.C.', desc:'Salmo 90: Moisés en el desierto'},
          {period:'~1000 a.C.', desc:'David escribe la mayoría de sus salmos'},
          {period:'~960 a.C.', desc:'Salomón escribe los Salmos 72 y 127'},
          {period:'~720 a.C.', desc:'Ezequías recopila salmos davídicos (Pr 25:1)'},
          {period:'~430 a.C.', desc:'Colección final de los 150 salmos completada'},
        ],
      },
      { id:'is', deep:{whatHappens:'Isaías es el más grande de los profetas, llamado "el quinto evangelio" por sus detalladas profecías sobre el Mesías. El libro se divide en dos grandes secciones: la primera (capítulos 1-39) anuncia juicio sobre Judá y las naciones por su pecado e idolatría; la segunda (capítulos 40-66) trae consuelo y esperanza, prometiendo restauración, el Siervo sufriente que cargaría los pecados del pueblo, y la gloria futura del reino de Dios. Isaías ve la santidad de Dios y la salvación que vendría a través del Mesías.',context:{general:'Isaías profetizó en Judá durante unos 40-60 años (740-680 a.C.), bajo los reyes Uzías, Jotam, Acaz y Ezequías, en una época de crisis nacional.',political:'El imperio asirio amenazaba con destruir a Israel y Judá. Isaías aconsejó confiar en Dios y no en alianzas militares. El reino del norte cayó ante Asiria en 722 a.C., cumpliendo sus advertencias.',cultural:'Judá vivía una prosperidad superficial mezclada con corrupción, injusticia social e idolatría. Isaías denuncia la religiosidad hipócrita: ofrendas abundantes mientras se oprime al pobre.',spiritual:'El pueblo había abandonado a Dios por ídolos y rituales vacíos. Isaías tuvo una visión sobrecogedora de la santidad de Dios (capítulo 6) que definió todo su mensaje: un Dios santo no puede ignorar el pecado, pero proveerá salvación.'},godPurpose:'Dios revela su santidad absoluta y, al mismo tiempo, su plan de salvación a través del Mesías. Anuncia juicio sobre el pecado pero promete redención. El propósito central es preparar al pueblo para reconocer al Salvador venidero, el Siervo sufriente que llevaría sus pecados.',godTeaching:'Dios quería enseñar que es santo y que el pecado tiene consecuencias, pero que su gracia es mayor: Él mismo proveería el Salvador. Enseña a confiar en Dios y no en los poderes humanos, y que la verdadera adoración va acompañada de justicia.',consequences:'Isaías es el profeta más citado en el Nuevo Testamento después de los Salmos. Sus profecías sobre el Mesías —el nacimiento virginal, el Siervo sufriente del capítulo 53, el Príncipe de Paz— se cumplieron con asombrosa precisión en Jesús, confirmando la veracidad de la Palabra de Dios.',practicalLessons:['La verdadera adoración no son rituales, sino un corazón que busca la justicia y ayuda al necesitado.','Confía en Dios y no en los recursos humanos cuando enfrentes amenazas; Él es tu fortaleza.','La santidad de Dios debe llenarnos de reverencia y a la vez de gratitud por su gracia salvadora.','Dios da esperanza aun en medio del juicio: siempre hay un "consolaos" después de la advertencia.'],christConnection:'Isaías 53 es la profecía mesiánica más asombrosa del Antiguo Testamento: describe con 700 años de anticipación al Siervo sufriente "herido por nuestras rebeliones, molido por nuestros pecados", que como cordero fue llevado al matadero. Es un retrato exacto de la crucifixión de Cristo. Isaías también profetiza el nacimiento virginal ("la virgen concebirá", 7:14), los nombres del Mesías ("Admirable, Consejero, Dios Fuerte, Príncipe de Paz", 9:6), y su reino eterno. Jesús comenzó su ministerio leyendo Isaías 61, declarando que esa profecía se cumplía en Él.',keyVerses:[{ref:'Isaías 9:6',text:'Porque un niño nos es nacido, hijo nos es dado... y se llamará su nombre Admirable, Consejero, Dios Fuerte, Padre Eterno, Príncipe de Paz.'},{ref:'Isaías 53:5',text:'Mas él herido fue por nuestras rebeliones, molido por nuestros pecados; el castigo de nuestra paz fue sobre él, y por su llaga fuimos nosotros curados.'},{ref:'Isaías 40:31',text:'Pero los que esperan a Jehová tendrán nuevas fuerzas; levantarán alas como las águilas; correrán, y no se cansarán; caminarán, y no se fatigarán.'},{ref:'Isaías 41:10',text:'No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo.'}],readingCall:'Isaías es el profeta que vio a Cristo con más claridad. Te invitamos a leer sus 66 capítulos, pero si quieres comenzar por lo esencial, lee el capítulo 53: es la descripción más conmovedora de lo que Jesús hizo por ti en la cruz, escrita siglos antes. También lee el capítulo 40 cuando necesites renovar tus fuerzas. Verás por qué se le llama el quinto evangelio.'},  name:'Isaías',         abbr:'Is',  t:'AT', chapters:66,
        author:'Isaías (hijo de Amoz)', date:'~740-700 a.C.', genre:'Profecía',
        context:'Isaías profetizó durante el reinado de cuatro reyes de Judá, en un período de crisis política (amenaza asiria) y espiritual (idolatría generalizada).',
        summary:'Isaías es a menudo llamado "el quinto evangelio" por sus detalladas profecías mesiánicas. El libro se divide en dos grandes secciones: juicio y esperanza (cap. 1-39) y consolación y restauración (cap. 40-66). El famoso "Siervo sufriente" de los capítulos 52-53 describe la pasión de Cristo con una precisión que asombra a historiadores y teólogos. El libro termina con la visión del nuevo cielo y la nueva tierra.',
        purpose:'Llamar a Israel al arrepentimiento, anunciar el juicio de Dios sobre el pecado y revelar el plan redentor de Dios mediante su Siervo Mesías.',
        themes:['Santo de Israel','Juicio y gracia','El Siervo sufriente','Nueva creación','Fe y confianza','Consolación de Israel'],
        keyVerse:{ref:'Isaías 53:5', text:'Mas él herido fue por nuestras rebeliones, molido por nuestros pecados; el castigo de nuestra paz fue sobre él, y por su llaga fuimos nosotros curados.'},
        characters:[
          {name:'Isaías',role:'Profeta mayor',icon:'📜'},
          {name:'Ezequías',role:'Rey fiel de Judá',icon:'👑'},
          {name:'Senaquerib',role:'Rey asirio invasor',icon:'⚔'},
          {name:'Ciro',role:'Rey persa (profetizado 150 años antes)',icon:'⭐'},
          {name:'El Siervo',role:'Figura mesiánica cumplida en Cristo',icon:'✝'},
        ],
        teaching:'Dios es absolutamente santo pero también el Consolador de los afligidos. El sufrimiento del Siervo (cap. 53) no fue un accidente sino el plan eterno de Dios para nuestra salvación. La profecía de Ciro por nombre 150 años antes es una de las más asombrosas del AT.',
        application:'Cuando todo parece oscuro, la Palabra de Dios ofrece consuelo real: "los que esperan en Jehová tendrán nuevas fuerzas" (40:31). Isaías nos desafía a confiar no en el poder humano sino en el Santo de Israel.',
        curiosities:['Isaías tiene 66 capítulos; la Biblia tiene 66 libros. Los primeros 39 capítulos corresponden al AT (39 libros) y los últimos 27 al NT (27 libros).','Jesús cita a Isaías más que a cualquier otro profeta del AT.','Isaías profetizó el nacimiento virginal del Mesías 700 años antes (7:14).','El capítulo 53 es citado en el NT más de 85 veces.'],
        timeline:[
          {period:'~740 a.C.', desc:'Isaías es llamado; visión del trono (cap.6)'},
          {period:'~735 a.C.', desc:'Crisis siroefraimita; profecía del Emanuel'},
          {period:'~720 a.C.', desc:'Caída de Samaria (Israel del norte)'},
          {period:'~701 a.C.', desc:'Invasión asiria de Senaquerib; Dios salva Jerusalén'},
          {period:'~700 a.C.', desc:'Últimas profecías; consolación a los exiliados futuros'},
        ],
      },
      { id:'jn', deep:{whatHappens:'El Evangelio de Juan presenta a Jesús como el Hijo eterno de Dios hecho hombre. A diferencia de los otros evangelios, Juan se enfoca en demostrar la divinidad de Cristo a través de siete grandes señales (milagros) y siete declaraciones "Yo soy" (el pan de vida, la luz del mundo, el buen pastor, la resurrección y la vida, el camino, la verdad y la vida...). Culmina con la crucifixión, muerte y resurrección de Jesús, declarando que estas cosas se escribieron "para que creáis que Jesús es el Cristo, el Hijo de Dios, y para que creyendo, tengáis vida en su nombre".',context:{general:'Escrito por el apóstol Juan hacia el año 85-95 d.C., décadas después de los otros evangelios, cuando la Iglesia ya enfrentaba falsas enseñanzas que negaban la divinidad o la humanidad de Cristo.',political:'Judea estaba bajo dominio romano. Existía una fuerte tensión entre las autoridades judías y el creciente movimiento cristiano, que para entonces ya había sido expulsado de las sinagogas.',cultural:'Juan escribe en un mundo donde se mezclaban el pensamiento judío y el griego. Usa conceptos como "el Verbo" (Logos), que conectaban con ambas culturas, para presentar a Jesús como la revelación definitiva de Dios.',spiritual:'Surgían herejías que negaban que Jesús fuera verdaderamente Dios o verdaderamente hombre. Juan escribe para afirmar con claridad ambas verdades y para que los creyentes tengan certeza de su fe y de su vida eterna.'},godPurpose:'Dios revela en este evangelio quién es realmente Jesús: no solo un maestro o profeta, sino el Hijo eterno de Dios, el Verbo que era con Dios y era Dios. El propósito declarado es que las personas crean en Él y reciban vida eterna. Es el evangelio más explícito sobre la divinidad de Cristo y el amor de Dios.',godTeaching:'Dios quería enseñar que conocerle a Él es vida eterna, y que ese conocimiento viene a través de Jesús, el único camino al Padre. Enseña que la fe en Cristo no es solo intelectual, sino una relación que transforma y da vida abundante aquí y ahora.',consequences:'El Evangelio de Juan se convirtió en uno de los textos más amados y citados de la historia. Juan 3:16 es probablemente el versículo más conocido del mundo. Su clara presentación de la divinidad de Cristo fue fundamental en la formación de la doctrina cristiana y sigue llevando a millones a la fe.',practicalLessons:['La vida eterna no es solo una promesa futura, sino una relación con Dios que comienza hoy al conocer a Jesús.','Creer en Cristo es más que aceptar hechos: es confiar y entregarse a Él como Señor y Salvador.','Dios te ama personalmente: "de tal manera amó Dios al mundo" incluye tu nombre.','Jesús ofrece satisfacer las necesidades más profundas del alma: Él es el pan, el agua viva, la luz y el buen pastor.'],christConnection:'Todo el Evangelio de Juan ES la conexión con Cristo: su propósito central es revelar quién es Jesús. Comienza con la declaración más sublime sobre Él: "En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios... y aquel Verbo fue hecho carne". Cada señal demuestra su poder divino, cada "Yo soy" revela su naturaleza, y su muerte y resurrección consuman la salvación. Juan presenta a Jesús como el Cordero de Dios que quita el pecado del mundo, el cumplimiento de toda la esperanza del Antiguo Testamento.',keyVerses:[{ref:'Juan 1:1',text:'En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios.'},{ref:'Juan 3:16',text:'Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.'},{ref:'Juan 14:6',text:'Jesús le dijo: Yo soy el camino, y la verdad, y la vida; nadie viene al Padre, sino por mí.'},{ref:'Juan 11:25',text:'Yo soy la resurrección y la vida; el que cree en mí, aunque esté muerto, vivirá.'}],readingCall:'Si quieres conocer a Jesús, no hay mejor lugar para empezar que el Evangelio de Juan. Fue escrito precisamente para que creas y tengas vida. Te invitamos a leer sus 21 capítulos: comienza por el capítulo 1 para entender quién es Jesús, y el capítulo 3 para entender cómo recibir vida eterna. Léelo despacio, como quien escucha a un testigo presencial que vio, oyó y tocó al Hijo de Dios.'},  name:'Juan',           abbr:'Jn',  t:'NT', chapters:21,
        author:'Juan el apóstol (hijo de Zebedeo)', date:'~85-95 d.C.', genre:'Evangelio',
        context:'Juan escribe el cuarto evangelio décadas después de los sinópticos, con un propósito teológico específico: demostrar que Jesús es el Hijo de Dios eterno.',
        summary:'El Evangelio de Juan es único entre los cuatro evangelios. Mientras Mateo, Marcos y Lucas son "sinópticos" (ven desde el mismo ángulo), Juan adopta una perspectiva profunda y teológica. Organiza su narración alrededor de 7 señales milagrosas y 7 declaraciones "YO SOY" de Jesús, culminando en la revelación suprema: "Yo soy la resurrección y la vida" (11:25). Desde el prólogo eterno ("En el principio era el Verbo") hasta la pesca milagrosa del epílogo, Juan presenta al Jesús divino-humano que vino a darnos vida eterna.',
        purpose:'Declarado explícitamente en 20:31: "estas cosas se han escrito para que creáis que Jesús es el Cristo, el Hijo de Dios, y para que creyendo, tengáis vida en su nombre."',
        themes:['Deidad de Cristo','Fe y vida eterna','Amor de Dios','Luz vs tinieblas','El Espíritu Santo Paráclito','Señales y gloria'],
        keyVerse:{ref:'Juan 3:16', text:'Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.'},
        characters:[
          {name:'Jesús',role:'El Verbo encarnado, Hijo de Dios',icon:'✝'},
          {name:'Juan el Bautista',role:'Precursor del Mesías',icon:'🕊'},
          {name:'Pedro',role:'Apóstol principal',icon:'⚓'},
          {name:'Tomás',role:'El incrédulo que creyó',icon:'👁'},
          {name:'María Magdalena',role:'Primera testigo de la resurrección',icon:'🌹'},
          {name:'Lázaro',role:'Resucitado por Jesús',icon:'🌿'},
          {name:'Nicodemo',role:'Fariseo que buscó a Jesús de noche',icon:'📜'},
        ],
        teaching:'Juan 3:16 es el evangelio condensado. La fe en Cristo no es meramente intelectual sino una confianza total en su persona y obra. Las 7 señales no son trucos sino revelaciones de quién es Jesús: el que da vino (alegría), pan (sustento), vista (iluminación) y vida (resurrección).',
        application:'Leer Juan es encontrarse con Jesús tal como es: completamente divino y completamente humano. Cada conversación de Jesús en Juan (con Nicodemo, la samaritana, el ciego de nacimiento) es una invitación personal a creer y recibir vida eterna.',
        curiosities:['Juan nunca menciona su propio nombre; se refiere a sí mismo como "el discípulo amado".','El capítulo 11 muestra los dos versículos más cortos y más profundos: "Jesús lloró" (11:35).','Juan 3:16 fue calificado como "la Biblia en miniatura" por Martín Lutero.','El Evangelio de Juan contiene el 92% de material único no encontrado en los otros evangelios.'],
        timeline:[
          {period:'~6 a.C.', desc:'Nacimiento de Jesús (Juan comienza en la eternidad)'},
          {period:'~27 d.C.', desc:'Bautismo de Jesús; primeras señales'},
          {period:'~27-30 d.C.', desc:'Ministerio público: señales, discursos, controversias'},
          {period:'~30 d.C.', desc:'Última semana: lavamiento de pies, traición, crucifixión'},
          {period:'~30 d.C.', desc:'Resurrección y apariciones; Gran Comisión'},
          {period:'~85-95 d.C.', desc:'Juan escribe el evangelio desde Éfeso'},
        ],
      },
      { id:'ro', deep:{whatHappens:'Romanos es la exposición más completa y sistemática del Evangelio en toda la Biblia. Pablo explica el problema universal del pecado (todos, judíos y gentiles, están bajo condenación), la solución de Dios (la justificación por la fe en Cristo, no por las obras), y las implicaciones de la salvación: una vida nueva en el Espíritu, la seguridad eterna del creyente, el lugar de Israel en el plan de Dios, y cómo vivir de manera transformada en la práctica. Es el tratado teológico más influyente de la historia del cristianismo.',context:{general:'Pablo escribió Romanos alrededor del año 57 d.C., a una iglesia que no había fundado y que aún no había visitado, preparando su futura visita y buscando su apoyo para llevar el Evangelio hasta España.',political:'Roma era la capital del imperio más poderoso del mundo. La iglesia romana incluía tanto a judíos como a gentiles, y existían tensiones entre ambos grupos sobre la ley y las tradiciones.',cultural:'La sociedad romana era cosmopolita pero moralmente decadente, marcada por la idolatría y la inmoralidad que Pablo describe en el capítulo 1. La iglesia debía vivir de forma radicalmente distinta a su entorno.',spiritual:'Había confusión sobre la relación entre la ley judía y la gracia, y sobre si los gentiles debían volverse judíos para ser salvos. Pablo aclara que la salvación es por gracia mediante la fe, para todos por igual.'},godPurpose:'Dios usa esta carta para revelar con claridad cómo un ser humano pecador puede ser declarado justo ante un Dios santo: no por sus propios esfuerzos, sino por la fe en la obra de Cristo. Romanos despliega el plan completo de salvación, desde la condenación hasta la glorificación.',godTeaching:'Dios quería enseñar que nadie puede ganarse la salvación —"todos pecaron"— pero que Él ofrece justificación gratuita por la fe. Enseña que la gracia no es licencia para pecar, sino el poder para vivir una vida nueva, y que nada puede separarnos de su amor en Cristo.',consequences:'Romanos transformó la historia. La frase "el justo por la fe vivirá" llevó a Martín Lutero a la Reforma Protestante. La conversión de Agustín y de John Wesley estuvieron ligadas a este libro. Sigue siendo el fundamento del entendimiento cristiano de la salvación por gracia mediante la fe.',practicalLessons:['No puedes ganar la salvación con buenas obras; es un regalo que se recibe por la fe en Cristo.','En Cristo no hay condenación: el creyente tiene plena seguridad de su salvación.','La gracia recibida debe transformar tu vida; la fe verdadera produce una entrega total a Dios como "sacrificio vivo".','Nada —ni la muerte, ni la angustia, ni el futuro— puede separarte del amor de Dios en Cristo Jesús.'],christConnection:'Romanos es el desarrollo más profundo de lo que Cristo logró en la cruz. Explica que mientras éramos pecadores, Cristo murió por nosotros, llevando la condenación que merecíamos. Por su muerte y resurrección, los que creen son justificados —declarados justos— y reconciliados con Dios. Pablo muestra que Cristo es el "segundo Adán": donde el primer Adán trajo pecado y muerte a todos, Cristo trae justicia y vida a todos los que creen. La carta entera responde a la pregunta más importante: ¿cómo puede el hombre ser justo delante de Dios? Y la respuesta es: solo por medio de Cristo.',keyVerses:[{ref:'Romanos 3:23',text:'Por cuanto todos pecaron, y están destituidos de la gloria de Dios.'},{ref:'Romanos 5:8',text:'Mas Dios muestra su amor para con nosotros, en que siendo aún pecadores, Cristo murió por nosotros.'},{ref:'Romanos 6:23',text:'Porque la paga del pecado es muerte, mas la dádiva de Dios es vida eterna en Cristo Jesús Señor nuestro.'},{ref:'Romanos 8:38-39',text:'Por lo cual estoy seguro de que ni la muerte, ni la vida... nos podrá separar del amor de Dios, que es en Cristo Jesús Señor nuestro.'},{ref:'Romanos 10:9',text:'Que si confesares con tu boca que Jesús es el Señor, y creyeres en tu corazón que Dios le levantó de los muertos, serás salvo.'}],readingCall:'Romanos es el mapa completo del Evangelio. Si quieres entender con profundidad qué hizo Cristo por ti y cómo ser salvo, este es el libro. Te invitamos a leer sus 16 capítulos con calma: los capítulos 1 al 8 explican la salvación de principio a fin. Lee especialmente el capítulo 8 cuando necesites recordar que nada puede separarte del amor de Dios. Este libro ha transformado a gigantes de la fe; puede transformarte a ti.'},  name:'Romanos',        abbr:'Ro',  t:'NT', chapters:16,
        author:'Pablo', date:'~56-58 d.C.', genre:'Epístola',
        context:'Pablo escribe desde Corinto antes de su primer viaje a Roma. La iglesia en Roma era mixta (judíos y gentiles) con tensiones sobre la Ley y la gracia.',
        summary:'Romanos es la exposición más sistemática del evangelio en toda la Biblia. Pablo comienza estableciendo la necesidad universal de salvación (todos pecaron, 3:23), luego desarrolla la justificación por fe (cap. 3-5), la santificación por el Espíritu (cap. 6-8), el plan de Dios para Israel (cap. 9-11) y las implicaciones prácticas de la gracia (cap. 12-16). El capítulo 8 es considerado uno de los textos más sublimes de la literatura cristiana.',
        purpose:'Exponer el evangelio de la justificación por fe sola, resolver las tensiones entre judíos y gentiles en la iglesia y mostrar las implicaciones prácticas de la gracia.',
        themes:['Justificación por fe','Pecado universal','Vida en el Espíritu','Elección y soberanía de Dios','Ética cristiana','Unidad de la iglesia'],
        keyVerse:{ref:'Romanos 8:28', text:'Y sabemos que a los que aman a Dios, todas las cosas les ayudan a bien, esto es, a los que conforme a su propósito son llamados.'},
        characters:[
          {name:'Pablo',role:'Apóstol a los gentiles',icon:'📜'},
          {name:'Febe',role:'Diácona que llevó la carta',icon:'🕊'},
          {name:'Priscila y Aquila',role:'Colaboradores de Pablo en Roma',icon:'⛵'},
          {name:'Adán',role:'Representante de la humanidad caída',icon:'👤'},
          {name:'Abraham',role:'Ejemplo de justificación por fe',icon:'⭐'},
        ],
        teaching:'El evangelio no avergüenza porque es el poder de Dios para salvación (1:16). La justificación no es el resultado de las obras sino un regalo recibido por fe. El capítulo 8 concluye con la certeza inamovible: nada puede separarnos del amor de Dios en Cristo Jesús.',
        application:'Romanos transforma la manera en que entendemos la salvación, el pecado, la gracia y la ética. El capítulo 12 es el manual de vida cristiana comunitaria. "No os conforméis a este siglo" (12:2) es uno de los mandatos más urgentes para la iglesia de hoy.',
        curiosities:['Romanos fue el libro que Dios usó para convertir a Agustín de Hipona, Martín Lutero y John Wesley.','Pablo dictó la carta a Tercio, que la escribió (16:22).','El capítulo 9-11 es uno de los textos más debatidos de la teología sobre la soberanía de Dios y la libertad humana.','Romanos es considerada por muchos teólogos la obra maestra de Pablo.'],
        timeline:[
          {period:'~49 d.C.', desc:'Edicto de Claudio expulsa a los judíos de Roma'},
          {period:'~54 d.C.', desc:'Los judíos regresan a Roma; tensiones con creyentes gentiles'},
          {period:'~56-58 d.C.', desc:'Pablo escribe Romanos desde Corinto en su tercer viaje'},
          {period:'~58 d.C.', desc:'Febe lleva la carta a Roma'},
          {period:'~60-62 d.C.', desc:'Pablo llega a Roma como prisionero'},
        ],
      },
      { id:'mt', deep:{whatHappens:'Mateo presenta a Jesús como el Rey prometido, el Mesías esperado por Israel. Comienza con la genealogía que conecta a Jesús con David y Abraham, narra su nacimiento, su ministerio de enseñanza (incluyendo el Sermón del Monte, el mayor discurso ético de la historia), sus milagros que confirman su autoridad, su confrontación con los líderes religiosos, y finalmente su muerte y resurrección. Mateo cita constantemente el Antiguo Testamento para demostrar que Jesús cumple cada profecía mesiánica.',context:{general:'Escrito por Mateo (Leví), un publicano convertido en apóstol, hacia el año 50-60 d.C., dirigido principalmente a lectores judíos para demostrar que Jesús es el Mesías prometido.',political:'Judea estaba bajo dominio romano, gobernada por Herodes y luego por procuradores. El pueblo judío anhelaba un Mesías político que los liberara de Roma, pero Jesús vino a traer un reino espiritual.',cultural:'La sociedad judía giraba en torno a la ley de Moisés, el templo y las tradiciones de los fariseos. Mateo, escribiendo para judíos, usa términos y referencias que ellos entenderían, como "reino de los cielos".',spiritual:'El judaísmo estaba dominado por el legalismo de los fariseos, que habían reducido la fe a reglas externas. Jesús confronta esta religiosidad vacía y llama a una justicia del corazón.'},godPurpose:'Dios revela en Mateo que Jesús es el cumplimiento de todas las promesas hechas a Israel: el Rey de la línea de David, el Emanuel ("Dios con nosotros"), el Mesías anunciado por los profetas. Establece las bases del Reino de los cielos y la nueva comunidad de fe.',godTeaching:'Dios quería enseñar que su Reino no es político sino del corazón, que la verdadera justicia supera la externa de los fariseos, y que Jesús tiene autoridad para reinterpretar la ley porque Él es su cumplimiento. El Sermón del Monte revela los valores invertidos del Reino.',consequences:'Mateo se convirtió en el evangelio más usado en la enseñanza de la iglesia primitiva por su estructura ordenada. La Gran Comisión con que termina (id y haced discípulos a todas las naciones) lanzó el movimiento misionero que llevó el cristianismo al mundo entero.',practicalLessons:['El Reino de Dios comienza en el corazón, no en circunstancias externas; Dios mira lo interior.','Las Bienaventuranzas invierten los valores del mundo: los humildes, los misericordiosos y los pacificadores son los verdaderamente felices.','La fe verdadera produce obras; no basta decir "Señor, Señor", sino hacer la voluntad del Padre.','Jesús nos envía a hacer discípulos: la fe que recibimos debe compartirse con otros.'],christConnection:'Mateo ES el retrato de Cristo como Rey Mesías. Cada capítulo demuestra que Jesús cumple las profecías: nace de una virgen (Isaías 7:14), en Belén (Miqueas 5:2), es llamado de Egipto (Oseas 11:1). El título "Emanuel, Dios con nosotros" enmarca todo el evangelio, que termina con la promesa "yo estoy con vosotros todos los días". Jesús es el nuevo Moisés que da la ley desde el monte, el Hijo de David que reina, y el Salvador cuyo nombre significa "Jehová salva".',keyVerses:[{ref:'Mateo 1:23',text:'He aquí, una virgen concebirá y dará a luz un hijo, y llamarás su nombre Emanuel, que traducido es: Dios con nosotros.'},{ref:'Mateo 5:3',text:'Bienaventurados los pobres en espíritu, porque de ellos es el reino de los cielos.'},{ref:'Mateo 11:28',text:'Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar.'},{ref:'Mateo 28:19',text:'Por tanto, id, y haced discípulos a todas las naciones, bautizándolos en el nombre del Padre, y del Hijo, y del Espíritu Santo.'}],readingCall:'Mateo es el puente perfecto entre el Antiguo y el Nuevo Testamento, mostrando cómo Jesús cumple toda promesa. Te invitamos a leer sus 28 capítulos, comenzando por el Sermón del Monte (capítulos 5 al 7), el corazón de la enseñanza de Jesús. Descubre al Rey que vino a reinar en tu corazón.'},  name:'Mateo',          abbr:'Mt',  t:'NT', chapters:28,
        author:'Mateo (Leví), el recaudador de impuestos', date:'~50-70 d.C.', genre:'Evangelio',
        context:'Escrito principalmente para lectores judíos, Mateo presenta a Jesús como el Mesías prometido en el Antiguo Testamento, el nuevo Moisés y el Rey de Israel.',
        summary:'Mateo organiza su evangelio en cinco grandes discursos (paralelos a los 5 libros de Moisés): el Sermón del Monte (cap. 5-7), la misión de los doce (cap. 10), las parábolas del reino (cap. 13), la vida en comunidad (cap. 18) y el discurso escatológico (cap. 24-25). El libro comienza con la genealogía real de Jesús y termina con la Gran Comisión, mostrando que el Rey manda a sus embajadores al mundo.',
        purpose:'Demostrar que Jesús de Nazaret es el Mesías prometido en las Escrituras hebreas y el Rey del reino de Dios.',
        themes:['Jesús el Mesías','Reino de los cielos','Cumplimiento de la profecía','Discipulado','La nueva Ley','Misión universal'],
        keyVerse:{ref:'Mateo 28:19-20', text:'Por tanto, id, y haced discípulos a todas las naciones... yo estoy con vosotros todos los días, hasta el fin del mundo.'},
        characters:[
          {name:'Jesús',role:'Rey Mesías',icon:'✝'},
          {name:'José y María',role:'Padres adoptivo y biológica',icon:'👨‍👩‍👦'},
          {name:'Los Magos',role:'Sabios que adoraron al Rey',icon:'⭐'},
          {name:'Juan el Bautista',role:'Precursor del Reino',icon:'🕊'},
          {name:'Pedro',role:'Roca de la iglesia',icon:'⚓'},
          {name:'Judas Iscariote',role:'El traidor',icon:'💰'},
        ],
        teaching:'El Sermón del Monte (cap. 5-7) no es un camino de salvación sino la descripción del carácter del ciudadano del reino. Las Bienaventuranzas invierten los valores del mundo. El discipulado en Mateo es costoso: implica negarse a uno mismo, tomar la cruz y seguir a Jesús.',
        application:'Mateo nos desafía a ser hacedores de discípulos, no solo conversos. La Gran Comisión no es opcional sino el mandato central de toda iglesia. Cada creyente es un embajador del Rey.',
        curiosities:['Mateo usa la frase "reino de los cielos" 32 veces; los otros evangelios no la usan.','Cita el AT más de 60 veces, más que cualquier otro evangelio.','La genealogía de Mateo incluye 4 mujeres (Tamar, Rahab, Rut, Betsabé), todas con historias extraordinarias de gracia.','El Sermón del Monte (cap. 5-7) es considerado el discurso ético más influyente de la historia.'],
        timeline:[
          {period:'~6-4 a.C.', desc:'Nacimiento de Jesús en Belén; huida a Egipto'},
          {period:'~27 d.C.', desc:'Bautismo de Jesús; tentación en el desierto'},
          {period:'~27-30 d.C.', desc:'Ministerio en Galilea; Sermón del Monte; milagros'},
          {period:'~29-30 d.C.', desc:'Camino a Jerusalén; transfiguración'},
          {period:'~30 d.C.', desc:'Semana de la Pasión; muerte y resurrección'},
          {period:'~50-70 d.C.', desc:'Mateo escribe el evangelio'},
        ],
      },
      { id:'ap', deep:{whatHappens:'Apocalipsis es la gran revelación del triunfo final de Cristo y la consumación del plan de Dios. El apóstol Juan, exiliado en la isla de Patmos, recibe visiones del Cristo glorificado, mensajes a siete iglesias, y una serie de visiones proféticas sobre el juicio final, la batalla entre el bien y el mal, la caída de los poderes opuestos a Dios, y la victoria definitiva de Jesús. Culmina con la promesa de un cielo nuevo y una tierra nueva, donde Dios habitará para siempre con su pueblo y no habrá más lágrimas, muerte ni dolor.',context:{general:'Escrito por el apóstol Juan hacia el año 95 d.C., durante el reinado del emperador Domiciano, mientras estaba desterrado en Patmos por causa de su fe.',political:'El Imperio Romano exigía el culto al emperador como dios. Los cristianos que se negaban eran perseguidos, encarcelados y martirizados. Apocalipsis es un mensaje de esperanza para una iglesia sufriente.',cultural:'El libro usa el género apocalíptico, lleno de simbolismo, números e imágenes que los lectores judíos y cristianos del primer siglo entendían, aunque hoy requieren estudio cuidadoso.',spiritual:'Las siete iglesias enfrentaban persecución externa, falsas enseñanzas internas y, en algunos casos, tibieza espiritual. Cristo les habla directamente para corregir, animar y llamar a la fidelidad.'},godPurpose:'Dios revela que, a pesar del aparente triunfo del mal y el sufrimiento de su pueblo, Él tiene el control absoluto de la historia y Cristo vencerá definitivamente. El propósito es dar esperanza y perseverancia a los creyentes perseguidos, asegurándoles la victoria final.',godTeaching:'Dios quería enseñar que la historia tiene un destino glorioso, que vale la pena permanecer fiel hasta el fin, y que el mal no tendrá la última palabra. La adoración a Dios es el tema central: solo Él es digno.',consequences:'Apocalipsis cierra la Biblia completando el círculo que comenzó en Génesis: lo que se perdió en el Edén (el árbol de la vida, la comunión con Dios) se restaura para siempre. Ha sostenido la esperanza de los mártires y creyentes perseguidos durante 2000 años.',practicalLessons:['No importa cuán oscuro parezca el presente, Cristo ya ha vencido y reinará para siempre.','Vale la pena permanecer fiel a Jesús aunque cueste, porque la recompensa eterna es segura.','La adoración a Dios es nuestro destino y nuestro mayor privilegio, ahora y por la eternidad.','Dios enjugará toda lágrima: el sufrimiento presente es temporal, la gloria venidera es eterna.'],christConnection:'Apocalipsis es la revelación de Jesucristo en su gloria. Lo presenta no como el carpintero humilde de los evangelios, sino como el Rey de reyes y Señor de señores, el León de Judá y el Cordero inmolado, el Alfa y la Omega. Cristo es el centro de cada visión: el que abre los sellos, el que vence, el esposo de la iglesia, el juez justo y el Rey eterno. El libro culmina con su regreso triunfal y la eternidad con Él. Toda la esperanza cristiana se consuma en Cristo victorioso.',keyVerses:[{ref:'Apocalipsis 1:8',text:'Yo soy el Alfa y la Omega, principio y fin, dice el Señor, el que es y que era y que ha de venir, el Todopoderoso.'},{ref:'Apocalipsis 3:20',text:'He aquí, yo estoy a la puerta y llamo; si alguno oye mi voz y abre la puerta, entraré a él, y cenaré con él, y él conmigo.'},{ref:'Apocalipsis 21:4',text:'Enjugará Dios toda lágrima de los ojos de ellos; y ya no habrá muerte, ni habrá más llanto, ni clamor, ni dolor; porque las primeras cosas pasaron.'}],readingCall:'Apocalipsis no es un libro para temer, sino para esperar con gozo: revela el final glorioso de la historia. Te invitamos a leer sus 22 capítulos, especialmente los capítulos 21 y 22, donde se describe el hogar eterno con Dios. Si estás pasando por dificultades, este libro te recordará que Cristo ya venció y que lo mejor está por venir.'},  name:'Apocalipsis',    abbr:'Ap',  t:'NT', chapters:22,
        author:'Juan el apóstol', date:'~95-96 d.C.', genre:'Profecía / Apocalíptica',
        context:'Escrito desde la isla de Patmos durante la persecución del emperador Domiciano, Apocalipsis fue enviado a siete iglesias de Asia Menor para darles esperanza.',
        summary:'Apocalipsis ("Revelación") es el único libro profético del NT. Revela a Jesucristo como el Señor soberano de la historia mediante visiones simbólicas: los siete sellos, las siete trompetas y las siete copas. El libro no oculta la realidad del sufrimiento cristiano, pero lo enmarca dentro de la victoria final de Dios. El Cordero que fue inmolado es también el León de Judá que gobierna la historia. El libro termina con la Nueva Jerusalén: "He aquí, el tabernáculo de Dios con los hombres" (21:3).',
        purpose:'Revelar la soberanía de Jesucristo sobre la historia, dar consuelo a la iglesia perseguida y asegurar que Dios tiene la última palabra.',
        themes:['Victoria de Cristo','Juicio y justicia','Sufrimiento y perseverancia','Nueva creación','Adoración celestial','Soberanía de Dios'],
        keyVerse:{ref:'Apocalipsis 21:4', text:'Enjugará Dios toda lágrima de los ojos de ellos; y ya no habrá muerte, ni habrá más llanto, ni clamor, ni dolor; porque las primeras cosas pasaron.'},
        characters:[
          {name:'Jesús el Cordero',role:'León de Judá y Rey de reyes',icon:'✝'},
          {name:'Juan',role:'Receptor de la visión en Patmos',icon:'📜'},
          {name:'Los 24 ancianos',role:'Representantes de la iglesia redimida',icon:'👑'},
          {name:'Los 4 seres vivientes',role:'Guardianes del trono de Dios',icon:'⭐'},
          {name:'La Gran Ramera',role:'Sistema mundano opuesto a Dios',icon:'⚔'},
          {name:'La Bestia',role:'Poder político anticristiano',icon:'🐉'},
        ],
        teaching:'La historia no está fuera de control: Dios sostiene el libro sellado y el Cordero lo abre. El sufrimiento presente es temporal; la gloria futura es eterna. La adoración celestial (cap. 4-5) revela que el propósito último de toda la creación es glorificar a Dios.',
        application:'Apocalipsis nos da perspectiva eterna en tiempos de tribulación. La promesa de Apocalipsis 21:4 es el mayor consuelo para el que sufre. Vivir sub specie aeternitatis (bajo la perspectiva de la eternidad) transforma la manera en que enfrentamos el presente.',
        curiosities:['Apocalipsis contiene más de 300 referencias al AT aunque nunca cita directamente ningún versículo.','El número 7 aparece más de 50 veces en el libro (7 iglesias, 7 sellos, 7 trompetas, 7 copas).','La isla de Patmos mide apenas 13 km de largo.','El libro comienza y termina con la promesa de la venida de Cristo (1:7; 22:20).'],
        timeline:[
          {period:'~30 d.C.', desc:'Muerte y resurrección de Cristo'},
          {period:'~64-68 d.C.', desc:'Persecución de Nerón; martirio de Pedro y Pablo'},
          {period:'~70 d.C.', desc:'Destrucción de Jerusalén por Tito'},
          {period:'~81-96 d.C.', desc:'Reinado de Domiciano; persecución imperial'},
          {period:'~95-96 d.C.', desc:'Juan en Patmos recibe la Revelación'},
          {period:'Futuro', desc:'Segunda venida de Cristo; nueva creación'},
        ],
      },
      { id:'pr', deep:{whatHappens:'Proverbios es el libro de la sabiduría práctica para la vida diaria. Recopila dichos breves, principalmente de Salomón, que enseñan cómo vivir sabiamente en cada área: el trabajo, el dinero, las relaciones, el matrimonio, el habla, la amistad, la disciplina y, sobre todo, la relación con Dios. Su tema central es que "el principio de la sabiduría es el temor de Jehová". No promete fórmulas mágicas, sino principios generales que, vividos con reverencia a Dios, conducen a una vida plena y bendecida.',context:{general:'Compilado principalmente por Salomón (alrededor del 950 a.C.), el rey más sabio de Israel, con adiciones de otros sabios. Refleja siglos de sabiduría del pueblo de Dios.',political:'Escrito durante la edad de oro de Israel bajo Salomón, una época de paz y prosperidad que permitió el florecimiento de la literatura sapiencial.',cultural:'La literatura de sabiduría era común en el antiguo Cercano Oriente, pero Proverbios se distingue por fundamentar toda sabiduría en el temor de Dios, no en la mera prudencia humana.',spiritual:'Proverbios enseña que la verdadera sabiduría no es solo conocimiento, sino vivir en armonía con el diseño de Dios. Contrasta dos caminos: el del sabio (que teme a Dios) y el del necio (que lo ignora).'},godPurpose:'Dios revela que la sabiduría para vivir bien proviene de Él y comienza con reverenciarle. El propósito es equipar al creyente con principios prácticos para tomar buenas decisiones en cada área de la vida, honrando a Dios en lo cotidiano.',godTeaching:'Dios quería enseñar que la fe no es solo para el templo, sino para la vida diaria: cómo hablar, trabajar, manejar el dinero, elegir amistades y criar hijos. La sabiduría verdadera es práctica y comienza con el temor de Dios.',consequences:'Proverbios se convirtió en el manual de formación de carácter para generaciones. Sus principios sobre el trabajo, la integridad, el dominio propio y las relaciones han guiado a creyentes en cada cultura y época, demostrando que la sabiduría de Dios es atemporal.',practicalLessons:['El temor de Dios —reverenciarlo y obedecerlo— es el fundamento de toda decisión sabia.','Cuida tus palabras: la lengua tiene poder de vida y muerte; las palabras sabias sanan y las necias hieren.','Las amistades te moldean: "el que anda con sabios, sabio será"; elige bien tus compañías.','La diligencia, la honestidad y el dominio propio conducen a la bendición; la pereza y la imprudencia a la ruina.'],christConnection:'Proverbios personifica la Sabiduría como alguien que estaba con Dios desde antes de la creación (capítulo 8), participando en formar el mundo. El Nuevo Testamento revela que esa Sabiduría encarnada es Cristo, "en quien están escondidos todos los tesoros de la sabiduría y del conocimiento" (Colosenses 2:3). Pablo dice que Cristo "nos ha sido hecho por Dios sabiduría" (1 Corintios 1:30). Jesús no solo enseña sabiduría: Él ES la Sabiduría de Dios hecha carne, el camino para vivir como fuimos diseñados.',keyVerses:[{ref:'Proverbios 1:7',text:'El principio de la sabiduría es el temor de Jehová; los insensatos desprecian la sabiduría y la enseñanza.'},{ref:'Proverbios 3:5-6',text:'Fíate de Jehová de todo tu corazón, y no te apoyes en tu propia prudencia. Reconócelo en todos tus caminos, y él enderezará tus veredas.'},{ref:'Proverbios 18:21',text:'La muerte y la vida están en poder de la lengua, y el que la ama comerá de sus frutos.'}],readingCall:'Proverbios es sabiduría de Dios para tu vida diaria. Una forma maravillosa de leerlo es un capítulo por día durante un mes (tiene 31 capítulos). Te invitamos a comenzar hoy: lee el capítulo del día y aplica al menos un principio. Verás cómo Dios transforma tu manera de hablar, trabajar y relacionarte. La sabiduría que el mundo busca por años, Dios la ofrece en estas páginas.'},  name:'Proverbios',     abbr:'Pr',  t:'AT', chapters:31,
        author:'Salomón principalmente; también Agur y Lemuel', date:'~971-700 a.C.', genre:'Sabiduría',
        context:'Proverbios refleja la tradición de sabiduría del antiguo Oriente Próximo, reinterpretada desde la fe en Jehová. Fue compilado durante y después del reinado de Salomón.',
        summary:'Proverbios es el manual de sabiduría práctica de la Biblia. Su premisa fundamental: "El temor de Jehová es el principio de la sabiduría" (9:10). El libro cubre prácticamente todas las áreas de la vida: el trabajo, el dinero, las palabras, las relaciones, la familia, la pereza, el orgullo y la humildad. No es un libro de promesas incondicionales sino de principios generales que reflejan el orden moral de la creación. La "mujer virtuosa" del capítulo 31 es el retrato de alguien que vive con sabiduría en todos los ámbitos.',
        purpose:'Desarrollar el juicio moral y la habilidad práctica para navegar la vida cotidiana con sabiduría divina.',
        themes:['Temor de Dios','Sabiduría vs insensatez','Palabras y lengua','Trabajo e integridad','Familia y relaciones','Riqueza y pobreza'],
        keyVerse:{ref:'Proverbios 3:5-6', text:'Confía en Jehová con todo tu corazón, y no te apoyes en tu propia prudencia. Reconócelo en todos tus caminos, y él enderezará tus veredas.'},
        characters:[
          {name:'Salomón',role:'Autor principal; rey sabio',icon:'👑'},
          {name:'El padre instruye',role:'Voz pedagógica principal',icon:'📜'},
          {name:'La Sabiduría',role:'Personificada como mujer',icon:'⭐'},
          {name:'La Mujer Virtuosa',role:'Epítome de la sabiduría aplicada',icon:'🌟'},
          {name:'El Necio',role:'Contraste del sabio',icon:'⚠'},
        ],
        teaching:'La sabiduría bíblica no es teórica sino enormemente práctica. Las pequeñas decisiones cotidianas (con quién te juntas, qué dices, cómo trabajas) tienen consecuencias de largo plazo. El temor a Dios no es terror sino reverencia que reorienta toda la vida.',
        application:'Cada capítulo de Proverbios puede servir como meditación diaria. El capítulo 31 no es solo un ideal femenino sino una descripción de la vida sabia en acción. Proverbios desafía al creyente a aplicar su fe a las áreas más mundanas: el trabajo, las finanzas y las conversaciones.',
        curiosities:['El libro de Proverbios tiene paralelos con la sabiduría egipcia y mesopotámica, mostrando que Dios es señor de toda sabiduría.','El Proverbio 31:10-31 es un acróstico: cada versículo comienza con una letra del alfabeto hebreo.','Salomón compuso 3.000 proverbios (1 Reyes 4:32) pero solo una fracción fue incluida en el canon.','La palabra "sabio" y sus derivados aparecen más de 100 veces en el libro.'],
        timeline:[
          {period:'~971-931 a.C.', desc:'Reinado de Salomón; composición de la mayoría de los proverbios'},
          {period:'~700 a.C.', desc:'Ezequías manda copiar más proverbios de Salomón (25:1)'},
          {period:'Fecha incierta', desc:'Agur (cap. 30) y Lemuel (cap. 31) añaden sus colecciones'},
          {period:'~430 a.C.', desc:'Canon del AT completo; Proverbios incluido'},
        ],
      },
      { id:'ef', deep:{whatHappens:'Efesios revela el glorioso plan eterno de Dios para la iglesia y el creyente. Pablo explica las bendiciones espirituales que tenemos en Cristo (elegidos, adoptados, redimidos, sellados con el Espíritu), cómo fuimos salvados por gracia mediante la fe, y cómo judíos y gentiles son unidos en un solo cuerpo. La segunda mitad aplica estas verdades a la vida práctica: la unidad de la iglesia, la vida santa, las relaciones familiares, y la armadura de Dios para la batalla espiritual. Es una carta que eleva la mirada a la grandeza del propósito de Dios.',context:{general:'Escrita por Pablo desde la prisión en Roma (alrededor del 60-62 d.C.), probablemente como carta circular para varias iglesias de Asia Menor, no solo Éfeso.',political:'Pablo estaba encadenado por el Imperio Romano, pero escribe sobre la libertad y riquezas espirituales que ninguna prisión puede quitar.',cultural:'Éfeso era un centro de magia, idolatría y el culto a la diosa Diana. Los creyentes provenían de ese trasfondo pagano, y Pablo les muestra su nueva y gloriosa identidad en Cristo.',spiritual:'Los creyentes necesitaban entender la magnitud de lo que tenían en Cristo y vivir a la altura de ese llamado, en unidad y santidad, resistiendo las fuerzas espirituales del mal.'},godPurpose:'Dios revela su plan eterno: reunir todas las cosas en Cristo y formar una nueva humanidad —la iglesia— donde judíos y gentiles son uno. Muestra la inmensa riqueza de la gracia y el propósito eterno de Dios para sus hijos.',godTeaching:'Dios quería enseñar que la salvación es enteramente por gracia ("por gracia sois salvos por medio de la fe... no por obras"), que los creyentes tienen una identidad y herencia gloriosas, y que esta verdad debe transformar cómo vivimos, nos relacionamos y luchamos espiritualmente.',consequences:'Efesios se convirtió en una de las cartas más amadas sobre la identidad del creyente y la naturaleza de la iglesia. Su enseñanza sobre la salvación por gracia, la unidad del cuerpo de Cristo y la armadura espiritual ha moldeado la teología y la práctica cristiana por siglos.',practicalLessons:['Tu identidad en Cristo es gloriosa: eres elegido, adoptado, redimido y sellado; vive según eso.','La salvación es un regalo de la gracia de Dios, no algo que ganas; recíbela con gratitud y humildad.','La unidad entre creyentes refleja el propósito de Dios; derriba las barreras que dividen.','Estás en una batalla espiritual real; vístete cada día con toda la armadura de Dios.'],christConnection:'Efesios exalta a Cristo como la cabeza de la iglesia y aquel en quien Dios reúne todas las cosas. En Él tenemos toda bendición espiritual, redención por su sangre y acceso al Padre. Cristo derribó "la pared intermedia de separación" entre judíos y gentiles, haciendo de los dos un solo pueblo mediante su cruz. Él es la piedra angular sobre la cual se edifica la iglesia, el esposo que ama y se entregó por ella. Todo el propósito eterno de Dios se centra y se cumple en Cristo.',keyVerses:[{ref:'Efesios 2:8-9',text:'Porque por gracia sois salvos por medio de la fe; y esto no de vosotros, pues es don de Dios; no por obras, para que nadie se gloríe.'},{ref:'Efesios 2:10',text:'Porque somos hechura suya, creados en Cristo Jesús para buenas obras, las cuales Dios preparó de antemano para que anduviésemos en ellas.'},{ref:'Efesios 6:11',text:'Vestíos de toda la armadura de Dios, para que podáis estar firmes contra las asechanzas del diablo.'}],readingCall:'Efesios te mostrará quién eres realmente en Cristo: amado, elegido y lleno de propósito. Te invitamos a leer sus 6 capítulos. Los primeros tres te elevarán al ver todo lo que Dios ha hecho por ti; los últimos tres te enseñarán a vivirlo. No te pierdas el capítulo 6 sobre la armadura de Dios, esencial para tu vida espiritual diaria.'},  name:'Efesios',        abbr:'Ef',  t:'NT', chapters:6,
        author:'Pablo', date:'~60-62 d.C.', genre:'Epístola',
        context:'Escrita desde la prisión en Roma (~61 d.C.), Efesios es una carta circular para varias iglesias de Asia Menor. No aborda problemas específicos sino que desarrolla la doctrina de la iglesia.',
        summary:'Efesios es el gran tratado de Pablo sobre la iglesia. Los primeros tres capítulos son teología pura: la elección en Cristo, la unión en él, el misterio de la iglesia como cuerpo de Cristo. Los últimos tres son práctica: la nueva vida en Cristo, la unidad, las relaciones familiares y la armadura espiritual. El punto de bisagra es 4:1: "Os ruego que andéis como es digno de la vocación con que fuisteis llamados." La doctrina siempre debe traducirse en práctica.',
        purpose:'Revelar el misterio eterno de la iglesia como cuerpo de Cristo, exhortar a la unidad y santidad, y equipar a los creyentes para la guerra espiritual.',
        themes:['La iglesia cuerpo de Cristo','Gracia y elección','Unidad del Espíritu','Vida nueva en Cristo','Relaciones y familia','Armadura espiritual'],
        keyVerse:{ref:'Efesios 2:8-9', text:'Porque por gracia sois salvos por medio de la fe; y esto no de vosotros, pues es don de Dios; no por obras, para que nadie se gloríe.'},
        characters:[
          {name:'Pablo',role:'Apóstol en prisión',icon:'📜'},
          {name:'Tíquico',role:'Mensajero que llevó la carta',icon:'🕊'},
        ],
        teaching:'La salvación es completamente por gracia (2:8-9), pero la gracia produce necesariamente buenas obras (2:10). La armadura de Dios (6:10-18) no es defensiva sino ofensiva: el creyente está en guerra espiritual real pero lucha desde la victoria de Cristo.',
        application:'Efesios transforma la visión de la iglesia: no es una organización humana sino el cuerpo de Cristo, su morada en el Espíritu. La oración de Pablo en 1:17-19 y 3:16-19 son modelos de intercesión profunda. La tabla familiar (5:22-6:9) muestra cómo el evangelio transforma las relaciones más cercanas.',
        curiosities:['Efesios tiene la oración más larga de Pablo (1:3-14), un solo período gramatical en griego con 202 palabras.','La palabra "en Cristo" y equivalentes aparecen más de 35 veces en los primeros 3 capítulos.','La armadura romana que Pablo describe (cap. 6) era familiar para sus lectores ya que Roma ocupaba sus ciudades.','"Kayros" (tiempo oportuno) en 5:16 sugiere aprovechar cada momento para el bien.'],
        timeline:[
          {period:'~52-55 d.C.', desc:'Pablo funda la iglesia en Éfeso; ministerio de 3 años'},
          {period:'~57 d.C.', desc:'Pablo es arrestado en Jerusalén'},
          {period:'~60-62 d.C.', desc:'Pablo bajo arresto domiciliario en Roma; escribe Efesios'},
          {period:'~62 d.C.', desc:'Tíquico lleva la carta circular a las iglesias de Asia'},
        ],
      },
      { id:'he', deep:{whatHappens:'Hebreos demuestra la absoluta superioridad de Cristo sobre todo lo anterior. Escrito a cristianos de trasfondo judío tentados a volver al judaísmo, el libro muestra que Jesús es superior a los ángeles, a Moisés, al sacerdocio levítico y a todos los sacrificios del Antiguo Testamento. Cristo es el sumo sacerdote perfecto y eterno, cuyo único sacrificio en la cruz logró lo que miles de sacrificios animales nunca pudieron: el perdón definitivo. El libro intercala advertencias urgentes contra apartarse de la fe y exhortaciones a perseverar, culminando con el gran "salón de la fe" del capítulo 11.',context:{general:'Escrito hacia el año 65-68 d.C. (autor desconocido, posiblemente Pablo, Apolos o Bernabé) a creyentes judíos que, bajo presión y persecución, consideraban abandonar a Cristo y volver al judaísmo.',political:'La persecución contra los cristianos aumentaba. Volver al judaísmo, una religión legalmente reconocida por Roma, era una tentación para escapar del sufrimiento.',cultural:'Los lectores conocían profundamente el sistema del templo, los sacrificios y el sacerdocio. El autor usa ese conocimiento para mostrar cómo todo aquello apuntaba a Cristo y quedaba obsoleto en Él.',spiritual:'Los creyentes estaban espiritualmente cansados y tentados a retroceder. El libro los exhorta a "fijar la mirada en Jesús" y perseverar, advirtiendo del peligro de apostatar.'},godPurpose:'Dios revela que todo el sistema del Antiguo Testamento —sacerdotes, sacrificios, el templo— era una sombra que apuntaba a la realidad: Cristo. El propósito es mostrar que en Jesús tenemos algo infinitamente superior y definitivo, para que nadie vuelva atrás.',godTeaching:'Dios quería enseñar que Cristo es el cumplimiento final y perfecto de todo lo anterior, que su sacrificio es suficiente y eterno, y que por eso debemos perseverar en la fe sin retroceder, acercándonos confiadamente al trono de la gracia.',consequences:'Hebreos consolidó la comprensión cristiana de Cristo como sumo sacerdote y sacrificio perfecto, mostrando la relación entre los dos Testamentos. Su capítulo 11 ("la fe") y su llamado a perseverar han fortalecido a creyentes en pruebas durante toda la historia de la iglesia.',practicalLessons:['Cristo es suficiente: no necesitas añadir rituales ni méritos a su obra perfecta en la cruz.','Podemos acercarnos confiadamente a Dios porque Jesús es nuestro sumo sacerdote que nos entiende.','La fe es perseverar confiando en lo que no vemos, como hicieron los héroes del capítulo 11.','Cuando estés cansado espiritualmente, "fija la mirada en Jesús", el autor y consumador de la fe.'],christConnection:'Hebreos es quizás el libro que más exalta la supremacía de Cristo. Lo presenta como el resplandor de la gloria de Dios, superior a los ángeles y a Moisés, y sobre todo como el sumo sacerdote perfecto según el orden de Melquisedec. A diferencia de los sacerdotes que repetían sacrificios sin fin, Cristo se ofreció a sí mismo "una vez para siempre", logrando la redención eterna. Él es el mediador de un mejor pacto, sellado con su propia sangre. Todo el Antiguo Testamento era una sombra; Cristo es la realidad.',keyVerses:[{ref:'Hebreos 4:12',text:'Porque la palabra de Dios es viva y eficaz, y más cortante que toda espada de dos filos.'},{ref:'Hebreos 11:1',text:'Es, pues, la fe la certeza de lo que se espera, la convicción de lo que no se ve.'},{ref:'Hebreos 12:2',text:'Puestos los ojos en Jesús, el autor y consumador de la fe, el cual por el gozo puesto delante de él sufrió la cruz.'},{ref:'Hebreos 13:8',text:'Jesucristo es el mismo ayer, y hoy, y por los siglos.'}],readingCall:'Hebreos te mostrará por qué Cristo lo es todo y por qué nunca debes retroceder en tu fe. Te invitamos a leer sus 13 capítulos. No te pierdas el capítulo 11, el gran "salón de la fe", que te inspirará con el ejemplo de quienes confiaron en Dios contra toda circunstancia. Si te sientes cansado en tu caminar, este libro te dará razones para perseverar mirando a Jesús.'},  name:'Hebreos',        abbr:'He',  t:'NT', chapters:13,
        author:'Desconocido (propuestos: Pablo, Apolos, Bernabé, Priscila)', date:'~64-68 d.C.', genre:'Epístola / Sermón',
        context:'Escrita a creyentes de origen judío que estaban considerando abandonar la fe en Cristo para volver al judaísmo, posiblemente bajo presión de persecución.',
        summary:'Hebreos es el gran argumento de la superioridad de Cristo sobre todo lo que el judaísmo ofrecía. Cristo es superior a los ángeles (cap. 1-2), a Moisés (cap. 3-4), al sacerdocio levítico (cap. 5-7), al pacto antiguo (cap. 8-10) y a todos los sacrificios del AT. La fe como certeza de lo esperado (11:1) introduce el "salón de la fama de la fe" con los héroes del AT. El libro termina con exhortaciones prácticas y la doxología final.',
        purpose:'Demostrar que Cristo es el sumo sacerdote perfecto y el mediador del nuevo y mejor pacto, para que los creyentes no retrocedan sino que perseveren.',
        themes:['Superioridad de Cristo','Nuevo pacto vs antiguo','Fe y perseverancia','El sumo sacerdocio de Cristo','Disciplina de Dios','Carrera espiritual'],
        keyVerse:{ref:'Hebreos 11:1', text:'Es, pues, la fe la certeza de lo que se espera, la convicción de lo que no se ve.'},
        characters:[
          {name:'Jesús',role:'Sumo sacerdote perfecto',icon:'✝'},
          {name:'Melquisedec',role:'Tipo de sacerdocio eterno',icon:'👑'},
          {name:'Abel',role:'Primer mártir; ofrenda por fe',icon:'🙏'},
          {name:'Noé',role:'Constructor por fe',icon:'⛵'},
          {name:'Abraham',role:'Emigrante por fe',icon:'⭐'},
          {name:'Moisés',role:'Renunció a Egipto por fe',icon:'⚡'},
        ],
        teaching:'El Sumo Sacerdote perfecto entiende nuestras debilidades porque fue tentado en todo como nosotros, pero sin pecado (4:15). Esto hace posible acercarnos confiadamente al trono de la gracia. La disciplina de Dios es amor paternal, no rechazo.',
        application:'Hebreos 12:1-2 es el texto definitivo sobre la perseverancia cristiana: correr con paciencia mirando a Jesús. Cuando la fe sea difícil, recordar la nube de testigos que corrieron antes que nosotros. No retroceder sino avanzar hacia la madurez.',
        curiosities:['Hebreos es el único libro del NT sin introducción epistolar (no hay saludo al inicio).','El sacerdocio de Melquisedec (cap. 7) es una de las tipologías más misteriosas del AT.','La carta usa el griego más elegante y pulido de todo el NT.','Cita el AT más de 30 veces, principalmente del Salterio e Isaías.'],
        timeline:[
          {period:'~30 d.C.', desc:'Muerte y resurrección de Cristo; nuevo sacerdocio inaugurado'},
          {period:'~48-64 d.C.', desc:'Persecución creciente; creyentes judíos bajo presión'},
          {period:'~64-68 d.C.', desc:'Hebreos es escrito antes de la destrucción del templo'},
          {period:'~70 d.C.', desc:'Destrucción del templo; el sistema levítico cesa'},
        ],
      },
      { id:'lv', deep:{whatHappens:'Levítico es el manual de santidad de Israel. Tras salir de Egipto y recibir la Ley, el pueblo necesitaba saber cómo acercarse y vivir en presencia de un Dios santo. El libro detalla el sistema de sacrificios para el perdón de pecados, las funciones del sacerdocio, las leyes de pureza, las fiestas sagradas, y el gran Día de la Expiación. Su mensaje central resuena en cada página: "Sed santos, porque yo soy santo". Enseña que el acceso a Dios requiere sacrificio y santidad.',context:{general:'Escrito por Moisés alrededor del 1445 a.C., mientras Israel acampaba al pie del Sinaí, recibiendo las instrucciones para la adoración.',political:'Israel era una nación recién formada en el desierto, aprendiendo a organizarse como pueblo de Dios bajo su pacto.',cultural:'Las naciones vecinas tenían prácticas religiosas paganas, sacrificios humanos e inmoralidad ritual. Levítico distinguía radicalmente a Israel con leyes de pureza y santidad.',spiritual:'El pueblo debía entender la gravedad del pecado y la santidad de Dios. Los sacrificios enseñaban que el pecado merece muerte y que solo mediante sustitución se puede obtener perdón.'},godPurpose:'Dios revela su santidad absoluta y establece el camino para que un pueblo pecador pueda acercarse a Él: mediante el sacrificio y la pureza. Muestra que Dios desea habitar en medio de su pueblo, pero que esto requiere santidad.',godTeaching:'Dios quería enseñar que el pecado es grave y costoso, que requiere el derramamiento de sangre para el perdón, y que su pueblo debe ser santo porque Él es santo. Cada sacrificio y ritual apuntaba a la seriedad del pecado y la necesidad de expiación.',consequences:'Levítico estableció el sistema de adoración que definió la vida de Israel por siglos. Sus sacrificios y el Día de la Expiación prepararon la comprensión del sacrificio definitivo de Cristo. Su llamado a la santidad sigue resonando para el pueblo de Dios hoy.',practicalLessons:['Dios es santo, y acercarse a Él requiere reverencia: no podemos venir a Él de cualquier manera.','El pecado tiene un costo real; entender su gravedad nos hace valorar más el perdón.','Dios llama a su pueblo a ser santo, distinto del mundo, reflejando su carácter.','Dios desea habitar entre nosotros; toda la complejidad de los rituales muestra cuánto anhela esa cercanía.'],christConnection:'Levítico es una sombra detallada de la obra de Cristo. Cada sacrificio —especialmente el cordero sin defecto— apunta a Jesús, "el Cordero de Dios que quita el pecado del mundo". El Día de la Expiación, cuando el sumo sacerdote entraba al Lugar Santísimo con sangre, prefigura a Cristo, nuestro sumo sacerdote, que entró al cielo con su propia sangre "una vez para siempre". El chivo expiatorio que cargaba los pecados del pueblo al desierto representa a Cristo llevando nuestros pecados lejos de nosotros. Hebreos explica que todo este sistema era una sombra de la realidad que es Cristo.',keyVerses:[{ref:'Levítico 17:11',text:'Porque la vida de la carne en la sangre está, y yo os la he dado para hacer expiación sobre el altar por vuestras almas.'},{ref:'Levítico 19:2',text:'Santos seréis, porque santo soy yo Jehová vuestro Dios.'},{ref:'Levítico 19:18',text:'Amarás a tu prójimo como a ti mismo. Yo Jehová.'}],readingCall:'Levítico puede parecer difícil, pero es la clave para entender por qué Jesús tuvo que morir. Te invitamos a leer sus 27 capítulos con esta mirada: cada sacrificio apunta a la cruz. Lee especialmente el capítulo 16 sobre el Día de la Expiación y descubrirás el trasfondo que hace tan poderoso el sacrificio de Cristo por ti.'}, name:'Levítico', abbr:'Lv', t:'AT', chapters:27,
        author:'Moisés', date:'~1445 a.C.', genre:'Ley',
        context:'Escrito en el monte Sinaí, Levítico contiene las leyes que Dios dio a Israel sobre cómo acercarse a un Dios santo. El nombre viene de la tribu de Leví, encargada del servicio sacerdotal.',
        summary:'Levítico es el manual de santidad de Israel. Si Éxodo termina con la construcción del Tabernáculo, Levítico explica cómo el pueblo podía vivir en la presencia del Dios santo: los sacrificios (cap. 1-7), el sacerdocio (cap. 8-10), las leyes de pureza (cap. 11-15), el Día de la Expiación (cap. 16) y el Código de Santidad (cap. 17-27). La palabra "santo" aparece más de 80 veces. Cada sacrificio prefigura la obra perfecta de Cristo.',
        purpose:'Enseñar a Israel cómo un pueblo pecador puede acercarse y vivir en comunión con un Dios santo mediante el sacrificio y la obediencia.',
        themes:['Santidad de Dios', 'Sacrificio y expiación', 'Sacerdocio', 'Pureza ritual', 'Día de la Expiación', 'Separación del pecado'],
        keyVerse:{ ref:'Levítico 19:2', text:'Santos seréis, porque santo soy yo Jehová vuestro Dios.' },
        characters:[{ name:'Moisés', role:'Mediador de la Ley', icon:'⚡' }, { name:'Aarón', role:'Primer sumo sacerdote', icon:'🕊' }, { name:'Nadab y Abiú', role:'Hijos de Aarón juzgados', icon:'🔥' }],
        teaching:'El pecado es serio y separa del Dios santo, pero Dios provee un camino de reconciliación mediante el sacrificio sustitutivo. Cada cordero inmolado señalaba al Cordero de Dios que quita el pecado del mundo.',
        application:'La santidad no es opcional para el pueblo de Dios. Aunque ya no ofrecemos sacrificios porque Cristo es el sacrificio definitivo, somos llamados a vivir vidas separadas para Dios, santas en toda nuestra manera de vivir (1 Pedro 1:16).',
        curiosities:['La frase "Yo soy Jehová" aparece unas 50 veces, recordando la autoridad detrás de cada ley.', 'El Día de la Expiación (Yom Kipur) era el día más sagrado del año judío.', 'Levítico 19:18 "amarás a tu prójimo como a ti mismo" fue citado por Jesús como el segundo gran mandamiento.', 'Casi todo el libro fue dictado por Dios directamente a Moisés.'],
        timeline:[{ period:'~1445 a.C.', desc:'Israel acampa en el Sinaí tras el Éxodo' }, { period:'Mes 1', desc:'Se erige el Tabernáculo (fin de Éxodo)' }, { period:'Levítico', desc:'Dios da las leyes de sacrificio y santidad en un mes' }, { period:'Siguiente', desc:'Números comienza el censo para la marcha' }],
      },
      { id:'nm', deep:{whatHappens:'Números narra los 40 años de Israel en el desierto, entre el Sinaí y la entrada a la Tierra Prometida. Comienza con un censo (de ahí el nombre) y la organización del pueblo para la marcha. Pero al llegar a la frontera de Canaán, el pueblo se niega a entrar por temor, descreyendo de las promesas de Dios. Como consecuencia, toda esa generación vaga por el desierto hasta morir, y solo sus hijos entrarán. El libro alterna entre la fidelidad de Dios y la repetida rebeldía, murmuración e incredulidad del pueblo.',context:{general:'Escrito por Moisés, cubre unos 40 años (aproximadamente 1445-1405 a.C.), desde el Sinaí hasta las llanuras de Moab, frente a la Tierra Prometida.',political:'Israel era una nación nómada de quizás dos millones de personas, organizándose como ejército y comunidad mientras atravesaba territorios de pueblos hostiles.',cultural:'El desierto era un ambiente hostil. El pueblo añoraba la comida de Egipto y se quejaba constantemente, mostrando cuán difícil era confiar plenamente en Dios.',spiritual:'A pesar de haber visto los milagros del Éxodo, el pueblo dudaba y se rebelaba una y otra vez. Números es la historia trágica de una generación que perdió la bendición por su incredulidad.'},godPurpose:'Dios revela su fidelidad inquebrantable a pesar de la infidelidad humana, y la seriedad de la incredulidad. Muestra que confiar y obedecer a Dios trae bendición, mientras que dudar de sus promesas trae consecuencias dolorosas.',godTeaching:'Dios quería enseñar que la incredulidad y la murmuración tienen consecuencias graves; que Él es fiel y paciente aun con un pueblo rebelde; y que su provisión nunca falta, aunque el pueblo no la valore. La fe consiste en confiar en sus promesas y obedecer.',consequences:'La generación que salió de Egipto murió en el desierto sin entrar a la Tierra Prometida, excepto Josué y Caleb, los dos espías que confiaron en Dios. Esto se convirtió en una advertencia permanente: Hebreos cita Números para advertir a los creyentes contra la incredulidad que les impide entrar en el reposo de Dios.',practicalLessons:['La incredulidad puede impedirte recibir las promesas de Dios; confía en Él aunque el camino sea difícil.','La murmuración y la queja constante deshonran a Dios y revelan falta de fe en su provisión.','Dios es fiel aun cuando nosotros fallamos; su paciencia es grande, pero sus advertencias son reales.','Como Josué y Caleb, atrévete a creer las promesas de Dios aunque seas minoría frente a la incredulidad de muchos.'],christConnection:'En Números, cuando el pueblo fue mordido por serpientes venenosas por su pecado, Dios mandó a Moisés levantar una serpiente de bronce: todo el que la miraba con fe era sanado. Jesús mismo explicó que esto lo prefiguraba a Él: "como Moisés levantó la serpiente en el desierto, así es necesario que el Hijo del Hombre sea levantado, para que todo aquel que en él cree, no se pierda" (Juan 3:14-15). Cristo es también la roca de la que brotó agua, que "seguía" al pueblo (1 Corintios 10:4), y la estrella de Jacob profetizada por Balaam. Su fidelidad en el desierto anticipa la fidelidad de Cristo con nosotros.',keyVerses:[{ref:'Números 6:24-26',text:'Jehová te bendiga, y te guarde; Jehová haga resplandecer su rostro sobre ti, y tenga de ti misericordia; Jehová alce sobre ti su rostro, y ponga en ti paz.'},{ref:'Números 23:19',text:'Dios no es hombre, para que mienta, ni hijo de hombre para que se arrepienta. El dijo, ¿y no hará? Habló, ¿y no lo ejecutará?'}],readingCall:'Números es una poderosa lección sobre la fe y la incredulidad. Te invitamos a leer sus 36 capítulos y aprender de los errores de una generación que vio milagros pero no confió. Lee los capítulos 13 y 14 sobre los doce espías: te desafiarán a ser como Josué y Caleb, que creyeron a Dios cuando todos los demás dudaban.'}, name:'Números', abbr:'Nm', t:'AT', chapters:36,
        author:'Moisés', date:'~1445-1406 a.C.', genre:'Ley / Historia',
        context:'Números relata los casi 40 años de Israel en el desierto, desde el Sinaí hasta las llanuras de Moab. El nombre viene de los dos censos del pueblo.',
        summary:'Números narra el viaje de Israel por el desierto y cómo una generación entera perdió la Tierra Prometida por su incredulidad. Tras ser contados (cap. 1-4), el pueblo marcha del Sinaí, pero la rebelión en Cades-barnea (cap. 13-14) —cuando 10 espías sembraron temor— condenó a esa generación a vagar 40 años. El libro muestra la fidelidad de Dios a pesar de la murmuración constante del pueblo, y termina con una nueva generación lista para entrar a Canaán.',
        purpose:'Mostrar las consecuencias de la incredulidad y la desobediencia, y a la vez la fidelidad de Dios que guía y sostiene a su pueblo a pesar de sus fallas.',
        themes:['Fidelidad de Dios', 'Consecuencias del pecado', 'Murmuración e incredulidad', 'Guianza divina', 'Nueva generación', 'Bendición sacerdotal'],
        keyVerse:{ ref:'Números 6:24-26', text:'Jehová te bendiga, y te guarde; Jehová haga resplandecer su rostro sobre ti, y tenga de ti misericordia.' },
        characters:[{ name:'Moisés', role:'Líder paciente', icon:'⚡' }, { name:'Aarón', role:'Sumo sacerdote', icon:'🕊' }, { name:'Josué y Caleb', role:'Espías fieles', icon:'⭐' }, { name:'Balaam', role:'Profeta y su asna', icon:'🐴' }, { name:'Coré', role:'Líder de rebelión', icon:'⚠' }],
        teaching:'La incredulidad tiene consecuencias generacionales: toda una generación murió en el desierto por no confiar en Dios. Pero Dios nunca abandonó a su pueblo: la nube y el fuego, el maná y el agua mostraron su provisión constante.',
        application:'La duda y la queja pueden privarnos de las bendiciones que Dios tiene preparadas. Como Josué y Caleb, somos llamados a confiar plenamente en las promesas de Dios aunque los obstáculos parezcan gigantes.',
        curiosities:['El viaje del Sinaí a Canaán tomaba 11 días, pero a Israel le tomó 40 años por su incredulidad.', 'La bendición sacerdotal de Números 6 es una de las oraciones más antiguas que se siguen usando hoy.', 'Dios usó un asna que habló para corregir al profeta Balaam.', 'La serpiente de bronce (cap. 21) fue usada por Jesús como figura de su crucifixión (Juan 3:14).'],
        timeline:[{ period:'~1445 a.C.', desc:'Primer censo en el Sinaí' }, { period:'Cades-barnea', desc:'Los 12 espías; rebelión del pueblo' }, { period:'40 años', desc:'Israel vaga por el desierto' }, { period:'~1406 a.C.', desc:'Segundo censo; nueva generación en Moab' }],
      },
      { id:'dt', deep:{whatHappens:'Deuteronomio recoge los discursos finales de Moisés a la nueva generación de Israel, justo antes de entrar a la Tierra Prometida. Moisés, que no entraría por su propia desobediencia, repasa la historia de la fidelidad de Dios, reitera la Ley (Deuteronomio significa "segunda ley"), y exhorta apasionadamente al pueblo a amar y obedecer a Dios de todo corazón. Pone delante de ellos "la vida y la muerte, la bendición y la maldición", llamándolos a escoger la vida amando a Dios. Es el gran sermón de despedida del más grande líder de Israel.',context:{general:'Escrito por Moisés alrededor del 1405 a.C. en las llanuras de Moab, en sus últimos días, dirigido a la generación que entraría a Canaán.',political:'Israel estaba a punto de pasar de ser un pueblo nómada a conquistar y establecerse como nación en la Tierra Prometida.',cultural:'Entrarían a una tierra llena de idolatría cananea. Moisés los advierte repetidamente contra adoptar los dioses y prácticas de esas naciones.',spiritual:'La nueva generación necesitaba apropiarse personalmente del pacto con Dios. Moisés enfatiza el amor a Dios como motivación de la obediencia, no solo el deber.'},godPurpose:'Dios revela que desea ser amado de todo corazón, no solo obedecido por temor. Renueva su pacto con la nueva generación y pone ante ellos la decisión fundamental: amarlo y vivir, o abandonarlo y perecer.',godTeaching:'Dios quería enseñar que el corazón de la Ley es el amor: "amarás a Jehová tu Dios con todo tu corazón". Enseña que la obediencia trae bendición, que debemos recordar lo que Dios ha hecho, y transmitir la fe a las siguientes generaciones.',consequences:'Deuteronomio se convirtió en uno de los libros más influyentes de la Biblia. Jesús lo citó tres veces para resistir las tentaciones del diablo, y declaró que el "Shemá" (6:4-5) era el mandamiento más importante. Moldeó la identidad y la fe de Israel por todas las generaciones.',practicalLessons:['Dios desea tu amor, no solo tu obediencia: "amarás a Jehová tu Dios con todo tu corazón".','Recuerda lo que Dios ha hecho por ti; el olvido lleva a la ingratitud y la desobediencia.','Transmite la fe a tus hijos: háblales de Dios en casa, en el camino, al acostarte y al levantarte.','Cada día eliges entre la vida (obedecer a Dios) y la muerte (alejarte de Él); escoge la vida.'],christConnection:'Moisés prometió: "Profeta de en medio de ti levantará Jehová tu Dios... a él oiréis" (18:15), una profecía que el Nuevo Testamento aplica directamente a Cristo, el profeta mayor que Moisés. Jesús resumió Deuteronomio al declarar el mayor mandamiento: amar a Dios con todo el corazón (6:5). Cuando fue tentado en el desierto, Jesús respondió tres veces citando Deuteronomio, venciendo donde Israel había fallado. Cristo cumplió perfectamente la Ley que Israel no pudo cumplir, y tomó sobre sí la maldición que merecíamos para darnos la bendición del pacto.',keyVerses:[{ref:'Deuteronomio 6:4-5',text:'Oye, Israel: Jehová nuestro Dios, Jehová uno es. Y amarás a Jehová tu Dios de todo tu corazón, y de toda tu alma, y con todas tus fuerzas.'},{ref:'Deuteronomio 31:6',text:'Esforzaos y cobrad ánimo; no temáis... porque Jehová tu Dios es el que va contigo; no te dejará, ni te desamparará.'}],readingCall:'Deuteronomio es el corazón apasionado de Moisés llamándote a amar a Dios. Te invitamos a leer sus 34 capítulos. El capítulo 6 contiene el mandamiento más importante según Jesús: amar a Dios con todo tu ser. Léelo y descubre que la verdadera obediencia nace del amor, no del temor.'}, name:'Deuteronomio', abbr:'Dt', t:'AT', chapters:34,
        author:'Moisés', date:'~1406 a.C.', genre:'Ley',
        context:'Deuteronomio ("segunda ley") recoge los discursos finales de Moisés a la nueva generación, en las llanuras de Moab, justo antes de entrar a la Tierra Prometida.',
        summary:'Deuteronomio es el testamento espiritual de Moisés. En una serie de sermones, repasa la historia de Israel, vuelve a exponer la Ley y llama al pueblo a amar a Dios de todo corazón. El gran tema es el pacto: la fidelidad de Dios exige una respuesta de amor y obediencia. Contiene el Shemá (6:4-5), la confesión de fe central del judaísmo. El libro termina con la muerte de Moisés en el monte Nebo, viendo la tierra que no podría pisar.',
        purpose:'Renovar el pacto con la nueva generación y llamarla a amar y obedecer a Dios al entrar a la Tierra Prometida.',
        themes:['Amor a Dios', 'El pacto', 'Obediencia y bendición', 'Recordar la fidelidad de Dios', 'El Shemá', 'Elección de Israel'],
        keyVerse:{ ref:'Deuteronomio 6:5', text:'Y amarás a Jehová tu Dios de todo tu corazón, y de toda tu alma, y con todas tus fuerzas.' },
        characters:[{ name:'Moisés', role:'Profeta que se despide', icon:'⚡' }, { name:'Josué', role:'Sucesor designado', icon:'⭐' }],
        teaching:'La obediencia a Dios no nace del temor sino del amor y la gratitud por lo que Dios ya ha hecho. Jesús citó Deuteronomio tres veces al resistir las tentaciones del diablo, mostrando el poder de la Palabra escondida en el corazón.',
        application:'Recordar lo que Dios ha hecho fortalece nuestra fe para el futuro. El Shemá nos recuerda que amar a Dios involucra todo nuestro ser: corazón, alma y fuerzas. La Palabra debe enseñarse diligentemente a la siguiente generación.',
        curiosities:['Jesús citó Deuteronomio más que casi cualquier otro libro al ser tentado en el desierto.', 'El Shemá (6:4) sigue siendo la oración más importante del judaísmo.', 'Moisés murió a los 120 años con la vista y el vigor intactos (34:7).', 'Es el libro del AT más citado en el Nuevo Testamento junto con Salmos e Isaías.'],
        timeline:[{ period:'~1406 a.C.', desc:'Israel acampa en las llanuras de Moab' }, { period:'Discursos', desc:'Moisés pronuncia sus sermones finales' }, { period:'Renovación', desc:'Se renueva el pacto; Josué es comisionado' }, { period:'Monte Nebo', desc:'Moisés ve la tierra y muere' }],
      },
      { id:'jos', deep:{whatHappens:'Josué narra la conquista y reparto de la Tierra Prometida. Tras la muerte de Moisés, Dios levanta a Josué para liderar a Israel en la entrada a Canaán. El libro relata el cruce milagroso del río Jordán, la caída de Jericó (cuyos muros se derrumbaron al rodear la ciudad y tocar las trompetas), las campañas militares para tomar la tierra, y la distribución del territorio entre las doce tribus. Culmina con el famoso desafío de Josué: "escogeos hoy a quién sirváis... pero yo y mi casa serviremos a Jehová".',context:{general:'Cubre aproximadamente el período del 1405-1380 a.C., la entrada y conquista de Canaán bajo el liderazgo de Josué, sucesor de Moisés.',political:'Canaán estaba dividida en numerosas ciudades-estado fortificadas. Israel, sin ser una potencia militar, conquistó la tierra confiando en que Dios peleaba por ellos.',cultural:'Los cananeos practicaban una idolatría profundamente corrupta, incluyendo sacrificios de niños. El juicio de Dios sobre ellos llegó tras siglos de paciencia.',spiritual:'La conquista demostraba que Dios cumple sus promesas. El éxito dependía de la obediencia y la fe, no de la fuerza militar, como mostró el contraste entre Jericó (obediencia, victoria) y Hai (pecado, derrota).'},godPurpose:'Dios revela su fidelidad para cumplir las promesas hechas a Abraham siglos antes: dar a su descendencia la tierra de Canaán. Muestra que Él pelea por su pueblo cuando este confía y obedece.',godTeaching:'Dios quería enseñar que Él es fiel a sus promesas, que la victoria viene por la fe y la obediencia más que por la fuerza, y que el pecado (como el de Acán) trae derrota. La clave del éxito era meditar y obedecer su Palabra día y noche.',consequences:'Israel se estableció finalmente en la Tierra Prometida, cumpliendo la promesa hecha a los patriarcas. El libro dejó el modelo de que la obediencia trae bendición y el pecado trae derrota, un patrón que se repetiría en toda la historia de Israel.',practicalLessons:['Sé valiente y esfuérzate confiando en Dios; Él va contigo y no te abandonará.','El éxito viene de meditar y obedecer la Palabra de Dios día y noche.','El pecado oculto trae derrota; la santidad y la obediencia traen victoria.','Como Josué, decide servir al Señor con tu casa, sin importar lo que hagan los demás.'],christConnection:'El nombre "Josué" (Yehoshua) es la forma hebrea de "Jesús" y significa "Jehová salva". Así como Josué llevó al pueblo al descanso de la Tierra Prometida, Jesús lleva a su pueblo al verdadero descanso eterno (Hebreos 4). Rahab, la prostituta de Jericó que escondió a los espías y fue salvada por el cordón rojo en su ventana, aparece en la genealogía de Jesús (Mateo 1:5), mostrando la gracia que alcanza a los gentiles y pecadores. La conquista de la tierra prefigura la victoria final que Cristo gana para su pueblo.',keyVerses:[{ref:'Josué 1:9',text:'Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes, porque Jehová tu Dios estará contigo en dondequiera que vayas.'},{ref:'Josué 24:15',text:'Escogeos hoy a quién sirváis... pero yo y mi casa serviremos a Jehová.'}],readingCall:'Josué es un libro de fe, valentía y promesas cumplidas. Te invitamos a leer sus 24 capítulos y ver cómo Dios entrega lo que prometió a quienes confían en Él. El capítulo 1 te llenará de valor con la promesa de que Dios va contigo, y el capítulo 24 te desafiará a decidir, como Josué, servir al Señor con toda tu casa.'}, name:'Josué', abbr:'Jos', t:'AT', chapters:24,
        author:'Josué (y editores posteriores)', date:'~1405-1380 a.C.', genre:'Historia',
        context:'Josué relata la conquista y reparto de la Tierra Prometida bajo el liderazgo de Josué, sucesor de Moisés.',
        summary:'Josué muestra a Dios cumpliendo sus promesas. Tras cruzar milagrosamente el Jordán, Israel conquista Canaán: la caída de Jericó, la campaña del sur y del norte, y finalmente el reparto de la tierra entre las tribus. El libro destaca que las victorias vinieron por la fidelidad de Dios y la obediencia del pueblo, no por su fuerza. Termina con el famoso desafío de Josué: "yo y mi casa serviremos a Jehová" (24:15).',
        purpose:'Demostrar la fidelidad de Dios al cumplir su promesa de dar la tierra, y llamar al pueblo a la obediencia y a servir solo a Jehová.',
        themes:['Fidelidad de las promesas', 'Conquista y herencia', 'Obediencia y valentía', 'Presencia de Dios', 'Servir a Dios', 'Descanso prometido'],
        keyVerse:{ ref:'Josué 1:9', text:'Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes, porque Jehová tu Dios estará contigo en dondequiera que vayas.' },
        characters:[{ name:'Josué', role:'Líder conquistador', icon:'⚔' }, { name:'Rahab', role:'Mujer de fe en Jericó', icon:'🌹' }, { name:'Caleb', role:'Guerrero fiel a los 85 años', icon:'⭐' }],
        teaching:'El éxito espiritual viene de meditar en la Palabra día y noche y de la obediencia valiente. Dios pelea por su pueblo cuando este confía en él. La fe de Rahab muestra que la gracia alcanza incluso a los de afuera.',
        application:'Como Josué, podemos enfrentar nuestros "gigantes" con valentía porque Dios va con nosotros. La decisión de servir a Dios debe ser deliberada y personal: cada familia debe elegir a quién servirá.',
        curiosities:['Rahab, una prostituta de Jericó, aparece en la genealogía de Jesús (Mateo 1:5).', 'El sol se detuvo durante la batalla de Gabaón (Josué 10).', 'Las murallas de Jericó cayeron tras 7 días de marcha y un grito, sin armas de asedio.', 'Josué significa "Jehová es salvación", el mismo nombre hebreo que Jesús.'],
        timeline:[{ period:'~1405 a.C.', desc:'Muerte de Moisés; Josué asume el liderazgo' }, { period:'Cruce del Jordán', desc:'Israel entra a Canaán milagrosamente' }, { period:'Conquista', desc:'Jericó, Hai y campañas del sur y norte' }, { period:'Reparto', desc:'La tierra se divide entre las 12 tribus' }],
      },
      { id:'jue', deep:{whatHappens:'Jueces describe un período oscuro y caótico tras la muerte de Josué, cuando Israel cayó en un ciclo repetido de pecado, opresión, clamor y liberación. Una y otra vez, el pueblo abandonaba a Dios y caía en la idolatría; Dios permitía que naciones enemigas los oprimieran; ellos clamaban arrepentidos; y Dios levantaba un "juez" (libertador) para rescatarlos. Entre estos jueces están Débora, Gedeón y el famoso Sansón. La frase que resume el libro: "cada uno hacía lo que bien le parecía", porque no había rey y se habían olvidado de Dios.',context:{general:'Cubre unos 300 años (aproximadamente 1380-1050 a.C.), desde la muerte de Josué hasta el surgimiento de la monarquía.',political:'Israel era una confederación de tribus sin gobierno central. Los pueblos vecinos (filisteos, madianitas, cananeos) los oprimían cuando se alejaban de Dios.',cultural:'El pueblo se mezcló con los cananeos y adoptó su idolatría, en lugar de mantenerse fiel a Dios como había ordenado. La decadencia moral y espiritual fue profunda.',spiritual:'Jueces muestra las trágicas consecuencias de abandonar a Dios. El ciclo de apostasía, juicio, arrepentimiento y liberación se repite, revelando tanto la rebeldía humana como la misericordia divina.'},godPurpose:'Dios revela su paciencia y misericordia al rescatar repetidamente a un pueblo que insiste en alejarse de Él. Muestra las consecuencias de la infidelidad y la necesidad de un líder y rey verdadero que guíe al pueblo.',godTeaching:'Dios quería enseñar que alejarse de Él trae caos y opresión, mientras que volver a Él trae liberación. Enseña que su misericordia es asombrosa, levantando libertadores aun cuando el pueblo no lo merecía, y que la humanidad necesita un Salvador.',consequences:'El período de los jueces demostró que Israel necesitaba un rey y, en última instancia, un Salvador. El caos del libro ("no había rey") prepara el camino para la monarquía y, proféticamente, para el Rey eterno. Sus historias siguen enseñando sobre las consecuencias del pecado y la gracia de Dios.',practicalLessons:['Alejarse de Dios siempre trae consecuencias; el pecado esclaviza y oprime.','La misericordia de Dios es asombrosa: cuando clamamos arrepentidos, Él responde.','Dios usa personas imperfectas (como Gedeón el temeroso o Sansón el impulsivo) para sus propósitos.','Sin la dirección de Dios, "cada uno hace lo que le parece"; necesitamos su señorío en nuestras vidas.'],christConnection:'Los jueces eran libertadores temporales e imperfectos que salvaban a Israel de sus enemigos, pero el pueblo siempre volvía a caer. Esto crea un anhelo por un Libertador perfecto y permanente: Jesucristo, el Juez y Salvador definitivo que no solo rescata de enemigos externos, sino del pecado mismo, y cuya salvación es eterna. La frase repetida "no había rey en Israel" apunta a la necesidad del Rey verdadero. Cada juez imperfecto resalta, por contraste, la perfección del Salvador que vendría.',keyVerses:[{ref:'Jueces 21:25',text:'En aquellos días no había rey en Israel; cada uno hacía lo que bien le parecía.'},{ref:'Jueces 2:18',text:'Y cuando Jehová les levantaba jueces, Jehová estaba con el juez, y los libraba de mano de los enemigos.'}],readingCall:'Jueces es un libro crudo y realista sobre lo que pasa cuando un pueblo olvida a Dios. Te invitamos a leer sus 21 capítulos y aprender de sus ciclos de pecado y gracia. Las historias de Débora, Gedeón y Sansón te enseñarán que Dios usa a personas imperfectas y que su misericordia siempre está disponible para quien vuelve a Él.'}, name:'Jueces', abbr:'Jue', t:'AT', chapters:21,
        author:'Desconocido (tradición: Samuel)', date:'~1043 a.C.', genre:'Historia',
        context:'Jueces cubre el período caótico entre la muerte de Josué y el establecimiento de la monarquía, cuando Israel no tenía rey y cada quien hacía lo que le parecía.',
        summary:'Jueces narra un ciclo repetido y trágico: el pueblo peca, Dios permite la opresión de enemigos, el pueblo clama, Dios levanta un libertador (juez), hay paz, y luego el ciclo se repite peor. Aparecen figuras como Débora, Gedeón y Sansón. El libro revela la profundidad de la decadencia espiritual cuando "no había rey en Israel" y muestra la paciencia de Dios al levantar libertadores una y otra vez.',
        purpose:'Mostrar las consecuencias del abandono de Dios y la necesidad de un liderazgo justo, preparando el camino para la monarquía y, en última instancia, para el Rey Mesías.',
        themes:['Ciclo de pecado', 'Misericordia de Dios', 'Libertadores', 'Apostasía espiritual', 'Consecuencias del olvido', 'Necesidad de un rey'],
        keyVerse:{ ref:'Jueces 21:25', text:'En aquellos días no había rey en Israel; cada uno hacía lo que bien le parecía.' },
        characters:[{ name:'Débora', role:'Jueza y profetisa', icon:'⭐' }, { name:'Gedeón', role:'Libertador con 300 hombres', icon:'⚔' }, { name:'Sansón', role:'Juez de gran fuerza', icon:'💪' }, { name:'Sísara', role:'Capitán enemigo', icon:'⚠' }],
        teaching:'Cuando cada quien hace "lo que bien le parece" sin Dios como rey, el resultado es caos moral. Aun así, Dios responde al clamor de su pueblo con misericordia, levantando libertadores imperfectos para señalar al Libertador perfecto.',
        application:'El relativismo moral ("cada uno hace lo que le parece") lleva a la ruina personal y social. Necesitamos a Dios como Rey de nuestras vidas. La paciencia de Dios con su pueblo rebelde es un recordatorio de su gracia.',
        curiosities:['Débora fue la única mujer juez de Israel y lideró al ejército a la victoria.', 'Gedeón venció a un ejército enorme con solo 300 hombres, antorchas y trompetas.', 'Sansón aparece en el "salón de la fe" de Hebreos 11 a pesar de sus fallas.', 'El ciclo de pecado-opresión-clamor-liberación se repite al menos 7 veces.'],
        timeline:[{ period:'~1380 a.C.', desc:'Muerte de Josué; comienza el período de los jueces' }, { period:'Ciclos', desc:'Otoniel, Aod, Débora, Gedeón, Jefté y otros' }, { period:'Sansón', desc:'Último gran juez contra los filisteos' }, { period:'~1043 a.C.', desc:'Transición hacia la monarquía con Samuel' }],
      },
      { id:'rt', deep:{whatHappens:'Rut es una hermosa historia de lealtad, amor y redención que brilla como una joya en medio de la época oscura de los jueces. Cuenta cómo Rut, una viuda moabita (extranjera), decide quedarse con su suegra Noemí y abrazar al Dios de Israel, diciendo: "tu pueblo será mi pueblo, y tu Dios mi Dios". En Belén, Rut conoce a Booz, un pariente bondadoso que actúa como "redentor", la toma por esposa y restaura la familia. De esta unión nacería el rey David, y de su linaje, el Mesías.',context:{general:'Los eventos ocurren durante el período de los jueces (aproximadamente 1100 a.C.), aunque el libro fue escrito posteriormente.',political:'Era una época de inestabilidad y hambre en Israel. La familia de Noemí había emigrado a Moab buscando alimento.',cultural:'Existía la ley del "pariente redentor" (goel): un familiar cercano podía rescatar la tierra y el nombre de un pariente fallecido casándose con su viuda. Las moabitas eran despreciadas, lo que hace más notable la gracia hacia Rut.',spiritual:'En medio de la apostasía de los jueces, Rut muestra que Dios obra a través de personas fieles y comunes, e incluye a los extranjeros en su plan de redención por la fe.'},godPurpose:'Dios revela su providencia obrando silenciosamente en la vida cotidiana, y su gracia que acoge a los extranjeros que vienen a Él por fe. Muestra que Él teje su plan redentor a través de actos de lealtad y amor.',godTeaching:'Dios quería enseñar que la fidelidad y la bondad importan, que Él cuida de los desamparados (viudas y extranjeros), y que su gracia no tiene fronteras étnicas. Enseña que Dios obra providencialmente aun en los detalles aparentemente casuales de la vida.',consequences:'De Rut, la extranjera, nació la línea real de David y, finalmente, Jesucristo. Su historia demostró que los gentiles tienen lugar en el plan de Dios, anticipando que el evangelio sería para todas las naciones. Rut es una de las cuatro mujeres mencionadas en la genealogía de Jesús.',practicalLessons:['La lealtad y la bondad genuinas son preciosas a los ojos de Dios y nunca pasan desapercibidas.','Dios cuida de los desamparados y acoge a quienes vienen a Él por fe, sin importar su origen.','La providencia de Dios obra en los detalles cotidianos; nada en tu vida es realmente casual.','Dios puede transformar la pérdida y el dolor (como el de Noemí) en restauración y bendición.'],christConnection:'Booz es una hermosa figura del "pariente redentor", que prefigura a Cristo, nuestro Redentor. Así como Booz tenía el derecho, los recursos y la voluntad de redimir a Rut y restaurarla, Cristo nos redime: se hizo nuestro pariente (tomó carne humana), pagó el precio (su vida) y nos hizo suyos. Rut, la gentil acogida por gracia, anticipa que el evangelio incluiría a todas las naciones. Y de esta unión nació el linaje de David, del cual vendría Jesús, el Rey y Redentor eterno.',keyVerses:[{ref:'Rut 1:16',text:'No me ruegues que te deje, y me aparte de ti; porque a dondequiera que tú fueres, iré yo... tu pueblo será mi pueblo, y tu Dios mi Dios.'}],readingCall:'Rut es una de las historias más hermosas de la Biblia: lealtad, amor y redención en solo cuatro capítulos. Te invitamos a leerla completa de una sentada. Te conmoverá la fidelidad de Rut y la bondad de Booz, y descubrirás cómo Dios teje su plan de salvación a través de personas comunes y fieles. Una lectura que llena el corazón de esperanza.'}, name:'Rut', abbr:'Rt', t:'AT', chapters:4,
        author:'Desconocido (tradición: Samuel)', date:'~1030 a.C.', genre:'Historia / Narrativa',
        context:'Ambientado "en los días que gobernaban los jueces", Rut es un oasis de fidelidad en medio del caos. Cuenta la historia de una mujer moabita que se une al pueblo de Dios.',
        summary:'Rut es una hermosa historia de lealtad, providencia y redención. Tras enviudar, Rut la moabita se niega a abandonar a su suegra Noemí y declara: "tu pueblo será mi pueblo, y tu Dios mi Dios". En Belén, Rut conoce a Booz, un pariente redentor que se casa con ella. De esta unión nacería Obed, abuelo del rey David, colocando a Rut en la línea genealógica del Mesías. El libro muestra cómo Dios obra en los detalles cotidianos.',
        purpose:'Mostrar la providencia y la fidelidad de Dios obrando a través de personas comunes, y revelar cómo la gracia alcanza incluso a los extranjeros.',
        themes:['Lealtad y fidelidad', 'Providencia de Dios', 'Redención (pariente redentor)', 'Gracia a los extranjeros', 'Bondad y carácter', 'Línea mesiánica'],
        keyVerse:{ ref:'Rut 1:16', text:'No me ruegues que te deje, y me aparte de ti; porque a dondequiera que tú fueres, iré yo; tu pueblo será mi pueblo, y tu Dios mi Dios.' },
        characters:[{ name:'Rut', role:'Moabita leal y fiel', icon:'🌾' }, { name:'Noemí', role:'Suegra restaurada', icon:'👵' }, { name:'Booz', role:'Pariente redentor', icon:'⭐' }, { name:'Obed', role:'Hijo, abuelo de David', icon:'👶' }],
        teaching:'Booz como "pariente redentor" (goel) es una figura hermosa de Cristo, quien nos redime al pagar el precio que no podíamos pagar. La fidelidad de Rut muestra que el carácter y la lealtad importan a Dios.',
        application:'Dios obra su plan a través de actos cotidianos de fidelidad y bondad. Aunque vengamos de afuera o nuestro pasado sea difícil, la gracia de Dios nos incluye en su familia. La lealtad en las relaciones tiene un valor eterno.',
        curiosities:['Rut, una extranjera moabita, es bisabuela del rey David y antepasada de Jesús.', 'El libro lleva el nombre de una mujer no israelita, algo notable en su tiempo.', 'El concepto de "pariente redentor" prefigura la obra redentora de Cristo.', 'Es una de solo dos libros de la Biblia nombrados por una mujer (el otro es Ester).'],
        timeline:[{ period:'Era de los jueces', desc:'Hambruna lleva a la familia a Moab' }, { period:'Viudez', desc:'Mueren los hombres; Rut sigue a Noemí' }, { period:'Belén', desc:'Rut espiga en los campos de Booz' }, { period:'Redención', desc:'Booz se casa con Rut; nace Obed, abuelo de David' }],
      },
      { id:'1sm', deep:{whatHappens:'1 Samuel narra la transición de Israel del período de los jueces a la monarquía. Comienza con el nacimiento de Samuel, el último juez y gran profeta, quien unge a los primeros reyes. El pueblo exige un rey "como las demás naciones", y Dios les concede a Saúl, quien comienza bien pero termina rechazado por su desobediencia. Luego Dios escoge a David, un joven pastor, ungido en secreto, que derrota al gigante Goliat y se convierte en el ungido futuro rey, aunque debe huir durante años de la persecución del celoso Saúl.',context:{general:'Cubre aproximadamente 100 años (1100-1010 a.C.), la transición del último juez a los primeros reyes de Israel.',political:'Israel pasó de una confederación de tribus a una monarquía unificada. La amenaza filistea presionaba al pueblo a querer un rey militar.',cultural:'Las naciones vecinas tenían reyes, y Israel quería imitarlas, rechazando que Dios fuera su único Rey. Esto reveló su falta de fe.',spiritual:'El pedido de un rey "como las naciones" era en el fondo un rechazo al reinado de Dios. Sin embargo, Dios usó la monarquía dentro de su plan, escogiendo a David como hombre "conforme a su corazón".'},godPurpose:'Dios revela que el verdadero liderazgo viene de Él y se basa en un corazón fiel, no en la apariencia. Muestra que Él mira el corazón, no lo externo, y establece la línea de David, de la cual vendría el Mesías.',godTeaching:'Dios quería enseñar que la obediencia vale más que el sacrificio (lección de Saúl), que Él mira el corazón y no la apariencia (elección de David), y que el verdadero rey debe someterse a Dios. La fe, no la fuerza, gana las batallas (David y Goliat).',consequences:'El establecimiento de la monarquía y la elección de David marcaron la historia de Israel para siempre. La promesa a David de un reino eterno se convirtió en la base de la esperanza mesiánica. El contraste entre Saúl (que se apartó de Dios) y David (hombre conforme al corazón de Dios) definió el modelo del rey ideal.',practicalLessons:['Dios mira el corazón, no la apariencia; lo que Él valora es muy diferente de lo que valora el mundo.','Obedecer a Dios vale más que cualquier sacrificio o ritual religioso.','Con fe en Dios, los "gigantes" que parecen invencibles pueden ser vencidos, como David a Goliat.','El celo y la envidia, como los de Saúl, destruyen; la confianza en Dios y la paciencia, como las de David, edifican.'],christConnection:'David, el rey ungido que fue rechazado y perseguido antes de reinar, prefigura a Cristo, el Ungido (Mesías) que fue rechazado antes de su exaltación. La victoria de David sobre Goliat, librando a un pueblo aterrorizado e incapaz, anticipa cómo Cristo venció a nuestro enemigo más grande en nuestro lugar. Samuel, profeta y sacerdote que intercedía por el pueblo, también señala el ministerio de Cristo. Y la promesa de un rey de la línea de David apunta directamente a Jesús, "el hijo de David", el Rey eterno.',keyVerses:[{ref:'1 Samuel 16:7',text:'No mires a su parecer, ni a lo grande de su estatura... porque Jehová no mira lo que mira el hombre; pues el hombre mira lo que está delante de sus ojos, pero Jehová mira el corazón.'},{ref:'1 Samuel 15:22',text:'¿Se complace Jehová tanto en los holocaustos y víctimas, como en que se obedezca a las palabras de Jehová? Ciertamente el obedecer es mejor que los sacrificios.'}],readingCall:'1 Samuel está lleno de drama, fe y lecciones de liderazgo. Te invitamos a leer sus 31 capítulos. La historia de David y Goliat (capítulo 17) te recordará que ningún gigante es demasiado grande para Dios, y el contraste entre Saúl y David te enseñará que lo que Dios busca es un corazón fiel, no apariencias.'}, name:'1 Samuel', abbr:'1 S', t:'AT', chapters:31,
        author:'Samuel, Natán y Gad', date:'~930 a.C.', genre:'Historia',
        context:'1 Samuel narra la transición de Israel del período de los jueces a la monarquía, con tres figuras centrales: Samuel, Saúl y David.',
        summary:'1 Samuel cuenta cómo Israel pasó de ser gobernado por jueces a tener reyes. Samuel, el último juez y primer gran profeta, unge a Saúl como primer rey. Pero Saúl fracasa por su desobediencia, y Dios escoge a David, un pastor, como rey según su corazón. El libro contrasta el liderazgo basado en la apariencia (Saúl) con el liderazgo basado en el corazón (David), e incluye el célebre relato de David y Goliat.',
        purpose:'Mostrar que Dios busca corazones fieles, no apariencias, y establecer la dinastía davídica de la cual vendría el Mesías.',
        themes:['Liderazgo según el corazón', 'Obediencia vs sacrificio', 'Soberanía de Dios', 'Fe frente a gigantes', 'Unción y llamado', 'Rechazo del orgullo'],
        keyVerse:{ ref:'1 Samuel 16:7', text:'No mires a su parecer, ni a lo grande de su estatura... porque Jehová no mira lo que mira el hombre; pues el hombre mira lo que está delante de sus ojos, pero Jehová mira el corazón.' },
        characters:[{ name:'Samuel', role:'Profeta y juez', icon:'📜' }, { name:'Saúl', role:'Primer rey, desobediente', icon:'👑' }, { name:'David', role:'Pastor ungido rey', icon:'🎵' }, { name:'Goliat', role:'Gigante filisteo', icon:'⚔' }, { name:'Jonatán', role:'Amigo leal de David', icon:'🏹' }],
        teaching:'Dios mira el corazón, no la apariencia externa. La obediencia vale más que el sacrificio (15:22). El liderazgo verdadero nace de la dependencia de Dios, no de la fuerza o el carisma propio.',
        application:'No juzguemos por las apariencias; Dios valora el corazón. La obediencia parcial es desobediencia. Como David ante Goliat, podemos enfrentar lo imposible cuando confiamos en el nombre del Señor.',
        curiosities:['David tenía apenas un cabestrillo y cinco piedras frente al gigante Goliat.', 'Saúl era el hombre más alto de Israel, pero fue rechazado por su desobediencia.', 'La amistad entre David y Jonatán es uno de los modelos de lealtad de la Biblia.', 'Samuel ungió en secreto a David años antes de que llegara al trono.'],
        timeline:[{ period:'~1100 a.C.', desc:'Nacimiento de Samuel; oración de Ana' }, { period:'Monarquía', desc:'Samuel unge a Saúl como primer rey' }, { period:'Rechazo', desc:'Saúl desobedece; Dios escoge a David' }, { period:'David y Goliat', desc:'David vence al gigante y crece en fama' }],
      },
      { id:'2sm', deep:{whatHappens:'2 Samuel narra el reinado de David, el rey más grande de Israel. Tras la muerte de Saúl, David es coronado, conquista Jerusalén y la hace su capital, trae el arca a la ciudad, y recibe de Dios la promesa de un pacto eterno: que de su descendencia vendría un rey cuyo trono permanecería para siempre. El libro también muestra con honestidad la caída de David: su pecado con Betsabé y el asesinato de Urías, su arrepentimiento, y las dolorosas consecuencias que siguieron, incluyendo la rebelión de su hijo Absalón. Es el retrato de un gran rey, pero profundamente humano.',context:{general:'Cubre el reinado de David, aproximadamente 40 años (1010-970 a.C.), la edad de oro inicial de la monarquía israelita.',political:'David unificó las tribus, derrotó a los enemigos de Israel, expandió el territorio y estableció Jerusalén como centro político y religioso.',cultural:'Bajo David, Israel se consolidó como nación poderosa. La adoración se centralizó alrededor del arca en Jerusalén.',spiritual:'David, "hombre conforme al corazón de Dios", llevó a la nación a un fervor espiritual, pero su pecado mostró que ni el mejor rey humano estaba libre de caer, anticipando la necesidad de un Rey perfecto.'},godPurpose:'Dios revela su fidelidad al establecer el pacto davídico: la promesa de un reino y un trono eternos. También muestra su gracia restauradora ante el pecado del creyente arrepentido, y su justicia al permitir las consecuencias del pecado.',godTeaching:'Dios quería enseñar que Él es fiel a sus promesas (el pacto eterno con David), que ningún ser humano es perfecto, que el pecado tiene consecuencias reales aun cuando hay perdón, y que el arrepentimiento sincero restaura la relación con Dios.',consequences:'El pacto davídico se convirtió en el fundamento de la esperanza mesiánica: el pueblo esperaría al "Hijo de David" cuyo reino no tendría fin. El pecado de David y sus consecuencias enseñaron a Israel sobre la gravedad del pecado y la necesidad de un Rey sin pecado, que solo se cumpliría en Cristo.',practicalLessons:['Dios es fiel a sus promesas aunque nosotros fallemos; su pacto no depende de nuestra perfección.','Aun los más cercanos a Dios pueden caer; mantente vigilante y humilde.','El pecado tiene consecuencias dolorosas, pero el arrepentimiento sincero (como el del Salmo 51) trae perdón.','Dios restaura al pecador arrepentido, pero también nos enseña a través de las consecuencias.'],christConnection:'El pacto que Dios hizo con David (capítulo 7) es uno de los pasajes mesiánicos más importantes del Antiguo Testamento: Dios prometió que un descendiente de David tendría un reino y un trono eternos. Esta promesa se cumple en Jesús, "el hijo de David", cuyo reino "no tendrá fin" (Lucas 1:32-33). David, el rey ungido pero imperfecto, hace anhelar al Rey perfecto. Donde David falló (en su pecado), Cristo triunfó; donde David fue un pastor del pueblo, Cristo es el Buen Pastor eterno. El trono de David se cumple para siempre en Cristo.',keyVerses:[{ref:'2 Samuel 7:16',text:'Y será afirmada tu casa y tu reino para siempre delante de tu rostro, y tu trono será estable eternamente.'},{ref:'2 Samuel 22:2-3',text:'Jehová es mi roca y mi fortaleza, y mi libertador; Dios mío, fortaleza mía, en él confiaré.'}],readingCall:'2 Samuel es el retrato honesto de un gran hombre de Dios con virtudes y caídas. Te invitamos a leer sus 24 capítulos. El capítulo 7 contiene la promesa del reino eterno que se cumple en Jesús, y la historia del pecado y arrepentimiento de David te enseñará sobre la gracia restauradora de Dios cuando volvemos a Él con un corazón quebrantado.'}, name:'2 Samuel', abbr:'2 S', t:'AT', chapters:24,
        author:'Natán y Gad', date:'~930 a.C.', genre:'Historia',
        context:'2 Samuel narra el reinado de David, desde su ascenso al trono hasta los conflictos de sus últimos años, incluyendo sus mayores triunfos y su más grande caída.',
        summary:'2 Samuel es la historia del reinado de David. Primero sus victorias: une al reino, conquista Jerusalén y recibe el gran pacto davídico, la promesa de un trono eterno (cap. 7). Luego su caída: el pecado con Betsabé y el asesinato de Urías, que trae graves consecuencias a su familia. El libro muestra a un hombre conforme al corazón de Dios que, aun pecando gravemente, se arrepiente genuinamente, mostrando la diferencia entre caer y permanecer caído.',
        purpose:'Mostrar el reinado de David y el pacto eterno de Dios con su casa, así como las consecuencias del pecado y el poder del arrepentimiento.',
        themes:['Pacto davídico', 'Trono eterno', 'Pecado y consecuencias', 'Arrepentimiento genuino', 'Adoración', 'Justicia de Dios'],
        keyVerse:{ ref:'2 Samuel 7:16', text:'Y será afirmada tu casa y tu reino para siempre delante de tu rostro, y tu trono será estable eternamente.' },
        characters:[{ name:'David', role:'Rey conforme al corazón de Dios', icon:'👑' }, { name:'Natán', role:'Profeta que confronta a David', icon:'📜' }, { name:'Betsabé', role:'Esposa de Urías', icon:'🌹' }, { name:'Absalón', role:'Hijo rebelde de David', icon:'⚔' }],
        teaching:'El pacto davídico apunta a Cristo, el Hijo de David cuyo reino no tendrá fin. La caída de David nos enseña que nadie está exento de la tentación, pero el arrepentimiento sincero restaura la comunión con Dios (Salmo 51).',
        application:'Las posiciones de privilegio no nos hacen inmunes al pecado; debemos velar. El pecado tiene consecuencias reales incluso después del perdón. Pero el arrepentimiento genuino siempre encuentra la misericordia de Dios.',
        curiosities:['El pacto davídico (cap. 7) es una de las promesas mesiánicas más importantes del AT.', 'El Salmo 51, de profundo arrepentimiento, fue escrito por David tras su pecado.', 'David danzó con todas sus fuerzas cuando el arca entró a Jerusalén.', 'Jesús es llamado "Hijo de David" más de 15 veces en los evangelios.'],
        timeline:[{ period:'~1010 a.C.', desc:'David es ungido rey sobre todo Israel' }, { period:'Jerusalén', desc:'Conquista la ciudad y trae el arca' }, { period:'Pacto', desc:'Dios promete a David un trono eterno' }, { period:'Caída', desc:'Pecado con Betsabé y sus consecuencias' }],
      },
      { id:'1re', deep:{whatHappens:'1 Reyes narra el reinado glorioso de Salomón y luego la trágica división del reino. Salomón, hijo de David, pide sabiduría a Dios y se convierte en el hombre más sabio de la tierra; construye el magnífico Templo de Jerusalén y lleva a Israel a su máximo esplendor. Pero al final de su vida, sus muchas esposas extranjeras lo llevan a la idolatría. Tras su muerte, el reino se divide en dos: Israel (las diez tribus del norte) y Judá (al sur). El libro sigue a los reyes de ambos reinos y presenta al gran profeta Elías confrontando la idolatría de Acab y Jezabel.',context:{general:'Cubre aproximadamente 120 años (970-850 a.C.), desde el reinado de Salomón hasta la mitad del período de los reinos divididos.',political:'Bajo Salomón, Israel alcanzó su máximo poder y riqueza. Tras su muerte, las tensiones tribales y la opresión fiscal dividieron el reino en dos naciones rivales.',cultural:'El Templo de Salomón se convirtió en el centro de la adoración. Sin embargo, la prosperidad trajo también lujo, idolatría e influencias paganas a través de alianzas matrimoniales.',spiritual:'El libro muestra el patrón de que la fidelidad a Dios traía bendición y la idolatría traía juicio. Elías representa la voz profética que llama al pueblo a volver al Dios verdadero frente al culto a Baal.'},godPurpose:'Dios revela que la verdadera sabiduría y prosperidad vienen de Él, pero que el corazón debe permanecer fiel. Muestra las consecuencias de la idolatría y levanta profetas para llamar a su pueblo de vuelta a Él.',godTeaching:'Dios quería enseñar que la sabiduría es el mejor tesoro, que la prosperidad sin fidelidad lleva a la ruina, que el corazón dividido entre Dios y los ídolos termina en apostasía, y que Él siempre tiene profetas fieles que defienden la verdad.',consequences:'La división del reino debilitó a Israel y comenzó un declive que llevaría finalmente al exilio de ambos reinos. La caída de Salomón mostró que ni el más sabio podía mantener la fidelidad sin un corazón plenamente entregado. El ministerio de Elías estableció el modelo profético de confrontar la idolatría.',practicalLessons:['Pide a Dios sabiduría antes que riquezas o poder; es el mejor tesoro que puedes buscar.','Un corazón dividido entre Dios y los ídolos del mundo termina alejándote de Él; guarda tu corazón.','La prosperidad puede ser más peligrosa que la adversidad si nos hace olvidar a Dios.','Como Elías, atrévete a defender la verdad de Dios aunque estés en minoría frente a la cultura.'],christConnection:'Salomón, en su sabiduría y en la gloria de su reino, prefigura a Cristo, pero también lo señala por contraste: Jesús dijo "uno mayor que Salomón está aquí" (Mateo 12:42). El Templo que Salomón construyó como morada de Dios apunta a Cristo, el verdadero Templo donde Dios habita entre los hombres ("destruid este templo, y en tres días lo levantaré", Juan 2:19-21). Donde Salomón finalmente falló por su corazón dividido, Cristo, el Rey perfectamente sabio y fiel, reina para siempre. Elías, que fue arrebatado al cielo, reaparece anunciando a Cristo en la transfiguración.',keyVerses:[{ref:'1 Reyes 3:9',text:'Da, pues, a tu siervo corazón entendido para juzgar a tu pueblo, y para discernir entre lo bueno y lo malo.'},{ref:'1 Reyes 18:21',text:'¿Hasta cuándo claudicaréis vosotros entre dos pensamientos? Si Jehová es Dios, seguidle; y si Baal, id en pos de él.'}],readingCall:'1 Reyes muestra cómo la sabiduría eleva y la idolatría destruye. Te invitamos a leer sus 22 capítulos. La oración de Salomón pidiendo sabiduría (capítulo 3) te inspirará a buscar lo correcto, y el enfrentamiento de Elías en el monte Carmelo (capítulo 18) te desafiará a no claudicar entre Dios y los ídolos del mundo.'}, name:'1 Reyes', abbr:'1 R', t:'AT', chapters:22,
        author:'Desconocido (tradición: Jeremías)', date:'~560-540 a.C.', genre:'Historia',
        context:'1 Reyes narra desde los últimos días de David y el reinado glorioso de Salomón hasta la división del reino y el ministerio del profeta Elías.',
        summary:'1 Reyes comienza con la gloria: Salomón pide sabiduría, construye el Templo y lleva a Israel a su época dorada. Pero su corazón se desvía hacia la idolatría, y tras su muerte el reino se divide en dos: Israel (norte) y Judá (sur). El resto del libro narra la decadencia espiritual de ambos reinos, culminando en el dramático enfrentamiento del profeta Elías contra los profetas de Baal en el monte Carmelo.',
        purpose:'Mostrar que la prosperidad de la nación depende de la fidelidad a Dios, y que la idolatría lleva inevitablemente a la división y la ruina.',
        themes:['Sabiduría de Dios', 'El Templo', 'Idolatría y división', 'Fidelidad y apostasía', 'Profetas de Dios', 'Consecuencias del corazón dividido'],
        keyVerse:{ ref:'1 Reyes 3:9', text:'Da, pues, a tu siervo corazón entendido para juzgar a tu pueblo, y para discernir entre lo bueno y lo malo.' },
        characters:[{ name:'Salomón', role:'Rey sabio y constructor del Templo', icon:'👑' }, { name:'Elías', role:'Profeta de fuego', icon:'🔥' }, { name:'Acab', role:'Rey malvado de Israel', icon:'⚠' }, { name:'Jezabel', role:'Reina idólatra', icon:'⚔' }],
        teaching:'La sabiduría es el mejor regalo que podemos pedir a Dios. Pero ni la sabiduría protege a quien permite que su corazón se divida. Elías nos enseña que un solo hombre fiel, respaldado por Dios, puede enfrentar a toda una cultura idólatra.',
        application:'Pedir sabiduría a Dios es siempre acertado (Santiago 1:5). Debemos guardar nuestro corazón de los "dioses ajenos" que compiten por nuestra lealtad. Como Elías, no estamos solos aunque parezca que somos los únicos fieles.',
        curiosities:['Salomón escribió 3.000 proverbios y 1.005 cantares (1 Reyes 4:32).', 'El Templo de Salomón tardó 7 años en construirse.', 'Elías oró y no llovió por 3 años y medio, luego oró y llovió.', 'El fuego de Dios cayó del cielo en el monte Carmelo ante los profetas de Baal.'],
        timeline:[{ period:'~970 a.C.', desc:'Salomón sucede a David; pide sabiduría' }, { period:'~966 a.C.', desc:'Construcción del Templo de Jerusalén' }, { period:'~931 a.C.', desc:'Muere Salomón; el reino se divide' }, { period:'Elías', desc:'Ministerio profético contra Baal' }],
      },
      { id:'2re', deep:{whatHappens:'2 Reyes continúa la historia de los reinos divididos hasta su trágico final en el exilio. Comienza con el ministerio del profeta Eliseo, sucesor de Elías, lleno de milagros. Luego sigue la decadencia espiritual de ambos reinos: Israel (norte) cae ante Asiria en el 722 a.C. por su persistente idolatría, y Judá (sur), tras algunos reyes fieles como Ezequías y Josías, finalmente cae ante Babilonia en el 586 a.C., con la destrucción de Jerusalén y el Templo. Es la historia de cómo el pecado persistente, a pesar de las advertencias de los profetas, llevó al juicio y al exilio.',context:{general:'Cubre aproximadamente 250 años (850-586 a.C.), desde Eliseo hasta la caída de Jerusalén y el exilio babilónico.',political:'Los imperios de Asiria y luego Babilonia dominaban la región. Ambos reinos hebreos, debilitados y rebeldes, terminaron conquistados y deportados.',cultural:'La idolatría se había arraigado profundamente. Aunque hubo reformas bajo reyes piadosos, el pueblo volvía una y otra vez a los ídolos.',spiritual:'2 Reyes muestra el cumplimiento de las advertencias divinas: la persistente infidelidad, a pesar de muchos profetas, condujo al juicio. Sin embargo, Dios preservó un remanente y mantuvo viva la promesa.'},godPurpose:'Dios revela que es paciente pero justo: advierte largamente a través de los profetas, pero no deja el pecado persistente sin consecuencias. Muestra que el exilio fue resultado de la infidelidad, no del abandono de Dios, quien preservó un remanente.',godTeaching:'Dios quería enseñar que el pecado persistente e impenitente trae juicio, que las advertencias de Dios son reales, pero también que Él es paciente y siempre preserva un remanente fiel. Los pocos reyes fieles muestran que el arrepentimiento puede retrasar el juicio.',consequences:'La caída de ambos reinos y el exilio marcaron el fin de una era. El pueblo perdió su tierra, su rey y su Templo. Sin embargo, el exilio purificó a Israel de la idolatría y preparó el regreso de un remanente, manteniendo viva la promesa mesiánica a pesar del juicio.',practicalLessons:['Dios es paciente, pero el pecado persistente e impenitente tiene consecuencias reales.','Las advertencias de Dios, dadas por su Palabra, deben tomarse en serio antes de que sea tarde.','Aun en el juicio, Dios preserva un remanente fiel; nunca abandona del todo a los suyos.','Los reyes que volvieron a Dios (Ezequías, Josías) muestran que el arrepentimiento genuino siempre vale la pena.'],christConnection:'2 Reyes muestra el fracaso de los reyes humanos y la necesidad desesperada de un Rey perfecto. Los milagros de Eliseo —alimentar a multitudes, sanar leprosos, resucitar a un muerto— prefiguran el ministerio de Cristo. El exilio, causado por el pecado, anticipa la realidad de que el pecado nos separa de Dios y de nuestro "hogar"; pero así como Dios preservó un remanente y prometió la restauración, Cristo vino a reunir y restaurar a su pueblo. La promesa a David se mantuvo viva a través del exilio, asegurando que el Mesías vendría.',keyVerses:[{ref:'2 Reyes 17:13',text:'Jehová amonestó entonces a Israel y a Judá por medio de todos los profetas y de todos los videntes, diciendo: Volveos de vuestros malos caminos.'},{ref:'2 Reyes 6:16',text:'No tengas miedo, porque más son los que están con nosotros que los que están con ellos.'}],readingCall:'2 Reyes es una advertencia solemne pero también muestra la paciencia de Dios. Te invitamos a leer sus 25 capítulos. Verás los milagros de Eliseo, las reformas de reyes fieles como Josías, y las consecuencias de ignorar las advertencias de Dios. Un libro que nos llama a tomar en serio nuestra relación con Dios mientras hay tiempo.'}, name:'2 Reyes', abbr:'2 R', t:'AT', chapters:25,
        author:'Desconocido (tradición: Jeremías)', date:'~560-540 a.C.', genre:'Historia',
        context:'2 Reyes continúa la historia de los dos reinos divididos hasta sus respectivos exilios: Israel cae ante Asiria y Judá ante Babilonia.',
        summary:'2 Reyes narra el declive final de Israel y Judá. Comienza con el ministerio de Eliseo, sucesor de Elías, lleno de milagros. Pero a pesar de las advertencias de los profetas, ambos reinos persisten en la idolatría. Israel cae ante Asiria en 722 a.C. y Judá ante Babilonia en 586 a.C., con la destrucción de Jerusalén y el Templo. El libro es una lección sobria sobre las consecuencias de ignorar la Palabra de Dios.',
        purpose:'Explicar por qué Israel y Judá fueron al exilio: por su persistente desobediencia a Dios a pesar de las repetidas advertencias proféticas.',
        themes:['Juicio de Dios', 'Ministerio profético', 'Idolatría persistente', 'Exilio', 'Advertencias ignoradas', 'Reformas y avivamientos'],
        keyVerse:{ ref:'2 Reyes 17:13', text:'Jehová amonestó entonces a Israel y a Judá por medio de todos los profetas... diciendo: Volveos de vuestros malos caminos, y guardad mis mandamientos.' },
        characters:[{ name:'Eliseo', role:'Profeta de milagros', icon:'📜' }, { name:'Naamán', role:'General sirio sanado', icon:'⚔' }, { name:'Ezequías', role:'Rey fiel de Judá', icon:'👑' }, { name:'Josías', role:'Rey reformador', icon:'⭐' }],
        teaching:'Dios es paciente y advierte repetidamente antes de juzgar. Pero su paciencia no es infinita: la desobediencia persistente trae consecuencias. Las reformas de Ezequías y Josías muestran que nunca es tarde para volver a Dios.',
        application:'Ignorar las advertencias de Dios tiene consecuencias serias. Los avivamientos personales y colectivos son posibles cuando volvemos a la Palabra. La fidelidad de unos pocos reyes buenos demoró el juicio: una vida fiel importa.',
        curiosities:['Eliseo realizó el doble de milagros que Elías, como había pedido.', 'Naamán fue sanado de lepra al sumergirse 7 veces en el Jordán.', 'El rey Josías halló el libro de la Ley perdido y lideró un gran avivamiento.', 'La caída de Jerusalén en 586 a.C. marcó el inicio del exilio babilónico.'],
        timeline:[{ period:'Eliseo', desc:'Ministerio de milagros en Israel' }, { period:'722 a.C.', desc:'Asiria conquista Israel (reino del norte)' }, { period:'Reformas', desc:'Ezequías y Josías buscan a Dios' }, { period:'586 a.C.', desc:'Babilonia destruye Jerusalén y el Templo' }],
      },
      { id:'1cr', deep:{whatHappens:'1 Crónicas vuelve a contar la historia de Israel desde una perspectiva sacerdotal y de esperanza, escrita para los que regresaron del exilio. Comienza con extensas genealogías que conectan al pueblo con sus raíces desde Adán, recordándoles su identidad. Luego se enfoca en el reinado de David, destacando especialmente su papel en organizar la adoración, los levitas, los músicos del Templo y sus preparativos para construir la casa de Dios. A diferencia de Samuel y Reyes, Crónicas enfatiza lo positivo y espiritual, animando al remanente a redescubrir su llamado como pueblo de Dios.',context:{general:'Escrito después del exilio (alrededor del 430 a.C.), probablemente por Esdras, para el remanente que había regresado a Jerusalén.',political:'El pueblo había vuelto del exilio babilónico bajo dominio persa, reconstruyendo su identidad nacional y religiosa desde cero.',cultural:'El remanente necesitaba reconectarse con su herencia. Las genealogías les recordaban quiénes eran y su lugar en el plan de Dios.',spiritual:'Crónicas reorienta al pueblo hacia la adoración correcta y el pacto davídico, dándoles esperanza de que Dios seguía cumpliendo sus promesas a pesar del exilio.'},godPurpose:'Dios revela que su pacto y sus promesas permanecen a pesar del exilio. A través de la historia recontada, anima al remanente a redescubrir su identidad, restaurar la adoración correcta y confiar en la promesa davídica del Mesías.',godTeaching:'Dios quería enseñar la importancia de la adoración, la fidelidad al pacto y la memoria de la propia herencia espiritual. Enseña que cada persona tiene un lugar en el plan de Dios y que la verdadera prioridad es buscar y honrar a Dios.',consequences:'Crónicas dio al pueblo post-exílico una identidad renovada y esperanza en las promesas de Dios. Su énfasis en la adoración y el linaje davídico mantuvo viva la expectativa del Mesías y restauró el sentido de propósito del remanente.',practicalLessons:['Tu identidad y herencia espiritual importan; recuerda de dónde vienes y a quién perteneces.','La adoración a Dios debe ser una prioridad central, organizada con cuidado y de corazón.','Dios cumple sus promesas a pesar de los fracasos del pasado; su pacto permanece.','Cada persona tiene un lugar y un papel en el plan de Dios, como muestran las genealogías.'],christConnection:'Las genealogías de Crónicas trazan cuidadosamente la línea de David, manteniendo el registro del cual vendría el Mesías. El énfasis en el pacto davídico recuerda al pueblo que Dios prometió un reino eterno a través del linaje de David, cumplido en Jesús. El interés de David en construir el Templo —la morada de Dios— apunta a Cristo, en quien "habita toda la plenitud de la Deidad". Crónicas, escrito para dar esperanza al remanente, alimenta la expectativa del Rey venidero que restauraría todas las cosas.',keyVerses:[{ref:'1 Crónicas 16:11',text:'Buscad a Jehová y su poder; buscad su rostro continuamente.'},{ref:'1 Crónicas 29:11',text:'Tuya es, oh Jehová, la magnificencia y el poder, la gloria, la victoria y el honor; porque todas las cosas que están en los cielos y en la tierra son tuyas.'}],readingCall:'1 Crónicas nos recuerda nuestra identidad y la fidelidad de Dios a sus promesas. Te invitamos a leer sus 29 capítulos. Aunque comienza con genealogías, muestra el corazón adorador de David y su pasión por la casa de Dios. Te animará a hacer de la adoración y la búsqueda de Dios una prioridad central en tu vida.'}, name:'1 Crónicas', abbr:'1 Cr', t:'AT', chapters:29,
        author:'Tradición: Esdras', date:'~450-400 a.C.', genre:'Historia',
        context:'Escrito tras el exilio, 1 Crónicas repasa la historia de Israel desde Adán hasta David, enfatizando el linaje y el culto a Dios para animar a los que regresaron de Babilonia.',
        summary:'1 Crónicas comienza con extensas genealogías (cap. 1-9) que conectan al Israel post-exílico con sus raíces, y luego se centra en el reinado de David (cap. 10-29), especialmente en sus preparativos para el Templo y la organización del culto. A diferencia de Samuel, Crónicas omite los pecados de David y resalta su corazón para la adoración, ofreciendo una perspectiva esperanzadora y centrada en Dios.',
        purpose:'Recordar al pueblo restaurado su identidad como nación del pacto y animarlo a centrar su vida en la adoración a Dios.',
        themes:['Identidad del pacto', 'Adoración y culto', 'El Templo', 'Genealogías', 'Liderazgo de David', 'Fidelidad de Dios'],
        keyVerse:{ ref:'1 Crónicas 16:11', text:'Buscad a Jehová y su poder; buscad su rostro continuamente.' },
        characters:[{ name:'David', role:'Organizador del culto', icon:'👑' }, { name:'Salomón', role:'Futuro constructor del Templo', icon:'⭐' }],
        teaching:'La adoración es central en la vida del pueblo de Dios. Recordar de dónde venimos (las genealogías) fortalece nuestra identidad. David puso su corazón en preparar la casa de Dios aun cuando él no la construiría.',
        application:'Buscar a Dios continuamente debe ser la prioridad de nuestra vida. Conocer nuestra herencia espiritual nos da identidad. A veces sembramos para que otros cosechen, como David preparó lo que Salomón edificaría.',
        curiosities:['Los primeros 9 capítulos son casi enteramente genealogías, las más extensas de la Biblia.', 'Crónicas omite el pecado de David con Betsabé para enfocarse en la adoración.', 'David reunió enormes cantidades de materiales para el Templo que él nunca vería.', 'Fue escrito para animar a los judíos que regresaron del exilio.'],
        timeline:[{ period:'Adán a David', desc:'Genealogías que trazan la historia' }, { period:'Reinado', desc:'David consolida el reino' }, { period:'Preparación', desc:'David organiza el culto y reúne materiales' }, { period:'Transición', desc:'David encarga a Salomón el Templo' }],
      },
      { id:'2cr', deep:{whatHappens:'2 Crónicas continúa la historia desde el reinado de Salomón hasta el exilio, con especial atención al Templo y a los reyes de Judá. Relata la construcción y dedicación del glorioso Templo de Salomón, donde la gloria de Dios descendió de forma visible. Luego sigue a los reyes de Judá, destacando a los que fueron fieles (como Josafat, Ezequías y Josías, que lideraron reformas y avivamientos) y mostrando cómo la fidelidad traía bendición y la infidelidad traía juicio. Termina con la caída de Jerusalén y, esperanzadoramente, con el decreto de Ciro que permitiría el regreso del exilio.',context:{general:'Escrito después del exilio (alrededor del 430 a.C.), continuación de 1 Crónicas, cubriendo desde Salomón hasta el decreto de regreso.',political:'Como 1 Crónicas, fue escrito para el remanente que regresaba del exilio bajo dominio persa, ayudándoles a entender su historia.',cultural:'El Templo era el centro de la identidad y adoración judía. 2 Crónicas enfatiza su importancia para animar la reconstrucción del segundo Templo.',spiritual:'El libro muestra un patrón claro: cuando los reyes y el pueblo buscaban a Dios, había avivamiento y bendición; cuando lo abandonaban, venía el declive. Es un llamado al remanente a buscar a Dios.'},godPurpose:'Dios revela que la bendición sigue a la fidelidad y que Él responde al arrepentimiento. A través de los avivamientos de los reyes fieles, muestra el camino de la restauración: humillarse, orar, buscar su rostro y apartarse del mal.',godTeaching:'Dios quería enseñar que buscarle de corazón trae bendición y avivamiento; que Él se deja hallar por quienes lo buscan; y que el arrepentimiento sincero puede traer restauración nacional. La promesa de 7:14 resume el corazón del libro.',consequences:'2 Crónicas dejó al pueblo post-exílico un mapa espiritual: el camino de la bendición es buscar a Dios, y el de la ruina es abandonarlo. Su énfasis en los avivamientos inspiró al remanente a reconstruir el Templo y renovar el pacto. La promesa de 7:14 sigue guiando a los creyentes hacia el arrepentimiento y la restauración.',practicalLessons:['Si te humillas, oras, buscas a Dios y te apartas del mal, Él escucha, perdona y restaura (7:14).','Buscar a Dios de todo corazón trae avivamiento y bendición, tanto personal como colectiva.','La fidelidad de los líderes influye en todo el pueblo; un corazón entregado a Dios marca la diferencia.','Nunca es tarde para volver a Dios; los avivamientos muestran que Él responde al arrepentimiento.'],christConnection:'El Templo, cuyo esplendor y dedicación domina el inicio de 2 Crónicas, apunta a Cristo, el verdadero lugar de encuentro entre Dios y los hombres. La gloria de Dios que llenó el Templo prefigura a Jesús, en quien "vimos su gloria" (Juan 1:14). La promesa de 7:14 sobre el perdón y la restauración encuentra su cumplimiento pleno en Cristo, quien hace posible que nos acerquemos a Dios. El libro termina con el decreto que permite el regreso, manteniendo viva la línea davídica y la esperanza del Mesías que vendría a edificar un Reino eterno.',keyVerses:[{ref:'2 Crónicas 7:14',text:'Si se humillare mi pueblo, sobre el cual mi nombre es invocado, y oraren, y buscaren mi rostro, y se convirtieren de sus malos caminos; entonces yo oiré desde los cielos, y perdonaré sus pecados, y sanaré su tierra.'},{ref:'2 Crónicas 16:9',text:'Porque los ojos de Jehová contemplan toda la tierra, para mostrar su poder a favor de los que tienen corazón perfecto para con él.'}],readingCall:'2 Crónicas muestra el poder del avivamiento y la promesa del perdón de Dios. Te invitamos a leer sus 36 capítulos. La promesa de 7:14 te enseñará el camino de la restauración, y las historias de reyes que buscaron a Dios te inspirarán a hacer lo mismo. Un libro que nos llama a humillarnos y buscar el rostro de Dios.'}, name:'2 Crónicas', abbr:'2 Cr', t:'AT', chapters:36,
        author:'Tradición: Esdras', date:'~450-400 a.C.', genre:'Historia',
        context:'2 Crónicas continúa desde Salomón hasta el exilio, enfocándose en los reyes de Judá y en los avivamientos espirituales del reino del sur.',
        summary:'2 Crónicas narra la construcción del Templo por Salomón y luego la historia del reino de Judá hasta el exilio. A diferencia de Reyes, se enfoca solo en Judá y destaca los grandes avivamientos bajo reyes fieles como Asa, Josafat, Ezequías y Josías. El libro muestra un patrón claro: cuando los reyes y el pueblo buscaban a Dios, había bendición; cuando lo abandonaban, venía el juicio. Termina con el decreto de Ciro permitiendo el regreso.',
        purpose:'Mostrar que la bendición de Dios sigue a la fidelidad y el arrepentimiento, animando al pueblo restaurado a buscar a Dios de todo corazón.',
        themes:['El Templo', 'Avivamiento y reforma', 'Humildad y oración', 'Juicio y restauración', 'Buscar a Dios', 'Esperanza tras el exilio'],
        keyVerse:{ ref:'2 Crónicas 7:14', text:'Si se humillare mi pueblo, sobre el cual mi nombre es invocado, y oraren, y buscaren mi rostro, y se convirtieren de sus malos caminos; entonces yo oiré desde los cielos, y perdonaré sus pecados, y sanaré su tierra.' },
        characters:[{ name:'Salomón', role:'Constructor del Templo', icon:'👑' }, { name:'Ezequías', role:'Rey reformador', icon:'⭐' }, { name:'Josías', role:'Restaurador de la Ley', icon:'📜' }],
        teaching:'La promesa de 7:14 muestra el camino del avivamiento: humildad, oración, búsqueda de Dios y arrepentimiento. La historia de Judá demuestra que el destino de un pueblo está ligado a su relación con Dios.',
        application:'El avivamiento personal y nacional comienza con humildad y arrepentimiento. Buscar el rostro de Dios trae sanidad. Las decisiones de los líderes afectan a generaciones enteras.',
        curiosities:['2 Crónicas 7:14 es uno de los versículos más citados sobre el avivamiento.', 'El libro termina justo donde empieza Esdras: con el decreto de Ciro.', 'Ezequías celebró la Pascua más grande desde los días de Salomón.', 'Josías tenía solo 8 años cuando comenzó a reinar.'],
        timeline:[{ period:'~966 a.C.', desc:'Salomón construye y dedica el Templo' }, { period:'Reyes de Judá', desc:'Alternan fidelidad y apostasía' }, { period:'Avivamientos', desc:'Ezequías y Josías guían reformas' }, { period:'538 a.C.', desc:'Decreto de Ciro permite el regreso' }],
      },
      { id:'esd', deep:{whatHappens:'Esdras narra el regreso del pueblo de Dios del exilio en Babilonia para reconstruir el templo de Jerusalén y restaurar la adoración verdadera. En dos grandes oleadas —la primera liderada por Zorobabel para reconstruir el templo, y la segunda por Esdras el escriba para reformar al pueblo— Dios cumple su promesa de restaurar a su pueblo. Esdras enseña la ley, confronta el pecado de los matrimonios mixtos con la idolatría, y guía un avivamiento espiritual basado en la Palabra de Dios.',context:{general:'Cubre aproximadamente el período del 538 al 458 a.C., tras los 70 años de cautiverio en Babilonia, cuando el imperio persa permitió el regreso de los judíos.',political:'El imperio persa, bajo reyes como Ciro, Darío y Artajerjes, había reemplazado a Babilonia. Ciro emitió un decreto permitiendo a los exiliados regresar y reconstruir su templo, cumpliendo la profecía de Isaías.',cultural:'El pueblo regresaba a una tierra arrasada y a una Jerusalén en ruinas. Debían reconstruir no solo edificios, sino su identidad como pueblo de Dios en medio de pueblos vecinos hostiles.',spiritual:'Tras el exilio, el pueblo había aprendido la lección de la idolatría. El énfasis ahora era la pureza, la obediencia a la ley y la centralidad de la adoración a Dios en el templo restaurado.'},godPurpose:'Dios revela su fidelidad al cumplir su promesa de restaurar a su pueblo después del juicio. Muestra que conserva un remanente fiel y que mueve incluso a reyes paganos para cumplir sus propósitos de redención.',godTeaching:'Dios quería enseñar que Él es fiel a sus promesas aun después de la disciplina, que la restauración comienza con la adoración y la Palabra, y que la santidad y la separación del pecado son esenciales para el pueblo de Dios.',consequences:'La reconstrucción del templo y la reforma de Esdras prepararon el camino para la venida del Mesías. El énfasis de Esdras en la ley dio origen al movimiento de los escribas y a la centralidad de las Escrituras en el judaísmo posterior.',practicalLessons:['Dios es fiel a sus promesas: aun cuando enfrentes consecuencias, Él tiene un plan de restauración.','La renovación espiritual comienza al volver a la Palabra de Dios y ponerla en el centro.','Dios controla la historia y puede usar a cualquier autoridad para cumplir sus propósitos.','La obra de Dios enfrenta oposición, pero la perseverancia y la oración la llevan a término.'],christConnection:'Esdras señala a Cristo como el verdadero Restaurador. Así como Dios trajo a su pueblo de vuelta del exilio para reconstruir el templo, Cristo nos rescata del exilio del pecado y nos hace templo del Espíritu. El remanente fiel que regresa anticipa al pueblo que Cristo redime. Y el linaje preservado de los que regresaron mantiene viva la línea mesiánica que culminaría en Jesús, el verdadero templo donde Dios y el hombre se encuentran.',keyVerses:[{ref:'Esdras 7:10',text:'Porque Esdras había preparado su corazón para inquirir la ley de Jehová y para cumplirla, y para enseñar en Israel sus estatutos y decretos.'},{ref:'Esdras 1:3',text:'Quien haya entre vosotros de su pueblo, sea Dios con él, y suba a Jerusalén... y edifique la casa a Jehová Dios de Israel.'}],readingCall:'Esdras es la historia de un nuevo comienzo y de la fidelidad de Dios. Te invitamos a leer sus 10 capítulos y ver cómo Dios restaura a su pueblo y cumple cada promesa. Si necesitas esperanza de que Dios puede reconstruir lo que parecía perdido, este libro te animará. Léelo junto con Nehemías para la historia completa de la restauración.'}, name:'Esdras', abbr:'Esd', t:'AT', chapters:10,
        author:'Esdras', date:'~440 a.C.', genre:'Historia',
        context:'Esdras narra el regreso de los judíos del exilio babilónico y la reconstrucción del Templo, junto con la reforma espiritual del pueblo.',
        summary:'Esdras cuenta dos regresos del exilio: el primero bajo Zorobabel, que reconstruye el Templo a pesar de la oposición, y el segundo bajo Esdras el escriba, que restaura la pureza espiritual del pueblo. El libro muestra la fidelidad de Dios al cumplir su promesa de restaurar a Israel, y el papel central de la Palabra de Dios en la renovación. Esdras es modelo de alguien que preparó su corazón para estudiar, cumplir y enseñar la Ley.',
        purpose:'Mostrar la fidelidad de Dios al restaurar a su pueblo y el papel central de la Palabra en la renovación espiritual.',
        themes:['Restauración', 'Reconstrucción del Templo', 'La Palabra de Dios', 'Arrepentimiento', 'Providencia divina', 'Pureza del pueblo'],
        keyVerse:{ ref:'Esdras 7:10', text:'Porque Esdras había preparado su corazón para inquirir la ley de Jehová y para cumplirla, y para enseñar en Israel sus estatutos y decretos.' },
        characters:[{ name:'Esdras', role:'Sacerdote y escriba', icon:'📜' }, { name:'Zorobabel', role:'Líder del primer regreso', icon:'⭐' }, { name:'Ciro', role:'Rey persa que liberó a los judíos', icon:'👑' }],
        teaching:'La restauración de Dios incluye lo físico (el Templo) y lo espiritual (el corazón del pueblo). El modelo de Esdras —estudiar, cumplir y enseñar la Palabra— es el patrón para todo siervo de Dios.',
        application:'Dios cumple sus promesas aunque tarden décadas. La renovación espiritual viene cuando volvemos a la Palabra de Dios. Como Esdras, debemos primero vivir la Palabra antes de enseñarla.',
        curiosities:['Dios usó a reyes paganos (Ciro, Darío, Artajerjes) para cumplir su plan.', 'Esdras significa "ayuda"; fue clave en preservar las Escrituras.', 'El Templo reconstruido tardó unos 20 años por la oposición.', 'Esdras condujo un viaje de 4 meses de Babilonia a Jerusalén confiando solo en Dios.'],
        timeline:[{ period:'538 a.C.', desc:'Decreto de Ciro; primer regreso con Zorobabel' }, { period:'516 a.C.', desc:'Se completa el segundo Templo' }, { period:'458 a.C.', desc:'Esdras regresa con un segundo grupo' }, { period:'Reforma', desc:'Esdras restaura la obediencia a la Ley' }],
      },
      { id:'ne', deep:{whatHappens:'Nehemías relata la reconstrucción de los muros de Jerusalén bajo el liderazgo de un hombre de oración y acción. Nehemías, copero del rey persa, se entera de que los muros de Jerusalén siguen derribados y su pueblo en desgracia. Movido por Dios, pide permiso al rey, viaja a Jerusalén, y organiza al pueblo para reconstruir los muros en solo 52 días, a pesar de feroz oposición. Luego, junto con Esdras, lidera una renovación espiritual del pueblo basada en la lectura pública de la ley.',context:{general:'Ocurre alrededor del 445 a.C., unos 13 años después del regreso de Esdras, durante el reinado de Artajerjes I de Persia.',political:'Nehemías servía en la corte persa como copero del rey, un cargo de gran confianza. Jerusalén seguía vulnerable sin muros, expuesta a sus enemigos.',cultural:'Los pueblos vecinos (samaritanos, amonitas, árabes) se oponían a la restauración de Jerusalén porque veían en ella una amenaza a su influencia regional.',spiritual:'El pueblo necesitaba no solo muros físicos sino restauración espiritual. La lectura de la ley produjo un avivamiento con confesión, arrepentimiento y renovación del pacto.'},godPurpose:'Dios revela cómo usa a líderes consagrados, hombres de oración y acción, para cumplir sus propósitos. Muestra que la restauración del pueblo implica tanto la protección física como la renovación espiritual basada en su Palabra.',godTeaching:'Dios quería enseñar que la oración y el trabajo van juntos, que la obra de Dios enfrenta oposición pero prevalece con perseverancia, y que el verdadero avivamiento nace de escuchar y obedecer la Palabra de Dios.',consequences:'Con los muros reconstruidos y el pueblo renovado espiritualmente, Jerusalén quedó establecida como centro del judaísmo post-exílico. Nehemías se convirtió en modelo de liderazgo piadoso, combinando dependencia de Dios con planificación y acción decidida.',practicalLessons:['Ora primero y luego actúa: Nehemías oraba constantemente, incluso en medio de decisiones rápidas.','La oposición no debe detenerte; con perseverancia y dependencia de Dios, la obra se completa.','El buen liderazgo combina visión, organización, trabajo en equipo y confianza en Dios.','El verdadero avivamiento ocurre cuando el pueblo escucha, entiende y obedece la Palabra de Dios.'],christConnection:'Nehemías, que deja su posición privilegiada en el palacio para servir y restaurar a su pueblo, prefigura a Cristo, quien dejó la gloria del cielo para venir a reconstruir lo que el pecado había destruido. Así como Nehemías reconstruyó los muros para proteger al pueblo de Dios, Cristo edifica su iglesia, contra la cual las puertas del Hades no prevalecerán. La renovación del pacto bajo Nehemías anticipa el nuevo pacto que Cristo establecería con su sangre.',keyVerses:[{ref:'Nehemías 8:10',text:'No os entristezcáis, porque el gozo de Jehová es vuestra fuerza.'},{ref:'Nehemías 6:9',text:'Ahora, pues, oh Dios, fortalece tú mis manos.'},{ref:'Nehemías 2:20',text:'El Dios de los cielos, él nos prosperará, y nosotros sus siervos nos levantaremos y edificaremos.'}],readingCall:'Nehemías es uno de los mejores manuales de liderazgo y perseverancia de la Biblia. Te invitamos a leer sus 13 capítulos y aprender cómo un hombre de oración y acción transformó una situación imposible. Si enfrentas un desafío que parece demasiado grande, o lideras a otros, este libro te inspirará. Lee el capítulo 8 para ver el poder de la Palabra de Dios para renovar un pueblo.'}, name:'Nehemías', abbr:'Neh', t:'AT', chapters:13,
        author:'Nehemías', date:'~430 a.C.', genre:'Historia',
        context:'Nehemías, copero del rey persa, regresa a Jerusalén para reconstruir los muros de la ciudad, complementando la obra espiritual de Esdras con liderazgo y organización.',
        summary:'Nehemías es un modelo de liderazgo piadoso. Al enterarse del estado ruinoso de Jerusalén, ora, planea y obtiene permiso del rey para reconstruir los muros. A pesar de la oposición de enemigos como Sanbalat, el pueblo completa la obra en solo 52 días "porque el pueblo tuvo ánimo para trabajar". Luego, junto con Esdras, lidera un gran avivamiento espiritual basado en la lectura pública de la Ley. El libro combina acción práctica y devoción profunda.',
        purpose:'Mostrar cómo el liderazgo piadoso, la oración y el trabajo diligente pueden restaurar lo que está en ruinas, tanto física como espiritualmente.',
        themes:['Liderazgo piadoso', 'Oración y acción', 'Reconstrucción', 'Perseverancia ante la oposición', 'Avivamiento', 'El gozo del Señor'],
        keyVerse:{ ref:'Nehemías 8:10', text:'No os entristezcáis, porque el gozo de Jehová es vuestra fuerza.' },
        characters:[{ name:'Nehemías', role:'Copero y gobernador', icon:'⭐' }, { name:'Esdras', role:'Lee la Ley al pueblo', icon:'📜' }, { name:'Sanbalat', role:'Opositor principal', icon:'⚠' }],
        teaching:'El liderazgo eficaz combina oración ferviente con planificación práctica. Nehemías oraba y luego actuaba. El gozo del Señor —no las circunstancias— es nuestra fortaleza para enfrentar la oposición.',
        application:'Frente a un problema, primero oremos, luego actuemos con diligencia. La oposición es normal cuando hacemos la obra de Dios; debemos perseverar con "una mano en la obra y otra en la espada". El gozo en Dios nos sostiene.',
        curiosities:['Los muros de Jerusalén se reconstruyeron en solo 52 días.', 'Nehemías oraba constantemente, incluso oraciones breves en medio de conversaciones.', 'Trabajaban con una herramienta en una mano y un arma en la otra.', 'La lectura pública de la Ley provocó llanto y luego gozo en el pueblo.'],
        timeline:[{ period:'445 a.C.', desc:'Nehemías recibe noticias y ora por Jerusalén' }, { period:'Permiso', desc:'El rey lo envía a reconstruir los muros' }, { period:'52 días', desc:'Se completan los muros pese a la oposición' }, { period:'Avivamiento', desc:'Esdras lee la Ley; el pueblo se renueva' }],
      },
      { id:'est', deep:{whatHappens:'Ester narra cómo Dios libró a su pueblo de un genocidio a través de una joven judía que llegó a ser reina de Persia. Cuando el malvado Amán traza un plan para exterminar a todos los judíos del imperio, Ester arriesga su vida presentándose ante el rey sin ser llamada, para interceder por su pueblo. A través de una serie de "coincidencias" providenciales, el plan de Amán se vuelve contra él, los judíos son salvados, y se instituye la fiesta de Purim. Notablemente, Dios nunca es mencionado por nombre, pero su mano providencial se ve en cada página.',context:{general:'Ocurre alrededor del 483-473 a.C. en Susa, capital del imperio persa, durante el reinado de Asuero (Jerjes I). Trata sobre los judíos que permanecieron en Persia y no regresaron a Judá.',political:'El imperio persa era el más grande del mundo, extendiéndose desde la India hasta Etiopía. Los judíos eran una minoría dispersa y vulnerable dentro de él.',cultural:'La corte persa era un mundo de lujo, intriga, protocolo rígido y poder absoluto del rey, donde presentarse sin ser llamado podía costar la vida.',spiritual:'Aunque Dios no se menciona, el libro enseña sobre su providencia: Él obra entre bastidores, dirigiendo los eventos para proteger a su pueblo aun cuando parece estar ausente.'},godPurpose:'Dios revela su providencia soberana: aunque invisible, controla cada detalle de la historia para preservar a su pueblo y cumplir sus promesas. Muestra que pone a personas "para esta hora" con propósitos específicos.',godTeaching:'Dios quería enseñar que su mano obra aun cuando no la vemos, que pone a cada persona en su lugar con un propósito, y que la valentía y la fe en los momentos decisivos pueden cambiar la historia.',consequences:'La liberación de los judíos preservó la línea del pueblo de Dios y, por tanto, la promesa mesiánica. La fiesta de Purim, instituida aquí, se celebra hasta hoy entre los judíos, recordando cómo Dios convirtió el luto en alegría.',practicalLessons:['Dios obra providencialmente aun cuando parece estar ausente o en silencio; nada escapa a su control.','Quizás estás donde estás "para esta hora": Dios te ha puesto en tu lugar con un propósito.','La valentía en el momento decisivo, aun arriesgándolo todo, puede ser usada por Dios para grandes cosas.','El mal que se trama contra el pueblo de Dios finalmente se vuelve contra quien lo planea.'],christConnection:'Ester, que intercede ante el rey arriesgando su vida para salvar a su pueblo del exterminio, es una hermosa figura de Cristo, nuestro mediador, que se presentó ante el Padre y dio su vida para salvarnos de la condenación. Así como la liberación de los judíos preservó la línea mesiánica, la providencia de Dios en Ester forma parte del gran plan que culmina en Cristo. El libro muestra que Dios siempre protege la simiente prometida que traería al Salvador del mundo.',keyVerses:[{ref:'Ester 4:14',text:'¿Y quién sabe si para esta hora has llegado al reino?'},{ref:'Ester 4:16',text:'Y entraré a ver al rey, aunque no sea conforme a la ley; y si perezco, que perezca.'}],readingCall:'Ester es una historia llena de suspenso, valentía y providencia divina. Te invitamos a leer sus 10 capítulos de una sentada, como la gran narrativa que es. Verás cómo Dios obra entre bastidores para salvar a su pueblo. Si alguna vez has sentido que Dios está ausente en tu situación, este libro te recordará que Él siempre está obrando, aunque no lo veas.'}, name:'Ester', abbr:'Est', t:'AT', chapters:10,
        author:'Desconocido (tradición: Mardoqueo)', date:'~460 a.C.', genre:'Historia / Narrativa',
        context:'Ambientado en el Imperio Persa, Ester narra cómo una joven judía llega a ser reina y salva a su pueblo de un genocidio planeado. Es el único libro de la Biblia que no menciona explícitamente a Dios.',
        summary:'Ester es la historia de la providencia oculta de Dios. Una joven judía llamada Ester se convierte en reina de Persia. Cuando el malvado Amán planea exterminar a los judíos, su primo Mardoqueo la desafía: "¿quién sabe si para esta hora has llegado al reino?". Ester arriesga su vida para interceder ante el rey y salva a su pueblo. Aunque Dios nunca es nombrado, su mano se ve en cada "coincidencia". El libro explica el origen de la fiesta de Purim.',
        purpose:'Mostrar la providencia silenciosa de Dios que protege a su pueblo incluso cuando parece ausente, y el valor de actuar con fe en el momento oportuno.',
        themes:['Providencia oculta de Dios', 'Valentía y fe', 'Liberación del pueblo', 'El momento de Dios', 'Justicia divina', 'Identidad y propósito'],
        keyVerse:{ ref:'Ester 4:14', text:'¿Y quién sabe si para esta hora has llegado al reino?' },
        characters:[{ name:'Ester', role:'Reina judía valiente', icon:'👑' }, { name:'Mardoqueo', role:'Primo sabio y fiel', icon:'⭐' }, { name:'Amán', role:'Enemigo de los judíos', icon:'⚠' }, { name:'Asuero', role:'Rey de Persia', icon:'🏛' }],
        teaching:'Dios obra detrás de escena aun cuando no lo vemos. Las "coincidencias" de la vida pueden ser su providencia. A veces Dios nos coloca en una posición específica "para esta hora", con un propósito que requiere valentía.',
        application:'Aunque no sintamos la presencia de Dios, él está obrando. Debemos estar listos para actuar con valentía cuando Dios nos pone en una posición de influencia. Nuestro lugar y momento no son accidentales.',
        curiosities:['Ester es uno de dos libros de la Biblia que no mencionan a Dios (el otro es Cantares).', 'La fiesta judía de Purim, celebrada hasta hoy, se origina en este libro.', 'La horca que Amán preparó para Mardoqueo terminó siendo su propia ejecución.', 'Ester arriesgó la muerte al presentarse ante el rey sin ser llamada.'],
        timeline:[{ period:'~483 a.C.', desc:'Asuero busca nueva reina; Ester es elegida' }, { period:'Complot', desc:'Amán planea exterminar a los judíos' }, { period:'Intercesión', desc:'Ester arriesga su vida ante el rey' }, { period:'Liberación', desc:'Los judíos son salvados; nace Purim' }],
      },
      { id:'job', deep:{whatHappens:'Job aborda la pregunta más difícil de la existencia: ¿por qué sufre el justo? Job, un hombre íntegro y próspero, pierde en un solo día sus bienes, sus hijos y su salud, sin saber que ocurre un drama celestial donde Satanás cuestiona la sinceridad de su fe. Durante la mayor parte del libro, Job y sus tres amigos debaten el porqué del sufrimiento. Los amigos insisten en que Job debe haber pecado; Job mantiene su inocencia y clama a Dios. Finalmente, Dios mismo responde, no explicando el porqué, sino revelando su grandeza y sabiduría infinitas, y Job halla paz en confiar en un Dios que es más grande que sus preguntas.',context:{general:'Probablemente uno de los libros más antiguos de la Biblia, ambientado en la era patriarcal (alrededor de la época de Abraham). Job vivía en la tierra de Uz.',political:'El relato es atemporal y no se enmarca en la historia de Israel, lo que da a sus enseñanzas un carácter universal sobre el sufrimiento humano.',cultural:'En la cultura antigua predominaba la idea de que la prosperidad era señal de la bendición de Dios y el sufrimiento, castigo por el pecado. El libro desafía esta creencia simplista.',spiritual:'Job explora el misterio del sufrimiento del inocente y la soberanía de Dios. Revela que detrás del sufrimiento humano puede haber realidades espirituales que no percibimos.'},godPurpose:'Dios revela que Él es soberano y sabio más allá de nuestra comprensión, y que la fe verdadera confía en Él incluso sin tener todas las respuestas. Muestra que el sufrimiento no siempre es castigo por el pecado, y que su propósito puede trascender nuestro entendimiento.',godTeaching:'Dios quería enseñar que la relación con Él no es un contrato de "obediencia a cambio de prosperidad", sino confianza genuina. Enseña que podemos ser honestos con Dios en el dolor, y que la verdadera paz viene de conocerlo a Él, no de entenderlo todo.',consequences:'Job se convirtió en el gran tratado bíblico sobre el sufrimiento, consolando a millones que enfrentan dolor inexplicable. Demostró que la fe puede sobrevivir a las pruebas más severas, y que Dios restaura. Job recibió el doble de lo que había perdido.',practicalLessons:['El sufrimiento no siempre es castigo por el pecado; a veces sus razones son un misterio que confiamos a Dios.','Puedes ser honesto con Dios en tu dolor: Job clamó, cuestionó y lloró, y Dios no lo condenó por ello.','La verdadera fe confía en Dios aun sin entender el porqué; conocerle a Él vale más que tener todas las respuestas.','Los consejos simplistas a quien sufre pueden hacer más daño que bien; a veces se necesita compañía silenciosa, no explicaciones.'],christConnection:'Job clama por un "mediador" que ponga su mano sobre Dios y sobre él (9:33), y declara con fe profética: "Yo sé que mi Redentor vive, y al fin se levantará sobre el polvo... en mi carne he de ver a Dios" (19:25-26). Ese Redentor es Cristo, el mediador perfecto entre Dios y los hombres. Job, el justo que sufrió inocentemente, prefigura a Cristo, el único verdaderamente justo que sufrió no por sus pecados sino por los nuestros. En Cristo, el sufrimiento del inocente halla su sentido más profundo y redentor.',keyVerses:[{ref:'Job 1:21',text:'Desnudo salí del vientre de mi madre, y desnudo volveré allá. Jehová dio, y Jehová quitó; sea el nombre de Jehová bendito.'},{ref:'Job 19:25',text:'Yo sé que mi Redentor vive, y al fin se levantará sobre el polvo.'},{ref:'Job 23:10',text:'Mas él conoce mi camino; me probará, y saldré como oro.'}],readingCall:'Job es para todo el que ha sufrido y se ha preguntado "¿por qué?". Te invitamos a leer este libro profundo y honesto. Si el camino completo te parece largo, lee al menos los capítulos 1-2 (el drama), 38-42 (la respuesta de Dios y la restauración). Descubrirás que, aunque Dios no siempre explica el porqué, Él es digno de confianza incluso en el dolor más profundo.'}, name:'Job', abbr:'Job', t:'AT', chapters:42,
        author:'Desconocido', date:'Muy antiguo (era patriarcal)', genre:'Sabiduría / Poesía',
        context:'Job aborda la pregunta más difícil de la existencia: ¿por qué sufren los justos? Es uno de los libros más antiguos de la Biblia.',
        summary:'Job era un hombre justo y próspero que, en poco tiempo, lo pierde todo: bienes, hijos y salud. Sus tres amigos insisten en que su sufrimiento debe ser castigo por algún pecado, pero Job sabe que es inocente. A través de un diálogo profundo, Job lucha con Dios sin maldecirlo. Finalmente, Dios responde no explicando el sufrimiento, sino revelando su grandeza y sabiduría infinitas. Job se humilla, y Dios lo restaura al doble. El libro no resuelve el misterio del sufrimiento, pero revela a un Dios digno de confianza en medio de él.',
        purpose:'Explorar el misterio del sufrimiento del justo y llamar a confiar en la soberanía y sabiduría de Dios aun cuando no entendemos.',
        themes:['Sufrimiento del justo', 'Soberanía de Dios', 'Fe en la prueba', 'Limitaciones humanas', 'Confianza sin respuestas', 'Restauración'],
        keyVerse:{ ref:'Job 19:25', text:'Yo sé que mi Redentor vive, y al fin se levantará sobre el polvo.' },
        characters:[{ name:'Job', role:'Hombre justo que sufre', icon:'🙏' }, { name:'Elifaz, Bildad, Zofar', role:'Tres amigos', icon:'👥' }, { name:'Eliú', role:'Joven consejero', icon:'⭐' }, { name:'Satanás', role:'El acusador', icon:'⚠' }],
        teaching:'El sufrimiento no siempre es castigo por el pecado. Dios no siempre explica el "por qué", pero siempre es digno de confianza. La verdadera fe adora a Dios no por sus bendiciones sino por quién él es.',
        application:'Cuando sufrimos sin entender, podemos confiar en que Dios tiene un propósito mayor. No debemos juzgar el sufrimiento ajeno como castigo. Como Job, podemos ser honestos con Dios en nuestro dolor sin perder la fe.',
        curiosities:['Job es probablemente el libro más antiguo de la Biblia.', 'La declaración "yo sé que mi Redentor vive" anticipa la resurrección.', 'Dios nunca le explica a Job la razón de su sufrimiento.', 'Job fue restaurado al doble de lo que tenía antes de la prueba.'],
        timeline:[{ period:'Prosperidad', desc:'Job es justo y bendecido' }, { period:'Prueba', desc:'Pierde bienes, hijos y salud' }, { period:'Diálogos', desc:'Debate con sus amigos sobre el sufrimiento' }, { period:'Restauración', desc:'Dios habla; Job es restaurado' }],
      },
      { id:'ec', deep:{whatHappens:'Eclesiastés es la reflexión más honesta de la Biblia sobre el sentido de la vida. El Predicador (probablemente Salomón) examina todo lo que el ser humano persigue para hallar satisfacción —placer, riqueza, sabiduría, trabajo, logros— y concluye que todo es "vanidad", como un soplo o vapor que se desvanece, si se vive "debajo del sol", es decir, sin contar con Dios. Tras explorar la futilidad de la vida sin Dios, llega a la conclusión final: el deber del hombre es temer a Dios y guardar sus mandamientos, disfrutando como regalo lo que Él da.',context:{general:'Tradicionalmente atribuido a Salomón en sus últimos años (alrededor del 935 a.C.), reflexionando con la perspectiva de quien lo tuvo todo y buscó sentido en todo.',political:'Escrito durante el apogeo de Israel, cuando Salomón gozaba de riqueza, sabiduría y poder sin precedentes, lo que le permitió experimentar todo lo que la vida ofrece.',cultural:'Refleja la búsqueda universal de sentido que toda cultura comparte: ¿para qué vivimos? ¿qué hace que la vida valga la pena? Es sorprendentemente moderno y existencial.',spiritual:'El libro confronta la tentación de buscar satisfacción en cosas terrenales y muestra que solo una vida centrada en Dios tiene sentido duradero.'},godPurpose:'Dios revela, a través de la búsqueda honesta del Predicador, que nada en este mundo puede satisfacer plenamente el corazón humano fuera de Él. Pone "eternidad" en el corazón del hombre, un anhelo que solo Dios puede llenar.',godTeaching:'Dios quería enseñar que la vida sin Él es vacía y sin sentido, pero que con Él, incluso las cosas sencillas —comer, trabajar, las relaciones— se vuelven regalos para disfrutar. La conclusión es temer a Dios y obedecerle: ese es el sentido de la vida.',consequences:'Eclesiastés se convirtió en una de las reflexiones filosóficas más influyentes de la historia, dialogando con cada generación que busca sentido. Su honestidad sobre la futilidad de lo terrenal sigue confrontando el materialismo y apuntando a la necesidad de Dios.',practicalLessons:['Nada terrenal —dinero, placer, éxito— puede llenar el vacío del corazón; solo Dios puede.','Disfruta los regalos sencillos de la vida (el trabajo, la comida, las relaciones) como dádivas de Dios.','La vida es breve como un vapor; vívela con sabiduría y con la eternidad en mente.','El sentido último de la vida se resume en temer a Dios y guardar sus mandamientos.'],christConnection:'Eclesiastés expone el vacío de la vida "debajo del sol" —sin Dios— y crea un anhelo que solo Cristo puede satisfacer. El "afán" y la "vanidad" que describe son el resultado de la caída, que Cristo vino a redimir. Jesús ofrece precisamente lo que el Predicador no podía hallar: agua viva que sacia para siempre y vida abundante con sentido eterno. Donde Eclesiastés dice "todo es vanidad bajo el sol", el Evangelio responde con una vida "por encima del sol", en Cristo, que vence la futilidad con esperanza eterna.',keyVerses:[{ref:'Eclesiastés 3:1',text:'Todo tiene su tiempo, y todo lo que se quiere debajo del cielo tiene su hora.'},{ref:'Eclesiastés 3:11',text:'Todo lo hizo hermoso en su tiempo; y ha puesto eternidad en el corazón de ellos.'},{ref:'Eclesiastés 12:13',text:'El fin de todo el discurso oído es este: Teme a Dios, y guarda sus mandamientos; porque esto es el todo del hombre.'}],readingCall:'Eclesiastés habla directamente a quien se ha preguntado "¿de qué sirve todo esto?". Te invitamos a leer sus 12 capítulos con mente abierta. Es sorprendentemente actual y honesto sobre la búsqueda de sentido. Si has sentido el vacío de perseguir cosas que no satisfacen, este libro te guiará hacia lo único que realmente llena el corazón: una vida con Dios en el centro.'}, name:'Eclesiastés', abbr:'Ec', t:'AT', chapters:12,
        author:'Salomón ("el Predicador")', date:'~935 a.C.', genre:'Sabiduría',
        context:'Eclesiastés es la reflexión de un hombre que lo tuvo todo —sabiduría, riqueza, placer— y buscó el sentido de la vida "debajo del sol".',
        summary:'Eclesiastés explora la búsqueda del significado de la vida. El Predicador prueba todo: sabiduría, placer, trabajo, riqueza, y concluye que sin Dios todo es "vanidad", como correr tras el viento. La vida "debajo del sol" (sin perspectiva eterna) es vacía. Pero el libro culmina con la respuesta: "Teme a Dios y guarda sus mandamientos, porque esto es el todo del hombre". El verdadero sentido se encuentra solo en relación con el Creador.',
        purpose:'Mostrar la futilidad de buscar sentido en lo terrenal y dirigir al lector a encontrar propósito verdadero en temer y obedecer a Dios.',
        themes:['El sentido de la vida', 'Vanidad de lo terrenal', 'Temor de Dios', 'Tiempo y eternidad', 'Disfrutar los dones de Dios', 'Sabiduría'],
        keyVerse:{ ref:'Eclesiastés 12:13', text:'El fin de todo el discurso oído es este: Teme a Dios, y guarda sus mandamientos; porque esto es el todo del hombre.' },
        characters:[{ name:'El Predicador', role:'Salomón reflexionando', icon:'👑' }],
        teaching:'Sin Dios, todos los logros terrenales son vacíos. La vida solo cobra sentido cuando se vive en relación con el Creador. Hay un tiempo para todo, y debemos disfrutar los dones de Dios como regalos suyos.',
        application:'Buscar la felicidad en el dinero, el placer o el éxito siempre deja vacío. El verdadero propósito está en temer a Dios. Debemos disfrutar agradecidos el trabajo, la comida y las relaciones como dones de Dios.',
        curiosities:['El famoso pasaje "tiempo de nacer y tiempo de morir" (cap. 3) está aquí.', 'La palabra "vanidad" (hebel: vapor, soplo) aparece unas 38 veces.', 'La frase "debajo del sol" se repite para describir la vida sin perspectiva eterna.', 'Inspiró canciones, libros y reflexiones a lo largo de la historia.'],
        timeline:[{ period:'Búsqueda', desc:'El Predicador prueba placer, riqueza y sabiduría' }, { period:'Vanidad', desc:'Concluye que todo es vacío sin Dios' }, { period:'Reflexión', desc:'Observa el tiempo, la justicia y la muerte' }, { period:'Conclusión', desc:'Temer a Dios es el todo del hombre' }],
      },
      { id:'cnt', deep:{whatHappens:'Cantares es un hermoso poema de amor que celebra el amor conyugal entre un esposo y su esposa con lenguaje poético y apasionado. A través de un diálogo lírico entre la amada (la sulamita) y su amado, el libro exalta la belleza, la intimidad, el compromiso y el gozo del amor matrimonial como un regalo de Dios. A lo largo de la historia, también se ha leído como una alegoría del amor entre Dios y su pueblo, y entre Cristo y su iglesia.',context:{general:'Atribuido a Salomón (alrededor del 965 a.C.). Su título en hebreo, "Cantar de los Cantares", es un superlativo que significa "el más excelso de los cantos".',political:'Escrito durante el reinado próspero de Salomón, conocido por su sabiduría y por haber compuesto 1.005 cánticos, de los cuales este es el más sublime.',cultural:'En una cultura que a veces veía el cuerpo y la sexualidad con sospecha, Cantares celebra abiertamente el amor y la atracción dentro del matrimonio como algo bueno y dado por Dios.',spiritual:'El libro afirma que el amor romántico y la intimidad conyugal son creación de Dios y motivo de celebración, no de vergüenza, cuando se viven en el contexto del compromiso.'},godPurpose:'Dios revela que el amor conyugal, la atracción y la intimidad son regalos buenos de su creación, para ser disfrutados con gozo y fidelidad dentro del matrimonio. Eleva el amor humano como reflejo de un amor aún mayor.',godTeaching:'Dios quería enseñar que el amor entre esposos es puro, bello y digno de celebrarse; que el compromiso y la fidelidad son su fundamento; y que este amor humano apunta a algo más grande: el amor de Dios por su pueblo.',consequences:'Cantares dio a la tradición judía y cristiana un lenguaje para hablar del amor —tanto humano como divino— con belleza y profundidad. Ha enriquecido la comprensión del matrimonio como un don sagrado y ha servido como imagen del amor de Cristo por su iglesia.',practicalLessons:['El amor conyugal, la atracción y la intimidad son regalos de Dios para disfrutar dentro del matrimonio.','El verdadero amor se basa en el compromiso y la fidelidad: "fuerte es como la muerte el amor".','La belleza y el deseo no son algo de qué avergonzarse cuando se viven según el diseño de Dios.','El amor humano más hermoso es solo un reflejo del amor perfecto de Dios por nosotros.'],christConnection:'A lo largo de la historia, la iglesia ha visto en Cantares una imagen del amor entre Cristo (el esposo) y su iglesia (la esposa). El Nuevo Testamento usa repetidamente la imagen del matrimonio para describir esta relación: Cristo "amó a la iglesia, y se entregó a sí mismo por ella" (Efesios 5:25). El anhelo, la búsqueda y el gozo del amor en Cantares reflejan el amor apasionado de Cristo por su pueblo y la respuesta de amor que Él anhela de nosotros. La consumación de esta historia es "las bodas del Cordero" en Apocalipsis.',keyVerses:[{ref:'Cantares 8:6',text:'Porque fuerte es como la muerte el amor; duros como el Seol los celos; sus brasas, brasas de fuego, fuerte llama.'},{ref:'Cantares 8:7',text:'Las muchas aguas no podrán apagar el amor, ni lo ahogarán los ríos.'},{ref:'Cantares 2:4',text:'Me llevó a la casa del banquete, y su bandera sobre mí fue amor.'}],readingCall:'Cantares celebra el amor como pocos textos lo han hecho. Te invitamos a leer sus 8 capítulos y descubrir cómo Dios honra el amor conyugal como un regalo hermoso. Y al leerlo, recuerda que todo amor humano apunta a un amor mayor: el de Cristo por ti. Es un libro breve y poético, perfecto para reflexionar sobre el amor en su dimensión más pura y profunda.'}, name:'Cantar de los Cantares', abbr:'Cnt', t:'AT', chapters:8,
        author:'Salomón', date:'~965 a.C.', genre:'Poesía / Amor',
        context:'Cantares es un poema de amor que celebra el amor conyugal entre un esposo y su esposa, escrito con rica imaginería poética.',
        summary:'Cantar de los Cantares es un poema de amor que celebra la belleza del amor romántico y conyugal entre un hombre y una mujer. Con un lenguaje poético lleno de metáforas de la naturaleza, exalta la intimidad, el deseo y la fidelidad dentro del matrimonio como un regalo de Dios. Muchos lo han interpretado también como una alegoría del amor de Dios por su pueblo y de Cristo por su Iglesia. Es una afirmación bíblica de que el amor y la intimidad conyugal son hermosos y santos.',
        purpose:'Celebrar el amor conyugal como un don bueno de Dios y, en sentido más amplio, ilustrar la profundidad del amor entre Dios y su pueblo.',
        themes:['Amor conyugal', 'Belleza e intimidad', 'Fidelidad', 'El amor como don de Dios', 'Deseo dentro del pacto', 'Devoción mutua'],
        keyVerse:{ ref:'Cantares 8:6', text:'Ponme como un sello sobre tu corazón... porque fuerte es como la muerte el amor.' },
        characters:[{ name:'La Sulamita', role:'La amada', icon:'🌹' }, { name:'El amado', role:'El esposo', icon:'⭐' }],
        teaching:'El amor romántico y la intimidad conyugal son creación de Dios y son buenos cuando se viven dentro del pacto matrimonial. El amor verdadero es fuerte, exclusivo y digno de protección.',
        application:'Dios honra y celebra el amor entre esposos. La intimidad conyugal no es vergonzosa sino un regalo. El amor comprometido y fiel es algo que vale la pena cultivar y proteger.',
        curiosities:['Es uno de dos libros bíblicos que no mencionan directamente a Dios.', 'Muchos rabinos y padres de la iglesia lo leyeron como alegoría del amor divino.', 'Su título "Cantar de los Cantares" significa "el cántico supremo".', 'Salomón escribió 1.005 cantares; este es el más excelente.'],
        timeline:[{ period:'Encuentro', desc:'Los amantes expresan su atracción mutua' }, { period:'Noviazgo', desc:'Crece el deseo y la admiración' }, { period:'Unión', desc:'Celebración del amor conyugal' }, { period:'Madurez', desc:'El amor probado y fortalecido' }],
      },
      { id:'jer', deep:{whatHappens:'Jeremías, "el profeta llorón", advierte durante 40 años al reino de Judá sobre el juicio inminente si no se arrepiente de su idolatría y pecado. A pesar de su mensaje fiel, es rechazado, perseguido, encarcelado y arrojado a una cisterna. Ve cómo sus advertencias se cumplen cuando Babilonia destruye Jerusalén y el templo, y el pueblo es llevado al exilio. Sin embargo, en medio del juicio, Jeremías también anuncia esperanza: Dios promete un nuevo pacto, escrito en el corazón, y la restauración futura de su pueblo.',context:{general:'Jeremías profetizó desde aproximadamente el 627 al 580 a.C., durante los últimos años del reino de Judá, presenciando su caída ante Babilonia en 586 a.C.',political:'Judá era un pequeño reino atrapado entre las superpotencias de Egipto y Babilonia. Sus últimos reyes tomaron malas decisiones políticas y espirituales que llevaron a la destrucción.',cultural:'La sociedad estaba corrompida por la idolatría, la injusticia social y la falsa confianza en el templo. Los falsos profetas anunciaban paz cuando Jeremías advertía juicio.',spiritual:'El pueblo había abandonado a Dios, "fuente de aguas vivas", para cavarse "cisternas rotas". La religión se había vuelto externa y vacía. Jeremías llama a un arrepentimiento genuino del corazón.'},godPurpose:'Dios revela su dolor por el pecado de su pueblo y su justicia al disciplinarlo, pero también su amor inquebrantable y su plan de restauración. Anuncia el nuevo pacto, donde su ley estaría escrita en los corazones, no en tablas de piedra.',godTeaching:'Dios quería enseñar que el pecado persistente trae consecuencias, que la religión externa no sustituye un corazón entregado, y que su misericordia ofrece esperanza aun en medio del juicio. Su fidelidad permanece aunque su pueblo falle.',consequences:'Las profecías de Jeremías se cumplieron con la caída de Jerusalén, validando su ministerio. Su anuncio del nuevo pacto se cumplió en Cristo. Su ejemplo de fidelidad ante el rechazo ha inspirado a creyentes perseguidos en cada generación.',practicalLessons:['La fidelidad a Dios puede traer rechazo, pero vale más obedecer a Dios que agradar a los hombres.','La religión externa no basta; Dios quiere un corazón verdaderamente entregado a Él.','Aun en medio de la disciplina, Dios tiene "pensamientos de paz" y planes de esperanza para su pueblo.','Abandonar a Dios para buscar satisfacción en otras cosas es como cambiar una fuente de agua viva por cisternas rotas que no retienen agua.'],christConnection:'Jeremías anuncia el "nuevo pacto" (31:31-34) que Dios haría con su pueblo, escribiendo su ley en sus corazones y perdonando sus pecados. Jesús cumplió esta profecía en la última cena: "Esta copa es el nuevo pacto en mi sangre" (Lucas 22:20). El nuevo pacto, sellado por la sangre de Cristo, hace posible lo que la ley externa no podía: transformar el corazón por el Espíritu. Además, Jeremías, el profeta rechazado y afligido que lloraba por su pueblo, prefigura a Cristo, quien también lloró sobre Jerusalén y fue rechazado por los suyos.',keyVerses:[{ref:'Jeremías 29:11',text:'Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal, para daros el fin que esperáis.'},{ref:'Jeremías 31:33',text:'Daré mi ley en su mente, y la escribiré en su corazón; y yo seré a ellos por Dios, y ellos me serán por pueblo.'},{ref:'Jeremías 17:9',text:'Engañoso es el corazón más que todas las cosas, y perverso; ¿quién lo conocerá?'}],readingCall:'Jeremías es un testimonio conmovedor de fidelidad en medio del rechazo. Te invitamos a leer sus 52 capítulos, o al menos el capítulo 29 (los planes de Dios) y el 31 (el nuevo pacto). Si alguna vez has sentido que ser fiel a Dios te cuesta caro, el ejemplo de Jeremías te fortalecerá. Y descubrirás la promesa del nuevo pacto que se cumple en Cristo.'}, name:'Jeremías', abbr:'Jer', t:'AT', chapters:52,
        author:'Jeremías', date:'~627-580 a.C.', genre:'Profecía',
        context:'Jeremías, "el profeta llorón", profetizó durante los últimos y turbulentos años de Judá antes de la destrucción de Jerusalén por Babilonia.',
        summary:'Jeremías predicó durante 40 años un mensaje impopular: el juicio de Dios venía sobre Judá por su idolatría persistente. A pesar del rechazo, la prisión y la persecución, fue fiel. Su corazón se quebrantaba por su pueblo, por eso se le llama "el profeta llorón". Pero su mensaje no era solo de juicio: también anunció la esperanza del nuevo pacto, cuando Dios escribiría su ley en los corazones. Jeremías 29:11 sigue siendo una de las promesas más amadas de la Biblia.',
        purpose:'Advertir a Judá del juicio inminente por su idolatría y anunciar la esperanza futura del nuevo pacto que Dios establecería.',
        themes:['Juicio por la idolatría', 'Fidelidad ante el rechazo', 'El nuevo pacto', 'Esperanza y restauración', 'Llamado de Dios', 'Corazón quebrantado'],
        keyVerse:{ ref:'Jeremías 29:11', text:'Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal, para daros el fin que esperáis.' },
        characters:[{ name:'Jeremías', role:'Profeta fiel y sufriente', icon:'😢' }, { name:'Baruc', role:'Escriba de Jeremías', icon:'📜' }, { name:'Sedequías', role:'Último rey de Judá', icon:'👑' }],
        teaching:'La fidelidad a Dios a veces significa entregar un mensaje impopular y sufrir por ello. Pero aun en medio del juicio, Dios tiene planes de esperanza. El nuevo pacto, escrito en el corazón, se cumple en Cristo.',
        application:'Ser fiel a Dios puede costar rechazo, pero vale la pena. Las promesas de Dios (como 29:11) son ancla en tiempos difíciles, recordando que él tiene planes de bien. El cambio verdadero ocurre en el corazón.',
        curiosities:['Jeremías profetizó por 40 años sin ver casi ningún fruto visible.', 'Predijo que el exilio duraría exactamente 70 años, y se cumplió.', 'Es llamado "el profeta llorón" por su profundo dolor por su pueblo.', 'El nuevo pacto que anunció (31:31) se cumple en la obra de Cristo.'],
        timeline:[{ period:'627 a.C.', desc:'Jeremías es llamado siendo joven' }, { period:'Ministerio', desc:'40 años advirtiendo a Judá' }, { period:'586 a.C.', desc:'Cae Jerusalén, como había profetizado' }, { period:'Esperanza', desc:'Anuncia el nuevo pacto y la restauración' }],
      },
      { id:'lm', deep:{whatHappens:'Lamentaciones es un libro de cinco poemas de luto por la destrucción de Jerusalén a manos de Babilonia. Tradicionalmente atribuido a Jeremías, expresa con dolor desgarrador la devastación de la ciudad amada, el hambre, el sufrimiento del pueblo y el peso del juicio de Dios por el pecado. Sin embargo, en el centro mismo del libro y del dolor, brilla una de las declaraciones de esperanza más hermosas de la Biblia: "Por la misericordia de Jehová no hemos sido consumidos... nuevas son cada mañana; grande es tu fidelidad".',context:{general:'Escrito poco después de la caída de Jerusalén en 586 a.C., en medio de las ruinas humeantes de la ciudad y el trauma nacional del exilio.',political:'Babilonia había arrasado Jerusalén, destruido el templo de Salomón y llevado al pueblo cautivo. Era el colapso total de la nación.',cultural:'El lamento era una forma poética reconocida en el mundo antiguo para procesar el dolor colectivo. Los cinco poemas siguen estructuras acrósticas elaboradas.',spiritual:'El pueblo enfrentaba la realidad de que su sufrimiento era consecuencia de su pecado persistente. Pero el libro enseña a llevar el dolor a Dios y a hallar esperanza en su carácter.'},godPurpose:'Dios permite que su pueblo exprese su dolor con honestidad, y en medio del juicio revela que su misericordia nunca se agota. Muestra que el lamento y la esperanza pueden coexistir, y que su fidelidad permanece aun cuando todo se derrumba.',godTeaching:'Dios quería enseñar que el sufrimiento puede llevarse ante Él con sinceridad, que el pecado tiene consecuencias dolorosas, pero que su misericordia y fidelidad son la base inquebrantable de toda esperanza, renovándose cada mañana.',consequences:'Lamentaciones dio al pueblo de Dios un lenguaje para el duelo y enseñó que la fe puede sostenerse incluso en las pérdidas más devastadoras. Su afirmación de la fidelidad de Dios en medio del dolor ha consolado a innumerables creyentes en sus propias tragedias.',practicalLessons:['Está bien llevar tu dolor y tu lamento a Dios con honestidad; Él recibe nuestras lágrimas.','Aun en las pérdidas más profundas, las misericordias de Dios son nuevas cada mañana.','La fidelidad de Dios no depende de nuestras circunstancias; permanece firme cuando todo lo demás se derrumba.','La esperanza no niega el dolor, sino que coexiste con él: podemos llorar y confiar al mismo tiempo.'],christConnection:'Lamentaciones expresa el dolor del juicio sobre el pecado, un dolor que Cristo cargaría en la cruz. Jesús también lloró sobre Jerusalén (Lucas 19:41), compartiendo el corazón del profeta. La gran afirmación central —"nuevas son cada mañana sus misericordias"— halla su cumplimiento pleno en Cristo, cuya resurrección "cada mañana" nos recuerda que la misericordia de Dios triunfa sobre el juicio. En Cristo, el lamento se transforma finalmente en gozo, y la fidelidad de Dios queda demostrada para siempre.',keyVerses:[{ref:'Lamentaciones 3:22-23',text:'Por la misericordia de Jehová no hemos sido consumidos, porque nunca decayeron sus misericordias. Nuevas son cada mañana; grande es tu fidelidad.'},{ref:'Lamentaciones 3:25',text:'Bueno es Jehová a los que en él esperan, al alma que le busca.'}],readingCall:'Lamentaciones es para los momentos de dolor y pérdida. Te invitamos a leer sus 5 capítulos, especialmente el capítulo 3, donde en medio del lamento brilla la esperanza más hermosa: "grande es tu fidelidad". Si estás pasando por un duelo o una pérdida, este libro te enseñará que puedes llorar ante Dios y, al mismo tiempo, descansar en su misericordia que nunca falla.'}, name:'Lamentaciones', abbr:'Lm', t:'AT', chapters:5,
        author:'Jeremías', date:'~586 a.C.', genre:'Poesía / Lamento',
        context:'Lamentaciones es una serie de poemas de duelo escritos tras la destrucción de Jerusalén por Babilonia. Expresa el dolor del pueblo pero también su esperanza en la fidelidad de Dios.',
        summary:'Lamentaciones son cinco poemas de luto por la caída de Jerusalén. Jeremías llora la devastación de la ciudad, el sufrimiento del pueblo y las consecuencias del pecado. Es un libro de dolor crudo y honesto. Sin embargo, en el centro mismo del libro (cap. 3) brilla un destello de esperanza: "Por la misericordia de Jehová no hemos sido consumidos... nuevas son cada mañana". Enseña que el lamento honesto y la esperanza en Dios pueden coexistir.',
        purpose:'Dar voz al dolor del pueblo tras la catástrofe y, en medio del sufrimiento, reafirmar la fidelidad y misericordia inagotables de Dios.',
        themes:['Duelo y lamento', 'Consecuencias del pecado', 'Fidelidad de Dios', 'Esperanza en el dolor', 'Misericordia renovada', 'Honestidad ante Dios'],
        keyVerse:{ ref:'Lamentaciones 3:22-23', text:'Por la misericordia de Jehová no hemos sido consumidos, porque nunca decayeron sus misericordias. Nuevas son cada mañana; grande es tu fidelidad.' },
        characters:[{ name:'Jeremías', role:'El profeta que lamenta', icon:'😢' }],
        teaching:'El lamento es una forma legítima de oración. Dios no nos pide que ocultemos nuestro dolor, sino que lo llevemos a él. Aun en la peor catástrofe, las misericordias de Dios son nuevas cada mañana.',
        application:'Está bien llorar y lamentarse ante Dios en el sufrimiento. En medio del dolor más profundo, podemos aferrarnos a la fidelidad de Dios. Cada nuevo día trae nuevas misericordias.',
        curiosities:['Los capítulos 1, 2 y 4 son acrósticos siguiendo el alfabeto hebreo.', 'El capítulo 3, el centro, tiene 66 versículos y contiene el mayor mensaje de esperanza.', 'El himno "Grande es tu fidelidad" se inspira en este libro.', 'Tradicionalmente se lee en el día judío de duelo por la destrucción del Templo.'],
        timeline:[{ period:'586 a.C.', desc:'Babilonia destruye Jerusalén y el Templo' }, { period:'Lamento', desc:'Jeremías llora la devastación' }, { period:'Esperanza', desc:'Recuerda las misericordias de Dios' }, { period:'Oración', desc:'Clama por la restauración' }],
      },
      { id:'ez', deep:{whatHappens:'Ezequiel, sacerdote y profeta entre los exiliados en Babilonia, recibe visiones extraordinarias de la gloria de Dios y proclama mensajes a través de dramáticas acciones simbólicas. En la primera parte, anuncia el juicio sobre Jerusalén por su idolatría (la gloria de Dios abandona el templo). Tras la caída de la ciudad, su mensaje cambia a esperanza y restauración: la famosa visión del valle de los huesos secos que vuelven a la vida, la promesa de un corazón nuevo y un espíritu nuevo, y la visión de un templo futuro donde la gloria de Dios regresa para habitar con su pueblo para siempre.',context:{general:'Ezequiel profetizó desde aproximadamente el 593 al 571 a.C., entre los judíos ya exiliados en Babilonia, antes y después de la destrucción final de Jerusalén.',political:'El pueblo estaba cautivo en Babilonia, el imperio dominante. Muchos exiliados aún albergaban falsas esperanzas de un pronto regreso, que Ezequiel debía corregir.',cultural:'Los exiliados vivían en una tierra extraña, tentados a perder su identidad y su fe. Ezequiel usa visiones impactantes y actos simbólicos para captar su atención y comunicar el mensaje de Dios.',spiritual:'El pecado de idolatría había llegado hasta el templo mismo. Ezequiel muestra que la gloria de Dios se aparta por el pecado, pero promete que regresará para una restauración gloriosa.'},godPurpose:'Dios revela su santidad y soberanía sobre todas las naciones, su justicia al juzgar el pecado, y su determinación de restaurar a su pueblo dándole un corazón nuevo. El propósito recurrente es que "sabrán que yo soy Jehová".',godTeaching:'Dios quería enseñar que su gloria no puede coexistir con el pecado, que cada persona es responsable de sus propias decisiones, y que la verdadera transformación requiere un corazón nuevo que solo Él puede dar por su Espíritu.',consequences:'Las visiones de Ezequiel sobre el corazón nuevo y el Espíritu se cumplen en el nuevo pacto en Cristo. Su visión del valle de huesos secos ha dado esperanza de resurrección y avivamiento a generaciones. Su mensaje sostuvo la fe de los exiliados y preservó su identidad.',practicalLessons:['Dios es santo y soberano sobre toda la tierra; nuestra vida debe reconocer su señorío.','Cada persona es responsable ante Dios por sus propias decisiones, no por las de otros.','Solo Dios puede dar un "corazón nuevo": la verdadera transformación es obra suya, no esfuerzo propio.','Donde parece haber muerte y sequedad total, Dios puede traer vida y restauración, como en el valle de huesos secos.'],christConnection:'Ezequiel profetiza el corazón nuevo y el espíritu nuevo (36:26-27): "Quitaré de vuestra carne el corazón de piedra, y os daré un corazón de carne... pondré dentro de vosotros mi Espíritu". Esto se cumple en Cristo, quien por el Espíritu Santo regenera y transforma a los creyentes. Ezequiel también se presenta como "buen pastor" en contraste con los malos pastores de Israel (capítulo 34), prometiendo que Dios mismo pastorearía a su pueblo: profecía cumplida en Jesús, el Buen Pastor que da su vida por las ovejas. La visión de huesos secos que reviven anticipa la resurrección que Cristo trae.',keyVerses:[{ref:'Ezequiel 36:26',text:'Os daré corazón nuevo, y pondré espíritu nuevo dentro de vosotros; y quitaré de vuestra carne el corazón de piedra, y os daré un corazón de carne.'},{ref:'Ezequiel 37:5',text:'Así ha dicho Jehová el Señor a estos huesos: He aquí, yo hago entrar espíritu en vosotros, y viviréis.'},{ref:'Ezequiel 34:11',text:'He aquí yo, yo mismo iré a buscar mis ovejas, y las reconoceré.'}],readingCall:'Ezequiel es uno de los libros más visuales y poderosos de la Biblia. Te invitamos a leer sus 48 capítulos, o al menos los capítulos 36 y 37, donde Dios promete un corazón nuevo y muestra la visión de los huesos secos que vuelven a la vida. Si sientes que tu vida espiritual está seca o sin vida, este libro te recordará que Dios puede dar vida nueva a lo que parecía muerto.'}, name:'Ezequiel', abbr:'Ez', t:'AT', chapters:48,
        author:'Ezequiel', date:'~593-571 a.C.', genre:'Profecía',
        context:'Ezequiel profetizó entre los exiliados judíos en Babilonia, usando visiones dramáticas y actos simbólicos para comunicar el mensaje de Dios.',
        summary:'Ezequiel, sacerdote exiliado en Babilonia, recibió visiones extraordinarias de la gloria de Dios. Su mensaje tuvo dos fases: antes de la caída de Jerusalén anunció el juicio por la idolatría; después, ofreció esperanza de restauración. Sus famosas visiones incluyen la gloria de Dios sobre ruedas, el valle de los huesos secos que cobran vida (símbolo de la restauración de Israel) y el nuevo Templo. El gran tema es que "sabrán que yo soy Jehová", repetido más de 60 veces.',
        purpose:'Revelar la gloria y santidad de Dios, explicar el juicio del exilio y prometer la restauración futura mediante un corazón nuevo y el Espíritu de Dios.',
        themes:['Gloria de Dios', 'Juicio y restauración', 'Corazón nuevo', 'El Espíritu de Dios', 'Responsabilidad personal', 'Esperanza de resurrección'],
        keyVerse:{ ref:'Ezequiel 36:26', text:'Os daré corazón nuevo, y pondré espíritu nuevo dentro de vosotros; y quitaré de vuestra carne el corazón de piedra, y os daré un corazón de carne.' },
        characters:[{ name:'Ezequiel', role:'Profeta y sacerdote del exilio', icon:'📜' }],
        teaching:'Dios promete transformar el corazón humano de piedra en uno de carne, dando un espíritu nuevo. La visión del valle de huesos secos muestra que Dios puede dar vida a lo que parece muerto sin remedio. Cada persona es responsable ante Dios.',
        application:'Dios puede dar vida nueva a situaciones que parecen sin esperanza. La transformación verdadera es obra de Dios en el corazón, no esfuerzo humano. Somos responsables individualmente de nuestra relación con Dios.',
        curiosities:['La visión del valle de los huesos secos (cap. 37) es una de las más famosas de la Biblia.', 'Ezequiel realizó actos simbólicos dramáticos para ilustrar sus mensajes.', 'La frase "sabrán que yo soy Jehová" aparece más de 60 veces.', 'Los últimos capítulos describen un Templo futuro con detalle minucioso.'],
        timeline:[{ period:'593 a.C.', desc:'Ezequiel recibe su llamado en el exilio' }, { period:'Juicio', desc:'Anuncia la caída de Jerusalén' }, { period:'586 a.C.', desc:'Cae Jerusalén; cambia a mensaje de esperanza' }, { period:'Restauración', desc:'Visiones de huesos secos y nuevo Templo' }],
      },
      { id:'dn', deep:{whatHappens:'Daniel combina relatos de fidelidad y profecías sobre el futuro. En la primera parte, Daniel y sus amigos —jóvenes judíos exiliados en Babilonia— se mantienen fieles a Dios en medio de una cultura pagana: rehúsan contaminarse con la comida del rey, sobreviven al horno de fuego y al foso de los leones, e interpretan sueños que revelan el futuro de los imperios. En la segunda parte, Daniel recibe visiones proféticas sobre el surgimiento y caída de imperios mundiales y la venida final del reino eterno de Dios. Es un libro de fe inquebrantable y soberanía divina sobre la historia.',context:{general:'Ambientado durante el exilio babilónico (alrededor del 605-536 a.C.), abarcando los reinados de varios reyes de Babilonia y Persia. Daniel sirvió en las cortes reales por unos 70 años.',political:'Daniel vivió bajo los imperios babilónico y persa, sirviendo a reyes como Nabucodonosor, Belsasar, Darío y Ciro, llegando a ocupar altos cargos sin comprometer su fe.',cultural:'La presión para asimilarse a la cultura babilónica era enorme: nuevo nombre, nueva educación, nueva comida, nuevos dioses. Daniel y sus amigos mantuvieron su identidad y fe.',spiritual:'El libro fortalece la fe del pueblo de Dios en el exilio, mostrando que Dios reina soberanamente sobre todos los imperios y que vale la pena permanecer fiel sin importar el costo.'},godPurpose:'Dios revela su soberanía absoluta sobre la historia humana: Él levanta y derriba imperios, y su reino eterno finalmente prevalecerá sobre todos. Muestra que honra a quienes le son fieles y que tiene el control aun cuando su pueblo está en cautiverio.',godTeaching:'Dios quería enseñar a permanecer fieles en medio de una cultura hostil, a confiar en su soberanía sobre los acontecimientos mundiales, y a esperar con seguridad la venida de su reino eterno e indestructible.',consequences:'Daniel se convirtió en un libro fundamental de profecía y de fe bajo presión. Sus visiones sobre los imperios y el "Hijo del Hombre" influyeron profundamente en la expectativa mesiánica. Sus relatos de fidelidad han inspirado a creyentes perseguidos en cada época a no comprometer su fe.',practicalLessons:['Mantente fiel a Dios aun cuando la cultura te presione a comprometerte; la integridad tiene su recompensa.','Dios honra a quienes lo honran, aun en ambientes hostiles a la fe.','Dios es soberano sobre la historia: ningún imperio, líder ni circunstancia escapa a su control.','La oración constante, como la de Daniel tres veces al día, sostiene la fe en tiempos difíciles.'],christConnection:'Daniel tiene una de las profecías mesiánicas más asombrosas: la visión del "Hijo del Hombre" que viene en las nubes y recibe un reino eterno (7:13-14), título que Jesús usó constantemente para referirse a sí mismo. La profecía de las "setenta semanas" (capítulo 9) señala el tiempo de la venida del Mesías. La piedra que destruye los imperios y llena la tierra (capítulo 2) representa el reino eterno de Cristo. Además, la presencia divina en el horno de fuego ("uno semejante a hijo de los dioses") es vista por muchos como una aparición de Cristo antes de su encarnación.',keyVerses:[{ref:'Daniel 3:17-18',text:'He aquí nuestro Dios a quien servimos puede librarnos del horno de fuego ardiendo... Y si no, sepas, oh rey, que no serviremos a tus dioses.'},{ref:'Daniel 2:44',text:'El Dios del cielo levantará un reino que no será jamás destruido... permanecerá para siempre.'},{ref:'Daniel 7:13-14',text:'Vi en la visión de la noche, y he aquí con las nubes del cielo venía uno como un hijo de hombre... y le fue dado dominio, gloria y reino.'}],readingCall:'Daniel combina historias emocionantes de fe con profecías fascinantes sobre el plan de Dios para la historia. Te invitamos a leer sus 12 capítulos. Los primeros seis cuentan relatos inolvidables de fidelidad (el horno de fuego, el foso de los leones); los últimos seis revelan el futuro y la soberanía de Dios. Si necesitas valor para mantenerte firme en tu fe, el ejemplo de Daniel te inspirará.'}, name:'Daniel', abbr:'Dn', t:'AT', chapters:12,
        author:'Daniel', date:'~535 a.C.', genre:'Profecía / Apocalíptica',
        context:'Daniel fue llevado cautivo a Babilonia siendo joven y sirvió en las cortes de varios reyes, manteniendo su fe intacta en una cultura pagana.',
        summary:'Daniel combina relatos de fidelidad y profecías sobre el futuro. En la primera mitad, Daniel y sus amigos (Sadrac, Mesac y Abed-nego) se mantienen fieles a Dios bajo presión: el horno de fuego, el foso de los leones, la negativa a contaminarse. En la segunda mitad, Daniel recibe visiones proféticas sobre los imperios mundiales y el reino eterno de Dios. El libro demuestra que Dios es soberano sobre las naciones y que la fidelidad bajo presión es posible y recompensada.',
        purpose:'Mostrar la soberanía de Dios sobre la historia y los imperios, y animar a los creyentes a permanecer fieles bajo presión cultural y persecución.',
        themes:['Soberanía de Dios', 'Fidelidad bajo presión', 'Integridad', 'Profecía del futuro', 'El reino eterno', 'Protección divina'],
        keyVerse:{ ref:'Daniel 3:17', text:'He aquí nuestro Dios a quien servimos puede librarnos del horno de fuego ardiendo; y de tu mano, oh rey, nos librará.' },
        characters:[{ name:'Daniel', role:'Profeta fiel en Babilonia', icon:'🦁' }, { name:'Sadrac, Mesac, Abed-nego', role:'Tres amigos fieles', icon:'🔥' }, { name:'Nabucodonosor', role:'Rey de Babilonia', icon:'👑' }],
        teaching:'La fidelidad a Dios en un ambiente hostil es posible y honra a Dios. Aunque Dios puede librarnos del fuego, los tres jóvenes decidieron ser fieles "aun si no lo hace". Dios es soberano sobre todos los imperios humanos.',
        application:'Podemos mantener nuestra integridad y fe aun bajo presión cultural intensa. La fidelidad no depende de que Dios nos libre, sino de quién es él. Dios controla la historia aunque parezca caótica.',
        curiosities:['Daniel sirvió fielmente bajo cuatro reyes de dos imperios distintos.', 'Los tres jóvenes salieron del horno sin olor a humo.', 'Daniel pasó la noche entre leones hambrientos sin sufrir daño.', 'Sus profecías sobre los imperios mundiales son notablemente precisas.'],
        timeline:[{ period:'605 a.C.', desc:'Daniel es llevado cautivo a Babilonia' }, { period:'Pruebas', desc:'Fidelidad en el horno y el foso de leones' }, { period:'Visiones', desc:'Profecías sobre los imperios futuros' }, { period:'El reino', desc:'Anuncio del reino eterno de Dios' }],
      },
      { id:'os', deep:{whatHappens:'Oseas recibe de Dios una orden impactante: casarse con Gomer, una mujer que le sería infiel, para que su matrimonio fuera una parábola viviente del amor de Dios por su pueblo infiel. A pesar de los repetidos adulterios de Gomer, Dios le ordena a Oseas que la busque, la redima y la ame de nuevo. Así Dios ilustra su propio amor por Israel, que lo había abandonado por los ídolos. El libro alterna entre el dolor de Dios por la infidelidad de su pueblo y su asombrosa disposición a perdonar y restaurar.',context:{general:'Oseas profetizó al reino del norte (Israel) alrededor del 750-715 a.C., en los años previos a su destrucción por Asiria.',political:'Israel vivía una prosperidad superficial seguida de caos político: asesinatos de reyes, alianzas inestables y la creciente amenaza asiria que culminaría en la caída de Samaria en 722 a.C.',cultural:'El culto a Baal estaba extendido, mezclando la adoración a Dios con rituales paganos de fertilidad. La idolatría era vista por Dios como adulterio espiritual.',spiritual:'Israel había sido espiritualmente infiel a Dios, "prostituyéndose" tras otros dioses. Oseas confronta esta infidelidad pero revela el corazón quebrantado y amoroso de Dios que anhela restaurar.'},godPurpose:'Dios revela la profundidad de su amor leal (hesed) por un pueblo infiel. Muestra que, aunque el pecado lo hiere, su amor no se rinde: busca, redime y restaura a quienes lo han abandonado.',godTeaching:'Dios quería enseñar que la idolatría es como el adulterio: una traición al amor del pacto. Pero enseña sobre todo que su amor es más fuerte que nuestra infidelidad, y que siempre está dispuesto a perdonar al que vuelve a Él.',consequences:'Oseas dejó una de las imágenes más conmovedoras del amor de Dios en toda la Biblia. Su mensaje de amor redentor a pesar de la infidelidad anticipa el Evangelio. Pablo y Pedro citan a Oseas para mostrar cómo Dios llama "pueblo mío" a los que no eran su pueblo.',practicalLessons:['El amor de Dios por ti no depende de tu fidelidad; Él te busca aun cuando le has fallado.','El pecado, especialmente poner otras cosas antes que Dios, es una traición a su amor.','Por grande que sea tu caída, el camino de regreso a Dios siempre está abierto; Él anhela restaurarte.','El amor verdadero busca, perdona y restaura, aun cuando ha sido herido.'],christConnection:'Oseas es una de las imágenes más bellas del Evangelio en el Antiguo Testamento. Así como Oseas compró de nuevo a su esposa infiel para redimirla, Cristo nos redimió cuando éramos infieles y estábamos esclavizados al pecado, pagando el precio con su propia sangre. El amor que persigue de Oseas refleja el amor de Cristo, el esposo que "amó a la iglesia y se entregó a sí mismo por ella". La promesa de Oseas de llamar "pueblo mío" a los que no eran pueblo se cumple en Cristo, que reúne a judíos y gentiles en una sola familia.',keyVerses:[{ref:'Oseas 6:6',text:'Porque misericordia quiero, y no sacrificio, y conocimiento de Dios más que holocaustos.'},{ref:'Oseas 14:4',text:'Yo sanaré su rebelión, los amaré de pura gracia.'},{ref:'Oseas 11:4',text:'Con cuerdas humanas los atraje, con cuerdas de amor.'}],readingCall:'Oseas te mostrará cuán profundo es el amor de Dios por ti, aun cuando le fallas. Te invitamos a leer sus 14 capítulos y dejarte conmover por un Dios que persigue a su pueblo infiel con amor incansable. Si alguna vez has sentido que has fallado demasiado para ser amado por Dios, este libro es la respuesta: su amor te busca y te restaura.'}, name:'Oseas', abbr:'Os', t:'AT', chapters:14,
        author:'Oseas', date:'~750 a.C.', genre:'Profecía',
        context:'Oseas profetizó en el reino del norte (Israel) antes de su caída. Dios le pidió casarse con una mujer infiel como símbolo viviente de la relación de Israel con él.',
        summary:'Oseas vivió una de las profecías más conmovedoras: Dios le mandó casarse con Gomer, una mujer infiel, para ilustrar cómo Israel había sido infiel a Dios. A pesar de las repetidas traiciones, Oseas redime a su esposa, así como Dios sigue amando a su pueblo infiel. El libro retrata el corazón quebrantado pero fiel de Dios, que disciplina pero anhela restaurar. Es una de las imágenes más poderosas del amor incondicional de Dios.',
        purpose:'Revelar el amor fiel e inquebrantable de Dios hacia su pueblo infiel y llamar a Israel al arrepentimiento.',
        themes:['Amor fiel de Dios', 'Infidelidad espiritual', 'Arrepentimiento', 'Restauración', 'Misericordia sobre sacrificio', 'Disciplina amorosa'],
        keyVerse:{ ref:'Oseas 6:6', text:'Porque misericordia quiero, y no sacrificio, y conocimiento de Dios más que holocaustos.' },
        characters:[{ name:'Oseas', role:'Profeta del amor fiel', icon:'💔' }, { name:'Gomer', role:'Esposa infiel redimida', icon:'🌹' }],
        teaching:'El amor de Dios persiste incluso ante nuestra infidelidad. Dios desea relación y misericordia más que rituales vacíos. La idolatría es adulterio espiritual, pero la gracia de Dios siempre busca restaurar.',
        application:'El amor de Dios por nosotros no depende de nuestra fidelidad perfecta. Dios prefiere un corazón que lo conoce a rituales religiosos vacíos. Por más que fallemos, Dios sigue buscándonos.',
        curiosities:['Oseas vivió su mensaje al casarse con una mujer infiel por mandato de Dios.', 'Pablo cita a Oseas sobre la inclusión de los gentiles (Romanos 9:25).', 'Los nombres de sus hijos eran mensajes proféticos.', 'Es el primero de los 12 profetas menores.'],
        timeline:[{ period:'~750 a.C.', desc:'Oseas profetiza en el reino del norte' }, { period:'Matrimonio', desc:'Se casa con Gomer como símbolo' }, { period:'Mensaje', desc:'Llama a Israel al arrepentimiento' }, { period:'722 a.C.', desc:'Israel cae ante Asiria como advirtió' }],
      },
      { id:'jl', deep:{whatHappens:'Joel usa una devastadora plaga de langostas que asoló la tierra como advertencia y llamado al arrepentimiento. El profeta interpreta la catástrofe como una señal del venidero "día de Jehová", un tiempo de juicio. Llama al pueblo a un arrepentimiento genuino —"rasgad vuestro corazón, y no vuestros vestidos"—. Luego anuncia promesas gloriosas: la restauración de lo que las langostas devoraron y, sobre todo, el derramamiento del Espíritu de Dios sobre toda carne, profecía que se cumpliría en Pentecostés.',context:{general:'La fecha de Joel es incierta (posiblemente entre el 835 y el 500 a.C.). Profetizó al reino de Judá tras una plaga de langostas sin precedentes.',political:'El libro se enfoca menos en eventos políticos específicos y más en el llamado universal al arrepentimiento y el "día de Jehová".',cultural:'La agricultura era la base de la vida; una plaga de langostas significaba hambre y ruina económica total, un desastre que Joel usa como lección espiritual.',spiritual:'Joel llama a un arrepentimiento del corazón, no solo externo. Anuncia que Dios juzgará pero también restaurará y derramará su Espíritu sobre todos.'},godPurpose:'Dios usa la calamidad para llamar a su pueblo al arrepentimiento y revela su disposición a restaurar abundantemente a quienes vuelven a Él. Anuncia el derramamiento futuro de su Espíritu, inaugurando una nueva era.',godTeaching:'Dios quería enseñar que el arrepentimiento verdadero es del corazón, que Él es "tardo para la ira y grande en misericordia", y que puede restaurar incluso "los años que comió la langosta". Promete su Espíritu para todos.',consequences:'La profecía de Joel sobre el derramamiento del Espíritu se cumplió en el día de Pentecostés (Hechos 2), cuando Pedro la citó directamente. El libro conecta el arrepentimiento del Antiguo Testamento con la era del Espíritu en el Nuevo, marcando un puente profético clave.',practicalLessons:['Dios puede usar las crisis y pérdidas para llamarnos de regreso a Él.','El arrepentimiento verdadero es del corazón, no solo de apariencia: "rasgad vuestro corazón".','Dios es capaz de restaurar lo que parecía perdido para siempre: "os restituiré los años".','Dios ha derramado su Espíritu sobre todos los que creen, sin importar edad, género o condición.'],christConnection:'La gran profecía de Joel —"derramaré mi Espíritu sobre toda carne" (2:28)— se cumplió en Pentecostés, cuando el Espíritu Santo descendió sobre los creyentes tras la resurrección y ascensión de Cristo. Pedro citó textualmente a Joel para explicar lo que ocurría (Hechos 2:16-21). Así, Joel anticipa la era del Espíritu inaugurada por Cristo. Además, su promesa de que "todo aquel que invocare el nombre de Jehová será salvo" (2:32) es citada por Pablo en Romanos 10:13 aplicándola a la salvación en Cristo.',keyVerses:[{ref:'Joel 2:13',text:'Rasgad vuestro corazón, y no vuestros vestidos, y convertíos a Jehová vuestro Dios; porque misericordioso es y clemente.'},{ref:'Joel 2:28',text:'Y después de esto derramaré mi Espíritu sobre toda carne, y profetizarán vuestros hijos y vuestras hijas.'},{ref:'Joel 2:25',text:'Y os restituiré los años que comió la oruga, el saltón, el revoltón y la langosta.'}],readingCall:'Joel es breve pero poderoso, con una de las promesas más grandes de la Biblia. Te invitamos a leer sus 3 capítulos. Verás cómo Dios llama al arrepentimiento del corazón y promete restaurar y derramar su Espíritu. Si sientes que has perdido años a causa de errores o calamidades, la promesa de Joel de restaurar "los años que comió la langosta" te dará esperanza.'}, name:'Joel', abbr:'Jl', t:'AT', chapters:3,
        author:'Joel', date:'~835 a.C.', genre:'Profecía',
        context:'Joel usa una plaga de langostas devastadora como ocasión para llamar al pueblo al arrepentimiento y anunciar el "día de Jehová".',
        summary:'Joel comienza con una plaga de langostas que arrasa la tierra, y la usa como imagen del juicio venidero, el "día de Jehová". Llama urgentemente al arrepentimiento sincero: "rasgad vuestro corazón, y no vuestros vestidos". Pero el libro también contiene una de las promesas más gloriosas: el derramamiento del Espíritu Santo sobre toda carne, que Pedro citó en Pentecostés (Hechos 2). Joel une el juicio con la esperanza de restauración y bendición.',
        purpose:'Llamar al arrepentimiento ante el juicio de Dios y anunciar la futura efusión del Espíritu Santo sobre todo el pueblo.',
        themes:['El día de Jehová', 'Arrepentimiento', 'Derramamiento del Espíritu', 'Juicio y restauración', 'Misericordia de Dios', 'Bendición futura'],
        keyVerse:{ ref:'Joel 2:28', text:'Y después de esto derramaré mi Espíritu sobre toda carne, y profetizarán vuestros hijos y vuestras hijas.' },
        characters:[{ name:'Joel', role:'Profeta del día de Jehová', icon:'📜' }],
        teaching:'El arrepentimiento verdadero es del corazón, no solo externo. El "día de Jehová" trae juicio pero también restauración para los que se vuelven a él. La promesa del Espíritu se cumplió en Pentecostés.',
        application:'Las crisis pueden ser llamados de Dios al arrepentimiento. Dios busca corazones rasgados, no solo apariencias. La promesa del Espíritu es para todos los que invocan al Señor.',
        curiosities:['Pedro citó a Joel 2 en el sermón de Pentecostés (Hechos 2:16-21).', 'La promesa del Espíritu es "sobre toda carne": hombres y mujeres, jóvenes y viejos.', 'La plaga de langostas se describe con detalle militar impresionante.', '"El que invocare el nombre de Jehová será salvo" (2:32) es citado por Pablo.'],
        timeline:[{ period:'Plaga', desc:'Langostas devastan la tierra' }, { period:'Llamado', desc:'Joel convoca al arrepentimiento' }, { period:'Promesa', desc:'Anuncia el derramamiento del Espíritu' }, { period:'Pentecostés', desc:'La promesa se cumple siglos después' }],
      },
      { id:'am', deep:{whatHappens:'Amós, un humilde pastor y cultivador de higos, es llamado por Dios para confrontar la injusticia social y la religiosidad hipócrita del próspero reino del norte. Con valentía denuncia a los ricos que oprimen a los pobres, pervierten la justicia y viven en lujo mientras ignoran al necesitado, todo mientras mantienen una apariencia de devoción religiosa. Amós proclama que Dios desprecia la adoración vacía que no va acompañada de justicia, y anuncia juicio. Pero termina con una promesa de restauración futura.',context:{general:'Amós profetizó alrededor del 760-750 a.C., durante un período de gran prosperidad económica en el reino del norte bajo Jeroboam II, poco antes de su caída.',political:'Israel disfrutaba de paz y riqueza, pero esta prosperidad benefició solo a una élite que oprimía a los pobres. La caída ante Asiria estaba cerca.',cultural:'Una brecha enorme separaba a ricos y pobres. Los poderosos acumulaban lujos, sobornaban jueces y explotaban a los necesitados, mientras mantenían rituales religiosos.',spiritual:'La religión se había vuelto un espectáculo externo divorciado de la justicia y la rectitud. Amós declara que Dios aborrece esa adoración hipócrita.'},godPurpose:'Dios revela que le importa profundamente la justicia social y que la verdadera adoración debe expresarse en un trato justo hacia los demás. Muestra que es Señor de todas las naciones y que juzgará la opresión y la hipocresía.',godTeaching:'Dios quería enseñar que la religiosidad sin justicia es ofensiva para Él, que defiende al pobre y al oprimido, y que la verdadera fe se demuestra en cómo tratamos a los demás, no solo en rituales.',consequences:'Amós se convirtió en la voz profética por excelencia sobre la justicia social. Su llamado a que "corra el juicio como las aguas, y la justicia como impetuoso arroyo" ha inspirado movimientos por la justicia a lo largo de la historia, recordando que la fe genuina y la justicia son inseparables.',practicalLessons:['A Dios le importa cómo tratas a los pobres y vulnerables; la justicia social es parte de la verdadera fe.','La adoración y los rituales religiosos no valen nada si tu vida está llena de injusticia.','La prosperidad material puede cegarnos a las necesidades de los demás y a Dios mismo.','La verdadera fe produce justicia y rectitud en cómo vivimos y tratamos a otros.'],christConnection:'Amós clama por justicia para los oprimidos, anticipando el ministerio de Cristo, quien vino a "predicar buenas nuevas a los pobres" y a defender a los marginados. Jesús confrontó la misma religiosidad hipócrita que Amós denunció, declarando que Dios desea misericordia y no solo sacrificio. La promesa final de Amós de restaurar "el tabernáculo caído de David" (9:11) es citada en Hechos 15 como cumplida en Cristo, quien restaura el reino y reúne a todas las naciones bajo su señorío.',keyVerses:[{ref:'Amós 5:24',text:'Pero corra el juicio como las aguas, y la justicia como impetuoso arroyo.'},{ref:'Amós 5:14',text:'Buscad lo bueno, y no lo malo, para que viváis; porque así Jehová Dios de los ejércitos estará con vosotros.'}],readingCall:'Amós es la voz de Dios a favor de la justicia y contra la hipocresía religiosa. Te invitamos a leer sus 9 capítulos. Su mensaje es sorprendentemente actual: Dios se interesa por cómo tratamos a los demás, especialmente a los más vulnerables. Si quieres entender que la verdadera fe se vive en justicia y compasión, este libro te desafiará y transformará.'}, name:'Amós', abbr:'Am', t:'AT', chapters:9,
        author:'Amós', date:'~760 a.C.', genre:'Profecía',
        context:'Amós, un pastor de Tecoa, fue llamado a profetizar contra la injusticia social y la religiosidad hipócrita del próspero reino del norte.',
        summary:'Amós era un pastor común que Dios llamó para confrontar la injusticia social de Israel. En una época de prosperidad, los ricos oprimían a los pobres mientras mantenían una religiosidad externa. Amós denunció con fuerza esta hipocresía: Dios desprecia el culto cuando va acompañado de injusticia. Su mensaje central clama por justicia social: "corra el juicio como las aguas, y la justicia como impetuoso arroyo". Es el profeta de la justicia social por excelencia.',
        purpose:'Denunciar la injusticia social y la religiosidad hipócrita, llamando al pueblo a practicar la justicia y la rectitud verdaderas.',
        themes:['Justicia social', 'Hipocresía religiosa', 'Juicio de Dios', 'Cuidado de los pobres', 'Rectitud verdadera', 'Responsabilidad'],
        keyVerse:{ ref:'Amós 5:24', text:'Pero corra el juicio como las aguas, y la justicia como impetuoso arroyo.' },
        characters:[{ name:'Amós', role:'Pastor y profeta de la justicia', icon:'🐑' }, { name:'Amasías', role:'Sacerdote que lo confrontó', icon:'⚠' }],
        teaching:'Dios se preocupa profundamente por la justicia social y el trato a los pobres. El culto religioso sin justicia es ofensivo para Dios. La verdadera espiritualidad se demuestra en cómo tratamos a los vulnerables.',
        application:'No podemos separar la fe de la justicia. Dios rechaza la religiosidad que ignora a los necesitados. Defender a los oprimidos es parte esencial de seguir a Dios.',
        curiosities:['Amós era pastor y cultivador de higos, no profeta de profesión.', 'Martin Luther King Jr. citó Amós 5:24 en sus discursos.', 'Denunció a las naciones vecinas antes de confrontar a Israel.', 'Usó imágenes de su vida rural para sus profecías.'],
        timeline:[{ period:'~760 a.C.', desc:'Amós profetiza en tiempos de prosperidad' }, { period:'Denuncia', desc:'Confronta la injusticia y la hipocresía' }, { period:'Conflicto', desc:'Es rechazado por el sacerdote Amasías' }, { period:'Esperanza', desc:'Promete restauración futura' }],
      },
      { id:'ab', deep:{whatHappens:'Abdías, el libro más corto del Antiguo Testamento, pronuncia juicio contra Edom, la nación descendiente de Esaú, por su orgullo y por su crueldad hacia su pueblo hermano Israel. Cuando Jerusalén fue atacada, los edomitas no solo se alegraron, sino que ayudaron a los invasores y capturaron a los que huían. Dios declara que el orgullo de Edom lo llevaría a la ruina, mientras que el pueblo de Dios sería restaurado. El libro afirma que Dios juzga a las naciones por cómo tratan a su pueblo, y que "el reino será de Jehová".',context:{general:'Probablemente escrito poco después de la caída de Jerusalén en 586 a.C. Es el libro más breve del Antiguo Testamento, con un solo capítulo.',political:'Edom, vecino del sur de Judá, tenía una larga rivalidad con Israel (los descendientes de Esaú y Jacob). Aprovechó la caída de Jerusalén para saquear y traicionar.',cultural:'Edom se sentía seguro en sus fortalezas rocosas (la región de Petra), confiado en su sabiduría y posición inexpugnable, lo que alimentaba su orgullo.',spiritual:'El libro confronta el pecado del orgullo y de regocijarse en la desgracia ajena, especialmente del pueblo de Dios, y afirma la justicia soberana de Dios sobre las naciones.'},godPurpose:'Dios revela que juzga el orgullo y la crueldad, especialmente contra su pueblo, y que ninguna fortaleza humana puede proteger a quien se enaltece contra Él. Afirma que su reino y su justicia finalmente prevalecerán.',godTeaching:'Dios quería enseñar que el orgullo precede a la caída, que regocijarse en la desgracia ajena es pecado, y que Él defiende a su pueblo y juzga a quienes lo maltratan. "Como tú hiciste, se hará contigo".',consequences:'Edom desapareció de la historia, cumpliendo la profecía de Abdías, mientras que el pueblo de Dios fue restaurado. El libro permanece como advertencia contra el orgullo y como afirmación de que Dios tiene la última palabra sobre las naciones y la historia.',practicalLessons:['El orgullo y la autosuficiencia llevan a la ruina; "la soberbia de tu corazón te ha engañado".','Regocijarse en la desgracia de otros, especialmente de los vulnerables, es algo que Dios juzga.','Ninguna fortaleza, riqueza o posición puede protegerte si te enalteces contra Dios.','Dios defiende a su pueblo y, al final, su justicia y su reino prevalecerán sobre todo mal.'],christConnection:'Abdías termina con la promesa de que "el reino será de Jehová" (v. 21), apuntando al reino eterno de Cristo, que finalmente reinará sobre todas las naciones. El juicio sobre el orgullo de Edom prefigura el juicio final que Cristo ejecutará sobre todo lo que se levanta contra Dios. Y la liberación prometida en el monte de Sion anticipa la salvación que viene a través de Cristo, quien establece el reino de Dios y reúne a su pueblo redimido.',keyVerses:[{ref:'Abdías 1:3',text:'La soberbia de tu corazón te ha engañado, tú que moras en las hendiduras de las peñas, en tu altísima morada.'},{ref:'Abdías 1:15',text:'Como tú hiciste se hará contigo; tu galardón volverá sobre tu cabeza.'}],readingCall:'Abdías es brevísimo —puedes leerlo en cinco minutos— pero su mensaje es poderoso. Te invitamos a leer su único capítulo. Es una advertencia contra el orgullo y una afirmación de que Dios defiende a los suyos y reina sobre la historia. Si alguna vez te has sentido tratado injustamente, este libro te recuerda que Dios ve, juzga y tiene la última palabra.'}, name:'Abdías', abbr:'Abd', t:'AT', chapters:1,
        author:'Abdías', date:'~586 a.C.', genre:'Profecía',
        context:'El libro más corto del AT, Abdías es una profecía contra Edom, la nación descendiente de Esaú, por su orgullo y crueldad contra Israel.',
        summary:'Abdías, con un solo capítulo, pronuncia juicio sobre Edom, nación que descendía de Esaú, hermano de Jacob. Cuando Jerusalén fue atacada, los edomitas no solo se alegraron sino que participaron en el saqueo y entregaron a los fugitivos. Dios condena su orgullo ("la soberbia de tu corazón te ha engañado") y anuncia su destrucción. El libro enseña que Dios juzga el orgullo y la crueldad, y que "el reino será de Jehová".',
        purpose:'Anunciar el juicio de Dios sobre Edom por su orgullo y crueldad, y afirmar que el reino finalmente pertenece a Dios.',
        themes:['Juicio sobre el orgullo', 'Justicia divina', 'Consecuencias de la crueldad', 'El día de Jehová', 'Soberanía de Dios', 'Restauración de Israel'],
        keyVerse:{ ref:'Abdías 1:15', text:'Porque cercano está el día de Jehová sobre todas las naciones; como tú hiciste se hará contigo; tu galardón volverá sobre tu cabeza.' },
        characters:[{ name:'Abdías', role:'Profeta contra Edom', icon:'📜' }],
        teaching:'El orgullo precede a la caída. Dios juzga a quienes se alegran de la desgracia ajena y abusan de los débiles. "Como hiciste, se te hará": cosechamos lo que sembramos.',
        application:'El orgullo nos engaña haciéndonos creer invencibles. No debemos alegrarnos del mal ajeno. Dios ve la injusticia y la juzga a su tiempo.',
        curiosities:['Es el libro más corto del Antiguo Testamento (21 versículos).', 'Edom descendía de Esaú; el conflicto se remonta a Jacob y Esaú.', 'La fortaleza de Petra estaba en territorio edomita.', 'Edom desapareció de la historia, cumpliendo la profecía.'],
        timeline:[{ period:'Conflicto antiguo', desc:'Rivalidad desde Jacob y Esaú' }, { period:'586 a.C.', desc:'Edom participa en la caída de Jerusalén' }, { period:'Juicio', desc:'Abdías anuncia la ruina de Edom' }, { period:'Cumplimiento', desc:'Edom desaparece de la historia' }],
      },
      { id:'jon', deep:{whatHappens:'Jonás es llamado por Dios a predicar a Nínive, la capital del cruel imperio asirio, enemigo de Israel. En lugar de obedecer, Jonás huye en barco en dirección contraria. Dios envía una tormenta, Jonás es arrojado al mar y un gran pez lo traga, donde pasa tres días y tres noches. Tras orar y ser liberado, Jonás finalmente predica en Nínive, y para su disgusto, toda la ciudad se arrepiente y Dios la perdona. El libro termina con Dios enseñando a Jonás —y a nosotros— sobre su compasión, que se extiende incluso a los enemigos.',context:{general:'Jonás vivió alrededor del 780 a.C., durante el reinado de Jeroboam II. Nínive era la capital del temido imperio asirio.',political:'Asiria era el enemigo más brutal de Israel, conocido por su crueldad. Que Dios quisiera salvar a Nínive era impensable y ofensivo para un israelita como Jonás.',cultural:'El nacionalismo y el odio hacia los enemigos eran profundos. Jonás representaba la actitud de muchos: deseaba el juicio de Asiria, no su salvación.',spiritual:'El libro confronta el corazón estrecho y nacionalista del pueblo de Dios, revelando que la compasión de Dios se extiende a todas las naciones, incluso a los enemigos.'},godPurpose:'Dios revela que su amor y compasión no tienen fronteras: alcanza incluso a los enemigos más crueles cuando se arrepienten. Muestra su soberanía sobre la naturaleza y su paciencia tanto con los paganos como con su profeta rebelde.',godTeaching:'Dios quería enseñar que su misericordia es para todos los pueblos, no solo para Israel, y que debemos compartir su corazón compasivo en lugar de desear el mal de otros. También enseña que no se puede huir del llamado de Dios.',consequences:'Jonás se convirtió en un poderoso recordatorio de la misión universal de Dios, anticipando la Gran Comisión de llevar el Evangelio a todas las naciones. Jesús mismo usó la señal de Jonás como figura de su muerte y resurrección, dándole un significado profético central.',practicalLessons:['No puedes huir de Dios ni de su llamado; Él te encontrará dondequiera que vayas.','La compasión de Dios alcanza incluso a quienes consideramos enemigos; debemos compartir su corazón.','Dios da segundas oportunidades: llamó a Jonás de nuevo tras su desobediencia.','El arrepentimiento genuino, aun de los más perdidos, mueve la misericordia de Dios.'],christConnection:'Jesús mismo señaló a Jonás como una figura profética de su propia muerte y resurrección: "Como estuvo Jonás en el vientre del gran pez tres días y tres noches, así estará el Hijo del Hombre en el corazón de la tierra tres días y tres noches" (Mateo 12:40). Así como Jonás "resucitó" del pez para traer salvación a los gentiles de Nínive, Cristo resucitó para traer salvación a todas las naciones. La compasión de Dios por Nínive anticipa el Evangelio que alcanza al mundo entero a través de Cristo.',keyVerses:[{ref:'Jonás 2:9',text:'La salvación es de Jehová.'},{ref:'Jonás 4:2',text:'Porque sabía yo que tú eres Dios clemente y piadoso, tardo en enojarte, y de grande misericordia.'}],readingCall:'Jonás es una de las historias más conocidas y a la vez más profundas de la Biblia. Te invitamos a leer sus 4 capítulos de una sentada. Más allá del gran pez, descubrirás un mensaje conmovedor sobre la compasión de Dios que alcanza a todos. Si alguna vez has huido de lo que Dios te pide, o has luchado por amar a quien consideras enemigo, este libro te hablará directamente.'}, name:'Jonás', abbr:'Jon', t:'AT', chapters:4,
        author:'Jonás (o anónimo)', date:'~760 a.C.', genre:'Profecía / Narrativa',
        context:'Jonás narra la historia de un profeta que huyó del llamado de Dios a predicar a Nínive, la capital enemiga de Asiria.',
        summary:'Jonás es una historia sobre la misericordia de Dios y la resistencia humana. Dios llamó a Jonás a predicar en Nínive, ciudad enemiga, pero Jonás huyó en barco. Tras una tormenta, fue tragado por un gran pez y, tres días después, vomitado en tierra. Finalmente predicó, y toda Nínive se arrepintió, lo que enojó a Jonás, que quería el juicio sobre sus enemigos. El libro revela que la misericordia de Dios alcanza incluso a nuestros enemigos, y desafía nuestro corazón estrecho.',
        purpose:'Mostrar la amplitud de la misericordia de Dios que alcanza a todas las naciones, y confrontar el corazón cerrado de quienes no quieren extenderla.',
        themes:['Misericordia universal', 'Obediencia y huida', 'Arrepentimiento', 'Segunda oportunidad', 'Compasión de Dios', 'Amor a los enemigos'],
        keyVerse:{ ref:'Jonás 2:9', text:'La salvación es de Jehová.' },
        characters:[{ name:'Jonás', role:'Profeta reacio', icon:'🐋' }, { name:'Los ninivitas', role:'Pueblo arrepentido', icon:'🏛' }],
        teaching:'La misericordia de Dios no tiene fronteras: alcanza incluso a nuestros peores enemigos. Dios persigue a los que huyen de él. Nuestro corazón debe alinearse con la compasión de Dios, no con nuestros prejuicios.',
        application:'No podemos huir del llamado de Dios. Su misericordia es para todos, incluso para los que consideramos indignos. Debemos examinar si tenemos compasión por quienes no la merecen, como Dios la tiene por nosotros.',
        curiosities:['Jesús comparó su sepultura de 3 días con Jonás en el pez (Mateo 12:40).', 'Nínive fue la ciudad que más rápido se arrepintió en toda la Biblia.', 'El libro termina con una pregunta de Dios, sin respuesta de Jonás.', 'Es una de las historias más conocidas y debatidas de la Biblia.'],
        timeline:[{ period:'Llamado', desc:'Dios envía a Jonás a Nínive' }, { period:'Huida', desc:'Jonás escapa en barco' }, { period:'El pez', desc:'Es tragado y luego liberado' }, { period:'Nínive', desc:'La ciudad se arrepiente; Jonás se enoja' }],
      },
      { id:'miq', deep:{whatHappens:'Miqueas, profeta contemporáneo de Isaías, denuncia la corrupción de líderes, sacerdotes y profetas que explotan al pueblo, y anuncia juicio sobre Israel y Judá. Pero entrelaza sus advertencias con promesas extraordinarias de esperanza: profetiza que el Mesías nacería en Belén, anuncia un futuro de paz universal donde las espadas se convertirán en arados, y resume de manera inolvidable lo que Dios pide de nosotros: "hacer justicia, amar misericordia y humillarte ante tu Dios". Termina celebrando el perdón incomparable de Dios que "echa en lo profundo del mar todos nuestros pecados".',context:{general:'Miqueas profetizó alrededor del 740-700 a.C., contemporáneo de Isaías, dirigiéndose tanto al reino del norte como al del sur antes de la caída de Samaria.',political:'Era una época de inestabilidad ante la amenaza asiria. Los líderes y jueces eran corruptos, y los poderosos despojaban a los campesinos de sus tierras.',cultural:'Existía una gran injusticia: los ricos y poderosos explotaban a los pobres, los profetas profetizaban por dinero y los sacerdotes enseñaban por precio.',spiritual:'La religión se había corrompido y separado de la ética. Miqueas llama a una fe auténtica que se exprese en justicia, misericordia y humildad ante Dios.'},godPurpose:'Dios revela lo que verdaderamente desea de su pueblo: no rituales elaborados, sino justicia, misericordia y humildad. Anuncia juicio sobre la corrupción, pero promete al Mesías y un futuro de paz y restauración.',godTeaching:'Dios quería enseñar que la verdadera religión se resume en hacer justicia, amar la misericordia y caminar humildemente con Él. Enseña que su perdón es completo y que tiene un plan de redención a través del Mesías de Belén.',consequences:'La profecía de Miqueas sobre Belén se cumplió literalmente en el nacimiento de Jesús; los sabios la citaron a Herodes. Su síntesis de la verdadera religión (6:8) se convirtió en uno de los versículos más amados de la Biblia, definiendo la fe auténtica para todas las generaciones.',practicalLessons:['Lo que Dios pide de ti se resume en: hacer justicia, amar la misericordia y caminar humildemente con Él.','La verdadera fe no son rituales externos, sino una vida de rectitud, compasión y humildad.','Dios juzga la corrupción y la explotación, especialmente cuando viene de líderes y religiosos.','El perdón de Dios es total: Él "sepulta nuestras iniquidades y echa en lo profundo del mar todos nuestros pecados".'],christConnection:'Miqueas contiene una de las profecías mesiánicas más precisas: "Pero tú, Belén Efrata... de ti me saldrá el que será Señor en Israel; y sus salidas son desde el principio, desde los días de la eternidad" (5:2). Esta profecía, hecha 700 años antes, predijo exactamente el lugar de nacimiento de Jesús y afirmó su existencia eterna y divina. Los principales sacerdotes la citaron cuando los magos buscaban al rey nacido (Mateo 2:5-6). Miqueas también anticipa el reino de paz universal que Cristo establecerá.',keyVerses:[{ref:'Miqueas 6:8',text:'Oh hombre, él te ha declarado lo que es bueno, y qué pide Jehová de ti: solamente hacer justicia, y amar misericordia, y humillarte ante tu Dios.'},{ref:'Miqueas 5:2',text:'Pero tú, Belén Efrata, pequeña para estar entre las familias de Judá, de ti me saldrá el que será Señor en Israel.'},{ref:'Miqueas 7:19',text:'El volverá a tener misericordia de nosotros; sepultará nuestras iniquidades, y echará en lo profundo del mar todos nuestros pecados.'}],readingCall:'Miqueas combina denuncia valiente con esperanza gloriosa y una de las profecías más asombrosas sobre Cristo. Te invitamos a leer sus 7 capítulos. No te pierdas el versículo 6:8, el mejor resumen de lo que Dios desea de ti, ni la profecía de Belén en el capítulo 5. Verás cómo Dios une justicia, misericordia y la promesa del Salvador.'}, name:'Miqueas', abbr:'Miq', t:'AT', chapters:7,
        author:'Miqueas', date:'~735-700 a.C.', genre:'Profecía',
        context:'Miqueas, contemporáneo de Isaías, denunció la corrupción de líderes y profetas, pero también anunció la venida del Mesías en Belén.',
        summary:'Miqueas alternó mensajes de juicio y esperanza. Denunció la corrupción de jueces, sacerdotes y profetas que oprimían al pueblo. Pero también dio una de las profecías mesiánicas más precisas: el Mesías nacería en Belén (5:2), cumplida en Jesús. El libro resume bellamente lo que Dios espera de nosotros: "hacer justicia, amar misericordia y humillarte ante tu Dios" (6:8), uno de los versículos más completos sobre la vida que agrada a Dios.',
        purpose:'Denunciar la injusticia y la corrupción, anunciar al Mesías de Belén y resumir lo que Dios requiere de su pueblo.',
        themes:['Justicia y misericordia', 'Profecía mesiánica', 'Humildad ante Dios', 'Juicio a los corruptos', 'Esperanza', 'Lo que Dios requiere'],
        keyVerse:{ ref:'Miqueas 6:8', text:'Oh hombre, él te ha declarado lo que es bueno, y qué pide Jehová de ti: solamente hacer justicia, y amar misericordia, y humillarte ante tu Dios.' },
        characters:[{ name:'Miqueas', role:'Profeta de justicia y esperanza', icon:'📜' }],
        teaching:'Dios resume sus expectativas en tres cosas: justicia, misericordia y humildad. La profecía de Belén muestra la precisión del plan de Dios. La religión verdadera se traduce en cómo tratamos a los demás.',
        application:'Miqueas 6:8 es una guía de vida: practicar justicia, amar la misericordia y caminar humildemente con Dios. La verdadera fe transforma nuestras relaciones y nuestra ética.',
        curiosities:['Profetizó que el Mesías nacería en Belén 700 años antes de Jesús.', 'Miqueas 6:8 es uno de los resúmenes más amados de la vida cristiana.', 'Fue contemporáneo de Isaías y Oseas.', 'Su nombre significa "¿Quién como Jehová?".'],
        timeline:[{ period:'~735 a.C.', desc:'Miqueas profetiza en Judá' }, { period:'Denuncia', desc:'Condena la corrupción de los líderes' }, { period:'Profecía', desc:'Anuncia el Mesías de Belén' }, { period:'Llamado', desc:'Resume lo que Dios requiere' }],
      },
      { id:'na', deep:{whatHappens:'Nahúm anuncia el juicio y la caída definitiva de Nínive, la capital asiria, unos 150 años después de que se arrepintiera en tiempos de Jonás. Asiria había vuelto a su crueldad, opresión y violencia, convirtiéndose en el azote de las naciones. Nahúm proclama que el Dios paciente pero justo finalmente juzgaría a esta ciudad sanguinaria. El libro es a la vez una sentencia contra la opresión y un consuelo para los oprimidos: Dios ve el mal y, a su tiempo, hace justicia. Nínive cayó en 612 a.C., tal como Nahúm profetizó.',context:{general:'Nahúm profetizó alrededor del 650-620 a.C., poco antes de la caída de Nínive en 612 a.C. ante los babilonios y medos.',political:'Asiria dominaba el mundo con brutalidad, habiendo destruido el reino del norte de Israel. Su capital, Nínive, parecía invencible.',cultural:'Nínive era conocida por su violencia extrema, sus deportaciones masivas y su crueldad con los conquistados, sembrando terror en todo el Cercano Oriente.',spiritual:'El libro afirma que Dios, aunque paciente, no deja sin castigo la maldad persistente. Es un mensaje de justicia divina y consuelo para los pueblos oprimidos por Asiria.'},godPurpose:'Dios revela que es justo y que, aunque es paciente, finalmente juzga la maldad y la opresión. Muestra que ningún imperio, por poderoso que sea, está fuera de su alcance, y que defiende a los oprimidos.',godTeaching:'Dios quería enseñar que es "tardo para la ira y grande en poder", que no tiene por inocente al culpable, y que es buen refugio para quienes confían en Él en el día de la angustia. Su justicia y su bondad van de la mano.',consequences:'La caída de Nínive en 612 a.C. cumplió la profecía de Nahúm con precisión, y la ciudad quedó tan destruida que durante siglos se dudó de su existencia. El libro permanece como testimonio de que Dios cumple su palabra y hace justicia, consolando a quienes sufren bajo la opresión.',practicalLessons:['Dios es paciente, pero no ignora el mal indefinidamente; a su tiempo hace justicia.','Ningún poder humano, por grande que parezca, está fuera del alcance de Dios.','Para los que sufren opresión, Dios es "buen refugio en el día de la angustia".','La paciencia de Dios no debe confundirse con indiferencia; su justicia llegará.'],christConnection:'Nahúm revela el lado justo de Dios que complementa su misericordia: el mismo Dios que perdonó a Nínive arrepentida en Jonás, ahora juzga su maldad persistente. Esta justicia divina apunta a Cristo, quien al final juzgará todo mal y establecerá justicia perfecta. Pero Nahúm también declara: "Bueno es Jehová, fortaleza en el día de la angustia; y conoce a los que en él confían" (1:7), anticipando el refugio que hallamos en Cristo. En la cruz, la justicia y la misericordia de Dios se encuentran perfectamente.',keyVerses:[{ref:'Nahúm 1:7',text:'Jehová es bueno, fortaleza en el día de la angustia; y conoce a los que en él confían.'},{ref:'Nahúm 1:3',text:'Jehová es tardo para la ira y grande en poder, y no tendrá por inocente al culpable.'}],readingCall:'Nahúm nos muestra que Dios hace justicia y defiende a los oprimidos. Te invitamos a leer sus 3 capítulos. Si alguna vez te has preguntado por qué los malvados parecen salirse con la suya, este libro te recuerda que Dios ve todo y, a su tiempo, actúa. Y en medio del juicio, hallarás la promesa de que Dios es buen refugio para quien confía en Él.'}, name:'Nahúm', abbr:'Nah', t:'AT', chapters:3,
        author:'Nahúm', date:'~660-630 a.C.', genre:'Profecía',
        context:'Nahúm anuncia la caída de Nínive, la misma ciudad que se había arrepentido en tiempos de Jonás pero había vuelto a su crueldad un siglo después.',
        summary:'Nahúm proclama el juicio de Dios sobre Nínive, capital del cruel Imperio Asirio. Un siglo después del arrepentimiento bajo Jonás, Nínive había vuelto a su violencia y opresión. Nahúm anuncia su destrucción total e inevitable. Pero el libro también consuela a Judá: el mismo Dios que juzga a los crueles es "bueno, fortaleza en el día de la angustia, y conoce a los que en él confían". Muestra el equilibrio entre la justicia y la bondad de Dios.',
        purpose:'Anunciar el juicio sobre la cruel Nínive y consolar al pueblo de Dios mostrando que él es refugio de los que confían en él.',
        themes:['Justicia de Dios', 'Juicio sobre la crueldad', 'Refugio en la angustia', 'Bondad de Dios', 'Soberanía', 'Consuelo'],
        keyVerse:{ ref:'Nahúm 1:7', text:'Jehová es bueno, fortaleza en el día de la angustia; y conoce a los que en él confían.' },
        characters:[{ name:'Nahúm', role:'Profeta contra Nínive', icon:'📜' }],
        teaching:'Dios es paciente, pero su justicia finalmente alcanza a los crueles e impenitentes. El mismo Dios que juzga es refugio seguro para quienes confían en él. La bondad y la justicia de Dios no se contradicen.',
        application:'Dios ve la crueldad y la injusticia, y actuará a su tiempo. En medio del temor por los poderosos opresores, podemos refugiarnos en la bondad de Dios. Él conoce a los que confían en él.',
        curiosities:['Nínive cayó en 612 a.C., tal como Nahúm profetizó.', 'El nombre Nahúm significa "consuelo" o "consolación".', 'Es como una "segunda parte" de la historia de Jonás, un siglo después.', 'Describe la caída de Nínive con detalle militar vívido.'],
        timeline:[{ period:'Jonás (antes)', desc:'Nínive se arrepiente temporalmente' }, { period:'~650 a.C.', desc:'Nínive vuelve a la crueldad' }, { period:'Profecía', desc:'Nahúm anuncia su destrucción' }, { period:'612 a.C.', desc:'Nínive cae como fue profetizado' }],
      },
      { id:'hab', deep:{whatHappens:'Habacuc es único: en lugar de dirigirse al pueblo, el profeta dialoga directamente con Dios, planteándole las preguntas más difíciles. Primero pregunta: "¿Hasta cuándo, Señor, tolerarás la violencia e injusticia en Judá?". Dios responde que usará a los babilonios para juzgar. Esto genera una segunda pregunta aún más angustiosa: "¿Cómo puedes usar a una nación más malvada para castigar a tu pueblo?". Dios responde que también juzgará a Babilonia, y que "el justo por su fe vivirá". El libro termina con uno de los himnos de fe más hermosos de la Biblia: confiar en Dios aunque todo falle.',context:{general:'Habacuc profetizó alrededor del 605 a.C., justo antes de la invasión babilónica de Judá, en un tiempo de crisis y confusión.',political:'Babilonia se levantaba como la nueva superpotencia, amenazando a Judá. Habacuc luchaba por entender cómo Dios podía usar a un imperio tan cruel.',cultural:'Judá estaba llena de violencia e injusticia interna, lo que provocaba el clamor del profeta. El panorama internacional era de incertidumbre y temor.',spiritual:'El libro aborda la lucha de la fe ante el aparente silencio o la aparente injusticia de Dios, enseñando a confiar en Él aun sin entender sus caminos.'},godPurpose:'Dios revela que es soberano sobre la historia y que su justicia, aunque a veces parezca tardar, es segura. Enseña que el justo debe vivir por la fe, confiando en Dios incluso cuando no entiende lo que está ocurriendo.',godTeaching:'Dios quería enseñar que está bien llevarle nuestras preguntas más difíciles, que sus caminos son más altos que los nuestros, y que la verdadera fe confía y se goza en Él aun en medio de la pérdida y la incertidumbre.',consequences:'La declaración "el justo por su fe vivirá" (2:4) se convirtió en uno de los versículos más importantes de toda la Biblia, citado tres veces en el Nuevo Testamento y fundamental para la Reforma. El himno final de Habacuc ha consolado a innumerables creyentes en sus momentos de pérdida y prueba.',practicalLessons:['Está bien llevarle a Dios tus preguntas y dudas más difíciles; Él recibe la fe honesta que busca.','El justo vive por la fe: confiar en Dios aun cuando no entendemos sus caminos.','Dios es soberano sobre la historia, aunque sus tiempos y métodos nos desconcierten.','La fe madura se goza en Dios mismo, aunque todo lo demás falle: "aunque la higuera no florezca... yo me alegraré en Jehová".'],christConnection:'La frase central de Habacuc, "el justo por su fe vivirá" (2:4), es citada tres veces en el Nuevo Testamento (Romanos 1:17, Gálatas 3:11, Hebreos 10:38) como el fundamento del Evangelio: somos justificados por la fe en Cristo, no por nuestras obras. Esta verencillo encendió el corazón de Martín Lutero y la Reforma. La lucha de Habacuc por confiar en Dios en medio del sufrimiento halla su respuesta plena en Cristo, quien también confió en el Padre en su mayor angustia, y cuya fe y obra nos hacen justos.',keyVerses:[{ref:'Habacuc 2:4',text:'He aquí que aquel cuya alma no es recta, se enorgullece; mas el justo por su fe vivirá.'},{ref:'Habacuc 3:17-18',text:'Aunque la higuera no florezca, ni en las vides haya frutos... con todo, yo me alegraré en Jehová, y me gozaré en el Dios de mi salvación.'}],readingCall:'Habacuc es para todo el que ha mirado el mundo y preguntado "¿dónde está Dios en medio de tanto mal?". Te invitamos a leer sus 3 capítulos. Verás a un profeta que lleva sus dudas a Dios con honestidad y termina en una fe gozosa e inquebrantable. Si estás en una temporada de preguntas sin respuesta, este libro te enseñará a vivir por la fe.'}, name:'Habacuc', abbr:'Hab', t:'AT', chapters:3,
        author:'Habacuc', date:'~610-605 a.C.', genre:'Profecía',
        context:'Habacuc es un diálogo entre el profeta y Dios. El profeta lucha con preguntas difíciles sobre la justicia divina y aprende a confiar.',
        summary:'Habacuc es único: en vez de hablar al pueblo, dialoga con Dios sobre sus dudas. Pregunta por qué Dios permite la injusticia y por qué usaría a los crueles babilonios para juzgar a Judá. Dios responde, y aunque no resuelve todas las dudas, Habacuc aprende a confiar. El libro culmina con una de las declaraciones de fe más hermosas: aunque todo falle ("aunque la higuera no florezca"), "yo me alegraré en Jehová". También contiene "el justo por su fe vivirá", clave en la Reforma.',
        purpose:'Mostrar cómo llevar nuestras dudas honestas a Dios y aprender a confiar en su soberanía aun cuando no entendemos sus caminos.',
        themes:['Fe en la duda', 'Justicia de Dios', 'Confianza sin respuestas', 'El justo vivirá por la fe', 'Adoración en la prueba', 'Soberanía divina'],
        keyVerse:{ ref:'Habacuc 3:17-18', text:'Aunque la higuera no florezca, ni en las vides haya frutos... con todo, yo me alegraré en Jehová, y me gozaré en el Dios de mi salvación.' },
        characters:[{ name:'Habacuc', role:'Profeta que cuestiona y confía', icon:'🙏' }],
        teaching:'Está bien llevar nuestras preguntas honestas a Dios. La fe no es ausencia de dudas, sino confianza en Dios a pesar de ellas. "El justo por su fe vivirá" es el corazón del evangelio. Podemos gozarnos en Dios aun cuando todo falla.',
        application:'Podemos ser honestos con Dios sobre nuestras dudas y luchas. La verdadera fe se aferra a Dios aunque las circunstancias sean adversas. El gozo no depende de las circunstancias sino de Dios.',
        curiosities:['"El justo por su fe vivirá" (2:4) es citado tres veces en el NT y fue clave en la Reforma.', 'El libro es un diálogo de preguntas y respuestas con Dios.', 'Termina con un salmo de adoración a pesar de la adversidad.', 'Inspiró el lema de Lutero sobre la justificación por la fe.'],
        timeline:[{ period:'Pregunta 1', desc:'Habacuc cuestiona la injusticia en Judá' }, { period:'Respuesta', desc:'Dios anuncia el uso de Babilonia' }, { period:'Pregunta 2', desc:'¿Cómo usar a los más malvados?' }, { period:'Confianza', desc:'Habacuc se goza en Dios pese a todo' }],
      },
      { id:'sof', deep:{whatHappens:'Sofonías proclama el venidero "día de Jehová", un tiempo de juicio sobre Judá y las naciones por su idolatría, su complacencia y su orgullo. Con lenguaje intenso, advierte que nadie escapará del juicio de Dios, ni siquiera los que pensaban estar seguros. Sin embargo, el libro no termina en oscuridad: tras el juicio viene una promesa gloriosa de restauración para un remanente humilde, y uno de los pasajes más alegres de toda la Biblia, donde Dios mismo se regocija sobre su pueblo "con cánticos".',context:{general:'Sofonías profetizó alrededor del 640-620 a.C., durante el reinado de Josías, probablemente antes de las reformas religiosas de ese rey.',political:'Judá había sufrido años de idolatría bajo reyes anteriores. La amenaza de imperios extranjeros se cernía sobre la región.',cultural:'El pueblo se había vuelto complaciente y sincretista, mezclando la adoración a Dios con cultos paganos, viviendo como si Dios fuera indiferente al bien y al mal.',spiritual:'Sofonías confronta la complacencia espiritual —los que decían en su corazón "Jehová ni hará bien ni mal"— y llama al arrepentimiento antes del día del juicio.'},godPurpose:'Dios revela que es justo y que juzgará todo pecado, pero que su propósito final es la restauración y el gozo. Muestra que preserva un remanente humilde y que su amor culmina en regocijarse sobre su pueblo redimido.',godTeaching:'Dios quería enseñar que la complacencia espiritual es peligrosa, que el día de Jehová es real, pero que para los humildes que buscan a Dios hay refugio, restauración y un amor que se expresa en cánticos de gozo.',consequences:'Sofonías dejó uno de los retratos más sorprendentes de Dios en toda la Biblia: no solo como juez, sino como Padre que se deleita y canta sobre su pueblo. Su mensaje equilibra la seriedad del juicio con la calidez del amor restaurador de Dios.',practicalLessons:['La complacencia espiritual —pensar que a Dios no le importa cómo vivimos— es un grave error.','El "día de Jehová" es real: Dios juzgará todo pecado, así que vivamos en reverencia y arrepentimiento.','Dios preserva siempre un remanente humilde que lo busca; vale la pena ser de los fieles.','Dios no solo te ama: se goza sobre ti "con cánticos", como un padre que se deleita en su hijo.'],christConnection:'Sofonías anuncia que tras el juicio, Dios estaría "en medio de" su pueblo como Rey y Salvador (3:15-17), profecía que se cumple en Cristo, Emanuel, "Dios con nosotros", que habita en medio de su pueblo. La asombrosa imagen de Dios regocijándose sobre los suyos "con cánticos" revela el corazón del Padre, que en Cristo nos adopta y se deleita en nosotros. El remanente humilde que Sofonías describe anticipa a quienes son salvados por gracia mediante la fe en Jesús.',keyVerses:[{ref:'Sofonías 3:17',text:'Jehová está en medio de ti, poderoso, él salvará; se gozará sobre ti con alegría, callará de amor, se regocijará sobre ti con cánticos.'},{ref:'Sofonías 2:3',text:'Buscad a Jehová todos los humildes de la tierra... quizás seréis guardados en el día del enojo de Jehová.'}],readingCall:'Sofonías va del juicio severo al gozo más tierno de Dios. Te invitamos a leer sus 3 capítulos. No te pierdas el versículo 3:17: descubrirás a un Dios que no solo te ama, sino que se regocija sobre ti con cánticos. Si necesitas saber cuánto te ama Dios, este versículo te sorprenderá.'}, name:'Sofonías', abbr:'Sof', t:'AT', chapters:3,
        author:'Sofonías', date:'~640-620 a.C.', genre:'Profecía',
        context:'Sofonías profetizó durante el reinado de Josías, advirtiendo del "día de Jehová" pero también prometiendo restauración y gozo.',
        summary:'Sofonías anuncia el "día de Jehová", un día de juicio sobre Judá y las naciones por su idolatría y orgullo. Pero el libro no termina en juicio: culmina con una de las imágenes más tiernas de Dios en toda la Biblia. Dios mismo se regocijará sobre su pueblo restaurado con cánticos: "se gozará sobre ti con alegría, callará de amor, se regocijará sobre ti con cántico". Muestra que tras el juicio viene la restauración y el gozo de Dios por los suyos.',
        purpose:'Advertir del juicio del día de Jehová y prometer la restauración de un remanente fiel sobre el cual Dios se regocijará.',
        themes:['El día de Jehová', 'Juicio y restauración', 'Gozo de Dios', 'Humildad', 'Remanente fiel', 'Amor restaurador'],
        keyVerse:{ ref:'Sofonías 3:17', text:'Jehová está en medio de ti, poderoso, él salvará; se gozará sobre ti con alegría, callará de amor, se regocijará sobre ti con cántico.' },
        characters:[{ name:'Sofonías', role:'Profeta del día de Jehová', icon:'📜' }],
        teaching:'Dios no solo nos perdona, sino que se regocija sobre nosotros con cánticos. Tras el juicio viene la restauración para el remanente fiel. Dios mismo canta de gozo por su pueblo.',
        application:'Es difícil imaginar que Dios cante de alegría por nosotros, pero lo hace. Buscar la humildad y la justicia nos prepara para su restauración. El amor de Dios por los suyos es profundamente personal y gozoso.',
        curiosities:['Sofonías 3:17 muestra a Dios cantando de gozo sobre su pueblo.', 'Profetizó durante el avivamiento del rey Josías.', 'Era de linaje real, descendiente del rey Ezequías.', 'El "día de Jehová" es un tema central del libro.'],
        timeline:[{ period:'~640 a.C.', desc:'Sofonías profetiza bajo Josías' }, { period:'Juicio', desc:'Anuncia el día de Jehová' }, { period:'Llamado', desc:'Convoca a la humildad y la justicia' }, { period:'Restauración', desc:'Promete el gozo de Dios sobre su pueblo' }],
      },
      { id:'hag', deep:{whatHappens:'Hageo anima al pueblo que había regresado del exilio a reconstruir el templo de Jerusalén, una obra que habían abandonado por desánimo y por ocuparse de sus propias casas. Con cuatro mensajes breves y directos, Hageo confronta sus prioridades equivocadas: se habían enfocado en su comodidad personal mientras la casa de Dios quedaba en ruinas. El profeta los llama a "considerar sus caminos" y a poner a Dios primero. El pueblo responde, reanuda la obra, y Dios promete que la gloria de este templo sería mayor que la del anterior, y bendice su obediencia.',context:{general:'Hageo profetizó en el 520 a.C., unos 16 años después del regreso del exilio, cuando la reconstrucción del templo llevaba mucho tiempo paralizada.',political:'Bajo el imperio persa, el pueblo había regresado con permiso para reconstruir, pero la oposición y el desánimo habían detenido la obra.',cultural:'La gente se había acomodado, construyendo y decorando sus propias casas mientras descuidaban el templo, símbolo de su relación con Dios.',spiritual:'El problema era de prioridades espirituales: habían puesto su comodidad por encima de Dios, y como resultado, sus esfuerzos no prosperaban. Hageo los llama a poner a Dios primero.'},godPurpose:'Dios revela la importancia de poner sus prioridades primero y muestra que la bendición fluye de la obediencia. Anima a su pueblo desanimado a completar la obra, prometiendo su presencia y una gloria futura mayor.',godTeaching:'Dios quería enseñar que cuando lo ponemos en primer lugar, todo lo demás encuentra su lugar correcto; que el desánimo no debe detener la obra de Dios; y que su presencia ("yo estoy con vosotros") es la mayor motivación.',consequences:'El pueblo obedeció y completó el templo en cuatro años. La promesa de Hageo de que "la gloria postrera de esta casa será mayor que la primera" se cumplió cuando Jesús, la gloria de Dios encarnada, entró en ese mismo templo. El libro enseña el poder de reordenar prioridades en torno a Dios.',practicalLessons:['Pon a Dios primero: cuando él tiene el primer lugar, lo demás encuentra su orden correcto.','"Considera tus caminos": evalúa si tus prioridades reflejan lo que realmente importa.','El desánimo no debe detener la obra de Dios; Él promete estar contigo para completarla.','La bendición de Dios acompaña a la obediencia y a poner sus intereses por encima de los nuestros.'],christConnection:'Hageo profetiza que "la gloria postrera de esta casa será mayor que la primera" (2:9). Esto se cumplió cuando Jesucristo, la gloria misma de Dios encarnada, entró y enseñó en ese segundo templo. Aunque el templo de Zorobabel era físicamente más modesto que el de Salomón, recibió una gloria infinitamente mayor: la presencia del Mesías. Hageo también menciona a Zorobabel como un "anillo de sellar" escogido por Dios, parte del linaje mesiánico que culminaría en Cristo, el verdadero templo donde Dios habita con los hombres.',keyVerses:[{ref:'Hageo 1:5',text:'Pues así ha dicho Jehová de los ejércitos: Meditad bien sobre vuestros caminos.'},{ref:'Hageo 2:9',text:'La gloria postrera de esta casa será mayor que la primera, ha dicho Jehová de los ejércitos; y daré paz en este lugar.'}],readingCall:'Hageo es breve pero transformador, ideal cuando sientes que tus prioridades están desordenadas. Te invitamos a leer sus 2 capítulos. Su pregunta "¿considerad vuestros caminos?" te hará reflexionar sobre qué tiene el primer lugar en tu vida. Si has dejado a Dios en segundo plano, este libro te animará a ponerlo primero y ver cómo todo lo demás encuentra su lugar.'}, name:'Hageo', abbr:'Hag', t:'AT', chapters:2,
        author:'Hageo', date:'~520 a.C.', genre:'Profecía',
        context:'Hageo animó a los judíos que habían regresado del exilio a terminar la reconstrucción del Templo, que habían descuidado por ocuparse de sus propias casas.',
        summary:'Hageo es un llamado a poner las prioridades en orden. Los judíos que regresaron del exilio habían dejado de construir el Templo para ocuparse de sus propias casas, y sufrían escasez. Hageo los confronta: "¿Es tiempo para vosotros de habitar en casas artesonadas, y esta casa está desierta?". Cuando el pueblo obedece y retoma la obra, Dios promete su presencia y bendición, y que la gloria de este Templo sería mayor que la del anterior, apuntando a la venida del Mesías.',
        purpose:'Llamar al pueblo a priorizar la casa de Dios sobre sus propios intereses y prometer la bendición y presencia divina como resultado.',
        themes:['Prioridades correctas', 'Reconstrucción del Templo', 'Presencia de Dios', 'Obediencia y bendición', 'Gloria futura', 'Ánimo'],
        keyVerse:{ ref:'Hageo 2:9', text:'La gloria postrera de esta casa será mayor que la primera, ha dicho Jehová de los ejércitos; y daré paz en este lugar.' },
        characters:[{ name:'Hageo', role:'Profeta de la reconstrucción', icon:'📜' }, { name:'Zorobabel', role:'Gobernador de Judá', icon:'⭐' }],
        teaching:'Cuando ponemos a Dios primero, él provee. Descuidar lo espiritual por lo material trae vacío. La obediencia trae la presencia y la bendición de Dios.',
        application:'Examinemos nuestras prioridades: ¿ponemos a Dios primero o lo dejamos para después? Dios bendice a quienes ponen su reino en primer lugar. Su presencia es nuestra mayor riqueza.',
        curiosities:['Hageo predicó solo durante unos 4 meses, pero con gran impacto.', 'El pueblo respondió y retomó la obra en solo 23 días.', 'La "gloria mayor" del Templo apunta a la venida de Cristo a él.', 'Es el segundo libro más corto del AT después de Abdías.'],
        timeline:[{ period:'520 a.C.', desc:'El Templo lleva años abandonado' }, { period:'Confrontación', desc:'Hageo llama a priorizar la casa de Dios' }, { period:'Obediencia', desc:'El pueblo retoma la construcción' }, { period:'Promesa', desc:'Dios promete gloria y paz' }],
      },
      { id:'zac', deep:{whatHappens:'Zacarías, contemporáneo de Hageo, anima al pueblo a reconstruir el templo, pero su mensaje va mucho más allá: a través de ocho visiones nocturnas y numerosas profecías, revela el plan futuro de Dios con un detalle mesiánico extraordinario. Zacarías profetiza la venida del Rey humilde montado en un asno, el pastor traicionado por treinta piezas de plata, el costado traspasado, y el reino glorioso del Mesías. Es uno de los libros más citados en relación con la pasión de Cristo, combinando ánimo presente con esperanza mesiánica.',context:{general:'Zacarías profetizó desde el 520 a.C. en adelante, junto con Hageo, durante la reconstrucción del templo tras el exilio.',political:'Bajo el dominio persa, el pequeño remanente que había regresado necesitaba ánimo para completar el templo y esperanza para el futuro.',cultural:'El pueblo estaba desanimado, sintiéndose insignificante comparado con la gloria pasada de Israel. Zacarías les recuerda los grandes planes de Dios para ellos.',spiritual:'El libro llama al arrepentimiento y a la pureza, pero sobre todo eleva la mirada del pueblo hacia el Mesías venidero y el futuro reino glorioso de Dios.'},godPurpose:'Dios revela su plan redentor a largo plazo, mostrando que la reconstrucción del templo era parte de algo mucho mayor: la venida del Mesías y el establecimiento de su reino. Anima al remanente recordándole su gran futuro.',godTeaching:'Dios quería enseñar que no debe despreciarse "el día de las pequeñeces", que su obra avanza "no con ejército, ni con fuerza, sino con mi Espíritu", y que toda la historia se dirige hacia el Mesías y su reino eterno.',consequences:'Zacarías se convirtió en uno de los libros proféticos más citados sobre la vida, muerte y reino de Cristo. Sus profecías sobre la entrada triunfal, la traición por treinta piezas de plata y el costado traspasado se cumplieron literalmente, confirmando la inspiración de la Escritura.',practicalLessons:['No desprecies "el día de las pequeñeces": Dios hace grandes cosas a partir de comienzos humildes.','La obra de Dios no avanza por fuerza humana, sino por su Espíritu.','Por desanimado o insignificante que te sientas, Dios tiene grandes planes para su pueblo.','Toda la historia se dirige hacia Cristo y su reino; vale la pena vivir con esa esperanza.'],christConnection:'Zacarías está repleto de profecías mesiánicas cumplidas en Cristo con asombrosa precisión: el Rey que entra en Jerusalén "humilde, y montado sobre un asno" (9:9, cumplido en el Domingo de Ramos); el pastor vendido por "treinta piezas de plata" (11:12-13, el precio de la traición de Judas); "mirarán a mí, a quien traspasaron" (12:10, el costado de Cristo en la cruz); y "herido será el pastor, y serán dispersadas las ovejas" (13:7, citado por Jesús). Zacarías ve al Mesías como Rey, Sacerdote y Pastor, anticipando con detalle la obra de Cristo.',keyVerses:[{ref:'Zacarías 4:6',text:'No con ejército, ni con fuerza, sino con mi Espíritu, ha dicho Jehová de los ejércitos.'},{ref:'Zacarías 9:9',text:'He aquí tu rey vendrá a ti, justo y salvador, humilde, y cabalgando sobre un asno.'},{ref:'Zacarías 12:10',text:'Y mirarán a mí, a quien traspasaron, y llorarán como se llora por hijo unigénito.'}],readingCall:'Zacarías combina ánimo presente con profecías mesiánicas asombrosas. Te invitamos a leer sus 14 capítulos. Te sorprenderá ver cuántos detalles de la vida y muerte de Jesús fueron predichos aquí siglos antes: la entrada en un asno, las treinta piezas de plata, el costado traspasado. Es una prueba poderosa de que Dios tenía un plan, y de que Jesús es el Mesías prometido.'}, name:'Zacarías', abbr:'Zac', t:'AT', chapters:14,
        author:'Zacarías', date:'~520-480 a.C.', genre:'Profecía',
        context:'Contemporáneo de Hageo, Zacarías animó a los exiliados que regresaron, con visiones llenas de esperanza mesiánica y la promesa del Rey venidero.',
        summary:'Zacarías combina ánimo presente con esperanza mesiánica. Mientras Hageo se enfocó en reconstruir el Templo, Zacarías levantó la vista al futuro mediante ocho visiones nocturnas y profecías sobre el Mesías. Predijo al Rey humilde entrando en un asno (cumplido el Domingo de Ramos), al pastor herido y traicionado por 30 piezas de plata, y el reino futuro de Dios. El mensaje central: el éxito viene "no con ejército, ni con fuerza, sino con mi Espíritu".',
        purpose:'Animar a los que regresaron del exilio y dirigir su mirada al Mesías venidero, el Rey humilde que establecería el reino de Dios.',
        themes:['Esperanza mesiánica', 'El Espíritu de Dios', 'Restauración', 'El Rey humilde', 'Visiones proféticas', 'El reino venidero'],
        keyVerse:{ ref:'Zacarías 4:6', text:'No con ejército, ni con fuerza, sino con mi Espíritu, ha dicho Jehová de los ejércitos.' },
        characters:[{ name:'Zacarías', role:'Profeta mesiánico', icon:'📜' }, { name:'Zorobabel', role:'Líder de Judá', icon:'⭐' }],
        teaching:'La obra de Dios se logra por su Espíritu, no por la fuerza humana. Zacarías contiene profecías mesiánicas cumplidas en Jesús con asombrosa precisión. Dios tiene un plan glorioso para el futuro.',
        application:'No dependamos de nuestra fuerza sino del Espíritu de Dios. Las promesas de Dios sobre el futuro nos dan esperanza en el presente. Jesús cumple cada profecía de Zacarías.',
        curiosities:['Predijo la entrada de Jesús en un asno (9:9) y las 30 piezas de plata (11:12).', 'Contiene más profecías mesiánicas que casi cualquier profeta menor.', 'Sus 8 visiones nocturnas son ricas en simbolismo.', '"No con fuerza sino con mi Espíritu" es uno de los versículos más citados.'],
        timeline:[{ period:'520 a.C.', desc:'Zacarías profetiza junto a Hageo' }, { period:'Visiones', desc:'Ocho visiones nocturnas de esperanza' }, { period:'Profecías', desc:'Anuncia al Mesías Rey y Pastor' }, { period:'Reino', desc:'Visión del reino futuro de Dios' }],
      },
      { id:'mal', deep:{whatHappens:'Malaquías, el último profeta del Antiguo Testamento, confronta a un pueblo que había caído en la frialdad espiritual y la hipocresía. A través de una serie de disputas —donde Dios afirma algo, el pueblo lo cuestiona, y Dios responde— el profeta expone sus pecados: ofrendas defectuosas, sacerdotes corruptos, divorcios, robo a Dios en los diezmos, y palabras arrogantes. Pero Dios también renueva su amor por ellos y promete enviar un mensajero que prepararía el camino, y el "Sol de justicia" que traería sanidad. Con Malaquías, comienzan 400 años de silencio profético hasta la llegada de Juan el Bautista y Cristo.',context:{general:'Malaquías profetizó alrededor del 430 a.C., unos 100 años después del regreso del exilio, siendo el último libro profético del Antiguo Testamento.',political:'Judá seguía bajo dominio persa. El entusiasmo inicial del regreso se había desvanecido, dando paso a la desilusión y la apatía espiritual.',cultural:'El pueblo cuestionaba el amor y la justicia de Dios, viendo que los malvados prosperaban. Esto llevó a la negligencia en la adoración y a una religiosidad de mínimo esfuerzo.',spiritual:'La frialdad y el cinismo espiritual dominaban: ofrecían lo peor a Dios, no le eran fieles y dudaban de su amor. Malaquías llama a un retorno sincero antes del día del Señor.'},godPurpose:'Dios revela su amor persistente por un pueblo desanimado y cínico, confronta su hipocresía con paciencia, y renueva la esperanza apuntando al mensajero y al Mesías venideros. Llama a su pueblo a una adoración y fidelidad genuinas.',godTeaching:'Dios quería enseñar que le importa la sinceridad de nuestra adoración y nuestra fidelidad en lo cotidiano (el matrimonio, las ofrendas, la honra), que su amor permanece a pesar de nuestra frialdad, y que debemos vivir esperando su venida.',consequences:'Malaquías cierra el Antiguo Testamento con la promesa de un mensajero (Juan el Bautista) y el "Sol de justicia" (Cristo). Tras él vinieron 400 años de silencio profético, hasta que esas promesas se cumplieron con la llegada de Juan y de Jesús, conectando ambos Testamentos.',practicalLessons:['Dios merece lo mejor de nosotros, no las sobras; examina si le das lo primero o lo que te queda.','La fidelidad en lo cotidiano —el matrimonio, las finanzas, la adoración— importa profundamente a Dios.','El amor de Dios por ti permanece firme aun cuando tu fe se enfría; Él te llama de regreso.','Vale la pena ser fiel: Dios tiene un "libro de memoria" de quienes le honran y le temen.'],christConnection:'Malaquías cierra el Antiguo Testamento apuntando directamente a Cristo. Profetiza al mensajero que prepararía el camino del Señor (3:1), cumplido en Juan el Bautista, y al "Sol de justicia" que nacería "trayendo en sus alas salvación" (4:2), cumplido en Jesús. También anuncia que el Señor "vendrá súbitamente a su templo", lo que ocurrió cuando Cristo entró en el templo. Las últimas palabras del Antiguo Testamento prometen el regreso de "Elías" antes del día del Señor, que Jesús identificó con Juan el Bautista, tendiendo el puente perfecto hacia el Nuevo Testamento.',keyVerses:[{ref:'Malaquías 3:6',text:'Porque yo Jehová no cambio; por esto, hijos de Jacob, no habéis sido consumidos.'},{ref:'Malaquías 3:10',text:'Traed todos los diezmos al alfolí... y probadme ahora en esto, dice Jehová de los ejércitos, si no os abriré las ventanas de los cielos.'},{ref:'Malaquías 4:2',text:'Mas a vosotros los que teméis mi nombre, nacerá el Sol de justicia, y en sus alas traerá salvación.'}],readingCall:'Malaquías cierra el Antiguo Testamento y prepara el escenario para la venida de Cristo. Te invitamos a leer sus 4 capítulos. Te confrontará sobre la sinceridad de tu adoración y tu fidelidad, pero también te recordará el amor inmutable de Dios. Y al terminar, sentirás la expectativa de los 400 años de silencio que romperían con la llegada del "Sol de justicia": Jesús.'}, name:'Malaquías', abbr:'Mal', t:'AT', chapters:4,
        author:'Malaquías', date:'~430 a.C.', genre:'Profecía',
        context:'Malaquías es el último libro del AT. Confronta la frialdad espiritual del pueblo restaurado y anuncia la venida del mensajero que prepararía el camino del Señor.',
        summary:'Malaquías cierra el Antiguo Testamento confrontando la apatía espiritual del pueblo, que había caído en formalismo religioso, ofrendas defectuosas y matrimonios mixtos. Mediante un formato de preguntas y respuestas, Dios reprende su frialdad y los llama a volver. Promete bendición a quienes le honran con sus diezmos ("probadme ahora en esto"). Termina anunciando la venida de Elías (Juan el Bautista) antes del día de Jehová. Tras Malaquías vienen 400 años de silencio hasta Cristo.',
        purpose:'Confrontar la frialdad espiritual del pueblo, llamarlo al arrepentimiento sincero y anunciar al mensajero que prepararía el camino del Mesías.',
        themes:['Frialdad espiritual', 'Honra a Dios', 'Diezmos y fidelidad', 'El mensajero venidero', 'Adoración sincera', 'Esperanza mesiánica'],
        keyVerse:{ ref:'Malaquías 3:10', text:'Traed todos los diezmos al alfolí y haya alimento en mi casa; y probadme ahora en esto, dice Jehová de los ejércitos, si no os abriré las ventanas de los cielos, y derramaré sobre vosotros bendición hasta que sobreabunde.' },
        characters:[{ name:'Malaquías', role:'Último profeta del AT', icon:'📜' }],
        teaching:'Dios desea adoración sincera, no rituales fríos. La fidelidad en los diezmos refleja la confianza en Dios. Malaquías deja al lector esperando al Mesías y a su precursor.',
        application:'Cuidemos no caer en una religión de rutina sin corazón. Honrar a Dios con nuestros recursos es un acto de fe. El silencio de 400 años tras Malaquías hace más glorioso el "cumplimiento del tiempo" en Cristo.',
        curiosities:['Es el último libro del AT; le siguen 400 años de silencio profético.', 'Anuncia a "Elías" (Juan el Bautista) que prepararía el camino.', 'Usa un formato de preguntas y respuestas único.', 'El NT comienza donde Malaquías termina: con Juan el Bautista.'],
        timeline:[{ period:'~430 a.C.', desc:'Malaquías confronta la apatía del pueblo' }, { period:'Llamado', desc:'Convoca a la adoración sincera y la fidelidad' }, { period:'Promesa', desc:'Anuncia al mensajero venidero' }, { period:'400 años', desc:'Silencio profético hasta Juan el Bautista' }],
      },
      { id:'mr', deep:{whatHappens:'Marcos es el evangelio de la acción: presenta a Jesús como el Siervo poderoso que vino a servir y dar su vida. Con un ritmo veloz, narra el ministerio de Jesús a través de sus obras —milagros, sanidades, exorcismos— más que de largos discursos. El punto de giro es la confesión de Pedro ("Tú eres el Cristo") a mitad del libro, tras la cual Jesús se dirige decididamente hacia Jerusalén y la cruz. Es el evangelio más corto y directo.',context:{general:'Escrito por Juan Marcos, probablemente basado en los recuerdos del apóstol Pedro, hacia el año 55-65 d.C., dirigido principalmente a creyentes romanos/gentiles.',political:'Roma perseguía cada vez más a los cristianos, especialmente bajo Nerón. Marcos escribe para fortalecer a creyentes que enfrentaban sufrimiento, mostrándoles a un Jesús que también sufrió.',cultural:'Dirigido a romanos prácticos y orientados a la acción, Marcos omite las genealogías judías y explica las costumbres judías, enfocándose en lo que Jesús HIZO más que en largos discursos.',spiritual:'Los creyentes necesitaban entender que el camino del discipulado incluye el sufrimiento, así como el Mesías mismo tuvo que sufrir antes de la gloria.'},godPurpose:'Dios revela a Jesús como el Siervo sufriente de Isaías, poderoso en obras pero humilde en propósito, que vino "no para ser servido, sino para servir y dar su vida en rescate por muchos". Muestra que el camino a la gloria pasa por la cruz.',godTeaching:'Dios quería enseñar que la verdadera grandeza está en el servicio y el sacrificio, no en el poder. El discipulado significa tomar la cruz y seguir a Jesús, incluso a través del sufrimiento.',consequences:'Marcos, probablemente el primer evangelio escrito, sirvió de fuente para Mateo y Lucas. Su retrato vigoroso de Jesús en acción ha inspirado a generaciones a un cristianismo práctico y valiente, especialmente en tiempos de persecución.',practicalLessons:['La grandeza en el Reino se mide por el servicio a los demás, no por la posición o el poder.','Seguir a Jesús implica negarse a uno mismo y tomar la cruz; el discipulado tiene un costo.','La fe genuina actúa: Marcos muestra a un Jesús que constantemente responde a las necesidades de la gente.','Incluso en el sufrimiento, Jesús va delante de nosotros; no nos pide nada que Él no haya vivido primero.'],christConnection:'Marcos presenta a Jesús como el Siervo de Jehová profetizado por Isaías, que dio su vida en rescate. El versículo clave (10:45) resume el Evangelio entero: Jesús sirvió y murió como sustituto "por muchos". El relato se acelera hacia la cruz, mostrando que el propósito central de la venida de Cristo fue su muerte redentora y su resurrección. El Siervo poderoso se hizo siervo sufriente para salvarnos.',keyVerses:[{ref:'Marcos 1:15',text:'El tiempo se ha cumplido, y el reino de Dios se ha acercado; arrepentíos, y creed en el evangelio.'},{ref:'Marcos 10:45',text:'Porque el Hijo del Hombre no vino para ser servido, sino para servir, y para dar su vida en rescate por muchos.'},{ref:'Marcos 8:34',text:'Si alguno quiere venir en pos de mí, niéguese a sí mismo, y tome su cruz, y sígame.'}],readingCall:'Marcos se lee de una sentada: es rápido, vibrante y directo. Te invitamos a leer sus 16 capítulos en pocos días y sentir la urgencia con que Jesús cumplió su misión. Es el evangelio perfecto para quien quiere conocer a Jesús en acción, sirviendo, sanando y entregándose por nosotros.'}, name:'Marcos', abbr:'Mr', t:'NT', chapters:16,
        author:'Juan Marcos', date:'~50-60 d.C.', genre:'Evangelio',
        context:'Marcos, el evangelio más corto y dinámico, presenta a Jesús como el Siervo sufriente que vino a servir. Probablemente basado en los recuerdos de Pedro.',
        summary:'Marcos es el evangelio de la acción. El más corto y veloz de los cuatro, usa la palabra "luego" o "en seguida" más de 40 veces, transmitiendo urgencia. Presenta a Jesús como el Siervo poderoso que demuestra su autoridad con hechos: milagros, exorcismos y sanidades. El punto de giro es la confesión de Pedro ("tú eres el Cristo") y luego el camino a la cruz. El versículo clave resume todo: el Hijo del Hombre vino "para servir, y para dar su vida en rescate por muchos".',
        purpose:'Presentar a Jesús como el Siervo de Dios poderoso en obras, que vino a servir y dar su vida en rescate por la humanidad.',
        themes:['Jesús el Siervo', 'Acción y autoridad', 'El camino a la cruz', 'Discipulado', 'Servicio sacrificial', 'Reino de Dios'],
        keyVerse:{ ref:'Marcos 10:45', text:'Porque el Hijo del Hombre no vino para ser servido, sino para servir, y para dar su vida en rescate por muchos.' },
        characters:[{ name:'Jesús', role:'El Siervo poderoso', icon:'✝' }, { name:'Pedro', role:'Apóstol principal', icon:'⚓' }, { name:'Juan Marcos', role:'Autor', icon:'📜' }],
        teaching:'La grandeza en el reino de Dios se mide por el servicio, no por el poder. Jesús, siendo Dios, vino a servir y morir por nosotros. El verdadero discipulado implica tomar la cruz y seguir a Jesús.',
        application:'Imitemos a Jesús sirviendo a otros en vez de buscar ser servidos. La fe se demuestra en acción. Seguir a Jesús significa estar dispuesto a sacrificarse por los demás.',
        curiosities:['Es el evangelio más corto y probablemente el primero en escribirse.', 'Usa "en seguida" más de 40 veces, dando ritmo acelerado.', 'Se cree que refleja los recuerdos del apóstol Pedro.', 'Marcos abandonó a Pablo en un viaje pero luego fue restaurado.'],
        timeline:[{ period:'~27 d.C.', desc:'Bautismo y comienzo del ministerio' }, { period:'Galilea', desc:'Milagros y enseñanzas con autoridad' }, { period:'Confesión', desc:'Pedro reconoce a Jesús como el Cristo' }, { period:'~30 d.C.', desc:'Muerte y resurrección en Jerusalén' }],
      },
      { id:'lc', deep:{whatHappens:'Lucas presenta a Jesús como el Salvador perfecto de toda la humanidad, con especial atención a los marginados: pobres, mujeres, samaritanos, pecadores y enfermos. Es el evangelio más detallado y ordenado, fruto de una cuidadosa investigación. Contiene parábolas únicas y amadas como el hijo pródigo, el buen samaritano y la oveja perdida. Narra el nacimiento de Jesús con más detalle que ningún otro, su ministerio de compasión, y su muerte y resurrección.',context:{general:'Escrito por Lucas, médico y compañero de Pablo, hacia el año 60-62 d.C., dirigido a Teófilo y a lectores gentiles, como primera parte de una obra que continúa en Hechos.',political:'El Imperio Romano dominaba el mundo. Lucas ubica cuidadosamente los eventos en la historia mundial (menciona a César Augusto, Cirenio, Tiberio), demostrando que el Evangelio es un hecho histórico verificable.',cultural:'En una sociedad que despreciaba a las mujeres, los pobres y los extranjeros, Lucas destaca la compasión de Jesús precisamente hacia estos grupos, mostrando que el Evangelio es para todos.',spiritual:'Lucas escribe para dar "certeza" de la fe a los creyentes gentiles, demostrando que la salvación en Cristo no es solo para los judíos sino para toda la humanidad.'},godPurpose:'Dios revela que Jesús vino "a buscar y a salvar lo que se había perdido", sin importar la condición social. Lucas muestra el corazón compasivo de Dios que se inclina hacia los necesitados y olvidados, y la salvación ofrecida a todas las naciones.',godTeaching:'Dios quería enseñar que su amor no tiene fronteras sociales ni étnicas, que el cielo se goza por cada pecador que se arrepiente, y que la verdadera fe se expresa en compasión hacia los demás.',consequences:'Lucas, junto con Hechos, forma la obra más extensa del Nuevo Testamento. Su énfasis en la compasión universal moldeó el cuidado cristiano por los pobres y marginados a lo largo de la historia. Sus parábolas exclusivas están entre las más conocidas y amadas del mundo.',practicalLessons:['Nadie está demasiado perdido para la gracia de Dios; Jesús vino a buscar precisamente a los perdidos.','El cielo celebra cada arrepentimiento: tu regreso a Dios causa gozo en el cielo.','La verdadera fe se demuestra en compasión, como el buen samaritano que ayudó al necesitado.','Dios valora a quienes el mundo desprecia; su Reino acoge a pobres, mujeres y extranjeros por igual.'],christConnection:'Lucas presenta a Cristo como el Salvador de todos, el Hijo del Hombre que vino a buscar y salvar lo perdido. La parábola del hijo pródigo revela el corazón del Padre que corre a abrazar al pecador que vuelve: la imagen más hermosa del Evangelio. Lucas traza la genealogía de Jesús hasta Adán (no solo hasta Abraham como Mateo), mostrando que es el Salvador de toda la raza humana. Su compasión por los marginados encarna la misión redentora de Dios.',keyVerses:[{ref:'Lucas 19:10',text:'Porque el Hijo del Hombre vino a buscar y a salvar lo que se había perdido.'},{ref:'Lucas 2:11',text:'Que os ha nacido hoy, en la ciudad de David, un Salvador, que es CRISTO el Señor.'},{ref:'Lucas 15:7',text:'Habrá más gozo en el cielo por un pecador que se arrepiente, que por noventa y nueve justos.'}],readingCall:'Lucas es el evangelio de la compasión, perfecto para descubrir cuánto te ama Dios sin importar tu pasado. Te invitamos a leer sus 24 capítulos. No te pierdas el capítulo 15, con las tres parábolas de lo perdido que se encuentra: verás el corazón del Padre que corre a abrazarte. Si te has sentido lejos de Dios, este evangelio es para ti.'}, name:'Lucas', abbr:'Lc', t:'NT', chapters:24,
        author:'Lucas, el médico', date:'~60-62 d.C.', genre:'Evangelio',
        context:'Lucas, médico y compañero de Pablo, escribió el evangelio más detallado, presentando a Jesús como el Salvador de todos, especialmente de los marginados.',
        summary:'Lucas escribió "ordenadamente" tras investigar cuidadosamente, presentando a Jesús como el Salvador perfecto de toda la humanidad. Su evangelio destaca la compasión de Jesús por los marginados: pobres, mujeres, samaritanos, pecadores. Contiene parábolas únicas y amadas como el hijo pródigo, el buen samaritano y la oveja perdida. Lucas enfatiza la oración, el Espíritu Santo y el gozo. El versículo clave revela su corazón: Jesús vino "a buscar y a salvar lo que se había perdido".',
        purpose:'Presentar a Jesús como el Salvador compasivo de toda la humanidad, dando certeza histórica de los hechos del evangelio.',
        themes:['Salvador universal', 'Compasión por los marginados', 'Oración', 'El Espíritu Santo', 'Gozo y salvación', 'Lo perdido encontrado'],
        keyVerse:{ ref:'Lucas 19:10', text:'Porque el Hijo del Hombre vino a buscar y a salvar lo que se había perdido.' },
        characters:[{ name:'Jesús', role:'El Salvador compasivo', icon:'✝' }, { name:'María', role:'Madre de Jesús', icon:'🌹' }, { name:'Zaqueo', role:'Publicano transformado', icon:'🌳' }, { name:'Juan el Bautista', role:'Precursor', icon:'🕊' }],
        teaching:'Jesús vino a buscar y salvar a los perdidos, sin importar su condición social. Su corazón se inclina hacia los marginados y despreciados. La salvación trae gozo y debe compartirse con todos.',
        application:'Como Jesús, debemos tener compasión por los marginados y olvidados. Nadie está demasiado perdido para la gracia de Dios. La salvación de un solo pecador causa gozo en el cielo.',
        curiosities:['Lucas fue médico y el único autor gentil del Nuevo Testamento.', 'Contiene las parábolas del hijo pródigo y el buen samaritano, exclusivas suyas.', 'Menciona a más mujeres que cualquier otro evangelio.', 'Lucas también escribió el libro de Hechos como continuación.'],
        timeline:[{ period:'Nacimiento', desc:'Relatos detallados del nacimiento de Jesús' }, { period:'Ministerio', desc:'Compasión por pobres y pecadores' }, { period:'Parábolas', desc:'Enseñanzas únicas sobre la gracia' }, { period:'~30 d.C.', desc:'Muerte, resurrección y ascensión' }],
      },
      { id:'hch', deep:{whatHappens:'Hechos narra el nacimiento y la explosiva expansión de la Iglesia, desde la ascensión de Jesús hasta la llegada del Evangelio a Roma. Comienza con el derramamiento del Espíritu Santo en Pentecostés, que transforma a discípulos temerosos en testigos valientes. Sigue el crecimiento de la iglesia en Jerusalén bajo Pedro, su expansión a Samaria y a los gentiles, y los tres viajes misioneros de Pablo que llevan el mensaje por todo el mundo mediterráneo. Es el puente entre los evangelios y las cartas apostólicas.',context:{general:'Escrito por Lucas hacia el año 62-64 d.C., como continuación de su evangelio, documentando aproximadamente 30 años de historia de la iglesia (33-63 d.C.).',political:'El Imperio Romano, con su red de caminos, su lengua común (griego) y su relativa paz (Pax Romana), proveyó las condiciones que Dios usó para la rápida difusión del Evangelio.',cultural:'El mundo era una mezcla de judaísmo, filosofía griega y religiones paganas. La iglesia tuvo que aprender a comunicar el Evangelio a judíos en sinagogas y a gentiles en plazas como el Areópago de Atenas.',spiritual:'La gran transición de Hechos es el paso del Evangelio de un movimiento judío a una fe universal. El concilio de Jerusalén (capítulo 15) define que los gentiles son salvos por gracia, sin necesidad de hacerse judíos.'},godPurpose:'Dios revela que el Espíritu Santo es quien edifica y expande la iglesia. Cumple la promesa de Jesús: "recibiréis poder cuando haya venido sobre vosotros el Espíritu Santo, y me seréis testigos". Muestra que el Evangelio es imparable y para todas las naciones.',godTeaching:'Dios quería enseñar que la misión de la iglesia es global y dependiente del Espíritu, no del esfuerzo humano. Enseña que la persecución no detiene el Evangelio sino que lo esparce, y que la salvación por gracia es para todos los pueblos.',consequences:'Hechos documenta cómo un pequeño grupo de 120 creyentes se convirtió en un movimiento que transformó el mundo. Estableció el patrón misionero de la iglesia, mostró cómo se fundan y organizan las iglesias, y dejó el relato fundacional que ha inspirado misiones en cada generación.',practicalLessons:['El poder para testificar y vivir la fe viene del Espíritu Santo, no de nuestras propias fuerzas.','Cada creyente es un testigo de Cristo, llamado a compartir el Evangelio donde esté.','La oposición y la persecución no detienen la obra de Dios; muchas veces la impulsan.','La iglesia crece cuando los creyentes se dedican a la enseñanza, la comunión, la oración y el partimiento del pan (Hechos 2:42).'],christConnection:'Hechos es la continuación de la obra de Cristo a través de su Espíritu y su iglesia. El Jesús resucitado y ascendido sigue actuando: Lucas dice que su evangelio trató "todo lo que Jesús comenzó a hacer", implicando que Hechos narra lo que Jesús continúa haciendo desde el cielo. El nombre de Jesús es central: en su nombre se predica, se sana, se bautiza y se salva. "En ningún otro hay salvación, porque no hay otro nombre bajo el cielo dado a los hombres en que podamos ser salvos" (Hechos 4:12).',keyVerses:[{ref:'Hechos 1:8',text:'Pero recibiréis poder, cuando haya venido sobre vosotros el Espíritu Santo, y me seréis testigos en Jerusalén, en toda Judea, en Samaria, y hasta lo último de la tierra.'},{ref:'Hechos 2:42',text:'Y perseveraban en la doctrina de los apóstoles, en la comunión unos con otros, en el partimiento del pan y en las oraciones.'},{ref:'Hechos 4:12',text:'Y en ningún otro hay salvación; porque no hay otro nombre bajo el cielo, dado a los hombres, en que podamos ser salvos.'}],readingCall:'Hechos es la historia más emocionante de la iglesia: llena de milagros, viajes, persecución y crecimiento imparable. Te invitamos a leer sus 28 capítulos y descubrir cómo el Espíritu Santo transformó a un grupo de pescadores en un movimiento que cambió el mundo. Lee el capítulo 2 para ver el nacimiento de la iglesia, y déjate inspirar a ser parte de esa misión hoy.'}, name:'Hechos', abbr:'Hch', t:'NT', chapters:28,
        author:'Lucas', date:'~62-64 d.C.', genre:'Historia',
        context:'Hechos narra el nacimiento y la expansión de la iglesia desde Jerusalén hasta Roma, impulsada por el Espíritu Santo tras la ascensión de Jesús.',
        summary:'Hechos es la historia del nacimiento de la iglesia. Comienza con la ascensión de Jesús y el derramamiento del Espíritu Santo en Pentecostés. A partir de ahí, el evangelio se expande imparablemente: primero en Jerusalén bajo Pedro, luego por Judea y Samaria, y finalmente "hasta lo último de la tierra" mediante los viajes misioneros de Pablo. El libro muestra que la iglesia crece por el poder del Espíritu Santo, a través de la predicación valiente y a pesar de la persecución.',
        purpose:'Documentar la expansión del evangelio por el poder del Espíritu Santo, desde Jerusalén hasta Roma, mostrando el cumplimiento de la Gran Comisión.',
        themes:['El Espíritu Santo', 'Expansión de la iglesia', 'Misión y testimonio', 'Valentía ante la persecución', 'Crecimiento del evangelio', 'Unidad de la iglesia'],
        keyVerse:{ ref:'Hechos 1:8', text:'Pero recibiréis poder, cuando haya venido sobre vosotros el Espíritu Santo, y me seréis testigos en Jerusalén, en toda Judea, en Samaria, y hasta lo último de la tierra.' },
        characters:[{ name:'Pedro', role:'Líder de la iglesia primitiva', icon:'⚓' }, { name:'Pablo', role:'Apóstol a los gentiles', icon:'📜' }, { name:'Esteban', role:'Primer mártir', icon:'⭐' }, { name:'Bernabé', role:'Animador y misionero', icon:'🕊' }],
        teaching:'La iglesia avanza por el poder del Espíritu Santo, no por esfuerzo humano. Cada creyente es un testigo de Cristo. La persecución no detiene el evangelio, sino que lo esparce.',
        application:'Dependemos del Espíritu Santo para ser testigos eficaces. La misión de la iglesia es global: hasta lo último de la tierra. La valentía para testificar viene del Espíritu, no de nosotros.',
        curiosities:['Hechos es la continuación del Evangelio de Lucas, del mismo autor.', 'Registra al menos tres viajes misioneros de Pablo.', 'El evangelio pasa de unos 120 creyentes a esparcirse por todo el imperio.', 'Termina abruptamente con Pablo predicando en Roma.'],
        timeline:[{ period:'~30 d.C.', desc:'Ascensión y Pentecostés' }, { period:'Jerusalén', desc:'Nace y crece la iglesia primitiva' }, { period:'Expansión', desc:'El evangelio llega a samaritanos y gentiles' }, { period:'~60 d.C.', desc:'Pablo lleva el evangelio hasta Roma' }],
      },
      { id:'2co', deep:{whatHappens:'En esta carta profundamente personal, Pablo defiende su ministerio ante falsos apóstoles que lo criticaban en Corinto. Comparte abiertamente sus sufrimientos, debilidades y el "aguijón en la carne", revelando que el poder de Dios se perfecciona en la debilidad. Habla del ministerio de la reconciliación, anima a la generosidad en las ofrendas, y muestra su corazón pastoral lleno de amor por la iglesia. Es la carta más autobiográfica y emotiva de Pablo.',context:{general:'Escrita por Pablo hacia el año 56 d.C., poco después de 1 Corintios, tras un período de tensión y reconciliación con la iglesia.',political:'Pablo había sufrido azotes, naufragios, cárceles y peligros constantes bajo el sistema romano mientras predicaba el evangelio.',cultural:'Habían llegado a Corinto "súper apóstoles" que se jactaban de su elocuencia y credenciales, despreciando a Pablo por su apariencia humilde y sus sufrimientos.',spiritual:'La iglesia había sido influenciada por estos falsos maestros. Pablo debe defender la autenticidad de su ministerio, no por orgullo, sino por amor a la verdad y a la iglesia.'},godPurpose:'Dios revela que su poder se manifiesta a través de la debilidad humana, no del éxito mundano. Muestra que el verdadero ministerio implica sufrimiento y entrega, y que la gracia de Dios es suficiente en toda circunstancia.',godTeaching:'Dios quería enseñar que "cuando soy débil, entonces soy fuerte"; que las aflicciones tienen propósito; que somos embajadores de la reconciliación; y que dar con generosidad y alegría agrada a Dios.',consequences:'2 Corintios reveló el corazón del ministerio cristiano auténtico: humilde, sufrido y dependiente de la gracia. Su enseñanza sobre la generosidad (capítulos 8-9) fundamenta la mayordomía cristiana, y su testimonio sobre la debilidad ha consolado a innumerables creyentes en pruebas.',practicalLessons:['El poder de Dios se perfecciona en tu debilidad; tus limitaciones son oportunidades para su gracia.','El consuelo que recibes de Dios en la aflicción te capacita para consolar a otros.','Da con generosidad y alegría: "Dios ama al dador alegre".','Eres embajador de Cristo, llamado a llevar el mensaje de reconciliación al mundo.'],christConnection:'Pablo presenta a Cristo como aquel que "por amor a nosotros se hizo pobre, siendo rico, para que nosotros con su pobreza fuésemos enriquecidos". Cristo es el centro del ministerio de la reconciliación: "Dios estaba en Cristo reconciliando consigo al mundo". El versículo cumbre declara que Dios "al que no conoció pecado, por nosotros lo hizo pecado, para que nosotros fuésemos hechos justicia de Dios en él" (5:21): el gran intercambio del evangelio. Toda la suficiencia y el poder del creyente vienen de Cristo.',keyVerses:[{ref:'2 Corintios 5:17',text:'De modo que si alguno está en Cristo, nueva criatura es; las cosas viejas pasaron; he aquí todas son hechas nuevas.'},{ref:'2 Corintios 12:9',text:'Bástate mi gracia; porque mi poder se perfecciona en la debilidad.'},{ref:'2 Corintios 5:21',text:'Al que no conoció pecado, por nosotros lo hizo pecado, para que nosotros fuésemos hechos justicia de Dios en él.'}],readingCall:'2 Corintios te mostrará que Dios usa tus debilidades para mostrar su poder. Te invitamos a leer sus 13 capítulos y descubrir el corazón de un siervo de Dios que lo dio todo. Si te sientes débil o insuficiente, los capítulos 4 y 12 te recordarán que la gracia de Dios te basta y que su poder brilla justamente en tu fragilidad.'}, name:'2 Corintios', abbr:'2 Co', t:'NT', chapters:13,
        author:'Pablo', date:'~56 d.C.', genre:'Epístola',
        context:'La carta más personal de Pablo, escrita para defender su ministerio apostólico ante falsos maestros y reconciliarse con la iglesia de Corinto.',
        summary:'2 Corintios es la carta más personal y emotiva de Pablo. Tras un conflicto doloroso con la iglesia, Pablo abre su corazón: habla de sus sufrimientos, su debilidad y el consuelo de Dios. Defiende su ministerio apostólico ante falsos maestros que lo criticaban. El tema central es la paradoja del poder en la debilidad: "cuando soy débil, entonces soy fuerte". También enseña sobre la generosidad cristiana y la nueva creación que somos en Cristo.',
        purpose:'Defender el ministerio apostólico de Pablo, reconciliar la relación con la iglesia y enseñar que el poder de Dios se perfecciona en la debilidad.',
        themes:['Consuelo en el sufrimiento', 'Poder en la debilidad', 'Nueva creación', 'Generosidad', 'Ministerio auténtico', 'Reconciliación'],
        keyVerse:{ ref:'2 Corintios 5:17', text:'De modo que si alguno está en Cristo, nueva criatura es; las cosas viejas pasaron; he aquí todas son hechas nuevas.' },
        characters:[{ name:'Pablo', role:'Apóstol que defiende su ministerio', icon:'📜' }, { name:'Tito', role:'Mensajero de reconciliación', icon:'🕊' }],
        teaching:'El poder de Dios se manifiesta en nuestra debilidad, no en nuestra fuerza. En Cristo somos nueva creación. El sufrimiento nos capacita para consolar a otros con el consuelo que recibimos de Dios.',
        application:'No debemos avergonzarnos de nuestras debilidades; son oportunidades para que el poder de Dios brille. Como nuevas criaturas, nuestro pasado no nos define. La generosidad alegre refleja la gracia recibida.',
        curiosities:['Es la carta más autobiográfica y emotiva de Pablo.', 'Menciona su "aguijón en la carne" y la respuesta de Dios.', 'Contiene la enseñanza más extensa del NT sobre la ofrenda.', 'Pablo lista sus sufrimientos como credenciales de su ministerio.'],
        timeline:[{ period:'Conflicto', desc:'Tensión entre Pablo y la iglesia' }, { period:'Reconciliación', desc:'Tito trae buenas noticias' }, { period:'Carta', desc:'Pablo abre su corazón y defiende su ministerio' }, { period:'Visita', desc:'Prepara su tercera visita a Corinto' }],
      },
      { id:'ga', deep:{whatHappens:'Gálatas es el manifiesto de la libertad cristiana. Pablo confronta con vehemencia a las iglesias de Galacia, que estaban siendo seducidas por falsos maestros (judaizantes) que enseñaban que para ser salvo había que cumplir la ley judía, especialmente la circuncisión. Pablo defiende apasionadamente que la salvación es solo por gracia mediante la fe en Cristo, no por las obras de la ley. Proclama que en Cristo somos libres, hijos de Dios, y que debemos vivir guiados por el Espíritu, produciendo su fruto.',context:{general:'Escrita por Pablo hacia el año 48-55 d.C. a las iglesias de la región de Galacia, posiblemente su carta más temprana.',political:'Galacia era una provincia romana en Asia Menor. Las iglesias incluían tanto a judíos como a gentiles convertidos.',cultural:'Los judaizantes insistían en que los gentiles debían adoptar las costumbres judías (circuncisión, leyes alimentarias, fiestas) para ser verdaderos hijos de Dios, mezclando ley y gracia.',spiritual:'Las iglesias estaban abandonando el evangelio puro de la gracia por un "otro evangelio" de obras. Pablo ve esto como un peligro mortal que anula la obra de Cristo.'},godPurpose:'Dios revela que la salvación es enteramente por gracia mediante la fe, sin añadir las obras de la ley. Defiende la libertad del creyente y muestra que la ley fue un tutor que nos llevó a Cristo, pero que en Él somos hijos libres.',godTeaching:'Dios quería enseñar que añadir requisitos humanos a la salvación destruye el evangelio; que somos justificados por la fe, no por las obras; y que la libertad cristiana no es licencia para pecar, sino la oportunidad de servir en amor y andar en el Espíritu.',consequences:'Gálatas fue clave en la Reforma Protestante; Lutero lo llamó "mi epístola, con la que estoy desposado". Su defensa de la justificación por la fe definió el corazón del evangelio protestante y liberó a la iglesia del legalismo.',practicalLessons:['No puedes ganar la aceptación de Dios con esfuerzo religioso; es un regalo de la gracia.','La libertad en Cristo no es para pecar, sino para amar y servir a otros.','Vive guiado por el Espíritu y producirás su fruto: amor, gozo, paz, paciencia y más.','Cuídate de quienes añaden requisitos al evangelio; la gracia de Cristo es suficiente.'],christConnection:'Gálatas proclama que "Cristo nos redimió de la maldición de la ley, hecho por nosotros maldición". Por la fe en Él somos justificados, no por las obras. Pablo declara: "Con Cristo estoy juntamente crucificado, y ya no vivo yo, mas vive Cristo en mí". En Cristo se borran todas las divisiones: "ya no hay judío ni griego... porque todos vosotros sois uno en Cristo Jesús". La cruz de Cristo es el único fundamento de la salvación y la fuente de la verdadera libertad.',keyVerses:[{ref:'Gálatas 2:20',text:'Con Cristo estoy juntamente crucificado, y ya no vivo yo, mas vive Cristo en mí; y lo que ahora vivo en la carne, lo vivo en la fe del Hijo de Dios.'},{ref:'Gálatas 5:1',text:'Estad, pues, firmes en la libertad con que Cristo nos hizo libres, y no estéis otra vez sujetos al yugo de esclavitud.'},{ref:'Gálatas 5:22-23',text:'Mas el fruto del Espíritu es amor, gozo, paz, paciencia, benignidad, bondad, fe, mansedumbre, templanza.'}],readingCall:'Gálatas es la carta de la libertad cristiana, perfecta si alguna vez has sentido que debes "ganarte" el amor de Dios. Te invitamos a leer sus 6 capítulos y descubrir el gozo de la gracia. Lee el capítulo 5 para conocer el fruto del Espíritu y entender qué significa vivir libre en Cristo, no bajo el peso del legalismo.'}, name:'Gálatas', abbr:'Gá', t:'NT', chapters:6,
        author:'Pablo', date:'~49 d.C.', genre:'Epístola',
        context:'Pablo escribe con urgencia para defender el evangelio de la gracia ante falsos maestros que exigían cumplir la ley judía para ser salvo.',
        summary:'Gálatas es la "carta magna" de la libertad cristiana. Falsos maestros (judaizantes) enseñaban que los gentiles debían cumplir la ley de Moisés (incluida la circuncisión) para ser salvos. Pablo responde con firmeza: la salvación es por gracia mediante la fe, no por obras de la ley. Defiende su autoridad apostólica y proclama que en Cristo somos libres. El fruto de esta libertad es el fruto del Espíritu: amor, gozo, paz, paciencia y más. Es un manifiesto de la gracia.',
        purpose:'Defender el evangelio de la gracia contra el legalismo y proclamar la libertad del creyente en Cristo, que vive por el Espíritu.',
        themes:['Justificación por la fe', 'Libertad cristiana', 'Gracia vs ley', 'El fruto del Espíritu', 'Vida en el Espíritu', 'Crucificados con Cristo'],
        keyVerse:{ ref:'Gálatas 2:20', text:'Con Cristo estoy juntamente crucificado, y ya no vivo yo, mas vive Cristo en mí.' },
        characters:[{ name:'Pablo', role:'Defensor de la gracia', icon:'📜' }, { name:'Pedro', role:'Confrontado por Pablo', icon:'⚓' }],
        teaching:'La salvación es por gracia mediante la fe, jamás por obras. Añadir requisitos al evangelio lo destruye. La verdadera libertad cristiana no es licencia para pecar sino vida guiada por el Espíritu.',
        application:'No podemos ganar la salvación con esfuerzo propio; es regalo de Dios. La libertad en Cristo nos llama a vivir por el Espíritu, no a satisfacer la carne. El fruto del Espíritu evidencia una vida transformada.',
        curiosities:['Es posiblemente la primera carta que Pablo escribió.', 'Lutero la llamó "mi epístola, con la cual estoy casado".', 'Pablo confrontó públicamente a Pedro por hipocresía.', 'El fruto del Espíritu (5:22-23) es uno de los pasajes más amados.'],
        timeline:[{ period:'Misión', desc:'Pablo funda iglesias en Galacia' }, { period:'Crisis', desc:'Llegan los judaizantes con falso evangelio' }, { period:'Carta', desc:'Pablo defiende la gracia con urgencia' }, { period:'Libertad', desc:'Proclama la vida en el Espíritu' }],
      },
      { id:'col', deep:{whatHappens:'Colosenses exalta la supremacía y suficiencia absoluta de Cristo frente a falsas enseñanzas que amenazaban la iglesia. Pablo presenta a Cristo como la imagen del Dios invisible, el creador y sustentador de todo, la cabeza de la iglesia, en quien habita toda la plenitud de la deidad. Confronta una herejía que mezclaba filosofía, misticismo, legalismo judío y ascetismo, mostrando que en Cristo tenemos todo lo necesario y que no hace falta añadir nada. Luego aplica esto a la vida diaria y las relaciones.',context:{general:'Escrita por Pablo desde la prisión en Roma (alrededor del 60-62 d.C.) a la iglesia de Colosas, que él no había fundado pero que estaba amenazada por falsas doctrinas.',political:'Pablo escribía encadenado, pero proclamaba la libertad y supremacía de Cristo sobre todo poder y autoridad.',cultural:'En Colosas circulaba una mezcla peligrosa de filosofía griega, misticismo, culto a los ángeles, legalismo judío y ascetismo, que pretendía complementar o superar a Cristo.',spiritual:'La "herejía colosense" sugería que Cristo no era suficiente y que se necesitaban conocimientos secretos, rituales o experiencias adicionales. Pablo responde exaltando la plena suficiencia de Cristo.'},godPurpose:'Dios revela la supremacía total de Cristo sobre toda la creación y todo poder espiritual. El propósito es mostrar que en Cristo está toda la plenitud, de modo que el creyente no necesita buscar nada fuera de Él.',godTeaching:'Dios quería enseñar que Cristo es preeminente en todo, que en Él estamos completos, y que la vida cristiana consiste en crecer en Él y poner la mirada en las cosas de arriba, no en reglas humanas ni filosofías vacías.',consequences:'Colosenses ofreció a la iglesia una de las cristologías más elevadas del Nuevo Testamento, fundamental para defender la divinidad y supremacía de Cristo frente a herejías de cada época. Su enseñanza sigue protegiendo a los creyentes de añadir "complementos" al evangelio.',practicalLessons:['Cristo es suficiente: no necesitas filosofías, rituales o experiencias extra para estar completo.','Pon la mira en las cosas de arriba, donde está Cristo, no en lo terrenal y pasajero.','Despójate de la vieja manera de vivir y vístete de compasión, bondad, humildad y amor.','Hagas lo que hagas, hazlo de corazón como para el Señor, no para los hombres.'],christConnection:'Colosenses contiene uno de los pasajes más sublimes sobre Cristo (1:15-20): Él es "la imagen del Dios invisible, el primogénito de toda creación", por quien y para quien fueron creadas todas las cosas, "y todas las cosas en él subsisten". En Él "habita toda la plenitud de la Deidad corporalmente" y en Él "estáis completos". Cristo es la cabeza de la iglesia, el reconciliador que hizo la paz mediante la sangre de su cruz, y la esperanza de gloria que vive en el creyente. No hay nada ni nadie por encima de Él.',keyVerses:[{ref:'Colosenses 1:15-16',text:'El es la imagen del Dios invisible, el primogénito de toda creación. Porque en él fueron creadas todas las cosas, las que hay en los cielos y las que hay en la tierra.'},{ref:'Colosenses 3:2',text:'Poned la mira en las cosas de arriba, no en las de la tierra.'},{ref:'Colosenses 3:23',text:'Y todo lo que hagáis, hacedlo de corazón, como para el Señor y no para los hombres.'}],readingCall:'Colosenses te mostrará que Cristo lo es todo y que en Él estás completo. Te invitamos a leer sus 4 capítulos. El pasaje de 1:15-20 te dejará sin aliento al contemplar la grandeza de Jesús. Si alguna vez has sentido que te falta algo en tu fe, este libro te recordará que en Cristo tienes absolutamente todo.'}, name:'Colosenses', abbr:'Col', t:'NT', chapters:4,
        author:'Pablo', date:'~60-62 d.C.', genre:'Epístola',
        context:'Escrita desde la prisión, Pablo combate una herejía que disminuía a Cristo, exaltando su supremacía absoluta sobre todas las cosas.',
        summary:'Colosenses exalta la supremacía de Cristo. Falsos maestros mezclaban el evangelio con filosofía, misticismo y reglas, disminuyendo a Cristo. Pablo responde con uno de los pasajes cristológicos más sublimes: Cristo es "la imagen del Dios invisible", creador y sustentador de todo, cabeza de la iglesia, en quien "habita toda la plenitud de la Deidad". Como tenemos todo en Cristo, no necesitamos añadir nada. La carta llama a poner la mira en las cosas de arriba y vivir la nueva vida en él.',
        purpose:'Proclamar la supremacía y suficiencia absoluta de Cristo contra toda enseñanza que pretenda añadir algo a él.',
        themes:['Supremacía de Cristo', 'Plenitud en Cristo', 'Nueva vida', 'Las cosas de arriba', 'Suficiencia del evangelio', 'Cristo cabeza de la iglesia'],
        keyVerse:{ ref:'Colosenses 3:2', text:'Poned la mira en las cosas de arriba, no en las de la tierra.' },
        characters:[{ name:'Pablo', role:'Apóstol prisionero', icon:'📜' }, { name:'Epafras', role:'Fundador de la iglesia', icon:'🕊' }, { name:'Tíquico', role:'Portador de la carta', icon:'⭐' }],
        teaching:'Cristo es supremo y suficiente; en él tenemos todo lo que necesitamos. No necesitamos añadir filosofías, rituales o reglas a la obra completa de Cristo. La nueva vida en él transforma nuestra mentalidad y conducta.',
        application:'No busquemos plenitud espiritual fuera de Cristo: en él está todo. Enfoquemos nuestra mente en lo eterno, no solo en lo terrenal. La fe en Cristo se traduce en una vida transformada.',
        curiosities:['Contiene uno de los himnos cristológicos más elevados del NT (1:15-20).', 'Es una carta "gemela" de Efesios, con temas paralelos.', 'Pablo no había visitado personalmente esta iglesia.', 'Combate uno de los primeros errores doctrinales de la iglesia.'],
        timeline:[{ period:'Fundación', desc:'Epafras establece la iglesia en Colosas' }, { period:'Herejía', desc:'Falsos maestros disminuyen a Cristo' }, { period:'Carta', desc:'Pablo exalta la supremacía de Cristo' }, { period:'Aplicación', desc:'Llama a la nueva vida en él' }],
      },
      { id:'1ts', deep:{whatHappens:'1 Tesalonicenses es una carta cálida de ánimo a una iglesia joven que Pablo había fundado en una visita breve antes de ser expulsado. Pablo se goza por su fe y perseverancia bajo persecución, defiende la sinceridad de su ministerio, y los anima a vivir en santidad. La carta es especialmente conocida por su enseñanza sobre el regreso de Cristo: consuela a los creyentes que habían perdido seres queridos, asegurándoles que los muertos en Cristo resucitarán y que todos los creyentes estarán para siempre con el Señor.',context:{general:'Escrita por Pablo hacia el año 51 d.C. desde Corinto, una de sus cartas más tempranas, a la iglesia de Tesalónica que había tenido que dejar apresuradamente.',political:'Tesalónica era una importante ciudad romana. Los creyentes enfrentaban persecución de sus propios compatriotas por seguir a Cristo.',cultural:'Era una sociedad pagana donde el cristianismo era una novedad sospechosa. Los nuevos creyentes habían abandonado los ídolos "para servir al Dios vivo y verdadero".',spiritual:'La iglesia era joven en la fe pero ejemplar en su amor y perseverancia. Tenían dudas sobre qué pasaría con los creyentes que morían antes del regreso de Cristo.'},godPurpose:'Dios revela su consuelo y esperanza frente a la muerte: el regreso de Cristo y la resurrección de los creyentes. El propósito es animar a una iglesia perseguida y darle certeza sobre el futuro glorioso que les espera.',godTeaching:'Dios quería enseñar que la esperanza cristiana vence el dolor de la muerte, que debemos vivir en santidad y amor mientras esperamos a Cristo, y que su regreso debe motivarnos a vivir alerta y consolarnos mutuamente.',consequences:'1 Tesalonicenses dio a la iglesia una de sus enseñanzas más claras y consoladoras sobre el regreso de Cristo y la resurrección. Sus palabras se leen en funerales cristianos en todo el mundo, ofreciendo esperanza frente a la muerte.',practicalLessons:['La muerte no es el final para el creyente; los que mueren en Cristo resucitarán y estaremos con el Señor para siempre.','No nos entristecemos como los que no tienen esperanza; nuestra fe transforma el duelo.','Vive en santidad y trabaja con tus manos mientras esperas el regreso de Cristo.','Anímense y edifíquense unos a otros; la comunidad cristiana es fuente de consuelo.'],christConnection:'La carta culmina con la gloriosa promesa del regreso de Cristo: "el Señor mismo con voz de mando, con voz de arcángel, y con trompeta de Dios, descenderá del cielo; y los muertos en Cristo resucitarán primero". Cristo es nuestra esperanza viva: su muerte y resurrección garantizan que, vivos o muertos, viviremos junto a Él. Los creyentes esperan "a su Hijo de los cielos... a Jesús, quien nos libra de la ira venidera". Toda la vida cristiana se orienta hacia el encuentro con Cristo.',keyVerses:[{ref:'1 Tesalonicenses 4:16-17',text:'El Señor mismo... descenderá del cielo; y los muertos en Cristo resucitarán primero. Luego nosotros... seremos arrebatados juntamente con ellos en las nubes para recibir al Señor en el aire, y así estaremos siempre con el Señor.'},{ref:'1 Tesalonicenses 5:16-18',text:'Estad siempre gozosos. Orad sin cesar. Dad gracias en todo, porque esta es la voluntad de Dios para con vosotros en Cristo Jesús.'}],readingCall:'1 Tesalonicenses es una carta de esperanza, ideal si has perdido a un ser querido o necesitas ánimo. Te invitamos a leer sus 5 capítulos cortos. El capítulo 4 te dará una de las promesas más consoladoras de la Biblia sobre la resurrección y el regreso de Cristo. Léelo cuando necesites recordar que lo mejor está por venir.'}, name:'1 Tesalonicenses', abbr:'1 Ts', t:'NT', chapters:5,
        author:'Pablo', date:'~51 d.C.', genre:'Epístola',
        context:'Una de las primeras cartas de Pablo, escrita para animar a una iglesia joven y enseñar sobre la segunda venida de Cristo.',
        summary:'1 Tesalonicenses es una carta cálida de ánimo a una iglesia joven que sufría persecución. Pablo elogia su fe, amor y esperanza, y los anima a seguir creciendo. El tema distintivo es la segunda venida de Cristo: enseña que los creyentes que han muerto resucitarán y que los vivos serán arrebatados para encontrarse con el Señor. Esta esperanza consuela ante la muerte y motiva a vivir santamente, velando y preparados para el regreso de Cristo.',
        purpose:'Animar a una iglesia joven en medio de la persecución y enseñar sobre la segunda venida de Cristo como fuente de consuelo y esperanza.',
        themes:['Segunda venida de Cristo', 'Esperanza ante la muerte', 'Vida santa', 'Ánimo en la persecución', 'Fe, amor y esperanza', 'Velar y prepararse'],
        keyVerse:{ ref:'1 Tesalonicenses 4:16-17', text:'Porque el Señor mismo con voz de mando, con voz de arcángel, y con trompeta de Dios, descenderá del cielo; y los muertos en Cristo resucitarán primero.' },
        characters:[{ name:'Pablo', role:'Padre espiritual', icon:'📜' }, { name:'Timoteo', role:'Enviado a animarlos', icon:'⭐' }, { name:'Silvano', role:'Colaborador', icon:'🕊' }],
        teaching:'La segunda venida de Cristo es la esperanza segura del creyente. Los que mueren en Cristo resucitarán. Esta esperanza nos consuela en el duelo y nos motiva a vivir santamente, listos para su regreso.',
        application:'La muerte no es el fin para los que están en Cristo. Vivamos preparados para el regreso del Señor. La esperanza de la resurrección transforma nuestra manera de enfrentar la pérdida.',
        curiosities:['Es una de las cartas más tempranas de Pablo (~51 d.C.).', 'Cada capítulo menciona la segunda venida de Cristo.', 'Contiene "orad sin cesar" y "dad gracias en todo".', 'Pablo escribió tras recibir buenas noticias por medio de Timoteo.'],
        timeline:[{ period:'~50 d.C.', desc:'Pablo funda la iglesia en Tesalónica' }, { period:'Persecución', desc:'Pablo debe partir pronto' }, { period:'Noticias', desc:'Timoteo informa de su firmeza' }, { period:'Carta', desc:'Pablo los anima y enseña sobre el regreso de Cristo' }],
      },
      { id:'2ts', deep:{whatHappens:'Pablo escribe una segunda carta a Tesalónica para corregir confusiones sobre el regreso de Cristo. Algunos creían erróneamente que el día del Señor ya había llegado, y otros habían dejado de trabajar para esperar ociosamente. Pablo aclara la secuencia de eventos antes del regreso de Cristo, anima a los creyentes a permanecer firmes ante la persecución, y corrige a los ociosos con el principio: "si alguno no quiere trabajar, tampoco coma". Es una carta de corrección y firmeza pastoral.',context:{general:'Escrita por Pablo poco después de 1 Tesalonicenses (alrededor del 51-52 d.C.), tras enterarse de malentendidos en la iglesia.',political:'La persecución contra los creyentes continuaba e incluso se intensificaba en Tesalónica.',cultural:'Circulaban cartas falsas, supuestamente de Pablo, que confundían a la iglesia sobre el fin de los tiempos.',spiritual:'Algunos creyentes, pensando que el fin era inminente, habían abandonado el trabajo y vivían en desorden, mientras otros se angustiaban creyendo que ya habían perdido el regreso de Cristo.'},godPurpose:'Dios revela más detalles sobre los eventos del fin y corrige el fanatismo desordenado. El propósito es dar estabilidad y equilibrio, animando a vivir responsablemente mientras se espera con esperanza el regreso de Cristo.',godTeaching:'Dios quería enseñar que la esperanza del regreso de Cristo no es excusa para la ociosidad sino motivación para vivir con diligencia y firmeza; que debemos discernir la verdad de las falsas enseñanzas; y que el trabajo honrado es parte de la vida cristiana.',consequences:'2 Tesalonicenses equilibró la enseñanza sobre el fin de los tiempos, evitando tanto el fanatismo como la pasividad. Su principio sobre el trabajo influyó profundamente en la ética laboral cristiana a lo largo de la historia.',practicalLessons:['La esperanza del regreso de Cristo debe motivarte a trabajar y vivir con responsabilidad, no a la ociosidad.','Permanece firme y no te dejes sacudir por rumores o falsas enseñanzas sobre el fin.','El trabajo honrado es digno y necesario: "si alguno no quiere trabajar, tampoco coma".','Dios es fiel: Él te fortalecerá y te guardará del mal mientras esperas.'],christConnection:'Cristo es presentado como el Señor que regresará "en llama de fuego" para juzgar y para ser glorificado en sus santos. Mientras tanto, Él mismo consuela los corazones y los confirma en toda buena obra. La carta enseña que el Señor Jesús es fiel y que, a pesar de la oposición y el engaño, su victoria final es segura. La esperanza del creyente descansa en la certeza del regreso glorioso de Cristo y su juicio justo.',keyVerses:[{ref:'2 Tesalonicenses 3:3',text:'Pero fiel es el Señor, que os afirmará y guardará del mal.'},{ref:'2 Tesalonicenses 3:13',text:'Y vosotros, hermanos, no os canséis de hacer bien.'}],readingCall:'2 Tesalonicenses te ayudará a mantener el equilibrio entre esperar a Cristo y vivir responsablemente hoy. Te invitamos a leer sus 3 capítulos. Si alguna vez te has confundido con tantas enseñanzas sobre el fin del mundo, esta carta te dará firmeza y claridad, recordándote que Dios es fiel y te guardará hasta el final.'}, name:'2 Tesalonicenses', abbr:'2 Ts', t:'NT', chapters:3,
        author:'Pablo', date:'~51-52 d.C.', genre:'Epístola',
        context:'Pablo escribe una segunda carta para corregir malentendidos sobre la segunda venida y animar a la iglesia a seguir trabajando con diligencia.',
        summary:'2 Tesalonicenses corrige confusiones sobre el regreso de Cristo. Algunos creían que el día del Señor ya había llegado y, por eso, habían dejado de trabajar. Pablo aclara que ciertos eventos deben ocurrir antes, y exhorta a no caer en el ocio: "si alguno no quiere trabajar, tampoco coma". Anima a permanecer firmes en la sana doctrina y a no cansarse de hacer el bien mientras esperan. Recuerda que Dios es fiel y guardará a los suyos del mal.',
        purpose:'Corregir errores sobre la segunda venida, exhortar a la diligencia en el trabajo y animar a permanecer firmes en la verdad.',
        themes:['La segunda venida', 'Firmeza en la doctrina', 'Diligencia en el trabajo', 'Fidelidad de Dios', 'No cansarse de hacer bien', 'Esperanza ordenada'],
        keyVerse:{ ref:'2 Tesalonicenses 3:3', text:'Pero fiel es el Señor, que os afirmará y guardará del mal.' },
        characters:[{ name:'Pablo', role:'Apóstol y maestro', icon:'📜' }, { name:'Silvano y Timoteo', role:'Coautores', icon:'⭐' }],
        teaching:'La esperanza del regreso de Cristo no debe llevar al ocio sino a la diligencia. Debemos permanecer firmes en la sana doctrina ante las confusiones. Dios es fiel y nos guarda del maligno.',
        application:'Esperar el regreso de Cristo significa trabajar con diligencia, no abandonar nuestras responsabilidades. Cuidémonos de las falsas enseñanzas. No nos cansemos de hacer el bien.',
        curiosities:['Corrige a quienes dejaron de trabajar esperando el fin.', 'El principio "el que no trabaja, que no coma" viene de aquí.', 'Menciona al "hombre de pecado" que aparecería antes del fin.', 'Pablo firma de su puño para autenticar la carta.'],
        timeline:[{ period:'Confusión', desc:'Algunos creen que el día del Señor ya llegó' }, { period:'Ocio', desc:'Ciertos creyentes dejan de trabajar' }, { period:'Carta', desc:'Pablo corrige y enseña sobre el fin' }, { period:'Exhortación', desc:'Llama a la diligencia y la firmeza' }],
      },
      { id:'1tm', deep:{whatHappens:'1 Timoteo es una carta pastoral de Pablo a su joven discípulo Timoteo, a quien dejó al frente de la iglesia de Éfeso. Pablo le da instrucciones sobre cómo organizar y pastorear la iglesia: cómo confrontar falsas enseñanzas, cómo debe ser la oración, los requisitos para los líderes (obispos y diáconos), el cuidado de las viudas, el manejo del dinero, y cómo vivir como un buen ministro de Cristo. Es un manual práctico de liderazgo y vida en la iglesia.',context:{general:'Escrita por Pablo hacia el año 63-65 d.C., después de su primera prisión romana, a Timoteo, su hijo en la fe.',political:'La iglesia operaba en un imperio cada vez más hostil. La organización interna sólida era vital para sobrevivir y crecer.',cultural:'Éfeso era un centro de idolatría y filosofías diversas. Falsos maestros mezclaban mitos, genealogías y ascetismo con el evangelio.',spiritual:'La iglesia necesitaba liderazgo sano y doctrina sólida frente a las falsas enseñanzas. Timoteo, joven y quizás tímido, necesitaba ánimo para ejercer su autoridad pastoral.'},godPurpose:'Dios revela cómo debe organizarse y conducirse la iglesia, su "casa". Establece los fundamentos del liderazgo piadoso, la sana doctrina y el orden, para que la iglesia sea "columna y baluarte de la verdad".',godTeaching:'Dios quería enseñar que el liderazgo en la iglesia requiere carácter probado más que talento; que la sana doctrina protege al rebaño; que la piedad con contentamiento es gran ganancia; y que el amor al dinero es raíz de muchos males.',consequences:'1 Timoteo, junto con 2 Timoteo y Tito (las "epístolas pastorales"), estableció los principios del liderazgo y la organización eclesiástica que han guiado a la iglesia durante 2000 años en la selección de líderes y el cuidado pastoral.',practicalLessons:['El carácter importa más que el talento en el liderazgo: Dios busca integridad antes que habilidad.','La piedad acompañada de contentamiento es gran ganancia; no dejes que el amor al dinero te destruya.','No permitas que nadie te menosprecie por ser joven; sé ejemplo en palabra, conducta y fe.','Pelea la buena batalla de la fe y guarda la sana doctrina con diligencia.'],christConnection:'Pablo presenta a Cristo Jesús como "el único mediador entre Dios y los hombres", que "se dio a sí mismo en rescate por todos". Declara el corazón del evangelio: "Cristo Jesús vino al mundo para salvar a los pecadores, de los cuales yo soy el primero". Cristo es el fundamento de toda la enseñanza y el ministerio: la iglesia existe para sostener la verdad acerca de Él, "Dios fue manifestado en carne". El propósito de todo liderazgo es servir y proclamar a este Salvador.',keyVerses:[{ref:'1 Timoteo 2:5',text:'Porque hay un solo Dios, y un solo mediador entre Dios y los hombres, Jesucristo hombre.'},{ref:'1 Timoteo 4:12',text:'Ninguno tenga en poco tu juventud, sino sé ejemplo de los creyentes en palabra, conducta, amor, espíritu, fe y pureza.'},{ref:'1 Timoteo 6:6',text:'Pero gran ganancia es la piedad acompañada de contentamiento.'}],readingCall:'1 Timoteo es esencial si quieres entender cómo funciona y se lidera una iglesia sana. Te invitamos a leer sus 6 capítulos. Sea que sirvas en el ministerio o quieras crecer en madurez, el capítulo 4 te animará a ser ejemplo sin importar tu edad, y el 6 te enseñará el secreto del contentamiento.'}, name:'1 Timoteo', abbr:'1 Ti', t:'NT', chapters:6,
        author:'Pablo', date:'~63-65 d.C.', genre:'Epístola Pastoral',
        context:'Una carta personal de Pablo a su discípulo Timoteo, joven pastor en Éfeso, con instrucciones sobre el liderazgo y el orden en la iglesia.',
        summary:'1 Timoteo es una carta pastoral: Pablo instruye a su joven discípulo Timoteo sobre cómo pastorear la iglesia de Éfeso. Cubre temas prácticos: confrontar falsas doctrinas, organizar la adoración, los requisitos de los líderes (obispos y diáconos), el cuidado de las viudas y la actitud hacia el dinero. Anima a Timoteo a no dejar que nadie menosprecie su juventud, sino a ser ejemplo en palabra y conducta. Es un manual para el liderazgo y la sana doctrina en la iglesia.',
        purpose:'Instruir a Timoteo y a la iglesia sobre el liderazgo piadoso, la sana doctrina y el orden en la casa de Dios.',
        themes:['Liderazgo en la iglesia', 'Sana doctrina', 'Ejemplo piadoso', 'Cuidado pastoral', 'Contentamiento', 'La buena batalla de la fe'],
        keyVerse:{ ref:'1 Timoteo 6:12', text:'Pelea la buena batalla de la fe, echa mano de la vida eterna, a la cual asimismo fuiste llamado.' },
        characters:[{ name:'Pablo', role:'Mentor apostólico', icon:'📜' }, { name:'Timoteo', role:'Joven pastor de Éfeso', icon:'⭐' }],
        teaching:'El liderazgo en la iglesia requiere carácter probado, no solo dones. La sana doctrina debe protegerse de los errores. La piedad con contentamiento es gran ganancia; el amor al dinero es raíz de todos los males.',
        application:'Los líderes deben ser ejemplos en conducta, no solo en palabras. La juventud no impide el liderazgo si hay madurez espiritual. Busquemos el contentamiento, no la acumulación.',
        curiosities:['Es la primera de las tres "epístolas pastorales".', 'Lista los requisitos de obispos y diáconos en detalle.', '"El amor al dinero es raíz de todos los males" viene de aquí (6:10).', 'Pablo anima a Timoteo a no dejar que menosprecien su juventud.'],
        timeline:[{ period:'Misión', desc:'Pablo deja a Timoteo en Éfeso' }, { period:'Problemas', desc:'Surgen falsas doctrinas' }, { period:'Carta', desc:'Pablo da instrucciones pastorales' }, { period:'Encargo', desc:'Anima a Timoteo a pelear la buena batalla' }],
      },
      { id:'2tm', deep:{whatHappens:'2 Timoteo son las últimas palabras de Pablo, escritas desde la prisión poco antes de su martirio. Es su testamento espiritual, lleno de emoción y urgencia. Anima a Timoteo a no avergonzarse del evangelio, a sufrir por Cristo como buen soldado, a guardar la sana doctrina y a predicar la Palabra con constancia. Pablo advierte sobre los tiempos peligrosos venideros y, mirando su propia muerte de frente, declara con paz: "He peleado la buena batalla, he acabado la carrera, he guardado la fe".',context:{general:'Escrita por Pablo hacia el año 66-67 d.C. desde su segunda y última prisión en Roma, esperando su ejecución bajo Nerón.',political:'Nerón perseguía brutalmente a los cristianos. Pablo estaba encadenado como criminal, abandonado por muchos, esperando la muerte.',cultural:'Ser cristiano era cada vez más peligroso. Muchos se avergonzaban de asociarse con prisioneros como Pablo.',spiritual:'Pablo sabía que su fin estaba cerca y quería asegurar que Timoteo y la siguiente generación permanecieran fieles y transmitieran el evangelio intacto.'},godPurpose:'Dios revela cómo terminar bien la carrera de la fe y transmitir el evangelio a la siguiente generación. A través de las últimas palabras de Pablo, muestra el valor de la fidelidad hasta la muerte y la fiabilidad de su Palabra.',godTeaching:'Dios quería enseñar que vale la pena sufrir por el evangelio, que debemos guardar y transmitir fielmente la fe, que las Escrituras son inspiradas por Dios y suficientes, y que la fidelidad hasta el final tiene una corona reservada.',consequences:'2 Timoteo dejó a la iglesia el modelo de un creyente que terminó bien, y la afirmación más clara sobre la inspiración de las Escrituras (3:16). Sus palabras finales han inspirado a mártires y misioneros a permanecer fieles hasta la muerte.',practicalLessons:['No te avergüences del evangelio ni de seguir a Cristo, cueste lo que cueste.','Las Escrituras son inspiradas por Dios y útiles para enseñar, corregir e instruir; aférrate a ellas.','Transmite la fe a otros fieles que puedan enseñar a más; la fe se pasa de generación en generación.','Vive de modo que al final puedas decir: "he peleado la buena batalla, he guardado la fe".'],christConnection:'Pablo enfoca todo en Cristo Jesús, "quien quitó la muerte y sacó a luz la vida y la inmortalidad por el evangelio". Recuerda a Timoteo "a Jesucristo, del linaje de David, resucitado de los muertos". La esperanza de Pablo ante la muerte es "la corona de justicia, la cual me dará el Señor, juez justo, en aquel día". Cristo es fiel aun cuando nosotros somos infieles, porque "no puede negarse a sí mismo". Toda la fortaleza para sufrir y permanecer viene de la gracia que está en Cristo Jesús.',keyVerses:[{ref:'2 Timoteo 1:7',text:'Porque no nos ha dado Dios espíritu de cobardía, sino de poder, de amor y de dominio propio.'},{ref:'2 Timoteo 3:16',text:'Toda la Escritura es inspirada por Dios, y útil para enseñar, para redargüir, para corregir, para instruir en justicia.'},{ref:'2 Timoteo 4:7',text:'He peleado la buena batalla, he acabado la carrera, he guardado la fe.'}],readingCall:'2 Timoteo son las últimas palabras de un hombre que lo dio todo por Cristo, y conmueven profundamente. Te invitamos a leer sus 4 capítulos. Léelos lentamente, como quien escucha el corazón de un padre espiritual antes de morir. Te desafiarán a no avergonzarte del evangelio y a vivir de modo que puedas terminar bien tu propia carrera.'}, name:'2 Timoteo', abbr:'2 Ti', t:'NT', chapters:4,
        author:'Pablo', date:'~66-67 d.C.', genre:'Epístola Pastoral',
        context:'La última carta de Pablo, escrita desde la prisión poco antes de su martirio. Es su testamento espiritual a su amado discípulo Timoteo.',
        summary:'2 Timoteo son las últimas palabras conocidas de Pablo, escritas en prisión cerca de su ejecución. Con un tono íntimo y urgente, exhorta a Timoteo a permanecer fiel, a no avergonzarse del evangelio, a soportar el sufrimiento y a predicar la Palabra "a tiempo y fuera de tiempo". Afirma la inspiración de las Escrituras como útiles para toda buena obra. Termina con una de las declaraciones más conmovedoras: "he peleado la buena batalla, he acabado la carrera, he guardado la fe". Es un testamento de fidelidad hasta el fin.',
        purpose:'Animar a Timoteo a permanecer fiel y valiente en el ministerio, predicando la Palabra y soportando el sufrimiento hasta el fin.',
        themes:['Fidelidad hasta el fin', 'La Palabra inspirada', 'Soportar el sufrimiento', 'Predicar el evangelio', 'Legado espiritual', 'Acabar la carrera'],
        keyVerse:{ ref:'2 Timoteo 1:7', text:'Porque no nos ha dado Dios espíritu de cobardía, sino de poder, de amor y de dominio propio.' },
        characters:[{ name:'Pablo', role:'Apóstol mártir', icon:'📜' }, { name:'Timoteo', role:'Hijo en la fe', icon:'⭐' }],
        teaching:'Dios nos da poder, amor y dominio propio, no cobardía. Toda la Escritura es inspirada por Dios y útil. La meta de la vida cristiana es terminar fieles: pelear la batalla, acabar la carrera, guardar la fe.',
        application:'No nos avergoncemos del evangelio aunque cueste. La Palabra de Dios es nuestra guía suficiente. Vivamos de modo que al final podamos decir, como Pablo, que guardamos la fe.',
        curiosities:['Es la última carta de Pablo antes de su martirio.', 'Contiene la afirmación clave sobre la inspiración de las Escrituras (3:16).', '"He peleado la buena batalla" es su epitafio espiritual.', 'Pablo pide su capa y sus libros, detalle humano conmovedor.'],
        timeline:[{ period:'Prisión', desc:'Pablo encarcelado en Roma' }, { period:'Soledad', desc:'Muchos lo han abandonado' }, { period:'Carta', desc:'Su testamento final a Timoteo' }, { period:'Martirio', desc:'Pablo termina su carrera con fidelidad' }],
      },
      { id:'tit', deep:{whatHappens:'Tito es una carta pastoral de Pablo a su colaborador Tito, a quien dejó organizando las iglesias en la isla de Creta. Pablo le instruye sobre cómo nombrar ancianos, confrontar a los falsos maestros, y enseñar a los diferentes grupos de la iglesia (ancianos, ancianas, jóvenes, siervos) a vivir de manera coherente con el evangelio. El tema central es que la sana doctrina debe producir buenas obras: la gracia de Dios nos enseña a vivir piadosamente mientras esperamos el regreso de Cristo.',context:{general:'Escrita por Pablo hacia el año 63-65 d.C., similar en contenido a 1 Timoteo, dirigida a Tito en la isla de Creta.',political:'Creta era una isla del Mediterráneo bajo dominio romano, con una población de mala reputación moral.',cultural:'Los cretenses tenían fama de mentirosos y perezosos (Pablo cita a un poeta cretense que lo decía). Era un ambiente difícil para establecer iglesias sanas.',spiritual:'Las iglesias jóvenes de Creta necesitaban líderes íntegros y enseñanza sólida que produjera transformación real de vida en un entorno moralmente corrupto.'},godPurpose:'Dios revela que la verdadera fe se demuestra en buenas obras y en una vida transformada. El propósito es establecer iglesias sanas con líderes íntegros y creyentes cuya conducta adorne el evangelio.',godTeaching:'Dios quería enseñar que la gracia no solo salva sino que también educa: nos enseña a renunciar a la impiedad y vivir sobria, justa y piadosamente. La sana doctrina y la buena conducta son inseparables.',consequences:'Tito reforzó, junto con las otras cartas pastorales, los principios del liderazgo eclesiástico y la conexión vital entre la doctrina correcta y la vida transformada, un equilibrio que ha protegido a la iglesia de la fe muerta y del legalismo vacío.',practicalLessons:['La fe verdadera siempre produce buenas obras; lo que crees debe transformar cómo vives.','La gracia de Dios nos enseña a decir "no" al pecado y "sí" a una vida piadosa.','Los líderes deben ser ejemplo de integridad; el carácter respalda el mensaje.','Cada etapa de la vida tiene su manera de honrar a Dios; todos somos llamados a una conducta ejemplar.'],christConnection:'Tito presenta a Cristo como "nuestro gran Dios y Salvador Jesucristo", afirmando claramente su divinidad. Declara que Él "se dio a sí mismo por nosotros para redimirnos de toda iniquidad y purificar para sí un pueblo propio, celoso de buenas obras". La salvación es por su gracia y misericordia, "no por obras de justicia que nosotros hubiéramos hecho", sino por su lavamiento y renovación. Esperamos "la manifestación gloriosa de nuestro gran Dios y Salvador". Cristo es quien salva y quien transforma.',keyVerses:[{ref:'Tito 2:11-12',text:'Porque la gracia de Dios se ha manifestado para salvación a todos los hombres, enseñándonos que, renunciando a la impiedad y a los deseos mundanos, vivamos en este siglo sobria, justa y piadosamente.'},{ref:'Tito 3:5',text:'Nos salvó, no por obras de justicia que nosotros hubiéramos hecho, sino por su misericordia, por el lavamiento de la regeneración y por la renovación en el Espíritu Santo.'}],readingCall:'Tito es breve pero poderoso: te muestra que la fe verdadera cambia la vida. Te invitamos a leer sus 3 capítulos en una sola sentada. El capítulo 2 te mostrará cómo la gracia de Dios nos enseña a vivir, y el 3 te recordará que fuimos salvados por su misericordia, no por nuestros méritos. Una lectura que renueva el corazón.'}, name:'Tito', abbr:'Tit', t:'NT', chapters:3,
        author:'Pablo', date:'~63-65 d.C.', genre:'Epístola Pastoral',
        context:'Pablo escribe a Tito, dejado en Creta para organizar las iglesias, con instrucciones sobre el liderazgo y la buena conducta.',
        summary:'Tito es una carta pastoral breve y práctica. Pablo dejó a Tito en la isla de Creta para "corregir lo deficiente" y nombrar líderes en cada iglesia. La carta enfatiza la conexión entre la sana doctrina y la buena conducta: lo que creemos debe reflejarse en cómo vivimos. Pablo describe el carácter requerido para los ancianos, instruye a distintos grupos de la iglesia y subraya que la gracia de Dios nos enseña a vivir santamente. Las buenas obras son fruto, no causa, de la salvación.',
        purpose:'Instruir sobre el nombramiento de líderes piadosos y enseñar que la sana doctrina produce buenas obras y una vida transformada.',
        themes:['Sana doctrina y conducta', 'Liderazgo piadoso', 'Buenas obras', 'La gracia que enseña', 'Orden en la iglesia', 'Vida transformada'],
        keyVerse:{ ref:'Tito 2:11', text:'Porque la gracia de Dios se ha manifestado para salvación a todos los hombres.' },
        characters:[{ name:'Pablo', role:'Apóstol y mentor', icon:'📜' }, { name:'Tito', role:'Líder en Creta', icon:'⭐' }],
        teaching:'La sana doctrina siempre produce buena conducta. La gracia de Dios no solo nos salva sino que nos enseña a vivir santamente. Las buenas obras son la evidencia, no el medio, de la salvación.',
        application:'Nuestra fe debe reflejarse en nuestra forma de vivir. La gracia nos transforma para hacer el bien. Los líderes deben tener carácter probado e irreprensible.',
        curiosities:['Tito fue dejado en Creta, isla con fama de difícil.', 'Conecta directamente la doctrina correcta con la vida correcta.', 'Menciona "buenas obras" seis veces en solo tres capítulos.', 'Es una de las cartas pastorales junto con 1 y 2 Timoteo.'],
        timeline:[{ period:'Misión', desc:'Pablo y Tito ministran en Creta' }, { period:'Encargo', desc:'Tito queda para organizar las iglesias' }, { period:'Carta', desc:'Pablo da instrucciones sobre líderes y conducta' }, { period:'Gracia', desc:'Enseña que la gracia produce santidad' }],
      },
      { id:'flm', deep:{whatHappens:'Filemón es la carta más personal y corta de Pablo, una obra maestra de tacto y amor cristiano. Onésimo, un esclavo que había huido de su amo Filemón (un cristiano), se encontró con Pablo en prisión y se convirtió. Ahora Pablo lo envía de regreso a Filemón, no ya como esclavo sino como "hermano amado", e intercede por él pidiendo que lo reciba con perdón y que cargue cualquier deuda a la cuenta de Pablo. Es un ejemplo vivo de cómo el evangelio transforma las relaciones humanas.',context:{general:'Escrita por Pablo desde la prisión en Roma (alrededor del 60-62 d.C.), enviada junto con Colosenses, a Filemón, un creyente acomodado de Colosas.',political:'La esclavitud era una institución universal en el Imperio Romano; un esclavo fugitivo podía ser castigado severamente o incluso ejecutado.',cultural:'Devolver un esclavo fugitivo era lo esperado legalmente, pero Pablo apela a un principio superior: la hermandad en Cristo que trasciende las categorías sociales.',spiritual:'El evangelio estaba creando una nueva realidad donde amo y esclavo eran hermanos. Pablo no ataca frontalmente la esclavitud, sino que siembra el principio que la haría insostenible: la igualdad en Cristo.'},godPurpose:'Dios revela el poder transformador del evangelio en las relaciones humanas. A través de un caso concreto, muestra cómo el perdón, la reconciliación y la hermandad en Cristo derriban las barreras sociales más profundas.',godTeaching:'Dios quería enseñar que en Cristo las relaciones se redefinen: ya no hay esclavo ni libre, sino hermanos. Enseña el perdón, la intercesión por otros, y que el evangelio tiene implicaciones sociales reales.',consequences:'Aunque breve, Filemón plantó una semilla revolucionaria: si amo y esclavo son hermanos en Cristo, la esclavitud no puede sostenerse. A lo largo de la historia, este principio inspiró a cristianos a luchar por la abolición de la esclavitud y la dignidad humana.',practicalLessons:['El evangelio transforma todas tus relaciones: en Cristo, las viejas categorías sociales pierden su poder.','Perdonar y recibir de nuevo a quien nos falló refleja el corazón de Dios.','Interceder por otros, incluso asumiendo sus deudas, imita el amor de Cristo.','La fe verdadera produce cambios concretos en cómo tratamos a las personas.'],christConnection:'Filemón es una hermosa imagen del evangelio. Así como Pablo intercede por Onésimo, el esclavo culpable, y dice "si en algo te dañó, o te debe, ponlo a mi cuenta", así Cristo intercede por nosotros, pecadores culpables, asumiendo nuestra deuda ante el Padre. Pablo pide que Onésimo sea recibido "como a mí mismo"; Cristo nos presenta ante Dios revestidos de su propia justicia. La carta entera ilustra la sustitución y la reconciliación que Cristo logró por nosotros en la cruz.',keyVerses:[{ref:'Filemón 1:16',text:'No ya como esclavo, sino como más que esclavo, como hermano amado.'},{ref:'Filemón 1:18',text:'Y si en algo te dañó, o te debe, ponlo a mi cuenta.'}],readingCall:'Filemón se lee en cinco minutos pero te marca el corazón: es el evangelio en acción. Te invitamos a leer este único capítulo y ver cómo Pablo intercede por un esclavo culpable, igual que Cristo intercede por nosotros. Una pequeña joya que muestra cómo la fe transforma las relaciones y refleja el perdón de Dios.'}, name:'Filemón', abbr:'Flm', t:'NT', chapters:1,
        author:'Pablo', date:'~60-62 d.C.', genre:'Epístola',
        context:'Una carta personal de Pablo a Filemón, pidiéndole que reciba de vuelta a Onésimo, su esclavo fugitivo que se había convertido al cristianismo.',
        summary:'Filemón es la carta más personal y corta de Pablo. Onésimo, un esclavo que había huido de su amo Filemón, conoció a Pablo en prisión y se convirtió. Ahora Pablo lo envía de vuelta, no como esclavo sino "como hermano amado", e intercede por él. Con gran tacto, Pablo apela al amor en vez de mandar, ofreciéndose a pagar cualquier deuda de Onésimo. La carta es un hermoso ejemplo del poder transformador del evangelio que cambia las relaciones y derriba barreras sociales.',
        purpose:'Interceder por Onésimo y mostrar cómo el evangelio transforma las relaciones, convirtiendo a un esclavo y su amo en hermanos.',
        themes:['Perdón y reconciliación', 'Transformación de relaciones', 'Igualdad en Cristo', 'Intercesión', 'El amor sobre la obligación', 'Restauración'],
        keyVerse:{ ref:'Filemón 1:6', text:'Para que la participación de tu fe sea eficaz en el conocimiento de todo el bien que está en vosotros por Cristo Jesús.' },
        characters:[{ name:'Pablo', role:'Intercesor', icon:'📜' }, { name:'Filemón', role:'Amo cristiano', icon:'⭐' }, { name:'Onésimo', role:'Esclavo convertido', icon:'🕊' }],
        teaching:'El evangelio transforma todas las relaciones, derribando barreras sociales. En Cristo, un esclavo y su amo son hermanos iguales. El perdón y la reconciliación son frutos del evangelio.',
        application:'El evangelio nos llama a perdonar y reconciliarnos. En Cristo, las diferencias sociales se disuelven en hermandad. La intercesión amorosa por otros refleja el corazón de Cristo.',
        curiosities:['Es la carta más corta de Pablo y muy personal.', 'Onésimo significa "útil"; Pablo hace un juego de palabras con su nombre.', 'Plantó semillas que con el tiempo ayudaron a abolir la esclavitud.', 'Pablo se ofrece a pagar personalmente la deuda de Onésimo.'],
        timeline:[{ period:'Huida', desc:'Onésimo escapa de Filemón' }, { period:'Conversión', desc:'Onésimo conoce a Pablo y se convierte' }, { period:'Carta', desc:'Pablo intercede por él' }, { period:'Regreso', desc:'Onésimo vuelve como hermano amado' }],
      },
      { id:'stg', deep:{whatHappens:'Santiago es el libro más práctico del Nuevo Testamento, enfocado en cómo la fe verdadera se demuestra en la conducta diaria. Con un estilo directo similar al de Proverbios, aborda temas concretos: la perseverancia en las pruebas, el peligro de la lengua, el favoritismo, la relación entre fe y obras, la sabiduría que viene de Dios, la oración, y la advertencia contra el orgullo y la riqueza. Su tesis central: "la fe sin obras está muerta". La fe genuina siempre produce frutos.',context:{general:'Escrita por Santiago, hermano de Jesús y líder de la iglesia de Jerusalén, hacia el año 45-50 d.C., posiblemente el primer libro del Nuevo Testamento.',political:'Dirigida a cristianos judíos dispersos por la persecución, que enfrentaban pruebas, pobreza y opresión de los ricos.',cultural:'Refleja la tradición de sabiduría judía. Santiago escribe como un pastor preocupado por la conducta práctica de creyentes esparcidos.',spiritual:'Algunos habían malentendido la gracia como excusa para una fe pasiva e inactiva. Santiago corrige: la fe verdadera necesariamente produce obras, o no es fe en absoluto.'},godPurpose:'Dios revela que la fe auténtica es viva y activa, demostrada en la conducta. El propósito es corregir una religiosidad vacía y llamar a los creyentes a una fe que se traduzca en obras de amor y justicia.',godTeaching:'Dios quería enseñar que la fe sin obras está muerta; que las pruebas producen madurez; que la lengua debe ser dominada; que la verdadera religión es cuidar a los necesitados y mantenerse sin mancha; y que debemos ser hacedores de la Palabra, no solo oidores.',consequences:'Santiago equilibró la enseñanza de la iglesia, mostrando que la salvación por gracia (Pablo) y la fe que produce obras (Santiago) no se contradicen sino que se complementan. Su enfoque práctico ha guiado la ética cristiana cotidiana durante siglos.',practicalLessons:['La fe verdadera siempre produce obras; si tu fe no cambia cómo vives, examínala.','Considera las pruebas como oportunidad de crecimiento: producen paciencia y madurez.','Domina tu lengua: con ella bendecimos a Dios y herimos a las personas; tiene gran poder.','Sé hacedor de la Palabra y no solo oidor; escuchar sin actuar es engañarse a uno mismo.'],christConnection:'Aunque Santiago menciona a Cristo explícitamente pocas veces, su enseñanza refleja directamente el Sermón del Monte de Jesús: sobre los pobres, la lengua, los juramentos, el amor al prójimo. Santiago, que creció con Jesús y al principio no creyó en Él, se convirtió tras la resurrección y lo llama "el Señor de la gloria". La "sabiduría de lo alto" que describe es el carácter de Cristo: pura, pacífica, amable, llena de misericordia. La fe que salva es la fe en Jesús, y esa fe genuina produce las obras que honran su nombre.',keyVerses:[{ref:'Santiago 1:22',text:'Pero sed hacedores de la palabra, y no tan solamente oidores, engañándoos a vosotros mismos.'},{ref:'Santiago 2:17',text:'Así también la fe, si no tiene obras, es muerta en sí misma.'},{ref:'Santiago 1:2-3',text:'Hermanos míos, tened por sumo gozo cuando os halléis en diversas pruebas, sabiendo que la prueba de vuestra fe produce paciencia.'}],readingCall:'Santiago es el libro más práctico de la Biblia: te dirá exactamente cómo se ve una fe que funciona. Te invitamos a leer sus 5 capítulos. Es directo y desafiante. Léelo cuando quieras que tu fe deje de ser solo palabras y se convierta en acción, especialmente el capítulo 1 sobre las pruebas y el 3 sobre el poder de la lengua.'}, name:'Santiago', abbr:'Stg', t:'NT', chapters:5,
        author:'Santiago (hermano de Jesús)', date:'~45-49 d.C.', genre:'Epístola',
        context:'Escrita por Santiago, hermano de Jesús y líder de la iglesia de Jerusalén, esta carta práctica enfatiza que la fe verdadera se demuestra en obras.',
        summary:'Santiago es el "libro de Proverbios" del Nuevo Testamento: práctico, directo y lleno de sabiduría para la vida diaria. Su tema central: la fe genuina produce obras; "la fe sin obras es muerta". Aborda temas como soportar las pruebas con gozo, dominar la lengua, no hacer acepción de personas, la verdadera sabiduría, la paciencia y el poder de la oración. No contradice a Pablo (que enseña justificación por fe) sino que muestra el otro lado: una fe real siempre se evidencia en cómo vivimos.',
        purpose:'Mostrar que la fe verdadera se demuestra en obras prácticas, y ofrecer sabiduría para vivir la vida cristiana en el día a día.',
        themes:['Fe y obras', 'Sabiduría práctica', 'Dominar la lengua', 'Pruebas y paciencia', 'El poder de la oración', 'No favoritismo'],
        keyVerse:{ ref:'Santiago 1:2-3', text:'Hermanos míos, tened por sumo gozo cuando os halléis en diversas pruebas, sabiendo que la prueba de vuestra fe produce paciencia.' },
        characters:[{ name:'Santiago', role:'Hermano de Jesús, líder de la iglesia', icon:'📜' }],
        teaching:'La fe verdadera siempre produce obras; una fe sin frutos está muerta. Las pruebas, enfrentadas con la actitud correcta, producen madurez. La lengua es pequeña pero poderosa; debemos dominarla.',
        application:'Nuestra fe debe verse en nuestras acciones, no solo en palabras. Enfrentemos las pruebas con gozo, sabiendo que nos hacen madurar. Cuidemos lo que decimos, pues la lengua tiene gran poder.',
        curiosities:['Santiago era hermano de Jesús y no creyó en él hasta después de la resurrección.', 'Tiene más mandatos por capítulo que cualquier otro libro del NT.', 'Lutero la llamó "epístola de paja" por su énfasis en obras, pero es plenamente bíblica.', 'Se parece mucho al Sermón del Monte de Jesús.'],
        timeline:[{ period:'Iglesia primitiva', desc:'Santiago lidera la iglesia de Jerusalén' }, { period:'Dispersión', desc:'Escribe a los creyentes esparcidos' }, { period:'Carta', desc:'Enseña sobre la fe que produce obras' }, { period:'Concilio', desc:'Santiago preside el Concilio de Jerusalén' }],
      },
      { id:'1pe', deep:{whatHappens:'1 Pedro es una carta de esperanza para cristianos que sufrían persecución. Pedro les recuerda su identidad gloriosa como pueblo escogido de Dios y los anima a perseverar con gozo en medio del sufrimiento, siguiendo el ejemplo de Cristo, que sufrió injustamente sin devolver mal por mal. Enseña cómo vivir santamente en una sociedad hostil: con sumisión, respeto, buenas obras y un testimonio que silencie a los críticos. El sufrimiento, dice Pedro, es temporal y produce una fe más valiosa que el oro.',context:{general:'Escrita por el apóstol Pedro hacia el año 62-64 d.C. desde Roma ("Babilonia"), a creyentes dispersos en Asia Menor que enfrentaban creciente hostilidad.',political:'La persecución bajo Nerón comenzaba a intensificarse. Ser cristiano implicaba marginación social y peligro real.',cultural:'Los creyentes eran vistos con sospecha por abandonar las costumbres paganas. Eran "extranjeros y peregrinos" en su propia sociedad.',spiritual:'Los cristianos necesitaban entender el sentido del sufrimiento y cómo mantener un testimonio fiel y gozoso en medio de la oposición.'},godPurpose:'Dios revela que el sufrimiento del creyente tiene propósito y es temporal, y que nuestra esperanza está en una herencia incorruptible reservada en el cielo. Muestra cómo el ejemplo de Cristo nos guía a sufrir con dignidad y esperanza.',godTeaching:'Dios quería enseñar que somos un pueblo escogido con una identidad gloriosa; que el sufrimiento por hacer el bien es seguir las pisadas de Cristo; y que debemos estar siempre listos para dar razón de nuestra esperanza con mansedumbre.',consequences:'1 Pedro se convirtió en el gran manual de consuelo para la iglesia perseguida en cada época. Su enseñanza sobre el sufrimiento con esperanza ha sostenido a mártires y creyentes oprimidos a lo largo de toda la historia cristiana.',practicalLessons:['El sufrimiento del creyente es temporal y tiene propósito: purifica y fortalece tu fe.','Eres parte de un pueblo escogido, real sacerdocio, nación santa; vive según esa identidad.','Responde al mal con bien, siguiendo el ejemplo de Cristo que no devolvió mal por mal.','Está siempre preparado para explicar tu esperanza, y hazlo con mansedumbre y respeto.'],christConnection:'Pedro centra todo en el ejemplo y el sacrificio de Cristo. Jesús "padeció por nosotros, dejándonos ejemplo, para que sigáis sus pisadas... quien llevó él mismo nuestros pecados en su cuerpo sobre el madero". Cristo es la piedra angular, viva y preciosa, escogida por Dios. Fuimos rescatados "no con cosas corruptibles... sino con la sangre preciosa de Cristo, como de un cordero sin mancha". Su resurrección nos da "una esperanza viva" y una herencia incorruptible. En medio del sufrimiento, miramos a Cristo, que sufrió primero y venció.',keyVerses:[{ref:'1 Pedro 2:9',text:'Mas vosotros sois linaje escogido, real sacerdocio, nación santa, pueblo adquirido por Dios, para que anunciéis las virtudes de aquel que os llamó de las tinieblas a su luz admirable.'},{ref:'1 Pedro 5:7',text:'Echando toda vuestra ansiedad sobre él, porque él tiene cuidado de vosotros.'},{ref:'1 Pedro 3:15',text:'Estad siempre preparados para presentar defensa con mansedumbre y reverencia ante todo el que os demande razón de la esperanza que hay en vosotros.'}],readingCall:'1 Pedro es la carta perfecta para cuando atraviesas dificultades o sientes que no encajas en este mundo. Te invitamos a leer sus 5 capítulos. Te recordarán que el sufrimiento es pasajero, que tu identidad en Dios es gloriosa, y que puedes echar toda tu ansiedad sobre Aquel que cuida de ti.'}, name:'1 Pedro', abbr:'1 P', t:'NT', chapters:5,
        author:'Pedro', date:'~62-64 d.C.', genre:'Epístola',
        context:'Pedro escribe a cristianos dispersos que sufrían persecución, animándolos a perseverar con esperanza en medio del sufrimiento.',
        summary:'1 Pedro es la carta de la esperanza en el sufrimiento. Escrita a creyentes perseguidos esparcidos por Asia Menor, los anima a mantenerse firmes recordando su identidad como pueblo escogido de Dios y su herencia incorruptible en el cielo. Pedro enseña que el sufrimiento por causa de Cristo es un privilegio que nos hace partícipes de sus padecimientos. Llama a una vida santa, a la sumisión por amor a Dios y a echar toda ansiedad sobre él. Cristo, que sufrió por nosotros, es nuestro ejemplo.',
        purpose:'Animar a los creyentes perseguidos a perseverar con esperanza, viviendo santamente y confiando en Dios en medio del sufrimiento.',
        themes:['Esperanza en el sufrimiento', 'Identidad en Cristo', 'Vida santa', 'Sumisión piadosa', 'Cristo como ejemplo', 'Herencia eterna'],
        keyVerse:{ ref:'1 Pedro 5:7', text:'Echando toda vuestra ansiedad sobre él, porque él tiene cuidado de vosotros.' },
        characters:[{ name:'Pedro', role:'Apóstol y pastor', icon:'⚓' }, { name:'Silvano', role:'Escriba de la carta', icon:'🕊' }],
        teaching:'El sufrimiento por Cristo no es extraño sino parte del camino cristiano, y tiene propósito. Nuestra identidad como pueblo de Dios nos da esperanza inquebrantable. Podemos echar toda ansiedad sobre Dios porque él cuida de nosotros.',
        application:'En medio de las pruebas, recordemos nuestra identidad y herencia en Cristo. El sufrimiento por la fe es un privilegio. Entreguemos nuestras ansiedades a Dios, que cuida de nosotros.',
        curiosities:['Escrita poco antes de la persecución de Nerón.', 'Pedro, que negó a Cristo, ahora anima a otros a no avergonzarse de él.', '"Echad toda ansiedad sobre él" es uno de los versículos más consoladores.', 'Llama a los creyentes "linaje escogido, real sacerdocio".'],
        timeline:[{ period:'Dispersión', desc:'Cristianos esparcidos y perseguidos' }, { period:'Carta', desc:'Pedro escribe para animarlos' }, { period:'Esperanza', desc:'Les recuerda su herencia eterna' }, { period:'Persecución', desc:'Los prepara para sufrir con fe' }],
      },
      { id:'2pe', deep:{whatHappens:'2 Pedro es la advertencia final del apóstol antes de morir. Sabiendo que su muerte está cerca, Pedro escribe para fortalecer a los creyentes contra los falsos maestros que se infiltraban en la iglesia, negaban la verdad y se burlaban de la promesa del regreso de Cristo. Pedro los anima a crecer en el conocimiento de Dios y a añadir virtudes a su fe, afirma la veracidad de las Escrituras y de su testimonio ocular de la gloria de Cristo, y asegura que el día del Señor vendrá ciertamente, aunque parezca tardar.',context:{general:'Escrita por Pedro hacia el año 64-67 d.C., poco antes de su martirio, como su testamento final a la iglesia.',political:'La persecución continuaba, pero el peligro mayor que aborda esta carta es interno: los falsos maestros.',cultural:'Habían surgido maestros que mezclaban el evangelio con inmoralidad y falsas doctrinas, aprovechándose de los creyentes por avaricia.',spiritual:'Los falsos maestros negaban el regreso de Cristo y promovían el libertinaje. Pedro defiende la verdad y la certeza del juicio venidero.'},godPurpose:'Dios revela la importancia de crecer en el verdadero conocimiento frente al engaño, y reafirma la certeza de su Palabra y del regreso de Cristo. El propósito es proteger a la iglesia del error y motivarla a la santidad.',godTeaching:'Dios quería enseñar que debemos crecer constantemente en la fe añadiendo virtud, conocimiento y amor; que las Escrituras no son invenciones humanas sino inspiradas por el Espíritu; y que el aparente retraso del regreso de Cristo es paciencia de Dios para que más personas se arrepientan.',consequences:'2 Pedro fortaleció la defensa de la iglesia contra las falsas enseñanzas y reafirmó la autoridad de las Escrituras. Su explicación sobre por qué "tarda" el regreso de Cristo (la paciencia de Dios) ha consolado a creyentes que esperan ese día.',practicalLessons:['Crece constantemente en tu fe: añade virtud, conocimiento, dominio propio, paciencia y amor.','Discierne y rechaza las falsas enseñanzas; no todo lo que suena espiritual viene de Dios.','El "retraso" del regreso de Cristo es la paciencia de Dios dando tiempo para arrepentirse.','La Palabra de Dios es confiable porque vino por hombres inspirados por el Espíritu Santo.'],christConnection:'Pedro funda su mensaje en su testimonio ocular de Cristo: "fuimos testigos oculares de su majestad" en el monte de la transfiguración, donde oyó la voz del Padre. Cristo es "nuestro Señor y Salvador Jesucristo", cuyo conocimiento es la fuente de todo crecimiento y de "todas las cosas que pertenecen a la vida y a la piedad". La carta culmina llamando a "crecer en la gracia y el conocimiento de nuestro Señor y Salvador Jesucristo". Su regreso glorioso es la certeza que ancla la esperanza y motiva la santidad.',keyVerses:[{ref:'2 Pedro 1:21',text:'Porque nunca la profecía fue traída por voluntad humana, sino que los santos hombres de Dios hablaron siendo inspirados por el Espíritu Santo.'},{ref:'2 Pedro 3:9',text:'El Señor no retarda su promesa... sino que es paciente para con nosotros, no queriendo que ninguno perezca, sino que todos procedan al arrepentimiento.'},{ref:'2 Pedro 3:18',text:'Antes bien, creced en la gracia y el conocimiento de nuestro Señor y Salvador Jesucristo.'}],readingCall:'2 Pedro son las últimas advertencias de un apóstol que sabía que iba a morir. Te invitamos a leer sus 3 capítulos. Te enseñarán a crecer en tu fe y a discernir la verdad del error. El capítulo 3 te dará una respuesta clara y consoladora a por qué Cristo aún no ha vuelto: porque Dios es paciente y quiere que más personas se salven.'}, name:'2 Pedro', abbr:'2 P', t:'NT', chapters:3,
        author:'Pedro', date:'~64-67 d.C.', genre:'Epístola',
        context:'En su última carta, Pedro advierte contra los falsos maestros y anima a crecer en el conocimiento de Cristo mientras se espera su regreso.',
        summary:'2 Pedro es la carta de despedida del apóstol, escrita cerca de su muerte. Su preocupación principal son los falsos maestros que negaban la verdad y vivían en inmoralidad. Pedro exhorta a crecer en el conocimiento de Cristo como antídoto contra el error, y reafirma la autoridad de las Escrituras, que vinieron por hombres movidos por el Espíritu Santo. Ante quienes se burlaban de la promesa del regreso de Cristo, recuerda que Dios no tarda sino que es paciente, no queriendo que ninguno perezca.',
        purpose:'Advertir contra los falsos maestros y animar a crecer en el conocimiento de Cristo, reafirmando la certeza de su regreso.',
        themes:['Crecer en el conocimiento', 'Falsos maestros', 'Autoridad de la Escritura', 'El regreso de Cristo', 'Paciencia de Dios', 'Firmeza en la verdad'],
        keyVerse:{ ref:'2 Pedro 3:9', text:'El Señor no retarda su promesa, según algunos la tienen por tardanza, sino que es paciente para con nosotros, no queriendo que ninguno perezca, sino que todos procedan al arrepentimiento.' },
        characters:[{ name:'Pedro', role:'Apóstol en sus últimos días', icon:'⚓' }],
        teaching:'El crecimiento en el conocimiento de Cristo nos protege del error. Las Escrituras son confiables porque vinieron del Espíritu Santo. El aparente retraso del regreso de Cristo es la paciencia de Dios dando tiempo al arrepentimiento.',
        application:'Crezcamos constantemente en nuestra fe para no ser engañados. Confiemos en la Palabra de Dios como autoridad final. La demora del regreso de Cristo es una oportunidad de gracia, no de descuido.',
        curiosities:['Es la última carta de Pedro antes de su martirio.', 'Afirma que las Escrituras vinieron por inspiración del Espíritu Santo.', 'Reconoce las cartas de Pablo como Escritura (3:16).', 'Para Dios "un día es como mil años".'],
        timeline:[{ period:'Últimos días', desc:'Pedro sabe que su muerte se acerca' }, { period:'Advertencia', desc:'Alerta sobre falsos maestros' }, { period:'Carta', desc:'Anima a crecer en el conocimiento' }, { period:'Esperanza', desc:'Reafirma el regreso cierto de Cristo' }],
      },
      { id:'1jn', deep:{whatHappens:'1 Juan es una carta sobre la seguridad y la autenticidad de la fe. El apóstol Juan, ya anciano, escribe para que los creyentes tengan certeza de su salvación y para confrontar a falsos maestros que negaban que Jesús hubiera venido en carne. Juan presenta pruebas claras de la fe genuina: caminar en la luz, obedecer a Dios, amar a los hermanos y creer rectamente en Jesús. Su mensaje gira en torno a tres grandes temas: Dios es luz, Dios es amor, y la certeza de la vida eterna en Cristo.',context:{general:'Escrita por el apóstol Juan hacia el año 85-95 d.C. desde Éfeso, dirigida a las iglesias bajo su cuidado.',political:'Hacia el final del primer siglo, la iglesia enfrentaba tanto presión externa como divisiones internas.',cultural:'Surgía el gnosticismo incipiente, que despreciaba la materia y negaba que Cristo hubiera tenido un cuerpo real, separando el "Cristo espiritual" del Jesús humano.',spiritual:'Algunos falsos maestros habían salido de la iglesia, sembrando dudas. Juan escribe para reafirmar la verdad sobre Cristo y dar a los creyentes seguridad de su salvación.'},godPurpose:'Dios revela cómo tener certeza de la salvación y cómo distinguir la fe verdadera de la falsa. El propósito explícito es "que sepáis que tenéis vida eterna" y que permanezcáis en la verdad y el amor.',godTeaching:'Dios quería enseñar que Él es luz (santidad) y amor; que la fe genuina se demuestra en obediencia y amor a los hermanos; que la confesión y el perdón limpian al creyente; y que podemos tener plena seguridad de la vida eterna en Cristo.',consequences:'1 Juan dio a la iglesia los criterios para discernir la fe auténtica y la seguridad de la salvación. Su enseñanza de que "Dios es amor" se convirtió en una de las definiciones más profundas y citadas sobre el carácter de Dios.',practicalLessons:['Puedes tener certeza de tu salvación: Dios quiere que sepas que tienes vida eterna.','La fe verdadera se demuestra en el amor a los hermanos: no puedes amar a Dios y odiar a tu prójimo.','Si confesamos nuestros pecados, Dios es fiel y justo para perdonarnos y limpiarnos.','El amor de Dios debe transformarnos: "amémonos unos a otros, porque el amor es de Dios".'],christConnection:'1 Juan defiende firmemente que Jesús es el Cristo venido en carne, verdadero Dios y verdadero hombre. Declara que "la sangre de Jesucristo nos limpia de todo pecado" y que Él es "la propiciación por nuestros pecados, y no solamente por los nuestros, sino también por los de todo el mundo". Cristo es la vida eterna manifestada, que Juan vio, oyó y tocó. El amor de Dios se demuestra supremamente en que "envió a su Hijo unigénito al mundo, para que vivamos por él". Conocer a Cristo y permanecer en Él es tener la vida eterna.',keyVerses:[{ref:'1 Juan 1:9',text:'Si confesamos nuestros pecados, él es fiel y justo para perdonar nuestros pecados, y limpiarnos de toda maldad.'},{ref:'1 Juan 4:8',text:'El que no ama, no ha conocido a Dios; porque Dios es amor.'},{ref:'1 Juan 5:13',text:'Estas cosas os he escrito a vosotros que creéis en el nombre del Hijo de Dios, para que sepáis que tenéis vida eterna.'}],readingCall:'1 Juan es la carta de la seguridad: fue escrita para que SEPAS que tienes vida eterna. Te invitamos a leer sus 5 capítulos. Si alguna vez has dudado de tu salvación o de si tu fe es real, este libro te dará certeza. Y te mostrará que la prueba más clara de conocer a Dios es amar a los demás, porque Dios es amor.'}, name:'1 Juan', abbr:'1 Jn', t:'NT', chapters:5,
        author:'Juan el apóstol', date:'~85-95 d.C.', genre:'Epístola',
        context:'Juan escribe para dar seguridad de la salvación a los creyentes y combatir falsas enseñanzas que negaban la encarnación de Cristo.',
        summary:'1 Juan es la carta del amor y la seguridad. Juan escribe para que los creyentes "sepan que tienen vida eterna". Combate a falsos maestros que negaban que Jesús vino en carne. Presenta pruebas de la fe genuina: caminar en la luz, amar a los hermanos, confesar a Cristo y obedecer sus mandamientos. El tema central es el amor: "Dios es amor", y quien permanece en el amor permanece en Dios. La carta da una certeza profunda: si confesamos nuestros pecados, Dios es fiel para perdonarnos.',
        purpose:'Dar seguridad de la vida eterna a los creyentes y combatir las falsas enseñanzas, mostrando las marcas de una fe auténtica.',
        themes:['Dios es amor', 'Seguridad de salvación', 'Caminar en la luz', 'Amor fraternal', 'La verdad sobre Cristo', 'Perdón de pecados'],
        keyVerse:{ ref:'1 Juan 1:9', text:'Si confesamos nuestros pecados, él es fiel y justo para perdonar nuestros pecados, y limpiarnos de toda maldad.' },
        characters:[{ name:'Juan', role:'El apóstol del amor', icon:'❤' }],
        teaching:'Dios es amor, y el amor genuino es la marca del creyente. Podemos tener seguridad de la salvación. La confesión de pecados trae perdón seguro. La fe verdadera se evidencia en el amor y la obediencia.',
        application:'Podemos vivir con la certeza de la salvación. El amor a los hermanos demuestra que conocemos a Dios. Cuando pecamos, no debemos escondernos sino confesar, confiando en el perdón fiel de Dios.',
        curiosities:['"Dios es amor" (4:8) es una de las declaraciones más célebres de la Biblia.', 'Juan usa contrastes: luz/tinieblas, amor/odio, verdad/mentira.', 'La palabra "amor" aparece más de 40 veces.', 'Da varias "pruebas" para tener seguridad de la fe.'],
        timeline:[{ period:'Iglesia tardía', desc:'Surgen falsas enseñanzas sobre Cristo' }, { period:'Carta', desc:'Juan escribe para dar seguridad' }, { period:'Pruebas', desc:'Presenta las marcas de la fe genuina' }, { period:'Amor', desc:'Proclama que Dios es amor' }],
      },
      { id:'2jn', deep:{whatHappens:'2 Juan es una breve carta personal del apóstol Juan a "la señora elegida y sus hijos" (probablemente una iglesia y sus miembros, o una mujer cristiana y su familia). Juan se goza de que caminan en la verdad y los exhorta a dos cosas centrales: caminar en el amor (que es obedecer los mandamientos de Dios) y guardarse de los falsos maestros que negaban que Jesús vino en carne. Advierte que no deben recibir ni dar la bienvenida a quienes promueven falsas doctrinas, para no participar de sus malas obras.',context:{general:'Escrita por el apóstol Juan hacia el año 85-95 d.C., una de las cartas más cortas de la Biblia.',political:'En un tiempo donde los maestros itinerantes viajaban de iglesia en iglesia, era crucial discernir a quién recibir.',cultural:'La hospitalidad era un valor central; recibir a un maestro en casa implicaba apoyar su mensaje. Por eso Juan advierte sobre a quién hospedar.',spiritual:'Los falsos maestros gnósticos viajaban difundiendo errores sobre Cristo. Juan enseña a equilibrar el amor con el discernimiento y la firmeza en la verdad.'},godPurpose:'Dios revela que el amor y la verdad van juntos: amar no significa aceptar cualquier enseñanza. El propósito es proteger a la comunidad de fe del engaño mientras camina en amor genuino.',godTeaching:'Dios quería enseñar que el verdadero amor consiste en obedecer sus mandamientos, que debemos permanecer firmes en la doctrina de Cristo, y que el discernimiento es un acto de amor que protege a la iglesia del error.',consequences:'2 Juan reforzó la importancia de combinar amor y verdad, evitando tanto el legalismo frío como la tolerancia ingenua del error. Su enseñanza guió a la iglesia en cómo relacionarse con quienes enseñan falsas doctrinas.',practicalLessons:['El amor verdadero y la verdad nunca se oponen; amar a Dios es obedecer sus mandamientos.','Sé discernidor: no toda enseñanza que suena espiritual proviene de Dios.','Permanece firme en la sana doctrina sobre Cristo; no la negocies por aceptación.','Caminar en la verdad produce el mayor gozo, tanto para ti como para quienes te aman.'],christConnection:'Juan insiste en "la doctrina de Cristo": quien no permanece en ella no tiene a Dios. El punto central es confesar que "Jesucristo ha venido en carne", la verdad fundamental que los falsos maestros negaban. Cristo es la verdad encarnada, y permanecer en su enseñanza es permanecer en el Padre y el Hijo. El amor que Juan manda es el amor que Cristo modeló y ordenó. Toda la vida cristiana gira en torno a permanecer fieles a quién es Jesús y a amar como Él amó.',keyVerses:[{ref:'2 Juan 1:6',text:'Y este es el amor, que andemos según sus mandamientos. Este es el mandamiento: que andéis en amor.'}],readingCall:'2 Juan se lee en dos minutos pero enseña una lección vital: cómo unir el amor con la verdad. Te invitamos a leer este breve capítulo. En un mundo lleno de mensajes confusos, esta pequeña carta te recordará que amar a Dios es obedecerle y permanecer firme en la verdad sobre Cristo.'}, name:'2 Juan', abbr:'2 Jn', t:'NT', chapters:1,
        author:'Juan el apóstol', date:'~85-95 d.C.', genre:'Epístola',
        context:'Una breve carta personal que equilibra el amor con la verdad, advirtiendo contra recibir a falsos maestros.',
        summary:'2 Juan es una carta breve dirigida a "la señora elegida y sus hijos" (probablemente una iglesia). Equilibra dos temas fundamentales: el amor y la verdad. Juan se goza de que algunos andan en la verdad y los exhorta a amarse unos a otros según el mandamiento de Cristo. Pero también advierte con firmeza: no deben recibir ni apoyar a falsos maestros que niegan que Jesús vino en carne. El amor no significa tolerar el error; la verdad debe protegerse mientras se ama.',
        purpose:'Animar a andar en amor y verdad, advirtiendo contra el apoyo a falsos maestros que niegan a Cristo.',
        themes:['Amor y verdad', 'Discernimiento', 'Andar en la verdad', 'Guardarse del error', 'Hospitalidad sabia', 'Fidelidad a Cristo'],
        keyVerse:{ ref:'2 Juan 1:6', text:'Y este es el amor, que andemos según sus mandamientos.' },
        characters:[{ name:'Juan', role:'El apóstol anciano', icon:'📜' }, { name:'La señora elegida', role:'Destinataria (iglesia)', icon:'⭐' }],
        teaching:'El amor verdadero anda en obediencia a los mandamientos de Dios. El amor y la verdad van juntos: amar no significa tolerar el error. Debemos discernir y no apoyar enseñanzas que niegan a Cristo.',
        application:'El amor cristiano se demuestra en la obediencia. Debemos ser amorosos pero también discernir la verdad. No todo lo que se presenta como espiritual debe ser apoyado.',
        curiosities:['Es uno de los libros más cortos de la Biblia (13 versículos).', 'Equilibra perfectamente el amor con la verdad.', 'Probablemente dirigida a una iglesia local personificada.', 'Juan se llama a sí mismo simplemente "el anciano".'],
        timeline:[{ period:'Iglesia tardía', desc:'Circulan falsos maestros itinerantes' }, { period:'Carta', desc:'Juan escribe sobre amor y verdad' }, { period:'Gozo', desc:'Se alegra por los que andan en la verdad' }, { period:'Advertencia', desc:'Alerta sobre recibir a falsos maestros' }],
      },
      { id:'3jn', deep:{whatHappens:'3 Juan es una carta personal del apóstol Juan a un creyente llamado Gayo, a quien elogia por su fidelidad y hospitalidad hacia los misioneros y maestros itinerantes. Juan contrasta tres personajes: Gayo (ejemplo de generosidad y verdad), Diótrefes (un líder orgulloso que rechazaba la autoridad apostólica y no recibía a los hermanos) y Demetrio (alabado por su buen testimonio). La carta destaca la importancia de apoyar la obra del evangelio y de imitar el bien, no el mal.',context:{general:'Escrita por el apóstol Juan hacia el año 85-95 d.C., dirigida personalmente a Gayo, un líder de iglesia.',political:'Los misioneros dependían de la hospitalidad de los creyentes para sostener su obra, ya que viajaban sin cobrar a los paganos.',cultural:'Recibir y sostener a los predicadores itinerantes era un ministerio vital. Negar la hospitalidad podía paralizar la obra misionera.',spiritual:'Diótrefes representaba un problema grave: el orgullo y el afán de preeminencia en el liderazgo, que rechazaba incluso a los apóstoles. Juan elogia lo contrario en Gayo.'},godPurpose:'Dios revela el valor de apoyar la obra del evangelio y el peligro del orgullo en el liderazgo. El propósito es animar la generosidad y la fidelidad, y advertir contra el espíritu dominante y egoísta.',godTeaching:'Dios quería enseñar que sostener a los obreros del evangelio es colaborar en la verdad; que el orgullo y el afán de poder dañan a la iglesia; y que debemos imitar el bien, pues "el que hace lo bueno es de Dios".',consequences:'3 Juan dejó un modelo permanente sobre la hospitalidad cristiana, el apoyo a los misioneros y los peligros del liderazgo orgulloso. Su enseñanza sigue guiando cómo la iglesia debe sostener la obra del evangelio y elegir a sus líderes.',practicalLessons:['Apoyar a quienes predican el evangelio te hace "colaborador con la verdad".','La hospitalidad y la generosidad son ministerios poderosos al servicio del Reino.','Cuídate del orgullo y el afán de preeminencia; el liderazgo es para servir, no para dominar.','Imita lo bueno, no lo malo: tu mayor gozo viene de andar y ayudar a otros a andar en la verdad.'],christConnection:'Aunque breve, 3 Juan refleja el corazón del evangelio: servir, dar y andar en la verdad por amor al "Nombre" de Cristo, por quien los misioneros salían "sin aceptar nada de los gentiles". Apoyarlos era servir a Cristo mismo. El contraste entre Gayo (que sirve humildemente) y Diótrefes (que busca ser el primero) ilustra la enseñanza de Jesús: el mayor en el Reino es el que sirve. Andar en la verdad es andar en Cristo, que es el Camino, la Verdad y la Vida.',keyVerses:[{ref:'3 Juan 1:4',text:'No tengo yo mayor gozo que este, el oír que mis hijos andan en la verdad.'},{ref:'3 Juan 1:11',text:'Amado, no imites lo malo, sino lo bueno. El que hace lo bueno es de Dios; pero el que hace lo malo, no ha visto a Dios.'}],readingCall:'3 Juan es una carta breve y cálida sobre la generosidad y la fidelidad. Te invitamos a leer este único capítulo. Te inspirará a apoyar la obra de Dios con hospitalidad y a imitar lo bueno, recordándote que el mayor gozo es ver a otros andar en la verdad de Cristo.'}, name:'3 Juan', abbr:'3 Jn', t:'NT', chapters:1,
        author:'Juan el apóstol', date:'~85-95 d.C.', genre:'Epístola',
        context:'Una carta personal a Gayo, elogiando su hospitalidad y confrontando el orgullo de Diótrefes, un líder que rechazaba la autoridad apostólica.',
        summary:'3 Juan es una carta personal que contrasta tres personajes. Gayo es elogiado por su hospitalidad y por andar en la verdad, apoyando a los misioneros. Diótrefes es reprendido por su orgullo: le gustaba tener el primer lugar, rechazaba la autoridad y expulsaba a los hermanos. Demetrio es recomendado por su buen testimonio. La carta enseña el valor de la hospitalidad cristiana hacia los obreros del evangelio y advierte contra el espíritu de dominación y orgullo en el liderazgo.',
        purpose:'Elogiar la hospitalidad fiel, confrontar el orgullo en el liderazgo y animar a imitar el bien y no el mal.',
        themes:['Hospitalidad cristiana', 'Andar en la verdad', 'Humildad vs orgullo', 'Apoyo a los misioneros', 'Buen testimonio', 'Imitar el bien'],
        keyVerse:{ ref:'3 Juan 1:2', text:'Amado, yo deseo que tú seas prosperado en todas las cosas, y que tengas salud, así como prospera tu alma.' },
        characters:[{ name:'Gayo', role:'Anfitrión fiel', icon:'⭐' }, { name:'Diótrefes', role:'Líder orgulloso', icon:'⚠' }, { name:'Demetrio', role:'De buen testimonio', icon:'🕊' }],
        teaching:'La hospitalidad hacia los obreros del evangelio es un servicio valioso. El orgullo y el deseo de dominar son peligros reales en el liderazgo. Debemos imitar el bien, no el mal.',
        application:'Apoyemos a quienes sirven en el evangelio con hospitalidad. Cuidémonos del orgullo que busca el primer lugar. Que nuestro buen testimonio hable por nosotros.',
        curiosities:['Es el libro más corto de la Biblia por número de palabras en griego.', 'Es la carta más personal del NT, dirigida a un individuo.', 'Diótrefes es ejemplo de cómo el orgullo daña a la iglesia.', 'La salud y prosperidad mencionadas son deseos de bienestar integral.'],
        timeline:[{ period:'Misión', desc:'Misioneros itinerantes necesitan apoyo' }, { period:'Carta', desc:'Juan elogia a Gayo por su hospitalidad' }, { period:'Conflicto', desc:'Confronta el orgullo de Diótrefes' }, { period:'Recomendación', desc:'Avala el testimonio de Demetrio' }],
      },
      { id:'jud', deep:{whatHappens:'Judas es un llamado urgente a "contender por la fe". El autor, hermano de Santiago y de Jesús, había querido escribir sobre la salvación, pero la amenaza de falsos maestros infiltrados lo obligó a escribir una advertencia enérgica. Describe a estos impíos que pervertían la gracia en libertinaje y negaban a Cristo, usando ejemplos del Antiguo Testamento sobre el juicio de Dios contra los rebeldes. Concluye animando a los creyentes a edificarse en la fe, orar en el Espíritu y mantenerse en el amor de Dios, con una de las doxologías más hermosas de la Biblia.',context:{general:'Escrita por Judas, hermano de Jesús y de Santiago, hacia el año 65-80 d.C., como advertencia urgente a la iglesia.',political:'La iglesia crecía pero también atraía a oportunistas y falsos maestros que se infiltraban para aprovecharse de ella.',cultural:'Algunos distorsionaban la gracia de Dios como excusa para la inmoralidad ("libertinaje"), un error peligroso que se extendía.',spiritual:'Los falsos maestros negaban la autoridad de Cristo y vivían en pecado. Judas llama a los creyentes a defender activamente la verdad de la fe.'},godPurpose:'Dios revela la necesidad de defender la fe verdadera contra la corrupción interna. El propósito es alertar a la iglesia sobre los falsos maestros y animar a los creyentes a permanecer firmes y crecer en su fe.',godTeaching:'Dios quería enseñar que la gracia no es licencia para pecar; que debemos contender por la fe verdadera; que Dios juzga a los rebeldes; y que el creyente debe edificarse, orar y permanecer en el amor de Dios mientras tiene misericordia de otros.',consequences:'Judas alertó a la iglesia de todos los tiempos sobre el peligro de la corrupción doctrinal y moral interna. Su llamado a "contender por la fe" y su gloriosa doxología final han fortalecido a los creyentes para defender la verdad con firmeza y esperanza.',practicalLessons:['Contiende por la fe verdadera: defender la sana doctrina es responsabilidad de todo creyente.','La gracia de Dios nunca es excusa para pecar; cuídate de quienes la distorsionan.','Edifícate en la fe, ora en el Espíritu y mantente en el amor de Dios.','Ten misericordia de los que dudan; busca rescatar a otros del error con compasión.'],christConnection:'Judas exalta a "Jesucristo nuestro Señor" como el único soberano y dueño cuya autoridad los falsos maestros negaban. La carta culmina con una de las doxologías más sublimes: "a aquel que es poderoso para guardaros sin caída, y presentaros sin mancha delante de su gloria con gran alegría, al único y sabio Dios, nuestro Salvador, sea gloria...". Cristo es quien nos guarda, nos sostiene y nos presentará sin mancha ante Dios. La fe por la que contendemos es la fe en Él, y nuestra seguridad final descansa en su poder.',keyVerses:[{ref:'Judas 1:3',text:'Amados... me ha sido necesario escribiros exhortándoos que contendáis ardientemente por la fe que ha sido una vez dada a los santos.'},{ref:'Judas 1:24-25',text:'Y a aquel que es poderoso para guardaros sin caída, y presentaros sin mancha delante de su gloria con gran alegría, al único y sabio Dios, nuestro Salvador, sea gloria y majestad, imperio y potencia.'}],readingCall:'Judas es un poderoso llamado a defender la fe, condensado en un solo capítulo. Te invitamos a leerlo completo. Te alertará sobre los engaños que se infiltran en la iglesia y te animará a permanecer firme. No te pierdas su doxología final: una de las promesas más hermosas de que Dios es poderoso para guardarte sin caída.'}, name:'Judas', abbr:'Jud', t:'NT', chapters:1,
        author:'Judas (hermano de Jesús)', date:'~65-80 d.C.', genre:'Epístola',
        context:'Judas, hermano de Jesús y de Santiago, escribe una urgente advertencia contra los falsos maestros que se habían infiltrado en la iglesia.',
        summary:'Judas es un llamado urgente a "contender por la fe". El autor pensaba escribir sobre la salvación, pero la infiltración de falsos maestros lo obligó a advertir. Estos pervertían la gracia en libertinaje y negaban a Cristo. Judas usa ejemplos del AT (Israel, los ángeles caídos, Sodoma) para mostrar el juicio de Dios sobre la apostasía. Pero termina con esperanza: exhorta a edificarse en la fe, orar en el Espíritu y conservarse en el amor de Dios. Cierra con una de las doxologías más hermosas de la Biblia.',
        purpose:'Alertar contra los falsos maestros infiltrados y exhortar a los creyentes a contender por la fe y mantenerse firmes.',
        themes:['Contender por la fe', 'Advertencia contra la apostasía', 'Juicio de Dios', 'Perseverancia', 'Misericordia hacia los dudosos', 'Guardados por Dios'],
        keyVerse:{ ref:'Judas 1:24', text:'Y a aquel que es poderoso para guardaros sin caída, y presentaros sin mancha delante de su gloria con gran alegría.' },
        characters:[{ name:'Judas', role:'Hermano de Jesús', icon:'📜' }],
        teaching:'Debemos defender activamente la fe verdadera contra el error. La gracia no es licencia para pecar. Aunque advertimos contra el error, Dios es poderoso para guardarnos de caer.',
        application:'No seamos pasivos ante las falsas enseñanzas; contendamos por la verdad con amor. Edifiquémonos en la fe y oremos en el Espíritu. Confiemos en que Dios nos guarda de caer.',
        curiosities:['Judas era hermano de Jesús y de Santiago.', 'Cita tradiciones judías como el libro de Enoc.', 'Su doxología final (24-25) es muy usada en la adoración.', 'Comparte mucho contenido con 2 Pedro.'],
        timeline:[{ period:'Infiltración', desc:'Falsos maestros entran en la iglesia' }, { period:'Cambio', desc:'Judas cambia su tema para advertir' }, { period:'Carta', desc:'Llama a contender por la fe' }, { period:'Esperanza', desc:'Cierra con una gran doxología' }],
      },
      { id:'1co', deep:{whatHappens:'Pablo escribe para corregir graves problemas en la iglesia de Corinto: divisiones entre facciones, inmoralidad sexual, pleitos entre creyentes, desórdenes en la Cena del Señor, confusión sobre los dones espirituales y dudas sobre la resurrección. En medio de las correcciones, Pablo escribe el "himno al amor" del capítulo 13 y la más completa defensa de la resurrección del capítulo 15. Es una carta práctica que muestra cómo vivir la fe en medio de una cultura corrupta.',context:{general:'Escrita por Pablo hacia el año 55 d.C. desde Éfeso, a la iglesia que él había fundado en Corinto, tras recibir noticias de sus problemas.',political:'Corinto era una próspera ciudad comercial romana, cosmopolita y llena de inmigrantes, marineros y comerciantes de todo el imperio.',cultural:'Corinto era famosa por su inmoralidad: "corintizar" significaba vivir en libertinaje. El templo de Afrodita promovía la prostitución sagrada. La iglesia luchaba por no dejarse contaminar por esa cultura.',spiritual:'Los corintios eran espiritualmente inmaduros, orgullosos de sus dones y conocimiento, pero divididos y carnales. Pablo los llama a la madurez, la unidad y el amor.'},godPurpose:'Dios usa esta carta para enseñar cómo vive una iglesia santa en medio de una sociedad corrupta. Aborda problemas reales con sabiduría divina, mostrando que el evangelio transforma cada área de la vida y la comunidad.',godTeaching:'Dios quería enseñar que la verdadera espiritualidad se mide por el amor, no por los dones; que el cuerpo es templo del Espíritu y debe honrarse; que la unidad es esencial; y que la resurrección de Cristo garantiza la nuestra.',consequences:'Esta carta moldeó la práctica de la iglesia en cuanto a la Cena del Señor, los dones espirituales, el matrimonio y el orden en la adoración. El capítulo 13 sobre el amor y el 15 sobre la resurrección están entre los textos más leídos del cristianismo.',practicalLessons:['Sin amor, todos los dones y logros espirituales no valen nada; el amor es lo supremo.','Tu cuerpo es templo del Espíritu Santo; hónralo con pureza y dominio propio.','Las divisiones dañan a la iglesia; busca la unidad por encima de las preferencias personales.','La resurrección de Cristo es la base de nuestra esperanza: porque Él vive, nosotros también viviremos.'],christConnection:'Pablo declara que predica "a Cristo crucificado", el poder y la sabiduría de Dios, aunque al mundo le parezca locura. Cristo es nuestra Pascua sacrificada, el fundamento sobre el cual se edifica todo. El capítulo 15 presenta la resurrección de Cristo como el hecho central del cristianismo: "si Cristo no resucitó, vana es vuestra fe". Como Él resucitó, es las primicias de los que duermen, garantizando nuestra resurrección futura. Todo el orden de la iglesia y la vida cristiana se fundamenta en Cristo.',keyVerses:[{ref:'1 Corintios 13:13',text:'Y ahora permanecen la fe, la esperanza y el amor, estos tres; pero el mayor de ellos es el amor.'},{ref:'1 Corintios 15:3-4',text:'Cristo murió por nuestros pecados, conforme a las Escrituras; y que fue sepultado, y que resucitó al tercer día, conforme a las Escrituras.'},{ref:'1 Corintios 10:13',text:'No os ha sobrevenido ninguna tentación que no sea humana; pero fiel es Dios, que no os dejará ser tentados más de lo que podéis resistir.'}],readingCall:'1 Corintios es la carta más práctica sobre cómo vivir la fe en un mundo difícil. Te invitamos a leer sus 16 capítulos. No te pierdas el capítulo 13, el himno al amor, ni el 15, la gran defensa de la resurrección. Si quieres saber cómo ser cristiano en medio de una cultura que se opone a Dios, este libro es para ti.'}, name:'1 Corintios', abbr:'1 Co', t:'NT', chapters:16,
        author:'Pablo', date:'~55 d.C.', genre:'Epístola',
        context:'Pablo escribe a la conflictiva iglesia de Corinto, una ciudad próspera y moralmente relajada, para corregir divisiones y desórdenes y enseñar sobre la vida cristiana práctica.',
        summary:'1 Corintios aborda los muchos problemas de una iglesia talentosa pero carnal. Pablo confronta las divisiones, los pleitos, la inmoralidad, el mal uso de la libertad y el desorden en la adoración y en el uso de los dones espirituales. En medio de las correcciones brilla el capítulo 13, el "himno al amor", que muestra que sin amor todo don es vano. También enseña con claridad sobre la Cena del Señor y dedica el capítulo 15 a la resurrección, fundamento de la fe. Es la carta más práctica sobre la vida en comunidad.',
        purpose:'Corregir los desórdenes y divisiones de la iglesia de Corinto y enseñar cómo vivir la fe cristiana en unidad, amor y orden.',
        themes:['Unidad de la iglesia', 'El amor (cap. 13)', 'Dones espirituales', 'La resurrección', 'Santidad y libertad', 'La Cena del Señor'],
        keyVerse:{ ref:'1 Corintios 13:4', text:'El amor es sufrido, es benigno; el amor no tiene envidia, el amor no es jactancioso, no se envanece.' },
        characters:[{ name:'Pablo', role:'Fundador de la iglesia', icon:'📜' }, { name:'Apolos', role:'Predicador elocuente', icon:'⭐' }],
        teaching:'Sin amor, ningún don ni sacrificio tiene valor. La iglesia debe vivir en unidad, no en divisiones. La resurrección de Cristo es el fundamento de toda nuestra esperanza: si Cristo no resucitó, vana es nuestra fe.',
        application:'Busquemos la unidad y huyamos de las divisiones partidistas. El amor (1 Co 13) debe gobernar todo lo que hacemos. Los dones espirituales son para edificar a otros, no para exhibirnos.',
        curiosities:['El capítulo 13, el "himno al amor", es uno de los textos más leídos en bodas.', 'El capítulo 15 es la defensa más completa de la resurrección en la Biblia.', 'Corinto era famosa por su inmoralidad; "corintiar" significaba vivir disolutamente.', 'Contiene la institución de la Cena del Señor que Pablo recibió del Señor.'],
        timeline:[{ period:'~50 d.C.', desc:'Pablo funda la iglesia en Corinto' }, { period:'Reportes', desc:'Llegan noticias de divisiones y problemas' }, { period:'Carta', desc:'Pablo responde a cada problema' }, { period:'Amor', desc:'Exalta el amor como el camino más excelente' }],
      },
      { id:'fil', deep:{whatHappens:'Filipenses es la carta del gozo. Sorprendentemente, Pablo la escribe desde la cárcel, y sin embargo rebosa de alegría y gratitud. Escribe a una iglesia querida que lo había apoyado, animándolos a regocijarse siempre en el Señor, a vivir en humildad y unidad siguiendo el ejemplo de Cristo, a no afanarse sino orar, y a poner la mente en lo bueno. Es una carta cálida y personal que enseña que el gozo no depende de las circunstancias sino de la relación con Cristo.',context:{general:'Escrita por Pablo alrededor del 61 d.C. desde su prisión en Roma, a la iglesia de Filipos, la primera que fundó en Europa.',political:'Filipos era una colonia romana con ciudadanos orgullosos de su estatus. Pablo, encadenado por Roma, escribe sobre una ciudadanía superior: la del cielo.',cultural:'Los filipenses valoraban el honor y el estatus romano. Pablo presenta el ejemplo contracultural de Cristo, quien se humilló renunciando a su gloria.',spiritual:'Había pequeñas tensiones y rivalidades en la iglesia. Pablo los exhorta a la unidad y humildad, y los previene contra los falsos maestros legalistas.'},godPurpose:'Dios revela que el gozo verdadero es independiente de las circunstancias y se encuentra en Cristo. Muestra, a través del ejemplo de Jesús, que el camino a la exaltación pasa por la humildad y el servicio.',godTeaching:'Dios quería enseñar a regocijarse siempre, a no afanarse sino orar, a pensar en lo bueno, y a tener la mente de Cristo, quien se humilló hasta la muerte de cruz. La verdadera grandeza está en servir, no en buscar el propio interés.',consequences:'Filipenses se convirtió en una de las cartas más amadas por su tono gozoso y sus versículos memorables sobre el contentamiento, la paz y la mente de Cristo. El himno cristológico del capítulo 2 es uno de los textos más profundos sobre la humillación y exaltación de Cristo.',practicalLessons:['El gozo no depende de las circunstancias, sino de tu relación con Cristo; puedes gozarte aun en la dificultad.','En vez de afanarte, ora por todo con gratitud, y la paz de Dios guardará tu corazón.','Imita la humildad de Cristo: considera a los demás como superiores y sirve sin buscar tu propio interés.','Puedes aprender a estar contento en cualquier situación: "todo lo puedo en Cristo que me fortalece".'],christConnection:'Filipenses 2 contiene uno de los pasajes más sublimes sobre Cristo: aunque era Dios, "se despojó a sí mismo, tomando forma de siervo... y se humilló a sí mismo, haciéndose obediente hasta la muerte, y muerte de cruz. Por lo cual Dios también le exaltó hasta lo sumo". Este es el patrón del Evangelio: humillación y luego exaltación. Pablo declara que su mayor anhelo es "conocerle, y el poder de su resurrección", y que ganar a Cristo supera todo lo demás. Cristo es la fuente del gozo, la fuerza y el contentamiento.',keyVerses:[{ref:'Filipenses 4:13',text:'Todo lo puedo en Cristo que me fortalece.'},{ref:'Filipenses 4:6-7',text:'Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios en toda oración y ruego, con acción de gracias.'},{ref:'Filipenses 1:21',text:'Porque para mí el vivir es Cristo, y el morir es ganancia.'},{ref:'Filipenses 2:10-11',text:'Para que en el nombre de Jesús se doble toda rodilla... y toda lengua confiese que Jesucristo es el Señor.'}],readingCall:'Filipenses es la carta perfecta cuando necesitas gozo y paz. Te invitamos a leer sus 4 capítulos: es breve y reconfortante. Lee el capítulo 4 cuando estés ansioso: te enseñará a cambiar el afán por oración y a encontrar la paz de Dios. Si Pablo pudo gozarse en una cárcel, esta carta te mostrará cómo tú también puedes tener gozo en cualquier circunstancia.'}, name:'Filipenses', abbr:'Fil', t:'NT', chapters:4,
        author:'Pablo', date:'~61 d.C.', genre:'Epístola',
        context:'Escrita desde la prisión, Filipenses es la carta del gozo. Pablo agradece a una iglesia querida y la anima a regocijarse en el Señor en toda circunstancia.',
        summary:'Filipenses es la "carta del gozo": Pablo usa las palabras "gozo" y "regocijaos" más de 15 veces, ¡y la escribió desde la cárcel! Dirigida a una de sus iglesias más amadas, rebosa de gratitud y afecto. Pablo enseña que el verdadero gozo no depende de las circunstancias sino de Cristo. Contiene el himno de la humillación y exaltación de Cristo (cap. 2), el testimonio de Pablo de considerar todo basura comparado con conocer a Cristo (cap. 3) y el secreto del contentamiento: "todo lo puedo en Cristo que me fortalece".',
        purpose:'Animar a los creyentes a regocijarse en el Señor en toda circunstancia y a vivir con humildad y unidad imitando a Cristo.',
        themes:['Gozo en toda circunstancia', 'Humildad de Cristo', 'Contentamiento', 'Conocer a Cristo', 'Unidad', 'La paz de Dios'],
        keyVerse:{ ref:'Filipenses 4:13', text:'Todo lo puedo en Cristo que me fortalece.' },
        characters:[{ name:'Pablo', role:'Apóstol gozoso en prisión', icon:'📜' }, { name:'Timoteo', role:'Colaborador fiel', icon:'⭐' }, { name:'Epafrodito', role:'Mensajero de la iglesia', icon:'🕊' }],
        teaching:'El gozo verdadero no depende de las circunstancias sino de nuestra relación con Cristo. La humildad de Cristo, que se despojó a sí mismo, es nuestro modelo. Podemos estar contentos en cualquier situación con la fuerza que Cristo da.',
        application:'Podemos tener gozo aun en las dificultades porque está fundado en Cristo. Imitemos la humildad de Cristo poniendo a otros primero. En vez de afanarnos, llevemos todo a Dios en oración y tendremos su paz.',
        curiosities:['Pablo escribió esta carta de gozo estando preso.', 'El himno cristológico de 2:5-11 es uno de los pasajes más profundos del NT.', '"Todo lo puedo en Cristo" se refiere al contentamiento en toda circunstancia.', 'La iglesia de Filipos fue la primera fundada en Europa.'],
        timeline:[{ period:'Hechos 16', desc:'Pablo funda la iglesia en Filipos' }, { period:'Prisión', desc:'Pablo encarcelado, posiblemente en Roma' }, { period:'Ofrenda', desc:'Los filipenses envían ayuda con Epafrodito' }, { period:'Carta', desc:'Pablo responde con gozo y gratitud' }],
      },
    ];

    /* ── FUENTE ÚNICA: nombre, testamento y capítulos vienen de BRV.bible ──
       Los datos editoriales (resumen, temas, etc.) son propios de este módulo,
       pero los metadatos básicos se sincronizan desde la Biblia central
       para no mantener bases de datos separadas. ── */
    BOOKS_DATA.forEach(function(b) {
      var src = BRV.bible.getBook(b.id);
      if (src) {
        b.name = src.name;
        b.abbr = src.abbr;
        b.t = src.t;
        b.chapters = src.chapters;
        b.order = src.order;
      }
    });
    /* Ordenar en orden canónico bíblico */
    BOOKS_DATA.sort(function(a, b) {
      var oa = (BRV.bible.getBook(a.id) || {}).order;
      var ob = (BRV.bible.getBook(b.id) || {}).order;
      return (oa == null ? 999 : oa) - (ob == null ? 999 : ob);
    });

    /* ── Estado ── */
    let state = {
      testament:   'AT',
      searchQuery: '',
      activeId:    null,
    };

    function getFilteredBooks() {
      let books = BOOKS_DATA;
      if (state.testament !== 'ALL') books = books.filter(b => b.t === state.testament);
      if (state.searchQuery) {
        const q = state.searchQuery.toLowerCase();
        books = books.filter(b =>
          b.name.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          (b.genre||'').toLowerCase().includes(q)
        );
      }
      return books;
    }

    /* ── Render lista lateral ── */
    function renderList() {
      const el = document.getElementById('brv-sum-books-list');
      if (!el) return;
      const books = getFilteredBooks();
      if (!books.length) {
        el.innerHTML = '<div style="padding:20px;text-align:center;font-size:12px;color:var(--brv-text-2);">Sin resultados</div>';
        return;
      }
      let html = '';
      let lastT = null;
      books.forEach(b => {
        if (state.testament === 'ALL' && b.t !== lastT) {
          lastT = b.t;
          html += '<div class="brv-sum-testament-label">' + (b.t === 'AT' ? 'Antiguo Testamento' : 'Nuevo Testamento') + '</div>';
        }
        html += '<div class="brv-sum-book-item' + (b.id === state.activeId ? ' active' : '') + '"' +
          ' onclick="BRV.summaries.openBook(\'' + b.id + '\')">' +
          '<span>' + b.name + '</span>' +
          '<span class="brv-sum-book-tag">' + b.chapters + '</span>' +
          '</div>';
      });
      el.innerHTML = html;
      const info = document.getElementById('brv-sum-header-info');
      if (info) info.textContent = books.length + ' libros';
    }

    /* ── Abrir libro ── */
    function openBook(id) {
      const book = BOOKS_DATA.find(b => b.id === id);
      if (!book) return;
      state.activeId = id;
      renderList();

      const welcome = document.getElementById('brv-sum-welcome');
      const detail  = document.getElementById('brv-sum-detail');
      if (welcome) welcome.style.display = 'none';
      if (detail)  { detail.classList.add('active'); detail.innerHTML = buildDetail(book); detail.scrollTop = 0; }

      BRV.storage.set('lastSummary', id);
    }

    function escH(s) {
      return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
    }

    /* ── Construye el HTML del detalle ── */
    function buildDetail(b) {
      /* Helpers de sección */
      function section(icon, title, bodyHtml) {
        return '<div class="brv-sum-section">' +
          '<div class="brv-sum-section-title">' + icon + title + '</div>' +
          bodyHtml + '</div>';
      }
      function para(txt) { return '<p>' + escH(txt) + '</p>'; }
      const ICON = {
        what:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
        ctx:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/></svg>',
        god:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M2 12h20"/></svg>',
        conseq:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/></svg>',
        lesson:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>',
        christ:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M7 7h10"/></svg>',
        fact:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
        verse:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>',
        read:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>',
        theme:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
        people:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>',
      };

      /* Lee el contenido profundo (deep) o usa respaldo de campos antiguos */
      const d = b.deep || {};
      const whatHappens = d.whatHappens || b.summary || '';
      const ctx = d.context || {};
      const ctxGeneral = ctx.general || b.context || '';
      const godPurpose = d.godPurpose || b.purpose || '';
      const godTeaching = d.godTeaching || b.teaching || '';
      const consequences = d.consequences || '';
      const practical = d.practicalLessons || (b.application ? [b.application] : []);
      const christConn = d.christConnection || '';
      const readingCall = d.readingCall || '';
      const keyVerses = d.keyVerses || (b.keyVerse ? [b.keyVerse] : []);

      /* Header */
      let html = '<div class="brv-sum-book-header">' +
          '<div class="brv-sum-book-info">' +
            '<span class="brv-sum-book-testament">' + (b.t==='AT'?'Antiguo Testamento':'Nuevo Testamento') + '</span>' +
            '<h1 class="brv-sum-book-title">' + escH(b.name) + '</h1>' +
            '<div class="brv-sum-book-meta">' +
              '<span>✍ ' + escH(b.author) + '</span>' +
              '<span>📅 ' + escH(b.date) + '</span>' +
              '<span>📚 ' + b.chapters + ' capítulos</span>' +
              '<span>📖 ' + escH(b.genre) + '</span>' +
            '</div>' +
          '</div>' +
          '<div class="brv-sum-book-actions">' +
            '<button class="brv-sum-action-btn primary" onclick="BRV.summaries.readBook(\'' + b.id + '\')">' +
              ICON.read + 'Leer libro' +
            '</button>' +
            '<button class="brv-sum-action-btn outline" onclick="BRV.summaries.projectKeyVerse(\'' + b.id + '\')">' +
              '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>' +
              'Proyectar versículo' +
            '</button>' +
          '</div>' +
        '</div>';

      /* Versículo clave destacado */
      const kv = keyVerses[0] || b.keyVerse;
      if (kv) {
        html += '<div class="brv-sum-key-verse">' +
          '<div class="brv-sum-key-verse-label">Versículo Clave</div>' +
          '<p>"' + escH(kv.text) + '"</p>' +
          '<cite>— ' + escH(kv.ref) + '</cite>' +
        '</div>';
      }

      /* 1. ¿Qué está ocurriendo? */
      html += section(ICON.what, '1 · ¿Qué está ocurriendo?', para(whatHappens));

      /* 2. Contexto histórico (con sub-bloques político/cultural/espiritual) */
      let ctxBody = '';
      if (ctxGeneral) ctxBody += para(ctxGeneral);
      if (ctx.political || ctx.cultural || ctx.spiritual) {
        ctxBody += '<div class="brv-sum-ctx-grid">';
        if (ctx.political)  ctxBody += '<div class="brv-sum-ctx-card"><div class="brv-sum-ctx-label">⚔ Situación política</div><p>' + escH(ctx.political) + '</p></div>';
        if (ctx.cultural)   ctxBody += '<div class="brv-sum-ctx-card"><div class="brv-sum-ctx-label">🏛 Situación cultural</div><p>' + escH(ctx.cultural) + '</p></div>';
        if (ctx.spiritual)  ctxBody += '<div class="brv-sum-ctx-card"><div class="brv-sum-ctx-label">✨ Situación espiritual</div><p>' + escH(ctx.spiritual) + '</p></div>';
        ctxBody += '</div>';
      }
      html += section(ICON.ctx, '2 · Contexto Histórico', ctxBody);

      /* 3. Propósito de Dios */
      let godBody = para(godPurpose);
      if (godTeaching) godBody += '<div class="brv-sum-highlight"><div class="brv-sum-highlight-label">Lo que Dios quería enseñar</div><p>' + escH(godTeaching) + '</p></div>';
      html += section(ICON.god, '3 · Propósito de Dios', godBody);

      /* 4. Consecuencias */
      if (consequences) html += section(ICON.conseq, '4 · Consecuencias', para(consequences));

      /* 5. Enseñanzas prácticas */
      if (practical.length) {
        let pBody = '<div class="brv-sum-lessons">';
        practical.forEach((p, i) => {
          pBody += '<div class="brv-sum-lesson-item"><span class="brv-sum-lesson-num">' + (i+1) + '</span><p>' + escH(p) + '</p></div>';
        });
        pBody += '</div>';
        html += section(ICON.lesson, '5 · Enseñanzas Prácticas', pBody);
      }

      /* 6. Conexión con Cristo */
      if (christConn) {
        html += '<div class="brv-sum-christ">' +
          '<div class="brv-sum-christ-label">' + ICON.christ + '6 · Conexión con Cristo</div>' +
          '<p>' + escH(christConn) + '</p></div>';
      }

      /* Temas principales */
      const themes = (b.themes||[]).map(t => '<span class="brv-sum-theme-chip">' + escH(t) + '</span>').join('');
      if (themes) html += section(ICON.theme, 'Temas Principales', '<div class="brv-sum-themes">' + themes + '</div>');

      /* Personajes */
      const chars = (b.characters||[]).map(c =>
        '<div class="brv-sum-char-card"><span class="brv-sum-char-icon">' + c.icon + '</span>' +
        '<div class="brv-sum-char-name">' + escH(c.name) + '</div>' +
        '<div class="brv-sum-char-role">' + escH(c.role) + '</div></div>'
      ).join('');
      if (chars) html += section(ICON.people, 'Personajes Clave', '<div class="brv-sum-chars">' + chars + '</div>');

      /* 7. Curiosidades */
      const facts = (b.curiosities||[]).map((f,i) =>
        '<div class="brv-sum-fact"><div class="brv-sum-fact-num">' + (i+1) + '</div><p>' + escH(f) + '</p></div>'
      ).join('');
      if (facts) html += section(ICON.fact, '7 · Curiosidades Bíblicas', facts);

      /* 8. Versículos clave (lista) */
      if (keyVerses.length) {
        let vBody = '<div class="brv-sum-keyverses">';
        keyVerses.forEach(v => {
          vBody += '<div class="brv-sum-kv-item" onclick="BRV.summaries.projectVerse(\'' + escH(v.ref).replace(/'/g,"") + '\')">' +
            '<div class="brv-sum-kv-ref">' + escH(v.ref) + '</div>' +
            '<div class="brv-sum-kv-text">"' + escH(v.text) + '"</div></div>';
        });
        vBody += '</div>';
        html += section(ICON.verse, '8 · Versículos Clave', vBody);
      }

      /* Línea de tiempo */
      const timeline = (b.timeline||[]).map(tl =>
        '<div class="brv-sum-tl-item"><div class="brv-sum-tl-dot"></div>' +
        '<div class="brv-sum-tl-period">' + escH(tl.period) + '</div>' +
        '<div class="brv-sum-tl-desc">' + escH(tl.desc) + '</div></div>'
      ).join('');
      if (timeline) html += section(ICON.conseq, 'Línea de Tiempo', '<div class="brv-sum-timeline">' + timeline + '</div>');

      /* 9. Llamado a la lectura */
      const callText = readingCall || ('Te invitamos a leer el libro completo de ' + b.name + ' (' + b.chapters + ' capítulos) y descubrir por ti mismo toda la riqueza de la Palabra de Dios.');
      html += '<div class="brv-sum-reading-call">' +
        '<div class="brv-sum-reading-call-icon">📖</div>' +
        '<div class="brv-sum-reading-call-body">' +
          '<div class="brv-sum-reading-call-title">9 · Llamado a la Lectura</div>' +
          '<p>' + escH(callText) + '</p>' +
          '<button class="brv-sum-reading-call-btn" onclick="BRV.summaries.readBook(\'' + b.id + '\')">' +
            'Comenzar a leer ' + escH(b.name) + ' →' +
          '</button>' +
        '</div>' +
      '</div>';

      return html;
    }

    /* ── Acciones ── */
    function readBook(id) {
      BRV.router.go('reader');
      setTimeout(() => { if (BRV.reader) BRV.reader.selectBook(id); }, 80);
    }

    function projectKeyVerse(id) {
      const book = BOOKS_DATA.find(b => b.id === id);
      if (!book) return;
      const kv = (book.deep && book.deep.keyVerses && book.deep.keyVerses[0]) || book.keyVerse;
      BRV.storage.set('projVerse', { ref: kv.ref, text: kv.text });
      BRV.router.go('projection');
    }

    /* Proyecta un versículo específico por su referencia (busca en la Biblia central) */
    function projectVerse(ref) {
      const matches = BRV.bible.search(ref, { limit: 1 });
      if (matches.length) {
        BRV.storage.set('projVerse', { ref: matches[0].r, text: matches[0].v });
        BRV.router.go('projection');
      } else {
        BRV.ui.toast('No se encontró el versículo', 'warn');
      }
    }

    /* ── Controles del sidebar ── */
    function setTestament(t, btn) {
      state.testament = t;
      document.querySelectorAll('.brv-sum-tab').forEach(b => b.classList.toggle('active', b === btn));
      renderList();
    }

    function filterBooks(q) {
      state.searchQuery = q;
      renderList();
    }

    /* ── Hook de router ── */
    BRV.router.hooks['summaries'] = function() {
      renderList();
      const last = BRV.storage.get('lastSummary', null);
      if (last && !state.activeId) openBook(last);
    };

    function init() { renderList(); }

    return {
      openBook, readBook, projectKeyVerse, projectVerse,
      setTestament, filterBooks,
      init,
    };
  })();

  /* init coordinado al final */

  /* ══════════════════════════════════════════════════════════════
     MÓDULO 7 — TEMAS Y NECESIDADES
  ══════════════════════════════════════════════════════════════ */
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