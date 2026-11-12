/* ==========================================================================
   CARDÁPIO — edite este arquivo para alterar produtos, preços e fotos.
   Guia completo em docs/GUIA-DE-CONTEUDO.md

   Nomes, descrições e preços copiados em 12/11/2026 do cardápio dos donos no
   MenuDino (https://netoesilvaconfeitaria.menudino.com/?localmode=on — modo
   "na loja"). O MenuDino é a fonte oficial: ao mudar um preço lá, mudar aqui.
   A associação das FOTOS aos produtos foi feita por aproximação — CONFIRMAR.
   Os três itens "sob encomenda" não vêm do MenuDino.

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
  { id: "cafes", nome: "Cafés" },
  { id: "croissants", nome: "Croissants" },
  { id: "salgados", nome: "Salgados" },
  { id: "bolos", nome: "Bolos & sobremesas" },
  { id: "bebidas", nome: "Bebidas" },
  { id: "encomendas", nome: "Sob encomenda" },
];

NS.cardapio = [
  // ---------- Cafés ----------
  {
    id: "cafe-coado",
    nome: "Café Coado Especial — feito na Koar",
    desc: "Preparado com grãos de cafés especiais, moídos na hora e filtrados pelo método Koar, técnica brasileira de extração com identidade nordestina. Uma experiência que valoriza os aromas, a delicadeza e as características únicas de cada café.",
    preco: 11.99, categoria: "cafes", img: "cafe-coado.jpg", tags: [], destaque: true,
  },
  {
    id: "cafe-com-leite",
    nome: "Café com Leite Especial",
    desc: "Preparado com café especial e leite cremoso, combinando os aromas e sabores do café com a suavidade do leite. Uma bebida aconchegante, perfeita para qualquer momento do dia.",
    preco: 13.69, categoria: "cafes", img: "cafe-latte.jpg", tags: [],
  },
  {
    id: "espresso",
    nome: "Café Expresso Especial — 50 ml",
    desc: "Uma dose generosa de 50 ml, com extração cuidadosa que revela sabor, corpo e personalidade em cada xícara. Preparado na hora com grãos de cafés especiais, moídos na hora para preservar o frescor e os aromas.",
    preco: 9.99, categoria: "cafes", img: "", tags: [],
  },
  {
    id: "espresso-duplo",
    nome: "Café Espresso Duplo Especial — 100 ml",
    desc: "Duas doses de café especial, preparadas na hora com grãos moídos no momento da extração. Mais intensidade, aroma e sabor para quem aprecia uma experiência completa com café.",
    preco: 15.99, categoria: "cafes", img: "", tags: [],
  },
  {
    id: "macchiato",
    nome: "Espresso Macchiato — 60 ml",
    desc: "Café espresso especial finalizado com uma pequena camada de espuma de leite. Uma combinação que preserva a intensidade do café com um leve toque de cremosidade.",
    preco: 10.99, categoria: "cafes", img: "", tags: [],
  },
  {
    id: "cortado",
    nome: "Cortado Especial — 80 ml",
    desc: "Café espresso especial combinado com leite vaporizado em partes iguais, resultando em uma bebida cremosa, suave e com o sabor marcante do café.",
    preco: 11.99, categoria: "cafes", img: "", tags: [],
  },
  {
    id: "cappuccino",
    nome: "Cappuccino Especial — 180 ml",
    desc: "Uma combinação equilibrada de café espresso especial, leite cremoso e espuma aveludada. Uma bebida envolvente, com textura delicada e sabor marcante, perfeita para acompanhar um momento especial.",
    preco: 14.99, categoria: "cafes", img: "", tags: [],
  },
  {
    id: "mocha-avela",
    nome: "Mocha Especial com Creme de Avelã",
    desc: "Uma combinação irresistível de espresso especial, chocolate e creme de avelã, envolvidos em leite cremoso. Uma bebida encorpada e aveludada, que une a intensidade do café à doçura do chocolate e da avelã.",
    preco: 21.99, categoria: "cafes", img: "", tags: [],
  },
  {
    id: "chocolate-quente",
    nome: "Chocolate Quente Cremoso",
    desc: "Uma bebida aveludada, preparada com chocolate e leite, de textura cremosa e sabor marcante. Servida bem quentinha, é perfeita para aquecer sua pausa e acompanhar nossos bolos especiais.",
    preco: 16.99, categoria: "cafes", img: "", tags: [],
  },

  // ---------- Croissants ----------
  {
    id: "croissant",
    nome: "Croissant Especial",
    desc: "Croissant de massa folhada, dourado e crocante por fora, macio por dentro.",
    preco: 16.99, categoria: "croissants", img: "croissant-tradicional.jpg", tags: [],
  },
  {
    id: "croissant-morango-ninho",
    nome: "Croissant Especial — Morango e Creme de Ninho",
    desc: "Croissant de massa folhada, dourado e crocante por fora, macio por dentro, recheado com Ninho cremoso e morangos frescos.",
    preco: 31.99, categoria: "croissants", img: "croissant-morango.jpg", tags: [],
  },
  {
    id: "croissant-morango-nutella",
    nome: "Croissant Especial — Morango e Nutella",
    desc: "Croissant de massa folhada, dourado e crocante por fora, macio por dentro, recheado com Nutella cremosa e morangos frescos.",
    preco: 31.99, categoria: "croissants", img: "croissant-morango-chocolate.jpg", tags: [], destaque: true,
  },
  {
    id: "croissant-morango-ninho-nutella",
    nome: "Croissant Especial — Morango, Creme de Ninho e Nutella",
    desc: "Croissant de massa folhada, dourado e crocante por fora, macio por dentro, recheado com Ninho cremoso, Nutella e morangos frescos.",
    preco: 39.99, categoria: "croissants", img: "", tags: [],
  },

  // ---------- Salgados ----------
  {
    id: "coxinha-frango",
    nome: "Coxinha de Frango Cremoso",
    desc: "Massa macia e douradinha, com recheio generoso de frango. Crocante por fora, cremosa por dentro e cheia de sabor!",
    preco: 14.99, categoria: "salgados", img: "coxinha.jpg", tags: [], destaque: true,
  },
  {
    id: "coxinha-carne-de-sol",
    nome: "Coxinha de Carne de Sol com Queijo Coalho",
    desc: "Massa macia e douradinha, com recheio generoso de carne de sol com queijo coalho. Crocante por fora, cremosa por dentro e cheia de sabor!",
    preco: 15.5, categoria: "salgados", img: "", tags: [],
  },
  {
    id: "empada-frango",
    nome: "Empada de Frango",
    desc: "Massa leve, amanteigada e delicadamente dourada, com recheio cremoso de frango, preparado com muito sabor. Uma combinação irresistível que derrete na boca!",
    preco: 14.99, categoria: "salgados", img: "", tags: [],
  },
  {
    id: "empada-carne-de-sol",
    nome: "Empada de Carne de Sol na Nata",
    desc: "Massa leve, amanteigada e delicadamente dourada, com recheio cremoso de carne de sol na nata, preparado com muito sabor. Uma combinação irresistível que derrete na boca!",
    preco: 14.99, categoria: "salgados", img: "", tags: [],
  },
  {
    id: "folhado-frango",
    nome: "Folhado de Frango com Requeijão",
    desc: "Massa folhada leve e douradinha, com camadas fininhas e crocantes, recheada com frango e requeijão, temperado na medida certa.",
    preco: 14.99, categoria: "salgados", img: "", tags: [],
  },
  {
    id: "folhado-carne-de-sol",
    nome: "Folhado de Carne de Sol com Queijo Coalho",
    desc: "Massa folhada leve e douradinha, com camadas fininhas e crocantes, recheada com carne de sol com queijo coalho.",
    preco: 14.99, categoria: "salgados", img: "", tags: [],
  },
  {
    id: "folhado-queijo",
    nome: "Folhado de Queijo",
    desc: "Massa folhada leve e douradinha, com camadas fininhas e crocantes, recheada com queijo.",
    preco: 14.99, categoria: "salgados", img: "", tags: [],
  },

  // ---------- Bolos & sobremesas ----------
  {
    id: "fatia-bolo-especial",
    nome: "Fatia de Bolo Especial",
    desc: "Uma seleção de bolos especiais, preparados com massas macias, recheios generosos e combinações irresistíveis de sabores. São 10 opções disponíveis em nossa vitrine, preparadas para tornar sua pausa ainda mais especial.",
    preco: 35.99, categoria: "bolos", img: "bolo-fatia.jpg", tags: [],
  },
  {
    id: "bolo-matilda",
    nome: "Bolo Matilda do Nordeste",
    desc: "Ideal para compartilhar entre duas pessoas! Preparado com massa de chocolate 100% cacau e recheio cremoso de chocolate belga, em camadas deliciosas. Uma fatia intensa e irresistível, para quem aprecia o verdadeiro sabor do chocolate.",
    preco: 59.99, categoria: "bolos", img: "", tags: [],
  },
  {
    id: "fatia-caseiro-chocolate-cobertura",
    nome: "Fatia de Bolo Caseiro de Chocolate + Cobertura",
    desc: "Bolo fofinho e macio, com sabor intenso de chocolate, acompanhado de uma deliciosa calda de chocolate que deixa cada pedaço ainda mais úmido e irresistível. Uma fatia generosa, perfeita para acompanhar seu café e tornar sua pausa ainda mais especial!",
    preco: 17.99, categoria: "bolos", img: "bolo-fatia-calda.jpg", tags: [], destaque: true,
  },
  {
    id: "fatia-caseiro-chocolate",
    nome: "Fatia de Bolo Caseiro de Chocolate",
    desc: "Bolo fofinho, macio e com sabor intenso de chocolate. Uma fatia generosa, perfeita para acompanhar seu café e tornar sua pausa ainda mais especial!",
    preco: 14.99, categoria: "bolos", img: "bolo-fatia-escura.jpg", tags: [],
  },
  {
    id: "fatia-caseiro-laranja",
    nome: "Fatia de Bolo Caseiro de Laranja",
    desc: "Bolo fofinho, macio e com sabor de laranja. Uma fatia generosa, perfeita para acompanhar seu café e tornar sua pausa ainda mais especial!",
    preco: 14.99, categoria: "bolos", img: "", tags: [],
  },
  {
    id: "combo-doces-gourmet",
    nome: "Combo Doces Gourmet — 4 unidades",
    desc: "04 delícias preparadas com ingredientes selecionados, textura cremosa e combinações irresistíveis. Perfeitos para adoçar sua pausa e tornar o momento ainda mais especial.",
    preco: 25.99, categoria: "bolos", img: "", tags: [],
  },

  // ---------- Bebidas ----------
  {
    id: "suco-laranja",
    nome: "Suco de Laranja Natural",
    desc: "Suco preparado com laranjas frescas, servido em taça e bem geladinho. Naturalmente saboroso e refrescante!",
    preco: 14.99, categoria: "bebidas", img: "", tags: [],
  },
  {
    id: "agua-sem-gas",
    nome: "Água Mineral sem Gás — 500 ml",
    desc: "Água mineral pura e refrescante, servida bem gelada para acompanhar seus melhores momentos.",
    preco: 5.79, categoria: "bebidas", img: "", tags: [],
  },
  {
    id: "agua-com-gas",
    nome: "Água Mineral com Gás — 500 ml",
    desc: "Água mineral gaseificada, servida bem gelada, com borbulhas refrescantes para tornar sua pausa ainda mais agradável.",
    preco: 6.79, categoria: "bebidas", img: "", tags: [],
  },
  {
    id: "coca-cola",
    nome: "Coca-Cola — 350 ml",
    desc: "Servida bem gelada.",
    preco: 9, categoria: "bebidas", img: "", tags: [],
  },
  {
    id: "coca-cola-zero",
    nome: "Coca-Cola Zero — 350 ml",
    desc: "Servida bem gelada.",
    preco: 9, categoria: "bebidas", img: "", tags: [],
  },
  {
    id: "guarana",
    nome: "Guaraná Antarctica — 350 ml",
    desc: "Servido bem gelado.",
    preco: 9, categoria: "bebidas", img: "", tags: [],
  },
  {
    id: "guarana-zero",
    nome: "Guaraná Antarctica Zero — 350 ml",
    desc: "Servido bem gelado.",
    preco: 9, categoria: "bebidas", img: "", tags: [],
  },
  {
    id: "sprite",
    nome: "Sprite — 350 ml",
    desc: "Servida bem gelada.",
    preco: 9, categoria: "bebidas", img: "", tags: [],
  },
  {
    id: "schweppes-citrus",
    nome: "Schweppes Citrus — lata 350 ml",
    desc: "Bebida gaseificada com sabor cítrico refrescante, servida bem gelada.",
    preco: 9, categoria: "bebidas", img: "", tags: [],
  },
  {
    id: "h2oh-limao",
    nome: "H2OH! Limão — 500 ml",
    desc: "Bebida levemente gaseificada, com suco natural de limão e zero açúcar. Leve, refrescante e servida bem gelada.",
    preco: 9, categoria: "bebidas", img: "", tags: [],
  },
  {
    id: "h2oh-limoneto",
    nome: "H2OH! Limoneto — 500 ml",
    desc: "Bebida levemente gaseificada, com suco natural de limão e zero açúcar. Um sabor cítrico e refrescante.",
    preco: 9, categoria: "bebidas", img: "", tags: [],
  },

  // ---------- Sob encomenda (não vêm do MenuDino; levam ao formulário) ----------
  {
    id: "bolo-chocolate-inteiro",
    nome: "Bolo inteiro",
    desc: "Os bolos da casa em tamanho inteiro, decorados com frutas. Tamanhos, sabores e valores sob consulta.",
    preco: null, categoria: "encomendas", img: "bolo-decorado.jpg",
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
