import { FC } from 'react'
import { useFormContext } from 'react-hook-form'

import { ListCardQrcodesTypes } from './_types'
import QrcodeCard from './QrcodeCard/QrcodeCard'

/** компонент отрисовки списка вариантов размеров или аренды */
const ListCardQrcodes: FC<ListCardQrcodesTypes> = ({ name }) => {
  /** методы формы */
  const formMethods = useFormContext()
  /** изначальные значения */
  const qrcodes = formMethods?.getValues(name)

  if (!qrcodes?.length) return null

  return qrcodes?.map((qrcode, index) => (
    <QrcodeCard
      data={qrcode}
      key={index}
    />
  ))
}

export default ListCardQrcodes
