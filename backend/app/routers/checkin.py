from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
from sqlalchemy import or_
from datetime import datetime, date

from app.database import get_db

from app.models.checkin import Checkin
from app.models.reserva import Reserva
from app.models.checkin_huesped import CheckinHuesped
from app.models.huesped import Huesped

router = APIRouter(
    prefix="/checkin",
    tags=["Check-in"]
)


# =====================================================
# CREAR CHECK-IN
# =====================================================

@router.post("/")
def crear_checkin(
    data: dict,
    db: Session = Depends(get_db)
):

    reserva_id = data.get("reserva_id")
    observaciones = data.get("observaciones")


    if not reserva_id:
        raise HTTPException(
            status_code=400,
            detail="Debe indicar la reserva"
        )


    reserva = (
        db.query(Reserva)
        .filter(
            Reserva.id == reserva_id
        )
        .first()
    )


    if not reserva:
        raise HTTPException(
            status_code=404,
            detail="Reserva no encontrada"
        )


    if reserva.estado != "CONFIRMADA":
        raise HTTPException(
            status_code=400,
            detail="La reserva no está disponible para check-in"
        )

    
    # =====================================================
    # VALIDAR FECHA DE CHECK-IN
    # =====================================================

    hoy = date.today()

    fecha_checkin = (
        reserva.check_in_previsto.date()
        if hasattr(reserva.check_in_previsto, "date")
        else reserva.check_in_previsto
    )


    if hoy < fecha_checkin:
        raise HTTPException(
            status_code=400,
            detail=(
                "El check-in solo puede realizarse "
                "a partir de la fecha prevista de llegada."
            )
        )


    checkin_existente = (
        db.query(Checkin)
        .filter(
            Checkin.reserva_id == reserva_id
        )
        .first()
    )


    if checkin_existente:


        if checkin_existente.estado == "ACTIVO":

            raise HTTPException(
                status_code=400,
                detail="La reserva ya tiene un check-in activo"
            )


        if checkin_existente.estado == "INICIADO":

            return {
                "mensaje": "El check-in ya está iniciado",
                "checkin_id": checkin_existente.id,
                "reserva_id": reserva_id,
                "estado_checkin": checkin_existente.estado
            }


        if checkin_existente.estado in [
            "FINALIZADO",
            "ANULADO"
        ]:

            raise HTTPException(
                status_code=400,
                detail="El check-in no está disponible"
            )



    habitacion = reserva.habitacion


    if not habitacion:

        raise HTTPException(
            status_code=404,
            detail="Habitación no encontrada"
        )


    checkin = Checkin(
        reserva_id=reserva.id,
        fecha_checkin=datetime.now(),
        estado="INICIADO",
        observaciones=observaciones
    )


    db.add(checkin)

    db.commit()

    db.refresh(checkin)


    return {
        "mensaje": "Check-in iniciado correctamente",
        "checkin_id": checkin.id,
        "reserva_id": reserva.id,
        "estado_reserva": reserva.estado,
        "estado_checkin": checkin.estado,
        "fecha_checkin": checkin.fecha_checkin
    }


@router.post("/{checkin_id}/huespedes")
def agregar_huesped(
    checkin_id: int,
    data: dict,
    db: Session = Depends(get_db)
):

    checkin = (
        db.query(Checkin)
        .filter(
            Checkin.id == checkin_id
        )
        .first()
    )

    if not checkin:
        raise HTTPException(
            status_code=404,
            detail="Check-in no encontrado"
        )


    if checkin.estado != "INICIADO":
        raise HTTPException(
            status_code=400,
            detail="El check-in no está iniciado"
        )


    # =====================================================
    # VALIDAR CANTIDAD MÁXIMA DE HUÉSPEDES
    # =====================================================

    registrados = (
        db.query(CheckinHuesped)
        .filter(
            CheckinHuesped.checkin_id == checkin_id
        )
        .count()
    )


    esperados = (
        checkin.reserva.adultos +
        checkin.reserva.menores
    )


    if registrados >= esperados:
        raise HTTPException(
            status_code=400,
            detail=(
                f"Ya se alcanzó la cantidad máxima de huéspedes. "
                f"Esperados: {esperados}"
            )
        )


    huesped_id = data.get("huesped_id")


    # =====================================================
    # CASO 1 - HUÉSPED EXISTENTE
    # =====================================================

    if huesped_id:

        huesped = (
            db.query(Huesped)
            .filter(
                Huesped.id == huesped_id
            )
            .first()
        )


        if not huesped:
            raise HTTPException(
                status_code=404,
                detail="Huésped no encontrado"
            )


    # =====================================================
    # CASO 2 - CREAR O BUSCAR HUÉSPED
    # =====================================================

    else:

        tipo_documento = data.get(
            "tipo_documento"
        )

        numero_documento = data.get(
            "numero_documento"
        )


        if not tipo_documento or not numero_documento:
            raise HTTPException(
                status_code=400,
                detail="Debe indicar tipo y número de documento"
            )


        huesped = (
            db.query(Huesped)
            .filter(
                Huesped.tipo_documento == tipo_documento,
                Huesped.numero_documento == numero_documento
            )
            .first()
        )


        if not huesped:

            huesped = Huesped(

                tipo_documento=tipo_documento,

                numero_documento=numero_documento,

                nombre=data.get(
                    "nombre"
                ),

                apellido=data.get(
                    "apellido"
                ),

                telefono=data.get(
                    "telefono"
                ),

                email=data.get(
                    "email"
                ),

                direccion=data.get(
                    "direccion"
                ),

                nacionalidad=data.get(
                    "nacionalidad"
                ),

                fecha_nacimiento=data.get(
                    "fecha_nacimiento"
                )
            )


            db.add(huesped)

            db.commit()

            db.refresh(huesped)



    # =====================================================
    # EVITAR DUPLICADOS EN EL CHECK-IN
    # =====================================================

    existe = (
        db.query(CheckinHuesped)
        .filter(
            CheckinHuesped.checkin_id == checkin_id,
            CheckinHuesped.huesped_id == huesped.id
        )
        .first()
    )


    if existe:
        raise HTTPException(
            status_code=400,
            detail="El huésped ya está asociado al check-in"
        )



    nuevo = CheckinHuesped(

        checkin_id=checkin_id,

        huesped_id=huesped.id,

        observaciones=data.get(
            "observaciones"
        )
    )


    db.add(nuevo)

    db.commit()

    db.refresh(nuevo)


    return {

        "mensaje": "Huésped asociado correctamente",

        "checkin_id": checkin_id,

        "registro_id": nuevo.id,

        "huesped_id": huesped.id

    }

# =====================================================
# ELIMINAR HUÉSPED DEL CHECK-IN
# =====================================================

@router.delete("/{checkin_id}/huespedes/{huesped_id}")
def eliminar_huesped_checkin(
    checkin_id: int,
    huesped_id: int,
    db: Session = Depends(get_db)
):

    checkin = (
        db.query(Checkin)
        .filter(
            Checkin.id == checkin_id
        )
        .first()
    )


    if not checkin:
        raise HTTPException(
            status_code=404,
            detail="Check-in no encontrado"
        )


    if checkin.estado != "INICIADO":
        raise HTTPException(
            status_code=400,
            detail="El check-in no está iniciado"
        )


    registro = (
        db.query(CheckinHuesped)
        .filter(
            CheckinHuesped.checkin_id == checkin_id,
            CheckinHuesped.huesped_id == huesped_id
        )
        .first()
    )


    if not registro:
        raise HTTPException(
            status_code=404,
            detail="El huésped no está asociado al check-in"
        )


    db.delete(registro)

    db.commit()


    return {
        "mensaje": "Huésped eliminado correctamente",
        "checkin_id": checkin_id,
        "huesped_id": huesped_id
    }

# =====================================================
# RESUMEN HUÉSPEDES DEL CHECK-IN
# =====================================================

@router.get("/{checkin_id}/huespedes/resumen")
def resumen_huespedes_checkin(
    checkin_id: int,
    db: Session = Depends(get_db)
):

    checkin = (
        db.query(Checkin)
        .filter(
            Checkin.id == checkin_id
        )
        .first()
    )


    if not checkin:
        raise HTTPException(
            status_code=404,
            detail="Check-in no encontrado"
        )


    reserva = checkin.reserva


    registrados = (
        db.query(CheckinHuesped)
        .filter(
            CheckinHuesped.checkin_id == checkin_id
        )
        .count()
    )


    esperados = reserva.adultos + reserva.menores


    return {

        "checkin_id": checkin_id,
        "esperados": esperados,
        "registrados": registrados,
        "faltantes": esperados - registrados

    }


# =====================================================
# CONFIRMAR CHECK-IN
# =====================================================

@router.post("/{checkin_id}/confirmar")
def confirmar_checkin(
    checkin_id: int,
    db: Session = Depends(get_db)
):

    try:

        checkin = (
            db.query(Checkin)
            .filter(
                Checkin.id == checkin_id
            )
            .first()
        )

        if not checkin:
            raise HTTPException(
                status_code=404,
                detail="Check-in no encontrado"
            )

        if checkin.estado != "INICIADO":
            raise HTTPException(
                status_code=400,
                detail="El check-in no está iniciado"
            )

        reserva = checkin.reserva

        if not reserva:
            raise HTTPException(
                status_code=400,
                detail="El check-in no tiene una reserva asociada"
            )

        # Validar estado de la reserva
        if reserva.estado != "CONFIRMADA":
            raise HTTPException(
                status_code=400,
                detail="La reserva no está lista para check-in"
            )

        # Validar habitación asignada
        habitacion = reserva.habitacion

        if not habitacion:
            raise HTTPException(
                status_code=400,
                detail="La reserva no tiene una habitación asignada"
            )

        registrados = (
            db.query(CheckinHuesped)
            .filter(
                CheckinHuesped.checkin_id == checkin_id
            )
            .count()
        )

        esperados = (
            reserva.adultos +
            reserva.menores
        )

        if registrados < esperados:
            raise HTTPException(
                status_code=400,
                detail=(
                    f"Faltan registrar huéspedes. "
                    f"Esperados: {esperados}, "
                    f"registrados: {registrados}"
                )
            )

        if registrados > esperados:
            raise HTTPException(
                status_code=400,
                detail=(
                    f"Hay más huéspedes registrados de los esperados. "
                    f"Esperados: {esperados}, "
                    f"registrados: {registrados}"
                )
            )

        # Confirmar check-in
        checkin.estado = "ACTIVO"

        # Actualizar estado de la reserva
        reserva.estado = "CHECK_IN"

        # Ocupar habitación
        habitacion.estado = "OCUPADA"

        db.commit()

        db.refresh(checkin)
        db.refresh(reserva)

        return {
            "mensaje": "Check-in confirmado correctamente",
            "checkin_id": checkin.id,
            "estado": checkin.estado,
            "reserva_estado": reserva.estado,
            "huespedes_esperados": esperados,
            "huespedes_registrados": registrados
        }

    except HTTPException:
        db.rollback()
        raise

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Error al confirmar el check-in: {str(e)}"
        )



# =====================================================
# OBTENER RESERVA PARA CHECK-IN
# =====================================================

@router.get("/reserva/{reserva_id}")
def obtener_reserva_checkin(
    reserva_id: int,
    db: Session = Depends(get_db)
):

    reserva = (
        db.query(Reserva)
        .filter(
            Reserva.id == reserva_id
        )
        .first()
    )


    if not reserva:
        raise HTTPException(
            status_code=404,
            detail="Reserva no encontrada"
        )


    if reserva.estado != "CONFIRMADA":
        raise HTTPException(
            status_code=400,
            detail="La reserva no está disponible para check-in"
        )


    checkin_existente = (
        db.query(Checkin)
        .filter(
            Checkin.reserva_id == reserva_id
        )
        .first()
    )


    habitacion = reserva.habitacion


    if not habitacion:
        raise HTTPException(
            status_code=404,
            detail="Habitación no encontrada"
        )


    return {

        "id":
            reserva.id,


        "codigo_reserva":
            reserva.codigo_reserva,


        "titular":
            f"{reserva.nombre_contacto} {reserva.apellido_contacto}",


        "tipo_documento":
            reserva.tipo_documento,


        "numero_documento":
            reserva.numero_documento,


        "telefono_contacto":
            reserva.telefono_contacto,


        "email_contacto":
            reserva.email_contacto,


        "habitacion": {

            "id":
                habitacion.id,

            "numero":
                habitacion.numero,

            "tipo":
                habitacion.tipo_habitacion.nombre

        },


        "check_in_previsto":
            reserva.check_in_previsto,


        "check_out_previsto":
            reserva.check_out_previsto,


        "adultos":
            reserva.adultos,


        "menores":
            reserva.menores,


        "total_estimado":
            reserva.total_estimado,


        "estado":
            reserva.estado,


        "checkin": {

            "existe":
                checkin_existente is not None,

            "id":
                checkin_existente.id
                if checkin_existente
                else None,

            "estado":
                checkin_existente.estado
                if checkin_existente
                else None

        }

    }




# =====================================================
# RESERVAS DISPONIBLES PARA CHECK-IN
# =====================================================

@router.get("/disponibles")
def checkin_disponibles(
    db: Session = Depends(get_db)
):

    reservas = (
        db.query(Reserva)
        .join(
            Reserva.habitacion
        )
        .filter(
            Reserva.estado == "CONFIRMADA",
            Reserva.check_in_previsto <= date.today()
        )
        .all()
    )


    resultado = []


    for reserva in reservas:

        checkin = (
            db.query(Checkin)
            .filter(
                Checkin.reserva_id == reserva.id
            )
            .first()
        )


        # Si el check-in ya está confirmado o cerrado,
        # no aparece como disponible
        if checkin and checkin.estado in [
            "ACTIVO",
            "FINALIZADO",
            "ANULADO"
        ]:
            continue


        resultado.append(
            {
                "id": reserva.id,

                "codigo_reserva":
                    reserva.codigo_reserva,

                "titular":
                    f"{reserva.nombre_contacto} {reserva.apellido_contacto}",

                "documento":
                    f"{reserva.tipo_documento} {reserva.numero_documento}",

                "telefono":
                    reserva.telefono_contacto,


                "habitacion": {

                    "id":
                        reserva.habitacion.id,

                    "numero":
                        reserva.habitacion.numero,

                    "tipo":
                        reserva.habitacion.tipo_habitacion.nombre
                },


                "check_in_previsto":
                    reserva.check_in_previsto,


                "check_out_previsto":
                    reserva.check_out_previsto,


                "adultos":
                    reserva.adultos,


                "menores":
                    reserva.menores,


                "total_estimado":
                    reserva.total_estimado
            }
        )


    return resultado

@router.get("/huespedes/buscar")
def buscar_huespedes(
    texto: str = None,
    documento: str = None,
    db: Session = Depends(get_db)
):

    query = db.query(Huesped)


    if texto:

        query = query.filter(
            or_(
                Huesped.nombre.like(
                    f"%{texto}%"
                ),
                Huesped.apellido.like(
                    f"%{texto}%"
                )
            )
        )


    if documento:

        query = query.filter(
            Huesped.numero_documento.like(
                f"%{documento}%"
            )
        )


    huespedes = (
        query
        .order_by(
            Huesped.apellido,
            Huesped.nombre
        )
        .limit(20)
        .all()
    )


    return [
        {
            "id": h.id,
            "tipo_documento": h.tipo_documento,
            "numero_documento": h.numero_documento,
            "nombre": h.nombre,
            "apellido": h.apellido,
            "telefono": h.telefono
        }
        for h in huespedes
    ]





# =====================================================
# CREAR HUÉSPED
# =====================================================

@router.post("/huespedes")
def crear_huesped(
    data: dict,
    db: Session = Depends(get_db)
):

    numero_documento = data.get(
        "numero_documento"
    )


    if not numero_documento:
        raise HTTPException(
            status_code=400,
            detail="Debe indicar el número de documento"
        )


    existe = (
        db.query(Huesped)
        .filter(
            Huesped.numero_documento ==
            numero_documento
        )
        .first()
    )


    if existe:
        raise HTTPException(
            status_code=400,
            detail="Ya existe un huésped con ese documento"
        )


    huesped = Huesped(
        tipo_documento=data.get(
            "tipo_documento"
        ),
        numero_documento=numero_documento,
        nombre=data.get(
            "nombre"
        ),
        apellido=data.get(
            "apellido"
        ),
        telefono=data.get(
            "telefono"
        ),
        email=data.get(
            "email"
        ),
        nacionalidad=data.get(
            "nacionalidad"
        )
    )


    db.add(huesped)

    db.commit()

    db.refresh(huesped)


    return {
        "mensaje":
            "Huésped creado correctamente",

        "huesped_id":
            huesped.id
    }



# =====================================================
# OBTENER CHECK-IN COMPLETO
# SIEMPRE AL FINAL
# =====================================================

@router.get("/{checkin_id}")
def obtener_checkin(
    checkin_id: int,
    db: Session = Depends(get_db)
):

    checkin = (
        db.query(Checkin)
        .filter(
            Checkin.id == checkin_id
        )
        .first()
    )


    if not checkin:
        raise HTTPException(
            status_code=404,
            detail="Check-in no encontrado"
        )


    reserva = checkin.reserva

    habitacion = reserva.habitacion


    huespedes = []


    for registro in checkin.checkin_huespedes:

        huespedes.append(
            {
                "id":
                    registro.huesped.id,

                "tipo_documento":
                    registro.huesped.tipo_documento,

                "numero_documento":
                    registro.huesped.numero_documento,

                "nombre":
                    registro.huesped.nombre,

                "apellido":
                    registro.huesped.apellido,

                "telefono":
                    registro.huesped.telefono,

                "observaciones":
                    registro.observaciones
            }
        )



    return {

        "checkin": {

            "id":
                checkin.id,

            "fecha_checkin":
                checkin.fecha_checkin,

            "estado":
                checkin.estado,

            "observaciones":
                checkin.observaciones
        },


        "reserva": {

            "id":
                reserva.id,

            "codigo_reserva":
                reserva.codigo_reserva,

            "check_in_previsto":
                reserva.check_in_previsto,

            "check_out_previsto":
                reserva.check_out_previsto,

            "adultos":
                reserva.adultos,

            "menores":
                reserva.menores
        },


        "habitacion": {

            "id":
                habitacion.id,

            "numero":
                habitacion.numero,

            "estado":
                habitacion.estado
        },


        "huespedes":
            huespedes

    }



# =====================================================
# LISTAR HUÉSPEDES DEL CHECK-IN
# =====================================================

@router.get("/{checkin_id}/huespedes")
def listar_huespedes_checkin(
    checkin_id: int,
    db: Session = Depends(get_db)
):

    huespedes = (
        db.query(Huesped)
        .join(
            CheckinHuesped,
            CheckinHuesped.huesped_id == Huesped.id
        )
        .filter(
            CheckinHuesped.checkin_id == checkin_id
        )
        .all()
    )


    return [

        {
            "id": h.id,
            "tipo_documento": h.tipo_documento,
            "numero_documento": h.numero_documento,
            "nombre": h.nombre,
            "apellido": h.apellido
        }

        for h in huespedes

    ]

