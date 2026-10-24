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

1. **Consultar pedidos asignados**: pestaña "Pendientes" de la pantalla "Mis envíos". Muestra los envíos pendientes del repartidor con datos reales del backend, con un icono y un color según el estado. Al tocar una tarjeta se abre la confirmación de la entrega.
2. **Consultar el historial de entregas**: pestaña "Historial" de la misma pantalla. Muestra las entregas ya confirmadas con su resultado real (completo, parcial o fallido).
3. **Confirmar el resultado de una entrega**: se elige el resultado, se agregan observaciones y se envía al backend. Al volver, las listas se actualizan solas.

Además de las features de la consigna, se implementó:

- **Login con autenticación real** contra el backend, con JWT guardado de forma segura (`expo-secure-store`).
- **Sesión del usuario**: saludo con el nombre del repartidor y botón de cerrar sesión, que borra el token, vacía el estado global y el caché de consultas.
- **Navegación por pestañas** en "Mis envíos".


## Features pendientes

- **Consultar el mapa y la ruta de entrega** (feature 2 de la consigna): hoy existe la pantalla, pero sin el mapa.
- Contenidos de la materia que todavía se van a incorporar: tema centralizado (`ThemeProvider`), `SafeArea`, paginación de listas y tests (Jest + React Native Testing Library).


## Avance en la materia

- **Expo Router**: navegación tipo Stack (`push`, `back`, `replace`) y envío de datos entre pantallas con parámetros (`useLocalSearchParams`).
- **Componentes de React Native**: `View`, `Text`, `Image`, `TextInput`, `Pressable`, `TouchableOpacity`, `FlatList`, `ActivityIndicator` y `KeyboardAvoidingView`.
- **Estilos** con `StyleSheet` y listas de estilos condicionales.
- **Estado local** con `useState` (formularios y pestañas).
- **TanStack Query**: `useQuery`, `queryKey`, caché compartido entre pestañas y actualización al volver a una pantalla (`useFocusEffect`).
- **Zustand**: store global con el usuario de la sesión.
- **Hook propio** (`useEnvios`) para no repetir la lógica de consulta.
- **Íconos** con `@expo/vector-icons`.
- **Componentes reutilizables** (`MenuButton`, `PedidoCard`) y comunicación mediante `props`

## Tecnologías

- React Native
- Expo SDK 57
- Expo Router
- TypeScript
- TanStack Query
- Zustand
- Expo SecureStore
- Backend del proyecto de tesis: Node.js, Express y SQL Server (autenticación con JWT)
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
│   │   ├── envios.tsx
│   │   ├── confirmar.tsx
│   │   └── mapa.tsx
│   ├── components/
│   │   ├── MenuButton.tsx
│   │   ├── PedidoCard.tsx
│   │   ├── PendientesTab.tsx
│   │   └── HistorialTab.tsx
│   ├── constants/
│   │   └── api.ts
│   ├── hooks/
│   │   └── useEnvios.ts
│   ├── services/
│   │   └── auth.ts
│   └── store/
│       └── useSessionStore.ts
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

Esta entrega conecta la app al backend real del sistema: login, pedidos pendientes, historial y confirmación de entregas, con navegación por pestañas y estado de sesión. Queda pendiente la feature de mapa y ruta de entrega, además de los contenidos de la materia indicados en "Features pendientes", que se incorporarán en las próximas etapas.

