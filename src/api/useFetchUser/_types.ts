import { CommonFetchParams } from '@/src/api/_types'
import { paths as schema } from '@/src/types/schema'

import { QUERY_KEY_FETCH_USER } from './useFetchUser'

export type FetchMeOriginalResult = schema['/api/auth/me']['post']['responses']['200']['content']['application/json']

/** тип ключа */
export type FetchMeQueryKeyType = [typeof QUERY_KEY_FETCH_USER, CommonFetchParams];

export type FetchMeParams = {
  /** mockVariant */
  mockVariant?:string
}
