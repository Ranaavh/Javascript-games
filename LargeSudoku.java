package array;

import java.util.Scanner;

public class LargeSudoku {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        int[][] matrix = {
            {5, 3, 0, 0, 7, 0, 0, 0, 0},
            {6, 0, 0, 1, 9, 5, 0, 0, 0},
            {0, 9, 8, 0, 0, 0, 0, 6, 0},
            {8, 0, 0, 0, 6, 0, 0, 0, 3},
            {4, 0, 0, 8, 0, 3, 0, 0, 1},
            {7, 0, 0, 0, 2, 0, 0, 0, 6},
            {0, 6, 0, 0, 0, 0, 2, 8, 0},
            {0, 0, 0, 4, 1, 9, 0, 0, 5},
            {0, 0, 0, 0, 8, 0, 0, 7, 9}
        };

        // Print the matrix
        System.out.println("Matrix is ");
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                System.out.print(matrix[i][j] + " ");
            }
            System.out.println();
        }

        System.out.println("Enter the missing numbers for the Sudoku puzzle (replace 0 with the correct number):");

        // Fill in missing numbers
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                if (matrix[i][j] == 0) {
                    System.out.print("Enter the number for position (" + i + ", " + j + "): ");
                    matrix[i][j] = scanner.nextInt();
                }
            }
        }

        // Print updated matrix
        System.out.println("your matrix");
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                System.out.print(matrix[i][j] + " ");
            }
            System.out.println();
        }

        // Compare updated matrix with the correct Sudoku matrix
        int[][] correctMatrix = {
            {5, 3, 4, 6, 7, 8, 9, 1, 2},
            {6, 7, 2, 1, 9, 5, 3, 4, 8},
            {1, 9, 8, 3, 4, 2, 5, 6, 7},
            {8, 5, 9, 7, 6, 1, 4, 2, 3},
            {4, 2, 6, 8, 5, 3, 7, 9, 1},
            {7, 1, 3, 9, 2, 4, 8, 5, 6},
            {9, 6, 1, 5, 3, 7, 2, 8, 4},
            {2, 8, 7, 4, 1, 9, 6, 3, 5},
            {3, 4, 5, 2, 8, 6, 1, 7, 9}
        };

        boolean isValid = true;
        for (int i = 0; i < 9 && isValid; i++) {
            for (int j = 0; j < 9 && isValid; j++) {
                if (matrix[i][j] != correctMatrix[i][j]) {
                    isValid = false;
                }
            }
        }

        if (isValid) {
            System.out.println("Correct Sudoku");
        } else {
            System.out.println("Not valid");
        }
    }
}