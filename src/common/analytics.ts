// import { Analytics, Event, PageHit } from "expo-analytics";
import { config } from "@/config";
import { ExpoMixpanelAnalytics } from "@/common/expo-mixpanel-analytics";

class MyAnalytics {
  // ga?: Analytics & { parameters: { uid: string } };

  mixpanel?: ExpoMixpanelAnalytics;

  constructor() {
    if (config.analytics.googleTid) {
      // @ts-ignore
      // this.ga = new Analytics(config.analytics.googleTid, undefined, {
      //   debug: __DEV__,
      // });
    }

    if (config.analytics.mixpanelProjectToken) {
      this.mixpanel = new ExpoMixpanelAnalytics(
        config.analytics.mixpanelProjectToken,
      );
    }
  }

  identify(id: string): void {
    if (this.mixpanel) {
      this.mixpanel.identify(id);
    }
    // if (this.ga && this.ga.parameters) {
    //   this.ga.parameters.uid = id;
    // }
  }

  async track(
    name: string,
    props: Record<string, string | number | boolean>,
  ): Promise<void> {
    if (__DEV__) {
      return;
    }

    if (this.mixpanel) {
      this.mixpanel.track(name, props);
    }

    // if (!this.ga) {
    //   return;
    // }

    // if (name.startsWith("page_view_")) {
    //   await this.ga.hit(new PageHit(name));
    // } else if (name.startsWith("tap_")) {
    //   await this.ga.event(new Event("tap", name, props.id));
    // } else {
    //   await this.ga.event(new Event(name, name));
    // }
  }

  peopleDeleteUser(): void {
    // if (this.mixpanel) {
    //   this.mixpanel.people_delete_user();
    // }
  }
}

const analytics = new MyAnalytics();

export { analytics };
