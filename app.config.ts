export default defineAppConfig({
  ui: {
    primary: 'green',
    gray: 'cool',
    container: {
      constrained: '',
      padding: 'p-2',
      base: '',
    },
    button: {
      size: {
        "2xs": "text-xs",
        "xs": "text-xs",
        "sm": "text-sm",
        "md": "text-sm",
        "lg": "text-sm",
        "xl": "text-base",
        "3xl": "text-3xl"
      }
    }
  },
  nuxtIcon: {
    size: '24px', // default <Icon> size applied
    class: 'icon', // default <Icon> class applied
    aliases: {
      'nuxt': 'logos:nuxt-icon',
    }
  }
})