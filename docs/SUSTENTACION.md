# Sustentacion del parcial: GameFest API

## 1. Presentacion del proyecto

GameFest es una API backend para administrar una convencion de videojuegos.
Permite gestionar videojuegos, torneos, jugadores y equipos mediante operaciones
CRUD persistentes en MongoDB.

La modalidad elegida para el parcial es **backend**. Los datos no se guardan en
memoria: se almacenan en MongoDB usando Mongoose.

## 2. Tecnologias utilizadas

- **Node.js:** entorno de ejecucion.
- **Express:** creacion del servidor y las rutas HTTP.
- **MongoDB:** base de datos persistente.
- **Mongoose:** modelos, esquemas y acceso a MongoDB.
- **dotenv:** lectura de variables de entorno.
- **cors:** permitir solicitudes desde otros clientes.
- **Git y GitHub:** control de versiones y colaboracion.
- **GitHub Actions:** verificacion automatica del proyecto.

## 3. Arquitectura del backend

El proyecto esta organizado por responsabilidades:

```text
src/
  server.js                 Configuracion del servidor y rutas principales
  config/database.js        Conexion con MongoDB
  models/                   Esquemas de las entidades
  controllers/              Logica de cada operacion CRUD
  routes/                   Endpoints HTTP de cada entidad
test/                       Verificacion automatizada de sintaxis
```

El flujo de una solicitud es:

```text
Cliente -> Ruta -> Controlador -> Modelo Mongoose -> MongoDB
                                  |
                                  -> Respuesta JSON
```

En `src/server.js` se registran las rutas:

| Entidad | Ruta base |
| --- | --- |
| Videojuegos | `/api/games` |
| Torneos | `/api/tournaments` |
| Jugadores | `/api/players` |
| Equipos | `/api/teams` |

## 4. CRUD implementados

El proyecto contiene cuatro CRUD completos. Cada uno permite crear, consultar,
actualizar y eliminar registros.

### Videojuegos

Archivo principal: `src/controllers/gameController.js`

| Metodo | Endpoint | Funcion |
| --- | --- | --- |
| GET | `/api/games` | Lista todos los videojuegos |
| GET | `/api/games/:id` | Consulta un videojuego |
| POST | `/api/games` | Crea un videojuego |
| PUT | `/api/games/:id` | Actualiza un videojuego |
| DELETE | `/api/games/:id` | Elimina un videojuego |

Campos del videojuego:

- `name`: nombre del videojuego.
- `genre`: genero.
- `platform`: plataforma.
- `price`: precio, con valor minimo de cero.
- `status`: `Activo` o `Inactivo`.

La rama `feature/videojuegos` tambien agrego validacion para rechazar IDs con
formato invalido antes de consultar MongoDB.

### Jugadores

Ruta base: `/api/players`.

La entidad tiene nickname, nombre completo, correo, telefono, ranking y estado.
El nickname y el correo son unicos.

### Equipos

Ruta base: `/api/teams`.

La entidad tiene nombre, etiqueta, capitan, miembros y estado. Las consultas
usan `populate` para devolver la informacion de los jugadores relacionados.

### Torneos

Ruta base: `/api/tournaments`.

La entidad tiene nombre, videojuego, fecha, premio y estado. El premio no puede
ser negativo y el estado usa valores controlados por el esquema.

## 5. Ejemplo de demostracion del CRUD

Primero se inicia MongoDB y luego el servidor:

```bash
npm install
npm test
npm run dev
```

La API queda disponible en `http://localhost:3000`.

Para demostrar videojuegos se puede usar Postman o Thunder Client:

### Crear

`POST http://localhost:3000/api/games`

```json
{
  "name": "Valorant",
  "genre": "Shooter",
  "platform": "PC",
  "price": 0,
  "status": "Activo"
}
```

La respuesta esperada es `201 Created` y contiene el `_id` generado por
MongoDB.

### Leer

- `GET /api/games` lista los videojuegos.
- `GET /api/games/:id` consulta un registro especifico.

La respuesta esperada es `200 OK`.

### Actualizar

`PUT http://localhost:3000/api/games/:id`

```json
{
  "price": 25,
  "status": "Inactivo"
}
```

La respuesta esperada es `200 OK` con el registro actualizado.

### Eliminar

`DELETE http://localhost:3000/api/games/:id`

La respuesta esperada es `200 OK` con el mensaje de eliminacion.

## 6. Validaciones y respuestas HTTP

- `200`: consulta, actualizacion o eliminacion exitosa.
- `201`: registro creado correctamente.
- `400`: datos invalidos, campos obligatorios faltantes o ID invalido.
- `404`: registro no encontrado.
- `500`: error interno o problema de conexion con MongoDB.

Los esquemas Mongoose validan campos obligatorios, valores permitidos, precios
no negativos y valores unicos cuando corresponde.

## 7. GitFlow aplicado

Se utilizaron las ramas principales del modelo GitFlow:

- `main`: version estable entregable.
- `develop`: rama de integracion.
- `feature/...`: rama independiente para cada funcionalidad.

En el historial del repositorio se pueden observar, entre otras, estas ramas:

- `feature/github-actions-ci`
- `feature/player-crud`
- `feature/team-crud`
- `feature/videojuegos`

El trabajo se integro mediante Pull Requests hacia `develop` y posteriormente
se llevo la version integrada a `main`. El commit de la rama de videojuegos
fue:

```text
1fe8d09 feat: fortalecer CRUD de videojuegos y validacion CI
```

La participacion debe demostrarse en GitHub mostrando los commits, las ramas,
los Pull Requests, las revisiones y los resultados de Actions.

## 8. Pull Requests y colaboracion

Cada funcionalidad se trabajo de forma aislada y se integro mediante Pull
Request. Esto permite:

1. Revisar el codigo antes de integrarlo.
2. Ejecutar las validaciones automaticas.
3. Recibir comentarios o aprobacion de otro integrante.
4. Mantener `develop` como rama de integracion.
5. Reservar `main` para la version estable.

En la sustentacion se debe abrir la pestaña **Pull requests** de GitHub y
mostrar los PR asociados a CI, jugadores, equipos y videojuegos, junto con sus
revisiones y estados.

## 9. GitHub Actions

El workflow esta en `.github/workflows/ci.yml` y se ejecuta cuando ocurre:

- Un `push` a `main` o `develop`.
- Un Pull Request dirigido a `main` o `develop`.

El pipeline realiza estos pasos:

1. Descarga el repositorio con `actions/checkout@v4`.
2. Configura Node.js 24 mediante `actions/setup-node@v4`.
3. Instala dependencias con `npm ci`.
4. Ejecuta `npm test`.

El comando `npm test` valida la sintaxis de todos los archivos JavaScript dentro
de `src`. Una ejecucion correcta debe mostrar un test aprobado y cero fallos.

Para demostrarlo en GitHub se abre **Actions**, se selecciona el workflow
`Node.js CI` y se muestra una ejecucion con estado verde.

## 10. Guion breve para la sustentacion

> Nuestro proyecto es GameFest, una API backend para una convencion de
> videojuegos. Elegimos esta modalidad porque necesitabamos CRUD reales con
> persistencia en MongoDB.
>
> El servidor esta construido con Express. Las rutas reciben las solicitudes,
> los controladores contienen la logica y los modelos Mongoose definen las
> validaciones de cada entidad.
>
> Implementamos cuatro CRUD: videojuegos, torneos, jugadores y equipos. Cada
> uno tiene endpoints para crear, listar, consultar por ID, actualizar y
> eliminar registros.
>
> Para trabajar colaborativamente usamos GitFlow. `develop` fue la rama de
> integracion, cada funcionalidad se trabajo en una rama `feature` y los cambios
> se integraron mediante Pull Requests revisados.
>
> Tambien configuramos GitHub Actions. En cada push o Pull Request hacia las
> ramas principales se instalan las dependencias y se ejecuta `npm test` para
> validar el codigo.

## 11. Preguntas frecuentes del profesor

### Por que escogieron backend?

Porque el requisito exige operaciones CRUD reales y persistencia. MongoDB
permite conservar la informacion y demostrar la comunicacion entre API, modelo
y base de datos.

### Que pasa si se consulta un ID inexistente?

El controlador devuelve `404 Not Found`. Si el formato del ID es invalido,
devuelve `400 Bad Request` sin enviar una consulta innecesaria a MongoDB.

### Por que usan `runValidators: true` al actualizar?

Para que las reglas del esquema tambien se apliquen en las operaciones `PUT`.

### Que diferencia hay entre `main` y `develop`?

`develop` integra el trabajo revisado durante el desarrollo. `main` contiene la
version estable que se entrega o se considera lista para produccion.

### Que demuestra GitHub Actions?

Demuestra que el proyecto puede instalar sus dependencias y superar una
verificacion automatica en un entorno limpio de Ubuntu.

## 12. Evidencias que se deben mostrar

- Repositorio de GitHub y ramas `main`, `develop` y `feature/...`.
- Historial de commits de cada integrante.
- Pull Requests con descripcion, revision y aprobacion.
- Pestaña Actions con ejecuciones exitosas.
- Servidor ejecutandose localmente.
- MongoDB con registros persistidos.
- Prueba de crear, listar, actualizar y eliminar un videojuego.