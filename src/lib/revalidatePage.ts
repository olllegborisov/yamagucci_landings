/** функция принудительной ревалидации страницы */
export const revalidatePage = async (): Promise<void> => {
  try {
    /** ответ */
    const response = await fetch('/api/revalidate', {
      body: JSON.stringify({ secret: 'revalidate' }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })

    /** дата */
    const data = await response.json()

    if (!data.revalidated) {
      console.error('Revalidation failed')
    }
  } catch (error) {
    console.error('Error revalidating from fetch:', error)
  }
}
