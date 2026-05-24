import { BASE_API_URL } from "@/global"
import { getServerCookie } from "@/lib/server-cookie";
import { Bill } from "@/types/bill";
import axios, { AxiosError } from "axios";

type ResponseData = {
    status: boolean
    message: string
    data?: Bill[]
    count?: number
}

export const GetBills = async (params: { page?: number; quantity?: number; search?: string }):
    Promise<ResponseData> => {
    try {
        const token = await getServerCookie("token");
        const response = await axios.get(`${BASE_API_URL}/bills?page=${params.page || 1}&quantity=${params.quantity || 10}&search=${params.search || ''}`, {
            headers: {
                "Content-Type": "application/json",
               
                'Authorization': `Bearer ${token}`
            }
        })
        const data = response.data
        return {
            status: true,
            message: "Bills fetched successfully",
            data: data.data,
            count: data.count
        }
    } catch (error) {
        return {
            status: false,
            message: "Failed to fetch bills"
        }
    }
}

export const CreateUpdateBill = async (id: number | undefined, billData:
    { customer_id: number, month: number, year: number, measurement_number: string, usage_value: number, }):
    Promise<ResponseData> => {
    try {
        const token = await getServerCookie("token");
        let response;
        if (id === undefined) {
            response = await axios.post(`${BASE_API_URL}/bills`, billData, {
                headers: {
                    "Content-Type": "application/json",
                   
                    'authorization': `Bearer ${token}`
                }
            })
        } else {
            response = await axios.patch(`${BASE_API_URL}/bills/${id}`, billData, {
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
    catch (error: unknown) {
        if (error instanceof AxiosError) {
            return {
                status: false,
                message: error.response?.data?.message || `Failed to ${id ? "update" : "add"} service.`,
            };
        }
        return {
            status: false,
            message: `Failed to ${id ? "update" : "add"} Bill.`,
        };
    }
}


