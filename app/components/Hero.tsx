"use client";
import React, { useState, useEffect } from 'react';
import { Gift, Star, Users, Clock } from 'lucide-react';
import Head from 'next/head';

const AnimatedTherapyType = () => {
  const therapyTypes = ['Teen', 'Couples', 'Anxiety', 'EMDR', 'Family'];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % therapyTypes.length);
        setIsVisible(true);
      }, 500);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col w-full gap-2 md:gap-4">
      {/* First line with animated text */}
      <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start">
        <span
          className={`text-purple-700 transition-opacity duration-500 min-w-[110px] text-center md:text-left text-4xl md:text-[80px] font-semibold ${isVisible ? 'opacity-100' : 'opacity-0'
            }`}
        >
          {therapyTypes[currentIndex]}
        </span>
        <span className="text-black-700 text-4xl md:text-[80px] font-semibold">Therapy</span>
      </div>

      {/* Second line */}
      <h1 className="text-[#111827] text-4xl md:text-[80px] font-semibold leading-tight md:leading-[80px] capitalize font-inter text-center md:text-left">
        For Your Wellbeing
      </h1>
    </div>
  );
};

const TherapistCardOverlap = () => {
  return (
    <div className="opacity-100 bg-white p-4 md:p-6 rounded-2xl shadow-lg h-full min-h-[200px] flex flex-col">
      <div className="flex-grow flex items-center justify-center">
        <div className="flex -space-x-6">
          <div className="min-w-[7rem] w-28 aspect-square relative">
            <img
              src="https://plus.unsplash.com/premium_photo-1682089872205-dbbae3e4ba32?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Therapist 2"
              className="absolute inset-0 rounded-full w-full h-full object-cover border-2 md:border-3 border-white hover:opacity-100"
            />
          </div>
          <div className="min-w-[7rem] w-28 aspect-square relative">
            <img
              src="https://images.pexels.com/photos/7580971/pexels-photo-7580971.jpeg"
              alt="Therapist 1"
              className="absolute inset-0 rounded-full w-full h-full object-cover border-2 md:border-3 border-white hover:opacity-100"
            />
          </div>
          <div className="min-w-[7rem] w-28 aspect-square relative">
            <img
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e"
              alt="Therapist 3"
              className="absolute inset-0 rounded-full w-full h-full object-cover border-2 md:border-3 border-white"
            />
          </div>
        </div>
      </div>
      <h3 className="text-lg md:text-xl font-semibold font-inter capitalize text-center md:text-left mt-4">
        Licensed Desi therapists in California
      </h3>
    </div>
  );
};

const UrgencyCard = () => {
  const [sessionCount, setSessionCount] = useState(100);
  const targetCount = 157;
  const incrementInterval = 4000;

  useEffect(() => {
    const timer = setInterval(() => {
      setSessionCount(prevCount => {
        if (prevCount < targetCount) {
          return prevCount + 1;
        }
        return prevCount;
      });
    }, incrementInterval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-purple-600 p-4 md:p-6 rounded-2xl shadow-lg relative overflow-hidden font-inter group hover:shadow-xl transition-all h-full min-h-[200px] flex flex-col">
      {/* Background Effects */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600 opacity-50"
        style={{
          backgroundSize: '200% 100%',
          animation: 'shimmer 3s infinite linear',
        }}
      />
      <div className="absolute -right-8 -top-8 w-24 md:w-32 h-24 md:h-32 bg-purple-500 rounded-full opacity-20" />
      <div className="absolute -left-8 -bottom-8 w-20 md:w-24 h-20 md:h-24 bg-purple-500 rounded-full opacity-20" />

      {/* Content */}
      <div className="relative flex-grow flex flex-col justify-center">
        <p className="text-white text-xs md:text-sm font-inter font-semibold mb-2">
          Limited time offer
        </p>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-6xl md:text-6xl font-bold text-yellow-300 tracking-tight">
            {sessionCount}
          </span>
          <span className="text-3xl md:text-4xl font-bold text-yellow-300 tracking-tight">+</span>
        </div>

        <p className="text-white font-inter text-lg md:text-xl font-extrabold capitalize">
          Free therapy sessions delivered
        </p>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </div>
  );
};

const InsuranceCard = () => {
  const insuranceLogos = [
    {
      name: "Aetna",
      logo: "https://highlandparkdentist.com/wp-content/uploads/2023/02/aetna-logo-png-transparent-aetna-insurance-logo-11563253541xlglav5azs.png"
    },
    {
      name: "Blue Shield",
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/34/Blue_Shield_of_California_logo.png"
    },
    {
      name: "Kaiser Permanente",
      logo: "https://1000logos.net/wp-content/uploads/2020/09/Kaiser-Permanente-Logo.png"
    },
    {
      name: "United Healthcare",
      logo: "https://1000logos.net/wp-content/uploads/2018/02/United-Healthcare-Logo.png"
    }
  ];

  return (
    <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg h-full min-h-[200px] flex flex-col">
      <div className="flex-grow grid grid-cols-2 gap-4 place-items-center">
        {insuranceLogos.map((insurance, index) => (
          <div
            key={index}
            className="min-w-[7rem] w-28 h-12 flex items-center justify-center rounded-lg"
          >
            <img
              src={insurance.logo}
              alt={`${insurance.name} logo`}
              className="h-full w-full object-contain grayscale opacity-60 hover:opacity-80 transition-opacity"
              style={{
                filter: 'grayscale(100%)',
                mixBlendMode: 'multiply'
              }}
            />
          </div>
        ))}
      </div>
      <h3 className="text-lg md:text-xl font-semibold font-inter capitalize text-center md:text-left mt-4">
        Accepting all major insurance providers
      </h3>
    </div>
  );
};

const TherapyLandingPage = () => {
  return (
    <>
      <Head>
        {/* Essential Meta Tags */}
        <title>Affordable Therapy For Immigrants In California | Therawin</title>
        <meta name="description" content="At Therawin, we provide you with therapists that speak your language and provide services such as individual therapy, couples therapy etc at affordable rates." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />

        {/* Keywords and Application Info */}
        <meta name="keywords" content="Best,Affordable,Immigrant,Therapy,California" />
        <meta name="application-name" content="Therawin" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://therawin.health" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Affordable Therapy For Immigrants In California | Therawin" />
        <meta property="og:description" content="At Therawin, we provide you with therapists that speak your language and provide services such as individual therapy, couples therapy etc at affordable rates." />
        <meta property="og:url" content="https://therawin.health" />
        <meta property="og:site_name" content="Therawin" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content="https://therawin.health/logo__alt.png" />
        <meta property="og:type" content="website" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Affordable Therapy For Immigrants In California | Therawin" />
        <meta name="twitter:description" content="At Therawin, we provide you with therapists that speak your language and provide services such as individual therapy, couples therapy etc at affordable rates." />
        <meta name="twitter:image" content="https://therawin.health/logo__alt.png" />

        {/* Security and Referrer Tags */}
        <meta name="referrer" content="strict-origin-when-cross-origin" />

        {/* Favicon */}
        <link rel="icon" href="/icon.ico" type="image/x-icon" sizes="16x16" />

        {/* Font Preloading */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&family=Prata&family=Yeseva+One&display=swap"
          rel="stylesheet"
        />

        {/* Web App Manifest */}
        <link rel="manifest" href="/manifest.webmanifest" crossOrigin="anonymous" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-yellow-300 to-orange-400 p-4 md:p-8">
        
        {/* Semantic HTML structure for better SEO */}
        <div className="absolute inset-0">
          <svg xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 993"
            fill="none"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid slice">
            <path opacity="0.6" d="M688.989 852.502C712.9 820.684 728.167 785.414 735.328 746.762C750.481 664.946 713.283 577.285 642.478 531.636C586.856 495.772 526.485 488.695 462.891 508.571C429.576 518.982 399.674 535.771 371.786 555.971C338.628 579.981 310.592 608.598 288.319 642.352C287.892 643.002 287.453 643.643 286.996 644.274C286.815 644.521 286.568 644.728 285.997 645.321C285.27 643.972 284.57 642.847 284.035 641.648C271.934 614.481 264.273 586.141 260.066 556.908C256.88 534.753 255.778 512.495 257.139 490.163C261.707 415.101 290.296 349.86 344.008 295.109C365.33 273.378 390.217 256.261 419.267 245.278C466.184 227.537 512.743 229.791 558.838 248.372C569.464 252.654 579.585 257.884 589.772 264.368C588.434 265.71 587.302 266.883 586.129 268.015C571.544 282.123 561.644 298.705 557.909 318.392C554.027 338.873 556.493 358.579 567.027 376.968C575.326 391.456 587.427 401.69 604.343 406.017C638.861 414.85 671.966 392.001 674.433 357.723C675.495 342.952 672.21 328.992 666.093 315.552C657.889 297.524 645.689 282.244 631.059 268.653C630.027 267.694 628.987 266.735 627.984 265.747C627.778 265.544 627.715 265.201 627.409 264.545C631.962 262.387 636.461 260.078 641.106 258.09C659.796 250.087 679.455 245.506 699.645 242.725C702.742 242.297 703.472 243.824 704.475 245.853C714.503 266.142 725.575 285.892 737.783 305.045C766.07 349.432 798.858 390.393 837.963 426.519C856.468 443.614 876.318 459.071 898.44 471.692C919.11 483.48 940.992 492.25 964.888 495.702C992.544 499.7 1019.15 496.779 1043.77 483.192C1070.06 468.686 1085.77 446.454 1093.55 418.685C1099.2 398.529 1100.09 377.997 1097.88 357.34C1096.83 347.429 1095.05 337.593 1093.49 327.034C1095.34 327.583 1097.07 328.037 1098.76 328.605C1139.06 342.067 1179.32 355.606 1219.65 368.987C1255.9 381.014 1292.38 392.381 1329.28 402.435C1332.32 403.261 1334.17 404.884 1335.87 407.259C1362.38 444.248 1396.54 472.4 1439.88 489.668C1516.21 520.078 1600.03 505.793 1661.98 452.023C1663.29 450.891 1664.67 449.817 1665.84 448.563C1667.57 446.705 1669.66 446.103 1672.2 445.967C1699.04 444.518 1725.72 441.777 1752.17 437.075C1811.26 426.567 1866.82 407.278 1917.2 375.231C1941.58 359.718 1963.68 341.617 1983.53 320.959C1983.75 320.734 1983.96 320.506 1984.18 320.277C1987.27 316.991 1986.88 317.378 1990.2 319.849C2011.77 335.907 2035.67 347.149 2062.55 352.231C2090.75 357.565 2118.59 355.654 2146.02 347.96C2189.21 335.845 2226.41 314.461 2257.99 284.49L2257.99 252.787C2241.35 272.754 2221.01 288.99 2198.11 302.607C2174.65 316.552 2149.54 326.639 2122.31 331.36C2078.61 338.935 2039.27 329.199 2004.16 303.226C2001.24 301.069 2001.25 300.999 2003.69 297.912C2021.98 274.768 2036.93 249.814 2047.57 222.551C2060.24 190.069 2066.63 156.58 2064.71 121.797C2062.23 76.5905 2045.82 36.4739 2016.88 0.971335C2015.23 -1.06083 2013.49 -3.03404 2011.74 -4.99247L1981.64 -4.99247C2003.8 16.2147 2020.8 40.7633 2031.48 69.3689C2041.83 97.0525 2044.88 125.592 2041.71 154.784C2036.49 202.73 2017.03 245.108 1987.23 283.417C1984.83 286.497 1984.75 286.493 1982.05 283.686C1963.15 264.006 1949.15 241.39 1939.25 216.439C1921.29 171.174 1914.27 124.345 1918.86 76.0667C1921.58 47.4868 1929.41 20.3271 1943.26 -4.99613L1918.52 -4.99613C1911.38 9.53903 1906.19 24.7712 1902.41 40.4829C1894.77 72.2679 1893.71 104.414 1897.08 136.774C1900.31 167.693 1907.56 197.692 1919.52 226.589C1930.87 254.011 1946.61 278.796 1967.77 300.276C1970.54 303.09 1970.84 302.673 1967.61 306.055C1947.46 327.093 1924.83 345.275 1899.77 360.652C1860.42 384.791 1817.63 400.905 1772.35 411.198C1746.95 416.97 1721.21 420.592 1695.25 422.971C1694.04 423.082 1692.82 422.986 1691.09 422.986C1691.7 422.034 1692.03 421.378 1692.49 420.825C1717.73 390.674 1737.05 357.129 1753.46 321.948C1774.28 277.295 1789.45 230.93 1798.34 182.715C1803.54 154.459 1805.91 125.986 1804.35 97.2923C1802.42 61.7049 1793.76 27.6739 1779.32 -4.99611L1755 -4.99611C1776.78 40.0404 1785.64 87.4447 1781.77 137.206C1777.48 192.499 1762.36 245.218 1740.71 296.344C1727.71 327.026 1712.26 356.51 1693.04 384.079C1683.76 397.386 1673.55 409.981 1662.31 421.82C1660.11 424.144 1657.84 425.239 1654.5 425.346C1618.17 426.475 1581.94 424.944 1545.77 421.651C1480.03 415.665 1415.57 403.165 1351.93 386.451C1348.73 385.613 1346.66 384.179 1345.04 381.424C1321.92 342.329 1310.9 300.427 1313.5 255.409C1313.97 247.332 1315.23 239.299 1316.16 230.838C1318.07 231.447 1319.28 231.757 1320.42 232.214C1352.21 244.879 1385.42 251.459 1419.68 253.167C1457.13 255.033 1494.11 252.053 1530.34 242.279C1551.23 236.643 1571.09 228.717 1589.35 217.303C1604.91 207.573 1618.6 195.896 1629.42 181.298C1639.72 167.409 1646.55 152.191 1648.29 135.048C1650.08 117.386 1645.72 101.157 1635.98 86.2203C1626.5 71.6962 1613.5 60.7164 1598.19 52.1856C1577.93 40.8961 1555.95 34.5745 1532.73 32.8337C1459.39 27.3235 1399.51 52.8275 1352.41 106.664C1329.59 132.758 1313.59 162.548 1302.8 194.978C1302.41 196.147 1302.05 197.331 1301.63 198.489C1301.54 198.736 1301.23 198.913 1300.77 199.385C1299.32 198.655 1297.77 197.928 1296.28 197.113C1273.79 184.876 1252.92 170.392 1233.67 153.873C1217.57 140.057 1202.04 125.625 1186.43 111.293C1176.6 102.268 1167.03 92.9734 1157.43 83.7197C1118.66 46.3509 1074 17.2991 1024.53 -4.99605L968.084 -4.99604C990.667 3.41301 1012.76 12.9101 1034.34 23.5912C1070.82 41.6523 1104.08 64.058 1133.63 91.476C1147.9 104.713 1161.95 118.156 1176.05 131.556C1195.51 150.045 1215.44 168.025 1236.98 184.278C1254.37 197.394 1272.63 209.251 1292.12 219.305C1295.71 221.16 1295.76 221.194 1294.96 225.372C1290.88 246.83 1289.89 268.417 1291.94 290.144C1294.62 318.44 1302.36 345.419 1314.62 371.229C1315.35 372.756 1316.08 374.283 1317.25 376.728C1314.39 375.965 1312.29 375.493 1310.25 374.844C1267.79 361.327 1225.28 347.972 1182.92 334.196C1152.05 324.161 1121.39 313.539 1090.6 303.293C1087.43 302.238 1085.77 300.7 1084.74 297.506C1073.35 262.262 1057.1 229.064 1038.14 197.08C997.702 128.838 950.379 65.371 895.059 7.52166C890.981 3.25812 886.76 -0.880007 882.516 -4.99976L850.668 -4.99975C881.606 22.6396 908.812 53.543 934.488 85.7593C970.525 130.98 1003.34 178.241 1030.77 228.828C1041.36 248.335 1050.77 268.347 1058.44 289.093C1058.75 289.956 1059 290.845 1059.35 291.922C1057.24 292.689 1055.58 291.457 1053.92 290.923C1018.47 279.522 983.138 267.801 947.599 256.689C912.189 245.617 876.359 235.928 839.802 228.92C800.307 221.349 760.499 217.38 720.189 219.49C717.283 219.641 715.963 218.818 714.839 216.296C695.519 172.886 681.173 128.037 672.479 81.5401C667.125 52.9086 664.353 24.0227 662.996 -4.99974L640.712 -4.99974C640.737 -4.5977 640.771 -4.19566 640.789 -3.79734C642.4 28.6477 645.66 60.9083 652.082 92.8408C660.673 135.55 673.799 176.928 691.139 217.089C691.747 218.498 692.319 219.925 693.141 221.917C691.242 222.274 689.612 222.617 687.968 222.883C660.784 227.287 634.831 235.072 611.271 249.176C608.461 250.858 606.961 249.718 604.959 248.416C581.266 232.985 555.498 222.153 527.495 216.41C474.502 205.545 424.919 214.142 378.673 240.996C346.408 259.728 320.374 284.896 298.569 314.214C265.194 359.084 244.278 408.849 237.413 463.681C228.87 531.92 238.408 597.733 268.679 660.292C271.695 666.529 271.827 671.161 268.568 677.195C261.043 691.121 255.35 705.837 250.992 720.996C250.738 721.877 250.402 722.737 250.03 723.836C249.388 723.736 248.773 723.747 248.253 723.541C225.239 714.235 201.516 706.918 177.577 700.224C175.029 699.512 173.561 698.494 172.927 695.809C164.491 659.956 150.831 625.87 134.922 592.558C120.163 561.658 103.011 531.961 85.8479 502.267C71.4831 477.409 57.1887 452.514 45.5969 426.298C35.9406 404.456 28.0834 382.095 23.8654 358.612C17.1884 321.446 22.1437 285.745 37.7582 251.275C46.3525 232.299 57.1481 214.57 70.0969 198.047C70.425 197.611 70.7531 197.172 71.0812 196.737C71.3798 196.992 71.9587 197.279 71.933 197.501C71.8444 198.26 71.7265 199.02 71.6047 199.776C71.6821 200.507 71.3947 201.314 71.225 202.1C71.1918 202.292 71.1589 202.483 71.1293 202.675C70.4804 214.761 71.6232 226.63 75.7011 238.156C84.8891 264.132 108.807 281.883 137.233 283.926C151.69 284.963 165.682 282.964 178.989 277.579C212.662 263.947 237.159 241.283 248.677 207.599C258.871 177.795 252.497 150.672 229.357 128.096C214.347 113.45 195.543 107.664 174.336 108.932C159.451 109.825 145.507 114.1 132.035 120.019C130.457 120.712 128.882 121.406 127.304 122.096C127.072 121.941 126.843 121.782 126.611 121.627C127.511 120.347 128.37 119.042 129.318 117.795C143.8 98.7124 160.509 81.5807 178.797 65.8616C211.663 37.6063 248.046 14.4556 286.97 -4.99232L241.612 -4.99232C212.4 12.1025 184.833 31.3732 159.621 53.7532C138.513 72.4856 119.403 92.8961 103.593 116.047C96.8239 125.961 90.8068 136.277 85.8735 147.149C84.4982 150.181 82.5883 152.667 80.1513 154.976C45.2133 188.133 20.1528 227.076 6.46649 272.537C-3.63214 306.085 -3.39239 339.928 4.31342 373.855C11.1123 403.789 22.6452 432.118 37.0539 459.296C50.1906 484.074 64.205 508.423 78.0903 532.828C96.2819 564.801 113.825 597.065 128.005 630.923C135.773 649.471 142.683 668.299 148.003 687.647C148.357 688.938 148.612 690.255 149.025 692.044C148.014 691.933 147.424 691.94 146.875 691.796C119.617 684.568 92.4143 677.195 65.9048 667.613C6.36325 646.092 -41.2283 609.745 -78.5445 560.497C-90.8738 544.224 -102.075 527.318 -112.001 509.684L-112.001 551.435C-92.0574 581.08 -68.8514 608.192 -40.8228 631.572C-9.63821 657.585 25.8969 676.317 64.5219 689.904C90.3569 698.992 116.859 705.974 143.332 713.048C146.256 713.83 149.157 714.693 152.107 715.386C153.869 715.799 154.843 716.651 155.156 718.422C163.131 763.491 160.498 807.329 138.461 848.796C134.546 856.165 129.745 863.106 125.192 870.15C123.068 873.436 122.88 873.355 119.3 871.227C101.602 860.708 84.5683 849.264 68.4009 836.684C-3.83864 780.472 -64.5154 714.759 -111.997 638.251L-111.997 678.493C-62.2 749.631 -2.52589 811.939 68.7402 863.795C80.1919 872.131 92.3701 879.544 104.22 887.374C105.522 888.233 106.867 889.037 108.453 890.033C107.937 890.771 107.594 891.438 107.089 891.955C71.2288 928.413 28.843 954.503 -22.1997 966.46C-52.3264 973.519 -82.3274 973.482 -111.997 965.789L-111.997 987.782C-74.8206 996.305 -37.7183 994.158 -0.852052 982.976C48.2957 968.068 89.719 941.391 124.65 905.14C129.163 900.456 127.437 900.685 133.071 903.632C178.875 927.579 227.495 944.25 278.125 955.742C310.213 963.026 342.636 968.415 375.51 971.063C420.539 974.692 465.306 973.457 509.432 963.152C564.855 950.206 614.184 926.06 656.053 888.44C659.091 885.711 662.085 882.922 664.891 879.979C666.665 878.117 668.962 876.077 670.654 874.085L689 852.498L688.989 852.502ZM1632.08 447.911C1630.73 448.906 1629.42 449.943 1628.03 450.887C1572 489.159 1500.03 494.566 1437.38 465.208C1411.89 453.262 1389.99 436.809 1371.28 416.369C1370.46 415.477 1369.77 414.47 1368.39 412.707C1455.4 434.128 1542.67 446.985 1632.08 447.911ZM1323.3 203.619C1334.25 169.503 1351.59 138.799 1376.65 112.325C1404.43 82.9821 1438.35 63.8625 1479 56.405C1511.25 50.4854 1542.96 52.1266 1573.63 64.2387C1586.17 69.1883 1597.48 76.052 1607.06 85.3721C1615.66 93.7295 1622.02 103.385 1624.92 114.9C1628.26 128.118 1626.21 140.861 1620.67 153.183C1614.92 165.97 1606.13 176.636 1595.47 185.923C1578.12 201.045 1557.82 211.195 1535.78 218.284C1504.7 228.275 1472.65 232.21 1454.42 232.273C1401.06 232.343 1363.31 226.405 1327.27 211.785C1320.33 208.971 1321.19 210.177 1323.3 203.619ZM732.488 240.376C769.436 239.517 805.834 243.858 841.915 251.153C885.602 259.986 928.165 272.666 970.455 286.209C1001.52 296.156 1032.41 306.594 1063.42 316.681C1066.64 317.725 1068.33 319.163 1069.16 322.479C1074.66 344.265 1077.95 366.247 1076.31 388.726C1075.37 401.532 1072.88 414.049 1067.63 425.903C1055.09 454.173 1032.63 470.283 1001.29 474.86C976.999 478.408 953.948 473.415 931.705 464.157C913.694 456.659 897.345 446.509 881.919 434.936C855.572 415.171 832.554 392.153 811.272 367.479C778.886 329.929 751.532 289.226 729.001 245.517C728.248 244.06 727.585 242.563 726.667 240.634C729.06 240.527 730.77 240.42 732.485 240.38L732.488 240.376ZM605.965 279.334C607.337 278.147 608.414 277.667 610.028 279.058C628.194 294.681 643.012 312.506 649.948 335.45C652.381 343.498 653.229 351.712 651.714 360.076C647.016 385.997 616.942 392.942 598.827 380.354C593.408 376.588 589.285 371.753 586.137 366.132C580.787 356.587 578.486 346.319 578.401 333.625C578.656 312.738 588.622 294.367 605.965 279.331L605.965 279.334ZM299.672 665.441C338.507 602.24 393.321 556.786 464.58 530.785C517.835 511.351 570.157 515.641 619.759 543.004C653.952 561.865 678.378 589.641 695.604 623.484C709.4 650.588 716.31 679.253 716.48 714.966C715.16 763.727 696.161 811.589 660.176 853.343L636.527 876.734C634.366 878.567 632.988 879.776 631.564 880.938C593.787 911.794 550.432 931.898 502.357 942.822C466.272 951.021 429.624 952.946 392.768 950.782C329.665 947.079 268.454 934.454 209.123 913.45C187.952 905.955 167.441 897.03 147.528 886.836C146.68 886.4 145.821 885.995 144.991 885.53C142.358 884.058 142.296 884.007 144.132 881.421C153.372 868.424 161.081 854.649 166.954 839.944C179.088 809.56 183.129 778.06 180.821 745.718C180.338 738.972 179.394 732.26 178.683 725.532C178.605 724.802 178.672 724.057 178.672 723.098C179.7 723.257 180.486 723.294 181.212 723.508C201.697 729.512 222.027 735.933 241.701 744.139C245.886 745.884 245.723 745.117 245.329 749.801C241.812 791.566 257.806 825.899 288.858 854.232C299.45 863.899 312.045 870.549 326.635 873.152C332.821 874.259 339.052 874.392 345.228 873.204C367.395 868.94 381.424 848.84 377.604 826.98C376.011 817.874 372.21 809.649 366.933 802.003C360.691 792.956 352.897 785.259 344.314 778.288C325.042 762.636 303.713 749.992 281.454 738.721C278.626 737.29 275.813 735.822 272.911 734.539C271.131 733.753 270.585 732.802 271.197 730.939C273.022 725.374 274.46 719.675 276.495 714.187C279.017 707.39 281.978 700.744 284.772 694.043C285.056 693.36 285.499 692.741 286.059 691.76L299.683 665.452L299.672 665.441ZM267.086 755.945C268.568 756.528 269.453 756.797 270.26 757.199C289.698 766.932 308.336 777.879 325.514 791.031C333.028 796.785 340.077 803.014 345.907 810.409C350.386 816.092 353.955 822.218 355.448 829.303C356.26 833.143 356.204 836.967 354.781 840.659C352.16 847.449 347.12 851.466 339.598 852.392C333.924 853.089 328.471 852.056 323.172 850.127C316.835 847.822 311.02 844.558 305.987 840.254C281.259 819.098 267.491 792.89 266.876 760.729C266.85 759.368 266.99 758.003 267.082 755.942L267.086 755.945ZM101.528 166.918C102.118 165.395 103.062 163.779 104.32 162.743C121.884 148.237 141.315 136.981 164.104 131.858C172.732 129.918 181.522 129.225 190.256 131.15C210.048 135.513 222.02 148.038 228.251 166.007C232.498 178.256 231.543 190.582 227.207 202.694C216.674 232.107 185.883 257.12 153.983 262.107C145.031 263.505 136.094 263.169 127.448 260.366C107.885 254.026 97.4247 240.372 94.1545 221.205C93.4318 216.974 93.277 212.652 93.0632 210.472C93.299 194.045 96.3779 180.284 101.532 166.926L101.528 166.918Z" fill="white" fillOpacity="1" />
          </svg>
        </div>
        <header className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-orange-300 to-yellow-300 animate-gradient"
          style={{
            backgroundSize: '200% 200%',
            animation: 'gradient 15s ease infinite',
            opacity: 0.9
          }}>
          <style>{`
            @keyframes gradient {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
          `}</style>
        </header>

        <main className="relative max-w-7xl mx-auto p-4 md:p-8">
          <section className="mb-8 md:mb-16" aria-label="Hero Section">
            <div className="mb-4">
              <div className="flex flex-col mb-2 md:mb-2">
                <div className="flex flex-col md:flex-row items-center gap-2 mb-4">
                  <h1 className="text-[#111827] text-4xl md:text-[80px] font-semibold leading-tight md:leading-[80px] capitalize w-full md:w-[960px] font-inter flex items-center">
                    <AnimatedTherapyType />
                  </h1>
                </div>
              </div>

              <p className="text-black text-base md:text-lg font-normal leading-relaxed w-full md:w-[824px] mb-6 md:mb-8 text-center md:text-left">
                Start your journey to better mental health with our experienced therapists and evidence-based treatments.
              </p>
            </div>

            <div className="flex justify-center md:justify-start">
              <button
                className="bg-purple-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center gap-2"
                aria-label="Schedule Appointment"
              >
                Schedule Appointment
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none" aria-hidden="true">
                  <g clipPath="url(#clip0_3727_5490)">
                    <path d="M14.6906 8.70615C15.0813 8.31553 15.0813 7.68115 14.6906 7.29053L9.69063 2.29053C9.3 1.8999 8.66563 1.8999 8.275 2.29053C7.88438 2.68115 7.88438 3.31553 8.275 3.70615L11.5719 6.9999H1.98438C1.43125 6.9999 0.984375 7.44678 0.984375 7.9999C0.984375 8.55303 1.43125 8.9999 1.98438 8.9999H11.5688L8.27812 12.2937C7.8875 12.6843 7.8875 13.3187 8.27812 13.7093C8.66875 14.0999 9.30313 14.0999 9.69375 13.7093L14.6938 8.70928L14.6906 8.70615Z" fill="white" />
                  </g>
                  <defs>
                    <clipPath id="clip0_3727_5490">
                      <path d="M0.984375 0H14.9844V16H0.984375V0Z" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6" aria-label="Features">
            <TherapistCardOverlap />
            <InsuranceCard />
            <UrgencyCard />
          </section>
        </main>
      </div>
    </>
  );
};

export default TherapyLandingPage;