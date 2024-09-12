const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');

const start = document.querySelector('.start');
const gameOver = document.querySelector('.game-over');

audioStart = new Audio('./soung/audio_theme.mp3');
audioGameOver = new Audio('./soung/audio_gameover.mp3');

// Garantir que o áudio seja carregado antes de tocar
audioStart.load();
audioGameOver.load();

let gameLoop; // Variável para armazenar o loop do jogo

const startGame = () => {
  pipe.classList.add('pipe-animation'); // Reiniciar a animação do cano
  start.style.display = 'none';

  // Reiniciar áudio do jogo
  audioStart.play();
  
  // Reiniciar o loop do jogo
  loop();
};

const restartGame = () => {
  // Resetar estados visuais e de animação
  gameOver.style.display = 'none';
  pipe.style.left = '';
  pipe.style.right = '0';
  pipe.classList.add('pipe-animation'); // Adicionar novamente a animação do pipe
  mario.src = './img/mario.gif';
  mario.style.width = '150px';
  mario.style.bottom = '0';

  start.style.display = 'none';

  // Parar o áudio de game over e reiniciar o tema
  audioGameOver.pause();
  audioGameOver.currentTime = 0;

  audioStart.play();
  audioStart.currentTime = 0;

  // Reiniciar o loop do jogo
  clearInterval(gameLoop); // Limpar qualquer loop anterior
  loop();
};

const jump = () => {
  mario.classList.add('jump');

  setTimeout(() => {
    mario.classList.remove('jump');
  }, 800);
};

const loop = () => {
  gameLoop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = parseFloat(
      window.getComputedStyle(mario).bottom.replace('px', '')
    );

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
      pipe.classList.remove('pipe-animation');
      pipe.style.left = `${pipePosition}px`;

      mario.classList.remove('jump');
      mario.style.bottom = `${marioPosition}px`;

      mario.src = './img/game-over.png';
      mario.style.width = '80px';
      mario.style.marginLeft = '50px';

      // Parar o áudio do jogo e tocar o game over
      audioStart.pause();
      audioGameOver.play();

      gameOver.style.display = 'flex';

      clearInterval(gameLoop); // Parar o loop quando der game over
    }
  }, 10);
};



document.addEventListener('keypress', e => {
  const tecla = e.key;
  if (tecla === ' ') {
    jump();
  }
});

document.addEventListener('touchstart', e => {
  if (e.touches.length) {
    jump();
  }
});

document.addEventListener('keypress', e => {
  const tecla = e.key;
  if (tecla === 'Enter') {
    startGame();
  }
});
