export type ListCardQrcodesTypes = {
  /** имя поля формы */
  name?: string
}
export type QrcodeCardTypes = {
  /** дата */
  data: {
    /** код */
    code: string
    /** id */
    id: number
    /** ссылка на картинку кода */
    img_url: string
    /** ссылка на внутренний урл */
    inner_url: string
    /** куда ведет код */
    link: string
    /** название кода */
    name: string
    /** ютм */
    utm: string
  }
}
