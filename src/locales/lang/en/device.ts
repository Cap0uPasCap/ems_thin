export default {
  // 设备参数
  parameter: {
    title: 'parameter List',
    column: {
      action: 'Action',
      location: 'Location',
      parameterName: 'ParameterName',
      lastNodeName: 'LastNodeName',
      parameterTreeName: 'ParameterTreeName',
      type: 'Type',
      writable: 'Writable', // 1 可写 0 只读
      readOnly: 'ReadOnly',
      writeable: 'Writeable',
      parameterValue: 'ParameterValue',
    },
    addText: 'Add User',
    action: {
      selectTip: 'Select at least one item',
      queryParameterBtn: 'Get Parameter Value',
      batch: 'Batch Submit',
      editBtnTip: 'Edit User',
      delBtnTip: 'Delete User',
      delBtnConfirm: 'Confirm deletion?',
      editUserBtnTip: 'Edit Password',
      resetBtnTip: 'Reset Password',
      resetBtnConfirm: 'Confirm Reset?',
      updatePassWordTip: "Can't be empty",
      updatePassWordTitle: 'Edit Password',
      okText: 'ok',
      cancelText: 'cancel',
    },
    msg: {
      success: 'success',
    },
  },
  command: {
    title: 'Command',
    tab: {
      factoryReset: 'Factory Reset',
      reboot: 'Reboot',
    },
    loadingTip: 'requested...',
  },
  fileUpgrade: {
    title: 'File Upgrade',
    uploadBtnText: 'Click to Upload',
    downloadBtnText: 'Click to Download',
    rebootBtnText: 'Reboot',
    rebootTip: 'Whether to execute the reboot instruction',
    leaveRebootTip:
      'Whether to execute the current page reboot instruction before leaving the page',
    okText: 'ok',
    cancelText: 'cancel',
    uploadFailedTip: 'The file names are inconsistent, Please re-upload',
  },
};
