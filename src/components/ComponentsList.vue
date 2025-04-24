<template>
  <div class="create-component-list">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="component-item"
      @click="onItemClick(item)"
    >
      <l-text v-bind="item"></l-text>
    </div>
  </div>
  <StyledUploader @success="onImageUploaded"></StyledUploader>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import LText from "@/components/LText.vue"
import StyledUploader from "./StyleUploader.vue"
import { v4 as uuidv4 } from "uuid"
import { ComponentData } from "@/store/editor"
import {
  TextComponentProps,
  imageDefaultProps,
  textDefaultProps,
} from "@/defaultProps"
import { message } from "ant-design-vue"
import { UploadResp } from "@/extraType"
export default defineComponent({
  name: "components-list",
  props: {
    list: {
      type: Array as PropType<TextComponentProps[]>,
      required: true,
    },
  },
  emits: ["on-item-click"],
  components: { LText, StyledUploader },
  setup(props, context) {
    const onItemClick = (props: TextComponentProps) => {
      const componentData: ComponentData = {
        name: "l-text",
        id: uuidv4(),
        props: {
          ...textDefaultProps,
          ...props,
        },
      }
      context.emit("on-item-click", componentData)
    }
    const onImageUploaded = (resp: UploadResp) => {
      const componentData: ComponentData = {
        name: "l-image",
        id: uuidv4(),
        props: {
          ...imageDefaultProps,
        },
      }
      message.success("上传成功")
      componentData.props.src = resp.data.url
      context.emit("on-item-click", componentData)
    }
    return {
      onItemClick,
      onImageUploaded,
    }
  },
})
</script>

<style scoped>
.component-item {
  width: 100px;
  margin: 0 auto;
  margin-bottom: 15px;
}
</style>
