<template>
  <admin-layout>
    <form @submit.prevent="handleSubmit" @reset.prevent="handleReset">
      <div class="row">
        <div class="col-sm-6 col-md-7 col-lg-8 col-xl-9">
          <div class="mb-3">
            <label class="form-label">Content</label>
            <textarea
              class="form-control"
              v-model="form.content"
              :disabled="shownSvg"
              rows="6"
            ></textarea>
          </div>
        </div>
        <div class="col-sm-6 col-md-5 col-lg-4 col-xl-3">
          <div class="ratio ratio-1x1">
            <template v-if="shownSvg">
              <span v-html="svgHTML"></span>
            </template>
            <span class="bg-light" v-else></span>
          </div>

          <hr class="border"/>

          <div class="d-flex flex-wrap gap-2">
            <button
              class="btn btn-primary w-100"
              type="submit"
              :disabled="form.content === '' || shownSvg"
            >
              Generate QR
            </button>
            <button
              class="btn btn-warning w-100"
              type="reset"
            >
              Clear
            </button>
            <div class="d-flex gap-3 w-100" v-if="false">
              <button class="btn btn-success w-50" type="submit">
                Download SVG
              </button>
              <button class="btn btn-success" type="submit">
                Download PNG
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </admin-layout>
</template>

<script setup lang="ts">
import {computed, ref, toRaw} from "vue";
import DOMPurify from 'dompurify';
import {QrService} from "../services/qr-service";
import {ServiceFactory} from "../factories/service-factory";
import AdminLayout from "../layouts/AdminLayout.vue";

const qrService = ServiceFactory.create<QrService>(QrService)
const svgHTML = ref<string>('')
const shownSvg = computed(() => svgHTML.value !== '')
const form = ref({content: ''})

async function handleSubmit(): Promise<void> {
  const svg = await qrService.generate(toRaw(form.value))
  svgHTML.value = DOMPurify.sanitize(svg)
}

async  function handleReset(): Promise<void> {
  svgHTML.value = ''
  form.value.content = ''
}

//</script>
