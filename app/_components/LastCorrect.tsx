import Flag from "./Flag"

type CountryType = {
    country: string;
    capital: string;
    region?: string;
    flag: string
};

function LastCorrect({country}:{country:CountryType | undefined}) {
    if(!country) return null

    return (
        <div className="flex flex-col items-center justify-center">
            <p>Last correct guess</p>
            <Flag country={country} flagSize="small"/>
            <p className="text-2xl">{country.country}</p>
        </div>
    )
}

export default LastCorrect
