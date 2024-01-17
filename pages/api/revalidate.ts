import { NextApiRequest, NextApiResponse } from 'next'

/** обработчик обновления страниц */
export default async function handler (req: NextApiRequest, res:NextApiResponse): Promise<void> {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    // check for a secret token to secure the route
    if (req.body.secret !== process.env.REVALIDATE_TOKEN) {
      return res.status(401).json({ message: 'Invalid token' })
    }

    console.log('req.headers', req.headers)
    console.log('page to revalidate', req.headers.referer)
    // revalidate the path (change '/qr-codes' to your specific page path)
    await res.revalidate(req.headers.referer)

    return res.json({ revalidated: true })
  } catch (err) {
    // if there was an error, return it
    return res.status(500).send('Error revalidating from handler')
  }
}
