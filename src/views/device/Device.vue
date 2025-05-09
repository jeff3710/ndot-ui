<template>
  <div class="page-content">
    <div class="cards">
      <h1 class="page-title">网络设备</h1>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="12" :md="8" v-for="card in statsCards" :key="card.id">
          <ArtStatsCard
            :icon="card.icon"
            :title="card.title"
            :description="card.description"
            :iconSize="card.iconSize"
            iconColor="#000"
            :showArrow="card.showArrow"
          />
        </el-col>
      </el-row>
    </div>

    <div class="table-header">
      <el-row :gutter="20" class="table-header-row">
        <el-col :span="18">
          <el-input
            placeholder="请输入搜索内容"
            v-model="searchQuery"
            @input="filterTable"
            class="input-box"
          />
        </el-col>
        <el-col :span="6" class="button-group-col">
          <el-button-group class="button-group">
            <el-button type="primary" plain @click="add" class="button-item">添加</el-button>
            <el-button type="primary" plain @click="add" class="button-item">导入</el-button>
            <el-button type="primary" plain @click="add" class="button-item">导出</el-button>
            <el-button type="primary" plain @click="add" class="button-item">同步</el-button>
          </el-button-group>
        </el-col>
      </el-row>
    </div>
    <art-table
      :data="filteredTableData"
      selection
      @row-click="handleCellClick"
      :currentPage="1"
      :pageSize="10"
      :total="50"
    >
      <template #default>
        <el-table-column label="状态" prop="status">
          <template #default="scope">
            <el-tag :type="getTagType(scope.row.status)">
              {{ buildTagText(scope.row.status) }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="name" sortable> </el-table-column>
        <el-table-column label="IP地址" prop="ip" sortable />

        <el-table-column label="设备类型" prop="deviceType" sortable />
        <el-table-column label="设备分类" prop="category" sortable></el-table-column>
        <el-table-column label="软件版本" prop="version" sortable></el-table-column>
        <el-table-column label="厂商" prop="vendor" sortable></el-table-column>
        <el-table-column fixed="right" label="操作" width="150px">
          <template #default="scope">
            <ArtButtonTable type="edit" @click="showDialog('edit', scope.row)" />
            <ArtButtonTable type="delete" @click="deleteUser" />
          </template>
        </el-table-column>
      </template>
    </art-table>

    <el-dialog
      v-model="dialogVisible"
      :title="dialogType === 'add' ? '添加用户' : '编辑用户'"
      width="30%"
    >
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password" />
        </el-form-item>
        <el-form-item label="确认密码" prop="repassword">
          <el-input v-model="formData.repassword" />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="formData.role">
            <el-option label="超级管理员" :value="1" />
            <el-option label="系统管理员" :value="2" />
            <el-option label="审计管理员" :value="3" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
  import { DEVICE_TABLE_DATA } from '@/mock/temp/formData'
  import { FormInstance } from 'element-plus'
  import { ElMessageBox, ElMessage } from 'element-plus'
  import type { FormRules } from 'element-plus'
  import { filterTableData } from '@/utils/utils'
  import { useRouter } from 'vue-router'

  const tableData = DEVICE_TABLE_DATA
  const dialogType = ref('add')
  const dialogVisible = ref(false)
  const searchQuery = ref('')
  const filteredTableData = ref(tableData)
  const router = useRouter()

  const filterTable = () => {
    filteredTableData.value = filterTableData(tableData, searchQuery.value)
  }

  const statsCards = [
    {
      id: 1,
      title: '状态',
      count: 1235,
      description: '正常',
      icon: '&#xe7c6;',
      iconColor: 'rgb(var(--art-info))',
      iconSize: 30,
      iconBgColor: 'rgb(var(--art-info))',
      textColor: 'rgb(var(--art-primary))',
      backgroundColor: 'rgb(var(--art-bg-primary))',
      showArrow: false
    },
    {
      id: 2,
      title: '设备分类',
      count: 1235,
      description: '正常',
      icon: '&#xe7c6;',
      iconColor: 'rgb(var(--art-info))',
      iconSize: 30,
      iconBgColor: 'rgb(var(--art-info))',
      textColor: 'rgb(var(--art-primary))',
      backgroundColor: 'rgb(var(--art-bg-primary))',
      showArrow: false
    }
  ]

  const formData = reactive({
    username: '',
    password: '',
    repassword: '',
    role: ''
  })

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
    router.push('/device/newdevice')
  }

  const showDialog = (type: string, row?: any) => {
    dialogVisible.value = true
    dialogType.value = type

    if (type === 'edit' && row) {
      formData.username = row.username
      formData.role = row.role
    } else {
      formData.username = ''
      formData.role = ''
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

  const getTagType = (status: string) => {
    switch (status) {
      case '1':
        return 'success'
      case '2':
        return 'danger'
      case '3':
        return 'warning'
      case '4':
        return 'info'
      default:
        return 'info'
    }
  }

  const buildTagText = (status: string) => {
    let text = ''
    if (status === '1') {
      text = '在线'
    } else if (status === '2') {
      text = '离线'
    }
    return text
  }

  const rules = reactive<FormRules>({
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
    ],
    repassword: [
      { required: true, message: '请输入确认密码', trigger: 'blur' },
      { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
    ],
    role: [{ required: true, message: '请选择角色', trigger: 'change' }]
  })

  const formRef = ref<FormInstance>()

  const handleSubmit = async () => {
    if (!formRef.value) return

    await formRef.value.validate((valid) => {
      if (valid) {
        ElMessage.success(dialogType.value === 'add' ? '添加成功' : '更新成功')
        console.log('formData', formData)
        dialogVisible.value = false
      }
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

  .table-header-row {
    display: flex;
    align-items: flex-end; /* 实现底部对齐 */
    padding: 0 30px;
  }

  .input-box {
    height: 40px; /* 统一高度 */
    line-height: 40px; /* 输入框内容垂直居中 */
  }

  .button-group-col {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end; /* 按钮组靠右对齐 */
  }

  .button-group {
    display: flex; /* 确保按钮横向排列 */
  }

  .button-item {
    min-width: 60px; /* 避免按钮过窄 */
    height: 40px; /* 统一高度 */
    line-height: 40px; /* 按钮文字垂直居中 */
  }
</style>
