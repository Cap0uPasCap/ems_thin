export default {
  // 设备参数
  parameter: {
    title: '参数列表',
    column: {
      action: '操作',
      location: '连接模块',
      parameterName: '参数名',
      lastNodeName: '参数节点名',
      parameterTreeName: '参数树名',
      type: '类型',
      writable: '是否可写', // 1 可写 0 只读
      readOnly: '只读',
      writeable: '可写',
      parameterValue: '参数值',
    },
    action: {
      selectTip: '请至少选择一项操作',
      queryParameterBtn: '查询参数值',
      batch: '批量提交',
      // addText: '新增',
      // editBtnTip: '编辑用户资料',
      // delBtnTip: '删除此账号',
      // delBtnConfirm: '是否确认删除?',
      // editUserBtnTip: '修改密码',
      // resetBtnTip: '重置密码',
      // resetBtnConfirm: '是否重置密码',
      // updatePassWordTip: '不能为空',
      // updatePassWordTitle: '修改密码',
      // okText: '确认',
      // cancelText: '取消',
    },
    msg: {
      success: '成功',
    },
  },
  command: {
    title: '指令',
    tab: {
      factoryReset: '恢复出厂设置',
      reboot: '重启',
    },
    loadingTip: '请求中...',
  },
  fileUpgrade: {
    title: '文件升级',
    uploadBtnText: '点击上传',
    downloadBtnText: '点击下载',
    rebootBtnText: '重启',
    rebootTip: '是否执行重启指令',
    leaveRebootTip: '离开页面前是否执行当前页面重启指令',
    okText: '是',
    cancelText: '否',
    uploadFailedTip: '文件名不一致, 请重新上传对应文件名文件',
  },
};
