<template>
  <ul
    :list="list"
    class="ant-list-items ant-list-bordered"
    @drop="onDrop"
    @dragover="onDragOver"
  >
    <li
      class="ant-list-item"
      :class="{
        active: item.id === selectedId,
        ghost: item.id === dragData.currentDragging,
      }"
      v-for="(item, index) in list"
      :key="item.id"
      @click="handleClick(item.id)"
      draggable="true"
      @dragstart="onDragStart($event, item.id, index)"
      :data-index="index"
    >
      <a-tooltip :title="item.isHidden ? '显示' : '隐藏'">
        <a-button
          shape="circle"
          @click.stop="handleChange(item.id, 'isHidden', !item.isHidden)"
        >
          <template v-slot:icon v-if="item.isHidden"><EyeOutlined /> </template>
          <template v-slot:icon v-else><EyeInvisibleOutlined /> </template>
        </a-button>
      </a-tooltip>
      <a-tooltip :title="item.isLocked ? '解锁' : '锁定'">
        <a-button
          shape="circle"
          @click.stop="handleChange(item.id, 'isLocked', !item.isLocked)"
        >
          <template v-slot:icon v-if="item.isLocked">
            <UnlockOutlined />
          </template>
          <template v-slot:icon v-else><LockOutlined /> </template>
        </a-button>
      </a-tooltip>
      <InlineEdit
        :value="item.layerName"
        @change="
          (v:string) => {
            handleChange(item.id, 'layerName', v)
          }
        "
      ></InlineEdit>
    </li>
  </ul>
</template>
<script lang="ts">
import { defineComponent, PropType, reactive } from "vue"
import { arrayMoveMutable } from "array-move"
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  UnlockOutlined,
} from "@ant-design/icons-vue"
import { getParentElement } from "@/helper"
import { ComponentData } from "../store/editor"
import InlineEdit from "./InlineEdit.vue"
export default defineComponent({
  props: {
    list: {
      type: Array as PropType<ComponentData[]>,
      required: true,
    },
    selectedId: {
      type: [String, null],
      required: true,
    },
  },
  emits: ["select", "change"],
  components: {
    EyeOutlined,
    EyeInvisibleOutlined,
    LockOutlined,
    UnlockOutlined,
    InlineEdit,
  },
  setup(props, context) {
    const dragData = reactive({
      currentDragging: "",
      currentIndex: -1,
    })
    const onDragStart = (e: DragEvent, id: string, index: number) => {
      dragData.currentDragging = id
      dragData.currentIndex = index
    }
    const onDrop = (e: DragEvent) => {
      const currentEle = getParentElement(
        e.target as HTMLElement,
        "ant-list-item"
      )
      if (currentEle && currentEle.dataset.index) {
        const moveIndex = parseInt(currentEle.dataset.index)
        arrayMoveMutable(props.list, dragData.currentIndex, moveIndex)
      }

      dragData.currentDragging = ""
    }
    const onDragOver = (e: DragEvent) => {
      e.preventDefault()
    }

    const handleClick = (id: string) => {
      context.emit("select", id)
    }
    const handleChange = (id: string, key: string, value: boolean | string) => {
      const data = {
        id,
        key,
        value,
        isRoot: true,
      }
      context.emit("change", data)
    }
    return {
      handleChange,
      handleClick,
      onDragStart,
      dragData,
      onDrop,
      onDragOver,
    }
  },
})
</script>

<style scoped>
.ant-list-item {
  padding: 10px 15px;
  transition: all 0.5s ease-out;
  cursor: pointer;
  justify-content: normal;
  border: 1px solid #fff;
  border-bottom-color: #f0f0f0;
}
.ant-list-item.active {
  border: 1px solid #1890ff;
}
.ant-list-item:hover {
  background: #e6f7ff;
}
.ant-list-item > * {
  margin-right: 10px;
}
.ant-list-item button {
  font-size: 12px;
}
.ghost {
  opacity: 0.5;
}
</style>
