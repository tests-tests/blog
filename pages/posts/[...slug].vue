<script setup lang="ts">
const CONTENT_PREFIX = 'posts'
const route = useRoute()

function normalizeRouteSlug(value: string) {
  const cleaned = value.replace(/^\/+|\/+$/g, '')
  try {
    return decodeURIComponent(cleaned).normalize('NFKC')
  } catch {
    return cleaned.normalize('NFKC')
  }
}

function normalizeDocSlug(item: any) {
  const stem = String(item?.stem || '')
  const path = String(item?.path || '')

  const fromStem = stem.startsWith(CONTENT_PREFIX + '/') ? stem.slice(CONTENT_PREFIX.length + 1) : stem
  const byStem = fromStem ? fromStem : ''

  const byPath = path
    .replace(/^\//, '')
    .replace(/^[^/]+\/posts\//, '')
    .replace(/^posts\//, '')
    .replace(/\.md$/, '')

  const candidate = byStem || byPath
  return normalizeRouteSlug(candidate)
}

const slug = computed(() => {
  const raw = Array.isArray(route.params.slug) ? route.params.slug.join('/') : String(route.params.slug || '')
  return normalizeRouteSlug(raw)
})

useHead({
  htmlAttrs: {
    dir: 'rtl',
    lang: 'he'
  }
})

const { data: post } = await useAsyncData('post:' + slug.value, async () => {
  const all = await queryCollection('content').all()
  return all.find((item: any) => normalizeDocSlug(item) === slug.value)
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
