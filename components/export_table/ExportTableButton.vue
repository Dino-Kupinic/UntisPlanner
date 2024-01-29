<script setup lang="ts">
import type {Teacher} from "~/model/teacher"
import type {DropdownItem} from "#ui/types"
import {useTableExportStore} from "~/stores/tableExportStore"


const tableExportStore = useTableExportStore()
const supportedFileFormate: string[] = [
  "CSV",
  "JSON",
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
      click: () => selectFormat(index),
    },
  ])
  if (index == 0) selectedItem = items[index][0]
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
  if (selectedItem.label == "CSV") {
    return new File([jsonToCsv(teachers)], "untisPlanner.csv", {
      type: "text/csv",
    })
  } else if (selectedItem.label == "JSON") {
    const blob = new Blob([JSON.stringify(teachers, null, 2)], {
      type: "application/json",
    })

    return new File([blob], "untisPlanner.json", {
      type: "application/json",
    })
  } else return null
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
  const csv = [headerString, ...rowItems].join("\r\n")
  return csv
}

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
    <UButton class="ml-3" @click="download()">Generate</UButton>
  </div>
</template>
