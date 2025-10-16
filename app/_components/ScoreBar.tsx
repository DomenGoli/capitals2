// import { resetGameState } from "../_slices/gameSlice";
import { useAppSelector } from "../hooks";

function ScoreBar({resetGame}: {resetGame: ()=>void}) {
    const { score, tries } = useAppSelector((store) => store.game);
    // const dispatch = useAppDispatch();

    // function handleReset() {
    //     dispatch(resetGameState())
    // }

    return (
        <div className="flex items-center gap-5">
            <button onClick={resetGame}>Nova igra</button>
            <div className="text-[1.2rem]">Pravilno: {score}</div>
            <div className="text-[1.2rem]">Poskusi: {tries}</div>
        </div>
    );
}

export default ScoreBar;
