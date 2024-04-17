import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  const config: any = nuxtApp.$config.public.feedefy;

  nuxtApp.hook('app:mounted', () => {
    const existingScript = document.querySelector(`script[src*="https://app.feedefy.com"]`);

    if (existingScript) {
      return;
    }

    if (!config?.id) {
      console.error("No projectId was passed to Feedefy Nuxt, widget will not be initialized");
      return;
    }

    const script = document.createElement("script");

    if (config?.lang) {
      script.setAttribute("lang", config.lang);
    }

    script.setAttribute("src", `https://app.feedefy.com/embed.js?id=${config.id}`);
    script.defer = true;
    script.addEventListener("error", () => script.remove());

    document.body.appendChild(script);
  })
})
