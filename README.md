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
Para correr los test ejecutar el siguiente comando (genere test de utils a modo de ejemplo ya que llevan mucho tiempo):
```
npm run test
```
