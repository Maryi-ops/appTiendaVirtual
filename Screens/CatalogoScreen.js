import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    ScrollView,
    StyleSheet,
    Image,
    Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import Categoria from "../components/Categoria";

export default function CatalogoScreen() {
    const [productos, setProductos] = useState([]);
    const [busqueda, setBusqueda] = useState("");

    const cargarProductos = async () => {
        try {
            const consulta = await getDocs(collection(db, "Productos"));

            const lista = consulta.docs.map((documento) => ({
                ...documento.data(),
                documentId: documento.id,
            }));

            setProductos(lista);
        } catch (error) {
            console.error("Error al cargar productos:", error);
            Alert.alert("Error", "No se pudieron cargar los productos.");
        }
    };

    useEffect(() => {
        cargarProductos();
    }, []);

    const productosFiltrados = productos.filter((producto) =>
        (producto.nombre || "")
            .toLowerCase()
            .includes(busqueda.trim().toLowerCase())
    );

    return (
        <View style={styles.pantalla}>
            <ScrollView
                style={styles.contenedor}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.buscador}>
                    <Ionicons
                        name="search-outline"
                        size={18}
                        color="#7C7CFF"
                    />

                    <TextInput
                        placeholder="Buscar producto"
                        placeholderTextColor="#B5B5D5"
                        style={styles.input}
                        value={busqueda}
                        onChangeText={setBusqueda}
                    />
                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.categorias}
                >
                    <Categoria nombre="Fashion" icono="shirt-outline" />
                    <Categoria nombre="Cars" icono="car-outline" />
                    <Categoria nombre="Babies" icono="woman-outline" />
                    <Categoria nombre="Home" icono="home-outline" />
                    <Categoria nombre="Sport" icono="bicycle-outline" />
                    <Categoria nombre="Technology" icono="laptop-outline" />
                </ScrollView>

                <View style={styles.linea} />

                <View style={styles.encabezado}>
                    <Text style={styles.titulo}>Productos</Text>
                    <Text style={styles.contador}>
                        {productosFiltrados.length} productos
                    </Text>
                </View>

                <View style={styles.productos}>
                    {productosFiltrados.length === 0 ? (
                        <Text style={styles.sinProductos}>
                            No hay productos registrados.
                        </Text>
                    ) : (
                        productosFiltrados.map((producto) => (
                            <View
                                key={producto.documentId}
                                style={[
                                    styles.tarjeta,
                                    {
                                        backgroundColor:
                                            producto.color || "#F5F5F5",
                                    },
                                ]}
                            >
                                {producto.imagen ? (
                                    <Image
                                        source={{ uri: producto.imagen }}
                                        style={styles.imagen}
                                        resizeMode="cover"
                                    />
                                ) : (
                                    <View style={styles.sinImagen}>
                                        <Ionicons
                                            name="image-outline"
                                            size={40}
                                            color="#999999"
                                        />
                                    </View>
                                )}

                                <View style={styles.informacion}>
                                    <Text
                                        style={styles.nombre}
                                        numberOfLines={2}
                                    >
                                        {producto.nombre || "Sin nombre"}
                                    </Text>

                                    <Text style={styles.precio}>
                                        C$ {producto.precio ?? 0}
                                    </Text>

                                    {producto.descripcion ? (
                                        <Text
                                            style={styles.descripcion}
                                            numberOfLines={2}
                                        >
                                            {producto.descripcion}
                                        </Text>
                                    ) : null}
                                </View>
                            </View>
                        ))
                    )}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    pantalla: {
        flex: 1,
        backgroundColor: "#FAF9FF",
    },
    contenedor: {
        flex: 1,
        paddingHorizontal: 16,
        marginTop: 40,
    },
    buscador: {
        height: 52,
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 14,
        marginTop: 12,
        marginBottom: 18,
        borderWidth: 1,
        borderColor: "#E9E3FA",
        elevation: 2,
    },
    input: {
        flex: 1,
        fontSize: 13,
        marginLeft: 10,
        color: "#29243D",
    },
    categorias: {
        marginBottom: 14,
    },
    linea: {
        height: 1,
        backgroundColor: "#E7E0F5",
        marginHorizontal: -16,
    },
    encabezado: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 18,
        marginBottom: 14,
    },
    titulo: {
        fontSize: 23,
        fontWeight: "bold",
        color: "#30234A",
    },
    contador: {
        fontSize: 12,
        color: "#7C7CFF",
        fontWeight: "600",
    },
    productos: {
        paddingBottom: 30,
    },
    tarjeta: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        marginBottom: 16,
        padding: 12,
        flexDirection: "row",
        minHeight: 150,
        borderWidth: 1,
        borderColor: "#EEE9F8",
        elevation: 2,
    },
    imagen: {
        width: 120,
        height: 130,
        borderRadius: 12,
        backgroundColor: "#F5F1FF",
    },
    sinImagen: {
        width: 120,
        height: 130,
        borderRadius: 12,
        backgroundColor: "#F0EAFB",
        justifyContent: "center",
        alignItems: "center",
    },
    informacion: {
        flex: 1,
        marginLeft: 12,
        justifyContent: "center",
    },
    nombre: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#30234A",
    },
    precio: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#6D4AFF",
        marginTop: 8,
    },
    descripcion: {
        fontSize: 12,
        color: "#777184",
        marginTop: 6,
        lineHeight: 18,
    },
    sinProductos: {
        textAlign: "center",
        color: "#777184",
        marginTop: 30,
        fontSize: 14,
    },
});
