/* ==========================================================================
   CARDÁPIO INTERATIVO — usado em cardapio.html (lista completa com filtros)
   e em index.html (destaques). Lê os dados de js/data/cardapio.js.
   ========================================================================== */
(function () {
  const NS = window.NS;

  /** Botão "Adicionar", contador de quantidade ou link de encomenda. */
  function acaoHtml(item) {
    if (item.sobEncomenda) return `<a class="btn btn--contorno btn-add" href="encomendas.html">Encomendar</a>`;
    if (item.disponivel === false) return `<span class="nota">Esgotado hoje</span>`;
    if (NS.modoApp) return `<a class="btn btn-add" data-app href="${NS.esc(NS.config.pedidos.appPedidosUrl)}" target="_blank" rel="noopener" aria-label="Pedir ${NS.esc(item.nome)} no cardápio digital">Pedir</a>`;
    const q = NS.carrinho.qtd(item.id);
    if (!q) return `<button class="btn btn-add" data-mais="${item.id}" aria-label="Adicionar ${NS.esc(item.nome)} ao pedido">Adicionar</button>`;
    return `<div class="passo" role="group" aria-label="Quantidade de ${NS.esc(item.nome)}">
        <button data-menos="${item.id}" aria-label="Diminuir">−</button>
        <output>${q}</output>
        <button data-mais="${item.id}" aria-label="Aumentar">+</button>
      </div>`;
  }

  function precoHtml(item) {
    if (item.preco == null) return `<span class="produto__preco"><small>valor</small>Sob consulta</span>`;
    return `<span class="produto__preco">${item.aPartirDe ? "<small>a partir de</small>" : ""}${NS.preco(item.preco)}</span>`;
  }

  NS.cartaoProduto = (item) => `
    <article class="produto${item.disponivel === false ? " produto--indisponivel" : ""}">
      <div class="produto__foto">
        ${NS.fotoHtml(item)}
        <div class="selos">${(item.tags || []).map((t) => `<span class="selo">${NS.esc(t)}</span>`).join("")}</div>
      </div>
      <div class="produto__corpo">
        <h3>${NS.esc(item.nome)}</h3>
        <p class="produto__desc">${NS.esc(item.desc)}</p>
        <div class="produto__base">
          ${precoHtml(item)}
          <div class="produto__acao" data-acao="${item.id}">${acaoHtml(item)}</div>
        </div>
      </div>
    </article>`;

  // Cliques em + / − / Adicionar (em qualquer página que tenha cartões)
  document.addEventListener("click", (e) => {
    const mais = e.target.closest("[data-mais]");
    const menos = e.target.closest("[data-menos]");
    if (mais) {
      NS.carrinho.somar(mais.dataset.mais, 1);
      const item = NS.item(mais.dataset.mais);
      if (NS.evento && item) NS.evento("adicionar_item", { value: item.preco || 0, currency: "BRL", item_name: item.nome });
    }
    if (menos) NS.carrinho.somar(menos.dataset.menos, -1);
  });

  function atualizarAcoes() {
    document.querySelectorAll("[data-acao]").forEach((el) => {
      const item = NS.item(el.dataset.acao);
      if (item) el.innerHTML = acaoHtml(item);
    });
    const barra = document.getElementById("barra-pedido");
    if (barra) {
      const n = NS.modoApp ? 0 : NS.carrinho.totalItens();
      barra.hidden = n === 0;
      document.body.classList.toggle("tem-barra", n > 0);
      barra.querySelector("[data-resumo]").textContent =
        `${n} ${n === 1 ? "item" : "itens"} · ${NS.preco(NS.carrinho.totalValor())}`;
    }
  }

  // ----------------------------------------------------- página do cardápio
  function montarCardapio(alvo) {
    const chips = document.getElementById("chips");
    const busca = document.getElementById("busca");
    let categoria = "todas";

    chips.innerHTML = [{ id: "todas", nome: "Tudo" }, ...NS.categorias]
      .map((c) => `<button class="chip" data-cat="${c.id}" aria-pressed="${c.id === categoria}">${NS.esc(c.nome)}</button>`)
      .join("");

    const semAcento = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

    function desenhar() {
      const termo = semAcento(busca.value.trim());
      let html = "";
      NS.categorias.forEach((cat) => {
        if (categoria !== "todas" && categoria !== cat.id) return;
        const itens = NS.cardapio.filter(
          (i) => i.categoria === cat.id && (!termo || semAcento(i.nome + " " + i.desc + " " + (i.tags || []).join(" ")).includes(termo))
        );
        if (!itens.length) return;
        html += `<h2 class="categoria-titulo" id="cat-${cat.id}">${NS.esc(cat.nome)}</h2>
                 <div class="grade grade--produtos">${itens.map(NS.cartaoProduto).join("")}</div>`;
      });
      alvo.innerHTML = html || `<p class="vazio">Nada encontrado. Que tal perguntar pra gente no WhatsApp?</p>`;
    }

    chips.addEventListener("click", (e) => {
      const b = e.target.closest("[data-cat]");
      if (!b) return;
      categoria = b.dataset.cat;
      chips.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", c === b));
      desenhar();
    });
    busca.addEventListener("input", desenhar);
    desenhar();
  }

  document.addEventListener("ns:pronto", () => {
    const lista = document.getElementById("cardapio-lista");
    if (lista) montarCardapio(lista);

    const destaques = document.getElementById("destaques");
    if (destaques) destaques.innerHTML = NS.cardapio.filter((i) => i.destaque).slice(0, 4).map(NS.cartaoProduto).join("");

    atualizarAcoes();
    document.addEventListener("ns:carrinho", atualizarAcoes);
  });
})();
