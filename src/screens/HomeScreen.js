import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { getProperties, deleteProperty } from '../services/propertyService';

const HomeScreen = ({ navigation }) => {
  const [properties, setProperties] = useState([]);

  // Cargar propiedades al inicio
  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    const data = await getProperties();
    setProperties(data);
  };

  const handleDelete = async (id) => {
    const result = await deleteProperty(id);
    if (result.success) {
      Alert.alert("Propiedad eliminada correctamente");
      fetchProperties(); // Actualiza la lista
    } else {
      Alert.alert("Error al eliminar la propiedad");
    }
  };

  const handleEdit = (property) => {
    navigation.navigate('Categorization', { property }); // Envía la propiedad seleccionada
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Propiedades</Text>

      <FlatList
        data={properties}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Tipo: {item.type}</Text>
            <Text>Uso: {item.use}</Text>
            <View style={styles.buttonContainer}>
              <Button title="Editar" onPress={() => handleEdit(item)} />
              <Button title="Eliminar" color="red" onPress={() => handleDelete(item.id)} />
            </View>
          </View>
        )}
      />

      <Button
        title="Agregar Nueva Propiedad"
        onPress={() => navigation.navigate('Categorization')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  item: { marginBottom: 12, padding: 10, borderWidth: 1, borderRadius: 5 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 },
});

export default HomeScreen;
