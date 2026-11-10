/* ==========================================================================
   ÁREA DE ENCOMENDAS — desenha os formulários definidos em
   js/data/formularios.js, valida e envia o resumo pelo WhatsApp.
   O tipo ativo fica na URL: encomendas.html#casamento | #aniversario | #eventos
   ========================================================================== */
(function () {
  const NS = window.NS;

  function campoHtml(c) {
    const id = "f-" + c.id;
    const req = c.obrigatorio ? ' <span class="obrig">*</span>' : "";
    const dica = c.dica ? `<p class="campo__dica">${NS.esc(c.dica)}</p>` : "";
    const ph = c.placeholder ? ` placeholder="${NS.esc(c.placeholder)}"` : "";
    const classe = `campo${c.meia ? " campo--meia" : ""}`;
    let corpo;

    if (c.tipo === "radio" || c.tipo === "checkbox") {
      corpo = `<span class="campo__rotulo" id="${id}-r">${NS.esc(c.rotulo)}${req}</span>
        <div class="opcoes" role="group" aria-labelledby="${id}-r">
          ${c.opcoes.map((o) => `<label class="opcao"><input type="${c.tipo}" name="${c.id}" value="${NS.esc(o)}"><span>${NS.esc(o)}</span></label>`).join("")}
        </div>`;
    } else if (c.tipo === "select") {
      corpo = `<label for="${id}">${NS.esc(c.rotulo)}${req}</label>
        <select id="${id}" name="${c.id}"><option value="">Selecione…</option>${c.opcoes.map((o) => `<option>${NS.esc(o)}</option>`).join("")}</select>`;
    } else if (c.tipo === "textarea") {
      corpo = `<label for="${id}">${NS.esc(c.rotulo)}${req}</label><textarea id="${id}" name="${c.id}"${ph}></textarea>`;
    } else {
      const extra = c.tipo === "number" ? ' min="1" inputmode="numeric"' : "";
      corpo = `<label for="${id}">${NS.esc(c.rotulo)}${req}</label><input id="${id}" name="${c.id}" type="${c.tipo}"${ph}${extra}>`;
    }
    return `<div class="${classe}" data-campo="${c.id}">${corpo}${dica}<p class="campo__erro" hidden></p></div>`;
  }

  const dataIso = (d) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  const dataBr = (iso) => iso.split("-").reverse().join("/");

  document.addEventListener("ns:pronto", () => {
    const abas = document.getElementById("abas");
    const form = document.getElementById("form-encomenda");
    const tipos = Object.keys(NS.formularios);
    let tipo;

    abas.innerHTML = tipos
      .map((t) => {
        const f = NS.formularios[t];
        return `<button class="aba" role="tab" data-tipo="${t}" aria-controls="painel">
            <img src="assets/img/${NS.esc(f.img)}" alt="">
            <span class="aba__texto"><strong>${NS.esc(f.titulo)}</strong><small>${NS.esc(f.resumo)}</small></span>
          </button>`;
      })
      .join("");

    function abrir(novo) {
      tipo = tipos.includes(novo) ? novo : tipos[0];
      const f = NS.formularios[tipo];
      const dias = NS.config.encomendas.antecedenciaDias[tipo] || 0;
      abas.querySelectorAll(".aba").forEach((a) => a.setAttribute("aria-selected", a.dataset.tipo === tipo));
      document.getElementById("form-titulo").textContent = f.titulo;
      document.getElementById("form-aviso").textContent =
        `Pedimos pelo menos ${dias} ${dias === 1 ? "dia" : "dias"} de antecedência para este tipo de encomenda. Para prazos menores, fale com a gente no WhatsApp.`;

      form.innerHTML =
        f.secoes.map((s) => `<fieldset class="form-secao"><legend>${NS.esc(s.titulo)}</legend><div class="campos">${s.campos.map(campoHtml).join("")}</div></fieldset>`).join("") +
        `<p class="campo__erro" id="erro-geral" role="alert" hidden></p>
         <button class="btn btn--whats btn--bloco" type="submit">Enviar pedido de orçamento pelo WhatsApp</button>
         <p class="nota" style="margin-top:12px">O WhatsApp abre com o resumo já escrito. Nenhum dado fica guardado no site.</p>`;

      // data mínima respeitando a antecedência
      const data = form.elements.data;
      if (data) { const min = new Date(); min.setDate(min.getDate() + dias); data.min = dataIso(min); }
    }

    abas.addEventListener("click", (e) => {
      const b = e.target.closest("[data-tipo]");
      if (!b) return;
      history.replaceState(null, "", "#" + b.dataset.tipo);
      abrir(b.dataset.tipo);
    });
    window.addEventListener("hashchange", () => abrir(location.hash.slice(1)));
    abrir(location.hash.slice(1));

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const f = NS.formularios[tipo];
      const dados = new FormData(form);
      const linhas = [`*Pedido de orçamento — ${f.titulo}* 🎂`];
      let primeiroErro = null;

      f.secoes.forEach((s) => {
        const bloco = [];
        s.campos.forEach((c) => {
          const valores = dados.getAll(c.id).map((v) => String(v).trim()).filter(Boolean);
          const caixa = form.querySelector(`[data-campo="${c.id}"]`);
          const erroEl = caixa.querySelector(".campo__erro");
          let erro = "";
          if (c.obrigatorio && !valores.length) erro = "Campo obrigatório.";
          else if (c.tipo === "date" && valores[0] && form.elements[c.id].min && valores[0] < form.elements[c.id].min)
            erro = `Escolha uma data a partir de ${dataBr(form.elements[c.id].min)} ou fale conosco no WhatsApp.`;
          else if (c.tipo === "tel" && valores[0] && valores[0].replace(/\D/g, "").length < 10) erro = "Informe o número com DDD.";
          caixa.classList.toggle("campo--erro", !!erro);
          erroEl.textContent = erro;
          erroEl.hidden = !erro;
          if (erro && !primeiroErro) primeiroErro = caixa;
          if (valores.length) bloco.push(`*${c.rotulo.replace(/[?:]+$/, "")}:*${c.tipo === "date" ? dataBr(valores[0]) : valores.join(", ")}`);
        });
        if (bloco.length) linhas.push("", `_${s.titulo}_`, ...bloco);
      });

      const geral = document.getElementById("erro-geral");
      geral.hidden = !primeiroErro;
      if (primeiroErro) {
        geral.textContent = "Revise os campos destacados antes de enviar.";
        primeiroErro.scrollIntoView({ behavior: "smooth", block: "center" });
        const alvo = primeiroErro.querySelector("input, select, textarea");
        if (alvo) alvo.focus({ preventScroll: true });
        return;
      }
      if (NS.evento) NS.evento("encomenda_whatsapp", { tipo: tipo });
      window.open(NS.linkWhatsApp(linhas.join("\n")), "_blank", "noopener");
    });
  });
})();
