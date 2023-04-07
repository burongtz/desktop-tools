<template>
  <admin-layout>
    Hi from home!
    <button class="btn btn-primary" type="button" @click="generateQr">Generate QR</button>
    <div v-html="htmlSvg"></div>
  </admin-layout>
</template>

<script setup lang="ts">
import AdminLayout from '../layouts/AdminLayout.vue'
import {ref} from "vue";
import DOMPurify from 'dompurify';
import {QrService} from "../services/qr-service";
import {ServiceFactory} from "../factories/service-factory";

const qrService = ServiceFactory.create<QrService>(QrService)
const htmlSvg = ref<string>('');

async function generateQr(): Promise<void> {
  const svg = await qrService.generate()
  htmlSvg.value = DOMPurify.sanitize(svg)
}

//</script>
