import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../src/styles/NewTaskForm.css';

interface NewTaskFormProps {
  onAddTask: (task: string, date: Date | null, priority: 'low' | 'medium' | 'high') => void;
}

export default function NewTaskForm({ onAddTask }: NewTaskFormProps) {
  const [task, setTask] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium'); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task.trim() === '') return;
    onAddTask(task, date, priority);
    setTask('');
    setDate(null);
    setPriority('medium'); 
  };

  return (
    <form onSubmit={handleSubmit} className="new-task-form">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter new task"
      />
      <DatePicker
        selected={date}
        onChange={(date) => setDate(date)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        dateFormat="MMMM d, yyyy h:mm aa"
        placeholderText="Select a deadline"
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}>
        <option value="low">Low Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="high">High Priority</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
}
