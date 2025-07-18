// FileUploadInput component for file uploads
import React, { useState, useRef } from 'react';

/**
 * FileUploadInput component for file uploads
 * @param {string} label - Input label
 * @param {function} onFileSelect - Callback when file is selected
 * @param {Array} acceptedTypes - Array of accepted file types (e.g., ['.pdf', '.doc'])
 * @param {number} maxSize - Maximum file size in bytes
 * @param {boolean} required - Required field
 * @param {string} placeholder - Placeholder text
 * @param {Object} selectedFile - Currently selected file object
 * @param {boolean} isUploading - Upload in progress state
 * @param {number} uploadProgress - Upload progress percentage (0-100)
 * @param {string} size - Size variant: 'sm', 'md', 'lg' (default: 'md')
 * @param {string} className - Additional classes
 */
export default function FileUploadInput({
  label,
  onFileSelect,
  acceptedTypes = [],
  maxSize = 10 * 1024 * 1024, // 10MB default
  required = false,
  placeholder = "Upload file...",
  selectedFile,
  isUploading = false,
  uploadProgress = 0,
  size = 'md',
  className = ''
}) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const validateFile = (file) => {
    setError('');

    // Check file type
    if (acceptedTypes.length > 0) {
      const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
      if (!acceptedTypes.includes(fileExtension)) {
        setError(`File type not supported. Accepted types: ${acceptedTypes.join(', ')}`);
        return false;
      }
    }

    // Check file size
    if (file.size > maxSize) {
      const maxSizeMB = Math.round(maxSize / (1024 * 1024));
      setError(`File too large. Maximum size: ${maxSizeMB}MB`);
      return false;
    }

    return true;
  };

  const handleFileSelect = (file) => {
    if (validateFile(file)) {
      onFileSelect && onFileSelect(file);
    }
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = () => {
    onFileSelect && onFileSelect(null);
    setError('');
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'p-3 text-sm';
      case 'lg':
        return 'p-8 text-lg';
      default:
        return 'p-6 text-base';
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'sm':
        return 'w-8 h-8';
      case 'lg':
        return 'w-16 h-16';
      default:
        return 'w-12 h-12';
    }
  };

  return (
    <div className={className}>
      {label && (
        <label className="block mb-2 font-medium text-gray-700">
          {label}{required && ' *'}
        </label>
      )}

      <input
        ref={fileInputRef}
        type="file"
        onChange={handleInputChange}
        accept={acceptedTypes.join(',')}
        className="hidden"
      />

      {/* Upload area */}
      <div
        className={`relative border-2 border-dashed rounded-lg text-center transition-colors cursor-pointer ${getSizeClasses()} ${
          isDragOver
            ? 'border-blue-400 bg-blue-50'
            : selectedFile
            ? 'border-gray-300 bg-gray-50'
            : 'border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50'
        }`}
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {selectedFile ? (
          /* File selected state */
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`${getIconSize()} bg-blue-100 rounded-lg flex items-center justify-center`}>
                <svg className={`${size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-8 h-8' : 'w-6 h-6'} text-blue-600`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="text-left">
                <p className={`${size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm'} font-medium text-gray-900`}>{selectedFile.name}</p>
                <p className={`${size === 'sm' ? 'text-xs' : 'text-xs'} text-gray-500`}>{formatFileSize(selectedFile.size)}</p>
              </div>
            </div>
            
            {!isUploading && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile();
                }}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Remove file"
              >
                <svg className={`${size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        ) : (
          /* Empty state */
          <div>
            <div className={`${getIconSize()} bg-gray-100 rounded-lg flex items-center justify-center mx-auto ${size === 'sm' ? 'mb-2' : size === 'lg' ? 'mb-4' : 'mb-3'}`}>
              <svg className={`${size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-8 h-8' : 'w-6 h-6'} text-gray-400`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <p className={`${size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm'} text-gray-600`}>{placeholder}</p>
            <p className={`${size === 'sm' ? 'text-xs' : 'text-xs'} text-gray-500 ${size === 'sm' ? 'mt-0.5' : 'mt-1'}`}>
              Drag and drop or click to browse
            </p>
          </div>
        )}

        {/* Upload progress */}
        {isUploading && (
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Uploading... {uploadProgress}%
            </p>
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
} 