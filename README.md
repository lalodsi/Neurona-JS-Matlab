# Neurona-JS-Matlab
Neurona programada en JavaScript (Node) y visualizada en Matlab

## ¿Cómo correr el programa?

### Requerimientos
- MATLAB 2020b
- NodeJS versión 14.15.5

(Nota: estos requerimientos son en base a lo que yo estoy utilizando para correr el proyecto, posiblemente puedas correrlo con versiones más antiguas)

### ¿Cómo Funciona?
1. Ejecuta el archivo neurona.js, lo podrás hacer con la siguiente línea de código

~~~
node ./neurona.js
~~~

2. El archivo creará una neurona, la entrenará y guardará la información de su entrenamiento en un archivo de texto que será generado en el espacio de trabajo
3. Ejecuta matlab en el espacio de trabajo para graficar los resultados, lo podrás hacer con la siguiente línea de código: 

~~~
matlab -nodesktop -nosplash -r "run Graficador.m"
~~~

Si quieres puedes automatizar la creación, entrenamiento y graficación de los resultados de la neurona creando un archivo .bat y escribiendo lo siguiente:

~~~
@echo off
    title Automatizar creación, entrenamiento y resultados de una neurona

    ::Crea la neurona y la entrena
    node ./neurona.js

    ::Grafica los resultados de su entrenamiento con matlab
    matlab -nodesktop -nosplash -r "run Graficador.m"
exit
~~~
