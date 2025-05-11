<template>
  <div class="page-content">
    <div class="cards">
      <h1 class="page-title">创建SNMP协议模板</h1>
      <el-form :model="formData" label-width="120px">
        <el-row :gutter="20" max-width="800px">
          <el-col :xs="24" :sm="12" :md="12">
            <el-form-item label="模板名称" prop="templateName">
              <el-input v-model="formData.name" />
            </el-form-item>
            <el-form-item label="SNMP协议版本" prop="snmpVersion">
              <el-select v-model="formData.version" placeholder="选择协议版本">
                <el-option label="SNMPv2c" value="v2c" />
                <el-option label="SNMPv3" value="v3" />
              </el-select>
            </el-form-item>
            <el-form-item label="写团体字" prop="writeCommunity" v-if="formData.version === 'v2c'">
              <el-input v-model="formData.writeCommunity" />
            </el-form-item>
            <el-form-item label="授权认证协议" prop="authProtocol" v-if="formData.version === 'v3'">
              <el-select v-model="formData.authProtocol" placeholder="选择协议">
                <el-option
                  v-for="protocol in authProtocols"
                  :key="protocol.value"
                  :label="protocol.label"
                  :value="protocol.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="数据加密协议" prop="privProtocol" v-if="formData.version === 'v3'">
              <el-select v-model="formData.privProtocol" placeholder="选择协议">
                <el-option
                  v-for="protocol in privProtocols"
                  :key="protocol.value"
                  :label="protocol.label"
                  :value="protocol.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="用户名" prop="username" v-if="formData.version === 'v3'">
              <el-input v-model="formData.v3User" />
            </el-form-item>
            <el-form-item label="引擎ID" prop="engineID" v-if="formData.version === 'v3'">
              <el-input v-model="formData.engineId" />
            </el-form-item>
            <el-form-item label="轮询时间" prop="pollInterval">
              <el-input v-model="formData.pollInterval" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12">
            <el-form-item label="网元端口" prop="port">
              <el-input v-model="formData.port" />
            </el-form-item>
            <el-form-item label="读团体字" prop="readCommunity" v-if="formData.version === 'v2c'">
              <el-input v-model="formData.readCommunity" />
            </el-form-item>
            <el-form-item label="Trap团体字" prop="trapCommunity" v-if="formData.version === 'v2c'">
              <el-input v-model="formData.trapCommunity" />
            </el-form-item>
            <el-form-item label="安全等级" prop="securityLevel" v-if="formData.version === 'v3'">
              <el-select v-model="formData.securityLevel" placeholder="选择安全等级">
                <el-option
                  v-for="level in securityLevels"
                  :key="level.value"
                  :label="level.label"
                  :value="level.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="授权认证密码" prop="authPassword" v-if="formData.version === 'v3'">
              <el-input v-model="formData.authPassword" type="password" />
            </el-form-item>
            <el-form-item label="数据加密密码" prop="privPassword" v-if="formData.version === 'v3'">
              <el-input v-model="formData.privPassword" type="password" />
            </el-form-item>
            <el-form-item label="上下文" prop="context" v-if="formData.version === 'v3'">
              <el-input v-model="formData.context" />
            </el-form-item>
            <el-form-item label="超时时间(秒)" prop="timeout">
              <el-input v-model="formData.timeout" />
            </el-form-item>
            <el-form-item label="重试次数" prop="retryCount">
              <el-input v-model="formData.retries" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">确定</el-button>
          <el-button @click="handleCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { TemplateService } from '@/api/templateApi'
  import { ref } from 'vue'

  // 定义 SNMP v3 加密协议选项
  const privProtocols = ref([
    { label: 'DES', value: 'DES' },
    { label: '3DES', value: '3DES' },
    { label: 'AES-128', value: 'AES128' },
    { label: 'AES-192', value: 'AES192' },
    { label: 'AES-256', value: 'AES256' }
  ])

  // 定义 SNMP v3 认证协议选项
  const authProtocols = ref([
    { label: 'MD5', value: 'MD5' },
    { label: 'SHA', value: 'SHA' },
    { label: 'SHA2-224', value: 'SHA2-224' },
    { label: 'SHA2-256', value: 'SHA2-256' },
    { label: 'SHA2-384', value: 'SHA2-384' },
    { label: 'SHA2-512', value: 'SHA2-512' }
  ])

  // 定义 SNMP 安全等级选项
  const securityLevels = ref([
    { label: '无认证无加密', value: 'NoAuthNoPriv' },
    { label: '认证无加密', value: 'AuthNoPriv' },
    { label: '认证与加密', value: 'AuthPriv' }
  ])

  const formData = ref({
    name: '',
    protocol: 'SNMP',
    version: 'v2c',
    port: 161,
    timeout: 10,
    pollInterval: 1800,
    retries: 5,
    // SNMPv2c特有字段
    readCommunity: '',
    writeCommunity: '',
    trapCommunity: '',
    // SNMPv3特有字段
    v3User: '',
    engineId: '',
    securityLevel: 'AuthPriv',
    authProtocol: 'SHA2-256',
    privProtocol: 'AES-256',
    authPassword: '',
    privPassword: '',
    context: ''
  })

  const handleSubmit = () => {
    // 这里可以添加提交表单数据的逻辑，比如发送API请求
    console.log('提交的表单数据:', formData.value)
    TemplateService.createSnmpTemplate(formData.value)
  }

  const handleCancel = () => {
    // 这里可以添加取消操作的逻辑，比如重置表单
    formData.value = {
      name: '',
      protocol: 'SNMP',
      version: 'v2c',
      port: 161,
      readCommunity: '',
      writeCommunity: '',
      trapCommunity: '',
      timeout: 10,
      pollInterval: 1800,
      retries: 5,
      securityLevel: 'AuthPriv',
      authProtocol: 'SHA2-512',
      privProtocol: 'AES-128',
      v3User: '',
      authPassword: '',
      privPassword: '',
      context: '',
      engineId: ''
    }
  }
</script>

<style scoped>
  .cards {
    max-width: 1000px;
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
