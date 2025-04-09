import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CheckboxCustomEvent } from '@ionic/angular';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.page.html',
  styleUrls: ['./subscribe.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SubscribePage implements OnInit {
  @ViewChild('subscribeForm') subscribeForm!: NgForm;
  
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

  formErrors = {
    name: '',
    email: '',
    childName: '',
    birthDate: '',
    birthMonth: '',
    birthYear: '',
    grade: '',
    gender: '',
    topics: ''
  };

  days: number[] = [];
  months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  years = Array.from({length: 20}, (_, i) => new Date().getFullYear() - i);
  grades = Array.from({length: 12}, (_, i) => i + 1);
  topics = ['Arabic', 'Islamic', 'English', 'History', 'Sports'];

  constructor(private navigationService: NavigationService) {
    this.updateDays();
  }

  ngOnInit() {}

  updateDays() {
    let maxDays = 31;
    const month = this.months.indexOf(this.formData.birthMonth) + 1;
    const year = parseInt(this.formData.birthYear);

    if (month === 2) { // February
      maxDays = this.isLeapYear(year) ? 29 : 28;
    } else if ([4, 6, 9, 11].includes(month)) { // April, June, September, November
      maxDays = 30;
    }

    // If the currently selected day is greater than maxDays, reset it
    if (parseInt(this.formData.birthDate) > maxDays) {
      this.formData.birthDate = '';
    }

    this.days = Array.from({length: maxDays}, (_, i) => i + 1);
  }

  isLeapYear(year: number): boolean {
    if (!year) return false;
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }

  onMonthChange() {
    this.updateDays();
  }

  onYearChange() {
    this.updateDays();
  }

  onGenderChange(event: CheckboxCustomEvent, gender: string) {
    if (event.detail.checked) {
      this.formData.gender = gender;
      // Uncheck the other checkbox
      const otherGender = gender === 'Boy' ? 'Girl' : 'Boy';
      const otherCheckbox = document.querySelector(`ion-checkbox[value="${otherGender}"]`) as HTMLIonCheckboxElement;
      if (otherCheckbox) {
        otherCheckbox.checked = false;
      }
    } else {
      // If unchecking, clear the gender
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

  validateForm(): boolean {
    let isValid = true;
    this.formErrors = {
      name: '',
      email: '',
      childName: '',
      birthDate: '',
      birthMonth: '',
      birthYear: '',
      grade: '',
      gender: '',
      topics: ''
    };

    // Name validation
    if (!this.formData.name.trim()) {
      this.formErrors.name = 'Name is required';
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!this.formData.email.trim()) {
      this.formErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(this.formData.email)) {
      this.formErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Child's name validation
    if (!this.formData.childName.trim()) {
      this.formErrors.childName = 'Child\'s name is required';
      isValid = false;
    }

    // Birth date validation
    if (!this.formData.birthDate || !this.formData.birthMonth || !this.formData.birthYear) {
      this.formErrors.birthDate = 'Complete date of birth is required';
      isValid = false;
    }

    // Grade validation
    if (!this.formData.grade) {
      this.formErrors.grade = 'Grade is required';
      isValid = false;
    }

    // Gender validation
    if (!this.formData.gender) {
      this.formErrors.gender = 'Gender is required';
      isValid = false;
    }

    // Topics validation
    if (this.formData.selectedTopics.length === 0) {
      this.formErrors.topics = 'Please select at least one topic';
      isValid = false;
    } else if (this.formData.selectedTopics.length > 3) {
      this.formErrors.topics = 'Please select no more than 3 topics';
      isValid = false;
    }

    return isValid;
  }

  onSubmit() {
    if (this.validateForm()) {
      console.log('Form submitted:', this.formData);
      this.navigationService.navigate('https://js.stripe.com/v3/embedded-checkout-inner.html?publishableKey=pk_test_51HF0gZCJR1nkic2WnoloCeF2tR8ogJltEb028bXaSr8jDzAM4yKmFxFrbC5JiDYsKhuvqwAmJc75J1NgbrKwFO7I00L4EhhfIF&checkoutSessionId=cs_test_a1gagBBtq2nLVvNjeqOzbR4qHos8VYqbJTdt3tnfBWkHyyjYnqRDuP8ja8&ui_mode=embedded&__isDemoMode=true');
    }
  }
} 