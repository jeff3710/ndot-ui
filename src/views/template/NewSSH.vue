<template>
  <div class="page-content">
    <div class="cards">
      <h1 class="page-title">创建Telnet协议模板</h1>
      <el-form :model="formData" label-width="120px">
        <el-row :gutter="20" max-width="800px">
          <el-col :xs="24" :sm="12" :md="12">
            <el-form-item label="* 模板名称" prop="templateName">
              <el-input v-model="formData.templateName" />
            </el-form-item>
            <el-form-item label="* 网元端口" prop="port">
              <el-input v-model="formData.port" />
            </el-form-item>
            <el-form-item label="* 用户名" prop="username">
              <el-input v-model="formData.username" />
            </el-form-item>
            <el-form-item label="密钥" prop="key">
              <el-input v-model="formData.key" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12">
            <el-form-item label="协议类型" prop="protocolType">
              <el-select v-model="formData.protocolType" placeholder="选择协议类型">
                <el-option label="STelnet" value="STelnet" />
              </el-select>
            </el-form-item>
            <el-form-item label="授权模式" prop="authorizationMode">
              <el-select v-model="formData.authorizationMode" placeholder="选择授权模式">
                <el-option label="密码" value="password" />
              </el-select>
            </el-form-item>
            <el-form-item label="* 密码" prop="password">
              <el-input v-model="formData.password" type="password" />
            </el-form-item>
            <el-form-item label="* 超时时长(秒)" prop="timeout">
              <el-input v-model="formData.timeout" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item style="text-align: right">
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确认</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const formData = ref({
    templateName: '',
    port: '22',
    username: '',
    key: '',
    protocolType: 'STelnet',
    authorizationMode: 'password',
    password: '',
    timeout: '10'
  })

  const handleSubmit = () => {
    console.log('提交的表单数据:', formData.value)
  }

  const handleCancel = () => {
    formData.value = {
      templateName: '',
      port: '22',
      username: '',
      key: '',
      protocolType: 'STelnet',
      authorizationMode: 'password',
      password: '',
      timeout: '10'
    }
  }
</script>

<style scoped>
  .cards {
    max-width: 800px;
    padding: 20px 0;
  }

  .page-title {
    margin: 20px 0 15px;
    font-size: 22px;
    font-weight: 500;
  }

  .el-form-item {
    margin-bottom: 10px;
  }

  :deep(.el-form-item__label) {
    text-align: left;
  }
</style>
