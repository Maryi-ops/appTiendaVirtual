import React from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Producto = (props) => {
    return (
        <View style={styles.tarjeta}>
            <View
                style={[
                    styles.contenedorImagen,
                    { backgroundColor: props.color || "#F5F5F5" },
                ]}
            >
                {props.imagen ? (
                    <Image
                        source={{ uri: props.imagen }}
                        style={styles.imagen}
                        resizeMode="contain"
                    />
                ) : (
                    <Ionicons
                        name="image-outline"
                        size={38}
                        color="#B0B0B0"
                    />
                )}
            </View>

            <View style={styles.informacion}>
                <View style={styles.filaPrecio}>
                    <Text style={styles.precio}>
                        C$ {props.precio ?? 0}
                    </Text>

                    <TouchableOpacity
                        activeOpacity={0.7}
                        accessibilityLabel="Favorito"
                    >
                        <Ionicons
                            name="heart-outline"
                            size={21}
                            color="#777777"
                        />
                    </TouchableOpacity>
                </View>

                <Text style={styles.nombre} numberOfLines={2}>
                    {props.nombre || "Sin nombre"}
                </Text>

                {props.tiempo ? (
                    <Text style={styles.tiempo}>{props.tiempo}</Text>
                ) : null}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    tarjeta: {
        width: "48%",
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        marginBottom: 16,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#EAEAEA",
        elevation: 2,
    },
    contenedorImagen: {
        height: 175,
        justifyContent: "center",
        alignItems: "center",
    },
    imagen: {
        width: "88%",
        height: "90%",
    },
    informacion: {
        padding: 12,
    },
    filaPrecio: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    precio: {
        fontSize: 17,
        fontWeight: "700",
        color: "#292929",
    },
    nombre: {
        fontSize: 13,
        fontWeight: "600",
        color: "#424242",
        marginTop: 7,
        lineHeight: 19,
    },
    tiempo: {
        fontSize: 11,
        color: "#888888",
        marginTop: 6,
    },
});

export default Producto;
