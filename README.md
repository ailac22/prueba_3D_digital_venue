
# Prueba técnica para 3D Digital Venue

La prueba consiste en realizar tanto el frontend como el backend de un login usando jwt con dos tipos de usuarios: administradores y socios. A pesar de ser una prueba de fullstack, tiene más peso el back. Está realizada con una serie de tecnologias base que venian con el template inicial:

- [Node.js](https://nodejs.org/es)
- [Express.js](https://expressjs.com/)
- [Angular](https://angular.io/)
- [Passport.js](https://www.passportjs.org/)
- [TypeORM](https://typeorm.io/)

Para su realización he tomado como punto inicial este [video de freeCodeCamp](https://www.youtube.com/watch?v=F-sFp_AvHc8) y su correspondiente [código](https://github.com/zachgoll/express-jwt-authentication-starter.git) que ya vi hace unos años, que explica como realizar un login con passport.js y conectarlo a un front angular. Además, se ha implementado un RBAC sencillo y algunos endpoints que se requerian.

He adjuntado también el [enunciado](./enunciado.md). El proyecto se divide en dos partes y cada uno tiene su propio "sub-enunciado": el de [front](./mmc-5418-technical-test-fullstack-app/README.md) y el de [back](./mmc-5418-technical-test-fullstack-api/README.md)

## API

Hay llamadas de prueba en `/src/rest`, que se pueden ejecutar con REST Client (extension ID `humao.rest-client`) de VSCode o con [rest.nvim](https://github.com/rest-nvim/rest.nvim) por ejemplo.

## Notas

- El .env esta pusheado **deliberadamente**
- En el enunciado hay ambigüedad alrededor de la palabra 'usuario' en cuanto a los roles. A pesar de esto, creo que he hecho la implementación intencionada.
- Sé que moment.js esta deprecada, pero dado que el proyecto de referencia ya la usaba, he puesto esa

### Problemas encontrados en el template

- Nada más empezar problema al iniciar el docker-compose el proceso mysql llega a 11 GB de memoria, llenando la memoria i el pc se bloqueaba. Sucesivos intentos hacian lo mismo, asi que se ha tenido que [Subir de MySql a latest (8.x)](https://stackoverflow.com/questions/42482817/node-js-argon2-password-hash-crashes-app-after-reaching-100-of-cpu) y ha funcionado. 
- Algunos cambios al package.json, añadiendo `npx` delante de comandos
- Debido a la subida a MySql 8 he tenido que cambiar el package [mysql](https://www.npmjs.com/package/mysql) al [mysql2](https://www.npmjs.com/package/mysql2) para que funcione la conexión
- Downgrade en la versión de argon2 a la 0.26.2 porque habia un [crash](https://stackoverflow.com/questions/52815608/er-not-supported-auth-mode-client-does-not-support-authentication-protocol-requ) en la versión que venia en el package.json y en la latest. En un entorno real hubiera cambiado de lib porque las libs de crypto no deben estar desactualizadas, pero aquí da igual.
- Añadidas muchas declaraciones de tipos
- No se esta usando strict: true en el tsconfig, pero eso no lo he cambiado porque aparecen demasiados errores en la plantilla
- Faltaba el handling del preflight de CORS para OPTIONS

## algunas de las dificultades encontradas

- Habia un bug en el [proyecto referencia](https://github.com/zachgoll/express-jwt-authentication-starter.git) relacionado con el `iat` del JWT que impedia la correcta expiración del token

