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

After installing Tailwind and Fishtown UI, follow the [usage instructions for Tailwind](https://tailwindcss.com/docs/installation#add-tailwind-to-your-css).

Apply the Fishtown UI theme in your Tailwind configuration.

```js
// Your project's tailwind.config.js
const fishtownUiTheme = require('fishtown-ui/theme');

// Example config with a custom color
module.exports = {
  ...fishtownUiTheme,
  // Customizations will overwrite the shallow-copy spread, so spread again where appropriate
  theme: {
    extend: {
      colors: {
        ...fishtownUiTheme.theme.extend.colors,
        'sextant-yellow': '#ffb600',
      },
    },
  },
};
```

We [prefix all Tailwind classes](https://tailwindcss.com/docs/configuration#prefix) with `tw-` to avoid conflicts with existing styles.

```html
<nav class="tw-bg-dbt-orange tw-p-6">
  <div class="tw-text-white tw-mr-6">
    <span class="tw-font-semibold tw-text-xl tw-tracking-tight">
      Fishtown UI
    </span>
  </div>
</nav>
```

### Component Library

We don't have ready-to-use components yet, but future usage will roughly look like the following.

We currently only export React components written in TypeScript.

```tsx
import React from 'react';
import { Button } from 'fishtown-ui';

const logIn = () => {
  /* ... */
};

const LogInButton: React.FC = () => {
  return <Button onClick={logIn}>Log In</Button>;
};

export default LogInButton;
```

## Contributing

Read our [contributing guide](/story/docs-contributing--page) (in Storybook)

## Roadmap

- Define appropriate use of Storybook
- Define default fonts and iconography
- Define critical components
- Determine if we should export CSS file(s) with compositions (`@apply` definitions)

## License

[Apache License, Version 2.0](LICENSE)
