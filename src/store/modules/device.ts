import { defineStore } from 'pinia'

export const useDeviceStore = defineStore('deviceStore', () => {
  const snmpTemplate = reactive({})
  const snmpTemplateList = reactive([])

  return {
    snmpTemplate,
    snmpTemplateList
  }
})
