<template>
  <div class="file-upload">
    <div class="upload-area" @click="triggerUpload">
      <slot v-if="isUploading" name="loading">
        <button disabled>正在上传</button>
      </slot>
      <slot
        name="uploaded"
        v-else-if="lastFileData && lastFileData.loaded"
        :uploadedData="lastFileData.data"
      >
        <button>点击上传</button>
      </slot>
      <slot v-else name="default">
        <button>点击上传</button>
      </slot>
    </div>
    <input
      type="file"
      ref="fileInput"
      :style="{ display: 'none' }"
      @change="handleFileChange"
    />
    <ul :class="`upload-list`">
      <li
        v-for="file in uploadedFiles"
        :key="file.uid"
        :class="`uploader-file upload-${file.status}`"
      >
        <span v-if="file.status === 'loading'" class="file-icon">
          <LoadingOutlined />
        </span>
        <span v-else class="file-icon"><FileOutlined /></span>
        <span class="filename">{{ file.name }}</span>
        <span class="delete-icon" @click="removeFile(file.uid)">
          <DeleteOutlined />
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, reactive, ref } from "vue"
import { last } from "lodash-es"
import axios from "axios"
import { v4 as uuidv4 } from "uuid"
import {
  DeleteOutlined,
  LoadingOutlined,
  FileOutlined,
} from "@ant-design/icons-vue"

type UploadStaus = "ready" | "loading" | "success" | "error"

export interface UploadFile {
  uid: string
  size: number
  name: string
  status: UploadStaus
  raw: File
  resp?: any
}
type CheckUpload = (file: File) => boolean | Promise<File>

export default defineComponent({
  components: {
    DeleteOutlined,
    LoadingOutlined,
    FileOutlined,
  },
  props: {
    // 请求地址
    action: {
      type: String,
      required: true,
    },
    beforeUpload: {
      type: Function as PropType<CheckUpload>,
    },
  },
  setup(props, context) {
    const fileInput = ref<null | HTMLInputElement>(null)
    const fileStatus = ref<UploadStaus>("ready")
    const uploadedFiles = ref<UploadFile[]>([])

    const isUploading = computed(() => {
      return uploadedFiles.value.some((file) => file.status === "loading")
    })

    const lastFileData = computed(() => {
      const lastFile = last(uploadedFiles.value)
      if (lastFile) {
        return {
          loaded: lastFile.status === "success",
          data: lastFile.resp,
        }
      }
      return false
    })

    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click()
      }
    }

    const removeFile = (id: string) => {
      uploadedFiles.value = uploadedFiles.value.filter(
        (file) => file.uid !== id
      )
    }

    const postFile = (file: File) => {
      const formData = new FormData()
      formData.append(file.name, file)
      const fileObj = reactive<UploadFile>({
        uid: uuidv4(),
        size: file.size,
        name: file.name,
        status: "loading",
        raw: file,
      })
      uploadedFiles.value.push(fileObj)
      fileStatus.value = "loading"
      axios
        .post(props.action, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res: any) => {
          fileObj.status = "success"
          fileObj.resp = res.data
          fileStatus.value = "success"
        })
        .catch((err: any) => {
          fileObj.status = "error"
          fileStatus.value = "error"
        })
        .finally(() => {
          if (fileInput.value) {
            fileInput.value.value = ""
          }
        })
    }

    const handleFileChange = (e: Event) => {
      const target = e.target as HTMLInputElement
      const files = target.files
      if (files) {
        const uploadedFile = files[0]
        if (props.beforeUpload) {
          const result = props.beforeUpload(uploadedFile)
          if (result && result instanceof Promise) {
            result
              .then((processedFile) => {
                if (processedFile instanceof File) {
                  postFile(processedFile)
                } else {
                  throw new Error("beforeUpload Promise must return a File")
                }
              })
              .catch((e) => {
                console.error(e)
              })
          } else if (result === true) {
            postFile(uploadedFile)
          } else {
            console.error("beforeUpload must return a Promise or true")
          }
        } else {
          postFile(uploadedFile)
        }
      }
    }

    return {
      fileInput,
      triggerUpload,
      fileStatus,
      handleFileChange,
      uploadedFiles,
      isUploading,
      removeFile,
      lastFileData,
    }
  },
})
</script>

<style scoped>
.upload-list {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
.upload-list li {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  font-size: 14px;
  line-height: 1.8;
  margin-top: 5px;
  box-sizing: border-box;
  border-radius: 4px;
  min-width: 200px;
  position: relative;
  &:first-child {
    margin-top: 10px;
  }
  .upload-list-thumbnail {
    vertical-align: middle;
    display: inline-block;
    width: 70px;
    height: 70px;
    position: relative;
    z-index: 1;
    background-color: #fff;
    object-fit: cover;
  }
  .file-icon {
    svg {
      margin-right: 5px;
      color: rgba(0, 0, 0, 0.45);
    }
  }
  .filename {
    margin-left: 5px;
    margin-right: 40px;
  }
  &.upload-error {
    color: #f5222d;
    svg {
      color: #f5222d;
    }
  }
  .file-status {
    display: block;
    position: absolute;
    right: 5px;
    top: 0;
    line-height: inherit;
  }
  .delete-icon {
    display: none;
    position: absolute;
    right: 7px;
    top: 0;
    line-height: inherit;
    cursor: pointer;
  }
  &:hover {
    background-color: #efefef;
    .file-status {
      display: none;
    }
    .delete-icon {
      display: block;
    }
  }
}
</style>
