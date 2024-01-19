import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { CommonFetchParams } from '@/src/api/_types'
import { axiosBearerGet } from '@/src/api/axiosInstances'
import { CATEGORY_API } from '@/src/constants/constants'

import { FetchCategoryOriginalResult, FetchCategoryParams, FetchCategoryQueryKeyType } from './_types'

/** ключ под которым записываем */
export const QUERY_KEY_FETCH_CATEGORY = 'category'

/** функция запроса продуктов */
export const getCategory = async ({ categoryId, webApi }: CommonFetchParams & FetchCategoryParams): Promise<FetchCategoryOriginalResult> => {
  /** дата продуктов */
  const { data } = await axiosBearerGet.get<FetchCategoryOriginalResult>(`${webApi}${CATEGORY_API}/${categoryId}`)

  return data
}

/** хук запроса списка продуктов */
const useFetchCategory = ({ categoryId, webApi }:CommonFetchParams & FetchCategoryParams): UseQueryResult<FetchCategoryOriginalResult, Error> => useQuery<FetchCategoryOriginalResult, Error, FetchCategoryOriginalResult, FetchCategoryQueryKeyType>({
  enabled: !!categoryId,
  queryFn: () => getCategory({ categoryId, webApi }),
  queryKey: [QUERY_KEY_FETCH_CATEGORY, { categoryId, webApi }]
})

export default useFetchCategory
