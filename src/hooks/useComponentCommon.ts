import { computed } from "vue"
import { pick } from "lodash-es"
import { TextComponentProps, ImageComponentProps } from "@/defaultProps"

const useComponentCommon = (
  props: Readonly<Partial<TextComponentProps & ImageComponentProps>>,
  picks: string[]
) => {
  const styleProps = computed(() => pick(props, picks))
  const handleClick = () => {
    if (props.actionType === "url" && props.url) {
      window.location.href = props.url
    }
  }
  return {
    styleProps,
    handleClick,
  }
}

export default useComponentCommon
