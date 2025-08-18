# ***

    import { useState } from "react";
    import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    } from "react-native";

    export default function LedControl() {
    const [loading, setLoading] = useState(false);
    const [estado, setEstado] = useState(null);

    // Cambia esta IP por la de tu servidor Debian
    const API_URL = "http://192.168.0.200/mqtt";

    const encenderLed = async () => {
        setLoading(true);
        try {
        const res = await fetch(`${API_URL}/arduino/led/on`, { method: "GET" });
        const data = await res.json();
        setEstado("Encendido");
        } catch (err) {
        console.error("Error encendiendo LED:", err);
        } finally {
        setLoading(false);
        }
    };

    const apagarLed = async () => {
        setLoading(true);
        try {
        const res = await fetch(`${API_URL}/arduino/led/off`, { method: "GET" });
        const data = await res.json();
        setEstado("Apagado");
        } catch (err) {
        console.error("Error apagando LED:", err);
        } finally {
        setLoading(false);
        }
    };

    return (
        <>
        <Text style={styles.title}>Control de LED</Text>

        {loading ? (
            <ActivityIndicator size="large" color="#000" />
        ) : (
            <>
            <TouchableOpacity
                style={[styles.button, styles.on]}
                onPress={encenderLed}
            >
                <Text style={styles.buttonText}>Encender LED</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, styles.off]}
                onPress={apagarLed}
            >
                <Text style={styles.buttonText}>Apagar LED</Text>
            </TouchableOpacity>

            {estado && <Text style={styles.status}>Estado: {estado}</Text>}
            </>
        )}
        </>
    );
    }

    const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    button: {
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginVertical: 10,
    },
    on: {
        backgroundColor: "#4CAF50",
    },
    off: {
        backgroundColor: "#F44336",
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
    },
    status: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: "500",
    },
    });