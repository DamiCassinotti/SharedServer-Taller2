# Shared Server - Taller2
[![Build Status](https://travis-ci.com/DamiCassinotti/SharedServer-Taller2.svg?branch=master)](https://travis-ci.com/DamiCassinotti/SharedServer-Taller2)
[![Coverage Status](https://coveralls.io/repos/github/DamiCassinotti/SharedServer-Taller2/badge.svg?branch=master)](https://coveralls.io/github/DamiCassinotti/SharedServer-Taller2?branch=master)

![](https://miro.medium.com/max/730/1*d2zLEjERsrs1Rzk_95QU9A.png)
![](https://www.vectorlogo.zone/logos/postgresql/postgresql-card.png)

# Shared Server
Servidor auxiliar para el sistema CompraMeli.

#### Documentación
**[Definición de la API](https://github.com/DamiCassinotti/SharedServer-Taller2/blob/master/api/documentacion.yaml)**

**[Definición de arquitectura / Diseño de la aplicación](https://github.com/DamiCassinotti/SharedServer-Taller2/blob/27bc1b6db50b1f33213323b33ec65012744f2174/docs/tp.pdf)**


## Instalación
Para poder instalar el servidor, primero debemos instalar Node. Una vez realizado, instalamos las dependencias del proyecto con el comando:

```
$ npm install
```
## Base de datos
Si se requiere utilizar una base de datos local, se deben ejecutar los archivos sql que se encuentran en el directorio db/scripts

## Inicilización
Para inicializar el servidor de forma local se debe utilizar el siguiente comando:
```
$ npm start
```

## Docker
En el repositorio se encuentra la configuración para la configuración de los entornos de ejecución.
El mismo se encuentra definido en docker-compose.yml.

Para configurar e inicializar la aplicación, primero se debe contar con el archivo docker-compose.xml y el directorio db, sin necesidad de contar con el resto de los archivos que conforman la aplicación. Luego, correr los siguientes comandos:
```
$ sudo docker-compose pull
$ sudo docker-compose up -d
```


## Configuración
La configuración se encuentra en el archivo config.json.
```
{
	"database": {
		"default": "postgres://damian:password@localhost:5432/damian",
		"testing": "postgres://damian:password@localhost:5432/shared_server_test"
	},
	"version": 1.0,
	"tokens": {
		"secret": "shhhh its a secret",
		"expiresIn": 1800
	}
}
```

## Organización de directorios

```
  config.json: contiene la configuración de la aplicación.
  app.js: main file
  server.js: archivo que representa la configuración e inicialización del server.
  /api: Contiene las clases necesarias para el funcionamiento de la aplicación
    /controllers: contiene las clases responsables de comsumir el modelo de datos
    /routes: contiene las clases que contiene las rutas de la aplicación (routing)
	/services: contiene las clases que consumen la base de datos
  /test: contiene los tests de la aplicación.
```

## Autenticación
Para la autenticación se utiliza express-jwt https://github.com/auth0/express-jwt

## Test
Para el desarrollo de los test unitarios se utilizan las siguientes herramientas:
 * [supertest](https://github.com/visionmedia/supertest): herramienta para realizar test sobre servicios de express
 * [mocha](https://mochajs.org/): herramienta para la ejecución de test unitarios
 * [sinon](https://sinonjs.org/): herramienta para generar mocks sobre clases, funciones y métodos.

Para ejecutar los test:
```
$ npm test
```
