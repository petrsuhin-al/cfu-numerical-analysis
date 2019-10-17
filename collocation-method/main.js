const n = 4;

let x = [n + 1], c = [n + 1], A = [], F = [n + 1], C = [[n + 1],[n + 2]];
console.log(A)
let p = (x) => -(1+3*x*x); 
let qq = (x) => 2;
let r = (x) => x;
let f = (x) => 1+x*x;
let u = (x, k) => Math.pow(x, k) * (1-x);
let u1 = (x, k) => (k * Math.pow(x, k-1)) - ((k+1) * Math.pow(x, k));
let u2 = (x, k) => k===1 ? -2 : (k * (k-1) * Math.pow(x, k-2)) - (k * (k+1) * Math.pow(x, k-1));

let Gauss = () => {
    let m, det;
    for(let i = 1; i <= n; i++){
        if(C[i][i] === 0){
            console.log("C[i][i] = 0, i = " + i);
        }
        for(let j = i+1; j <= n ; j++){
            m = C[j][i]/ C[i][i];
            for(let k = i; k <= n+1; k++){
                C[j][k] -= m * C[i][k]
            }
        }
    }

    det = 1;
    for(let i = 1; i <= n; i++){
        det *= C[i][i];
    }
    console.log("Det = ", det);

    for(let i = 1; i <= n; i++){
        for(let j = 1; j <= n+1; j++){
            console.log(C[i][j])
        }
    }

    c[n] = C[n][n+1]/ C[n][n];
    for(let i = n-1; i >= 1; i--){
        m = C[i][n+1];
        for(let k = i; k <= n; k++){
            m = m - C[i][k] * c[k];
        }
        C[i] = m / C[i][i];
    }

    for( let i=1; i<=n; i++){
        console.log(i, "  c=", c[i])
    }
};

let a = 0, b =1;

x[1] = 0.3;
x[2] = 0.5;
x[3] = 0.7;
x[4] = 0.9;
//x[5] = 0.9;

for(let i=0; i < n; i++){
    for(let k = 0; k < n; k++){
        A[i][k] = p(x[i]) * u2(x[i], k) + qq(x[i]) * u1(x[i], k) + r(x[i]) * u(x[i], k);
        C[i][k] = A[i][k];
    }
    F[i] = f(x[i]);
    C[i][n+1] = F[i];
}

Gauss();

for(let i = 0; i <= 10; i++){
    let y1 = 0;
    for(let k = 1; k <= n; k++){
        y1 += c[k]*u(0.1*i, k);
    }
    console.log("x = ", i*0.1, " y = ", y1)
}

//console.log(Math.pow(2, -1));