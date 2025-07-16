import { Module } from "vuex"
import { v4 as uuidv4 } from "uuid"
import { GlobalDataProps } from "./index"
import {
  TextComponentProps,
  ImageComponentProps,
  textDefaultProps,
  imageDefaultProps,
  AllComponentProps,
} from "m-poster-component"

export interface ComponentData {
  props: Partial<AllComponentProps>
  id: string
  name: "l-text" | "l-image" | "l-shape"
  isHidden?: boolean // 图层是否隐藏
  isLocked?: boolean // 图层是否锁定
  layerName?: string // 图层名称
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
      ...textDefaultProps,
      text: "hello",
      fontSize: "20px",
      color: "#000000",
      lineHeight: "1",
      textAlign: "left",
      fontFamily: "",
      position: "relative",
    },
    layerName: "图层1",
  },
  {
    id: uuidv4(),
    name: "l-text",
    props: {
      ...textDefaultProps,
      text: "hello2",
      fontSize: "10px",
      fontWeight: "bold",
      lineHeight: "2",
      textAlign: "left",
      fontFamily: "",
      position: "relative",
    },
    layerName: "图层2",
  },
  {
    id: uuidv4(),
    name: "l-text",
    props: {
      ...textDefaultProps,
      text: "hello3",
      fontSize: "15px",
      actionType: "url",
      lineHeight: "3",
      textAlign: "left",
      fontFamily: "",
      position: "relative",
    },
    layerName: "图层3",
  },
  {
    id: uuidv4(),
    name: "l-image",
    layerName: "图层4",
    props: {
      ...imageDefaultProps,
      src: "http://asset.minorn.cn/3i5.jpg",
      width: "100px",
      position: "relative",
    },
  },
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
    updateComponent(state, { key, value, id, isRoot }) {
      const component = state.components.find(
        (item) => item.id === (id || state.currentElement)
      )
      if (component) {
        if (isRoot) {
          // 修改的是根属性
          component[key as keyof ComponentData] = value as never
        } else {
          component.props[key as keyof TextComponentProps] = value
        }
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
