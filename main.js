const numeroSenha = document.querySelector('.parametro-senha__texto');
let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;

const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvxywz';
const numeros = '0123456789';
const simbolos = '!@%*?';

const botoes = document.querySelectorAll('.parametro-senha__botao');
const campoSenha = document.querySelector('#campo-senha');
const checkbox = document.querySelectorAll('.checkbox');
const forcaSenha = document.querySelector('.forca');

botoes[0].onclick = diminuiTamanho;
botoes[1].onclick = aumentaTamanho;

function diminuiTamanho() {
  if (tamanhoSenha > 1) {
    tamanhoSenha--;
  }
  numeroSenha.textContent = tamanhoSenha;
  geraSenha();
}

function aumentaTamanho() {
  if (tamanhoSenha < 20) {
    tamanhoSenha++;
  }
  numeroSenha.textContent = tamanhoSenha;
  geraSenha();
}

for (let i = 0; i < checkbox.length; i++) {
  checkbox[i].onclick = geraSenha;
}

geraSenha();

function geraSenha() {
  let alfabeto = '';
  if (checkbox[0].checked) alfabeto += letrasMaiusculas;
  if (checkbox[1].checked) alfabeto += letrasMinusculas;
  if (checkbox[2].checked) alfabeto += numeros;
  if (checkbox[3].checked) alfabeto += simbolos;

  let senha = '';
  for (let i = 0; i < tamanhoSenha; i++) {
    let numeroAleatorio = Math.floor(Math.random() * alfabeto.length);
    senha += alfabeto[numeroAleatorio];
  }

  campoSenha.value = senha;
  classificaSenha(alfabeto.length);
}

function classificaSenha(tamanhoAlfabeto) {
  let entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
  forcaSenha.classList.remove('fraca', 'media', 'forte');
  if (entropia > 57) {
    forcaSenha.classList.add('forte');
  } else if (entropia > 35 && entropia <= 57) {
    forcaSenha.classList.add('media');
  } else {
    forcaSenha.classList.add('fraca');
  }

  const valorEntropia = document.querySelector('.entropia');
  valorEntropia.textContent =
    'Um computador pode levar até ' +
    Math.floor(2 ** entropia / (100e6 * 60 * 60 * 24)) +
    ' dias para descobrir essa senha.';
}

// tsParticles
tsParticles.load("tsparticles", {
  particles: {
    number: { value: 50 },
    color: { value: "#ff4d4d" },
    size: { value: 3 },
    move: { enable: true, speed: 1 },
    links: {
      enable: true,
      color: "#ff4d4d",
      distance: 100
    }
  },
  background: {
    color: "transparent"
  }
});

const container = document.getElementById('tsparticles');
if (container) {
  const canvas = document.createElement('canvas');
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let width, height;
  let bubbles = [];
  const cadeadoImg = new Image();
  cadeadoImg.src = 'cadeado.png'; // Coloque sua imagem de cadeado nesta pasta

  cadeadoImg.onload = function() {
    resize();
    initBubbles(); // Chama a função para criar as bolhas
    animate(); // Inicia a animação
  };

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    canvas.width = width;
    canvas.height = height;
  }

  window.addEventListener('resize', resize);

  class Bubble {
    constructor() {
      this.x = Math.random() * width;
      this.y = height + 20;
      this.size = Math.random() * 20 + 15;
      this.speed = Math.random() * 1 + 0.5;
      this.opacity = Math.random() * 0.5 + 0.3;
    }

    update() {
      this.y -= this.speed;
      if (this.y + this.size < 0) {
        this.x = Math.random() * width;
        this.y = height + 20;
        this.size = Math.random() * 20 + 15;
        this.speed = Math.random() * 1 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.3;
      }
    }

    draw() {
      if (cadeadoImg.complete) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.drawImage(cadeadoImg, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
        ctx.restore();
      } else {
        // fallback: desenha bolha branca
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
      }
    }
  }

  function initBubbles(count = 50) {
    bubbles = [];
    for (let i = 0; i < count; i++) {
      let b = new Bubble();
      b.y = Math.random() * height;
      bubbles.push(b);
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    bubbles.forEach(b => {
      b.update();
      b.draw();
    });
    requestAnimationFrame(animate);
  }
}
