import { useEffect, useState } from 'react';
import { useParkingStore, type ParkingSpot } from '../store/useParkingStore';
import { ParkingMap } from '../components/ParkingMap';
import { BookingModal } from '../components/BookingModal';

export const DashboardPage = () => {
    const { initializeSpots, spots } = useParkingStore();
    const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);
    
    const availableSpots = spots.filter(s => !s.isOccupied).length;
    const occupiedSpots = spots.filter(s => s.isOccupied).length;
    const totalSpots = spots.length;
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        initializeSpots();
    }, [initializeSpots]);

    return (
        <>
            <div className="flex flex-col xl:flex-row gap-8 justify-center items-start">

                <div className="w-full xl:max-w-4xl flex flex-col gap-6">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h2 className="text-xl font-bold text-slate-800">Denah Parkiran</h2>
                            <p className="text-sm text-slate-500">Pilih tempat yang tersedia untuk memesan.</p>
                        </div>

                        <div className="flex gap-4 w-full md:w-auto mt-2 md:mt-0">
                            <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-2 flex-1 md:flex-none flex flex-col items-center justify-center">
                                <span className="text-2xl font-bold text-blue-600 leading-none">{availableSpots}</span>
                                <span className="text-[10px] text-blue-600/80 font-bold uppercase tracking-wider mt-1">Kosong</span>
                            </div>
                            <div className="bg-red-50 border border-red-100 rounded-lg px-4 py-2 flex-1 md:flex-none flex flex-col items-center justify-center">
                                <span className="text-2xl font-bold text-red-600 leading-none">{occupiedSpots}</span>
                                <span className="text-[10px] text-red-600/80 font-bold uppercase tracking-wider mt-1">Terisi</span>
                            </div>
                            <div className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 flex-1 md:flex-none flex flex-col items-center justify-center">
                                <span className="text-2xl font-bold text-slate-700 leading-none">{totalSpots}</span>
                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">Total</span>
                            </div>
                        </div>

                        <div className="relative w-full md:w-64">
                            <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                            <input
                                type="text"
                                placeholder="Cari lokasi (A1) / ukuran..."
                                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="relative overflow-x-auto rounded-xl border border-slate-100 shadow-sm bg-white p-4 custom-scrollbar flex justify-center">
                        <div style={{ minWidth: '600px' }} className="flex justify-center">
                            <ParkingMap onSpotClick={setSelectedSpot} searchQuery={searchQuery} />
                        </div>
                    </div>

                    <div className="flex gap-6 mt-2 justify-center text-sm font-medium">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded border-2 border-slate-300 bg-white border-dashed"></div>
                            <span className="text-slate-600">Tersedia</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded border-2 border-red-700 bg-red-500"></div>
                            <span className="text-slate-600">Terisi</span>
                        </div>
                    </div>
                </div>
            </div>

            {selectedSpot && (
                <BookingModal
                    spot={selectedSpot}
                    onClose={() => setSelectedSpot(null)}
                />
            )}
        </>
    );
};
