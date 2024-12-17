import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

const HistoryScreen = ({ navigation }) => {
  const dummyData = [
    { id: '1', type: 'Casa', use: 'Residencial' },
    { id: '2', type: 'Terreno', use: 'Comercial' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Categorización</Text>

      <FlatList
        data={dummyData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Tipo: {item.type}</Text>
            <Text>Uso: {item.use}</Text>
          </View>
        )}
      />

      <Button title="Volver al Panel" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  item: { marginBottom: 12, padding: 10, borderWidth: 1, borderRadius: 5 },
});

export default HistoryScreen;
