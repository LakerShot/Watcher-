export interface User {
  email: string
  password: string
}

export interface Category {
  name: string
  imageSrc?: string
  user?: string
  _id?: string
}

export interface Position {
  name: string
  cost: number
  category: string
  user?: string
  _id?: string
  quantity?: number
}

export interface Order {
  date?: Date
  order?: number
  user?: string
  _id?: string
  list: OrderPosition[]
}

export interface OrderPosition {
  name: string
  quantity: number
  cost: number
  _id?: string
}

export interface Token {
  token: string
}

export interface Message {
  message: string
}

export interface Filter {
  start?: Date
  end?: Date
  order?: number
}

export interface OverviewPage {
  gain: OverviewPageItem
  orders: OverviewPageItem
}

export interface OverviewPageItem {
  percent: number
  compare: number
  yestarday: number
  isHigher: boolean
}

export interface AnaliticsPage {
  average: number
  chart: AnaliticsChartItem[]
}

export interface AnaliticsChartItem {
  lable: string, 
  gain: number,
  order: number
}

export interface MaterialDatePiker extends MaterialInstance {
  date?: Date
}

export interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

export interface MaterialInstance {
  open?(): void
  close?(): void
  destroy?(): void
}
