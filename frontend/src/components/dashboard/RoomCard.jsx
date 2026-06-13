function RoomCard({
    numero,
    tipo,
    estado,
    color
}) {
    return (
        <div className="col">

            <div className="card shadow-sm border-0.5 h-100">

                <div className="card-body ">

                    <h5 className="mb-1 fw-bold">
                        {numero}
                    </h5>

                    <p className="small mb-0">
                        {tipo}
                    </p>

                </div>

                <div
                    className="text-white py-1 px-3"
                    style={{
                        backgroundColor: `rgba(${color}, 0.70)`,
                        fontSize: "0.75rem",
                        borderBottomLeftRadius: "0.375rem",
                        borderBottomRightRadius: "0.375rem",
                        letterSpacing: "0.5px"
                    }}
                >
                    {estado}
                </div>

            </div>

        </div>
    );
}

export default RoomCard;