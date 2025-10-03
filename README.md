## Developer-Card Generator
A professional developer profile card generator that creates beautiful, customizable cards in JSON format with VS Code-inspired styling. Generate, download, and share your developer profile across multiple formats.

<div align="center">
  <img src="./public/devcard-preview.png" alt="DevCard Generator" width="600"/>
</div>

**Live Site:** ![Live Link]()

- Multi-Format Export: Download your card as JSON, PNG, or PDF
- VS Code Inspired: Dark/Light theme support with syntax highlighting
- Professional Design: Clean, modern interface with smooth animations
- Social Integration: Direct links to GitHub and X profiles
- Clipboard Support: One-click JSON copying
- Responsive Design: Works perfectly on all device sizes

## Tech Stack
1. Frontend: React 18 + Vite
2. Styling: Tailwind CSS
3. Export: jsPDF for PDF generation, Canvas for PNG export
4. Icons: Heroicons SVG icons
5. Build Tool: Vite for fast development and optimized builds

## Installation
1. Clone the repository
```bash
git clone https://github.com/bethwel3001/devcard.git
cd devcard
```
2. Install dependencies
```bash
npm install
```
3. Start dev server
```bash
npm run dev
```
## Usage
*Fill out the form with your professional information:*

- Full Name
- Email Address
- Job Title
- GitHub Username
- X Username (optional)
- Click "Generate Developer Card" to create your card
- Choose your preferred download format:
- JSON: Raw data file for developers
- PNG: High-quality screenshot for sharing
- PDF: Printable document format
- Use additional options:
- Copy JSON to clipboard
- Share on X platform
- Access direct profile links

## Configuration
*The application supports the following configurations:*

- Theme: Automatic dark/light mode detection with manual toggle
- Export Quality: High-resolution PNG and PDF exports
- Custom Styling: VS Code-inspired color schemes
- Responsive Breakpoints: Mobile-first responsive design

## Contributing
*We welcome contributions! Please follow these steps:*

- Fork the repository
- Create a feature branch: git checkout -b feature/amazing-feature
- Commit your changes: git commit -m 'Add amazing feature'
- Push to the branch: git push origin feature/amazing-feature
- Open a Pull Request

## Development Guidelines
*Follow React best practices and hooks conventions*

- Use Tailwind CSS for styling
- Ensure responsive design works on all screen sizes
- Maintain consistent code formatting
- Add appropriate error handling
- Test all export functionality

