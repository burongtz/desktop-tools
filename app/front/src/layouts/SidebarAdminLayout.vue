<template>
  <div
    :class="['d-flex flex-column flex-shrink-0 p-3 text-bg-dark shadow sidebar', {'is-expanded': isExpanded}]"
  >
    <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none sidebar-brand">
      <span class="fs-4 on-expanded">Desktop Tools</span>
      <span class="fs-4 on-collapsed">DT</span>
    </a>
    <hr>
    <ul class="nav nav-pills nav-flush flex-column mb-auto">
      <li class="nav-item">
        <a href="#" class="nav-link active d-flex align-items-center text-white" aria-current="page">
          <i class="fas fa-home"></i>
          <p>Home</p>
        </a>
      </li>
      <li class="nav-item">
        <a href="#" class="nav-link d-flex align-items-center text-white" aria-current="page">
          <i class="fas fa-qrcode"></i>
          <p>QR Code</p>
        </a>
      </li>
      <li class="nav-item">
        <a href="#" class="nav-link d-flex align-items-center text-white" aria-current="page">
          <i class="fas fa-gears"></i>
          <p>Settings</p>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface Props {
  isExpanded: boolean
}

const {isExpanded} = defineProps<Props>()
</script>

<style lang="scss">

</style>
