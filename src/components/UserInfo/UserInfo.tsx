import { memo } from 'react'

import useFetchUser from '@/src/api/useFetchUser/useFetchUser'
import LoaderQuery from '@/src/components/atoms/LoaderQuery/LoaderQuery'

import UserAvatar from './UserAvatar/UserAvatar'
import styles from './UserInfo.module.scss'
import UserMeta from './UserMeta/UserMeta'

/** аватарка пользователя */
const UserInfo: React.FC = () => {
  /** получаем данные пользователя */
  const { data: user, isLoading } = useFetchUser({ webApi: 'https://api.yamaguchi.ru/api' })

  return (
    <LoaderQuery
      className={styles.loader}
      isLoading={isLoading}
    >
      { user?.first_name && (
        <div className={styles.wrapper}>
          <UserAvatar />
          <UserMeta {...user} />
        </div>
      )}
    </LoaderQuery>

  )
}

export default memo(UserInfo)
