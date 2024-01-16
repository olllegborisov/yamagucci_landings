import { useQuery, UseQueryResult } from '@tanstack/react-query'
import Cookies from 'js-cookie'

import { axiosBearerGet } from '@/src/api/axiosInstances'
import { COOKIES, ENV_IS_STORYBOOK, RENT_TYPES_API } from '@/src/constants/constants'

import { FetchRentTypesOriginalResult, FetchRentTypesParams, FetchRentTypesQueryKeyType } from './_types'

/** ключ под которым записываем */
export const QUERY_KEY_FETCH_RENT_TYPES = 'rentTypes'

/** */
const HOST = Cookies.get(COOKIES.HOST)

/** функция запроса продуктов */
// ts-prune-ignore-next
export const getRentTypes = async ({ mockVariant }: FetchRentTypesParams): Promise<FetchRentTypesOriginalResult> => {
  console.log('HOST', HOST)

  /** дата продуктов */
  const { data } = await axiosBearerGet.get<FetchRentTypesOriginalResult>(RENT_TYPES_API,
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
const useFetchRentTypes = ({ mockVariant }: FetchRentTypesParams): UseQueryResult<FetchRentTypesOriginalResult, Error> => useQuery<FetchRentTypesOriginalResult, Error, FetchRentTypesOriginalResult, FetchRentTypesQueryKeyType>({
  queryFn: () => getRentTypes({ mockVariant }),
  queryKey: [QUERY_KEY_FETCH_RENT_TYPES, { mockVariant }]
})

export default useFetchRentTypes
