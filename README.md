# MyEdu Ionic Application

A mobile application built with Ionic and Angular for educational purposes.

## Overview

MyEdu is an educational platform that allows users to subscribe to educational content. The application features a subscription form where users can provide information about themselves and their children, including topics of interest.

## Features

- User registration and subscription
- Child information management
- Topic selection for educational content
- Responsive design for mobile and desktop
- Form validation
- Integration with Stripe for payment processing

## Technologies Used

- [Ionic](https://ionicframework.com/) - Cross-platform UI toolkit
- [Angular](https://angular.io/) - Frontend framework
- [TypeScript](https://www.typescriptlang.org/) - Programming language
- [Stripe](https://stripe.com/) - Payment processing

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Ionic CLI

## Installation

1. Install dependencies:

   ```
   npm install
   ```
3. Run the application:

   ```
   npm start
   ```

## Project Structure

- `src/app/` - Main application code
  - `home/` - Home page components
  - `subscribe/` - Subscription page components

## Testing

Run the unit tests:

```
ng test
```

## Building for Production

Build the application for production:

```
ionic build --prod
```

## Deployment

The application can be deployed to various platforms:

- iOS
- Android
- Web
