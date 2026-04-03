import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

interface NewProjectForm {
  name: string;
  description: string;
  category: string;
  status: 'active' | 'planning' | 'completed' | 'on-hold';
  startDate: string;
  endDate: string;
  budget: string;
  members: string[];
  color: string;
}

@Component({
  selector: 'app-new-project',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './new-project.component.html',
  styleUrl: './new-project.component.scss'
})
export class NewProjectComponent {
  form: NewProjectForm = {
    name: '',
    description: '',
    category: 'Development',
    status: 'planning',
    startDate: '',
    endDate: '',
    budget: '',
    members: [],
    color: '#5e60ce'
  };

  errors: { [key: string]: string } = {};
  isSubmitting = false;

  // Dropdown options
  categories = ['Development', 'Design', 'Marketing', 'Infrastructure', 'Security', 'Frontend', 'Backend', 'QA', 'DevOps', 'Tools', 'Documentation'];
  statuses = ['planning', 'active', 'on-hold', 'completed'];
  
  availableMembers = [
    { name: 'Sarah Lee', avatar: 'SL' },
    { name: 'John Smith', avatar: 'JS' },
    { name: 'Mike Johnson', avatar: 'MJ' },
    { name: 'Emma Wilson', avatar: 'EW' },
    { name: 'Alex Brown', avatar: 'AB' },
    { name: 'Chris Wilson', avatar: 'CW' }
  ];

  colorOptions = [
    '#5e60ce', '#43a5c9', '#f54394', '#00b894',
    '#ff7675', '#6c5ce7', '#fdcb6e', '#00cec9',
    '#a29bfe', '#fab1a0', '#74b9ff', '#81ecec'
  ];

  constructor(private router: Router) {
    // Set today's date as default start date
    this.form.startDate = this.getTodayDate();
  }

  toggleMember(memberName: string): void {
    const index = this.form.members.indexOf(memberName);
    if (index > -1) {
      this.form.members.splice(index, 1);
    } else {
      this.form.members.push(memberName);
    }
  }

  isMemberSelected(memberName: string): boolean {
    return this.form.members.includes(memberName);
  }

  validateForm(): boolean {
    this.errors = {};

    if (!this.form.name.trim()) {
      this.errors['name'] = 'Project name is required';
    } else if (this.form.name.length > 100) {
      this.errors['name'] = 'Project name must be less than 100 characters';
    }

    if (this.form.description.length > 1000) {
      this.errors['description'] = 'Description must be less than 1000 characters';
    }

    if (!this.form.startDate) {
      this.errors['startDate'] = 'Start date is required';
    }

    if (!this.form.endDate) {
      this.errors['endDate'] = 'End date is required';
    } else if (this.form.startDate && new Date(this.form.endDate) <= new Date(this.form.startDate)) {
      this.errors['endDate'] = 'End date must be after start date';
    }

    if (this.form.budget && isNaN(parseFloat(this.form.budget.replace(/[$,]/g, '')))) {
      this.errors['budget'] = 'Budget must be a valid number';
    }

    if (this.form.members.length === 0) {
      this.errors['members'] = 'At least one team member must be assigned';
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
      const newProject = {
        id: Date.now().toString(),
        ...this.form,
        progress: this.form.status === 'completed' ? 100 : this.form.status === 'active' ? 50 : 20,
        tasks: 0,
        completedTasks: 0
      };

      // Here you would typically call a service to save the project
      console.log('New project created:', newProject);

      this.isSubmitting = false;
      this.router.navigate(['/projects']);
    }, 500);
  }

  cancel(): void {
    this.router.navigate(['/projects']);
  }

  getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  formatBudget(event: any): void {
    const value = event.target.value.replace(/[^0-9]/g, '');
    if (value) {
      this.form.budget = '$' + parseInt(value, 10).toLocaleString();
    } else {
      this.form.budget = '';
    }
  }
}
