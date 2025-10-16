import { useAppSelector } from "../hooks";

function GameOver({choicesLength}: {choicesLength: number}) {
    const { score, tries } = useAppSelector((store) => store.game);
    // const { choices } = useAppSelector((store) => store.data);

    if (score !== choicesLength / 2) return null;

    return (
        <div className="fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
            <p className="text-[3rem]">GAME OVER, uspesnost {Math.floor((score / tries) * 100)}%</p>
        </div>
    );
}

export default GameOver;


