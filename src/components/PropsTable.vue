<template>
  <div class="props-table">
    <div v-for="(value, key) in finalProps" :key="key" class="prop-item">
      <component v-if="value" :is="value.component" :value="value.value" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue"
import { reduce } from "lodash-es"
import { PropToForm, PropsToForms, mapPorpsToForms } from "@/propsMap"
import { TextComponentProps } from "@/defaultProps"

export default defineComponent({
  name: "props-table",
  props: {
    props: {
      type: Object as PropType<Partial<TextComponentProps>>,
      required: true,
    },
  },
  setup(props) {
    const finalProps = computed(() => {
      return reduce(
        props.props,
        (result, value, key) => {
          const newKey = key as keyof TextComponentProps
          const item = mapPorpsToForms[newKey]
          if (item) {
            item.value = value
            result[newKey] = item
          }
          return result
        },
        {} as PropsToForms
      )
    })
    return {
      finalProps,
    }
  },
})
</script>

<style scoped></style>
