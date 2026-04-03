import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, Theme } from '../../core/services/theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  theme$: Observable<Theme>;
  activeTab: 'personal' | 'preferences' | 'security' = 'personal';
  
  profileData = {
    fullName: 'Karunakaran',
    email: 'karunakaran@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    timezone: 'UTC-8 (Pacific Time)',
    jobTitle: 'Product Manager',
    department: 'Product',
    bio: 'Passionate about building great products and leading teams to success.',
    avatar: 'K'
  };

  preferences = {
    emailNotifications: true,
    pushNotifications: false,
    weeklyDigest: true,
    taskReminders: true,
    activityNotifications: false,
    language: 'English',
    dateFormat: 'MM/DD/YYYY',
    theme: 'auto'
  };

  constructor(private themeService: ThemeService) {
    this.theme$ = this.themeService.theme$;
  }

  setActiveTab(tab: 'personal' | 'preferences' | 'security'): void {
    this.activeTab = tab;
  }

  onFileSelected(event: any): void {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // Handle file upload
        console.log('File selected:', file.name);
      };
      reader.readAsDataURL(file);
    }
  }

  saveChanges(): void {
    console.log('Profile changes saved');
  }
}
