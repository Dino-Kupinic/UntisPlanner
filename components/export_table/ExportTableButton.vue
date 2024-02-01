<script setup lang="ts">
import type {Teacher} from "~/model/teacher"
import type {DropdownItem} from "#ui/types"
import {useTableExportStore} from "~/stores/tableExportStore"

const tableExportStore = useTableExportStore()
const supportedFileFormats: string[] = [
  "CSV",
  "JSON",
]

const selectedItem: Ref<DropdownItem> = ref({label: ""})
const items: DropdownItem[][] = []

supportedFileFormats.forEach((format, index) => {
  items.push([
    {
      label: format,
      shortcuts: ["" + (index + 1)],
      disabled: (index == 0),
      icon: (index == 0) ? "i-heroicons-check-16-solid" : "",
      click: () => selectFormat(index),
    },
  ])
  if (index == 0) selectedItem.value = items[index][0]
})

function download() {
  const teachers: Teacher[] = tableExportStore.teachers
  const file = createFile(teachers)

  if (file != null) {
    const link = document.createElement("a")
    const url = URL.createObjectURL(file)

    link.href = url
    link.download = file.name
    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }
}

function createFile(teachers: Teacher[]): File | null {
  switch (selectedItem.value.label) {
    case "CSV":
      return new File([jsonToCsv(teachers)], "untisPlanner.csv", {
        type: "text/csv",
      })
    case "JSON":
      const blob = new Blob([JSON.stringify(teachers, null, 2)], {
        type: "application/json",
      })

      return new File([blob], "untisPlanner.json", {
        type: "application/json",
      })
    default:
      return null
  }
}

function jsonToCsv(items: any) {
  const header = Object.keys(items[0])
  const headerString = header.join(",")
  // handle null or undefined values here
  const replacer = (key: any, value: any) => value ?? ""
  const rowItems = items.map((row: any) =>
    header
      .map((fieldName) => JSON.stringify(row[fieldName], replacer))
      .join(","),
  )
  // join header and body, and break into separate lines
  return [headerString, ...rowItems].join("\r\n")
}

function selectFormat(index: number): void {
  selectedItem.value.disabled = false
  selectedItem.value.icon = ""

  items[index][0].disabled = true
  items[index][0].icon = "i-heroicons-check-16-solid"

  selectedItem.value = items[index][0]
}

const isOpen = ref<boolean>(false)

function openDownloadPrompt() {
  isOpen.value = true
  // download()
}
</script>

<template>
  <div class="flex justify-center mt-3 mr-3 ml-3 rounded">
    <UModal v-model="isOpen">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <p class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              How would you like to have your data?
            </p>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                     @click="isOpen = false"/>
          </div>
        </template>
        <div class="flex flex-row justify-evenly">
          <UButton icon="i-heroicons-arrow-down-circle" label="Download directly"/>
          <UButton variant="outline" icon="i-heroicons-clipboard" label="Copy to clipboard"/>
        </div>
        <template #footer>
          <div class="flex flex-col gap-2 ">
            <p class="text text-base font-semibold">Output</p>
            <p class="text text-sm">JSON</p>
            <UTextarea>

            </UTextarea>
            <p class="text text-sm">CSV</p>
            <UTextarea>

            </UTextarea>
          </div>
          <p class="text text-sm mb-2 mt-2">Download Options</p>
          <UDropdown :items="items">
            <UButton color="white" label="File Type"/>
          </UDropdown>
        </template>
      </UCard>
    </UModal>

    <UButton class="ml-3" @click="openDownloadPrompt()">Download</UButton>
  </div>
</template>
