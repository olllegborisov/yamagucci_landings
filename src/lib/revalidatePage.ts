/** функция принудительной ревалидации страницы */
export const revalidatePage = async (url:string): Promise<any> => {
  try {
    /** ответ */
    const response = await fetch('/api/revalidate', {
      body: JSON.stringify({ secret: 'revalidate', url }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })

    /** дата */
    const data = await response.json()

    if (!data.revalidated) {
      // eslint-disable-next-line no-console
      console.error('Revalidation failed')
    }

    return data
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error revalidating from fetch:', error)
  }
}
