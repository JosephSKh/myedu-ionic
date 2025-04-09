import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SubscribePage } from './subscribe.page';
import { By } from '@angular/platform-browser';
import { NavigationService } from '../services/navigation.service';

describe('SubscribePage', () => {
  let component: SubscribePage;
  let fixture: ComponentFixture<SubscribePage>;
  let navigationService: jasmine.SpyObj<NavigationService>;

  beforeEach(async () => {
    navigationService = jasmine.createSpyObj('NavigationService', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), FormsModule, SubscribePage],
      providers: [
        { provide: NavigationService, useValue: navigationService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SubscribePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form data', () => {
    expect(component.formData.name).toBe('');
    expect(component.formData.email).toBe('');
    expect(component.formData.childName).toBe('');
    expect(component.formData.birthDate).toBe('');
    expect(component.formData.birthMonth).toBe('');
    expect(component.formData.birthYear).toBe('');
    expect(component.formData.grade).toBe('');
    expect(component.formData.gender).toBe('');
    expect(component.formData.selectedTopics).toEqual([]);
  });

  it('should initialize with empty form errors', () => {
    expect(component.formErrors.name).toBe('');
    expect(component.formErrors.email).toBe('');
    expect(component.formErrors.childName).toBe('');
    expect(component.formErrors.birthDate).toBe('');
    expect(component.formErrors.birthMonth).toBe('');
    expect(component.formErrors.birthYear).toBe('');
    expect(component.formErrors.grade).toBe('');
    expect(component.formErrors.gender).toBe('');
    expect(component.formErrors.topics).toBe('');
  });

  it('should initialize with correct months array', () => {
    expect(component.months).toEqual([
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]);
  });

  it('should initialize with correct topics array', () => {
    expect(component.topics).toEqual(['Arabic', 'Islamic', 'English', 'History', 'Sports']);
  });

  it('should initialize with correct grades array', () => {
    expect(component.grades).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  });

  it('should initialize with correct years array', () => {
    const currentYear = new Date().getFullYear();
    const expectedYears = Array.from({length: 20}, (_, i) => currentYear - i);
    expect(component.years).toEqual(expectedYears);
  });

  it('should initialize with 31 days by default', () => {
    expect(component.days.length).toBe(31);
  });

  it('should update days correctly for February in a non-leap year', () => {
    component.formData.birthMonth = 'February';
    component.formData.birthYear = '2023';
    component.updateDays();
    expect(component.days.length).toBe(28);
  });

  it('should update days correctly for February in a leap year', () => {
    component.formData.birthMonth = 'February';
    component.formData.birthYear = '2024';
    component.updateDays();
    expect(component.days.length).toBe(29);
  });

  it('should update days correctly for months with 30 days', () => {
    component.formData.birthMonth = 'April';
    component.updateDays();
    expect(component.days.length).toBe(30);
  });

  it('should update days correctly for months with 31 days', () => {
    component.formData.birthMonth = 'January';
    component.updateDays();
    expect(component.days.length).toBe(31);
  });

  it('should reset birthDate if it exceeds the maximum days for the selected month', () => {
    component.formData.birthDate = '31';
    component.formData.birthMonth = 'April';
    component.updateDays();
    expect(component.formData.birthDate).toBe('');
  });

  it('should correctly identify leap years', () => {
    expect(component.isLeapYear(2020)).toBe(true);
    expect(component.isLeapYear(2024)).toBe(true);
    expect(component.isLeapYear(2023)).toBe(false);
    expect(component.isLeapYear(2021)).toBe(false);
    expect(component.isLeapYear(0)).toBe(false);
  });

  it('should handle onMonthChange correctly', () => {
    spyOn(component, 'updateDays');
    component.onMonthChange();
    expect(component.updateDays).toHaveBeenCalled();
  });

  it('should handle onYearChange correctly', () => {
    spyOn(component, 'updateDays');
    component.onYearChange();
    expect(component.updateDays).toHaveBeenCalled();
  });

  it('should handle onGenderChange correctly when checking a gender', () => {
    const event = { detail: { checked: true } };
    component.onGenderChange(event as any, 'Boy');
    expect(component.formData.gender).toBe('Boy');
  });

  it('should handle onGenderChange correctly when unchecking a gender', () => {
    component.formData.gender = 'Boy';
    const event = { detail: { checked: false } };
    component.onGenderChange(event as any, 'Boy');
    expect(component.formData.gender).toBe('');
  });

  it('should correctly check if a topic is selected', () => {
    component.formData.selectedTopics = ['Arabic', 'English'];
    expect(component.isTopicSelected('Arabic')).toBe(true);
    expect(component.isTopicSelected('History')).toBe(false);
  });

  it('should toggle topics correctly when adding a topic', () => {
    component.formData.selectedTopics = ['Arabic'];
    component.toggleTopic('English');
    expect(component.formData.selectedTopics).toEqual(['Arabic', 'English']);
  });

  it('should toggle topics correctly when removing a topic', () => {
    component.formData.selectedTopics = ['Arabic', 'English'];
    component.toggleTopic('Arabic');
    expect(component.formData.selectedTopics).toEqual(['English']);
  });

  it('should not add more than 3 topics', () => {
    component.formData.selectedTopics = ['Arabic', 'English', 'History'];
    component.toggleTopic('Sports');
    expect(component.formData.selectedTopics).toEqual(['Arabic', 'English', 'History']);
  });

  it('should validate form correctly when all fields are valid', () => {
    component.formData = {
      name: 'John Doe',
      email: 'john@example.com',
      childName: 'Jane Doe',
      birthDate: '15',
      birthMonth: 'January',
      birthYear: '2020',
      grade: '3',
      gender: 'Boy',
      selectedTopics: ['Arabic', 'English']
    };
    
    expect(component.validateForm()).toBe(true);
    expect(component.formErrors.name).toBe('');
    expect(component.formErrors.email).toBe('');
    expect(component.formErrors.childName).toBe('');
    expect(component.formErrors.birthDate).toBe('');
    expect(component.formErrors.grade).toBe('');
    expect(component.formErrors.gender).toBe('');
    expect(component.formErrors.topics).toBe('');
  });

  it('should validate form correctly when name is missing', () => {
    component.formData = {
      name: '',
      email: 'john@example.com',
      childName: 'Jane Doe',
      birthDate: '15',
      birthMonth: 'January',
      birthYear: '2020',
      grade: '3',
      gender: 'Boy',
      selectedTopics: ['Arabic', 'English']
    };
    
    expect(component.validateForm()).toBe(false);
    expect(component.formErrors.name).toBe('Name is required');
  });

  it('should validate form correctly when email is missing', () => {
    component.formData = {
      name: 'John Doe',
      email: '',
      childName: 'Jane Doe',
      birthDate: '15',
      birthMonth: 'January',
      birthYear: '2020',
      grade: '3',
      gender: 'Boy',
      selectedTopics: ['Arabic', 'English']
    };
    
    expect(component.validateForm()).toBe(false);
    expect(component.formErrors.email).toBe('Email is required');
  });

  it('should validate form correctly when email is invalid', () => {
    component.formData = {
      name: 'John Doe',
      email: 'invalid-email',
      childName: 'Jane Doe',
      birthDate: '15',
      birthMonth: 'January',
      birthYear: '2020',
      grade: '3',
      gender: 'Boy',
      selectedTopics: ['Arabic', 'English']
    };
    
    expect(component.validateForm()).toBe(false);
    expect(component.formErrors.email).toBe('Please enter a valid email address');
  });

  it('should validate form correctly when child name is missing', () => {
    component.formData = {
      name: 'John Doe',
      email: 'john@example.com',
      childName: '',
      birthDate: '15',
      birthMonth: 'January',
      birthYear: '2020',
      grade: '3',
      gender: 'Boy',
      selectedTopics: ['Arabic', 'English']
    };
    
    expect(component.validateForm()).toBe(false);
    expect(component.formErrors.childName).toBe('Child\'s name is required');
  });

  it('should validate form correctly when birth date is missing', () => {
    component.formData = {
      name: 'John Doe',
      email: 'john@example.com',
      childName: 'Jane Doe',
      birthDate: '',
      birthMonth: 'January',
      birthYear: '2020',
      grade: '3',
      gender: 'Boy',
      selectedTopics: ['Arabic', 'English']
    };
    
    expect(component.validateForm()).toBe(false);
    expect(component.formErrors.birthDate).toBe('Complete date of birth is required');
  });

  it('should validate form correctly when grade is missing', () => {
    component.formData = {
      name: 'John Doe',
      email: 'john@example.com',
      childName: 'Jane Doe',
      birthDate: '15',
      birthMonth: 'January',
      birthYear: '2020',
      grade: '',
      gender: 'Boy',
      selectedTopics: ['Arabic', 'English']
    };
    
    expect(component.validateForm()).toBe(false);
    expect(component.formErrors.grade).toBe('Grade is required');
  });

  it('should validate form correctly when gender is missing', () => {
    component.formData = {
      name: 'John Doe',
      email: 'john@example.com',
      childName: 'Jane Doe',
      birthDate: '15',
      birthMonth: 'January',
      birthYear: '2020',
      grade: '3',
      gender: '',
      selectedTopics: ['Arabic', 'English']
    };
    
    expect(component.validateForm()).toBe(false);
    expect(component.formErrors.gender).toBe('Gender is required');
  });

  it('should validate form correctly when no topics are selected', () => {
    component.formData = {
      name: 'John Doe',
      email: 'john@example.com',
      childName: 'Jane Doe',
      birthDate: '15',
      birthMonth: 'January',
      birthYear: '2020',
      grade: '3',
      gender: 'Boy',
      selectedTopics: []
    };
    
    expect(component.validateForm()).toBe(false);
    expect(component.formErrors.topics).toBe('Please select at least one topic');
  });

  it('should validate form correctly when more than 3 topics are selected', () => {
    component.formData = {
      name: 'John Doe',
      email: 'john@example.com',
      childName: 'Jane Doe',
      birthDate: '15',
      birthMonth: 'January',
      birthYear: '2020',
      grade: '3',
      gender: 'Boy',
      selectedTopics: ['Arabic', 'English', 'History', 'Sports']
    };
    
    expect(component.validateForm()).toBe(false);
    expect(component.formErrors.topics).toBe('Please select no more than 3 topics');
  });

  it('should redirect to Stripe checkout on form submission when form is valid', () => {
    component.formData = {
      name: 'John Doe',
      email: 'john@example.com',
      childName: 'Jane Doe',
      birthDate: '15',
      birthMonth: 'January',
      birthYear: '2020',
      grade: '3',
      gender: 'Boy',
      selectedTopics: ['Arabic', 'English']
    };
    
    component.onSubmit();
    
    expect(navigationService.navigate).toHaveBeenCalledWith(
      'https://js.stripe.com/v3/embedded-checkout-inner.html?publishableKey=pk_test_51HF0gZCJR1nkic2WnoloCeF2tR8ogJltEb028bXaSr8jDzAM4yKmFxFrbC5JiDYsKhuvqwAmJc75J1NgbrKwFO7I00L4EhhfIF&checkoutSessionId=cs_test_a1gagBBtq2nLVvNjeqOzbR4qHos8VYqbJTdt3tnfBWkHyyjYnqRDuP8ja8&ui_mode=embedded&__isDemoMode=true'
    );
  });

  it('should not redirect to Stripe checkout on form submission when form is invalid', () => {
    spyOn(console, 'log');
    
    component.formData = {
      name: '',
      email: 'john@example.com',
      childName: 'Jane Doe',
      birthDate: '15',
      birthMonth: 'January',
      birthYear: '2020',
      grade: '3',
      gender: 'Boy',
      selectedTopics: ['Arabic', 'English']
    };
    
    component.onSubmit();
    
    expect(navigationService.navigate).not.toHaveBeenCalled();
    expect(console.log).not.toHaveBeenCalled();
  });
}); 