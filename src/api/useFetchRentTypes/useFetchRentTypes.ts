import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { CommonFetchParams } from '@/src/api/_types'
import { axiosBearerGet } from '@/src/api/axiosInstances'
import { ENV_IS_STORYBOOK, RENT_TYPES_API } from '@/src/constants/constants'

import { FetchRentTypesOriginalResult, FetchRentTypesQueryKeyType } from './_types'

/** ключ под которым записываем */
export const QUERY_KEY_FETCH_RENT_TYPES = 'rentTypes'

/** функция запроса продуктов */
// ts-prune-ignore-next
export const getRentTypes = async ({ mockVariant, webApi }: CommonFetchParams): Promise<FetchRentTypesOriginalResult> => {
  /** дата продуктов */
  const { data } = await axiosBearerGet.get<FetchRentTypesOriginalResult>(webApi + RENT_TYPES_API,
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
const useFetchRentTypes = ({ mockVariant, webApi }: CommonFetchParams): UseQueryResult<FetchRentTypesOriginalResult, Error> => useQuery<FetchRentTypesOriginalResult, Error, FetchRentTypesOriginalResult, FetchRentTypesQueryKeyType>({
  queryFn: () => getRentTypes({ mockVariant, webApi }),
  queryKey: [QUERY_KEY_FETCH_RENT_TYPES, { mockVariant, webApi }]
})

export default useFetchRentTypes
