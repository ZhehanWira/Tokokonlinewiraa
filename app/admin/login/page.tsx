'use client';
import Link from "next/link";
import { BASE_API_URL } from "@/global"
import { storeCookie } from "@/lib/client-cookies"
import axios from "axios"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import { Login } from "@/types/login";

const LoginPage = () => {
   const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const router = useRouter()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const url = `${BASE_API_URL}/auth/login`
        const payload = JSON.stringify({ email, password })
        const response = await axios.post<Login>(url, payload, {
            headers: {
                "Content-Type": "application/json",
            },
        })

        const data = response.data
        storeCookie("token", data.token || "")
        if (data.status == true) {
            toast(data.message, { containerId: `toastLogin`, type: "success", hideProgressBar: true, autoClose: 1000 })
            if (data.user.role == "admin") {
                setTimeout(() => router.replace("/admin/dashboard"), 2000)
            } else if (data.user.role == "user") {
                setTimeout(() => router.replace("/dashboard"), 2000)
            }
        } else if (data.status == false) {
            toast(data.message, { containerId: `toastLogin`, type: "warning", hideProgressBar: true, autoClose: 3000 })
        }
    }
    


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <ToastContainer containerId={`toastLogin`} />
            <div className="flex flex-col w-3/6 h-screen p-10 items-center bg-white-600 rounded shadow-md ">
            <div className=" w-full mb-6">
                <h1 className="text-4xl text-red-900 font-bold  py-25 text-center">Hello, Please Login!</h1>
                <form onSubmit={handleSubmit}
                className="mb-1">
                    <div className="mb-2">
                        <label className="block text-gray-700 mb-3" htmlFor="email">Email</label>
                        <input className="w-full p-2 border bg-white  placeholder:text-gray-400 text-gray-500 border-gray-300 rounded" type="text" id="Email" name="Email" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                        <input className="w-full p-2 border bg-white placeholder:text-gray-400 text-gray-500 border-gray-300 rounded" type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <button className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-800" type="submit">Login</button>
                </form>
                <div>
                    <p className="mt-4 text-center text-gray-600">Already haven't an account? <Link href="/admin/register" className="text-blue-500 hover:underline">Register here</Link></p>
                </div>
            </div>
            </div>
            <div className="w w-1/2">
            <img src="image/bg.png" alt="bg" className="w-full h-screen object-cover" />
            </div>
        </div>
    )
};
export default LoginPage;