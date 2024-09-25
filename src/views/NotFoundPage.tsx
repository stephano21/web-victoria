import React from 'react';

export const NotFoundPage = () => {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col text-center">
                    <div className="col-sm-12 text-warning">
                        <i style={{fontSize: "100px"}} className="bi bi-exclamation-triangle-fill"></i>
                    </div>
                    <h1 className="mt-3">404 - Página no encontrada</h1>
                    <p>Lo sentimos, la página que estás buscando no existe.</p>
                    <a href="/planttrace" className="btn btn-primary"> <i className="bi bi-house-door-fill"></i> Volver al inicio</a>
                </div>
            </div>
        </div>
    );
};

