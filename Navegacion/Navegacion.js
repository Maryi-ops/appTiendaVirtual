import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import AdminProductosScreen from "../Screens/AdminProductosScreen";
import FormularioProductoScreen from "../Screens/FormularioProductoScreen";
import CatalogoScreen from "../Screens/CatalogoScreen";
import OtraScreenAdmin from "../Screens/OtraScreenAdmin";
import OtraScreenCliente from "../Screens/OtraScreenCliente";
import Login from "../components/Login";

const RootStack = createNativeStackNavigator();
const CatalogoStack = createNativeStackNavigator();
const AdminStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function CatalogoNavegacion() {
    return (
        <CatalogoStack.Navigator>
            <CatalogoStack.Screen
                name="CatalogoScreen"
                component={CatalogoScreen}
                options={{ title: "Catálogo" }}
            />
        </CatalogoStack.Navigator>
    );
}

function AdminNavegacion() {
    return (
        <AdminStack.Navigator>
            <AdminStack.Screen
                name="AdminProductosScreen"
                component={AdminProductosScreen}
                options={{ headerShown: false }}
            />
            <AdminStack.Screen
                name="FormularioProductoScreen"
                component={FormularioProductoScreen}
                options={{ headerShown: false }}
            />
        </AdminStack.Navigator>
    );
}

function ClienteTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#7C7CFF",
                tabBarInactiveTintColor: "gray",
            }}
        >
            <Tab.Screen
                name="CatalogoTab"
                component={CatalogoNavegacion}
                options={{
                    title: "Catálogo",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="home-outline"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="OtraScreenCliente"
                component={OtraScreenCliente}
                options={{
                    title: "Mi perfil",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="person-outline"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

function AdminTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#7C7CFF",
                tabBarInactiveTintColor: "gray",
            }}
        >
            <Tab.Screen
                name="ProductosTab"
                component={AdminNavegacion}
                options={{
                    title: "Productos",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="cube-outline"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="OtraScreenAdmin"
                component={OtraScreenAdmin}
                options={{
                    title: "Mi perfil",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="person-outline"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default function Navegacion() {
    return (
        <NavigationContainer>
            <RootStack.Navigator
                initialRouteName="Login"
                screenOptions={{ headerShown: false }}
            >
                <RootStack.Screen name="Login" component={Login} />
                <RootStack.Screen name="ClienteTabs" component={ClienteTabs} />
                <RootStack.Screen name="AdminTabs" component={AdminTabs} />
            </RootStack.Navigator>
        </NavigationContainer>
    );
}
