# Plan de animación — Asistente Germán

## Principio

La aplicación no usa videos con controles ni imágenes fijas simulando ser video. Las animaciones son breves, claras y responden al toque.

## Sistema visual

- Fondo: papel claro, tinta oscuro, acento frambuesa.
- Germán: una única caricatura consistente, en encuadres circulares; no óvalos.
- Movimiento: suave, corto y funcional. Nunca decorativo por decorar.
- Formato: dotLottie para cada pieza ilustrada e interacción React/CSS para la navegación de la interfaz.

## Piezas de animación

### 1. Cerebro de entrada

- Estado inicial: cerebro en reposo, con tres destellos que lo orbitan.
- Acción: al tocar “Empezar”, el cerebro da un pequeño pulso.
- Salida: abre la carpeta de accesos.
- Archivo previsto: `public/animations/brain-entry.lottie`.

### 2. Carpeta de accesos

- Estados: cerrado y abierto.
- Al abrir: aparecen los cinco accesos en cascada con una transición corta.
- Accesos: Empezar, Talleres, Audios, Consultas y Mi espacio.
- Esta primera versión funciona con React y CSS. Más adelante puede reemplazarse por un dotLottie con máquina de estados sin cambiar el resto de la app.

### 3. Bienvenida de Germán

- Entrada: Germán aparece desde abajo mientras entran dos destellos y el texto.
- Bucle de reposo: parpadeo y gesto de saludo muy leve.
- No debe ser un video que el usuario tenga que reproducir.
- Archivo previsto: `public/animations/german-welcome.lottie`.

### 4. Práctica diaria

- Progreso: la línea avanza al completar una práctica.
- Frase: el botón “Estoy presente” cambia a tilde y hace una confirmación breve.
- Audio: las barras se mueven solamente mientras se está reproduciendo el audio.

### 5. Biblioteca y consultas

- Audio: ícono reproduce/pausa con transición breve.
- Consulta: la respuesta entra en dos pasos, primero título y luego contenido, para no abrumar.

### 6. Mi espacio

- Racha y avance: números y barra aparecen al entrar, una única vez.
- Nada parpadea continuamente.

## Orden de producción

1. Cerebro y carpeta de entrada.
2. Germán animado de bienvenida.
3. Estados de práctica y audio.
4. Progreso, biblioteca y consultas.

## Cómo se crea cada pieza

Se diseña en Lottie Creator y se exporta como `.lottie`. La app solamente carga el archivo exportado. Así cada animación queda editable y reemplazable sin rehacer pantallas.
