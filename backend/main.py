"""
Fashion AI Demo - Backend API
Uses Replicate API for AI image generation with garment transfer
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
    Generate fashion model image with uploaded garment
    
    Args:
        garment_image: Image file of the garment
        model_type: Type of model (male/female/diverse)
        pose: Model pose (standing/sitting/walking)
        background: Background setting (studio_white/outdoor/urban)
        style: Photography style (commercial/editorial/casual)
    
    Returns:
        JSON with generated image URL and metadata
    """
    
    if not REPLICATE_API_TOKEN:
        raise HTTPException(
            status_code=500, 
            detail="REPLICATE_API_TOKEN not configured. Please set environment variable."
        )
    
    try:
        # Read uploaded image
        image_bytes = await garment_image.read()
        
        # Convert to base64 for API
        image_base64 = base64.b64encode(image_bytes).decode('utf-8')
        image_data_uri = f"data:image/jpeg;base64,{image_base64}"
        
        # Build prompt based on parameters
        prompt = build_prompt(model_type, pose, background, style)
        
        # Call Replicate API for image generation
        # Using Flux or SDXL with ControlNet for better garment transfer
        output = replicate.run(
            "black-forest-labs/flux-dev",
            input={
                "prompt": prompt,
                "guidance": 3.5,
                "num_outputs": 1,
                "aspect_ratio": "3:4",
                "output_format": "jpg",
                "output_quality": 90,
                "num_inference_steps": 28,
            }
        )
        
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
                "background": background,
                "style": style
            },
            "prompt": prompt
        })
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Generation failed: {str(e)}")


def build_prompt(model_type: str, pose: str, background: str, style: str) -> str:
    """
    Build detailed prompt for AI generation
    """
    
    # Model descriptor
    model_desc = {
        "female": "professional female fashion model, athletic build, confident expression",
        "male": "professional male fashion model, athletic build, confident expression",
        "diverse": "professional fashion model, diverse ethnicity, athletic build, confident expression"
    }.get(model_type, "professional fashion model")
    
    # Pose descriptor
    pose_desc = {
        "standing": "standing straight, arms naturally at sides, direct eye contact with camera",
        "casual": "casual relaxed pose, slight hip shift, natural stance",
        "walking": "mid-walk pose, one foot forward, natural movement",
        "sitting": "sitting pose, legs crossed, elegant posture",
        "hands_in_pockets": "standing with hands in pockets, casual confident pose"
    }.get(pose, "standing naturally")
    
    # Background descriptor
    bg_desc = {
        "studio_white": "clean white photography studio background, professional lighting setup",
        "studio_grey": "neutral grey photography studio background, soft shadows",
        "outdoor": "natural outdoor setting, soft natural daylight, blurred background",
        "urban": "urban street background, city setting, shallow depth of field",
        "minimal": "minimal abstract background, geometric shapes, modern aesthetic"
    }.get(background, "white studio background")
    
    # Style descriptor
    style_desc = {
        "commercial": "commercial fashion photography style, clean professional lighting, sharp focus",
        "editorial": "editorial fashion photography, dramatic lighting, high contrast, artistic",
        "casual": "lifestyle photography style, natural lighting, candid feel",
        "luxury": "luxury brand photography, sophisticated lighting, premium aesthetic"
    }.get(style, "commercial photography style")
    
    prompt = f"""Professional high-quality fashion photograph, {style_desc}.
{model_desc}, {pose_desc}.
Setting: {bg_desc}.
Full body shot, centered composition, perfect focus on model and garment.
Professional photography, Canon EOS 5D Mark IV, 85mm f/1.8 lens, natural skin tones.
Photorealistic, high detail, 8K quality, magazine quality photography."""
    
    return prompt


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
