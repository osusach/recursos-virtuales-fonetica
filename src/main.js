import "./index.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// Vercel analytics
import { inject } from '@vercel/analytics';

inject();

const vuetify = createVuetify({
	components,
	directives,
});

const app = createApp(App);

app.use(vuetify);
app.use(router);
app.mount("#app");
