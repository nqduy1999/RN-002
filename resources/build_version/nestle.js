import Empty from '@resources/build_version/Empty';
import SVG_WELCOME_LOG from '../../../assets/svg/logo-nestle-intro.svg';
import AIA_BENEFITS from '../../../assets/image/EVE-Benefits.png';
import I18n from 'react-native-i18n';

export default {
  employerId: 127,
  lang: {
    vi: {
      TITLE_RECOGNITION_POINT: '#Spark',
      TITLE_RECOGNITION_POINTS: '#Spark',
      TITLE_RECOGNITION_POINTS_FOR_NOTIFICATION: '#Spark',
      TITLE_RECOGNITION_POINTS_NEW: '#Spark để gửi',
      TITLE_WELCOME:
        'Chào mừng đến với\nNền tảng Phúc lợi nhân viên\nhàng đầu Việt Nam',
      TITLE_MY_REWARDS: 'Ưu đãi của tôi',
      TITLE_COMING_SOON: 'Coming Soon',
      CONTENT_COMING_SOON: 'Let’s practice NLF everyday to earn more #Spark and keep inspiring your colleagues with that spirit! Are you excited to redeem the upcoming rewards?',
      TITLE_SENT_RECOGNITION_POINTS: 'Ghi nhận đã gửi',
      TITLE_REWARD_COINS: '#Spark đã nhận',
      TITLE_RECEIVED_RECOGNITIONS: 'Ghi nhận đã nhận',
      LABEL_GIVE_POINT: '#Spark',
      LABEL_FLEX_POINTS: '#Spark',
      LABEL_FLEX_POINT: '#Spark',
      LABEL_FLEX_POINTS_FOR_NOTIFICATION: '#Spark',
      LABEL_GIVING_RECOGNITION_POINT: 'Số #Spark bạn muốn gửi tặng',
      LABEL_RATING_VALUE_CRITERIA: 'Chọn năng lực lãnh đạo phù hợp với #Spark của đồng nghiệp',
      LABEL_RATING_VALUE_CRITERIA_DESC: 'Bạn có thể chọn tối đa 6 năng lực lãnh đạo',
      FIELD_NOTE_MINIMUM_WORDS_REQUIRED: 'Lời nhắn phải có ít nhất 10 từ',
      MODAL_DESCRIPTION_SEND_RECOGNITION_SMALLER:
        'Nhân viên này chỉ có thể nhận {0} trong kỳ này, bạn có muốn tiếp tục không?',
      MODAL_DESCRIPTION_SEND_RECOGNITION_ZERO:
        'Nhân viên này không thể nhận thêm #Spark trong giai đoạn này, bạn có chắc muốn tiếp tục?',
      TITLE_NEWS_AND_DOCUMENTS: 'Tin tức & Tài liệu',
      LABEL_DOCUMENTS: 'Tài liệu',
      LABEL_DOCUMENTS_NOTIFICATION: 'Tài liệu mới',
      LABEL_REWARD_CATEGORY: 'Chọn phần thưởng',
      LABEL_FEATURED_DOCUMENTS: 'Tài liệu',
      LABEL_FAQ: 'Những điều cần biết',
      MODAL_DESCRIPTION_USERNAME:
        'Tên người dùng là email công ty của bạn, ngoại trừ những trường hợp khác được thông báo bởi phòng Nhân sự.',
      FIELD_DEPARTMENT_LABEL: 'Phòng ban',
      FIELD_DEPARTMENT_PLACEHOLDER: 'Phòng ban',
      FIELD_POSITION_LABEL: 'Chức vụ',
      FIELD_POSITION_PLACEHOLDER: 'Chức vụ',
      FIELD_LOCATION_LABEL: 'Nơi làm việc',
      FIELD_LOCATION_PLACEHOLDER: 'Nơi làm việc',
      FIELD_WORK_EMAIL_LABEL: 'Email công ty',
      FIELD_WORK_EMAIL_PLACEHOLDER: 'Email công ty',
      BUTTON_LEARN_MORE_RECOGNITION: 'Tìm hiểu về Cổng Khen Thưởng',
      TITLE_MAKE_A_RECOGNITION: 'Ghi nhận #SYW',
      TITLE_OTHER_SCHEMES: 'Khen thưởng khác',
      FIELD_SEARCH_NAME_PLACEHOLDER: 'Nhập tên đồng nghiệp của bạn',
      TITLE_RECOGNITION_P2P: 'Ghi nhận những đóng góp từ đồng nghiệp của bạn tại đây!',
      BUTTON_SUBMIT_RECOGNITION: 'Gửi',
      BUTTON_SUBMIT_SURVEY: 'Gửi',
      COUNT_NOTIFIED_SEND_RECOGNITION_SUCCESS: 'Thông điệp Ghi nhận này sẽ được thông báo đến {0} đồng nghiệp.',
      DESCRIPTION_SEND_RECOGNITION_SUCCESS: 'Số dư còn lại: {}\n\nĐừng quên sử dụng số dư #Spark để Ghi nhận đồng nghiệp trước ngày **',
      LABEL_THE_LATEST: 'Mới nhất',
      LABEL_THE_OLDEST: 'Cũ nhất',
      LABEL_LISTS: 'Đã nhận',
      LABEL_SEND: 'Đã gửi',
      SORT_BY_PRICE_LOW_TO_HIGH: 'Giá: Thấp đến cao',
      SORT_BY_PRICE_HIGH_TO_LOW: 'Giá: Cao đến thấp',
      FIELD_WRITE_NOTE_PLACEHOLDER: 'Hãy nhập thông điệp Ghi nhận của bạn tại đây, tối thiểu 10 từ.',
      LABEL_LATEST_NEWS: 'Tin tức mới nhất',
      LABEL_WALLET_SHOW_STAFF: 'Đưa nhân viên mã của bạn',
      CRITERIA_HISTORY_LABEL: 'Năng lực lãnh đạo được thể hiện',
    },
    en: {
      TITLE_RECOGNITION_POINT: '#Spark',
      TITLE_RECOGNITION_POINTS: '#Spark',
      TITLE_RECOGNITION_POINTS_FOR_NOTIFICATION: '#Spark',
      TITLE_RECOGNITION_POINTS_NEW: '#Spark Budget',
      TITLE_WELCOME: 'Welcome to Vietnam’s \nBenefits & Recognition Platform',
      TITLE_MY_REWARDS: 'My rewards',
      TITLE_COMING_SOON: 'Coming Soon',
      CONTENT_COMING_SOON: 'Let’s practice NLF everyday to earn more #Spark and keep inspiring your colleagues with that spirit! Are you excited to redeem the upcoming rewards?',
      TITLE_SENT_RECOGNITION_POINTS: 'Sent recognition',
      TITLE_REWARD_COINS: '#Spark Received',
      TITLE_RECEIVED_RECOGNITIONS: 'Received recognition',
      LABEL_GIVE_POINT: '#Spark',
      LABEL_FLEX_POINTS: '#Spark',
      LABEL_FLEX_POINT: '#Spark',
      LABEL_FLEX_POINTS_FOR_NOTIFICATION: '#Spark',
      LABEL_GIVING_RECOGNITION_POINT: '#Spark you want to give',
      LABEL_RATING_VALUE_CRITERIA: 'Choose competencies that your colleagues showed their #Spark',
      LABEL_RATING_VALUE_CRITERIA_DESC: 'You can choose maximum 6 competencies',
      FIELD_NOTE_MINIMUM_WORDS_REQUIRED: 'Note must have at least 10 words',
      MODAL_DESCRIPTION_SEND_RECOGNITION_SMALLER:
        'This employee can only receive {0} in this period, are you sure you want to proceed?',
      MODAL_DESCRIPTION_SEND_RECOGNITION_ZERO:
        'This employee can not receive any more #Spark in this period, are you sure you want to proceed?',
      TITLE_NEWS_AND_DOCUMENTS: 'Company News',
      LABEL_DOCUMENTS: 'Documents',
      LABEL_DOCUMENTS_NOTIFICATION: 'New Documents',
      LABEL_REWARD_CATEGORY: 'Choose your rewards',
      LABEL_FEATURED_DOCUMENTS: 'Must-know Documents',
      LABEL_FAQ: 'All the things you need to know',
      MODAL_DESCRIPTION_USERNAME:
        'Your username is your work email, unless advised otherwise by your HR.',
      FIELD_LOCATION_LABEL: 'Working Location',
      FIELD_LOCATION_PLACEHOLDER: 'Working Location',
      FIELD_POSITION_LABEL: 'Job Title',
      FIELD_POSITION_PLACEHOLDER: 'Job Title',
      FIELD_DEPARTMENT_LABEL: 'Department',
      FIELD_DEPARTMENT_PLACEHOLDER: 'Department',
      FIELD_WORK_EMAIL_LABEL: 'Work Email',
      FIELD_WORK_EMAIL_PLACEHOLDER: 'Work Email',
      BUTTON_LEARN_MORE_RECOGNITION: 'Learn more about Recognition Portal',
      TITLE_MAKE_A_RECOGNITION: '#SYW Recognition',
      TITLE_OTHER_SCHEMES: 'Other recognitions',
      FIELD_SEARCH_NAME_PLACEHOLDER: 'Enter your colleague’s first name',
      TITLE_RECOGNITION_P2P: 'Here’s where you will recognize your colleagues',
      BUTTON_SUBMIT_RECOGNITION: 'Send recognition',
      BUTTON_SUBMIT_SURVEY: 'Submit',
      COUNT_NOTIFIED_SEND_RECOGNITION_SUCCESS: 'This has been notified to {0} other colleagues.',
      DESCRIPTION_SEND_RECOGNITION_SUCCESS: 'Remaining balance: {}\n\nRemember to use these #Spark to recognize other colleagues by **',
      LABEL_THE_LATEST: 'Latest',
      LABEL_THE_OLDEST: 'Earliest',
      LABEL_LISTS: 'Received',
      LABEL_SEND: 'Sent',
      SORT_BY_PRICE_LOW_TO_HIGH: 'Price: Low to high',
      SORT_BY_PRICE_HIGH_TO_LOW: 'Price: High to low',
      FIELD_WRITE_NOTE_PLACEHOLDER: 'Type your message here, minimum 10 words are required.',
      LABEL_LATEST_NEWS: 'Last News',
      LABEL_WALLET_SHOW_STAFF: 'Show Staff your code',
      CRITERIA_HISTORY_LABEL: 'NLF Competencies demonstrated',
    },
  },
  setting: {
    isProfileEditable: true,
    minimumWords: 10,
    currencyUnit: 'đ',
    renderHomeCover: false,
    coinTextUnit: 'LABEL_FLEX_POINTS', //#Spark
    pointTextUnit: 'LABEL_FLEX_POINT', //#Spark
    currencyTitleSize: 'large-title',
    version: 'nestle',
    recognitionTextUnit: 'TITLE_RECOGNITION_POINT',
    isProgramRecognition: false,
    login: 'LoginPage',
    rewardSortBy: 'Name',
    isRegistrationEnabled: true,
  },
  palette: {
    ACCENT_COLOR: '#CB3528',
    SECONDARY_COLOR: '#CB3528',
    LIGHT_SECONDARY_COLOR: '#99ECC0',
    PINK_COLOR: '#CB3528',
    RED_COLOR: '#00AEA0',
    STATUS_BAR_COLOR: '#68BD5E',
    VERTICAL_LINEAR_GRADIENT_BACKGROUND_COLORS: ['#CB3528', '#FF2F59'],
    SENDER_CHAT_BACKGROUND_COLOR: 'rgba(255, 42, 67, 0.15)',
    MESSAGE_TEMPLATE_BACKGROUND_COLOR: 'rgba(221, 60, 48, 0.15)',
    TEXT_GRAY_COLOR: '#7B7B7B',
    FILTER_OPTION_COLOR: '#FFBDB7',
  },
  styles: {
    buttonBackground: {
      backgroundColor: '#00AEA0',
    },
    noBorder: {
      borderWidth: 0,
    },
    button: {
      color: '#fff',
    },
    budget: {
      color: '#fff',
    },
    buttonBackgroundDisabled: {
      backgroundColor: '#CCCCCC',
    },
    buttonDisabled: {
      color: '#fff',
    },
    thumb: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderColor: '#00AFAA',
    },
  },
  image: {
    SVG_WELCOME_LOG: SVG_WELCOME_LOG,
    AIA_BENEFITS: AIA_BENEFITS,
    PLACEHOLDER_DOCUMENTS_SQUARE: require('../../../assets/image/nestle/nestle-documents-square.png'),
    PLACEHOLDER_DOCUMENTS_COVER: require('../../../assets/image/nestle/nestle-documents-cover.png'),
    PLACEHOLDER_NEWS_SQUARE: require('../../../assets/image/nestle/nestle-news-square.png'),
    PLACEHOLDER_NEWS_COVER: require('../../../assets/image/nestle/nestle-news-cover.png'),
    AIA_STOCK_1_IMAGE: require('../../../assets/image/generic-stock-documents.png'),
    SWIPER_1_BANNER_IMAGE: require('../../../assets/image/nestle/nestle-swiper-1.png'),
    SWIPER_2_BANNER_IMAGE: require('../../../assets/image/nestle/nestle-swiper-2.png'),
  },
  tabIcons: {
    home: [
      require('@assets/image/nestle/tab_home_inactive.png'),
      require('@assets/image/nestle/tab_home_active.png'),
    ],
    recognition: [
      require('@assets/image/nestle/tab_recognition_inactive.png'),
      require('@assets/image/nestle/tab_recognition_active.png'),
    ],
    account: [
      require('@assets/image/nestle/tab_account_inactive.png'),
      require('@assets/image/nestle/tab_account_active.png'),
    ],
  },
  component: {
    FlexAUnit: Empty,
  },
  criteriaGroups: () => {
    let groups = {
      en: [
        ['ManageForResults', '#F47621', require(`@assets/image/nestle/criterias/0.png`), true], // Manage for Results
        ['MakeADifference', '#EC528B', require(`@assets/image/nestle/criterias/1.png`), true], // Make a Difference
        ['CollaborateInternally', '#6458A5', require(`@assets/image/nestle/criterias/2.png`), true], // Collaborate Internally
        ['CompeteAndConnectExternally', '#EEAB1F', require(`@assets/image/nestle/criterias/3.png`), true], // Compete & Connect Externally
        ['LeadToWin', '#2383C5', require(`@assets/image/nestle/criterias/4.png`), true], // Lead To Win
        ['GrowTalentAndTeam', '#54813B', require(`@assets/image/nestle/criterias/5.png`), true], // Grow Talent & Team
        ['ConnectToConnect', '#FEC600', require('@assets/image/nestle/criterias/6.png'), false], // Connect
        ['WinToWin', '#00A0DD', require('@assets/image/nestle/criterias/8.png'), false], // Win
        ['DeliverToDeliver', '#FF4D00', require('@assets/image/nestle/criterias/7.png'), false], // Deliver
        ['DevelopToDevelop', '#61A60F', require('@assets/image/nestle/criterias/9.png'), false], // Develop
        ['CollaborateToCollaborate', '#B14FC4', require('@assets/image/nestle/criterias/10.png'), false], // Collaborate
        ['ImpactToImpact', '#CA007B', require('@assets/image/nestle/criterias/11.png'), false], //Impact
      ],
      vi:[
        ['ManageForResults', '#F47621', require('@assets/image/nestle/criterias/0.png'), true], // Manage for Results
        ['MakeADifference', '#EC528B', require('@assets/image/nestle/criterias/1.png'), true], // Make a Difference
        ['CollaborateInternally', '#6458A5', require('@assets/image/nestle/criterias/2.png'), true], // Collaborate Internally
        ['CompeteAndConnectExternally', '#EEAB1F', require('@assets/image/nestle/criterias/3.png'), true], // Compete & Connect Externally
        ['LeadToWin', '#2383C5', require('@assets/image/nestle/criterias/4.png'), true], // Lead To Win
        ['GrowTalentAndTeam', '#54813B', require('@assets/image/nestle/criterias/5.png'), true], // Grow 
        ['ConnectToConnect', '#FEC600', require('@assets/image/nestle/criterias/12.png'), false], // Connect
        ['WinToWin', '#00A0DD', require('@assets/image/nestle/criterias/13.png'), false], // Win
        ['DeliverToDeliver', '#FF4D00', require('@assets/image/nestle/criterias/14.png'), false], // Deliver
        ['DevelopToDevelop', '#61A60F', require('@assets/image/nestle/criterias/15.png'), false], // Develop
        ['CollaborateToCollaborate', '#B14FC4', require('@assets/image/nestle/criterias/16.png'), false], // Collaborate
        ['ImpactToImpact', '#CA007B', require('@assets/image/nestle/criterias/17.png'), false], //Impact
      ]
    };
    let temp = { list: [] };
    groups[I18n.locale].forEach(group => {
      temp.list.push(group);
      temp[`EmployerRatingCriteriaGroup_Name_${group[0]}`] = group.slice(1);
    });
    return temp;
  },
  nominationStatues: {
    RequiringApproval: {
      name: 'inReview',
      color: '#F86D09',
      icon: require('@assets/image/nestle/awards/ic_timer.png'),
    },
    WaitForComment: {
      name: 'waitForComment',
      color: '#F86D09',
      icon: require('@assets/image/nestle/awards/ic_timer.png'),
    },
    ApprovedAndCommented: {
      name: 'approved',
      color: '#00AFAA',
      icon: require('@assets/icons/ic_ok.png'),
    },
    HRRejected: {
      name: 'reject',
      color: '#7B7B7B',
      icon: require('@assets/image/nestle/awards/ic_reject.png'),
    },
    Expired: {
      name: 'expired',
      color: '#7B7B7B',
      icon: require('@assets/image/nestle/awards/ic_reject.png'),
    },
  },
};

export const isValidNestlePasswordFormat = (password) => {
  let passChars = password.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A').replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E').replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I').replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O').replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U').replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y').replace(/Đ/g, 'D').split('');
  return !(password.length < 10 || !passChars.some(i => /[A-Z]/.test(i) && i.toUpperCase() === i) || !passChars.some(i => /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(i)));
}