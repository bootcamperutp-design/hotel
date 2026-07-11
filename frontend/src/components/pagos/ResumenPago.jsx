function ResumenPagos({ resumen }) {

    if (!resumen) {
        return null;
    }

    return (
        <div className="card mb-4">

            <div className="card-header">
                <h5 className="mb-0">
                    Resumen de Pagos
                </h5>
            </div>

            <div className="card-body">

                <div className="row">

                    <div className="col-md-3 mb-3">
                        <strong>Total Reserva</strong>
                        <div>
                            ${resumen.total_reserva}
                        </div>
                    </div>

                    <div className="col-md-3 mb-3">
                        <strong>Total Pagado</strong>
                        <div>
                            ${resumen.total_pagado}
                        </div>
                    </div>

                    <div className="col-md-3 mb-3">
                        <strong>Saldo</strong>
                        <div>
                            ${resumen.saldo}
                        </div>
                    </div>

                    <div className="col-md-3 mb-3">
                        <strong>Crédito</strong>
                        <div>
                            ${resumen.credito}
                        </div>
                    </div>

                    <div className="col-md-12">
                        <strong>Estado:</strong>{" "}
                        {resumen.estado_pago}
                    </div>

                </div>

            </div>

        </div>
    );

}

export default ResumenPagos;

