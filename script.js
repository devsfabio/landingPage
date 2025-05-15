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
    e.preventDefault(); // Evita ações inesperadas
    conteudo.innerHTML = ''; // Limpa o conteúdo anterior

    // ✅ Pausa todos os vídeos da página (inclusive o que foi clicado)
    document.querySelectorAll('video').forEach((v) => {
      v.pause();
      v.currentTime = 0; // Reinicia o tempo, opcional
    });

    // Cria a imagem ou vídeo no modal
    if (midia.tagName === 'IMG') {
      const img = document.createElement('img');
      img.src = midia.src;
      conteudo.appendChild(img);
    } else if (midia.tagName === 'VIDEO') {
      const video = document.createElement('video');
      video.src = midia.src;
      video.controls = true;
      video.autoplay = true;
      video.style.maxWidth = '100%';
      conteudo.appendChild(video);
    }

    modal.style.display = 'flex';
  });
});

// Fecha o modal ao clicar no X
fechar.addEventListener('click', () => {
  modal.style.display = 'none';
  conteudo.innerHTML = '';
  // ✅ Pausa o vídeo no modal
  const video = conteudo.querySelector('video');
  if (video) video.pause();
});

// Fecha ao clicar fora
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    conteudo.innerHTML = '';
    // ✅ Pausa o vídeo do modal
    const video = conteudo.querySelector('video');
    if (video) video.pause();
  }
});
