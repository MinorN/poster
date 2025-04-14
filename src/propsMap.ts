import { TextComponentProps } from "@/defaultProps"
export interface PropToForm {
  component: string
  subComponent?: string
  options?: {
    text: string
    value: any
  }[]
  value?: string
  extraProps?: {
    [key: string]: any
  }
  text?: string
  initalTransform?: (v: any) => any
  valueProp?: string
}

export type PropsToForms = {
  [P in keyof TextComponentProps]?: PropToForm
}

export const mapPorpsToForms: PropsToForms = {
  text: {
    text: "文本",
    component: "a-textarea",
    extraProps: {
      rows: 3,
    },
  },
  fontSize: {
    text: "字号",
    component: "a-input-number",
    initalTransform: (v: string) => parseInt(v),
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
  },
  fontFamily: {
    text: "字体",
    component: "a-select",
    subComponent: "a-select-option",
    options: [
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
    ],
  },
}
