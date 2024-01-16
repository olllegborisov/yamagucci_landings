import { useQueryClient } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import dynamic from 'next/dynamic'
import Router from 'next/router'
import { type FC, HTMLAttributes, PropsWithChildren, useCallback } from 'react'

import { COOKIES } from '@/src/constants/constants'

import { DynamicLayoutTypes } from './_types'
import styles from './DynamicLayout.module.scss'

/** динамический компонент хэдера */
const AdminHeader = dynamic(() => import('./AdminHeader/AdminHeader'), { ssr: true })
/** динамический компонент хэдера */
const PublicHeader = dynamic(() => import('@/src/components/DynamicLayout/PublicHeader/PublicHeader'), { ssr: true })
/** динамический компонент навигации */
const AdminNavigation = dynamic(() => import('./AdminNavigation/AdminNavigation'), { ssr: false })

/** компонент динамического лейаута */
const DynamicLayout: FC<PropsWithChildren<HTMLAttributes<HTMLDivElement>> & DynamicLayoutTypes> = ({ children, isAdminRoute }) => {
  /** queryClient */
  const queryClient = useQueryClient()
  /** ф-я выхода пользователя и очистки кэша */
  const handleLogout = useCallback(() => {
    queryClient.clear()
    Cookies.remove(COOKIES.AUTH_TOKEN)
    Router.reload()
  }, [queryClient])

  /** проверка на админку */
  return (
    <>
      {isAdminRoute
        ? (
          <div className={styles.adminLayout}>
            <AdminHeader handleLogout={handleLogout} />
            <AdminNavigation />
            {children}
          </div>
        )
        : (
          <div className={styles.publicLayout}>
            <PublicHeader handleLogout={handleLogout} />
            {children}
            <footer>
              FOOTER
            </footer>
          </div>
        )}
    </>
  )
}

export default DynamicLayout
