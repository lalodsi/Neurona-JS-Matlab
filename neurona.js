console.log('\t\tPrograma para entrenamiento de neurona');
console.log('Creando o abriendo archivo de texto..');
const fs = require('fs'),
    NOMBRE_ARCHIVO = 'Datos.txt';

    function error(err) {
        if (err)
        console.log('No se pudo leer el archivo');
    }

    let opciones = {
        encoding: "utf8",
        flag: "a+",
        mode: 0o666
    }

    console.log('Limpiando información...');
    fs.writeFile(NOMBRE_ARCHIVO, "", error)


let Neurona = {
    pesos: [],
    bias: null,
    alpha: .005,
    VALOR_MINIMO_DE_ERROR: 0.0001,
    informacion: '',

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
    },
    entrenar(dataInput, salidaDeseada){
        let epocas = 1;
        do{
            this.informacion +=  `${epocas}`;

            var errorEpoch = 0;
            dataInput.forEach((elemento, index) => {
                let salida = this.salida(elemento);
                let error = salidaDeseada[index] - salida;
                errorEpoch += Math.abs(error);
                this.ajustePesos(error, elemento);
            });
            this.pesos.forEach( (peso) => this.informacion += ` ${peso}`)
            this.informacion +=  ` ${errorEpoch / dataInput.length}\n`;

            epocas++;
        }
        while( ( errorEpoch / dataInput.length ) > this.VALOR_MINIMO_DE_ERROR );
        fs.writeFileSync(NOMBRE_ARCHIVO, this.informacion, opciones, error)
        this.informacion = '';
    },
    ajustePesos(error, currentInput){
        for (let index = 0; index < this.pesos.length; index++) {
            let ajuste = error * this.alpha * currentInput[index] / (Math.abs(currentInput[index])^2) ;
            this.pesos[index] += ajuste;
        }
        let ajuste = error * this.alpha * 1;
        this.bias += ajuste;
    }
}


//OR  pesos = [1,1] umbral = 2
let conjuntoEntradas = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
let salidaDeseada = [-1, 1, 1, 1];

console.log('Creando neurona...')
Neurona.init(2)
console.log('Neurona Creada')

console.log('Entrenando neurona...')
Neurona.entrenar(conjuntoEntradas, salidaDeseada)
console.log('Neurona Entrenada')
