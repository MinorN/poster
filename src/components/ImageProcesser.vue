<template>
  <div class="image-processer">
    <a-modal
      title="裁剪图片"
      v-model:visible="showModal"
      @ok="handleOk"
      @cancel="showModal = false"
      okText="确认"
      cancelText="取消"
    >
      <div class="image-cropper">
        <img :src="baseImageUrl" id="processed-image" ref="cropperImg" />
      </div>
    </a-modal>
    <div
      class="image-preview"
      :style="{ backgroundImage: backgrondUrl }"
      :class="{ extraHeight: showDelete }"
    ></div>
    <div class="image-process">
      <style-uploader @success="handleFileUploaded"></style-uploader>
      <a-button @click="showModal = true">
        <template v-slot:icon><ScissorOutlined /></template>裁剪图片
      </a-button>
      <a-button v-if="showDelete" type="danger" @click="handleDelete">
        <template v-slot:icon><DeleteOutlined /></template>删除图片
      </a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch, nextTick } from "vue"
import { message } from "ant-design-vue"
import Cropper from "cropperjs"
import { DeleteOutlined, ScissorOutlined } from "@ant-design/icons-vue"
import StyleUploader from "./StyleUploader.vue"
import { UploadResp } from "../extraType"

interface CropDataProps {
  x: number
  y: number
  width: number
  height: number
}

export default defineComponent({
  props: {
    value: {
      type: String,
      required: true,
    },
    ratio: {
      type: Number,
    },
    showDelete: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    DeleteOutlined,
    StyleUploader,
    ScissorOutlined,
  },
  emits: ["change", "uploaded"],
  setup(props, context) {
    const showModal = ref(false)
    const backgrondUrl = computed(() => `url(${props.value})`)
    const baseImageUrl = computed(() => {
      return props.value.split("?")[0] // 去掉查询参数
    })

    const cropperImg = ref<null | HTMLImageElement>(null)
    let cropper: Cropper
    let cropData: CropDataProps | null = null
    watch(showModal, async (newValue) => {
      if (newValue) {
        await nextTick()
        if (cropperImg.value) {
          cropper = new Cropper(cropperImg.value, {
            crop(event) {
              const { x, y, width, height } = event.detail
              cropData = {
                x: Math.floor(x),
                y: Math.floor(y),
                width: Math.floor(width),
                height: Math.floor(height),
              }
            },
          })
        }
      } else {
        if (cropper) {
          cropper.destroy()
        }
      }
    })
    const handleFileUploaded = (data: { resp: UploadResp; file: File }) => {
      const { resp } = data
      message.success("上传成功")
      context.emit("change", resp.data.url)
      context.emit("uploaded", data)
    }
    const handleDelete = () => {
      context.emit("change", "")
    }

    const handleOk = () => {
      if (cropData) {
        const { x, y, width, height } = cropData
        const cropperURL =
          baseImageUrl.value + `?imageMogr2/cut/${width}x${height}x${x}x${y}`
        // cropper.getCroppedCanvas().toBlob((blob) => {
        //   if (blob) {
        //     const formData = new FormData()
        //     formData.append("croppedImage", blob, "croppedImage.png")
        //     // 这里可以添加上传逻辑，将formData发送到服务器
        //   }
        // })
        context.emit("change", cropperURL)
      }
      showModal.value = false
    }
    return {
      handleFileUploaded,
      handleDelete,
      backgrondUrl,
      showModal,
      cropperImg,
      handleOk,
      baseImageUrl,
    }
  },
})
</script>

<style scoped>
.image-processer {
  display: flex;
  justify-content: space-between;
}
.image-preview {
  width: 150px;
  height: 84px;
  border: 1px dashed #e6ebed;
  background: no-repeat 50% / contain;
}
.image-preview.extraHeight {
  height: 110px;
}
.image-process {
  padding: 5px 0;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.image-cropper img {
  display: block;
  /* This rule is very important, please don't ignore this */
  max-width: 100%;
}
</style>
