import { StyleSheet } from 'react-native';

// config
import R from '@assets/R';
import { getLineHeight, HEIGHT, sizeScale, WIDTH } from '@common';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: WIDTH(20),
    flexDirection: 'row',
    paddingVertical: HEIGHT(12),
    backgroundColor: R.colors.white,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowRadius: WIDTH(20),
    shadowColor: R.colors.colorRgba6310316202,
    elevation: 3,
    shadowOpacity: 0.6,
    alignItems: 'center',
    marginBottom: HEIGHT(14),
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  viewLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    flex: 1,
    width: WIDTH(56),
    height: WIDTH(56),
    borderRadius: WIDTH(56) / 2,
  },
  viewInfor: {
    width: WIDTH(170),
  },
  name: {
    fontSize: sizeScale(18),
    lineHeight: getLineHeight(28),
    color: R.colors.color101426,
    fontWeight: 'bold',
  },
  maSv: {
    fontSize: sizeScale(14),
    lineHeight: getLineHeight(20),
    color: R.colors.color101426,
    marginTop: HEIGHT(3),
  },
  gpa: {
    fontSize: sizeScale(20),
    lineHeight: getLineHeight(30),
    color: R.colors.colorPink,
    fontWeight: 'bold',
  },
  maxGPA: {
    fontSize: sizeScale(17),
    lineHeight: getLineHeight(24),
    color: R.colors.blurColorTitle,
    fontWeight: 'normal',
  },
  viewGPA: {
    alignItems: 'center',
    right: 0,
  },
  viewAva: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: WIDTH(56) / 2,
    width: WIDTH(56),
    height: WIDTH(56),
    overflow: 'hidden',
    marginRight: WIDTH(20),
  },
});

export default styles;
