import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { CommonFetchParams } from '@/src/api/_types'
import { axiosBearerGet } from '@/src/api/axiosInstances'
import { PRODUCTS_API } from '@/src/constants/constants'

import { FetchProductsOriginalResult, FetchProductsQueryKeyType } from './_types'

/** ключ под которым записываем */
export const QUERY_KEY_FETCH_PRODUCTS = 'products'

/** функция запроса продуктов */
export const getProducts = async ({ webApi }: CommonFetchParams): Promise<FetchProductsOriginalResult> => {
  /** дата продуктов */
  const { data } = await axiosBearerGet.get<FetchProductsOriginalResult>(webApi + PRODUCTS_API)

  return data
}

/** хук запроса списка продуктов */
const useFetchProducts = ({ webApi }: CommonFetchParams): UseQueryResult<FetchProductsOriginalResult, Error> => useQuery<FetchProductsOriginalResult, Error, FetchProductsOriginalResult, FetchProductsQueryKeyType>({
  queryFn: () => getProducts({ webApi }),
  queryKey: [QUERY_KEY_FETCH_PRODUCTS, { webApi }]
})

export default useFetchProducts
