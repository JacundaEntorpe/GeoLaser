/* ============================================================
   GeoLaser — núcleo da calibração geográfica
   Compartilhado por index.html (converter pontos salvos) e
   botao.html (calibrar). Depende de: calib (objeto com p1/p2/p3).
   ============================================================ */

// Aproximação padrão usada só para exibir resolução em metros
const METROS_POR_GRAU_LAT = 111320;

// Tudo é expresso como uma transformação afim:
//     passosX = a*lon + b*lat + c
//     passosY = d*lon + e*lat + f
// Com 3 pontos os seis coeficientes são resolvidos de verdade, o que
// absorve rotação e cisalhamento (mapa torto em relação aos trilhos).
// Com 2 pontos usamos a mesma forma com b=0 e d=0, ou seja, assumimos
// que o mapa está alinhado. Assim a conversão tem UMA implementação só.
function calcularTransformacao() {
    const p1 = calib.p1, p2 = calib.p2, p3 = calib.p3;
    if (!p1 || !p2) return null;

    if (p3) {
        // Regra de Cramer sobre [[lon1,lat1,1],[lon2,lat2,1],[lon3,lat3,1]]
        const det = p1.lon * (p2.lat - p3.lat)
                  - p1.lat * (p2.lon - p3.lon)
                  + (p2.lon * p3.lat - p2.lat * p3.lon);

        // Determinante nulo = os três pontos estão em linha reta e não
        // definem um plano; nesse caso o terceiro não acrescenta nada.
        if (Math.abs(det) < 1e-12) return null;

        const resolver = (v1, v2, v3) => {
            const A = v1 * (p2.lat - p3.lat) - p1.lat * (v2 - v3) + (v2 * p3.lat - p2.lat * v3);
            const B = p1.lon * (v2 - v3) - v1 * (p2.lon - p3.lon) + (p2.lon * v3 - v2 * p3.lon);
            const C = p1.lon * (p2.lat * v3 - v2 * p3.lat)
                    - p1.lat * (p2.lon * v3 - v2 * p3.lon)
                    + v1 * (p2.lon * p3.lat - p2.lat * p3.lon);
            return [A / det, B / det, C / det];
        };

        const cx = resolver(p1.passosX, p2.passosX, p3.passosX);
        const cy = resolver(p1.passosY, p2.passosY, p3.passosY);
        if (Math.abs(cx[0] * cy[1] - cx[1] * cy[0]) < 1e-12) return null;

        return { tipo: 'afim', pontos: 3,
                 a: cx[0], b: cx[1], c: cx[2],
                 d: cy[0], e: cy[1], f: cy[2] };
    }

    const deltaLon = p2.lon - p1.lon;
    const deltaLat = p2.lat - p1.lat;
    if (deltaLon === 0 || deltaLat === 0) return null;

    const a = (p2.passosX - p1.passosX) / deltaLon;
    const e = (p2.passosY - p1.passosY) / deltaLat;
    return { tipo: 'linear', pontos: 2,
             a: a, b: 0, c: p1.passosX - a * p1.lon,
             d: 0, e: e, f: p1.passosY - e * p1.lat };
}

function coordParaPassos(lat, lon) {
    const t = calcularTransformacao();
    if (!t) return null;
    return {
        x: Math.round(t.a * lon + t.b * lat + t.c),
        y: Math.round(t.d * lon + t.e * lat + t.f)
    };
}

function passosParaCoord(x, y) {
    const t = calcularTransformacao();
    if (!t) return null;
    const det = t.a * t.e - t.b * t.d;
    if (Math.abs(det) < 1e-12) return null;
    const px = x - t.c, py = y - t.f;
    return {
        lon: ( t.e * px - t.b * py) / det,
        lat: (-t.d * px + t.a * py) / det
    };
}

// Traduz a matriz para números que significam algo no mundo físico.
// Trabalha em metros: 1 grau de longitude encolhe com o cosseno da
// latitude, e sem corrigir isso o ângulo medido sairia errado.
function diagnostico(t, latMedia) {
    const kLat = METROS_POR_GRAU_LAT;
    const kLon = METROS_POR_GRAU_LAT * Math.cos(latMedia * Math.PI / 180);

    // Imagem, em passos, de 1 metro para leste e de 1 metro para norte.
    const lesteX = t.a / kLon, lesteY = t.d / kLon;
    const norteX = t.b / kLat, norteY = t.e / kLat;

    const passosPorMetroLeste = Math.hypot(lesteX, lesteY);
    const passosPorMetroNorte = Math.hypot(norteX, norteY);

    // Os dois eixos da mesa deveriam ser perpendiculares. O desvio é a
    // melhor medida de qualidade que existe aqui: com 3 pontos o ajuste
    // é exato por construção, então não há resíduo para inspecionar.
    const cosAng = (lesteX * norteX + lesteY * norteY) /
                   (passosPorMetroLeste * passosPorMetroNorte);
    const anguloEixos = Math.acos(Math.max(-1, Math.min(1, cosAng))) * 180 / Math.PI;

    // Inclinação do mapa: normalizada para [-90, 90] porque eixo
    // invertido daria 180 graus e isso não é torção, é só sinal.
    let inclinacao = Math.atan2(lesteY, lesteX) * 180 / Math.PI;
    while (inclinacao >  90) inclinacao -= 180;
    while (inclinacao < -90) inclinacao += 180;

    return {
        metrosPorPassoX: 1 / passosPorMetroLeste,
        metrosPorPassoY: 1 / passosPorMetroNorte,
        anguloEixos: anguloEixos,
        desvioPerpendicular: Math.abs(90 - anguloEixos),
        inclinacao: inclinacao
    };
}
