
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { addProperty, updateProperty } from '../services/propertyService';
import { Picker } from '@react-native-picker/picker';

const CategorizationScreen = ({ route, navigation }) => {
  const [propertyType, setPropertyType] = useState('Casa');
  const [propertyUse, setPropertyUse] = useState('Residencial');
  const [propertyId, setPropertyId] = useState(null);

  useEffect(() => {
    if (route.params?.property) {
      const { id, type, use } = route.params.property;
      setPropertyId(id); // Guardar el ID para actualización
      setPropertyType(type);
      setPropertyUse(use);
    }
  }, [route.params]);

  const handleSave = async () => {
    const property = { type: propertyType, use: propertyUse };

    let result;
    if (propertyId) {
      result = await updateProperty(propertyId, property); // Actualiza la propiedad existente
    } else {
      result = await addProperty(property); // Agrega nueva propiedad
    }

    if (result.success) {
      Alert.alert(propertyId ? "Propiedad actualizada" : "Propiedad guardada");
      navigation.navigate('Home'); // Volver al Panel Principal
    } else {
      Alert.alert("Error al guardar la propiedad.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categorización de Propiedad</Text>

      <Text>Tipo de Inmueble:</Text>
      <Picker selectedValue={propertyType} onValueChange={setPropertyType}>
        <Picker.Item label="Casa" value="Casa" />
        <Picker.Item label="Departamento" value="Departamento" />
        <Picker.Item label="Terreno" value="Terreno" />
      </Picker>

      <Text>Uso:</Text>
      <Picker selectedValue={propertyUse} onValueChange={setPropertyUse}>
        <Picker.Item label="Residencial" value="Residencial" />
        <Picker.Item label="Comercial" value="Comercial" />
        <Picker.Item label="Industrial" value="Industrial" />
      </Picker>

      <Button title={propertyId ? "Actualizar Propiedad" : "Guardar Propiedad"} onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
});

export default CategorizationScreen;
