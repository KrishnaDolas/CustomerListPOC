// src/screens/HomeScreen.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { fetchArtists } from '../services/api';

interface Artist {
  uid: number;
  uname: string;
  uemail: string;
  uwhatsappno: string;
  // add other fields as needed
}

const HomeScreen = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getArtists = async () => {
      try {
        const data = await fetchArtists();
        setArtists(data);
      } catch (err) {
        setError('Failed to fetch artists');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getArtists();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={artists}
          keyExtractor={(item) => item.uid.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>Name: {item.uname}</Text>
              <Text style={styles.itemText}>Email: {item.uemail}</Text>
              <Text style={styles.itemText}>WhatsApp: {item.uwhatsappno}</Text>
              {/* Display other fields as needed */}
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
  },
});

export default HomeScreen;
