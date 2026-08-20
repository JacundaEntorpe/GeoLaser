/* ============================================================
   GeoLaser — catálogo de lugares de Ponta Grossa
   Carregado por index.html (tela pública) e dev/lugares.html (cadastro).

   Este arquivo é a SEMENTE: a fonte viva dos lugares é o Firebase, em
   maquina/lugares. A tela /dev/lugares tem um botão que grava esta lista
   no banco quando ele está vazio. Depois disso, editar aqui não muda
   mais nada em produção — edite pelo /dev/lugares.

   Procedência dos dados (coletados em 2026-08-20, nada foi inventado):
   - coordenadas: OpenStreetMap (Overpass), recortadas pelo limite
     municipal de Ponta Grossa do IBGE — pontos de municípios vizinhos
     foram descartados porque cairiam fora do mapa físico da máquina;
   - resumos e fotos: Wikipédia em português e Wikimedia Commons;
   - onde não havia artigo, o resumo é uma descrição curta e factual
     escrita a partir do tipo do lugar no OSM.

   51 dos 84 lugares ainda estão SEM FOTO: o Commons simplesmente não
   tem imagem geolocalizada deles. Eles aparecem com um bloco ilustrado
   por categoria, e é só colar a URL de uma foto no /dev/lugares.
   ============================================================ */

// Categorias: rótulo, cor e ícone dos blocos. O ícone é o traçado de um
// <path> SVG, desenhado inline para não depender de fonte de ícones.
const CATEGORIAS = {
    natureza: { nome: 'Natureza',   cor: '#2f7d4f', icone: 'M12 3c3.5 3 5.5 6 5.5 9a5.5 5.5 0 0 1-11 0c0-3 2-6 5.5-9Z M12 12v9' },
    cidade:   { nome: 'Na cidade',  cor: '#4a7fa5', icone: 'M4 21V9l5-3v15 M14 21V4l6 3v14 M4 21h16' },
    historia: { nome: 'História',   cor: '#a3703c', icone: 'M4 20h16 M6 20V9l6-4 6 4v11 M10 20v-5h4v5' },
    cultura:  { nome: 'Cultura',    cor: '#8c5a86', icone: 'M4 5h16v11H4z M9 20h6 M12 16v4' },
    fe:       { nome: 'Fé',         cor: '#6d6a94', icone: 'M12 3v18 M8 8h8 M6 21h12' },
    ciencia:  { nome: 'Ciência',    cor: '#3f8a8a', icone: 'M9 3v6l-5 9a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-5-9V3 M9 3h6' }
};

// Ordem em que as categorias aparecem nos filtros da tela pública.
const ORDEM_CATEGORIAS = ['natureza', 'cidade', 'historia', 'cultura', 'fe', 'ciencia'];

const LUGARES_SEMENTE = [
    {
        id: "abrigo-cambiju",
        nome: "Abrigo Cambiju",
        categoria: "natureza",
        lat: -25.203204, lon: -49.947005,
        resumo: "Abrigo sob rocha usado como acampamento por grupos pré-históricos, na bacia do Quebra-Perna.",
        fotos: [],
    },
    {
        id: "arcos-da-fazenda-rivadavia",
        nome: "Arcos da Fazenda Rivadávia",
        categoria: "natureza",
        lat: -25.275187, lon: -49.970551,
        resumo: "Arcos de arenito esculpidos pela erosão, na porção sul do município.",
        fotos: [],
    },
    {
        id: "arenitos-fortaleza-pe-vila-velha",
        nome: "Arenitos Fortaleza PE Vila Velha",
        categoria: "natureza",
        lat: -25.226822, lon: -49.987054,
        resumo: "Paredões de arenito do setor Fortaleza, no Parque Estadual de Vila Velha.",
        fotos: [],
    },
    {
        id: "arenitos-pe-vila-velha",
        nome: "Arenitos PE Vila Velha",
        categoria: "natureza",
        lat: -25.253091, lon: -49.998616,
        resumo: "Conjunto de torres de arenito do Parque Estadual de Vila Velha, formadas há cerca de 340 milhões de anos, quando a região era coberta por geleiras.",
        fotos: [
            "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Parque_estadual_de_vila_velha_latitude_25%C2%B015%276.51%22S_longitude_49%C2%B059%2744.35%22O.jpg/1280px-Parque_estadual_de_vila_velha_latitude_25%C2%B015%276.51%22S_longitude_49%C2%B059%2744.35%22O.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Parque_Estadual_de_Vila_Velha_1.jpg/1280px-Parque_Estadual_de_Vila_Velha_1.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Parque_Estadual_de_Vila_Velha_6.jpg/1280px-Parque_Estadual_de_Vila_Velha_6.jpg",
        ],
    },
    {
        id: "buraco-do-padre",
        destaque: true,
        nome: "Buraco do Padre",
        categoria: "natureza",
        lat: -25.171937, lon: -49.968827,
        resumo: "A Furna do Buraco do Padre é um dos mais belos atrativos naturais do município de Ponta Grossa, região dos Campos Gerais, no estado do Paraná, Sul do Brasil.",
        fotos: [
            "https://commons.wikimedia.org/wiki/Special:FilePath/Buraco_do_Padre.jpg?width=1200",
            "https://upload.wikimedia.org/wikipedia/commons/b/b5/Buraco_do_Padre.jpg",
        ],
        fonte: "https://pt.wikipedia.org/wiki/Buraco_do_Padre",
    },
    {
        id: "cachoeira-da-capivara",
        nome: "Cachoeira da Capivara",
        categoria: "natureza",
        lat: -25.03958, lon: -50.086043,
        resumo: "Queda d'água na bacia do rio Pitangui.",
        fotos: [],
    },
    {
        id: "cachoeira-da-mariquinha",
        destaque: true,
        nome: "Cachoeira da Mariquinha",
        categoria: "natureza",
        lat: -25.202887, lon: -49.943905,
        resumo: "Queda d'água do rio Quebra-Perna, uma das mais visitadas dos Campos Gerais.",
        fotos: [],
    },
    {
        id: "cachoeira-do-perau",
        nome: "Cachoeira do Perau",
        categoria: "natureza",
        lat: -25.196966, lon: -49.874256,
        resumo: "Queda d'água encaixada em paredões de arenito, a leste do município.",
        fotos: [],
    },
    {
        id: "cachoeira-do-saltinho",
        nome: "Cachoeira do Saltinho",
        categoria: "natureza",
        lat: -25.034859, lon: -50.091118,
        resumo: "Pequena queda d'água na região do Pitangui.",
        fotos: [],
    },
    {
        id: "canyon-das-cabeceiras-do-rio-tibagi",
        nome: "Canyon das Cabeceiras do Rio Tibagi",
        categoria: "natureza",
        lat: -25.296722, lon: -49.888172,
        resumo: "Vale encaixado onde nascem as águas do rio Tibagi, um dos maiores rios do Paraná.",
        fotos: [],
    },
    {
        id: "capao-da-onca",
        nome: "Capão da Onça",
        categoria: "natureza",
        lat: -25.106791, lon: -50.023919,
        resumo: "Área de campo e capões de araucária a leste da cidade, usada como campo experimental e de pesquisa.",
        fotos: [],
    },
    {
        id: "caverna-fenda-nova",
        nome: "Caverna Fenda Nova",
        categoria: "natureza",
        lat: -25.032905, lon: -50.056454,
        resumo: "Caverna estreita e alta aberta ao longo de uma fratura do arenito.",
        fotos: [],
    },
    {
        id: "caverna-da-chamine",
        nome: "Caverna da Chaminé",
        categoria: "natureza",
        lat: -25.030827, lon: -50.058589,
        resumo: "Caverna de arenito no vale do rio São Jorge, com clarabóia natural aberta no teto.",
        fotos: [],
    },
    {
        id: "caverna-das-andorinhas",
        nome: "Caverna das Andorinhas",
        categoria: "natureza",
        lat: -25.145722, lon: -49.92577,
        resumo: "Caverna de arenito onde andorinhões fazem ninho nas paredes.",
        fotos: [],
    },
    {
        id: "caverna-do-bugio",
        nome: "Caverna do Bugio",
        categoria: "natureza",
        lat: -25.037638, lon: -50.035958,
        resumo: "Caverna de arenito na região do Pitangui.",
        fotos: [],
    },
    {
        id: "caverna-do-opiliao",
        nome: "Caverna do Opilião",
        categoria: "natureza",
        lat: -25.031987, lon: -50.058808,
        resumo: "Caverna de arenito no conjunto do Salto São Jorge, batizada pelos opiliões que vivem no escuro.",
        fotos: [],
    },
    {
        id: "dolinas-gemeas",
        nome: "Dolinas Gêmeas",
        categoria: "natureza",
        lat: -25.146931, lon: -49.955902,
        resumo: "Par de depressões circulares formadas pelo abatimento do arenito sobre cavidades subterrâneas.",
        fotos: [],
    },
    {
        id: "fenda-da-freira",
        nome: "Fenda da Freira",
        categoria: "natureza",
        lat: -25.174587, lon: -49.967362,
        resumo: "Fenda de arenito vizinha ao Buraco do Padre, aberta pela erosão ao longo de uma fratura da rocha.",
        fotos: [],
    },
    {
        id: "fenda-do-padre",
        nome: "Fenda do Padre",
        categoria: "natureza",
        lat: -25.172067, lon: -49.968697,
        resumo: "Estreita fenda de arenito que dá acesso ao anfiteatro do Buraco do Padre.",
        fotos: [
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Buraco_do_Padre_-_Ponta_Grossa_-_PR.jpg/1280px-Buraco_do_Padre_-_Ponta_Grossa_-_PR.jpg",
        ],
    },
    {
        id: "furna-grande",
        nome: "Furna Grande",
        categoria: "natureza",
        lat: -25.15657, lon: -49.960932,
        resumo: "Grande cratera de abatimento em arenito, no planalto a leste da cidade.",
        fotos: [],
    },
    {
        id: "furna-dos-andorinhoes",
        destaque: true,
        nome: "Furna dos Andorinhões",
        categoria: "natureza",
        lat: -25.223199, lon: -50.039823,
        resumo: "Cratera de abatimento com lago no fundo, em Vila Velha. O nome vem dos andorinhões que nidificam nas paredes de arenito.",
        fotos: [],
    },
    {
        id: "furna-dos-lambaris",
        nome: "Furna dos Lambaris",
        categoria: "natureza",
        lat: -25.223159, lon: -50.041281,
        resumo: "Furna de Vila Velha cujo lago abriga cardumes de lambaris, visíveis do elevador panorâmico.",
        fotos: [],
    },
    {
        id: "gruta-da-fortaleza",
        nome: "Gruta da Fortaleza",
        categoria: "natureza",
        lat: -25.226119, lon: -49.991477,
        resumo: "Gruta em meio aos arenitos do setor Fortaleza, em Vila Velha.",
        fotos: [],
    },
    {
        id: "gruta-da-inspirada",
        nome: "Gruta da Inspirada",
        categoria: "natureza",
        lat: -25.03236, lon: -50.058406,
        resumo: "Gruta de arenito no vale do rio São Jorge.",
        fotos: [],
    },
    {
        id: "lagoa-dourada",
        destaque: true,
        nome: "Lagoa Dourada",
        categoria: "natureza",
        lat: -25.240373, lon: -50.049585,
        resumo: "Lagoa circular ligada ao lençol freático, vizinha às furnas de Vila Velha. O nome vem do reflexo dourado da água no fim da tarde.",
        fotos: [],
    },
    {
        id: "lagoa-taruma",
        nome: "Lagoa Tarumã",
        categoria: "natureza",
        lat: -25.244236, lon: -50.02932,
        resumo: "Lagoa dentro do Parque Estadual de Vila Velha, cercada por mata nativa dos Campos Gerais.",
        fotos: [],
    },
    {
        id: "macico-das-toquinhas",
        nome: "Maciço das Toquinhas",
        categoria: "natureza",
        lat: -25.225479, lon: -49.949365,
        resumo: "Conjunto de paredões e torres de arenito da Escarpa Devoniana.",
        fotos: [],
    },
    {
        id: "mirante-do-parque",
        nome: "Mirante do Parque",
        categoria: "natureza",
        lat: -25.248304, lon: -49.990689,
        resumo: "Ponto de observação sobre os arenitos do Parque Estadual de Vila Velha.",
        fotos: [],
    },
    {
        id: "morro-campina",
        nome: "Morro Campina",
        categoria: "natureza",
        lat: -25.138659, lon: -49.913239,
        resumo: "Elevação de campo aberto a leste do município.",
        fotos: [],
    },
    {
        id: "morro-da-coroa",
        nome: "Morro da Coroa",
        categoria: "natureza",
        lat: -25.079646, lon: -49.977106,
        resumo: "Morro na região da Escarpa Devoniana.",
        fotos: [],
    },
    {
        id: "morro-do-bugio",
        nome: "Morro do Bugio",
        categoria: "natureza",
        lat: -25.212965, lon: -49.87195,
        resumo: "Morro na borda da Escarpa Devoniana.",
        fotos: [],
    },
    {
        id: "morro-do-sape",
        nome: "Morro do Sapé",
        categoria: "natureza",
        lat: -25.190115, lon: -49.895116,
        resumo: "Elevação de campo nativo típica dos Campos Gerais.",
        fotos: [],
    },
    {
        id: "parque-estadual-de-vila-velha",
        destaque: true,
        nome: "Parque Estadual de Vila Velha",
        categoria: "natureza",
        lat: -25.252555, lon: -50.006603,
        resumo: "O Parque Estadual de Vila Velha é um sítio geológico situado no município brasileiro de Ponta Grossa, do qual é a principal atração turística. Está localizado a vinte quilômetros ao sudeste do centro da cidade e a cem quilômetros de Curitiba, capital do estado do Paraná.",
        fotos: [
            "https://commons.wikimedia.org/wiki/Special:FilePath/Vila_Velha2.jpg?width=1200",
            "https://upload.wikimedia.org/wikipedia/commons/2/20/Vila_Velha2.jpg",
        ],
        fonte: "https://pt.wikipedia.org/wiki/Parque_Estadual_de_Vila_Velha",
    },
    {
        id: "parque-nacional-dos-campos-gerais",
        nome: "Parque Nacional dos Campos Gerais",
        categoria: "natureza",
        lat: -25.086436, lon: -49.973657,
        resumo: "O Parque Nacional  dos Campos Gerais é uma unidade de conservação brasileira, situada na região dos Campos Gerais na porção centro-leste do Estado do Paraná. O parque possui aproximadamente 21.300 hectares de área, abrangendo os municípios de Carambeí, Castro e Ponta Grossa. A gestão da unidade é feita pelo Instituto Chico Mendes de Conservação da Biodiversidade (ICMBio).",
        fotos: [
            "https://commons.wikimedia.org/wiki/Special:FilePath/Buraco_do_Padre_-_Ponta_Grossa_-_PR.jpg?width=1200",
            "https://upload.wikimedia.org/wikipedia/commons/5/5c/Buraco_do_Padre_-_Ponta_Grossa_-_PR.jpg",
        ],
        fonte: "https://pt.wikipedia.org/wiki/Parque_Nacional_dos_Campos_Gerais",
    },
    {
        id: "pedra-grande",
        nome: "Pedra Grande",
        categoria: "natureza",
        lat: -25.142326, lon: -49.896749,
        resumo: "Afloramento de arenito isolado no campo, visível de longe.",
        fotos: [],
    },
    {
        id: "pedra-solitaria",
        nome: "Pedra Solitária",
        categoria: "natureza",
        lat: -25.13874, lon: -49.945026,
        resumo: "Torre de arenito isolada no meio do campo nativo.",
        fotos: [],
    },
    {
        id: "pedra-da-onda",
        nome: "Pedra da Onda",
        categoria: "natureza",
        lat: -25.161244, lon: -49.964384,
        resumo: "Rocha de arenito com camadas onduladas, desenhadas pelo vento em dunas antigas.",
        fotos: [],
    },
    {
        id: "pedra-do-favo",
        nome: "Pedra do Favo",
        categoria: "natureza",
        lat: -25.173755, lon: -49.968177,
        resumo: "Bloco de arenito com a superfície esburacada como um favo de mel, resultado da erosão diferencial da rocha.",
        fotos: [],
    },
    {
        id: "poco-encantado",
        nome: "Poço Encantado",
        categoria: "natureza",
        lat: -25.172082, lon: -49.968207,
        resumo: "Poço de água transparente formado pelo rio Quebra-Perna, junto ao Buraco do Padre.",
        fotos: [],
    },
    {
        id: "represa-dos-alagados",
        destaque: true,
        nome: "Represa dos Alagados",
        categoria: "natureza",
        lat: -25.014901, lon: -50.033788,
        resumo: "Represa dos Alagados, situada no sul do Paraná, no Brasil, é uma barragem artificial formada sobre o rio Pitangui, entre a foz do Rio Jutuva e a foz do rio São Jorge. A área da represa se estende pelos municípios de Ponta Grossa, Carambeí e Castro.",
        fotos: [
            "https://commons.wikimedia.org/wiki/Special:FilePath/Represa_dos_Alagados.JPG?width=1200",
            "https://upload.wikimedia.org/wikipedia/commons/7/72/Represa_dos_Alagados.JPG",
        ],
        fonte: "https://pt.wikipedia.org/wiki/Represa_dos_Alagados",
    },
    {
        id: "salto-sao-jorge",
        destaque: true,
        nome: "Salto São Jorge",
        categoria: "natureza",
        lat: -25.033471, lon: -50.057272,
        resumo: "Queda do rio São Jorge, um dos afluentes que descem a Escarpa Devoniana ao norte de Ponta Grossa.",
        fotos: [],
    },
    {
        id: "sumidouro-abrigo-quebra-perna",
        nome: "Sumidouro (Abrigo Quebra-Perna)",
        categoria: "natureza",
        lat: -25.206385, lon: -49.971454,
        resumo: "Ponto onde o rio Quebra-Perna some sob a rocha, típico do relevo em arenito da Escarpa Devoniana.",
        fotos: [],
    },
    {
        id: "taca-pe-vila-velha",
        nome: "Taça PE Vila Velha",
        categoria: "natureza",
        lat: -25.252952, lon: -49.997231,
        resumo: "O arenito mais fotografado de Vila Velha: uma torre de rocha esculpida pelo vento e pela chuva ao longo de milhões de anos, com a base mais estreita que o topo.",
        fotos: [
            "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Parque_estadual_de_vila_velha_latitude_25%C2%B015%276.51%22S_longitude_49%C2%B059%2744.35%22O.jpg/1280px-Parque_estadual_de_vila_velha_latitude_25%C2%B015%276.51%22S_longitude_49%C2%B059%2744.35%22O.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Parque_Estadual_de_Vila_Velha_1.jpg/1280px-Parque_Estadual_de_Vila_Velha_1.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Parque_Estadual_de_Vila_Velha_6.jpg/1280px-Parque_Estadual_de_Vila_Velha_6.jpg",
        ],
    },
    {
        id: "area-de-protecao-ambiental-da-escarpa-devoniana",
        nome: "Área de Proteção Ambiental Estadual da Escarpa Devoniana",
        categoria: "natureza",
        lat: -25.09917, lon: -49.96167,
        resumo: "A APA da Escarpa Devoniana é uma Área de Proteção Ambiental localizada na porção leste do estado do Paraná. É uma das unidades de conservação que mais protege os campos gerais do Paraná, que consiste em um tipo de vegetação de espécies de campos naturais e de cerrados.",
        fotos: [
            "https://upload.wikimedia.org/wikipedia/commons/a/af/Campos_Gerais_-_PR.jpg",
        ],
        fonte: "https://pt.wikipedia.org/wiki/Área_de_Proteção_Ambiental_da_Escarpa_Devoniana",
    },
    {
        id: "estadio-germano-kruger",
        nome: "Estádio Germano Krüger",
        categoria: "cidade",
        lat: -25.116239, lon: -50.156622,
        resumo: "Estádio de futebol da cidade, casa do Operário Ferroviário.",
        fotos: [
            "https://commons.wikimedia.org/wiki/Special:FilePath/Germano_kruger.JPG?width=1200",
        ],
    },
    {
        id: "lago-de-olarias",
        nome: "Lago de Olarias",
        categoria: "cidade",
        lat: -25.11751, lon: -50.13952,
        resumo: "Lago urbano formado em antigas cavas de extração de argila, hoje área de lazer.",
        fotos: [],
    },
    {
        id: "parque-ambiental-governador-manoel-ribas",
        destaque: true,
        nome: "Parque Ambiental Governador Manoel Ribas",
        categoria: "cidade",
        lat: -25.095824, lon: -50.154328,
        resumo: "Parque urbano com lago, pista de caminhada e área de lazer, conhecido pelos moradores simplesmente como Parque Ambiental.",
        fotos: [
            "https://commons.wikimedia.org/wiki/Special:FilePath/Ponta_Grossa%2C_Brazil.jpg?width=1200",
        ],
    },
    {
        id: "parque-linear-do-arroio-madureira",
        nome: "Parque Linear do Arroio Madureira",
        categoria: "cidade",
        lat: -25.08344, lon: -50.173005,
        resumo: "Parque linear acompanhando o arroio Madureira.",
        fotos: [],
    },
    {
        id: "parque-monteiro-lobato",
        nome: "Parque Monteiro Lobato",
        categoria: "cidade",
        lat: -25.067692, lon: -50.149158,
        resumo: "Parque urbano no bairro Jardim Carvalho.",
        fotos: [],
    },
    {
        id: "parque-municipal-boca-da-ronda",
        nome: "Parque Municipal Boca da Ronda",
        categoria: "cidade",
        lat: -25.092887, lon: -50.173427,
        resumo: "Parque municipal com nascentes e mata preservada dentro da área urbana.",
        fotos: [],
    },
    {
        id: "praca-barao-de-guarauna",
        nome: "Praça Barão de Guaraúna",
        categoria: "cidade",
        lat: -25.094895, lon: -50.162678,
        resumo: "Praça no centro de Ponta Grossa.",
        fotos: [],
    },
    {
        id: "praca-barao-do-rio-branco",
        nome: "Praça Barão do Rio Branco",
        categoria: "cidade",
        lat: -25.093629, lon: -50.159947,
        resumo: "Praça central de Ponta Grossa, em frente à Catedral Sant'Ana.",
        fotos: [
            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Rio_branco_square.jpg/1280px-Rio_branco_square.jpg",
        ],
    },
    {
        id: "praca-duque-de-caxias",
        nome: "Praça Duque de Caxias",
        categoria: "cidade",
        lat: -25.091384, lon: -50.152938,
        resumo: "Praça no centro da cidade.",
        fotos: [],
    },
    {
        id: "praca-getulio-vargas",
        nome: "Praça Getúlio Vargas",
        categoria: "cidade",
        lat: -25.084941, lon: -50.177104,
        resumo: "Praça no bairro Oficinas.",
        fotos: [],
    },
    {
        id: "praca-santos-andrade",
        nome: "Praça Santos Andrade",
        categoria: "cidade",
        lat: -25.08653, lon: -50.160323,
        resumo: "Praça junto ao campus central da UEPG.",
        fotos: [],
    },
    {
        id: "praca-do-expedicionario",
        nome: "Praça do Expedicionário",
        categoria: "cidade",
        lat: -25.093941, lon: -50.165346,
        resumo: "Praça central dedicada aos soldados da Força Expedicionária Brasileira.",
        fotos: [],
    },
    {
        id: "capela-de-santa-barbara-do-pitangui",
        nome: "Capela de Santa Bárbara do Pitangui",
        categoria: "historia",
        lat: -25.042729, lon: -50.070471,
        resumo: "Capela de Santa Bárbara do Pitangui, também conhecida apenas por Capela de Santa Bárbara é um pequeno templo situado em Ponta Grossa e que por seu valor histórico e cultural foi tombada como patrimônio cultural do Paraná em 10 de outubro de 2000",
        fotos: [
            "https://commons.wikimedia.org/wiki/Special:FilePath/CapelasantabarbaraPG.jpg?width=1200",
            "https://upload.wikimedia.org/wikipedia/commons/3/3c/CapelasantabarbaraPG.jpg",
        ],
        fonte: "https://pt.wikipedia.org/wiki/Capela_de_Santa_Bárbara_do_Pitangui",
    },
    {
        id: "casa-do-divino",
        nome: "Casa do Divino",
        categoria: "historia",
        lat: -25.096891, lon: -50.157164,
        resumo: "Casa histórica tombada, ligada às festas do Divino Espírito Santo.",
        fotos: [
            "https://commons.wikimedia.org/wiki/Special:FilePath/Casa_do_Divino%2C_em_Ponta_Grossa.2.jpg?width=1200",
        ],
    },
    {
        id: "catedral-sant-ana",
        destaque: true,
        nome: "Catedral Sant'Ana",
        categoria: "historia",
        lat: -25.098206, lon: -50.158952,
        resumo: "A Catedral Sant'Ana, também conhecida como Igreja Matriz Sant'Ana, localiza-se no Centro da cidade paranaense de Ponta Grossa. A igreja é a sede da Diocese de Ponta Grossa.",
        fotos: [
            "https://commons.wikimedia.org/wiki/Special:FilePath/Catedral_de_Sant%27Ana.jpg?width=1200",
            "https://upload.wikimedia.org/wikipedia/commons/4/4a/Catedral_de_Sant%27Ana.jpg",
        ],
        fonte: "https://pt.wikipedia.org/wiki/Catedral_de_Sant'Ana_(Ponta_Grossa)",
    },
    {
        id: "cemiterio-sao-jose",
        nome: "Cemitério São José",
        categoria: "historia",
        lat: -25.090766, lon: -50.164952,
        resumo: "Cemitério histórico da cidade, com túmulos e capelas do século XIX.",
        fotos: [
            "https://commons.wikimedia.org/wiki/Special:FilePath/Portal_Cemit%C3%A9rio_S%C3%A3o_Jos%C3%A9%2C_Ponta_Grossa.jpg?width=1200",
        ],
    },
    {
        id: "colegio-estadual-regente-feijo",
        nome: "Colégio Estadual Regente Feijó",
        categoria: "historia",
        lat: -25.092878, lon: -50.159964,
        resumo: "O Colégio Estadual Regente Feijó é uma escola pública brasileira de ensino médio e técnico, localizada no município de Ponta Grossa. O colégio recebeu autorização de funcionamento em 21 de fevereiro de 1927, através do Parecer nº 11, publicado no Diário Oficial da União nº 5052, de 5 de março de 1927 e recebeu o nome em homenagem a Diogo Antônio Feijó.",
        fotos: [
            "https://commons.wikimedia.org/wiki/Special:FilePath/Col%C3%A9gio_Estadual_Regente_Feij%C3%B3_de_Ponta_Grossa.jpg?width=1200",
            "https://upload.wikimedia.org/wikipedia/commons/e/ef/Col%C3%A9gio_Estadual_Regente_Feij%C3%B3_de_Ponta_Grossa.jpg",
        ],
        fonte: "https://pt.wikipedia.org/wiki/Colégio_Estadual_Regente_Feijó",
    },
    {
        id: "estacao-arte",
        nome: "Estação Arte",
        categoria: "historia",
        lat: -25.094718, lon: -50.155767,
        resumo: "Antiga estação ferroviária convertida em espaço cultural.",
        fotos: [
            "https://commons.wikimedia.org/wiki/Special:FilePath/Esta%C3%A7%C3%A3o_Arte%2C_antigo_armaz%C3%A9m_de_cargas_de_Ponta_Grossa_02.jpg?width=1200",
        ],
    },
    {
        id: "estacao-parana",
        nome: "Estação Paraná",
        categoria: "historia",
        lat: -25.093349, lon: -50.153234,
        resumo: "A Estação Paraná foi uma estação ferroviária localizada na município brasileiro de Ponta Grossa, no estado do Paraná. A antiga estrutura é parte do complexo ferroviário, construído no final do século XIX, na rua Benjamin Constant, na região central da cidade. A edificação foi tombada como patrimônio cultural do Paraná em 1990.",
        fotos: [
            "https://commons.wikimedia.org/wiki/Special:FilePath/Esta%C3%A7%C3%A3o_Paran%C3%A1%2C_em_Ponta_Grossa_04.jpg?width=1200",
            "https://upload.wikimedia.org/wikipedia/commons/a/a6/Esta%C3%A7%C3%A3o_Paran%C3%A1%2C_em_Ponta_Grossa_04.jpg",
        ],
        fonte: "https://pt.wikipedia.org/wiki/Estação_Paraná",
    },
    {
        id: "estacao-saudade",
        destaque: true,
        nome: "Estação Saudade",
        categoria: "historia",
        lat: -25.093383, lon: -50.153261,
        resumo: "A Estação Saudade, também denominada Estação Roxo de Rodrigues (São Paulo - Rio Grande), foi uma estação ferroviária localizada na município brasileiro de Ponta Grossa, no estado do Paraná. A antiga estrutura é parte do complexo ferroviário, construído no fim do século XIX, na rua Fernandes Pinheiro, na região central da cidade.",
        fotos: [
            "https://commons.wikimedia.org/wiki/Special:FilePath/Ponta_Grossa_esta%C3%A7%C3%A3o.jpg?width=1200",
            "https://upload.wikimedia.org/wikipedia/commons/9/93/Ponta_Grossa%2C_Biblioteca_Municipal.jpg",
        ],
        fonte: "https://pt.wikipedia.org/wiki/Estação_Saudade",
    },
    {
        id: "locomotiva-maria-fumaca",
        nome: "Locomotiva Maria Fumaça",
        categoria: "historia",
        lat: -25.095597, lon: -50.155327,
        resumo: "Locomotiva a vapor preservada no centro da cidade, lembrança do tempo em que Ponta Grossa era o maior entroncamento ferroviário do sul do país.",
        fotos: [],
    },
    {
        id: "mansao-vila-hilda",
        nome: "Mansão Vila Hilda",
        categoria: "historia",
        lat: -25.091753, lon: -50.162034,
        resumo: "Casarão do início do século XX, tombado pelo patrimônio estadual, testemunho da riqueza trazida pela ferrovia.",
        fotos: [
            "https://commons.wikimedia.org/wiki/Special:FilePath/Entrada_frontal_do_monumento.jpg?width=1200",
        ],
    },
    {
        id: "memorial-ponto-azul",
        nome: "Memorial Ponto Azul",
        categoria: "historia",
        lat: -25.093973, lon: -50.159258,
        resumo: "Memorial no centro da cidade.",
        fotos: [
            "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Outro_ponto_da_rua.jpg/1280px-Outro_ponto_da_rua.jpg",
        ],
    },
    {
        id: "reservatorio-de-agua-de-ponta-grossa",
        nome: "Reservatório de Água de Ponta Grossa",
        categoria: "historia",
        lat: -25.089178, lon: -50.163439,
        resumo: "Antigo reservatório de água da cidade, tombado como patrimônio.",
        fotos: [
            "https://commons.wikimedia.org/wiki/Special:FilePath/SANEPAR_centro_ponta_grossa.jpg?width=1200",
        ],
    },
    {
        id: "sede-do-colegio-sao-luiz",
        nome: "Sede do Colégio São Luiz",
        categoria: "historia",
        lat: -25.093063, lon: -50.159126,
        resumo: "Edifício histórico do Colégio São Luiz, tombado pelo patrimônio estadual.",
        fotos: [
            "https://commons.wikimedia.org/wiki/Special:FilePath/Pr%C3%A9dio_do_Col%C3%A9gio_Estadual_Professor_Paschoal_Salles_Rosa%2C_Ponta_Grossa.jpg?width=1200",
        ],
    },
    {
        id: "biblioteca-municipal-faris-michaeli",
        nome: "Biblioteca Municipal Faris Michaeli",
        categoria: "cultura",
        lat: -25.09335, lon: -50.153234,
        resumo: "Biblioteca pública municipal de Ponta Grossa.",
        fotos: [
            "https://commons.wikimedia.org/wiki/Special:FilePath/Ponta_Grossa%2C_Biblioteca_Municipal.jpg?width=1200",
        ],
    },
    {
        id: "casa-da-memoria-parana",
        nome: "Casa da Memória Paraná",
        categoria: "cultura",
        lat: -25.095577, lon: -50.155495,
        resumo: "A Casa da Memória Paraná é um museu-memorial localizado na cidade de Ponta Grossa, no Paraná, Brasil. A instituição atua como um centro de documentação da história do município, da região dos Campos Gerais e do Paraná.",
        fotos: [
            "https://commons.wikimedia.org/wiki/Special:FilePath/Debret_em_Ponta_Grossa.jpg?width=1200",
            "https://upload.wikimedia.org/wikipedia/commons/8/80/Debret_em_Ponta_Grossa.jpg",
        ],
        fonte: "https://pt.wikipedia.org/wiki/Casa_da_Memória_Paraná",
    },
    {
        id: "centro-de-cultura-cidade-de-ponta-grossa",
        nome: "Centro de Cultura Cidade de Ponta Grossa",
        categoria: "cultura",
        lat: -25.095691, lon: -50.160299,
        resumo: "O Centro de Cultura Cidade de Ponta Grossa é um espaço cultural para exposições e produções artísticas, na cidade de Ponta Grossa, no estado do Paraná, Brasil. O centro foi criado em 28 de agosto de 1986 e inaugurado em 15 de setembro de 1988.",
        fotos: [
            "https://commons.wikimedia.org/wiki/Special:FilePath/Centro_de_cultura_pg.JPG?width=1200",
            "https://upload.wikimedia.org/wikipedia/commons/7/71/Centro_de_cultura_pg.JPG",
        ],
        fonte: "https://pt.wikipedia.org/wiki/Centro_de_Cultura_Cidade_de_Ponta_Grossa",
    },
    {
        id: "cineteatro-opera",
        destaque: true,
        nome: "Cineteatro Ópera",
        categoria: "cultura",
        lat: -25.096467, lon: -50.160101,
        resumo: "O Cineteatro Ópera é um casa de espetáculo da cidade de Ponta Grossa, no Estado do Paraná.",
        fotos: [
            "https://commons.wikimedia.org/wiki/Special:FilePath/Cineopera.JPG?width=1200",
            "https://upload.wikimedia.org/wikipedia/commons/1/1a/Cineopera.JPG",
        ],
        fonte: "https://pt.wikipedia.org/wiki/Cineteatro_Ópera",
    },
    {
        id: "museu-campos-gerais",
        destaque: true,
        nome: "Museu Campos Gerais",
        categoria: "cultura",
        lat: -25.097001, lon: -50.158594,
        resumo: "O Museu Campos Gerais (MCG) é um museu brasileiro localizado na cidade de Ponta Grossa, no estado do Paraná, sendo administrado pela Universidade Estadual de Ponta Grossa (UEPG). O museu tem como missão colaborar com a preservação do patrimônio cultural da região dos Campos Gerais, com objetivos que contribui com ações culturais, educativas e turísticas.",
        fotos: [
            "https://commons.wikimedia.org/wiki/Special:FilePath/Museu_Campos_Gerais_fachada.jpg?width=1200",
            "https://upload.wikimedia.org/wikipedia/commons/c/c1/Fachada_Museu_Campos_Gerais.jpg",
        ],
        fonte: "https://pt.wikipedia.org/wiki/Museu_Campos_Gerais",
    },
    {
        id: "museu-de-arqueologia-de-ponta-grossa",
        nome: "Museu de Arqueologia de Ponta Grossa",
        categoria: "cultura",
        lat: -25.121627, lon: -50.15377,
        resumo: "O Museu de Arqueologia, oficialmente denominado Museu de Arqueologia Ciro Flamarion Cardoso, é um museu localizado na cidade de Ponta Grossa, no Paraná, Brasil. Foi inaugurado em 2001 e seu acervo conta com objetos que representam a história, a arte e a arqueologia da antiga civilização egípcia.",
        fotos: [
            "https://commons.wikimedia.org/wiki/Special:FilePath/Jardim_do_Museu_de_Arqueologia%2C_Ponta_Grossa%2C_Paran%C3%A1.jpg?width=1200",
            "https://upload.wikimedia.org/wikipedia/commons/3/36/Jardim_do_Museu_de_Arqueologia%2C_Ponta_Grossa%2C_Paran%C3%A1.jpg",
        ],
        fonte: "https://pt.wikipedia.org/wiki/Museu_de_Arqueologia_(Ponta_Grossa)",
    },
    {
        id: "teatro-municipal-alvaro-augusto-cunha-rocha",
        nome: "Teatro Municipal Álvaro Augusto Cunha Rocha",
        categoria: "cultura",
        lat: -25.121612, lon: -50.156887,
        resumo: "O Teatro Municipal Álvaro Augusto Cunha Rocha, mais conhecido como Cine-Teatro Pax, é um teatro universitário localizado em Ponta Grossa, no estado do Paraná, Brasil.",
        fotos: [
            "https://commons.wikimedia.org/wiki/Special:FilePath/Paxantiga.jpg?width=1200",
            "https://upload.wikimedia.org/wikipedia/commons/d/d2/Paxantiga.jpg",
        ],
        fonte: "https://pt.wikipedia.org/wiki/Teatro_Municipal_Álvaro_Augusto_Cunha_Rocha",
    },
    {
        id: "convento-bom-jesus",
        nome: "Convento Bom Jesus",
        categoria: "fe",
        lat: -25.095648, lon: -50.125102,
        resumo: "Convento no bairro Uvaranas.",
        fotos: [],
    },
    {
        id: "igreja-nossa-senhora-do-rosario-ponta-grossa",
        nome: "Igreja Nossa Senhora do Rosário (Ponta Grossa)",
        categoria: "fe",
        lat: -25.092939, lon: -50.16015,
        resumo: "Igreja matriz da paróquia Nossa Senhora do Rosário.",
        fotos: [
            "https://commons.wikimedia.org/wiki/Special:FilePath/Igreja_Nossa_Senhora_do_Ros%C3%A1rio4.jpg?width=1200",
        ],
    },
    {
        id: "igreja-sagrado-coracao-de-jesus",
        nome: "Igreja Sagrado Coração de Jesus",
        categoria: "fe",
        lat: -25.094847, lon: -50.162604,
        resumo: "Igreja histórica de Ponta Grossa.",
        fotos: [
            "https://commons.wikimedia.org/wiki/Special:FilePath/Igreja_dos_Polacos%2C_Ponta_Grossa.9.jpg?width=1200",
        ],
    },
    {
        id: "igreja-de-nossa-senhora-imaculada-conceicao",
        nome: "Igreja de Nossa Senhora Imaculada Conceição",
        categoria: "fe",
        lat: -25.090183, lon: -50.148749,
        resumo: "Igreja tombada pelo patrimônio estadual.",
        fotos: [
            "https://commons.wikimedia.org/wiki/Special:FilePath/Igrejinha_de_Uvaranas%2C_Capela_de_Nossa_Senhora_Imaculada_Concei%C3%A7%C3%A3o_01.jpg?width=1200",
        ],
    },
    {
        id: "museu-de-geologia",
        nome: "Museu de Geologia",
        categoria: "ciencia",
        lat: -25.248887, lon: -49.991929,
        resumo: "Museu dentro do Parque Estadual de Vila Velha dedicado às rochas e fósseis dos Campos Gerais.",
        fotos: [],
    },
    {
        id: "sitio-fossilifero-da-fazenda-rivadavia",
        nome: "Sítio fossilífero da Fazenda Rivadávia",
        categoria: "ciencia",
        lat: -25.305931, lon: -49.989749,
        resumo: "Afloramento onde se encontram fósseis marinhos do período Devoniano, com mais de 380 milhões de anos — a prova de que a região já foi fundo de mar.",
        fotos: [],
    },
    {
        id: "utfpr-universidade-tecnologica-federal-do-parana",
        nome: "UTFPR - Universidade Tecnológica Federal do Paraná",
        categoria: "ciencia",
        lat: -25.052277, lon: -50.131062,
        resumo: "Campus de Ponta Grossa da Universidade Tecnológica Federal do Paraná.",
        fotos: [],
    },
    {
        id: "universidade-estadual-de-ponta-grossa",
        nome: "Universidade Estadual de Ponta Grossa",
        categoria: "ciencia",
        lat: -25.086711, lon: -50.16157,
        resumo: "Campus Central da UEPG, no centro da cidade — onde nasceu este projeto.",
        fotos: [],
    },
];

// ---------- BUSCA ----------
// Compara ignorando acento, caixa e pontuação: num tablet ninguém vai
// digitar "Maciço das Toquinhas" com cedilha e til.
function normalizarTexto(s) {
    return (s || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, ' ')
        .trim();
}

// Pontuação de relevância. Quanto maior, mais acima na lista.
// Prefixo do nome vale mais que trecho no meio, e nome vale mais que resumo —
// digitar "vila" tem que trazer Vila Velha antes de qualquer lugar cujo
// resumo por acaso cite "vila".
function pontuarLugar(lugar, termoNormalizado) {
    if (!termoNormalizado) return 0;
    const nome = normalizarTexto(lugar.nome);
    const resumo = normalizarTexto(lugar.resumo);

    if (nome === termoNormalizado) return 100;
    if (nome.startsWith(termoNormalizado)) return 80;

    // Começo de qualquer palavra do nome: "toquinhas" acha "Maciço das Toquinhas".
    if (new RegExp('(^| )' + termoNormalizado.replace(/ /g, '.*')).test(nome)) return 60;
    if (nome.includes(termoNormalizado)) return 40;

    // Todas as palavras do termo aparecem no nome, em qualquer ordem.
    const palavras = termoNormalizado.split(' ').filter(Boolean);
    if (palavras.length > 1 && palavras.every(p => nome.includes(p))) return 30;

    if (resumo.includes(termoNormalizado)) return 10;
    return 0;
}

// Empate entre nomes que casam igual é comum ("vila" casa com quatro lugares).
// Nesses casos o cartão-postal tem que vir primeiro: quem digita "vila" quer
// o Parque Estadual de Vila Velha, não o setor Fortaleza dele.
function pontuarComDestaque(lugar, termoNormalizado) {
    const base = pontuarLugar(lugar, termoNormalizado);
    return base > 0 && lugar.destaque ? base + 5 : base;
}

function buscarLugares(lista, termo, limite) {
    const t = normalizarTexto(termo);
    if (!t) return [];
    return lista
        .map(l => ({ lugar: l, pontos: pontuarComDestaque(l, t) }))
        .filter(r => r.pontos > 0)
        .sort((a, b) => b.pontos - a.pontos || a.lugar.nome.localeCompare(b.lugar.nome))
        .slice(0, limite || 8)
        .map(r => r.lugar);
}
