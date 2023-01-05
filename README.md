# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).

## Backlog
#### Infrastructure
- Connect database [HIGH PRIORITY]
- Implement users and authentication

#### Features BE
- <del>Save map editing results</del>
- Save map coordinates (add anchor lock)
- Move encounter card draw logic to BE
- Implement tags for encounters
- Implement levels for encounters and level boundaries for adventure cells
- BIG FEATURE: create a room that is shared between players with websockets (decompose this)
#### Features FE
- <del>Implement readonly map viewer</del>
- <del>Implement encounter card draw [FE]</del>
- Support names for maps
- Improve selection between maps UI
- Player dashboard
- Responsiveness
