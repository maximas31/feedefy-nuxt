import { defineNuxtPlugin, useRuntimeConfig } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const { id, lang } = useRuntimeConfig().feedefyOptions as any;

  nuxtApp.hook('app:mounted', () => {
    const existingScript = document.querySelector(`script[src*="https://app.feedefy.com"]`);

    if (existingScript) {
      return;
    }

    if (!id) {
      console.error("No projectId was passed to Feedefy Nuxt, widget will not be initialized");
      return;
    }

    const script = document.createElement("script");

    if (lang) {
      script.setAttribute("lang", lang);
    }

    script.setAttribute("src", `https://app.feedefy.com/embed.js?id=${id}`);
    script.defer = true;
    script.addEventListener("error", () => script.remove());

    document.body.appendChild(script);
  })
})
