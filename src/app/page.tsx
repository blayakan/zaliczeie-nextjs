"use client";

import { useState } from 'react';
import NewTaskForm from '../../components/NewTaskForm';
import TaskList from '../../components/TaskList';
import LoginForm from '../../components/LoginForm';

interface Task {
  task: string;
  completed: boolean;
  date: Date | null;
  priority: 'low' | 'medium' | 'high';
}

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [user, setUser] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');

  const handleAddTask = (task: string, date: Date | null, priority: 'low' | 'medium' | 'high') => {
    setTasks([...tasks, { task, completed: false, date, priority }]);
  };

  const handleCompleteTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const handleDeleteTask = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  
  const sortedTasks = tasks.sort((a, b) => {
    const priorityOrder: { [key: string]: number } = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  
  const filteredTasks = sortedTasks.filter(task => {
    if (filter === 'completed' && !task.completed) return false;
    if (filter === 'incomplete' && task.completed) return false;
    if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false;
    return true;
  });

  if (!user) {
    return <LoginForm onLogin={setUser} />;
  }

  return (
    <div className="container">
      <h1>Welcome, {user}</h1>
      <NewTaskForm onAddTask={handleAddTask} />

     
      <div className="filter-buttons">
        <button onClick={() => setFilter('all')}>All Tasks</button>
        <button onClick={() => setFilter('completed')}>Completed Tasks</button>
        <button onClick={() => setFilter('incomplete')}>Incomplete Tasks</button>
      </div>

      
      <div className="filter-priority-buttons">
        <button onClick={() => setPriorityFilter('all')}>All Priorities</button>
        <button onClick={() => setPriorityFilter('high')}>High Priority</button>
        <button onClick={() => setPriorityFilter('medium')}>Medium Priority</button>
        <button onClick={() => setPriorityFilter('low')}>Low Priority</button>
      </div>

      <TaskList
        tasks={filteredTasks}
        onComplete={handleCompleteTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );
}
