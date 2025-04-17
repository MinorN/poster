<template>
  <div class="file-upload">
    <button @click="triggerUpload">
      <span v-if="fileStatus === 'loading'">正在上传</span>
      <span v-else-if="fileStatus === 'success'">上传成功</span>
      <span v-else-if="fileStatus === 'error'">上传失败</span>
      <span v-else>点击上传</span>
    </button>
    <input
      type="file"
      ref="fileInput"
      :style="{ display: 'none' }"
      @change="handleFileChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import axios from "axios"

type UploadStaus = "ready" | "loading" | "success" | "error"

export default defineComponent({
  props: {
    // 请求地址
    action: {
      type: String,
      required: true,
    },
  },
  setup(props, context) {
    const fileInput = ref<null | HTMLInputElement>(null)
    const fileStatus = ref<UploadStaus>("ready")

    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click()
      }
    }

    const handleFileChange = (e: Event) => {
      const target = e.target as HTMLInputElement
      const files = target.files
      if (files) {
        const uploadedFile = files[0]
        const formData = new FormData()
        formData.append(uploadedFile.name, uploadedFile)
        fileStatus.value = "loading"
        axios
          .post(props.action, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res: any) => {
            console.log(res.data)
            fileStatus.value = "success"
          })
          .catch((err: any) => {
            fileStatus.value = "error"
          })
      }
    }

    return {
      fileInput,
      triggerUpload,
      fileStatus,
      handleFileChange,
    }
  },
})
</script>

<style></style>
