import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CollectionsService, Collection } from '../../core/services/collections.service';

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
}

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit, OnDestroy {
  viewMode: 'list' | 'kanban' = 'list';
  filterStatus: 'all' | 'todo' | 'in-progress' | 'completed' = 'all';
  filterPriority: 'all' | 'high' | 'medium' | 'low' = 'all';
  searchQuery: string = '';
  sortBy: 'due-date' | 'priority' | 'title' = 'due-date';
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
          this.filterPriority = 'all';
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  allTasks: Task[] = [
    {
      id: '1',
      title: 'Design new dashboard layout',
      description: 'Create mockups and design system for the new dashboard',
      priority: 'high',
      status: 'in-progress',
      category: 'Design',
      dueDate: '2026-04-05',
      assignee: 'Sarah Lee',
      progress: 75
    },
    {
      id: '2',
      title: 'Implement authentication',
      description: 'Add login and signup functionality',
      priority: 'high',
      status: 'in-progress',
      category: 'Backend',
      dueDate: '2026-04-08',
      assignee: 'John Smith',
      progress: 50
    },
    {
      id: '3',
      title: 'Write unit tests',
      description: 'Add comprehensive unit tests for core modules',
      priority: 'medium',
      status: 'todo',
      category: 'Testing',
      dueDate: '2026-04-10',
      assignee: 'Mike Johnson',
      progress: 0
    },
    {
      id: '4',
      title: 'Update documentation',
      description: 'Update API documentation and user guide',
      priority: 'low',
      status: 'todo',
      category: 'Documentation',
      dueDate: '2026-04-12',
      assignee: 'Emma Wilson',
      progress: 0
    },
    {
      id: '5',
      title: 'Fix responsive design issues',
      description: 'Fix mobile layout bugs on dashboard',
      priority: 'high',
      status: 'completed',
      category: 'Frontend',
      dueDate: '2026-04-02',
      assignee: 'Alex Brown',
      progress: 100
    },
    {
      id: '6',
      title: 'Set up CI/CD pipeline',
      description: 'Configure automated testing and deployment',
      priority: 'medium',
      status: 'completed',
      category: 'DevOps',
      dueDate: '2026-04-01',
      assignee: 'Chris Wilson',
      progress: 100
    },
    {
      id: '7',
      title: 'Create user profiles',
      description: 'Build user profile management system',
      priority: 'medium',
      status: 'in-progress',
      category: 'Frontend',
      dueDate: '2026-04-09',
      assignee: 'Sarah Lee',
      progress: 60
    },
    {
      id: '8',
      title: 'Database optimization',
      description: 'Optimize database queries for better performance',
      priority: 'low',
      status: 'todo',
      category: 'Backend',
      dueDate: '2026-04-15',
      assignee: 'John Smith',
      progress: 0
    },
    {
      id: '9',
      title: 'Plan vacation',
      description: 'Book flights and hotel for summer vacation',
      priority: 'medium',
      status: 'todo',
      category: 'Personal',
      dueDate: '2026-04-20',
      assignee: 'You',
      progress: 25
    },
    {
      id: '10',
      title: 'Grocery shopping',
      description: 'Weekly grocery shopping list',
      priority: 'low',
      status: 'todo',
      category: 'Personal',
      dueDate: '2026-04-06',
      assignee: 'You',
      progress: 0
    },
    {
      id: '11',
      title: 'Call mom',
      description: 'Weekly check-in call with family',
      priority: 'high',
      status: 'todo',
      category: 'Personal',
      dueDate: '2026-04-04',
      assignee: 'You',
      progress: 0
    },
    {
      id: '12',
      title: 'Review quarterly goals',
      description: 'Assess progress on Q2 objectives',
      priority: 'high',
      status: 'in-progress',
      category: 'Work',
      dueDate: '2026-05-15',
      assignee: 'You',
      progress: 30
    }
  ];

  get filteredTasks(): Task[] {
    let filtered = this.allTasks;

    // Apply collection filter first
    if (this.selectedCollection !== 'all' && this.currentCollection?.filterCriteria) {
      const criteria = this.currentCollection.filterCriteria;

      if (criteria.priority && criteria.priority.length > 0) {
        filtered = filtered.filter(t => criteria.priority!.includes(t.priority));
      }

      if (criteria.status && criteria.status.length > 0) {
        filtered = filtered.filter(t => criteria.status!.includes(t.status));
      }

      if (criteria.category && criteria.category.length > 0) {
        filtered = filtered.filter(t => criteria.category!.includes(t.category));
      }

      if (criteria.dueDateRange) {
        const { start, end } = criteria.dueDateRange;
        filtered = filtered.filter(t => {
          const taskDate = new Date(t.dueDate);
          return taskDate >= start && taskDate <= end;
        });
      }
    } else {
      // Apply manual filters when no collection is selected
      // Filter by status
      if (this.filterStatus !== 'all') {
        filtered = filtered.filter(t => t.status === this.filterStatus);
      }

      // Filter by priority
      if (this.filterPriority !== 'all') {
        filtered = filtered.filter(t => t.priority === this.filterPriority);
      }
    }

    // Filter by search query (always applied)
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(t =>
        t.title.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query) ||
        t.category.toLowerCase().includes(query)
      );
    }

    // Sort
    if (this.sortBy === 'due-date') {
      filtered.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    } else if (this.sortBy === 'priority') {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      filtered.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    } else if (this.sortBy === 'title') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  }

  get tasksByStatus() {
    return {
      todo: this.filteredTasks.filter(t => t.status === 'todo'),
      'in-progress': this.filteredTasks.filter(t => t.status === 'in-progress'),
      completed: this.filteredTasks.filter(t => t.status === 'completed')
    };
  }

  get stats() {
    return {
      total: this.allTasks.length,
      completed: this.allTasks.filter(t => t.status === 'completed').length,
      inProgress: this.allTasks.filter(t => t.status === 'in-progress').length,
      highPriority: this.allTasks.filter(t => t.priority === 'high').length
    };
  }

  setViewMode(mode: 'list' | 'kanban'): void {
    this.viewMode = mode;
  }

  setFilterStatus(status: 'all' | 'todo' | 'in-progress' | 'completed'): void {
    this.filterStatus = status;
  }

  setFilterPriority(priority: 'all' | 'high' | 'medium' | 'low'): void {
    this.filterPriority = priority;
  }

  setSortBy(sortBy: 'due-date' | 'priority' | 'title'): void {
    this.sortBy = sortBy;
  }

  createTask(): void {
    this.router.navigate(['/tasks/new']);
  }

  viewTask(task: Task): void {
    this.router.navigate(['/tasks', task.id]);
  }

  deleteTask(taskId: string): void {
    console.log('Delete task:', taskId);
  }

  updateTaskStatus(taskId: string, newStatus: string): void {
    const task = this.allTasks.find(t => t.id === taskId);
    if (task) {
      task.status = newStatus as any;
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
}
