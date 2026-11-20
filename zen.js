const zenTranslations = {
  zh: {
    zen_page_title: "禅意空间 — 心灵净土",
    zen_site_title: "禅意花园 · 海水洞",
    default_title: "水善利万物而不争",
    default_text: "静水流深，涟漪微动，洗去尘世的一切喧嚣与烦恼。",
    thumb_1: "碧水涟漪",
    thumb_2: "清泉洗心",
    thumb_3: "林海森罗",
    thumb_4: "草木甘露",
    card_gatha_title: "每日禅偈",
    gatha_verse: "菩提本无树，\n明镜亦非台。\n本来无一物，\n何处惹尘埃。",
    card_tools_title: "静心法器",
    btn_breathe: "开启呼吸引导",
    btn_next: "流转下一意境 »",
    status_text: "心如明镜台，时时勤拂拭。",
    btn_close_breathe: "结束冥想",
    breathe_phases: ["吸气...", "保持...（静心）", "呼气...", "放松..."]
  },
  ja: {
    zen_page_title: "禅の空間 — 心霊浄土",
    zen_site_title: "禅の庭園 · 海水洞",
    default_title: "上善若水",
    default_text: "静水流深、波紋微動、世俗の喧騒と煩悩を洗い流す。",
    thumb_1: "清水の波紋",
    thumb_2: "清泉洗心",
    thumb_3: "深山幽谷",
    thumb_4: "草木の甘露",
    card_gatha_title: "本日の禅偈",
    gatha_verse: "菩提本無樹、\n明鏡亦非台。\n本来無一物、\n何処惹塵埃。",
    card_tools_title: "静心の法具",
    btn_breathe: "呼吸瞑想を開始",
    btn_next: "次の景観へ »",
    status_text: "心は明鏡の如し、常に磨くべし。",
    btn_close_breathe: "瞑想を終了",
    breathe_phases: ["息を吸う...", "保つ...（無心）", "息を吐く...", "リラックス..."]
  }
};

let currentZenLang = 'zh';

function setZenLanguage(lang) {
  currentZenLang = zenTranslations[lang] ? lang : 'zh';
  const dict = zenTranslations[currentZenLang];
  document.documentElement.lang = currentZenLang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) {
      if (key === "gatha_verse") {
        el.innerHTML = dict[key].replace(/\n/g, "<br>");
      } else {
        el.textContent = dict[key];
      }
    }
  });

  const activeThumb = document.querySelector(".zen-dock-item.active");
  if (activeThumb) {
    const quoteTitle = document.getElementById("zen-quote-title");
    const quoteText = document.getElementById("zen-quote-text");
    quoteTitle.textContent = currentZenLang === 'ja' ? activeThumb.getAttribute("data-title-ja") : activeThumb.getAttribute("data-title-zh");
    quoteText.textContent = currentZenLang === 'ja' ? activeThumb.getAttribute("data-text-ja") : activeThumb.getAttribute("data-text-zh");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const switcher = document.getElementById("zen-lang-switcher");
  if (switcher) {
    switcher.value = currentZenLang;
    setZenLanguage(currentZenLang);
    switcher.addEventListener("change", (e) => {
      setZenLanguage(e.target.value);
    });
  }

  const thumbs = document.querySelectorAll(".zen-dock-item");
  const activeImg = document.getElementById("active-zen-img");
  const quoteTitle = document.getElementById("zen-quote-title");
  const quoteText = document.getElementById("zen-quote-text");
  const statusText = document.getElementById("zen-status-text");

  const breatheBtn = document.getElementById("breathe-toggle-btn");
  const closeBreathe = document.getElementById("close-breathe");
  const breatheModal = document.getElementById("breathe-modal");
  const nextAssetBtn = document.getElementById("next-asset-btn");
  const breatheText = document.getElementById("breathe-text");

  let currentIndex = 0;
  const assets = Array.from(thumbs);

  function selectAsset(thumb) {
    thumbs.forEach(t => t.classList.remove("active"));
    thumb.classList.add("active");

    const imgPath = thumb.getAttribute("data-img");
    const title = currentZenLang === 'ja' ? thumb.getAttribute("data-title-ja") : thumb.getAttribute("data-title-zh");
    const text = currentZenLang === 'ja' ? thumb.getAttribute("data-text-ja") : thumb.getAttribute("data-text-zh");

    activeImg.style.opacity = 0.2;
    setTimeout(() => {
      activeImg.src = imgPath;
      activeImg.style.opacity = 1;
    }, 180);

    quoteTitle.textContent = title;
    quoteText.textContent = text;
    statusText.textContent = currentZenLang === 'ja' ? `現在の心境：${title} — 寧静致遠` : `当前意境：${title} — 宁静致远`;
  }

  thumbs.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
      currentIndex = index;
      selectAsset(thumb);
    });
  });

  if (nextAssetBtn) {
    nextAssetBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % assets.length;
      selectAsset(assets[currentIndex]);
    });
  }

  let breatheInterval;
  if (breatheBtn && breatheModal) {
    breatheBtn.addEventListener("click", () => {
      breatheModal.classList.remove("hidden");
      const phases = zenTranslations[currentZenLang].breathe_phases;
      let pIdx = 0;
      breatheText.textContent = phases[0];
      breatheInterval = setInterval(() => {
        pIdx = (pIdx + 1) % phases.length;
        breatheText.textContent = phases[pIdx];
      }, 2000);
    });
  }

  if (closeBreathe && breatheModal) {
    closeBreathe.addEventListener("click", () => {
      breatheModal.classList.add("hidden");
      clearInterval(breatheInterval);
    });
  }
});