import React, { Fragment, useEffect, useState } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Actions de Redux
import { obtenerProductosAction } from '../actions/productoActions';

// Componentes
import Producto from './Producto';

const Productos = () => {

  // Acceder al state de la app
  const productos = useSelector(state => state.productos.productos);

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
          {productos.length === 0
            ?
              "No hay productos."
            :
              (productos.map(producto => (
                <Producto
                  key={producto.id}
                  producto={producto}
                />
              )))
          }
        </tbody>
      </table>
    </Fragment>
  );
}

export default Productos; 