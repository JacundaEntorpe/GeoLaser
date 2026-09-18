/* ============================================================
   GeoLaser — configuração compartilhada
   Carregado por dev/painel.html e dev/calibracao.html ANTES do script da página.
   Alterar aqui vale para o site inteiro.
   ============================================================ */

// ---------- FIREBASE (projeto: geolaser) ----------
const firebaseConfig = {
    apiKey: "AIzaSyCKJf9qc_QdDnqiIjtgXyLk4M-N95DmG7w",
    authDomain: "geolaser.firebaseapp.com",
    databaseURL: "https://geolaser-default-rtdb.firebaseio.com",
    projectId: "geolaser",
    storageBucket: "geolaser.firebasestorage.app",
    messagingSenderId: "430011452547",
    appId: "1:430011452547:web:5a6f4b1b7b0a80ddbc1fb6"
};

// ---------- MAPAS DISPONÍVEIS ----------
// Cada mapa físico que pode ser montado na máquina tem seu próprio registro.
// Calibração e pontos salvos ficam separados por mapa no Firebase, em
// maquina/mapas/<id>/, porque trocar o mapa da parede invalida a calibração
// anterior mas não deve apagá-la — você volta o mapa antigo e ela ainda vale.
//
// As malhas são as oficiais do IBGE, baixadas para public/malhas/ para não
// depender da API deles no momento da apresentação. O caminho é absoluto
// (barra inicial) porque as páginas que fazem o fetch vivem em /dev/ — um
// caminho relativo procuraria em /dev/malhas/ e daria 404.
//
// `viewbox` limita a busca externa (Nominatim) à região do mapa que está
// montado na máquina, no formato que ele exige: oeste, norte, leste, sul.
// Sem esse cerco, buscar "Catedral" traria uma catedral de outro estado —
// um lugar para o qual a máquina não teria como apontar.
//
// `curto` é o rótulo do seletor de mapa, que fica num botão estreito.
// `contextoBusca` é a cauda que vai junto na segunda tentativa de busca
// externa: procurar "Rua Balduíno Taques" sozinho no Nominatim devolve ruas
// de todo o Brasil, e com ", Ponta Grossa, Paraná" devolve a certa.
// `buscaPlaceholder` é o texto do campo — dizer "de Ponta Grossa" num mapa do
// estado faz o visitante achar que não pode procurar Curitiba.
const MAPAS = {
    'ponta-grossa': {
        nome: 'Ponta Grossa / PR',
        curto: 'Ponta Grossa',
        malha: '/malhas/ponta-grossa.geojson',
        centro: [-25.1392, -50.0692],
        zoom: 10,
        viewbox: [-50.4587, -24.8909, -49.6797, -25.3874],
        contextoBusca: 'Ponta Grossa, Paraná',
        buscaPlaceholder: 'Buscar um lugar ou rua de Ponta Grossa…',
        referencias: [
            { nome: 'Catedral Sant\'Ana (centro)', lat: -25.098206, lon: -50.158952 },
            { nome: 'Parque Estadual de Vila Velha', lat: -25.226822, lon: -49.987054 },
            { nome: 'Represa dos Alagados', lat: -25.014901, lon: -50.033788 }
        ]
    },
    'parana': {
        nome: 'Paraná (estado)',
        curto: 'Paraná',
        malha: '/malhas/parana.geojson',
        centro: [-24.6167, -51.3217],
        zoom: 7,
        viewbox: [-54.6200, -22.5164, -48.0231, -26.7166],
        contextoBusca: 'Paraná',
        buscaPlaceholder: 'Buscar uma cidade ou lugar do Paraná…',
        referencias: [
            { nome: 'Curitiba', lat: -25.429722, lon: -49.271944 },
            { nome: 'Foz do Iguaçu', lat: -25.540000, lon: -54.587500 },
            { nome: 'Londrina', lat: -23.310000, lon: -51.162778 }
        ]
    }
};
const MAPA_PADRAO = 'ponta-grossa';

// `referencias` são sugestões de ponto para calibrar, e a escolha delas não é
// arbitrária: a qualidade da calibração depende de os três pontos formarem um
// triângulo GRANDE. Dois pontos próximos fazem a escala ser deduzida de uma
// medida curta, e aí cada passo de erro na mira vira dezenas de passos de erro
// na outra ponta da mesa — foi assim que um destino virou Y=192780.
//   - Ponta Grossa: centro (norte), Vila Velha (sul), Alagados (noroeste);
//   - Paraná: Curitiba (leste), Foz (oeste, quase na mesma latitude — é o que
//     fixa a escala de X) e Londrina (norte, que fixa a de Y).
// São sugestões: o que vale é o ponto que dá para identificar no mapa de papel
// que está montado. Se o mapa impresso não mostra Vila Velha, use outro.

// Caminho raiz de tudo que pertence a um mapa específico.
function caminhoMapa(idMapa) {
    return 'maquina/mapas/' + (idMapa || MAPA_PADRAO);
}

// Catálogo de lugares do mapa. Antes de existir mais de um mapa os lugares
// moravam num nó só, maquina/lugares, e aquele nó É o catálogo de Ponta
// Grossa — foi com ele que a máquina rodou. As telas leem o caminho novo e
// caem no antigo quando ele está vazio, para o que já está no banco não
// sumir da tela enquanto ninguém migra.
function caminhoLugares(idMapa) {
    return caminhoMapa(idMapa) + '/lugares';
}
const CAMINHO_LUGARES_ANTIGO = 'maquina/lugares';

function ehMapaAntigo(idMapa) {
    return (idMapa || MAPA_PADRAO) === 'ponta-grossa';
}

// Semente do mapa, para quando o Firebase ainda não tem nada. Os arquivos
// lugares.js e lugares-parana.js se registram em CATALOGOS.
//
// A passada de deduplicação não é enfeite: a primeira versão do catálogo do
// Paraná tinha 100 LINHAS de município que eram 13 cidades repetidas, porque a
// consulta ao Wikidata trouxe uma linha por censo e ninguém agrupou. O banco
// esconde o erro (id repetido vira uma chave só) mas a semente não, e a tela
// pública mostrou São José dos Pinhais vinte vezes seguidas. Sai caro de ver e
// é barato de evitar aqui, no único ponto por onde toda semente passa.
function sementeDoMapa(idMapa) {
    const c = (typeof CATALOGOS !== 'undefined' && CATALOGOS) || {};
    const lista = c[idMapa] || c[MAPA_PADRAO] || [];

    const vistos = {};
    const unicos = [];
    let repetidos = 0;
    for (let i = 0; i < lista.length; i++) {
        const l = lista[i];
        if (!l || !l.id) continue;
        if (vistos[l.id]) { repetidos++; continue; }
        vistos[l.id] = true;
        unicos.push(l);
    }
    if (repetidos) {
        console.warn('Semente de "' + idMapa + '" tem ' + repetidos +
                     ' lugares com id repetido; foram descartados.');
    }
    return unicos;
}

// ---------- LIMITES FÍSICOS DA MESA (em passos) ----------
// Fonte única da verdade: o mapa, o D-pad, o clique e a calibração
// leem daqui. Se o curso real da máquina mudar, mude só estas duas linhas.
const PASSOS_MAX_X = 1160;
const PASSOS_MAX_Y = 1160;

// ---------- ORIENTAÇÃO DO DESENHO NO MAPA ----------
// Com a máquina zerada (0,0) o laser fica no canto INFERIOR ESQUERDO da mesa
// real. Traduzindo para a tela:
//   X cresce da esquerda para a direita  -> NÃO inverte
//   Y cresce de baixo para cima, mas em CSS "top" cresce para baixo -> inverte
//
// O desenho da bolinha e a leitura do clique leem estas mesmas constantes.
// Se forem diferentes entre si, clicar no mapa manda o laser para o espelho
// do ponto clicado — foi exatamente esse o bug do X.
const INVERTER_X = false;
const INVERTER_Y = true;

// Converte passos do motor para posição percentual dentro do radar.
// Fonte única: a bolinha do laser e o contorno projetado do mapa passam os dois
// por aqui. Ter duas cópias desta conta já causou o bug do eixo X espelhado.
function passosParaPercent(px, py) {
    let x = (px / PASSOS_MAX_X) * 100;
    let y = (py / PASSOS_MAX_Y) * 100;
    if (INVERTER_X) x = 100 - x;
    if (INVERTER_Y) y = 100 - y;
    return { x: x, y: y };
}

// Faz o desenho do mapa ter a mesma proporção da mesa, para que um
// deslocamento igual em X e em Y apareça igual na tela.
document.documentElement.style.setProperty(
    '--proporcao-mesa', PASSOS_MAX_X + ' / ' + PASSOS_MAX_Y
);
