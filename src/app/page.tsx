import { defaultLocale } from "@/lib/i18n/config";

export const metadata = {
  title: "Akva System ZZ",
  robots: { index: false, follow: false },
  other: {
    "http-equiv": "refresh",
  },
};

export default function RootRedirect() {
  const target = `/${defaultLocale}/`;
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <meta httpEquiv="refresh" content={`0; url=${target}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){
            try {
              var supported = ['mk','sq','en','de'];
              var nav = (navigator.language || 'mk').slice(0,2);
              var pick = supported.indexOf(nav) > -1 ? nav : '${defaultLocale}';
              location.replace('/' + pick + '/');
            } catch(e) {
              location.replace('${target}');
            }
          })();`,
        }}
      />
      <main className="flex-1 flex items-center justify-center text-fg-muted text-sm">
        Akva System ZZ — loading…
      </main>
    </>
  );
}
