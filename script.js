// ===== LUCIDE ICONS INIT =====
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();

  // Init FAQ accordion
  initFAQ();

  // Init explore page if on it
  if (document.getElementById('usersGrid')) {
    renderUsers(users);
    initFilters();
  }
});

// ===== FAQ ACCORDION =====
function initFAQ() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const btn = item.querySelector('.faq-question');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close all
      items.forEach(i => i.classList.remove('open'));
      // Toggle current
      if (!isOpen) item.classList.add('open');
    });
  });
}

// ===== USER DATA =====
const users = [
  {
    id: 1, name: 'Aisha Rahman', location: 'Mumbai, India',
    offers: ['Python', 'Data Science'], wants: ['Guitar', 'Spanish'],
    categories: ['tech'], color: '#1d3fbb', initials: 'AR'
  },
  {
    id: 2, name: 'Carlos Mendez', location: 'Madrid, Spain',
    offers: ['Spanish', 'Flamenco'], wants: ['Web Dev', 'Cooking'],
    categories: ['language', 'music'], color: '#7c3aed', initials: 'CM'
  },
  {
    id: 3, name: 'Priya Sharma', location: 'Delhi, India',
    offers: ['Yoga', 'Meditation'], wants: ['Graphic Design', 'French'],
    categories: ['fitness'], color: '#059669', initials: 'PS'
  },
  {
    id: 4, name: 'Lucas Kim', location: 'Seoul, South Korea',
    offers: ['React', 'UI Design'], wants: ['Chess', 'Korean Cooking'],
    categories: ['tech', 'art'], color: '#dc2626', initials: 'LK'
  },
  {
    id: 5, name: 'Fatima Al-Hassan', location: 'Dubai, UAE',
    offers: ['Arabic', 'Calligraphy'], wants: ['Python', 'Video Editing'],
    categories: ['language', 'art'], color: '#d97706', initials: 'FA'
  },
  {
    id: 6, name: 'James Wright', location: 'London, UK',
    offers: ['Guitar', 'Music Theory'], wants: ['Photography', 'Japanese'],
    categories: ['music'], color: '#0891b2', initials: 'JW'
  },
  {
    id: 7, name: 'Mei Tanaka', location: 'Tokyo, Japan',
    offers: ['Japanese', 'Origami'], wants: ['Yoga', 'React'],
    categories: ['language'], color: '#be185d', initials: 'MT'
  },
  {
    id: 8, name: 'Omar Abdullah', location: 'Cairo, Egypt',
    offers: ['Video Editing', 'Photography'], wants: ['Web Dev', 'Guitar'],
    categories: ['art', 'tech'], color: '#15803d', initials: 'OA'
  },
  {
    id: 9, name: 'Sofia Rossi', location: 'Rome, Italy',
    offers: ['Italian Cooking', 'Italian'], wants: ['Piano', 'Data Science'],
    categories: ['cooking', 'language'], color: '#9d174d', initials: 'SR'
  },
  {
    id: 10, name: 'Arjun Patel', location: 'Ahmedabad, India',
    offers: ['Chess', 'Mathematics'], wants: ['Swimming', 'Spanish'],
    categories: ['tech'], color: '#1e40af', initials: 'AP'
  },
  {
    id: 11, name: 'Nina Okonkwo', location: 'Lagos, Nigeria',
    offers: ['Graphic Design', 'Illustration'], wants: ['Yoga', 'Python'],
    categories: ['art'], color: '#7c2d12', initials: 'NO'
  },
  {
    id: 12, name: 'Chen Wei', location: 'Shanghai, China',
    offers: ['Mandarin', 'Tai Chi'], wants: ['English', 'Video Editing'],
    categories: ['language', 'fitness'], color: '#065f46', initials: 'CW'
  }
];

// ===== RENDER USER CARDS =====
function renderUsers(list) {
  const grid = document.getElementById('usersGrid');
  if (!grid) return;

  if (list.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px 0;color:#6b7280;">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" stroke-width="1.5" style="margin:0 auto 16px;display:block;"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
      <p style="font-size:1rem;font-weight:600;color:#374151;margin-bottom:6px;">No users found</p>
      <p style="font-size:0.875rem;">Try adjusting your search or filters</p>
    </div>`;
    return;
  }

  grid.innerHTML = list.map(u => `
    <div class="user-card">
      <div class="user-avatar" style="background:${u.color}">${u.initials}</div>
      <h4>${u.name}</h4>
      <div class="location">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 13-8 13s-8-7-8-13a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
        ${u.location}
      </div>
      <div class="skill-label">Offers</div>
      <div class="skill-tags">${u.offers.map(s => `<span class="skill-tag offers">${s}</span>`).join('')}</div>
      <div class="skill-label">Wants to Learn</div>
      <div class="skill-tags">${u.wants.map(s => `<span class="skill-tag wants">${s}</span>`).join('')}</div>
      <button class="btn-connect" onclick="handleConnect(this, ${u.id})">Connect</button>
    </div>
  `).join('');
}

// ===== CONNECT BUTTON =====
function handleConnect(btn, id) {
  if (btn.classList.contains('sent')) return;
  btn.classList.add('sent');
  btn.textContent = 'Request Sent ✓';
}

// ===== FILTER & SEARCH =====
let activeCategory = 'all';

function initFilters() {
  // Category filter tags
  const tags = document.querySelectorAll('#categoryFilter .filter-tag');
  tags.forEach(tag => {
    tag.addEventListener('click', () => {
      tags.forEach(t => t.classList.remove('active'));
      tag.classList.add('active');
      activeCategory = tag.dataset.cat;
      filterUsers();
    });
  });

  // Sort
  document.getElementById('sortBy')?.addEventListener('change', filterUsers);

  // Search on Enter
  document.getElementById('searchInput')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') filterUsers();
  });
}

function filterUsers() {
  const query = (document.getElementById('searchInput')?.value || '').toLowerCase().trim();
  const sort = document.getElementById('sortBy')?.value || 'newest';

  let filtered = users.filter(u => {
    const matchCat = activeCategory === 'all' || u.categories.includes(activeCategory);
    const matchQuery = !query ||
      u.name.toLowerCase().includes(query) ||
      u.location.toLowerCase().includes(query) ||
      u.offers.some(s => s.toLowerCase().includes(query)) ||
      u.wants.some(s => s.toLowerCase().includes(query));
    return matchCat && matchQuery;
  });

  if (sort === 'az') filtered.sort((a, b) => a.name.localeCompare(b.name));
  else if (sort === 'za') filtered.sort((a, b) => b.name.localeCompare(a.name));

  renderUsers(filtered);
}
