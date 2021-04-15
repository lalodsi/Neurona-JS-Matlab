clc;
clear all;
close all;

File_Error = fopen('Datos.txt','r');
A = fscanf(File_Error, '%f')

plot(A)


fclose(File_Error)
% fscanf()