# 💣 Buscaminas - Juego Clásico

Un juego de Buscaminas moderno desarrollado con las mejores prácticas de frontend gaming. Completamente funcional, responsive y optimizado para todas las plataformas.

## 🎯 Características

### ⭐ Funcionalidades del Juego
- **Tres niveles de dificultad**: Fácil (9x9), Medio (16x16), Difícil (16x30)
- **Sistema completo de banderas**: Click derecho o long-press en móvil
- **Timer integrado**: Cronómetro automático durante la partida
- **Detección automática de victoria/derrota**
- **Revelado automático**: Expansión inteligente de áreas vacías
- **Contador de minas y banderas** en tiempo real

### 🎨 Diseño y UX
- **Diseño moderno**: Gradientes, sombras y animaciones suaves
- **Fully responsive**: Perfecto en desktop, tablet y móvil
- **Feedback visual**: Animaciones para cada acción del usuario
- **Colores diferenciados**: Números con colores estándar del Buscaminas
- **Vibración táctil**: Feedback háptico en dispositivos compatibles

### ⚡ Tecnología y Performance
- **Vanilla JavaScript ES6+**: Sin dependencias externas
- **Arquitectura modular**: Código limpio y mantenible
- **Optimización de DOM**: Event delegation y rendering eficiente
- **PWA Ready**: Preparado para instalación como app nativa
- **Gestión de errores**: Manejo robusto de errores y edge cases

### 📱 Soporte Multi-plataforma
- **Desktop**: Mouse y teclado
- **Mobile/Tablet**: Touch gestures optimizados
- **Teclado**: Atajos de teclado (Ctrl+R para nuevo juego)
- **Accesibilidad**: Soporte para lectores de pantalla

## 🚀 Instalación y Uso

### Instalación Rápida
```bash
# Clonar o descargar los archivos
git clone <repository-url>
cd minesweeper-game

# Abrir directamente en navegador
open index.html
```

### Con Live Server (Recomendado)
```bash
# Si usas VS Code/Cursor con Live Server
# 1. Abrir la carpeta en tu editor
# 2. Click derecho en index.html
# 3. Seleccionar "Open with Live Server"
```

### Estructura de Archivos
```
minesweeper-game/
├── index.html              # Página principal
├── styles/
│   └── main.css            # Estilos principales
├── scripts/
│   ├── Game.js             # Lógica del juego
│   └── main.js             # Inicializador y utilidades
├── assets/
│   └── manifest.json       # Configuración PWA
└── README.md               # Documentación
```

## 🎮 Cómo Jugar

### Controles
- **Click izquierdo**: Revelar celda
- **Click derecho**: Colocar/quitar bandera
- **Long press** (móvil): Colocar/quitar bandera
- **Ctrl + R**: Nuevo juego

### Objetivo
Encuentra todas las celdas que no contienen minas. Los números indican cuántas minas hay en las celdas adyacentes.

### Niveles de Dificultad
- **Fácil**: 9×9 con 10 minas
- **Medio**: 16×16 con 40 minas  
- **Difícil**: 16×30 con 99 minas

## 🛠️ Arquitectura Técnica

### Mejores Prácticas Implementadas

#### 1. **Arquitectura Modular**
- Separación clara de responsabilidades
- Clase principal `Minesweeper` con métodos bien definidos
- Gestión centralizada del estado del juego

#### 2. **Performance Optimizada**
- Event delegation para mejor rendimiento
- DOM manipulation eficiente con DocumentFragment
- Lazy loading y cleanup de recursos

#### 3. **Responsive Design**
- CSS Grid para layouts flexibles
- Media queries optimizadas
- Variables CSS para fácil mantenimiento

#### 4. **Gestión de Estado**
- Single source of truth en `gameState`
- Inmutabilidad en operaciones críticas
- Validación de estado en cada operación

#### 5. **Error Handling**
- Manejo robusto de errores
- Fallbacks para navegadores antiguos
- Validación de elementos DOM

### Tecnologías Utilizadas
- **HTML5**: Semántica moderna y accesibilidad
- **CSS3**: Grid, Flexbox, animaciones y variables
- **JavaScript ES6+**: Clases, arrow functions, destructuring
- **PWA**: Service Worker y manifest para instalación

## 🧪 Debugging y Testing

### Modo Debug
Para activar funcionalidades de debugging, cambiar en `scripts/main.js`:
```javascript
const AppConfig = {
    performance: {
        enableDebugMode: true // Cambiar a true
    }
};
```

### Utilidades de Debug
Con debug mode activado, tienes acceso a:
```javascript
// Obtener estadísticas
window.AppUtils.getGameStats()

// Cambiar dificultad
window.AppUtils.setDifficulty('hard')

// Revelar minas (para testing)
window.AppUtils.revealAllMines()

// Acceso directo al juego
window.game
```

## 🔧 Personalización

### Cambiar Dificultades
Editar en `scripts/Game.js`:
```javascript
this.difficulties = {
    easy: { rows: 9, cols: 9, mines: 10 },
    custom: { rows: 12, cols: 12, mines: 20 } // Nueva dificultad
};
```

### Modificar Colores
Cambiar variables CSS en `styles/main.css`:
```css
:root {
    --primary-gradient: linear-gradient(135deg, #your-color 0%, #your-color-2 100%);
    --success-color: #your-success-color;
}
```

### Añadir Sonidos
Integrar en los métodos de `Game.js`:
```javascript
handleCellClick(row, col) {
    // Tu lógica existente
    this.playSound('click');
}
```

## 📈 Características Avanzadas

### PWA (Progressive Web App)
- **Instalable**: Se puede instalar como app nativa
- **Offline**: Funciona sin conexión a internet
- **Manifest**: Configuración completa para stores

### Accesibilidad
- **ARIA labels**: Para lectores de pantalla
- **Keyboard navigation**: Navegación completa por teclado
- **High contrast**: Soporte para modo alto contraste
- **Screen reader**: Anuncios automáticos de estado

### Performance Monitoring
- **FPS tracking**: Monitor de rendimiento en tiempo real
- **Load time metrics**: Métricas de carga de la aplicación
- **Error tracking**: Logging automático de errores

## 🤝 Contribuciones

### Añadir Nuevas Características
1. Fork del repositorio
2. Crear branch para la nueva feature: `git checkout -b feature/nueva-caracteristica`
3. Implementar siguiendo las convenciones existentes
4. Testear en múltiples dispositivos
5. Crear Pull Request con descripción detallada

### Convenciones de Código
- **Naming**: camelCase para variables, PascalCase para clases
- **Comments**: JSDoc para métodos públicos
- **CSS**: BEM methodology para clases
- **Structure**: Un archivo por responsabilidad

## 🐛 Troubleshooting

### Problemas Comunes

#### El juego no se carga
```javascript
// Verificar en la consola del navegador
console.log('DOM loaded:', document.readyState);
console.log('Game instance:', window.game);
```

#### Problemas de responsive
```css
/* Verificar viewport meta tag en index.html */
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

#### Touch events no funcionan
```javascript
// Verificar soporte touch
console.log('Touch support:', 'ontouchstart' in window);
```

### Performance Issues
- Verificar que `enableDebugMode` esté en `false` en producción
- Usar Chrome DevTools → Performance tab para profiling
- Revisar Memory tab para memory leaks

## 📊 Métricas y Analytics

### Eventos Trackeados (si analytics está habilitado)
- `difficulty_change`: Cambio de dificultad
- `game_start`: Inicio de partida
- `game_win`: Victoria
- `game_lose`: Derrota
- `cell_reveal`: Celdas reveladas
- `flag_place`: Banderas colocadas

### Performance Metrics
- Time to Interactive (TTI)
- First Contentful Paint (FCP)
- Load Event End
- FPS durante el juego

## 🔒 Seguridad

### Validaciones Implementadas
- **Input sanitization**: Validación de coordenadas del tablero
- **DOM manipulation**: Prevención de XSS en contenido dinámico
- **Event handling**: Validación de eventos del usuario
- **State management**: Verificación de estados válidos

### Best Practices Seguidas
- No uso de `eval()` o `innerHTML` con contenido no confiable
- Validación de límites en todas las operaciones del tablero
- Escape de contenido user-generated (nombres, etc.)

## 🚀 Deployment

### GitHub Pages
```bash
# En tu repositorio de GitHub
# 1. Ir a Settings → Pages
# 2. Seleccionar source: Deploy from branch
# 3. Branch: main, folder: / (root)
# 4. Tu juego estará en: https://username.github.io/repository-name
```

### Netlify
```bash
# 1. Conectar repositorio en netlify.com
# 2. Build settings:
#    - Build command: (dejar vacío)
#    - Publish directory: . (punto)
# 3. Deploy automático en cada push
```

### Vercel
```bash
# Usando Vercel CLI
npm i -g vercel
vercel --prod
```

## 📱 PWA Installation

### Para Usuarios
1. **Chrome/Edge**: Buscar icono de instalación en la barra de direcciones
2. **Safari iOS**: Compartir → Añadir a pantalla de inicio
3. **Android**: Chrome → Menú → Instalar app

### Para Desarrolladores
```javascript
// Personalizar prompt de instalación
window.addEventListener('beforeinstallprompt', (e) => {
    // Personalizar UI de instalación
    showCustomInstallButton(e);
});
```

## 🔄 Roadmap y Futuras Mejoras

### v1.1 (Próxima versión)
- [ ] Sistema de puntuaciones y records
- [ ] Modo multijugador local
- [ ] Temas personalizables
- [ ] Sonidos y efectos de audio
- [ ] Animaciones más avanzadas

### v1.2 (Futuro)
- [ ] Modo online/multijugador
- [ ] Integración con redes sociales
- [ ] Challenges diarios
- [ ] Sistema de logros/achievements
- [ ] Modo oscuro automático

### v2.0 (Visión a largo plazo)
- [ ] Engine 3D con Three.js
- [ ] VR/AR support
- [ ] AI opponent
- [ ] Tournament mode

## 📚 Recursos Adicionales

### Documentación Técnica
- [MDN Web Docs - Game Development](https://developer.mozilla.org/en-US/docs/Games)
- [PWA Builder - Microsoft](https://www.pwabuilder.com/)
- [Web.dev - Performance](https://web.dev/performance/)

### Herramientas Recomendadas
- **Testing**: Chrome DevTools, Lighthouse
- **Design**: Figma, Adobe XD
- **Performance**: WebPageTest, GTmetrix
- **Analytics**: Google Analytics, Hotjar

## 🏆 Credits

### Desarrollo
- **Architecture**: Expert Gamer Developer
- **Frontend**: Vanilla JavaScript ES6+
- **Design**: Custom CSS3 with modern practices
- **Testing**: Multi-platform validation

### Inspiración
- Juego original Buscaminas de Microsoft Windows
- Principios de diseño de Material Design
- Best practices de Google Web Fundamentals

## 📄 Licencia

```
MIT License

Copyright (c) 2025 Expert Gamer Developer

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 Support

Si tienes problemas o preguntas:

1. **Revisa la documentación** en este README
2. **Check issues** en el repositorio de GitHub
3. **Crea un nuevo issue** con detalles del problema
4. **Include**: OS, navegador, versión, y pasos para reproducir

---

### ⭐ Si te gusta este proyecto, no olvides darle una estrella en GitHub!

**¡Disfruta jugando Buscaminas! 💣🎮**