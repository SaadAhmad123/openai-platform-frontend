export type User = {
  first_name: string
  last_name: string
  organisation: string
  email: string
}

export type StackStateType =
  | 'AVAILABLE'
  | 'SCRATCH'
  | 'PROVISIONING'
  | 'PROVISIONING_ERROR'
  | 'PROVISIONING_UPDATE_TIMEOUT'
  | 'PROVISIONING_CREATE_TIMEOUT'
  | 'DELETE_INIT'
  | 'DELETING'
  | 'DELETING_TIMEOUT'
  | 'DELETING_ERROR'
  | 'DELETED'
  | 'ERROR'

export type StackItem = {
  stack_uuid?: string
  name?: string
  description?: string
  provisioning_stack?: string
  provisioning_stack_version?: string
  state: StackStateType
  created_at?: string
  updated_at?: string
  stack_content?: string
}
