
        function addTeam(Teamname) {
            document.getElementById("output").innerHTML += "<p class='team'>Team: " + Teamname + "</p>";
        }

        function simulateMatch(team1, team2, points, team1Runs, team2Runs) {
            let output = "<h3>" + team1 + " v/s " + team2 + "</h3>";
            output += "<table>";
            output += "<tr><th>Team</th><th>Runs</th><th>Result</th></tr>";
            output += "<tr><td>" + team1 + "</td><td>" + (isNaN(team1Runs) ? "N/A" : team1Runs) + "</td>";

            if (!isNaN(team1Runs) && !isNaN(team2Runs)) {
                if (team1Runs > team2Runs) {
                    output += "<td class='win'>Win</td>";
                    points[getIndex(team1)] += 2;
                } else if (team2Runs > team1Runs) {
                    output += "<td class='loss'>Loss</td>";
                    points[getIndex(team2)] += 2;
                } else {
                    output += "<td class='tie'>Tie</td>";
                    points[getIndex(team1)] += 1;
                    points[getIndex(team2)] += 1;
                }
            } else {
                output += "<td class='tie'>Tie</td>";
                points[getIndex(team1)] += 1;
                points[getIndex(team2)] += 1;
            }

            output += "</tr><tr><td>" + team2 + "</td><td>" + (isNaN(team2Runs) ? "N/A" : team2Runs) + "</td>";

            if (!isNaN(team1Runs) && !isNaN(team2Runs)) {
                if (team1Runs < team2Runs) {
                    output += "<td class='win'>Win</td>";
                } else if (team2Runs < team1Runs) {
                    output += "<td class='loss'>Loss</td>";
                } else {
                    output += "<td class='tie'>Tie</td>";
                }
            } else {
                output += "<td class='tie'>Tie</td>";
            }

            output += "</tr></table>";
            document.getElementById("output").innerHTML += output;
        }

        function getIndex(team) {
            const teams = [
                "Chennai Super Kings", "Delhi Capitals", "Kolkata Knight Riders",
                "Mumbai Indians", "Royal Challengers Bangalore", "Kings XI Punjab",
                "Rajasthan Royals", "Sunrisers Hyderabad"
            ];
            return teams.indexOf(team);
        }

        function updatePointsTable(teams, points) {
            let output = "<h3>Points Table:</h3>";
            output += "<table>";
            output += "<tr><th>Team</th><th>Points</th></tr>";
            for (let i = 0; i < teams.length; i++) {
                output += "<tr><td>" + teams[i] + "</td><td>" + points[i] + "</td></tr>";
            }
            output += "</table>";
            document.getElementById("output").innerHTML += output;
        }

        function generateMatchInputs() {
            const teams = [
                "Chennai Super Kings", "Delhi Capitals", "Kolkata Knight Riders",
                "Mumbai Indians", "Royal Challengers Bangalore", "Kings XI Punjab",
                "Rajasthan Royals", "Sunrisers Hyderabad"
            ];
            const matchesInputs = document.getElementById("matchesInputs");
            for (let i = 0; i < teams.length; i++) {
                for (let j = i + 1; j < teams.length; j++) {
                    const matchInput = document.createElement("div");
                    matchInput.innerHTML = "<h4>" + teams[i] + " v/s " + teams[j] + "</h4>" +
                        "<label for='team1Runs" + i + j + "'>Runs scored by " + teams[i] + ":</label>" +
                        "<input type='number' id='team1Runs" + i + j + "' name='team1Runs" + i + j + "'><br><br>" +
                        "<label for='team2Runs" + i + j + "'>Runs scored by " + teams[j] + ":</label>" +
                        "<input type='number' id='team2Runs" + i + j + "' name='team2Runs" + i + j + "'><br><br>";
                    matchesInputs.appendChild(matchInput);
                }
            }
        }

        function main() {
            addTeam("8 Teams");
            generateMatchInputs();

            const teams = [
                "Chennai Super Kings", "Delhi Capitals", "Kolkata Knight Riders",
                "Mumbai Indians", "Royal Challengers Bangalore", "Kings XI Punjab",
                "Rajasthan Royals", "Sunrisers Hyderabad"
            ];

            const points = new Array(teams.length).fill(0);

            document.getElementById("runsForm").addEventListener("submit", function(event) {
                event.preventDefault();

                for (let i = 0; i < teams.length; i++) {
                    for (let j = i + 1; j < teams.length; j++) {
                        const team1Runs = parseInt(document.getElementById("team1Runs" + i + j).value);
                        const team2Runs = parseInt(document.getElementById("team2Runs" + i + j).value);
                        simulateMatch(teams[i], teams[j], points, team1Runs, team2Runs);
                    }
                }

                updatePointsTable(teams, points);

                populateMatchInputsForKnockout(teams, points);
            });
        }
        document.getElementById("simulateFinalMatch").addEventListener("click", function() {
            const qualifier1Loser = document.getElementById("qualifier1Loser").value;
            const eliminatorWinner = document.getElementById("eliminatorWinner").value;
            simulateFinalMatch(qualifier1Loser, eliminatorWinner);
        });
       function populateMatchInputsForKnockout(teams, points) {
    const topTeams = determineTopTeams(teams, points, 4);

    // Qualifier 1
    document.getElementById("qualifier1Form").innerHTML = "<h3>Qualifier 1</h3>";
    document.getElementById("qualifier1Form").innerHTML += "<label for='qualifier1Team1Runs'>Runs scored by " + topTeams[0] + ":</label>" +
        "<input type='number' id='qualifier1Team1Runs' name='qualifier1Team1Runs'><br><br>" +
        "<label for='qualifier1Team2Runs'>Runs scored by " + topTeams[1] + ":</label>" +
        "<input type='number' id='qualifier1Team2Runs' name='qualifier1Team2Runs'><br><br>";

    // Eliminator
    document.getElementById("eliminatorForm").innerHTML = "<h3>Eliminator</h3>";
    document.getElementById("eliminatorForm").innerHTML += "<label for='eliminatorTeam1Runs'>Runs scored by " + topTeams[2] + ":</label>" +
        "<input type='number' id='eliminatorTeam1Runs' name='eliminatorTeam1Runs'><br><br>" +
        "<label for='eliminatorTeam2Runs'>Runs scored by " + topTeams[3] + ":</label>" +
        "<input type='number' id='eliminatorTeam2Runs' name='eliminatorTeam2Runs'><br><br>";

    // Add button for simulating Qualifier 2
    const qualifier2Button = document.createElement("button");
    qualifier2Button.textContent = "Simulate Qualifier 2";
    qualifier2Button.setAttribute("type", "button");
    qualifier2Button.addEventListener("click", function() {
        const loserQualifier1 = determineMatchLoser(document.getElementById("qualifier1Team1Runs").value, document.getElementById("qualifier1Team2Runs").value, topTeams);
        const winnerEliminator = determineMatchWinner(document.getElementById("eliminatorTeam1Runs").value, document.getElementById("eliminatorTeam2Runs").value, topTeams);
        simulateQualifier2(loserQualifier1, winnerEliminator);
    });
    document.getElementById("eliminatorForm").appendChild(qualifier2Button);
}

function simulateQualifier2(qualifier1Loser, eliminatorWinner) {
    const qualifier2Form = document.getElementById("qualifier2Form");
    qualifier2Form.innerHTML = "<h3>Qualifier 2</h3>";
    qualifier2Form.innerHTML += "<label for='qualifier2Team1Runs'>Runs scored by " + qualifier1Loser + ":</label>" +
        "<input type='number' id='qualifier2Team1Runs' name='qualifier2Team1Runs'><br><br>" +
        "<label for='qualifier2Team2Runs'>Runs scored by " + eliminatorWinner + ":</label>" +
        "<input type='number' id='qualifier2Team2Runs' name='qualifier2Team2Runs'><br><br>";

    const finalMatchButton = document.createElement("button");
    finalMatchButton.textContent = "Simulate Final Match";
    finalMatchButton.setAttribute("type", "button");
    finalMatchButton.addEventListener("click", function() {
        simulateFinalMatch(qualifier1Loser, eliminatorWinner);
    });
    qualifier2Form.appendChild(finalMatchButton);

    // Clear previous final match result, if any
    document.getElementById("finalMatchResult").innerHTML = "";
}


        function determineMatchWinner(runsTeam1, runsTeam2, topTeams) {
            return parseInt(runsTeam1) > parseInt(runsTeam2) ? topTeams[2] : topTeams[3];
        }
        function determineMatchLoser(runsTeam1, runsTeam2, topTeams) {
            return parseInt(runsTeam1) < parseInt(runsTeam2) ? topTeams[0] : topTeams[1];
        }

        
        

        function simulateFinalMatch(team1, team2) {
            const team1Runs = document.getElementById("qualifier2Team1Runs").value;
            const team2Runs = document.getElementById("qualifier2Team2Runs").value;
        
            let winner, loser;
        
            if (parseInt(team1Runs) > parseInt(team2Runs)) {
                winner = team1;
                loser = team2;
            } else if (parseInt(team2Runs) > parseInt(team1Runs)) {
                winner = team2;
                loser = team1;
            } else {
                // Handle tie scenario if needed
            }
        
            const output = "<h3>Final Match Result</h3>" +
                "<p>Winner: " + winner + "</p>" +
                "<p>Loser: " + loser + "</p>";
        
            // Append the final match result to the finalMatchResult div
            document.getElementById("finalMatchResult").innerHTML = output;
            
        }
        
        function determineTopTeams(teams, points, numTopTeams) {
            const topTeams = [];
            const sortedPoints = [...points];
            for (let i = 0; i < numTopTeams; i++) {
                let maxPoints = 0;
                let maxIndex = -1;
                for (let j = 0; j < sortedPoints.length; j++) {
                    if (sortedPoints[j] > maxPoints) {
                        maxPoints = sortedPoints[j];
                        maxIndex = j;
                    }
                }
                topTeams.push(teams[maxIndex]);
                sortedPoints[maxIndex] = -1;
            }
            return topTeams;
        }

        main();
 