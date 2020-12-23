import React, { Fragment, useEffect } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Actions de Redux
import { obtenerProductosAction } from '../actions/productoActions';

const Productos = () => {

  // Utilizar useDispatch y te crea una función
  const dispatch = useDispatch();

  // Cargar productos al mostrar el componente
  useEffect(() => {
    // Consultar API
    // Mandar a llamar el action de obtener productos
    const obtenerProductos = () => dispatch(obtenerProductosAction());
    obtenerProductos();
  }, [])  

  return ( 
    <Fragment>
      <h2 className="text-center my-5">Listado de Productos</h2>

      <table className="table table-striped">
        <thead className="bg-primary table-dark">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        
        <tbody>

        </tbody>
      </table>
    </Fragment>
  );
}

export default Productos; 