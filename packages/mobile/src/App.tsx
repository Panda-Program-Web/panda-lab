import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, RefreshControl, Linking } from 'react-native';
import { GameResult } from '@baseball-daily/types';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [data, setData] = useState<GameResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    setError(null);
    try {
      const res = await fetch('http://localhost:8787/api/latest-game');
      if (!res.ok) {
        throw new Error('Failed to fetch');
      }
      const json = await res.json();
      if (json.success) {
        setData(json.data);
      } else {
        setError(json.error);
      }
    } catch (e) {
      setError((e as Error).message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <StatusBar style="auto" />
      <Text style={styles.title}>俺の野球デイリー ⚾</Text>
      {data ? (
        <View style={styles.card}>
          <Text>{data.date} の試合</Text>
          <Text>vs {data.opponent}</Text>
          <Text style={[styles.score, data.result === 'win' ? styles.win : data.result === 'lose' ? styles.lose : styles.draw]}>{data.score}</Text>
          {data.heroUrl && <Button title="ヒーローインタビュー" onPress={() => Linking.openURL(data.heroUrl!)} />}
          {data.managerCommentUrl && <Button title="監督コメント" onPress={() => Linking.openURL(data.managerCommentUrl!)} />}
        </View>
      ) : error ? (
        <View>
          <Text>{error}</Text>
          <Button title="再試行" onPress={fetchData} />
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  card: {
    padding: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    width: '100%',
  },
  score: {
    fontSize: 32,
    marginVertical: 10,
  },
  win: { color: 'blue' },
  lose: { color: 'red' },
  draw: { color: 'gray' },
});
