// eslint-disable-next-line import/named
import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import Router from 'next/router'
import React from 'react'

import useFetchCategories from '@/src/api/useFetchCategories/useFetchCategories'
import IconWrapper from '@/src/components/atoms/IconWrapper/IconWrapper'
import LoaderQuery from '@/src/components/atoms/LoaderQuery/LoaderQuery'
import { ColumnResultCategories } from '@/src/components/TableWithModal/_types'
import TableWithModal from '@/src/components/TableWithModal/TableWithModal'
import { CREATE_NEW, PAGE_CATEGORIES } from '@/src/constants/constants'
import { IconMinusInSquare, IconPlusInSquare } from '@/src/constants/icons'
import times from '@/src/lib/times'

import styles from './AdminCategoriesPage.module.scss'

/** страница тестовая */
const AdminCategoriesPage = ({ webApi }) => {
  /** получаем все продукты */
  const { data, isLoading } = useFetchCategories({ webApi })

  /** добавить новую категорию */
  const handleClickAddNewCategory = () => {
    Router.push(`${PAGE_CATEGORIES}${CREATE_NEW}`)
  }

  /** колонки хэдера и футера */
  const columns = React.useMemo<ColumnDef<ColumnResultCategories, any>[]>(
    () => [
      {
        accessorKey: 'id',
        cell: info => (
          <span className={styles.column__id}>
            <span>
              {info?.row?.original?.id}
            </span>
            {/* <a
              href={info?.row?.original?.site_url}
              title='На сайт'
            >
              <IconWrapper IconComponent={IconExternalLink} />
            </a> */}
          </span>
        ),
        enableColumnFilter: false,
        header: 'Айди (ID)',
        id: 'id'
      },
      {
        accessorKey: 'name',
        cell: info => (
          <div className={styles.column__name}>
            {info?.row?.getCanExpand()
              ? (
                <button
                  type='button'
                  {...{
                    onClick: info?.row?.getToggleExpandedHandler(),
                    style: { cursor: 'pointer' }
                  }}
                >
                  {info?.row?.getIsExpanded()
                    ? (
                      <IconWrapper
                        IconComponent={IconMinusInSquare}
                        iconClassname={styles.iconExpand}
                      />
                    )
                    : (
                      <IconWrapper
                        IconComponent={IconPlusInSquare}
                        iconClassname={styles.iconExpand}
                      />
                    )}
                </button>
              )
              : (
                ''
              )}
            <Link
              className={styles.link}
              href={`${PAGE_CATEGORIES}/${info?.row?.original?.id}`}
              title='Редактировать'
            >
              <p dangerouslySetInnerHTML={ {
                __html: !info?.row.original?.parent_id
                  ? info?.row?.original?.name
                  : `---${info?.row?.original?.name}`
              }}
              />
            </Link>
          </div>
        ),
        header: '',
        id: 'name'
      },
      {
        accessorKey: 'products_qnt',
        enableColumnFilter: false,
        header: 'Товары',
        id: 'products_qnt'
      },
      {
        accessorKey: 'filters_qnt',
        enableColumnFilter: false,
        header: 'Фильтры',
        id: 'filters_qnt'
      }
    ],
    []
  )

  if (!data && !isLoading) return null

  return (
    <>
      {isLoading
        ? times(6)?.map((x, key) => (
          <LoaderQuery
            className={styles.loader}
            isLoading={isLoading}
            key={key}
          />
        ))
        : (
          <TableWithModal
            addNewRow={handleClickAddNewCategory}
            columns={columns}
            data={data}
            title='Категории'
            withSubcategoriesFilters={true}
          />
        )}
    </>
  )
}

export default React.memo(AdminCategoriesPage)
