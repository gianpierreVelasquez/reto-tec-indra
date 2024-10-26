# RETO INDRA FRONT-END
El reto constituye en crear un CRUD de un producto utilizando angular, siguiendo buenas practicas e implementando unit testing

## Tabla de Contenidos
- [Tecnología](#tecnología)
- [Instalación](#instalación)
- [Uso](#uso)

## Tecnología

El stack tecnologia usado para el BackEnd:
    - Nodejs (Express)
    - PrismaDB

El stack tecnologia usado para el FrontEnd:
    - Angular v16
    - Angular Material

## Instalación

Instrucciones paso a paso sobre cómo instalar y configurar el proyecto.

Se ha hecho uso de NVM (gestor de versiones Node)
para descargar el gestor a traves del siguiente enlace
```bash
# URL Repo
https://github.com/coreybutler/nvm-windows/releases
```

para hacer uso de Node 20.16.0 ejecutar los siguiente comandos los cuales permitiran instalar 
la version correspondiente de Node y posteriormente usarlo.
Por ultimo si deseas comprobar la version ejecuta el tercer comando
```bash
    nvm install 20.16.0 
    nvm use 20.16.0 
    node -v
```

Para clonar el repo a traves del siguiente comando

```bash
# Clona el repositorio
git clone https://github.com/gianpierreVelasquez/reto-tec-indra.git

```

## Uso
Para levantar el proyecto de backend 

```bash
# Navega al directorio del proyecto BackEnd
cd indra-be
yarn install
yarn start:dev
```

Para levantar el proyecto de frontend 

```bash
# Navega al directorio del proyecto BackEnd
cd indra-fe
yarn install
yarn start
```

Scripts adicionales del frontEnd

```bash
# Navega al directorio del proyecto BackEnd
yarn lint           ---> Verificación de codigo
yarn test           ---> Ejecución de pruebas
yarn test:coverage  ---> Porcentaje de pruebas cubiertas (+ 80%) 
yarn build          ---> Construccion de bundle del proyecto
```


