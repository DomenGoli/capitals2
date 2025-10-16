"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks";

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
    const { mode } = useAppSelector((store) => store.settings);
    const [render, setRender] = useState<boolean>(true);

    function getColor() {
        if (game === "capitals") {
            if (mode === "bullet" && guess === "wrong") {
                if (firstChoice === element) return "bg-amber-400";
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
//return "bg-[#89CFF0]";
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
                    className={`${getColor()} text-stone-700 p-[0.6rem_1.2rem] font-bold rounded-2xl border-3 border-transparent cursor-pointer hover:border-amber-400`}
                    onClick={() => handleClick(element)}
                >
                    {element}
                </button>
            )}
        </div>
    );
}

export default ButtonChoice;
