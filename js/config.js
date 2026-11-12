/* ==========================================================================
   CONFIGURAÇÃO GERAL DO SITE — Neto & Silva Confeitaria Artesanal
   Tudo que muda com frequência (telefone, horários, endereço, links) fica AQUI.
   Itens marcados com "CONFIRMAR" aguardam resposta dos donos
   (ver docs/PERGUNTAS-DONOS.md).
   ========================================================================== */
window.NS = window.NS || {};

NS.config = {
  // Mostra a faixa "versão de demonstração" no topo. Trocar para false no lançamento.
  modoDemo: false,

  marca: {
    nome: "Neto & Silva",
    assinatura: "Confeitaria Artesanal",
    slogan: "O detalhe que faz seu dia mais doce", // Manual de Marca 2026
  },

  site: {
    // Endereço definitivo do site (usado nos dados enviados ao Google).
    // Se o domínio mudar, atualize também sitemap.xml e robots.txt.
    url: "https://netoesilvaconfeitaria.com.br",
  },

  // Medição e anúncios. Enquanto os três códigos estiverem vazios, o site não
  // carrega nada de terceiros e não mostra aviso de cookies.
  // Passo a passo em docs/MEDICAO-E-ANUNCIOS.md
  medicao: {
    ga4Id: "",        // Google Analytics 4 — ex.: "G-ABC123XYZ"
    googleAdsId: "",  // Google Ads — ex.: "AW-123456789"
    // Rótulos de conversão do Google Ads (a parte depois da barra em "AW-123/AbCdEf")
    googleAdsConversoes: { pedido_whatsapp: "", encomenda_whatsapp: "" },
    metaPixelId: "",  // Pixel da Meta (Instagram/Facebook) — ex.: "123456789012345"
  },

  contato: {
    // Formato internacional, só números: 55 + DDD + número.
    // Número que recebe os pedidos, informado em 12/11/2026 (substitui o
    // (81) 9347-9275 usado na demonstração).
    whatsapp: "5582987760188",
    whatsappExibicao: "(82) 98776-0188",
    instagram: "", // ex.: "https://instagram.com/netoesilva"  CONFIRMAR
    email: "", // CONFIRMAR
  },

  endereco: {
    linha1: "Rota Ecológica dos Milagres", // rua e número — CONFIRMAR
    linha2: "Porto de Pedras, Alagoas", // cidade tirada do MenuDino dos donos — CONFIRMAR
    mapaUrl: "", // link do Google Maps — CONFIRMAR
  },

  // Horários reais ainda não informados pelos donos (12/11/2026). Enquanto a
  // lista estiver vazia, o site mostra "consulte pelo WhatsApp".
  // Formato: { dias: "Terça a domingo", horas: "8h às 19h" }
  horarios: [],

  pedidos: {
    // Link de uma plataforma externa de pedidos. Com ele preenchido, os botões
    // de pedido do site abrem essa plataforma. Vazio (""), o site usa o próprio
    // carrinho + WhatsApp. Os donos decidiram NÃO usar o MenuDino (D12); o
    // pedido na mesa virá da plataforma da Caval.
    appPedidosUrl: "",
    appPedidosNome: "cardápio digital",
    aceitaEntrega: false, // 12/11/2026: por enquanto só retirada na loja. true reativa a entrega.
    aceitaRetirada: true,
    taxaEntregaTexto: "Taxa de entrega combinada pelo WhatsApp conforme a localização.", // CONFIRMAR
    pedidoMinimoEntrega: 0, // em reais; 0 = sem mínimo — CONFIRMAR
    formasPagamento: ["Pix", "Cartão de crédito", "Cartão de débito", "Dinheiro"], // CONFIRMAR
  },

  encomendas: {
    // Antecedência mínima (em dias) para cada tipo de encomenda — CONFIRMAR
    antecedenciaDias: { casamento: 30, aniversario: 3, eventos: 7 },
  },
};
