"""
Fashion AI Demo - Backend API
Uses Replicate OOTDiffusion for virtual try-on with garment transfer
"""

from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import replicate
import os
from typing import Optional
import base64
import httpx
from pydantic import BaseModel
import io
import tempfile

app = FastAPI(title="Fashion AI Demo API")

# CORS setup for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuration
REPLICATE_API_TOKEN = os.getenv("REPLICATE_API_TOKEN", "")

# Stock model images for virtual try-on
STOCK_MODELS = {
    "female_standing": "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=768&h=1024&fit=crop",
    "female_casual": "https://images.unsplash.com/photo-1541216970279-affbfdd55aa8?w=768&h=1024&fit=crop",
    "female_walking": "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=768&h=1024&fit=crop",
    "male_standing": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=768&h=1024&fit=crop",
    "male_casual": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=768&h=1024&fit=crop",
    "male_walking": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=768&h=1024&fit=crop",
}

class GenerationRequest(BaseModel):
    """Request model for image generation"""
    garment_image_url: str
    model_type: str = "female"
    pose: str = "standing"
    background: str = "studio_white"
    style: str = "commercial"

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "Fashion AI Demo API",
        "version": "1.0.0"
    }

@app.post("/generate")
async def generate_image(
    garment_image: UploadFile = File(...),
    model_type: str = Form("female"),
    pose: str = Form("standing"),
    background: str = Form("studio_white"),
    style: str = Form("commercial")
):
    """
    Generate virtual try-on image with uploaded garment using OOTDiffusion
    
    Args:
        garment_image: Image file of the garment
        model_type: Type of model (male/female)
        pose: Model pose (standing/casual/walking/sitting/hands_in_pockets)
        background: Background setting (not used in OOTDiffusion, for future)
        style: Photography style (not used in OOTDiffusion, for future)
    
    Returns:
        JSON with generated image URL and metadata
    """
    
    if not REPLICATE_API_TOKEN:
        raise HTTPException(
            status_code=500, 
            detail="REPLICATE_API_TOKEN not configured. Please set environment variable."
        )
    
    try:
        # Read uploaded garment image
        garment_bytes = await garment_image.read()
        
        # Select appropriate model image based on model_type and pose
        model_key = f"{model_type}_{pose}" if f"{model_type}_{pose}" in STOCK_MODELS else f"{model_type}_standing"
        model_image_url = STOCK_MODELS.get(model_key, STOCK_MODELS["female_standing"])
        
        # Download model image
        async with httpx.AsyncClient() as client:
            model_response = await client.get(model_image_url)
            model_bytes = model_response.content
        
        # Save to temporary files for Replicate
        with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as garment_file:
            garment_file.write(garment_bytes)
            garment_path = garment_file.name
            
        with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as model_file:
            model_file.write(model_bytes)
            model_path = model_file.name
        
        # Call OOTDiffusion via Replicate API for virtual try-on
        output = replicate.run(
            "viktorfa/oot_diffusion",
            input={
                "model_image": open(model_path, "rb"),
                "garment_image": open(garment_path, "rb")
            }
        )
        
        # Clean up temporary files
        os.unlink(garment_path)
        os.unlink(model_path)
        
        # Extract output URL
        if isinstance(output, list) and len(output) > 0:
            image_url = output[0]
        else:
            image_url = str(output)
        
        return JSONResponse({
            "success": True,
            "image_url": image_url,
            "parameters": {
                "model_type": model_type,
                "pose": pose,
                "model_key": model_key
            }
        })
        
    except Exception as e:
        # Clean up on error
        try:
            if 'garment_path' in locals():
                os.unlink(garment_path)
            if 'model_path' in locals():
                os.unlink(model_path)
        except:
            pass
        raise HTTPException(status_code=500, detail=f"Generation failed: {str(e)}")


def generate_garment_description(style: str) -> str:
    """Generate appropriate garment description based on style"""
    descriptions = {
        "commercial": "stylish modern clothing piece",
        "editorial": "high fashion designer garment",
        "casual": "comfortable casual wear",
        "luxury": "premium luxury fashion item"
    }
    return descriptions.get(style, "fashionable clothing item")


@app.post("/upload-garment")
async def upload_garment(file: UploadFile = File(...)):
    """
    Upload and temporarily store garment image
    Returns a reference that can be used for generation
    """
    try:
        # In production, upload to S3/Cloud Storage
        # For demo, return base64 or temporary URL
        image_bytes = await file.read()
        image_base64 = base64.b64encode(image_bytes).decode('utf-8')
        
        return JSONResponse({
            "success": True,
            "message": "Garment image uploaded successfully",
            "preview": f"data:image/jpeg;base64,{image_base64[:100]}...",  # Preview only
            "size": len(image_bytes)
        })
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", "8000"))
    uvicorn.run(app, host="0.0.0.0", port=port)
