<template>
  <div class="page-content">
    <div class="cards">
      <h1 class="page-title"> 新增设备 </h1>
      <div class="demo-collapse">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item type="extra-large" title="基本信息" name="1">
            <el-card class="basic-info-card">
              <el-form
                :model="formData"
                :rules="rules"
                label-width="auto"
                style="margin-top: 25px"
                max-width="600px"
              >
                <el-form-item label="IP 地址" prop="ip" v-model="form.ip">
                  <el-input v-model="form.ip" placeholder="请输入设备IP地址" size="large" />
                </el-form-item>

                <el-form-item label="名称" prop="name" v-model="form.name">
                  <el-input v-model="form.name" placeholder="请输入设备名称" size="large" />
                </el-form-item>
              </el-form>
            </el-card>
          </el-collapse-item>
          <el-collapse-item title="SNMP 参数" name="2">
            <div class="snmp-info"
              ><el-text class="mx-1">
                请根据设备侧的SNMP协议信息配置参数。协议版本建议使用安全性较高的v3协议。使用SNMPv3时，鉴权协议HMAC-SHA和HMAC-MD5由于协议本身的限制，其安全性不高，建议“数据加密协议”使用安全性更高的AES-128及以上版本。建议认证密码和加密密码不一致。
                由于SNMPv1不安全，本系统不支持配置v1。
              </el-text>
            </div>
            <div>
              <el-tabs
                v-model="activeName"
                type="border-card"
                class="demo-tabs"
                stretch
                @tab-click="handleClick"
              >
                <el-tab-pane label="手动参数" name="first">
                  <el-form label-width="auto" class="snmp-form" style="max-width: 1200px">
                    <el-form-item label="SNMP版本" prop="snmpVersion">
                      <el-select v-model="version" placeholder="选择SNMP协议版本" size="large">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                    <el-form-item label="协议端口" prop="Port">
                      <el-input v-model="formData.username" placeholder="请输入SNMP协议端口" />
                    </el-form-item>
                    <el-form-item label="用户名" prop="username" v-if="!isSnmpV2c">
                      <el-input v-model="formData.username" placeholder="请输入SNMP用户名" />
                    </el-form-item>
                    <el-row>
                      <el-col :span="12"
                        ><el-form-item label="读团体字" prop="readCommunity" v-if="isSnmpV2c">
                          <el-input v-model="formData.username" placeholder="读团体字"
                        /></el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="写团体字" prop="writeCommunity" v-if="isSnmpV2c">
                          <el-input v-model="formData.username" placeholder="写团体字" />
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row v-if="!isSnmpV2c">
                      <el-col :span="12">
                        <el-form-item label="SNMP版本" prop="snmpVersion">
                          <el-select v-model="version" placeholder="选择SNMP协议版本" size="large">
                            <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            />
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="认证密码" prop="authPassword">
                          <el-input v-model="formData.username" placeholder="请输入认证密码" />
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row v-if="!isSnmpV2c">
                      <el-col :span="12">
                        <el-form-item label="SNMP版本" prop="snmpVersion">
                          <el-select v-model="version" placeholder="选择SNMP协议版本" size="large">
                            <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            />
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="认证密码" prop="authPassword">
                          <el-input v-model="formData.username" placeholder="请输入认证密码" />
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-form-item label="超时时间" prop="timeout">
                        <el-input v-model="formData.username" placeholder="请输入超时时间" />
                      </el-form-item>
                    </el-row>
                  </el-form>
                </el-tab-pane>
                <el-tab-pane label="使用模版" name="second">
                  <ArtTable
                    :showRadio="true"
                    :data="snmpList"
                    :currentPage="1"
                    :pageSize="10"
                    :total="snmpList.length"
                    @row-selected="handleRowSelected"
                  >
                    <el-table-column label="名称" prop="name" />
                    <el-table-column label="SNMP版本" prop="version" />
                    <el-table-column label="端口" prop="port" />
                    <el-table-column label="超时时间" prop="timeout" />
                    <el-table-column label="重试次数" prop="retry" />
                    <el-table-column label="用户名" prop="username" />
                  </ArtTable>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-collapse-item>

          <el-collapse-item title="SSH 参数" name="3">
            <div class="snmp-info">
              <el-text class="mx-1">
                （1）请根据设备侧的SSH协议信息配置参数。<br />
                （2）使用SSH协议连接设备需要打开指纹首次连接自动学习开关。<br />
                （3）Telnet协议为不安全协议，开关默认关闭。如需打开，请期待。
              </el-text>
            </div>
            <div>
              <el-tabs
                v-model="activeName1"
                type="border-card"
                class="demo-tabs"
                stretch
                @tab-click="handleClick"
              >
                <el-tab-pane label="手动参数" name="first">
                  <el-form label-width="auto" class="snmp-info" style="max-width: 1200">
                    <el-form-item label="协议类型" prop="managementProtocol">
                      <el-select v-model="protocol" placeholder="选择协议类型" size="large">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                    <el-form-item label="端口" prop="port">
                      <el-input v-model="formData.username" placeholder="请输入端口" />
                    </el-form-item>
                    <el-form-item label="用户名" prop="username">
                      <el-input v-model="formData.username" placeholder="请输入用户名" />
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                      <el-input v-model="formData.password" placeholder="请输入密码" />
                    </el-form-item>
                    <el-form-item label="超时时间" prop="timeout">
                      <el-input v-model="formData.username" placeholder="请输入超时时间" />
                    </el-form-item>
                  </el-form>
                </el-tab-pane>
                <el-tab-pane label="使用模版" name="second">
                  <ArtTable
                    :showRadio="true"
                    :data="snmpList"
                    :currentPage="1"
                    :pageSize="10"
                    :total="snmpList.length"
                    @row-selected="handleRowSelected"
                  >
                    <el-table-column label="名称" prop="name" />
                    <el-table-column label="SNMP版本" prop="version" />
                    <el-table-column label="端口" prop="port" />
                    <el-table-column label="超时时间" prop="timeout" />
                    <el-table-column label="重试次数" prop="retry" />
                    <el-table-column label="用户名" prop="username" />
                  </ArtTable>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div align="center" style="margin-top: 20px">
        <el-button class="cancel">取消</el-button><el-button class="test">测试</el-button
        ><el-button class="submit">确定</el-button></div
      >
    </div></div
  >
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import type { CollapseModelValue, TabsPaneContext, FormRules } from 'element-plus'
  import { useI18n } from 'vue-i18n'
  import ArtTable from '@/components/core/tables/ArtTable.vue'
  const { t } = useI18n()

  const version = ref('')
  const protocol = ref('')

  const isSnmpV2c = computed(() => version.value === 'v2c')
  const options = [
    {
      label: 'SNMPv2c',
      value: 'v2c'
    },
    {
      label: 'SNMPv3',
      value: 'v3'
    }
  ]
  const snmpList = ref([
    {
      id: 1,
      name: 'snmipv3switch',
      version: 'SNMPv3',
      port: 161,
      timeout: 10,
      retry: 5,
      username: 'esight'
    }
  ])

  const selectedRow = ref<any>(null)

  const handleRowSelected = (row: any) => {
    selectedRow.value = row
  }

  const activeName = ref('first')
  const activeName1 = ref('first')
  const formData = reactive({
    username: '',
    password: '',
    rememberPassword: true
  })

  const rules = computed<FormRules>(() => ({
    username: [{ required: true, message: t('login.placeholder[0]'), trigger: 'blur' }],
    password: [{ required: true, message: t('login.placeholder[1]'), trigger: 'blur' }]
  }))

  const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
  }

  const form = reactive({
    ip: '',
    name: ''
  })

  const activeNames = ref(['1'])
  const handleChange = (val: CollapseModelValue) => {
    console.log(val)
  }
</script>

<style lang="scss" scoped>
  .cards {
    padding: 20px 0;

    .page-title {
      margin: 20px 0 15px;
      font-size: 22px;
      font-weight: 500;

      &:first-child {
        margin-top: 0;
      }
    }

    .basic-info-card {
      padding-left: 20px;
    }

    .snmp-form {
      padding-left: 20px;
    }
  }

  /* 深度选择器封装，提高复用性 */
  @mixin deep-selector($selector) {
    :deep(#{$selector}) {
      @content;
    }
  }

  /* 隐藏单选框标签 */
  @include deep-selector('.el-radio__label') {
    display: none;
  }

  /* 居中选项卡导航 */
  @include deep-selector('.el-tabs__nav-wrap') {
    display: flex;
    justify-content: center;
  }

  /* 设置选项卡项样式 */
  @include deep-selector('.el-tabs__item') {
    width: 120px;
    text-align: center;
  }

  /* 统一输入框和选择器宽度 */
  .el-input,
  .el-select {
    --el-input-width: 300px;
    --el-select-width: 300px;
  }

  /* 设置折叠面板头部样式 */
  @include deep-selector('.el-collapse-item__header') {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: 12px 16px;
    font-size: 18px;
  }

  /* 调整折叠面板箭头位置 */
  @include deep-selector('.el-collapse-item__arrow') {
    order: -1;
    margin-left: 8px;
  }

  /* 给每个折叠项添加底部边框作为间隔 */
  .el-collapse-item:not(:last-child) {
    border-bottom: 1px solid #e4e7ed;
  }

  .snmp-info {
    margin-left: 30px;
  }
</style>
