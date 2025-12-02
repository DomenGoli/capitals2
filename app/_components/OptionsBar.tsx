"use client";

import { useSearchParams } from "next/navigation";
import Select from "./Select";

const regionChoices = [
    "World",
    "Europe",
    "Asia",
    "Americas",
    "Oceania",
    "Africa",
    //"USA states",
];

type SearchParamsType = {
    size: string;
    order: string;
    region: string;
    mode: string;
};

function OptionsBar({
    game = "capitals",
}: {
    params: SearchParamsType;
    game?: string;
}) {
    // const pathname = usePathname();
    // const router = useRouter();
    const searchParams = useSearchParams();
    const order = searchParams?.get("order") || "alpha";
    const size = Number(searchParams?.get("size")) || 10;
    const region = searchParams?.get("region") || "USA states";
    const mode = searchParams?.get("mode") || "classic";

    // //// Loada data iz local storage
    // function loadLocalStoredData() {
    //     const storedValue = localStorage.getItem("storedParams");
    //     return storedValue ? JSON.parse(storedValue) : {size: 15};
    // }

    // function setParams(name) {
    //     const storedParams = loadLocalStoredData()
    //     const params = new URLSearchParams(searchParams);
    //     params.set(name, storedParams["value"])
        
    //     router.replace(`${pathname}?${params.toString()}`);
    // }

    
    // const order = params?.order || "alpha";
    // const size = Number(params?.size) || 10;
    // const region = params?.region || "Europe";
    // const mode = params?.mode || "classic"
    // useEffect(function() {
    //     const storedParams = loadLocalStoredData()
    //     const params = new URLSearchParams(searchParams);
    //     params.set("size", storedParams["value"])
    // }, [searchParams])

    return (
        <div className="lg:flex gap-14 mb-2 border-1 px-4 py-1">
            <Select value={size} name="size" text="Stevilo drzav">
                {/* <option value={allCountriesInRegion}>All</option> */}
                {new Array(50).fill("").map((_, i) => (
                    <option className="text-black" key={i} value={i + 1}>
                        {i + 1}
                    </option>
                ))}
            </Select>
            <Select value={order} name="order" text="Vrstni red">
                <option className="text-black" value="alpha">
                    Po abecedi
                </option>
                <option className="text-black" value="random">
                    Nakljucno
                </option>
            </Select>
            <Select value={region} name="region" text="Regija">
                {regionChoices.map((choice) => (
                    <option className="text-black" key={choice} value={choice}>
                        {choice}
                    </option>
                ))}
                {game === "capitals" ? (
                    <option
                        className="text-black"
                        key={"USA states"}
                        value={"USA states"}
                    >
                        USA states
                    </option>
                ) : null}
            </Select>
            {game === "capitals" && (
                <Select value={mode} name="mode" text="Mode">
                    <option className="text-black" value={"classic"}>
                        Classic
                    </option>
                    <option className="text-black" value={"bullet"}>Bullet</option>
                </Select>
            )}
        </div>
    );
}

export default OptionsBar;
