const navSlide = () => {
    const burger = document.querySelector('.burger')
    const nav = document.querySelector('.nav-links')
    const navLinks = document.querySelectorAll('.nav-links li')

    

    // Toggle Nav
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active')

        // Animate links
        navLinks.forEach((link, index) => {
            if(link.style.animation){
                link.style.animation = ''
            } else {
                link.style.animation = `navLinkeFade 0.5s ease forwards ${index / 7 + 0.5}s`
            }  
        })

        // Burger Animation 
        burger.classList.toggle('toggle');
    })


}

navSlide();

const myHeaders = new Headers();
myHeaders.append("x-rapidapi-key", "bbbc2fb96f52e3ca56db6171059a67ea");
myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

const requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

// const app = document.getElementById("app");
// const informationsTeams = document.querySelector('.informations-teams');
// const stats = document.querySelector('.stats');
// const nextMatch = document.querySelector('.nextMatch') 
// const previousMatch = document.querySelector('.previousMatch') 
// const liveMatch = document.querySelector('.liveMatchs')

const matchSchedule = document.querySelector('.match-schedule-list')
const matchInfos = document.querySelectorAll('.match-infos')
const league = document.querySelectorAll('.league')
const logoTeamHome = document.querySelectorAll('.logo-team-home')
const logoTeamAway = document.querySelectorAll('.logo-team-away') 
const nameTeamHome = document.querySelectorAll('.name-team-home')
const nameTeamAway = document.querySelectorAll('.name-team-away')
const score = document.querySelectorAll('.score')
const date = document.querySelectorAll('.date'); 
const stadium = document.querySelectorAll('.stadium'); 

league.forEach(paragraph => {
    paragraph.innerHTML = `Hello world`; 
})

console.log(league)


fetch("https://v3.football.api-sports.io/fixtures?season=2021&league=140&team=541&status=NS", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "v3.football.api-sports.io",
		"x-rapidapi-key": "bbbc2fb96f52e3ca56db6171059a67ea"
	}
})
.then(response => response.json().then(data => {
    console.log(data['response'])
    match = data['response']

    const teams = document.querySelector('.match-schedule-list')
    match.forEach((name) => {
        const nameHome = name.teams.home.name; 
        const nameAway = name.teams.away.name; 
        const league = name.league.name;
        const logoTeamHome = name.teams.home.logo;
        const logoTeamAway = name.teams.away.logo;
        const stadium = name.fixture.venue.name;
        const date = new Date(name.fixture.date).toLocaleDateString("fr").replace(/\//g, '.'); 



        const matchInfos = document.createElement('div')
        matchInfos.classList.add('match-infos')

        matchInfos.innerHTML = `
            <p class="league">${league}</p>
            <div class="status-match">
                <div class="team">
                    <img src="${logoTeamHome}" alt="logo équipe ${nameHome}" class="logo-team-home">
                    <p class="name-team-home">${nameHome}</p>
                </div>
                <div class="score">
                    <p>VS</p>
                </div>
                <div class="team">
                    <img src="${logoTeamAway}" alt="logo équipe ${nameAway}" class="logo-team-away">
                    <p class="name-team-away">${nameAway}</p>
                </div> 
            </div>
            <p class="stadium">${stadium}</p>
            <p class="date">${date}</p>
        `
        
        teams.appendChild(matchInfos); 
    })


}))
.catch(err => {
	console.log(err);
});


// fetch("https://v3.football.api-sports.io/teams/statistics?season=2021&team=541&league=140", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "v3.football.api-sports.io",
// 		"x-rapidapi-key": "bbbc2fb96f52e3ca56db6171059a67ea"
// 	}
// })
// .then(response => response.json().then(data => {
//     // console.log(data['response']); 

//     /**
//      * Informations Teams 
//      * Logo - name - league
//      */
//     const team = data['response']['team'].name; 
//     const league = data['response']['league'].name;
//     const logoTeam = document.createElement('img')
//     logoTeam.src = 'https://media.api-sports.io/football/teams/541.png';

//     const name = document.createElement('p'); 
//     const nameLeague = document.createElement('p')


//     name.innerHTML = `nom de l'équipe : ${team}`;
//     nameLeague.innerHTML = `nom de la ligue : ${league}`; 

//     informationsTeams.appendChild(logoTeam)
//     informationsTeams.appendChild(name)
//     informationsTeams.appendChild(nameLeague)

//     /**
//      * Stats teams
//      * goals
//      */
//     const totalGoal = data['response']['goals']['for']['total'].total; 
//     const goalAway = data['response']['goals']['for']['total'].away; 
//     const goalHome = data['response']['goals']['for']['total'].home; 
//     const goal = document.createElement('p')

//     goal.innerHTML = `nombre de but au total cette saison : ${totalGoal} (${goalHome} à domicile, ${goalAway} à l'extérieur)`; 

//     stats.appendChild(goal)

// }))
// .catch(err => {
// 	console.log(err);
// });

// fetch("https://v3.football.api-sports.io/fixtures?season=2021&league=140&team=541&status=NS", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "v3.football.api-sports.io",
// 		"x-rapidapi-key": "bbbc2fb96f52e3ca56db6171059a67ea"
// 	}
// })
// .then(response => response.json().then(data => {
//     // console.log(data['response'])
//     match = data['response']
    
//     /**
//      * Next match 
//      */
//     for(const el of match){
//         const teamsHome = el.teams.home.name; 
//         const teamsAway = el.teams.away.name; 
//         const date = new Date(el.fixture.date).toLocaleDateString("fr"); 
        
//         const nextAdverse = document.createElement('li')
//         nextAdverse.innerHTML = `<li>${teamsHome} vs ${teamsAway} le ${date}</li>`;
        
//         nextMatch.appendChild(nextAdverse)
//     }

// }))
// .catch(err => {
// 	console.log(err);
// });


// fetch("https://v3.football.api-sports.io/fixtures?season=2021&league=140&team=541&status=FT", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "v3.football.api-sports.io",
// 		"x-rapidapi-key": "bbbc2fb96f52e3ca56db6171059a67ea"
// 	}
// })
// .then(response => response.json().then(data => {
//     // console.log(data['response'])
//     match = data['response']
    
//     /**
//      * previous match 
//      */
//     for(const el of match){
//         const teamsHome = el.teams.home.name; 
//         const teamsAway = el.teams.away.name; 
//         const date = new Date(el.fixture.date).toLocaleDateString("fr"); 
//         const goalHome = el.goals.home;
//         const goalAway = el.goals.away;
        
//         const previousAdverse = document.createElement('li')
//         previousAdverse.innerHTML = `<li>${teamsHome} vs ${teamsAway} (${goalHome} - ${goalAway}) le ${date}</li>`;
        
//         previousMatch.appendChild(previousAdverse)
//     }


// }))
// .catch(err => {
// 	console.log(err);
// });


// fetch("https://v3.football.api-sports.io/fixtures?live=all&team=541", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "v3.football.api-sports.io",
// 		"x-rapidapi-key": "bbbc2fb96f52e3ca56db6171059a67ea"
// 	}
// })
// .then(response => response.json().then(data => {
//     console.log(data['response'])
//     match = data['response']
    
//     /**
//      * Live match 
//      */
//     const teamsHome = match['0'].teams.home.name; 
//     const teamsAway = match['0'].teams.away.name; 
//     const goalAway = match['0'].goals.away; 
//     const goalHome = match['0'].goals.home; 
//     const time = match['0'].fixture.status.elapsed; 

//     const score = document.createElement('p'); 
//     score.innerHTML = `${teamsHome} vs ${teamsAway} / Score : ${goalHome} - ${goalAway} - ${time}'`

//     liveMatch.appendChild(score)


// }))
// .catch(err => {
// 	console.log(err);
// });

