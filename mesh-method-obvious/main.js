const f = x => 2*x*(1-x);
const F = (x, t) => 0;
const fi = t => 0;
const psi = t => 0;

const n = 40;
let X0 = 0, X1 = 1, v = [n+1], u = [n+1], x, t = 0, h = 1.0/n, d = 0.5, tay = d*Math.pow(h, 2), T = 0.5, j = 0;

for(let i=0; i<=n; i++){
    x = X0+i*h;
    v[i] = f(x);
    console.log("v[" + i + "] =", v[i], "x =", x);
}

console.log("tay =", tay);

while((t<T) && (j<15)){
    j++;
    t += tay;

    for(let i=1; i<n; i++){
        u[i] = (1-2*d)*v[i]+d*(v[i-1] + v[i+1]) + tay*F(X0+i*h, t);
    }

    u[0] = fi(t);
    u[n] = psi(t);

    for(let i=0; i<=n; i++){
        v[i]=u[i];
    }
}

for(let i=0; i<=n; i++){
    console.log("u[" + i + "] =", u[i])
}

