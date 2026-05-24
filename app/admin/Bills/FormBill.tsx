'use client';
import Modal from "@/components/modal";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { Customer } from "@/types/customer";
import { CreateUpdateBill } from "@/services/bill";
type PropsFormAdd = {
    id?: number | undefined
    formData?: any
    label: string
    className: string
    customerList: Customer[] | undefined
}
const FormBill = ({ id, formData, label, className, customerList }: PropsFormAdd) => {

    const [isOpen, setIsOpen] = useState(false);
    const [customer_id, setCustomerId] = useState<number>(formData?.customer.id || 0);
    const [month, setMonth] = useState<number>(formData?.month || 0);
    const [year, setYear] = useState<number>(formData?.year || 0);
    const [measurement_number, setMeasurementNumber] = useState<string>(formData?.measurement_number || "");
    const [usage_value, setUsageValue] = useState<number>(formData?.usage_value || 0);
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const billData = {
            customer_id,
            month,
            year,
            measurement_number,
            usage_value
        };

        const response = await CreateUpdateBill(id, billData);
        if (response.status) {
            toast(response.message, {
                hideProgressBar: true, containerId: `billid`, type: "success",
                autoClose: 2000
            })
            setIsOpen(false);
            setCustomerId(0);
            setMonth(0);
            setYear(0);
            setMeasurementNumber("");
            setUsageValue(0);
            router.refresh();
        } else {
            toast(response.message, {
                hideProgressBar: true, containerId: `billid`, type: "error",
                autoClose: 3000
            })
        }
    };
    return (
        <div>
            <button onClick={() => setIsOpen(true)} className={`${className}`}>
                {label}
            </button>
            <ToastContainer containerId={"billid"} />
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Tambah Bill">
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Nama Customer
                        </label>
                        <select name="customer_id" id="customer_id" value={customer_id} onChange={e => setCustomerId(Number(e.target.value))} className="mt-1 block w-full border border-gray-300 rounded-md p-2">
                            <option value="">Pilih Customer</option>
                            {customerList?.map((customer) => (
                                <option key={customer.id} value={customer.id}>
                                    {customer.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Month
                        </label>
                        <input value={month} onChange={e => setMonth(Number(e.target.value))}
                            type="number" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Year
                        </label>
                        <input value={year} onChange={e => setYear(Number(e.target.value))} type="number" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Measurement Number
                        </label>
                        <input value={measurement_number} 
        onChange={e => setMeasurementNumber(e.target.value)} type="text" className="mt-1 block w-full border 
        border-gray-300 rounded-md p-2" />
                    </div>
                   <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Usage Value
                        </label>
                        <input value={usage_value} onChange={e=>setUsageValue(Number(e.target.value))} type="number" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="bg-green-500 text-white p-2 rounded hover:bg-green-600">
                            Save
                        </button>
                    </div> 
                </form>
            </Modal>
        </div>
    );

}
export default FormBill;

