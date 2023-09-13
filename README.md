# Challenge

## Resumen

Esta web esta deployada en Netlify, y se puede acceder desde el siguiente link:
[Challenge chat with openAI](https://6502414fbc538d656c9c08a2--jazzy-salmiakki-0f0cb0.netlify.app/)

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
Agregarle la siguiente linea de codigo (es mi privateKey 
```REACT_APP_OPENAI_API_KEY=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```

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
- Debo aclarar que no soy un experto en css, mi estrategia fue componentizar la web y luego modularizar la logica, omiti hacerla responsive para mobile, y tambien pixel perfect, ya que ponia en riesgo el poder llegar con todo el desarrollo.
- Lo boton "Atras" del header, el buscador que esta en la parte superior izquierda, y el icono "barita magica" que esta al lado del boton submit del isertar Prompt no desarrolle su logica ni los dibuje ya que no sabia cual eran su funcionalidad.
- LA ruedita de configuracion para cambiar el Model con el que se debe interactuar con openAI no fue desarrollada so logica por falta de tiempo.
- Como todo MVP, todo esta sujeto a mejora, pero la idea es poder expresar el conocimiento y no pude detenerme en implementaciones faciles pero tediosas, como el pixel perfect o suponer e imaginar algunos botones que no tenian una clara definiicion su comportamiento, por ese motivo los test no estan completos para todo el repositorio ya que su implementacion no es compleja pero requiere de tiempo, cosa que fue un desafio lograr hacer este MPV con mi trabajo en apralelo.
