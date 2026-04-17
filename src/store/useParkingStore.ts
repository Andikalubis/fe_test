import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type SpotSize = 'Small' | 'Medium' | 'Large';

export interface ParkingSpot {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isOccupied: boolean;
  size: SpotSize;
  locationCode: string;
}

export interface Booking {
  id: string;
  spotId: string;
  name: string;
  vehicleNo: string;
  startTime: number;
  durationMinutes: number;
}

interface ParkingState {
  spots: ParkingSpot[];
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'startTime'>) => void;
  endSession: (bookingId: string) => void;
  initializeSpots: () => void;
}

const generateInitialSpots = (): ParkingSpot[] => {
  const spots: ParkingSpot[] = [];
  const rows = 4;
  const cols = 5;
  const spotWidth = 80;
  const spotHeight = 120;
  const gapX = 30;
  const gapY = 80;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const id = `spot-${r}-${c}`;
      let size: SpotSize = 'Medium';
      if (r === 0) size = 'Small';
      if (r === rows - 1) size = 'Large';

      spots.push({
        id,
        locationCode: `${String.fromCharCode(65 + r)}${c + 1}`,
        x: c * (spotWidth + gapX),
        y: r * (spotHeight + gapY),
        width: spotWidth,
        height: spotHeight,
        isOccupied: false,
        size,
      });
    }
  }
  return spots;
};

export const useParkingStore = create<ParkingState>()(
  persist(
    (set) => ({
      spots: [],
      bookings: [],

      addBooking: (bookingData) =>
        set((state) => {
          const newBooking: Booking = {
            ...bookingData,
            id: `booking-${Date.now()}`,
            startTime: Date.now(),
          };

          return {
            bookings: [...state.bookings, newBooking],
            spots: state.spots.map((spot) =>
              spot.id === bookingData.spotId ? { ...spot, isOccupied: true } : spot
            ),
          };
        }),

      endSession: (bookingId) =>
        set((state) => {
          const booking = state.bookings.find((b) => b.id === bookingId);
          if (!booking) return state;

          return {
            bookings: state.bookings.filter((b) => b.id !== bookingId),
            spots: state.spots.map((spot) =>
              spot.id === booking.spotId ? { ...spot, isOccupied: false } : spot
            ),
          };
        }),

      initializeSpots: () =>
        set((state) => {
          if (state.spots.length === 0) {
            return { spots: generateInitialSpots() };
          }
          return state;
        }),
    }),
    {
      name: 'parking-storage',
    }
  )
);
