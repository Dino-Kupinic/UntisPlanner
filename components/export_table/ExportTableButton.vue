<script setup lang="ts">
import type {Teacher} from "~/model/teacher"
import type {DropdownItem} from "#ui/types"
import {useTableExportStore} from "~/stores/tableExportStore"

const {teachers} = storeToRefs(useTableExportStore())
const supportedFileFormats: string[] = [
  "CSV",
  "JSON",
]

const selectedItem: Ref<DropdownItem> = ref({
  label: "",
})
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
  const file = createFile(teachers.value)

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
      return new File([jsonToCSV(teachers)], "untisPlanner.csv", {
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

function jsonToCSV(items: any) {
  const header = Object.keys(items[0])
  const headerString = header.join(",")
  const replacer = (key: any, value: any) => value ?? ""
  const rowItems = items.map((row: any) =>
    header
      .map((fieldName) => JSON.stringify(row[fieldName], replacer))
      .join(","),
  )
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
const showClipboardOutput = ref<boolean>(false)
watch(isOpen, (newIsOpen) => {
  if (!newIsOpen) showClipboardOutput.value = false
})

const jsonContent = ref<string>("")
const csvContent = ref<string>("")
const {isSupported} = useClipboard({legacy: true})
// @ts-ignore
const {copy: copyJSON, copied: copiedJSON} = useClipboard({jsonContent, legacy: true})
// @ts-ignore
const {copy: copyCSV, copied: copiedCSV} = useClipboard({csvContent, legacy: true })

function copyToClipboard() {
  showClipboardOutput.value = true
  csvContent.value = jsonToCSV(teachers.value)
  jsonContent.value = JSON.stringify(teachers.value, null, 2)
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
          <UButton @click="download()" icon="i-heroicons-arrow-down-circle" label="Download directly"/>
          <UButton @click="copyToClipboard()" variant="outline" icon="i-heroicons-clipboard" label="Copy to clipboard"/>
        </div>
        <template #footer>
          <div v-if="showClipboardOutput" class="flex flex-col gap-2">
            <template v-if="isSupported">
              <p class="text text-base font-semibold">Output</p>
              <p class="text text-sm">JSON</p>
              <UTextarea v-model="jsonContent" :rows="6"/>
              <UButton @click="copyJSON(jsonContent)" variant="ghost" icon="i-heroicons-clipboard" class="w-24">
                <span v-if="!copiedJSON">Copy</span>
                <span v-else>Copied!</span>
              </UButton>
              <p class="text text-sm">CSV</p>
              <UTextarea v-model="csvContent" :rows="6"/>
              <UButton @click="copyCSV(csvContent)" variant="ghost" icon="i-heroicons-clipboard" class="w-24">
                <span v-if="!copiedCSV">Copy</span>
                <span v-else>Copied!</span>
              </UButton>
            </template>
          </div>
          <p class="text text-sm mb-2 mt-2">Download Options</p>
          <UDropdown :items="items">
            <UButton color="white" label="File Type"/>
          </UDropdown>
        </template>
      </UCard>
    </UModal>
  </div>
  <div class="flex justify-center m-3">
    <UButton label="Export Data" @click="isOpen = true">
      <template #trailing>
        <UIcon class="w-5 h-5" name="i-material-symbols-export-notes"/>
      </template>
    </UButton>
  </div>
</template>
