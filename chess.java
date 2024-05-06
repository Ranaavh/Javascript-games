package array;
import java.util.Scanner;


public class chess {
	
	public static void main(String[] args) {
		Scanner scanner = new Scanner(System.in);
        System.out.println("Welcome to Chess");

        char[][] board = {
                {'r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'},
                {'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'},
                {' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '},
                {' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '},
                {' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '},
                {' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '},
                {'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'},
                {'R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'}
        };
        for (int i = 0; i < 8; i++) {
            for (int j = 0; j < 8; j++) {
                System.out.print(board[i][j] + " ");
            }
            System.out.println();
        }
    
        System.out.println("Player, make your pawn move");
        System.out.print("ROW: ");
        int row = scanner.nextInt();
        System.out.print("COLUMN: ");
        int col = scanner.nextInt();
        
       
        if (row == 1 && board[row][col] == 'p') {
            // Move the player's pawn forward two squares
            board[row][col] = ' '; // Clearing the current position
            board[row + 2][col] = 'p'; // Moving the pawn forward
            
            // Display the updated board after player's move
            System.out.println("Board after player's move:");
            for (int i = 0; i < 8; i++) {
                for (int j = 0; j < 8; j++) {
                    System.out.print(board[i][j] + " ");
                }
                System.out.println();
            }
        } else {
            System.out.println("Invalid move");
        }
        
        System.out.println("Computer's move");
        int compRow = 6; // Select a pawn from the second -first row
        int compCol = (int) (Math.random() * 8); // Randomly select a column
        int moveRow = compRow - 2; // Move the pawn two squares forward
        int moveCol = compCol;
        
        // Move the computer's pawn
        board[compRow][compCol] = ' '; // Clearing the current position
        board[moveRow][moveCol] = 'P'; // Moving the pawn forward
        
        // Display the updated board after computer's move
        System.out.println("Board after computer's move:");
        for (int i = 0; i < 8; i++) {
            for (int j = 0; j < 8; j++) {
                System.out.print(board[i][j] + " ");
            }
            System.out.println();
        }
	}
    
    
   
}
