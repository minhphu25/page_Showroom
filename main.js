/**
 * AquaLux - Luxury Bathroom & Sanitary Ware
 * main.js - Core UI, Data & SEO Logic (Pure Vanilla JavaScript)
 */

/* ==========================================================================
   1. CORE UI LOGIC (Header Scroll, Mobile Menu, Modal, Toast)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initHeaderScroll();
  initMobileMenu();
  initSeo();
  initContactForm();

  // If on products page, initialize product catalog logic
  if (document.getElementById("products-grid")) {
    initProductsPage();
  }
});

/**
 * Handle Header Scroll effect:
 * When scroll > 20px -> header gets frosted white background (bg-white/95 backdrop-blur-md shadow-md)
 * When at top -> transparent background
 */
function initHeaderScroll() {
  const header = document.getElementById("main-header");
  if (!header) return;

  const updateHeader = () => {
    const isScrolled = window.scrollY > 20;
    if (isScrolled) {
      header.classList.add(
        "header-scrolled",
        "bg-white/95",
        "backdrop-blur-md",
        "shadow-md",
        "py-3",
      );
      header.classList.remove("header-transparent", "bg-transparent", "py-5");

      // Adjust text colors for links & logo: force dark slate on white background
      header.querySelectorAll(".nav-link").forEach((link) => {
        link.classList.remove(
          "text-white",
          "text-slate-100",
          "hover:text-amber-300",
        );
        link.classList.add("text-slate-800", "hover:text-amber-600");
      });

      const logoTitle = header.querySelector(".logo-title");
      if (logoTitle) {
        logoTitle.classList.remove("text-white");
        logoTitle.classList.add("text-slate-900");
      }

      const mobileBtn = document.getElementById("mobile-menu-btn");
      if (mobileBtn) {
        mobileBtn.classList.remove("text-white");
        mobileBtn.classList.add("text-slate-800");
      }

      const hotlineBtn = header.querySelector(".hotline-btn");
      if (hotlineBtn) {
        hotlineBtn.classList.remove(
          "border-white/30",
          "text-white",
          "hover:bg-white/10",
        );
        hotlineBtn.classList.add(
          "border-amber-600",
          "text-amber-600",
          "hover:bg-amber-50",
        );
      }
    } else {
      header.classList.remove(
        "header-scrolled",
        "bg-white/95",
        "backdrop-blur-md",
        "shadow-md",
        "py-3",
      );
      header.classList.add("header-transparent", "bg-transparent", "py-5");

      // Restore transparent top text colors
      header.querySelectorAll(".nav-link").forEach((link) => {
        link.classList.add("text-white", "hover:text-amber-300");
        link.classList.remove(
          "text-slate-800",
          "text-slate-700",
          "hover:text-amber-600",
        );
      });

      const logoTitle = header.querySelector(".logo-title");
      if (logoTitle) {
        logoTitle.classList.add("text-white");
        logoTitle.classList.remove("text-slate-900");
      }

      const mobileBtn = document.getElementById("mobile-menu-btn");
      if (mobileBtn) {
        mobileBtn.classList.add("text-white");
        mobileBtn.classList.remove("text-slate-800");
      }

      const hotlineBtn = header.querySelector(".hotline-btn");
      if (hotlineBtn) {
        hotlineBtn.classList.add(
          "border-white/30",
          "text-white",
          "hover:bg-white/10",
        );
        hotlineBtn.classList.remove(
          "border-amber-600",
          "text-amber-600",
          "hover:bg-amber-50",
        );
      }
    }
  };

  window.addEventListener("scroll", updateHeader);
  updateHeader(); // initial run
}

/**
 * Handle Mobile Navigation Toggle
 */
function initMobileMenu() {
  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");
  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
    const icon = btn.querySelector("i");
    if (icon) {
      if (menu.classList.contains("hidden")) {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
      } else {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
      }
    }
  });

  // Close menu when clicking a link
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.add("hidden");
      const icon = btn.querySelector("i");
      if (icon) {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
      }
    });
  });
}

/**
 * Contact form handling with feedback toast
 */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nameInput = form.querySelector('[name="name"]');
    const phoneInput = form.querySelector('[name="phone"]');

    if (!nameInput.value.trim() || !phoneInput.value.trim()) {
      showToast("Vui lòng điền họ tên và số điện thoại liên hệ.", "error");
      return;
    }

    // Success notification
    showToast(
      `Cảm ơn Quý khách ${nameInput.value.trim()}! Chuyên viên tư vấn  sẽ liên hệ qua SĐT ${phoneInput.value.trim()} trong vòng 15 phút.`,
      "success",
    );
    form.reset();
  });
}

/**
 * Show luxury toast notification
 */
function showToast(message, type = "success") {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.className =
      "fixed top-24 right-4 md:right-8 z-50 flex flex-col gap-3 max-w-md w-full px-4 pointer-events-none";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  const isSuccess = type === "success";
  toast.className = `pointer-events-auto transform transition-all duration-500 translate-y-[-20px] opacity-0 flex items-start gap-4 p-4 rounded-xl shadow-2xl border ${
    isSuccess
      ? "bg-slate-900 border-amber-500/40 text-white"
      : "bg-red-900 border-red-500/40 text-white"
  }`;

  toast.innerHTML = `
    <div class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isSuccess ? "bg-amber-500/20 text-amber-400" : "bg-red-500/20 text-red-300"}">
      <i class="fa-solid ${isSuccess ? "fa-check" : "fa-circle-exclamation"} text-sm"></i>
    </div>
    <div class="flex-1 text-sm leading-relaxed">${message}</div>
    <button class="text-slate-400 hover:text-white transition-colors" onclick="this.parentElement.remove()">
      <i class="fa-solid fa-xmark text-sm"></i>
    </button>
  `;

  container.appendChild(toast);

  // Animate in
  setTimeout(() => {
    toast.classList.remove("translate-y-[-20px]", "opacity-0");
  }, 10);

  // Auto remove after 5 seconds
  setTimeout(() => {
    toast.classList.add("opacity-0", "translate-y-[-10px]");
    setTimeout(() => toast.remove(), 500);
  }, 5000);
}

/* ==========================================================================
   2. SEO INJECTION LOGIC (Read seo.json and inject meta/title tags)
   ========================================================================== */

async function initSeo() {
  const isProductsPage =
    window.location.pathname.toLowerCase().includes("products") ||
    document.body.dataset.page === "products";
  const pageKey = isProductsPage ? "products" : "home";

  try {
    const res = await fetch("seo.json");
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const seoData = await res.json();
    const config = seoData[pageKey];
    if (!config) return;

    // Set document title
    document.title = config.title;

    // Helper to update or create meta tags
    const setMeta = (attr, val, content) => {
      if (!content) return;
      let meta = document.querySelector(`meta[${attr}="${val}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attr, val);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    setMeta("name", "description", config.description);
    setMeta("name", "keywords", config.keywords);
    setMeta("property", "og:title", config.ogTitle || config.title);
    setMeta(
      "property",
      "og:description",
      config.ogDescription || config.description,
    );
    setMeta("property", "og:image", config.ogImage);
    setMeta("property", "og:type", "website");
  } catch (err) {
    console.warn("Lưu ý khi tải seo.json:", err.message);
  }
}

/* ==========================================================================
   3. PRODUCTS CATALOG LOGIC (products.html: Fetch, Filter, Search, Pagination)
   ========================================================================== */

let allProducts = [];
let filteredProducts = [];
let currentCategory = "all";
let searchKeyword = "";
let currentPage = 1;
const itemsPerPage = 8;

async function initProductsPage() {
  const gridContainer = document.getElementById("products-grid");
  const searchInput = document.getElementById("search-input");
  const categoryFilters = document.querySelectorAll(".category-filter-btn");
  const paginationContainer = document.getElementById("pagination-container");

  // Check URL query params for initial category (e.g. products.html?category=bon-cau)
  const urlParams = new URLSearchParams(window.location.search);
  const paramCat = urlParams.get("category");
  if (paramCat) {
    currentCategory = decodeURIComponent(paramCat);
  }

  // Fetch product data directly from data.json
  try {
    const response = await fetch("data.json");
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    allProducts = await response.json();
  } catch (err) {
    console.error("Lỗi khi tải data.json:", err.message);
    if (gridContainer) {
      gridContainer.innerHTML = `
        <div class="col-span-full py-16 text-center text-slate-500">
          <i class="fa-solid fa-triangle-exclamation text-3xl text-amber-500 mb-3"></i>
          <p class="font-bold text-slate-800 text-lg">Không thể tải danh sách sản phẩm từ data.json</p>
          <p class="text-sm text-slate-500 mt-2 max-w-md mx-auto">
            Trình duyệt hạn chế gọi fetch trực tiếp khi mở qua giao thức <code>file:///</code>. 
            Vui lòng chạy dự án bằng Live Server hoặc HTTP server cục bộ để xem đầy đủ dữ liệu.
          </p>
        </div>
      `;
    }
    return;
  }

  // Setup Search Input Event
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchKeyword = e.target.value.trim().toLowerCase();
      currentPage = 1;
      applyFilters();
    });

    const clearBtn = document.getElementById("search-clear-btn");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        searchInput.value = "";
        searchKeyword = "";
        currentPage = 1;
        applyFilters();
      });
    }
  }

  // Setup Category Filter Buttons Event
  categoryFilters.forEach((btn) => {
    btn.addEventListener("click", () => {
      categoryFilters.forEach((b) => {
        b.classList.remove("bg-amber-600", "text-white", "shadow-md");
        b.classList.add(
          "bg-white",
          "text-slate-700",
          "hover:bg-amber-50",
          "border-slate-200",
        );
      });
      btn.classList.add("bg-amber-600", "text-white", "shadow-md");
      btn.classList.remove(
        "bg-white",
        "text-slate-700",
        "hover:bg-amber-50",
        "border-slate-200",
      );

      currentCategory = btn.dataset.category;
      currentPage = 1;
      applyFilters();
    });
  });

  // Activate the initial category button if set via URL
  if (paramCat) {
    categoryFilters.forEach((btn) => {
      if (btn.dataset.category === currentCategory) {
        btn.click();
      }
    });
  }

  applyFilters();
}

/**
 * Filter products based on search keyword and category
 */
function applyFilters() {
  filteredProducts = allProducts.filter((product) => {
    const matchesCategory =
      currentCategory === "all" || product.category === currentCategory;
    const matchesSearch =
      !searchKeyword ||
      product.name.toLowerCase().includes(searchKeyword) ||
      product.category.toLowerCase().includes(searchKeyword) ||
      product.description.toLowerCase().includes(searchKeyword);
    return matchesCategory && matchesSearch;
  });

  renderProductCount();
  renderProducts();
  renderPagination();
}

/**
 * Display count of matched products
 */
function renderProductCount() {
  const countEl = document.getElementById("products-count");
  if (countEl) {
    countEl.textContent = `Hiển thị ${filteredProducts.length} sản phẩm`;
  }
}

/**
 * Render paginated products into DOM
 */
function renderProducts() {
  const grid = document.getElementById("products-grid");
  if (!grid) return;

  if (filteredProducts.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-16 text-center">
        <div class="w-20 h-20 mx-auto rounded-full bg-amber-50 text-amber-600 flex items-center justify-center text-3xl mb-4 border border-amber-200">
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        <h3 class="text-xl font-bold text-slate-800 mb-2">Không tìm thấy sản phẩm phù hợp</h3>
        <p class="text-slate-500 max-w-md mx-auto mb-6">Rất tiếc, chúng tôi không tìm thấy sản phẩm nào khớp với từ khóa hoặc bộ lọc đã chọn. Quý khách vui lòng thử lại với từ khóa khác.</p>
        <button onclick="resetFilters()" class="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-900 hover:bg-amber-600 text-white font-medium transition-all shadow-md">
          <i class="fa-solid fa-rotate-left"></i> Đặt Lại Bộ Lọc
        </button>
      </div>
    `;
    return;
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageItems = filteredProducts.slice(startIndex, endIndex);

  grid.innerHTML = pageItems
    .map((product) => {
      const formattedPrice = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(product.price);

      return `
      <div class="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
        <!-- Image Box -->
        <div class="relative overflow-hidden aspect-[4/3] bg-slate-100">
          <img 
            src="${product.image}" 
            alt="${product.name}" 
            loading="lazy"
            class="w-full h-full object-cover transform duration-700 group-hover:scale-108 group-hover:rotate-1"
          />
          <span class="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md text-amber-400 text-xs font-semibold px-3 py-1 rounded-full border border-amber-500/20">
            ${product.category}
          </span>
          <div class="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button 
              onclick="openProductModal(${product.id})"
              class="w-10 h-10 rounded-full bg-white text-slate-900 hover:bg-amber-500 hover:text-white transition-all shadow-lg flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 duration-300"
              title="Xem nhanh"
            >
              <i class="fa-solid fa-eye text-sm"></i>
            </button>
          </div>
        </div>

        <!-- Content -->
        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-1 text-amber-500 text-xs mb-2">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <span class="text-slate-400 ml-1 font-medium">(5.0)</span>
            </div>
            <h3 class="font-bold text-slate-900 text-base leading-snug line-clamp-2 group-hover:text-amber-600 transition-colors mb-2">
              ${product.name}
            </h3>
            <p class="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
              ${product.description}
            </p>
          </div>

          <!-- Bottom Price & CTA -->
          <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
            <div>
              <span class="block text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Giá tham khảo</span>
              <span class="text-lg font-extrabold text-amber-600 font-serif">${formattedPrice}</span>
            </div>
            <button 
              onclick="openProductModal(${product.id})"
              class="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-amber-600 text-white text-xs font-medium transition-colors shadow-sm flex items-center gap-1.5"
            >
              <span>Chi tiết</span>
              <i class="fa-solid fa-arrow-right text-[10px]"></i>
            </button>
          </div>
        </div>
      </div>
    `;
    })
    .join("");
}

/**
 * Render Pagination controls
 */
function renderPagination() {
  const container = document.getElementById("pagination-container");
  if (!container) return;

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  if (totalPages <= 1) {
    container.innerHTML = "";
    return;
  }

  let html = `
    <nav class="flex items-center justify-center gap-2">
      <!-- Prev Button -->
      <button 
        onclick="changePage(${currentPage - 1})"
        ${currentPage === 1 ? "disabled" : ""}
        class="w-10 h-10 rounded-xl flex items-center justify-center border border-slate-200 bg-white text-slate-700 transition-colors ${
          currentPage === 1
            ? "opacity-40 cursor-not-allowed"
            : "hover:bg-amber-50 hover:border-amber-400 hover:text-amber-600"
        }"
        title="Trang trước"
      >
        <i class="fa-solid fa-chevron-left text-xs"></i>
      </button>
  `;

  for (let i = 1; i <= totalPages; i++) {
    const isActive = i === currentPage;
    html += `
      <button 
        onclick="changePage(${i})"
        class="w-10 h-10 rounded-xl font-bold text-sm transition-all ${
          isActive
            ? "bg-amber-600 text-white shadow-md shadow-amber-600/30 border border-amber-600"
            : "bg-white border border-slate-200 text-slate-700 hover:bg-amber-50 hover:border-amber-400 hover:text-amber-600"
        }"
      >
        ${i}
      </button>
    `;
  }

  html += `
      <!-- Next Button -->
      <button 
        onclick="changePage(${currentPage + 1})"
        ${currentPage === totalPages ? "disabled" : ""}
        class="w-10 h-10 rounded-xl flex items-center justify-center border border-slate-200 bg-white text-slate-700 transition-colors ${
          currentPage === totalPages
            ? "opacity-40 cursor-not-allowed"
            : "hover:bg-amber-50 hover:border-amber-400 hover:text-amber-600"
        }"
        title="Trang kế tiếp"
      >
        <i class="fa-solid fa-chevron-right text-xs"></i>
      </button>
    </nav>
  `;

  container.innerHTML = html;
}

/**
 * Change current pagination page
 */
window.changePage = function (page) {
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  renderProducts();
  renderPagination();

  // Smooth scroll back to top of products grid
  const anchor = document.getElementById("products-section-anchor");
  if (anchor) {
    anchor.scrollIntoView({ behavior: "smooth" });
  }
};

/**
 * Reset all search and category filters
 */
window.resetFilters = function () {
  const searchInput = document.getElementById("search-input");
  if (searchInput) searchInput.value = "";
  searchKeyword = "";

  const categoryFilters = document.querySelectorAll(".category-filter-btn");
  categoryFilters.forEach((btn) => {
    if (btn.dataset.category === "all") {
      btn.click();
    }
  });
};

/**
 * Quick View Product Modal Logic
 */
window.openProductModal = function (productId) {
  const product = allProducts.find((p) => p.id === productId);
  if (!product) return;

  const formattedPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(product.price);

  let modal = document.getElementById("product-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "product-modal";
    modal.className =
      "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm opacity-0 pointer-events-none transition-all duration-300";
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 max-h-[90vh] flex flex-col md:flex-row transform scale-95 transition-transform duration-300" id="modal-card">
      <button 
        onclick="closeProductModal()"
        class="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-slate-900 hover:text-white text-slate-700 shadow-md flex items-center justify-center transition-colors"
      >
        <i class="fa-solid fa-xmark text-sm"></i>
      </button>

      <!-- Modal Image -->
      <div class="md:w-1/2 bg-slate-100 relative min-h-[260px] md:min-h-full">
        <img 
          src="${product.image}" 
          alt="${product.name}" 
          class="w-full h-full object-cover"
        />
        <div class="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-amber-400 text-xs font-semibold px-3 py-1 rounded-full border border-amber-500/20">
          ${product.category}
        </div>
      </div>

      <!-- Modal Details -->
      <div class="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
        <div>
          <div class="flex items-center gap-1.5 text-amber-500 text-xs mb-2">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <span class="text-slate-400 font-semibold ml-1">Đánh giá 5/5 từ 128 khách hàng</span>
          </div>

          <h2 class="text-xl md:text-2xl font-bold text-slate-900 font-serif leading-tight mb-3">
            ${product.name}
          </h2>

          <div class="mb-4">
            <span class="text-xs text-slate-400 uppercase tracking-wider font-semibold block">Giá niêm yết chính hãng</span>
            <span class="text-2xl font-extrabold text-amber-600 font-serif">${formattedPrice}</span>
          </div>

          <div class="border-t border-b border-slate-100 py-3 mb-4">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Mô tả đặc quyền</h4>
            <p class="text-sm text-slate-600 leading-relaxed">${product.description}</p>
          </div>

          <!-- Features pill -->
          <div class="grid grid-cols-2 gap-2 text-xs text-slate-600 mb-6">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-shield-halved text-amber-500"></i>
              <span>Bảo hành 10 năm</span>
            </div>
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-truck-fast text-amber-500"></i>
              <span>Giao lắp miễn phí</span>
            </div>
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-certificate text-amber-500"></i>
              <span>CO/CQ Châu Âu</span>
            </div>
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-arrows-rotate text-amber-500"></i>
              <span>Đổi mới 30 ngày</span>
            </div>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex flex-col sm:flex-row gap-3 pt-2">
          <a 
            href="tel:19008888" 
            class="flex-1 py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-center text-sm shadow-md shadow-amber-600/30 transition-all flex items-center justify-center gap-2"
          >
            <i class="fa-solid fa-phone"></i>
            <span>Gọi 1900 8888 Tư Vấn</span>
          </a>
          <a 
            href="index.html#contact" 
            onclick="closeProductModal()"
            class="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-center text-sm transition-all flex items-center justify-center gap-2"
          >
            <i class="fa-solid fa-envelope"></i>
            <span>Gửi Yêu Cầu</span>
          </a>
        </div>
      </div>
    </div>
  `;

  // Show modal
  modal.classList.remove("opacity-0", "pointer-events-none");
  const card = modal.querySelector("#modal-card");
  if (card) {
    card.classList.remove("scale-95");
    card.classList.add("scale-100");
  }

  // Close when clicking outside
  modal.onclick = (e) => {
    if (e.target === modal) {
      closeProductModal();
    }
  };
};

window.closeProductModal = function () {
  const modal = document.getElementById("product-modal");
  if (!modal) return;
  modal.classList.add("opacity-0", "pointer-events-none");
  const card = modal.querySelector("#modal-card");
  if (card) {
    card.classList.add("scale-95");
    card.classList.remove("scale-100");
  }
};
