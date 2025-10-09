'use client'

import { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

interface CountdownTimerProps {
  initialHours?: number;
  initialMinutes?: number;
  initialSeconds?: number;
  onComplete?: () => void;
}

export default function CountdownTimer({ 
  initialHours = 23,
  initialMinutes = 59,
  initialSeconds = 59,
  onComplete
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: initialHours,
    minutes: initialMinutes,
    seconds: initialSeconds
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          if (onComplete) onComplete();
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="bg-red-600 text-white p-4 rounded-xl max-w-md mx-auto">
      <div className="flex items-center justify-center gap-2 mb-2">
        <AlertCircle className="w-5 h-5" />
        <span className="font-bold">Oferta expira em:</span>
      </div>
      <div className="flex justify-center gap-4 text-2xl font-bold">
        <div className="bg-white/20 px-3 py-2 rounded">
          {timeLeft.hours.toString().padStart(2, '0')}
        </div>
        <span>:</span>
        <div className="bg-white/20 px-3 py-2 rounded">
          {timeLeft.minutes.toString().padStart(2, '0')}
        </div>
        <span>:</span>
        <div className="bg-white/20 px-3 py-2 rounded">
          {timeLeft.seconds.toString().padStart(2, '0')}
        </div>
      </div>
    </div>
  );
}
