import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
}

/**
 * Official Pomegran Emblem
 * Precise vector replica of the dotted perspective sphere and calyx crown from the brand asset.
 */
export const PomegranEmblem: React.FC<{
  className?: string;
  size?: number;
  color?: string;
}> = ({ className = '', size = 44, color = '#BA1E38' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Pomegran Emblem"
    >
      {/* Pomegranate Calyx Crown at top-left (~10 o'clock) */}
      <path
        d="M24 28C22 22 17 19 11 20C14 23 15 27 15 30C12 30 9 32 7 35C11 37 15 36 18 38C19 41 20 44 23 47C24 42 24 35 24 28Z"
        fill={color}
      />

      {/* Orbiting Crescent Outer Arc Contour */}
      <path
        d="M27 27C37 16 52 10 68 10C92 10 106 28 106 52C106 72 92 90 70 94C71 90 71 85 70 81C86 77 94 64 94 50C94 32 82 18 64 18C51 18 38 24 30 33L27 27Z"
        fill={color}
      />

      {/* 3D Halftone Perspective Sphere Dots (Concentric radiating perspective rings) */}
      <g fill={color}>
        {/* Ring 1 - Upper Pole Core */}
        <circle cx="48" cy="24" r="1.6" />
        <circle cx="54" cy="25" r="1.8" />
        <circle cx="60" cy="27" r="1.9" />
        <circle cx="66" cy="30" r="2.0" />
        <circle cx="72" cy="34" r="2.0" />
        <circle cx="77" cy="39" r="1.9" />

        {/* Ring 2 */}
        <circle cx="41" cy="27" r="1.8" />
        <circle cx="47" cy="29" r="2.2" />
        <circle cx="53" cy="31" r="2.4" />
        <circle cx="59" cy="34" r="2.6" />
        <circle cx="66" cy="37" r="2.6" />
        <circle cx="72" cy="42" r="2.4" />
        <circle cx="78" cy="47" r="2.2" />
        <circle cx="83" cy="53" r="1.9" />

        {/* Ring 3 */}
        <circle cx="34" cy="32" r="2.0" />
        <circle cx="40" cy="35" r="2.5" />
        <circle cx="46" cy="37" r="2.8" />
        <circle cx="53" cy="40" r="3.1" />
        <circle cx="60" cy="44" r="3.1" />
        <circle cx="67" cy="48" r="3.0" />
        <circle cx="73" cy="53" r="2.7" />
        <circle cx="79" cy="59" r="2.3" />
        <circle cx="84" cy="65" r="1.8" />

        {/* Ring 4 - Equator Front Face */}
        <circle cx="29" cy="38" r="2.2" />
        <circle cx="35" cy="41" r="2.8" />
        <circle cx="41" cy="45" r="3.3" />
        <circle cx="48" cy="48" r="3.6" />
        <circle cx="55" cy="52" r="3.6" />
        <circle cx="62" cy="56" r="3.4" />
        <circle cx="69" cy="61" r="3.1" />
        <circle cx="75" cy="66" r="2.6" />
        <circle cx="80" cy="72" r="2.0" />

        {/* Ring 5 */}
        <circle cx="26" cy="46" r="2.1" />
        <circle cx="31" cy="49" r="2.8" />
        <circle cx="37" cy="53" r="3.3" />
        <circle cx="44" cy="57" r="3.7" />
        <circle cx="51" cy="62" r="3.7" />
        <circle cx="58" cy="66" r="3.4" />
        <circle cx="65" cy="71" r="3.0" />
        <circle cx="71" cy="76" r="2.4" />

        {/* Ring 6 */}
        <circle cx="24" cy="54" r="2.0" />
        <circle cx="29" cy="58" r="2.6" />
        <circle cx="35" cy="63" r="3.2" />
        <circle cx="42" cy="67" r="3.5" />
        <circle cx="49" cy="72" r="3.5" />
        <circle cx="56" cy="77" r="3.1" />
        <circle cx="62" cy="81" r="2.6" />

        {/* Ring 7 */}
        <circle cx="25" cy="63" r="1.9" />
        <circle cx="30" cy="68" r="2.5" />
        <circle cx="36" cy="73" r="2.9" />
        <circle cx="43" cy="77" r="3.1" />
        <circle cx="50" cy="82" r="3.0" />
        <circle cx="56" cy="86" r="2.4" />

        {/* Ring 8 - Lower South Pole */}
        <circle cx="29" cy="73" r="1.7" />
        <circle cx="34" cy="78" r="2.2" />
        <circle cx="40" cy="82" r="2.5" />
        <circle cx="46" cy="86" r="2.6" />
        <circle cx="52" cy="90" r="2.1" />

        {/* Ring 9 */}
        <circle cx="35" cy="86" r="1.6" />
        <circle cx="41" cy="89" r="2.0" />
        <circle cx="46" cy="92" r="1.8" />
      </g>
    </svg>
  );
};

/**
 * Official POMEGRAN Wordmark
 * Precise geometric typography with signature downward-looping notched G
 */
export const PomegranWordmark: React.FC<{
  className?: string;
  height?: number;
  color?: string;
}> = ({ className = '', height = 24, color = '#BA1E38' }) => {
  return (
    <svg
      height={height}
      viewBox="0 0 410 54"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="POMEGRAN"
    >
      {/* P - distinctive curved loop with smooth horizontal stroke */}
      <path
        d="M8 8H35C46 8 52 14 52 23C52 32 46 38 35 38H22V50H8V8ZM22 19V27H34C37 27 39 25 39 23C39 21 37 19 34 19H22Z"
      />

      {/* O - clean rounded squircle */}
      <path
        d="M82 8C101 8 112 18 112 30C112 41 101 51 82 51C63 51 52 41 52 30C52 18 63 8 82 8ZM82 19C71 19 66 23 66 30C66 36 71 40 82 40C93 40 98 36 98 30C98 23 93 19 82 19Z"
      />

      {/* M - bold vertical outer pillars with crisp centered V */}
      <path
        d="M120 8H133L146 30L159 8H172V50H159V23L149 39H143L133 23V50H120V8Z"
      />

      {/* E - horizontal clean geometry */}
      <path
        d="M182 8H217V19H195V24H213V34H195V39H218V50H182V8Z"
      />

      {/* G - The iconic signature downward ribbon stem with notched tail */}
      <path
        d="M249 8C265 8 274 16 275 27H262C260 21 256 19 249 19C240 19 234 23 234 29C234 35 240 39 249 39C256 39 260 36 261 32H251V25H274V41C274 46 270 50 263 52C261 53 259 52 258 50C259 47 261 44 261 41C258 45 253 47 246 47C231 47 222 38 222 29C222 17 232 8 249 8Z"
      />
      {/* Downward notch loop on G stem */}
      <path
        d="M261 35H274V50L268 46L261 50V35Z"
      />

      {/* R - rounded bowl with firm diagonal leg */}
      <path
        d="M284 8H308C318 8 325 13 325 21C325 27 321 31 314 33L327 50H312L300 35H298V50H284V8ZM298 18V25H307C310 25 312 23 312 21C312 19 310 18 307 18H298Z"
      />

      {/* A - triangular geometry with balanced bar */}
      <path
        d="M341 8H355L371 50H357L354 41H342L339 50H325L341 8ZM348 21L344 32H352L348 21Z"
      />

      {/* N - dual vertical lines with diagonal bridge */}
      <path
        d="M379 8H392L412 34V8H424V50H413L391 23V50H379V8Z"
      />
    </svg>
  );
};

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  variant?: 'default' | 'on-dark' | 'white';
  emblemColor?: string;
  wordmarkColor?: string;
}

/**
 * Complete Pomegran Logo Lockup
 * Replicates the exact horizontal layout from brand asset:
 * [Emblem] P O M E G R A N
 */
export const PomegranLogo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  color,
  variant = 'default',
  emblemColor: customEmblemColor,
  wordmarkColor: customWordmarkColor,
}) => {
  const emblemSizes = {
    sm: 28,
    md: 38,
    lg: 48,
    xl: 60,
  };

  const wordmarkHeights = {
    sm: 18,
    md: 24,
    lg: 32,
    xl: 40,
  };

  // Default colors
  let emblemColor = customEmblemColor || color || '#BA1E38';
  let wordmarkColor = customWordmarkColor || color || '#BA1E38';

  if (variant === 'on-dark') {
    // User requirement: Emblem ("this") in White, the word "pomegran" in Red
    emblemColor = customEmblemColor || '#FFFFFF';
    wordmarkColor = customWordmarkColor || '#FF2E51';
  } else if (variant === 'white') {
    emblemColor = customEmblemColor || '#FFFFFF';
    wordmarkColor = customWordmarkColor || '#FFFFFF';
  }

  return (
    <div className={`inline-flex items-center gap-3.5 select-none ${className}`}>
      <PomegranEmblem size={emblemSizes[size]} color={emblemColor} className="shrink-0" />
      <PomegranWordmark height={wordmarkHeights[size]} color={wordmarkColor} className="shrink-0" />
    </div>
  );
};
