"use client";
import Modal from "@/components/modal";
import { TambahBarang } from "@/services/barang";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

export const FormBarang = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [namaBarang, setNamaBarang] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [harga, setHarga] = useState(0);
    const [stok, setStok] = useState(0);
    const [image, setImage] = useState<File | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!image) {
            toast("Please select an image", {
                hideProgressBar: true,
                containerId: "uploadID", autoClose: 2000, type: "error"
            });
            return;
        }

        const formData = new FormData(); new FormData();
        formData.append("nama_barang", namaBarang);
        formData.append("deskripsi", deskripsi);
        formData.append("harga", harga.toString());
        formData.append("stok", stok.toString());
        formData.append("image", image);
        const response = await TambahBarang(formData);
        if (response.status) {
            toast(response.message, {
                hideProgressBar: true,
                containerId: "uploadID", autoClose: 2000, type: "success"
            });
            setIsOpen(false);
            router.refresh();
        } else {
            toast(response.message, {
                hideProgressBar: true,
                containerId: "uploadID", autoClose: 2000, type: "error"
            });
        }
        // Logika untuk mengirim data ke API
    };

    return (
        <div>
            <button onClick={() => setIsOpen(true)} className={"mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"}>
                Tambah Barang
            </button>
            <ToastContainer containerId="uploadID" />
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Tambah Barang">
                <h2 className="text-black">Tambah Barang</h2>
                <form className="text-black" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="nama_barang">Nama Barang:</label><br />
                        <input value={namaBarang} onChange={(e) => setNamaBarang(e.target.value)} type="text" id="nama_barang" name="nama_barang"
                            className="border border-gray-300 rounded py-2 px4 w-full" />
                    </div>
                    <div>
                        <label htmlFor="deskripsi">Deskripsi:</label><br />
                        <textarea value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} id="deskripsi" name="deskripsi" className="border border-gray-300 rounded py-2 px4 w-full"></textarea>
                    </div>
                    <div>
                        <label htmlFor="harga">Harga:</label><br />
                        <input value={harga} onChange={(e) => setHarga(Number(e.target.value))} type="number" id="harga" name="harga" step="0.01" className="border border-gray-300 rounded py-2 px4 w-full" />
                    </div>
                    <div>
                        <label htmlFor="stok">Stok:</label><br />
                        <input value={stok} onChange={(e) => setStok(Number(e.target.value))} type="number" id="stok" name="stok" className="border border-gray-300 rounded py-2 px4 w-full" />
                    </div>
                    <div>
                        <label htmlFor="image">Image:</label><br />
                        <input type="file" id="image" name="image"
                            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                            className="border border-gray-300 rounded py-2 px-4 w-full" />
                    </div>
                    <button type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white border border-gray-300 rounded py-2 px-4 w-full">Simpan</button>
                </form>
            </Modal>
        </div>
    )
}