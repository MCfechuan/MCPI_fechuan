// 主JavaScript文件
document.addEventListener('DOMContentLoaded', function() {
    // 1. 导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'rgba(30, 41, 59, 0.95)';
        }
    });

    // 2. 移动端菜单切换
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = 'rgba(15, 23, 42, 0.95)';
        navLinks.style.backdropFilter = 'blur(10px)';
        navLinks.style.padding = '20px';
        navLinks.style.borderTop = '1px solid #475569';
    });

    // 3. 平滑滚动链接
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // 移动端点击后关闭菜单
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            }
        });
    });

    // 4. 回到顶部按钮
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 5. 统计数据动画
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000; // 2秒
            const steps = 60;
            const increment = target / steps;
            let current = 0;
            let step = 0;
            
            const timer = setInterval(() => {
                step++;
                current += increment;
                
                if (step >= steps) {
                    current = target;
                    clearInterval(timer);
                }
                
                stat.textContent = Math.round(current);
            }, duration / steps);
        });
    }

    // 6. 滚动触发动画
    const statsSection = document.querySelector('.stats-box');
    
    function checkStatsVisibility() {
        const sectionPosition = statsSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (sectionPosition.top < windowHeight - 100 && sectionPosition.bottom > 0) {
            animateStats();
            window.removeEventListener('scroll', checkStatsVisibility);
        }
    }
    
    window.addEventListener('scroll', checkStatsVisibility);
    checkStatsVisibility(); // 初始检查

    // 7. 技能条动画
    const skillBars = document.querySelectorAll('.skill-level');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }
    
    const skillsSection = document.querySelector('.skills-container');
    
    function checkSkillsVisibility() {
        const sectionPosition = skillsSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (sectionPosition.top < windowHeight - 100 && sectionPosition.bottom > 0) {
            animateSkillBars();
            window.removeEventListener('scroll', checkSkillsVisibility);
        }
    }
    
    window.addEventListener('scroll', checkSkillsVisibility);
    checkSkillsVisibility(); // 初始检查

    // 8. 图片悬停效果增强
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // 9. 技能标签悬停效果
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // 10. 联系链接动画
    const contactLinks = document.querySelectorAll('.contact-link');
    
    contactLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'rotate(360deg)';
            icon.style.transition = 'transform 0.5s ease';
            
            setTimeout(() => {
                icon.style.transform = 'rotate(0deg)';
            }, 500);
        });
    });

    // 11. 表单提交处理
    const newsletterForm = document.querySelector('.newsletter-form');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (email && isValidEmail(email)) {
            // 模拟提交成功
            emailInput.value = '';
            alert('感谢订阅！您将收到MC_飞船的最新视频通知。');
        } else {
            alert('请输入有效的邮箱地址！');
        }
    });
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // 12. B站链接点击效果
    const bilibiliLinks = document.querySelectorAll('a[href*="bilibili"]');
    
    bilibiliLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('正在跳转到 MC_飞船 的B站个人空间...');
            console.log('B站空间: https://space.bilibili.com/3546982343772262');
            
            // 添加点击反馈
            this.style.transform = 'scale(0.95)';
            this.style.opacity = '0.8';
            
            setTimeout(() => {
                this.style.transform = '';
                this.style.opacity = '';
            }, 300);
        });
    });

    // 13. 键盘快捷键
    document.addEventListener('keydown', function(e) {
        // Ctrl + B 跳转到B站
        if (e.ctrlKey && e.key === 'b') {
            e.preventDefault();
            window.open('https://space.bilibili.com/3546982343772262', '_blank');
        }
        
        // 空格键滚动
        if (e.code === 'Space' && !e.target.matches('input, textarea')) {
            e.preventDefault();
            window.scrollBy({
                top: window.innerHeight * 0.8,
                behavior: 'smooth'
            });
        }
    });

    // 14. 页面加载完成效果
    window.addEventListener('load', function() {
        // 页面完全加载后添加加载完成类
        document.body.classList.add('loaded');
        
        // 控制台欢迎信息
        console.log('🚀 MC_飞船个人网站已加载完毕！');
        console.log('🎮 身份: PVP玩家与程序员');
        console.log('💻 技能: Python, C++, Java');
        console.log('📺 B站空间: https://space.bilibili.com/3546982343772262');
        console.log('🔧 Git部署版本: v1.0.0');
        console.log('✨ 快捷键: Ctrl + B 快速访问B站空间');
    });

    // 15. 主题切换（可选功能）
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.className = 'theme-toggle';
    themeToggle.style.position = 'fixed';
    themeToggle.style.bottom = '90px';
    themeToggle.style.right = '30px';
    themeToggle.style.width = '50px';
    themeToggle.style.height = '50px';
    themeToggle.style.background = 'rgba(30, 41, 59, 0.8)';
    themeToggle.style.color = '#e2e8f0';
    themeToggle.style.border = '1px solid #475569';
    themeToggle.style.borderRadius = '50%';
    themeToggle.style.cursor = 'pointer';
    themeToggle.style.zIndex = '999';
    themeToggle.style.display = 'flex';
    themeToggle.style.alignItems = 'center';
    themeToggle.style.justifyContent = 'center';
    themeToggle.style.fontSize = '1.2rem';
    themeToggle.style.transition = 'all 0.3s ease';
    
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', function() {
        const isDark = document.body.classList.toggle('light-theme');
        
        if (isDark) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            themeToggle.style.background = 'rgba(255, 255, 255, 0.9)';
            themeToggle.style.color = '#333';
            
            // 切换到浅色主题
            document.documentElement.style.setProperty('--dark-bg', '#f8fafc');
            document.documentElement.style.setProperty('--card-bg', '#ffffff');
            document.documentElement.style.setProperty('--text-light', '#1e293b');
            document.documentElement.style.setProperty('--text-muted', '#64748b');
            document.documentElement.style.setProperty('--border-color', '#cbd5e1');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            themeToggle.style.background = 'rgba(30, 41, 59, 0.8)';
            themeToggle.style.color = '#e2e8f0';
            
            // 切换回深色主题
            document.documentElement.style.setProperty('--dark-bg', '#0f172a');
            document.documentElement.style.setProperty('--card-bg', '#1e293b');
            document.documentElement.style.setProperty('--text-light', '#e2e8f0');
            document.documentElement.style.setProperty('--text-muted', '#94a3b8');
            document.documentElement.style.setProperty('--border-color', '#475569');
        }
    });

    // 16. 页面活跃时间记录
    let activeTime = 0;
    setInterval(() => {
        activeTime++;
        if (activeTime % 60 === 0) {
            console.log(`⏱️ 页面已活跃 ${activeTime / 60} 分钟`);
        }
    }, 60000);
});
