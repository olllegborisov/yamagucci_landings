export type DynamicPageTypes = {
  /** айди категории для админки */
  categoryId?: string
  /** адрес сайта */
  fullPathArray: string[]
  /** админка ли */
  isAdminPage?: boolean
  /** айди продукта для админки */
  productId?: string
  /** путь для ревалидации страницы */
  revalidatePath?: string
  /** базовое api url */
  webApi?: string
}
