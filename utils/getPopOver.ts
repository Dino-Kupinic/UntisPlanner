import type {PopoverConfig} from "v-calendar/dist/types/src/utils/attribute.d.ts"

/**
 * The visibility options for the popover
 */
type VisibilityOptions = "click" | "hover" | "hover-focus" | "focus"
/**
 * Utility function to create a PopoverConfig object
 *
 * @param label - The label to display in the popover
 * @param visibility - The visibility of the popover. Default is "hover"
 * @returns PopoverConfig
 */
export default function (label: string, visibility: VisibilityOptions = "hover"): PopoverConfig {
  return {
    label: label,
    visibility: visibility,
  }
}