document.addEventListener('DOMContentLoaded', function() {
    // 为所有导航链接添加过渡效果
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (!this.href.includes('#')) {  // 忽略锚点链接
                e.preventDefault();
                const target = this.href;
                
                // 添加退出动画
                document.body.style.opacity = '0';
                document.body.style.transition = 'opacity 0.3s ease';
                
                // 延迟导航以等待动画完成
                setTimeout(() => {
                    window.location.href = target;
                }, 300);
            }
        });
    });
    
    // 页面加载时的进入动画
    document.body.style.opacity = '0';
    requestAnimationFrame(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    });
    
    // 为主要内容区域添加动画类
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.classList.add('page-transition');
    }
    
    // 处理浏览器的前进/后退
    window.addEventListener('popstate', function() {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
}); 