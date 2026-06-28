import React from "react";

interface CelenganAyamIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export function CelenganAyamIcon({ className = "w-12 h-12", ...props }: CelenganAyamIconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Tail feathers */}
      <path
        d="M8 38C5 32 6 24 10 20C12 22 13 25 12 28C14 24 18 22 20 23C19 26 17 29 14 31C18 28 23 29 24 32C22 34 18 35 12 35"
        fill="#10b981"
      />
      <path
        d="M10 42C7 38 7 32 10 29C12 31 12 33 11 35C13 32 17 31 18 32C17 34 15 36 13 37"
        fill="#3b82f6"
      />
      {/* Feet */}
      <path
        d="M26 46V52M26 52L23 54M26 52L29 54"
        stroke="#f59e0b"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M34 46V52M34 52L31 54M34 52L37 54"
        stroke="#f59e0b"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Clay Body */}
      <path
        d="M12 38C12 25 22 16 34 16C44 16 50 24 50 34C50 42 40 46 30 46C20 46 12 43 12 38Z"
        fill="url(#clayGrad)"
      />
      {/* Neck and Head */}
      <path
        d="M32 18C32 12 36 8 42 8C46 8 49 11 48 16C47 22 42 24 36 24"
        fill="url(#clayGrad)"
      />
      {/* Comb */}
      <path
        d="M40 8C39 5 41 2 43 2C45 2 46 4 46 6C48 4 50 5 50 7C50 9 48 10 46 10C46 12 44 13 42 13C41 13 40 10 40 8Z"
        fill="#ef4444"
      />
      {/* Beak */}
      <path d="M48 13L53 15L48 17Z" fill="#f59e0b" />
      {/* Wattle */}
      <path d="M45 17C45 20 43 22 42 22C41 22 41 20 42 17" fill="#ef4444" />
      {/* Eye */}
      <circle cx="42" cy="12" r="2" fill="#111827" />
      <circle cx="42.5" cy="11.5" r="0.6" fill="white" />
      {/* Coin Slot */}
      <rect
        x="22"
        y="14"
        width="8"
        height="2"
        rx="0.5"
        transform="rotate(-15 22 14)"
        fill="#111827"
      />
      {/* Wing */}
      <path
        d="M24 28C24 28 28 24 33 26C38 28 36 34 31 34C26 34 24 30 24 28Z"
        fill="#f59e0b"
        opacity="0.8"
      />
      <path
        d="M26 29C26 29 29 26 32 27C35 28 34 32 31 32C28 32 26 30 26 29Z"
        fill="#ef4444"
        opacity="0.9"
      />

      <defs>
        <linearGradient
          id="clayGrad"
          x1="12"
          y1="16"
          x2="50"
          y2="46"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="50%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#9a3412" />
        </linearGradient>
      </defs>
    </svg>
  );
}
