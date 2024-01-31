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

// public api anyway
posthog.init("phc_oAdnbupVjpGsZr1qA2aPjB0YB148V7aqu7DTrtjhbpg", {
	api_host: "https://us.posthog.com",
	autocapture: false,
});

const vuetify = createVuetify({
	components,
	directives,
});

const app = createApp(App);

app.use(vuetify);
app.use(router);
app.mount("#app");
