import { useState, useEffect } from 'react';
import { Button, Text, SafeAreaView, ScrollView, StyleSheet, Image, View, Platform } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

export function AlbumEntry({ album }) {
    const [assets, setAssets] = useState([]);
  
    useEffect(() => {
      async function getAlbumAssets() {
        const albumAssets = await MediaLibrary.getAssetsAsync({ album });
        setAssets(albumAssets.assets);
      }
      getAlbumAssets();
    }, [album]);
  
    return (
      <View key={album.id} style={styles.albumContainer}>
        <Text>
          {album.title} - {album.assetCount ?? 'no'} assets
        </Text>
        <View style={styles.albumAssetsContainer}>
          {assets && assets.map((asset) => (
            <Image source={{ uri: asset.uri }} width={50} height={50} />
          ))}
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      gap: 8,
      justifyContent: 'center',
      ...Platform.select({
        android: {
          paddingTop: 40,
        },
      }),
    },
    albumContainer: {
      paddingHorizontal: 20,
      marginBottom: 12,
      gap: 4,
    },
    albumAssetsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  });