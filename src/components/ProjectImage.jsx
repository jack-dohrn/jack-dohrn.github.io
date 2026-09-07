import { useState } from 'react'

// Missing images retain their space without implying a research result.
export default function ProjectImage({ src, alt, label = 'Project', tone = 'blue', eager = false, fit, crop, frameRatio }) {
  const [failedSrc, setFailedSrc] = useState(null)
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
    {src && failedSrc !== src ? (croppedFrameStyle ? <div style={croppedFrameStyle}>{img}</div> : img) :
      <div className="image-placeholder" role="img" aria-label={`${label}: project image forthcoming`}>
        <div className="placeholder-orbit" aria-hidden="true" />
        <span className="placeholder-label">{label}</span>
        <span className="placeholder-note">Project imagery forthcoming</span>
      </div>}
  </div>
}
