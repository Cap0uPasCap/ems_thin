/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  loginName: string;
  password: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}
export interface LoginResult {
  userId: string | number;
  token: string;
  role: RoleInfo;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  data: LoginResult;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles: RoleInfo[];
  // 用户id
  userId: string | number;
  // 用户名
  username: string;
  // 真实名字
  realName: string;
  // 头像
  avatar: string;
  // 介绍
  desc?: string;
  // 用户名
  loginName: string;
}
