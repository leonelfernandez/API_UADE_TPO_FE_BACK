# 🎬 Netlist: Sitio de Recomendaciones de Películas (API)

La API permite:

- Buscar películas basadas en diferentes criterios, como género, actores, título, director, etc.
- Registrarse como usuarios y crear su propia cuenta.
- Crear y gestionar listas de películas que han visto, quieren ver o marcar como favoritas.

## Modelo de Datos

La aplicación contiene los siguientes modelos:

- **Usuario**: Puede realizar las siguientes acciones:
    - Crear y gestionar listas personalizadas de películas (vistas, para ver, favoritas, etc.).

- **Película**: Representa una película con información como título, género, director, actores, etc.

- **Lista**: Representa una colección de películas creada por un usuario. Los usuarios pueden tener varias listas para diferentes propósitos.

## Detalle de Endpoints

### AUTH:

- **POST /auth/login**

**Descripción**: 

Esta ruta maneja el inicio de sesión del usuario.


**POST /auth/register**

**Descripción**: 

Esta ruta maneja el registro de usuarios.


**PUT /auth/confirmation/**

**Descripción**: 

Esta ruta maneja la confirmación de la cuenta utilizando un token.


**POST /auth/sendResetPasswordEmail**

**Descripción**: 

Esta ruta envía un correo electrónico para restablecer la contraseña al usuario.

**GET /auth/reset/**

**Descripción**: Esta ruta otorga acceso para restablecer la contraseña utilizando un token.

**POST /auth/resetPassword**

**Descripción**: Esta ruta maneja el restablecimiento de la contraseña del usuario.

### LIST
**POST /list/create**

**Descripción**: Esta ruta crea una nueva lista para el usuario autenticado.

**POST /list/delete/**

**Descripción**: Esta ruta elimina una lista específica del usuario autenticado.

**GET /list/listInfo/**

**Descripción**: Esta ruta obtiene información de una lista específica de un usuario específico.

**POST /list/addFilm/**

**Descripción**: Esta ruta agrega una película a una lista específica del usuario autenticado.

**POST /list/toggleToWatch**

Descripción: Esta ruta cambia el estado de una película en la lista de "para ver" del usuario autenticado.

**POST /list/deleteFilm/**

Descripción: Esta ruta elimina una película de una lista específica del usuario autenticado.

### Movies

**GET /movie/popular**
Descripción: Esta ruta obtiene las películas populares.

**GET /movie/byId/**
Descripción: Esta ruta obtiene una película por su ID.

**GET /movie/genres**
Descripción: Esta ruta obtiene todos los géneros de películas.

**PUT /movie/search**
Descripción: Esta ruta busca películas por título, director o actor.

### User
**GET /user**

**Descripción**: Esta ruta obtiene la información del usuario autenticado.



## Comenzando

Para configurar la aplicación, debes cumplir con los siguientes requisitos previos:

- Node.js 18+

Para instalar y ejecutar la aplicación localmente, ejecuta los siguientes comandos:

```bash
git clone https://github.com/leonelfernandez/API_UADE_TPO_FE_BACK.git
cd API_UADE_TPO_FE_BACK
npm install
npm run dev
```

## Características Adicionales

Además de las funcionalidades básicas, el sitio puede incorporar las siguientes características adicionales para mejorar la usabilidad y la experiencia del usuario:
- Recuperación de contraseña a través del correo electrónico.
- Filtros de búsqueda avanzados (por ejemplo, por idioma, género, director, actores, etc.).
- Integración con una API externa de bases de datos de películas [(The Movie DB)](https://developer.themoviedb.org/docs/getting-started).


## Requisitos para el Desarrollo

- Este proyecto puede ser desarrollado por un máximo de dos miembros del equipo.
- La aplicación debe ser responsiva.
- Los criterios de evaluación son:
    - 40% por funcionalidad y adherencia a buenas prácticas.
    - 40% por usabilidad y experiencia del usuario.
    - 20% por documentación completa.
- El proyecto debe usar las siguientes tecnologías:
    - Frontend: HTML, CSS, React, JavaScript
    - Backend: Node.js
    - Base de datos: SQL (MySQL, PostgreSQL) o NoSQL (MongoDB)