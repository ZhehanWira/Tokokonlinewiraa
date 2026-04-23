
import { BASE_API_URL } from "@/global";
import { getServerCookie } from "@/lib/server-cookies";
import { Data } from "@/types/getMe";
import axios from "axios"
type ResponseData = {
    status: boolean
    message: string
    data?: Data
}

const GetMeApi = async (): Promise<ResponseData> => { 
    try {
        const token = await getServerCookie("token")
        const response = await axios.get(`${BASE_API_URL}/admins/me`, {
            headers: {
                "Content-Type": "application/json",
                'authorization': `Bearer ${token}`
            },
        });
        const data = response.data;
        return {
            status: true,
            message: "Admin data fetched successfully",
            data: data.data,
        }; 
    } catch (error) {
        return {
            status: false,
            message: "Failed to fetch admin data",
        };
    }
}
export default GetMeApi;