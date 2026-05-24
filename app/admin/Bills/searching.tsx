'use client'
import { useState,KeyboardEvent } from "react";
import { useRouter } from "next/navigation";


type Props = {
    search : string
}


const Searching = ({ search }: Props) => {
    const [localSearch, setSearch] = useState<string>(search); 
    const router = useRouter()
    const handleSubmit = async (e: KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault()
        if(e.key ==="Enter"){
            const params = new URLSearchParams(window.location.search)
            if(localSearch.trim()){
                params.set("search", localSearch)

                 } else {
                params.delete("search")
            }
            router.push(`?${params.toString()}`)
        }
    }
    return (
        <div>
           <input 
               type="text" 
               placeholder="Search customer..." 
               className="border border-gray-300 rounded-md p-2"
               value={localSearch}
               onChange = {e=>setSearch(e.target.value)}
               onKeyUp={(e) => handleSubmit(e)}
           />
        </div>
    );
}
export default Searching;
