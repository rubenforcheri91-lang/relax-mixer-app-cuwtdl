
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Platform } from 'react-native';
import { Stack } from 'expo-router';
import { useAudioPlayer } from 'expo-audio';
import { IconSymbol } from '@/components/IconSymbol';
import SoundChannel from '@/components/SoundChannel';
import { colors } from '@/styles/commonStyles';
import { RELAXATION_SOUNDS } from '@/types/sounds';

export default function HomeScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volumes, setVolumes] = useState<{ [key: string]: number }>({
    rain: 0.5,
    ocean: 0.5,
    fire: 0.5,
    wind: 0.5,
    waterfall: 0.5,
  });

  // Create audio players for each sound
  const players = {
    rain: useAudioPlayer(RELAXATION_SOUNDS[0].url, { updateInterval: 100 }),
    ocean: useAudioPlayer(RELAXATION_SOUNDS[1].url, { updateInterval: 100 }),
    fire: useAudioPlayer(RELAXATION_SOUNDS[2].url, { updateInterval: 100 }),
    wind: useAudioPlayer(RELAXATION_SOUNDS[3].url, { updateInterval: 100 }),
    waterfall: useAudioPlayer(RELAXATION_SOUNDS[4].url, { updateInterval: 100 }),
  };

  // Set initial volumes and loop
  useEffect(() => {
    Object.keys(players).forEach((key) => {
      const player = players[key as keyof typeof players];
      player.loop = true;
      player.volume = volumes[key];
    });
  }, []);

  // Update volumes when changed
  useEffect(() => {
    Object.keys(players).forEach((key) => {
      const player = players[key as keyof typeof players];
      player.volume = volumes[key];
    });
  }, [volumes]);

  const handleVolumeChange = (soundId: string, volume: number) => {
    setVolumes((prev) => ({
      ...prev,
      [soundId]: volume,
    }));
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      // Pause all players
      Object.values(players).forEach((player) => {
        player.pause();
      });
      setIsPlaying(false);
    } else {
      // Play all players
      Object.values(players).forEach((player) => {
        player.play();
      });
      setIsPlaying(true);
    }
  };

  const resetAllVolumes = () => {
    const resetVolumes: { [key: string]: number } = {};
    Object.keys(volumes).forEach((key) => {
      resetVolumes[key] = 0.5;
    });
    setVolumes(resetVolumes);
  };

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: 'Mixer Rilassamento',
            headerStyle: {
              backgroundColor: colors.primary,
            },
            headerTintColor: '#FFFFFF',
          }}
        />
      )}
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Mixer Rilassamento</Text>
            <Text style={styles.subtitle}>
              Regola i fader per creare la tua atmosfera perfetta
            </Text>
          </View>

          <View style={styles.channelsContainer}>
            {RELAXATION_SOUNDS.map((sound) => (
              <SoundChannel
                key={sound.id}
                name={sound.name}
                icon={sound.icon}
                volume={volumes[sound.id]}
                onVolumeChange={(volume) => handleVolumeChange(sound.id, volume)}
                color={sound.color}
              />
            ))}
          </View>

          <View style={styles.controlsContainer}>
            <Pressable
              style={[styles.playButton, isPlaying && styles.playButtonActive]}
              onPress={togglePlayPause}
            >
              <IconSymbol
                name={isPlaying ? 'pause.fill' : 'play.fill'}
                size={32}
                color="#FFFFFF"
              />
              <Text style={styles.playButtonText}>
                {isPlaying ? 'Pausa' : 'Riproduci'}
              </Text>
            </Pressable>

            <Pressable style={styles.resetButton} onPress={resetAllVolumes}>
              <IconSymbol name="arrow.counterclockwise" size={24} color={colors.primary} />
              <Text style={styles.resetButtonText}>Reset</Text>
            </Pressable>
          </View>

          <View style={styles.infoCard}>
            <IconSymbol name="info.circle.fill" size={24} color={colors.primary} />
            <Text style={styles.infoText}>
              Combina i suoni per creare la tua esperienza di rilassamento personalizzata.
              Ogni canale può essere regolato indipendentemente.
            </Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: Platform.OS === 'android' ? 100 : 16,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  channelsContainer: {
    marginBottom: 24,
  },
  controlsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  playButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    boxShadow: '0px 4px 12px rgba(63, 81, 181, 0.3)',
    elevation: 4,
  },
  playButtonActive: {
    backgroundColor: colors.secondary,
  },
  playButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  resetButton: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    minWidth: 100,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  resetButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: colors.highlight,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
});
