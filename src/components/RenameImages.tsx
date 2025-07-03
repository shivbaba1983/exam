import React, { useState } from 'react';

const IMAGE_EXTENSIONS = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp'];

function isImageFile(name: string) {
  const ext = name.split('.').pop()?.toLowerCase() ?? '';
  return IMAGE_EXTENSIONS.includes(ext);
}

export default function CopyRenameImages() {
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  const [sourceHandle, setSourceHandle] = useState<FileSystemDirectoryHandle | null>(null);
  const [destHandle, setDestHandle] = useState<FileSystemDirectoryHandle | null>(null);
  const [imageFiles, setImageFiles] = useState<FileSystemFileHandle[]>([]);

  // Pick source folder & collect images
  const pickSourceFolder = async () => {
    try {
      // @ts-ignore
      const dirHandle = await window.showDirectoryPicker();
      const images: FileSystemFileHandle[] = [];
      for await (const [, entry] of dirHandle.entries()) {
        if (entry.kind === 'file' && isImageFile(entry.name)) {
          images.push(entry);
        }
      }
      if (images.length === 0) {
        setStatus('No images found in source folder.');
      } else {
        setStatus(`Found ${images.length} images in source folder.`);
      }
      setSourceHandle(dirHandle);
      setImageFiles(images);
    } catch (e: any) {
      if (e.name !== 'AbortError') setStatus(`Error: ${e.message}`);
    }
  };

  // Pick destination folder
  const pickDestFolder = async () => {
    try {
      // @ts-ignore
      const dirHandle = await window.showDirectoryPicker();
      setDestHandle(dirHandle);
      setStatus('Destination folder selected.');
    } catch (e: any) {
      if (e.name !== 'AbortError') setStatus(`Error: ${e.message}`);
    }
  };

  // Copy & rename images from source → dest
  const copyAndRename = async () => {
    if (!sourceHandle || !destHandle) {
      setStatus('Please select both source and destination folders.');
      return;
    }
    if (imageFiles.length === 0) {
      setStatus('No images to copy.');
      return;
    }
    setBusy(true);
    setStatus('Copying and renaming images…');

    try {
      let count = 1;
      for (const fileHandle of imageFiles) {
        const file = await fileHandle.getFile();
        const ext = file.name.split('.').pop() ?? 'jpg';

        // Create new file in destination with sequential name
        const newFileHandle = await destHandle.getFileHandle(`${count}.${ext}`, {
          create: true,
        });
        const writable = await newFileHandle.createWritable();
        await writable.write(await file.arrayBuffer());
        await writable.close();

        count++;
      }
      setStatus(`✅ Copied and renamed ${imageFiles.length} images successfully!`);
    } catch (err: any) {
      setStatus(`Error during copy: ${err.message}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{ maxWidth: 480, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h2>Copy & Rename Images Sequentially</h2>

      <button onClick={pickSourceFolder} disabled={busy} style={{ marginRight: 12, padding: '8px 16px' }}>
        Select Source Folder
      </button>

      <button onClick={pickDestFolder} disabled={busy || !sourceHandle} style={{ padding: '8px 16px' }}>
        Select Destination Folder
      </button>

      <div style={{ marginTop: 16 }}>
        <button
          onClick={copyAndRename}
          disabled={busy || !sourceHandle || !destHandle || imageFiles.length === 0}
          style={{ padding: '10px 20px', fontSize: 16 }}
        >
          {busy ? 'Copying...' : 'Copy & Rename Images'}
        </button>
      </div>

      {status && <p style={{ marginTop: 16 }}>{status}</p>}

      {imageFiles.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <strong>Images to copy:</strong>
          <ul style={{ maxHeight: 150, overflowY: 'auto', fontFamily: 'monospace', fontSize: 14 }}>
            {imageFiles.map((f, i) => (
              <li key={i}>{f.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
