
## Prueba técnica para 3D Digital Venue

## Notas

**Sé** que la clave privada esta pusheada al repo; es sólo una prueba técnica

### Problemas encontrados

Nada más empezar problema al iniciar el docker-compose el proceso mysql llega a 11 GB de memoria, llenando la memoria i el pc se bloqueaba. Sucesivos intentos hacian lo mismo, asi que se ha tenido que [Subir de MySql a latest (8.x)](https://stackoverflow.com/questions/52815608/er-not-supported-auth-mode-client-does-not-support-authentication-protocol-requ) y ha funcionado. Otros cambios hechos a la plantilla inicial

- Algunos cambios a la dockerfile, añadiendo `npx` delante de comandos
- Debido a la subida a MySql 8 he tenido que cambiar el package [mysql](https://www.npmjs.com/package/mysql) al [mysql2](https://www.npmjs.com/package/mysql2) para que funcione la conexión
- Downgrade en la versión de argon2 a la 0.26.2 porque habia un [crash](https://stackoverflow.com/questions/42482817/node-js-argon2-password-hash-crashes-app-after-reaching-100-of-cpu) en la versión que venia en el package.json y en la latest. En un entorno real hubiera cambiado de lib porque las libs de crypto no deben estar desactualizadas, pero aqui da igual.
