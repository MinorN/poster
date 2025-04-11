import { createStore } from "vuex"
import templates, { TemplatesProps } from "./templates"
import user, { UserProps } from "./user"
import editor, { EditorProps } from "./editor"

export interface GlobalDataProps {
  user: UserProps
  templates: TemplatesProps
  editor: EditorProps
}

const stroe = createStore({
  modules: {
    user,
    templates,
    editor,
  },
})

export default stroe
