import { Module } from "vuex"
import { GlobalDataProps } from "./index"

export interface TemplateProps {
  id: number
  title: string
  coverImg: string
  author: string
  copiedCount: number
}

export interface TemplatesProps {
  data: TemplateProps[]
}

const testData = [
  {
    id: 1,
    coverImg:
      "https://static.imooc-lego.com/upload-files/screenshot-889755.png",
    title: "前端架构师直播海报",
    author: "前端架构师",
    copiedCount: 100,
  },
  {
    id: 2,
    coverImg:
      "https://static.imooc-lego.com/upload-files/screenshot-677311.png",
    title: "前端架构师直播海报",
    author: "前端架构师",
    copiedCount: 100,
  },

  {
    id: 3,
    coverImg:
      "https://static.imooc-lego.com/upload-files/screenshot-682056.png",
    title: "前端架构师直播海报",
    author: "前端架构师",
    copiedCount: 100,
  },
  {
    id: 4,
    coverImg:
      "https://static.imooc-lego.com/upload-files/screenshot-677311.png",
    title: "前端架构师直播海报",
    author: "前端架构师",
    copiedCount: 100,
  },
  {
    id: 5,
    coverImg:
      "https://static.imooc-lego.com/upload-files/screenshot-889755.png",
    title: "前端架构师直播海报",
    author: "前端架构师",
    copiedCount: 100,
  },
  {
    id: 6,
    coverImg:
      "https://static.imooc-lego.com/upload-files/screenshot-677311.png",
    title: "前端架构师直播海报",
    author: "前端架构师",
    copiedCount: 100,
  },
]

const templates: Module<TemplatesProps, GlobalDataProps> = {
  state: {
    data: testData,
  },
  mutations: {},
  getters: {
    getTemplateById: (state) => (id: number) => {
      return state.data.find((item) => item.id === id)
    },
  },
}

export default templates
