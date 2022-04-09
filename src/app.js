const myHeaders = new Headers();
myHeaders.append("x-rapidapi-key", "bbbc2fb96f52e3ca56db6171059a67ea");
myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

const requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

const app = document.getElementById("app");
const informationsTeams = document.querySelector('.informations-teams');
const stats = document.querySelector('.stats');
const nextMatch = document.querySelector('.nextMatch') 
const previousMatch = document.querySelector('.previousMatch') 
const liveMatch = document.querySelector('.liveMatchs')

fetch("https://v3.football.api-sports.io/teams/statistics?season=2021&team=541&league=140", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "v3.football.api-sports.io",
		"x-rapidapi-key": "bbbc2fb96f52e3ca56db6171059a67ea"
	}
})
.then(response => response.json().then(data => {
    // console.log(data['response']); 

    /**
     * Informations Teams 
     * Logo - name - league
     */
    const team = data['response']['team'].name; 
    const league = data['response']['league'].name;
    const logoTeam = document.createElement('img')
    logoTeam.src = 'https://media.api-sports.io/football/teams/541.png';

    const name = document.createElement('p'); 
    const nameLeague = document.createElement('p')


    name.innerHTML = `nom de l'équipe : ${team}`;
    nameLeague.innerHTML = `nom de la ligue : ${league}`; 

    informationsTeams.appendChild(logoTeam)
    informationsTeams.appendChild(name)
    informationsTeams.appendChild(nameLeague)

    /**
     * Stats teams
     * goals
     */
    const totalGoal = data['response']['goals']['for']['total'].total; 
    const goalAway = data['response']['goals']['for']['total'].away; 
    const goalHome = data['response']['goals']['for']['total'].home; 
    const goal = document.createElement('p')

    goal.innerHTML = `nombre de but au total cette saison : ${totalGoal} (${goalHome} à domicile, ${goalAway} à l'extérieur)`; 

    stats.appendChild(goal)

}))
.catch(err => {
	console.log(err);
});

fetch("https://v3.football.api-sports.io/fixtures?season=2021&league=140&team=541&status=NS", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "v3.football.api-sports.io",
		"x-rapidapi-key": "bbbc2fb96f52e3ca56db6171059a67ea"
	}
})
.then(response => response.json().then(data => {
    // console.log(data['response'])
    match = data['response']
    
    /**
     * Next match 
     */
    for(const el of match){
        const teamsHome = el.teams.home.name; 
        const teamsAway = el.teams.away.name; 
        const date = new Date(el.fixture.date).toLocaleDateString("fr"); 
        
        const nextAdverse = document.createElement('li')
        nextAdverse.innerHTML = `<li>${teamsHome} vs ${teamsAway} le ${date}</li>`;
        
        nextMatch.appendChild(nextAdverse)
    }

}))
.catch(err => {
	console.log(err);
});


fetch("https://v3.football.api-sports.io/fixtures?season=2021&league=140&team=541&status=FT", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "v3.football.api-sports.io",
		"x-rapidapi-key": "bbbc2fb96f52e3ca56db6171059a67ea"
	}
})
.then(response => response.json().then(data => {
    // console.log(data['response'])
    match = data['response']
    
    /**
     * Next match 
     */
    for(const el of match){
        const teamsHome = el.teams.home.name; 
        const teamsAway = el.teams.away.name; 
        const date = new Date(el.fixture.date).toLocaleDateString("fr"); 
        const goalHome = el.goals.home;
        const goalAway = el.goals.away;
        
        const previousAdverse = document.createElement('li')
        previousAdverse.innerHTML = `<li>${teamsHome} vs ${teamsAway} (${goalHome} - ${goalAway}) le ${date}</li>`;
        
        previousMatch.appendChild(previousAdverse)
    }


}))
.catch(err => {
	console.log(err);
});


fetch("https://v3.football.api-sports.io/fixtures?live=all&team=541", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "v3.football.api-sports.io",
		"x-rapidapi-key": "bbbc2fb96f52e3ca56db6171059a67ea"
	}
})
.then(response => response.json().then(data => {
    console.log(data['response'])
    match = data['response']
    
    /**
     * Live match 
     */
    const teamsHome = match['0'].teams.home.name; 
    const teamsAway = match['0'].teams.away.name; 
    const goalAway = match['0'].goals.away; 
    const goalHome = match['0'].goals.home; 
    const time = match['0'].fixture.status.elapsed; 

    const score = document.createElement('p'); 
    score.innerHTML = `${teamsHome} vs ${teamsAway} / Score : ${goalHome} - ${goalAway} - ${time}'`

    liveMatch.appendChild(score)


}))
.catch(err => {
	console.log(err);
});

