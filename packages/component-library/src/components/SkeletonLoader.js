import React from 'react';

const SkeletonLoader = ({ 
  variant = 'text', 
  width = 'w-full', 
  height = 'h-4', 
  className = '',
  count = 1,
  spacing = 'space-y-2'
}) => {
  const baseClasses = 'bg-gray-200 animate-pulse rounded';
  
  const getVariantClasses = () => {
    switch (variant) {
      case 'text':
        return `${height} ${width}`;
      case 'circle':
        return `${height} ${width} rounded-full`;
      case 'rectangle':
        return `${height} ${width} rounded-lg`;
      case 'card':
        return 'h-32 w-full rounded-lg';
      default:
        return `${height} ${width}`;
    }
  };

  const skeletonClasses = `${baseClasses} ${getVariantClasses()} ${className}`;

  if (count === 1) {
    return <div className={skeletonClasses} />;
  }

  return (
    <div className={spacing}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={skeletonClasses} />
      ))}
    </div>
  );
};

// Pre-built skeleton components for common use cases
export const SkeletonText = ({ lines = 3, ...props }) => (
  <SkeletonLoader variant="text" count={lines} {...props} />
);

export const SkeletonCard = ({ ...props }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-4 animate-pulse">
    <div className="flex items-start space-x-3">
      <SkeletonLoader variant="circle" width="w-5" height="h-5" />
      <div className="flex-1 space-y-3">
        <div className="flex items-center justify-between">
          <SkeletonLoader variant="text" width="w-48" height="h-6" />
          <SkeletonLoader variant="rectangle" width="w-20" height="h-6" />
        </div>
        <div className="space-y-2">
          <SkeletonLoader variant="text" width="w-32" height="h-4" />
          <SkeletonLoader variant="text" width="w-40" height="h-4" />
          <SkeletonLoader variant="text" width="w-28" height="h-4" />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <SkeletonLoader variant="text" width="w-24" height="h-4" />
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right space-y-1">
              <SkeletonLoader variant="text" width="w-16" height="h-6" />
              <SkeletonLoader variant="text" width="w-12" height="h-4" />
            </div>
            <SkeletonLoader variant="rectangle" width="w-20" height="h-8" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const SkeletonList = ({ count = 5, ...props }) => (
  <div className="space-y-4">
    {Array.from({ length: count }).map((_, index) => (
      <SkeletonCard key={index} {...props} />
    ))}
  </div>
);

export const SkeletonAvatar = ({ size = 'md', ...props }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };
  
  return (
    <SkeletonLoader 
      variant="circle" 
      width={sizeClasses[size]} 
      height={sizeClasses[size]} 
      {...props} 
    />
  );
};

export const SkeletonButton = ({ size = 'md', ...props }) => {
  const sizeClasses = {
    sm: 'h-8 w-20',
    md: 'h-10 w-24',
    lg: 'h-12 w-28'
  };
  
  return (
    <SkeletonLoader 
      variant="rectangle" 
      width={sizeClasses[size].split(' ')[1]} 
      height={sizeClasses[size].split(' ')[0]} 
      {...props} 
    />
  );
};

export default SkeletonLoader; 