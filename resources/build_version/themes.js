import themesService from '../../services/local/themes';
import SVG_WELCOME_LOG from '../../../assets/svg/logo-generic-intro.svg';
import AIA_BENEFITS from '../../../assets/image/EVE-Benefits.png';

const getPalette = () => {
  const defaultColor = {
    ACCENT_COLOR: '#F86D09',
    PINK_COLOR: '#00AEA0',
    RED_COLOR: '#00AEA0',
    STATUS_BAR_COLOR: '#68BD5E',
    VERTICAL_LINEAR_GRADIENT_BACKGROUND_COLORS: ['#68BD5E', '#00AEA4'],
    SENDER_CHAT_BACKGROUND_COLOR: '#E3F9F7',
    MESSAGE_TEMPLATE_BACKGROUND_COLOR: 'rgba(248, 109, 9, 0.15)',
  };
  const themes = themesService.getThemes();

  if (!themes || !themes.mobileTheme) {
    return defaultColor;
  }
  const {colors} = themes.mobileTheme;

  const verticalLinearGradientBackground =
    colors.verticalLinearGradientBackground1 &&
    colors.verticalLinearGradientBackground2
      ? [
          colors.verticalLinearGradientBackground1,
          colors.verticalLinearGradientBackground2,
        ]
      : [];

  const palette = {
    ACCENT_COLOR: colors.primary ?? defaultColor.ACCENT_COLOR ?? '',
    PINK_COLOR: colors.secondary ?? defaultColor.PINK_COLOR ?? '',
    RED_COLOR: colors.tertiary ?? defaultColor.RED_COLOR ?? '',
    STATUS_BAR_COLOR: colors.quaternary ?? defaultColor.STATUS_BAR_COLOR ?? '',
    VERTICAL_LINEAR_GRADIENT_BACKGROUND_COLORS: verticalLinearGradientBackground.length
      ? verticalLinearGradientBackground
      : defaultColor.VERTICAL_LINEAR_GRADIENT_BACKGROUND_COLORS
      ? defaultColor.VERTICAL_LINEAR_GRADIENT_BACKGROUND_COLORS
      : [],
    SENDER_CHAT_BACKGROUND_COLOR:
      colors.mobileSenderChatBackgroundColor ??
      defaultColor.SENDER_CHAT_BACKGROUND_COLOR ??
      '',
    MESSAGE_TEMPLATE_BACKGROUND_COLOR:
      colors.mobileMessageTemplateBackgroundColor ??
      defaultColor.MESSAGE_TEMPLATE_BACKGROUND_COLOR ??
      '',
  };

  return palette;
};

const getImages = () => {
  const defaultImages = {
    SVG_WELCOME_LOG: SVG_WELCOME_LOG,
    AIA_BENEFITS: AIA_BENEFITS,
    PLACEHOLDER_DOCUMENTS_SQUARE: require('../../../assets/image/generic-documents-square.png'),
    PLACEHOLDER_DOCUMENTS_COVER: require('../../../assets/image/generic-documents-cover.png'),
    PLACEHOLDER_NEWS_SQUARE: require('../../../assets/image/generic-news-square.png'),
    PLACEHOLDER_NEWS_COVER: require('../../../assets/image/generic-news-cover.png'),
    AIA_STOCK_1_IMAGE: require('../../../assets/image/generic-stock-documents.png'),
    SWIPER_1_BANNER_IMAGE: require('../../../assets/image/swiper-generic-1.png'),
    SWIPER_2_BANNER_IMAGE: require('../../../assets/image/swiper-generic-2.png'),
  };

  const themes = themesService.getThemes();
  if (!themes || !themes.mobileTheme) {
    return defaultImages;
  }
  const {images} = themes.mobileTheme;

  const image = {
    SVG_WELCOME_LOG:
      images.svgWelcomeLogo ?? defaultImages.SVG_WELCOME_LOG ?? '',
    AIA_BENEFITS: images.benefitLogo ?? defaultImages.AIA_BENEFITS ?? '',
    PLACEHOLDER_DOCUMENTS_SQUARE:
      images.documentsSquare ??
      defaultImages.PLACEHOLDER_DOCUMENTS_SQUARE ??
      '',
    PLACEHOLDER_DOCUMENTS_COVER:
      images.documentsCover ?? defaultImages.PLACEHOLDER_DOCUMENTS_COVER ?? '',
    PLACEHOLDER_NEWS_SQUARE:
      images.newsSquare ?? defaultImages.PLACEHOLDER_NEWS_SQUARE ?? '',
    PLACEHOLDER_NEWS_COVER:
      images.newsCover ?? defaultImages.PLACEHOLDER_NEWS_COVER ?? '',
    AIA_STOCK_1_IMAGE: images.stock ?? defaultImages.AIA_STOCK_1_IMAGE ?? '',
    SWIPER_1_BANNER_IMAGE:
      images.banner1 ?? defaultImages.SWIPER_1_BANNER_IMAGE ?? '',
    SWIPER_2_BANNER_IMAGE:
      images.banner2 ?? defaultImages.SWIPER_2_BANNER_IMAGE ?? '',
  };

  return image;
};

export default {
  getPalette,
  getImages,
};
