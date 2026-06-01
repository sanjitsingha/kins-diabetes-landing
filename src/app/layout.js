import { Outfit } from "next/font/google";
import "./globals.css";
import Script from 'next/script';

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
        {/* Set googtrans cookie from ?lang= param before Google Translate loads */}
        <script dangerouslySetInnerHTML={{__html: `
          (function() {
            var lang = new URLSearchParams(location.search).get('lang');
            if (lang && lang !== 'en') {
              document.cookie = 'googtrans=/en/' + lang + '; path=/';
            } else if (!lang || lang === 'en') {
              document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:01 UTC; path=/';
            }
          })();
        `}} />

        {/* Meta Pixel — must be in <head> for earliest possible fire */}
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
        {children}
        <Script id="google-translate-init" strategy="afterInteractive">{`
          function googleTranslateElementInit() {
            new google.translate.TranslateElement(
              { pageLanguage: 'en', includedLanguages: 'en,hi,bn', autoDisplay: false },
              'google_translate_element'
            );
            var check = setInterval(function() {
              var sel = document.querySelector('.goog-te-combo');
              if (sel) {
                clearInterval(check);
                sel.addEventListener('change', function() {
                  var v = sel.value;
                  var url = new URL(location.href);
                  if (!v || v === 'en') url.searchParams.delete('lang');
                  else url.searchParams.set('lang', v);
                  history.replaceState(null, '', url.toString());
                });
              }
            }, 300);
          }
        `}</Script>
        <Script
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}