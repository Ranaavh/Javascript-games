
package array;
import java.util.Scanner;

public class tictaktoe {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Welcome to Tic-Tac-Toe");
        char[][] matrix = {
                {' ', ' ', ' '},
                {' ', ' ', ' '},
                {' ', ' ', ' '}
        };

        System.out.println("Hi, PLAYER 1....\nSelect your symbol: X or O");
        char symbol1 = scanner.next().charAt(0);
        char symbol2;

        if (symbol1 == 'X') {
            System.out.println("X for PLAYER 1\nO for PLAYER 2");
            symbol2 = 'O';
        } else {
            System.out.println("O for PLAYER 1\nX for PLAYER 2");
            symbol2 = 'X';
        }

        int row, col;
        boolean validInput;

        for (int i = 0; i < 9; i++) {
            if (i % 2 == 0) {
                System.out.println("Player 1, enter row and column:");
                validInput = false;
                while (!validInput) {
                    row = scanner.nextInt();
                    col = scanner.nextInt();
                    if (row >= 0 && row < 3 && col >= 0 && col < 3 && matrix[row][col] == ' ') {
                        matrix[row][col] = symbol1;
                        validInput = true;
                    } else {
                        System.out.println("Invalid input, try again.");
                    }
                }
            } else {
                System.out.println("Player 2, enter row and column:");
                validInput = false;
                while (!validInput) {
                    row = scanner.nextInt();
                    col = scanner.nextInt();
                    if (row >= 0 && row < 3 && col >= 0 && col < 3 && matrix[row][col] == ' ') {
                        matrix[row][col] = symbol2;
                        validInput = true;
                    } else {
                        System.out.println("Invalid input, try again.");
                    }
                }
            }

            for (int j = 0; j < 3; j++) {
                for (int k = 0; k < 3; k++) {
                    System.out.print(matrix[j][k] + " |");
                }
                System.out.println("");
            }

            // Check for a winner or a draw
            if ((matrix[0][0] == symbol1 && matrix[0][1] == symbol1 && matrix[0][2] == symbol1) ||
                (matrix[1][0] == symbol1 && matrix[1][1] == symbol1 && matrix[1][2] == symbol1) ||
                (matrix[2][0] == symbol1 && matrix[2][1] == symbol1 && matrix[2][2] == symbol1) ||

                (matrix[0][0] == symbol1 && matrix[1][0] == symbol1 && matrix[2][0] == symbol1) ||
                (matrix[0][1] == symbol1 && matrix[1][1] == symbol1 && matrix[2][1] == symbol1) ||
                (matrix[0][2] == symbol1 && matrix[1][2] == symbol1 && matrix[2][2] == symbol1) ||

                (matrix[0][0] == symbol1 && matrix[1][1] == symbol1 && matrix[2][2] == symbol1) ||
                (matrix[0][2] == symbol1 && matrix[1][1] == symbol1 && matrix[2][0] == symbol1)) {
                System.out.println("Player 1 wins!");
                return;
            } else if ((matrix[0][0] == symbol2 && matrix[0][1] == symbol2 &&matrix[0][2] == symbol2) ||
                       (matrix[1][0] == symbol2 && matrix[1][1] == symbol2 && matrix[1][2] == symbol2) ||
                       (matrix[2][0] == symbol2 && matrix[2][1] == symbol2 && matrix[2][2] == symbol2) ||

                       (matrix[0][0] == symbol2 && matrix[1][0] == symbol2 && matrix[2][0] == symbol2) ||
                       (matrix[0][1] == symbol2 && matrix[1][1] == symbol2 && matrix[2][1] == symbol2) ||
                       (matrix[0][2] == symbol2 && matrix[1][2] == symbol2 && matrix[2][2] == symbol2) ||

                       (matrix[0][0] == symbol2 && matrix[1][1] == symbol2 && matrix[2][2] == symbol2) ||
                       (matrix[0][2] == symbol2 && matrix[1][1] == symbol2 && matrix[2][0] == symbol2)) {
                System.out.println("Player 2 wins!");
                return;
            } else if (matrix[0][0] != ' ' && matrix[0][1] != ' ' && matrix[0][2] != ' ' &&
                       matrix[1][0] != ' ' && matrix[1][1] != ' ' && matrix[1][2] != ' ' &&
                       matrix[2][0] != ' ' && matrix[2][1] != ' ' && matrix[2][2] != ' ') {
                System.out.println("The game is a draw.");
                return;
            }
        }
    }
}