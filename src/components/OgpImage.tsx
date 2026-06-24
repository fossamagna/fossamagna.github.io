import { ImageResponse } from "@vercel/og";

const fontFamilyDataCache = new Map<string, ArrayBuffer>();

/**
 * ref: https://www.unpkg.com/@vercel/og@0.5.6/dist/index.node.js
 */
const getGoogleFontData = async (query: string): Promise<ArrayBuffer> => {
  const cached = fontFamilyDataCache.get(query);
  if (cached) {
    console.log(`[ogp-font] cache-hit: ${query}`);
    return cached;
  }
  console.log(`[ogp-font] cache-miss: ${query}`);

  const googleFontUrl = `https://fonts.googleapis.com/css2?family=${query}`;

  const googleFontCss = await fetch(googleFontUrl).then((res) => res.text());

  const fontUrl = googleFontCss.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/
  )?.[1];

  if (!fontUrl) {
    throw new Error(`unexpected. css data is invalid -> ${googleFontCss}`);
  }

  const arrayBuffer = await fetch(fontUrl).then((res) => res.arrayBuffer());

  // cache
  fontFamilyDataCache.set(query, arrayBuffer);

  return arrayBuffer;
};

export const getHomeOgpImageResponse = async (): Promise<Response> => {
  return new ImageResponse(
    (
      <div
        lang="en-US"
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: "linear-gradient(to bottom, rgb(229, 233, 240), white)",
          padding: "80px",
          fontFamily: "Noto Sans JP",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: "32px",
              fontWeight: 700,
              letterSpacing: "4px",
              color: "rgb(96, 115, 159)",
              marginBottom: "24px",
            }}
          >
            SOFTWARE DEVELOPER
          </div>
          <div
            style={{
              fontSize: "84px",
              fontWeight: 700,
              color: "rgb(15, 18, 25)",
              lineHeight: 1.1,
              marginBottom: "24px",
            }}
          >
            Masahiko Murakami
          </div>
          <div
            style={{
              fontSize: "40px",
              fontWeight: 700,
              color: "rgb(34, 41, 57)",
            }}
          >
            Building web and cloud applications
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgb(229, 233, 240)",
            paddingTop: "32px",
          }}
        >
          <div
            style={{
              fontSize: "36px",
              fontWeight: 700,
              color: "rgb(15, 18, 25)",
            }}
          >
            @fossamagna
          </div>
          <div
            style={{
              fontSize: "32px",
              fontWeight: 700,
              color: "rgb(96, 115, 159)",
            }}
          >
            fossamagna.github.io
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Noto Sans JP",
          data: await getGoogleFontData("Noto+Sans+JP:wght@700"),
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
};

export const getBlogPostOgpImageResponse = async (params: {
  title: string;
}): Promise<Response> => {
  // ref: https://t28.dev/blog/vercel-og-or-satori-for-me
  return (
    new ImageResponse(
      (
        // ref: https://github.com/vercel/satori#locales
        <div
          lang="ja-JP"
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            background: "linear-gradient(to bottom, rgb(229, 233, 240), white)",
            padding: "80px",
            fontFamily: "Noto Sans JP",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontSize: "72px",
                fontWeight: 700,
                color: "rgb(15, 18, 25)",
                lineHeight: 1.2,
                marginBottom: "40px",
              }}
            >
              {params.title}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: "1px solid rgb(229, 233, 240)",
              paddingTop: "32px",
            }}
          >
            <div
              style={{
                fontSize: "36px",
                fontWeight: 700,
                color: "rgb(15, 18, 25)",
              }}
            >
              fossamagna's Blog
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Noto Sans JP",
            data: await getGoogleFontData("Noto+Sans+JP:wght@700"),
            style: "normal",
            weight: 700,
          },
        ],
      }
    )
  );
};
