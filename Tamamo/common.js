document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('refresh')) {
        urlParams.delete('refresh');
        const cleanSearch = urlParams.toString();
        const newUrl = window.location.pathname + (cleanSearch ? '?' + cleanSearch : '');
        window.history.replaceState({}, '', newUrl);
    }
    let a;
    let n = [new URLSearchParams(location.search).get("lang") || "n_a"];
    if (n[0] !== "n_a") { 
        a = [n[0]]; 
    } else if (localStorage.getItem("lang")) { 
        a = JSON.parse(localStorage.getItem("lang")); 
    } else {
        let browserLangs = navigator.languages.map(e => e.split("-")[0]);
        let t = n.concat(browserLangs);
        const enIndex = t.indexOf("en");
        a = t.slice(0, enIndex === -1 ? t.length : enIndex).reverse();
    }
    localStorage.setItem("lang", JSON.stringify(a));

    const header = document.getElementById('header');
    if (header) {
        const pageTitle = header.querySelector('h1');
        const isEnglish = a.includes('en');
        const part1Src = isEnglish ? "https://raw.githubusercontent.com/Tamamobot/Tama/refs/heads/main/Tamamo/header_parts1_en.webp" : "https://raw.githubusercontent.com/Tamamobot/Tama/refs/heads/main/Tamamo/header_parts1.webp";
        const part2Src = isEnglish ? "https://raw.githubusercontent.com/Tamamobot/Tama/refs/heads/main/Tamamo/header_parts2_en.webp" : "https://raw.githubusercontent.com/Tamamobot/Tama/refs/heads/main/Tamamo/header_parts2.webp";

        header.innerHTML = `
            <div class="top-banner header-container">
                <div class="header-layers">
                    <img src="${part1Src}" class="layer p1" alt="">
                    <img src="${part2Src}" class="layer p2" alt="">
                    <img src="https://raw.githubusercontent.com/Tamamobot/Tama/refs/heads/main/Tamamo/header_parts3.webp" class="layer p3" alt="">
                    <img src="https://raw.githubusercontent.com/Tamamobot/Tama/refs/heads/main/Tamamo/header_parts4.webp" class="layer p4" alt="" fetchpriority="high" loading="eager">
                </div>
            </div>
            ${pageTitle ? pageTitle.outerHTML : ''}
            <div class="header-controls">
                <a id="lang-toggle" href="#" role="button"
                style="display:inline-flex; align-items:center; width:1.1em; height:1.1em; color:currentColor; transform: translateY(1px);"
                title="Switch Language">

                    <svg xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1" 
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        style="width:100%; height:100%; min-width:24px; min-height:24px;"> <path d="M4 7a8 8 0 0 1 13-1"/>
                        <polyline points="18 3 18 7 14 7"/>
                        <path d="M20 18a8 8 0 0 1-13 2"/>
                        <polyline points="6 23 6 19 10 19"/>

                        <text x="2" y="15" font-size="8" fill="currentColor" stroke="none" style="font-family: sans-serif;">あ</text>
                        <text x="14" y="15" font-size="8" fill="currentColor" stroke="none" style="font-family: sans-serif;">A</text>
                    </svg>
                </a>
                
                <span style="margin: 0 5px; opacity: 0.3;">|</span>
                <a id="switch-dark" href="#" role="button" style="display: inline-block; width: 1.2em; color: currentColor; vertical-align: middle;">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -7 29 29" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
                </a>
                <a id="switch-light" href="#" role="button" style="display: inline-block; width: 1.2em; color: currentColor; vertical-align: middle;">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -7 29 29" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                </a>
                <span style="margin: 0 5px; opacity: 0.3;">|</span>
                <a id="clear-cache-btn" href="#" role="button" style="display: inline-block; width: 1.2em; color: currentColor; vertical-align: middle;" title="Update Page">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -7 29 29" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>
                </a>
            </div>
        `;
        //  <p style="
        //     margin: 0px auto 0px auto;
        //     transform: translateX(-50px);
        //     font-weight: bold;
        //     color: red;
        //     text-shadow: 0 0 4px #000, 0 0 4px #000, 1px 1px 2px #000;
        //     " data-ja="メンテナンス作業中" data-en="Maintenance">
        //         メンテナンス作業中
        // </p>
        document.getElementById('clear-cache-btn')?.addEventListener('click', (e) => {
            e.preventDefault();
            const url = new URL(window.location.href);
            url.searchParams.set("refresh", new Date().getTime());
            window.location.href = url.toString();
        });
        document.getElementById('lang-toggle')?.addEventListener('click', (e) => {
            e.preventDefault();
            const currentIsEn = JSON.parse(localStorage.getItem("lang") || '[]').includes('en');
            const newLang = currentIsEn ? 'ja' : 'en';
            
            localStorage.setItem("lang", JSON.stringify([newLang]));
            const url = new URL(window.location.href);
            url.searchParams.set("lang", newLang);
            window.location.href = url.toString();
        });
    }

    const footer = document.getElementById('footer');
    if (footer) {
        footer.innerHTML = `
        <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.1); margin: 2rem 0;">
        <div style="padding-bottom: 3rem; opacity: 0.7; font-size: 0.85em; text-align: center; font-family: sans-serif;">
            <div style="margin-bottom: 0.5rem;">
                <span data-ja="Discord タマ様" data-en="Discord Tama Bot" style="font-weight: bold;">Discord タマ様</span>
                <span style="margin: 0 8px; opacity: 0.5;">|</span>
                <a href="https://discord.com/oauth2/authorize?client_id=1316350028360716378" style="color: inherit; text-decoration: none; border-bottom: 1px solid currentColor;" data-ja="招待リンク" data-en="Invitation link" class="url">招待リンク</a>
                <span style="margin: 0 8px; opacity: 0.5;">|</span>
                <a href="https://discord.gg/n3AQXds3GH" style="color: inherit; text-decoration: none; border-bottom: 1px solid currentColor;" data-ja="サポート" data-en="Support" class="url">サポート</a>
                <span style="margin: 0 8px; opacity: 0.5;">|</span>
                <a href="https://discord.gg/GX3DsDwzb2" style="color: inherit; text-decoration: none; border-bottom: 1px solid currentColor;" data-ja="お試しサーバー" data-en="Trial Server" class="url">お試しサーバー</a>
            </div>
            <div style="margin-bottom: 1.5rem;">
                <span data-ja="スペシャルサンクス" data-en="Special Thanks" style="font-weight: bold;">スペシャルサンクス</span>
                <span style="margin: 0 8px; opacity: 0.5;">|</span>
                <a href="https://mentemori.icu/rankings.html" style="color: inherit; text-decoration: none; border-bottom: 1px solid currentColor;" data-ja="メンテもりもり" data-en="Mentemori" class="url">メンテもりもり</a>
            </div>
            <div style="line-height: 1.8;">
                <p style="margin: 0;">&copy; 2025-2026 <span data-ja="隠れ木のタマ様 - 非公式データベース" data-en="Tama Retreat - Unofficial Database">隠れ木のタマ様 - 非公式データベース</span> - <a href="https://tamamo.dev/WebGuide" style="color: inherit; text-decoration: none; border-bottom: 1px solid currentColor;" data-ja="ご利用ガイド" data-en="Guide" class="url">ご利用ガイド</a></p>
                <p style="font-size: 0.85em; margin-top: 8px; opacity: 0.6; letter-spacing: 0.02em;">
                    &copy; Bank of Innovation, Inc. All Rights Reserved.
                </p>
            </div>
        </div>
        `;
    }

    const updateTexts = (lang) => {
        document.querySelectorAll(`[data-${lang}]`).forEach(t => {
            const val = t.getAttribute(`data-${lang}`);
            if (val && val.trim() !== "") { 
                t.textContent = val; 
            }
        });
    };

    a.forEach(lang => updateTexts(lang));

    const updateLanguageAndReload = (newLang) => {
        localStorage.setItem("lang", JSON.stringify([newLang]));
        const url = new URL(window.location.href);
        url.searchParams.set("lang", newLang);
        window.location.href = url.toString();
    };

    document.getElementById('lang-ja')?.addEventListener('click', (e) => { e.preventDefault(); updateLanguageAndReload('ja'); });
    document.getElementById('lang-en')?.addEventListener('click', (e) => { e.preventDefault(); updateLanguageAndReload('en'); });

    const htmlElement = document.documentElement;
    const sLight = document.getElementById('switch-light');
    const sDark = document.getElementById('switch-dark');
    
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') { 
        htmlElement.classList.add('darkm'); 
    } else { 
        htmlElement.classList.remove('darkm'); 
    }

    sLight?.addEventListener('click', (e) => {
        e.preventDefault();
        htmlElement.classList.remove('darkm');
        localStorage.setItem('theme', 'light');
    });
    sDark?.addEventListener('click', (e) => {
        e.preventDefault();
        htmlElement.classList.add('darkm');
        localStorage.setItem('theme', 'dark');
    });

    const preventImageSave = () => {
        const preventDefault = (e) => {
            if (e.target.tagName === 'IMG') {
                e.preventDefault();
            }
        };

        // 右クリック禁止
        document.addEventListener('contextmenu', preventDefault);

        // ドラッグ＆ドロップ禁止
        document.addEventListener('dragstart', preventDefault);

        // 長押し禁止
        const style = document.createElement('style');
        style.textContent = `
            img {
                -webkit-touch-callout: none;
                -webkit-user-select: none;
                -khtml-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                pointer-events: none;
            }
            .stamp-btn img, .preview-stamp {
                pointer-events: auto;
                -webkit-touch-callout: none; 
            }
        `;
        document.head.appendChild(style);
    };

    preventImageSave();

    const asyncStylesheets = document.querySelectorAll('link.async-css');
    
    asyncStylesheets.forEach((link) => {
        link.addEventListener('load', () => {
            link.media = 'all';
        });
        if (link.sheet) {
            link.media = 'all';
        }
    });
});