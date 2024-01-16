import { dehydrate, QueryClient } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'
import { memo } from 'react'

import { getProducts, QUERY_KEY_FETCH_PRODUCTS } from '@/src/api/useFetchProducts/useFetchProducts'
import ProductsPage from '@/src/components/pages/AdminProductsPage/AdminProductsPage'

/** загрузка данных. */
// ts-prune-ignore-next
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // console.log('getServerSideProps', ctx.req.headers.host)

  /** queryClient */
  const queryClient = new QueryClient()

  try {
    await Promise.all([
      queryClient.prefetchQuery({
        queryFn: () => getProducts({ webApi: 'https://api.yamaguchi.ru/api' }),
        queryKey: [QUERY_KEY_FETCH_PRODUCTS, { webApi: 'https://api.yamaguchi.ru/api' }]
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
export default memo(ProductsPage)
