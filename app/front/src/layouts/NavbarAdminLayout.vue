<template>
  <nav class="navbar navbar-expand sticky-top bg-body-tertiary">
    <div class="container-fluid">
      <button class="btn btn-link" type="button" @click="toggleSidebar">
        <i class="fas fa-bars"></i>
      </button>

      <div class="flex-shrink-0 dropdown">
        <a href="#" class="d-block link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown"
           aria-expanded="false">
          <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle">
        </a>
        <ul class="dropdown-menu text-small shadow">
          <li><a class="dropdown-item" href="#">Settings</a></li>
          <li><a class="dropdown-item" href="#">Profile</a></li>
          <li>
            <hr class="dropdown-divider">
          </li>
          <li><a class="dropdown-item" href="#">Sign out</a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const emits = defineEmits(['toggle-sidebar']);

function toggleSidebar() {
  emits('toggle-sidebar')
}
//</script>
