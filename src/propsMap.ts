import { TextComponentProps } from "@/defaultProps"
export interface PropToForm {
  component: string
  value?: string
}

export type PropsToForms = {
  [P in keyof TextComponentProps]?: PropToForm
}

export const mapPorpsToForms: PropsToForms = {
  text: {
    component: "a-input",
  },
}
