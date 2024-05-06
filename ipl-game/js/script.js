function addTeam(Teamname) {
    document.getElementById("output").innerHTML += "<p class='team'>Team: " + Teamname + "</p>";
}

function simulateMatch(team1, team2, points) {
    let team1Runs = Math.floor(Math.random() * 301);
    let team2Runs = Math.floor(Math.random() * 301);

    let output = "<h3>" + team1 + " v/s " + team2 + "</h3>";
    output += "<table>";
    output += "<tr><th>Team</th><th>Runs</th><th>Result</th></tr>";
    output += "<tr><td>" + team1 + "</td><td>" + team1Runs + "</td>";
    let winner = null;
    if (team1Runs > team2Runs) {
        output += "<td class='win'>Win</td>";
        points[getIndex(team1)] += 2;
        winner = team1;
    } else if (team2Runs > team1Runs) {
        output += "<td class='loss'>Loss</td>";
        points[getIndex(team2)] += 2;
        winner = team2;
    } else {
        output += "<td class='tie'>Tie</td>";
        points[getIndex(team1)] += 1;
        points[getIndex(team2)] += 1;
    }
    output += "</tr><tr><td>" + team2 + "</td><td>" + team2Runs + "</td>";
    if (team1Runs < team2Runs) {
        output += "<td class='win'>Win</td>";
    } else if (team2Runs < team1Runs) {
        output += "<td class='loss'>Loss</td>";
    } else {
        output += "<td class='tie'>Tie</td>";
    }
    output += "</tr></table>";
    output += "<p class='winner'>Winner is " + winner + "</p>";
    document.getElementById("output").innerHTML += output;
    return winner;
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

function main() {
    addTeam("8 Teams");

    const teams = [
        "Chennai Super Kings", "Delhi Capitals", "Kolkata Knight Riders",
        "Mumbai Indians", "Royal Challengers Bangalore", "Kings XI Punjab",
        "Rajasthan Royals", "Sunrisers Hyderabad"
    ];

    const points = new Array(teams.length).fill(0);

    document.getElementById("output").innerHTML += "<h3>League Stage:</h3>";

    for (let i = 0; i < teams.length; i++) {
        for (let j = i + 1; j < teams.length; j++) {
            simulateMatch(teams[i], teams[j], points);
        }
    }

    updatePointsTable(teams, points);

    const topTeams = determineTopTeams(teams, points, 4);

    document.getElementById("output").innerHTML += "<h3>Top Teams:</h3>";
    topTeams.forEach(team => {
        document.getElementById("output").innerHTML += "<p>" + team + "</p>";
    });

    document.getElementById("output").innerHTML += "<h3>Qualifier 1:</h3>";
    const qualifier1Winner = simulateMatch(topTeams[0], topTeams[1], points);

    document.getElementById("output").innerHTML += "<h3>Eliminator:</h3>";
    const eliminatorWinner = simulateMatch(topTeams[2], topTeams[3], points);

    document.getElementById("output").innerHTML += "<h3>Qualifier 2:</h3>";
    let qualifier2Winner;
    if (qualifier1Winner === topTeams[0]) {
        qualifier2Winner = simulateMatch(getLoser(topTeams[1], eliminatorWinner), eliminatorWinner, points);
    } else {
        qualifier2Winner = simulateMatch(getLoser(topTeams[0], eliminatorWinner), eliminatorWinner, points);
    }

    document.getElementById("output").innerHTML += "<h3>Final Match:</h3>";
    simulateMatch(qualifier1Winner, qualifier2Winner, points);

    updatePointsTable(teams, points);
}

function getLoser(team1, team2) {
    return Math.random() >= 0.5 ? team1 : team2;
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