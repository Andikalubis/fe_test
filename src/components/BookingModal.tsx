import React, { useState } from 'react';
import { useParkingStore, type ParkingSpot } from '../store/useParkingStore';

interface BookingModalProps {
    spot: ParkingSpot;
    onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ spot, onClose }) => {
    const addBooking = useParkingStore((state) => state.addBooking);
    const [name, setName] = useState('');
    const [vehicleNo, setVehicleNo] = useState('');
    const [durationMinutes, setDurationMinutes] = useState(30);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !vehicleNo || durationMinutes <= 0) return;

        addBooking({
            spotId: spot.id,
            name,
            vehicleNo,
            durationMinutes,
        });

        setIsSuccess(true);
        setTimeout(() => {
            onClose();
        }, 2000);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                <div className="bg-blue-600 px-6 py-4 flex justify-between items-center text-white">
                    <h2 className="text-xl font-bold">Pesan Tempat Parkir</h2>
                    <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </button>
                </div>

                <div className="p-6">
                    {isSuccess ? (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-2">Pemesanan Berhasil!</h3>
                            <p className="text-slate-500">Tempat parkir Anda telah dikonfirmasi.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                                <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Spot Pilihan</span>
                                <span className="text-blue-700 font-bold bg-blue-100 px-3 py-1 rounded-md">
                                    {spot.locationCode} - {spot.size}
                                </span>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Nama Pemesan</label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                                    placeholder="Masukkan nama lengkap"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Nomor Kendaraan</label>
                                <input
                                    type="text"
                                    required
                                    value={vehicleNo}
                                    onChange={(e) => setVehicleNo(e.target.value.toUpperCase())}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all uppercase placeholder:text-slate-400 placeholder:normal-case"
                                    placeholder="B 1234 ABC"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Durasi Parkir (Menit)</label>
                                <select
                                    value={durationMinutes}
                                    onChange={(e) => setDurationMinutes(Number(e.target.value))}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
                                >
                                    <option value={1}>1 Menit (Test)</option>
                                    <option value={30}>30 Menit</option>
                                    <option value={60}>1 Jam</option>
                                    <option value={120}>2 Jam</option>
                                    <option value={180}>3 Jam</option>
                                </select>
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 px-4 py-2 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg font-medium transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
                                >
                                    Konfirmasi
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};
