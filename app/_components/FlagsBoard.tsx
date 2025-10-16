"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { shuffle } from "../_lib/helper";
import Flag from "./Flag";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "../hooks";
import { setFirstChoice, setGuess } from "../_slices/gameSlice";
import ButtonChoice from "./ButtonChoice";
import LastCorrect from "./LastCorrect";

type CountryType = {
    country: string;
    capital: string;
    region?: string;
    flag: string;
};

function FlagsBoard({ data }: { data: [] }) {
    const [choices, setChoices] = useState<string[]>([]);
    const [inplayCountries, setInplayCountire] = useState<CountryType[]>([]);
    const [regionCountries, setRegionCountries] = useState<CountryType[]>([]);
    const [lastCorrectGuess, setLastCorrectGuess] = useState<CountryType>();

    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const order = searchParams?.get("order") || "alpha";
    const size = Number(searchParams?.get("size")) || 10;
    const region = searchParams?.get("region") || "Europe";
    const dispatch = useAppDispatch();

    function handleClick(answer: string) {
        dispatch(setFirstChoice(answer));
        if (inplayCountries.at(0)!.country === answer) {
            setLastCorrectGuess(inplayCountries.at(0));
            dispatch(setFirstChoice(""));
            getInplayCountries(regionCountries);
            // dispatch(setGuess("correct"));
        } else {
            dispatch(setGuess("wrong"));
        }
    }

    const getInplayCountries = useCallback(
        function getInplayCountries(filteredByRegion: CountryType[]) {
            const filtered = filteredByRegion.sort(shuffle).slice(0, size);
            setInplayCountire(filtered);
            const countryNames = filtered.map(
                (country: CountryType) => country.country
            );
            const orderedCountryNames =
                order === "alpha"
                    ? countryNames.sort()
                    : countryNames.sort(shuffle);
            setChoices(orderedCountryNames);
        },
        [size, order]
    );

    // Loada zadnje nastavitbe v optionsBaru
    useEffect(
        function () {
            const params = localStorage.getItem("storedFlagsParams");
            router.replace(`${pathname}?${params}`);
        },
        [pathname, router]
    );

    useEffect(
        function () {
            function filterByRegion() {
                if (region === "USA states") return data;
                else {
                    return data.filter((country: CountryType) => {
                        if (region === "World") return country;
                        else if (region === "Europe") {
                            if (country.region === "Europe") return country;
                        } else if (region === "Asia") {
                            if (country.region === "Asia") return country;
                        } else if (region === "Americas") {
                            if (country.region === "Americas") return country;
                        } else if (region === "Oceania") {
                            if (country.region === "Oceania") return country;
                        } else if (region === "Africa") {
                            if (country.region === "Africa") return country;
                        }
                    });
                }
            }
            const filteredByRegion = filterByRegion();
            setRegionCountries(filteredByRegion);
            getInplayCountries(filteredByRegion);
        },
        [getInplayCountries, data, region]
    );

    return (
        <div className="flex flex-col">
            {/* <div className="flex first:ml-[50%]">
                <div>
                    <Flag country={inplayCountries.at(0)} />
                </div>
                <div>
                    <LastCorrect country={lastCorrectGuess} />
                </div>
                
            </div> */}
            <div className="flex justify-center">
                <div className="flex w-[360px]">
                    <LastCorrect country={lastCorrectGuess} />
                </div>
                <div>
                    <Flag country={inplayCountries.at(0)} />
                </div>
                <div className="w-[360px]" />
            </div>

            <div className="grid grid-cols-10">
                {choices.map((element, i) => (
                    <ButtonChoice
                        game="flags"
                        key={i}
                        element={element}
                        handleClick={handleClick}
                    />
                ))}
            </div>
        </div>
    );
}

export default FlagsBoard;
