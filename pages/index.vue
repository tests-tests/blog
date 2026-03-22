<script setup lang="ts">
const CONTENT_PREFIX = 'posts'

const { data: posts } = await useAsyncData('posts', async () => {
  return await queryCollection('content').where('extension', '=', 'md').all()
})

function toSlug(stem: string) {
  if (!stem) {
    return ''
  }

  if (stem.startsWith(CONTENT_PREFIX + '/')) {
    return stem.slice(CONTENT_PREFIX.length + 1)
  }

  return stem
}
</script>

<template>
  <main style="max-width: 780px; margin: 2rem auto; font-family: system-ui; line-height: 1.6; padding: 0 1rem;">
    <h1>Posts</h1>

    <ul style="padding-left: 1rem;">
      <li v-for="post in posts || []" :key="post.path" style="margin-bottom: 0.75rem;">
        <NuxtLink :to="'/posts/' + toSlug(post.stem)">{{ post.title || post.path }}</NuxtLink>
      </li>
    </ul>
  </main>
</template>
