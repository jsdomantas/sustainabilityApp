export const pantryKeys = {
  all: ['pantry'] as const,
  scannedItem: () => [...pantryKeys.all, 'scannedItem'] as const,
  pantry: () => [...pantryKeys.all, 'pantry'] as const,
};
