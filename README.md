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

El grupo está compuesto por 3 integrantes, por lo que se definieron las 4 Features requeridas por la consigna.

| # | Feature | Estado actual |
|---|---|---|
| 1 | Consultar pedidos asignados | Implementada con datos estáticos y componentes reutilizables |
| 2 | Consultar el mapa y la ruta de entrega | En desarrollo - pantalla inicial creada |
| 3 | Consultar el historial de entregas | En desarrollo - pantalla inicial creada |
| 4 | Confirmar el resultado de una entrega | Pendiente |

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
│   │   ├── pedidos.tsx
│   │   ├── mapa.tsx
│   │   └── historial.tsx
│   └── components/
│       ├── MenuButton.tsx
│       └── PedidoCard.tsx
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

Esta entrega utiliza información estática. Las Features se completarán progresivamente a medida que se incorporen nuevos contenidos durante la cursada.

