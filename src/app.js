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
const allMatch = document.querySelector('.match-schedule')

const navLinksActive = document.querySelectorAll('.nav-links li a')
function activeLink(){
    navLinksActive.forEach((link) => link.classList.remove('active'));
    this.classList.add('active');

    if(navLinksActive[1].classList.contains('active')){
        allMatch.style.display = 'block'
    }
}

navLinksActive.forEach((link) => link.addEventListener('click', activeLink)); 

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


league.forEach(paragraph => {
    paragraph.innerHTML = `Hello world`; 
})


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

fetch("https://v3.football.api-sports.io/fixtures?season=2021&league=140&team=541&status=FT", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "v3.football.api-sports.io",
		"x-rapidapi-key": "bbbc2fb96f52e3ca56db6171059a67ea"
	}
})
.then(response => response.json().then(data => {
    // console.log(data['response'])
    matchHistory = data['response']
    
    /**
     * previous match 
     */
     const matchScheduleHistory = document.querySelector('.match-schedule-history')
     matchHistory.forEach((name) => {
        const nameHome = name.teams.home.name; 
        const nameAway = name.teams.away.name; 
        const league = name.league.name;
        const logoTeamHome = name.teams.home.logo;
        const logoTeamAway = name.teams.away.logo;
        const stadium = name.fixture.venue.name;
        const date = new Date(name.fixture.date).toLocaleDateString("fr").replace(/\//g, '.'); 
        const goalHome = name.goals.home;
        const goalAway = name.goals.away;


        const matchInfosHistory = document.createElement('div')
        matchInfosHistory.classList.add('match-infos')

        matchInfosHistory.innerHTML = `
            <p class="league">${league}</p>
            <div class="status-match">
                <div class="team">
                    <img src="${logoTeamHome}" alt="logo équipe ${nameHome}" class="logo-team-home">
                    <p class="name-team-home">${nameHome}</p>
                </div>
                <div class="score">
                    <p>${goalHome} : ${goalAway}</p>
                </div>
                <div class="team">
                    <img src="${logoTeamAway}" alt="logo équipe ${nameAway}" class="logo-team-away">
                    <p class="name-team-away">${nameAway}</p>
                </div> 
            </div>
            <p class="stadium">${stadium}</p>
            <p class="date">${date}</p>
        `
        
        matchScheduleHistory.appendChild(matchInfosHistory); 
    })
}))
.catch(err => {
	console.log(err);
});