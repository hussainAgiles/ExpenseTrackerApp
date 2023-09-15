import {Platform} from 'react-native';

const type = {
  base: Platform.OS === 'ios' ? 'EduSABeginner-Regular' : 'EduSABeginner-Regular',
  medium: Platform.OS === 'ios' ? 'EduSABeginner-Medium' : 'EduSABeginner-Medium',
  semiBold:
    Platform.OS === 'ios' ? 'EduSABeginner-Semibold' : 'EduSABeginner-Semibold',
  bold: Platform.OS === 'ios' ? 'EduSABeginner-Bold' : 'EduSABeginner-Bold',
};

const size = {
  h1: 38,
  h2: 34,
  h3: 30,
  h4: 26,
  h5: 20,
  h6: 19,
  input: 18,
  regular: 17,
  mediumPlus: 15,
  medium: 14,
  small: 12,
  tiny: 8.5,
};

const fontWeight600 = {
  ...Platform.select({
    ios: {
      fontWeight: '600',
      fontFamily: type.base,
    },
    android: {
      fontFamily: type.bold,
    },
  }),
};

const style = {
  h1: {
    fontFamily: type.base,
    fontSize: size.h1,
  },
  h2: {
    fontWeight: 'bold',
    fontSize: size.h2,
  },
  h3: {
    fontFamily: type.emphasis,
    fontSize: size.h3,
  },
  h4: {
    fontFamily: type.base,
    fontSize: size.h4,
  },
  h5: {
    fontFamily: type.base,
    fontSize: size.h5,
  },
  h6: {
    fontFamily: type.emphasis,
    fontSize: size.h6,
  },
  normal: {
    fontFamily: type.base,
    fontSize: size.regular,
  },
  input: {
    fontFamily: type.base,
    fontSize: size.input,
  },
  description: {
    fontFamily: type.base,
    fontSize: size.medium,
  },
  description600: {
    ...fontWeight600,
    fontSize: size.medium,
  },
  mediumPlus: {
    fontFamily: type.base,
    fontSize: size.mediumPlus,
  },
  h5Bold: {
    ...fontWeight600,
    fontSize: size.h5,
  },
  mediumBold: {
    ...fontWeight600,
    fontSize: size.mediumPlus,
  },
};

export default {
  type,
  size,
  style,
};
