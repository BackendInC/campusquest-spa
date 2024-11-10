# CampusQuest

[Quest Campus - Frontend Documentation](./DOCUMENTATION.md)

## Libraries

[Vue.js - Frontend Framework](https://vuejs.org/)\
[VueUse - Utility Extension for Vue.js](https://vueuse.org/guide/)\
[VueRouter - SPA Router for Vue.js](https://router.vuejs.org/)\
[Pinia - State Management for Vue.js](https://pinia.vuejs.org/)\
[PrimeVue - Component Library for Vue.js](https://primevue.org/)\
[Tailwind - CSS Framework](https://tailwindcss.com/)\
[Ionic Capacitor - Native Runtime for Mobile](https://capacitorjs.com/)

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/)

### Extensions:

- [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).
- Tailwind CSS IntelliSense (For Tailwind IntelliSense Support)
- Ionic (For building to iOS and Android.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
