/* Instruments */
import type { ReduxState } from '@/lib/redux'

export const selectJobs = (state: ReduxState) => state.jobs.list
