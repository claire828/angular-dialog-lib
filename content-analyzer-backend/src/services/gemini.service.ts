/* eslint-disable no-console */

import { FunctionDeclaration, GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import puppeteer from 'puppeteer-extra';
// import StealthPlugin from 'puppeteer-extra-plugin-stealth';
dotenv.config({ path: 'content-analyzer-backend/.env' });
//  puppeteer.use(StealthPlugin());


interface WeatherParams {
  location: string;
  unit: string;
}


interface SearchParams {
  query: string;
  limit: number;
}



const webSearchToolConfig: FunctionDeclaration = {
  name: 'searchTool',
  description: 'Search the web using Google (no API key required)',
  parameters: {
    type: Type.OBJECT,
    properties: {
      query: {
        type: Type.STRING,
        description: 'Search query',
      },
      limit: {
        type: Type.NUMBER,
        description: 'Maximum number of results to return (default: 5)',
        minimum: 1,
        maximum: 10,
      },
    },
    required: ['query'],
  },
}

const currentWeatherToolConfig: FunctionDeclaration = {
  name: "currentWeatherTool",
  description: "Get the current weather in a given location",
  parameters: {
    type: Type.OBJECT,
    properties: {
      location: { type: Type.STRING, description: "The city and state, e.g. San Francisco, CA" },
      unit: { type: Type.STRING, enum: ["celsius", "fahrenheit"], description: "The temperature unit to use." },
    },
    required: ["location", "unit"],
  },
};

const tools: FunctionDeclaration[] = [currentWeatherToolConfig, webSearchToolConfig];

export class GeminiService {
  #contentAi = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
  readonly #toolMap = { currentWeatherTool: this.currentWeatherTool.bind(this), searchTool: this.searchTool.bind(this) };
  async generateContent() {
    console.log(`Get the current weather in San Francisco, CA in celsius`);
    const response = await this.#contentAi.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: 'search google for the updates of angular version 20',
      config: {
        tools: [{
          functionDeclarations: [...tools]
        }]
      }
    })

    if (response.functionCalls.length === 0) {
      console.log('Response:', response.text);
      return response.text;
    }

    const results = {};
    for (const call of response.functionCalls) {
      const fn = this.#toolMap[call.name];
      if (fn) {
        const result = await fn(call.args);
        results[call.name] = result;
      }
    }
    console.log('Function result:', results);
    return results;

  }

  async currentWeatherTool(params: WeatherParams) {
    const { location, unit } = params;
    return {
      location,
      temperature: "25°" + (unit.toLowerCase() === "celsius" ? "C" : "F"),
    };
  }

  // async searchTool({ query, limit }: SearchParams) {
  //   const resp = await fetch(`https://www.google.com/search?q=${encodeURIComponent(query)}`, {
  //     headers: {
  //       'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  //     }
  //   });
  //   const html = await resp.text();
  //   const $ = cheerio.load(html);
  //   const results: { title: string; url: string; description: string }[] = [];

  //   // 找到所有 h3 元素，並處理它的 parent <a>
  //   $('h3').each((_, el) => {
  //     const h3 = $(el);
  //     const a = h3.closest('a');
  //     const title = h3.text();
  //     const url = a.attr('href') || '';
  //     const desc = h3.parents('div.g').find('.VwiC3b').text();

  //     if (title && url.startsWith('http')) {
  //       results.push({ title, url, description: desc });
  //     }
  //   });

  //   return results.slice(0, limit);
  // }


  async searchTool({ query, limit }: SearchParams) {
    console.log('search', query, `https://www.google.com/search?q=${encodeURIComponent(query)}`);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // 設 user agent 避免被 google 識別為爬蟲
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    await page.mouse.move(100, 200); await page.mouse.move(150, 250, { steps: 10 }); await page.keyboard.type('Hello World', { delay: 100 });

    await page.goto(`https://www.google.com/search?q=${encodeURIComponent(query)}`, { waitUntil: 'networkidle2' });
    await new Promise(resolve => setTimeout(resolve, 2000));

    page.on('console', msg => {
      console.log('PAGE LOG:', msg.text());
    });

    console.log('Page loaded, extracting results...');
    const results = await page.evaluate(() => {
      const h3s = document.querySelectorAll('h3');
      return {
        count: h3s.length,
        links: Array.from(h3s).map(h3 => (h3.parentElement as HTMLAnchorElement)?.href).filter(Boolean)
      };
    });
    console.log('h3 count:', results.count);
    console.log('links:', results.links);

    const html = await page.content();
    require('fs').writeFileSync('google.html', html);

    await browser.close();
    console.log(`Found ${results.links.length} results for query "${query}"`);
    return results.links.slice(0, limit);
  }
}


export default new GeminiService();
