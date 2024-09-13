const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');

const start = document.querySelector('.start');
const gameOver = document.querySelector('.game-over');

const audioStart = new Audio('./soung/audio_theme.mp3');
const audioGameOver = new Audio('./soung/audio_gameover.mp3');

// Garantir que o áudio seja carregado antes de tocar
audioStart.load();
audioGameOver.load();

let gameLoop; // Variável para armazenar o loop do jogo
let score = 0; // Contador de canos pulados

const updateDimensions = () => {
  const gameWidth = window.innerWidth;
  const gameHeight = window.innerHeight;

  // Ajusta o tamanho dos canos e do Mario com base na largura da tela
  const pipeWidth = Math.max(gameWidth / 15, 60); // Exemplo de ajuste dinâmico
  const marioWidth = Math.max(gameWidth / 10, 80); // Exemplo de ajuste dinâmico

  pipe.style.width = `${pipeWidth}px`;
  mario.style.width = `${marioWidth}px`;

  // Ajusta a posição do Mario e dos canos
  mario.style.bottom = '0'; // Ajuste fixo, mas você pode calcular com base na altura da tela
};

const startGame = () => {
  pipe.classList.add('pipe-animation'); // Reiniciar a animação do cano
  start.style.display = 'none';

  // Reiniciar áudio do jogo
  audioStart.play();
  
  // Reiniciar o loop do jogo
  updateDimensions(); // Atualiza dimensões antes de começar o jogo
  loop();
};

const restartGame = () => {
  // Resetar estados visuais e de animação
  gameOver.style.display = 'none';
  pipe.style.left = '';
  pipe.style.right = '0';
  pipe.classList.add('pipe-animation'); // Adicionar novamente a animação do pipe
  mario.src = './img/mario.gif';
  mario.style.width = '150px'; // Resetando o tamanho padrão
  mario.style.bottom = '0';

  start.style.display = 'none';

  // Parar o áudio de game over e reiniciar o tema
  audioGameOver.pause();
  audioGameOver.currentTime = 0;

  audioStart.play();
  audioStart.currentTime = 0;

  // Reiniciar o loop do jogo
  clearInterval(gameLoop); // Limpar qualquer loop anterior
  updateDimensions(); // Atualiza dimensões antes de reiniciar
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

    // Verifica se o Mario está colidindo com o cano
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
      pipe.classList.remove('pipe-animation');
      pipe.style.left = `${pipePosition}px`;

      mario.classList.remove('jump');
      mario.style.bottom = `${marioPosition}px`;

      mario.src = './img/game-over.png';
      mario.style.width = '80px';
      mario.style.marginLeft = '50px';

      // Atualiza o score
      gameOver.querySelector('h1').textContent = `Game Over!`;

      // Parar o áudio do jogo e tocar o game over
      audioStart.pause();
      audioGameOver.play();

      gameOver.style.display = 'flex';

      clearInterval(gameLoop); // Parar o loop quando der game over
    }

    // Aumenta o score quando o cano passa pela tela
    if (pipePosition === 0) {
      score++;
    }
  }, 10);
};

// Atualiza as dimensões no carregamento inicial e no redimensionamento da tela
updateDimensions();
window.addEventListener('resize', updateDimensions);

document.addEventListener('keydown', e => {
  if (e.code === 'Space') { // 'Space' é mais consistente que ' '
    jump();
  } else if (e.code === 'Enter') {
    startGame();
  }
});

document.addEventListener('touchstart', e => {
  if (e.touches.length) {
    jump();
  }
});
