import FlagsBoard from "../_components/FlagsBoard";
import Game from "../_components/Game";
import OptionsBar from "../_components/OptionsBar";
import { getCountries } from "../_lib/data-service";

type SearchParamsType = {
    size: string;
    order: string;
    region: string;
    mode: string;
};

async function Page({ searchParams }: { searchParams: SearchParamsType }) {
    const worldData = await getCountries();
    const params = await searchParams;

    return (
        <div className="flex flex-col items-center">
            <label className="text-4xl mb-1">Zastave</label>
            <OptionsBar params={params} game="flags" />
            <Game>
                <FlagsBoard data={worldData} />
            </Game>
        </div>
    );
}

export default Page;
