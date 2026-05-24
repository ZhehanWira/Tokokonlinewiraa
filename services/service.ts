import { BASE_API_URL } from "@/global"
import { getServerCookie } from "@/lib/server-cookie"
import { Service } from "@/types/getService"
import axios from "axios"
import { get } from "http"

type ResponseData = {
    status: boolean
    message: string
    data?: Service[]
}
export const GetService = async (): Promise<ResponseData>=>{
    try{
        const token = await getServerCookie("token");
        const response = await axios.get(`${BASE_API_URL}/services?page=1&quantity=10`,{
            headers:{
                "Content-Type": "application/json",
                
                'authorization': `Bearer ${token}`
            }
        } )
        const data = response.data
        return {
            status: true,
            message: "Services fetched successfully",
            data: data.data
        }
    } catch(error){
        return {
            status: false,
            message: "Failed to fetch services",
        };  
    }
}
export const AddService = async (id: number | undefined, serviceData: { name: string, min_usage: number, max_usage: number, price: number }): Promise<ResponseData> => {
    try {
        const token = await getServerCookie("token");
        let response;
        if (id === undefined) {
             response = await axios.post(`${BASE_API_URL}/services`, serviceData, {
                headers: {
                    "Content-Type": "application/json",
                    
                    'authorization': `Bearer ${token}`
                }
            })
        } else {
              response = await axios.patch(`${BASE_API_URL}/services/${id}`, serviceData, {
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
    catch (error) {
        return {
            status: false,
            message: `Failed to ${id ? "update" : "add"} service`,
        };
    }
}
export const DropService = async (serviceId: number): Promise<ResponseData> => {
    try {
        const token = await getServerCookie("token");
        const response = await axios.delete(`${BASE_API_URL}/services/${serviceId}`, {
            headers: {
                "Content-Type": "application/json",
                
                'authorization': `Bearer ${token}`
            }
        })      
        const data = response.data
        return {
            status: true,
            message: "Service deleted successfully",
            data: data.data
        }
    }
    catch (error) {
        return {
            status: false,
            message: "Failed to delete service",
        };
    }
}

