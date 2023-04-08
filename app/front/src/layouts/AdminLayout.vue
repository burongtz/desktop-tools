<template>
  <div class="d-flex flex-nowrap vh-100 overflow-hidden">
    <sidebar-admin-layout :is-expanded="sidebarExpanded"/>

    <div class="w-100 overflow-auto">
      <navbar-admin-layout @toggle-sidebar="toggleSidebar"/>
      <main class="container-fluid my-3">
        <slot/>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import SidebarAdminLayout from "./SidebarAdminLayout.vue";
import NavbarAdminLayout from "./NavbarAdminLayout.vue"
import {ref} from 'vue'

const sidebarExpanded = ref<boolean>(true)

function toggleSidebar() {
  sidebarExpanded.value = !sidebarExpanded.value
}

//</script>
