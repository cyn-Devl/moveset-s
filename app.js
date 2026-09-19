const grid = document.getElementById('grid');
const emptyMsg = document.getElementById('empty');
const searchInput = document.getElementById('search');

function render(list) {
  grid.innerHTML = '';
  emptyMsg.hidden = list.length !== 0;

  list.forEach(m => {
    const card = document.createElement('div');
    card.className = 'card';

    const images = m.images || (m.image ? [m.image] : []);

    const imagesHtml = images.map(src =>
      `<img src="${src}" alt="${m.name}" loading="lazy" onerror="this.remove()">`
    ).join('');

    card.innerHTML = `
      ${images.length ? `<div class="img-row">${imagesHtml}</div>` : ''}
      <div class="card-body">
        <div class="card-name">${m.name}</div>
        <div class="code-row">
          <code>${m.code}</code>
          <button class="copy-btn">Copy</button>
        </div>
      </div>
    `;

    card.querySelector('.copy-btn').addEventListener('click', (e) => {
      navigator.clipboard.writeText(m.code);
      e.target.textContent = 'Copied';
      e.target.classList.add('copied');
      setTimeout(() => {
        e.target.textContent = 'Copy';
        e.target.classList.remove('copied');
      }, 1200);
    });

    grid.appendChild(card);
  });
}

searchInput.addEventListener('input', () => {
  const q = searchInput.value.toLowerCase();
  render(movesets.filter(m => m.name.toLowerCase().includes(q)));
});

render(movesets);
