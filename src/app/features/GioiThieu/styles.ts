import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getWidth, HEIGHT, WIDTH } from '@common';
// import { getFont, WIDTH, HEIGHT, getWidth, getHeight } from '../../config/Function';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cntText: {
    flex: 0,
    padding: WIDTH(16),
    width: getWidth(),
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  cntBonus: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cntHTML: {
    flex: 0,
    paddingHorizontal: WIDTH(15),
  },
  line: {
    height: HEIGHT(10),
  },
  cntImage: {
    width: getWidth() * 0.85,
  },
  textTitle: {
    color: R.colors.colorRed,
    fontSize: getFontSize(28),
    fontFamily: 'Roboto-Regular',
    // textAlign: "center",
    fontWeight: 'bold',
    // textAlignVertical: "center",
    marginBottom: 10,
  },
  text: {
    color: R.colors.colorBlack,
    fontSize: getFontSize(18),
    fontFamily: 'Roboto-Regular',
    letterSpacing: 0.6,
    // textAlign: "center",
    // textAlignVertical: "center"
  },
  textBold: {
    color: R.colors.colorBlack,
    fontSize: getFontSize(18),
    fontFamily: 'Roboto-Regular',
    letterSpacing: 0.6,
    // textAlign: "center",
    // textAlignVertical: "center",
    fontWeight: 'bold',
  },
  textTime: {
    color: R.colors.grey,
    fontSize: getFontSize(14),
    fontFamily: 'Roboto-Regular',
    fontStyle: 'italic',
  },
  textAuthor: {
    color: R.colors.colorWhite,
    fontSize: getFontSize(14),
    fontFamily: 'Roboto-Regular',
    padding: 3,
    backgroundColor: R.colors.blueNew,
    borderRadius: 2,
    marginRight: 3,
  },
  cntNote: {
    flexDirection: 'row',
    flex: 0,
    marginBottom: 10,
    // justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
