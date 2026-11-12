/* ==========================================================================
   MEDIÇÃO E ANÚNCIOS — Google Analytics, Google Ads e Pixel da Meta.
   Fica DESLIGADO enquanto os códigos em js/config.js → medicao estiverem
   vazios: sem aviso de cookies, sem nenhum script de terceiros.
   Com algum código preenchido, o visitante vê o aviso de cookies e os
   scripts só carregam depois de "Aceitar" (LGPD).
   Guia: docs/MEDICAO-E-ANUNCIOS.md
   ========================================================================== */
(function () {
  const NS = (window.NS = window.NS || {});
  const m = (NS.config && NS.config.medicao) || {};
  const ativo = !!(m.ga4Id || m.googleAdsId || m.metaPixelId);
  const CHAVE = "ns-consentimento-v1";

  const ler = () => { try { return localStorage.getItem(CHAVE); } catch (e) { return null; } };
  const gravar = (v) => { try { localStorage.setItem(CHAVE, v); } catch (e) { /* segue só nesta visita */ } };

  let carregado = false;

  function carregar() {
    if (carregado || !ativo) return;
    carregado = true;

    if (m.ga4Id || m.googleAdsId) {
      const s = document.createElement("script");
      s.async = true;
      s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(m.ga4Id || m.googleAdsId);
      document.head.appendChild(s);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag("js", new Date());
      if (m.ga4Id) window.gtag("config", m.ga4Id);
      if (m.googleAdsId) window.gtag("config", m.googleAdsId);
    }

    if (m.metaPixelId) {
      /* trecho padrão do Pixel da Meta */
      (function (f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
        if (!f._fbq) f._fbq = n;
        n.push = n; n.loaded = true; n.version = "2.0"; n.queue = [];
        t = b.createElement(e); t.async = true; t.src = v;
        s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
      })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
      window.fbq("init", m.metaPixelId);
      window.fbq("track", "PageView");
    }
  }

  /* Nome do evento no site → nome padrão em cada plataforma. */
  const MAPA = {
    adicionar_item:     { ga: "add_to_cart",     meta: "AddToCart" },
    pedido_whatsapp:    { ga: "begin_checkout",  meta: "InitiateCheckout" },
    pedido_app:         { ga: "begin_checkout",  meta: "InitiateCheckout" },
    encomenda_whatsapp: { ga: "generate_lead",   meta: "Lead" },
    clique_whatsapp:    { ga: "clique_whatsapp", meta: "Contact" },
  };

  /**
   * Registra uma conversão. Não faz nada se a medição estiver desligada
   * ou se o visitante não aceitou os cookies.
   * Ex.: NS.evento("pedido_whatsapp", { value: 36, currency: "BRL" })
   */
  NS.evento = function (nome, dados) {
    if (!carregado) return;
    const d = dados || {};
    const mapa = MAPA[nome] || { ga: nome, meta: null };
    if (window.gtag) {
      window.gtag("event", mapa.ga, d);
      const rotulo = (m.googleAdsConversoes || {})[nome];
      if (m.googleAdsId && rotulo) {
        window.gtag("event", "conversion", { send_to: m.googleAdsId + "/" + rotulo, value: d.value, currency: d.currency });
      }
    }
    if (window.fbq && mapa.meta) window.fbq("track", mapa.meta, d);
  };

  // ---------------------------------------------------------- aviso de cookies
  function aviso() {
    if (document.getElementById("aviso-cookies")) return;
    const el = document.createElement("div");
    el.id = "aviso-cookies";
    el.className = "aviso-cookies";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-label", "Aviso de cookies");
    el.innerHTML = `
      <p>Usamos cookies para entender como o site é usado e para medir nossos anúncios.
         <a href="privacidade.html">Saiba mais</a>.</p>
      <div class="aviso-cookies__botoes">
        <button type="button" class="btn btn--contorno" data-cookies="nao">Recusar</button>
        <button type="button" class="btn" data-cookies="sim">Aceitar</button>
      </div>`;
    el.addEventListener("click", (e) => {
      const b = e.target.closest("[data-cookies]");
      if (!b) return;
      gravar(b.dataset.cookies);
      el.remove();
      if (b.dataset.cookies === "sim") carregar();
    });
    document.body.appendChild(el);
  }

  /** Reabre o aviso (usado pelo botão da página de privacidade). */
  NS.reverCookies = function () {
    try { localStorage.removeItem(CHAVE); } catch (e) { /* nada a limpar */ }
    if (ativo) aviso();
    return ativo;
  };

  document.addEventListener("DOMContentLoaded", () => {
    if (!ativo) return;
    const escolha = ler();
    if (escolha === "sim") carregar();
    else if (escolha !== "nao") aviso();
  });

  // Cliques em qualquer link de WhatsApp (botão flutuante, rodapé, botões das páginas)
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="https://wa.me/"]');
    if (a) NS.evento("clique_whatsapp", { origem: document.body.dataset.pagina || "" });
  });
})();
