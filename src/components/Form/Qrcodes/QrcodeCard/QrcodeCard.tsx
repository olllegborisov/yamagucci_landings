import cn from 'classnames'
import { debounce } from 'lodash'
import { FC, useEffect, useState } from 'react'

import { axiosBearerPatch } from '@/src/api/axiosInstances'
import { QrcodeCardTypes } from '@/src/components/Form/Qrcodes/_types'
import styles from '@/src/components/Form/Qrcodes/Qrcodes.module.scss'

/** компонент карточки qr кода */
const QrcodeCard: FC<QrcodeCardTypes> = ({ data }) => {
  /** локальное состояние */
  const [localData, setLocalData] = useState(data)

  /** обработчик изменения */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    /** изменяем локальное состояние */
    const { name, value } = e.target
    setLocalData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  useEffect(() => {
    /** debounced function */
    const debouncedUpdateData = debounce(() => {
      try {
        axiosBearerPatch
          .patch(`https://api.yamaguchi.ru/api/admin/qr_codes/${localData.id}`, {
            link: localData.link,
            name: localData.name
          })
          .then((response) => {
            if (response.status === 200) {
            // eslint-disable-next-line no-console
              console.log('Data updated:', localData)
            } else {
            // eslint-disable-next-line no-console
              console.error('Failed to update data')
            }
          })
          .catch((error) => {
          // eslint-disable-next-line no-console
            console.error('Error:', error)
          })
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error:', error)
      }
    },
    800)

    if (localData.link !== data.link || localData.name !== data.name) {
      debouncedUpdateData()
    }

    return () => {
      debouncedUpdateData.cancel()
    }
  }, [data, localData])

  return (
    <div className={styles.card}>
      <div className={styles.input__wrapper}>
        <div className={styles.input__labelAndTooltip}>
          <label className={styles.input__label}>
            {`# ${localData.id} Название QR-кода`}
          </label>
        </div>
        <input
          className={cn(styles.input__input, styles.grayBg)}
          name='name'
          onChange={handleInputChange}
          value={localData.name}
        />
      </div>
      <div className={styles.imgAndLinksWrapper}>

        <img
          alt={localData.name}
          className={styles.img}
          src={localData.img_url}
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
              value={localData.inner_url}
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
              name='link'
              onChange={handleInputChange}
              value={localData.link}
            />
          </div>

          {localData.utm && (
            <div className={styles.input__wrapper}>
              <p className={styles.input__label}>
                Utm метки, которые подставятся при редиректе
              </p>
              <p>
                {localData.utm}
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default QrcodeCard
