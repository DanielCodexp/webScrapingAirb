const puppeteer = require('puppeteer');

async function obtenerFotosAirbnb(url) {
  try {
    console.log('Iniciando Puppeteer...');
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    // Simula una resolución de pantalla para que el sitio no detecte que es Puppeteer
    await page.setViewport({ width: 1366, height: 768 });

    console.log('Navegando a la página...');
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Agregar un retraso de 2 segundos para asegurarse de que la página se haya cargado completamente
    await page.waitForTimeout(2000);

    console.log('Extrayendo URLs de las fotos...');
    const urlsFotos = await page.evaluate(() => {
      console.log('Dentro de page.evaluate(), buscando las imágenes...');
      const imagenes = document.querySelectorAll('img._1cf10298');
      console.log('Imágenes encontradas:', imagenes.length);
      return Array.from(imagenes).map(img => img.src);
    });

    console.log('Cerrando Puppeteer...');
    await browser.close();

    return urlsFotos;
  } catch (error) {
    console.error('Error al obtener las fotos:', error.message);
    return [];
  }
}

// Ejemplo de uso
const enlaceAirbnb = 'https://www.airbnb.mx/rooms/10989371';

obtenerFotosAirbnb(enlaceAirbnb)
  .then(urlsFotos => {const puppeteer = require('puppeteer');

  async function obtenerFotosAirbnb(url) {
    try {
      console.log('Iniciando Puppeteer...');
      const browser = await puppeteer.launch({ headless: 'new' });
      const page = await browser.newPage();
  
      // Simula una resolución de pantalla para que el sitio no detecte que es Puppeteer
      await page.setViewport({ width: 1366, height: 768 });
  
      console.log('Navegando a la página...');
      await page.goto(url, { waitUntil: 'networkidle2' });
  
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
  
      return urlsFotos;
    } catch (error) {
      console.error('Error al obtener las fotos:', error.message);
      return [];
    }
  }
  
  // Ejemplo de uso
  const enlaceAirbnb = 'https://www.airbnb.mx/rooms/10989371';
  
  obtenerFotosAirbnb(enlaceAirbnb)
    .then(urlsFotos => {
      console.log('URLs de las fotos obtenidas:');
      urlsFotos.forEach((foto, index) => {
        console.log(`Foto ${index + 1}: ${foto}`);
      });
    })
    .catch(error => console.error(error));
  
    console.log('URLs de las fotos obtenidas:');
    urlsFotos.forEach((foto, index) => {
      console.log(`Foto ${index + 1}: ${foto}`);
    });
  })
  .catch(error => console.error(error));
