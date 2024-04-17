import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {
  id: string;
  lang?: string;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@feedefy/nuxt',
    configKey: 'feedefy',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  // Default configuration options of the Nuxt module
  defaults: {
    id: '',
    lang: ''
  },
  setup (options, nuxt) {
    const resolver = createResolver(import.meta.url);

    nuxt.options.runtimeConfig.feedefyOptions = options;
    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin({ src: resolver.resolve('./runtime/plugin'), mode: 'client' }, )
  }
})
