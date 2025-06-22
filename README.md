# Proyecto Cambiaso - Catálogo de Productos

## Descripción

Cambiaso es un catálogo online para mostrar productos usados y nuevos, con funcionalidades para buscar, filtrar por categoría y precio, y agregar productos a un carrito de compras.

El frontend está construido con HTML, CSS y JavaScript puro. Los productos se almacenan y recuperan desde una base de datos Airtable vía API.

---

## Tecnologías

- HTML5, CSS
- JavaScript
- API Airtable para gestión de productos
- LocalStorage para almacenar el carrito de compras
- SweetAlert2 para notificaciones

---

## Funcionalidades principales

- **Carga dinámica de productos:** Se obtienen los productos desde Airtable y se renderizan tarjetas con imagen, nombre, precio y botón para agregar al carrito.
- **Búsqueda en tiempo real:** El usuario puede buscar productos por nombre, y la lista se actualiza automáticamente mientras escribe.
- **Filtros por categoría y precio:** Se pueden seleccionar categorías y rangos mínimos y máximos de precio para filtrar los productos.
- **Carrito de compras:** Los productos se pueden agregar al carrito que se guarda en el LocalStorage.
- **Limpieza de filtros:** Permite resetear todos los filtros para ver todos los productos.
- **Manejo de Stock:** Permite al usuario cargar stock, y reduce el stock cuando un producto es comprado.
- **Sistema de Pago:** Guarda los datos de pago de un usuario y permite editar datos de pago.

---

## Estructura del proyecto

- `index.html`: Página principal con el catálogo, barra de búsqueda y filtros.
- `style/style.css`: Estilos de la página.
- `scripts/index.js`: Lógica principal, carga de productos, filtros y carrito.
- `scripts/menu.js`: Lógica para menú responsive.
- `scripts/carousel.js`: Carrusel de imágenes promocionales.
- `imagenes/`: Carpeta con imágenes predeterminadas.
- `iconos/`: Carpeta con íconos.
- 

---

## Flujo del proyecto

1. **Carga inicial:**
   - Al cargar la página, se ejecuta la función `fetchProducts()`.
   - Esta función hace una petición GET a la API de Airtable para obtener los productos.
   - Los productos recibidos se almacenan en la variable global `productsList`.
   - Se crean las tarjetas de productos y se muestran en la sección `.gallery`.

2. **Búsqueda y filtros:**
   - Existen inputs para texto, selección de categoría, precio mínimo y máximo.
   - Cada vez que el usuario escribe o cambia alguno de estos filtros, se ejecuta la función `filterProducts()`.
   - Esta función filtra `productsList` según los criterios seleccionados y actualiza la visualización.
   - Si no hay resultados, muestra un mensaje indicándolo.
  
3. **Limpiar filtros:**
   - Hay un botón para limpiar filtros que resetea los inputs y muestra todos los productos.

4. **Agregar productos al carrito:**
   - Cada tarjeta tiene un botón para agregar el producto al carrito.
   - El carrito se guarda en `localStorage` para persistir entre recargas.
   - Si el producto ya está en el carrito, se incrementa la cantidad.

5. **Detalle de Producto:**
   - Al hacer click en una tarjeta de producto, se muestra una tarjeta con detalles del producto seleccionado.
   - El usuario puede agregar productos al carrito desde esta pantalla también.
  
6. **Carrito de Compras:**
   - En el carrito de compras, el usuario puede aumentar la cantidad de un producto o disminuirla segun el stock diponible.
   - Se muestra el subtotal de cada roducto y el total en la tarjaeta de Detalle de compra.
     
6. **Pago:**  
  - Al hacer click en pagar, se muestra un formulario en donde se cargan todos los datos para cargar en la tabla de Payments de Airtable.
  - Al confirmar los datos, se muestra un tarjeta con todos los datos, el usuario puede editar los datos volviendo al formulario.
  - Al pagar, si el producto tiene stock se disminuye el valor del campo en la tabla productos.
  - Al pagar, si el producto no tiene stock, se elimina de la tabla productos y no se mostrará más en el .gallery de index.

7. **Contacto:**
   - El usuario puede enviar comentarios y se guardarán en la tabla messages de Airtable.

8. **Venta:**
   - Hay un formulario que se puede llenar con las caracterísicas de un producto. El producto se guarda en Airtable y es mostrado en el index.
---

## Posibles mejoras para lo próxima versión

- Ajustar el carrusel de promociones en la página
- Implementar la búsqueda dinámica mientras se escribe en input o se aplican filtros

