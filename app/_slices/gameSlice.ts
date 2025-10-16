import { createSlice } from "@reduxjs/toolkit";

type InitialStateType = {
    firstChoice: string;
    secondChoice: string;
    bulletChoice: string;
    guess: string;
    score: number;
    tries: number;
    gameover: boolean;
};

const initialState: InitialStateType = {
    firstChoice: "",
    secondChoice: "",
    bulletChoice: "",
    guess: "",
    score: 0,
    tries: 0,
    gameover: false,
};

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        setFirstChoice(state, action) {
            state.firstChoice = action.payload;
        },
        setSecondChoice(state, action) {
            state.secondChoice = action.payload;
        },
        setBulletChoice(state, action) {
            state.bulletChoice = action.payload;
        },
        setGuess(state, action) {
            state.guess = action.payload;
        },
        setScore(state) {
            state.score += 1;
        },
        setTries(state) {
            state.tries = state.tries + 1;
        },
        setGameover(state, action) {
            state.gameover = action.payload;
        },
        resetGameState() {
            return {...initialState, gameover: true}
        }
    },
});

export default gameSlice.reducer;
export const {
    setFirstChoice,
    setSecondChoice,
    setBulletChoice,
    setGuess,
    setScore,
    setTries,
    setGameover,
    resetGameState
} = gameSlice.actions;
