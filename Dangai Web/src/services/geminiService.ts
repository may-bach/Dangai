
import { GoogleGenAI } from "@google/genai";
import { NOVEL_TITLE } from '../constants';

// Note: Chapter content is now served from static markdown files.
// This service is preserved for potential future AI features.

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });
