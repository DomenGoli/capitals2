"use client";
import { Provider } from "react-redux";
import {
    resetGameState,
    setFirstChoice,
    setGameover,
    setGuess,
    setScore,
    setSecondChoice,
    setTries,
} from "../_slices/gameSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import ButtonChoice from "./ButtonChoice";
import store from "../store";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { shuffle } from "../_lib/helper";
import { useCallback, useEffect, useState } from "react";
import ScoreBar from "./ScoreBar";
import GameOver from "./GameOver";

type CountryType = {
    country: string;
    capital: string;
    region?: string;
    flag?: string;
};

function CapitalsBoard({
    worldData,
    usaData,
}: {
    usaData: CountryType[];
    worldData: CountryType[];
}) {
    const pathname = usePathname();
    const router = useRouter();
    const [choices, setChoices] = useState<string[]>([]);
    const [countries, setCoutries] = useState<CountryType[]>([]);
    const [countriesPool, setCoutriesPool] = useState<CountryType[]>([]);
    const { firstChoice, secondChoice, guess } = useAppSelector(
        //bulletChoice,
        (store) => store.game
    );
    const dispatch = useAppDispatch();
    const searchParams = useSearchParams();
    const order = searchParams?.get("order") || "alpha";
    const size = Number(searchParams?.get("size")) || 10;
    const region = searchParams?.get("region") || "USA states";

    function handleClick(answer: string): void {
        if (answer === secondChoice && guess === "correct") return; //prepreci dvoklik na pravilen rezultat

        dispatch(setGameover(false));

        if (firstChoice && firstChoice === answer && !secondChoice) {
            //lahko odznacis prvi izbor
            dispatch(setFirstChoice(""));
            return;
        }
        if (firstChoice && secondChoice) {
            // case: imamo oznacena dva rdeca izbora
            dispatch(setGuess(""));
            dispatch(setFirstChoice(answer));
            dispatch(setSecondChoice(""));
        } else if (firstChoice) {
            // case ko izbiramo drugi izbor
            checkAnswers(answer, firstChoice);
        }
        if (!firstChoice) dispatch(setFirstChoice(answer)); // case: ni izbora
    }

    function checkAnswers(answer: string, compare: string): boolean {
        dispatch(setSecondChoice(answer));

        if (firstChoice) {
            for (let i = 0; i < countries.length; i++) {
                if (countries[i].country === compare) {
                    if (countries[i].capital === answer) {
                        dispatch(setGuess("correct"));
                        dispatch(setScore());
                        dispatch(setTries());
                        return true;
                    } else {
                        dispatch(setGuess("wrong"));
                        dispatch(setTries());
                    }
                } else if (countries[i].capital === compare) {
                    if (countries[i].country === answer) {
                        dispatch(setGuess("correct"));
                        dispatch(setScore());
                        dispatch(setTries());
                        return true;
                    } else {
                        dispatch(setGuess("wrong"));
                        dispatch(setTries());
                    }
                }
            }
        }
        return false;
    }

    const getPlayingCountries = useCallback(
        function getPlayingCountries(countries: CountryType[]) {
            //2) filter by choices size
            const filtered = countries.sort(shuffle).slice(0, size);
            setCoutries(filtered);

            //3) construct choices array for displaying on game board
            const capitalsAndCoutries = [
                ...filtered.map((ele) => ele.capital),
                ...filtered.map((ele) => ele.country),
            ];

            //4) sort choices for displaying on game board
            const orderedCapitalsAndCoutries =
                order === "alpha"
                    ? capitalsAndCoutries.sort()
                    : capitalsAndCoutries.sort(shuffle);
            setChoices(orderedCapitalsAndCoutries);
        },
        [order, size]
    );

    function resetGame(): void {
        dispatch(resetGameState());
        getPlayingCountries(countriesPool);
    }

    // Loada zadnje nastavitve v optionsBaru
    useEffect(
        function () {
            const params = localStorage.getItem("storedCapitalsParams")
            router.replace(`${pathname}?${params}`);
        },
        [pathname, router]
    );

    useEffect(
        function () {
            //1) filter usaData and worldData by regioin
            function filterByRegion() {
                if (region === "USA states") return usaData;
                else {
                    return worldData?.filter((country) => {
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
            const filtered = filterByRegion();
            setCoutriesPool(filtered);
            getPlayingCountries(filtered);
        },
        [region, size, order, worldData, usaData, getPlayingCountries]
    );

    return (
        <Provider store={store}>
            <ScoreBar resetGame={resetGame} />
            <div className="grid xl:grid-cols-9 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 mt-5 gap-y-0.5">
                {choices.map((element, i) => (
                    <ButtonChoice
                        handleClick={handleClick}
                        element={element}
                        key={i}
                    />
                ))}
            </div>
            <GameOver choicesLength={choices.length} />
        </Provider>
    );
}

export default CapitalsBoard;
