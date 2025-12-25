/**
 * A2UI Client Event Types
 */

import type { UserAction } from './types';

export interface ClientCapabilitiesDynamic {
  supportedFeatures?: string[];
  clientVersion?: string;
}

export interface ClientToServerMessage {
  userAction?: UserAction;
  clientCapabilities?: ClientCapabilitiesDynamic;
}
