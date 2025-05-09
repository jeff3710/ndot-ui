<!-- 表格组件，带分页（默认分页大于一页时显示） -->
<template>
  <div
    class="art-table"
    :class="{ 'header-background': showHeaderBackground }"
    :style="{
      marginTop: marginTop + 'px',
      height: total ? 'calc(100%-90px)' : 'calc(100% - 25px)'
    }"
  >
    <div class="table-container">
      <el-table
        ref="tableRef"
        v-loading="loading"
        :data="tableData"
        :row-key="rowKey"
        :height="height"
        :max-height="maxHeight"
        :show-header="showHeader"
        :highlight-current-row="highlightCurrentRow"
        :size="tableSizeComputed"
        :stripe="stripeComputed"
        :border="borderComputed"
        :show-radio="showRadio"
        :header-cell-style="{
          backgroundColor: showHeaderBackground ? 'var(--el-fill-color-lighter)' : '',
          fontWeight: '500'
        }"
        @selection-change="handleSelectionChange"
        @row-click="handleRowClick"
      >
        <!-- 选择列 -->
        <el-table-column v-if="selection" type="selection" width="55" align="center" fixed="left" />

        <!-- 序号列 -->
        <el-table-column
          v-if="index"
          type="index"
          width="60"
          label="序号"
          align="center"
          fixed="left"
        />

        <el-table-column v-if="showRadio" width="80" label="单选" align="center" fixed="left">
          <!-- 单选框：仅当 showRadio 为 true 时渲染，且通过插槽作用域获取 row -->
          <template #default="{ row }">
            <el-radio v-model="selectedRowId" :label="row.id" @change="handleRadioChange(row)" />
          </template>
        </el-table-column>
        <!-- 动态列 -->
        <slot></slot>
        <!-- 空数据 -->
        <template #empty>
          <el-empty :description="emptyText" v-show="!loading" />
        </template>
      </el-table>
    </div>

    <!-- 分页 -->
    <div
      v-if="pagination && tableData.length > 0"
      class="table-pagination"
      :class="paginationAlign"
    >
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="pageSizes"
        :page-count="isMobile ? 5 : 7"
        :total="total"
        :background="true"
        :size="paginationSize"
        :layout="paginationLayoutComputerd"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :hide-on-single-page="hideOnSinglePage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useTableStore } from '@/store/modules/table'
  const { width } = useWindowSize()
  const isMobile = computed(() => width.value < 500)
  interface TableProps {
    /** 表格数据源 */
    data?: any[]
    /** 是否显示加载状态 */
    loading?: boolean
    /** 行数据的 Key，用于标识每一行数据 */
    rowKey?: string
    /** 是否显示边框 */
    border?: boolean | null
    /** 是否使用斑马纹样式 */
    stripe?: boolean | null
    /** 是否显示多选列 */
    selection?: boolean
    /** 是否显示序号列 */
    index?: boolean
    /** 表格高度，可以是数字或 CSS 值 */
    height?: string | number
    /** 表格最大高度，可以是数字或 CSS 值 */
    maxHeight?: string | number
    /** 是否显示表头 */
    showHeader?: boolean
    /** 是否高亮当前行 */
    highlightCurrentRow?: boolean
    /** 是否显示单选框 */
    showRadio?: boolean
    /** 空数据时显示的文本 */
    emptyText?: string
    /** 是否显示分页 */
    pagination?: boolean
    /** 总条目数 */
    total?: number
    /** 当前页码 */
    currentPage?: number
    /** 每页显示条目个数 */
    pageSize?: number
    /** 每页显示个数选择器的选项列表 */
    pageSizes?: number[]
    /** 只有一页时是否隐藏分页器 */
    hideOnSinglePage?: boolean
    /** 分页器的对齐方式 */
    paginationAlign?: 'left' | 'center' | 'right'
    /** 分页器的大小 */
    paginationSize?: 'small' | 'default' | 'large'
    /** 分页器的布局 */
    paginationLayout?: string
    /** 是否显示表头背景色 */
    showHeaderBackground?: boolean | null
    /** 表格距离顶部的距离 */
    marginTop?: number
    /** 表格的大小 */
    size?: 'small' | 'default' | 'large'
  }

  const props = withDefaults(defineProps<TableProps>(), {
    data: () => [],
    loading: false,
    rowKey: 'id',
    border: null,
    stripe: null,
    selection: false,
    index: false,
    showHeader: true,
    highlightCurrentRow: false,
    showRadio: false,
    selectedRow: () => [],
    emptyText: '暂无数据',
    pagination: true,
    total: 0,
    currentPage: 1,
    pageSize: 10,
    hideOnSinglePage: true,
    pageSizes: () => [10, 20, 30, 50],
    paginationAlign: 'center',
    paginationSize: 'default',
    paginationLayout: '',
    showHeaderBackground: null,
    marginTop: 20
  })

  // 计算分页布局
  const paginationLayoutComputerd = computed(() => {
    if (props.paginationLayout) {
      return props.paginationLayout
    }
    return isMobile.value
      ? 'prev, page, next, jumper, sizes, total'
      : 'total, sizes, prev, page, next,jumper'
  })

  const emit = defineEmits([
    'update:currentPage',
    'update:pageSize',
    'selection-change',
    'row-click',
    'size-change',
    'current-change',
    'update:selectedRow'
  ])
  //单选按钮选中的行数据
  const selectedRowId = ref<string | number>('')

  const selectedRow = computed(() =>
    selectedRowId.value ? props.data.find((row) => row.id === selectedRowId.value) : null
  )

  const tableStore = useTableStore()
  const { tableSize } = storeToRefs(tableStore)

  const tableRef = ref()

  defineExpose({
    expandAll: () => {
      const elTable = tableRef.value
      if (elTable) return

      const processRows = (rows: any[]) => {
        rows.forEach((row) => {
          const hasChildren = row.children?.length > 0
          if (hasChildren) {
            elTable.toggleRowExpansion(row, true)
            processRows(row.children)
          }
        })
      }
      processRows(props.data)
    },
    collapseAll: () => {
      const elTable = tableRef.value
      if (elTable) return

      const processRows = (rows: any[]) => {
        rows.forEach((row) => {
          const hasChildren = row.children?.length > 0
          if (hasChildren) {
            elTable.toggleRowExpansion(row, false)
            processRows(row.children)
          }
        })
      }
      processRows(props.data)
    }
  })

  // 表格大小
  const tableSizeComputed = computed(() => {
    return props.size || tableSize.value
  })
  // 表格斑马纹
  const stripeComputed = computed(() => {
    return props.stripe === null ? tableStore.isZebra : props.stripe
  })
  // 表格边框
  const borderComputed = computed(() => {
    return props.border === null ? tableStore.isBorder : props.border
  })
  // 表格头部背景色
  const showHeaderBackground = computed(() => {
    return props.showHeaderBackground === null
      ? tableStore.isHeaderBackground
      : props.showHeaderBackground
  })

  // 表格数据
  const tableData = computed(() => {
    if (!props.pagination) return props.data
    const start = (props.currentPage - 1) * props.pageSize
    const end = start + props.pageSize
    return props.data.slice(start, end)
  })

  // 当前页
  const currentPage = computed({
    get: () => props.currentPage,
    set: (val) => emit('update:currentPage', val)
  })

  // 每页条数
  const pageSize = computed({
    get: () => props.pageSize,
    set: (val) => emit('update:pageSize', val)
  })

  // 选择项改变
  const handleSelectionChange = (selection: any[]) => {
    emit('selection-change', selection)
  }

  const handleRadioChange = (row: any) => {
    console.log('handleRadioChange', row)
    selectedRowId.value = row.id
    emit('update:selectedRow', row)
  }
  // 行点击事件
  const handleRowClick = (row: any, column: any, event: any) => {
    emit('row-click', row, column, event)
  }

  // 每页条数改变
  const handleSizeChange = (val: number) => {
    emit('size-change', val)
  }

  // 当前页改变
  const handleCurrentChange = (val: number) => {
    emit('current-change', val)
  }
  watch(selectedRow, (newRow) => {
    if (newRow) {
      console.log('选中的行数据:', newRow)
    }
  })
</script>

<style lang="scss" scoped>
  .art-table {
    .table-container {
      height: 100%;
    }

    .table-pagination {
      display: flex;
      margin-top: 16px;

      // 分页对齐方式
      &.left {
        justify-content: flex-start;
      }

      &.center {
        justify-content: center;
      }

      &.right {
        justify-content: flex-end;
      }
    }

    :deep(.el-table) {
      th.el-table__cell {
        font-weight: 600;
      }

      td.el-table__cell,
      th.el-table__cell {
        padding: 16px 0; // 设置表格单元格高度
      }
    }

    &.header-background {
      :deep(.el-table) {
        th.el-table__cell {
          background-color: var(--el-fill-color-light);
        }
      }
    }

    // 解决el-image 和 el-table冲突层级冲突问题
    ::v-deep(.el-table__cell) {
      position: static !important;
    }
  }

  @media (max-width: $device-phone) {
    :deep(.el-pagination) {
      display: flex;
      flex-wrap: wrap;
      gap: 15px 0;
      align-items: center;

      .el-pagination__sizes {
        .el-select {
          width: 100px !important;

          .el-select__wrapper {
            height: 30px !important;
          }
        }
      }

      .el-page {
        li {
          margin-right: 2px;
        }
      }

      .el-pagination__jump {
        margin-left: 5px;

        .el-input {
          height: 32px !important;
        }
      }
    }
  }
</style>
