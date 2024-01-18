import type { FC } from 'react'
import React from 'react'

import useFetchPageData from '@/src/api/useFetchPageData/useFetchPageData'
import AdminCategoryPage from '@/src/components/pages/AdminCategoryPage/AdminCategoryPage'
import AdminProductPage from '@/src/components/pages/AdminProductPage/AdminProductPage'
import PublicProductPage from '@/src/components/pages/PublicProductPage/PublicProductPage'
import FullPathArrayProvider from '@/src/contexts/FullPathArrayProvider'

import { WrapperTypes } from './_types'

/** динамическая страница */
const DynamicPage: FC<WrapperTypes> = ({ fullPathArray }) => {
  /** проверка на админку */
  const isAdminPage = fullPathArray?.includes('admin')

  /** получение данных */
  const { data, isLoading } = useFetchPageData({ fullPathArray, isAdminPage, webApi: 'https://api.yamaguchi.ru/api' })

  return (
    <FullPathArrayProvider fullPathArray={fullPathArray}>
      {isAdminPage
        ? (
          fullPathArray?.includes('categories')
            ? (
              <AdminCategoryPage />
            )
            : fullPathArray.includes('products')
              ? (
                <AdminProductPage />
              )
              : (
                'AdminDefaultPage'
              )
        )
        : data?.data?.page_type === 'product'
          ? (
            <PublicProductPage
              data={data?.data}
              isLoading={isLoading}
            />
          )
          : (
            'NotFoundPage'
          )}
    </FullPathArrayProvider>
  )
}

export default DynamicPage
