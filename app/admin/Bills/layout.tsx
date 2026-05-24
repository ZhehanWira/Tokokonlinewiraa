import AdminSidebar from "@/components/AdminSidebar"


export const metadata = {
    title: "Billing | PDAM",
    description: 'Praktikum SMK Telkom Malang',
}
type PropsLayout = {
    children: React.ReactNode
}
const RootLayout = ({ children }: PropsLayout) => {
    return (
        <div>
            <AdminSidebar>
                {children}
            </AdminSidebar>
        </div>
    )
}
export default RootLayout
