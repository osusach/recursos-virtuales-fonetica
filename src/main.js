import "./index.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import posthog from "posthog-js";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
	api_host: "https://us.posthog.com",
});

const vuetify = createVuetify({
	components,
	directives,
});

const app = createApp(App);

app.use(vuetify);
app.use(router);
app.mount("#app");
