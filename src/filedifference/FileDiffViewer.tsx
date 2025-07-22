import React, { useState } from 'react';
import DiffViewer from 'react-diff-viewer';

const FileDiffViewer=()=> {
  const [file1Content, setFile1Content] = useState<string>('');
  const [file2Content, setFile2Content] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFileContent: (value: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setFileContent(text);
    };
    reader.readAsText(file);
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <input type="file" accept=".txt,.json,.ts,.js,.scss,.cs" onChange={(e) => handleFileChange(e, setFile1Content)} />
        <input type="file" accept=".txt,.json,.ts,.js,.scss,.cs" onChange={(e) => handleFileChange(e, setFile2Content)} />
      </div>

      {file1Content && file2Content ? (
        <div className="border rounded shadow p-4 bg-white">
          <DiffViewer
            oldValue={file1Content}
            newValue={file2Content}
            splitView={true}
            hideLineNumbers={false}
            showDiffOnly={false}
          />
        </div>
      ) : (
        <p className="text-gray-500">Upload both files to see differences.</p>
      )}
    </div>
  );
}

export default FileDiffViewer
