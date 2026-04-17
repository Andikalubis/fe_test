import { ActiveBookings } from '../components/ActiveBookings';

export const DetailsPage = () => {
  return (
    <div className="max-w-3xl mx-auto w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Detail Pesanan</h1>
        <p className="text-slate-500">Kelola sesi parkir Anda yang sedang aktif.</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <ActiveBookings />
      </div>
    </div>
  );
};
