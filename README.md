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

1. **Consultar pedidos asignados**: pestaña "Pendientes" de la pantalla "Mis envíos". Muestra los envíos pendientes del repartidor con datos reales del backend, con un icono y un color según el estado. Al tocar una tarjeta se abre la confirmación de la entrega. Las listas se cargan por páginas de a 10 y piden la siguiente al llegar al final.
2. **Consultar el historial de entregas**: pestaña "Historial" de la misma pantalla. Muestra las entregas ya confirmadas con su resultado real (completo, parcial o fallido). Las listas se cargan por páginas de a 10 y piden la siguiente al llegar al final.
3. **Confirmar el resultado de una entrega**: se elige el resultado, se agregan observaciones y se envía al backend. Al volver, las listas se actualizan solas.
4. **Mapa de entrega**: muestra los envíos pendientes como paradas numeradas sobre un mapa (OpenStreetMap con Leaflet, dentro de un `WebView`), el depósito como punto de partida y, con un botón, la **posición actual del repartidor** obtenida con el GPS. Avisa cuántos envíos no se pudieron ubicar. Calcula el **orden sugerido de las paradas** y dibuja la **ruta por las calles** con la distancia y el tiempo estimados. Si el cálculo falla, el mapa se muestra igual, con un aviso. Al tocar una parada se abre un globo con los datos del envío y un botón **"Confirmar entrega"**, que lleva a la pantalla de confirmación.

Además de las features de la consigna, se implementó:

- **Login con autenticación real** contra el backend, con JWT guardado de forma segura (`expo-secure-store`).
- **Sesión del usuario**: saludo con el nombre del repartidor y botón de cerrar sesión, que borra el token, vacía el estado global y el caché de consultas.
- **Navegación por pestañas** en "Mis envíos".
- **Tema centralizado** (`ThemeProvider`) y **zonas seguras** (`SafeArea`) en las pantallas.
- **Estados de carga, error y lista vacía**: indicador de carga, mensaje de error en español con botón "Reintentar" cuando no hay conexión.


## Features pendientes


- **Tests** con Jest y React Native Testing Library.

## Avance en la materia

- **Expo Router**: navegación tipo Stack (`push`, `back`, `replace`) y envío de datos entre pantallas con parámetros (`useLocalSearchParams`).
- **Componentes de React Native**: `View`, `Text`, `Image`, `TextInput`, `Pressable`, `TouchableOpacity`, `FlatList`, `ActivityIndicator`, `KeyboardAvoidingView` y `WebView`.
- **Estilos**: `StyleSheet` con listas de estilos condicionales, y **styled-components** con `ThemeProvider` (`props.theme` y `useTheme`).
- **Zonas seguras**: `SafeAreaView` y `useSafeAreaInsets`.
- **Estado local** con `useState`, `useMemo` y `useRef`.
- **TanStack Query**: `useQuery`, `queryKey`, caché compartido entre pantallas, estados de carga y error, y actualización al volver a una pantalla (`useFocusEffect`).
- **Paginación**: `useInfiniteQuery` con `getNextPageParam` y `onEndReached` en la `FlatList`; el servidor recibe `page`, `limit` y `estado`, con un `ORDER BY`.
- **Consumo de una API externa**: cálculo de la ruta con OSRM, usando `useQuery` con `retry`, `staleTime` y `enabled`, y manejo del caso en que el servicio falla.
- **Zustand**: store global con el usuario de la sesión.
- **TypeScript**: tipos propios (`Envio`).
- **Hook propio** (`useEnvios`).
- **APIs nativas**: GPS con `expo-location`, incluido el pedido de permisos.
- **Comunicación entre la app y el WebView**: la página del mapa le avisa a la app con `postMessage` y la app lo recibe en `onMessage`, validando el mensaje antes de navegar con `router.push`.
- **Íconos** con `@expo/vector-icons`.
- **Componentes reutilizables** (`MenuButton`, `PedidoCard`, `MensajeError`) y comunicación mediante `props`.

## Tecnologías

- React Native
- Expo SDK 57
- Expo Router
- TypeScript
- TanStack Query
- Zustand
- styled-components
- Expo SecureStore
- Expo Location
- react-native-webview
- Leaflet y OpenStreetMap (mapa)
- API Georef de datos.gob.ar (datos de localidades)
- OSRM (servicio público de cálculo de rutas)
- Backend del proyecto de tesis: Node.js, Express y SQL Server (autenticación con JWT)
- Android Studio / Android Emulator
- Visual Studio Code
- Git y GitHub

## Estructura principal

```text
SalusApp-Mobile/
├── assets/
│   └── images/
├── scripts/
│   └── generar-localidades.mjs
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
│   │   ├── HistorialTab.tsx
│   │   └── MensajeError.tsx
│   ├── constants/
│   │   ├── api.ts
│   │   └── ciudades.ts
│   ├── data/
│   │   └── localidades.json
│   ├── hooks/
│   │   └── useEnvios.ts
│   ├── services/
│   │   ├── auth.ts
│   │   └── rutas.ts
│   ├── store/
│   │   └── useSessionStore.ts
│   ├── styles/
│   │   ├── theme.ts
│   │   └── styled.d.ts
│   ├── types/
│   │   └── envio.ts
│   └── utils/
│       ├── armarParadas.ts
│       ├── construirHtmlMapa.ts
│       └── formatearRuta.ts
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

Esta entrega conecta la app al backend real del sistema: login, pedidos pendientes, historial, confirmación de entregas y un mapa con las paradas, la ruta sugerida y la posición del repartidor, con navegación por pestañas, estado de sesión y tema centralizado. Queda pendiente la incorporación de tests, que se hará en las próximas etapas.

