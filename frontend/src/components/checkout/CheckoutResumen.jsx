function CheckoutResumen({ checkout }) {

    const money = (valor) =>
        Number(valor || 0).toLocaleString(
            "es-AR",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );

    return (

        <div className="card mb-4">

            <div className="card-header">

                <strong>
                    Resumen económico
                </strong>

            </div>

            <div className="card-body">

                <table className="table table-sm align-middle">

                    <tbody>

                        <tr>

                            <th width="60%">
                                Total reserva
                            </th>

                            <td className="text-end">

                                $ {money(
                                    checkout.total_reserva
                                )}

                            </td>

                        </tr>

                        <tr>

                            <th>

                                Extras
                            </th>

                            <td className="text-end">

                                $ {money(
                                    checkout.extras
                                )}

                            </td>

                        </tr>

                        <tr>

                            <th>

                                Penalidades
                            </th>

                            <td className="text-end">

                                $ {money(
                                    checkout.penalidades
                                )}

                            </td>

                        </tr>

                        <tr>

                            <th>

                                Devoluciones
                            </th>

                            <td className="text-end text-danger">

                                - $ {money(
                                    checkout.devoluciones
                                )}

                            </td>

                        </tr>

                        <tr className="table-light">

                            <th>

                                Total estadía

                            </th>

                            <td className="text-end fw-bold">

                                $ {money(
                                    checkout.total_estadia
                                )}

                            </td>

                        </tr>

                        <tr>

                            <th>

                                Total pagado

                            </th>

                            <td className="text-end text-success">

                                $ {money(
                                    checkout.total_pagado
                                )}

                            </td>

                        </tr>

                        <tr className="table-warning">

                            <th>

                                Saldo pendiente

                            </th>

                            <td className="text-end fw-bold">

                                $ {money(
                                    checkout.saldo_pendiente
                                )}

                            </td>

                        </tr>

                        {

                            checkout.credito > 0 && (

                                <tr className="table-info">

                                    <th>

                                        Crédito a favor

                                    </th>

                                    <td className="text-end fw-bold">

                                        $ {money(
                                            checkout.credito
                                        )}

                                    </td>

                                </tr>

                            )

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default CheckoutResumen;
