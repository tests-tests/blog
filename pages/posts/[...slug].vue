<script setup lang="ts">
const CONTENT_PREFIX = 'posts'
const route = useRoute()
const slug = computed(() => {
  const raw = Array.isArray(route.params.slug) ? route.params.slug.join('/') : String(route.params.slug || '')
  try {
    return decodeURIComponent(raw).normalize('NFKC')
  } catch {
    return raw.normalize('NFKC')
  }
})

useHead({
  htmlAttrs: {
    dir: 'rtl',
    lang: 'he'
  }
})

const { data: post } = await useAsyncData('post:' + slug.value, async () => {
  const all = await queryCollection('content').all()
  return all.find((item: any) => {
    const stem = String(item?.stem || '')
    const path = String(item?.path || '')
    const normalizedStem = (stem.startsWith(CONTENT_PREFIX + '/') ? stem.slice(CONTENT_PREFIX.length + 1) : stem).normalize('NFKC')
    const normalizedPath = path.replace(/^\//, '').replace(/^posts\//, '').replace(/\.md$/, '').normalize('NFKC')

    return normalizedStem === slug.value || normalizedPath === slug.value
  })
})

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })
}
</script>

<template>
  <UContainer class="py-10">
    <div class="mb-4 flex items-center justify-between">
      <UButton to="/" variant="ghost" icon="i-lucide-arrow-right">חזרה</UButton>
      <UColorModeButton />
    </div>

    <article class="rounded-2xl border border-default bg-default/70 p-6 shadow-sm backdrop-blur-sm">
      <ContentRenderer v-if="post" class="prose prose-neutral dark:prose-invert max-w-none" :value="post" />
    </article>
  </UContainer>
</template>
