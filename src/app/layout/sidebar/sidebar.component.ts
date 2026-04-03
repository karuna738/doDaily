import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CollectionsService, Collection } from '../../core/services/collections.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit, OnDestroy {
  selectedCollection: string = 'all';
  showAddCollection = false;
  newCollectionName = '';
  newCollectionColor = '#5e60ce';
  collections: Collection[] = [];

  availableColors = [
    '#5e60ce', '#43a5c9', '#f54394', '#ff6b6b', '#4ecdc4',
    '#ffe66d', '#a78bfa', '#f59e0b', '#10b981', '#ef4444'
  ];

  private subscription: Subscription = new Subscription();

  constructor(private collectionsService: CollectionsService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.collectionsService.selectedCollection$.subscribe(collectionId => {
        this.selectedCollection = collectionId;
      })
    );

    this.subscription.add(
      this.collectionsService.collections$.subscribe(collections => {
        this.collections = collections;
        console.log('Collections loaded:', collections);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  selectCollection(collectionId: string): void {
    this.collectionsService.selectCollection(collectionId);
  }

  toggleAddCollection(): void {
    this.showAddCollection = !this.showAddCollection;
    if (!this.showAddCollection) {
      this.newCollectionName = '';
      this.newCollectionColor = '#5e60ce';
    }
  }

  addCollection(): void {
    if (this.newCollectionName.trim()) {
      const newCollection: Collection = {
        id: this.newCollectionName.toLowerCase().replace(/\s+/g, '-'),
        name: this.newCollectionName.trim(),
        color: this.newCollectionColor
      };
      this.collectionsService.addCollection(newCollection);
      this.newCollectionName = '';
      this.newCollectionColor = '#5e60ce';
      this.showAddCollection = false;
    }
  }

  selectColor(color: string): void {
    this.newCollectionColor = color;
  }
}

