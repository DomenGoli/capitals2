"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks";
import { useSearchParams } from "next/navigation";

function ButtonChoice({
    element,
    handleClick,
    game = "capitals",
}: {
    element: string;
    handleClick: (answer: string) => void;
    game?: string;
}) {
    const { firstChoice, secondChoice, bulletChoice, guess, gameover } =
        useAppSelector((store) => store.game);
    // const { mode } = useAppSelector((store) => store.settings);
    const searchParams = useSearchParams();
    const mode = searchParams?.get("mode") || "classic";
    const [render, setRender] = useState<boolean>(true);


    /**
     * @function
     * @property mode, guess, firstChoice, secondChoice,
     * @sideEffect sets render, izbrise gumb, ko je guess correct
     * @returns {String} razlicne tailwind classe, ki dolocajo barvo gumba
     */
    function getColor() {
        if (game === "capitals") {
            if (mode === "bullet" && guess === "wrong") {
                if (firstChoice === element) return "bg-amber-300";
                if (secondChoice === element) return "bg-[#F88379]";
            }
            if (
                (firstChoice === element || secondChoice === element) &&
                guess === "wrong"
            )
                return "bg-[#F88379]";
            if (
                (firstChoice === element || secondChoice === element) &&
                guess === "correct"
            ) {
                setTimeout(() => {
                    setRender(false);
                }, 1000);
                return "bg-[#AFE1AF]";
            }
            if (secondChoice === element && guess === "wrong")
                return "bg-[#F88379]";
            if (firstChoice === element || secondChoice === element)
                return "bg-amber-400";
            if (bulletChoice === element) return "bg-amber-400";
            else return "bg-stone-100";
        }else if(game === "flags") {
            if(firstChoice === element && guess === "wrong") return "bg-[#F88379]"
            else return "bg-stone-100";
        }
    }


    /**
     * @description ko gameover postane na koncu true, vsi gumbi postanjo spet vidni, njihov render postane nazaj v true
     * render je postal false kadar je bil guess correct, gumb nato zgine
     */
    useEffect(
        function () {
            if (gameover) setRender(true);
        },
        [gameover]
    );

    return (
        <div>
            {render && (
                <button
                    className={`${getColor()} text-stone-700 font-bold border-3 border-transparent cursor-pointer hover:border-amber-400 w-[160px] h-[55px] overflow-y-auto`}
                    onClick={() => handleClick(element)}
                >
                    {/* <div className="truncate w-auto translate-x-[0%] ease-in-out duration-4000 hover:translate-x-full"> */}

                    {element}
                    {/* </div> */}
                </button>
            )}
            {!render && (
                <div className="w-[160px] h-[55px]"></div>
            )}
        </div>
    );
}

export default ButtonChoice;



//return "bg-[#89CFF0]"; // old barva gumba