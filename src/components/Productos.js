import React, { Fragment, useEffect } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Actions de Redux
import { obtenerProductosAction } from '../actions/productoActions';

// Componentes
import Producto from './Producto';

const Productos = () => {

  // Acceder al state de la app
  const productos = useSelector(state => state.productos.productos);
  const error = useSelector(state => state.productos.error);
  const cargando = useSelector(state => state.productos.loading);

  // Utilizar useDispatch y te crea una función
  const dispatch = useDispatch();

  // Cargar productos al mostrar el componente
  useEffect(() => {
    // Consultar API
    // Mandar a llamar el action de obtener productos
    const obtenerProductos = () => dispatch(obtenerProductosAction());
    obtenerProductos();
    // eslint-disable-next-line
  }, [])  

  return ( 
    <Fragment>
      <h2 className="text-center my-5">Listado de Productos</h2>

      { error 
        ?
          <p className="font-weight-bold alert alert-danger text-center mt-4">
            Hubo un error
          </p>
        : null
      }

      { cargando ? <p className="text-center">Cargando...</p> : null }

      <table className="table table-striped">
        <thead className="bg-primary table-dark">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        
        <tbody>
          { productos.length === 0
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