import { LoadingStore } from './loading'
import { AuthorizationStore, ProfileStore } from './personal'
import { OrganizationStore } from './organization'
import { RoleStore } from './roles'
import { EmployeeStore, GerneralStore, InvitaionStore, EmployeeListStore } from './employee'

export type RootStoreInterface = {
  loadingInstance: LoadingStore
  authorizationStoreInstance: AuthorizationStore
  profileInstance: ProfileStore
  organizationInatance: OrganizationStore
  roleInatance: RoleStore
  employeeInatance: EmployeeStore
  exployeeListInstance: EmployeeListStore
  gerneralInatance: GerneralStore
  invitaionInstance: InvitaionStore
}

export const rootStore = {
  loadingInstance: new LoadingStore(),
  authorizationStoreInstance: new AuthorizationStore(),
  profileInstance: new ProfileStore(),
  organizationInatance: new OrganizationStore(),
  roleInatance: new RoleStore(),
  employeeInatance: new EmployeeStore(),
  exployeeListInstance: new EmployeeListStore(),
  gerneralInatance: new GerneralStore(),
  invitaionInstance: new InvitaionStore(),
}
