import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  COMENZAR_DESCARGA_PRODUCTOS,
  DESCARGA_PRODUCTOS_EXITO,
  DESCARGA_PRODUCTOS_ERROR,
  OBTENER_PRODUCTO_ELIMINAR,
  PRODUCTO_ELIMINAR_EXITO,
  PRODUCTO_ELIMINAR_ERROR,
  OBTENER_PRODUCTO_EDITAR,
  PRODUCTO_EDITAR,
  PRODUCTO_EDITAR_EXITO,
  PRODUCTO_EDITAR_ERROR
} from '../types';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

// Crear nuevos productos
export function crearNuevoProductoAction(producto) {
  return async (dispatch) => {
    dispatch( agregarProducto() );

    try {
      // Insertar en la API
      await clienteAxios.post('/productos', producto);

      // Si todo sale bien, actualizar el state
      dispatch( agregarProductoExito(producto) );

      // Alerta
      Swal.fire(
        'Correcto', 
        'El producto se agregó correctamente',
        'success'
      );
    } catch (error) {
      // si hay un error cambiar el state
      dispatch( agregarProductoError(true) );

      // alerta de error
      Swal.fire({
        icon: 'error',
        title: 'Hubo un error',
        text: 'Hubo un error, intenta de nuevo'
      });
    }
  }
}

const agregarProducto = () => ({
  type: AGREGAR_PRODUCTO,
  payload: true
});

// Si el producto se agregó exitosamente
const agregarProductoExito = producto => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto
});

// Si hubo un error
const agregarProductoError = estado => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: estado
});

// Función que descarga los productos de la base de datos
export function obtenerProductosAction() {
  return async (dispatch) => {
    dispatch( descargarProductos() );

    try {
      // Obteniendo productos de la API
      const respuesta = await clienteAxios.get('/productos');

      // Si todo sale bien, agregar al state de la app
      dispatch( descargarProductosExito(respuesta.data) );      
    } catch (error) {
      // Si hay error
      dispatch( descargarProductosError(true) );
    }
  }
}

const descargarProductos = () => ({
  type: COMENZAR_DESCARGA_PRODUCTOS,
  payload: true
});

const descargarProductosExito = productos => ({
  type: DESCARGA_PRODUCTOS_EXITO,
  payload: productos
});

const descargarProductosError = estado => ({
  type: DESCARGA_PRODUCTOS_ERROR,
  payload: estado
});

// Selecciona y elimina el producto
export function borrarProductoAction(id) {
  return async (dispatch) => {
    dispatch( obtenerProductoEliminar(id) );

    try {
      await clienteAxios.delete(`/productos/${id}`);
      dispatch( eliminarProductoExito() );

      // Si se elimina, mostrar alerta
      Swal.fire(
        'Eliminado',
        'El producto se eliminó correctamente',
        'success'
      );      
    } catch (error) {
      dispatch( eliminarProductoError(true) );
    }
  }
}

const obtenerProductoEliminar = id => ({
  type: OBTENER_PRODUCTO_ELIMINAR,
  payload: id
});

const eliminarProductoExito = () => ({
  type: PRODUCTO_ELIMINAR_EXITO,
});

const eliminarProductoError = estado => ({
  type: PRODUCTO_ELIMINAR_ERROR,
  payload: estado
});

// Seleccionar producto a editar
export function obtenerProductoEditar(producto) {
  return (dispatch) => {
    dispatch( obtenerProductoEditarAction(producto) );
  }
}

const obtenerProductoEditarAction = producto => ({
  type: OBTENER_PRODUCTO_EDITAR,
  payload: producto
});

// Editar producto
export function editarProductoAction(producto) {
  return async (dispatch) => {
    // Actualizando state
    dispatch( editarProducto() );

    try {
      // Enviando petición a la API
      const resultado = await clienteAxios.put(
        `/productos/${producto.id}`,
        producto
      );
      dispatch( editarProductoExito(producto) );

    } catch (error) {
      dispatch( editarProductoError(true) );
    }
  }
}

const editarProducto = () => ({
  type: PRODUCTO_EDITAR,
  payload: true
});

// Si el producto se agregó exitosamente
const editarProductoExito = producto => ({
  type: PRODUCTO_EDITAR_EXITO,
  payload: producto
});

// Si hubo un error
const editarProductoError = estado => ({
  type: PRODUCTO_EDITAR_ERROR,
  payload: estado
});