<script setup lang="ts">
import siteCopyRaw from '~/content/site-copy.json'

const CONTENT_PREFIX = 'posts'
const siteCopy = {
  blogLabel: 'בלוג',
  blogTitle: 'פוסטים',
  blogDescription: 'תצוגה נקייה, קריאה וברורה.',
  readPostButton: 'קריאה',
  postsListHeading: 'רשימת פוסטים',
  postsListDescription: 'כל הפוסטים שפורסמו באתר.',
  ...siteCopyRaw
}

useHead({
  htmlAttrs: {
    dir: 'rtl',
    lang: 'he'
  }
})

const { data: posts } = await useAsyncData('posts', async () => {
  return await queryCollection('content').where('extension', '=', 'md').all()
})

function safeDecode(value: string) {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

function toSlug(post: any) {
  const stem = String(post?.stem || '')
  const path = String(post?.path || '')
  if (!stem && !path) {
    return ''
  }

  const fromStem = stem.startsWith(CONTENT_PREFIX + '/') ? stem.slice(CONTENT_PREFIX.length + 1) : stem
  if (fromStem) {
    return safeDecode(fromStem).normalize('NFKC')
  }

  const fromPath = path
    .replace(/^\//, '')
    .replace(/^[^/]+\/posts\//, '')
    .replace(/^posts\//, '')
  return safeDecode(fromPath).replace(/\.md$/, '').normalize('NFKC')
}
</script>

<template>
  <UContainer class="py-10">
    <section class="rounded-2xl border border-default bg-default/70 p-5 backdrop-blur-sm">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div class="space-y-1">
          <p class="text-xs uppercase tracking-[0.2em] text-muted">{{ siteCopy.blogLabel }}</p>
          <h1 class="text-3xl font-semibold">{{ siteCopy.blogTitle }}</h1>
          <p class="text-sm text-muted">{{ siteCopy.blogDescription }}</p>
        </div>

        <UColorModeButton />
      </div>
    </section>

    <section class="mt-6 space-y-1">
      <h2 class="text-xl font-semibold">{{ siteCopy.postsListHeading }}</h2>
      <p class="text-sm text-muted">{{ siteCopy.postsListDescription }}</p>
    </section>

    <section class="mt-4 grid gap-4">
      <UCard v-for="post in posts || []" :key="post.path">
        <div class="space-y-3">
          <div class="space-y-1">
            <h2 class="text-xl font-semibold">{{ post.title || post.path }}</h2>
            <p v-if="post.description" class="text-sm text-muted">{{ post.description }}</p>
          </div>

          <div class="flex flex-wrap items-center justify-between gap-3">
            <div class="flex flex-wrap items-center gap-2">
              <UBadge v-if="post.date" variant="soft" color="neutral">{{ post.date }}</UBadge>
              <UBadge v-for="tag in post.tags || []" :key="`${post.path}:${tag}`" variant="soft" color="primary">#{{ tag }}</UBadge>
            </div>

            <UButton :to="'/posts/' + toSlug(post)" variant="soft" size="sm" icon="i-lucide-arrow-up-right">{{ siteCopy.readPostButton }}</UButton>
          </div>
        </div>
      </UCard>
    </section>
  </UContainer>
</template>
