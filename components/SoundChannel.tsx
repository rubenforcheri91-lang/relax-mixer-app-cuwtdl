
import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Slider from '@react-native-community/slider';
import { colors } from '@/styles/commonStyles';

interface SoundChannelProps {
  name: string;
  icon: string;
  volume: number;
  onVolumeChange: (volume: number) => void;
  color: string;
}

export default function SoundChannel({ name, icon, volume, onVolumeChange, color }: SoundChannelProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: color }]}>
          <Text style={styles.icon}>{icon}</Text>
        </View>
        <Text style={styles.name}>{name}</Text>
      </View>
      
      <View style={styles.faderContainer}>
        <View style={styles.volumeIndicator}>
          <Text style={styles.volumeText}>{Math.round(volume * 100)}%</Text>
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
            <View style={styles.marker} />
            <View style={styles.marker} />
            <View style={styles.marker} />
            <View style={styles.marker} />
            <View style={styles.marker} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
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
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 24,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
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
    color: colors.primary,
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
    backgroundColor: colors.accent,
    opacity: 0.3,
  },
});
