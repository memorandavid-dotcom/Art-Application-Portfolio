import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini API client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// API Routes
app.post("/api/critique", async (req, res) => {
  try {
    const { artTitle, style, material, emotion, notes } = req.body;
    if (!artTitle || !style || !emotion) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const systemPrompt = `You are a warm, highly knowledgeable, and encouraging Art History and Studio Art Professor. Your goal is to review a student's portfolio submission and provide an insightful critique.

You will receive details about:
- The artwork's title
- The art style/theme (e.g., Minimalism, Pop Art, Impressionism, Surrealism, Charcoal Sketching)
- The materials/medium used
- The emotion or feeling the student wanted to convey
- Personal student notes or reflections about the creation process

Analyze the submission based on the chosen art technique, how well the selected materials align with the intended emotion, and the technical conventions of that art style.
Provide the critique in JSON format conforming to the requested schema. Provide deep, professional, yet student-friendly insights. Be authentic, encouraging, and constructive. Give them an academic grade (e.g. A, A-, B+) based on how thoughtful their reflection is.`;

    const prompt = `Student Submission:
Title: "${artTitle}"
Art Style: ${style}
Medium/Materials: ${material}
Intended Emotion/Theme: "${emotion}"
Student's Reflection: "${notes || "No reflection written."}"

Please critique my work and reflection!`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            grade: { type: Type.STRING, description: "Academic grade, e.g., 'A', 'A+', 'A-'" },
            formalCritique: { type: Type.STRING, description: "Constructive feedback analyzing composition, style, and technique." },
            emotionalResonance: { type: Type.STRING, description: "Analysis of how successfully the materials and style evoke the intended emotion." },
            creativeSuggestion: { type: Type.STRING, description: "A creative prompt or technical trick for the student to try next to push this further." },
            materialsInsight: { type: Type.STRING, description: "Insight into how their chosen materials (e.g., charcoal, acrylic, ink) carry meaning." }
          },
          required: ["grade", "formalCritique", "emotionalResonance", "creativeSuggestion", "materialsInsight"]
        }
      }
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    console.error("Critique API error:", error);
    res.status(500).json({ error: error.message || "An error occurred during critique generation" });
  }
});

app.post("/api/emotion-palette", async (req, res) => {
  try {
    const { emotion } = req.body;
    if (!emotion) {
      return res.status(400).json({ error: "Emotion is required" });
    }

    const systemPrompt = `You are an expert expressive art therapist and studio art instructor. Given an emotion or mood, you generate a customized 'Creative Palette recipe' that guides a student in how to express this feeling visually.

Choose:
1. A matching historic or modern Art Style/Technique (e.g. Pop Art, German Expressionism, Abstract Expressionism, Pointillism, Chiaroscuro).
2. Recommended Art Materials (e.g., soft dry pastels on black paper, gouache and heavy sponge, thick impasto oil).
3. A curated Color Palette of 4 specific colors with hex codes, name, and psychological meaning for this emotion.
4. Brushwork / Application technique (e.g. rapid jagged strokes, wet-on-wet blend, geometric scraping).
5. A conceptual starting prompt (e.g. 'Paint the shape of your breath as it changes from sharp to smooth').

Return your answer strictly in JSON matching the specified schema. Keep it deeply artistic and inspiring.`;

    const prompt = `Generate a creative recipe for the emotion: "${emotion}"`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendedStyle: { type: Type.STRING, description: "e.g., 'Abstract Expressionism' or 'Neo-Expressionist Splatter'" },
            styleDescription: { type: Type.STRING, description: "Why this style corresponds to the emotion." },
            materials: { type: Type.STRING, description: "Recommended mediums and paper/canvas types." },
            brushwork: { type: Type.STRING, description: "How to physically apply the medium (strokes, pressure, motion)." },
            colors: {
              type: Type.ARRAY,
              description: "4 complementary colors representing this feeling.",
              items: {
                type: Type.OBJECT,
                properties: {
                  hex: { type: Type.STRING, description: "Hex color code starting with #" },
                  name: { type: Type.STRING, description: "Evocative name of the color" },
                  meaning: { type: Type.STRING, description: "Why it represents this emotion" }
                },
                required: ["hex", "name", "meaning"]
              }
            },
            conceptualPrompt: { type: Type.STRING, description: "A starting drawing or painting prompt." }
          },
          required: ["recommendedStyle", "styleDescription", "materials", "brushwork", "colors", "conceptualPrompt"]
        }
      }
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    console.error("Emotion Palette error:", error);
    res.status(500).json({ error: error.message || "An error occurred generating emotion palette" });
  }
});

// Setup Vite Dev Server / Static Asset Serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
