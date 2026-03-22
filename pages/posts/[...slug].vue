<script setup lang="ts">
const CONTENT_PREFIX = 'posts'
const route = useRoute()
const slug = computed(() => Array.isArray(route.params.slug) ? route.params.slug.join('/') : String(route.params.slug || ''))

const { data: post } = await useAsyncData('post:' + slug.value, async () => {
  return await queryCollection('content').path('/' + CONTENT_PREFIX + '/' + slug.value).first()
})

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })
}
</script>

<template>
  <main style="max-width: 780px; margin: 2rem auto; font-family: system-ui; line-height: 1.7; padding: 0 1rem;">
    <NuxtLink to="/">Back</NuxtLink>
    <ContentRenderer v-if="post" :value="post" />
  </main>
</template>
