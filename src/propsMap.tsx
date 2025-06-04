import { VNode } from "vue"
import { AllComponentProps } from "m-poster-component"
export interface PropToForm {
  component: string
  subComponent?: string
  options?: {
    text: string | VNode
    value: any
  }[]
  extraProps?: {
    [key: string]: any
  }
  text?: string
  initalTransform?: (v: any) => any
  afterTransform?: (v: any) => any
  valueProp?: string
  eventName?: string
}

export type PropsToForms = {
  [P in keyof AllComponentProps]?: PropToForm
}

const fontFamilyArr = [
  {
    text: "默认",
    value: "",
  },
  {
    text: "微软雅黑",
    value: "Microsoft YaHei",
  },
  {
    text: "宋体",
    value: "SimSun",
  },
  {
    text: "Arial",
    value: "Arial",
  },
]
const fontFamilyOptions = fontFamilyArr.map((font) => {
  return {
    value: font.value,
    text: (
      <span style={{ fontFamily: font.value }}>{font.text}</span>
    ) as VNode,
  }
})

export const mapPropsToForms: PropsToForms = {
  text: {
    text: "文本",
    component: "a-textarea",
    extraProps: {
      rows: 3,
    },
    afterTransform: (e: any) => e.target.value,
  },
  fontSize: {
    text: "字号",
    component: "a-input-number",
    initalTransform: (v: string) => parseInt(v),
    afterTransform: (e: any) => (e ? `${e}px` : ""),
  },
  lineHeight: {
    text: "行高",
    component: "a-slider",
    extraProps: {
      min: 0,
      max: 3,
      step: 0.1,
    },
    initalTransform: (v: string) => parseFloat(v),
    afterTransform: (e: any) => e.toString(),
  },
  textAlign: {
    text: "对齐方式",
    component: "a-radio-group",
    subComponent: "a-radio-button",
    options: [
      {
        text: "左",
        value: "left",
      },
      {
        text: "中",
        value: "center",
      },
      {
        text: "右",
        value: "right",
      },
    ],
    afterTransform: (e: any) => e.target.value,
  },
  fontFamily: {
    text: "字体",
    component: "a-select",
    subComponent: "a-select-option",
    options: fontFamilyOptions,
  },
  color: {
    text: "字体颜色",
    component: "color-picker",
  },
  fontWeight: {
    text: "加粗",
    component: "icon-switch",
    valueProp: "checked",
    initalTransform: (v: string) => v === "bold",
    afterTransform: (e: boolean) => (e ? "bold" : "normal"),
    extraProps: { iconName: "BoldOutlined", tip: "加粗" },
  },
  fontStyle: {
    text: "斜体",
    component: "icon-switch",
    valueProp: "checked",
    initalTransform: (v: string) => v === "italic",
    afterTransform: (e: boolean) => (e ? "italic" : "normal"),
    extraProps: { iconName: "ItalicOutlined", tip: "斜体" },
  },
  textDecoration: {
    text: "下划线",
    component: "icon-switch",
    valueProp: "checked",
    initalTransform: (v: string) => v === "underline",
    afterTransform: (e: boolean) => (e ? "underline" : "none"),
    extraProps: { iconName: "UnderlineOutlined", tip: "下划线" },
  },
  src: {
    component: "image-processer",
  },
  width: {
    text: "宽度",
    component: "a-input-number",
    initalTransform: (v: string) => parseInt(v),
    afterTransform: (e: any) => (e ? `${e}px` : ""),
  },
}
