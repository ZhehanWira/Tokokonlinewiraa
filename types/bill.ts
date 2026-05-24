export interface Root {
  success: boolean
  message: string
  data: Bill[]
  count: number
}

export interface Bill {
  id: number
  customer_id: number
  admin_id: number
  month: number
  year: number
  measurement_number: string
  usage_value: number
  price: number
  service_id: number
  paid: boolean
  owner_token: string
  createdAt: string
  updatedAt: string
  service: Service
  admin: Admin
  customer: Customer
  payments?: Payments
  amount: number
}

export interface Service {
  id: number
  name: string
  min_usage: number
  max_usage: number
  price: number
  owner_token: string
  createdAt: string
  updatedAt: string
}

export interface Admin {
  id: number
  user_id: number
  name: string
  phone: string
  owner_token: string
  createdAt: string
  updatedAt: string
}

export interface Customer {
  id: number
  user_id: number
  customer_number: string
  name: string
  phone: string
  address: string
  service_id: number
  owner_token: string
  createdAt: string
  updatedAt: string
}

export interface Payments {
  id: number
  bill_id: number
  payment_date: string
  verified: boolean
  total_amount: number
  payment_proof: string
  owner_token: string
  createdAt: string
  updatedAt: string
}