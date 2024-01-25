<script setup lang="ts">
import type {Teacher} from "~/model/teacher"
import type {DropdownItem} from "#ui/types"

const supportedFileFormate: string[] = [
  "JSON",
  "CSV",
]

let selectedItem: DropdownItem = {label: ""}
const items: DropdownItem[][] = []

supportedFileFormate.forEach((format, index) => {
  items.push([
    {
      label: format,
      shortcuts: ["" + (index + 1)],
      disabled: (index == 0),
      icon: (index == 0) ? "i-heroicons-check-16-solid" : "",
      class: "opacity-100",
      click: () => selectFormat(format, index),
    },
  ])
  if (index == 0) selectedItem = items[index][0]
})

const teachers: Teacher[] = [
  {
    id: 1,
    user: "romo",
    from: "20230925,20231127,20240115,20240212,20240318,20240415,20240513,",
    to: "20231015,20231224,20240204,20240310,20240331,20240505,20240609,",
  },
  {
    id: 2,
    user: "heinz",
    from: "20230925,20231023,20231204,20240129,20240304,20240408,20240506,",
    to: "20231015,20231126,20240114,20240225,20240331,20240428,20240609,",
  },
]

function selectFormat(index: number): void {
  selectedItem.disabled = false
  selectedItem.icon = ""

  items[index][0].disabled = true
  items[index][0].icon = "i-heroicons-check-16-solid"

  selectedItem = items[index][0]
}

</script>

<template>
  <div class="flex justify-center mt-3 mr-3 ml-3 rounded">
    <UDropdown :items="items">
      <UButton color="white" label="Options"/>
    </UDropdown>
    <UButton class="ml-3">Generate</UButton>
  </div>
</template>
