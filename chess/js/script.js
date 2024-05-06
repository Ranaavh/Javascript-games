// Initialize the initial chessboard
let board = [
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
];

// Function to display the chessboard
function displayChessboard(board, tableId) {
    let table = document.getElementById(tableId);
    table.innerHTML = ''; // Clear the table content
    
    for (let i = 0; i < 8; i++) {
        let row = document.createElement('tr');
        for (let j = 0; j < 8; j++) {
            let cell = document.createElement('td');
            cell.textContent = board[i][j];
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
}

// Display the initial board
displayChessboard(board, 'initialBoard');

// Function to handle the player's move
function playerMove() {
    let row = parseInt(document.getElementById("row").value) - 1;
    let col = parseInt(document.getElementById("column").value) - 1;

    if (row >= 0 && row < 8 && col >= 0 && col < 8) {
        if (board[row][col] === 'p') {
            // Update the board
            board[row][col] = ' '; // Clearing the current position
            let updatedBoard = JSON.parse(JSON.stringify(board)); // Deep copy
            updatedBoard[row + 1][col] = 'p'; // Moving the pawn forward

            // Display the updated board
            displayChessboard(updatedBoard, 'updatedBoard');

            // Store the updated board after player's move
            board = updatedBoard;

            // Computer's move (just a sample move)
            let compRow = 6; // Select a pawn from the second-first row
            let compCol = Math.floor(Math.random() * 8); // Randomly select a column
            let moveRow = compRow - 2; // Move the pawn two squares forward

            // Move the computer's pawn
            board[compRow][compCol] = ' '; // Clearing the current position
            board[moveRow][compCol] = 'P'; // Moving the pawn forward

            // Display the updated board after computer's move
            displayChessboard(board, 'computerBoard');
        } else {
            alert("There is no pawn in the selected position.");
        }
    } else {
        alert("Invalid row or column. Please enter values between 1 and 8.");
    }
}

