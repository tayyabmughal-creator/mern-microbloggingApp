import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authService from './authService'

//get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

//register user //deals with async data, backend //this user is going to  pass fromthe register page/comp . wewill dispatch this registr fxn from there, we will passin the user data
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.register(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

//login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.login(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {//only reducer needed to reset the state to inital values
            // we dont have to explicitly return a new state, we can directly mutate the new state
            //but what about actions ? (action.payload). create slice will automaticcally generate 
            //   action-creaters with the same name as reducer function we have written.
            //    also returns the main reducer fxn which we can used in store
        reset: (state) => {
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
            state.message = ''
        }
        //we want to be able to dispatch this fxn after we register and everything is set.. we want it to reset back to false.so with this fxn we will be able to do that
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
    }
})

export const {reset} = authSlice.actions 
export default authSlice.reducer



/*


//action - an obj with 'type' property
{
    type: 'cake_ordered'
}

//action-creator - a fxn which returns an action
function actionCreator() {
    return {
        type: 'cake_ordered'
    }
}


//reducer- a fxn that take state and action args and return the next state of app
(previousState, action) => newState
 
- an aplication will have to be represtented bysingle obj, so

const previousState = {
    no: 1
}
therefore-
 
const reducer = (previousState, action) => {} // now implement the fxn body that will  return fxn's new state based on current state and action

const reducer = (previousState, action) => {
    switch(action-type) {
        type: cake_ordered;
        return {
            noofcakes: state.noofcakes
        }
    } // exp is the action type-> switch(action-type)
}


store- key reducer - this is where we specify all the reducers from slices that belong to features


asyncthunk - to implemet the creation and dispatching of async action
1inkvoke asynchunk fxns outside the slice


asyncthunk (action-tyoe- user/fetchusers, cb that creates payload- return payload ()=>{axios.get('/') })

create async thunk - automaticallly dispatch lifecycle action based on returned promise, ie createasyncthunk generates
 rejected fulfilled pending action types, 
we listen to thse action types by with a reducer fxn 
and perform necessary state transistion, 
reducers tho are not generated
by the slice & have to added as extra reducers 
so in createslice add extra reducers: which is equal to a fxn wich take builder as args
using builder we add cases  for each of the promise lifecycle methods
addcase for each lifecycle method - .pending 
so in create slice obj add extra reducers = fxnwhich using buiders as args 
builder.addcase('actiontype' fetchuser.rejected, reducer- (state action) => { error: false }) 




*/ 