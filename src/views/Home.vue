<template>
  <div class="homepage-container">
    <template-list :list="testData"></template-list>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex"
import { computed, defineComponent } from "vue"
import { GlobalDataProps } from "@/store/index"
import TemplateList from "../components/TemplateList.vue"

export default defineComponent({
  components: {
    TemplateList,
  },
  setup() {
    const store = useStore<GlobalDataProps>()
    const testData = computed(() => {
      return store.state.templates.data
    })
    return {
      testData,
    }
  },
})
</script>

<style scoped>
.homepage-container {
  background: #fff;
  padding: 0 24px 24px 30px;
  min-height: 85vh;
  max-width: 1200px;
  margin: 50px auto;
  width: 100%;
}
</style>
