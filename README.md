# API de Express para Marathon y Valorant

Esta es una API robusta construida con **Express.js** y **TypeScript**, diseñada para gestionar y servir datos específicos de los videojuegos **Marathon** y **Valorant**. La API está optimizada para ser desplegada en **Vercel** y utiliza **Drizzle ORM** para la interacción con una base de datos **PostgreSQL**.

## 🚀 Listado de Funcionalidades Esenciales

- **Gestión de Datos de Juegos**: Proporciona endpoints detallados para consultar información sobre personajes (Runners/Agents), armas, habilidades, mapas y objetos.
- **Arquitectura Escalable**: Estructura organizada en Rutas, Controladores y Modelos (Esquemas) para facilitar el mantenimiento.
- **Autenticación mediante API Key**: Algunos endpoints sensibles (como la creación de registros) están protegidos por middleware de clave de API.
- **Soporte de Imágenes**: Servidor de archivos estáticos configurado para servir iconos y recursos visuales de los juegos.
- **CORS Configurado**: Permite peticiones desde dominios específicos de desarrollo y despliegues en Vercel.

## 🛠️ Justificación de las Tecnologías

- **Express.js**: Elegido por su ligereza y flexibilidad para construir APIs minimalistas pero potentes.
- **TypeScript**: Añade tipado estático al proyecto, reduciendo errores en tiempo de ejecución y mejorando la experiencia de desarrollo (DX).
- **Drizzle ORM**: Se utiliza por su enfoque "TypeScript-first", permitiendo definir esquemas que se traducen directamente a tipos de TypeScript, con un rendimiento superior y consultas SQL más naturales.
- **PostgreSQL**: Base de datos relacional robusta ideal para manejar las relaciones complejas entre agentes, habilidades y roles.
- **Vercel**: Plataforma de despliegue que ofrece una integración perfecta con Express, escalabilidad automática y excelente rendimiento para aplicaciones serverless.

## 📊 Descripción de los Modelos (Drizzle ORM)

El proyecto utiliza **Drizzle ORM** para definir la estructura de la base de datos PostgreSQL. A continuación se describen los modelos principales:

### Marathon
- **Runners**: Representa a los personajes jugables. Contiene nombre, descripción, modelo e icono.
- **Factions**: Diferentes facciones del juego con sus roles y descripciones.
- **Abilities**: Habilidades asociadas a cada Runner (Primaria, Táctica, Pasiva).
- **Weapons**: Estadísticas de armas incluyendo daño (cabeza, cuerpo, piernas), cadencia y cargador.
- **Maps**: Información de los mapas disponibles.
- **Loot**: Objetos de botín con niveles de rareza (Standard, Enhanced, Contraband, etc.).
- **Consumables**: Objetos consumibles categorizados (Médicos, Escudos, Supervivencia).

### Valorant
- **Agents**: Los agentes del juego, vinculados a sus respectivos roles y números de agente.
- **Roles**: Categorías de agentes (Duelista, Centinela, Controlador, Iniciador).
- **Abilities**: Las 4 habilidades características de cada agente.
- **Weapons**: Catálogo completo de armas con estadísticas de daño y manejo.
- **Maps**: Mapas del juego con información sobre los sitios de la bomba (Spike Sites).

## 🔌 Rutas de la API (Endpoints)

### Valorant
- `GET /api/valorant/agents`: Obtiene todos los agentes.
- `GET /api/valorant/maps`: Obtiene todos los mapas.
- `GET /api/valorant/weapons`: Obtiene todas las armas.
- `GET /api/valorant/roles`: Obtiene los roles de los agentes.
- `GET /api/valorant/abilities`: Obtiene todas las habilidades.

### Marathon
- `GET /api/marathon/runners`: Obtiene todos los corredores.
- `POST /api/marathon/runners`: Crea un nuevo corredor (Requiere API Key).
- `GET /api/marathon/weapons`: Obtiene todas las armas.
- `GET /api/marathon/factions`: Obtiene las facciones.
- `GET /api/marathon/abilities`: Obtiene las habilidades.
- `GET /api/marathon/maps`: Obtiene los mapas.
- `GET /api/marathon/loot`: Obtiene los objetos de botín.
- `GET /api/marathon/consumables`: Obtiene los consumibles.

> [!NOTE]
> Los métodos `POST` requieren una cabecera `x-api-key` para la autorización.

## ⚙️ Configuración del Proyecto

1. **Instalar dependencias**:
   ```bash
   npm install
   ```
2. **Variables de entorno**: Crea un archivo `.env` basado en `.env.local` con tu `DATABASE_URL` y `API_KEY`.
3. **Ejecutar en desarrollo**:
   ```bash
   npm run dev
   ```
