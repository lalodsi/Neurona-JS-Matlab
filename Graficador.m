clc;
clear all;
close all;

%% Leer el archivo de texto y separar sus datos

% Formato de los datos de entrada [epoca peso1 peso2 error]

File_Error = fopen('Datos.txt','r');
formatSpec = '%d %f %f %f';
sizeA = [4, Inf];
A = fscanf(File_Error, formatSpec, sizeA);
epocas = A(1,:);
pesos = A([2,3], :);
error = A(4, :);
%plot(A)

%% Graficar la información
% Epoca vs Error
figure(1)
plot(epocas, error, 'linewidth', 2)
title('Gráfica del Error')
xlabel('Época')
ylabel('Error')

% Epoca vs pesos
figure(2)
plot(epocas, pesos, 'linewidth', 2)
title('Gráfica de los pesos')
legend('peso 1', 'peso 2')
xlabel('Época')
ylabel('Pesos')
%% Cerrar el archivo
fclose(File_Error);