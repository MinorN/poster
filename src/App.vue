<template>
  <div class="app-container">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
  name: "App",
  components: {},
})
</script>

<style scoped>
.app-container {
  height: 100%;
  width: 100%;
}
</style>
