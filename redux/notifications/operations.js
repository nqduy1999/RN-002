import I18n from 'react-native-i18n';
import { decode as decodeHtmlEntity } from 'html-entities';

import actions, {
  setHideLoadingNotification,
  setShowLoadingNotification,
} from './actions';
import firebase from 'react-native-firebase';
import newsActions from '../newsAndDocuments/actions';
import appOperations from '../app/operations';
import recognitionActions from '@redux/recognition/actions';
import recogOperations from '@redux/recognition/operations';
import api from './api';
import moment from 'moment';
import {
  TIME_YESTERDAY_FORMAT,
  TIME_TODAY_FORMAT,
  LABEL_DOCUMENTS_NOTIFICATION,
  LABEL_ARTICLE_NOTIFICATION,
  LABEL_RECOGNITION_RECEIVED_NOTIFICATION,
  LABEL_RECOGNITION_RECEIVED_NOTIFICATION_FOR_PEPSI,
  LABEL_RECOGNITION_RECEIVED_NOTIFICATION_FOR_NOTIFY_USER_MANAGER,
  LABEL_FLEXIBLE_BENEFITS_RECEIVED_NOTIFICATION,
  LABEL_NON_VOUCHER_NOTIFICATION,
  LABEL_NON_VOUCHER_NOTIFICATION_FAILED,
  LABEL_VOUCHER_NOTIFICATION_FAILED,
  LABEL_FLEX_POINTS,
  LABEL_FLEX_POINTS_FOR_NOTIFICATION,
  TITLE_RECOGNITION_POINTS,
  TITLE_RECOGNITION_POINTS_FOR_NOTIFICATION,
  LABEL_APPROVED_OR_REJECTED_QUARTERLY_RECOGNITION_NOTIFICATION,
  LABEL_REJECTED,
  LABEL_APPROVED,
  LABEL_REGCONITION,
  LABEL_REGCONITIONS,
  LABEL_REGCONITION_APPROVED,
  LABEL_REGCONITION_REJECT,
  LABEL_NEW_SURVEY_NOTIFICATION,
  TITLE_REWARD_COINS,
} from '@resources/string/strings';
import {
  SVG_ICON_NOTI_ARTICLE,
  SVG_ICON_NOTI_RECOGNITION,
} from '../../resources/images';
import { renderText } from '@common/components/StringHelper';
import authOperations from '../auth/operations';
import { isUnauthorized } from '../helpers/errorHandler';
import {
  LABEL_QUARTERLY_RECOGNITION_NOTIFICATION,
  LABEL_QUARTERLY_RECOGNITION_COMMENT_NOTIFICATION,
  LABEL_SUBMIT_ALL_QUARTERLY_RECOGNITION_NOTIFICATION,
  LABEL_SENDER_RECOMMENDED_NOTIFICATION,
  LABEL_ADMIN_REVIEW_RECOGNITION_NOTIFICATION,
  LABEL_ADMIN_REVIEW_RECOGNITIONS_NOTIFICATION,
  LABEL_ADMIN_REVIEW_RECOGNITION_NOTIFICATION_SELF,
  LABEL_ADMIN_REVIEW_RECOGNITIONS_NOTIFICATION_SELF,
  LABEL_MANAGED_EMPLOYEE_BEEN_RECOGNISED_NOTIFICATION,
  LABEL_MANAGED_EMPLOYEE_BEEN_RECOGNISED_NOTIFICATION_SELF,
  LABEL_RECEIVED_RECOGNITION_PROGRAM_NOTIFICATION,
  LABEL_REPLY_RECOGNITION_NOTIFICATION,
  YOU_HAVE_A_NEW_NOTIFICATION,
  LABEL_RECOGNITION_RECALL_NOTIFICATION,
} from '../../resources/string/strings';
import { formatCurrency } from '@resources/formats';
import { ORANGE_COLOR } from '../../resources/palette';
import BuildVersion, { IS } from '@resources/build_version/BuildVersion';
import { sourceImage } from '@common/function/function';
import * as API from '../socialWall/api';
import {
  programRecognitions,
  selfRecognitions,
} from '@resources/string/recognition';

import { toJson } from '@utils/Utils';

const quarterlyRecognitionIcon = {
  name: 'Diploma-2',
  type: 'Line',
  size: 28,
  color: BuildVersion.palette.RED_COLOR,
};
const flexibleBenefitIcon = {
  name: 'Tag-3',
  type: 'Line',
  size: 28,
  color: ORANGE_COLOR,
};

const surveyIcon = {
  name: 'Spell-Check',
  type: 'Line',
  size: 28,
  color: BuildVersion.palette.RED_COLOR,
};

const clearNotifications = () => async dispatch => {
  return dispatch(actions.clearNotifications());
};

const readNotification = (id, notify) => async dispatch => {
  dispatch(actions.readNotification(id));
  try {
    await api.readNotification(id, notify);
    // if (Platform.OS === 'ios') {
    let badgeCount = await firebase.notifications().getBadge();
    firebase.notifications().setBadge(badgeCount - 1);
    // }
    return true;
  } catch (error) {
    if (isUnauthorized(error)) {
      dispatch(appOperations.hideLoading());
      authOperations.logoutAlert();
    }
    return false;
  }
};

const readAllNotification = () => async (dispatch, getState) => {
  dispatch(actions.readAllNotification());
  try {
    const { notifications } = getState().notifications;
    const { category } = notifications;
    await api.readAllNotification(category);
    // if (Platform.OS === 'ios') {
    firebase.notifications().setBadge(0);
    // }
    return true;
  } catch (error) {
    if (isUnauthorized(error)) {
      dispatch(appOperations.hideLoading());
      authOperations.logoutAlert();
    }
    return false;
  }
};

const mapCreatedAtToDateFormat = date => {
  const momentDate = moment(date);
  const today = moment();

  if(momentDate.diff(today, 'days') == 0){
    return renderText(TIME_TODAY_FORMAT).replace(
      '{0}',
      momentDate.format('HH:mm'),
    );
  }
  else if(momentDate.diff(today, 'days') == -1){
    return renderText(TIME_YESTERDAY_FORMAT).replace(
      '{0}',
      momentDate.format('HH:mm'),
    );
  }

  return momentDate.format('DD/MM/YYYY, HH:mm');
};

const mapIconFromType = type => {
  switch (type) {
    case 'NewRecognitionReceived':
      return { source: SVG_ICON_NOTI_RECOGNITION };
    case 'NewRecognitionAllocated':
      return { source: SVG_ICON_NOTI_RECOGNITION };
    case 'NewCompanyNews':
      return { source: SVG_ICON_NOTI_ARTICLE };
    case 'NewDocumentCreated':
      return { source: SVG_ICON_NOTI_ARTICLE };
    case 'NewQuarterlyRecognition':
      return quarterlyRecognitionIcon;
    case 'NewQuarterlyRecognitionComment':
      return quarterlyRecognitionIcon;
    case 'SubmitAllRecognition':
      return quarterlyRecognitionIcon;
    case 'ApprovedOrRejectedQuarterlyRecognition':
      return quarterlyRecognitionIcon;
    case 'FlexibleBenefitAllocated':
      return flexibleBenefitIcon;
    case 'FlexibleBenefitRecommendation':
      return flexibleBenefitIcon;
    case 'FlexPointAllowanceAllocated':
      return { source: SVG_ICON_NOTI_RECOGNITION };
    case 'NonVoucherOrderCompleted':
      return flexibleBenefitIcon;
    case 'NonVoucherOrderFailed':
    case 'VoucherOrderFailed':
    case 'AiaShareEnroll':
    case 'AiaShareParticipant':
    case 'AiaShareNonParticipant':
      return flexibleBenefitIcon;
    case 'NewMonkeySurvey': {
      return surveyIcon;
    }
    default:
      return { source: SVG_ICON_NOTI_RECOGNITION };
  }
};

const mapTitleFromNotification = item => {
  const endRegExp = new RegExp(
    IS.NESTLE ? /[&\/\\,+()$~%.'":*?<>{}]/g : /[&\/\\#,+()$~%.'":*?<>{}]/g,
  );
  const { notificationType } = item;
  switch (notificationType) {
    case 'NewRecognitionReceived':
      const point = `${item.data.replace('+', '')} ${renderText(
        LABEL_FLEX_POINTS_FOR_NOTIFICATION,
      )}`;
      const isNotifyUserManager = item.notificationTitle.includes(
        'My Team Kudos',
      );
      if (isNotifyUserManager) {
        return {
          title: '',
          description: renderText(
            LABEL_RECOGNITION_RECEIVED_NOTIFICATION_FOR_NOTIFY_USER_MANAGER,
          )
            .replace('{0}', point)
            .replace('{1}', item.sender)
            .replace('{2}', item.receiver),
          highlightWords: [
            point.replace(endRegExp, ''),
            item.sender.split(' - ')[0],
            item.receiver,
          ],
        };
      }

      return {
        title: '',
        description: renderText(LABEL_RECOGNITION_RECEIVED_NOTIFICATION)
          .replace('{0}', point)
          .replace('{1}', item.sender),
        highlightWords: [
          point.replace(endRegExp, ''),
          item.sender.split(' - ')[0].replace(endRegExp, ''),
          '"',
        ],
      };
    case 'NewRecognitionAllocated':
      const allocatePoint = `${item.data.replace('+', '')} ${renderText(
        TITLE_RECOGNITION_POINTS_FOR_NOTIFICATION,
      )}`;
      return {
        title: '',
        description: renderText(LABEL_RECOGNITION_RECEIVED_NOTIFICATION)
          .replace('{0}', allocatePoint)
          .replace('{1}', item.sender),
        highlightWords: [
          allocatePoint.replace(endRegExp, ''),
          item.sender.split(' - ')[0].replace(endRegExp, ''),
          '"',
        ],
      };
    case 'NewCompanyNews':
      return {
        title: renderText(LABEL_ARTICLE_NOTIFICATION),
        description: ` \"${item.data}\"`,
        highlightWords: [item.data.replace(endRegExp, ''), '"'],
      };
    case 'NewDocumentCreated':
      return {
        title: renderText(LABEL_DOCUMENTS_NOTIFICATION),
        description: ` \"${item.data}\"`,
        highlightWords: [item.data.replace(endRegExp, ''), '"'],
      };
    case 'NewQuarterlyRecognition':
      return {
        title: renderText(LABEL_QUARTERLY_RECOGNITION_NOTIFICATION),
      };
    case 'NewQuarterlyRecognitionComment':
      return {
        title: '',
        description: renderText(
          LABEL_QUARTERLY_RECOGNITION_COMMENT_NOTIFICATION,
        ).replace('{0}', item.sender),
        highlightWords: [item.sender.split(' - ')[0].replace(endRegExp, '')],
      };
    case 'SubmitAllRecognition':
      return {
        title: '',
        description: renderText(
          LABEL_SUBMIT_ALL_QUARTERLY_RECOGNITION_NOTIFICATION,
        ).replace('{0}', item.data),
        highlightWords: [item.data.replace(endRegExp, '')],
      };
    case 'ApprovedOrRejectedQuarterlyRecognition':
      const firstName2 = item.data;
      const lastName2 = item.sender;
      var type =
        item.notificationTitle == 'Approved Recognition'
          ? renderText(LABEL_APPROVED)
          : renderText(LABEL_REJECTED);

      return {
        title: '',
        description: renderText(
          LABEL_APPROVED_OR_REJECTED_QUARTERLY_RECOGNITION_NOTIFICATION,
        )
          .replace('{0}', `${firstName2} ${lastName2}`)
          .replace('{1}', type),
        highlightWords: [`${firstName2} ${lastName2}`.replace(endRegExp, '')],
      };
    case 'FlexibleBenefitAllocated':
      let money = formatCurrency(Number(item.data.replace('+', '')));
      return {
        title: '',
        description: renderText(LABEL_FLEXIBLE_BENEFITS_RECEIVED_NOTIFICATION)
          .replace('{0}', money)
          .replace('{1}', item.sender),
        highlightWords: [
          money,
          item.sender.split(' - ')[0].replace(endRegExp, ''),
        ],
      };
    case 'FlexibleBenefitRecommendation':
      return {
        title: '',
        description: renderText(LABEL_SENDER_RECOMMENDED_NOTIFICATION)
          .replace('{0}', item.sender)
          .replace('{1}', item.data),
        highlightWords: [
          item.sender.replace(endRegExp, ''),
          item.data.replace(endRegExp, ''),
        ],
      };
    case 'FlexPointAllowanceAllocated':
      const flexPoint = `${item.data.replace('+', '')} ${renderText(
        !IS.PEPSI ? LABEL_FLEX_POINTS_FOR_NOTIFICATION : TITLE_REWARD_COINS,
      )}`;
      return {
        title: '',
        description: renderText(
          !IS.PEPSI
            ? LABEL_RECOGNITION_RECEIVED_NOTIFICATION
            : LABEL_RECOGNITION_RECEIVED_NOTIFICATION_FOR_PEPSI,
        )
          .replace('{0}', flexPoint)
          .replace('{1}', item.sender),
        highlightWords: [
          flexPoint,
          item.sender.split(' - ')[0].replace(endRegExp, ''),
        ],
      };
    case 'NonVoucherOrderCompleted':
      return {
        title: renderText(LABEL_NON_VOUCHER_NOTIFICATION),
      };
    case 'NonVoucherOrderFailed':
      return {
        title: renderText(LABEL_NON_VOUCHER_NOTIFICATION_FAILED),
      };
    case 'VoucherOrderFailed':
      return {
        title: renderText(LABEL_VOUCHER_NOTIFICATION_FAILED),
      };
    case 'AdminReviewRecognition': {
      const {
        status,
        program,
        recognitions,
        comment,
        type: recognitionType,
      } = JSON.parse(item.data);

      let lng = I18n.locale,
        p = selfRecognitions.find(i => i.includes(program));
      p = p ? p[+(lng === 'vi')] : program;

      const description = renderText(
        recognitions > 1
          ? recognitionType === 0
            ? LABEL_ADMIN_REVIEW_RECOGNITIONS_NOTIFICATION
            : LABEL_ADMIN_REVIEW_RECOGNITIONS_NOTIFICATION_SELF
          : recognitionType === 0
            ? LABEL_ADMIN_REVIEW_RECOGNITION_NOTIFICATION
            : LABEL_ADMIN_REVIEW_RECOGNITION_NOTIFICATION_SELF,
      )
        .replace('{0}', recognitions)
        .replace('{1}', p)
        .replace(
          '{2}',
          renderText(recognitions > 1 ? LABEL_REGCONITIONS : LABEL_REGCONITION),
        )
        .replace(
          '{3}',
          renderText(
            status === 'approved'
              ? LABEL_REGCONITION_APPROVED
              : LABEL_REGCONITION_REJECT,
          ),
        )
        .replace('{4}', comment ? '\n' + comment : '');

      return {
        title: '',
        description: description,
        highlightWords: [p, recognitions],
      };
    }
    case 'ManagedEmployeeBeenRecognised': {
      let nameSend = item.sender.split(' - ')[0].trim();
      const { program: pr, receiver: r } = JSON.parse(item.data);

      return {
        title: '',
        description: renderText(
          r !== nameSend
            ? LABEL_MANAGED_EMPLOYEE_BEEN_RECOGNISED_NOTIFICATION
            : LABEL_MANAGED_EMPLOYEE_BEEN_RECOGNISED_NOTIFICATION_SELF,
        )
          .replace(BuildVersion.setting.version === 'athena' ? ' 1' : '', '')
          .replace('{0}', r)
          .replace('{1}', pr)
          .replace('{2}', nameSend),
        highlightWords: [nameSend, pr, r],
      };
    }
    case 'ReceivedRecognitionProgram': {
      const { program, sender: s } = JSON.parse(item.data);
      let lng = I18n.locale,
        p = programRecognitions.find(i => i.includes(program));
      p = p ? p[+(lng === 'vi')] : program;
      return {
        title: '',
        description: renderText(LABEL_RECEIVED_RECOGNITION_PROGRAM_NOTIFICATION)
          .replace(BuildVersion.setting.version === 'athena' ? ' 1' : '', '')
          .replace('{0}', p)
          .replace('{1}', s),
        highlightWords: [p, s],
      };
    }
    case 'RecognitionReply':
      const { sender } = JSON.parse(item.data);
      return {
        title: '',
        description: renderText(LABEL_REPLY_RECOGNITION_NOTIFICATION).replace(
          '{sender}',
          sender,
        ),
      };

    case 'NewMonkeySurvey':
      const { surveyName } = JSON.parse(item.data);
      return {
        description: renderText(LABEL_NEW_SURVEY_NOTIFICATION).replace(
          '{surveyName}',
          surveyName,
        ),
        highlightWords: [`"${surveyName}"`],
      };
    case 'SPVB': {
      const { notificationTitle, messageContent, data } = item;
      return {
        title: notificationTitle,
        description: messageContent,
        content: decodeHtmlEntity(data),
      };
    }
    case 'RecallRecognition':
      const recalledName = item.sender.split(' - ')[0];
      const recalledPoint = item.data.replace('-', '');
      return {
        title: '',
        description: renderText(LABEL_RECOGNITION_RECALL_NOTIFICATION)
          .replace('{0}', recalledName)
          .replace('{1}', recalledPoint),
        highlightWords: [
          recalledName,
          recalledPoint + ' Kudos',
          'Recall Kudos:',
          'Rất tiếc!',
        ],
      };
    case 'NewAnnouncement': {
      const { notificationTitle, data } = item;
      return {
        title: notificationTitle,
        description: `\n${data}`,
        highlightTitle: true,
      };
    }
    case 'AiaShareEnroll':
    case 'AiaShareParticipant':
    case 'AiaShareNonParticipant': {
      let desc = I18n.t(
        `aiaCP.notify.${notificationType.replace('AiaShare', '')}`,
      );
      return {
        title: I18n.t('newArticle') + ':',
        description: ` ${desc}`,
        highlightWords: [desc],
      };
    }
    case 'PKudosProgram': {
      let kudosValue = Number(item.data) + ' ' + 'Kudos';
      return {
        description: I18n.t(`notifyType.${notificationType}`, { value: kudosValue }),
        highlightWords: [kudosValue],
      };
    }
    case 'NestleNominationApprove':
    case 'NestleNominationReject': {
      let { nominee = '' } = toJson(item.data) || {};
      let notifyId = notificationType.replace('Nestle', '');
      return {
        fullLine: true,
        description: I18n.t(`nestle.notify.${notifyId}`, { nominee }),
        highlightWords: [nominee],
      };
    }
    case 'NestleNominationNominated': {
      let { nominator = '' } = toJson(item.data) || {};
      let notifyId = notificationType.replace('Nestle', '');
      return {
        fullLine: true,
        description: I18n.t(`nestle.notify.${notifyId}`, { nominator }),
        highlightWords: [nominator],
      };
    }
    case 'NestleNominationRequireReview': {
      let { sender: hr } = item;
      let notifyId = notificationType.replace('Nestle', '');
      return {
        fullLine: true,
        description: I18n.t(`nestle.notify.${notifyId}`, { hr }),
        highlightWords: [hr],
      };
    }

    default:
      // console.log('not handle notification ', item.data);
      return { title: renderText(YOU_HAVE_A_NEW_NOTIFICATION) };
  }
};

const getSingleArticle = id => async (dispatch, getState) => {
  dispatch(appOperations.showLoading());
  try {
    const response = await api.getSingleArticle(id);
    if (response) {
      const data = {
        ...response,
        createdAtMoment: moment(response.createdAt).fromNow(),
        createdAtDate: moment(response.createdAt),
        createdAtDateFormat: moment(response.createdAt).format(
          'DD/MM/YYYY - HH:mm',
        ),
        coverImage: {
          source: response.coverImageUrl
            ? { uri: response.coverImageUrl }
            : sourceImage(BuildVersion.image.PLACEHOLDER_NEWS_SQUARE),
          coverSource: response.coverImageUrl
            ? { uri: response.coverImageUrl }
            : sourceImage(BuildVersion.image.PLACEHOLDER_NEWS_COVER),
        },
      };
      dispatch(
        newsActions.setSingleArticleType(response.type === 'News' ? 0 : 1),
      );
      dispatch(newsActions.setSingleArticle(data));
      return true;
    }
  } catch (error) {
    if (isUnauthorized(error)) {
      dispatch(appOperations.hideLoading());
      authOperations.logoutAlert();
    }
    console.log(error);
    return false;
  } finally {
    dispatch(appOperations.hideLoading());
  }
};

const getSingleRecognition = (Id, IsSentRecognition) => async (
  dispatch,
  getState,
) => {
  //dispatch(appOperations.showLoading());
  try {
    const response = await api.getSingleRecognition({ Id, IsSentRecognition });
    if (response) {
      var data = recogOperations.convertRecognitionToViewModel(response);
      dispatch(recogOperations.getRecognitionSchemes());
      dispatch(recogOperations.setViewPointHistory(IsSentRecognition));
      dispatch(recognitionActions.setSingleHistoryRecognition(data));
      return true;
    }
  } catch (error) {
    if (isUnauthorized(error)) {
      // dispatch(appOperations.hideLoading());
      authOperations.logoutAlert();
    }
    console.log(error);
    return false;
  } finally {
    //dispatch(appOperations.hideLoading());
  }
};

const changeNotificationCategory = category => async (dispatch, getState) => {
  try {
    dispatch(appOperations.showLoading());
    dispatch(actions.changeNotificationCategory(category));
    await dispatch(getNotifications());
  } catch (error) {
  } finally {
    dispatch(appOperations.hideLoading());
  }
};

const getNotifications = () => async (dispatch, getState) => {
  const { notifications } = getState().notifications;
  const {
    page,
    pageSize,
    hasNext,
    sortNames,
    sortDirections,
    category,
  } = notifications;
  if (hasNext) {
    dispatch(setShowLoadingNotification());
    try {
      let response = await api.getNotifications({
        page,
        pageSize,
        sortNames,
        sortDirections,
        category,
      });
      if (response) {
        const isInAppNotify = category === 'SPVB';
        const data = response.items.map(item => {
          return {
            ...item,
            ...mapTitleFromNotification(item),
            isRead: item.status === 'Read',
            createdAtDateFormat: mapCreatedAtToDateFormat(item.createdAt),
            icon: mapIconFromType(item.notificationType),
          };
        });

        if (!isInAppNotify) {
          let badgeCount = await firebase.notifications().getBadge();
          if (badgeCount !== response.unreadCount) {
            firebase.notifications().setBadge(response.unreadCount);
          }
        }

        dispatch(
          actions.setNotifications({
            data: data,
            unreadCount: response.unreadCount,
            hasNext: notifications.page < response.totalPage,
            page: page + 1,
          }),
        );
      }
    } catch (error) {
      console.log(error);
      if (isUnauthorized(error)) {
        dispatch(appOperations.hideLoading());
        authOperations.logoutAlert();
      }
    } finally {
      dispatch(setHideLoadingNotification());
    }
  }
};

const initNotification = () => async dispatch => {
  dispatch(appOperations.showLoading());
  await dispatch(getNotifications());
  dispatch(appOperations.hideLoading());
};

const refreshNotification = () => async dispatch => {
  await dispatch(clearNotifications());
  dispatch(getNotifications());
};

const loadMoreNotification = currentPage => (dispatch, getState) => {
  const { page, hasNext } = getState().notifications.notifications;
  if (page !== currentPage && !hasNext) {
    return;
  }
  dispatch(appOperations.showLoading());
  dispatch(getNotifications());
  dispatch(appOperations.hideLoading());
};

export const getTopNotification = () => async (dispatch, getState) => {
  try {
    dispatch(actions.getTopNotification());
    const response = await api.getTopNotification();
    dispatch(actions.getTopNotificationSuccess(response));
  } catch (error) {
    dispatch(actions.getTopNotificationFailed(error));
  }
};

export default {
  readNotification,
  clearNotifications,
  getNotifications,
  initNotification,
  loadMoreNotification,
  getSingleArticle,
  getSingleRecognition,
  refreshNotification,
  readAllNotification,
  changeNotificationCategory,
  getTopNotification,
};
