import { configureStore } from "@reduxjs/toolkit";
import { blogsApi } from "./Services/BlogsApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store=configureStore({
    reducer:{
        [blogsApi.reducerPath]:blogsApi.reducer
    },
    middleware: (getDefaultMiddleware) => 
         getDefaultMiddleware({
            serializableCheck: false
         }).concat(blogsApi.middleware), // here value of 'APISlice.middleware' also will be automatically generated from APISlice
                                                                   // and value of 'APISlice.middleware' will concat with default middleware of redux toolkit 
    
})

// Set up automatic listeners for query lifecycle events,like fulfilled,fetched,reverted
//By setting up these listeners, you can handle UI updates or other side effects based on the state 
//changes of your API slices without manually dispatching actions for each event.
setupListeners(store.dispatch);