import React from 'react';

export const ErrorScreen = () => {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col text-center">
                    <div className="col-sm-12 text-danger">
                        <i style={{ fontSize: "100px" }} className="bi bi-wrench-adjustable-circle-fill"></i>
                    </div>
                    <h1>¡Ups! Algo salió mal.</h1>
                    <p>Lo sentimos, se produjo un error inesperado. Por favor, inténtalo de nuevo más tarde.</p>
                    <div className="row d-flex justify-content-center mb-3">
                        <div className="col-sm-2">
                            <a href="/" className="btn btn-primary mb-2"> <i className="bi bi-house-door-fill"></i> Volver al inicio</a>
                        </div>
                        <div className="col-sm-2">
                            <button className="btn btn-secondary mb-2" onClick={() => window.location.reload()}>
                                <i className='bi bi-arrow-clockwise'></i> Recargar página
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

