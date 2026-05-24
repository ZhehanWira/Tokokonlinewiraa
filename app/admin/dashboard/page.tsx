import GetMeApi from "@/services/getMe";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
    let nama = '';
    let role = '';

    const response = await GetMeApi();
    if (!response.status) {
        // redirect('/dashboard');
    } else {
        nama = response.data?.name || '';
        role = response.data?.user?.role || '';
    }
    return (
        <div className="p-10 bg-url('/images/bgwhite.png') bg-cover min-h-screen">
            <h1 className="text-2xl text-black font-bold mb-4">Admin Dashboard</h1>
            <p className="text-black">Welcome to the admin dashboard. Here you can manage the application.</p>
            <div className=" mb-2 border-4 border-gray-800 rounded-md p-2">
                <div className="text-black">Nama anda</div>
                <div className="text-black">{nama}</div>
                <div className="text-black">Role you</div>
                <div className="text-black">{role}</div>
            </div>
        </div>
    )
}

export default DashboardPage;


