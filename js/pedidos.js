/* ==========================================================================
   ÁREA DE PEDIDOS — carrinho + dados do cliente → mensagem pronta no WhatsApp.
   Não há pagamento online nem banco de dados nesta fase (ver docs/DECISOES.md).
   ========================================================================== */
(function () {
  const NS = window.NS;

  document.addEventListener("ns:pronto", () => {
    const cfg = NS.config.pedidos;
    const lista = document.getElementById("itens-pedido");
    const total = document.getElementById("total-pedido");
    const form = document.getElementById("form-pedido");
    const erro = document.getElementById("erro-pedido");
    const campoEndereco = document.getElementById("campo-endereco");

    // ---- opções vindas da configuração
    const modos = [];
    if (cfg.aceitaRetirada) modos.push("Retirar na loja");
    if (cfg.aceitaEntrega) modos.push("Entrega");
    document.getElementById("p-recebimento").innerHTML = modos
      .map((m, i) => `<label class="opcao"><input type="radio" name="recebimento" value="${m}"${i === 0 ? " checked" : ""}><span>${m}</span></label>`)
      .join("");
    document.getElementById("p-pagamento").innerHTML = cfg.formasPagamento.map((f) => `<option>${NS.esc(f)}</option>`).join("");
    document.getElementById("nota-entrega").textContent = cfg.aceitaEntrega ? cfg.taxaEntregaTexto : "";

    // ---- cartão do app de pedidos (aparece como "em breve" enquanto não há link)
    const appLink = document.getElementById("app-link");
    if (cfg.appPedidosUrl) {
      document.getElementById("app-texto").textContent = "Você também pode pedir e pagar online pelo nosso app.";
      appLink.textContent = "Abrir " + cfg.appPedidosNome;
      appLink.href = cfg.appPedidosUrl;
      appLink.hidden = false;
    } else {
      document.getElementById("app-texto").textContent = "Em breve: pedidos com pagamento online. Por enquanto, envie pelo WhatsApp — é rapidinho.";
    }

    const recebimento = () => form.elements.recebimento.value;
    form.addEventListener("change", () => { campoEndereco.hidden = recebimento() !== "Entrega"; });

    // ---- lista de itens
    function desenhar() {
      const linhas = NS.carrinho.linhas();
      if (!linhas.length) {
        lista.innerHTML = `<p class="vazio" style="padding:28px 0">Seu pedido está vazio.<br>Escolha suas delícias no cardápio.</p>`;
        total.hidden = true;
      } else {
        lista.innerHTML = linhas
          .map(({ item, qtd }) => `
            <div class="linha-item">
              <div class="linha-item__foto">${NS.fotoHtml(item)}</div>
              <div><div class="linha-item__nome">${NS.esc(item.nome)}</div><div class="linha-item__preco">${NS.preco(item.preco)} cada</div></div>
              <div class="passo" role="group" aria-label="Quantidade de ${NS.esc(item.nome)}">
                <button type="button" data-menos="${item.id}" aria-label="Diminuir">−</button>
                <output>${qtd}</output>
                <button type="button" data-mais="${item.id}" aria-label="Aumentar">+</button>
              </div>
            </div>`)
          .join("");
        total.hidden = false;
        total.querySelector("[data-total]").textContent = NS.preco(NS.carrinho.totalValor());
      }
      form.querySelector("[type=submit]").disabled = !linhas.length;
    }
    lista.addEventListener("click", (e) => {
      const mais = e.target.closest("[data-mais]");
      const menos = e.target.closest("[data-menos]");
      if (mais) NS.carrinho.somar(mais.dataset.mais, 1);
      if (menos) NS.carrinho.somar(menos.dataset.menos, -1);
    });
    document.addEventListener("ns:carrinho", desenhar);
    desenhar();

    // ---- envio
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const d = Object.fromEntries(new FormData(form));
      const falhas = [];
      if (!d.nome.trim()) falhas.push("informe seu nome");
      if (d.recebimento === "Entrega" && !d.endereco.trim()) falhas.push("informe o endereço de entrega");
      const valor = NS.carrinho.totalValor();
      if (d.recebimento === "Entrega" && cfg.pedidoMinimoEntrega && valor < cfg.pedidoMinimoEntrega)
        falhas.push("o pedido mínimo para entrega é " + NS.preco(cfg.pedidoMinimoEntrega));
      erro.hidden = !falhas.length;
      if (falhas.length) { erro.textContent = "Para enviar, " + falhas.join(" e ") + "."; return; }

      const itens = NS.carrinho.linhas().map(({ item, qtd }) => `• ${qtd}x ${item.nome} — ${NS.preco(item.preco * qtd)}`);
      const msg = [
        "*Novo pedido pelo site* 🧁",
        "",
        ...itens,
        "",
        `*Total dos itens:* ${NS.preco(valor)}`,
        "",
        `*Nome:* ${d.nome.trim()}`,
        `*Recebimento:* ${d.recebimento}`,
        d.recebimento === "Entrega" ? `*Endereço:* ${d.endereco.trim()}` : null,
        `*Horário:* ${d.horario || "o quanto antes"}`,
        `*Pagamento:* ${d.pagamento}`,
        d.obs.trim() ? `*Observações:* ${d.obs.trim()}` : null,
      ].filter((l) => l !== null).join("\n");

      if (NS.evento) NS.evento("pedido_whatsapp", { value: valor, currency: "BRL", recebimento: d.recebimento });
      window.open(NS.linkWhatsApp(msg), "_blank", "noopener");
    });
  });
})();
