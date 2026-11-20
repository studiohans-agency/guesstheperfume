// Link preview bots (X, WhatsApp, Facebook, LinkedIn, Slack, Discord, Telegram...) only need the
// meta tags. The game page is ~12 MB, which is too large for some of them, so they get a tiny page.
const BOTS = /twitterbot|facebookexternalhit|facebot|linkedinbot|slackbot|discordbot|telegrambot|whatsapp|pinterest|redditbot|skypeuripreview|embedly|iframely|vkshare|mastodon|bluesky|cardyb/i;

const PREVIEW = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Guess the Perfume: How well do you know your bottles?</title>\n<meta name=\"description\" content=\"A fragrance quiz with the label hidden. Name the house or the exact perfume in ten rounds, try the daily bottle and climb the leaderboard.\">\n<meta property=\"og:type\" content=\"website\">\n<meta property=\"og:site_name\" content=\"Guess the Perfume\">\n<meta property=\"og:title\" content=\"Guess the Perfume: How well do you know your bottles?\">\n<meta property=\"og:description\" content=\"A fragrance quiz with the label hidden. Name the house or the exact perfume in ten rounds, try the daily bottle and climb the leaderboard.\">\n<meta property=\"og:url\" content=\"https://perfume.studiohans.agency/\">\n<meta property=\"og:image\" content=\"https://perfume.studiohans.agency/og-image-v3.png\">\n<meta property=\"og:image:width\" content=\"1200\">\n<meta property=\"og:image:height\" content=\"630\">\n<meta property=\"og:image:alt\" content=\"Guess the Perfume. How well do you know your bottles?\">\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\" content=\"Guess the Perfume: How well do you know your bottles?\">\n<meta name=\"twitter:description\" content=\"A fragrance quiz with the label hidden. Name the house or the exact perfume in ten rounds, try the daily bottle and climb the leaderboard.\">\n<meta name=\"twitter:image\" content=\"https://perfume.studiohans.agency/og-image-v3.png\">\n<link rel=\"canonical\" href=\"https://perfume.studiohans.agency/\">\n</head>\n<body>\n<h1>Guess the Perfume: How well do you know your bottles?</h1>\n<p><a href=\"https://perfume.studiohans.agency/\">Play Guess the Perfume</a></p>\n</body>\n</html>\n";

export const config = { matcher: '/' };

export default function middleware(request) {
  const ua = request.headers.get('user-agent') || '';
  const forced = new URL(request.url).searchParams.has('preview');
  if (!forced && !BOTS.test(ua)) return;
  return new Response(PREVIEW, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'public, max-age=0, s-maxage=3600',
      'vary': 'user-agent'
    }
  });
}
