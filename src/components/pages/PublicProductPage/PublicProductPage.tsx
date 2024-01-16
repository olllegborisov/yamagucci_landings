import type { FC } from 'react'

import Landing from '@/src/components/Landing/Landing'
import ProductHero from '@/src/components/ProductHero/ProductHero'

import { PublicProductPageTypes } from './_types'

/** temp */
const PublicProductPage: FC<PublicProductPageTypes> = ({ data, isLoading }) => (
  <>
    <ProductHero
      isLoading={isLoading}
      {...data?.product}
    />
    <Landing landingName='superlight' />
  </>
)

export default PublicProductPage
