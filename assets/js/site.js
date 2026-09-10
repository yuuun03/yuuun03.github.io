(() => {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  navToggle?.addEventListener('click', () => {
    const open = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!open));
    nav?.classList.toggle('is-open', !open);
  });

  document.querySelectorAll('.submenu-toggle').forEach((button) => {
    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!open));
      button.closest('.nav-group')?.classList.toggle('submenu-open', !open);
    });
  });

  document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const track = carousel.querySelector('[data-carousel-track]');
    const prev = carousel.querySelector('[data-carousel-prev]');
    const next = carousel.querySelector('[data-carousel-next]');
    const step = () => {
      const card = track?.querySelector('.highlight-card');
      if (!card || !track) return 0;
      return card.getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap || 0);
    };
    const update = () => {
      if (!track || !prev || !next) return;
      const max = track.scrollWidth - track.clientWidth - 1;
      prev.disabled = track.scrollLeft <= 0;
      next.disabled = track.scrollLeft >= max;
      carousel.classList.toggle('is-static', max <= 0);
    };
    prev?.addEventListener('click', () => track?.scrollBy({ left: -step(), behavior: 'smooth' }));
    next?.addEventListener('click', () => track?.scrollBy({ left: step(), behavior: 'smooth' }));
    track?.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  });

  const browser = document.querySelector('[data-blog-browser]');
  if (!browser) return;

  const list = browser.querySelector('[data-blog-list]');
  const cards = [...browser.querySelectorAll('.post-card')];
  const search = browser.querySelector('[data-blog-search]');
  const category = browser.querySelector('[data-blog-category]');
  const categoryButtons = [...browser.querySelectorAll('[data-blog-category-button]')];
  const sort = browser.querySelector('[data-blog-sort]');
  const count = browser.querySelector('[data-blog-count]');
  const empty = browser.querySelector('[data-blog-empty]');

  const params = new URLSearchParams(window.location.search);
  if (params.get('category') && category) category.value = params.get('category');

  const refresh = () => {
    const query = (search?.value || '').trim().toLowerCase();
    const selectedCategory = category?.value || '';
    const mode = sort?.value || 'latest';

    const visible = cards.filter((card) => {
      const matchesQuery = !query || card.dataset.search.includes(query);
      const matchesCategory = !selectedCategory || card.dataset.category.includes(`|${selectedCategory}|`);
      card.hidden = !(matchesQuery && matchesCategory);
      return !card.hidden;
    });

    const compare = {
      latest: (a, b) => Number(b.dataset.date) - Number(a.dataset.date),
      oldest: (a, b) => Number(a.dataset.date) - Number(b.dataset.date),
      popular: (a, b) => Number(b.dataset.popularity) - Number(a.dataset.popularity),
      unpopular: (a, b) => Number(a.dataset.popularity) - Number(b.dataset.popularity),
    }[mode];

    cards.sort(compare).forEach((card) => list?.appendChild(card));
    if (count) count.textContent = String(visible.length);
    if (empty) empty.hidden = visible.length !== 0;
    categoryButtons.forEach((button) => {
      const selected = button.value === selectedCategory;
      button.classList.toggle('is-active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });

    const nextParams = new URLSearchParams(window.location.search);
    if (selectedCategory) nextParams.set('category', selectedCategory);
    else nextParams.delete('category');
    history.replaceState(null, '', `${window.location.pathname}${nextParams.size ? `?${nextParams}` : ''}`);
  };

  search?.addEventListener('input', refresh);
  category?.addEventListener('change', refresh);
  categoryButtons.forEach((button) => {
    button.addEventListener('click', () => {
      if (category) category.value = button.value;
      refresh();
    });
  });
  sort?.addEventListener('change', refresh);
  refresh();
})();
