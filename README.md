# Prueba técnica Junior Fullstack

Construye una aplicación sencilla para administrar un catálogo de productos. La
solución debe incluir una API REST en Django y una interfaz web que la consuma.

**Tiempo estimado de desarrollo:** 90 minutos.

Este tiempo es una referencia para dimensionar el alcance y no un límite de
ejecución. Se recomienda priorizar una solución simple, funcional y clara.

## Alcance

### API

La API debe permitir:

- Listar productos y consultar uno por su ID.
- Crear, editar y eliminar productos.
- Filtrar productos por categoría.
- Buscar productos por nombre.

Una **categoría** debe contener:
- nombre


Un **producto** debe contener:
- nombre
- descripción
- precio
- stock
- categoría
- fecha de creación

### Interfaz web

La interfaz debe permitir, como mínimo:

- Visualizar el listado de productos.
- Crear un producto mediante un formulario.
- Filtrar o buscar productos.

Puedes utilizar Next.js u otro framework basado en React. La elección queda a tu
criterio y debe ser adecuada al alcance de la solución.

## Reglas

- El backend debe utilizar Django y Django REST Framework.
- La base de datos debe ser SQLite.
- El nombre de cada categoría debe ser único.
- Nombre, precio, stock y categoría son obligatorios.
- El precio debe ser mayor o igual a cero.
- El stock debe ser un entero mayor o igual a cero.
- La categoría asociada debe existir.
- Los errores de validación deben devolver una respuesta HTTP apropiada y comprensible.

No se requiere autenticación, carrito de compras, órdenes, pagos ni despliegue.

## Entregables

- API e interfaz web funcionales.
- Migraciones de base de datos.
- Al menos dos pruebas automatizadas: creación correcta de un producto y rechazo
  de datos inválidos.
- Instrucciones completas para ejecutar el proyecto.

La organización de endpoints y la elección de herramientas adicionales quedan a
criterio del postulante.

## Uso de herramientas de IA

Puedes utilizar herramientas de IA como apoyo. Si lo haces, indícalo brevemente
en tus anotaciones junto con el propósito para el que las utilizaste. Debes
comprender todo el código presentado; estas herramientas no reemplazan el dominio
de la solución.

## Proceso de entrega

Realiza un fork de este repositorio y desarrolla allí tu solución. Al finalizar,
comparte el enlace público al fork según las instrucciones recibidas.

El plazo para enviar la solución es de **cinco días corridos** desde la recepción
de la prueba. Una vez vencido ese plazo, no se recibirán nuevas entregas.

## Criterios de evaluación

- Cumplimiento de los requisitos y funcionamiento de los endpoints.
- Uso adecuado de modelos, serializers y vistas.
- Integración entre la interfaz y la API.
- Elección de herramientas acorde con el alcance solicitado.
- Claridad, organización y comprensión del código.
- Calidad de las validaciones, pruebas y documentación.

---

## Anotaciones del postulante

Completa este espacio antes de entregar tu solución.

### Instrucciones de ejecución

Indica los comandos necesarios para instalar las dependencias, configurar la base
de datos, ejecutar el backend, ejecutar la interfaz y correr las pruebas. La
solución debe poder levantarse siguiendo únicamente estas instrucciones.

----------------------------------------------

## Configuración del backend django

- Ir al directorio del backend, crear y activar un entorno virtual:
```bash
1. cd backend
2. python -m venv venv
3. .\venv\Scripts\activate (en windows) | source venv/vin/activate (en Mac/Linux)
```

- Instalar dependencias:
```bash
pip install -r requirements.txt
```

- Ejecutar migraciones para inicializar base de datos SQLite:
```bash
python manage.py migrate
```

- Poblar base de datos con datos de prueba:
```bash
python manage.py loaddata productos_seed
```

- Inicio del servidor del backend:
```bash
python manage.py runserver
```

## Pruebas automatizadas

- Dentro del directorio backend, ejecutar tests con:
```bash
python manage.py test
```

Los tests se encuentran en el archivo *backend/catalog/tests.py*

## Configuración del Frontend next.js

- Ir al directorio del frontend e instalar los paquetes de Node.js:
```bash
1. cd frontend
2. npm install
```

- Iniciar el servidor de desarrollo del frontend
```bash
npm run dev
```

En este caso la interfaz está en `http://localhost:3000`

### Decisiones y observaciones

Describe brevemente cualquier decisión técnica relevante, supuesto, limitación o
mejora pendiente.

---------------------------

El proyecto fue desarrollado utilizando Python 3.14.6 y Node.js v24.20.0. 
Para el set up del proyecto se utilizaron los comandos:

*Backend*
```bash
pip install django djangorestframework django-cors-headers
django-admin startproject core .
```

*Frontend*
```Bash
npx create-next-app@latest frontend
```

Con esto quedó inicializada la estructura de archivos base para el backend DRF y frontend Next.js.

La interfaz de la plataforma es bien simple solamente entrega lo solicitado, se podría mejorar
agregando un sistema de paginación pero como esta prueba no tiene muchos datos en la base se 
consideró que no era necesario.

Para priorizar el desarrollo de las funcionalidades se decidió utilizar Tailwind CSS 
en lugar de crear y configurar archivos de estilos aparte.

### Herramientas de IA utilizadas

Si utilizaste herramientas de IA, indica cuáles y para qué. Si no utilizaste
ninguna, indícalo también.

-----------------------------------------------------------

Se consultó al asistente Gemini de google para resolver dudas respecto a la estructura y el desarrollo
de la solución, en particular se dejó a Gemini el diseño de estilos de la interfaz para poder dar
prioridad al resto del desarrollo.
