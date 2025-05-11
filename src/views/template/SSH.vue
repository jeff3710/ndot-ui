<template>
  <div class="page-content">
    <art-table-header :buttons="customButtons" @input="filterTable" />
    <art-table
      :loading="loading"
      :data="filteredTableData"
      @row-click="handleCellClick"
      :currentPage="params.pageNo"
      :pageSize="params.pageSize"
      :total="sshTemplateCount"
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
            <ArtButtonTable type="edit" @click="deleteSsh(row)" />
            <ArtButtonTable type="delete" @click="deleteSsh(row)" />
          </template>
        </el-table-column>
      </template>
    </art-table>
  </div>
</template>

<script setup lang="ts">
  import { ElMessageBox, ElMessage } from 'element-plus'
  import { filterTableData } from '@/utils/utils'
  import { useDeviceStore } from '@/store/modules/device'

  const loading = ref(false)
  const deviceStore = useDeviceStore()
  const { sshTemplateCount, sshTemplateList } = storeToRefs(deviceStore)
  const params = ref({
    pageNo: 1,
    pageSize: 10,
    conditions: ''
  })
  const router = useRouter()

  const columns = [
    {
      label: '模板名称',
      prop: 'templateName',
      sortable: true
    },
    {
      label: '协议类型',
      prop: 'protocolType',
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
      label: '设备数量',
      prop: 'deviceCount',
      sortable: true
    }
  ]
  const templateList = computed(() => {
    return sshTemplateList.value.map((item) => ({
      templateName: item.templateName,
      protocolType: item.protocolType,
      port: item.port,
      timeout: item.timeout,
      deviceCount: item.deviceCount
    }))
  })
  const fetchData = async () => {
    loading.value = true
    try {
      await deviceStore.getSshTemplateList(params.value)
    } catch (error) {
      console.error('Error fetching SSH template list:', error)
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

  const handleCellClick = (row: any, column: any, event: Event) => {
    console.log('cell clicked', row, column, event)
    if (column.property === 'ip') {
      // 这里假设跳转的路由路径为 /device-detail，并且携带 IP 地址作为参数
      // router.push({ name: 'device-detail', params: { ip: row.ip } });
      console.log('跳转到设备详情', row.ip)
    }
  }

  const deleteSsh = (row: any) => {
    ElMessageBox.confirm(`确定要注销${row.templateName}吗？`, '注销用户', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'error'
    }).then(() => {
      ElMessage.success('注销成功')
    })
  }
  const handleSizeChange = (size: number) => {
    params.value.pageSize = size
    fetchData()
  }
  const handleCurrentChange = (page: number) => {
    params.value.pageNo = page
    fetchData()
  }

  const customButtons = ref([
    {
      label: '新建',
      event: () => {
        router.push('/template/newssh')
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
