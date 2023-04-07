<template>
  <div
    :class="['d-flex flex-column flex-shrink-0 p-3 text-bg-dark shadow sidebar', {'is-expanded': isExpanded}]"
  >
    <a
      href="/"
      class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none sidebar-brand"
    >
      <span class="fs-4 on-expanded">Desktop Tools</span>
      <span class="fs-4 on-collapsed">DT</span>
    </a>
    <hr>
    <ul class="nav nav-pills nav-flush flex-column mb-auto">
      <li
        class="nav-item"
        v-for="(item, index) in items"
        :key="index"
      >
        <a
          href="#"
          :class="['nav-link d-flex align-items-center text-white', {'active': item.isActive}]"
          @click="item.onClicked()"
          aria-current="page"
        >
          <i :class="['fas', item.icon]"></i>
          <p>{{ item.title }}</p>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {router} from "../routes/routes";

interface Props {
  isExpanded: boolean
}

interface Item {
  title: string
  icon: string
  value: string,
  onClicked: Function,
  isActive?: boolean,
}

const {isExpanded} = defineProps<Props>()
const items: Item[] = [{
  title: 'Home',
  icon: 'fa-home',
  value: 'home',
  isActive: true,
  onClicked: () => router.push({name: 'home'}),
}, {
  title: 'QR Code',
  icon: 'fa-qrcode',
  value: 'qrs.create',
  onClicked: () => router.push({name: 'qrs.create'})
}, /*{
  title: 'Settings',
  icon: 'fa-gears',
  value: 'settings',
  onClicked: () => router.push({name: 'settings'})
}*/]
</script>
