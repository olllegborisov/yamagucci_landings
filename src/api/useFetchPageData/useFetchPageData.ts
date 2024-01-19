import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { CommonFetchParams } from '@/src/api/_types'
import { axiosBearerPost } from '@/src/api/axiosInstances'
import { PAGE_DATA_API } from '@/src/constants/constants'

import { FetchPageDataOriginalResult, FetchPageDataParams, FetchPageDataQueryKeyType } from './_types'

/** ключ под которым записываем */
export const QUERY_KEY_FETCH_PAGE_DATA = 'pageData'

/** функция запроса продуктов */
export const getPageData = async ({ fullPathArray, webApi }: FetchPageDataParams & CommonFetchParams): Promise<FetchPageDataOriginalResult> => {
  /** дата продуктов */
  const { data } = await axiosBearerPost.post<FetchPageDataOriginalResult>(webApi + PAGE_DATA_API,
    {
      urn: fullPathArray?.length === 1 ? fullPathArray[0] : fullPathArray?.length === 2 ? fullPathArray[1] : `${fullPathArray[1]}/${fullPathArray[2]}`
    }
  )

  return data
}

/** хук запроса списка продуктов */
const useFetchPageData = ({ fullPathArray, isAdminPage, webApi }: FetchPageDataParams & CommonFetchParams): UseQueryResult<FetchPageDataOriginalResult, Error> => useQuery<FetchPageDataOriginalResult, Error, FetchPageDataOriginalResult, FetchPageDataQueryKeyType>({
  enabled: fullPathArray?.length && !isAdminPage,
  queryFn: () => getPageData({ fullPathArray, webApi }),
  queryKey: [QUERY_KEY_FETCH_PAGE_DATA, { fullPathArray, webApi }]
})

export default useFetchPageData
