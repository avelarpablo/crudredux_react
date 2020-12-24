import React, { useState, useEffect } from 'react';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { editarProductoAction } from '../actions/productoActions';

const EditarProducto = ({ history }) => {

  // State para producto
  const [producto, guardarProducto] = useState({
    nombre: '',
    precio: ''
  });

  // Accediendo a state de la app
  const productoeditar = useSelector(state => state.productos.productoeditar);

  // const history = useHistory();

  // Utilizar useDispatch y te crea una función
  const dispatch = useDispatch();

  // Función para llenar el state automáticamente
  useEffect(() => {
    // Si es vacío
    if(!productoeditar) {
      history.push('/');
    }
    guardarProducto(productoeditar);
    // eslint-disable-next-line
  }, [productoeditar])

  // Función para enviar el action de editar producto
  const editarProducto = producto => dispatch(editarProductoAction(producto));

  // Extrayendo atributos de producto
  const { nombre, precio } = producto;

  // Función para manejar el evento onChange del formulario
  const onChangeFormulario = e => {
    guardarProducto({
      ...producto,
      [e.target.name]: e.target.value
    })

  }

  // Función para enviar el formulario
  const submitEditarProducto = e => {
    e.preventDefault();

    editarProducto(producto);

    history.push('/');
  }

  return ( 
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Editar Producto
            </h2>

            <form
              onSubmit={submitEditarProducto}
            >
              <div className="form-group">
                <label>Nombre Producto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre Producto"
                  name="nombre"
                  value={nombre}
                  onChange={onChangeFormulario}
                />
              </div>

              <div className="form-group">
                <label>Precio Producto</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio Producto"
                  name="precio"
                  value={precio}
                  onChange={onChangeFormulario}
                />
              </div>

                <button 
                  type="submit"
                  className="btn btn-primary font-weight-bold 
                    text-uppercase d-block w-100"
                >Guardar Cambios</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditarProducto; 