import React from 'react';

interface DownloadProps {
  fileName: string;
  Name?: string;
}

export const Download: React.FC<DownloadProps> = ({ fileName, Name }) => {
  const fileUrl = process.env.PUBLIC_URL + `/Formats/${fileName}`;

  const descargarArchivo = () => {
    // Crear un enlace temporal
    const enlace = document.createElement('a');
    enlace.href = fileUrl;
    enlace.download = fileName;

    // Hacer clic en el enlace para iniciar la descarga
    document.body.appendChild(enlace);
    enlace.click();
    console.log(enlace)
    // Limpiar y eliminar el enlace temporal
    document.body.removeChild(enlace);
  };

  return (
    <div>
      <button className='btn btn-success' onClick={descargarArchivo}><i className="bi bi-download"></i> Formato </button>
    </div>
  );
};