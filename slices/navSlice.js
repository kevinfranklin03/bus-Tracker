import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    origin: null,
    travelTimeInformation: null
}


// Slices are used to send data to different pages.

export const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        setOrigin: (state, action) => {
            state.origin = action.payload
        },
        setTravelTimeInformation: (state, action) => {
            state.travelTimeInformation = action.payload
        }
    }
})

export const { setOrigin, setTravelTimeInformation } = navSlice.actions

// Selectors

export const selectOrigin = (state) => state.nav.origin
export const selectTravelTimeInformation = (state) => state.nav.travelTimeInformation

export default navSlice.reducer;