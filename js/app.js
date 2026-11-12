/* ==========================================================================
   NÚCLEO DO SITE — carregado em todas as páginas.
   Responsável por: cabeçalho, rodapé, botão flutuante de WhatsApp,
   utilitários (preço, link de WhatsApp) e o carrinho (localStorage).
   ========================================================================== */
(function () {
  const NS = (window.NS = window.NS || {});
  const cfg = NS.config;

  // ------------------------------------------------------------ utilitários
  const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
  NS.preco = (v) => brl.format(v);

  /** Monta o link do WhatsApp com a mensagem já escrita. */
  NS.linkWhatsApp = (mensagem) =>
    "https://wa.me/" + cfg.contato.whatsapp + (mensagem ? "?text=" + encodeURIComponent(mensagem) : "");

  /** Escapa texto antes de colocar em HTML. */
  NS.esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  NS.item = (id) => (NS.cardapio || []).find((i) => i.id === id);

  /** HTML da foto de um produto (ou um bloco com o monograma quando não há foto). */
  NS.fotoHtml = (item) =>
    item.img
      ? `<img src="assets/img/${NS.esc(item.img)}" alt="${NS.esc(item.nome)}" loading="lazy">`
      : `<div class="sem-foto" aria-hidden="true"></div>`;

  // --------------------------------------------------------------- carrinho
  const CHAVE = "ns-carrinho-v1";
  const ler = () => {
    try {
      const bruto = JSON.parse(localStorage.getItem(CHAVE) || "{}");
      // descarta itens que saíram do cardápio
      return Object.fromEntries(Object.entries(bruto).filter(([id, q]) => NS.item(id) && q > 0));
    } catch (e) {
      return {};
    }
  };
  let estado = {};
  const salvar = () => {
    try { localStorage.setItem(CHAVE, JSON.stringify(estado)); } catch (e) { /* navegação privada: segue só em memória */ }
    document.dispatchEvent(new CustomEvent("ns:carrinho"));
  };

  NS.carrinho = {
    qtd: (id) => estado[id] || 0,
    definir(id, q) {
      if (q > 0) estado[id] = Math.min(q, 99); else delete estado[id];
      salvar();
    },
    somar(id, delta) { this.definir(id, this.qtd(id) + delta); },
    limpar() { estado = {}; salvar(); },
    linhas: () => Object.entries(estado).map(([id, qtd]) => ({ item: NS.item(id), qtd })),
    totalItens: () => Object.values(estado).reduce((a, b) => a + b, 0),
    totalValor: () => Object.entries(estado).reduce((s, [id, q]) => s + (NS.item(id).preco || 0) * q, 0),
  };

  // ------------------------------------------------------ cabeçalho/rodapé
  const paginas = [
    { id: "inicio", href: "index.html", nome: "Início" },
    { id: "historia", href: "historia.html", nome: "Nossa história" },
    { id: "cardapio", href: "cardapio.html", nome: "Cardápio" },
    { id: "pedidos", href: "pedidos.html", nome: "Pedidos" },
    { id: "encomendas", href: "encomendas.html", nome: "Encomendas" },
  ];

  const iconeWhats =
    '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20Zm4.4-5.6c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.500 6.500 0 0 1-3.200-2.800c-.2-.4.2-.4.6-1.200.1-.200 0-.300 0-.500l-.8-1.800c-.2-.4-.4-.4-.6-.4h-.5a1 1 0 0 0-.700.300 2.900 2.900 0 0 0-.900 2.200 5 5 0 0 0 1.100 2.700 11.500 11.500 0 0 0 4.400 3.900c1.600.7 2.300.7 3.100.6a2.600 2.600 0 0 0 1.700-1.200 2.100 2.100 0 0 0 .2-1.200c-.1-.1-.3-.2-.5-.3Z"/></svg>';
  const iconeSacola =
    '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>';

  function cabecalho() {
    const atual = document.body.dataset.pagina;
    const alvo = document.getElementById("cabecalho");
    if (!alvo) return;
    alvo.innerHTML = `
      ${cfg.modoDemo ? '<div class="faixa-demo">Versão de demonstração — endereço, horários e fotos ainda serão confirmados.</div>' : ""}
      <header class="topo">
        <div class="container topo__linha">
          <a class="marca" href="index.html" aria-label="${NS.esc(cfg.marca.nome)} — página inicial">
            <img src="assets/img/marca/logo-horizontal-creme.png" alt="${NS.esc(cfg.marca.nome)} ${NS.esc(cfg.marca.assinatura)}" width="164" height="50">
          </a>
          <button class="menu-btn" aria-expanded="false" aria-controls="nav" aria-label="Abrir menu"><span></span><span></span><span></span></button>
          <nav id="nav" class="nav" aria-label="Principal">
            ${paginas.map((p) => `<a href="${p.href}"${p.id === atual ? ' aria-current="page"' : ""}>${p.nome}</a>`).join("")}
          </nav>
          ${NS.modoApp ? "" : `<a class="sacola" href="pedidos.html" aria-label="Ver meu pedido">${iconeSacola}<span class="sacola__n" hidden>0</span></a>`}
        </div>
      </header>`;
    const btn = alvo.querySelector(".menu-btn");
    btn.addEventListener("click", () => {
      const aberto = alvo.querySelector(".topo").classList.toggle("topo--aberto");
      btn.setAttribute("aria-expanded", aberto);
    });
  }

  function rodape() {
    const alvo = document.getElementById("rodape");
    if (!alvo) return;
    const c = cfg.contato;
    alvo.innerHTML = `
      <footer class="rodape">
        <div class="container rodape__grade">
          <div>
            <img class="rodape__marca" src="assets/img/marca/logo-vertical-vinho.png" alt="${NS.esc(cfg.marca.nome)} ${NS.esc(cfg.marca.assinatura)}" width="170" height="123">
            <p>${NS.esc(cfg.endereco.linha1)}<br>${NS.esc(cfg.endereco.linha2)}</p>
            ${cfg.endereco.mapaUrl ? `<p><a href="${NS.esc(cfg.endereco.mapaUrl)}" target="_blank" rel="noopener">Como chegar</a></p>` : ""}
          </div>
          <div>
            <h2>Horários</h2>
            <ul>${cfg.horarios.map((h) => `<li><span>${NS.esc(h.dias)}</span> ${NS.esc(h.horas)}</li>`).join("")}</ul>
          </div>
          <div>
            <h2>Fale com a gente</h2>
            <ul>
              <li><a href="${NS.linkWhatsApp("Olá! Vim pelo site da Neto & Silva.")}" target="_blank" rel="noopener">WhatsApp ${NS.esc(c.whatsappExibicao)}</a></li>
              ${c.instagram ? `<li><a href="${NS.esc(c.instagram)}" target="_blank" rel="noopener">Instagram</a></li>` : ""}
              ${c.email ? `<li><a href="mailto:${NS.esc(c.email)}">${NS.esc(c.email)}</a></li>` : ""}
            </ul>
          </div>
          <div>
            <h2>Navegue</h2>
            <ul>${paginas.map((p) => `<li><a href="${p.href}">${p.nome}</a></li>`).join("")}</ul>
          </div>
        </div>
        <p class="rodape__fim container">© ${new Date().getFullYear()} ${NS.esc(cfg.marca.nome)} ${NS.esc(cfg.marca.assinatura)} · <a href="privacidade.html">Privacidade e cookies</a></p>
      </footer>
      <a class="whats-flutuante" href="${NS.linkWhatsApp("Olá! Vim pelo site da Neto & Silva.")}" target="_blank" rel="noopener" aria-label="Conversar no WhatsApp">${iconeWhats}</a>`;
  }

  /** Dados estruturados (schema.org) para o Google entender o negócio local. */
  function dadosEstruturados() {
    const base = (cfg.site && cfg.site.url) || location.origin;
    const dados = {
      "@context": "https://schema.org",
      "@type": "Bakery",
      name: cfg.marca.nome + " " + cfg.marca.assinatura,
      slogan: cfg.marca.slogan,
      url: base + "/",
      image: base + "/assets/img/bolo-decorado.jpg",
      logo: base + "/assets/img/marca/perfil.png",
      telephone: "+" + cfg.contato.whatsapp,
      servesCuisine: ["Confeitaria", "Cafeteria"],
      hasMenu: base + "/cardapio.html",
      address: { "@type": "PostalAddress", streetAddress: cfg.endereco.linha1, addressRegion: "AL", addressCountry: "BR" },
    };
    if (cfg.endereco.mapaUrl) dados.hasMap = cfg.endereco.mapaUrl;
    if (cfg.contato.instagram) dados.sameAs = [cfg.contato.instagram];
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.textContent = JSON.stringify(dados);
    document.head.appendChild(s);
  }

  function atualizarSacola() {
    const n = NS.carrinho.totalItens();
    document.querySelectorAll(".sacola__n").forEach((el) => {
      el.textContent = n;
      el.hidden = n === 0;
    });
  }

  // Preenche qualquer elemento com data-whats="mensagem" com o link certo.
  function ligarLinksWhats() {
    document.querySelectorAll("[data-whats]").forEach((a) => {
      a.href = NS.linkWhatsApp(a.dataset.whats);
      a.target = "_blank";
      a.rel = "noopener";
    });
  }

  // Com plataforma de pedidos configurada, o site não usa o carrinho próprio:
  // os botões de pedido abrem a plataforma (ver config.pedidos.appPedidosUrl).
  NS.modoApp = !!cfg.pedidos.appPedidosUrl;

  // Preenche qualquer link com data-app com o endereço da plataforma de pedidos.
  function ligarLinksApp() {
    document.querySelectorAll("a[data-app]").forEach((a) => {
      a.href = cfg.pedidos.appPedidosUrl;
      a.target = "_blank";
      a.rel = "noopener";
    });
  }
  document.addEventListener("click", (e) => {
    if (e.target.closest("a[data-app]") && NS.evento) NS.evento("pedido_app", { origem: document.body.dataset.pagina || "" });
  });

  document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.toggle("modo-app", NS.modoApp);
    estado = ler();
    // Link com pedido pronto: pedidos.html?itens=coxinha:2,cafe-coado:1
    // (útil para promoções no Instagram ou QR code na loja)
    const pronto = new URLSearchParams(location.search).get("itens");
    if (pronto) {
      estado = {};
      pronto.split(",").forEach((par) => {
        const [id, q] = par.split(":");
        const item = NS.item(id);
        if (item && !item.sobEncomenda) estado[id] = Math.max(1, Math.min(parseInt(q, 10) || 1, 99));
      });
      salvar();
    }
    cabecalho();
    rodape();
    dadosEstruturados();
    ligarLinksWhats();
    if (NS.modoApp) ligarLinksApp();
    atualizarSacola();
    document.addEventListener("ns:carrinho", atualizarSacola);
    document.dispatchEvent(new CustomEvent("ns:pronto"));
  });
})();
