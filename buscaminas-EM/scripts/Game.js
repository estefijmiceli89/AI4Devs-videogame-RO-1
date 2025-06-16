/**
 * ============================================================================
 * BUSCAMINAS - CLASE PRINCIPAL DEL JUEGO
 * ============================================================================
 * 
 * Implementa la lógica completa del juego Buscaminas con las mejores prácticas
 * de frontend gaming:
 * - Arquitectura modular y escalable
 * - Gestión eficiente del estado
 * - Optimización de performance
 * - Soporte multi-plataforma (desktop + mobile)
 * 
 * @author Expert Gamer Developer
 * @version 1.0.1 - CORREGIDO
 */

class Minesweeper {
    constructor() {
        // Configuraciones de dificultad - fácilmente extensible
        this.difficulties = {
            easy: { rows: 9, cols: 9, mines: 10, name: 'Fácil' },
            medium: { rows: 16, cols: 16, mines: 40, name: 'Medio' },
            hard: { rows: 16, cols: 30, mines: 99, name: 'Difícil' }
        };
        
        // Estado del juego - single source of truth
        this.gameState = {
            status: 'ready', // ready, playing, won, lost
            difficulty: 'easy',
            board: [],
            revealedCells: 0,
            flaggedCells: 0,
            startTime: null,
            timerInterval: null,
            flagMode: false // NUEVO: Modo bandera activado/desactivado
        };
        
        // Cache de elementos DOM para mejor performance
        this.domElements = {
            board: document.getElementById('game-board'),
            minesCount: document.getElementById('mines-count'),
            timer: document.getElementById('timer'),
            flagsCount: document.getElementById('flags-count'),
            message: document.getElementById('game-message'),
            resetButton: document.getElementById('reset-btn')
        };
        
        // Configuración de touch events para mobile
        this.touchConfig = {
            longPressDelay: 500,
            vibrationEnabled: 'vibrate' in navigator
        };
        
        this.init();
    }
    
    /**
     * Inicializa el juego y configura event listeners
     */
    init() {
        this.validateDOMElements();
        this.setupEventListeners();
        this.initializeGame();
    }
    
    /**
     * Valida que todos los elementos DOM necesarios estén presentes
     */
    validateDOMElements() {
        const missingElements = [];
        
        Object.entries(this.domElements).forEach(([key, element]) => {
            if (!element) {
                missingElements.push(key);
            }
        });
        
        if (missingElements.length > 0) {
            throw new Error(`Missing DOM elements: ${missingElements.join(', ')}`);
        }
    }
    
    /**
     * Configura todos los event listeners del juego
     */
    setupEventListeners() {
        // Botón de reset
        this.domElements.resetButton.addEventListener('click', () => {
            this.initializeGame();
        });
        
        // Botones de dificultad con event delegation
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('difficulty-btn')) {
                this.handleDifficultyChange(e.target);
            }
        });
        
        // Prevenir menú contextual en el tablero
        this.domElements.board.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
        
        // Keyboard shortcuts (opcional - mejora la UX)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'r' || e.key === 'R') {
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    this.initializeGame();
                }
            }
            
            // NUEVO: Tecla F para activar/desactivar modo bandera
            if (e.key === 'f' || e.key === 'F') {
                e.preventDefault();
                this.toggleFlagMode();
            }
        });
    }
    
    /**
     * Maneja el cambio de dificultad
     * @param {HTMLElement} button - Botón de dificultad clickeado
     */
    handleDifficultyChange(button) {
        // Actualizar estado visual
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
        
        // Actualizar estado del juego
        this.gameState.difficulty = button.dataset.difficulty;
        this.initializeGame();
    }
    
    /**
     * Inicializa una nueva partida
     */
    initializeGame() {
        this.resetGameState();
        this.createBoard();
        this.renderBoard();
        this.updateUI();
        this.hideMessage();
    }
    
    /**
     * Resetea el estado del juego a valores iniciales
     */
    resetGameState() {
        this.gameState.status = 'ready';
        this.gameState.revealedCells = 0;
        this.gameState.flaggedCells = 0;
        this.gameState.startTime = null;
        this.gameState.flagMode = false; // CORREGIDO: Resetear modo bandera también
        this.clearTimer();
        this.resetTimer(); // CORREGIDO: Resetear el timer solo aquí
        
        // CORREGIDO: Resetear botón al estado normal
        const resetButton = this.domElements.resetButton;
        resetButton.textContent = '🎮 Nuevo Juego';
        resetButton.style.background = '#28a745';
        resetButton.style.color = '#fff';
        
        this.updateUI(); // CORREGIDO: Actualizar UI después del reset
    }
    
    /**
     * Crea el tablero de juego con minas y números
     */
    createBoard() {
        const config = this.difficulties[this.gameState.difficulty];
        const { rows, cols, mines } = config;
        
        // Inicializar matriz vacía
        this.gameState.board = Array(rows).fill().map(() => 
            Array(cols).fill().map(() => ({
                isMine: false,
                isRevealed: false,
                isFlagged: false,
                neighborMines: 0
            }))
        );
        
        // Colocar minas de forma aleatoria pero uniforme
        this.placeMines(rows, cols, mines);
        
        // Calcular números de minas vecinas
        this.calculateNeighborMines(rows, cols);
    }
    
    /**
     * Coloca las minas de forma aleatoria en el tablero
     * @param {number} rows - Número de filas
     * @param {number} cols - Número de columnas
     * @param {number} mineCount - Número de minas a colocar
     */
    placeMines(rows, cols, mineCount) {
        let minesPlaced = 0;
        const maxAttempts = rows * cols * 2; // Prevenir loops infinitos
        let attempts = 0;
        
        while (minesPlaced < mineCount && attempts < maxAttempts) {
            const row = Math.floor(Math.random() * rows);
            const col = Math.floor(Math.random() * cols);
            
            if (!this.gameState.board[row][col].isMine) {
                this.gameState.board[row][col].isMine = true;
                minesPlaced++;
            }
            
            attempts++;
        }
        
        if (minesPlaced < mineCount) {
            console.warn(`Only placed ${minesPlaced} out of ${mineCount} mines`);
        }
    }
    
    /**
     * Calcula el número de minas vecinas para cada celda
     * @param {number} rows - Número de filas
     * @param {number} cols - Número de columnas
     */
    calculateNeighborMines(rows, cols) {
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                if (!this.gameState.board[row][col].isMine) {
                    this.gameState.board[row][col].neighborMines = 
                        this.countNeighborMines(row, col, rows, cols);
                }
            }
        }
    }
    
    /**
     * Cuenta las minas vecinas de una celda específica
     * @param {number} row - Fila de la celda
     * @param {number} col - Columna de la celda
     * @param {number} rows - Total de filas
     * @param {number} cols - Total de columnas
     * @returns {number} Número de minas vecinas
     */
    countNeighborMines(row, col, rows, cols) {
        let count = 0;
        
        // Verificar las 8 celdas vecinas
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const newRow = row + i;
                const newCol = col + j;
                
                // Verificar límites del tablero
                if (this.isValidCell(newRow, newCol, rows, cols)) {
                    if (this.gameState.board[newRow][newCol].isMine) {
                        count++;
                    }
                }
            }
        }
        
        return count;
    }
    
    /**
     * Verifica si una celda está dentro de los límites del tablero
     * @param {number} row - Fila a verificar
     * @param {number} col - Columna a verificar
     * @param {number} rows - Total de filas
     * @param {number} cols - Total de columnas
     * @returns {boolean} True si la celda es válida
     */
    isValidCell(row, col, rows, cols) {
        return row >= 0 && row < rows && col >= 0 && col < cols;
    }
    
    /**
     * Renderiza el tablero en el DOM
     */
    renderBoard() {
        const config = this.difficulties[this.gameState.difficulty];
        const { rows, cols } = config;
        
        // Configurar CSS Grid
        this.domElements.board.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        
        // CORREGIDO: Ajustar tamaño de celdas según dificultad
        let cellSize;
        switch(this.gameState.difficulty) {
            case 'easy':
                cellSize = '35px';
                break;
            case 'medium':
                cellSize = '25px';
                break;
            case 'hard':
                cellSize = '18px';
                break;
            default:
                cellSize = '30px';
        }
        
        // Limpiar tablero anterior
        this.domElements.board.innerHTML = '';
        
        // Crear fragment para mejor performance
        const fragment = document.createDocumentFragment();
        
        // Crear todas las celdas
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const cell = this.createCellElement(row, col);
                // Aplicar tamaño específico
                cell.style.width = cellSize;
                cell.style.height = cellSize;
                fragment.appendChild(cell);
            }
        }
        
        this.domElements.board.appendChild(fragment);
    }
    
    /**
     * Crea un elemento celda con todos sus event listeners
     * @param {number} row - Fila de la celda
     * @param {number} col - Columna de la celda
     * @returns {HTMLElement} Elemento celda configurado
     */
    createCellElement(row, col) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.row = row;
        cell.dataset.col = col;
        
        // CORREGIDO: Event listeners con múltiples opciones para Mac
        cell.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Opción 1: Cmd + Click = Bandera (Mac)
            // Opción 2: Ctrl + Click = Bandera (PC)
            // Opción 3: Shift + Click = Bandera (alternativa)
            if (e.metaKey || e.ctrlKey || e.shiftKey) {
                this.handleCellRightClick(row, col);
            } else {
                this.handleCellClick(row, col);
            }
        });
        
        // Click derecho tradicional (para quienes lo tengan)
        cell.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.handleCellRightClick(row, col);
        });
        
        // Doble click como alternativa adicional
        cell.addEventListener('dblclick', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.handleCellRightClick(row, col);
        });
        
        // Event listeners para touch (dispositivos móviles)
        this.setupTouchEvents(cell, row, col);
        
        return cell;
    }
    
    /**
     * Configura eventos touch para dispositivos móviles
     * @param {HTMLElement} cell - Elemento celda
     * @param {number} row - Fila de la celda
     * @param {number} col - Columna de la celda
     */
    setupTouchEvents(cell, row, col) {
        let touchTimer = null;
        let touchStartTime = 0;
        let hasMoved = false;
        
        cell.addEventListener('touchstart', (e) => {
            e.preventDefault();
            touchStartTime = Date.now();
            hasMoved = false;
            
            // Configurar long press para bandera
            touchTimer = setTimeout(() => {
                if (!hasMoved) {
                    this.handleCellRightClick(row, col);
                    
                    // Vibración táctil si está disponible
                    if (this.touchConfig.vibrationEnabled) {
                        navigator.vibrate(50);
                    }
                }
                touchTimer = null;
            }, this.touchConfig.longPressDelay);
        });
        
        cell.addEventListener('touchmove', () => {
            hasMoved = true;
            if (touchTimer) {
                clearTimeout(touchTimer);
                touchTimer = null;
            }
        });
        
        cell.addEventListener('touchend', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            if (touchTimer) {
                clearTimeout(touchTimer);
                touchTimer = null;
                
                // Si no fue long press y no se movió, hacer click normal
                const touchDuration = Date.now() - touchStartTime;
                if (touchDuration < this.touchConfig.longPressDelay && !hasMoved) {
                    this.handleCellClick(row, col);
                }
            }
        });
        
        cell.addEventListener('touchcancel', () => {
            if (touchTimer) {
                clearTimeout(touchTimer);
                touchTimer = null;
            }
        });
        
        // CORREGIDO: Añadir también eventos de mouse para desktop
        cell.addEventListener('mousedown', (e) => {
            if (e.button === 2) { // Click derecho
                e.preventDefault();
                this.handleCellRightClick(row, col);
            }
        });
    }
    
    /**
     * Maneja el click izquierdo en una celda
     * @param {number} row - Fila de la celda
     * @param {number} col - Columna de la celda
     */
    handleCellClick(row, col) {
        // CORREGIDO: Logging para debug
        console.log(`Click en celda: [${row}, ${col}] - Modo bandera: ${this.gameState.flagMode}`);
        
        // Verificar si el juego permite interacciones
        if (this.gameState.status === 'won' || this.gameState.status === 'lost') {
            return;
        }
        
        // Verificar que las coordenadas sean válidas
        const config = this.difficulties[this.gameState.difficulty];
        if (!this.isValidCell(row, col, config.rows, config.cols)) {
            console.warn(`Coordenadas inválidas: [${row}, ${col}]`);
            return;
        }
        
        // NUEVO: Si el modo bandera está activado, colocar bandera en lugar de revelar
        if (this.gameState.flagMode) {
            this.handleCellRightClick(row, col);
            return;
        }
        
        const cell = this.gameState.board[row][col];
        
        // No permitir click en celdas ya reveladas o con bandera
        if (cell.isRevealed || cell.isFlagged) {
            return;
        }
        
        // Iniciar el juego en el primer click
        if (this.gameState.status === 'ready') {
            this.startGame();
        }
        
        // Revelar la celda
        this.revealCell(row, col);
        
        // Actualizar UI y verificar estado del juego
        this.updateUI();
        this.checkGameState();
    }
    
    /**
     * Maneja el click derecho (bandera) en una celda
     * @param {number} row - Fila de la celda
     * @param {number} col - Columna de la celda
     */
    handleCellRightClick(row, col) {
        // CORREGIDO: Logging para debug
        console.log(`Click derecho en celda: [${row}, ${col}]`);
        
        // Verificar si el juego permite interacciones
        if (this.gameState.status === 'won' || this.gameState.status === 'lost') {
            return;
        }
        
        // Verificar que las coordenadas sean válidas
        const config = this.difficulties[this.gameState.difficulty];
        if (!this.isValidCell(row, col, config.rows, config.cols)) {
            console.warn(`Coordenadas inválidas para bandera: [${row}, ${col}]`);
            return;
        }
        
        const cell = this.gameState.board[row][col];
        
        // No permitir bandera en celdas reveladas
        if (cell.isRevealed) {
            return;
        }
        
        // Toggle bandera
        cell.isFlagged = !cell.isFlagged;
        this.gameState.flaggedCells += cell.isFlagged ? 1 : -1;
        
        // Actualizar display de la celda y UI
        this.updateCellDisplay(row, col);
        this.updateUI();
    }
    
    /**
     * Revela una celda y maneja la lógica de expansión automática
     * @param {number} row - Fila de la celda
     * @param {number} col - Columna de la celda
     */
    revealCell(row, col) {
        const config = this.difficulties[this.gameState.difficulty];
        const { rows, cols } = config;
        
        // Verificar que las coordenadas sean válidas
        if (!this.isValidCell(row, col, rows, cols)) {
            return;
        }
        
        const cell = this.gameState.board[row][col];
        
        // Verificar si la celda ya está revelada o tiene bandera
        if (cell.isRevealed || cell.isFlagged) {
            return;
        }
        
        // Revelar la celda
        cell.isRevealed = true;
        this.gameState.revealedCells++;
        
        // CORREGIDO: Logging para debug
        console.log(`Revelando celda [${row}, ${col}] - Es mina: ${cell.isMine}, Vecinas: ${cell.neighborMines}`);
        
        // Verificar si es una mina
        if (cell.isMine) {
            this.gameState.status = 'lost';
            this.revealAllMines();
            
            // Marcar la mina que causó la derrota
            const cellElement = this.getCellElement(row, col);
            if (cellElement) {
                cellElement.classList.add('mine-hit');
            }
        } else if (cell.neighborMines === 0) {
            // Expansión automática para celdas vacías
            this.revealNeighbors(row, col, rows, cols);
        }
        
        // Actualizar display de la celda
        this.updateCellDisplay(row, col);
    }
    
    /**
     * Revela todas las celdas vecinas (para celdas con 0 minas vecinas)
     * @param {number} row - Fila central
     * @param {number} col - Columna central
     * @param {number} rows - Total de filas
     * @param {number} cols - Total de columnas
     */
    revealNeighbors(row, col, rows, cols) {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const newRow = row + i;
                const newCol = col + j;
                
                if (this.isValidCell(newRow, newCol, rows, cols)) {
                    this.revealCell(newRow, newCol);
                }
            }
        }
    }
    
    /**
     * Obtiene el elemento DOM de una celda específica
     * @param {number} row - Fila de la celda
     * @param {number} col - Columna de la celda
     * @returns {HTMLElement|null} Elemento celda o null si no existe
     */
    getCellElement(row, col) {
        return this.domElements.board.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    }
    
    /**
     * Actualiza el display visual de una celda específica
     * @param {number} row - Fila de la celda
     * @param {number} col - Columna de la celda
     */
    updateCellDisplay(row, col) {
        const cell = this.gameState.board[row][col];
        const cellElement = this.getCellElement(row, col);
        
        if (!cellElement) {
            console.warn(`No se encontró elemento DOM para celda [${row}, ${col}]`);
            return;
        }
        
        // Limpiar clases y contenido previo
        cellElement.classList.remove('revealed', 'flagged', 'mine', 'empty', 'number');
        cellElement.textContent = '';
        cellElement.removeAttribute('data-count');
        
        // Aplicar estado actual
        if (cell.isFlagged) {
            cellElement.classList.add('flagged');
            cellElement.textContent = '🚩';
        } else if (cell.isRevealed) {
            cellElement.classList.add('revealed');
            
            if (cell.isMine) {
                cellElement.classList.add('mine');
                cellElement.textContent = '💣';
            } else if (cell.neighborMines > 0) {
                // CORREGIDO: Celda con número
                cellElement.classList.add('number');
                cellElement.textContent = cell.neighborMines;
                cellElement.setAttribute('data-count', cell.neighborMines);
            } else {
                // CORREGIDO: Celda vacía (sin minas vecinas)
                cellElement.classList.add('empty');
            }
        }
    }
    
    /**
     * Revela todas las minas del tablero (al perder)
     */
    revealAllMines() {
        const config = this.difficulties[this.gameState.difficulty];
        const { rows, cols } = config;
        
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const cell = this.gameState.board[row][col];
                if (cell.isMine && !cell.isRevealed) {
                    cell.isRevealed = true;
                    this.updateCellDisplay(row, col);
                }
            }
        }
    }
    
    /**
     * Inicia el timer del juego
     */
    startGame() {
        this.gameState.status = 'playing';
        this.gameState.startTime = Date.now();
        
        this.gameState.timerInterval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - this.gameState.startTime) / 1000);
            const hours = Math.floor(elapsed / 3600);
            const minutes = Math.floor((elapsed % 3600) / 60);
            const seconds = elapsed % 60;
            this.domElements.timer.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }
    
    /**
     * Limpia el timer del juego
     */
    clearTimer() {
        if (this.gameState.timerInterval) {
            clearInterval(this.gameState.timerInterval);
            this.gameState.timerInterval = null;
        }
        // CORREGIDO: NO resetear el timer al terminar el juego, solo al iniciar uno nuevo
        // this.domElements.timer.textContent = '00:00:00';
    }
    
    /**
     * NUEVO: Resetear timer solo al iniciar nuevo juego
     */
    resetTimer() {
        this.domElements.timer.textContent = '00:00:00';
    }
    
    /**
     * Verifica el estado del juego (victoria/derrota)
     */
    checkGameState() {
        if (this.gameState.status === 'lost') {
            this.clearTimer();
            this.showMessage('¡Perdiste! 💥 Has pisado una mina', 'lose');
            return;
        }
        
        // Verificar condición de victoria
        const config = this.difficulties[this.gameState.difficulty];
        const totalCells = config.rows * config.cols;
        const cellsToReveal = totalCells - config.mines;
        
        if (this.gameState.revealedCells === cellsToReveal) {
            this.gameState.status = 'won';
            this.clearTimer();
            this.showMessage('¡Felicitaciones! 🎉 Has ganado', 'win');
            this.flagAllRemainingMines();
        }
    }
    
    /**
     * Marca todas las minas restantes con banderas (al ganar)
     */
    flagAllRemainingMines() {
        const config = this.difficulties[this.gameState.difficulty];
        const { rows, cols } = config;
        
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const cell = this.gameState.board[row][col];
                if (cell.isMine && !cell.isFlagged) {
                    cell.isFlagged = true;
                    this.gameState.flaggedCells++;
                    this.updateCellDisplay(row, col);
                }
            }
        }
    }
    
    /**
     * Actualiza todos los elementos de la UI
     */
    updateUI() {
        const config = this.difficulties[this.gameState.difficulty];
        const remainingMines = config.mines - this.gameState.flaggedCells;
        
        // CORREGIDO: Mostrar total de minas y minas restantes
        this.domElements.minesCount.textContent = `${Math.max(0, remainingMines)} / ${config.mines}`;
        this.domElements.flagsCount.textContent = this.gameState.flaggedCells;
    }
    
    /**
     * Muestra un mensaje de estado del juego
     * @param {string} text - Texto del mensaje
     * @param {string} type - Tipo de mensaje ('win' o 'lose')
     */
    showMessage(text, type) {
        this.domElements.message.textContent = text;
        this.domElements.message.className = `game-message ${type}`;
        this.domElements.message.style.display = 'block';
        
        // Añadir animación
        this.domElements.message.classList.add('fade-in');
    }
    
    /**
     * Oculta el mensaje de estado
     */
    hideMessage() {
        this.domElements.message.style.display = 'none';
        this.domElements.message.classList.remove('fade-in');
    }
    
    /**
     * Obtiene estadísticas del juego actual
     * @returns {Object} Objeto con estadísticas del juego
     */
    getGameStats() {
        const config = this.difficulties[this.gameState.difficulty];
        const elapsedTime = this.gameState.startTime ? 
            Math.floor((Date.now() - this.gameState.startTime) / 1000) : 0;
        
        return {
            difficulty: config.name,
            status: this.gameState.status,
            revealedCells: this.gameState.revealedCells,
            flaggedCells: this.gameState.flaggedCells,
            totalMines: config.mines,
            elapsedTime: elapsedTime,
            boardSize: `${config.rows}x${config.cols}`
        };
    }
    
    /**
     * Destructor para limpieza de recursos
     */
    destroy() {
        this.clearTimer();
        
        // Remover event listeners si es necesario
        // (en este caso el garbage collector se encarga automáticamente)
    }
    
    /**
     * NUEVO: Activa/desactiva el modo bandera
     */
    toggleFlagMode() {
        this.gameState.flagMode = !this.gameState.flagMode;
        
        // Actualizar UI para mostrar el estado del modo bandera
        const resetButton = this.domElements.resetButton;
        if (this.gameState.flagMode) {
            resetButton.textContent = '🚩 Modo Bandera: ON (F para desactivar)';
            resetButton.style.background = '#ffc107';
            resetButton.style.color = '#000';
        } else {
            resetButton.textContent = '🎮 Nuevo Juego';
            resetButton.style.background = '#28a745';
            resetButton.style.color = '#fff';
        }
        
        console.log(`Modo bandera: ${this.gameState.flagMode ? 'ACTIVADO' : 'DESACTIVADO'}`);
    }
}

// Exportar la clase para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Minesweeper;
}