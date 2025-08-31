# Some code

    // import { StatusBar } from 'expo-status-bar';
    // import { StyleSheet, Text, View } from 'react-native';

    // export default function App() {
    //   return (
    //     <View style={styles.container}>
    //       <Text>Open up App.js to start working on your app!</Text>
    //       <StatusBar style="auto" />
    //     </View>
    //   );
    // }

    // const styles = StyleSheet.create({
    //   container: {
    //     flex: 1,
    //     backgroundColor: '#fff',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //   },
    // });

    import { useState, useEffect, useRef } from "react";
    import { SafeAreaView, View, Text, Pressable, StyleSheet } from "react-native";
    import mqtt from "mqtt"; // Asegúrate de instalar mqtt con npm install mqtt

    const FIXED_CODE = "1234"; // Código correcto
    const MQTT_BROKER = "http://192.168.0.100:9001"; // tu broker con WebSocket habilitado
    const TOPIC = "dispositivo/estado";

    export default function App() {
    const [input, setInput] = useState("");
    const [status, setStatus] = useState("Esperando código...");

    // Mantener cliente MQTT en ref
    const clientRef = useRef(null);

    useEffect(() => {
        const client = mqtt.connect(MQTT_BROKER, {
        reconnectPeriod: 5000, // intenta cada 5 segundos
        });

        client.on("connect", () => {
        console.log("✅ Conectado a MQTT");
        setStatus("Conectado. Ingresa código.");
        });

        client.on("error", (err) => {
        console.error("❌ No se pudo conectar al broker:", err.message);
        setStatus("Error: no se encuentra el servidor MQTT");
        // client.end(); // OJO: si lo cerrás acá, nunca reintenta
        });

        client.on("offline", () => {
        console.warn("⚠️ Cliente en estado offline, esperando reconexión...");
        setStatus("Desconectado. Intentando reconectar...");
        });

        console.log("Conectando a MQTT en:", MQTT_BROKER);

        //Guarda el cliente en un ref de React para poder usarlo en otras funciones (ej: publicar mensajes cuando el usuario ingresa el código).
        clientRef.current = client;

        //Cuando el componente se desmonta, se cierra la conexión (client.end()).
        return () => client.end();
    }, []);

    function onKeyPress(k) {
        if (k === "del") {
        setInput((v) => v.slice(0, -1));
        } else if (k === "ok") {
        checkCode();
        } else {
        setInput((v) => (v.length >= FIXED_CODE.length ? v : v + k));
        }
    }

    function checkCode() {
        if (input === FIXED_CODE) {
        setStatus("Código correcto. Enviando ON...");
        clientRef.current?.publish(TOPIC, "on");
        setInput("");
        } else {
        setStatus("Código incorrecto.");
        setInput("");
        }
    }

    return (
        <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
            <Text style={styles.title}>Teclado</Text>
            <View style={styles.codeBox}>
            {Array.from({ length: FIXED_CODE.length }).map((_, i) => (
                <View key={i} style={styles.slot}>
                <Text style={styles.slotText}>{input[i] ?? "•"}</Text>
                </View>
            ))}
            </View>
            <Text style={styles.status}>{status}</Text>
            <Numpad onPress={onKeyPress} />
        </View>
        </SafeAreaView>
    );
    }

    function Numpad({ onPress }) {
    const keys = [
        ["1", "2", "3"],
        ["4", "5", "6"],
        ["7", "8", "9"],
        ["del", "0", "ok"],
    ];
    return (
        <View style={styles.numpad}>
        {keys.map((row, i) => (
            <View key={i} style={styles.numpadRow}>
            {row.map((k) => (
                <Pressable
                key={k}
                onPress={() => onPress(k)}
                style={({ pressed }) => [styles.key, pressed && { opacity: 0.7 }]}
                >
                <Text style={styles.keyText}>
                    {k === "del" ? "⌫" : k === "ok" ? "OK" : k}
                </Text>
                </Pressable>
            ))}
            </View>
        ))}
        </View>
    );
    }

    const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: "#0B1220" },
    container: {
        flex: 1,
        padding: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    title: { color: "white", fontSize: 24, fontWeight: "800", marginBottom: 20 },
    codeBox: { flexDirection: "row", gap: 12, marginBottom: 16 },
    slot: {
        width: 56,
        height: 64,
        borderRadius: 12,
        backgroundColor: "#111827",
        borderWidth: 2,
        borderColor: "#1F2937",
        alignItems: "center",
        justifyContent: "center",
    },
    slotText: { color: "white", fontSize: 28, fontWeight: "700" },
    numpad: { gap: 12 },
    numpadRow: { flexDirection: "row", gap: 12, justifyContent: "center" },
    key: {
        width: 80,
        height: 60,
        borderRadius: 12,
        backgroundColor: "#1F2937",
        alignItems: "center",
        justifyContent: "center",
    },
    keyText: { color: "white", fontSize: 20, fontWeight: "800" },
    status: { color: "#9CA3AF", marginTop: 16, fontSize: 16 },
    });



---


        import { StatusBar } from "expo-status-bar";
        import React, { useMemo, useRef, useState, useEffect } from "react";
        import {
        SafeAreaView,
        View,
        Text,
        Pressable,
        TextInput,
        FlatList,
        Animated,
        Easing,
        StyleSheet,
        Platform,
        } from "react-native";

        // Optional haptics (Expo). If not available, it won't crash.
        let Haptics = null;
        try {
        Haptics = require("expo-haptics");
        } catch (_) {
        // no-op
        }

        function randomCode(len = 4) {
        let code = "";
        for (let i = 0; i < len; i++) {
            code += Math.floor(Math.random() * 10);
        }
        return code; // allows repeated digits, like real keypads
        }
        const DIGITS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

        function evaluateGuess(secret, guess) {
        // Bulls & Cows style: bulls = right digit, right place. cows = right digit, wrong place.
        let bulls = 0,
            cows = 0;
        const secretCounts = Array(10).fill(0);
        const guessCounts = Array(10).fill(0);

        for (let i = 0; i < secret.length; i++) {
            if (guess[i] === secret[i]) bulls++;
            else {
            secretCounts[Number(secret[i])]++;
            guessCounts[Number(guess[i])]++;
            }
        }
        for (let d = 0; d < 10; d++)
            cows += Math.min(secretCounts[d], guessCounts[d]);
        return { bulls, cows };
        }

        export default function App() {
        const CODE_LEN = 4;
        const MAX_ATTEMPTS = 10;

        const [secret, setSecret] = useState(() => randomCode(CODE_LEN));
        const [input, setInput] = useState("");
        const [attemptsLeft, setAttemptsLeft] = useState(MAX_ATTEMPTS);
        const [history, setHistory] = useState([]); // { guess, bulls, cows }
        const [status, setStatus] = useState("playing"); // playing | win | lose
        const [seconds, setSeconds] = useState(0);

        const shake = useRef(new Animated.Value(0)).current;
        const pulse = useRef(new Animated.Value(1)).current;

        useEffect(() => {
            const id = setInterval(() => setSeconds((s) => s + 1), 1000);
            return () => clearInterval(id);
        }, []);

        useEffect(() => {
            if (status !== "playing") return;
            const loop = Animated.loop(
            Animated.sequence([
                Animated.timing(pulse, {
                toValue: 1.05,
                duration: 700,
                useNativeDriver: true,
                easing: Easing.inOut(Easing.ease),
                }),
                Animated.timing(pulse, {
                toValue: 1,
                duration: 700,
                useNativeDriver: true,
                easing: Easing.inOut(Easing.ease),
                }),
            ])
            );
            loop.start();
            return () => loop.stop();
        }, [status]);

        const formattedTime = useMemo(() => {
            const m = Math.floor(seconds / 60)
            .toString()
            .padStart(2, "0");
            const s = (seconds % 60).toString().padStart(2, "0");
            return `${m}:${s}`;
        }, [seconds]);

        function onKeyPress(d) {
            if (status !== "playing") return;
            if (Haptics) Haptics.selectionAsync();
            if (d === "del") {
            setInput((v) => v.slice(0, -1));
            return;
            }
            if (d === "ok") {
            onSubmit();
            return;
            }
            setInput((v) => (v.length >= CODE_LEN ? v : v + d));
        }

        function triggerShake() {
            if (Platform.OS !== "web") {
            try {
                Vibration.vibrate(40);
            } catch (_) {}
            }
            Animated.sequence([
            Animated.timing(shake, {
                toValue: 8,
                duration: 60,
                useNativeDriver: true,
            }),
            Animated.timing(shake, {
                toValue: -8,
                duration: 60,
                useNativeDriver: true,
            }),
            Animated.timing(shake, {
                toValue: 6,
                duration: 60,
                useNativeDriver: true,
            }),
            Animated.timing(shake, {
                toValue: -6,
                duration: 60,
                useNativeDriver: true,
            }),
            Animated.timing(shake, {
                toValue: 0,
                duration: 60,
                useNativeDriver: true,
            }),
            ]).start();
        }

        function onSubmit() {
            if (status !== "playing" || input.length !== CODE_LEN) {
            triggerShake();
            return;
            }
            const result = evaluateGuess(secret, input);
            const next = [{ guess: input, ...result }, ...history];
            setHistory(next);

            if (result.bulls === CODE_LEN) {
            setStatus("win");
            if (Haptics)
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            return;
            }

            const remaining = attemptsLeft - 1;
            setAttemptsLeft(remaining);
            setInput("");

            if (remaining <= 0) {
            setStatus("lose");
            if (Haptics)
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            } else {
            triggerShake();
            if (Haptics) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            }
        }

        function newGame() {
            setSecret(randomCode(CODE_LEN));
            setInput("");
            setAttemptsLeft(MAX_ATTEMPTS);
            setHistory([]);
            setStatus("playing");
            setSeconds(0);
        }

        const headerText =
            status === "playing"
            ? `Destraba el código`
            : status === "win"
            ? "¡Código desbloqueado!"
            : "Sin intentos: código bloqueado";

        return (
            <SafeAreaView style={styles.safe}>
            <View style={styles.container}>
                <Text style={styles.title}>{headerText}</Text>

                <View style={styles.rowJustify}>
                <Badge label={`Intentos: ${attemptsLeft}`} />
                <Badge label={`Tiempo: ${formattedTime}`} />
                <Badge label={`Longitud: ${CODE_LEN}`} />
                </View>

                <Animated.View
                style={[
                    styles.codeBox,
                    { transform: [{ translateX: shake }, { scale: pulse }] },
                ]}
                >
                {Array.from({ length: CODE_LEN }).map((_, i) => (
                    <View key={i} style={[styles.slot, input[i] && styles.slotFilled]}>
                    <Text style={styles.slotText}>{input[i] ?? "•"}</Text>
                    </View>
                ))}
                </Animated.View>

                <View style={{ height: 12 }} />

                <Numpad onPress={onKeyPress} disabled={status !== "playing"} />

                <View style={{ height: 16 }} />

                <HistoryList data={history} codeLen={CODE_LEN} />

                {status !== "playing" && (
                <Pressable
                    onPress={newGame}
                    style={({ pressed }) => [
                    styles.primaryBtn,
                    pressed && { opacity: 0.85 },
                    ]}
                >
                    <Text style={styles.primaryBtnText}>Nuevo juego</Text>
                </Pressable>
                )}

                <View style={styles.footer}>
                <Text style={styles.footerText}>
                    Pista: Bulls = cifra correcta en lugar correcto. Cows = cifra
                    correcta en lugar incorrecto.
                </Text>
                </View>
            </View>
            </SafeAreaView>
        );
        }

        function Badge({ label }) {
        return (
            <View style={styles.badge}>
            <Text style={styles.badgeText}>{label}</Text>
            </View>
        );
        }

        function Numpad({ onPress, disabled }) {
        const keys = [
            ["1", "2", "3"],
            ["4", "5", "6"],
            ["7", "8", "9"],
            ["del", "0", "ok"],
        ];
        return (
            <View style={styles.numpad}>
            {keys.map((row, i) => (
                <View key={i} style={styles.numpadRow}>
                {row.map((k) => (
                    <Pressable
                    key={k}
                    disabled={disabled}
                    onPress={() => onPress(k)}
                    style={({ pressed }) => [
                        styles.key,
                        k === "ok" && styles.keyOk,
                        k === "del" && styles.keyDel,
                        pressed && { opacity: 0.8 },
                        disabled && { opacity: 0.5 },
                    ]}
                    >
                    <Text
                        style={[
                        styles.keyText,
                        (k === "ok" || k === "del") && styles.keyTextAlt,
                        ]}
                    >
                        {k === "del" ? "⌫" : k === "ok" ? "OK" : k}
                    </Text>
                    </Pressable>
                ))}
                </View>
            ))}
            </View>
        );
        }

        function HistoryList({ data, codeLen }) {
        return (
            <View style={styles.historyBox}>
            <Text style={styles.historyTitle}>Historial</Text>
            {data.length === 0 ? (
                <Text style={styles.historyEmpty}>Aún no hay intentos…</Text>
            ) : (
                <FlatList
                data={data}
                keyExtractor={(item, idx) => item.guess + idx}
                renderItem={({ item, index }) => (
                    <View style={styles.historyItem}>
                    <Text style={styles.historyGuess}>{item.guess}</Text>
                    <View style={styles.row}>
                        <Tag label={`Bulls: ${item.bulls}`} />
                        <Tag label={`Cows: ${item.cows}`} />
                        <Tag label={`Puntaje: ${item.bulls * 2 + item.cows}`} />
                    </View>
                    </View>
                )}
                inverted
                contentContainerStyle={{ paddingBottom: 8 }}
                style={{ maxHeight: 180 }}
                />
            )}
            </View>
        );
        }

        function Tag({ label }) {
        return (
            <View style={styles.tag}>
            <Text style={styles.tagText}>{label}</Text>
            </View>
        );
        }

        const styles = StyleSheet.create({
        safe: { flex: 1, backgroundColor: "#0B1220" },
        container: { flex: 1, padding: 16, gap: 12, alignItems: "stretch" },
        title: {
            color: "white",
            fontSize: 24,
            fontWeight: "800",
            textAlign: "center",
            marginTop: 8,
        },
        row: { flexDirection: "row", alignItems: "center", gap: 8 },
        rowJustify: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
        },

        badge: {
            backgroundColor: "#111827",
            borderRadius: 999,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderWidth: 1,
            borderColor: "#1F2937",
        },
        badgeText: { color: "#D1D5DB", fontWeight: "600" },

        codeBox: {
            flexDirection: "row",
            gap: 12,
            justifyContent: "center",
            marginTop: 8,
        },
        slot: {
            width: 56,
            height: 64,
            borderRadius: 16,
            backgroundColor: "#0F172A",
            borderWidth: 2,
            borderColor: "#1F2937",
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "#000",
            shadowOpacity: 0.25,
            shadowRadius: 8,
        },
        slotFilled: { borderColor: "#3B82F6" },
        slotText: { color: "white", fontSize: 28, fontWeight: "700" },

        numpad: { gap: 10, alignSelf: "center" },
        numpadRow: { flexDirection: "row", gap: 10, justifyContent: "center" },
        key: {
            width: 90,
            height: 60,
            borderRadius: 16,
            backgroundColor: "#111827",
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: "#1F2937",
        },
        keyOk: { backgroundColor: "#10B981", borderColor: "#059669" },
        keyDel: { backgroundColor: "#F59E0B", borderColor: "#D97706" },
        keyText: { color: "#E5E7EB", fontSize: 20, fontWeight: "800" },
        keyTextAlt: { color: "#111827" },

        primaryBtn: {
            marginTop: 8,
            alignSelf: "center",
            backgroundColor: "#3B82F6",
            paddingHorizontal: 18,
            paddingVertical: 12,
            borderRadius: 14,
        },
        primaryBtnText: { color: "white", fontWeight: "800", fontSize: 16 },

        historyBox: {
            backgroundColor: "#0F172A",
            borderRadius: 16,
            padding: 12,
            borderWidth: 1,
            borderColor: "#1F2937",
        },
        historyTitle: { color: "#93C5FD", fontWeight: "800", marginBottom: 6 },
        historyEmpty: { color: "#9CA3AF", fontStyle: "italic" },
        historyItem: {
            paddingVertical: 8,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: "#1F2937",
            gap: 6,
        },
        historyGuess: { color: "#F3F4F6", fontSize: 18, fontWeight: "800" },

        tag: {
            backgroundColor: "#111827",
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 999,
            borderWidth: 1,
            borderColor: "#1F2937",
        },
        tagText: { color: "#D1D5DB", fontWeight: "700" },

        footer: { marginTop: 8 },
        footerText: { color: "#6B7280", fontSize: 12, textAlign: "center" },
        });