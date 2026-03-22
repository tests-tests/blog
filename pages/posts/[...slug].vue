<script setup lang="ts">
import siteCopyRaw from '~/content/site-copy.json'

const CONTENT_PREFIX = 'posts'
const route = useRoute()
const siteCopy = {
  backToPostsButton: 'חזרה לפוסטים',
  ...siteCopyRaw
}

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

const postDate = computed(() => post.value?.date || post.value?.meta?.date || '')
const postTags = computed(() => {
  const raw = post.value?.tags || post.value?.meta?.tags || []
  return Array.isArray(raw) ? raw : []
})

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })
}
</script>

<template>
  <UContainer class="py-10">
    <div class="mb-4 flex items-center justify-between">
      <UButton to="/" variant="ghost" icon="i-lucide-arrow-right">{{ siteCopy.backToPostsButton }}</UButton>
      <UColorModeButton />
    </div>

    <article class="rounded-2xl border border-default bg-default/70 p-6 shadow-sm backdrop-blur-sm">
      <header v-if="post" class="mb-6 space-y-2 border-b border-default pb-5">
        <h1 class="text-3xl font-semibold">{{ post.title }}</h1>
        <p v-if="post.description" class="text-muted">{{ post.description }}</p>
        <div class="flex flex-wrap items-center gap-2">
          <UBadge v-if="postDate" variant="soft" color="neutral">{{ postDate }}</UBadge>
          <UBadge v-for="tag in postTags" :key="tag" variant="soft" color="primary">#{{ tag }}</UBadge>
        </div>
      </header>

      <ContentRenderer v-if="post" class="prose prose-neutral dark:prose-invert max-w-none" :value="post" />
    </article>
  </UContainer>
</template>
