import Snackbar from 'react-native-snackbar';

export const snackbar = (text, action) => {
  Snackbar.show({
    text: text,
    duration: Snackbar.LENGTH_SHORT,
    action: action,
  });
};
