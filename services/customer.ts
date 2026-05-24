import {BASE_API_URL } from '@/global';
import { getServerCookie } from '@/lib/server-cookie';
import { Customer } from '@/types/customer';
import axios from 'axios';
import { get } from 'http';
type ResponseData = {
    status: boolean
    message: string
    data?: Customer[]
    count?: number
}
export const GetCustomerApi = async (params: { page ?: number; quantity ?: number; search ?: string }): Promise<ResponseData> => {
    try {
        const token = await getServerCookie("token");
        const response = await axios.get(`${BASE_API_URL}/customers?page=${params.page}&quantity=${params.quantity}&search=${params.search}`, { 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
          
                'authorization': `Bearer ${token}`
            },
        });
        const data = response.data;
        return {
            status: true,
            message: "Customer data fetched successfully",
            data: data.data,
            count: data.count
        };
    } catch (error) {
        return {
            status: false,
            message: "Failed to fetch customer data",
        };
    }   
} 
export const CreateUpdateCustomer = async (id: number | undefined, customerData: { name: string, customer_number: string, phone: string, address: string, service_id: number, username: string, password: string }): Promise<ResponseData> => {
    try {
        const token = await getServerCookie("token");
        let response;
        if (id === undefined) {
             response = await axios.post(`${BASE_API_URL}/customers`, customerData, {
                headers: {
                    "Content-Type": "application/json",
                   
                    'authorization': `Bearer ${token}`
                }
            })
        } else {
              response = await axios.patch(`${BASE_API_URL}/customers/${id}`, customerData, {
            headers: {
                "Content-Type": "application/json",
               
                'authorization': `Bearer ${token}`
            }
        })
        }


        const data = response.data
        return {
            status: true,
            message: `Service ${id ? "updated" : "added"} successfully`,
            data: data.data
        }
    }
    catch (error : any) {
        return {
            status: false,
            message: `Failed to ${id ? "update" : "add"} customer. ${error.response.data.message || "Unknown error"}`,
        };
    }
}

    export const DropCustomer =async (customerId: number): Promise<ResponseData> => {
        try{
            const token = await getServerCookie("token");
            const response =  await axios.delete(`${BASE_API_URL}/customers/${customerId}`, {
                headers:{
                    "Content-Type": "application/json",
            
                    'authorization': `Bearer ${token}`
                }
        })
        const data = response.data
        return {
            status: true,
            message: "Customer deleted successfully",
            data: data.data
        }
 }
 catch (error) {
    return {
        status:false,
        message: "Failed to delete customer",
    };
}
    }

  



