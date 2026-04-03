import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Collection {
  id: string;
  name: string;
  color: string;
  icon?: string;
  filterCriteria?: {
    priority?: string[];
    status?: string[];
    category?: string[];
    dueDateRange?: { start: Date; end: Date };
  };
}

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {
  private selectedCollectionSubject = new BehaviorSubject<string>('all');
  public selectedCollection$ = this.selectedCollectionSubject.asObservable();

  private collectionsSubject = new BehaviorSubject<Collection[]>([
    {
      id: 'urgent',
      name: 'Urgent',
      color: '#ff6b6b',
      filterCriteria: {
        priority: ['high'],
        status: ['todo', 'in-progress']
      }
    },
    {
      id: 'this-week',
      name: 'This Week',
      color: '#4ecdc4',
      filterCriteria: {
        dueDateRange: {
          start: new Date(),
          end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        }
      }
    },
    {
      id: 'personal',
      name: 'Personal',
      color: '#ffe66d',
      filterCriteria: {
        category: ['Personal']
      }
    }
  ]);

  public collections$ = this.collectionsSubject.asObservable();

  constructor() {
    console.log('CollectionsService initialized with collections:', this.collectionsSubject.value);
  }

  selectCollection(collectionId: string): void {
    this.selectedCollectionSubject.next(collectionId);
  }

  getSelectedCollection(): string {
    return this.selectedCollectionSubject.value;
  }

  getCollections(): Collection[] {
    return this.collectionsSubject.value;
  }

  addCollection(collection: Collection): void {
    const currentCollections = this.collectionsSubject.value;
    this.collectionsSubject.next([...currentCollections, collection]);
  }

  getCollectionById(id: string): Collection | undefined {
    return this.collectionsSubject.value.find(c => c.id === id);
  }
}
