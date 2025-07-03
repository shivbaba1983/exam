import React, { useState } from 'react'
import Tesseract from 'tesseract.js'

type Task = {
  id: string
  fileName: string
  text: string
  progress: number
}

function FolderOCRApp() {
  const [tasks, setTasks] = useState<Task[]>([])

  /* ───────────────────────────── 1. handle folder selection */
  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    // reset state each time a new folder is picked
    setTasks([])

    Array.from(e.target.files).forEach(file => {
      const id = crypto.randomUUID()

      setTasks(prev => [
        ...prev,
        { id, fileName: file.name, text: '', progress: 0 },
      ])

      const reader = new FileReader()
      reader.onload = () => {
        if (!reader.result) return

        Tesseract.recognize(reader.result as string, 'eng', {
          logger: m => {
            if (m.status === 'recognizing text') {
              setTasks(prev =>
                prev.map(t =>
                  t.id === id ? { ...t, progress: m.progress } : t,
                ),
              )
            }
          },
        }).then(({ data }) => {
          setTasks(prev =>
            prev.map(t =>
              t.id === id ? { ...t, text: data.text, progress: 1 } : t,
            ),
          )
        })
      }
      reader.readAsDataURL(file)
    })
  }

  /* ───────────────────────────── 2. create & download .txt */
  const downloadTxt = () => {
    const allText = tasks
      .filter(t => t.text.trim())
      .map(
        t => `─── ${t.fileName} ───\n${t.text.trim()}\n`,
      )
      .join('\n')

    const blob = new Blob([allText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = 'ocr-output.txt'
    a.click()

    URL.revokeObjectURL(url)
  }

  const allDone = tasks.length > 0 && tasks.every(t => t.progress === 1)

  /* ───────────────────────────── 3. UI */
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 16 }}>
      <h1>Folder OCR → Notepad</h1>

      {/* Pick an entire directory of images */}
      {/* `webkitdirectory` is the only way browsers expose folder selection */}
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFiles}
        // @ts-ignore – non‑standard attribute, but Chromium supports it
        webkitdirectory="true"
      />

      {tasks.map(t => (
        <div key={t.id} style={{ marginTop: 16 }}>
          <strong>{t.fileName}</strong>
          {t.progress < 1 ? (
            <div>Processing… {(t.progress * 100).toFixed(0)}%</div>
          ) : (
            <pre
              style={{
                background: '#f4f4f4',
                padding: 8,
                borderRadius: 6,
                whiteSpace: 'pre-wrap',
              }}
            >
              {t.text || '(no text detected)'}
            </pre>
          )}
        </div>
      ))}

      {allDone && (
        <button style={{ marginTop: 24 }} onClick={downloadTxt}>
          Download combined .txt
        </button>
      )}
    </div>
  )
}

export default FolderOCRApp
