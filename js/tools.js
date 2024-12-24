document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    const toolCards = document.querySelectorAll('.tool-card');
    const suggestions = document.createElement('div');
    suggestions.className = 'search-suggestions';
    searchInput.parentNode.appendChild(suggestions);

    searchInput.addEventListener('input', () => {
        const value = searchInput.value.toLowerCase();
        const tools = Array.from(document.querySelectorAll('.tool-card h3'))
            .map(h3 => h3.textContent)
            .filter(text => text.toLowerCase().includes(value));
        
        suggestions.innerHTML = tools
            .map(tool => `<div class="suggestion">${tool}</div>`)
            .join('');
    });

    // 工具卡片悬停效果
    toolCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--card-shadow)';
        });
    });

    // 添加动画关键帧
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);

    // 处理所有工具卡片中的链接
    const toolLinks = document.querySelectorAll('.tool-links a');
    toolLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const url = this.getAttribute('href');
            if (url && url !== '#') {
                window.open(url, '_blank');
            }
        });
    });
}); 