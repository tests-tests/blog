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
  <UContainer class="py-10">
    <div class="mb-4 flex items-center justify-between">
      <UButton to="/" variant="ghost" icon="i-lucide-arrow-left">Back</UButton>
      <UColorModeButton />
    </div>

    <article class="rounded-2xl border border-default bg-default/70 p-6 shadow-sm backdrop-blur-sm">
      <ContentRenderer v-if="post" class="prose prose-neutral dark:prose-invert max-w-none" :value="post" />
    </article>
  </UContainer>
</template>
