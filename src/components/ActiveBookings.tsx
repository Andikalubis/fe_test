import React, { useState, useEffect } from 'react';
import { useParkingStore } from '../store/useParkingStore';

interface ActiveBookingsProps {}

export const ActiveBookings: React.FC<ActiveBookingsProps> = () => {
    const { bookings, endSession, spots } = useParkingStore();
    const [now, setNow] = useState(Date.now());
    const [expandedBookingId, setExpandedBookingId] = useState<string | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(Date.now());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    if (bookings.length === 0) {
        return (
            <div className="text-center py-12 text-slate-500 bg-slate-50 rounded-xl border border-slate-100 border-dashed">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-slate-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                <p>Belum ada pemesanan aktif. Silakan pesan di Dashboard.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {bookings.map((booking) => {
                const spot = spots.find(s => s.id === booking.spotId);
                const spotName = spot?.locationCode || booking.spotId;
                const spotSize = spot?.size || '';
                
                const endTime = booking.startTime + booking.durationMinutes * 60 * 1000;
                const isOvertime = now > endTime;
                const diffMs = Math.abs(endTime - now);
                const diffMins = Math.floor(diffMs / 60000);
                const diffSecs = Math.floor((diffMs % 60000) / 1000);

                const timeString = `${String(diffMins).padStart(2, '0')}:${String(diffSecs).padStart(2, '0')}`;
                const isExpanded = expandedBookingId === booking.id;

                return (
                    <div 
                        key={booking.id} 
                        className={`bg-white rounded-xl shadow-sm border overflow-hidden transition-all duration-300 ease-in-out cursor-pointer hover:shadow-md ${isExpanded ? 'border-blue-400 ring-1 ring-blue-400' : 'border-slate-200'}`}
                        onClick={() => setExpandedBookingId(isExpanded ? null : booking.id)}
                    >
                        <div className="p-5 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="bg-blue-600 text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xl shadow-inner">
                                    {spotName}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-800 text-lg uppercase">{booking.vehicleNo}</h3>
                                    <p className="text-sm text-slate-500 line-clamp-1">{booking.name}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                {isOvertime ? (
                                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1">
                                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                                        Overtime
                                    </span>
                                ) : (
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1">
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                        Aktif
                                    </span>
                                )}
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-slate-400 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>

                        <div 
                            className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                            <div className="p-6 border-t border-slate-100" onClick={(e) => e.stopPropagation() /* Prevent collapse when clicking details */}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Nama Pemesan</p>
                                            <p className="text-slate-800 font-medium text-lg">{booking.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Detail Kendaraan / Spot</p>
                                            <p className="text-slate-800 font-medium">{booking.vehicleNo} &mdash; Spot <span className="font-bold text-blue-600">{spotName}</span> <span className="text-slate-400 font-normal">({spotSize})</span></p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Waktu Mulai Parkir</p>
                                            <p className="text-slate-800 font-medium">{new Date(booking.startTime).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 flex flex-col justify-center items-center text-center">
                                        <p className="text-sm font-semibold mb-2 uppercase tracking-wider text-slate-500">
                                            {isOvertime ? 'Terlambat selama' : 'Sisa Waktu Parkir'}
                                        </p>
                                        <p className={`text-5xl font-mono font-bold tracking-tight mb-2 ${isOvertime ? 'text-red-500' : 'text-blue-600'}`}>
                                            {timeString}
                                        </p>
                                        <p className="text-xs text-slate-400">dari total durasi {booking.durationMinutes} menit</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => endSession(booking.id)}
                                    className="w-full bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border border-red-200 hover:border-red-600 font-bold py-3 px-4 rounded-xl transition-all shadow-sm flex justify-center items-center gap-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                    Akhiri Sesi Parkir
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
