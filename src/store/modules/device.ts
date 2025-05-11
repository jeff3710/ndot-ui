import { TemplateService } from '@/api/templateApi'
import { SnmpTemplateItem, SshTemplateItem, TemplateParams } from '@/types/axios'
import { snakeToCamel } from '@/utils/utils'
import { defineStore } from 'pinia'

export const useDeviceStore = defineStore('device', () => {
  const snmpTemplateList = ref<SnmpTemplateItem[]>([])
  const snmpTemplateCount = ref(0)
  const sshTemplateList = ref<SshTemplateItem[]>([])
  const sshTemplateCount = ref(0)

  const getSnmpTemplateList = async (req: TemplateParams) => {
    try {
      const res = await TemplateService.getSnmpTemplateList(req)
      if (res.code === 0 && res.data) {
        snmpTemplateList.value = snakeToCamel(res.data.list)
        snmpTemplateCount.value = res.data.total
      }
    } catch (error) {
      console.error('获取 SNMP 模板列表失败:', error)
      return Promise.reject(error)
    } finally {
      // 处理完成后的逻辑
      console.log('获取 SNMP 模板列表请求完成')
    }
  }
  const getSshTemplateList = async (req: TemplateParams) => {
    try {
      const res = await TemplateService.getSshTemplateList(req)
      if (res.code === 0 && res.data) {
        sshTemplateList.value = snakeToCamel(res.data.list)
        sshTemplateCount.value = res.data.total
      }
    } catch (error) {
      console.error('获取 SSH 模版列表失败：', error)
      return Promise.reject(error)
    } finally {
      console.log('获取 SSH 模版请求完成')
    }
  }

  return {
    snmpTemplateList,
    snmpTemplateCount,
    sshTemplateCount,
    sshTemplateList,
    getSnmpTemplateList,
    getSshTemplateList
  }
})
