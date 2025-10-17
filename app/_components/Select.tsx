"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Select({
    children,
    value,
    text,
    name
}: {
    children: React.ReactNode;
    value: string | number;
    text: string;
    name: string;
}) {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    // function loadLocalStoredData() {
    //     const storedValue = localStorage.getItem("storedParams");
    //     return storedValue ? JSON.parse(storedValue) : {size: 15};
    // }

    // function setParams(name) {
    //     const storedParams = loadLocalStoredData()
    //     const params = new URLSearchParams(searchParams);
    //     params.set(name, storedParams[name])
        
    //     // router.replace(`${pathname}?${params.toString()}`);
    // }

    function handleOption(option: string) {
        const params = new URLSearchParams(searchParams)
        params.set(name, option)
        router.replace(`${pathname}?${params.toString()}`)
        if(pathname==="/capitals") localStorage.setItem("storedCapitalsParams", `${params.toString()}`)
        else if(pathname==="/flags") localStorage.setItem("storedFlagsParams", `${params.toString()}`)
    }


    return (
        <div>
            <label className="text-[1.2rem]">{text}: </label>
            <select
                value={value}
                onChange={(e) => handleOption(e.target.value)}
                className="text-[1.2rem] border-3 border-transparent hover:border-amber-400 focus:outline-none"
            >
                {children}
            </select>
        </div>
    );
}

export default Select;
