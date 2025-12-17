# Angul-It - Interactive CAPTCHA Challenge

An interactive multi-stage CAPTCHA web application designed to test and enhance user validation mechanisms through engaging visual and logical challenges.

## Features

- **Multi-stage CAPTCHA challenges**: Image selection, math puzzles, and text verification
- **State persistence**: Progress is saved and restored across browser refreshes
- **Responsive design**: Works seamlessly on desktop and mobile devices
- **Form validation**: Comprehensive input validation with error messages
- **Protected routing**: Results page is only accessible after completing challenges
- **Performance tracking**: Detailed statistics and completion metrics

## Technology Stack

- **Angular 17**: Latest version with standalone components support
- **TypeScript**: Strict mode enabled for better code quality
- **SCSS**: Modern styling with responsive design
- **RxJS**: Reactive programming for state management
- **Local Storage**: Client-side state persistence

## Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── guards/          # Route guards
│   │   ├── models/          # TypeScript interfaces
│   │   └── services/        # Business logic services
│   ├── pages/
│   │   ├── home/           # Landing page component
│   │   ├── captcha/        # Main challenge component
│   │   └── result/         # Results display component
│   └── shared/             # Reusable components
├── assets/
│   ├── data/              # CAPTCHA challenge data
│   └── images/            # Challenge images
└── styles.scss            # Global styles
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Angular CLI (`npm install -g @angular/cli`)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd angul-it
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Add CAPTCHA images** (Optional)
   - Add cat images to `src/assets/images/cats/`
   - Add dog images to `src/assets/images/dogs/`
   - Add CAPTCHA text image to `src/assets/images/captcha-text.png`
   
   *Note: The application will work without images, but they enhance the user experience*

4. **Start the development server**
   ```bash
   npm start
   # or
   ng serve
   ```

5. **Open your browser**
   Navigate to `http://localhost:4200`

## Usage

### Challenge Flow

1. **Home Page**: Introduction and challenge start
2. **Image Selection**: Select all images containing cats
3. **Math Puzzle**: Solve simple arithmetic problems
4. **Text Verification**: Enter text shown in CAPTCHA image
5. **Results**: View performance statistics and restart option

### Key Features

- **Progress Persistence**: Your progress is automatically saved
- **Navigation**: Move between completed stages
- **Validation**: Real-time form validation with error messages
- **Responsive**: Optimized for all screen sizes

## Development

### Available Scripts

```bash
# Development server
npm start

# Build for production
npm run build

# Run unit tests
npm test

# Run linting
npm run lint
```

### Architecture Highlights

- **Service-based state management**: Centralized state handling with RxJS
- **Route guards**: Prevent unauthorized access to results
- **Reactive forms**: Angular reactive forms with validation
- **Modular design**: Separation of concerns with clear component boundaries

## Customization

### Adding New Challenge Types

1. Create a new challenge type in `captcha-stage.model.ts`
2. Add challenge logic in `captcha-state.service.ts`
3. Update the CAPTCHA component template to handle the new type
4. Add validation logic for the new challenge

### Modifying Existing Challenges

- Update challenge data in `src/assets/data/captcha-data.json`
- Modify validation logic in `captcha-state.service.ts`
- Adjust UI components as needed

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.