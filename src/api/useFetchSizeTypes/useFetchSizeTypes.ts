import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { CommonFetchParams } from '@/src/api/_types'
import { axiosBearerGet } from '@/src/api/axiosInstances'
import { ENV_IS_STORYBOOK, SIZE_TYPES_API } from '@/src/constants/constants'

import { FetchSizeTypesOriginalResult, FetchSizeTypesQueryKeyType } from './_types'

/** ключ под которым записываем */
export const QUERY_KEY_FETCH_SIZE_TYPES = 'sizeTypes'

/** функция запроса продуктов */
// ts-prune-ignore-next
export const getSizeTypes = async ({ mockVariant, webApi }: CommonFetchParams): Promise<FetchSizeTypesOriginalResult> => {
  /** дата продуктов */
  const { data } = await axiosBearerGet.get<FetchSizeTypesOriginalResult>(webApi + SIZE_TYPES_API,
    {
      params: {
        ...Object.assign(
          {},
          ENV_IS_STORYBOOK && { mockVariant }
        )
      }
    }
  )

  return data
}

/** хук запроса списка продуктов */
const useFetchSizeTypes = ({ mockVariant, webApi }: CommonFetchParams): UseQueryResult<FetchSizeTypesOriginalResult, Error> => useQuery<FetchSizeTypesOriginalResult, Error, FetchSizeTypesOriginalResult, FetchSizeTypesQueryKeyType>({
  queryFn: () => getSizeTypes({ mockVariant, webApi }),
  queryKey: [QUERY_KEY_FETCH_SIZE_TYPES, { mockVariant, webApi }]
})

export default useFetchSizeTypes
