// Smooth scrolling para links internos
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
    });
  });
});

// Efeito de rolagem no header
window.addEventListener('scroll', function () {
  const header = document.querySelector('header');
  header.classList.toggle('sticky', window.scrollY > 0);
});

const midias = document.querySelectorAll('.midia');
const modal = document.getElementById('modal');
const conteudo = modal.querySelector('.modal-conteudo');
const fechar = modal.querySelector('.fechar');

midias.forEach((midia) => {
  midia.addEventListener('click', (e) => {
    e.preventDefault();
    conteudo.innerHTML = '';

    // ✅ Pausa todos os vídeos da página (original incluso)
    document.querySelectorAll('video').forEach((v) => {
      v.pause();
      v.currentTime = 0;
    });

    if (midia.tagName === 'IMG') {
      const img = document.createElement('img');
      img.src = midia.src;
      conteudo.appendChild(img);
    } else if (midia.tagName === 'VIDEO') {
      // ✅ Clona o vídeo sem estado anterior
      const video = midia.cloneNode(true);
      video.controls = true;
      video.autoplay = true;
      video.currentTime = 0;
      conteudo.appendChild(video);

      // 🔒 Garante que o som não venha do original
      midia.pause();
    }

    modal.style.display = 'flex';
  });
});

// Fecha com botão X
fechar.addEventListener('click', () => {
  modal.style.display = 'none';
  conteudo.innerHTML = '';

  const video = conteudo.querySelector('video');
  if (video) video.pause();
});

// Fecha clicando fora do conteúdo
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    conteudo.innerHTML = '';

    const video = conteudo.querySelector('video');
    if (video) video.pause();
  }
});
