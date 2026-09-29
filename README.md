# SalusApp Mobile - Vita Biosa

Aplicación móvil desarrollada como Proyecto ABP para la materia Aplicación Móvil. El proyecto toma como base el sistema logístico de Salus Aequitas / Vita Biosa y adapta sus principales funcionalidades a una experiencia pensada para dispositivos móviles.

## Problemática

La gestión logística requiere consultar pedidos, entregas, recorridos y estados desde distintos lugares. SalusApp Mobile busca facilitar el acceso del repartidor a esa información, disminuyendo la dependencia de registros manuales y comunicaciones informales.

## Objetivo

Brindar al repartidor una herramienta móvil que le permita consultar sus pedidos asignados, visualizar recorridos, revisar entregas anteriores y confirmar el resultado de una entrega.

## Integrantes

- Tomás Baldironi
- Danilo Bustamante
- Máximo Zurschmitten

## Features del proyecto

El grupo está compuesto por 3 integrantes, por lo que se definieron las 4 Features requeridas por la consigna. La app se conecta al backend real del proyecto de tesis.

| # | Feature | Estado actual |
|---|---|---|
| 1 | Consultar pedidos asignados |Implementada — datos reales desde el backend, filtrados por pendientes |
| 2 | Consultar el mapa y la ruta de entrega |  Pendiente |
| 3 | Consultar el historial de entregas |Implementada - entregas ya confirmadas, con su resultado real (completo / parcial / fallido) |
| 4 | Confirmar el resultado de una entrega |  Implementada — y refleja el cambio en pedidos e historial |


## Avance de la Unidad I

La primera versión incluye:

- pantalla principal relacionada con la temática elegida;
- uso de `View`, `Text`, `Image` y `ScrollView`;
- imagen local almacenada en `assets/images`;
- datos estáticos para representar pedidos;
- componentes reutilizables `MenuButton` y `PedidoCard`;
- comunicación entre componentes mediante `props`;
- navegación inicial mediante Expo Router.

La imagen principal se implementó en `src/app/index.tsx` utilizando el componente `Image` de React Native y una ruta local con `require()`.

## Tecnologías

- React Native
- Expo SDK 57
- Expo Router
- TypeScript
- Android Studio / Android Emulator
- Visual Studio Code
- Git y GitHub

## Estructura principal

```text
SalusApp-Mobile/
├── assets/
│   └── images/
│       └── logo-vitabiosa.png
├── src/
│   ├── app/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   ├── login.tsx
│   │   ├── pedidos.tsx
│   │   ├── confirmar.tsx
│   │   ├── mapa.tsx
│   │   └── historial.tsx
│   ├── components/
│   │   ├── MenuButton.tsx
│   │   └── PedidoCard.tsx
│   ├── constants/
│   │   └── api.ts
│   └── services/
│       └── auth.ts
├── app.json
├── package.json
└── README.md
```

## Ejecución

Instalar las dependencias:

```bash
npm install
```

Iniciar Expo:

```bash
npx expo start
```

Con el emulador de Android encendido, presionar `a` en la terminal de Expo.

## Desarrollo incremental

Esta entrega conecta la app al backend real del sistema (login, pedidos, historial y confirmación de entregas). Queda pendiente la feature de mapa y ruta de entrega, que se incorporará en la próxima etapa.

