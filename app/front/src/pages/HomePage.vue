<template>
  <admin-layout>
    Hi from home!
    <button class="btn btn-primary" type="button" @click="generateQr">Generate QR</button>
  </admin-layout>
</template>

<script setup lang="ts">
import AdminLayout from '../layouts/AdminLayout.vue'

async function generateQr(): Promise<void> {
  await IpcHelper.invoke('qrs.generate')
}

//</script>
