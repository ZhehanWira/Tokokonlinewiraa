import { URL_IMAGE } from "@/global";
import { GetBarang } from "@/services/barang";
import { FormBarang } from "./formBarang";

const BarangPage = async () => {
    const { data } = await GetBarang();
    console.log(data);
    return (
        <div>
            <h3 className="text-black py-2">Tambah Barang</h3>
            <FormBarang />
            <table className="min-w-full border-collapse border border-gray-400">
            <tr>
                <th className="border border-gray-400 p-2">Nama Barang</th>
                    <th className="border border-gray-400 p-2">Harga</th>
                    <th className="border border-gray-400 p-2">Stok</th>
                    <th className="border border-gray-400 p-2">Image</th>
                    <th className="border border-gray-400 p-2">Aksi</th>
                </tr>
                
                {data ? data.map((item: any) => (
                    <tr className="text-black" key={item.id}>
                        <td className="text-black">{item.nama_barang}</td>
                        <td className="text-black">Rp {item.harga.toLocaleString()}</td>
                        <td className="text-black">{item.stok}</td>
                        <td className="text-black">
                            <img src={`${URL_IMAGE}/${item.image}`} alt={item.nama_barang} className="w-16 h-16 object-cover" />
                        </td>
                        <td className="text-black">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                Edit
                            </button>
                            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2">
                                Delete
                            </button>
                        </td>
                    </tr>
                )) : (
                    <tr>
                        <td colSpan={5} className="text-center py-4">
                            Tidak ada data barang.
                        </td>
                    </tr>
                )}
            </table>
        </div>
    )
}
export default BarangPage;