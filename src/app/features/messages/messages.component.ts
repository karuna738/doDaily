import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  outgoing: boolean;
  attachment?: {
    name: string;
    size: number;
  };
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  unread: number;
  online: boolean;
  messages: Message[];
}

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent implements OnInit {
  conversations: Conversation[] = [];
  selectedConversation: Conversation | null = null;
  newMessage = '';
  searchQuery = '';
  profilePanelOpen = false;

  ngOnInit(): void {
    this.conversations = [
      {
        id: 'c1',
        name: 'Sarah Lee',
        avatar: 'SL',
        lastMessage: 'Got it — I’ll update the design soon.',
        unread: 2,
        online: true,
        messages: [
          { id: 'm1', sender: 'Sarah', content: 'Hi! Can you review the new header styles?', timestamp: '2026-04-02 14:10', outgoing: false },
          { id: 'm2', sender: 'You', content: 'Looks good, I’ll adjust spacing and send feedback.', timestamp: '2026-04-02 14:12', outgoing: true },
          { id: 'm3', sender: 'Sarah', content: 'Got it — I’ll update the design soon.', timestamp: '2026-04-02 14:15', outgoing: false }
        ]
      },
      {
        id: 'c2',
        name: 'John Smith',
        avatar: 'JS',
        lastMessage: 'We should sync about MVP timelines.',
        unread: 0,
        online: false,
        messages: [
          { id: 'm4', sender: 'John', content: 'Reminder: sprint planning at 3pm.', timestamp: '2026-04-01 09:00', outgoing: false },
          { id: 'm5', sender: 'You', content: 'Thanks! I’ll be ready with the list.', timestamp: '2026-04-01 09:02', outgoing: true },
          { id: 'm6', sender: 'John', content: 'We should sync about MVP timelines.', timestamp: '2026-04-01 09:05', outgoing: false }
        ]
      },
      {
        id: 'c3',
        name: 'Emma Wilson',
        avatar: 'EW',
        lastMessage: 'Great news — release candidate is on track.',
        unread: 1,
        online: true,
        messages: [
          { id: 'm7', sender: 'Emma', content: 'Can you confirm the API changes?', timestamp: '2026-04-01 16:20', outgoing: false },
          { id: 'm8', sender: 'You', content: 'Confirmed, I pushed updates to the doc.', timestamp: '2026-04-01 16:30', outgoing: true },
          { id: 'm9', sender: 'Emma', content: 'Great news — release candidate is on track.', timestamp: '2026-04-01 16:35', outgoing: false }
        ]
      }
    ];
    this.selectedConversation = this.conversations[0];
  }

  get filteredConversations(): Conversation[] {
    if (!this.searchQuery.trim()) {
      return this.conversations;
    }
    const query = this.searchQuery.toLowerCase();
    return this.conversations.filter(conv => conv.name.toLowerCase().includes(query) || conv.lastMessage.toLowerCase().includes(query));
  }

  selectConversation(conv: Conversation): void {
    this.selectedConversation = conv;
    conv.unread = 0;
  }

  toggleProfilePanel(): void {
    this.profilePanelOpen = !this.profilePanelOpen;
  }

  addEmoji(emoji: string): void {
    this.newMessage += emoji;
  }

  handleFileUpload(event: Event): void {
    if (!this.selectedConversation) return;

    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const message: Message = {
      id: `${Date.now()}`,
      sender: 'You',
      content: `Uploaded file: ${file.name}`,
      timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
      outgoing: true,
      attachment: {
        name: file.name,
        size: file.size
      }
    };

    this.selectedConversation.messages.push(message);
    this.selectedConversation.lastMessage = message.content;
    input.value = '';
  }

  sendMessage(): void {
    if (!this.newMessage.trim() || !this.selectedConversation) return;

    const message: Message = {
      id: `${Date.now()}`,
      sender: 'You',
      content: this.newMessage.trim(),
      timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
      outgoing: true
    };

    this.selectedConversation.messages.push(message);
    this.selectedConversation.lastMessage = this.newMessage.trim();
    this.newMessage = '';
    setTimeout(() => {
      this.selectedConversation = this.selectedConversation; // re-render safe
    }, 0);
  }
}
