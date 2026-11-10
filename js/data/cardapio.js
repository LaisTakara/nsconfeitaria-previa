/* ==========================================================================
   CARDÁPIO — edite este arquivo para alterar produtos, preços e fotos.
   Guia completo em docs/GUIA-DE-CONTEUDO.md

   ATENÇÃO: nomes, descrições e PREÇOS abaixo são ILUSTRATIVOS (demonstração).
   Devem ser substituídos pelo cardápio real dos donos.

   Campos de cada item:
     id            identificador único, sem espaços (não mude depois de publicado)
     nome, desc    textos exibidos
     preco         número em reais (ex.: 14.5). Use null para "sob consulta"
     aPartirDe     true mostra "a partir de" antes do preço
     categoria     id de uma das categorias abaixo
     img           arquivo dentro de assets/img/ (opcional)
     tags          selos: "Mais pedido", "Novidade", "Vegetariano", "Sem lactose"...
     destaque      true = aparece na página inicial
     sobEncomenda  true = não entra no carrinho; leva ao formulário de encomendas
     disponivel    false = aparece como "esgotado hoje"
   ========================================================================== */
window.NS = window.NS || {};

NS.categorias = [
  { id: "bolos", nome: "Bolos & fatias" },
  { id: "croissants", nome: "Croissants" },
  { id: "salgados", nome: "Salgados" },
  { id: "cafes", nome: "Cafés" },
  { id: "encomendas", nome: "Sob encomenda" },
];

NS.cardapio = [
  // ---------- Bolos & fatias ----------
  {
    id: "fatia-bolo-chocolate",
    nome: "Fatia de bolo de chocolate",
    desc: "Massa de cacau, recheio cremoso e calda quente de chocolate servida à parte.",
    preco: 22, categoria: "bolos", img: "bolo-fatia-calda.jpg",
    tags: ["Mais pedido"], destaque: true,
  },
  {
    id: "fatia-bolo-do-dia",
    nome: "Fatia do bolo do dia",
    desc: "Pergunte qual saiu do forno hoje.",
    preco: 18, categoria: "bolos", img: "bolo-fatia.jpg", tags: [],
  },

  // ---------- Croissants ----------
  {
    id: "croissant-tradicional",
    nome: "Croissant tradicional",
    desc: "Folhado na manteiga, assado todas as manhãs.",
    preco: 14, categoria: "croissants", img: "", tags: ["Vegetariano"],
  },
  {
    id: "croissant-morango-avela",
    nome: "Croissant de morango com creme de avelã",
    desc: "Croissant aberto, morangos frescos e creme de avelã generoso.",
    preco: 26, categoria: "croissants", img: "croissant-morango-chocolate.jpg",
    tags: ["Mais pedido"], destaque: true,
  },
  {
    id: "croissant-morango",
    nome: "Croissant de morangos frescos",
    desc: "Recheado na hora com morangos fatiados.",
    preco: 24, categoria: "croissants", img: "croissant-morango.jpg", tags: ["Vegetariano"],
  },

  // ---------- Salgados ----------
  {
    id: "coxinha",
    nome: "Coxinha da casa",
    desc: "Massa leve, recheio cremoso de frango, frita na hora.",
    preco: 12, categoria: "salgados", img: "coxinha.jpg", tags: [], destaque: true,
  },
  {
    id: "tortinha",
    nome: "Tortinha assada",
    desc: "Massa amanteigada com recheio do dia.",
    preco: 16, categoria: "salgados", img: "tortinha.jpg", tags: [],
  },

  // ---------- Cafés ----------
  {
    id: "espresso",
    nome: "Espresso",
    desc: "Grão especial, extraído na hora.",
    preco: 8, categoria: "cafes", img: "", tags: [],
  },
  {
    id: "cafe-coado",
    nome: "Café coado",
    desc: "Método filtrado, servido na jarra para dividir (ou não).",
    preco: 12, categoria: "cafes", img: "cafe-coado.jpg", tags: [], destaque: true,
  },
  {
    id: "latte",
    nome: "Latte",
    desc: "Espresso, leite vaporizado e espuma cremosa.",
    preco: 16, categoria: "cafes", img: "cafe-latte.jpg", tags: ["Novidade"],
  },

  // ---------- Sob encomenda (não entram no carrinho) ----------
  {
    id: "bolo-chocolate-inteiro",
    nome: "Bolo de chocolate inteiro",
    desc: "O bolo da casa, decorado com frutas. Tamanhos e sabores sob consulta.",
    preco: 180, aPartirDe: true, categoria: "encomendas", img: "bolo-decorado.jpg",
    tags: ["Sob encomenda"], sobEncomenda: true,
  },
  {
    id: "bolo-festa",
    nome: "Bolo de festa personalizado",
    desc: "Casamentos, aniversários e celebrações. Conte sua ideia no formulário.",
    preco: null, categoria: "encomendas", img: "bolo-chocolate-inteiro.jpg",
    tags: ["Sob encomenda"], sobEncomenda: true,
  },
  {
    id: "mesa-doces",
    nome: "Doces e salgados para eventos",
    desc: "Mesas de doces, coffee breaks e kits para pousadas e empresas.",
    preco: null, categoria: "encomendas", img: "",
    tags: ["Sob encomenda"], sobEncomenda: true,
  },
];
