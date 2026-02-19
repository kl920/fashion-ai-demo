# Frontend README

## Fashion AI Studio - Frontend

Modern, responsive web interface built with Next.js 14 and Tailwind CSS.

## Features

- 🎨 Beautiful, professional UI design
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Fast image uploads with preview
- 🎯 Intuitive controls for all generation parameters
- 💾 One-click image download
- ⏳ Loading states and error handling
- 🎭 Real-time generation preview

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Deployment**: Vercel-ready

## Project Structure

```
frontend/
├── app/
│   ├── page.tsx          # Main application page
│   ├── layout.tsx        # Root layout with metadata
│   └── globals.css       # Global styles and Tailwind
├── public/               # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

## Setup

### Local Development

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Edit .env.local and set API URL (default: http://localhost:8000)

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Create optimized production build
npm run build

# Run production server
npm start
```

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | Yes | `http://localhost:8000` | Backend API URL |

**Note**: Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

## Component Overview

### Main Page (`app/page.tsx`)

The main application is a single-page component with:

1. **Header**: Branding and version info
2. **Left Panel**: Upload and controls
   - Garment upload with preview
   - Model settings (type, pose)
   - Style settings (background, style)
   - Generate button
3. **Right Panel**: Results display
   - Generated image viewer
   - Download button
   - Loading and error states
   - Info box

### State Management

Uses React hooks for state:
- `garmentFile`: Uploaded file object
- `garmentPreview`: Preview URL for display
- `generatedImage`: URL of generated result
- `loading`: Generation in progress
- `error`: Error message if any
- Various parameter states (modelType, pose, etc.)

## UI Components

All components are inline in `page.tsx` for simplicity. For production, consider extracting:
- `UploadBox` component
- `SettingsPanel` component
- `ResultsPanel` component
- `ControlSelect` component

## Styling

Uses Tailwind CSS utility classes with custom theme:
- Primary color: Blue (#5b6fff)
- Clean, modern design aesthetic
- Glassmorphism effects
- Smooth transitions and animations

### Custom Animations

- Spinner for loading states
- Gradient backgrounds
- Hover effects on interactive elements

## API Integration

Uses Axios for HTTP requests:

```typescript
const response = await axios.post(`${API_URL}/generate`, formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
  timeout: 120000,
});
```

### Error Handling

Catches and displays:
- Network errors
- API errors
- Timeout errors
- Validation errors

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import repository in Vercel
3. Set root directory to `frontend`
4. Add environment variable: `NEXT_PUBLIC_API_URL`
5. Deploy

**Vercel Configuration:**
- Framework: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`

### Netlify

1. Connect GitHub repository
2. Set base directory: `frontend`
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Add environment variables

### Docker

```bash
# Build
docker build -t fashion-ai-frontend .

# Run
docker run -p 3000:3000 fashion-ai-frontend
```

## Performance Optimization

### Current Optimizations
- Next.js automatic code splitting
- Image optimization with Next/Image
- CSS purging with Tailwind
- Environment-based builds

### Future Improvements
- Add image compression before upload
- Implement progressive image loading
- Add service worker for offline support
- Implement result caching

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari 13+, Chrome Android

## Development Tips

### Hot Reload
Changes to files trigger automatic reload during development.

### TypeScript
Type checking runs automatically. Run manually:
```bash
npm run type-check
```

### Linting
```bash
npm run lint
```

## Customization

### Changing Colors

Edit `tailwind.config.js`:
```javascript
colors: {
  primary: {
    500: '#your-color',
    // ...
  }
}
```

### Adding New Parameters

1. Add state in `page.tsx`
2. Add select/input in UI
3. Include in form data when calling API

### Changing Layout

The grid layout uses Tailwind's responsive grid:
```jsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
```

Modify breakpoints in `tailwind.config.js` if needed.

## Troubleshooting

**Issue**: "Failed to fetch"
- Check if backend is running
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check CORS settings in backend

**Issue**: Images not loading
- Check Next.js image domains in `next.config.js`
- Verify image URLs are accessible

**Issue**: Styles not applying
- Run `npm run dev` to rebuild Tailwind
- Check for syntax errors in className

## Contributing

When adding features:
1. Maintain TypeScript types
2. Follow existing code style
3. Test on multiple screen sizes
4. Update this README if needed

## License

MIT License
