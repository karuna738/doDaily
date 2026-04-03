import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
}

interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'todo' | 'in-progress' | 'completed';
  category: string;
  dueDate: string;
  assignee: string;
  progress: number;
  subtasks?: Subtask[];
  comments?: Comment[];
  attachments?: { name: string; size: string }[];
}

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.scss'
})
export class TaskDetailComponent implements OnInit {
  task: Task | null = null;
  newComment: string = '';
  isEditingStatus = false;
  selectedStatus: 'todo' | 'in-progress' | 'completed' = 'todo';
  isSubmittingComment = false;
  completedSubtasks = 0;

  // Sample tasks data (in real app, would come from service)
  allTasks: Task[] = [
    {
      id: '1',
      title: 'Design new dashboard layout',
      description: 'Create mockups and design system for the new dashboard. This includes creating a responsive layout that works across all devices, defining the color scheme, typography, and component library. We need to ensure consistency with the existing design language.',
      priority: 'high',
      status: 'in-progress',
      category: 'Design',
      dueDate: '2026-04-05',
      assignee: 'Sarah Lee',
      progress: 75,
      subtasks: [
        { id: '1-1', title: 'Create wireframes', completed: true },
        { id: '1-2', title: 'Design components', completed: true },
        { id: '1-3', title: 'Create design system documentation', completed: false }
      ],
      comments: [
        {
          id: 'c1',
          author: 'John Smith',
          avatar: 'JS',
          content: 'Looking good! The color scheme is perfect for our brand.',
          timestamp: '2026-04-02T10:30:00'
        },
        {
          id: 'c2',
          author: 'Sarah Lee',
          avatar: 'SL',
          content: 'Thanks! I still need to refine the typography. Will have updates by tomorrow.',
          timestamp: '2026-04-02T11:15:00'
        }
      ],
      attachments: [
        { name: 'Dashboard-Mockup-v1.figma', size: '2.4MB' },
        { name: 'Design-System.pdf', size: '1.8MB' }
      ]
    },
    {
      id: '2',
      title: 'Implement authentication',
      description: 'Add login and signup functionality with email verification and password reset flow.',
      priority: 'high',
      status: 'in-progress',
      category: 'Backend',
      dueDate: '2026-04-08',
      assignee: 'John Smith',
      progress: 50,
      subtasks: [
        { id: '2-1', title: 'Setup authentication schema', completed: true },
        { id: '2-2', title: 'Implement login endpoint', completed: false },
        { id: '2-3', title: 'Implement signup endpoint', completed: false }
      ],
      comments: [],
      attachments: []
    },
    {
      id: '3',
      title: 'Write unit tests',
      description: 'Add comprehensive unit tests for core modules to ensure code quality and maintainability.',
      priority: 'medium',
      status: 'todo',
      category: 'Testing',
      dueDate: '2026-04-10',
      assignee: 'Mike Johnson',
      progress: 0,
      subtasks: [],
      comments: [],
      attachments: []
    }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const taskId = params['id'];
      this.loadTask(taskId);
    });
  }

  loadTask(taskId: string): void {
    this.task = this.allTasks.find(t => t.id === taskId) || null;
    if (this.task && this.task.subtasks) {
      this.completedSubtasks = this.task.subtasks.filter(s => s.completed).length;
    }
    if (this.task) {
      this.selectedStatus = this.task.status;
    }
  }

  getPriorityColor(priority: string): string {
    const colors: { [key: string]: string } = {
      'high': '#ff7675',
      'medium': '#ffeaa7',
      'low': '#00cec9'
    };
    return colors[priority] || '#95a5a6';
  }

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      'todo': '#95a5a6',
      'in-progress': '#ffeaa7',
      'completed': '#00b894'
    };
    return colors[status] || '#95a5a6';
  }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'todo': 'To Do',
      'in-progress': 'In Progress',
      'completed': 'Completed'
    };
    return labels[status] || status;
  }

  changeStatus(status: string): void {
    const validStatus = status as 'todo' | 'in-progress' | 'completed';
    if (this.task) {
      this.task.status = validStatus;
      this.selectedStatus = validStatus;
      this.isEditingStatus = false;
    }
  }

  toggleSubtask(subtaskId: string): void {
    if (this.task && this.task.subtasks) {
      const subtask = this.task.subtasks.find(s => s.id === subtaskId);
      if (subtask) {
        subtask.completed = !subtask.completed;
        this.completedSubtasks = this.task.subtasks.filter(s => s.completed).length;
        // Update progress
        this.task.progress = Math.round((this.completedSubtasks / this.task.subtasks.length) * 100);
      }
    }
  }

  addComment(): void {
    if (!this.newComment.trim() || !this.task) {
      return;
    }

    this.isSubmittingComment = true;

    setTimeout(() => {
      if (!this.task) return;

      if (!this.task.comments) {
        this.task.comments = [];
      }

      const comment: Comment = {
        id: Date.now().toString(),
        author: 'You',
        avatar: 'YU',
        content: this.newComment,
        timestamp: new Date().toISOString()
      };

      this.task.comments.push(comment);
      this.newComment = '';
      this.isSubmittingComment = false;
    }, 300);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  formatTime(timeString: string): string {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  }

  getDaysRemaining(endDate: string): number {
    const end = new Date(endDate);
    const today = new Date();
    const diff = end.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 3600 * 24));
  }

  isOverdue(dueDate: string): boolean {
    return new Date(dueDate) < new Date();
  }

  getAbsDaysRemaining(dueDate: string): number {
    return Math.abs(this.getDaysRemaining(dueDate));
  }

  getAssigneeInitials(): string {
    if (!this.task || !this.task.assignee) return '';
    return this.task.assignee
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  }

  backToTasks(): void {
    this.router.navigate(['/tasks']);
  }

  editTask(): void {
    if (this.task) {
      this.router.navigate(['/tasks', this.task.id, 'edit']);
    }
  }

  deleteTask(): void {
    if (this.task && confirm('Are you sure you want to delete this task?')) {
      this.router.navigate(['/tasks']);
    }
  }
}
