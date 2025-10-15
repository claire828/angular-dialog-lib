import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class GeminiService {
  private static readonly BASE_URL = 'https://generative-language.googleapis.com/v1beta';

  constructor(private readonly apiKey: string) { }

  async generateText(prompt: string): Promise<string> {
    const response = await fetch(`${GeminiService.BASE_URL}/models/gemini-1.5-pro/text:generateContent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        prompt,
        maxOutputTokens: 1024,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`Error generating text: ${response.statusText}`);
    }

    const data = await response.json();
    return data.candidates[0].content;
  }
}