"""
MedGuardian — Legal AI Chatbot (Azure OpenAI)
Indian law specialist with Bihar jurisdiction focus
"""
import os
from fastapi import APIRouter
from pydantic import BaseModel
from openai import AzureOpenAI

router = APIRouter(prefix="/legal", tags=["Legal Chatbot"])

SYSTEM_PROMPT = """You are an AI legal assistant specialized in Indian law with emphasis on practical citizen guidance and Bihar jurisdiction.

IMPORTANT INSTRUCTION ON RESPONSE LENGTH:
- DEFAULT: Be CRISP and CONCISE. Give short, direct answers in 200-400 words max.
- Use bullet points and short sentences. Skip lengthy preambles.
- Only provide the MOST relevant 1-2 statutes/sections, not exhaustive lists.
- Only elaborate fully (detailed sections, templates, case law) if the user EXPLICITLY asks to "elaborate", "explain in detail", "give more details", or asks a very complex multi-part question.
- Prioritize actionable steps over theoretical explanations.

When answering:
1. Identify the legal issue in one line.
2. Cite the most relevant law/section (bare text + plain English, keep brief).
3. Explain how it applies to the user's facts (2-3 sentences).
4. Give 3-5 practical next steps (bullet points).
5. Add a one-line Bihar-specific note if relevant.
6. End with a one-line disclaimer.

Format with short headings: Issue · Key Law · Application · Steps · Disclaimer

If the user asks to elaborate, THEN provide the full detailed format:
• Issue Identified
• Relevant Laws & Sections (Statute – Section – Bare Text – Plain English Summary)
• Application to Facts
• Procedural Steps
• Draft Template (if applicable)
• Disclaimer

Respond in clear English; include Hindi terms where helpful."""


class ChatRequest(BaseModel):
    message: str
    history: list = []


class ChatResponse(BaseModel):
    reply: str
    error: str = None


@router.post("/chat", response_model=ChatResponse)
async def legal_chat(req: ChatRequest):
    """Send a legal query to the AI assistant."""
    endpoint = os.getenv("AZURE_OPENAI_ENDPOINT", "")
    api_key = os.getenv("AZURE_OPENAI_API_KEY", "")
    deployment = os.getenv("AZURE_OPENAI_DEPLOYMENT_NAME", "gpt-5-mini")
    api_version = os.getenv("AZURE_OPENAI_API_VERSION", "2024-12-01-preview")

    if not endpoint or not api_key:
        return ChatResponse(reply="", error="Azure OpenAI credentials not configured")

    try:
        client = AzureOpenAI(
            azure_endpoint=endpoint,
            api_key=api_key,
            api_version=api_version,
        )

        # Build messages
        messages = [{"role": "system", "content": SYSTEM_PROMPT}]

        # Add conversation history (last 10)
        for msg in req.history[-10:]:
            messages.append({
                "role": msg.get("role", "user"),
                "content": msg.get("content", ""),
            })

        # Add current message
        messages.append({"role": "user", "content": req.message})

        response = client.chat.completions.create(
            model=deployment,
            messages=messages,
            max_completion_tokens=3000,
        )

        reply = response.choices[0].message.content

        # Handle None or empty content (reasoning models may consume all tokens on thinking)
        if not reply:
            choice = response.choices[0]
            if hasattr(choice.message, 'refusal') and choice.message.refusal:
                reply = f"The AI declined to answer: {choice.message.refusal}"
            else:
                reply = f"⚠️ The AI returned an empty response (finish_reason: {choice.finish_reason}). Please try a simpler question or ask me to elaborate on a specific topic."

        return ChatResponse(reply=reply)

    except Exception as e:
        return ChatResponse(reply="", error=f"AI service error: {str(e)}")

