import { Outfit } from "next/font/google";
import "./globals.css";
import Script from 'next/script';
import { Suspense } from 'react';
import FacebookPixel from "./FacebookPixel";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: "Kins Diabetes — North Bengal's Most Trusted Diabetes Centre",
  description: "Complete diabetes care in one visit at North Bengal's only NABH-accredited diabetes centre.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
             {/* GTM Script - in <head> */}
        <Script
          id="gtm-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PV54K5T5');`,
          }}
        />

        {/* META Pixel Base Code */}
        <script dangerouslySetInnerHTML={{__html: `
          !function(f,b,e,v,n,t,s){
            if(f.fbq)return;n=f.fbq=function(){
              n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)
            };
            if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)
          }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1437557770682144');
          fbq('track', 'PageView');
        `}} />
        <noscript dangerouslySetInnerHTML={{__html: `
          <img height="1" width="1" style="display:none"
            src="https://www.facebook.com/tr?id=1437557770682144&ev=PageView&noscript=1" />
        `}} />
      </head>
      <body className={`${outfit.variable} antialiased`}>

        {/* FacebookPixel handles PageView on every route change */}
        <Suspense fallback={null}>
          <FacebookPixel />
        </Suspense>

        {children}

        <Script id="google-translate-init" strategy="afterInteractive">{`
          function googleTranslateElementInit() {
            new google.translate.TranslateElement(
              { pageLanguage: 'en', includedLanguages: 'en,hi,bn', autoDisplay: false },
              'google_translate_element'
            );
            var lang = new URLSearchParams(location.search).get('lang');
            if (!lang || lang === 'en') return;
            var check = setInterval(function() {
              var sel = document.querySelector('.goog-te-combo');
              if (sel) {
                clearInterval(check);
                sel.value = lang;
                sel.dispatchEvent(new Event('change'));
              }
            }, 300);
          }
        `}</Script>
        <Script
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="b361ee75-7067-4043-a9be-baf64a4f0f81"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}