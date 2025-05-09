<template>
  <div class="page-content">
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
            <ArtButtonTable type="edit" @click="deleteUser" />
            <ArtButtonTable type="delete" @click="deleteUser" />
          </template>
        </el-table-column>
      </template>
    </art-table>
  </div>
</template>

<script setup lang="ts">
  import { ElMessageBox, ElMessage } from 'element-plus'
  import { filterTableData } from '@/utils/utils'
  import { useRouter } from 'vue-router'

  // const dialogType = ref('add')
  // const dialogVisible = ref(false)
  const router = useRouter()

  const templateList = [
    {
      templateName: 'esight',
      protocolType: 'STelnet',
      port: '22',
      timeout: '10',
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

  const total = computed(() => templateList.length)

  const handleCellClick = (row: any, column: any, event: Event) => {
    console.log('cell clicked', row, column, event)
    if (column.property === 'ip') {
      // 这里假设跳转的路由路径为 /device-detail，并且携带 IP 地址作为参数
      // router.push({ name: 'device-detail', params: { ip: row.ip } });
      console.log('跳转到设备详情', row.ip)
    }
  }

  const deleteUser = () => {
    ElMessageBox.confirm('确定要注销该用户吗？', '注销用户', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'error'
    }).then(() => {
      ElMessage.success('注销成功')
    })
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
