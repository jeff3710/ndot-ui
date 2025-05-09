<template>
  <div class="page-content">
    <!-- 传入自定义按钮配置 -->
    <art-table-header :buttons="customButtons" @input="filterTable" />

    <art-table
      :data="filteredTableData"
      selection
      @row-click="handleCellClick"
      :currentPage="1"
      :pageSize="10"
      :total="total"
    >
      <template #default>
        <el-table-column
          v-for="column in columns"
          :key="column.prop"
          :label="column.label"
          :prop="column.prop"
          sortable
        >
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="150px">
          <template #default="">
            <ArtButtonTable type="edit" @click="editSnmp(rowKey)" />
            <ArtButtonTable type="delete" @click="deleteSnmp(rowKey)" />
          </template>
        </el-table-column>
      </template>
    </art-table>
  </div>
</template>

<script setup lang="ts">
  import { filterTableData } from '@/utils/utils'
  import ArtTableHeader from '@/components/core/tables/ArtTableHeader.vue'
  import { rowKey } from 'element-plus/es/components/table-v2/src/common'
  // import { useRouter } from 'vue-router'

  // const dialogType = ref('add')
  // const dialogVisible = ref(false)
  // const searchQuery = ref('')
  const router = useRouter()

  const templateList = [
    {
      templateName: 'esight1',
      parameterType: 'SNMPv3 Auth-Sha256 Priv-Aes256',
      port: '22',
      timeout: '10',
      retryCount: '3',
      pollingInterval: '1800',
      deviceCount: '72'
    },
    {
      templateName: 'esight2',
      parameterType: 'SNMPv3 Auth-Sha256 Priv-Aes256',
      port: '22',
      timeout: '10',
      retryCount: '3',
      pollingInterval: '1800',
      deviceCount: '72'
    },
    {
      templateName: 'esight3',
      parameterType: 'SNMPv3 Auth-Sha256 Priv-Aes256',
      port: '22',
      timeout: '10',
      retryCount: '3',
      pollingInterval: '1800',
      deviceCount: '72'
    },
    {
      templateName: 'esight4',
      parameterType: 'SNMPv3 Auth-Sha256 Priv-Aes256',
      port: '22',
      timeout: '10',
      retryCount: '3',
      pollingInterval: '1800',
      deviceCount: '72'
    },
    {
      templateName: 'esight5',
      parameterType: 'SNMPv3 Auth-Sha256 Priv-Aes256',
      port: '22',
      timeout: '10',
      retryCount: '3',
      pollingInterval: '1800',
      deviceCount: '72'
    },
    {
      templateName: 'esight6',
      parameterType: 'SNMPv3 Auth-Sha256 Priv-Aes256',
      port: '22',
      timeout: '10',
      retryCount: '3',
      pollingInterval: '1800',
      deviceCount: '72'
    },
    {
      templateName: 'esight7',
      parameterType: 'SNMPv3 Auth-Sha256 Priv-Aes256',
      port: '22',
      timeout: '10',
      retryCount: '3',
      pollingInterval: '1800',
      deviceCount: '72'
    },
    {
      templateName: 'esight8',
      parameterType: 'SNMPv3 Auth-Sha256 Priv-Aes256',
      port: '22',
      timeout: '10',
      retryCount: '3',
      pollingInterval: '1800',
      deviceCount: '72'
    },
    {
      templateName: 'esight9',
      parameterType: 'SNMPv3 Auth-Sha256 Priv-Aes256',
      port: '22',
      timeout: '10',
      retryCount: '3',
      pollingInterval: '1800',
      deviceCount: '72'
    },
    {
      templateName: 'esight10',
      parameterType: 'SNMPv3 Auth-Sha256 Priv-Aes256',
      port: '22',
      timeout: '10',
      retryCount: '3',
      pollingInterval: '1800',
      deviceCount: '72'
    },
    {
      templateName: 'esight11',
      parameterType: 'SNMPv3 Auth-Sha256 Priv-Aes256',
      port: '22',
      timeout: '10',
      retryCount: '3',
      pollingInterval: '1800',
      deviceCount: '72'
    },
    {
      templateName: 'esight12',
      parameterType: 'SNMPv3 Auth-Sha256 Priv-Aes256',
      port: '22',
      timeout: '10',
      retryCount: '3',
      pollingInterval: '1800',
      deviceCount: '72'
    }
  ]
  const filteredTableData = ref(templateList)

  const filterTable = (query: string) => {
    filteredTableData.value = filterTableData(templateList, query)
  }

  const columns = [
    {
      label: '模板名称',
      prop: 'templateName',
      sortable: true
    },
    {
      label: '参数类型',
      prop: 'parameterType',
      sortable: true
    },
    {
      label: '端口',
      prop: 'port',
      sortable: true
    },
    {
      label: '超时时间(秒)',
      prop: 'timeout',
      sortable: true
    },
    {
      label: '重试次数',
      prop: 'retryCount',
      sortable: true
    },
    {
      label: '轮询间隔',
      prop: 'pollingInterval',
      sortable: true
    },
    {
      label: '设备数量',
      prop: 'deviceCount',
      sortable: true
    }
  ]

  const total = computed(() => templateList.length)
  console.log(total.value)

  const handleCellClick = (row: any, column: any, event: Event) => {
    console.log('cell clicked', row, column, event)
    if (column.property === 'ip') {
      // 这里假设跳转的路由路径为 /device-detail，并且携带 IP 地址作为参数
      // router.push({ name: 'device-detail', params: { ip: row.ip } });
      console.log('跳转到设备详情', row.ip)
    }
  }

  const editSnmp = (row: any) => {
    console.log('编辑snmp模版', row, rowKey)
  }
  const deleteSnmp = (row: any) => {
    console.log('删除snmp模版', row, rowKey)
  }

  const customButtons = ref([
    {
      label: '新建',
      event: () => {
        router.push('/template/newsnmp')
      }
    },
    {
      label: '删除',
      event: () => {
        console.log('删除snmp模版')
      }
    },
    {
      label: '导出',
      event: () => {
        console.log('导出snmp模版')
      }
    },
    {
      label: '导入',
      event: () => {
        console.log('导入snmp模版')
      }
    }
  ])
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

    .el-col {
      margin-bottom: 20px;
    }
  }
</style>
