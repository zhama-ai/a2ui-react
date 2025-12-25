/**
 * A2UI Base Event Types
 */

export interface BaseEventDetail<EventType extends string> {
  readonly eventType: EventType;
}
