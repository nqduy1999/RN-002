import api from '@services/remote/baseApi';
import apiEndpoints from '@services/remote/apiEndpoints';
import withQuery from 'with-query';
import i18n from '@resources/string/locale/LanguageServices';
import BuildVersion from '@resources/build_version/BuildVersion';

const isAthena = BuildVersion.setting.version === 'athena';
//GET==========================================================
const getListRatingValueCriterias = async () => {
  return api.get(apiEndpoints.GET_RATING_VALUE_CRITERIAS);
};

const getListRatingCriteriaGroups = async () => {
  return api.get(apiEndpoints.GET_RATING_CRITERIA_GROUPS);
};

const getEmployeeByFullname = async (
  pararms,
  isRecognitionProgram,
  isForNotifyUserManagers,
) => {
  const apiEndpoint =
    isRecognitionProgram && !isForNotifyUserManagers
      ? apiEndpoints.GET_RECOGNITION_PROGRAM_EMPLOYEE_BY_FULLNAME
      : apiEndpoints.GET_EMPLOYEE_BY_FULLNAME;
  return api.get(withQuery(apiEndpoint, pararms));
};

const getUserManagers = employeeId => {
  return api.get(withQuery(apiEndpoints.GET_USER_MANAGERS, { employeeId }));
};

const getRecentSender = async top => {
  return api.get(withQuery(apiEndpoints.GET_RECENT_SENDER, { top }));
};

const getWalletOverview = async fullname => {
  return api.get(apiEndpoints.GET_WALLET_OVERVIEW);
};

const getBranches = async () => {
  return api.get(apiEndpoints.GET_BRANCHES);
};

const getDepartments = async () => {
  return api.get(apiEndpoints.GET_DEPARTMENTS);
};

const getHistoryRecognition = async (
  IsSentRecognition,
  PageSize,
  Page,
  isAccessing,
  status,
  month,
  recognitionProgramId,
  user,
  filter,
) => {
  return api.get(
    withQuery(apiEndpoints.GET_HISTORY_RECOGNITION, {
      IsSentRecognition,
      PageSize,
      Page,
      SortNames: 'CreatedAt',
      SortDirections: isAccessing ? 'OrderByAccessing' : 'OrderByDescending',
      IsDhl: user.isRecognitionSchemeEnabled,
      status: status === -1 ? null : status,
      month,
      recognitionProgramId:
        recognitionProgramId === -1 ? null : recognitionProgramId,
      lang: i18n?.locale,
      startDate: filter.time.startDate,
      endDate: filter.time.endDate,
      type: filter.type.id !== 'All' ? filter.type.id : undefined,
    }),
  );
};

const getRewards = async (params, categories, locations) => {
  return api.get(
    `${withQuery(
      apiEndpoints.GET_REWARDS.replace('{lang}', i18n.locale),
      params,
    )}&CategoryId=${categories}&locations=${locations}`,
  );
};

const getSingleReward = async (id, language) => {
  return api.get(
    apiEndpoints.GET_REWARD.replace('{0}', id).replace('{1}', language),
  );
};

const recallRecognition = async recognitionId => {
  return api.get(
    `${apiEndpoints.GET_RECALL_RECOGNITION}?recognitionId=${recognitionId}`,
  );
};

//POST==========================================================
const sendRecognition = async body => {
  return api.post(apiEndpoints.POST_MAKE_RECOGNITION, body);
};

const sendGroupKudosRecognition = async body => {
  return api.post(apiEndpoints.POST_MAKE_GROUP_KUDOS_RECOGNITION, body);
};

const sendRecognitionByCoin = async body => {
  return api.post(apiEndpoints.POST_MAKE_RECOGNITION_BY_COIN, body);
};

const claimReward = async (id, lang) => {
  return api.post(
    apiEndpoints.POST_CLAIM_REWARD.replace('{0}', id).replace('{1}', lang),
  );
};

const checkReceiverPoint = async body => {
  return api.post(apiEndpoints.POST_CHECK_RECEIVER_COINS, body);
};

const getRewardCategories = async => {
  return api.get(apiEndpoints.GET_REWARD_CATEGORIES);
};

const getRewardLocations = async () => {
  return api.get(apiEndpoints.GET_REWARD_LOCATIONS);
};

//====================== Recognition reply========================
const getRecognitionReplyTemplate = async () => {
  return api.get(apiEndpoints.GET_RECOGNITION_REPLY_TEMPLATE);
};

const getRecognitionReplies = async params => {
  return api.get(withQuery(apiEndpoints.GET_RECOGNITION_REPLIES, params));
};

const createRecognitionReply = async body => {
  return api.post(apiEndpoints.CREATE_RECOGNITION_REPLY, body);
};

const convertCoinsToBudget = async coins => {
  return api.post(
    apiEndpoints.POST_CONVERT_COINS_TO_BUDGET.replace('{0}', coins),
  );
};

const getRecognitionSchemes = async (isMultiLanguage = isAthena) => {
  return api.get(
    withQuery(apiEndpoints.GET_RECOGNITION_SCHEMES, { isMultiLanguage }),
  );
};

const getAllRecognitionSchemes = async (isMultiLanguage = false) => {
  return api.get(
    withQuery(apiEndpoints.GET_ALL_RECOGNITION_SCHEMES, { isMultiLanguage }),
  );
};

const getAllSelfRecognitionSchemes = (type, isMultiLanguage = false) => {
  return api.get(
    withQuery(apiEndpoints.GET_ALL_RECOGNITION_SCHEMES, {
      type,
      isMultiLanguage,
    }),
  );
};

const getRecognitionProgramEmployee = async fullname => {
  return api.get(
    withQuery(apiEndpoints.GET_RECOGNITION_PROGRAM_EMPLOYEE, { fullname }),
  );
};

const createRecognitionByProgram = (programId, recogniseEmployee) => {
  return api.post(apiEndpoints.POST_CREATE_RECOGNITION_BY_PROGRAM, {
    programId,
    recogniseEmployee,
  });
};

const updateRejectedRecognition = recognition => {
  const { id, attachment, note, recognitionLevelId } = recognition;
  return api.put(apiEndpoints.PUT_UPDATE_RECOGNITION, {
    id,
    attachment,
    note,
    recognitionLevelId,
  });
};

const createRecognitionRejectedComment = (comment, recognitionId) => {
  return api.post(apiEndpoints.POST_CREATE_RECOGNITION_REJECTED_COMMENT, {
    comment,
    recognitionId,
  });
};

const getRecognitionComments = (recognitionId, page) => {
  return api.get(
    withQuery(apiEndpoints.GET_RECOGNITION_COMMENTS, {
      recognitionId,
      page,
      pageSize: 15,
    }),
  );
};

const uploadAttachments = (file, nameFolder = 'RecognitionAttachments') => {
  const formData = new FormData();
  formData.append('files', {
    uri: file.uri,
    type: file.type, // or photo.type
    name: file.fileName,
  });
  formData.append('folder', nameFolder);

  let apiEndpoint = apiEndpoints.POST_UPLOAD_ATTACHMENT;
  if (isAthena) {
    apiEndpoint = apiEndpoints.POST_UPLOAD_ATTACHMENT_EXTERNAL;
  }

  return api.post(apiEndpoint, formData, {
    headers: {
      'Evehr-Application' : BuildVersion.setting.version, 
      'Content-Type': 'multipart/form-data',
    },
  });
};

const getManagerPointCap = () => {
  return api.get(apiEndpoints.GET_MANAGER_POINT_CAP);
};

const checkInEvent = params => {
  return api.post(apiEndpoints.POST_CHECK_IN_EVENT, params);
};

const getNestleAwardDepartments = () => api.get(apiEndpoints.GET_NESTLE_AWARD_DEPARTMENTS);
const getNestleAwardLocations = () => api.get(apiEndpoints.GET_NESTLE_AWARD_LOCATIONS);
const getNestleAwardRecentNominates = () => api.get(apiEndpoints.GET_NESTLE_AWARD_RECENT_NOMINATES);

export default {
  getManagerPointCap,
  getAllRecognitionSchemes,
  uploadAttachments,
  getRecognitionComments,
  createRecognitionRejectedComment,
  getListRatingValueCriterias,
  getEmployeeByFullname,
  getUserManagers,
  getWalletOverview,
  sendRecognition,
  sendRecognitionByCoin,
  sendGroupKudosRecognition,
  recallRecognition,
  getBranches,
  getHistoryRecognition,
  getListRatingCriteriaGroups,
  getRewards,
  getSingleReward,
  claimReward,
  checkReceiverPoint,
  getRecentSender,
  getRewardCategories,
  getRecognitionReplyTemplate,
  getRecognitionReplies,
  createRecognitionReply,
  convertCoinsToBudget,
  getRecognitionSchemes,
  getRecognitionProgramEmployee,
  createRecognitionByProgram,
  updateRejectedRecognition,
  checkInEvent,
  getAllSelfRecognitionSchemes,
  getDepartments,
  getRewardLocations,
  getNestleAwardDepartments,
  getNestleAwardLocations,
  getNestleAwardRecentNominates,
};
