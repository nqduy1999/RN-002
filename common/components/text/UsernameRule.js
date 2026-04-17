import React from 'react';
import { StyleSheet, Linking } from 'react-native';
import { TEXT_GRAY_COLOR, TEXT_DARK_COLOR, ORANGE_COLOR } from '@resources/palette';
import {
	SVG_ARROW_RIGHT
} from '@resources/images';
import TransparentButton from '@common/components/button/TransparentButton';
import BuildVersion from '@resources/build_version/BuildVersion';
const setting = BuildVersion.setting;
import {
	TITLE_LEARN_MORE_ABOUT_USERNAME_RULE,
	MODAL_DESCRIPTION_HIGHLIGHT_USERNAME,
	MODAL_DESCRIPTION_USERNAME
} from '@resources/string/strings';
import { renderText } from '@common/components/StringHelper';
import HighlightTextContent from '@common/components/text/HighlightTextContent';
const UsernameRule = () => {
  const commonUsernameRule= <HighlightTextContent
  style={styles.usernameDescription}
  size="little-smaller"
  searchWords={[renderText(MODAL_DESCRIPTION_HIGHLIGHT_USERNAME)]}
  highlightStyle={styles.usernameDescriptionHighlight}
  textToHighlight={renderText(MODAL_DESCRIPTION_USERNAME)}
/>;
	let usernameRules = {
    generic: commonUsernameRule,
    dhl: commonUsernameRule,
    athena: commonUsernameRule,
    aia: (
      <TransparentButton
        text={TITLE_LEARN_MORE_ABOUT_USERNAME_RULE}
        onPress={() => {
          Linking.openURL(
            'https://aiahr.service-now.com/hrportal?id=hr_kb_article&sys_id=afb931fe0fb198147da805ace1050e37',
          ).catch(err => console.error("Couldn't load page", err));
        }}
        style={styles.usernameRuleButton}
        textStyle={styles.usernameRuleText}
        textSize="little-smaller"
        textWeight="normal"
        icon={{
          source: SVG_ARROW_RIGHT,
          stroke: true,
          color: ORANGE_COLOR,
          size: 16,
        }}
      />
    ),
    pepsi: commonUsernameRule,
    nestle: commonUsernameRule,
  };
	return (
		usernameRules[setting.version]
	)
}
const styles = StyleSheet.create({
	usernameRuleButton: {
		alignItems: 'flex-start',
		marginBottom: -20,
	},
	usernameRuleText: {
		color: ORANGE_COLOR,
	},

	usernameDescription: {
		marginTop: 12,
		color: TEXT_GRAY_COLOR,
		textAlign: 'center',
	},
	usernameDescriptionHighlight: {
		color: TEXT_DARK_COLOR,
	}

});
export default UsernameRule;