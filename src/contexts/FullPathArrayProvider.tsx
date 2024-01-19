import React, { ReactNode } from 'react'

import { DynamicPageTypes } from '@/src/components/pages/DynamicPage/_types'

import FullPathArrayContext from './FullPathArrayContext'

type FullPathArrayProviderTypes = {
  /** children */
  children: ReactNode
} & DynamicPageTypes

/** провайдер урла */
const FullPathArrayProvider: React.FC<FullPathArrayProviderTypes> = ({ categoryId, children, fullPathArray, productId, revalidatePath, webApi }) => {
  /** контекст */
  const contextValue = {
    categoryId,
    fullPathArray,
    productId,
    revalidatePath,
    webApi
  }

  return (
    <FullPathArrayContext.Provider value={contextValue}>
      {children}
    </FullPathArrayContext.Provider>
  )
}

export default FullPathArrayProvider
