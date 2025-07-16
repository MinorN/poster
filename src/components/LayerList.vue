<template>
  <draggable
    :list="list"
    class="ant-list-elements ant-list-bordered"
    gost-class="ghost"
    handle=".handle"
  >
    <template #item="{ element }">
      <li
        class="ant-list-element"
        :class="{
          active: element.id === selectedId,
        }"
        @click="handleClick(element.id)"
      >
        <a-tooltip :title="element.isHidden ? '显示' : '隐藏'">
          <a-button
            shape="circle"
            @click.stop="
              handleChange(element.id, 'isHidden', !element.isHidden)
            "
          >
            <template v-slot:icon v-if="element.isHidden"
              ><EyeOutlined />
            </template>
            <template v-slot:icon v-else><EyeInvisibleOutlined /> </template>
          </a-button>
        </a-tooltip>
        <a-tooltip :title="element.isLocked ? '解锁' : '锁定'">
          <a-button
            shape="circle"
            @click.stop="
              handleChange(element.id, 'isLocked', !element.isLocked)
            "
          >
            <template v-slot:icon v-if="element.isLocked">
              <UnlockOutlined />
            </template>
            <template v-slot:icon v-else><LockOutlined /> </template>
          </a-button>
        </a-tooltip>
        <InlineEdit
          class="edit-area"
          :value="element.layerName"
          @change="
          (v:string) => {
            handleChange(element.id, 'layerName', v)
          }
        "
        ></InlineEdit>
        <a-tooltip title="拖动排序">
          <a-button shape="circle" class="handle">
            <template #icon>
              <DragOutlined />
            </template>
          </a-button>
        </a-tooltip>
      </li>
    </template>
  </draggable>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue"
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  UnlockOutlined,
  DragOutlined,
} from "@ant-design/icons-vue"
import { ComponentData } from "../store/editor"
import InlineEdit from "./InlineEdit.vue"
import draggable from "vuedraggable"
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
  emits: ["select", "change", "drop"],
  components: {
    EyeOutlined,
    EyeInvisibleOutlined,
    LockOutlined,
    UnlockOutlined,
    DragOutlined,
    InlineEdit,
    draggable,
  },
  setup(props, context) {
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
    }
  },
})
</script>

<style scoped>
.ant-list-element {
  padding: 10px 15px;
  transition: all 0.5s ease-out;
  cursor: pointer;
  justify-content: normal;
  border: 1px solid #fff;
  border-bottom-color: #f0f0f0;
  display: flex;
  align-items: center;
}
.ant-list-element.active {
  border: 1px solid #1890ff;
}
.ant-list-element:hover {
  background: #e6f7ff;
}
.ant-list-element > * {
  margin-right: 10px;
}
.ant-list-element button {
  font-size: 12px;
}
.ghost {
  opacity: 0.5;
}
.edit-area {
  width: 100%;
}
.handle {
  margin-left: auto;
  cursor: move;
}
</style>
