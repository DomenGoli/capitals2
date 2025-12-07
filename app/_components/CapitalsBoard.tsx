"use client";
import { Provider } from "react-redux";
import {
    resetGameState,
    setBulletChoice,
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
import { useCallback, useEffect, useRef, useState } from "react";
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
    const { firstChoice, secondChoice, bulletChoice, guess } = useAppSelector(
        (store) => store.game
    );
    const dispatch = useAppDispatch();
    const searchParams = useSearchParams();
    const order = searchParams?.get("order") || "alpha";
    const size = Number(searchParams?.get("size")) || 10;
    const region = searchParams?.get("region") || "USA states";
    const mode = searchParams?.get("mode") || "bullet";

    const refBulletArray = useRef<CountryType[]>([]);
    const refBulletChoice = useRef<string>("");

    /**
     * @function
     * @description procesira klik na gameBoard gumb
     * glede na mode, 1.) Bullet mode in 2.) Classic mode
     * @property mode - iz URL params
     * @param {string} answer
     */
    function handleTileClick(answer: string): void {
        /**
         * @description forcamo gameover state
         * @sideEffect redux action -> setGameOver
         */
        dispatch(setGameover(false));

        // Bullet Mode
        if (mode === "bullet") {
            /**
             * @description ob prvem bullet kliku ustvari svoj refBulletArray iz countries<Object> in ga premesa(da ne gre bulletChoice)
             * !!! bulletChoice je firstChoice, ki ga app avtomatkso random ponudi/dodeli
             * iz refBulletArraya crpamo bulletChoice
             * @sideEffect new refBulletArray
             */
            if (!secondChoice) {
                refBulletArray.current = [...countries].sort(shuffle);

                /**
                 * @description Najde index od prvega bullet mode stringa (firstChoice), ki je bil izbran ob zacetku bullet igre v getPlayingCountries
                 * @sideEffect odstrani najden indexed object v refBulletArrayu
                 * @sideEffect new refBulletChoice = firstChoice (ki je bil podan ob bullet init), ta choice se bo nadlajno vsakic avtomatsko dodelio
                 */
                const firstRandomBulletChoiceIndex =
                    refBulletArray.current.findIndex(
                        (country) =>
                            firstChoice === country.country ||
                            firstChoice === country.capital
                    );
                refBulletArray.current.splice(firstRandomBulletChoiceIndex, 1);
                refBulletChoice.current = firstChoice;
            }

            /**
             * @description sinhronizira refBulletChoice in bulletChoice v reduxu
             * !!! firstChoice, bulletChoice in refBulletChoice se konstanton sinhronizirajo. Vrednost se avtomatkso dodeli ob vsakem pravilnem kliku
             * refBulletChoice je potreben za resitev stale stata
             */
            if (bulletChoice) {
                refBulletChoice.current = bulletChoice;
                dispatch(setFirstChoice(bulletChoice));
            }

            /**
             * @description preveri rezultat, ce sta answer(nas klik) in refBulletChoice value v istem objectu
             * @functionCall checkAnswers
             * @sideEffect ce je checkAnswer true, odstranimo iz refBulletArraya nov object, hkrati pa iz njega random vzamemo value in ga posredujemo v redux kot naslednji bulletChoice
             */
            const check = checkAnswers(answer, refBulletChoice.current);
            if (check) {
                const nextBulletCountry = refBulletArray.current.pop();
                dispatch(
                    setBulletChoice(
                        Math.floor(Math.random() * 2)
                            ? nextBulletCountry?.country
                            : nextBulletCountry?.capital
                    )
                );
            }
        }

        // Classic Mode
        else {
            /**
             * @description guard clause - prepreci dvoklik na pravilen rezultat
             */
            if (answer === secondChoice && guess === "correct") return;

            /**
             * @description forcamo gameover state
             * @sideEffect redux action -> setGameOver
             */
            dispatch(setGameover(false));

            /**
             * @description lahko odznacimo prvi izbor na game boardu
             * @sideEffect redux action -> zbrise firstChoice
             */
            if (firstChoice && firstChoice === answer && !secondChoice) {
                dispatch(setFirstChoice(""));
                return;
            } else if (firstChoice && secondChoice) {
                /**
                 * @description primer ko obstajata dva oznacena redeca gumba
                 * nov klik bo zbrisal state in oznacil nov firstChoice
                 * @sideEffect redux action -> izbrise guess, izbrise secondChoice
                 * @sideEffect redux action -> setFirstChoice - nov klik na gameBoard button
                 */
                dispatch(setGuess(""));
                dispatch(setFirstChoice(answer));
                dispatch(setSecondChoice(""));
            } else if (firstChoice && !secondChoice) {
                /**
                 * @description ko izbiramo drugi izbor
                 * @functionCall checkAnswers - args = firstChoice in nas drugi izbor
                 */
                // case ko izbiramo drugi izbor
                checkAnswers(answer, firstChoice);
            } else if (!firstChoice && !secondChoice)
                /**
                 * @description ko izbiramo prvi izbor
                 * @sideEffect redux action -> setFirstChoice - nas izbor
                 */
                dispatch(setFirstChoice(answer)); // case: ni izbora
        }
    }

    /**
     * @function
     * @description preveri ce sta firstChoice in secondChoice values v istem objectu
     * @param {String} answer - secondChoice
     * @param {String} compare - firstChoice
     * @sideEffect redux actions -> setSecondChoice, setGuess, setScore, setTries
     * @returns true | false
     */
    function checkAnswers(answer: string, compare: string): boolean {
        dispatch(setSecondChoice(answer));

        // if(answer === compare) return false;

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
                        if (answer !== compare) dispatch(setTries());
                    }
                } else if (countries[i].capital === compare) {
                    if (countries[i].country === answer) {
                        dispatch(setGuess("correct"));
                        dispatch(setScore());
                        dispatch(setTries());
                        return true;
                    } else {
                        dispatch(setGuess("wrong"));
                        if (answer !== compare) dispatch(setTries());
                    }
                }
            }
        }
        return false;
    }

    /**
     * @function
     * @description filtrira po izbrani kolicini drzav,
     * ustvari array moznosti za gameBoardButtons (drzave + mesta)
     * razvrsti gumbe gameBoardButtons po abecedi ali random
     * preveri ce je bulletMode in inita bulletMode
     *
     * @param {[Object]} countries - array regijsko filtriranih objektov
     * @property size, order, mode - iz URL params
     * @sideEffect sets countries - array kolicinsko filtrtiranih country objectov - nasa playing data osnova
     * @sideEffect sets choices - array stringov (drzave + mesta) (ordered alpha ali random)
     * @sideEffect if(bulletMode) -> redux action -> setFirstChoice - posreduje en random string iz capitalAndCountries (choices)
     */
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

            //5) Bullet mode
            if (mode === "bullet") {
                const randomIndex = Math.floor(
                    Math.random() * capitalsAndCoutries.length
                );
                dispatch(setFirstChoice(capitalsAndCoutries[randomIndex]));
            }
        },
        [order, size, mode, dispatch]
    );

    /**
     * @description resetira game state
     * @sideEffect redux action -> resetGameState
     * @functionCall getPlayingCountries - argument = regijsko filtriran array country object, ponastavimo data osnovo appa
     */
    function resetGame(): void {
        dispatch(resetGameState());
        getPlayingCountries(countriesPool);
    }

    /**
     * @function
     * @description generira stevilo stolpcev grida glede na kolicino moznosti
     * @property size, screen.width
     * @returns {String} for gridTemplateColumns style property
     */
    function getGrid() {
        if (screen.width > 500) {
            if (size < 5) return "repeat(2, minmax(0, 1fr))";
            else if (size < 10) return "repeat(3, minmax(0, 1fr))";
            else if (size < 19) return "repeat(4, minmax(0, 1fr))";
            else if (size < 25) return "repeat(5, minmax(0, 1fr))";
            else if (size < 31) return "repeat(6, minmax(0, 1fr))";
            else if (size < 39) return "repeat(7, minmax(0, 1fr))";
            else if (size < 44) return "repeat(8, minmax(0, 1fr))";
            else if (size < 50) return "repeat(9, minmax(0, 1fr))";
            else if (size < 60) return "repeat(10, minmax(0, 1fr))";
        } else return "repeat(2, minmax(0, 1fr))";
    }

    /**
     * @description Loada zadnje nastavitve v optionsBaru in jih vstavi v URL paramse
     * @sideEffect set options in URL params
     */
    useEffect(
        function () {
            const params = localStorage.getItem("storedCapitalsParams");
            router.replace(`${pathname}?${params}`);
        },
        [pathname, router]
    );

    /**
     * @description Initial effect, sprejme API data in filtrira glede na regio options
     * @param {Promise<[Object]>} worldData - array country object
     * @param {[Object]} usaData - array coutry object
     * @functionCall getPlayingCountries - argument = array filtiranih country objectov
     * @sideEffect sets countriesPool - array regijsko filtriranih country objectov, nasa data osnova s katero operiramo med instanco appa
     * @todo filterByRegion se uporablja tudi v CapitalsBoard.tsx -> izvozi funkcijo in jo uporabi v obeh fajlih
     */
    useEffect(
        function () {
            dispatch(resetGameState());
            //1) filtrira usaData ali worldData po regiji
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
        [region, size, order, worldData, usaData, getPlayingCountries, dispatch]
    );

    return (
        <Provider store={store}>
            <ScoreBar resetGame={resetGame} />
            <div
                style={{ gridTemplateColumns: getGrid() }}
                className="grid mt-5 gap-y-1 gap-x-1"
            >
                {/* <div className="grid xl:grid-cols-9 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 mt-5 gap-y-1 gap-x-1"> */}
                {choices.map((element, i) => (
                    <ButtonChoice
                        handleClick={handleTileClick}
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
