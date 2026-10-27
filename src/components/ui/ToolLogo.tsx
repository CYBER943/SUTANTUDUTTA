import React from 'react';

interface ToolLogoProps {
  slug: string;
  name: string;
  className?: string;
}

export default function ToolLogo({ slug, name, className = "w-10 h-10 lg:w-12 lg:h-12" }: ToolLogoProps) {
  const normalized = slug.toLowerCase().replace(/[^a-z0-9]/g, '');

  // 1. Microsoft Copilot: Official multicolor ribbon loops
  if (normalized === 'copilot' || normalized === 'microsoftcopilot' || normalized === 'githubcopilot') {
    return (
      <svg
        viewBox="-1 15 513 481"
        className={`${className} object-contain drop-shadow-md`}
        role="img"
        aria-label={`${name} logo`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient
            id="copilot-rad-1"
            cx="987.21"
            cy="1216.02"
            fx="987.21"
            fy="1216.02"
            r="2"
            gradientTransform="translate(-402710.6509 -405348.4949) rotate(116.7194) scale(232.2644 -445.8898) skewX(-9.7245)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset=".25" stopColor="#109df2" />
            <stop offset=".72" stopColor="#aad445" />
            <stop offset=".97" stopColor="#ffd400" />
          </radialGradient>
          <linearGradient
            id="copilot-lin-1"
            x1="175.87"
            y1="498.29"
            x2="173.86"
            y2="137.69"
            gradientTransform="translate(0 514) scale(1 -1)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#3dcbff" />
            <stop offset=".25" stopColor="#0588f7" stopOpacity="0" />
          </linearGradient>
          <radialGradient
            id="copilot-rad-2"
            cx="987.17"
            cy="1215.84"
            fx="987.17"
            fy="1215.84"
            r="2"
            gradientTransform="translate(-214974.3479 -373904.6811) rotate(116.0466) scale(242.0348 -294.2735) skewX(.4853)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset=".07" stopColor="#8c48ff" />
            <stop offset=".5" stopColor="#f2598a" />
            <stop offset=".9" stopColor="#ffb152" />
          </radialGradient>
          <linearGradient
            id="copilot-lin-2"
            x1="337.55"
            y1="400.48"
            x2="337.35"
            y2="302.27"
            gradientTransform="translate(0 514) scale(1 -1)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset=".06" stopColor="#f8adfa" />
            <stop offset=".71" stopColor="#a86edd" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Top ribbon loop */}
        <path
          fill="url(#copilot-rad-1)"
          d="M347.3,115.17l-5.16,20.63h-49.62c-36.77,0-68.82,25.03-77.74,60.7l-44.92,179.7h-89.69c-52.13,0-90.38-48.99-77.74-99.57L47.46,96.53C59.35,48.97,102.08,15.6,151.11,15.6h118.45c52.13,0,90.38,48.99,77.74,99.57Z"
        />
        <path
          fill="url(#copilot-lin-1)"
          d="M347.3,115.17l-5.16,20.63h-49.62c-36.77,0-68.82,25.03-77.74,60.7l-44.92,179.7h-89.69c-52.13,0-90.38-48.99-77.74-99.57L47.46,96.53C59.35,48.97,102.08,15.6,151.11,15.6h118.45c52.13,0,90.38,48.99,77.74,99.57Z"
        />
        {/* Bottom ribbon loop */}
        <path
          fill="url(#copilot-rad-2)"
          d="M164.7,396.83l5.16-20.63h49.62c36.77,0,68.82-25.03,77.74-60.7l44.92-179.7h89.69c52.13,0,90.38,48.99,77.74,99.57l-45.02,180.1c-11.89,47.56-54.63,80.93-103.66,80.93h-118.45c-52.13,0-90.38-48.99-77.74-99.57Z"
        />
        <path
          fill="url(#copilot-lin-2)"
          d="M164.7,396.83l5.16-20.63h49.62c36.77,0,68.82-25.03,77.74-60.7l44.92-179.7h89.69c52.13,0,90.38,48.99,77.74,99.57l-45.02,180.1c-11.89,47.56-54.63,80.93-103.66,80.93h-118.45c-52.13,0-90.38-48.99-77.74-99.57Z"
        />
      </svg>
    );
  }

  // 2. GitHub: Official Invertocat mark, white on dark, dark on light
  if (normalized === 'github') {
    return (
      <svg
        viewBox="0 0 98 96"
        className={`${className} fill-current text-text-primary object-contain drop-shadow-md`}
        role="img"
        aria-label={`${name} logo`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.215-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
        />
      </svg>
    );
  }

  // 3. Vercel: Official triangle mark, white on dark, dark on light
  if (normalized === 'vercel') {
    return (
      <svg
        viewBox="0 0 1155 1000"
        className={`${className} fill-current text-text-primary object-contain drop-shadow-md`}
        role="img"
        aria-label={`${name} logo`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="m577.346 0 577.346 1000H0z" />
      </svg>
    );
  }

  // 4. CodePen: Official isometric 3D cube mark
  if (normalized === 'codepen') {
    return (
      <svg
        viewBox="0 0 100 100"
        className={`${className} fill-current text-text-primary object-contain drop-shadow-md`}
        role="img"
        aria-label={`${name} logo`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M100 34.2c-.4-2.6-3.3-4-5.3-5.3-3.6-2.4-7.1-4.7-10.7-7.1-8.5-5.7-17.1-11.4-25.6-17.1-2-1.3-4-2.7-6-4-1.4-1-3.3-1-4.8 0-5.7 3.8-11.5 7.7-17.2 11.5L5.2 29C3.6 30.1 2 31.2 1 33c-.7 1.2-1 2.6-1 4v32.2c0 1.4.3 2.8 1 4 1 1.8 2.6 2.9 4.2 4 8.3 5.6 16.6 11.1 24.9 16.7 3.5 2.4 7.1 4.7 10.6 7.1 1.4 1 3.3 1 4.8 0 8.3-5.6 16.6-11.1 24.9-16.7 4.1-2.7 8.1-5.4 12.2-8.2 2-1.3 4.9-2.7 5.3-5.3.1-.7.1-1.4.1-2.1V36.3c-.1-.7-.1-1.4-.2-2.1zm-46.8 52.5v-20.9l16.4-11 16.4 11v20.9l-32.8 21zm-6.4 0l-32.8-21V64.8l16.4-11 16.4 11v20.9zM50 43.1L33.6 32.1 50 21.1l16.4 11L50 43.1zm3.2-27.7l16.4 11-16.4 11V15.4zm-6.4 0v22l-16.4-11 16.4-11zm-32.8 21l16.4 11-16.4 11V36.4zm82 22l-16.4-11 16.4-11v22z" />
      </svg>
    );
  }

  // 5. Claude: Official terracotta sunburst mark
  if (normalized === 'claude') {
    return (
      <svg
        viewBox="0 0 24 24"
        className={`${className} object-contain drop-shadow-md text-[#D97757] fill-current`}
        role="img"
        aria-label={`${name} logo`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 2a1.5 1.5 0 0 1 1.5 1.5v2.08a7.5 7.5 0 0 1 3.42 1.42l1.47-1.48a1.5 1.5 0 0 1 2.12 2.12l-1.48 1.47a7.5 7.5 0 0 1 1.42 3.42h2.08a1.5 1.5 0 0 1 0 3h-2.08a7.5 7.5 0 0 1-1.42 3.42l1.48 1.47a1.5 1.5 0 0 1-2.12 2.12l-1.47-1.48a7.5 7.5 0 0 1-3.42 1.42v2.08a1.5 1.5 0 0 1-3 0v-2.08a7.5 7.5 0 0 1-3.42-1.42l-1.47 1.48a1.5 1.5 0 0 1-2.12-2.12l1.48-1.47A7.5 7.5 0 0 1 4.08 15H2a1.5 1.5 0 0 1 0-3h2.08a7.5 7.5 0 0 1 1.42-3.42L4.02 7.11a1.5 1.5 0 1 1 2.12-2.12l1.47 1.48A7.5 7.5 0 0 1 11 5.05V3.5A1.5 1.5 0 0 1 12 2z" />
      </svg>
    );
  }

  // 6. ChatGPT: Official OpenAI rosette swirl in iconic emerald teal
  if (normalized === 'chatgpt') {
    return (
      <svg
        viewBox="0 0 24 24"
        className={`${className} object-contain drop-shadow-md text-[#10A37F] fill-current`}
        role="img"
        aria-label={`${name} logo`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.5045 4.5045 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.6669zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0568V6.0743a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805-4.783 2.7582a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.6069 1.4997-2.602-1.4997z" />
      </svg>
    );
  }

  // 7. Google Gemini: Official 4-pointed sparkle with blue-violet-coral gradient
  if (normalized === 'googlegemini' || normalized === 'gemini') {
    return (
      <svg
        viewBox="0 0 24 24"
        className={`${className} object-contain drop-shadow-md`}
        role="img"
        aria-label={`${name} logo`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="gemini-icon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4E75F8" />
            <stop offset="50%" stopColor="#9B68F6" />
            <stop offset="100%" stopColor="#F39878" />
          </linearGradient>
        </defs>
        <path
          fill="url(#gemini-icon-grad)"
          d="M12 2C12 7.52285 7.52285 12 2 12C7.52285 12 12 16.4772 12 22C12 16.4772 16.4772 12 22 12C16.4772 12 12 7.52285 12 2Z"
        />
      </svg>
    );
  }

  // 8. Google AI Studio: Official diamond/prism icon in Google Blue
  if (normalized === 'google' || normalized === 'googleaistudio') {
    return (
      <svg
        viewBox="0 0 24 24"
        className={`${className} object-contain drop-shadow-md`}
        role="img"
        aria-label={`${name} logo`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="aistudio-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4285F4" />
            <stop offset="50%" stopColor="#8AB4F8" />
            <stop offset="100%" stopColor="#34A853" />
          </linearGradient>
        </defs>
        <path
          fill="url(#aistudio-grad)"
          d="M12 2L2 22h20L12 2zm0 3.8l6.2 14.2H5.8L12 5.8z"
        />
      </svg>
    );
  }

  // 9. Visual Studio Code: Official VS Code folded ribbon in Microsoft Blue
  if (normalized === 'visualstudiocode' || normalized === 'vscode') {
    return (
      <svg
        viewBox="0 0 24 24"
        className={`${className} object-contain drop-shadow-md`}
        role="img"
        aria-label={`${name} logo`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#007ACC"
          d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479l1.322 1.202c.394.359.99.38 1.276.057l4.12-3.128 9.46 8.63c.474.433 1.15.547 1.705.29l4.94-2.377A1.5 1.5 0 0 0 24 20.06V3.94a1.5 1.5 0 0 0-.85-1.353zm-6.15 13.913L10.08 12 17 7.5v8.999z"
        />
      </svg>
    );
  }

  // 10. Adobe Express: Official stylized ribbon
  if (normalized === 'adobeexpress' || normalized === 'adobe') {
    return (
      <svg
        viewBox="0 0 24 24"
        className={`${className} object-contain drop-shadow-md`}
        role="img"
        aria-label={`${name} logo`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="adobe-express-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF0000" />
            <stop offset="50%" stopColor="#FF6138" />
            <stop offset="100%" stopColor="#7928CA" />
          </linearGradient>
        </defs>
        <path
          fill="url(#adobe-express-grad)"
          d="M13.966 22h-3.932l4.915-11.85h3.932L13.966 22zM2.85 22L9.5 6.067 13.067 15.1 8.85 22H2.85zm12.3-15.933L21.15 22h-5.267l-2.433-6.233 4.1-9.7z"
        />
      </svg>
    );
  }

  // 11. Canva: Official Canva cyan script mark
  if (normalized === 'canva') {
    return (
      <svg
        viewBox="0 0 24 24"
        className={`${className} object-contain drop-shadow-md`}
        role="img"
        aria-label={`${name} logo`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="11" fill="#00C4CC" />
        <path
          fill="#FFFFFF"
          d="M14.8 8.4c-.4-.3-1.1-.5-1.9-.5-2.2 0-3.9 1.7-3.9 4.1 0 2.2 1.5 3.8 3.7 3.8 1.1 0 1.9-.4 2.4-.8l-.5-1.2c-.4.3-1 .6-1.7.6-1.4 0-2.3-1-2.3-2.4 0-1.6 1.1-2.7 2.5-2.7.5 0 .9.1 1.2.3l.5-1.2z"
        />
      </svg>
    );
  }

  // 12. Todoist: Official red square with triple checkmarks
  if (normalized === 'todoist') {
    return (
      <svg
        viewBox="0 0 24 24"
        className={`${className} object-contain drop-shadow-md text-[#E44332] fill-current`}
        role="img"
        aria-label={`${name} logo`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M21 0H3C1.343 0 0 1.343 0 3v18c0 1.657 1.343 3 3 3h18c1.657 0 3-1.343 3-3V3c0-1.657-1.343-3-3-3zM7.27 15.82l-3.23-3.23 1.41-1.41 1.82 1.81 4.54-4.54 1.41 1.41-5.95 5.96zm4.85-4.85l-1.41-1.41 4.54-4.54 1.41 1.41-4.54 4.54zm-4.85 9.7l-3.23-3.23 1.41-1.41 1.82 1.81 4.54-4.54 1.41 1.41-5.95 5.96z" />
      </svg>
    );
  }

  // Generic fallback if unknown slug: Clean, accessible brand monogram badge
  return (
    <div
      className={`${className} rounded-xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center text-accent-bright font-bold font-mono text-base`}
      role="img"
      aria-label={`${name} logo`}
    >
      {name.charAt(0)}
    </div>
  );
}
