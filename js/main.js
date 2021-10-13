document.querySelectorAll('button').forEach(element => element.addEventListener('click', runGame))

function runGame(event){
  let playerChoice = event.target.id

  fetch(`/api?player=${playerChoice}`)
    .then(response => response.json())
    .then((data) => {
      document.querySelector('#computer').innerHTML = data.bot
      document.querySelector('#player').innerHTML = playerChoice
      document.querySelector('#winner').innerHTML = data.winner
      console.log(data)
    });
}