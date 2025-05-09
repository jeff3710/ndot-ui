<template>
  <div class="table-header">
    <el-row :gutter="20" class="table-header-row">
      <el-col :span="18">
        <el-input
          placeholder="请输入搜索内容"
          v-model="searchQuery"
          @input="handleInput"
          class="input-box"
        />
      </el-col>
      <el-col :span="6" class="button-group-col">
        <el-button-group class="button-group">
          <!-- 循环渲染按钮，支持自定义数量和事件 -->
          <el-button
            v-for="(button, index) in props.buttons"
            :key="index"
            type="primary"
            plain
            @click="button.event"
          >
            {{ button.label }}
          </el-button>
        </el-button-group>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
  import { ref, defineProps } from 'vue'

  // 定义 props 接收按钮配置数组
  const props = defineProps<{
    buttons: {
      label: string // 按钮显示文本
      event: () => void // 按钮点击事件
    }[]
  }>()

  const searchQuery = ref('')
  const emits = defineEmits<{
    (e: 'input', query: string): void
  }>()

  const handleInput = () => {
    emits('input', searchQuery.value)
  }
</script>

<style lang="scss" scoped>
  .table-header-row {
    display: flex;
    align-items: flex-end;
    padding: 0 30px;
  }

  .input-box {
    height: 40px;
    line-height: 40px;
  }

  .button-group-col {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
  }

  .button-group {
    display: flex;
  }

  .button-item {
    min-width: 60px;
    height: 40px;
    line-height: 40px;
  }
</style>
