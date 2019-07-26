

function startGame() {
    
    
    //document.getElementById('player-name').innerText = tetrisLocal.player.name    

    tetrisLocal.run();
    
    const connectionManager = new ConnectionManager(tetrisManager);
    connectionManager.connect('ws://' + window.location.hostname + ':9000');
    
    const keyListener = (event) => {
        [
            [37, 39, 38, -1, 40, ],
        ].forEach((key, index) => {
            const player = tetrisLocal.player;
            if (event.type === 'keydown') {
                if (event.keyCode === key[0]) {                
                    player.move(-1);
                } else if (event.keyCode === key[1]) {
                    player.move(1);
                } else if (event.keyCode === key[2]) {
                    player.rotate(-1);
                } else if (event.keyCode === key[3]) {
                    player.rotate(1);
                }
            }
    
            if (event.keyCode === key[4]) {
                if (event.type === 'keydown') {
                    if (player.dropInterval !== player.DROP_FAST) {
                        player.drop();
                        player.dropInterval = player.DROP_FAST;
                    }
                } else {
                    player.dropInterval = player.DROP_SLOW;
                }
            }
        });
    };
    
    document.addEventListener('keydown', keyListener);
    document.addEventListener('keyup', keyListener);
    
    
    let mainMusic = new Audio("assets/audio/theme.mp3");
    mainMusic.loop = true;

    let playingMusic = false;

    document.getElementById('btnMusic').addEventListener('click', function() {
        if (!playingMusic) {
            this.textContent = "Stop Music"
            mainMusic.play();
            playingMusic = true;
        } else {
            this.textContent = "Play Music"            
            mainMusic.pause();
            playingMusic = false
        }
        
    })
}

let playerName = null;

while(!playerName) {
    playerName = prompt("Enter your name");
}

const tetrisManager = new TetrisManager(document);
    const tetrisLocal = tetrisManager.createPlayer(playerName);    
    tetrisLocal.element.classList.add('local');

if (playerName) {
  startGame();
}
