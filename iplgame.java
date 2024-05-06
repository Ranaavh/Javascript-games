package function;
import java.util.Random;

public class iplgame {

    public static void addTeam(String Teamname) {
        System.out.println("Team: " + Teamname);
    }

    public static String simulateMatch(String team1, String team2, int[] points) {
        Random random = new Random();
        int team1Runs = random.nextInt(301);
        int team2Runs = random.nextInt(301);

        System.out.println(team1 + " v/s " + team2);
        System.out.println("+----------------------+--------+-------+");
        System.out.println("|        Team          |  Runs  | Result|");
        System.out.println("+----------------------+--------+-------+");
        System.out.printf("| %-20s |  %-5d | ", team1, team1Runs);

        String winner = null;
        if (team1Runs > team2Runs) {
            System.out.println("Win   |");
            points[getIndex(team1)] += 2; // Update points for team1 (2 points for win)
            winner = team1;
        } else if (team2Runs > team1Runs) {
            System.out.println("Loss  |");
            points[getIndex(team2)] += 2; // Update points for team2 (2 points for win)
            winner = team2;
        } else {
            System.out.println("Tie   |");
            points[getIndex(team1)] += 1; // Update points for team1 (1 point for tie)
            points[getIndex(team2)] += 1; // Update points for team2 (1 point for tie)
        }

        // Print details for team2
        System.out.printf("| %-20s |  %-5d | ", team2, team2Runs);
        if (team1Runs < team2Runs) {
            System.out.println("Win   |");
        } else if (team2Runs < team1Runs) {
            System.out.println("Loss  |");
        } else {
            System.out.println("Tie   |");
        }

        System.out.println("+----------------------+--------+-------+"); // Close the table
        System.out.println("Winner is " + winner);
        return winner;
    }


    // Helper method to get index of team in the points array
    public static int getIndex(String team) {
        String[] teams = {
                "Chennai Super Kings",
                "Delhi Capitals",
                "Kolkata Knight Riders",
                "Mumbai Indians",
                "Royal Challengers Bangalore",
                "Kings XI Punjab",
                "Rajasthan Royals",
                "Sunrisers Hyderabad"
        };
        for (int i = 0; i < teams.length; i++) {
            if (teams[i].equals(team)) {
                return i;
            }
        }
        return -1;
    }

    // Helper method to update points table
    public static void updatePointsTable(String[] teams, int[] points) {
        System.out.println("Points Table:");
        System.out.println("+----------------------+------------------+");
        System.out.println("|        Team                     | Points|");
        System.out.println("+----------------------+------------------+");
        for (int i = 0; i < teams.length; i++) {
            System.out.printf("| %-30s |  %-5d |%n", teams[i], points[i]);
        }
        System.out.println("+----------------------+------------------+");
    }

    public static void main(String[] args) {
        System.out.println("8 Teams");

        String[] teams = {
                "Chennai Super Kings",
                "Delhi Capitals",
                "Kolkata Knight Riders",
                "Mumbai Indians",
                "Royal Challengers Bangalore",
                "Kings XI Punjab",
                "Rajasthan Royals",
                "Sunrisers Hyderabad"
        };

        int[] points = new int[teams.length]; // Initialize points array

        System.out.println("League Stage:");

        for (int i = 0; i < teams.length; i++) {
            for (int j = i + 1; j < teams.length; j++) {
                simulateMatch(teams[i], teams[j], points);
            }
        }

        // Update points table
        updatePointsTable(teams, points);

        // Determine top teams
        String[] topTeams = determineTopTeams(teams, points, 4);

        // Display top teams
        System.out.println("\nTop Teams:");
        for (String team : topTeams) {
            System.out.println(team);
        }

        // Qualifier 1 match between top two teams
        System.out.println("\nQualifier 1:");
        String qualifier1Winner = simulateMatch(topTeams[0], topTeams[1], points);

     // Eliminator match between third and fourth-placed teams
        System.out.println("\nEliminator:");
        String eliminatorWinner = simulateMatch(topTeams[2], topTeams[3], points);

        // Qualifier 2 match between loser of Qualifier 1 and winner of Eliminator
        System.out.println("\nQualifier 2:");
     // Qualifier 2 match between loser of Qualifier 1 and winner of Eliminator
        String qualifier2Winner;
        if (qualifier1Winner.equals(topTeams[0])) {
            qualifier2Winner = simulateMatch(getLoser(topTeams[1], eliminatorWinner), eliminatorWinner, points);
        } else {
            qualifier2Winner = simulateMatch(getLoser(topTeams[0], eliminatorWinner), eliminatorWinner, points);
        }

        // Final match between Qualifier 1 winner and Qualifier 2 winner
        System.out.println("\nFinal Match:");
        simulateMatch(qualifier1Winner, qualifier2Winner, points);

        
        // Update final points table
        updatePointsTable(teams, points);
    }
    public static String getWinner(String team1, String team2) {
        if (Math.random() < 0.5) {
            return team1;
        } else {
            return team2;
        }
    }

    public static String getLoser(String team1, String team2) {
        if (Math.random() >= 0.5) {
            return team1;
        } else {
            return team2;
        }
    }

  

    public static String[] determineTopTeams(String[] teams, int[] points, int numTopTeams) {
        // Determine top teams based on points
        String[] topTeams = new String[numTopTeams];
        int[] sortedPoints = points.clone();
        for (int i = 0; i < numTopTeams; i++) {
            int maxPoints = 0;
            int maxIndex = -1;
            for (int j = 0; j < sortedPoints.length; j++) {
                if (sortedPoints[j] > maxPoints) {
                    maxPoints = sortedPoints[j];
                    maxIndex = j;
                }
            }
            topTeams[i] = teams[maxIndex];
            sortedPoints[maxIndex] = -1; // Mark as visited
        }
        return topTeams;
    }
}
