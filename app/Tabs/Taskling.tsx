import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { v4 as uuidv4 } from 'uuid'; //npm install uuid thuis


//Task database
const TASK_DATABASE = [
  'Take a walk',
  'Do the dishes',
  'Clean area',
  'Grab a drink',
  'Check the cat',
  'Eat a banana',
  'Sleep 7 hours'
];

const CURRENT_ENTLING_KEY = '@current_entling';
const ENTLING_FARM_KEY = '@entling_farm'

function getDailyTasks(seed: number = new Date().getDate()) {
  //Retrun 3 tasked based on date
  const shuffled = [...TASK_DATABASE].sort((a, b) =>
  (a + seed).localeCompare(b + seed)
  );
  return shuffled.slice(0, 3);
}

type Entling = {
  id: string;
  createdAt: string;
  completedTasks: string[];
  fullyGrown: boolean;
};

export default function Taskling(){
    const [tasks, setTasks] = useState<string[]>([]);
    const [entling, setEntling] = useState<Entling | null>(null);
    const [today, setToday] = useState<number>(new Date().getDate());

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const date = new Date().getDate();
    setToday(date);

    let currentEntling = await AsyncStorage.getItem(CURRENT_ENTLING_KEY);
    if (currentEntling) {
      const parsed = JSON.parse(currentEntling) as Entling;
      if (!parsed.fullyGrown) {
        setEntling(parsed);
        return;
      }
    }

    //New Entinling
    const newEntling: Entling = {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      completedTasks: [],
      fullyGrown: false,
    };

    await AsyncStorage.setItem(CURRENT_ENTLING_KEY, JSON.stringify(newEntling));
    setEntling(newEntling);

    const dailyTasks = getDailyTasks(date);
    setTasks(dailyTasks);
  };

  const completeTask = async (index: number) => {
    const updatedTasks = [...tasks];
    const taskDone = updatedTasks.splice(index, 1)[0];
    setTasks(updatedTasks);

    if (!entling) return;

    const updatedEntling: Entling = {
      ...entling,
      completedTasks: [...entling.completedTasks, taskDone],
    };

    const isFullyGrown = updatedEntling.completedTasks.length >= 3;
    if (isFullyGrown) {
      updatedEntling.fullyGrown = true;

      // Save to farm
      const farmRaw = await AsyncStorage.getItem(ENTLING_FARM_KEY);
      const farm = farmRaw ? JSON.parse(farmRaw) : [];
      farm.push(updatedEntling);
      await AsyncStorage.setItem(ENTLING_FARM_KEY, JSON.stringify(farm));
    }

    await AsyncStorage.setItem(CURRENT_ENTLING_KEY, JSON.stringify(updatedEntling));
    setEntling(updatedEntling);
  };

  const growthStage = tasks.length === 3
      ? '🌱'
    : tasks.length === 2
    ? '🌿'
    : tasks.length === 1
    ? '🌿✨'
    : '🧍‍♂️ Entling!';


  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌼 Taskling: Grow Your Entling</Text>
      <Text style={styles.stage}>Current Growth: {growthStage}</Text>

      <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
        {tasks.map((task, i) => (
          <TouchableOpacity
            key={i}
            style={styles.task}
            onPress={() => completeTask(i)}
          >
            <Text style={styles.taskText}>✅ {task}</Text>
          </TouchableOpacity>
        ))}

        {tasks.length === 0 && (
          <Text style={styles.doneText}>All tasks completed! 🎉</Text>
        )}
      </ScrollView>
    </View>
  );
}
    
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f6fff7' },
  title: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  stage: { fontSize: 18, textAlign: 'center', marginBottom: 20 },
  task: {
    backgroundColor: 'white',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  taskText: { fontSize: 16 },
  doneText: {
    textAlign: 'center',
    fontSize: 16,
    paddingTop: 20,
    color: 'gray',
  },
});