import { Module } from "vuex"
import { v4 as uuidv4 } from "uuid"
import { GlobalDataProps } from "./index"
import { TextComponentProps } from "@/defaultProps"

export interface ComponentData {
  props: Partial<TextComponentProps>
  id: string
  name: string
}

export interface EditorProps {
  components: ComponentData[]
  currentElement: string
}
export const testComponents: ComponentData[] = [
  {
    id: uuidv4(),
    name: "l-text",
    props: {
      text: "hello",
      fontSize: "20px",
      color: "red",
      fontFamily: "",
      textAlign: "left",
    },
  },
  {
    id: uuidv4(),
    name: "l-text",
    props: {
      text: "hello2",
      fontSize: "10px",
      fontWeight: "bold",
      fontFamily: "",
      textAlign: "center",
    },
  },
  {
    id: uuidv4(),
    name: "l-text",
    props: {
      text: "hello3",
      fontSize: "15px",
      fontFamily: "",
      textAlign: "right",
    },
  },
]

const editor: Module<EditorProps, GlobalDataProps> = {
  state: {
    components: testComponents,
    currentElement: "",
  },
  mutations: {
    addComponent(state, props: Partial<TextComponentProps>) {
      const newComponent: ComponentData = {
        id: uuidv4(),
        name: "l-text",
        props,
      }
      state.components.push(newComponent)
    },
    setActive(state, id: string) {
      state.currentElement = id
    },
  },
  getters: {
    getCurrentElement: (state) => {
      return state.components.find((item) => item.id === state.currentElement)
    },
  },
}

export default editor
