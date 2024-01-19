/** получение базового url */
export const getBaseUrlApi = (host: string): string => {
  if (host?.includes('localhost') || host?.includes('yamaguchi')) {
    return 'https://api.yamaguchi.ru/api'
  } else if (host?.includes('us-medica')) {
    return 'https://api.us-medica.ru/api'
  } else if (host?.includes('kresla')) {
    return 'https://api.kresla.ru/api'
  }

  return 'https://api.yamaguchi.ru/api'
}
