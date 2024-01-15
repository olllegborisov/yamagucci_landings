import { useRouter } from 'next/router'
import type { FC } from 'react'

import useFetchPageData from '@/src/api/useFetchPageData/useFetchPageData'
import AdminCategoryPage from '@/src/components/pages/AdminCategoryPage/AdminCategoryPage'
import AdminProductPage from '@/src/components/pages/AdminProductPage/AdminProductPage'
import PublicProductPage from '@/src/components/pages/PublicProductPage/PublicProductPage'

import { WrapperTypes } from './_types'

/** динамическая страница */
const DynamicPage: FC<WrapperTypes> = ({ fullPathArray }) => {
  /** роутер */
  const { query: { slug } } = useRouter()
  /** проверка на админку */
  const isAdminPage = slug?.includes('admin')

  /** получение данных */
  const { data, isLoading } = useFetchPageData({ fullPathArray, isAdminPage })

  if (isAdminPage) {
    if (slug?.includes('categories')) {
      return (
        <AdminCategoryPage fullPathArray={fullPathArray} />
      )
    } else if (slug.includes('products')) {
      return (
        <AdminProductPage fullPathArray={fullPathArray} />
      )
    } else {
      return 'AdminDefaultPage'
    }
  } else {
    switch (data?.data?.page_type) {
      case 'product':
        return (
          <PublicProductPage
            data={data?.data}
            isLoading={isLoading}
          />
        )
      default:
        return 'NotFoundPage'
    }
  }
}

export default DynamicPage
