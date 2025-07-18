import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

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

function getDailyTasks(seed: number = new Date().getDate()) {
  //Retrun 3 tasked based on date
  const shuffled = [...TASK_DATABASE].sort((a, b) =>
  (a + seed).localeCompare(b + seed)
  );
  return shuffled.slice(0, 3);
}

const STORAGE_KEY = '@daily_tasks';

export default function Taskling(){
    const [tasks, setTasks] = useState<string[]>([]);
    
    const [today, setToday] = useState<number>(new Date().getDate());

  useEffect(() => {
    const loadTasks = async () => {
      const saved = await   AsyncStorage.getItem(STORAGE_KEY);
      const date = new Date().getDate();
      if (saved) {
        const { day, tasks: savedTasks } = JSON.parse(saved);
        if (day === date) {
          setTasks(savedTasks); //If exit, restore tasks
          setToday(day);
          return;
        }
      }
      //new day/no tasks saved
      const freshTasks = getDailyTasks(date);
      setTasks(freshTasks);
      setToday(date);
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ day: date, tasks: freshTasks})
      );
    };
    loadTasks();
  }, []);

  const completeTask = async (index: number) => {
    const copy = [...tasks];
    copy.splice(index, 1);
    setTasks(copy);

    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ day: today, tasks: copy})
    );
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
  title: { fontSize: 22, fontWeight: '600', textAlign: 'center', marginBottom: 10 },
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