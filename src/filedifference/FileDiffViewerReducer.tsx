import React, { useReducer } from 'react';
import DiffViewer from 'react-diff-viewer';

type State = {
  file1Content: string;
  file2Content: string;
};

type Action =
  | { type: 'setFile1Content'; payload: string }
  | { type: 'setFile2Content'; payload: string };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setFile1Content':
      return { ...state, file1Content: action.payload };
    case 'setFile2Content':
      return { ...state, file2Content: action.payload };
    default:
      return state;
  }
};

const FileDiffViewerReducer = () => {
  const [state, dispatch] = useReducer(reducer, {
    file1Content: '',
    file2Content: '',
  });

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'setFile1Content' | 'setFile2Content'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      dispatch({ type, payload: text });
    };
    reader.readAsText(file);
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold p-4">File Comparison Tool</h1>
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="file"
          accept=".txt,.json,.ts,.js,.scss,.cs"
          onChange={(e) => handleFileChange(e, 'setFile1Content')}
        />
        <input
          type="file"
          accept=".txt,.json,.ts,.js,.scss,.cs"
          onChange={(e) => handleFileChange(e, 'setFile2Content')}
        />
      </div>

      {state.file1Content && state.file2Content ? (
        <div className="border rounded shadow p-4 bg-white">
          <DiffViewer
            oldValue={state.file1Content}
            newValue={state.file2Content}
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
};

export default FileDiffViewerReducer;
