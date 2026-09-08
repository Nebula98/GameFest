# GameFest API

API backend para gestionar los videojuegos, torneos, jugadores y equipos de una
convención de videojuegos.

## Requisitos

- Node.js 24 o superior
- MongoDB local o una instancia de MongoDB Atlas

## Instalación

```bash
npm install
```

Crea un archivo `.env` con la conexión a MongoDB:

```env
MONGO_URI=mongodb://127.0.0.1:27017/gamefest
PORT=3000
```

Ejecuta el servidor con `npm run dev` durante el desarrollo o con `npm start`.

## CRUD de videojuegos

La ruta base es `/api/games`:

| Método | Ruta | Operación |
| --- | --- | --- |
| GET | `/api/games` | Listar videojuegos |
| GET | `/api/games/:id` | Consultar un videojuego |
| POST | `/api/games` | Crear un videojuego |
| PUT | `/api/games/:id` | Actualizar un videojuego |
| DELETE | `/api/games/:id` | Eliminar un videojuego |

Ejemplo para crear un videojuego:

```json
{
	"name": "Valorant",
	"genre": "Shooter",
	"platform": "PC",
	"price": 0,
	"status": "Activo"
}
```

Los identificadores con formato inválido reciben una respuesta `400` para que
el cliente pueda corregir la solicitud antes de consultar la base de datos.

## Verificación

```bash
npm test
```

El workflow de GitHub Actions ejecuta esta misma verificación en cada `push` y
Pull Request hacia `develop` o `main`.
