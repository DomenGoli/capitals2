import Image from "next/image";

type CountryType = {
    country: string;
    capital: string;
    region?: string;
    flag: string
};

type FlagType = {
    [big: string]: string;
    small: string;
}

function Flag({country, flagSize="big"}:{country: CountryType | undefined; flagSize?: string}) {
    if(!country) return null
    const flag: FlagType = {
        big: "h-[240px] w-[360px]",
        small: "h-[120px] w-[180px]"
    }
    
    
    return (
        <div className={`relative ${flag[flagSize]} m-4`}>
            <Image
                src={country?.flag}
                alt={country?.country}
                fill
                className="object-cover"
            />
        </div>
    );
}

export default Flag;
