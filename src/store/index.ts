import { createStore } from "vuex"
import user, { UserProps } from "./user"
import template, { TemplatesProps } from "./template"

export interface GlobalDataProps {
  user: UserProps
  template: TemplatesProps
}

const stroe = createStore({
  modules: {
    user,
    template,
  },
})

export default stroe
