// format
// Prefix: GET, POST, PATCH, PUT, DELETE
// URL
// POST
const POST_EXTERNAL_LOGIN = 'manage-user/api/auth/external-login';
const POST_LOGIN = 'manage-user/api/auth/login';
const POST_REGISTER = 'manage-user/api/auth/register';
const POST_CHECK_REGISTER_USERNAME =
  'manage-user/api/auth/can-register-account';
const POST_CHECK_CAN_RESET_PASSWORD = 'manage-user/api/auth/can-reset-password';
const POST_RESET_PASSWORD = 'manage-user/api/auth/reset-password';
const POST_MAKE_RECOGNITION = '/manage-recognition/api/recognitions';
const POST_MAKE_GROUP_KUDOS_RECOGNITION =
  '/manage-recognition/api/recognitions/by-group';
const POST_MAKE_RECOGNITION_BY_COIN =
  '/manage-recognition/api/recognitions/send-by-coin';
const POST_SAVE_DEVICE = 'manage-notification/api/devices';
const POST_CLAIM_REWARD = '/manage-product/api/rewards/v2/{0}?lang={1}';
const POST_CHECK_RECEIVER_COINS =
  '/manage-recognition/api/recognitions/get-receivable-coins';
const POST_UPLOAD_S3 = '/manage-content/api/upload-s3/upload-avatar';
const POST_ADD_TO_WISHLIST = '/manage-product/api/wishlist/{0}';
const POST_CLAIM_BENEFITS =
  '/manage-product/api/rewards/claim-flexible-benefit';
const POST_RATING = '/manage-user/api/ratings';
const TRADE_ANNUAL_LEAVE_DAYS =
  '/manage-recognition/api/flexible-benefits/update-anual-leave-trade-off-allowance';
const POST_CONVERT_COINS_TO_BUDGET =
  '/manage-recognition/api/recognitions/exchange-coins-for-flexben/{0}';
const POST_LOGOUT = '/manage-user/api/auth/logout';
const POST_CREATE_RECOGNITION_BY_PROGRAM =
  '/manage-recognition/api/recognitions/create-recognitions-by-program';
const POST_CREATE_RECOGNITION_REJECTED_COMMENT =
  '/manage-recognition/api/recognitions/create-comment-for-recognition';
const POST_UPLOAD_ATTACHMENT = '/manage-content/api/upload-s3';
const POST_UPLOAD_ATTACHMENT_EXTERNAL =
  '/manage-content/api/external-file-storage/upload';
const POST_CHECK_IN_EVENT = '/manage-recognition/api/event-attendee/';

const POST_FLEXIBLE_BENEFITS_GIVE = 'manage-recognition/api/flexible-benefits/give-flexible-benefit'; // "{ ""toEmployeeId"" : 25162, ""iconId"" : 1, ""amount"" : 50000, ""note"" : ""Tặng user"" } 
const POST_WALLETS_SEND_REWARDS = 'manage-recognition/api/wallets/send-rewards'; // "{ ""toEmployeeId"" : 25162, ""id"" : 9328, ""message"" : ""Tặng gift"" }

const POST_NESTLE_AWARD_MAKE = 'manage-product/api/nestle-nomination/make-nomination';
const POST_NESTLE_AWARD_VOTING = 'manage-product/api/nestle-nomination/voting';
const POST_NESTLE_AWARD_VOTING_ROUND = 'manage-product/api/nestle-nomination/voting-round';

//GET
const GET_IS_OFFICE365_ENABLED_BY_USERNAME =
  'manage-user/api/auth/is-office-365';
const GET_SECURITY_QUESTIONS = 'manage-user/api/security-questions';
const GET_USER_SECURITY_QUESTIONS =
  'manage-user/api/security-questions/user-questions';
const GET_RATING_VALUE_CRITERIAS = 'manage-recognition/api/rating-criterias';
const GET_RATING_CRITERIA_GROUPS =
  'manage-recognition/api/rating-criteria-groups';
const GET_EMPLOYEE_BY_FULLNAME = 'manage-user/api/employees';
const GET_RECOGNITION_PROGRAM_EMPLOYEE_BY_FULLNAME =
  'manage-user/api/employees/recognition-program';
const GET_RECOGNITION_PROGRAM_EMPLOYEE =
  'manage-user/api/employees/recognition-program';
const GET_WALLET_OVERVIEW = 'manage-recognition/api/wallets/overview';
const GET_BRANCHES = '/manage-user/api/branches';
const GET_DEPARTMENTS = '/manage-user/api/departments';
const GET_HISTORY_RECOGNITION = '/manage-recognition/api/recognitions';
const GET_NEWS_AND_DOCUMENTS = '/manage-content/api/news/search';
const GET_ARTICLE_RELATED = '/manage-content/api/news/related/';
const GET_NOTIFICATIONS =
  '/manage-notification/api/notifications/get-notifications-by-category';
const GET_IN_APPP_NOTIFICATIONS =
  '/manage-notification/api/in-app-notifications/get-by-employee';
const GET_NEW = '/manage-content/api/news/{0}';
const GET_RECOGNITION = '/manage-recognition/api/recognitions/detail-received';
const GET_REWARDS = '/manage-product/api/rewards?lang={lang}';
const GET_REWARD = '/manage-product/api/rewards/{0}?lang={1}';
const GET_WALLET_REWARDs = '/manage-recognition/api/wallets/rewards';
const GET_WALLET_REWARD = '/manage-recognition/api/wallets/rewards/{0}';
const GET_RECENT_SENDER = '/manage-user/api/employees/recent-sender';
const GET_PROFILE_USER = '/manage-user/api/profile/my-profile';
const GET_FLEXIBLE_BENEFITS_INFO = '/manage-recognition/api/flexible-benefits';
const GET_FLEXIBLE_BENEFITS_BUDGET =
  '/manage-recognition/api/flexible-benefits/budget';
const GET_TOP_FLEXIBLE_BENEFITS =
  '/manage-product/api/rewards/top-flexible-benefits?lang={lang}';
const GET_WISHLIST = '/manage-product/api/wishlist?lang={lang}';
const GET_REWARD_CATEGORIES = '/manage-product/api/reward-category-settings';
const GET_REWARD_LOCATIONS = '/manage-product/api/rewards/locations';
const GET_ANNUAL_LEAVE_TRADE_OFF_SETTING =
  '/manage-user/api/employer-settings/get-annual-leave-trade-off-setting';
const GET_ANSWER_QUESTION_SECURITY =
  '/manage-user/api/security-questions/answer-question';
const GET_RECOGNITION_REPLY_TEMPLATE =
  'manage-recognition/api/recognition-reply-template';
const GET_RECOGNITION_REPLIES = '/manage-recognition/api/recognition-replies';
const CREATE_RECOGNITION_REPLY = 'manage-recognition/api/recognition-replies';
const GET_FLEXIBLE_BENEFITS_INFO_BY_CATEGORY =
  '/manage-recognition/api/flexible-benefits/categories';
const GET_RECOGNITION_SCHEMES = '/manage-recognition/api/recognition-programs';
const GET_ALL_RECOGNITION_SCHEMES =
  '/manage-recognition/api/recognition-programs/all';
const GET_RECOGNITION_COMMENTS =
  '/manage-recognition/api/recognitions/recognition-comments';
const GET_FLEXIBLE_BENEFIT_WALLET_HISTORY =
  '/manage-recognition/api/flexible-benefits/wallet-histories';
const GET_TOP_NOTIFICATION =
  '/manage-notification/api/notifications/top-notification';
const GET_MANAGER_POINT_CAP =
  '/manage-recognition/api/recognitions/manager-available-points';
const GENERATE_WELLNESS_TOKEN =
  '/manage-user/api/employees/generate-wellness-token';
const GET_UPDATE = '/manage-user/api/employees/check-update';
const GET_FEATURES = '/manage-user/api/auth/features';
const GET_WALLET_HISTORIES = '/manage-recognition/api/wallets/histories';
const GET_USER_MANAGERS = 'manage-user/api/employees/managers';
const GET_RECALL_RECOGNITION = '/manage-recognition/api/recognitions/recall';

const GET_FLEXIBLE_BENEFITS_MILESTONE_TO_CELEBRATE = 'manage-recognition/api/flexible-benefits/milestone-to-celebrate';
const GET_FLEXIBLE_BENEFITS_GIVE_OVERVIEW = 'manage-recognition/api/flexible-benefits/overview-give-flexible-benefit';
const GET_FLEXIBLE_BENEFITS_GIVE_HISTORIES = 'manage-recognition/api/flexible-benefits/history-give-flexible-benefit'; // ?type=received&page=1&fromDate=2021-10-18&toDate=2021-10-19
const GET_FLEXIBLE_BENEFITS_GIVE_DETAIL = 'manage-recognition/api/flexible-benefits/detail-give-flexible-benefit/'; // + history's id
const GET_SEND_REWARD_DETAIL = 'manage-recognition/api/wallets/detail-send-rewards/'; // + history's id

const GET_NESTLE_AWARD_MY_STATUS = 'manage-product/api/nestle-nomination/get-my-status';
const GET_NESTLE_AWARD_VOTING_BOARD = 'manage-product/api/nestle-nomination/voting-board';
const GET_NESTLE_AWARD_VOTING_ROUND = 'manage-product/api/nestle-nomination/voting-board-round';
const GET_NESTLE_AWARD_ACTIVE_VOTING_ROUND = 'manage-product/api/nestle-nomination/get-round-active';
const GET_NESTLE_AWARD_MY_NOMINATION = 'manage-product/api/nestle-nomination/my-nomination';
const GET_NESTLE_AWARD_DEPARTMENTS = 'manage-user/api/employees/nomination/list-department';
const GET_NESTLE_AWARD_LOCATIONS = 'manage-user/api/employees/nomination/list-location';
const GET_NESTLE_AWARD_RECENT_NOMINATES = 'manage-product/api/nestle-nomination/recent-nominee';
const GET_NESTLE_AWARD_DETAIL = 'manage-product/api/nestle-nomination/detail?id=';

const GET_EXCHANGE_SSO = 'manage-user/api/auth/sso-exchange?code={code}';

//DELETE
const DELETE_DEVICE =
  '/manage-notification/api/devices/delete-by-unique-id/{0}';
const DELETE_ITEM_IN_WISHLIST = '/manage-product/api/wishlist/{0}';

//PUT
const PUT_READ_NOTIFICATION =
  '/manage-notification/api/notifications/{0}/mask-as-read';
const PUT_READ_IN_APPP_NOTIFICATION =
  '/manage-notification/api/in-app-notifications/{0}/mark-as-read';
const PUT_ALL_READ_NOTIFICATION =
  '/manage-notification/api/notifications/mask-all-as-read';
const PUT_ALL_READ_IN_APPP_NOTIFICATION =
  '/manage-notification/api/in-app-notifications/mark-all-as-read';
const PUT_UPDATE_REWARD_STATUS = '/manage-recognition/api/wallets/rewards/{0}';
const PUT_UPDATE_PROFILE_USER = '/manage-user/api/profile';
const PUT_UPDATE_REMINDER_RATING_DATE =
  '/manage-user/api/ratings/update-reminder-date';
const PUT_UPDATE_PASSWORD = '/manage-user/api/account/me/change-password';
const PUT_UPDATE_SECURITY_QUESTIONS = '/manage-user/api/security-questions';
const PUT_UPDATE_RECOGNITION = 'manage-recognition/api/recognitions';

export default {
  //POST
  POST_EXTERNAL_LOGIN,
  POST_LOGIN,
  POST_REGISTER,
  POST_CHECK_REGISTER_USERNAME,
  POST_CHECK_CAN_RESET_PASSWORD,
  POST_RESET_PASSWORD,
  POST_MAKE_RECOGNITION,
  POST_MAKE_RECOGNITION_BY_COIN,
  POST_MAKE_GROUP_KUDOS_RECOGNITION,
  POST_SAVE_DEVICE,
  POST_CLAIM_REWARD,
  POST_CHECK_RECEIVER_COINS,
  POST_UPLOAD_S3,
  POST_ADD_TO_WISHLIST,
  POST_CLAIM_BENEFITS,
  POST_RATING,
  TRADE_ANNUAL_LEAVE_DAYS,
  POST_CONVERT_COINS_TO_BUDGET,
  POST_LOGOUT,
  POST_CREATE_RECOGNITION_BY_PROGRAM,
  POST_CREATE_RECOGNITION_REJECTED_COMMENT,
  POST_UPLOAD_ATTACHMENT,
  POST_UPLOAD_ATTACHMENT_EXTERNAL,
  POST_CHECK_IN_EVENT,
  GENERATE_WELLNESS_TOKEN,
  POST_FLEXIBLE_BENEFITS_GIVE,
  POST_WALLETS_SEND_REWARDS,
  POST_NESTLE_AWARD_MAKE,
  POST_NESTLE_AWARD_VOTING,
  POST_NESTLE_AWARD_VOTING_ROUND,
  //GET
  GET_FLEXIBLE_BENEFIT_WALLET_HISTORY,
  GET_RECOGNITION_PROGRAM_EMPLOYEE,
  GET_RECOGNITION_SCHEMES,
  GET_IS_OFFICE365_ENABLED_BY_USERNAME,
  GET_SECURITY_QUESTIONS,
  GET_USER_SECURITY_QUESTIONS,
  GET_RATING_VALUE_CRITERIAS,
  GET_RATING_CRITERIA_GROUPS,
  GET_EMPLOYEE_BY_FULLNAME,
  GET_RECOGNITION_PROGRAM_EMPLOYEE_BY_FULLNAME,
  GET_WALLET_OVERVIEW,
  GET_BRANCHES,
  GET_DEPARTMENTS,
  GET_HISTORY_RECOGNITION,
  GET_NEWS_AND_DOCUMENTS,
  GET_ARTICLE_RELATED,
  GET_NOTIFICATIONS,
  GET_IN_APPP_NOTIFICATIONS,
  GET_NEW,
  GET_RECOGNITION,
  GET_REWARDS,
  GET_REWARD,
  GET_WALLET_REWARDs,
  GET_WALLET_REWARD,
  GET_RECENT_SENDER,
  GET_PROFILE_USER,
  GET_FLEXIBLE_BENEFITS_INFO,
  GET_FLEXIBLE_BENEFITS_BUDGET,
  GET_TOP_FLEXIBLE_BENEFITS,
  GET_WISHLIST,
  GET_REWARD_CATEGORIES,
  GET_REWARD_LOCATIONS,
  GET_ANNUAL_LEAVE_TRADE_OFF_SETTING,
  GET_ANSWER_QUESTION_SECURITY,
  GET_RECOGNITION_COMMENTS,
  GET_ALL_RECOGNITION_SCHEMES,
  GET_TOP_NOTIFICATION,
  GET_MANAGER_POINT_CAP,
  GET_UPDATE,
  GET_FEATURES,
  GET_WALLET_HISTORIES,
  GET_USER_MANAGERS,
  GET_RECALL_RECOGNITION,
  GET_FLEXIBLE_BENEFITS_MILESTONE_TO_CELEBRATE,
  GET_FLEXIBLE_BENEFITS_GIVE_OVERVIEW,
  GET_FLEXIBLE_BENEFITS_GIVE_HISTORIES,
  GET_FLEXIBLE_BENEFITS_GIVE_DETAIL,
  GET_SEND_REWARD_DETAIL,
  GET_NESTLE_AWARD_MY_STATUS,
  GET_NESTLE_AWARD_VOTING_BOARD,
  GET_NESTLE_AWARD_VOTING_ROUND,
  GET_NESTLE_AWARD_ACTIVE_VOTING_ROUND,
  GET_NESTLE_AWARD_MY_NOMINATION,
  GET_NESTLE_AWARD_DEPARTMENTS,
  GET_NESTLE_AWARD_LOCATIONS,
  GET_NESTLE_AWARD_RECENT_NOMINATES,
  GET_NESTLE_AWARD_DETAIL,
  GET_EXCHANGE_SSO,
  //DELETE,
  DELETE_DEVICE,
  DELETE_ITEM_IN_WISHLIST,
  //PUT
  PUT_READ_NOTIFICATION,
  PUT_READ_IN_APPP_NOTIFICATION,
  PUT_UPDATE_REWARD_STATUS,
  PUT_ALL_READ_NOTIFICATION,
  PUT_ALL_READ_IN_APPP_NOTIFICATION,
  PUT_UPDATE_PROFILE_USER,
  PUT_UPDATE_REMINDER_RATING_DATE,
  PUT_UPDATE_PASSWORD,
  PUT_UPDATE_SECURITY_QUESTIONS,
  CREATE_RECOGNITION_REPLY,
  GET_RECOGNITION_REPLIES,
  GET_RECOGNITION_REPLY_TEMPLATE,
  GET_FLEXIBLE_BENEFITS_INFO_BY_CATEGORY,
  PUT_UPDATE_RECOGNITION,
};