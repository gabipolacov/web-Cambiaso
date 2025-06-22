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
- **Manejo de Stock:** Permite al usuario cargar stock, y reduce el stock cuando un producto es comprado. Si el producto no tiene más stock, es eliminado.
- **Sistema de Pago:** Guarda los datos de pago de un usuario y permite editar datos de pago.

---

## Flujo del proyecto (estructura y funciones por archivo)

### Proyecto raíz
- **index.html** → Página principal donde se muestran los productos, buscador y filtros.
- **carrito.html** → Muestra los productos agregados al carrito y permite avanzar al pago.
- **detalle.html** → Muestra el detalle completo de un producto individual.
- **contacto.html** → Página de formulario de contacto.
- **venta.html** → Formulario para que usuarios carguen un producto a la plataforma.
- **pago.html** → Página con el formulario de pago.
- **tarjetaPago.html** → Página donde se muestran los datos de tarjeta para finalizar el pago.

---

### `scripts/` – Archivos JS del proyecto
- **index.js** → Lógica principal de la página de inicio: carga los productos desde Airtable, renderiza las tarjetas, implementa búsqueda y filtros, y maneja el carrito.
- **menu.js** → Maneja la apertura/cierre del menú responsive de navegación (hamburguesa).
- **carousel.js** → Controla el carrusel de imágenes promocionales.
- **details.js** → Recupera la ID del producto desde la URL, obtiene los datos desde Airtable y muestra la información detallada en `detalle.html`.
- **cart.js** → Lógica del carrito: muestra los productos añadidos, permite eliminarlos y muestra el total en `carrito.html`.
- **contact.js** → Lógica del formulario de contacto.
- **sellform.js** → Maneja el formulario de venta (`venta.html`), permite subir un producto nuevo a Airtable.
- **pay.js** → Lógica del formulario de pago, se puede editar el formulario (`pago.html`).
- **paycard.js** → Lógica para la tarjeta con los detalles de pago `tarjetaPago.html`.

---

### `style/` – Hojas de estilo CSS
- **style.css** → Estilos generales compartidos por todas las páginas.
- **cart.css** → Estilos particulares de la página del carrito.
- **details.css** → Estilos para la vista de detalle del producto.
- **pay-card.css** → Estilos para la pantalla de la tarjeta con detalles de pago (`tarjetaPago.html`).

---

### `imagenes/` – Imágenes de productos y banners
Contiene imágenes que se usan en las tarjetas de productos, carrusel, banners promocionales, etc.

### `iconos/` – Íconos para la interfaz
Íconos de redes sociales, ícono de la pestaña, etc.

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
     
7. **Pago:**  
   - Al hacer click en pagar, se muestra un formulario en donde se cargan todos los datos para cargar en la tabla de Payments de Airtable.
   - Al confirmar los datos, se muestra un tarjeta con todos los datos, el usuario puede editar los datos volviendo al formulario.
   - Al pagar, si el producto tiene stock se disminuye el valor del campo en la tabla productos.
   - Al pagar, si el producto no tiene stock, se elimina de la tabla productos y no se mostrará más en el .gallery de index.

8. **Contacto:**
   - El usuario puede enviar comentarios y se guardarán en la tabla messages de Airtable.

9. **Venta:**
   - Hay un formulario que se puede llenar con las caracterísicas de un producto. El producto se guarda en Airtable y es mostrado en el index.
---

## Tablas en Airtable

- Tabla products para guardar los productos con sus características.
- Tabla messages para guardar los comentarios de los usuarios.
- Tabla payments para guardar los pagos de cada compra.


---

## Posibles mejoras para lo próxima versión

- Ajustar el carrusel de promociones en la página.
- Implementar la búsqueda dinámica mientras se escribe en input o se aplican filtros.

