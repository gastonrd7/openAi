# Challenge

## Resumen

Esta web esta deployada en Netlify, y se puede acceder desde el siguiente link:
[Challenge chat with openAI](https://65024a7e989e4d6581f2f542--jazzy-salmiakki-0f0cb0.netlify.app/)

## Tecnologia utilizada
- React
- TypeScript
- Patrón flux (react-redux): para manejo de estado global.
- Jest (test)
- reduxjs/toolkit

## Librerias utilizadas
- moment
- openai
- materialUI
- shortid

## Instalacion y ejecucion de la web localmente
Parados en la raiz del repositorio crear un archivo llamado .env
En el mail donde entrego el challenge esta la linea que se debe agregar en este archivo, como es mi privateKey me puede bloquear por politicas de uso openAI
```REACT_APP_OPENAI_API_KEY={la key privada esta en el mail donde entrego el challenge}```

```
npm install
```
```
npm start
```
Frontend local: [http://localhost:3000](http://localhost:3000)

Para correr los test ejecutar el siguiente comando (genere test de utils a modo de ejemplo ya que llevan mucho tiempo):
```
npm run test
```

Dejo el link del challenge por practicidad: https://github.com/renaissai/renaiss-test-frontend

### Notas a tener en cuenta a la hora de evaluar el challenge
- La estrategia aplicada fue poder terminar el MVP del challenge, y luego ir refinando cada una de las partes que lo componen.
- Debo aclarar que no soy un experto en css, mi estrategia fue componentizar la web y luego modularizar la lógica, omiti hacerla responsive para mobile, y también pixel perfect, ya que ponía en riesgo el poder llegar con todo el desarrollo.
- Lo boton "Atras" del header, el buscador que está en la parte superior izquierda, y el icono "varita mágica" que está al lado del boton submit del insertar Prompt no desarrolle su lógica ni los dibuje ya que no sabia cual eran su funcionalidad.
- La ruedita de configuración para cambiar el Modelo con el que se debe interactuar con openAI no fue desarrollada so lógica por falta de tiempo.
- Como todo MVP, todo está sujeto a mejora, pero la idea es poder expresar el conocimiento y no pude detenerme en implementaciones fáciles pero tediosas, como el pixel perfect o suponer e imaginar algunos botones que no tenían una clara definición su comportamiento, por ese motivo los test no están completos para todo el repositorio ya que su implementación no es compleja pero requiere de tiempo, cosa que fue un desafío lograr hacer este MPV con mi trabajo en paralelo. 
