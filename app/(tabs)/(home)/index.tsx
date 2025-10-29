
import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Platform } from 'react-native';
import { Stack } from 'expo-router';
import { useAudioPlayer, setAudioModeAsync } from 'expo-audio';
import { IconSymbol } from '@/components/IconSymbol';
import SoundChannel from '@/components/SoundChannel';
import { useThemeColors } from '@/styles/commonStyles';
import { RELAXATION_SOUNDS } from '@/types/sounds';
import * as Haptics from 'expo-haptics';

export default function HomeScreen() {
  const colors = useThemeColors();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volumes, setVolumes] = useState<{ [key: string]: number }>({});
  const [currentLoopIndices, setCurrentLoopIndices] = useState<{ [key: string]: number }>({});

  // Create audio players at the top level using hooks
  const player1 = useAudioPlayer(RELAXATION_SOUNDS[0]?.urls[currentLoopIndices[RELAXATION_SOUNDS[0]?.id] || 0] || '', { updateInterval: 100 });
  const player2 = useAudioPlayer(RELAXATION_SOUNDS[1]?.urls[currentLoopIndices[RELAXATION_SOUNDS[1]?.id] || 0] || '', { updateInterval: 100 });
  const player3 = useAudioPlayer(RELAXATION_SOUNDS[2]?.urls[currentLoopIndices[RELAXATION_SOUNDS[2]?.id] || 0] || '', { updateInterval: 100 });
  const player4 = useAudioPlayer(RELAXATION_SOUNDS[3]?.urls[currentLoopIndices[RELAXATION_SOUNDS[3]?.id] || 0] || '', { updateInterval: 100 });
  const player5 = useAudioPlayer(RELAXATION_SOUNDS[4]?.urls[currentLoopIndices[RELAXATION_SOUNDS[4]?.id] || 0] || '', { updateInterval: 100 });
  const player6 = useAudioPlayer(RELAXATION_SOUNDS[5]?.urls[currentLoopIndices[RELAXATION_SOUNDS[5]?.id] || 0] || '', { updateInterval: 100 });
  const player7 = useAudioPlayer(RELAXATION_SOUNDS[6]?.urls[currentLoopIndices[RELAXATION_SOUNDS[6]?.id] || 0] || '', { updateInterval: 100 });

  // Map players to sound IDs
  const players = useMemo(() => {
    const playerMap: { [key: string]: any } = {};
    const playerList = [player1, player2, player3, player4, player5, player6, player7];
    
    RELAXATION_SOUNDS.forEach((sound, index) => {
      if (playerList[index]) {
        playerMap[sound.id] = playerList[index];
      }
    });
    
    return playerMap;
  }, [player1, player2, player3, player4, player5, player6, player7]);

  // Initialize volumes and loop indices
  useEffect(() => {
    const initialVolumes: { [key: string]: number } = {};
    const initialLoopIndices: { [key: string]: number } = {};
    
    RELAXATION_SOUNDS.forEach((sound) => {
      initialVolumes[sound.id] = 0.5;
      initialLoopIndices[sound.id] = 0;
    });
    
    setVolumes(initialVolumes);
    setCurrentLoopIndices(initialLoopIndices);
  }, []);

  // Configure audio mode for background playback
  useEffect(() => {
    const configureAudio = async () => {
      try {
        await setAudioModeAsync({
          playsInSilentMode: true,
          shouldPlayInBackground: true,
          staysActiveInBackground: true,
        });
        console.log('Audio mode configured for background playback');
      } catch (error) {
        console.error('Error configuring audio mode:', error);
      }
    };
    
    configureAudio();
  }, []);

  // Set loop property for all players
  useEffect(() => {
    Object.values(players).forEach((player) => {
      if (player) {
        player.loop = true;
      }
    });
  }, [players]);

  // Update volumes when changed
  useEffect(() => {
    Object.keys(players).forEach((key) => {
      const player = players[key];
      if (player) {
        player.volume = volumes[key] || 0;
      }
    });
  }, [volumes, players]);

  const handleVolumeChange = (soundId: string, volume: number) => {
    setVolumes((prev) => ({
      ...prev,
      [soundId]: volume,
    }));
  };

  const handleLoopChange = (soundId: string) => {
    const sound = RELAXATION_SOUNDS.find(s => s.id === soundId);
    if (!sound) return;

    const currentIndex = currentLoopIndices[soundId] || 0;
    const nextIndex = (currentIndex + 1) % sound.urls.length;
    
    const wasPlaying = isPlaying;
    
    // Pause the specific player before changing loop
    if (players[soundId]) {
      players[soundId].pause();
    }
    
    setCurrentLoopIndices((prev) => ({
      ...prev,
      [soundId]: nextIndex,
    }));

    // Resume playing after a short delay if it was playing
    if (wasPlaying) {
      setTimeout(() => {
        if (players[soundId]) {
          players[soundId].play();
        }
      }, 200);
    }

    console.log(`Changed loop for ${soundId} to index ${nextIndex}`);
  };

  const togglePlayPause = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    if (isPlaying) {
      // Pause all players
      Object.values(players).forEach((player) => {
        if (player) {
          player.pause();
        }
      });
      setIsPlaying(false);
      console.log('Paused all sounds');
    } else {
      // Play all players
      Object.values(players).forEach((player) => {
        if (player) {
          player.play();
        }
      });
      setIsPlaying(true);
      console.log('Playing all sounds');
    }
  };

  const resetAllVolumes = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    const resetVolumes: { [key: string]: number } = {};
    Object.keys(volumes).forEach((key) => {
      resetVolumes[key] = 0.5;
    });
    setVolumes(resetVolumes);
    console.log('Reset all volumes to 50%');
  };

  const styles = createStyles(colors);

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
                volume={volumes[sound.id] || 0.5}
                onVolumeChange={(volume) => handleVolumeChange(sound.id, volume)}
                color={sound.color}
                currentLoopIndex={currentLoopIndices[sound.id] || 0}
                totalLoops={sound.urls.length}
                onLoopChange={() => handleLoopChange(sound.id)}
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
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoText}>
                Combina i suoni per creare la tua esperienza di rilassamento personalizzata.
              </Text>
              <Text style={styles.infoText}>
                • Tocca le icone per cambiare i loop dei suoni
              </Text>
              <Text style={styles.infoText}>
                • L&apos;audio continua in background e con schermo bloccato
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
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
  infoTextContainer: {
    flex: 1,
  },
  infoText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 4,
  },
});
