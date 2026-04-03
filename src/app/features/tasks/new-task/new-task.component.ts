import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

interface NewTaskForm {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'todo' | 'in-progress' | 'completed';
  category: string;
  dueDate: string;
  assignee: string;
}

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.scss'
})
export class NewTaskComponent {
  form: NewTaskForm = {
    title: '',
    description: '',
    priority: 'medium',
    status: 'todo',
    category: 'General',
    dueDate: '',
    assignee: ''
  };

  errors: { [key: string]: string } = {};
  isSubmitting = false;

  // Dropdown options
  priorities = ['high', 'medium', 'low'];
  statuses = ['todo', 'in-progress', 'completed'];
  categories = ['General', 'Design', 'Development', 'Testing', 'Documentation', 'Backend', 'Frontend', 'DevOps'];
  assignees = ['Sarah Lee', 'John Smith', 'Mike Johnson', 'Emma Wilson', 'Alex Brown', 'Chris Wilson', 'Me'];

  constructor(private router: Router) {}

  validateForm(): boolean {
    this.errors = {};

    if (!this.form.title.trim()) {
      this.errors['title'] = 'Task title is required';
    } else if (this.form.title.length > 100) {
      this.errors['title'] = 'Task title must be less than 100 characters';
    }

    if (this.form.description.length > 1000) {
      this.errors['description'] = 'Description must be less than 1000 characters';
    }

    if (this.form.dueDate && new Date(this.form.dueDate) < new Date()) {
      this.errors['dueDate'] = 'Due date cannot be in the past';
    }

    return Object.keys(this.errors).length === 0;
  }

  submitForm(): void {
    if (!this.validateForm()) {
      return;
    }

    this.isSubmitting = true;

    // Simulate API call
    setTimeout(() => {
      const newTask = {
        id: Date.now().toString(),
        ...this.form,
        progress: this.form.status === 'completed' ? 100 : this.form.status === 'in-progress' ? 50 : 0
      };

      // Here you would typically call a service to save the task
      console.log('New task created:', newTask);

      this.isSubmitting = false;
      this.router.navigate(['/tasks']);
    }, 500);
  }

  cancel(): void {
    this.router.navigate(['/tasks']);
  }

  getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }
}
