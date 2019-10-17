let matrixArray = (rows, columns) => {
    let arr = [];
    for(let i=0; i<rows; i++){
        arr[i] = [];
        for(let j=0; j<columns; j++){
            arr[i][j] = null;//вместо i+j+1 пишем любой наполнитель. В простейшем случае - null
        }
    }
    return arr;
};
const f = (x, y) => 2*y*(1-x);
const fi1 = x => 0;
const psi1 = y => y*(1-y);
const fi2 = x => Math.pow(x, 2);
const psi2 = y => y;

const n = 5;
let X0 = 0, X1 = 1, Y0 = 0, Y1 = 1, norma = 1, e = 1e-4, h = 1.0/n;

let v = matrixArray(n+1, n+1), u = matrixArray(n+1, n+1) ;

for(let k=0;k<=n;k++){
    v[0][k]=fi2(X0+k*h);//x*x
    v[n][k]=fi1(Y0+k*h);// 0
    v[n-k][0]=psi1(X0+k*h);// y*(1-y)
    v[n-k][n]=psi2(Y0+k*h); //y
}

for(let i=1;i<n;i++) {
    for (let j = 1; j < n; j++) {
        v[i][j] = 0.5;
    }
}

console.log("v[i][j]");
for(let i=0;i<=n;i++) {
    for(let j=0;j<=n;j++) {
        console.log(v[i][j]);
    }
    console.log("------------")
}
for(let i=0;i<=n;i++) {
    for(let j=0;j<=n;j++) {
        u[i][j] = v[i][j];
    }
}

let k=0;
while(norma > e){
    k++;
    for(let i=1;i<n;i++) {//По методу Либмана
    for(let j=1;j<n;j++) {
            u[i][j] = (u[i + 1][j] + u[i - 1][j] + u[i][j + 1] + u[i][j - 1] - h * h * f(X0 + i * h, Y0 + j * h)) / 4;
        }
    }
    //Вычисление нормы разности текущего и предыдущего решений
    norma=Math.abs(u[0][0]-v[0][0]);

    for(let i=0;i<=n;i++) {
        for(let j=0;j<=n;j++) {
            if (Math.abs(u[i][j] - v[i][j]) > norma) {
                norma = Math.abs(u[i][j] - v[i][j]);
            }
        }
    }
    //Текущее решение становится предыдущим
    for(let i=0;i<=n;i++){
        for(let j=0;j<=n;j++){
            v[i][j] = u[i][j];
        }
    }
}

console.log("===========");
console.log("u[i][j]");
for(let i=0;i<=n;i++){
    for(let j=0;j<=n;j++){
        console.log(u[i][j]);
    }
    console.log("------------")
}

console.log("===========");
console.log(k);