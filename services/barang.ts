import { BASE_API_URL } from "@/global";
import { getServerCookie } from "@/lib/server-cookie";
import { Barang } from "@/types/barang";
import axios from "axios";

type ResponseData = {
    status:boolean
    message:string
    data?: Barang[]
}

export const GetBarang = async (): Promise<ResponseData> => {
    try {
        const token = await getServerCookie("token");
        const response = await axios.get(`${BASE_API_URL}/admin/getbarang`, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = response.data;
        return {
            status: true,
            message: "Barangs fetched successfully",
            data: data.data,
        };        
    } catch (error) {
        return {
            status: false,
            message: "Failed to fetch barangs",
        };              
    }
}
    export const TambahBarang = async (formData: FormData): Promise<ResponseData> => {
        try {
            const token = await getServerCookie("token");
            const response = await axios.post(`${BASE_API_URL}/admin/insertbarang`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${token}`,
                },
            })
            const data = response.data;
            console.log(data);
            return {
                status: true,
                message: "Barang added successfully",
                data: data.data,
            };
        } catch (error) {
            return {
                status: false,
                message: "Failed to add barang",
            };
        }
    }