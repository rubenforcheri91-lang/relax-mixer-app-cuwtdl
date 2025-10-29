
import React from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { useThemeColors } from '@/styles/commonStyles';
import * as Haptics from 'expo-haptics';

interface SoundChannelProps {
  name: string;
  icon: string;
  volume: number;
  onVolumeChange: (volume: number) => void;
  color: string;
  currentLoopIndex: number;
  totalLoops: number;
  onLoopChange: () => void;
}

export default function SoundChannel({ 
  name, 
  icon, 
  volume, 
  onVolumeChange, 
  color,
  currentLoopIndex,
  totalLoops,
  onLoopChange,
}: SoundChannelProps) {
  const colors = useThemeColors();

  const handleLoopChange = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onLoopChange();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={[styles.iconContainer, { backgroundColor: color }]}
          onPress={handleLoopChange}
          activeOpacity={0.7}
        >
          <Text style={styles.icon}>{icon}</Text>
          {totalLoops > 1 && (
            <View style={styles.loopBadge}>
              <Text style={styles.loopBadgeText}>
                {currentLoopIndex + 1}/{totalLoops}
              </Text>
            </View>
          )}
        </TouchableOpacity>
        <View style={styles.nameContainer}>
          <Text style={[styles.name, { color: colors.text }]}>{name}</Text>
          {totalLoops > 1 && (
            <Text style={[styles.loopHint, { color: colors.textSecondary }]}>
              Tocca l&apos;icona per cambiare loop
            </Text>
          )}
        </View>
      </View>
      
      <View style={styles.faderContainer}>
        <View style={styles.volumeIndicator}>
          <Text style={[styles.volumeText, { color: color }]}>
            {Math.round(volume * 100)}%
          </Text>
        </View>
        
        <View style={styles.sliderWrapper}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            value={volume}
            onValueChange={onVolumeChange}
            minimumTrackTintColor={color}
            maximumTrackTintColor={colors.accent}
            thumbTintColor={color}
            step={0.01}
          />
          
          <View style={styles.scaleMarkers}>
            <View style={[styles.marker, { backgroundColor: colors.accent }]} />
            <View style={[styles.marker, { backgroundColor: colors.accent }]} />
            <View style={[styles.marker, { backgroundColor: colors.accent }]} />
            <View style={[styles.marker, { backgroundColor: colors.accent }]} />
            <View style={[styles.marker, { backgroundColor: colors.accent }]} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    position: 'relative',
  },
  icon: {
    fontSize: 28,
  },
  loopBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 32,
    alignItems: 'center',
  },
  loopBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  nameContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  loopHint: {
    fontSize: 11,
    marginTop: 2,
    fontStyle: 'italic',
  },
  faderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  volumeIndicator: {
    width: 60,
    alignItems: 'center',
    marginRight: 12,
  },
  volumeText: {
    fontSize: 16,
    fontWeight: '600',
  },
  sliderWrapper: {
    flex: 1,
    position: 'relative',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  scaleMarkers: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    pointerEvents: 'none',
  },
  marker: {
    width: 2,
    height: 12,
    opacity: 0.3,
  },
});
