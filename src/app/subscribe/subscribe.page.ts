import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CheckboxCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.page.html',
  styleUrls: ['./subscribe.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SubscribePage implements OnInit {
  formData = {
    name: '',
    email: '',
    childName: '',
    birthDate: '',
    birthMonth: '',
    birthYear: '',
    grade: '',
    gender: '',
    selectedTopics: [] as string[]
  };

  days = Array.from({length: 31}, (_, i) => i + 1);
  months = ['January', 'February', 'March', 'April', 'May', 'June', 
           'July', 'August', 'September', 'October', 'November', 'December'];
  years = Array.from({length: 20}, (_, i) => new Date().getFullYear() - i);
  grades = Array.from({length: 12}, (_, i) => i + 1);
  topics = ['Arabic', 'Islamic', 'English', 'History', 'Sports'];

  constructor() { }

  ngOnInit() {
  }

  onGenderChange(event: CheckboxCustomEvent, gender: string) {
    if (event.detail.checked) {
      this.formData.gender = gender;
      const otherGender = gender === 'Boy' ? 'Girl' : 'Boy';
      const otherCheckbox = document.querySelector(`ion-checkbox[value="${otherGender}"]`) as HTMLIonCheckboxElement;
      if (otherCheckbox) {
        otherCheckbox.checked = false;
      }
    } else {
      this.formData.gender = '';
    }
  }

  isTopicSelected(topic: string): boolean {
    return this.formData.selectedTopics.includes(topic);
  }

  toggleTopic(topic: string) {
    const index = this.formData.selectedTopics.indexOf(topic);
    if (index === -1) {
      if (this.formData.selectedTopics.length < 3) {
        this.formData.selectedTopics.push(topic);
      }
    } else {
      this.formData.selectedTopics.splice(index, 1);
    }
  }

  onSubmit() {
    console.log('Form submitted:', this.formData);
  }
} 