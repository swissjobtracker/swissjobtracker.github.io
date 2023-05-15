import { boot } from "quasar/wrappers";
import Plausible from "plausible-tracker";

const VuePlausible = {
  install(app, options) {
    const plausible = Plausible(options);

    if (options?.enableAutoPageviews === true) {
      plausible.enableAutoPageviews();
    }
    if (options?.enableAutoOutboundTracking === true) {
      plausible.enableAutoOutboundTracking();
    }

    app.config.globalProperties.$plausible = plausible;
  },
};

export default boot(({ app }) => {
  app.use(VuePlausible, {
    domain: "swissjobtracker.ch",
    hashMode: true,
    trackLocalhost: false,
    enableAutoPageviews: true,
    enableAutoOutboundTracking: false,
  });
});
