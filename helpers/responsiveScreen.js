import { Dimensions, Platform, PixelRatio } from "react-native";
const { width, height } = Dimensions.get("window");
const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;

class ResponsiveScreen {
  static wScale = 414;
  static hScale = 852;

  static init(width, height) {
    this.wScale = SCREEN_WIDTH / width;
    this.hScale = SCREEN_HEIGHT / height;
  }

  static normalize = (size, based) => {
    if (ResponsiveScreen.hScale && ResponsiveScreen.wScale) {
      const newSize =
        based === "height"
          ? size * ResponsiveScreen.hScale
          : size * ResponsiveScreen.wScale;
      if (Platform.OS === "ios") {
        return Math.round(PixelRatio.roundToNearestPixel(newSize));
      } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
      }
    }
    return size;
  };

  static fontSize = (size, based) => {
    if (ResponsiveScreen.hScale && ResponsiveScreen.wScale) {
      const newSize =
        based === "height"
          ? size * ResponsiveScreen.hScale
          : size * ResponsiveScreen.wScale;
      return Math.round(PixelRatio.roundToNearestPixel(newSize));
    }
    return size;
  };
}

export default ResponsiveScreen;
