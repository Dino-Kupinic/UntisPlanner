<template>
  <div class="navbar-container">
    <!-- Untis Planner Logo -->
    <img src="/untis_planner.png" alt="Untis Planner Logo" class="logo" />

    <!-- Light/Dark Mode Switch -->
    <NavBarThemeToggle />

    <!-- Settings Dropdown -->
    <div class="settings-dropdown" @click="toggleSettings">
      <!-- Your Settings Icon/Image -->
      <span class="settings-icon">⚙️</span>

      <!-- Dropdown Content -->
      <div v-show="showSettings" class="dropdown-content">
        <!-- Your Settings Options -->
        <div class="setting-option">Option 1</div>
        <div class="setting-option">Option 2</div>
        <!-- Add more options as needed -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBarThemeToggle from '@/components/nav/NavBarThemeToggle.vue';
let showSettings = false;

const toggleSettings = () => {
  showSettings = !showSettings;
};
</script>

<style scoped>
.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #2c3e50; /* Set background color */
  color: #ecf0f1; /* Set text color */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.logo {
  width: 100px;
  height: auto;
}

.settings-dropdown {
  cursor: pointer;
  position: relative;
}

.settings-icon {
  font-size: 24px;
  color: #ecf0f1; /* Set icon color */
}

.dropdown-content {
  position: absolute;
  top: 100%;
  right: 0;
  display: none;
  flex-direction: column;
  background-color: #34495e; /* Set dropdown background color */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.dropdown-content .setting-option {
  padding: 10px;
  cursor: pointer;
  color: #ecf0f1; /* Set dropdown text color */
  transition: background-color 0.3s;
}

.dropdown-content .setting-option:hover {
  background-color: #2c3e50; /* Set hover background color */
}

/* Media Query for Mobile */
@media screen and (max-width: 768px) {
  .navbar-container {
    flex-direction: column;
  }
}
</style>
