"use strict";

window.onload = function(){

    let html = '<table class="mainTable">';
    html += '<tr style="background: bisque; text-align: center;"><td>x</td><td>y Рунге-Кутта</td><td>y точное</td><td>y Адамса-Башфорта</td><td>y Адамса-Моутона</td></tr>';

    function func(x, y){
        return -x * y;
    }

    /**
     * @return {number}
     */

    function RK(x, y, h){
        let k1 = h * func(x, y);
        let k2 = h * func(x + (h / 2), y + (k1 / 2));
        let k3 = h * func(x + (h / 2), y + (k2 / 2));
        let k4 = h * func(x + h, y + k3);

        return (k1 + 2 * k2 + 2 * k3 + k4) / 6;
    }

    let i, n = 20, a = 0, b = 2, y0 = 1;
    let x = [n + 1], yrk = [n + 1], yab = [n + 1], yam = [n + 1];
    let h = (b - a) / n;

    for(i=0; i<=n; i++){
        x[i] = a + i * h;
    }

    yrk[0] = y0;

    for(i=0; i<n; i++) {  // Метод Рунге-Кутта
        yrk[i + 1] = yrk[i] + RK(x[i], yrk[i], h);
    }

    for(i=0; i<=3; i++) {
        yab[i] = yrk[i];  // Метод Адамса-Башфорта
        yam[i] = yrk[i];  // Метод Адамса-Моутона
    }

    for(i=4; i<=n; i++) {
            yab[i] = yab[i - 1] + (h / 24) * (55 * func(x[i - 1], yab[i - 1]) - 59 * func(x[i - 2], yab[i - 2]) + 37 * func(x[i - 3], yab[i - 3]) - 9 * func(x[i - 4], yab[i - 4])); // Метод Адамса-Башфорта
            let y1 = yam[i - 1] + (h / 24) * (55 * func(x[i - 1], yam[i - 1]) - 59 * func(x[i - 2], yam[i - 2]) + 37 * func(x[i - 3], yam[i - 3]) - 9 * func(x[i - 4], yam[i - 4])); // Метод Адамса-Моутона
            yam[i] = yam[i - 1] + (h / 24) * (9 * func(x[i], y1) + 19 * func(x[i - 1], yam[i - 1]) - 5 * func(x[i - 2], yam[i - 2]) + func(x[i - 3], yam[i - 3]));
    }

    for(i=0; i<=n; i++) {
        console.log(x[i])
        let yt = Math.exp(-x[i] * x[i] / 2);
        html+='<td>'+x[i]+'</td><td>'+yrk[i]+'</td><td>'+yt+'</td><td>'+yab[i]+'</td><td>'+yam[i]+'</td></tr>';
        document.getElementById('table-container').innerHTML=html;
    }
};