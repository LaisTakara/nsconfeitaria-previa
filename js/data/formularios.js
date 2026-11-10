/* ==========================================================================
   FORMULÁRIOS DE ENCOMENDA — casamento, aniversário e eventos em geral.
   Cada formulário é uma lista de seções; cada seção, uma lista de campos.
   A página encomendas.html desenha tudo automaticamente a partir daqui,
   então para adicionar/remover uma pergunta basta editar este arquivo.

   Tipos de campo: text | tel | email | number | date | time | select |
                   radio | checkbox | textarea
   Opções: obrigatorio, placeholder, dica, opcoes: [...], meia (ocupa meia linha)
   ========================================================================== */
window.NS = window.NS || {};

(function () {
  // Blocos reutilizados nos três formulários -------------------------------
  const contato = {
    titulo: "Seus dados",
    campos: [
      { id: "nome", rotulo: "Seu nome", tipo: "text", obrigatorio: true, meia: true },
      { id: "whatsapp", rotulo: "WhatsApp", tipo: "tel", obrigatorio: true, meia: true, placeholder: "(82) 9 0000-0000" },
      { id: "email", rotulo: "E-mail", tipo: "email", meia: true, dica: "Opcional — para enviarmos o orçamento." },
      { id: "como_conheceu", rotulo: "Como nos conheceu?", tipo: "select", meia: true,
        opcoes: ["Instagram", "Indicação", "Passei na loja", "Pousada / hotel", "Google", "Outro"] },
    ],
  };

  const entrega = {
    titulo: "Entrega",
    campos: [
      { id: "recebimento", rotulo: "Como prefere receber?", tipo: "radio", obrigatorio: true,
        opcoes: ["Retiro na confeitaria", "Entrega no local do evento"] },
      { id: "endereco_entrega", rotulo: "Endereço ou pousada para entrega", tipo: "text",
        dica: "Preencha se escolheu entrega." },
    ],
  };

  const fechamento = {
    titulo: "Para fechar",
    campos: [
      { id: "restricoes", rotulo: "Restrições alimentares", tipo: "checkbox",
        opcoes: ["Sem glúten", "Sem lactose", "Sem açúcar", "Vegano", "Alergia a castanhas"] },
      { id: "orcamento", rotulo: "Faixa de investimento", tipo: "select",
        opcoes: ["Ainda não sei", "Até R$ 300", "R$ 300 a R$ 800", "R$ 800 a R$ 2.000", "Acima de R$ 2.000"] },
      { id: "observacoes", rotulo: "Conte mais sobre o que imagina", tipo: "textarea",
        placeholder: "Referências, cores, detalhes importantes…",
        dica: "Fotos de referência podem ser enviadas depois, na conversa do WhatsApp." },
    ],
  };

  const sabores = ["Chocolate", "Baunilha", "Red velvet", "Cenoura", "Coco", "Limão", "Ainda não sei"];

  NS.formularios = {
    // ----------------------------------------------------------- CASAMENTO
    casamento: {
      titulo: "Casamentos",
      resumo: "Bolo, mesa de doces e lembranças para o grande dia na Rota dos Milagres.",
      img: "bolo-decorado.jpg",
      secoes: [
        contato,
        {
          titulo: "O casamento",
          campos: [
            { id: "casal", rotulo: "Nomes do casal", tipo: "text", obrigatorio: true },
            { id: "data", rotulo: "Data do casamento", tipo: "date", obrigatorio: true, meia: true },
            { id: "horario", rotulo: "Horário da recepção", tipo: "time", meia: true },
            { id: "local", rotulo: "Local (pousada, praia, espaço)", tipo: "text", obrigatorio: true, meia: true },
            { id: "convidados", rotulo: "Número de convidados", tipo: "number", obrigatorio: true, meia: true },
            { id: "cerimonial", rotulo: "Cerimonialista / assessoria (nome e contato)", tipo: "text",
              dica: "Opcional — facilita alinhar horários de montagem." },
          ],
        },
        {
          titulo: "O que você precisa",
          campos: [
            { id: "itens", rotulo: "Itens desejados", tipo: "checkbox", obrigatorio: true,
              opcoes: ["Bolo de casamento", "Mesa de doces finos", "Bem-casados", "Lembrancinhas", "Bolo/doces para o welcome ou pós-festa"] },
            { id: "andares", rotulo: "Bolo: quantos andares?", tipo: "select", meia: true,
              opcoes: ["1 andar", "2 andares", "3 andares", "4 ou mais", "Preciso de sugestão"] },
            { id: "estilo", rotulo: "Estilo do bolo", tipo: "select", meia: true,
              opcoes: ["Clássico liso", "Naked cake", "Flores naturais", "Rústico / praia", "Preciso de sugestão"] },
            { id: "sabores", rotulo: "Sabores de interesse", tipo: "checkbox", opcoes: sabores },
            { id: "qtd_doces", rotulo: "Quantidade aproximada de doces", tipo: "number", meia: true,
              dica: "Sugestão: 4 a 6 doces por convidado." },
            { id: "paleta", rotulo: "Paleta de cores da festa", tipo: "text", meia: true },
            { id: "degustacao", rotulo: "Gostaria de agendar uma degustação?", tipo: "radio",
              opcoes: ["Sim", "Não é necessário"] },
          ],
        },
        entrega,
        fechamento,
      ],
    },

    // --------------------------------------------------------- ANIVERSÁRIO
    aniversario: {
      titulo: "Aniversários",
      resumo: "Bolos personalizados, doces e salgados para comemorar em casa ou na pousada.",
      img: "bolo-com-calda.jpg",
      secoes: [
        contato,
        {
          titulo: "A festa",
          campos: [
            { id: "aniversariante", rotulo: "Nome de quem faz aniversário", tipo: "text", obrigatorio: true, meia: true },
            { id: "idade", rotulo: "Idade que completa", tipo: "number", meia: true },
            { id: "data", rotulo: "Data da festa", tipo: "date", obrigatorio: true, meia: true },
            { id: "horario", rotulo: "Horário para retirar/receber", tipo: "time", obrigatorio: true, meia: true },
            { id: "convidados", rotulo: "Número de pessoas", tipo: "number", obrigatorio: true, meia: true },
            { id: "tema", rotulo: "Tema ou cores", tipo: "text", meia: true },
          ],
        },
        {
          titulo: "O bolo",
          campos: [
            { id: "tamanho", rotulo: "Tamanho", tipo: "select", obrigatorio: true, meia: true,
              opcoes: ["Mini (até 8 fatias)", "Pequeno (10–15 fatias)", "Médio (20–25 fatias)", "Grande (30–40 fatias)", "Preciso de sugestão"] },
            { id: "massa", rotulo: "Massa", tipo: "select", meia: true, opcoes: sabores },
            { id: "recheio", rotulo: "Recheio desejado", tipo: "text", meia: true, placeholder: "Ex.: brigadeiro, ninho com morango…" },
            { id: "cobertura", rotulo: "Acabamento", tipo: "select", meia: true,
              opcoes: ["Ganache de chocolate", "Chantilly", "Buttercream", "Naked cake", "Preciso de sugestão"] },
            { id: "escrita", rotulo: "Mensagem no bolo ou topo", tipo: "text", placeholder: "Ex.: Parabéns, Ana!" },
            { id: "vela", rotulo: "Incluir vela?", tipo: "radio", opcoes: ["Sim", "Não"] },
          ],
        },
        {
          titulo: "Acompanhamentos",
          campos: [
            { id: "extras", rotulo: "Deseja incluir", tipo: "checkbox",
              opcoes: ["Docinhos", "Salgados", "Croissants", "Torta salgada", "Só o bolo"] },
            { id: "qtd_extras", rotulo: "Quantidades aproximadas", tipo: "text", placeholder: "Ex.: 50 docinhos, 100 salgados" },
          ],
        },
        entrega,
        fechamento,
      ],
    },

    // ------------------------------------------------------------- EVENTOS
    eventos: {
      titulo: "Eventos em geral",
      resumo: "Coffee breaks, chás, batizados, confraternizações e parcerias com pousadas.",
      img: "cafe-coado.jpg",
      secoes: [
        contato,
        {
          titulo: "O evento",
          campos: [
            { id: "tipo_evento", rotulo: "Tipo de evento", tipo: "select", obrigatorio: true, meia: true,
              opcoes: ["Corporativo / coffee break", "Chá (bebê, revelação, panela)", "Batizado / primeira comunhão", "Noivado / mini wedding", "Confraternização", "Pousada / hotel (fornecimento)", "Outro"] },
            { id: "empresa", rotulo: "Empresa ou pousada (se houver)", tipo: "text", meia: true },
            { id: "data", rotulo: "Data do evento", tipo: "date", obrigatorio: true, meia: true },
            { id: "horario", rotulo: "Horário de início", tipo: "time", meia: true },
            { id: "local", rotulo: "Local do evento", tipo: "text", obrigatorio: true, meia: true },
            { id: "convidados", rotulo: "Número de pessoas", tipo: "number", obrigatorio: true, meia: true },
          ],
        },
        {
          titulo: "O que você precisa",
          campos: [
            { id: "formato", rotulo: "Formato", tipo: "checkbox", obrigatorio: true,
              opcoes: ["Coffee break completo", "Mesa de doces", "Bolo", "Salgados", "Kits individuais", "Cafés e bebidas"] },
            { id: "recorrencia", rotulo: "É um pedido recorrente?", tipo: "radio",
              opcoes: ["Evento único", "Semanal", "Mensal", "A combinar"] },
            { id: "nota_fiscal", rotulo: "Precisa de nota fiscal?", tipo: "radio", opcoes: ["Sim", "Não"] },
          ],
        },
        entrega,
        fechamento,
      ],
    },
  };
})();
