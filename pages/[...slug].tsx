import { dehydrate, QueryClient } from '@tanstack/react-query'
import { GetStaticProps } from 'next'
import { memo } from 'react'

import { getCategory, QUERY_KEY_FETCH_CATEGORY } from '@/src/api/useFetchCategory/useFetchCategory'
import { FetchPageDataOriginalResult } from '@/src/api/useFetchPageData/_types'
import { getPageData, QUERY_KEY_FETCH_PAGE_DATA } from '@/src/api/useFetchPageData/useFetchPageData'
import DynamicPage from '@/src/components/pages/DynamicPage/DynamicPage'

/** загрузка данных. */
// ts-prune-ignore-next
export const getStaticProps: GetStaticProps = async (ctx) => {
  /** queryClient */
  const queryClient = new QueryClient()

  /** слаг */
  const fullPathArray = ctx?.params?.slug
  // eslint-disable-next-line no-console
  console.log('slug from ...SLUG', fullPathArray)

  /** categoryId */
  const categoryId = fullPathArray?.includes('categories') ? fullPathArray?.[3] : undefined

  try {
    await Promise.all([
      queryClient.prefetchQuery({
        queryFn: () => getPageData({ fullPathArray }),
        queryKey: [QUERY_KEY_FETCH_PAGE_DATA, { fullPathArray }]
      }),
      queryClient.prefetchQuery({
        queryFn: () => getCategory({ categoryId, webApi: 'https://api.yamaguchi.ru/api' }),
        queryKey: [QUERY_KEY_FETCH_CATEGORY, { categoryId, webApi: 'https://api.yamaguchi.ru/api' }]
      })
    ])

    /** список продуктов */
    const page: FetchPageDataOriginalResult = queryClient.getQueryData([QUERY_KEY_FETCH_PAGE_DATA, { fullPathArray }])

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
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
        fullPathArray
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
