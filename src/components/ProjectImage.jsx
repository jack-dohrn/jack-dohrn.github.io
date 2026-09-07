import { useState } from 'react'

// Missing or unavailable images are omitted.
export default function ProjectImage({ src, alt, label = 'Project', tone = 'blue', eager = false, fit, crop, frameRatio }) {
  const [failedSrc, setFailedSrc] = useState(null)
  if (!src || failedSrc === src) return null
  const imageStyle = crop ? {
    position: 'absolute',
    width: `${crop.sourceWidth / crop.width * 100}%`,
    height: `${crop.sourceHeight / crop.height * 100}%`,
    maxWidth: 'none',
    left: `${-crop.x / crop.width * 100}%`,
    top: `${-crop.y / crop.height * 100}%`,
  } : fit ? { objectFit: fit } : undefined
  const cropRatio = crop ? crop.width / crop.height : null
  const croppedFrameStyle = crop && frameRatio ? {
    position: 'absolute', overflow: 'hidden',
    width: `${Math.min(1, cropRatio / frameRatio) * 100}%`,
    height: `${Math.min(1, frameRatio / cropRatio) * 100}%`,
    left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
  } : undefined
  const img = <img src={src} alt={alt || label} style={imageStyle} loading={eager ? 'eager' : 'lazy'} onError={() => setFailedSrc(src)} />
  return <div className={`project-visual tone-${tone}`} style={frameRatio || cropRatio ? { aspectRatio: frameRatio || cropRatio } : undefined}>
    {croppedFrameStyle ? <div style={croppedFrameStyle}>{img}</div> : img}
  </div>
}
