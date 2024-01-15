import { dehydrate, QueryClient } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'
import { memo } from 'react'

import { getCategories, QUERY_KEY_FETCH_CATEGORIES } from '@/src/api/useFetchCategories/useFetchCategories'
import AdminCategoriesPage from '@/src/components/pages/AdminCategoriesPage/AdminCategoriesPage'

/** загрузка данных. */
// ts-prune-ignore-next
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // console.log('getServerSideProps', ctx.req.headers.host)

  /** queryClient */
  const queryClient = new QueryClient()

  try {
    await Promise.all([
      queryClient.prefetchQuery({
        queryFn: () => getCategories({ webApi: 'https://api.yamaguchi.ru/api' }),
        queryKey: [QUERY_KEY_FETCH_CATEGORIES, { webApi: 'https://api.yamaguchi.ru/api' }]
      })
    ])

    return {
      props: {
        dehydratedState: dehydrate(queryClient)
      }
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

// ts-prune-ignore-next
export default memo(AdminCategoriesPage)
