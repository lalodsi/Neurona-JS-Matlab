const fs = require('fs'),
    NOMBRE_ARCHIVO = 'Datos.txt';
    
    function error(err) {
        if (err)
        console.log('No se pudo leer el archivo');
        else{
            console.log('Datos escritos correctamente');
        }
    }
    
    let opciones = {
        encoding: "utf8",
        flag: "a+",
        mode: 0o666
    }

    fs.writeFile(NOMBRE_ARCHIVO, "", error)

let Neurona = {
    pesos: [],
    bias: null,
    alpha: .01,

    init: function (numPesos) {
        for (let i = 0; i < numPesos; i++) {
            this.pesos[i] = this.aleatorio();
        }
        this.bias = this.aleatorio()
    },
    aleatorio(){
        return Math.random() * (.5 + 0.5) - 0.5;
    },
    salida(entrada){
        let salida = 0;
        const limSup = 1;
        const limInf = -1;

        entrada.forEach( ( elemento, index) => salida += elemento * this.pesos[index] );
        salida += this.bias;
        return salida >= 0 ? limSup : limInf;
        // return salida;
    },
    entrenar(dataInput, salidaDeseada){
        do{
            var errorEpoch = 0;
            dataInput.forEach((elemento, index) => {
                let salida = this.salida(elemento);
                let error = salidaDeseada[index] - salida;
                errorEpoch += Math.abs(error);
                this.ajustePesos(error, elemento);
            });
            // console.log(errorEpoch / dataInput.length);
            fs.writeFileSync(NOMBRE_ARCHIVO, `${errorEpoch / dataInput.length}\n`, opciones, error)
        }
        while( ( errorEpoch / dataInput.length ) > 0.0001);
    },
    ajustePesos(error, currentInput){
        for (let index = 0; index < this.pesos.length; index++) {
            let ajuste = error * this.alpha * currentInput[index];
            this.pesos[index] += ajuste;
        }
        let ajuste = error * this.alpha * 1;
        this.bias += ajuste;
    }
}



//AND  pesos = [1,1] umbral = 2
// let conjuntoEntradas = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
// let salidaDeseada = [-1, -1, -1, 1];
//OR  pesos = [1,1] umbral = 2
let conjuntoEntradas = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
let salidaDeseada = [-1, 1, 1, 1];
//NOT pesos = [-1] umbral = 0
// let conjuntoEntradas = [[-1], [1]];
// let salidaDeseada = [1, -1];

Neurona.init(2)
Neurona.entrenar(conjuntoEntradas, salidaDeseada)
// console.log(`${Neurona.salida([1, 1])}`);

for (let index = 0; index < conjuntoEntradas.length; index++) {
    // fs.writeFileSync(NOMBRE_ARCHIVO,'***************************\n',opciones, error)
    // fs.writeFileSync(NOMBRE_ARCHIVO,`Entrada: ${conjuntoEntradas[index]}\n`,opciones, error)
    // fs.writeFileSync(NOMBRE_ARCHIVO,`Salida: ${Neurona.salida(conjuntoEntradas[index])}\n`,opciones, error)
    // fs.writeFileSync(NOMBRE_ARCHIVO,`Salida Esperada: ${salidaDeseada[index]}\n`,opciones, error)
}