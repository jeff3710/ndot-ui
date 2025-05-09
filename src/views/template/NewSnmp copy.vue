<template>
  <div class="page-content">
    <el-row :gutter="20" class="table-header">
      <el-col :span="18">
        <el-input placeholder="请输入搜索内容" v-model="searchQuery" @input="filterTable" />
      </el-col>
      <el-col :span="6">
        <el-button-group>
          <el-button type="primary" plain @click="add">添加</el-button>
          <el-button type="primary" plain @click="add">导入</el-button>
          <el-button type="primary" plain @click="add">导出</el-button>
          <ArtButtonTable type="more" plain @click="add">同步</ArtButtonTable>
        </el-button-group>
      </el-col>
    </el-row>
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
  // import { useRouter } from 'vue-router'

  // const dialogType = ref('add')
  // const dialogVisible = ref(false)
  const searchQuery = ref('')
  // const router = useRouter()

  const templateList = [
    {
      templateName: 'esight',
      parameterType: 'SNMPv3 Auth-Sha256 Priv-Aes256',
      port: '22',
      timeout: '10',
      retryCount: '3',
      pollingInterval: '1800',
      deviceCount: '72'
    }
  ]
  const filteredTableData = ref(templateList)

  const filterTable = () => {
    filteredTableData.value = filterTableData(templateList, searchQuery.value)
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

  const handleCellClick = (row: any, column: any, event: Event) => {
    console.log('cell clicked', row, column, event)
    if (column.property === 'ip') {
      // 这里假设跳转的路由路径为 /device-detail，并且携带 IP 地址作为参数
      // router.push({ name: 'device-detail', params: { ip: row.ip } });
      console.log('跳转到设备详情', row.ip)
    }
  }

  const add = () => {
    console.log('添加设备')
    // router.push('/device/newdevice')
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
