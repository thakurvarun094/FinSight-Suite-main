'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function RiskGauge({ score = 0, severity = 'low', size = 'large' }) {
  const sizeConfig = {
    small: { width: 160, height: 96, inner: 52, outer: 70, text: 'text-3xl', sub: 'text-[10px]' },
    medium: { width: 220, height: 132, inner: 70, outer: 95, text: 'text-4xl', sub: 'text-xs' },
    large: { width: 280, height: 168, inner: 90, outer: 120, text: 'text-5xl', sub: 'text-sm' },
  };
  const cfg = sizeConfig[size] || sizeConfig.large;

  const data = [
    { name: 'score', value: score },
    { name: 'remainder', value: 100 - score }
  ];

  const getColor = (sev) => {
    switch (sev?.toLowerCase?.() ?? sev) {
      case 'critical': return { main: '#dc2626', from: '#dc2626', to: '#991b1b', bg: 'from-danger-500/10 to-danger-600/5', ring: 'ring-danger-500/20' };
      case 'high': return { main: '#ea580c', from: '#ea580c', to: '#c2410c', bg: 'from-orange-500/10 to-orange-600/5', ring: 'ring-orange-500/20' };
      case 'medium': return { main: '#eab308', from: '#eab308', to: '#ca8a04', bg: 'from-yellow-500/10 to-yellow-600/5', ring: 'ring-yellow-500/20' };
      case 'low':
      default: return { main: '#059669', from: '#059669', to: '#047857', bg: 'from-success-500/10 to-success-600/5', ring: 'ring-success-500/20' };
    }
  };

  const color = getColor(severity);
  const severityLabel = `${(severity || 'low').charAt(0).toUpperCase()}${(severity || 'low').slice(1)}`;

  return (
    <div className={`relative inline-flex flex-col items-center justify-center p-8 rounded-3xl bg-gradient-to-br ${color.bg} ring-1 ${color.ring}`}>
      <div style={{ width: cfg.width, height: cfg.height, position: 'relative' }}>
        <svg
          className="absolute inset-0"
          style={{ width: cfg.width, height: cfg.height }}
          viewBox={`0 0 ${cfg.width} ${cfg.height}`}
        >
          <defs>
            <linearGradient id="gauge-bg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f1f5f9" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>
            <linearGradient id="gauge-score" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={color.from} />
              <stop offset="100%" stopColor={color.to} />
            </linearGradient>
            <filter id="gauge-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feFlood floodColor={color.main} floodOpacity="0.4" result="glowColor" />
              <feComposite in="glowColor" in2="blur" operator="in" result="softGlow" />
              <feMerge>
                <feMergeNode in="softGlow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={[{ name: 'bg', value: 100 }]}
              cx="50%"
              cy="100%"
              startAngle={180}
              endAngle={0}
              innerRadius={cfg.inner}
              outerRadius={cfg.outer}
              paddingAngle={0}
              dataKey="value"
              stroke="none"
            >
              <Cell fill="url(#gauge-bg)" />
            </Pie>
            <Pie
              data={data}
              cx="50%"
              cy="100%"
              startAngle={180}
              endAngle={0}
              innerRadius={cfg.inner}
              outerRadius={cfg.outer}
              paddingAngle={0}
              dataKey="value"
              stroke="none"
            >
              <Cell key="score" fill="url(#gauge-score)" filter="url(#gauge-glow)" />
              <Cell key="remainder" fill="transparent" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center pb-2">
        <div className={`font-extrabold text-slate-900 tracking-tight ${cfg.text}`}>
          {score.toFixed(1)}
        </div>
        <div
          className={`font-black uppercase tracking-[0.2em] mt-1 ${cfg.sub}`}
          style={{ color: color.main }}
        >
          {severityLabel} Risk
        </div>
      </div>

      <div className="absolute -bottom-1 left-1/2 w-3 h-3 -translate-x-1/2 rounded-full border-4 border-white shadow-large" style={{ backgroundColor: color.main }} />

      <div className="w-full flex justify-between mt-6 text-[10px] font-bold uppercase tracking-wider text-slate-400">
        <span>0</span>
        <span className="text-success-500">Safe</span>
        <span className="text-warning-500">Caution</span>
        <span className="text-danger-500">Danger</span>
        <span>100</span>
      </div>
    </div>
  );
}
