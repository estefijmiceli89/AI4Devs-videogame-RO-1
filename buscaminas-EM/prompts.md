# 🎯 META-PROMPT: Desarrollador Expert de Juegos Frontend

## 📝 EVOLUTION DEL PROMPT

### PROMPT INICIAL (Usuario)
```
como expert gamer developer, necesito realizar el juego mas sencillo posible, aplicando mejores practicas de frontend, con la tecnologia que vos sugieras de manera tal que el codigo sea lo mas sencillo posible, con menos capas de complejidad posible, y que me devuelvas todo el codigo necesario para que el juego este complemtamente funcional en una iteracion.

No debe tener backend, solo frontend. Debes implementar las mejores practicas en la industria de frontend y gaming a la hora de hacerlo. Haceme las preguntas que consideres necesarias para el output mas eficiente y rapido en una sola iteracion.

```

### PROMPT PENÚLTIMO (Usuario)
```
crea el mejor prompt usando meta prompting para crear el mejor prompt posible y obtener el resultado actual en una sola iteracion

```

# 🎯 META-PROMPT: Desarrollador Expert de Juegos Frontend

## CONTEXTO DEL SISTEMA
Eres un **Expert Game Frontend Developer** especializado en crear juegos web completos y funcionales aplicando las mejores prácticas de la industria gaming y frontend moderno.

## OBJETIVO PRINCIPAL
Desarrollar un **juego de Buscaminas completamente funcional** en una sola iteración, optimizado para producción, siguiendo estándares profesionales y siendo deployable inmediatamente.

---

## 📋 ESPECIFICACIONES TÉCNICAS EXACTAS

### ARQUITECTURA Y STACK
- **Frontend Only**: HTML5, CSS3, JavaScript ES6+ Vanilla (zero dependencias)
- **Estructura modular**: Separación clara de responsabilidades
- **Performance optimizada**: Event delegation, DOM manipulation eficiente
- **Progressive Web App ready**: Manifest, service worker preparado
- **Cross-platform**: Desktop (mouse + keyboard) y Mobile (touch gestures)

### FUNCIONALIDADES CORE DEL JUEGO
1. **3 niveles de dificultad exactos**:
   - Fácil: 9x9 grid, 10 minas, celdas 35px
   - Medio: 16x16 grid, 40 minas, celdas 25px  
   - Difícil: 16x30 grid, 99 minas, celdas 18px

2. **Sistema de controles múltiple** (compatible con Mac):
   - Click normal: revelar celda
   - ⌘+Click (Mac) / Ctrl+Click (PC): bandera
   - Shift+Click: bandera alternativa
   - Doble click: bandera
   - Tecla F: modo bandera toggle
   - Long press móvil: bandera

3. **Game mechanics completas**:
   - Timer automático (persiste hasta nuevo juego)
   - Contador minas restantes (formato "X / Total")
   - Auto-reveal para celdas vacías
   - Detección win/lose
   - Algoritmo correcto de colocación de minas

### DISEÑO VISUAL ESPECÍFICO
- **Layout centrado**: Tablero perfectamente centrado horizontalmente
- **Diferenciación extrema de celdas**:
  - Seleccionables: Fondo gris claro (#f8f9fa), sombra externa, hover marcado
  - No seleccionables: Fondo blanco puro (#ffffff), sombra interna, sin hover
- **Espaciado uniforme**: Gap 1px entre celdas en todas las dificultades
- **UI moderna**: Gradientes, shadows, animaciones sutiles
- **Responsive design**: Funciona perfecto en cualquier dispositivo

### ESTRUCTURA DE ARCHIVOS REQUERIDA
```
minesweeper-game/
├── index.html              # Página principal completa
├── styles/main.css          # Estilos completos con variables CSS
├── scripts/Game.js          # Clase Minesweeper con toda la lógica
├── scripts/main.js          # Inicializador, PWA, error handling
├── assets/manifest.json     # PWA configuration
└── README.md               # Documentación completa
```

### CARACTERÍSTICAS AVANZADAS OBLIGATORIAS
- **Error handling robusto**: Validación de inputs, manejo de edge cases
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **Debug utilities**: Modo debug con utilidades para testing
- **Performance monitoring**: FPS tracking, métricas de carga
- **Touch optimization**: Gestos optimizados para móvil con vibración

---

## 🎨 ESPECIFICACIONES DE DISEÑO UX/UI

### PALETA DE COLORES
- **Primary gradient**: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- **Celdas seleccionables**: `#f8f9fa` con hover `#ffffff`
- **Celdas reveladas**: `#ffffff` con borde `#dee2e6`
- **Números**: Colores clásicos Minesweeper (1=azul, 2=verde, 3=rojo, etc.)
- **Banderas**: `#ffc107` con borde `#fd7e14`
- **Minas**: `#dc3545` con efecto explosión

### LAYOUT RESPONSIVO
- **Desktop**: Tablero centrado, celdas tamaño óptimo por dificultad
- **Tablet (768px)**: Celdas 25px máximo, layout vertical en stats
- **Mobile (480px)**: Celdas 20px máximo, UI compacta

### ANIMACIONES Y FEEDBACK
- **Hover effects**: Scale 1.05, sombra azul, transición 0.2s
- **Click feedback**: Animaciones sutiles, vibración en móvil
- **Win/Lose**: Mensajes animados con colores distintivos
- **Loading states**: Indicadores de carga suaves

---

## ⚡ MEJORES PRÁCTICAS IMPLEMENTADAS

### CODE QUALITY
- **ES6+ features**: Clases, arrow functions, destructuring, template literals
- **Error boundaries**: Try-catch blocks, input validation
- **Memory management**: Event listener cleanup, timer management
- **Performance optimization**: DocumentFragment, event delegation
- **Modular architecture**: Single responsibility principle

### SECURITY & RELIABILITY
- **Input sanitization**: Validación de coordenadas y estados
- **XSS prevention**: Uso correcto de textContent vs innerHTML
- **State management**: Single source of truth, immutabilidad
- **Browser compatibility**: Fallbacks para APIs modernas

### GAMING BEST PRACTICES
- **60 FPS target**: Optimización de animations y rendering
- **Input lag minimization**: Event handling eficiente
- **State persistence**: Mantener estado durante gameplay
- **Fair gameplay**: Algoritmo de minas verdaderamente aleatorio

---

## 📱 COMPATIBILIDAD Y TESTING

### BROWSERS SOPORTADOS
- **Desktop**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+, Samsung Internet 14+

### TESTING REQUIREMENTS
- **Functional testing**: Todos los controles y mecánicas
- **Responsive testing**: Breakpoints 320px, 768px, 1200px
- **Touch testing**: Gestos en dispositivos reales
- **Performance testing**: Lighthouse score 90+ en todas las métricas

---

## 🚀 DELIVERABLES ESPERADOS

### CÓDIGO COMPLETO
1. **index.html**: Estructura HTML semántica completa
2. **styles/main.css**: Estilos completos con CSS Grid, Flexbox, variables
3. **scripts/Game.js**: Clase principal con toda la lógica del juego
4. **scripts/main.js**: Inicializador con PWA, analytics, accessibility
5. **assets/manifest.json**: Configuración PWA con iconos SVG embebidos
6. **README.md**: Documentación técnica completa

### DOCUMENTACIÓN
- **Setup instructions**: Pasos para ejecutar localmente
- **Architecture overview**: Explicación de la estructura del código
- **API documentation**: JSDoc para métodos públicos
- **Deployment guide**: Instrucciones para producción
- **Troubleshooting**: Soluciones a problemas comunes

---

## 🎯 CRITERIOS DE ÉXITO

### FUNCIONALIDAD (Obligatorio)
- ✅ Juego 100% funcional en primera ejecución
- ✅ Todos los controles working en desktop y mobile
- ✅ Timer, contadores y detección win/lose perfectos
- ✅ Responsive design fluido en todos los breakpoints

### CALIDAD DE CÓDIGO (Obligatorio)
- ✅ Arquitectura modular y escalable
- ✅ Zero bugs o comportamientos inesperados
- ✅ Performance optimizado (sub-100ms input lag)
- ✅ Código limpio con comentarios JSDoc

### EXPERIENCIA DE USUARIO (Obligatorio)
- ✅ Interfaz intuitiva y moderna
- ✅ Feedback visual claro en todas las interacciones
- ✅ Diferenciación visual extrema entre estados
- ✅ Accesibilidad completa

---

## 💡 PROMPT DE EJECUCIÓN

**"Crea un juego de Buscaminas completo siguiendo exactamente estas especificaciones. Entrega todos los archivos necesarios (HTML, CSS, JS, manifest, README) en artifacts separados. El juego debe ser 100% funcional inmediatamente, con las 3 dificultades, todos los controles working, design responsive, y ready para producción. Implementa todas las mejores prácticas mencionadas y asegúrate de que cada detalle visual y funcional esté exactamente como se especifica."**

---

*Meta-prompt creado para obtener un Buscaminas de calidad profesional en una sola iteración, sin necesidad de iteraciones de corrección.*