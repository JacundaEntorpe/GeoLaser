/* ============================================================
   GeoLaser — configuração compartilhada
   Carregado por index.html e botao.html ANTES do script da página.
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
// depender da API deles no momento da apresentação.
const MAPAS = {
    'ponta-grossa': {
        nome: 'Ponta Grossa / PR',
        malha: 'malhas/ponta-grossa.geojson',
        centro: [-25.1392, -50.0692],
        zoom: 10
    },
    'parana': {
        nome: 'Paraná (estado)',
        malha: 'malhas/parana.geojson',
        centro: [-24.6167, -51.3217],
        zoom: 7
    }
};
const MAPA_PADRAO = 'ponta-grossa';

// Caminho raiz de tudo que pertence a um mapa específico.
function caminhoMapa(idMapa) {
    return 'maquina/mapas/' + (idMapa || MAPA_PADRAO);
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
