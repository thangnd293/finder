import {
  NavigateOptions,
  useNavigate as useNavigateReact,
} from 'react-router-dom';

import { To } from '@/typings/react-router-dom';

interface NavigateFunction {
  (to: To, options?: NavigateOptions): void;
  (delta: number): void;
}
export const useNavigate = useNavigateReact as () => NavigateFunction;
