---
title: "קוד Nuxt"
description: "סתם פוסט מוזר
אין צורך להתלהב"
date: "2026-03-22"
tags: ["nuxt"]
---

## שלום לכם!

שנים רציתי לכתוב משהו אמיתי ממני אליכם. שבו בנוח.

לפני כמה ימים התרחשה מהומה ב[Nuxt UI](https://ui.nuxt.com/docs/components/modal#scrollable).

זה הקוד:

```js
<template>
  <UModal scrollable title="Modal scrollable">
    <UButton label="Open" color="neutral" variant="subtle" />

    <template #body>
      <Placeholder class="h-full" />
    </template>
  </UModal>
</template>
```
