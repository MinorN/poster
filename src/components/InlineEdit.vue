<template>
  <div class="inline-edit" @click.stop="handleClick" ref="wrapper">
    <input
      v-model="innerValue"
      v-if="isEditing"
      placeholder="输入内容不能为空"
      ref="inputRef"
    />
    <slot v-else>
      <span>{{ innerValue }}</span>
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, ref, watch } from "vue"
import useKeyPress from "@/hooks/useKeyPress"
import useClickOutside from "@/hooks/useClickOutside"

export default defineComponent({
  name: "inline-edit",
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  emits: ["change"],
  setup(props, context) {
    const innerValue = ref(props.value)
    const wrapper = ref<null | HTMLDivElement>(null)
    const inputRef = ref<null | HTMLInputElement>(null)
    const isOutside = useClickOutside(wrapper)

    let cachedOldValue = ""
    const isEditing = ref(false)
    const handleClick = () => {
      isEditing.value = true
    }
    watch(isEditing, async (isEditing) => {
      if (isEditing) {
        cachedOldValue = innerValue.value
        await nextTick()
        if (inputRef.value) {
          inputRef.value.focus()
        }
      } else {
        innerValue.value = cachedOldValue
      }
    })

    watch(isOutside, (newVal) => {
      if (newVal && isEditing.value) {
        isEditing.value = false
        context.emit("change", innerValue.value)
      }
      isOutside.value = false
    })

    watch(
      () => props.value,
      (newVal) => {
        if (newVal !== innerValue.value) {
          innerValue.value = newVal
        }
      }
    )

    useKeyPress("Enter", () => {
      if (isEditing.value) {
        isEditing.value = false
        // 强制更新
        context.emit("change", innerValue.value)
      }
    })
    useKeyPress("Escape", () => {
      if (isEditing.value) {
        isEditing.value = false
        innerValue.value = cachedOldValue
      }
    })

    return {
      wrapper,
      inputRef,
      innerValue,
      isEditing,
      handleClick,
    }
  },
})
</script>
