import {Animated} from 'react-native';

export const forFade = ({current}) => ({
  cardStyle: {
    opacity: current.progress,
  },
});