## 🚀 **Guía Rápida para Tu App de Pruebas**

### **Paso 1: Crear el Proyecto**
```bash
npx create-expo-app mi-app-bluetooth
cd mi-app-bluetooth
```

### **Paso 2: Instalar Dependencias**
```bash
npx expo install expo-dev-client react-native-ble-plx @config-plugins/react-native-ble-plx
```

### **Paso 3: Configurar Bluetooth en `app.json`**
```json
{
  "expo": {
    "plugins": [
      [
        "@config-plugins/react-native-ble-plx",
        {
          "isBackgroundEnabled": true,
          "modes": ["central"],
          "bluetoothAlwaysPermission": "Permite que la app se conecte a dispositivos Bluetooth"
        }
      ]
    ],
    "android": {
      "permissions": [
        "android.permission.BLUETOOTH",
        "android.permission.BLUETOOTH_ADMIN",
        "android.permission.ACCESS_FINE_LOCATION"
      ]
    }
  }
}
```

### **Paso 4: Crear Tu Primer Build**
```bash
# Instalar EAS CLI
npm install -g eas-cli

# Login (crea cuenta gratis en expo.dev)
eas login

# Configurar proyecto
eas build:configure

# Crear build para Android
eas build --profile development --platform android
```

### **Paso 5: Código de Ejemplo para Probar**

Crea un archivo `App.js` con este código básico:

```javascript
import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { BleManager } from 'react-native-ble-plx';

const manager = new BleManager();

export default function App() {
  const [devices, setDevices] = useState([]);
  const [scanning, setScanning] = useState(false);

  const startScan = () => {
    setScanning(true);
    setDevices([]);
    
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log('Error:', error);
        return;
      }
      
      if (device && device.name) {
        setDevices(prev => {
          const exists = prev.find(d => d.id === device.id);
          return exists ? prev : [...prev, device];
        });
      }
    });
  };

  const stopScan = () => {
    setScanning(false);
    manager.stopDeviceScan();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔍 Scanner Bluetooth</Text>
      
      <View style={styles.buttons}>
        <Button 
          title="Comenzar Escaneo" 
          onPress={startScan} 
          disabled={scanning}
        />
        <Button 
          title="Detener Escaneo" 
          onPress={stopScan} 
          disabled={!scanning}
        />
      </View>

      <Text>Dispositivos encontrados: {devices.length}</Text>
      
      <FlatList
        data={devices}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.device}>
            <Text style={styles.deviceName}>{item.name || 'Desconocido'}</Text>
            <Text style={styles.deviceId}>ID: {item.id}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  device: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  deviceName: {
    fontWeight: 'bold',
  },
  deviceId: {
    fontSize: 12,
    color: '#666',
  }
});
```

## 🎯 **Por Qué Esta Combinación es Ideal para Aprender:**

### **✅ Ventajas:**
- **Desarrollo rápido**: Cambias código y ves resultados al instante
- **Menos configuración**: No necesitas Android Studio/Xcode configurado
- **Hot reload**: Puedes experimentar y ver cambios en tiempo real
- **Gestión automática**: Expo maneja permisos y configuraciones nativas

### **🔄 Flujo de Desarrollo:**
1. Haces un **build inicial** (una vez)
2. Instalas tu **app personalizada** en el teléfono
3. Desarrollas normalmente con `npx expo start --dev-client`
4. Tu app se actualiza en caliente con cada cambio de código

## 📱 **Para Probar:**
- Activa Bluetooth en tu teléfono
- Busca dispositivos como auriculares, parlantes, Arduino, etc.
- Verás nombres y IDs de dispositivos cercanos

## 🔄 **Cuando Quieras Probar Conexiones:**
```javascript
// Ejemplo para conectar a un dispositivo
const connectToDevice = async (deviceId) => {
  try {
    const device = await manager.connectToDevice(deviceId);
    console.log('Conectado:', device.name);
    
    // Aquí puedes descubrir servicios y características
    const services = await device.discoverAllServicesAndCharacteristics();
    console.log('Servicios descubiertos');
    
  } catch (error) {
    console.log('Error conectando:', error);
  }
};
```
