import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, RefreshCw, Heart, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';
import { compliments } from '../data/compliments';

export default function ComplimentGenerator() {
  const [currentCompliment, setCurrentCompliment] = useState(compliments[0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showSurprise, setShowSurprise] = useState(false);
  const [counter, setCounter] = useState(0)

  const TARGET_CLICKS = compliments.length; // Number of compliments before the surprise

  const generateCompliment = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount === TARGET_CLICKS) {
      setShowSurprise(true);
      triggerConfetti();
      setIsAnimating(false);
      return;
    }
    
    // Simple random selection that tries to avoid the immediate previous one

    let nextCompliment = compliments[counter + 1];
    setCounter(counter + 1)


    setCurrentCompliment(nextCompliment);
    
    // Reset animation lock after a short delay
    setTimeout(() => setIsAnimating(false), 500);
  };

  const triggerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ec4899', '#a855f7', '#fb7185']
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ec4899', '#a855f7', '#fb7185']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const getButtonText = () => {
    if (clickCount === 0) return "Bắt đầu nào";
    
    if (clickCount < TARGET_CLICKS) return "Vẫn còn nữa nè...";
    
    return "Xem lại từ đầu";
  };

  const reset = () => {
    setClickCount(0);
    setShowSurprise(false);
    setCurrentCompliment(compliments[0]);
    setCounter(0)
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-10 left-10 text-pink-200 animate-pulse">
        <Heart className="w-12 h-12 rotate-[-15deg]" fill="currentColor" />
      </div>
      <div className="absolute bottom-10 right-10 text-purple-200 animate-pulse delay-700">
        <Heart className="w-16 h-16 rotate-[15deg]" fill="currentColor" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 font-display">
            🌸 Happy 8/3!
          </h1>
          <p className="text-gray-500">
            Một chút năng lượng tích cực dành cho cậu ✨
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 mb-8 relative border border-pink-100 min-h-[450px] md:min-h-[500px] transition-all duration-500 overflow-hidden">
          <AnimatePresence mode="wait">
            {showSurprise ? (
              <motion.div
                key="surprise"
                initial={{ opacity: 0, scale: 0.96, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex flex-col items-center justify-center px-6 py-8 md:px-10 md:py-10 bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl border-2 border-pink-200"
              >
                <Gift className="w-10 h-10 md:w-12 md:h-12 text-pink-500 mb-4 animate-bounce" />

                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 font-display text-center">
                  Điều bất ngờ cuối cùng!
                </h3>

                <div className="w-full max-w-2xl">
                  <p className="text-base md:text-lg text-gray-700 leading-8 text-left md:text-justify">
                    Cảm ơn Ngân vì đã xuất hiện nhó 😉. Tui mong Ngân luôn xinh đẹp, luôn
                    rạng rỡ, luôn có nhiều mối quan hệ tốt xung quanh 😁. Thời gian qua tui
                    làm phiền Ngân nhiều òi, Ngân cho tui xin lỗi nha 😅. Mong là từ nay tui
                    hong có vậy nữa hehe. Chúc Ngân luôn vui và gặp nhiều điều tốt đẹp ❤️.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={currentCompliment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center px-6 md:px-10"
              >
                <p className="max-w-2xl text-lg md:text-2xl font-medium text-gray-700 leading-relaxed text-center">
                  "{currentCompliment.text}"
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-col items-center gap-4">
          <button
            onClick={showSurprise ? reset : generateCompliment}
            disabled={isAnimating}
            className={`group relative font-semibold py-4 px-8 rounded-full shadow-lg border-2 transition-all active:scale-95 flex items-center gap-3
              ${showSurprise 
                ? 'bg-pink-500 hover:bg-pink-600 text-white border-transparent' 
                : 'bg-white hover:bg-pink-50 text-pink-600 border-pink-100 hover:border-pink-200'
              }`}
          >
            {showSurprise ? (
              <RefreshCw className="w-5 h-5" />
            ) : (
              <Sparkles className={`w-5 h-5 ${isAnimating ? 'animate-spin' : ''}`} />
            )}
            <span>{getButtonText()}</span>
            {!showSurprise && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-pink-500 text-white text-xs rounded-full flex items-center justify-center shadow-sm">
                {Math.max(0, TARGET_CLICKS - clickCount)}
              </div>
            )}
          </button>
          
          {!showSurprise && clickCount > 0 && (
            <p className="text-xs text-gray-400 animate-pulse">
              Còn {TARGET_CLICKS - clickCount} điều thú vị nữa đang chờ...
            </p>
          )}
        </div>
      </motion.div>

      <footer className="absolute bottom-4 text-center text-gray-400 text-sm">
        Made with 💖 for 8/3
      </footer>
    </div>
  );
}
