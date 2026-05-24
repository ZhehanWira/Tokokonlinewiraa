import { GetService } from "@/services/service";
import FormAddService from "./formAdd";
import DropServiceButton from "./dropService";

const ServicesPage = async() => {
    const {data} = await GetService();
    console.log(data);
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Admin Services</h1>    
            <p className=" mb-4">Manage your services here.</p>
            <FormAddService label="Tambah Service" 
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4"/>
            <div className="grid grid-cols-5 gap-4 mt-4">
                {data && data.map((service)=>(
                    <div key={service.id} className="border p-4 rounded shadow">
                        <h2 className="text-xl font-semibold mb-2">{service.name}</h2>
                        <p>Min Usage: {service.min_usage}</p>   
                        <p>Max Usage: {service.max_usage}</p>
                        <p>Price: {service.price}</p>
                        <div className="flex flex-col gap-2 items-center">
                        <FormAddService id={service.id} formData={service} 
                        label="Edit Service"
                        className="bg-yellow-500 text-white px-4 py-2 rounded mt-4"/>
                        <DropServiceButton serviceId={service.id} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}   
export default ServicesPage