import { useEffect, useState } from 'react';
import '../src/styles/TaskList.css';

interface Task {
  task: string;
  completed: boolean;
  date: Date | null;
}

interface TaskListProps {
  tasks: Task[];
  onComplete: (index: number) => void;
  onDelete: (index: number) => void;
}

export default function TaskList({ tasks, onComplete, onDelete }: TaskListProps) {
  const [timeLeft, setTimeLeft] = useState<{ [key: number]: string | null }>({});

  const calculateTimeLeft = (dueDate: Date | null) => {
    if (!dueDate) return null;

    const difference = +new Date(dueDate) - +new Date();
    if (difference <= 0) return "Deadline reached";

    const timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };

    return `${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`;
  };

  useEffect(() => {
    const timers = tasks.map((task, index) => {
      if (task.date) {
        return setInterval(() => {
          setTimeLeft((prev) => ({
            ...prev,
            [index]: calculateTimeLeft(task.date),
          }));
        }, 1000);
      }
      return null;
    });

    return () => {
      timers.forEach((timer) => {
        if (timer) clearInterval(timer);
      });
    };
  }, [tasks]);

  return (
    <ul className="task-list">
      {tasks.map((task, index) => (
        <li key={index} className={task.completed ? 'completed' : ''}>
          <span>{task.task}</span>
          {task.date && (
            <div className="task-date">
              Due on: {new Date(task.date).toLocaleDateString()} - Time left:{" "}
              {timeLeft[index] !== null ? timeLeft[index] : "Calculating..."}
            </div>
          )}
          <div className="task-actions">
            <button onClick={() => onComplete(index)}>
              {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button className="delete" onClick={() => onDelete(index)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
