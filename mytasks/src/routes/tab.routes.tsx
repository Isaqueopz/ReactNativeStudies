import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // prop do bot de navegação
import { Feather } from '@expo/vector-icons'; // prop de icones nas tabs
import { Home } from '../screens/Home'; // aponta para minha  screen home
import { Deleted } from '../screens/Deleted'; // aponta para minha screen Deleted

const Tab = createBottomTabNavigator();

export function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#eba417',
        tabBarInactiveTintColor: '#B0B0B0',
        tabBarStyle: {
          backgroundColor: '#121214',
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
          tabBarLabel: 'tasks',
        }}
      />
      <Tab.Screen
        name="deleted"
        component={Deleted}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="archive" color={color} size={size} />
          ),
          tabBarLabel: 'deleted tasks',
        }}
      />
    </Tab.Navigator>
  );
}
