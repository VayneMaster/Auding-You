import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from 'expo-router';
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

type Entling ={
    id: string;
    createdAt: string;
    completedTasks: string[];
    fullyGrown: boolean;
};

const router = useRouter();

export default function TaskFarmer() {
    const [farm, setFarm ] = useState<Entling[]>([]);
    const [ unlockedBackgrounds, setUnlockedBackgrounds] = useState<string[]>([]);
    
    useEffect(() => {
        const loadFarm = async () => {
            const raw = await AsyncStorage.getItem('@entling_farm');
            const parsed = raw ? JSON.parse(raw) : [];
            setFarm(parsed);

            //Unlock backgrounds alligned with progress
            const unlocked = await determineUnlockedBackgrounds(parsed.length);
            setUnlockedBackgrounds(unlocked);
        };

        loadFarm();
    }, []);

    const determineUnlockedBackgrounds = async (count: number) => {
        const unlocks: string[] = [];

        if (count >= 3) unlocks.push('🌾 Farm Field');
        if (count >= 6) unlocks.push('🏞️ Forest Path');
        if (count >= 10) unlocks.push('🏰 Fantasy Castle');

        //Save unlocked BG for anywhere else
            await AsyncStorage.setItem('@backgrounds_unlocked', JSON.stringify(unlocks));
        return unlocks;
    };
      return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🐣 Entling Farm</Text>
      <Text style={styles.subtitle}>
        You’ve grown {farm.length} entling{farm.length !== 1 ? 's' : ''}!
      </Text>

      {farm.map((e) => (
        <View key={e.id} style={styles.entlingCard}>
          <Text style={styles.date}>
            🌱 Born: {new Date(e.createdAt).toDateString()}
          </Text>
          <Text style={styles.taskList}>
            Tasks: {e.completedTasks.join(', ')}
          </Text>
        </View>
      ))}

      {unlockedBackgrounds.length > 0 && (
        <>
          <Text style={styles.unlockTitle}>🎉 Unlocked Backgrounds:</Text>
          {unlockedBackgrounds.map((bg) => (
            <Text key={bg} style={styles.bgItem}>
              {bg}
            </Text>
          ))}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff8f0', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, marginBottom: 20 },
  entlingCard: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  date: { fontSize: 14, color: '#444' },
  taskList: { fontSize: 14, color: '#666', marginTop: 4 },
  unlockTitle: { fontSize: 18, fontWeight: '600', marginTop: 20 },
  bgItem: { fontSize: 16, marginTop: 4 },
});