
Este proyecto consiste en una aplicación Node.js con Express y Puppeteer para obtener las URLs de las fotos de una propiedad de Airbnb a partir de su ID de habitación. Además, incluye un frontend en React que permite buscar imágenes por ID y descargarlas utilizando la API proporcionada.

Clona el repositorio:

Instala las dependencias:
npm install

Servidor API
Inicia el servidor API:
npm start
El servidor estará disponible en http://localhost:3000.
Para obtener las URLs de las fotos de una propiedad de Airbnb, realiza una solicitud GET a:
http://localhost:3000/obtenerFotosAirbnb/:roomId
Reemplaza :roomId con el ID de la habitación en Airbnb.
Frontend React
Navega al directorio del frontend:
cd frontend
Inicia la aplicación React:
npm start
La aplicación estará disponible en http://localhost:3001.
Abre tu navegador y ve a http://localhost:3001 para buscar imágenes por ID y descargarlas.

Un buen README es esencial para que otros desarrolladores comprendan rápidamente tu aplicación y cómo trabajar con ella. Aquí hay un ejemplo de cómo podrías estructurar el README para tu aplicación:

markdown
Copy code
# Airbnb Photo Downloader

Este proyecto consiste en una aplicación Node.js con Express y Puppeteer para obtener las URLs de las fotos de una propiedad de Airbnb a partir de su ID de habitación. Además, incluye un frontend en React que permite buscar imágenes por ID y descargarlas utilizando la API proporcionada.

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/tu-repo.git
   cd tu-repo
Instala las dependencias:

bash
Copy code
npm install
Uso
Servidor API
Inicia el servidor API:

bash
Copy code
npm start
El servidor estará disponible en http://localhost:3000.

Para obtener las URLs de las fotos de una propiedad de Airbnb, realiza una solicitud GET a:

bash
Copy code
http://localhost:3000/obtenerFotosAirbnb/:roomId
Reemplaza :roomId con el ID de la habitación en Airbnb.

Frontend React
Navega al directorio del frontend:

bash
Copy code
cd frontend
Inicia la aplicación React:

bash
Copy code
npm start
La aplicación estará disponible en http://localhost:3001.

Abre tu navegador y ve a http://localhost:3001 para buscar imágenes por ID y descargarlas.

Dependencias
Express
Puppeteer
Cors (para permitir solicitudes desde el frontend)
Scripts
npm start: Inicia el servidor API.
npm run frontend: Inicia la aplicación React del frontend.
Notas adicionales
La resolución de pantalla se simula para evitar la detección de Puppeteer por parte de Airbnb.
Se agrega un retraso de 2 segundos después de cargar la página para asegurarse de que esté completamente cargada.
