<script setup lang="ts">
import {SpeedInsights} from "@vercel/speed-insights/vue"
</script>

<template>
  <SpeedInsights/>
  <NavBar/>
  <slot></slot>
  <Footer/>
</template>
