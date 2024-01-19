import type { FC } from 'react'
import React from 'react'

import useFetchPageData from '@/src/api/useFetchPageData/useFetchPageData'
import AdminCategoryPage from '@/src/components/pages/AdminCategoryPage/AdminCategoryPage'
import AdminProductPage from '@/src/components/pages/AdminProductPage/AdminProductPage'
import PublicProductPage from '@/src/components/pages/PublicProductPage/PublicProductPage'
import FullPathArrayProvider from '@/src/contexts/FullPathArrayProvider'

import { DynamicPageTypes } from './_types'

/** динамическая страница */
const DynamicPage: FC<DynamicPageTypes> = ({ categoryId, fullPathArray, isAdminPage, productId, revalidatePath, webApi }) => {
  /** получение данных */
  const { data, isLoading } = useFetchPageData({ fullPathArray, isAdminPage, webApi })

  return (
    <FullPathArrayProvider
      categoryId={categoryId}
      fullPathArray={fullPathArray}
      productId={productId}
      revalidatePath={revalidatePath}
      webApi={webApi}
    >
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
