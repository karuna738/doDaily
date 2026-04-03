import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SettingItem {
  id: string;
  label: string;
  description: string;
  value: string | boolean | number;
  type: 'toggle' | 'select' | 'input' | 'text';
  options?: Array<{ label: string; value: string }>;
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  activeTab: 'general' | 'account' | 'notifications' | 'data' = 'general';

  generalSettings: SettingItem[] = [
    {
      id: 'app-name',
      label: 'Application Name',
      description: 'The name of your workspace',
      value: 'doDaily',
      type: 'input'
    },
    {
      id: 'timezone',
      label: 'Timezone',
      description: 'Set your default timezone',
      value: 'UTC-8',
      type: 'select',
      options: [
        { label: 'UTC-8 (Pacific)', value: 'UTC-8' },
        { label: 'UTC-5 (Eastern)', value: 'UTC-5' },
        { label: 'UTC+0 (UTC)', value: 'UTC+0' },
        { label: 'UTC+5:30 (India)', value: 'UTC+5:30' }
      ]
    },
    {
      id: 'startup-page',
      label: 'Startup Page',
      description: 'Choose which page opens when you launch',
      value: 'dashboard',
      type: 'select',
      options: [
        { label: 'Dashboard', value: 'dashboard' },
        { label: 'Tasks', value: 'tasks' },
        { label: 'Profile', value: 'profile' }
      ]
    },
    {
      id: 'auto-save',
      label: 'Auto-Save',
      description: 'Automatically save changes',
      value: true,
      type: 'toggle'
    },
    {
      id: 'keyboard-shortcuts',
      label: 'Show Keyboard Shortcuts',
      description: 'Display keyboard shortcut hints',
      value: true,
      type: 'toggle'
    }
  ];

  accountSettings: SettingItem[] = [
    {
      id: 'email-verified',
      label: 'Email Verification',
      description: 'Your email is verified',
      value: true,
      type: 'toggle'
    },
    {
      id: 'two-factor',
      label: 'Two-Factor Authentication',
      description: 'Add extra security to your account',
      value: false,
      type: 'toggle'
    },
    {
      id: 'session-timeout',
      label: 'Session Timeout',
      description: 'Auto-logout after inactivity',
      value: '30',
      type: 'select',
      options: [
        { label: '15 minutes', value: '15' },
        { label: '30 minutes', value: '30' },
        { label: '1 hour', value: '60' },
        { label: 'Never', value: '0' }
      ]
    },
    {
      id: 'connected-apps',
      label: 'Connected Applications',
      description: 'Manage third-party app access',
      value: '3 apps connected',
      type: 'text'
    }
  ];

  notificationSettings: SettingItem[] = [
    {
      id: 'email-notifications',
      label: 'Email Notifications',
      description: 'Receive email updates',
      value: true,
      type: 'toggle'
    },
    {
      id: 'push-notifications',
      label: 'Push Notifications',
      description: 'Get browser notifications',
      value: false,
      type: 'toggle'
    },
    {
      id: 'digest-frequency',
      label: 'Digest Frequency',
      description: 'How often you receive summaries',
      value: 'weekly',
      type: 'select',
      options: [
        { label: 'Daily', value: 'daily' },
        { label: 'Weekly', value: 'weekly' },
        { label: 'Monthly', value: 'monthly' }
      ]
    },
    {
      id: 'task-reminders',
      label: 'Task Reminders',
      description: 'Remind me about upcoming tasks',
      value: true,
      type: 'toggle'
    },
    {
      id: 'comment-notifications',
      label: 'Comment Notifications',
      description: 'Notify me of new comments',
      value: true,
      type: 'toggle'
    }
  ];

  dataSettings: SettingItem[] = [
    {
      id: 'auto-backup',
      label: 'Automatic Backups',
      description: 'Automatically backup your data',
      value: true,
      type: 'toggle'
    },
    {
      id: 'data-retention',
      label: 'Data Retention',
      description: 'How long to keep archived items',
      value: '90',
      type: 'select',
      options: [
        { label: '30 days', value: '30' },
        { label: '90 days', value: '90' },
        { label: '1 year', value: '365' },
        { label: 'Forever', value: '0' }
      ]
    },
    {
      id: 'analytics',
      label: 'Usage Analytics',
      description: 'Help improve doDaily with usage data',
      value: true,
      type: 'toggle'
    },
    {
      id: 'data-export',
      label: 'Data Export',
      description: 'Download your data as JSON',
      value: 'ready',
      type: 'text'
    }
  ];

  setActiveTab(tab: 'general' | 'account' | 'notifications' | 'data'): void {
    this.activeTab = tab;
  }

  onSettingChange(settingId: string, newValue: any): void {
    console.log(`Setting ${settingId} changed to:`, newValue);
  }

  resetToDefaults(): void {
    console.log('Reset settings to defaults');
  }

  saveAllSettings(): void {
    console.log('All settings saved');
  }

  exportData(): void {
    console.log('Exporting data...');
  }

  importData(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.click();
  }
}
