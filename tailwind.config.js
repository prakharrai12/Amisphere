module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './app/\(auth\)/**/*.{js,ts,jsx,tsx}',
    './app/\(dashboard\)/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    'bg-violet-600',
    'hover:bg-violet-700',
    'rounded-md',
    'shadow-sm',
    'border-slate-200',
    'text-white',
    'bg-white',
    'bg-[#111827]',
    'bg-slate-50',
    'bg-slate-400',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
