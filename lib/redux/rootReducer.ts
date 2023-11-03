/* Instruments */
import { counterSlice } from './slices'
import { jobsSlice } from './slices'

export const reducer = {
  counter: counterSlice.reducer,
  jobs: jobsSlice.reducer,
}
