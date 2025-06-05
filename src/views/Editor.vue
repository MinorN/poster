<template>
  <div class="editor-container">
    <a-layout>
      <a-layout-sider width="300" style="background: #fff">
        <div class="sidebar-container">
          组件列表
          <components-list
            :list="defaultTextTemplates"
            @onItemClick="addItem"
          />
        </div>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-layout-content class="preview-container">
          <p>画布区域</p>
          <div class="preview-list" id="canvas-area">
            <edit-wrapper
              v-for="component in components"
              :key="component.id"
              :id="component.id"
              :active="currentElement?.id === component.id"
              @setActive="setActive"
              v-show="!component.isHidden"
            >
              <component :is="component.name" v-bind="component.props" />
            </edit-wrapper>
          </div>
        </a-layout-content>
      </a-layout>
      <a-layout-sider
        width="300"
        style="background: #fff"
        class="settings-panel"
      >
        <a-tabs type="card" v-model:activeKey="activePanel">
          <a-tab-pane key="component" tab="属性设置" class="no-top-radius">
            <div v-if="currentElement">
              <props-table
                v-if="!currentElement.isLocked"
                :props="currentElement.props"
                @change="handleChange"
              ></props-table>
              <div v-else>
                <a-empty>
                  <template #description>
                    <p>该元素已被锁定，无法编辑</p>
                  </template>
                </a-empty>
              </div>
            </div>
          </a-tab-pane>
          <a-tab-pane key="layer" tab="图层设置">
            <LayerList
              :list="components"
              :selectedId="currentElement && currentElement.id"
              @change="handleChange"
              @select="setActive"
            ></LayerList>
          </a-tab-pane>
        </a-tabs>
      </a-layout-sider>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue"
import { useStore } from "vuex"
import { GlobalDataProps } from "@/store"
import ComponentsList from "@/components/ComponentsList.vue"
import { defaultTextTemplates } from "@/defaultTemplates"
import EditWrapper from "@/components/EditWrapper.vue"
import { ComponentData } from "@/store/editor"
import PropsTable from "../components/PropsTable.vue"
import LayerList from "@/components/LayerList.vue"

export type TabType = "component" | "layer" | "page"

export default defineComponent({
  components: {
    ComponentsList,
    EditWrapper,
    PropsTable,
    LayerList,
  },
  setup() {
    const store = useStore<GlobalDataProps>()
    const components = computed(() => store.state.editor.components)
    // 当前tab
    const activePanel = ref<TabType>("component")

    const addItem = (component: any) => {
      store.commit("addComponent", component)
    }
    const setActive = (id: string) => {
      store.commit("setActive", id)
    }

    const currentElement = computed<ComponentData | null>(
      () => store.getters.getCurrentElement
    )

    const handleChange = (e: any) => {
      store.commit("updateComponent", e)
    }
    return {
      components,
      defaultTextTemplates,
      currentElement,
      addItem,
      setActive,
      handleChange,
      activePanel,
    }
  },
})
</script>

<style scoped>
.editor-container .preview-container {
  padding: 24px;
  margin: 0;
  min-height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.editor-container .preview-list {
  padding: 0;
  margin: 0;
  min-width: 375px;
  min-height: 200px;
  border: 1px solid #efefef;
  background: #fff;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  margin-top: 50px;
  max-height: 80vh;
}
</style>
