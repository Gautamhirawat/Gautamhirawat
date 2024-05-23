document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('grid-container');
    const restartBtn = document.getElementById('restart-btn');
    let grid = [];
    let score = 0;

    // Initialize game
    function init() {
        score = 0;
        updateScore();
        createGrid();
        addRandomTile();
        addRandomTile();
    }

    // Create grid
    function createGrid() {
        gridContainer.innerHTML = '';
        grid = [];
        for (let i = 0; i < 4; i++) {
            const row = [];
            for (let j = 0; j < 4; j++) {
                const tile = document.createElement('div');
                tile.classList.add('tile');
                row.push(tile);
                gridContainer.appendChild(tile);
            }
            grid.push(row);
        }
    }

    // Add random tile (2 or 4) to an empty cell
    function addRandomTile() {
        const emptyCells = [];
        grid.forEach((row, i) => {
            row.forEach((tile, j) => {
                if (!tile.innerHTML) {
                    emptyCells.push({ row: i, col: j });
                }
            });
        });

        if (emptyCells.length > 0) {
            const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            const value = Math.random() < 0.9 ? 2 : 4;
            grid[row][col].innerHTML = value;
            grid[row][col].style.backgroundColor = getTileBackgroundColor(value);
        }
    }

    // Update score
    function updateScore() {
        document.getElementById('score').innerText = `Score: ${score}`;
    }

    // Get tile background color based on value
    function getTileBackgroundColor(value) {
        switch (value) {
            case 2: return '#eee4da';
            case 4: return '#ede0c8';
            case 8: return '#f2b179';
            case 16: return '#f59563';
            case 32: return '#f67c5f';
            case 64: return '#f65e3b';
            case 128: return '#edcf72';
            case 256: return '#edcc61';
            case 512: return '#edc850';
            case 1024: return '#edc53f';
            case 2048: return '#edc22e';
            default: return '#3c3a32';
        }
    }

    // Move tiles left
    function moveLeft() {
        let moved = false;
        for (let i = 0; i < 4; i++) {
            for (let j = 1; j < 4; j++) {
                if (grid[i][j].innerHTML !== '') {
                    let k = j - 1;
                    while (k >= 0) {
                        if (grid[i][k].innerHTML === '') {
                            grid[i][k].innerHTML = grid[i][k + 1].innerHTML;
                            grid[i][k + 1].innerHTML = '';
                            k--;
                            moved = true;
                        } else if (grid[i][k].innerHTML === grid[i][k + 1].innerHTML) {
                            const newValue = parseInt(grid[i][k].innerHTML) * 2;
                            grid[i][k].innerHTML = newValue;
                            grid[i][k].style.backgroundColor = getTileBackgroundColor(newValue);
                            grid[i][k + 1].innerHTML = '';
                            score += newValue;
                            updateScore();
                            moved = true;
                            break;
                        } else {
                            break;
                        }
                    }
                }
            }
        }
        if (moved) {
            addRandomTile();
        }
    }

    // Move tiles up
    function moveUp() {
        let moved = false;
        for (let i = 1; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (grid[i][j].innerHTML !== '') {
                    let k = i - 1;
                    while (k >= 0) {
                        if (grid[k][j].innerHTML === '') {
                            grid[k][j].innerHTML = grid[k + 1][j].innerHTML;
                            grid[k + 1][j].innerHTML = '';
                            k--;
                            moved = true;
                        } else if (grid[k][j].innerHTML === grid[k + 1][j].innerHTML) {
                            const newValue = parseInt(grid[k][j].innerHTML) * 2;
                            grid[k][j].innerHTML = newValue;
                            grid[k][j].style.backgroundColor = getTileBackgroundColor(newValue);
                            grid[k + 1][j].innerHTML = '';
                            score += newValue;
                            updateScore();
                            moved = true;
                            break;
                        } else {
                            break;
                        }
                    }
                }
            }
        }
        if (moved) {
            addRandomTile();
        }
    }

    // Move tiles right
    function moveRight() {
        let moved = false;
        for (let i = 0; i < 4; i++) {
            for (let j = 2; j >= 0; j--) {
                if (grid[i][j].innerHTML !== '') {
                    let k = j + 1;
                    while (k < 4) {
                        if (grid[i][k].innerHTML === '') {
                            grid[i][k].innerHTML = grid[i][k - 1].innerHTML;
                            grid[i][k - 1].innerHTML = '';
                            k++;
                            moved = true;
                        } else if (grid[i][k].innerHTML === grid[i][k - 1].innerHTML) {
                            const newValue = parseInt(grid[i][k].innerHTML) * 2;
                            grid[i][k].innerHTML = newValue;
                            grid[i][k].style.backgroundColor = getTileBackgroundColor(newValue);
                            grid[i][k - 1].innerHTML = '';
                            score += newValue;
                            updateScore();
                            moved = true;
                            break;
                        } else {
                            break;
                        }
                    }
                }
            }
        }
        if (moved) {
            addRandomTile();
        }
    }

    // Move tiles down
    function moveDown() {
        let moved = false;
        for (let i = 2; i >= 0; i--) {
            for (let j = 0; j < 4; j++) {
                if (grid[i][j].innerHTML !== '') {
                    let k = i + 1;
                    while (k < 4) {
                        if (grid[k][j].innerHTML === '') {
                            grid[k][j].innerHTML = grid[k - 1][j].innerHTML;
                            grid[k - 1][j].innerHTML = '';
                            k++;
                            moved = true;
                        } else if (grid[k][j].innerHTML === grid[k - 1][j].innerHTML) {
                            const newValue = parseInt(grid[k][j].innerHTML) * 2;
                            grid[k][j].innerHTML = newValue;
                            grid[k][j].style.backgroundColor = getTileBackgroundColor(newValue);
                            grid[k - 1][j].innerHTML = '';
                            score += newValue;
                            updateScore();
                            moved = true;
                            break;
                        } else {
                            break;
                        }
                    }
                }
            }
        }
        if (moved) {
            addRandomTile();
        }
    }

    // Handle key events
    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'ArrowLeft':
                moveLeft();
                break;
            case 'ArrowUp':
                moveUp();
                break;
            case 'ArrowRight':
                moveRight();
                break;
            case 'ArrowDown':
                moveDown();
                break;
        }
    });

    // Restart game
    restartBtn.addEventListener('click', () => {
        init();
    });

    // Initialize game
    init();
});
