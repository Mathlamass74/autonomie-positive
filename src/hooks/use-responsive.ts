import { useWindowDimensions } from 'react-native';

export function useResponsive() {
  const { width } = useWindowDimensions();
  return { isTablet: width >= 768, width };
}

export default useResponsive;
