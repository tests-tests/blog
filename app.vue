<script setup lang="ts">
import themeRaw from '~/content/theme-settings.json'

const theme = {
  uiPrimaryLight: '#2563eb',
  uiPrimaryDark: '#60a5fa',
  uiBgLight: '#ffffff',
  uiBgDark: '#0f172a',
  uiBgMutedLight: '#f8fafc',
  uiBgMutedDark: '#111827',
  uiBorderLight: '#e5e7eb',
  uiBorderDark: '#1f2937',
  uiTextLight: '#1f2937',
  uiTextDark: '#e5e7eb',
  uiRadius: '0.5rem',
  ...themeRaw
}

useHead({
  style: [
    {
      key: 'blog-theme-vars',
      innerHTML: `:root{--ui-primary:${theme.uiPrimaryLight};--ui-bg:${theme.uiBgLight};--ui-bg-muted:${theme.uiBgMutedLight};--ui-border:${theme.uiBorderLight};--ui-text:${theme.uiTextLight};--ui-radius:${theme.uiRadius};}.dark{--ui-primary:${theme.uiPrimaryDark};--ui-bg:${theme.uiBgDark};--ui-bg-muted:${theme.uiBgMutedDark};--ui-border:${theme.uiBorderDark};--ui-text:${theme.uiTextDark};}`
    }
  ]
})
</script>

<template>
  <UApp>
    <NuxtPage />
  </UApp>
</template>
