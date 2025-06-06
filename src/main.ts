import { createApp } from "vue"
import App from "@/App.vue"
import Antd from "ant-design-vue"
import router from "@/routes/index"
import MPosterCompoent from "m-poster-component"
import "ant-design-vue/dist/antd.css"
import "cropperjs/dist/cropper.css"
import store from "./store"

const app = createApp(App)
app.use(Antd).use(MPosterCompoent).use(router).use(store)
app.mount("#app")
