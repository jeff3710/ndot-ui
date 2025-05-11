<template>
  <div class="page-content">
    <art-table-header :buttons="customButtons" @input="filterTable" />
    <art-table
      :loading="loading"
      :data="filteredTableData"
      @row-click="handleCellClick"
      :currentPage="params.pageNo"
      :pageSize="params.pageSize"
      :total="snmpTemplateCount"
      :margin-top="10"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
      <template #default>
        <el-table-column
          v-for="column in columns"
          :key="column.prop"
          :label="column.label"
          :prop="column.prop"
          sortable
        />
        <el-table-column fixed="right" label="操作" width="150px">
          <template #default="{ row }">
            <ArtButtonTable type="edit" @click="editSnmp(row)" />
            <ArtButtonTable type="delete" @click="deleteSnmp(row)" />
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
  import { useDeviceStore } from '@/store/modules/device'
  import { storeToRefs } from 'pinia'
  // import { useRouter } from 'vue-router'

  // const searchQuery = ref('')
  const loading = ref(false)
  const deviceStore = useDeviceStore()
  const { snmpTemplateCount, snmpTemplateList } = storeToRefs(deviceStore)
  const params = ref({
    pageNo: 1,
    pageSize: 10,
    conditons: ''
  })
  const router = useRouter()

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
  // 转换数据格式
  const templateList = computed(() => {
    return snmpTemplateList.value.map((item) => ({
      templateName: item.name,
      parameterType: `${item.version} ${item.authProtocol} ${item.privProtocol}`,
      port: item.port,
      timeout: item.timeout,
      retryCount: item.retries,
      pollingInterval: item.pollInterval,
      deviceCount: item.deviceCount
    }))
  })
  console.log('snmpTemplateList', snmpTemplateList.value[0])
  console.log('templateList', templateList.value)

  const fetchData = async () => {
    loading.value = true
    try {
      await deviceStore.getSnmpTemplateList(params.value)
    } catch (error) {
      console.log('获取SNMP模板列表失败', error)
      ElMessage.error('获取SNMP模板列表失败')
    } finally {
      loading.value = false
    }
  }
  const searchQuery = ref('')
  const filteredTableData = computed(() => {
    return filterTableData(templateList.value, searchQuery.value)
  })
  const filterTable = (query: string) => {
    searchQuery.value = query
  }
  // const filteredTableData = ref(templateList)
  // const filterTable = (query: string) => {
  //   filteredTableData.value = filterTableData(templateList, query)
  // }

  const handleCellClick = (row: any, column: any, event: Event) => {
    console.log('cell clicked', row, column, event)
    if (column.property === 'ip') {
      // 这里假设跳转的路由路径为 /device-detail，并且携带 IP 地址作为参数
      // router.push({ name: 'device-detail', params: { ip: row.ip } });
      console.log('跳转到设备详情', row.ip)
    }
  }

  const editSnmp = (row: any) => {
    // router.push({ name: 'edit-snmp', params: { id: row.id } })
    console.log('编辑snmp模版', row, rowKey)
  }
  const deleteSnmp = (row: any) => {
    ElMessageBox.confirm(`确定删除${row.templateName} 吗？`, '确认删除', { type: 'warning' }).then(
      async () => {
        try {
          // 调用删除接口
          fetchData()
          ElMessage.success('删除成功')
        } catch (error) {
          console.log('删除snmp模版失败', error)
          ElMessage.error('删除失败')
        }
      }
    )
  }

  const handleSizeChange = (newSize: number) => {
    params.value.pageSize = newSize
    fetchData()
  }
  const handleCurrentChange = (newPage: number) => {
    params.value.pageNo = newPage
    fetchData()
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
  onMounted(fetchData)
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
