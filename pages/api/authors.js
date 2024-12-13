import path from 'path'
import fs from 'fs'

export async function handler(req, res) {
  const filePath = path.join(process.cwd(), 'public', 'data.json')
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  res.status(200).json(data.authors)
}

export default handler
