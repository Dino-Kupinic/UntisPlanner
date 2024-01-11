export default defineAppConfig({
  ui: {
    primary: 'green',
    gray: 'cool',
    container: {
      constrained: '',
      padding: 'p-2',
      base: ''
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