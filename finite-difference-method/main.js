const n=20;

let y = [n+1], a = [n+1], b = [n+1], c = [n+1], F = [n+1], L = [n+1], K = [n+1];
let x0 = 0, xn = 1, h = (xn - x0)/n, a0 = 1, a1 = 0, b0 = 0, b1 = 1, A = 0, B = 0;
const p = (x) => -(1 + 3* Math.pow(x, 2));

const q = (x) => 2 * x;

const r = (x) => 1;

const f = (x) => 2 * Math.sin(x);

let x;
let n1 = 2 * n;
b[0] = a0-a1/h;
c[0] = a1/h;
F[0] = A;

for(let i=1; i<n; i++){
    x = x0 + i * h;
    a[i] = p(x)/Math.pow(h,2) - q(x)/(2*h);
    b[i] = -2*p(x)/Math.pow(h,2) + r(x);
    c[i] = p(x)/Math.pow(h,2)+q(x)/(2*h);
    F[i] = f(x);
}

a[n] = -b1/h;
b[n] = b0+b1/h;
F[n] = B;

L[0] = -c[0]/b[0];
K[0] = F[0]/b[0];

for(let j=1; j<n; j++){
    L[j] = - c[j] / (b[j] + a[j] * L[j-1]);
    K[j] = (F[j] - a[j] * K[j-1])/(b[j] + a[j] * L[j-1])
}
y[n] = (F[n] - a[n] * K[n-1])/(b[n] + a[n] * L[n-1]);

for(let j=n-1; j>=0; j--){
    y[j] = L[j] * y[j+1] + K[j];
}

for(let i=0; i<=n; i++) {
    console.log("x= ", i*h, "    y= ", y[i]);
}






