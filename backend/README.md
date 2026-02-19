# Backend README

## Fashion AI Studio - Backend API

FastAPI server that handles AI image generation using Replicate API.

## Features

- Image upload and processing
- AI model integration (Flux/SDXL)
- Customizable generation parameters
- CORS enabled for frontend communication
- Production-ready with Docker support

## API Endpoints

### `GET /`
Health check endpoint

**Response:**
```json
{
  "status": "healthy",
  "service": "Fashion AI Demo API",
  "version": "1.0.0"
}
```

### `POST /generate`
Generate fashion model image with garment

**Parameters:**
- `garment_image` (file): Image file of the garment
- `model_type` (string): "female", "male", or "diverse"
- `pose` (string): "standing", "casual", "walking", "sitting", "hands_in_pockets"
- `background` (string): "studio_white", "studio_grey", "outdoor", "urban", "minimal"
- `style` (string): "commercial", "editorial", "casual", "luxury"

**Response:**
```json
{
  "success": true,
  "image_url": "https://replicate.delivery/...",
  "parameters": {
    "model_type": "female",
    "pose": "standing",
    "background": "studio_white",
    "style": "commercial"
  },
  "prompt": "Professional high-quality fashion photograph..."
}
```

## Setup

### Local Development

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env and add your REPLICATE_API_TOKEN

# Run server
python main.py
```

Server runs on `http://localhost:8000`

### Docker Deployment

```bash
# Build image
docker build -t fashion-ai-backend .

# Run container
docker run -p 8000:8000 -e REPLICATE_API_TOKEN=your_token fashion-ai-backend
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `REPLICATE_API_TOKEN` | Yes | API token from replicate.com |
| `PORT` | No | Server port (default: 8000) |

## API Costs

Approximate costs per image generation:
- Flux Dev: ~$0.025 per image
- SDXL: ~$0.01 per image
- Generation time: 20-60 seconds

## Error Handling

The API returns appropriate HTTP status codes:
- `200`: Successful generation
- `400`: Invalid request parameters
- `500`: Server or AI generation error

Error response format:
```json
{
  "detail": "Error description here"
}
```

## Production Deployment

### Railway

1. Push to GitHub
2. Create Railway project
3. Connect repository
4. Set environment variables
5. Deploy

### Render

1. Create Web Service
2. Connect repository
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables
6. Deploy

## Development Tips

- Use `uvicorn main:app --reload` for auto-reload during development
- Test endpoints with curl or Postman
- Monitor Replicate dashboard for usage and costs
- Implement caching for cost optimization in production

## Troubleshooting

**Issue**: "REPLICATE_API_TOKEN not configured"
- Solution: Add token to .env file

**Issue**: Generation timeout
- Solution: Increase timeout in frontend or use webhook for async processing

**Issue**: CORS errors
- Solution: Update CORS origins in main.py for production domain

## License

MIT License
