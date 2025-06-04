import { Module } from "vuex"
import { v4 as uuidv4 } from "uuid"
import { GlobalDataProps } from "./index"
import {
  TextComponentProps,
  ImageComponentProps,
  textDefaultProps,
} from "m-poster-component"

export interface ComponentData {
  props: Partial<TextComponentProps & ImageComponentProps>
  id: string
  name: "l-text" | "l-image" | "l-shape"
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
      color: "#000000",
      lineHeight: "1",
      textAlign: "left",
      fontFamily: "",
    },
  },
  {
    id: uuidv4(),
    name: "l-text",
    props: {
      text: "hello2",
      fontSize: "10px",
      fontWeight: "bold",
      lineHeight: "2",
      textAlign: "left",
      fontFamily: "",
    },
  },
  {
    id: uuidv4(),
    name: "l-text",
    props: {
      text: "hello3",
      fontSize: "15px",
      actionType: "url",
      lineHeight: "3",
      textAlign: "left",
      fontFamily: "",
    },
  },
  // { id: uuidv4(), name: 'l-image', props: { src: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e3a17c305b1070f455202.jpg', width: '100px' }},
]

const editor: Module<EditorProps, GlobalDataProps> = {
  state: {
    components: testComponents,
    currentElement: "",
  },
  mutations: {
    addComponent(state, component: ComponentData) {
      state.components.push(component)
    },
    setActive(state, id: string) {
      state.currentElement = id
    },
    updateComponent(state, { key, value }) {
      const component = state.components.find(
        (item) => item.id === state.currentElement
      )
      if (component) {
        component.props[key as keyof TextComponentProps] = value
      }
    },
  },
  getters: {
    getCurrentElement: (state) => {
      return state.components.find((item) => item.id === state.currentElement)
    },
  },
}

export default editor
