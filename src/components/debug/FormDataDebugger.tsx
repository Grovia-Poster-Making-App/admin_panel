import React from 'react';

interface FormDataDebuggerProps {
  formData: any;
  title?: string;
}

const FormDataDebugger: React.FC<FormDataDebuggerProps> = ({ formData, title = "Form Data" }) => {
  const formatValue = (value: any, depth = 0): string => {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (typeof value === 'string') return `"${value}"`;
    if (typeof value === 'number' || typeof value === 'boolean') return String(value);
    if (value instanceof File) return `File: ${value.name} (${value.size} bytes, ${value.type})`;
    if (Array.isArray(value)) {
      if (depth > 2) return '[Array]';
      return `[\n${value.map((item, index) => 
        `${'  '.repeat(depth + 1)}${index}: ${formatValue(item, depth + 1)}`
      ).join(',\n')}\n${'  '.repeat(depth)}]`;
    }
    if (typeof value === 'object') {
      if (depth > 2) return '[Object]';
      return `{\n${Object.keys(value).map(key => 
        `${'  '.repeat(depth + 1)}${key}: ${formatValue(value[key], depth + 1)}`
      ).join(',\n')}\n${'  '.repeat(depth)}}`;
    }
    return String(value);
  };

  const findFiles = (obj: any, path = ''): Array<{ path: string; file: File }> => {
    const files: Array<{ path: string; file: File }> = [];
    
    if (obj instanceof File) {
      files.push({ path, file: obj });
    } else if (Array.isArray(obj)) {
      obj.forEach((item, index) => {
        files.push(...findFiles(item, `${path}[${index}]`));
      });
    } else if (obj && typeof obj === 'object') {
      Object.keys(obj).forEach(key => {
        files.push(...findFiles(obj[key], path ? `${path}.${key}` : key));
      });
    }
    
    return files;
  };

  const files = findFiles(formData);

  return (
    <div style={{ 
      border: '1px solid #ccc', 
      padding: '10px', 
      margin: '10px 0', 
      backgroundColor: '#f9f9f9',
      fontFamily: 'monospace',
      fontSize: '12px'
    }}>
      <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>{title}</h4>
      
      <div style={{ marginBottom: '10px' }}>
        <strong>Files Found ({files.length}):</strong>
        {files.length > 0 ? (
          <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
            {files.map((fileInfo, index) => (
              <li key={index}>
                <strong>{fileInfo.path}:</strong> {fileInfo.file.name} 
                ({fileInfo.file.size} bytes, {fileInfo.file.type})
              </li>
            ))}
          </ul>
        ) : (
          <div style={{ color: 'red' }}>No files found!</div>
        )}
      </div>

      <div>
        <strong>Full Structure:</strong>
        <pre style={{ 
          margin: '5px 0', 
          padding: '10px', 
          backgroundColor: '#fff', 
          border: '1px solid #ddd',
          overflow: 'auto',
          maxHeight: '300px'
        }}>
          {formatValue(formData)}
        </pre>
      </div>
    </div>
  );
};

export default FormDataDebugger;
