'use client';

import { useState } from 'react';
import Link from 'next/link';
import { gearList, GearItem } from '@/data/gear';
import { gearImg } from '@/data/images';
import { formatPrice, roiColor, getLevelLabel } from '@/lib/utils';

interface Question {
  key: string;
  question: string;
  options: { label: string; value: string; icon?: string }[];
}

const questions: Question[] = [
  {
    key: 'budget',
    question: 'What is your total budget for gear?',
    options: [
      { label: 'Below RM500', value: 'low', icon: '🪙' },
      { label: 'RM500 — RM1,500', value: 'mid-low', icon: '💰' },
      { label: 'RM1,500 — RM3,000', value: 'mid', icon: '💵' },
      { label: 'RM3,000+', value: 'high', icon: '🤑' },
    ],
  },
  {
    key: 'niche',
    question: 'What type of content do you want to make?',
    options: [
      { label: 'Food reviews', value: 'food', icon: '🍜' },
      { label: 'Tech / Gadget reviews', value: 'tech', icon: '💻' },
      { label: 'Beauty & Fashion', value: 'beauty', icon: '💄' },
      { label: 'Travel vlogs', value: 'travel', icon: '🌴' },
      { label: 'Daily vlogs / General', value: 'vlog', icon: '🎬' },
      { label: 'Automotive / Cars', value: 'auto', icon: '🚗' },
    ],
  },
  {
    key: 'experience',
    question: 'What is your experience level?',
    options: [
      { label: 'Complete beginner — never touched a camera', value: 'beginner', icon: '🐣' },
      { label: 'Some experience — used phone or basic camera', value: 'mid', icon: '👍' },
      { label: 'I know what I am doing — need an upgrade', value: 'pro', icon: '🔥' },
    ],
  },
  {
    key: 'phone',
    question: 'Do you already own a flagship phone?',
    options: [
      { label: 'Yes — iPhone 13+ / Samsung S23+ / Xiaomi 13+', value: 'yes', icon: '📱' },
      { label: 'No — basic phone, need dedicated camera', value: 'no', icon: '📷' },
    ],
  },
  {
    key: 'timeline',
    question: 'When do you need to start earning?',
    options: [
      { label: 'Yesterday — I need money NOW', value: 'now', icon: '⚡' },
      { label: 'Within 1 month', value: 'soon', icon: '🏃' },
      { label: 'Within 3 months — taking it steady', value: 'steady', icon: '🧘' },
      { label: 'No rush — building for the long term', value: 'long', icon: '🌱' },
    ],
  },
];

function scoreGear(gear: GearItem, answers: Record<string, string>): { gear: GearItem; score: number } {
  let score = 0;

  const budget = answers.budget;
  if (budget === 'low' && gear.priceUsed <= 500) score += 30;
  else if (budget === 'mid-low' && gear.priceUsed > 500 && gear.priceUsed <= 1500) score += 30;
  else if (budget === 'mid' && gear.priceUsed > 1500 && gear.priceUsed <= 3000) score += 25;
  else if (budget === 'high' && gear.priceUsed > 3000) score += 20;
  else if (budget === 'mid' && gear.priceUsed <= 1500) score += 10;
  else if (budget === 'mid-low' && gear.priceUsed <= 500) score += 15;

  const exp = answers.experience;
  if (exp === 'beginner' && gear.level === 'beginner') score += 20;
  else if (exp === 'mid' && (gear.level === 'beginner' || gear.level === 'mid')) score += 15;
  else if (exp === 'pro' && gear.level === 'pro') score += 20;
  else if (exp === 'pro' && gear.level === 'mid') score += 10;

  const phone = answers.phone;
  if (phone === 'yes' && gear.category === 'mobile') score += 10;
  if (phone === 'no' && gear.category !== 'mobile') score += 15;

  const timeline = answers.timeline;
  if (timeline === 'now' && gear.priceUsed <= 500) score += 15;
  if (timeline === 'soon' && gear.priceUsed <= 1600) score += 10;
  if (timeline === 'long' && gear.roiScore >= 85) score += 10;

  score += gear.roiScore * 0.3;

  return { gear, score };
}

export default function QuizClient() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<GearItem[] | null>(null);

  const current = questions[step];
  const isLast = step === questions.length - 1;
  const progress = ((step + 1) / questions.length) * 100;

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [current.key]: value };
    setAnswers(newAnswers);

    if (isLast) {
      const scored = gearList.map(g => scoreGear(g, newAnswers)).sort((a, b) => b.score - a.score);
      setResults(scored.slice(0, 4).map(s => s.gear));
    } else {
      setStep(step + 1);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setResults(null);
  };

  if (results) {
    return (
      <div>
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🎉</div>
          <h2 className="text-3xl font-black mb-2">Your Perfect Gear Matches</h2>
          <p className="text-zinc-400">Based on your answers, here are the best gear options for you.</p>
        </div>
        <div className="space-y-4 mb-8">
          {results.map((gear, i) => (
            <Link
              key={gear.slug}
              href={`/gear/${gear.slug}`}
              className={`block bg-zinc-900/80 border rounded-2xl overflow-hidden hover:border-red-500/30 transition-all group ${
                i === 0 ? 'border-red-500/40 ring-1 ring-red-500/20' : 'border-zinc-800'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 flex-shrink-0 overflow-hidden bg-zinc-800">
                  <img
                    src={gearImg(gear.slug)}
                    alt={gear.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 min-w-0 pr-4"><div className="flex items-center gap-2 mb-1">
                    {i === 0 && <span className="text-xs font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded">BEST MATCH</span>}
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      gear.level === 'beginner' ? 'bg-green-500/20 text-green-400' :
                      gear.level === 'mid' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>{getLevelLabel(gear.level)}</span>
                  </div>
                  <h3 className="font-bold text-lg group-hover:text-red-400 transition-colors">{gear.name}</h3>
                  <p className="text-sm text-zinc-400 line-clamp-1">{gear.excerpt.slice(0, 80)}...</p>
                </div>
                <div className="text-right">
                  <div className="text-green-400 font-black text-xl">{formatPrice(gear.priceUsed)}</div>
                  <div className={`text-sm font-bold ${roiColor(gear.roiScore)}`}>ROI {gear.roiScore}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="px-6 py-3 bg-zinc-800 rounded-xl font-bold hover:bg-zinc-700 transition-colors">
            Retake Quiz
          </button>
          <Link href="/compare" className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl font-bold hover:shadow-xl hover:shadow-red-500/25 transition-all">
            Compare All Gear →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-zinc-500 mb-2">
          <span>Step {step + 1} of {questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-red-500 to-pink-600 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Question */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 md:p-8">
        <h2 className="text-2xl font-black mb-6">{current.question}</h2>
        <div className="space-y-3">
          {current.options.map(opt => (
            <button
              key={opt.value}
              onClick={() => handleAnswer(opt.value)}
              className="w-full flex items-center gap-4 p-4 bg-zinc-800/50 border border-zinc-700/50 rounded-xl hover:border-red-500/30 hover:bg-zinc-800 transition-all text-left group"
            >
              {opt.icon && <span className="text-2xl">{opt.icon}</span>}
              <span className="font-semibold group-hover:text-white transition-colors">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
