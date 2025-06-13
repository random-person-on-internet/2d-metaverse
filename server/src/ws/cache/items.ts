export interface PlacedItem {
  instanceId: number;
  userId: number;
  x: number;
  y: number;
  definitionId: number;
  isPlaced: boolean;
  isDropped?: boolean;
}

export const placedItems = new Map<number, PlacedItem>();
