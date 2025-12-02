import { createSlice } from "@reduxjs/toolkit"

type CountryObjectType = {
    drzava: string;
    kapitol: string;
    region?: string;
};

type InitialStateType = {
    workData: [];
    choices: string[];
    resultsArray: CountryObjectType[];
    allCountriesInRegion: number;
    apiData: CountryObjectType[]
}

const initialState: InitialStateType = {
    workData: [],
    choices: [],
    resultsArray: [],
    allCountriesInRegion: 10,
    apiData: [],
}

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        setData(state, action) {
            state.workData = action.payload
        },
        setChoices(state, action) {
            state.choices = action.payload
        },
        setResultsArray(state, action) {
            state.resultsArray = action.payload
        },
        setAllCountriesInRegion(state, action) {
            state.allCountriesInRegion = action.payload
        },
        setApiData(state,action) {
            state.apiData = action.payload
        }
        // resetBoard(state) {
        //     return {...state}
        // }

    }
})


export default dataSlice.reducer
export const {setData, setChoices, setResultsArray, setAllCountriesInRegion,setApiData } = dataSlice.actions