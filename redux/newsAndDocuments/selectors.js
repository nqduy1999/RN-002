import {createSelector} from 'reselect';
import moment from 'moment';
import BuildVersion from '@resources/build_version/BuildVersion';
import {sourceImage} from '../../common/function/function';
//FILTER

const monthsSelector = state => state.newsAndDocuments.months;
const filterMonthsTempSelector = state =>
  state.newsAndDocuments.filterTemp.months;
const filterMonthsSelector = state => state.newsAndDocuments.filter.months;
const filterSelector = state => state.newsAndDocuments.filter;
const selectedFilterMonthsTempSelector = createSelector(
  [monthsSelector, filterMonthsTempSelector],
  (months, selectedMonthsTemp) => {
    return months.map(item => {
      return {
        ...item,
        isSelected:
          selectedMonthsTemp.findIndex(
            selectedMonth => selectedMonth === item.id,
          ) !== -1,
      };
    });
  },
);
const currentFilterMonthsWithStateSelector = createSelector(
  [monthsSelector, filterMonthsSelector],
  (months, selectedMonthsTemp) => {
    return months.map(item => {
      return {
        ...item,
        isSelected:
          selectedMonthsTemp.findIndex(
            selectedMonth => selectedMonth === item.id,
          ) !== -1,
      };
    });
  },
);

const selectedFilterMonthSelector = createSelector(
  currentFilterMonthsWithStateSelector,
  months => {
    return months.filter(item => item.isSelected);
  },
);

const currentFilterChoiceCountSelector = createSelector(
  filterSelector,
  filter => {
    let count = 0;
    if (filter.accessing !== undefined) {
      count += 1;
    }
    count += filter.months.length;
    return count;
  },
);

//NEWS
const newsSelector = state => state.newsAndDocuments.news.data;

const convertedNewsSelector = createSelector(
  newsSelector,
  news => {
    return news.map(item => {
      return {
        ...item,
        createdAtMoment: moment(item.createdAt).fromNow(),
        createdAtDate: moment(item.createdAt),
        createdAtDateFormat: moment(item.createdAt).format(
          'DD/MM/YYYY - HH:mm',
        ),
        coverImage: {
          source: item.coverImageUrl
            ? {uri: item.coverImageUrl}
            : sourceImage(BuildVersion.image.PLACEHOLDER_NEWS_SQUARE),
          coverSource: item.coverImageUrl
            ? {uri: item.coverImageUrl}
            : sourceImage(BuildVersion.image.PLACEHOLDER_NEWS_COVER),
        },
      };
    });
  },
);

const filteredNewsSelector = createSelector(
  [convertedNewsSelector, selectedFilterMonthSelector, filterSelector],
  (news, selectedMonth, filter) => {
    let months = news;
    if (selectedMonth.length !== 0) {
      months = news.filter(
        item =>
          selectedMonth.findIndex(month =>
            month.date.isSame(item.createdAtDate, 'month'),
          ) !== -1,
      );
    }
    return months;
  },
);

const firstNewSelector = createSelector(
  filteredNewsSelector,
  news => {
    if (news.length > 0) {
      return news[0];
    }
    return news;
  },
);
const finalNewsSelector = createSelector(
  filteredNewsSelector,
  news => {
    if (news.length > 0) {
      news.shift();
    }
    return news;
  },
);

//DOCUMENTS
const documentsSelector = state => state.newsAndDocuments.documents.data;

const convertedDocumentsSelector = createSelector(
  documentsSelector,
  documents => {
    return documents.map(item => {
      return {
        ...item,
        createdAtMoment: moment(item.createdAt).fromNow(),
        createdAtDate: moment(item.createdAt),
        createdAtDateFormat: moment(item.createdAt).format(
          'DD/MM/YYYY - HH:mm',
        ),
        coverImage: {
          source: item.coverImageUrl
            ? {uri: item.coverImageUrl}
            : sourceImage(BuildVersion.image.PLACEHOLDER_DOCUMENTS_SQUARE),
          coverSource: item.coverImageUrl
            ? {uri: item.coverImageUrl}
            : sourceImage(BuildVersion.image.PLACEHOLDER_DOCUMENTS_COVER),
        },
      };
    });
  },
);

const filteredDocumentsSelector = createSelector(
  [convertedDocumentsSelector, selectedFilterMonthSelector, filterSelector],
  (documents, selectedMonth, filter) => {
    let months = documents;
    if (selectedMonth.length !== 0) {
      months = documents.filter(
        item =>
          selectedMonth.findIndex(month =>
            month.date.isSame(item.createdAtDate, 'month'),
          ) !== -1,
      );
    }
    return months;
  },
);
const firstDocumentSelector = createSelector(
  filteredDocumentsSelector,
  documents => {
    if (documents.length > 0) {
      return documents[0];
    }
    return undefined;
  },
);
const finalDocumentsSelector = createSelector(
  filteredDocumentsSelector,
  documents => {
    if (documents.length > 0) {
      documents.shift();
    }
    return documents;
  },
);

const featuredDocumentsSelector = state =>
  state.newsAndDocuments.featuredDocuments.data;

const featuredDocumentsConvertSelector = createSelector(
  featuredDocumentsSelector,
  featuredDocuments => {
    return featuredDocuments.map(item => {
      return {
        ...item,
        coverImage: {
          source: item.coverImageUrl
            ? {uri: item.coverImageUrl}
            : sourceImage(BuildVersion.image.PLACEHOLDER_NEWS_COVER),
          coverSource: item.coverImageUrl
            ? {uri: item.coverImageUrl}
            : sourceImage(BuildVersion.image.PLACEHOLDER_NEWS_SQUARE),
        },
      };
    });
  },
);

const latestNewsSelector = state => state.newsAndDocuments.latestNews.data;

const latestNewsConvertSelector = createSelector(
  latestNewsSelector,
  latestNews => {
    return latestNews.map(item => {
      return {
        ...item,
        coverImage: {
          source: item.coverImageUrl
            ? {uri: item.coverImageUrl}
            : sourceImage(BuildVersion.image.PLACEHOLDER_NEWS_COVER),
          coverSource: item.coverImageUrl
            ? {uri: item.coverImageUrl}
            : sourceImage(BuildVersion.image.PLACEHOLDER_NEWS_SQUARE),
        },
      };
    });
  },
);

export {
  firstNewSelector,
  firstDocumentSelector,
  currentFilterChoiceCountSelector,
  selectedFilterMonthsTempSelector,
  finalDocumentsSelector,
  finalNewsSelector,
  filteredNewsSelector,
  filteredDocumentsSelector,
  latestNewsConvertSelector,
  featuredDocumentsConvertSelector,
};
