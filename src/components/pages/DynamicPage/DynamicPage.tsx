import type { FC } from 'react'

import useFetchPageData from '@/src/api/useFetchPageData/useFetchPageData'
import AdminCategoryPage from '@/src/components/pages/AdminCategoryPage/AdminCategoryPage'
import AdminProductPage from '@/src/components/pages/AdminProductPage/AdminProductPage'
import PublicProductPage from '@/src/components/pages/PublicProductPage/PublicProductPage'

import { WrapperTypes } from './_types'

/** динамическая страница */
const DynamicPage: FC<WrapperTypes> = ({ fullPathArray }) => {
  /** проверка на админку */
  const isAdminPage = fullPathArray?.includes('admin')

  /** получение данных */
  const { data, isLoading } = useFetchPageData({ fullPathArray, isAdminPage, webApi: 'https://api.yamaguchi.ru/api' })

  if (isAdminPage) {
    if (fullPathArray?.includes('categories')) {
      return (
        <AdminCategoryPage fullPathArray={fullPathArray} />
      )
    } else if (fullPathArray.includes('products')) {
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
