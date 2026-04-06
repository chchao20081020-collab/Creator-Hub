/**
 * 創作者聚集地 - 導覽列互動腳本
 * 功能：漢堡選單切換、全螢幕鎖定、自動收合
 */
document.addEventListener('DOMContentLoaded', () => {
    const menu = document.getElementById('mobile-menu');
    const navList = document.getElementById('nav-list');
    const body = document.body;

    // 檢查元素是否存在，避免報錯
    if (!menu || !navList) {
        console.error("找不到導覽列元素，請檢查 HTML ID 是否為 mobile-menu 與 nav-list");
        return;
    }

    /**
     * 切換選單開關
     */
    const toggleMenu = () => {
        const isActive = navList.classList.toggle('active');
        menu.classList.toggle('active');

        // 當選單開啟時，禁止背景頁面捲動
        if (isActive) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    };

    /**
     * 強制關閉選單
     */
    const closeMenu = () => {
        menu.classList.remove('active');
        navList.classList.remove('active');
        body.style.overflow = '';
    };

    // 1. 監聽漢堡按鈕點擊
    menu.addEventListener('click', (e) => {
        e.stopPropagation(); // 防止觸發 document 的點擊關閉事件
        toggleMenu();
    });

    // 2. 點擊選單內的連結後自動關閉 (適用於單頁捲動或跳轉)
    const navLinks = document.querySelectorAll('.nav-item, .btn-cta');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // 3. 點擊選單以外的區域自動關閉 (增加使用者體驗)
    document.addEventListener('click', (e) => {
        const isMenuOpen = navList.classList.contains('active');
        const isClickInsideMenu = navList.contains(e.target);
        const isClickOnToggle = menu.contains(e.target);

        if (isMenuOpen && !isClickInsideMenu && !isClickOnToggle) {
            closeMenu();
        }
    });

    // 4. 監聽視窗縮放 (防呆：如果使用者拉大視窗，自動恢復滾動)
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
  const partnersContainer = document.getElementById('partners-list');

  // 只有在合作夥伴頁面才執行
  if (partnersContainer) {
    fetch('assets/js/partners.json')
      .then(response => response.json())
      .then(data => {
        // 清空容器（以防萬一）
        partnersContainer.innerHTML = '';

        data.partners.forEach(item => {
          // 判斷：優先使用圖片，若無圖片則顯示文字
          const displayLogo = (item.logoUrl && item.logoUrl !== "") 
            ? `<img src="${item.logoUrl}" alt="${item.name}" style="width:100%; height:100%; object-fit:cover;">` 
            : item.logoText;

          // 建立卡片 HTML 模板
          const card = `
            <div class="partner-card">
              <div class="partner-logo">
                ${displayLogo}
              </div>
              <h3>${item.name}</h3>
              <p class="partner-link">
                <a href="${item.desc}" target="_blank" style="color: #00FF9F; border-color: #00FF9F;">
                  前往頻道 →
                </a>
              </p>
            </div>
          `;
          partnersContainer.innerHTML += card;
        });
      })
      .catch(err => {
        console.error("讀取夥伴資料失敗:", err);
        partnersContainer.innerHTML = '<p>資料讀取中，請稍候...</p>';
      });
  }
});
