<template>
  <div class="dashboard">
    <!-- Header -->
    <header class="header">
      <div class="header-left">
        <button class="menu-toggle" @click="toggleSidebar">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <div class="logo">
          <img src="@/assets/induslogo.png" alt="KFINTECH Logo" />
        </div>
      </div>
      <div class="header-right">
        <button class="icon-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </button>
        <div class="user-profile">
          <div class="avatar">U</div>
        </div>
      </div>
    </header>

    <div class="main-container">
      <!-- Sidebar -->
      <aside class="sidebar" :class="{ 'sidebar-open': isSidebarOpen }">
        <nav class="sidebar-nav">
          <div
            v-for="(item, index) in menuItems"
            :key="index"
            class="nav-item"
            :class="{ 'has-dropdown': item.children }"
          >
            <div class="nav-link" @click="toggleDropdown(index)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="9" x2="15" y2="9"></line>
                <line x1="9" y1="13" x2="15" y2="13"></line>
                <line x1="9" y1="17" x2="15" y2="17"></line>
              </svg>
              <span>{{ item.title }}</span>
              <svg
                v-if="item.children"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                class="dropdown-icon"
                :class="{ 'rotated': item.open }"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
            <transition name="slide">
              <div v-if="item.children && item.open" class="dropdown-menu">
                <div v-for="(child, cIndex) in item.children" :key="cIndex" class="dropdown-item">
                  {{ child }}
                </div>
              </div>
            </transition>
          </div>
        </nav>
      </aside>

      <!-- Main Content -->
      
    </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const isSidebarOpen = ref(true)

const menuItems = reactive([
  { title: 'Investor Corner', open: false },
  { title: 'Enquiry', open: false },
  { title: 'Exemption Form', open: false },
  { title: 'ISR Forms & Annexures', open: false },
  { title: 'Events Calendar', open: false },
  { title: 'Portfolio', open: false },
  { title: 'Contact Us', open: false },
  { title: "FAQ's", open: false },
  { title: 'Employee Details - Sec 197', open: false }
])

// Sample children for dropdown demo
menuItems[0].children = ['Profile', 'Documents']
menuItems[1].children = ['Query Form', 'Status Check']



const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const toggleDropdown = (index) => {
  const item = menuItems[index]
  if (item.children) {
    item.open = !item.open
  }
}
</script>

<style scoped>
* { margin: 0; padding: 0; box-sizing: border-box; }

.dashboard {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a001a 0%, #2d002d 100%);
  position: relative;
  overflow-x: hidden;
}

.header {
  position: relative;
  z-index: 100;
  background: rgba(20, 20, 20, 0.95); /* semi-transparent */
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 50px; /* reduced vertical padding for smaller height */
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  height: 60px; /* optional: fixed height for consistency */
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo img {
  height: 50px; /* smaller logo to reduce navbar height */
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
}

.icon-btn {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #fff;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
}

@media (max-width: 1024px) {
  .menu-toggle {
    display: block;
  }
}

.logo { display: flex; align-items: center; gap: 0.75rem; }
.logo-icon { font-size: 2rem; font-weight: bold; color: #4fc3f7; }
.logo-text { display: flex; flex-direction: column; }
.logo-title { font-size: 1.25rem; font-weight: 700; color: #fff; letter-spacing: 0.5px; }
.logo-subtitle { font-size: 0.6rem; color: #888; letter-spacing: 1px; }

.menu-toggle { display: none; background: none; border: none; color: #fff; cursor: pointer; }

.icon-btn { background: rgba(255,255,255,0.1); border: none; color: #fff; width:40px; height:40px; border-radius:50%; display:flex; align-items:center; justify-content:center; }

.avatar { width:40px; height:40px; border-radius:50%; background:linear-gradient(135deg,#667eea 0%,#764ba2 100%); color:#fff; display:flex; align-items:center; justify-content:center; font-weight:600; }

.main-container { display: flex; min-height: calc(100vh - 70px); }

.sidebar {
  width: 280px;
  background: rgba(30,30,30,0.95);
  backdrop-filter: blur(10px);
  border-right:1px solid rgba(255,255,255,0.1);
  padding:1.5rem 0;
  transition: transform 0.3s ease;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 50px;
  z-index: 1;
  position: relative;
}

.navbar .logo img {
  height: 50px;
}
.sidebar-nav { display: flex; flex-direction: column; gap:0.5rem; }
.nav-link { display: flex; align-items:center; gap:0.75rem; padding:0.875rem 1.5rem; color:#e0e0e0; cursor:pointer; border-left:3px solid transparent; transition: all 0.3s; }
.nav-link:hover { background: rgba(255,255,255,0.05); border-left-color:#4fc3f7; color:#fff; }
.dropdown-icon { margin-left:auto; transition: transform 0.3s; }
.dropdown-icon.rotated { transform: rotate(180deg); }
.dropdown-menu { background: rgba(0,0,0,0.3); padding:0.5rem 0; }
.dropdown-item { padding:0.625rem 1.5rem 0.625rem 3.5rem; color:#aaa; cursor:pointer; transition: all 0.3s; font-size:0.875rem; }
.dropdown-item:hover { color:#fff; background: rgba(255,255,255,0.05); }

.content { flex: 1; padding: 2rem; overflow-y:auto; }
.content-grid { display:grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap:2rem; }
.card { background: rgba(40,40,45,0.9); backdrop-filter: blur(10px); border-radius:8px; padding:1.5rem; border:1px solid rgba(255,255,255,0.1); display:flex; flex-direction:column; }
.card-title { color:#e0e0e0; font-size:1rem; font-weight:500; margin-bottom:1.5rem; padding-bottom:1rem; border-bottom:1px solid rgba(255,255,255,0.1); }
.activities-list { display:flex; flex-direction:column; gap:1rem; margin-bottom:1rem; }
.activity-item { display:flex; justify-content:space-between; align-items:center; }
.activity-label { color:#ccc; font-size:0.875rem; }
.activity-badge.green { background:#10b981; color:#fff; padding:0.375rem 1.5rem; border-radius:4px; font-weight:600; font-size:0.875rem; min-width:80px; text-align:center; }
.activity-badge.cyan { background:#06b6d4; color:#fff; padding:0.375rem 1.5rem; border-radius:4px; font-weight:600; font-size:0.875rem; min-width:80px; text-align:center; }
.activity-badge.yellow { background:#f59e0b; color:#fff; padding:0.375rem 1.5rem; border-radius:4px; font-weight:600; font-size:0.875rem; min-width:80px; text-align:center; }

.show-all-btn { margin-top:auto; background:#1e40af; color:#fff; border:none; padding:0.625rem 1rem; border-radius:4px; cursor:pointer; font-size:0.8rem; align-self:flex-end; transition: background 0.3s; }
.show-all-btn:hover { background:#1e3a8a; }

@media (max-width: 1024px) {
  .sidebar { position:fixed; left:0; top:70px; bottom:0; transform: translateX(-100%); z-index:99; }
  .sidebar.sidebar-open { transform: translateX(0); }
  .menu-toggle { display:block; }
  .content-grid { grid-template-columns: 1fr; }
}
</style>