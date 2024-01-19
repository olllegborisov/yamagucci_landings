import { dehydrate, QueryClient } from '@tanstack/react-query'
import { GetStaticProps } from 'next'
import { memo } from 'react'

import { getCategory, QUERY_KEY_FETCH_CATEGORY } from '@/src/api/useFetchCategory/useFetchCategory'
import { FetchPageDataOriginalResult } from '@/src/api/useFetchPageData/_types'
import { getPageData, QUERY_KEY_FETCH_PAGE_DATA } from '@/src/api/useFetchPageData/useFetchPageData'
import { getProduct, QUERY_KEY_FETCH_PRODUCT } from '@/src/api/useFetchProduct/useFetchProduct'
import DynamicPage from '@/src/components/pages/DynamicPage/DynamicPage'
import { getBaseUrlApi } from '@/src/lib/getBaseUrlApi'

/** загрузка данных. */
// ts-prune-ignore-next
export const getStaticProps: GetStaticProps = async (ctx) => {
  /** queryClient */
  const queryClient = new QueryClient()

  /** слаг */
  const fullPathArray = ctx?.params?.slug as string[]
  // eslint-disable-next-line no-console
  console.log('FULL PATH ARRAY from STATICPROPS:', fullPathArray)

  /** путь для ревалидации страницы */
  const revalidatePath = `/${fullPathArray.join('/')}`
  /** проверка на админку */
  const isAdminPage = fullPathArray?.includes('admin')
  /** categoryId */
  const categoryId = fullPathArray?.includes('categories') ? fullPathArray?.[3] : null
  /** categoryId */
  const productId = fullPathArray?.includes('products') ? fullPathArray?.[3] : null
  /** базовое api url */
  const webApi = getBaseUrlApi(fullPathArray[0])

  try {
    await Promise.all([
      queryClient.prefetchQuery({
        queryFn: () => getPageData({ fullPathArray, webApi }),
        queryKey: [QUERY_KEY_FETCH_PAGE_DATA, { fullPathArray, webApi }]
      }),
      queryClient.prefetchQuery({
        queryFn: () => getCategory({ categoryId, webApi }),
        queryKey: [QUERY_KEY_FETCH_CATEGORY, { categoryId, webApi }]
      }),
      queryClient.prefetchQuery({
        queryFn: () => getProduct({ productId, webApi }),
        queryKey: [QUERY_KEY_FETCH_PRODUCT, { productId, webApi }]
      })
    ])

    /** список продуктов */
    const page: FetchPageDataOriginalResult = queryClient.getQueryData([QUERY_KEY_FETCH_PAGE_DATA, { fullPathArray, webApi }])

    if (!page?.data?.page_type && !fullPathArray.includes('admin')) {
      return {
        redirect: {
          destination: '/404',
          permanent: false
        }
      }
    }

    return {
      props: {
        categoryId,
        dehydratedState: dehydrate(queryClient),
        fullPathArray,
        isAdminPage,
        productId,
        revalidatePath,
        webApi
      },
      revalidate: 1800
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)

    return {
      redirect: {
        destination: '/404',
        permanent: false
      }
    }
  }
}

/** получем пути */
// ts-prune-ignore-next
export const getStaticPaths = async (): Promise<any> => ({
  fallback: 'blocking',
  paths: []
})

// ts-prune-ignore-next
export default memo(DynamicPage)
