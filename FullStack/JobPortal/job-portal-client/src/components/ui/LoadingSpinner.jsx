import { ClipLoader } from 'react-spinners';

const LoadingSpinner = ({ 
  size = 'md', 
  color = '#3b82f6', 
  loading = true, 
  className = '' 
}) => {
  const sizeMap = {
    sm: 20,
    md: 35,
    lg: 50,
    xl: 70
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <ClipLoader
        color={color}
        loading={loading}
        size={sizeMap[size]}
        aria-label="Loading"
      />
    </div>
  );
};

export default LoadingSpinner;
