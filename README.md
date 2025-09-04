# Math Whiz!

A fun, interactive math practice game designed to help users improve their arithmetic skills through timed challenges.

![Math Whiz Game](https://via.placeholder.com/800x400?text=Math+Whiz+Game)

## Overview

Math Whiz! is a web-based application that allows users to practice basic arithmetic operations (addition, subtraction, multiplication, and division) in a gamified environment. The game presents math problems based on user-selected settings and tracks scores to encourage improvement over time.

## Features

- **Multiple Math Operations**: Practice addition, subtraction, multiplication, and division
- **Customizable Difficulty**: Set the highest number to use in problems (10-1000)
- **Adjustable Game Duration**: Choose how long you want to play (10-180 seconds)
- **Score Tracking**: Keep track of your current score and high scores for each game configuration
- **Multilingual Support**: Available in English, Dutch (Nederlands), and French (Français)
- **Responsive Design**: Works on desktop and mobile devices
- **Visual Feedback**: Animations for correct and incorrect answers
- **Settings Persistence**: Game remembers your last used settings

## How to Play

1. **Setup**: Enter your name, select the math operation, set the highest number to use, and choose the game duration
2. **Start**: Click "Start Game!" to begin
3. **Play**: Solve as many math problems as you can within the time limit
   - Type your answer in the input field
   - Press Enter to submit
   - Correct answers increase your score
   - Incorrect answers allow you to try again
4. **Game Over**: When time runs out, see your final score and whether you've achieved a new high score
5. **Replay**: Choose to play again with the same settings or change settings for a new challenge

## Technical Details

### File Structure

- `index.html` - The main setup page where users configure game settings
- `game.html` - The actual gameplay page
- `game.js` - JavaScript code that handles game logic
- `style.css` - Styling for the application
- `translations.js` - Handles multilingual support

### Technologies Used

- **HTML5**: Structure and content
- **CSS3**: Styling and animations
- **JavaScript**: Game logic and interactivity
- **LocalStorage API**: Saving high scores and user preferences

### Key Features Implementation

- **Problem Generation**: Problems are dynamically generated based on the selected operation and difficulty level
- **Score Tracking**: High scores are stored in localStorage, separated by game configuration
- **Internationalization**: Custom i18n implementation with support for multiple languages
- **Timer**: Visual and numerical countdown to create a sense of urgency
- **Responsive Design**: Flexbox and media queries ensure the game works on various screen sizes

## Customization

### Adding New Languages

To add a new language, edit the `translations.js` file and add a new dictionary entry:

```javascript
const dictionaries = {
    // Existing languages...
    
    // Add your new language
    'language-code': {
        app_title: 'Translated Title',
        // Add all other translation keys
    }
};
```

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue to suggest improvements or report bugs.

## Future Improvements

- Add more operation types (exponents, square roots, etc.)
- Implement difficulty levels that adjust based on player performance
- Add sound effects and more visual feedback
- Create a multiplayer mode for competitions
- Develop a progressive web app (PWA) version for offline use
- Add touch support for mobile use (that doesn't require a keyboard)