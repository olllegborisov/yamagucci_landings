import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { axiosBearerPost } from '@/src/api/axiosInstances'
import { PAGE_DATA_API } from '@/src/constants/constants'

import { FetchPageDataOriginalResult, FetchPageDataParams, FetchPageDataQueryKeyType } from './_types'

/** ключ под которым записываем */
export const QUERY_KEY_FETCH_PAGE_DATA = 'pageData'

/** функция запроса продуктов */
export const getPageData = async ({ fullPathArray }: FetchPageDataParams): Promise<FetchPageDataOriginalResult> => {
  /** дата продуктов */
  const { data } = await axiosBearerPost.post<FetchPageDataOriginalResult>(PAGE_DATA_API,
    {
      urn: fullPathArray?.length === 1 ? fullPathArray[0] : `${fullPathArray[0]}/${fullPathArray[1]}`
    })

  return data
}

/** хук запроса списка продуктов */
const useFetchPageData = ({ fullPathArray, isAdminPage }: FetchPageDataParams): UseQueryResult<FetchPageDataOriginalResult, Error> => useQuery<FetchPageDataOriginalResult, Error, FetchPageDataOriginalResult, FetchPageDataQueryKeyType>({
  enabled: !!fullPathArray && !isAdminPage,
  queryFn: () => getPageData({ fullPathArray }),
  queryKey: [QUERY_KEY_FETCH_PAGE_DATA, { fullPathArray }]
})

export default useFetchPageData
