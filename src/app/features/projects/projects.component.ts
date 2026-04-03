import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { CollectionsService, Collection } from '../../core/services/collections.service';

interface ProjectMember {
  name: string;
  avatar: string;
  role: string;
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
  members: ProjectMember[];
  tasks: number;
  completedTasks: number;
  budget: string;
  color: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit, OnDestroy {
  viewMode: 'grid' | 'list' | 'timeline' = 'grid';
  filterStatus: 'all' | 'active' | 'planning' | 'completed' | 'on-hold' = 'all';
  searchQuery: string = '';
  sortBy: 'name' | 'progress' | 'date' = 'name';
  selectedCollection: string = 'all';
  currentCollection: Collection | null = null;

  private subscription: Subscription = new Subscription();

  constructor(private router: Router, private collectionsService: CollectionsService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.collectionsService.selectedCollection$.subscribe(collectionId => {
        this.selectedCollection = collectionId;
        this.currentCollection = this.collectionsService.getCollectionById(collectionId) || null;
        // Reset other filters when collection changes
        if (collectionId !== 'all') {
          this.filterStatus = 'all';
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  allProjects: Project[] = [
    {
      id: '1',
      name: 'Mobile App Redesign',
      description: 'Complete redesign of the mobile application with new UI/UX',
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
      color: '#5e60ce'
    },
    {
      id: '2',
      name: 'Backend API Development',
      description: 'Build RESTful API for the new platform',
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
      color: '#43a5c9'
    },
    {
      id: '3',
      name: 'Q2 Marketing Campaign',
      description: 'Social media and digital marketing strategy execution',
      status: 'planning',
      category: 'Marketing',
      progress: 20,
      startDate: '2026-04-01',
      endDate: '2026-06-30',
      members: [
        { name: 'Chris Wilson', avatar: 'CW', role: 'Marketing Manager' }
      ],
      tasks: 18,
      completedTasks: 3,
      budget: '$8,000',
      color: '#f54394'
    },
    {
      id: '4',
      name: 'Database Migration',
      description: 'Migrate from MySQL to PostgreSQL for better performance',
      status: 'completed',
      category: 'Infrastructure',
      progress: 100,
      startDate: '2026-01-10',
      endDate: '2026-03-15',
      members: [
        { name: 'John Smith', avatar: 'JS', role: 'Tech Lead' }
      ],
      tasks: 16,
      completedTasks: 16,
      budget: '$12,000',
      color: '#00b894'
    },
    {
      id: '5',
      name: 'Security Audit & Fixes',
      description: 'Complete security audit and vulnerability fixes',
      status: 'on-hold',
      category: 'Security',
      progress: 30,
      startDate: '2026-03-20',
      endDate: '2026-05-20',
      members: [
        { name: 'Alex Brown', avatar: 'AB', role: 'Security Engineer' }
      ],
      tasks: 12,
      completedTasks: 3,
      budget: '$18,000',
      color: '#ff7675'
    },
    {
      id: '6',
      name: 'Customer Portal',
      description: 'Build self-service customer portal with account management',
      status: 'active',
      category: 'Frontend',
      progress: 75,
      startDate: '2026-02-01',
      endDate: '2026-04-30',
      members: [
        { name: 'Sarah Lee', avatar: 'SL', role: 'UI Designer' },
        { name: 'Mike Johnson', avatar: 'MJ', role: 'Frontend Developer' }
      ],
      tasks: 20,
      completedTasks: 15,
      budget: '$20,000',
      color: '#6c5ce7'
    },
    {
      id: '7',
      name: 'Analytics Dashboard',
      description: 'Real-time analytics and reporting dashboard',
      status: 'active',
      category: 'Tools',
      progress: 55,
      startDate: '2026-03-10',
      endDate: '2026-05-31',
      members: [
        { name: 'Emma Wilson', avatar: 'EW', role: 'Data Analyst' },
        { name: 'Chris Wilson', avatar: 'CW', role: 'BI Developer' }
      ],
      tasks: 14,
      completedTasks: 7,
      budget: '$16,000',
      color: '#fdcb6e'
    },
    {
      id: '8',
      name: 'Mobile Testing Framework',
      description: 'Automated testing framework for mobile applications',
      status: 'planning',
      category: 'QA',
      progress: 10,
      startDate: '2026-04-15',
      endDate: '2026-07-15',
      members: [
        { name: 'Mike Johnson', avatar: 'MJ', role: 'QA Lead' }
      ],
      tasks: 22,
      completedTasks: 2,
      budget: '$14,000',
      color: '#00cec9'
    },
    {
      id: '9',
      name: 'Home Renovation',
      description: 'Kitchen and bathroom renovation project',
      status: 'planning',
      category: 'Personal',
      progress: 5,
      startDate: '2026-05-01',
      endDate: '2026-08-31',
      members: [
        { name: 'You', avatar: 'Y', role: 'Project Manager' }
      ],
      tasks: 15,
      completedTasks: 0,
      budget: '$25,000',
      color: '#ffe66d'
    }
  ];

  get filteredProjects(): Project[] {
    let filtered = this.allProjects;

    // Apply collection filter first
    if (this.selectedCollection !== 'all' && this.currentCollection?.filterCriteria) {
      const criteria = this.currentCollection.filterCriteria;

      if (criteria.status && criteria.status.length > 0) {
        filtered = filtered.filter(p => criteria.status!.includes(p.status));
      }

      if (criteria.category && criteria.category.length > 0) {
        filtered = filtered.filter(p => criteria.category!.includes(p.category));
      }

      if (criteria.dueDateRange) {
        const { start, end } = criteria.dueDateRange;
        filtered = filtered.filter(p => {
          const projectEndDate = new Date(p.endDate);
          return projectEndDate >= start && projectEndDate <= end;
        });
      }
    } else {
      // Apply manual filters when no collection is selected
      // Filter by status
      if (this.filterStatus !== 'all') {
        filtered = filtered.filter(p => p.status === this.filterStatus);
      }
    }

    // Filter by search query (always applied)
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }

    // Sort
    if (this.sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.sortBy === 'progress') {
      filtered.sort((a, b) => b.progress - a.progress);
    } else if (this.sortBy === 'date') {
      filtered.sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime());
    }

    return filtered;
  }

  get stats() {
    return {
      total: this.allProjects.length,
      active: this.allProjects.filter(p => p.status === 'active').length,
      completed: this.allProjects.filter(p => p.status === 'completed').length,
      planning: this.allProjects.filter(p => p.status === 'planning').length
    };
  }

  get timelineProjects(): Project[] {
    return this.filteredProjects
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  }

  setViewMode(mode: 'grid' | 'list' | 'timeline'): void {
    this.viewMode = mode;
  }

  setFilterStatus(status: 'all' | 'active' | 'planning' | 'completed' | 'on-hold'): void {
    this.filterStatus = status;
  }

  setSortBy(sortBy: 'name' | 'progress' | 'date'): void {
    this.sortBy = sortBy;
  }

  createProject(): void {
    this.router.navigate(['/projects/new']);
  }

  viewProject(project: Project): void {
    this.router.navigate(['/projects', project.id]);
  }

  editProject(project: Project): void {
    this.router.navigate(['/projects', project.id, 'edit']);
  }

  deleteProject(projectId: string): void {
    console.log('Delete project:', projectId);
    // TODO: Implement delete functionality
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

  getStatusIcon(status: string): string {
    const icons: { [key: string]: string } = {
      'active': 'circle',
      'planning': 'clock',
      'completed': 'check',
      'on-hold': 'pause'
    };
    return icons[status] || 'circle';
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  getDaysRemaining(endDate: string): number {
    const end = new Date(endDate);
    const today = new Date();
    const diff = end.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 3600 * 24));
  }
}
