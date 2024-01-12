// ImageFetcher.js
import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import download from 'downloadjs';

const ImageFetcher = () => {
    const [roomId, setRoomId] = useState('');
    const [imageUrls, setImageUrls] = useState([]);
    const [searchMessage, setSearchMessage] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
  
    const fetchImages = async () => {
      try {
        setLoading(true);
        // Reinicia la constante imageUrls a un array vacío
        setImageUrls([]);
        
        const response = await axios.get(`http://localhost:3000/obtenerFotosAirbnb/${roomId}`);
        setImageUrls(response.data.urlsFotos);
        setSearchMessage(`Imágenes para la habitación con ID ${roomId}`);
      } catch (error) {
        console.error('Error al obtener las imágenes:', error.message);
        setSearchMessage('Error al obtener las imágenes');
      } finally {
        setLoading(false);
      }
    };
  
    const handleInputChange = (e) => {
      const inputValue = e.target.value;
      setRoomId(inputValue);
      setButtonDisabled(inputValue.trim() === ''); // Deshabilitar el botón si no hay texto
    };
  
    const downloadImages = async () => {
      try {
        const imagePromises = imageUrls.map(async (url, index) => {
          const response = await axios.get(url, { responseType: 'blob' });
          const blob = new Blob([response.data]);
          download(blob, `imagen_${index + 1}.jpg`, 'image/jpeg');
        });
  
        await Promise.all(imagePromises);
      } catch (error) {
        console.error('Error al descargar las imágenes:', error.message);
      }
    };
  
    return (
      <div className="container mt-5">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Ingrese el ID de la habitación"
            value={roomId}
            onChange={handleInputChange}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={fetchImages}
              disabled={buttonDisabled || loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className="sr-only">Cargando...</span>
                </>
              ) : (
                <>
                  <i className="fas fa-search"></i> Obtener imágenes
                </>
              )}
            </button>
          </div>
        </div>
  
        {searchMessage && <div className="alert alert-info">{searchMessage}</div>}
  
        <div className="row">
          {imageUrls.map((url, index) => (
            <div key={index} className="col-md-4 mb-3">
              <img
                src={url}
                alt={`Imagen ${index}`}
                className="img-fluid rounded"
                style={{ maxHeight: '200px', margin: '5px' }}
              />
            </div>
          ))}
        </div>
  
        {imageUrls.length > 0 && (
          <button className="btn btn-primary mt-3" onClick={downloadImages} disabled={loading}>
            Descargar imágenes
          </button>
        )}
      </div>
    );
  };
  
  export default ImageFetcher;