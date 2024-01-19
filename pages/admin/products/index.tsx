import { dehydrate, QueryClient } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'
import { memo } from 'react'

import { getProducts, QUERY_KEY_FETCH_PRODUCTS } from '@/src/api/useFetchProducts/useFetchProducts'
import ProductsPage from '@/src/components/pages/AdminProductsPage/AdminProductsPage'
import { getBaseUrlApi } from '@/src/lib/getBaseUrlApi'

/** загрузка данных. */
// ts-prune-ignore-next
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  /** queryClient */
  const queryClient = new QueryClient()
  /** host */
  const host = ctx.req.headers.host
  /** webApi */
  const webApi = getBaseUrlApi(host)

  try {
    await Promise.all([
      queryClient.prefetchQuery({
        queryFn: () => getProducts({ webApi }),
        queryKey: [QUERY_KEY_FETCH_PRODUCTS, { webApi }]
      })
    ])

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        webApi
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
