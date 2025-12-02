import { createSlice } from "@reduxjs/toolkit";

type InitialStateType = {
    numDisplayedPairs: number;
    order: string;
    region: string;
    mode: string;
};

//// Loada data iz local storage
function loadLocalStoredData() {
    const storedValue = localStorage.getItem("capitolSettings");
    return storedValue
        ? JSON.parse(storedValue)
        : {};
}

const initialState: InitialStateType = {
    numDisplayedPairs: Number(loadLocalStoredData().numDisplayedPairs) || 10,
    order: loadLocalStoredData().order || "random",
    region: loadLocalStoredData().region || "Europe",
    mode: loadLocalStoredData().mode || "Classic",
};

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setNumDisplayedPairs(state, action) {
            state.numDisplayedPairs = action.payload;
            localStorage.setItem("capitolSettings", JSON.stringify({ ...state }));
        },
        setOrder(state, action) {
            state.order = action.payload;
            localStorage.setItem("capitolSettings", JSON.stringify({ ...state }));
        },
        setRegion(state, action) {
            state.region = action.payload;
            localStorage.setItem("capitolSettings", JSON.stringify({ ...state }));
        },
        setMode(state, action) {
            state.mode = action.payload;
            localStorage.setItem("capitolSettings", JSON.stringify({ ...state }));
        },
    },
});

export const { setNumDisplayedPairs, setOrder, setRegion, setMode } = settingsSlice.actions;
export default settingsSlice.reducer;
