/**
 * A2UI Processor Context
 */

import { createContext, useContext, type ReactNode } from 'react';

import type { MessageProcessor, SurfaceID } from '../types/types';

interface ProcessorContextValue {
  processor: MessageProcessor | null;
  surfaceId: SurfaceID | null;
}

const ProcessorContext = createContext<ProcessorContextValue>({
  processor: null,
  surfaceId: null,
});

export interface ProcessorProviderProps {
  processor: MessageProcessor | null;
  surfaceId?: SurfaceID;
  children: ReactNode;
}

export function ProcessorProvider({
  processor,
  surfaceId = '@default',
  children,
}: ProcessorProviderProps) {
  return (
    <ProcessorContext.Provider value={{ processor, surfaceId }}>
      {children}
    </ProcessorContext.Provider>
  );
}

export function useProcessor() {
  return useContext(ProcessorContext);
}

export { ProcessorContext };
