'use client';
import Link from "next/link";
import { BASE_API_URL } from "@/global"
import { storeCookie } from "@/lib/client-cookies"
import axios from "axios"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { ToastContainer, toast } from "react-toastify"

type responseLogin = {
  success: boolean
  message: string
  token?: string
  role?: string
}

const LoginPage = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const router = useRouter()

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const url = `${BASE_API_URL}/auth`
            const payload = JSON.stringify({ username, password })
            const response = await axios.post(url,payload, {
                headers: {
                    "Content-Type": "application/json", 
                    'app-key': '980593eabb7d875bf0085840f03e60d60f1d5518'
                },
            })
            console.log(response);
            const data: responseLogin = response.data
            if (data.success == true) {
                const role = data.role
                if (role === `ADMIN`) {
                    toast(data.message, { hideProgressBar: true, containerId: `toastLogin`, type: "success", autoClose: 2000 })
                    storeCookie("token", data.token||'')
                    storeCookie("role", data.role||'')
                    setTimeout(() => router.replace(`/admin/dashboard`), 1000)
                }
                else {
                    toast('anda bukan admin', { hideProgressBar: true, containerId: `toastLogin`, type: "warning", autoClose: 2000 })
                }
            }
            else toast(data.message, { hideProgressBar: true, containerId: `toastLogin`, type: "warning" })
        } catch (error) {
            console.log(error);
            toast(`Something wrong`, { hideProgressBar: true, containerId: `toastLogin`, type: "error" })
        }
    }


    return (
        <div className="flex items-center justify-center min-h-screen bg-red-500 shadow-mist-600">
            <ToastContainer containerId={`toastLogin`} />
            <div className="w-1/2">
            <img src="image/bgwhite.png" alt="bg" className="w-full h-screen object-cover" />
            </div>
            <div className="flex flex-col w-3/6 h-screen p-10 items-center bg-white-600 rounded shadow-md ">
            <div className=" w-full mb-6">
                <h1 className="text-4xl text-white font-bold  py-25 text-center">Hello, Please Register!</h1>
                <form onSubmit={handleSubmit}
                className="mb-1">
                    <div className="mb-2">
                        <label className="block text-white mb-3" htmlFor="username">Username</label>
                        <input className="w-full p-2 border bg-white  placeholder:text-gray-400 text-gray-500 border-gray-300 rounded" type="text" id="username" name="username" onChange={e => setUsername(e.target.value)} />
                    </div>
                    <div className="mb-6">
                        <label className="block text-white mb-2" htmlFor="password">Password</label>
                        <input className="w-full p-2 border bg-white placeholder:text-gray-400 text-gray-500 border-gray-300 rounded" type="password" id="password" name="password" onChange={e => setPassword(e.target.value)} />
                    </div>
                    <button className="w-full bg-red-400 text-white p-2 rounded hover:bg-red-700" type="submit">Login</button>
                </form>
                <div>
                    <p className="mt-4 text-center text-white">Already haven't an account? <Link href="/admin/register" className="text-blue-500 hover:underline">Register here</Link></p>
                </div>
            </div>
            </div>
            
        </div>
    )
};
export default LoginPage;