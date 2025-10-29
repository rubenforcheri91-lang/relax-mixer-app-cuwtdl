
import { StyleSheet, ViewStyle, TextStyle, useColorScheme } from 'react-native';

// Light mode colors
export const lightColors = {
  background: '#F0F4F8',
  text: '#212121',
  textSecondary: '#757575',
  primary: '#3F51B5',
  secondary: '#7986CB',
  accent: '#9FA8DA',
  card: '#FFFFFF',
  highlight: '#E8EAF6',
  border: '#E0E0E0',
};

// Dark mode colors
export const darkColors = {
  background: '#121212',
  text: '#FFFFFF',
  textSecondary: '#B0B0B0',
  primary: '#7986CB',
  secondary: '#5C6BC0',
  accent: '#3F51B5',
  card: '#1E1E1E',
  highlight: '#2C2C2C',
  border: '#333333',
};

// Default to light colors for backwards compatibility
export const colors = lightColors;

// Hook to get colors based on color scheme
export const useThemeColors = () => {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? darkColors : lightColors;
};

export const buttonStyles = StyleSheet.create({
  instructionsButton: {
    backgroundColor: lightColors.primary,
    alignSelf: 'center',
    width: '100%',
  },
  backButton: {
    backgroundColor: lightColors.secondary,
    alignSelf: 'center',
    width: '100%',
  },
});

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: lightColors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: lightColors.background,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 800,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    color: lightColors.text,
    marginBottom: 10
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: lightColors.text,
    marginBottom: 8,
    lineHeight: 24,
    textAlign: 'center',
  },
  section: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: lightColors.card,
    borderColor: lightColors.accent,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    width: '100%',
    boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  icon: {
    width: 60,
    height: 60,
    tintColor: lightColors.primary,
  },
});
