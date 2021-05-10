export type Ref = {
  id: string
  collection?: Ref
  "@ref": Ref
}

export type Document<DataType = any> = {
  ref?: Ref
  ts?: number
  data?: DataType
}
