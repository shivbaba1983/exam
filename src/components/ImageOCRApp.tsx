import React, { useState } from 'react'
import Tesseract from 'tesseract.js'

type Result = {
  id: string
  fileName: string
  text: string
  progress: number
}

function ImageOCRApp() {
  const [results, setResults] = useState<Result[]>([])

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    Array.from(e.target.files).forEach(file => {
      const id = `${file.name}-${crypto.randomUUID()}`
      setResults(prev => [...prev, { id, fileName: file.name, text: '', progress: 0 }])

      const reader = new FileReader()
      reader.onload = () => {
        if (!reader.result) return

        Tesseract.recognize(reader.result as string, 'eng', {
          logger: m => {
            if (m.status === 'recognizing text') {
              setResults(prev =>
                prev.map(r => (r.id === id ? { ...r, progress: m.progress } : r)),
              )
            }
          },
        }).then(({ data }) => {
          setResults(prev =>
            prev.map(r => (r.id === id ? { ...r, text: data.text, progress: 1 } : r)),
          )
        })
      }
      reader.readAsDataURL(file)
    })
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 16 }}>
      <h1>Image → Text OCR</h1>

      <input type="file" accept="image/*" multiple onChange={handleFiles} />

      {results.map(r => (
        <div key={r.id} style={{ marginTop: 16 }}>
          <h3>{r.fileName}</h3>
          {r.progress < 1 ? (
            <div>Processing… {(r.progress * 100).toFixed(0)}%</div>
          ) : (
            <pre
              style={{
                background: '#f4f4f4',
                padding: 12,
                borderRadius: 6,
                whiteSpace: 'pre-wrap',
              }}
            >
              {r.text || '(no text detected)'}
            </pre>
          )}
        </div>
      ))}
    </div>
  )
}

export default ImageOCRApp
