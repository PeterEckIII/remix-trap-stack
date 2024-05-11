# The Trap Stack

## What's Included
- [Remix ❤️ Vite](https://remix.run/docs/en/main/future/vite)
- [Remix Developer Tools](https://remix-development-tools.fly.dev/)
- ORM and Postgresql setup with [Prisma](https://www.prisma.io/)
- Styling with [Tailwindcss](https://tailwindcss.com/)
- UI development iteration with [Storybook](https://storybook.js.org/)
- Custom SVG sprite icon generation with type checking
- Plug-and-play components courtesy of [shadcn-ui](https://ui.shadcn.com/)
- Test database powered by [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
- Unit testing with [Testing Library](https://testing-library.com/) and [Vitest](https://vitest.dev/)
- E2E testing thanks to [Playwright](https://playwright.dev/)
- Industry-standard code formatting with [Prettier](https://prettier.io/)
- Linting via [ESLint](https://eslint.org/)
- Static type checking via [Typescript](https://www.typescriptlang.org/)

## UI

### <ins>Icon Generation</ins>

Entrypoint: `./scripts/icons.ts`

<ins>Dependencies</ins>

- `ts-node`

<ins>Steps to add an icon to your library</ins>

1. Open `./resources/` and create a new `.svg.` file -- use `snake_case_syntax` when naming your `.svg` files for the best DX

2. Remove the `height` and `width` properties from the SVG to support dynamic sizing

3. Remove the `class` attribute from the SVG

4. Make sure the nested element of the SVG doesn't include any custom `fill` or `stroke` properties to support dynamic colors
   <ins>**NOTE**</ins>: The `<svg>` component itself can have `stroke` and `fill` properties, but any nested elements need to be blank

5. Run `npm run icons` to generate sprites for your icons in the `./resources` directory

6. Your icon will be generated based `./app/library/icon/icons/icon.svg`

7. The type safety comes in `./app/library/icon/icons/types.ts`

**Usage**

```
  import Icon from '~/library/icon/icon'

  <Icon name="<ICON_NAME>" />
```

The `name` property hooks into our type file to provide autocomplete

### <ins>Storybook</ins>

Storybook is configured in this project and can be used as a UI tool. Storybook is setup via the three files in the `./.storybook/` directory:

- `./.storybook/main.ts` -- Plugins, add-ons, and aliasing
- `./.storybook/preview.ts` -- Main layout for Storybook
- `./.storybook/vite.config.ts` -- Vite config for Storybook

**Testing files locations**:

- `"../stories/**/*.mdx"`,
- `"../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"`, -`"../app/library/components/**/*.stories.@(js|jsx|mjs|ts|tsx)"`

**Plugins**

- "@storybook/addon-onboarding"
- "@storybook/addon-links"
- "@storybook/addon-essentials"
- "@chromatic-com/storybook"
- "@storybook/addon-interactions"
- "@storybook/addon-actions"

### <ins>`shadcn`</ins>

The project is also configured for `shadcn-ui` use. Simply use the appropriate `npx shadcn-ui@latest add <component_name>`

**Example**

```
$ npx shadcn-ui@latest add button
```

This installs the shadcn-ui component to the `./app/components/ui/` directory and can be imported and used as follows

**Note**: It also installs the `app/utils.ts` file, which includes a Tailwind class merge helper `cn`

```
import {Button} from '~/library/components/ui/button'

{...}

return (
  <Button>Click Me</Button>
)
```

## Development

Run the Vite dev server:

```shellscript
npm run dev
```

## Deployment

The Trap Stack leaves deployment up to the user. When choosing a hosting provider it is best to remember the following
* This stack is built with Vite, so make sure your hosting provider supports it!

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

**Note**: Make sure to edit the `./.github/deploy.yml` file -- especially the `Deploy` section at the bottom -- with your chosen host provider
