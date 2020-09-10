# Fishtown UI 🎨🐠

The design implementation used at Fishtown Analytics.

Built using [Tailwind](https://tailwindcss.com/), TypeScript and React.

## Install

Install the Fishtown UI theme and component library using npm when installing Tailwind and other plugins.

```sh
npm install --save tailwindcss autoprefixer fishtown-analytics/fishtown-ui
```

## Usage

### Tailwind Theme

Follow the usage instructions for Tailwind. Use the Fishtown UI theme in your Tailwind configuration.

```js
// Your project's tailwind.config.js
const fishtownUiTheme = require("fishtown-ui/theme");

module.exports = {
  ...fishtownUiTheme,
  // customizations...
};
```

### Component Library

We don't have components yet, but they are on our internal roadmap.

## Contributing

We're not quite ready for contributions at this moment. We'll update this section when we're ready!

## Roadmap

- Define appropriate use of Storybook
- Define critical components
- Determine if we should export CSS file(s) with compositions (`@apply` definitions)

## License

[Apache License, Version 2.0](LICENSE)
