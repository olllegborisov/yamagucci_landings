import { CommonFetchParams } from '@/src/api/_types'
import { paths as schema } from '@/src/types/schema'

import { QUERY_KEY_FETCH_SIZE_TYPES } from './useFetchSizeTypes'

export type FetchSizeTypesOriginalResult = schema['/api/admin/sizes']['get']['responses']['200']['content']['application/json']

/** тип ключа */
export type FetchSizeTypesQueryKeyType = [typeof QUERY_KEY_FETCH_SIZE_TYPES, CommonFetchParams];

export type FetchSizeTypesParams = {
  /** mockVariant */
  mockVariant?:string
}
