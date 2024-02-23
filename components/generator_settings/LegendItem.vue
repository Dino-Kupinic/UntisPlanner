<script setup lang="ts">
import type {LegendHoliday} from "~/model/holiday"

defineProps<{
  legendItems: LegendHoliday[],
}>()
</script>

<template>
  <div class="flex gap-2 items-center p-1" v-for="item in legendItems" :key="item.name">
    <UPopover mode="hover">
      <div :style="{ 'background-color': item.color.value }" class="rounded-full size-3"/>
      <template #panel>
        <div class="p-1">
          <span class="text text-sm">{{item.color.name}}</span>
        </div>
      </template>
    </UPopover>
    <span class="text-sm">{{ item.name }}</span>
  </div>
</template>
