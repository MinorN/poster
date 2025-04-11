import { createStore } from "vuex"
import user, { UserProps } from "./user"
import templates, { TemplatesProps } from "./templates"

export interface GlobalDataProps {
  user: UserProps
  templates: TemplatesProps
}

const stroe = createStore({
  modules: {
    user,
    templates,
  },
})

export default stroe
