import { defineProvider } from '@nuxt/image/runtime'

export default defineProvider({
  getImage(src: string, options: any) {
    const modifiers = options?.modifiers || {}

    // 1. SAFETY CHECK: If src is missing, undefined, or not a string, return empty
    if (!src || typeof src !== 'string') {
      return { url: '' }
    }

    // 2. Ignore SVGs, GIFs, favicons, OG cards, or external URLs (http/https)
    if (
      src.endsWith('.svg') ||
      src.endsWith('.gif') ||
      src.startsWith('http') ||
      src.startsWith('/images/favicons/') ||
      src.startsWith('/images/og/')
    ) {
      return { url: src }
    }

    // 3. Only intercept local '/images/' that have a requested width
    if (!src.startsWith('/images/') || !modifiers.width) {
      return { url: src }
    }

    // 4. Strip '/images/' and the extension
    const cleanPath = src.replace(/^\/images\//, '')
    const lastDot = cleanPath.lastIndexOf('.')
    const nameWithoutExt = lastDot !== -1 ? cleanPath.substring(0, lastDot) : cleanPath

    // 5. Point directly to our lightning-fast static CDN files
    return {
      url: `/_img/${nameWithoutExt}-w${modifiers.width}.webp`
    }
  }
})