const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')
const plays = ['rock', 'paper', 'scissors', 'lizard', 'spock']

function getWinner(playerChoice, botChoice){
  if(playerChoice === botChoice) {
    return 'Draw'
  } else if (playerChoice === 'spock' && (botChoice === 'scissors' || botChoice === 'rock')){
    return 'Player Wins'
  } else if (playerChoice === 'scissors' && (botChoice === 'paper' || botChoice === 'lizard')){
    return 'Player Wins'
  } else if (playerChoice === 'paper' && (botChoice === 'rock' || botChoice === 'spock')){
    return 'Player Wins'
  } else if (playerChoice === 'rock' && (botChoice === 'lizard' || botChoice === 'scissors')){
    return 'Player Wins'
  }else if (playerChoice === 'lizard' && (botChoice === 'spock' || botChoice === 'paper')){
    return 'Player Wins'
  } else {
    return 'Bot Wins'
  }
}


const server = http.createServer(function(req, res) {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  if (page == '/') {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if (page == '/api') {
    if('player' in params){
      const playerChoice = params ['player']
      const botIndex = Math.floor(Math.random() * 5)

      res.writeHead(200, {'Content-Type': 'application/json'});
      const objToJson = {
        winner: getWinner(playerChoice, plays[botIndex]),
        bot: plays[botIndex],
      }
      res.end(JSON.stringify(objToJson));
    }
  }
  else if (page == '/css/style.css'){
    fs.readFile('css/style.css', function(err, data) {
      res.write(data);
      res.end();
    });
  }else if (page == '/js/main.js'){
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  }else{
    figlet('404!!', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8500);
