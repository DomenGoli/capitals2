import CapitolsBoard from "../_components/CapitalsBoard";
import Game from "../_components/Game";
import OptionsBar from "../_components/OptionsBar";
import { getCountries } from "../_lib/data-service";
import { getUsaStates } from "../_lib/getUsaStates";

type SearchParamsType = {
    size: string;
    order: string;
    region: string;
    mode: string;
};

async function Page({ searchParams }: { searchParams: SearchParamsType }) {
    const usaData = getUsaStates();
    const worldData = await getCountries()
    const params = await searchParams;

    
    return (
        <div className="flex flex-col items-center">
            <label className="text-4xl mb-1">Glavna mesta! (najdi pare)</label>
            <OptionsBar params={params} />
            <Game>
                <CapitolsBoard worldData={worldData} usaData={usaData} />
            </Game>
        </div>
    );
}

export default Page;
