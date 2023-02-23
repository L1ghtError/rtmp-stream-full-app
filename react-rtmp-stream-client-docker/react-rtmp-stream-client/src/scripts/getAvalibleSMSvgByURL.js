/* eslint-disable no-unreachable */
import youtubeIcon from '../assets/SocialMediaSVGS/youtube-icon.svg';
import facebookIcon from '../assets/SocialMediaSVGS/facebook-icon.svg';
import instagramIcon from '../assets/SocialMediaSVGS/instagram-icon.svg';
import linktreeIcon from '../assets/SocialMediaSVGS/linktree-icon.svg';
import telegramIcon from '../assets/SocialMediaSVGS/telegram-icon.svg';
import twitchIcon from '../assets/SocialMediaSVGS/twitch-icon.svg';
import undefinedIcon from '../assets/SocialMediaSVGS/undefined-icon.svg';

export const getAvalibleSMSvgByURL = (SMURL) => {
  let parsedURL;
  if (SMURL) {
    try {
      parsedURL = new URL(SMURL).host;
    } catch (e) {
      return undefinedIcon;
    }
  }
  switch (parsedURL) {
    case 'www.youtube.com':
      return youtubeIcon;
      break;
    case 'www.facebook.com':
      return facebookIcon;
      break;
    case 'www.instagram.com':
      return instagramIcon;
      break;
    case 'linktr.ee':
      return linktreeIcon;
      break;
    case 't.me':
      return telegramIcon;
      break;
    case 'www.twitch.tv':
      return twitchIcon;
      break;
    default:
      return undefinedIcon;
  }
};
