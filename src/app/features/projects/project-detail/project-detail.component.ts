import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

interface TeamMember {
  name: string;
  avatar: string;
  role: string;
}

interface ProjectUpdate {
  id: string;
  author: string;
  avatar: string;
  message: string;
  timestamp: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'planning' | 'completed' | 'on-hold';
  category: string;
  progress: number;
  startDate: string;
  endDate: string;
  members: TeamMember[];
  tasks: number;
  completedTasks: number;
  budget: string;
  color: string;
  updates?: ProjectUpdate[];
}

interface TeamMember {
  name: string;
  avatar: string;
  role: string;
}

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss'
})
export class ProjectDetailComponent implements OnInit {
  project: Project | null = null;
  updateMessage: string = '';
  isEditingStatus = false;
  selectedStatus: 'active' | 'planning' | 'completed' | 'on-hold' = 'planning';
  isSubmittingUpdate = false;

  // Sample projects data
  allProjects: Project[] = [
    {
      id: '1',
      name: 'Mobile App Redesign',
      description: 'Complete redesign of the mobile application with new UI/UX focusing on modern design patterns and improved user experience. This includes responsive layouts, dark mode support, and accessibility improvements.',
      status: 'active',
      category: 'Design',
      progress: 65,
      startDate: '2026-03-01',
      endDate: '2026-05-31',
      members: [
        { name: 'Sarah Lee', avatar: 'SL', role: 'Lead Designer' },
        { name: 'Emma Wilson', avatar: 'EW', role: 'Designer' }
      ],
      tasks: 24,
      completedTasks: 15,
      budget: '$15,000',
      color: '#5e60ce',
      updates: [
        {
          id: '1',
          author: 'Sarah Lee',
          avatar: 'SL',
          message: 'Completed component library design. Moving to implementation phase.',
          timestamp: '2026-04-02T14:30:00'
        },
        {
          id: '2',
          author: 'Emma Wilson',
          avatar: 'EW',
          message: 'Design system documentation is 90% complete. Awaiting final review.',
          timestamp: '2026-04-01T10:15:00'
        }
      ]
    },
    {
      id: '2',
      name: 'Backend API Development',
      description: 'Build RESTful API for the new platform with comprehensive documentation and testing. Includes user management, authentication, data persistence, and real-time updates.',
      status: 'active',
      category: 'Development',
      progress: 45,
      startDate: '2026-02-15',
      endDate: '2026-06-30',
      members: [
        { name: 'John Smith', avatar: 'JS', role: 'Tech Lead' },
        { name: 'Mike Johnson', avatar: 'MJ', role: 'Developer' },
        { name: 'Alex Brown', avatar: 'AB', role: 'Developer' }
      ],
      tasks: 32,
      completedTasks: 14,
      budget: '$25,000',
      color: '#43a5c9',
      updates: []
    }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const projectId = params['id'];
      this.loadProject(projectId);
    });
  }

  loadProject(projectId: string): void {
    this.project = this.allProjects.find(p => p.id === projectId) || null;
    if (this.project) {
      this.selectedStatus = this.project.status;
    }
  }

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      'active': '#00b894',
      'planning': '#ffeaa7',
      'completed': '#74b9ff',
      'on-hold': '#ff7675'
    };
    return colors[status] || '#95a5a6';
  }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'active': 'Active',
      'planning': 'Planning',
      'completed': 'Completed',
      'on-hold': 'On Hold'
    };
    return labels[status] || status;
  }

  changeStatus(status: string): void {
    const validStatus = status as 'active' | 'planning' | 'completed' | 'on-hold';
    if (this.project) {
      this.project.status = validStatus;
      this.selectedStatus = validStatus;
      this.isEditingStatus = false;
    }
  }

  addUpdate(): void {
    if (!this.updateMessage.trim() || !this.project) {
      return;
    }

    this.isSubmittingUpdate = true;

    setTimeout(() => {
      if (!this.project) return;

      if (!this.project.updates) {
        this.project.updates = [];
      }

      const update: ProjectUpdate = {
        id: Date.now().toString(),
        author: 'You',
        avatar: 'YU',
        message: this.updateMessage,
        timestamp: new Date().toISOString()
      };

      this.project.updates.unshift(update);
      this.updateMessage = '';
      this.isSubmittingUpdate = false;
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

  getDurationDays(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = end.getTime() - start.getTime();
    return Math.max(0, Math.round(diff / (1000 * 3600 * 24)));
  }

  isOverdue(endDate: string): boolean {
    return new Date(endDate) < new Date();
  }

  getAbsDaysRemaining(endDate: string): number {
    return Math.abs(this.getDaysRemaining(endDate));
  }

  getTaskPercentage(): number {
    if (!this.project || this.project.tasks === 0) return 0;
    return Math.round((this.project.completedTasks / this.project.tasks) * 100);
  }

  backToProjects(): void {
    this.router.navigate(['/projects']);
  }

  editProject(): void {
    if (this.project) {
      this.router.navigate(['/projects', this.project.id, 'edit']);
    }
  }

  deleteProject(): void {
    if (this.project && confirm('Are you sure you want to delete this project?')) {
      this.router.navigate(['/projects']);
    }
  }
}
