// 导航栏交互
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // 关闭移动端菜单
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});

// 滚动时导航栏样式变化
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 14, 39, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 14, 39, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// 滚动动画观察器
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// 观察所有需要动画的元素
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.section-card, .position-card, .service-card, .expert-card, ' +
        '.audience-card, .pricing-card, .enterprise-card, .advantage-card'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

// 生成虚拟头像首字母
function generateAvatarInitials() {
    const avatars = document.querySelectorAll('.expert-avatar');
    avatars.forEach(avatar => {
        const name = avatar.getAttribute('data-name');
        if (name) {
            const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
            avatar.textContent = initials;
        }
    });
}

// 专家卡片翻转效果（鼠标移出时恢复）
const expertCards = document.querySelectorAll('.expert-card');
expertCards.forEach(card => {
    const inner = card.querySelector('.expert-card-inner');
    let isFlipped = false;
    
    card.addEventListener('mouseenter', () => {
        if (!isFlipped) {
            inner.style.transform = 'rotateY(180deg)';
            isFlipped = true;
        }
    });
    
    card.addEventListener('mouseleave', () => {
        if (isFlipped) {
            inner.style.transform = 'rotateY(0deg)';
            isFlipped = false;
        }
    });
});

// 行业滚动动画
const industriesScroll = document.querySelector('.industries-scroll');
if (industriesScroll) {
    let scrollPosition = 0;
    const scrollSpeed = 1;
    
    function autoScroll() {
        scrollPosition += scrollSpeed;
        industriesScroll.scrollLeft = scrollPosition;
        
        // 重置滚动位置
        if (scrollPosition >= industriesScroll.scrollWidth - industriesScroll.clientWidth) {
            scrollPosition = 0;
        }
    }
    
    // 暂停自动滚动当鼠标悬停时
    industriesScroll.addEventListener('mouseenter', () => {
        industriesScroll.style.animationPlayState = 'paused';
    });
    
    industriesScroll.addEventListener('mouseleave', () => {
        industriesScroll.style.animationPlayState = 'running';
    });
    
    // 使用CSS动画替代JavaScript滚动（更流畅）
    industriesScroll.style.animation = 'scroll 30s linear infinite';
}

// 添加CSS滚动动画
const style = document.createElement('style');
style.textContent = `
    @keyframes scroll {
        0% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(-50%);
        }
    }
    
    .industries-scroll {
        display: flex;
        gap: 1rem;
        overflow: hidden;
    }
    
    .industries-scroll::before,
    .industries-scroll::after {
        content: '';
        flex-shrink: 0;
        width: 50px;
    }
`;
document.head.appendChild(style);

// 表单提交处理
const consultForm = document.getElementById('consultForm');
if (consultForm) {
    consultForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            need: document.getElementById('need').value,
            budget: document.getElementById('budget').value,
            contact: document.getElementById('contact').value
        };
        
        // 这里可以添加实际的表单提交逻辑
        console.log('表单数据:', formData);
        
        // 显示成功消息
        showNotification('咨询提交成功！我们会尽快与您联系。', 'success');
        
        // 重置表单
        consultForm.reset();
    });
}

// 通知函数
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// 添加通知动画
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyle);

// 转人工咨询按钮
const humanConsultBtn = document.getElementById('humanConsult');
if (humanConsultBtn) {
    humanConsultBtn.addEventListener('click', () => {
        showNotification('正在为您转接人工客服，请稍候...', 'info');
        // 这里可以添加实际的转接逻辑
    });
}

// 复制微信号功能
function copyWechatId() {
    const wechatId = 'qantara888';
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(wechatId).then(() => {
            showNotification('微信号已复制：' + wechatId, 'success');
        }).catch(() => {
            fallbackCopyText(wechatId);
        });
    } else {
        fallbackCopyText(wechatId);
    }
}

// 备用复制方法
function fallbackCopyText(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
        showNotification('微信号已复制：' + text, 'success');
    } catch (err) {
        showNotification('复制失败，请手动复制：' + text, 'info');
    }
    document.body.removeChild(textArea);
}

// 鼠标跟随效果（可选，用于增强交互感）
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.section-card, .service-card, .pricing-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        } else {
            card.style.transform = '';
        }
    });
});

// 数字计数动画（用于统计数据展示，如果需要）
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// 页面加载完成后的初始化
window.addEventListener('load', () => {
    // 添加页面加载动画
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
    
    // 生成虚拟头像首字母
    generateAvatarInitials();
    
    // 初始化所有交互元素
    console.log('前途加科技 Qantara 网站加载完成');
});

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 优化滚动性能
const handleScroll = debounce(() => {
    // 滚动相关的性能优化逻辑
}, 10);

window.addEventListener('scroll', handleScroll);

// 合作伙伴Logo悬停效果增强
const partnerLogos = document.querySelectorAll('.partner-logo');
partnerLogos.forEach(logo => {
    logo.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.05)';
        this.style.transition = 'all 0.3s ease';
    });
    
    logo.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// 四大板块卡片点击效果
const sectionCards = document.querySelectorAll('.section-card');
sectionCards.forEach(card => {
    card.addEventListener('click', function() {
        const section = this.getAttribute('data-section');
        // 可以根据section跳转到对应区域或显示详细信息
        console.log('点击了板块:', section);
    });
});

// 添加键盘导航支持
document.addEventListener('keydown', (e) => {
    // ESC键关闭移动端菜单
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// 检测用户偏好（暗色模式等）
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
// 当前设计已经是暗色主题，所以不需要切换

// 性能监控（可选）
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log('页面加载时间:', pageLoadTime + 'ms');
        }, 0);
    });
}

