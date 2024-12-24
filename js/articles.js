document.addEventListener('DOMContentLoaded', function() {
    // 文章筛选功能
    const filterButtons = document.querySelectorAll('.filter-btn');
    const articles = document.querySelectorAll('.article-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 更新按钮状态
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // 获取筛选类别
            const category = this.textContent.toLowerCase();

            // 筛选文章
            articles.forEach(article => {
                const tags = Array.from(article.querySelectorAll('.tag'))
                    .map(tag => tag.textContent.toLowerCase());
                
                if (category === '全部' || tags.some(tag => 
                    tag.includes(category) || 
                    category.includes(tag))) {
                    article.style.display = 'block';
                    article.style.animation = 'fadeIn 0.5s ease';
                } else {
                    article.style.display = 'none';
                }
            });
        });
    });

    // 确保所有外部链接能正常打开
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const url = this.getAttribute('href');
            window.open(url, '_blank');
        });
    });

    // 添加阅读进度条
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${progress}%`;
    });

    // 添加分享按钮
    articles.forEach(article => {
        const shareBtn = document.createElement('button');
        shareBtn.className = 'share-btn';
        shareBtn.innerHTML = '分享文章';
        shareBtn.addEventListener('click', () => {
            if (navigator.share) {
                navigator.share({
                    title: article.querySelector('h2').textContent,
                    text: article.querySelector('.article-content').textContent,
                    url: window.location.href
                }).catch(err => {
                    // 如果分享失败，显示复制链接选项
                    const url = window.location.href;
                    navigator.clipboard.writeText(url).then(() => {
                        shareBtn.innerHTML = '已复制链接';
                        setTimeout(() => {
                            shareBtn.innerHTML = '分享文章';
                        }, 2000);
                    });
                });
            } else {
                // 如果不支持分享API，直接复制链接
                const url = window.location.href;
                navigator.clipboard.writeText(url).then(() => {
                    shareBtn.innerHTML = '已复制链接';
                    setTimeout(() => {
                        shareBtn.innerHTML = '分享文章';
                    }, 2000);
                });
            }
        });
        article.style.position = 'relative';
        article.appendChild(shareBtn);
    });
}); 