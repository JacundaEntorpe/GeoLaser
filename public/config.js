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

// ---------- LIMITES FÍSICOS DA MESA (em passos) ----------
// Fonte única da verdade: o mapa, o D-pad, o clique e a calibração
// leem daqui. Se o curso real da máquina mudar, mude só estas duas linhas.
const PASSOS_MAX_X = 1160;
const PASSOS_MAX_Y = 1160;

// Faz o desenho do mapa ter a mesma proporção da mesa, para que um
// deslocamento igual em X e em Y apareça igual na tela.
document.documentElement.style.setProperty(
    '--proporcao-mesa', PASSOS_MAX_X + ' / ' + PASSOS_MAX_Y
);
