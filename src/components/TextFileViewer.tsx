import React, { useEffect, useState } from 'react';
import './TextFileViewer.scss';

// Glob import text files eagerly as strings
const textFiles = import.meta.glob('/src/assets/images/textdocs/*.txt', { eager: true, as: 'raw' });

type FileData = {
  name: string;
  content: string;
};

const TextFileViewer: React.FC = () => {
  const [files, setFiles] = useState<FileData[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const loadedFiles: FileData[] = [];

    for (const path in textFiles) {
      const content = (textFiles[path] as string) || '';
      // Extract file name from path, e.g., /src/assets/images/textdocs/1.txt -> 1.txt
      const name = path.split('/').pop() || 'unknown.txt';

      loadedFiles.push({ name, content });
    }

    // Sort files by name if needed (optional)
    loadedFiles.sort((a, b) => a.name.localeCompare(b.name));

    setFiles(loadedFiles);
  }, []);

  return (
    <div className="text-viewer">
      <h1 className="title">Text File Viewer</h1>
      {files.map((file) => (
        <div
          key={file.name}
          className={`file-card ${expanded === file.name ? 'expanded' : ''}`}
          onClick={() => setExpanded((prev) => (prev === file.name ? null : file.name))}
        >
          <div className="file-header">
            <span>{file.name}</span>
            <span>{expanded === file.name ? '▲' : '▼'}</span>
          </div>
          {expanded === file.name && (
            <div className="file-content">
              {file.content.split('\n').map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TextFileViewer;
