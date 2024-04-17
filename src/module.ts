import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {
  id: string;
  lang?: string | undefined;
}

declare module '@nuxt/schema' {
  interface PublicRuntimeConfig {
    feedefy: ModuleOptions
  }
  interface NuxtConfig {
    feedefy?: ModuleOptions
  }
  interface NuxtOptions {
    feedefy?: ModuleOptions
  }
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
    lang: undefined
  },
  setup (options, nuxt) {
    const resolver = createResolver(import.meta.url);

    nuxt.options.runtimeConfig.public.feedefy = {
      ...options,
      ...nuxt.options.runtimeConfig.public.feedefy
    };

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))
  }
})
