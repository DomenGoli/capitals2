const API_URL = "https://restcountries.com/v3.1/independent?status=true";

type nameObjectType ={
    common: string
}

type CountryObjectType = {
    name: nameObjectType;
    capital: string;
    region: string;
    flags: {png: string}
};

export async function getCountries(){
    const res = await fetch(API_URL);
    const data = await res.json();

    const dataArray = data.map((country: CountryObjectType) => {
        return {
            country: country.name.common,
            capital: country.capital[0] + " ",
            region: country.region,
            flag: country.flags.png
        };
    });
    
    return dataArray

}