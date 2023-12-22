<script setup lang="ts">
interface Props {
  width?: string
  height?: string
}

withDefaults(defineProps<Props>(), {
  width: "20px",
  height: "20px",
})
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" aria-label="Vue" role="img" viewBox="0 0 512 512" :width="width" :height="height"
       fill="#000000">
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <path fill="#42b883" d="m64 140h148l44 77l44-77h148L256 473"></path>
      <path fill="#35495e" d="m141 140h71l44 77l44-77h71L256 340"></path>
    </g>
  </svg>
</template>
