window.onload = function () {

    let n = 10, y = [n + 1], z = [n + 1];

    let html1 = '<table class="mainTable">';
    html1 += '<tr style="background: bisque; text-align: center;"><td>v1</td>' +
        '<td>v2</td><td>r1</td><td>r2</td></tr>';

    let html2 = '<table class="mainTable">';
    html2 += '<tr style="background: bisque; text-align: center;"><td>yb</td>' +
        '<td>yn</td><td>r</td><td>y</td></tr>';

    let html3 = '<table class="mainTable">';
    html3 += '<tr style="background: bisque; text-align: center;"><td>x</td>' +
    '<td>y</td></tr>';

    const func1 = (x, y, z) => z;

    const func2 = (x, y, z) => -0.98 * Math.sin(y);

    const RK = (x, y, z, h) => {
        let k1 = h * func1(x, y, z);
        let l1 = h * func2(x, y, z);
        let k2 = h * func1(x + (h / 2), y + (k1 / 2), z + (l1 / 2));
        let l2 = h * func2(x + (h / 2), y + (k1 / 2), z + (l1 / 2));
        let k3 = h * func1(x + (h / 2), y + (k2 / 2), z + (l2 / 2));
        let l3 = h * func2(x + (h / 2), y + (k2 / 2), z + (l2 / 2));
        let k4 = h * func1(x + h, y + k3, z + l3);
        let l4 = h * func1(x + h, y + k3, z + l3);

        window.dy = (k1 + 2 * k2 + 2 * k3 + k4) / 6;
        window.dz = (l1 + 2 * l2 + 2 * l3 + l4) / 6;
    };

    let ya = 0, yb = Math.PI / 2;
    let a = 0, b = 1, h = (b - a) / n;

    y[0] = ya;
    let k = 0, r = 1, x = a, v1 = 0, v2 = 0;
    let r1 = -yb, r2;

    while (r > 0) {
        v1 = v2;
        v2 = v2 + 0.5;
        z[0] = v2;
        for (let i = 1; i <= n; i++) {
            RK(x, y[i - 1], z[i - 1], h);
            y[i] = y[i - 1] + dy;
            z[i] = z[i - 1] + dz;
            x += h;
        }
        r2 = y[n] - yb;
        r = r1 * r2;
        html1 += '<td>'+v1+'</td><td>'+v2+'</td><td>'+r1+'</td><td>'+r2+'</td></tr>';
        document.getElementById('table-container-1').innerHTML=html1;
        r1 = r2;
    }

    r = 1;

    while (Math.abs(r) > 1e-4) {
        let v = (v1 + v2) / 2;
        k++;
        z[0] = v;

        for (let i = 1; i <= n; i++) {
            RK(x, y[i - 1], z[i - 1], h);
            y[i] = y[i - 1] + dy;
            z[i] = z[i - 1] + dz;
            x += h;
        }

        r = y[n] - yb;

        html2 += '<td>'+yb+'</td><td>'+y[n]+'</td><td>'+r+'</td><td>'+v+'</td></tr>';
        document.getElementById('table-container-2').innerHTML=html2;

        if (r > 0) {
            v2 = v;
        }
        else {
            v1 = v;
        }

        for (let i = 0; i <= n; i++) {
            x = a +(i*h);
            html3 += '<td>'+x+'</td><td>'+y[i]+'</td></tr>';
            document.getElementById('table-container-3').innerHTML=html3;
        }
    }
};
