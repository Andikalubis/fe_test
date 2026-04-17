import React, { useState } from 'react';
import { Stage, Layer, Rect, Text, Group } from 'react-konva';
import { useParkingStore, type ParkingSpot } from '../store/useParkingStore';

interface ParkingMapProps {
    onSpotClick: (spot: ParkingSpot) => void;
    searchQuery?: string;
}

export const ParkingMap: React.FC<ParkingMapProps> = ({
    onSpotClick,
    searchQuery = '',
}) => {
    const spots = useParkingStore((state) => state.spots);
    const [hoveredSpotId, setHoveredSpotId] = useState<string | null>(null);

    const mapWidth = 600;
    const mapHeight = 600;

    const handleSpotClick = (spot: ParkingSpot) => {
        if (!spot.isOccupied) {
            onSpotClick(spot);
        }
    };

    const isHighlighted = (spot: ParkingSpot) => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return (
            spot.locationCode.toLowerCase().includes(query) ||
            spot.size.toLowerCase().includes(query)
        );
    };

    return (
        <div className="w-full flex justify-center">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                <div className="mb-4 text-center">
                    <h2 className="text-lg font-semibold text-slate-700">
                        Peta Parkiran
                    </h2>
                    <p className="text-sm text-slate-400">
                        Klik slot untuk melakukan pemesanan
                    </p>
                </div>

                <Stage
                    width={mapWidth}
                    height={mapHeight}
                    className="rounded-xl bg-slate-100 cursor-grab active:cursor-grabbing"
                >
                    <Layer>
                        <Rect
                            width={mapWidth}
                            height={mapHeight}
                            fill="#f8fafc"
                            cornerRadius={12}
                        />

                        {spots.map((spot) => {
                            const matchesSearch = isHighlighted(spot);
                            const isHovered = hoveredSpotId === spot.id;

                            let fill = '#ffffff';
                            let stroke = '#cbd5e1';

                            if (!matchesSearch) {
                                fill = '#f1f5f9';
                                stroke = '#e2e8f0';
                            } else if (spot.isOccupied) {
                                fill = '#ef4444';
                                stroke = '#b91c1c';
                            } else if (isHovered) {
                                fill = '#dbeafe';
                                stroke = '#2563eb';
                            }

                            return (
                                <Group
                                    key={spot.id}
                                    x={spot.x + 40}
                                    y={spot.y + 40}
                                    onMouseEnter={() => {
                                        if (!spot.isOccupied && matchesSearch) {
                                            setHoveredSpotId(spot.id);
                                            document.body.style.cursor = 'pointer';
                                        }
                                    }}
                                    onMouseLeave={() => {
                                        setHoveredSpotId(null);
                                        document.body.style.cursor = 'default';
                                    }}
                                    onClick={() => matchesSearch && handleSpotClick(spot)}
                                    onTap={() => matchesSearch && handleSpotClick(spot)}
                                >
                                    <Rect
                                        width={spot.width}
                                        height={spot.height}
                                        fill={fill}
                                        stroke={stroke}
                                        strokeWidth={
                                            isHovered && !spot.isOccupied && matchesSearch ? 3 : 2
                                        }
                                        cornerRadius={8}
                                        shadowBlur={isHovered ? 8 : 0}
                                    />

                                    <Text
                                        text={spot.locationCode}
                                        width={spot.width}
                                        align="center"
                                        y={12}
                                        fontSize={14}
                                        fontStyle="bold"
                                        fill={
                                            spot.isOccupied || !matchesSearch
                                                ? '#94a3b8'
                                                : '#1e293b'
                                        }
                                    />

                                    <Text
                                        text={spot.size}
                                        width={spot.width}
                                        align="center"
                                        y={32}
                                        fontSize={11}
                                        fill={
                                            spot.isOccupied || !matchesSearch
                                                ? '#cbd5e1'
                                                : '#64748b'
                                        }
                                    />

                                    {spot.isOccupied ? (
                                        <Text
                                            text="TERISI"
                                            width={spot.width}
                                            align="center"
                                            y={spot.height / 2}
                                            fontSize={11}
                                            fill="#ffffff"
                                            fontStyle="bold"
                                        />
                                    ) : (
                                        matchesSearch && (
                                            <Text
                                                text="TERSEDIA"
                                                width={spot.width}
                                                align="center"
                                                y={spot.height - 18}
                                                fontSize={10}
                                                fill="#2563eb"
                                                fontStyle="bold"
                                            />
                                        )
                                    )}

                                    {!matchesSearch && (
                                        <Rect
                                            width={spot.width}
                                            height={spot.height}
                                            fill="rgba(248,250,252,0.7)"
                                            cornerRadius={8}
                                        />
                                    )}
                                </Group>
                            );
                        })}

                        <Text
                            text="PINTU MASUK"
                            x={mapWidth / 2 - 50}
                            y={mapHeight - 25}
                            fontSize={14}
                            fill="#475569"
                            fontStyle="bold"
                        />
                    </Layer>
                </Stage>
            </div>
        </div>
    );
};