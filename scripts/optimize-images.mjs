import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 1. Combine your screens and baseImageWidths so we never miss a size
const screens = [320, 640, 768, 1024, 1280, 1536]
const baseImageWidths = [
  100, 140, 160, 180, 190, 225, 240, 300, 340, 360, 
  380, 400, 420, 450, 480, 500, 525, 540, 580, 590, 
  600, 720, 800, 900, 960, 1200, 1366, 1600
]
const uniqueWidths = [...new Set([...screens, ...baseImageWidths])].sort((a, b) => a - b)

// 2. Resolve target directories
const inputDir = path.resolve(__dirname, '../public/images')
const outputDir = path.resolve(__dirname, '../public/_img')

function getAllFiles(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles
  
  const files = fs.readdirSync(dirPath)
  files.forEach(file => {
    const fullPath = path.join(dirPath, file)
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles)
    } else {
      const ext = path.extname(file).toLowerCase()
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        arrayOfFiles.push(fullPath)
      }
    }
  })
  return arrayOfFiles
}

async function processImages() {
  console.log(`Starting CAPS Image Engine across ${uniqueWidths.length} responsive widths...`)
  const files = getAllFiles(inputDir)
  let generated = 0
  let skipped = 0

  for (const file of files) {
    const relativePath = path.relative(inputDir, file)
    const parsedPath = path.parse(relativePath)
    
    // Mirror the folder structure (e.g., /blog/hero/)
    const outDir = path.join(outputDir, parsedPath.dir)
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })
    
    for (const width of uniqueWidths) {
      // Name output file: cover-w800.webp
      const outFile = path.join(outDir, `${parsedPath.name}-w${width}.webp`)
      
      // Smart caching: Skip if already generated
      if (fs.existsSync(outFile)) {
        skipped++
        continue
      }
      
      try {
        await sharp(file)
          .resize({ width, withoutEnlargement: true }) // Prevents blurring small logos
          .webp({ quality: 80, effort: 6, smartSubsample: true }) // Editorial food optimization
          .toFile(outFile)
        generated++
      } catch (err) {
        console.error(`Error processing ${file} at ${width}px:`, err)
      }
    }
  }
  console.log(`✅ CAPS Images Ready! Generated: ${generated} | Skipped: ${skipped} (Cache hit)`)
}

processImages()