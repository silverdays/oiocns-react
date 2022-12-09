import { model, schema } from '@/ts/base';
import { PageRequest, TargetModel } from '@/ts/base/model';
import { XTarget, XTargetArray } from '@/ts/base/schema';
import { TargetType } from '../enum';
import { IMarket, Market } from '../market';
import IProduct from '../market/iproduct';
import { IAuthority } from './authority/iauthority';
import { IIdentity } from './authority/iidentity';

export type TargetParam = Omit<TargetModel, 'id' | 'belongId'>;

/** 空间类型数据 */
export type SpaceType = {
  /** 唯一标识 */
  id: string;
  /** 名称 */
  name: string;
  /** 类型 */
  typeName: TargetType;
  /** 图标 */
  icon?: string;
};
export interface ITarget {
  /** 唯一标识 */
  id: string;
  /** 名称 */
  name: string;
  /** 团队名称 */
  teamName: string;
  /** 实体对象 */
  target: schema.XTarget;
  /** 职权树 */
  authorityTree: IAuthority | undefined;
  /** 拥有的身份 */
  ownIdentitys: schema.XIdentity[];
  /** 组织的身份 */
  identitys: IIdentity[];
  /** 子组织类型 */
  subTeamTypes: TargetType[];
  /** 可以加入的父组织类型 */
  joinTargetType: TargetType[];
  /** 可以查询的组织类型 */
  searchTargetType: TargetType[];
  /** 子组织 */
  subTeam: ITarget[];
  /**
   * 更新集团
   * @param data 集团基本信息
   */
  update(data: TargetParam): Promise<ITarget>;
  /**
   * 获取职权树
   * @param reload 是否强制刷新
   */
  selectAuthorityTree(reload?: boolean): Promise<IAuthority | undefined>;
  /**
   * 判断是否拥有该身份
   * @param id 身份id
   */
  judgeHasIdentity(id: string): Promise<boolean>;
  /**
   * 获取身份
   * @return {IIdentity[]} 身份数组
   */
  getIdentitys(): Promise<IIdentity[]>;
  /**
   * 创建身份
   * @param {model.IdentityModel} params 参数
   */
  createIdentity(
    params: Omit<model.IdentityModel, 'id' | 'belongId'>,
  ): Promise<IIdentity | undefined>;
  /**
   * 删除身份
   * @param id 身份ID
   */
  deleteIdentity(id: string): Promise<boolean>;
  /** 加载子组织 */
  loadSubTeam(reload?: boolean): Promise<ITarget[]>;
  /**
   * 加载组织成员
   * @param page 分页请求
   */
  loadMembers(page: PageRequest): Promise<XTargetArray>;
  /**
   * 拉取成员加入群组
   * @param {XTarget} target 成员
   */
  pullMember(target: XTarget): Promise<boolean>;
  /**
   * 拉取成员加入群组
   * @param {string[]} ids 成员ID数组
   * @param {TargetType} type 成员类型
   */
  pullMembers(ids: string[], type: TargetType | string): Promise<boolean>;
  /**
   * 移除群成员
   * @param {XTarget} target 成员
   */
  removeMember(target: XTarget): Promise<boolean>;
  /**
   * 移除群成员
   * @param {string[]} ids 成员ID数组
   * @param {TargetType} type 成员类型
   */
  removeMembers(ids: string[], type: TargetType | string): Promise<boolean>;
}
/** 市场相关操作方法 */
export interface IMTarget {
  /** 我加入的市场 */
  joinedMarkets: Market[];
  /** 开放市场 */
  publicMarkets: Market[];
  /** 拥有的产品/应用 */
  ownProducts: IProduct[];
  /** 我发起的加入市场的申请 */
  joinMarketApplys: schema.XMarketRelation[];
  /** 可使用的应用 */
  usefulProduct: schema.XProduct[];
  /** 可使用的资源 */
  usefulResource: Map<string, schema.XResource[]>;
  /**
   * 根据编号查询市场
   * @param name 编号、名称
   * @returns
   */
  getMarketByCode(name: string): Promise<schema.XMarketArray>;
  /**
   * 查询商店列表
   * @param reload 是否强制刷新
   * @returns 商店列表
   */
  getJoinMarkets(reload?: boolean): Promise<IMarket[]>;
  /**
   * 查询开放市场
   * @param reload 是否强制刷新
   * @returns 市场
   */
  getPublicMarket(reload: boolean): Promise<IMarket[]>;
  /**
   * 查询我的产品/应用
   * @param params
   * @param reload 是否强制刷新
   * @returns
   */
  getOwnProducts(reload: boolean): Promise<IProduct[]>;
  /**
   * 查询购买订单
   */
  getBuyOrders(status: number, page: model.PageRequest): Promise<schema.XOrderArray>;
  /**
   * 查询售卖订单
   */
  getSellOrders(
    status: number,
    page: model.PageRequest,
  ): Promise<schema.XOrderDetailArray>;
  /**
   * 查询加入市场的审批
   * @returns
   */
  queryJoinMarketApproval(): Promise<schema.XMarketRelationArray>;
  /**
   * 查询我发起的加入市场申请
   * @param page 分页参数
   * @returns
   */
  getJoinMarketApplys(): Promise<schema.XMarketRelation[]>;
  /**
   * 申请加入市场
   * @param id 市场ID
   * @returns
   */
  applyJoinMarket(id: string): Promise<boolean>;
  /**
   * 删除发起的加入市场申请
   * @param id 申请Id
   */
  cancelJoinMarketApply(id: string): Promise<boolean>;
  /**
   * 查询应用上架的审批
   * @returns
   */
  queryPublicApproval(): Promise<schema.XMerchandiseArray>;
  /**
   * 审批加入市场申请
   * @param id 申请id
   * @param status 审批状态
   * @returns
   */
  approvalJoinMarketApply(id: string, status: number): Promise<boolean>;
  /**
   * 审批商品上架申请
   * @param id 申请ID
   * @param status 审批结果
   * @returns 是否成功
   */
  approvalPublishApply(id: string, status: number): Promise<boolean>;
  /**
   * 创建市场
   * @param  {model.MarketModel} 市场基础信息
   * @param { String } params.name
   * @param
   * @returns
   */
  createMarket({
    name,
    code,
    remark,
    samrId,
    ispublic,
  }: {
    // 名称
    name: string;
    // 编号
    code: string;
    // 备注
    remark: string;
    // 监管组织/个人
    samrId: string;
    // 产品类型名
    ispublic: boolean;
  }): Promise<IMarket | undefined>;
  /**
   * 创建应用
   * @param  {model.ProductModel} 产品基础信息
   */
  createProduct(
    data: Omit<model.ProductModel, 'id' | 'belongId'>,
  ): Promise<IProduct | undefined>;
  /**
   * 删除市场
   * @param id 市场Id
   * @returns
   */
  deleteMarket(id: string): Promise<boolean>;
  /**
   * 删除应用
   * @param id 应用Id
   * @returns
   */
  deleteProduct(id: string): Promise<boolean>;
  /**
   * 退出市场
   * @param id 退出的市场Id
   * @returns
   */
  quitMarket(id: string): Promise<boolean>;
  /**
   * 查询可用的应用
   * @param reload 是否强制刷新
   */
  getUsefulProduct(reload: boolean): Promise<schema.XProduct[]>;
  /**
   * 获得可用资源
   * @param id 应用Id
   * @param reload 是否强制刷新
   */
  getUsefulResource(id: string, reload: boolean): Promise<schema.XResource[]>;
}
export interface IFlow {
  /** 流程定义 */
  defines: schema.XFlowDefine[];
  /** 流程绑定关系 */
  defineRelations: schema.XFlowRelation[];
  /**
   * 获取流程定义列表
   * @param reload 是否强制刷新
   */
  getDefines(reload: boolean): Promise<schema.XFlowDefine[]>;
  /**
   * 查询流程定义绑定项
   * @param reload 是否强制刷新
   */
  queryFlowRelation(reload: boolean): Promise<schema.XFlowRelation[]>;
  /**
   * 发布流程定义（包含创建、更新）
   * @param data
   */
  publishDefine(
    data: Omit<model.CreateDefineReq, 'BelongId'>,
  ): Promise<schema.XFlowDefine>;
  /**
   * 删除流程定义
   * @param id 流程定义Id
   */
  deleteDefine(id: string): Promise<boolean>;
  /**
   * 发起流程实例
   * @param data 流程实例参数
   */
  createInstance(data: model.FlowInstanceModel): Promise<schema.XFlowInstance>;
  /**
   * 绑定应用业务与流程定义
   * @param params
   */
  bindingFlowRelation(params: model.FlowRelationModel): Promise<schema.XFlowRelation>;
  /**
   * 解绑应用业务与流程定义
   * @param params
   */
  unbindingFlowRelation(params: model.FlowRelationModel): Promise<boolean>;
}
export interface ISpace extends IFlow, IMTarget, ITarget {
  /** 我的群组 */
  cohorts: ICohort[];
  /** 空间类型数据 */
  spaceData: SpaceType;

  /**
   * @description: 查询群
   * @param reload 是否强制刷新
   * @return {*} 查询到的群组
   */
  getCohorts(reload?: boolean): Promise<ICohort[]>;
  /**
   * 创建群组
   * @param data 群组基本信息
   */
  createCohort(
    avatar: string,
    name: string,
    code: string,
    remark: string,
  ): Promise<ICohort | undefined>;
  /**
   * 解散群组
   * @param id 群组id
   * @param belongId 群组归属id
   * @returns
   */
  deleteCohort(id: string): Promise<boolean>;
}
/** 群组操作 */
export interface ICohort extends ITarget {
  /**
   * 查询人员
   * @param code 人员编号
   */
  searchPerson(code: string): Promise<schema.XTargetArray>;
}
/** 人员操作 */
export interface IPerson extends ISpace, ITarget {
  /** 我加入的单位 */
  joinedCompany: ICompany[];
  /**
   * 退出群组
   * @param id 群组Id
   */
  quitCohorts(id: string): Promise<boolean>;
  /**
   * 申请加入群组
   * @param id 目标Id
   * @returns
   */
  applyJoinCohort(id: string): Promise<boolean>;
  /**
   * 查询群组
   * @param code 群组编号
   */
  searchCohort(code: string): Promise<schema.XTargetArray>;
  /**
   * 获取单位列表
   * @param reload 是否强制刷新
   * @return 加入的单位列表
   */
  getJoinedCompanys(reload?: boolean): Promise<ICompany[]>;
  /**
   * 设立单位
   * @param data 单位基本信息
   * @returns 是否成功
   */
  createCompany(data: TargetParam): Promise<ICompany | undefined>;
  /**
   * 删除单位
   * @param id 单位Id
   * @returns
   */
  deleteCompany(id: string): Promise<boolean>;
  /**
   * 申请加入单位
   * @param id 目标Id
   * @returns
   */
  applyJoinCompany(id: string, typeName: TargetType): Promise<boolean>;
  /**
   * 退出单位
   * @param id 单位Id
   */
  quitCompany(id: string): Promise<boolean>;
  /**
   * 审批我的好友申请
   * @param relation 申请
   * @param status 状态
   * @returns
   */
  approvalFriendApply(relation: schema.XRelation, status: number): Promise<boolean>;
  /** 查询我的申请 */
  queryJoinApply(): Promise<schema.XRelationArray>;
  /** 查询我的审批 */
  queryJoinApproval(): Promise<schema.XRelationArray>;
  /**
   * 取消加入组织申请
   * @param id 申请Id/好友Id
   * @returns
   */
  cancelJoinApply(id: string): Promise<boolean>;
  /**
   * 修改密码
   * @param password 新密码
   * @param privateKey 私钥
   */
  resetPassword(password: string, privateKey: string): Promise<boolean>;
  /**
   * 查询单位
   * @param code 单位的信用代码
   */
  searchCompany(code: string): Promise<schema.XTargetArray>;
  /**
   * 查询人员
   * @param code 人员编号
   */
  searchPerson(code: string): Promise<schema.XTargetArray>;
  /**
   * 发起好友申请
   * @param target 人员
   */
  applyFriend(target: schema.XTarget): Promise<boolean>;
}
/** 单位操作 */
export interface ICompany extends ISpace, ITarget {
  /** 我的子部门 */
  departments: IDepartment[];
  /** 我的子工作组 */
  workings: IWorking[];
  /** 我加入的集团 */
  joinedGroup: IGroup[];
  /** 当前用户Id */
  userId: string;
  /**
   * 创建集团
   * @param name 集团名称
   * @param code 集团代码
   * @param teamName 团队名称
   * @param teamCode 团队代码
   * @param remark 集团简介
   * @returns 是否成功
   */
  createGroup(data: TargetParam): Promise<IGroup | undefined>;
  /** 创建部门 */
  createDepartment(data: TargetParam): Promise<IDepartment | undefined>;
  /** 创建部门 */
  createWorking(data: TargetParam): Promise<IWorking | undefined>;
  /**
   * 删除集团
   * @param id 集团Id
   */
  deleteGroup(id: string): Promise<boolean>;
  /**
   * 删除子部门
   * @param id 部门Id
   * @returns
   */
  deleteDepartment(id: string): Promise<boolean>;
  /**
   * 删除工作组
   * @param id 工作组Id
   * @returns
   */
  deleteWorking(id: string): Promise<boolean>;
  /**
   *  退出集团
   * @param id 集团Id
   * @returns
   */
  quitGroup(id: string): Promise<boolean>;
  /**
   * 获取单位下的部门（单位、部门）
   * @param reload 是否强制刷新
   * @returns
   */
  getDepartments(reload?: boolean): Promise<IDepartment[]>;
  /**
   * 获取组织下的工作组（单位、部门、工作组）
   * @param reload 是否强制刷新
   * @returns 返回好友列表
   */
  getWorkings(reload: boolean): Promise<IWorking[]>;
  /**
   * @description: 查询我加入的集团
   * @param reload 是否强制刷新
   * @return {*} 查询到的群组
   */
  getJoinedGroups(reload?: boolean): Promise<IGroup[]>;
  /**
   * 申请加入集团
   * @param id 目标Id
   * @returns
   */
  applyJoinGroup(id: string): Promise<boolean>;
  /** 查询我的申请 */
  queryJoinApply(): Promise<schema.XRelationArray>;
  /** 查询我的审批 */
  queryJoinApproval(): Promise<schema.XRelationArray>;
  /**
   * 取消加入申请
   * @param id 申请Id/目标Id
   * @returns
   */
  cancelJoinApply(id: string): Promise<boolean>;
  /**
   * 查询集团
   * @param code 集团编号
   */
  searchGroup(code: string): Promise<schema.XTargetArray>;
}
/** 集团操作 */
export interface IGroup extends ITarget {
  /** 子集团 */
  subGroup: IGroup[];
  /**
   * 申请加入集团
   * @param id 目标Id
   * @returns
   */
  /**
   applyJoinGroup(id: string): Promise<ResultType<any>>;
   * 创建子集团
   * @param data 子集团基本信息
   */
  createSubGroup(data: TargetParam): Promise<IGroup | undefined>;
  /**
   * 删除子集团
   * @param id 集团Id
   * @returns
   */
  deleteSubGroup(id: string): Promise<boolean>;
  /**
   * 获取子集团
   * @param reload 是否强制刷新
   * @returns
   */
  getSubGroups(reload?: boolean): Promise<IGroup[]>;
  /** 删除 */
  delete(): Promise<boolean>;
}
/** 部门操作 */
export interface IDepartment extends ITarget {
  /** 工作组 */
  workings: IWorking[];
  /** 子部门 */
  departments: IDepartment[];
  /**
   * 获取子部门
   * @param reload 是否强制刷新
   */
  getDepartments(reload: boolean): Promise<IDepartment[]>;
  /**
   * 获取工作组
   * @param reload 是否强制刷新
   */
  getWorkings(reload: boolean): Promise<IWorking[]>;
  /** 创建子部门 */
  createDepartment(data: TargetParam): Promise<IDepartment | undefined>;
  /** 创建工作组 */
  createWorking(data: TargetParam): Promise<IWorking | undefined>;
  /** 删除子部门 */
  deleteDepartment(id: string): Promise<boolean>;
  /** 删除工作组 */
  deleteWorking(id: string): Promise<boolean>;
  /** 删除 */
  delete(): Promise<boolean>;
}
/** 工作组 */
export interface IWorking extends ITarget {
  /**
   * 查询人员
   * @param code 人员编号
   */
  searchPerson(code: string): Promise<schema.XTargetArray>;
  /** 删除 */
  delete(): Promise<boolean>;
}
