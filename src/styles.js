import { StatusBar, Platform } from "react-native";

export const setStatusBarStyle = () => {
  // Status bar for all screens.
  StatusBar.setBarStyle("light-content");
  
  if (Platform.OS === "android") StatusBar.setBackgroundColor(STATUS_BAR_BACKGROUND_COLOR);
};

// DIMENSIONS
// Text sizes.
export const TEXT_SIZE_SMALL = 10;
export const TEXT_SIZE_NORMAL = 14;
export const TEXT_SIZE_LARGE = 16;

// Image sizes.
export const DEFAULT_ARTICLE_IMAGE_HEIGHT = 200;
export const DEFAULT_HEADER_BUTTON_ICON_SIZE = 24;


// COLORS

// Text colors.
export const TEXT_COLOR_PRIMARY = "#0F0F0F";
export const TEXT_COLOR_SECONDARY = "#808080";

export const BOOKMARK_COLOR = "#B10000";

// Background colors.
export const CARDVIEW_BACKGROUND_COLOR = "#FFFFFF";
export const HEADER_BACKGROUND_COLOR = "#222222";
export const STATUS_BAR_BACKGROUND_COLOR = "#111111"; // Used in android.
export const HEADER_BUTTON_ICON_COLOR = "#FFFFFF";
