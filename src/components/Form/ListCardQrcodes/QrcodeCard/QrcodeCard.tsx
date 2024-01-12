import cn from 'classnames'
import { debounce } from 'lodash'
import { FC, useCallback } from 'react'

import { QrcodeCardTypes } from '@/src/components/Form/ListCardQrcodes/_types'

import styles from './QrcodeCard.module.scss'

/** компонент карточки qr кода */
const QrcodeCard: FC<QrcodeCardTypes> = ({ data }) => {
  /** обработчик обновления qr кода */
  const handleUpdate = async (id: number, data: Partial<QrcodeCardTypes>) => {
    // replace with your actual API call
    await fetch(`https://api.example.com/qrcodes/${id}`, {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PATCH'
    })
  }

  /** обновление qr кода */
  const debouncedUpdate = useCallback((id, data) => {
    debounce(() => handleUpdate(id, data), 800)
  }, [])

  return (
    <div className={styles.card}>
      <div className={styles.input__wrapper}>
        <div className={styles.input__labelAndTooltip}>
          <label className={styles.input__label}>
            {`# ${data.id} Название QR-кода`}
          </label>
        </div>
        <input
          className={cn(styles.input__input, styles.grayBg)}
          value={data.name}
        />
      </div>
      <div className={styles.imgAndLinksWrapper}>

        <img
          alt={data.name}
          className={styles.img}
          src={data.img_url}
        />

        <div className={styles.links}>
          <div className={styles.input__wrapper}>
            <div className={styles.input__labelAndTooltip}>
              <label className={styles.input__label}>
                Эту ссылку вшиваем в QR-код
              </label>
            </div>
            <input
              className={styles.input__input}
              disabled
              value={data.inner_url}
            />
          </div>

          <div className={styles.input__wrapper}>
            <div className={styles.input__labelAndTooltip}>
              <label className={styles.input__label}>
                Куда будет вести QR-код? (ссылка)
              </label>
            </div>
            <input
              className={cn(styles.input__input, styles.grayBg)}
              value={data.link}
            />
          </div>

          <div className={styles.input__wrapper}>
            <p className={styles.input__label}>
              Utm метки, которые подставятся при редиректе
            </p>
            <p>
              {data.utm}
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default QrcodeCard
