/**
 * ============================================================================
 * BUSCAMINAS - INICIALIZADOR PRINCIPAL
 * ============================================================================
 * 
 * Punto de entrada de la aplicación. Se encarga de:
 * - Inicializar el juego cuando el DOM esté listo
 * - Configurar funcionalidades adicionales (PWA, analytics, etc.)
 * - Manejar errores globales
 * - Configurar optimizaciones de performance
 * 
 * @author Expert Gamer Developer
 * @version 1.0.0
 */

/**
 * Configuración global de la aplicación
 */
const AppConfig = {
    // Información de la aplicación
    name: 'Buscaminas',
    version: '1.0.0',
    
    // Configuración de performance
    performance: {
        enableAnalytics: false,
        enableDebugMode: false,
        enablePerformanceMonitoring: false
    },
    
    // Configuración PWA
    pwa: {
        enableServiceWorker: true,
        enableInstallPrompt: true
    },
    
    // Configuración de accesibilidad
    accessibility: {
        enableKeyboardNavigation: true,
        enableScreenReaderSupport: true,
        enableHighContrastMode: false
    }
};

/**
 * Instancia global del juego
 */
let gameInstance = null;

/**
 * Manejador de errores globales
 */
class ErrorHandler {
    static init() {
        // Manejar errores JavaScript no capturados
        window.addEventListener('error', (event) => {
            console.error('Global Error:', {
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,
                error: event.error
            });
            
            ErrorHandler.showUserFriendlyError('Ha ocurrido un error inesperado. Por favor, recarga la página.');
        });
        
        // Manejar promesas rechazadas no capturadas
        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled Promise Rejection:', event.reason);
            
            ErrorHandler.showUserFriendlyError('Ha ocurrido un error de conexión. Verifica tu conexión a internet.');
            
            // Prevenir que aparezca en la consola del navegador
            event.preventDefault();
        });
    }
    
    /**
     * Muestra un error amigable al usuario
     * @param {string} message - Mensaje de error
     */
    static showUserFriendlyError(message) {
        // Crear un modal o notificación temporal
        const errorElement = document.createElement('div');
        errorElement.className = 'error-notification';
        errorElement.innerHTML = `
            <div class="error-content">
                <span class="error-icon">⚠️</span>
                <span class="error-message">${message}</span>
                <button class="error-close">×</button>
            </div>
        `;
        
        // Añadir estilos inline para independencia
        errorElement.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
            border-radius: 8px;
            padding: 15px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            z-index: 10000;
            max-width: 300px;
            animation: slideInRight 0.3s ease-out;
        `;
        
        // Añadir al DOM
        document.body.appendChild(errorElement);
        
        // Auto-remover después de 5 segundos
        setTimeout(() => {
            if (errorElement.parentNode) {
                errorElement.parentNode.removeChild(errorElement);
            }
        }, 5000);
        
        // Permitir cerrar manualmente
        const closeButton = errorElement.querySelector('.error-close');
        closeButton.addEventListener('click', () => {
            if (errorElement.parentNode) {
                errorElement.parentNode.removeChild(errorElement);
            }
        });
    }
}

/**
 * Manejador de PWA (Progressive Web App)
 */
class PWAManager {
    static init() {
        if (!AppConfig.pwa.enableServiceWorker) return;
        
        // Registrar Service Worker
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                PWAManager.registerServiceWorker();
            });
        }
        
        // Manejar prompt de instalación
        if (AppConfig.pwa.enableInstallPrompt) {
            PWAManager.setupInstallPrompt();
        }
    }
    
    /**
     * Registra el service worker
     */
    static async registerServiceWorker() {
        try {
            // Por ahora solo registramos el concepto
            // En una implementación completa, crearías un archivo sw.js
            console.log('Service Worker ready for registration');
            
            // const registration = await navigator.serviceWorker.register('/sw.js');
            // console.log('Service Worker registered successfully:', registration);
        } catch (error) {
            console.warn('Service Worker registration failed:', error);
        }
    }
    
    /**
     * Configura el prompt de instalación de PWA
     */
    static setupInstallPrompt() {
        let deferredPrompt;
        
        window.addEventListener('beforeinstallprompt', (e) => {
            // Prevenir que Chrome 67 y anteriores muestren automáticamente el prompt
            e.preventDefault();
            
            // Guardar el evento para triggerearlo más tarde
            deferredPrompt = e;
            
            // Mostrar botón de instalación personalizado
            PWAManager.showInstallButton(deferredPrompt);
        });
        
        // Detectar cuando la app ha sido instalada
        window.addEventListener('appinstalled', () => {
            console.log('PWA was installed');
            PWAManager.hideInstallButton();
        });
    }
    
    /**
     * Muestra el botón de instalación personalizado
     * @param {Event} deferredPrompt - Evento de instalación diferido
     */
    static showInstallButton(deferredPrompt) {
        // Crear botón de instalación
        const installButton = document.createElement('button');
        installButton.id = 'install-pwa';
        installButton.innerHTML = '📱 Instalar App';
        installButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #007bff;
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 25px;
            font-weight: 500;
            cursor: pointer;
            box-shadow: 0 4px 8px rgba(0,123,255,0.3);
            z-index: 1000;
            transition: all 0.3s ease;
        `;
        
        installButton.addEventListener('click', async () => {
            // Mostrar el prompt de instalación
            deferredPrompt.prompt();
            
            // Esperar la respuesta del usuario
            const { outcome } = await deferredPrompt.userChoice;
            
            console.log(`User response to install prompt: ${outcome}`);
            
            // Limpiar el prompt diferido
            deferredPrompt = null;
            
            // Ocultar el botón
            PWAManager.hideInstallButton();
        });
        
        document.body.appendChild(installButton);
    }
    
    /**
     * Oculta el botón de instalación
     */
    static hideInstallButton() {
        const installButton = document.getElementById('install-pwa');
        if (installButton) {
            installButton.remove();
        }
    }
}

/**
 * Manejador de performance y analytics
 */
class PerformanceManager {
    static init() {
        if (AppConfig.performance.enablePerformanceMonitoring) {
            PerformanceManager.setupPerformanceMonitoring();
        }
        
        if (AppConfig.performance.enableAnalytics) {
            PerformanceManager.setupAnalytics();
        }
    }
    
    /**
     * Configura el monitoreo de performance
     */
    static setupPerformanceMonitoring() {
        // Monitorear métricas de carga
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            
            console.log('Performance Metrics:', {
                domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
                totalLoadTime: perfData.loadEventEnd - perfData.fetchStart
            });
        });
        
        // Monitorear FPS durante el juego
        if (AppConfig.performance.enableDebugMode) {
            PerformanceManager.setupFPSMonitor();
        }
    }
    
    /**
     * Configura un monitor de FPS básico
     */
    static setupFPSMonitor() {
        let lastTime = performance.now();
        let frameCount = 0;
        
        function countFPS() {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime >= lastTime + 1000) {
                console.log(`FPS: ${frameCount}`);
                frameCount = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(countFPS);
        }
        
        requestAnimationFrame(countFPS);
    }
    
    /**
     * Configura analytics básicos
     */
    static setupAnalytics() {
        // Implementar analytics personalizados o integrar Google Analytics
        console.log('Analytics initialized');
        
        // Ejemplo de tracking de eventos del juego
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('difficulty-btn')) {
                PerformanceManager.trackEvent('difficulty_change', {
                    difficulty: e.target.dataset.difficulty
                });
            }
        });
    }
    
    /**
     * Envía un evento de tracking
     * @param {string} eventName - Nombre del evento
     * @param {Object} eventData - Datos del evento
     */
    static trackEvent(eventName, eventData = {}) {
        console.log('Track Event:', eventName, eventData);
        
        // Aquí integrarías con tu servicio de analytics preferido
        // gtag('event', eventName, eventData);
    }
}

/**
 * Manejador de accesibilidad
 */
class AccessibilityManager {
    static init() {
        if (AppConfig.accessibility.enableKeyboardNavigation) {
            AccessibilityManager.setupKeyboardNavigation();
        }
        
        if (AppConfig.accessibility.enableScreenReaderSupport) {
            AccessibilityManager.setupScreenReaderSupport();
        }
        
        if (AppConfig.accessibility.enableHighContrastMode) {
            AccessibilityManager.setupHighContrastMode();
        }
    }
    
    /**
     * Configura navegación por teclado
     */
    static setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Atajos de teclado útiles
            switch (e.key) {
                case 'r':
                case 'R':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        if (gameInstance) {
                            gameInstance.initializeGame();
                        }
                    }
                    break;
                
                case 'h':
                case 'H':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        AccessibilityManager.showKeyboardHelp();
                    }
                    break;
            }
        });
    }
    
    /**
     * Muestra ayuda de teclado
     */
    static showKeyboardHelp() {
        const helpText = `
            Atajos de teclado:
            - Ctrl+R: Nuevo juego
            - Ctrl+H: Mostrar esta ayuda
            - Tab: Navegar entre elementos
            - Enter/Space: Activar elemento seleccionado
        `;
        
        alert(helpText);
    }
    
    /**
     * Configura soporte para lectores de pantalla
     */
    static setupScreenReaderSupport() {
        // Añadir atributos ARIA dinámicamente
        const gameBoard = document.getElementById('game-board');
        if (gameBoard) {
            gameBoard.setAttribute('role', 'grid');
            gameBoard.setAttribute('aria-label', 'Tablero de buscaminas');
        }
        
        // Anunciar cambios importantes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' && mutation.target.id === 'game-message') {
                    const message = mutation.target.textContent;
                    if (message) {
                        AccessibilityManager.announceToScreenReader(message);
                    }
                }
            });
        });
        
        const messageElement = document.getElementById('game-message');
        if (messageElement) {
            observer.observe(messageElement, { childList: true, subtree: true });
        }
    }
    
    /**
     * Anuncia un mensaje a lectores de pantalla
     * @param {string} message - Mensaje a anunciar
     */
    static announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.cssText = `
            position: absolute;
            left: -10000px;
            width: 1px;
            height: 1px;
            overflow: hidden;
        `;
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
    
    /**
     * Configura modo de alto contraste
     */
    static setupHighContrastMode() {
        // Detectar preferencia del sistema
        const mediaQuery = window.matchMedia('(prefers-contrast: high)');
        
        if (mediaQuery.matches) {
            document.body.classList.add('high-contrast');
        }
        
        // Escuchar cambios
        mediaQuery.addEventListener('change', (e) => {
            if (e.matches) {
                document.body.classList.add('high-contrast');
            } else {
                document.body.classList.remove('high-contrast');
            }
        });
    }
}

/**
 * Función principal de inicialización
 */
function initializeApp() {
    try {
        // Inicializar manejadores globales
        ErrorHandler.init();
        
        // Inicializar funcionalidades opcionales
        PWAManager.init();
        PerformanceManager.init();
        AccessibilityManager.init();
        
        // Crear instancia del juego
        gameInstance = new Minesweeper();
        
        // Hacer la instancia globalmente accesible para debugging
        if (AppConfig.performance.enableDebugMode) {
            window.game = gameInstance;
            console.log('Game instance available as window.game');
        }
        
        console.log(`${AppConfig.name} v${AppConfig.version} initialized successfully`);
        
    } catch (error) {
        console.error('Failed to initialize app:', error);
        ErrorHandler.showUserFriendlyError('Error al inicializar el juego. Por favor, recarga la página.');
    }
}

/**
 * Punto de entrada principal
 */
document.addEventListener('DOMContentLoaded', initializeApp);

// Backup para navegadores más antiguos
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

/**
 * Cleanup al cerrar la página
 */
window.addEventListener('beforeunload', () => {
    if (gameInstance) {
        gameInstance.destroy();
    }
});

/**
 * Utilidades globales para debugging (solo en modo desarrollo)
 */
if (AppConfig.performance.enableDebugMode) {
    window.AppUtils = {
        // Obtener estadísticas del juego
        getGameStats: () => gameInstance ? gameInstance.getGameStats() : null,
        
        // Reiniciar juego
        resetGame: () => gameInstance ? gameInstance.initializeGame() : null,
        
        // Cambiar dificultad programáticamente
        setDifficulty: (difficulty) => {
            if (gameInstance && gameInstance.difficulties[difficulty]) {
                const button = document.querySelector(`[data-difficulty="${difficulty}"]`);
                if (button) {
                    button.click();
                }
            }
        },
        
        // Obtener estado actual del tablero
        getBoardState: () => gameInstance ? gameInstance.gameState.board : null,
        
        // Revelar todas las minas (para testing)
        revealAllMines: () => {
            if (gameInstance) {
                gameInstance.revealAllMines();
            }
        }
    };
    
    console.log('Debug utilities available as window.AppUtils');
}