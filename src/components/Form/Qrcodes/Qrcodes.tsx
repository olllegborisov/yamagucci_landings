import cn from 'classnames'
import { useRouter } from 'next/router'
import { type FC, useContext, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { axiosBearerPost } from '@/src/api/axiosInstances'
import ButtonIcon from '@/src/components/atoms/ButtonIcon/ButtonIcon'
import FullPathArrayContext from '@/src/contexts/FullPathArrayContext'
import { revalidatePage } from '@/src/lib/revalidatePage'

import { ListCardQrcodesTypes } from './_types'
import QrcodeCard from './QrcodeCard/QrcodeCard'
import styles from './Qrcodes.module.scss'

/** компонент qr кодов */
const Qrcodes: FC<ListCardQrcodesTypes> = ({ name }) => {
  /** полный путь */
  const fullPathArray = useContext(FullPathArrayContext)
  /** полный путь со слешами для ревалидации */
  const fullPath = `/${fullPathArray.join('/')}`

  /** состояние загрузки */
  const [loading, setLoading] = useState(false)
  /** состояние формы */
  const [formData, setFormData] = useState({
    link: '',
    name: ''
  })
  /** роутер */
  const router = useRouter()
  /** id продукта для куар кода */
  const productId = +router?.query?.slug?.at(-1)
  /** методы формы */
  const formMethods = useFormContext()
  /** изначальные значения */
  const qrcodes = formMethods?.getValues(name)

  /** обработчик изменения */
  const handleInputChange = (e) => {
    /** изменяем локальное состояние */
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  /** обработчик отправки */
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      /** запрос */
      const response = await axiosBearerPost.post('https://api.yamaguchi.ru/api/admin/qr_codes', {
        link: formData.link,
        name: formData.name,
        product_id: productId
      })

      if (response.status === 201) {
        /** обновляем страницу */
        const res = await revalidatePage(fullPath)

        if (res?.revalidated) {
          router.reload()
        }
      } else {
        window.alert('Произошла ошибка при создании QR кода')
      }
    } catch (error) {
      window.alert('Произошла ошибка при создании QR кода')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div
        className={styles.form}
      >
        <div className={styles.input__wrapper}>
          <div className={styles.input__labelAndTooltip}>
            <label className={styles.input__label}>
              Название QR-кода, который хотите создать
            </label>
          </div>
          <input
            className={cn(styles.input__input, styles.grayBg)}
            name='name'
            onChange={handleInputChange}
            placeholder='Введите название...'
          />
        </div>

        <div className={styles.linkAndButton}>
          <div className={cn(styles.input__wrapper, styles.link)}>
            <div className={styles.input__labelAndTooltip}>
              <label className={styles.input__label}>
                Куда будет вести QR-код? (ссылка)
              </label>
            </div>
            <input
              className={cn(styles.input__input)}
              name='link'
              onChange={handleInputChange}
              placeholder='В формате https://...'
            />
          </div>

          <ButtonIcon
            className={styles.button}
            colorVariant={'blue'}
            isLoadingAfterClick={loading}
            label='Создать'
            onClick={handleSubmit}
            paddingVariant={'wide'}
            type='submit'
            withIcon={false}
          />
        </div>
      </div>

      {qrcodes.length > 0 && qrcodes?.map((qrcode, index) => (
        <QrcodeCard
          data={qrcode}
          key={index}
        />
      ))}
    </>
  )
}

export default Qrcodes
