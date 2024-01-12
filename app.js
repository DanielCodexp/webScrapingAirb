const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

app.get('/obtenerFotosAirbnb/:roomId', async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const enlaceAirbnb = `https://www.airbnb.mx/rooms/${roomId}`;

    console.log('Iniciando Puppeteer...');
    const browser = await puppeteer.launch({ headless: true }); // Cambiado a 'true' para que Puppeteer sea headless
    const page = await browser.newPage();

    // Simula una resolución de pantalla para que el sitio no detecte que es Puppeteer
    await page.setViewport({ width: 1366, height: 768 });

    console.log('Navegando a la página...');
    await page.goto(enlaceAirbnb, { waitUntil: 'domcontentloaded' }); // Cambiado a 'domcontentloaded'

    // Agregar un retraso de 2 segundos para asegurarse de que la página se haya cargado completamente
    await page.waitForTimeout(2000);

    console.log('Extrayendo URLs de las fotos...');
    const urlsFotos = await page.evaluate(() => {
      console.log('Dentro de page.evaluate(), buscando las imágenes...');
      const imagenes = document.querySelectorAll('picture img'); // Actualizar el selector para apuntar a las imágenes dentro de la etiqueta <picture>
      console.log('Imágenes encontradas:', imagenes.length);
      return Array.from(imagenes).map(img => img.src);
    });

    console.log('Cerrando Puppeteer...');
    await browser.close();

    const responseObj = { urlsFotos };
    res.json(responseObj);
  } catch (error) {
    console.error('Error al obtener las fotos:', error.message);
    res.status(500).json({ error: 'Error al obtener las fotos' });
  }
});

const server = app.listen(port, async () => {
  console.log(`La API está escuchando en http://localhost:${port}`);
});

process.on('SIGINT', async () => {
  console.log('Apagando el servidor...');
  await server.close();
  process.exit();
});

process.on('SIGTERM', async () => {
  console.log('Apagando el servidor...');
  await server.close();
  process.exit();
});
