import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { axiosBearerPost } from '@/src/api/axiosInstances'
import { ENV_IS_STORYBOOK, USER_API } from '@/src/constants/constants'

import { FetchMeOriginalResult, FetchMeParams, FetchMeQueryKeyType } from './_types'

/** ключ под которым записываем */
export const QUERY_KEY_FETCH_USER = 'user'

/** функция запроса продуктов */
// ts-prune-ignore-next
export const getUser = async ({ mockVariant, webApi }: FetchMeParams): Promise<FetchMeOriginalResult> => {
  /** дата продуктов */
  const { data } = await axiosBearerPost.post<FetchMeOriginalResult>(webApi + USER_API,
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
const useFetchUser = ({ mockVariant, webApi }: FetchMeParams): UseQueryResult<FetchMeOriginalResult, Error> => useQuery<FetchMeOriginalResult, Error, FetchMeOriginalResult, FetchMeQueryKeyType>({
  queryFn: () => getUser({ mockVariant, webApi }),
  queryKey: [QUERY_KEY_FETCH_USER, { mockVariant, webApi }]
})

export default useFetchUser
