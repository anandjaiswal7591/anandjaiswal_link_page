// Social Media Links
const socialLinks = [
    {
        id: 'linkedin',
        platform: 'LinkedIn',
        handle: '@anand-jaiswal-810042233',
        url: 'https://www.linkedin.com/in/anand-jaiswal-810042233',
        color: '',
        icon: './icons/linkedin.svg'
    },
    {
        id: 'x',
        platform: 'X',
        handle: '@anand_jaiswal__',
        url: 'https://x.com/anand_jaiswal__',
        color: '#fff',
        icon: './icons/x.svg'
    },
    {
        id: 'instagram',
        platform: 'Instagram',
        handle: '@anandjaiswal_in',
        url: 'https://www.instagram.com/anandjaiswal_in',
        color: '',
        icon: './icons/instagram.svg'
    },
    {
        id: 'discord',
        platform: 'Discord',
        handle: '@anandjaiswal_in',
        url: 'https://www.discord.com/users/anandjaiswal_in',
        color: '',
        icon: './icons/discord.svg'
    }
];

// Coding Platform Links
const platformLinks = [
    {
        id: 'codolio',
        platform: 'Codolio',
        handle: '@anandjaiswal_in',
        url: 'https://codolio.com/profile/anandjaiswal_in',
        color: '',
        icon: './icons/codolio.svg'
    },
    {
        id: 'github',
        platform: 'Github',
        handle: '@anand-jaiswal-IN',
        url: 'https://github.com/anand-jaiswal-IN',
        color: '#fff',
        icon: './icons/github.svg'
    },
    {
        id: 'leetcode',
        platform: 'LeetCode',
        handle: '@anandjaiswal_in',
        url: 'https://leetcode.com/u/anandjaiswal_in',
        color: '',
        icon: './icons/leetcode.svg'
    },
    {
        id: 'codechef',
        platform: 'CodeChef',
        handle: '@anandjaiswal68',
        url: 'https://www.codechef.com/users/anandjaiswal68',
        color: '#fff',
        icon: './icons/codechef.svg'
    },
    {
        id: 'codeforces',
        platform: 'Codeforces',
        handle: '@anandjaiswal_in',
        url: 'https://codeforces.com/profile/anandjaiswal_in',
        color: '',
        icon: './icons/codeforces.svg'
    },
];

/* ==========
   DOM helpers
   ========== */
const linksEl = document.getElementById('links');
const toast = document.getElementById('toast');

function mkIcon(icon, bg) {
    const wrap = document.createElement('div');
    wrap.className = 'icon-wrap';
    // wrap.style.background = `linear-gradient(180deg, ${bg}, ${shade(bg, -8)})`;
    wrap.style.background = bg == '' ? `transparent` : bg;
    // wrap.style.border = `${bg} 1px`;

    // Check if icon is a URL (image) or emoji
    // if (icon.startsWith('http://') || icon.startsWith('https://')) {
    const img = document.createElement('img');
    img.src = icon;
    img.alt = '';
    img.setAttribute('aria-hidden', 'true');
    img.style.width = '50px';
    img.style.height = '50px';
    img.style.objectFit = 'contain';
    // img.style.filter = 'brightness(0) invert(1)'; // Make icons white
    wrap.appendChild(img);


    return wrap;
}

function shade(hex, percent) {
    // simple tint/darken for gradient: accepts hex like #336AEA
    try {
        const c = hex.replace('#', '');
        const num = parseInt(c, 16);
        let r = (num >> 16) + percent; if (r > 255) r = 255; if (r < 0) r = 0;
        let g = ((num >> 8) & 0x00FF) + percent; if (g > 255) g = 255; if (g < 0) g = 0;
        let b = (num & 0x0000FF) + percent; if (b > 255) b = 255; if (b < 0) b = 0;
        return '#' + (r.toString(16).padStart(2, '0') + g.toString(16).padStart(2, '0') + b.toString(16).padStart(2, '0'));
    } catch (e) { return hex }
}

function showToast(message, type = 'info') {
    toast.textContent = message;
    toast.style.background = (type === 'error') ? 'rgba(220,38,38,0.9)' : 'rgba(0,0,0,0.8)';
    toast.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => toast.classList.remove('show'), 1800);
}

/* ==============
   Build link cards
   ============== */
const socialLinksEl = document.getElementById('socialLinks');
const platformLinksEl = document.getElementById('platformLinks');

function createLinkCard(item) {
    const card = document.createElement('article');
    card.className = 'card';
    card.setAttribute('data-id', item.id);

    const iconWrap = mkIcon(item.icon, item.color);
    const meta = document.createElement('div');
    meta.className = 'meta';
    const platform = document.createElement('div');
    platform.className = 'platform';
    platform.textContent = item.platform;
    const handle = document.createElement('div');
    handle.className = 'handle';
    handle.textContent = item.handle;

    meta.appendChild(platform);
    meta.appendChild(handle);

    const controls = document.createElement('div');
    controls.className = 'controls';

    // Visit button
    const openBtn = document.createElement('a');
    openBtn.className = 'btn primary small';
    openBtn.href = item.url;
    openBtn.target = '_blank';
    openBtn.rel = 'noopener noreferrer';
    openBtn.innerHTML = 'Open';
    openBtn.setAttribute('aria-label', `Open ${item.platform} profile in new tab`);

    // Copy button
    const copyBtn = document.createElement('button');
    copyBtn.className = 'btn small copy';
    copyBtn.innerHTML = 'Copy';
    copyBtn.setAttribute('data-url', item.url);
    copyBtn.setAttribute('aria-label', `Copy ${item.platform} link`);

    copyBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const url = copyBtn.getAttribute('data-url');
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(url);
            } else {
                // fallback
                const ta = document.createElement('textarea');
                ta.value = url;
                document.body.appendChild(ta);
                ta.select();
                if (!document.execCommand('copy')) throw new Error('Copy not supported');
                ta.remove();
            }
            showToast('Copied!');
            // small visual feedback on button
            copyBtn.textContent = 'Copied';
            setTimeout(() => copyBtn.textContent = 'Copy', 1300);
        } catch (err) {
            console.error('copy failed', err);
            showToast('Copy failed', 'error');
        }
    });

    controls.appendChild(openBtn);
    controls.appendChild(copyBtn);

    card.appendChild(iconWrap);
    card.appendChild(meta);
    card.appendChild(controls);

    return card;
}

// Generate social media links
socialLinks.forEach(item => {
    const card = createLinkCard(item);
    socialLinksEl.appendChild(card);
});

// Generate platform links
platformLinks.forEach(item => {
    const card = createLinkCard(item);
    platformLinksEl.appendChild(card);
});

/* =====================
   Theme toggle & detect
   ===================== */
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const root = document.documentElement;

function applyTheme(name) {
    if (name === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
    else document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', name);
    themeToggle.setAttribute('aria-pressed', String(name === 'dark'));
    themeIcon.textContent = (name === 'dark') ? '☀️' : '🌙';
}

// Init: localStorage -> prefers-color-scheme -> default light
(function initTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) { applyTheme(saved); return }
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
})();

themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
});

// Respond to OS theme changes if user hasn't set a preference
window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) applyTheme(e.matches ? 'dark' : 'light');
});

/* Optional: smooth scroll on long pages */
try { document.documentElement.style.scrollBehavior = 'smooth' } catch (e) { }
