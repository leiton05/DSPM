# 📱 Desarrollo de Software para Plataformas Móviles

Repositorio correspondiente a la asignatura **Desarrollo de Software para Plataformas Móviles**, donde se exploran diferentes enfoques y tecnologías para el desarrollo de aplicaciones orientadas a dispositivos móviles.

Durante el curso se trabajará con diferentes formas de llevar una aplicación al entorno móvil, incluyendo el desarrollo de **Progressive Web Apps (PWA)**, aplicaciones **híbridas** y otras alternativas para la construcción de software multiplataforma.

## 👨‍💻 Autor

**Sebastian Leiton Goyes**
Estudiante de **Ingeniería Informática**
[Universidad Autónoma de Occidente](https://www.uao.edu.co/)

## 🚀 Tecnologías

- **React** — Desarrollo de interfaces y aplicaciones web.
- **Ionic** — Desarrollo de aplicaciones multiplataforma y componentes para interfaces móviles.
- **PWA** — Desarrollo de aplicaciones web progresivas.
- **JavaScript / TypeScript** — Lenguajes utilizados durante el desarrollo.
- **HTML5 & CSS3** — Estructura y estilos de las aplicaciones.
- **Git & GitHub** — Control de versiones y gestión del repositorio.

## 📚 Contenido

En este repositorio se almacenarán los diferentes ejercicios, prácticas y proyectos desarrollados durante la asignatura, explorando conceptos como:

- Desarrollo de aplicaciones móviles híbridas.
- Progressive Web Apps (PWA).
- Desarrollo multiplataforma.
- Interfaces adaptadas a dispositivos móviles.
- Integración de React con Ionic.
- Uso de APIs y servicios externos.
- Arquitectura y buenas prácticas para aplicaciones móviles.

## 🎯 Objetivo

Aprender y aplicar diferentes estrategias para el desarrollo de software destinado a plataformas móviles, comprendiendo las ventajas y características de cada enfoque y utilizando tecnologías modernas como **React e Ionic**.

## ⚡ Ejecutar Kitty-Tasks

La aplicación utiliza **Ionic React** con **React Router** y Vite.

```bash
npm install
npm run dev
```

Para comprobar la compilación de producción:

```bash
npm run build
```

### Configurar Firebase Authentication

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/) y registra una aplicación web.
2. En **Authentication → Sign-in method**, habilita el proveedor **Correo electrónico/Contraseña**.
3. Copia `.env.example` como `.env.local` y completa sus variables con la configuración de la aplicación web de Firebase.
4. Reinicia el servidor de desarrollo después de guardar `.env.local`.

La inicialización de Firebase y las operaciones de autenticación están en `src/firebase/`. No guardes credenciales de servicio ni archivos privados en el cliente. La configuración web de Firebase se publica en el bundle; protege tus datos con Firebase Security Rules y las restricciones de tu proyecto.

---

> 🎓 **Ingeniería Informática · Universidad Autónoma de Occidente**
>
> 📱 **Desarrollo de Software para Plataformas Móviles**
