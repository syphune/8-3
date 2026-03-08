import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Lock, ArrowRight } from 'lucide-react';

interface PasswordGateProps {
  onUnlock: () => void;
}

export default function PasswordGate({ onUnlock }: PasswordGateProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password === '040402' || password === '04042002') {
      onUnlock();
    } else {
      setError(true);
      // Shake animation trigger could go here, handled by motion
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-pink-100"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-pink-100 p-4 rounded-full">
            <Lock className="w-8 h-8 text-pink-500" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Chào cậu! 👋
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Nhập mật khẩu bí mật để xem món quà nhỏ này nhé.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Nhập mật khẩu..."
              className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-colors text-center text-lg tracking-widest
                ${error 
                  ? 'border-red-300 bg-red-50 focus:border-red-400' 
                  : 'border-pink-100 focus:border-pink-300 focus:bg-pink-50/50'
                }`}
              autoFocus
            />
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm text-center font-medium"
            >
              Mật khẩu chưa đúng rồi, thử lại nhé! 😅
            </motion.p>
          )}

          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 group"
          >
            Mở khóa
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </motion.div>
    </div>
  );
}
