## Descarga e instalación de NodeJS: 18

https://nodejs.org/en/download

## Descarga e instalación de Docker Desktop

https://www.docker.com/

## Descarga e instalación de Postman

https://www.postman.com/downloads/

## Descarga e instalación de MySQL Workbench

https://dev.mysql.com/downloads/workbench/

## Instalación y arranque

`docker-compose build`

`docker-compose up`

Listado de contenedores docker activos : `docker ps`

## Incluido en el docker

Imagen de Node.
Servidor MySQL

## Acceso e importación de la base de datos: MySQL Workbench

- Connection name: whatever
- Connection Method : TCP/IP
- Parameters:
  - Hostname: localhost
  - Port: 3406
  - Username: root
  - Password: toor

Una vez conectado al mysql:

1. Crear base de datos nueva llamada: mmc_technicaltest
2. Importar el fichero database.sql del repositorio en la base de datos creada.
3. No deberias necesitar modificar la estructura de la base de datos más allá de crear registros nuevos

## Incluido en el package.json

Nodemon 3

ExpressJS 4

Typescript 5

TypeORM 0.3

Passport, Passport-jwt, Passport-Local

Argon2

## Instalación de paquetes no incluidos en el repositorio

La prueba esta diseñada para que no sea necesario instalar nada a no se que quieras mplementar otra solución a la propuesta.

Si deseas instalar algún paquete extra debes saber:

La carpeta `node_modules` se vincula con el contenedor del Docker.

`docker ps` : Una vez levantado el docker, te aparecerá la base de datos y la api. Copiar id del contenedor de la API:

El paquete se debe instalar directamente en el docker y al estar vinculado con tu `node_modules` local, te aparecerá a ti también, aligual que tu package.json.

`docker exec -ti {CONTAINER_ID} npm install {package_name}`

Si apagas el docker es posible que se pierdan los paquetes nuevos instalados, si eso sucede deberás reconstruir la imagen:

- `docker-compose down`
- `docker-compose build`
- `docker-compose up`

## Descripción de la prueba

Un ataque nos ha eliminado los passwords de los socios de un club. Debemos regenerar dichos passwords, reimplementar el login y algunos métodos como el de insertar transacciones de un socio, la obtención de un socio y un método de listado de usuarios con sus transacciones y totales. Una transacción simplemente es un registro en la tabla `transactions` asociado al usuario que la efectua. Consta de un campo `amount` (cantidad a pagar) y otro `detail` (concepto de la transacción. Por ejemplo: Sector 1A, Fila 2, Asiento 7)

El repositorio tiene instalados passport como middleware de autenticación y argon2 para la encriptación y verificación de passwords. Puedes usar esos o instalar cualquier otro con el que quizás estés más familiarizado, o aplicar otra solución tanto para la autenticación JWT como para la generación de passwords.

## Listado de Endpoints a implementar:

Propósito de los 5 endpoints a implementar:

- **Login:** Haciendo uso de passport o de cualquier otro que prefieras.
- **Regeneración de passwords:** Endpoint para adminisitradores genera el password nuevo haciendo uso de argon2 o cualquier otro que prefieras.
- **Obtener lista de socios y sus totales:** Endpoint para administradores, listará todos los usuarios con los totales de sus transaciones: sumar amount por usuario, total de transacciones de cada usuario y la fecha de la ultima transacción realizada.
- **Insertar transacción:** Endpoint para socios, crear una transacción de un socio.
- **Obtener socio y transacciones:** Endpoint para socios: A partir del token obtener los datos de usuario junto con sus transacciones.

## Validación del token

Una vez creados los passwords y implementado JWT. Todos los endpoints tendran un middleware que validará el token y si el usuario es del rol "admin" o "customer" por lo que tendrá acceso a dichos endpoints o no dependiendo del rol.
Recuerda proteger el endpoint de generación de password para que solo un administrador pueda usarlo.

**Regeneración de passwords y login**

- Route: `localhost:3000/private/utils/user/:id/password/reset`
- Method: `PATCH`
- Body: `{password: 'new_password'}`

Una vez los usuarios tengan password se debe implementar el endpoint, controlador y servicios necesarios para el login.

- Route: `localhost:3000/login`
- Method: `POST`
- Body: `{username: jondoe, password: 12345678}`

El login debe devolver los datos del usuario (sin relaciones) junto con el token de acceso que será necesario añadir en los headers de todas las demás llamadas a la API.
`Authorization` `Bearer {token}`

---

**Transacciones**
**Endpoint de socio: Insertar transacción**

- Route: `localhost:3000/user/transaction`
- Method: `POST`
- Header: `Authorization` `Bearer {token}`
- Body: `{amount: 1234, detail: 'Seat 1, Row 3, Section 1'}`
- Respuesta:

```
{
    "detail": "seat 1; row 2; section 1",
    "amount": "1234545",
    "user": {
        "id": 2,
        "username": "janedoe",
        "created": "2023-07-31T08:05:04.764Z",
        "updated": "2023-07-31T12:05:29.000Z"
    },
    "id": 7,
    "created": "2023-07-31T12:21:21.324Z",
    "updated": "2023-07-31T12:21:21.324Z"
}
```

**Middleware:**

1. Si el token es válido (caducidad). Si no lo es respondará con un error.
2. Si el token pertenece a un usuario, si no pertenece a ningun usuario respondará con un error.
3. Si el token es válido añadirá en el body el id de usuario obtenido y dejará pasar la llamada al controlador.

**Controlador:**
Recibirá el id del usuario por el body y se implementará la inserción mediante TypeORM en la tabla relacionada `transactions`.

---

**Endpoint de usuario: Obtener transacciones de un usuario**

- Route: `localhost:3000/user?related=transactions`
- Method: `GET`
- Header: `Authorization` `Bearer {token}`
- Respuesta:

```
[
    {
        "id": 2,
        "username": "janedoe",
        "created": "2023-07-31T08:05:04.764Z",
        "updated": "2023-07-31T12:05:29.000Z",
        "transactions": [
            {
                "id": 2,
                "detail": "seat 1; row 2; section 1",
                "amount": 14545,
                "created": "2023-07-31T12:16:27.568Z",
                "updated": "2023-07-31T12:16:27.568Z"
            },
            {
                "id": 3,
                "detail": "seat 2; row 2; section 1",
                "amount": 4356,
                "created": "2023-07-31T12:16:50.084Z",
                "updated": "2023-07-31T12:16:50.084Z"
            }
        ]
    }
]
```

**Middleware:**

1. Si el token es válido (caducidad). Si no lo es respondará con un error.
2. Si el token pertenece a un usuario, si no pertenece a ningun usuario respondará con un error.
3. Si el token es válido añadirá en el body el id de usuario obtenido y dejará pasar la llamada al controlador.

**Controlador:**

La función está creada, hay que añadirle la relación de las transacciones a la respuesta.

---

**Endpoint de administrador: Obtener lista de socios y sus totales**

- Route: `localhost:3000/private/users?related=transactions`
- Method: `GET`
- Header: `Authorization` `Bearer {token}`
- Respuesta:

```
{
    "data": [
        {
            "id": 1,
            "username": "johndoe",
            "created": "2023-07-31T08:05:04.764Z",
            "totalAmount": null,
            "totalTransactions": "0",
            "lastTransaction": null
        },
        {
            "id": 2,
            "username": "janedoe",
            "created": "2023-07-31T08:05:04.764Z",
            "totalAmount": "820",
            "totalTransactions": "2",
            "lastTransaction": "2023-07-31T12:16:50.084Z"
        },
        {
            "id": 3,
            "username": "richardroe",
            "created": "2023-07-31T08:05:04.764Z",
            "totalAmount": "2048",
            "totalTransactions": "2",
            "lastTransaction": "2023-07-31T12:19:18.016Z"
        },
        {
            "id": 4,
            "username": "stevewade",
            "created": "2023-07-31T08:05:04.764Z",
            "totalAmount": "115",
            "totalTransactions": "1",
            "lastTransaction": "2023-07-31T12:20:44.386Z"
        },
        {
            "id": 5,
            "username": "alisonroe",
            "created": "2023-07-31T08:05:04.764Z",
            "totalAmount": "840",
            "totalTransactions": "2",
            "lastTransaction": "2023-07-31T12:58:19.664Z"
        }
    ],
    "totals": {
        "amount": "3823"
    }
}
```

**Middleware:**

1. Si el token es válido (caducidad). Si no lo es respondará con un error.
2. Si el token pertenece a un usuario, si no pertenece a ningun usuario respondará con un error.
3. Si el token es válido dejará pasar la llamada al controlador.

**Controlador:**

El endpoint y controlador ya están creados, pero hay que añadir el control del query params 'related' de manera que cuando se reciba ese query param, la lista de usuarios incluirá la información necesaria de las transacciones.
El endpoint devolverá un array de usuarios con un objeto transactions donde se incluirá la suma de todos sus amount, el total de transacciones realizadas y la fecha de creación de la última transacción.
Solo el token que pertenece a un administrador tendrá acceso a este endpoint.

## Documentación recomendada:

ExpressJS : https://expressjs.com/en/5x/api.html

TypeORM : https://typeorm.io/

Passport: https://www.passportjs.org/howtos/password/

Argon2: https://www.npmjs.com/package/argon2

## Que valoramos en esta prueba

Se valorará la calidad técnica junto a la capacidad autoresolutiva y de lectura de documentación para implementar las siguientes dificultades:

- Sistema de autenticación JWT
  - Encriptar passwords
  - Autenticación
- TypeORM
  - Obtener lista de usuarios con sus transacciones: total de transacciones, ultima transacción, total del campo amount de sus transacciones
  - Insertar transacción
  - Obtener datos del usuario logado + la suma del campo amount de sus transacciones
- Utils Method.
  - Endpoint que actualiza el password de un usuario, es el primero que se debe implementar para que los usuarios tengan password y se pueda implementar el sistema de autenticación.
- Autenticación
  - El endpoint que obtiene la lista de usuarios solo puede ser llamado por un admin
  - El endpoint de cargar los datos del usuario logado puede ser llamado por cualquier usuario con un token válido.
  - El endpoint de crear una transacción solo puede ser llamado por un usuario válido.
  - El endpoint que actualiza los passwords de un usuario, una vez que los passwords esten regenerados y que el sistema de autenticación funcione, debe ser llamado solo por el administrador por si en un futuro hay que volver a usarlo.
