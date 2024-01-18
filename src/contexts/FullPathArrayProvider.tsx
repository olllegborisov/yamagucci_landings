import React, { ReactNode } from 'react'

import FullPathArrayContext from './FullPathArrayContext'

type FullPathArrayProviderTypes = {
  /** children */
  children: ReactNode
  /** fullPathArray */
  fullPathArray: string[]
}

/** провайдер урла */
const FullPathArrayProvider: React.FC<FullPathArrayProviderTypes> = ({ children, fullPathArray }) => (
  <FullPathArrayContext.Provider value={fullPathArray}>
    {children}
  </FullPathArrayContext.Provider>
)

export default FullPathArrayProvider
