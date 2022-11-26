import { App as AppType, Component, createApp } from "vue";
import "./style.scss";
import App from "./App.vue";
import { router } from "./router";
import ModalVue from "@/components/ui/UModal.vue";

const withUIComponents = (app: AppType): AppType =>
  Object.entries(import.meta.glob("./components/ui/*")).reduce<AppType>(
    (app, [path, componentImport]) =>
      app.component(getName(path), componentImport),
    app
  );

const getName = (path: string) => path.split("/")[path.split("/").length - 1];

withUIComponents(createApp(App).use(router)).mount("#app");
