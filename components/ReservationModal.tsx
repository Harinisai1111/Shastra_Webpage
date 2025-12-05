import React, { useState } from 'react';
import { User } from '../types';
import { X, CheckCircle, Loader2 } from 'lucide-react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onLogin: (user: User) => void;
}

type AuthMode = 'LOGIN' | 'SIGNUP';
type ViewState = 'AUTH' | 'FORM' | 'SUCCESS';

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose, user, onLogin }) => {
  const [view, setView] = useState<ViewState>(user ? 'FORM' : 'AUTH');
  const [authMode, setAuthMode] = useState<AuthMode>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);

  // Form States
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState('2');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  if (!isOpen) return null;

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const endpoint = authMode === 'SIGNUP' ? '/api/auth/signup' : '/api/auth/login';
      const response = await fetch(`http://localhost:3001${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: authMode === 'SIGNUP' ? name : undefined,
          email,
          phone
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      // Success - update user state and move to form
      onLogin(data.user);
      setView('FORM');
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      alert(error.message || 'An error occurred. Please try again.');
    }
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const specialRequest = formData.get('specialRequest') as string;

      const response = await fetch('http://localhost:3001/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user?.email || email,
          name: user?.name || name,
          phone: user?.phone || phone,
          date,
          time,
          guests,
          specialRequest: specialRequest || ''
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Reservation failed');
      }

      // Success - show success view
      setView('SUCCESS');
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      alert(error.message || 'Failed to create reservation. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-shastra-maroon/80 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="px-6 py-4 bg-shastra-maroon text-white flex justify-between items-center shrink-0">
          <h3 className="font-serif text-xl tracking-wide">
            {view === 'SUCCESS' ? 'Reservation Confirmed' : 'Reserve a Table'}
          </h3>
          <button onClick={onClose} className="hover:bg-white/10 p-1 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto">
          {view === 'AUTH' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="text-center mb-6">
                <p className="text-gray-500 font-sans text-sm">Please login to manage your reservation</p>
              </div>

              <div className="flex border-b border-gray-200 mb-6">
                <button
                  onClick={() => setAuthMode('LOGIN')}
                  className={`flex-1 pb-2 text-sm font-medium transition-colors ${authMode === 'LOGIN' ? 'text-shastra-maroon border-b-2 border-shastra-maroon' : 'text-gray-400'}`}
                >
                  Login
                </button>
                <button
                  onClick={() => setAuthMode('SIGNUP')}
                  className={`flex-1 pb-2 text-sm font-medium transition-colors ${authMode === 'SIGNUP' ? 'text-shastra-maroon border-b-2 border-shastra-maroon' : 'text-gray-400'}`}
                >
                  Sign Up
                </button>
              </div>

              <form onSubmit={handleAuth} className="space-y-4">
                {authMode === 'SIGNUP' && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Full Name</label>
                    <input
                      required
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-shastra-maroon focus:border-transparent outline-none transition-all"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                )}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Email Address</label>
                  <input
                    required
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-shastra-maroon focus:border-transparent outline-none transition-all"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Phone Number</label>
                  <input
                    required
                    type="tel"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-shastra-maroon focus:border-transparent outline-none transition-all"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-shastra-maroon text-shastra-gold font-semibold rounded-lg hover:bg-red-900 transition-colors flex justify-center items-center gap-2 mt-4"
                >
                  {isLoading ? <Loader2 className="animate-spin" size={20} /> : (authMode === 'LOGIN' ? 'Login to Continue' : 'Create Account')}
                </button>
              </form>
            </div>
          )}

          {view === 'FORM' && (
            <form onSubmit={handleBooking} className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="bg-shastra-gold/10 p-3 rounded-lg mb-4 text-sm text-shastra-maroon">
                Booking for <strong>{user?.name || name}</strong>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Date</label>
                  <input
                    required
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-shastra-maroon focus:border-transparent outline-none"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Time</label>
                  <input
                    required
                    type="time"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-shastra-maroon focus:border-transparent outline-none"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Number of Guests</label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-shastra-maroon focus:border-transparent outline-none bg-white"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => <option key={n} value={n}>{n} People</option>)}
                  <option value="10+">10+ (Large Group)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Special Request (Optional)</label>
                <textarea
                  name="specialRequest"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-shastra-maroon focus:border-transparent outline-none"
                  rows={3}
                  placeholder="High chair, birthday, quiet corner..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-shastra-maroon text-white font-semibold rounded-lg hover:bg-red-900 transition-colors flex justify-center items-center gap-2 mt-2 shadow-lg shadow-shastra-maroon/30"
              >
                {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Confirm Reservation'}
              </button>
            </form>
          )}

          {view === 'SUCCESS' && (
            <div className="text-center py-8 animate-in zoom-in duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-green-600" size={32} />
              </div>
              <h4 className="font-serif text-2xl text-shastra-dark mb-2">Table Reserved!</h4>
              <p className="text-gray-500 mb-6">
                We have sent a confirmation to <strong>{email}</strong>.<br />
                See you on {date} at {time}.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
