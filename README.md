# Morse Code Learning & Reference Tool

A complete, production-ready static website for learning, translating, and practicing Morse code. This educational tool includes an interactive bidirectional translator, comprehensive reference tables, educational content, and an interactive practice game.

## Features

- **Bidirectional Morse Code Translator**: Convert text to Morse code and Morse code to text
- **Comprehensive Reference Tables**: Complete alphabet, numbers, and punctuation reference
- **Educational Content**: Learn the history, mechanics, and applications of Morse code
- **Interactive Practice Game**: Test your skills with decode and encode practice modes
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Accessible**: Built with accessibility best practices
- **Fast Performance**: No external dependencies, minimal JavaScript, optimized for speed

## Technology Stack

- HTML5
- CSS3
- Vanilla JavaScript
- No backend required
- No external APIs
- No frameworks

## Project Structure

```
/
├── index.html          # Main HTML file
├── style.css           # CSS styling
├── script.js           # JavaScript functionality
├── favicon.svg         # SVG favicon
└── README.md           # This file
```

## Local Development

1. Clone or download this repository
2. Open `index.html` in a web browser
3. The website will work immediately without any setup

## Deployment to GitHub Pages

### Option 1: Using GitHub Web Interface

1. Create a new repository on GitHub (e.g., `morse-code-learning`)
2. Upload all files to the repository:
   - `index.html`
   - `style.css`
   - `script.js`
   - `favicon.svg`
   - `README.md`
3. Go to repository Settings → Pages
4. Under "Source", select the branch (usually `main` or `master`)
5. Click "Save"
6. Your site will be available at `https://yourusername.github.io/repository-name/`

### Option 2: Using Git Command Line

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit"

# Add remote repository (replace with your repository URL)
git remote add origin https://github.com/yourusername/morse-code-learning.git

# Push to GitHub
git branch -M main
git push -u origin main
```

Then follow steps 3-6 from Option 1 to enable GitHub Pages.

### Option 3: Using GitHub CLI

```bash
# Create repository and push
gh repo create morse-code-learning --public --source=.
git push -u origin main
```

Then enable GitHub Pages in repository settings.

## Customization

### Update Canonical URL

In `index.html`, update the canonical URL and structured data URLs:

```html
<link rel="canonical" href="https://yourusername.github.io/morse-code-learning/">
```

And in the JSON-LD structured data:

```json
"url": "https://yourusername.github.io/morse-code-learning/"
```

### Update Branding

To change the website name or tagline, modify the following in `index.html`:
- Header logo text
- Hero section H1 and supporting text
- Footer brand information
- Meta title and description

### Modify Colors

The CSS uses CSS custom properties (variables) for easy color customization. In `style.css`, modify the `:root` section:

```css
:root {
    --primary-color: #2563eb;
    --primary-hover: #1d4ed8;
    --secondary-color: #64748b;
    /* ... other variables */
}
```

## Features in Detail

### Morse Code Translator

- **Text to Morse**: Enter regular text and get Morse code output
- **Morse to Text**: Enter Morse code and get readable text
- **Supported Characters**: A-Z, 0-9, and common punctuation
- **Word Separation**: Uses `/` to separate words in Morse code
- **Copy to Clipboard**: Easily copy translations
- **Example Button**: Load example text for testing

### Reference Tables

- **Alphabet**: Complete A-Z Morse code reference
- **Numbers**: 0-9 Morse code reference
- **Punctuation**: Common punctuation marks in Morse code
- **Responsive Design**: Tables adapt to mobile screens

### Educational Content

- What is Morse Code?
- How Morse Code Works
- Dot and Dash explanation
- How to Read Morse Code
- Memorization Techniques
- Modern Applications

### Practice Game

- **Decode Mode**: Identify letters from Morse code
- **Encode Mode**: Select correct Morse code for letters
- **Score Tracking**: Track your progress
- **Random Questions**: Endless practice opportunities
- **Immediate Feedback**: Learn from mistakes

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Minimal JavaScript (no external libraries)
- Optimized CSS
- No render-blocking resources
- Fast loading times
- Mobile-optimized

## Accessibility

- Semantic HTML5
- ARIA labels where needed
- Keyboard navigation support
- Focus states for interactive elements
- Proper color contrast
- Screen reader friendly

## License

This project is open source and available for educational purposes.

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## Support

For issues or questions, please open an issue on the GitHub repository.

---

**Note**: This is a static website designed for GitHub Pages deployment. No backend, database, or server-side processing is required. All functionality runs client-side in the browser.