function SummaryCard({
    title,
    value,
    color,
    icon
}) {
    return (
        <div className="col">

            <div
                className="card border-0 shadow-sm h-100"
                style={{  borderLeft: `5px solid rgba(${color}, 1)`  }}
            >

                <div className="card-body">

                    <div className="d-flex align-items-center">

                             <div
                                style={{
                                fontSize: "2.2rem",
                                color: `rgba(${color}, 1)`,
                                marginRight: "20px"
                            }}
                        >
                            {icon}
                        </div>
                        
                        
                        
                        
                        <div>

                            <h6 className="mb-1">
                                {title}
                            </h6>

                            <div className="d-flex align-items-end">

                                <h3 className="mb-0 fw-bold">
                                    {value}
                                </h3>

                                <small
                                    className="ms-1 mb-1"
                                    style={{
                                        fontSize: "0.75rem"
                                    }}
                                >
                                    habitaciones
                                </small>

                            </div>

                        </div>

                   

                    </div>

                </div>

            </div>

        </div>
    );
}

export default SummaryCard;