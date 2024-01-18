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

    // revalidate the path (change '/qr-codes' to your specific page path)
    await res.revalidate(req?.body?.url)

    return res.json({ revalidated: true })
  } catch (err) {
    // if there was an error, return it
    return res.status(500).send('Error revalidating from handler')
  }
}
