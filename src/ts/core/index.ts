export type { IMsgChat } from './chat/message/msgchat';
export { msgChatNotify } from './chat/message/msgchat';
export { companyTypes, departmentTypes, orgAuth as OrgAuth } from './public/consts';
export { MessageType, SpeciesType, TargetType } from './public/enums';
export type { IAuthority } from './target/authority/authority';
export type { IBelong } from './target/base/belong';
export type { ITarget } from './target/base/target';
export type { ITeam } from './target/base/team';
export type { IIdentity } from './target/identity/identity';
export type { IDepartment } from './target/innerTeam/department';
export type { IStation } from './target/innerTeam/station';
export type { ICohort } from './target/outTeam/cohort';
export type { IGroup } from './target/outTeam/group';
export type { IPerson } from './target/person';
export type { ICompany } from './target/team/company';
export type { IWorkItem } from './thing/app/work/workitem';
export type { ISpeciesItem } from './thing/base/species';
export type { IDict } from './thing/dict/dict';
export type { IFileSystemItem } from './thing/filesys/filesysItem';
export type { IFileSystem, TaskModel } from './thing/filesys/filesystem';
export type { IPropClass } from './thing/store/propclass';
export { UserProvider } from './user';
