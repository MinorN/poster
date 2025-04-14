import { mapValues, without } from "lodash-es"
export const commonDefaultProps = {
  // actions
  actionType: "",
  url: "",
  // size
  height: "",
  width: "318px",
  paddingLeft: "0px",
  paddingRight: "0px",
  paddingTop: "0px",
  paddingBottom: "0px",
  // border type
  borderStyle: "none",
  borderColor: "#000",
  borderWidth: "0",
  borderRadius: "0",
  // shadow and opacity
  boxShadow: "0 0 0 #000000",
  opacity: 1,
  // position and x,y
  position: "absolute",
  left: "0",
  top: "0",
  right: "0",
}

export type CommonComponentProps = typeof commonDefaultProps

export const textDefaultProps = {
  // basic props - font styles
  text: "正文内容",
  fontSize: "14px",
  fontFamily: "",
  fontWeight: "normal",
  fontStyle: "normal",
  textDecoration: "none",
  lineHeight: "1",
  textAlign: "left",
  color: "#000000",
  backgroundColor: "",
  ...commonDefaultProps,
}

export type TextComponentProps = typeof textDefaultProps & CommonComponentProps

export const transformDefaultProps = (props: TextComponentProps) => {
  return mapValues(props, (item) => {
    return {
      type: item.constructor as StringConstructor,
      default: item,
    }
  })
}

export const textStylePropsNames = without(
  Object.keys(textDefaultProps),
  "actionType",
  "url",
  "text"
)
