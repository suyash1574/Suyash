export type PortfolioAssistantMessage = {
  role: "user" | "assistant";
  content: string;
};

type AssistantProvider = {
  id: "nvidia-nim" | "groq";
  apiKey: string;
  endpoint: string;
  model: string;
};

type Fetcher = typeof fetch;

const SYSTEM_PROMPT = `You are Suyash Zinjurke's portfolio assistant. Speak as Suyash's assistant, not as Suyash himself. Help visitors understand Suyash's AI engineering background, experience, projects, skills, internship and collaboration availability, and how to contact him.

Use only the facts in this instruction and the portfolio conversation. Suyash is an AI Engineer and final-year B.Tech student in Artificial Intelligence & Data Science at AISSMS IOIT, Pune. His focus includes practical AI systems, RAG, LLM applications, automation, diagnostics, Python, SQL, LangChain, Azure AI Services, ETL workflows, Power BI, and Tableau. He has worked as an AI Automation Intern at Knorr-Bremse Technology Centre India and as a Data Analytics Intern at NexGen Analytix. His portfolio includes an AI Interview System, CodeFlow AI, and the planned TracePilot diagnostics workbench.

For serious opportunities, recommend that the visitor contact Suyash at zinjurke77h@gmail.com or LinkedIn: https://www.linkedin.com/in/suyash-zinjurke-9045832a5/. You may encourage visitors to describe their role, project, timeline, or technical problem. Do not claim to schedule meetings, send emails, submit applications, access private systems, negotiate terms, or make commitments on Suyash's behalf. Do not invent achievements, employers, dates, compensation, credentials, availability details, or personal information. Keep answers concise, warm, technically grounded, and actionable.`;

function cleanMessages(messages: PortfolioAssistantMessage[]) {
  return messages
    .slice(-8)
    .map(message => ({
      role: message.role,
      content: message.content.trim().slice(0, 1400),
    }))
    .filter(message => message.content.length > 0);
}

function getProviders(env: NodeJS.ProcessEnv): AssistantProvider[] {
  const providers: AssistantProvider[] = [];

  if (env.NVIDIA_NIM_API_KEY) {
    providers.push({
      id: "nvidia-nim",
      apiKey: env.NVIDIA_NIM_API_KEY,
      endpoint: "https://integrate.api.nvidia.com/v1/chat/completions",
      model: "nvidia/nemotron-3.5-lightning-30b-a3b",
    });
  }

  if (env.GROQ_API_KEY) {
    providers.push({
      id: "groq",
      apiKey: env.GROQ_API_KEY,
      endpoint: "https://api.groq.com/openai/v1/chat/completions",
      model: "llama-3.3-70b-versatile",
    });
  }

  return providers;
}

export function isPortfolioAssistantConfigured(env: NodeJS.ProcessEnv = process.env) {
  return getProviders(env).length > 0;
}

export async function getPortfolioAssistantReply(
  messages: PortfolioAssistantMessage[],
  options: { fetcher?: Fetcher; env?: NodeJS.ProcessEnv } = {}
) {
  const fetcher = options.fetcher ?? fetch;
  const providers = getProviders(options.env ?? process.env);
  const history = cleanMessages(messages);

  if (history.length === 0) {
    throw new Error("A visitor message is required.");
  }

  if (providers.length === 0) {
    throw new Error("No portfolio assistant provider is configured.");
  }

  const providerFailures: string[] = [];

  for (const provider of providers) {
    try {
      const response = await fetcher(provider.endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${provider.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: provider.model,
          messages: [{ role: "system", content: SYSTEM_PROMPT }, ...history],
          temperature: 0.35,
          max_tokens: 700,
        }),
      });

      if (!response.ok) {
        providerFailures.push(`${provider.id}: HTTP ${response.status}`);
        continue;
      }

      const payload = (await response.json()) as {
        choices?: Array<{ message?: { content?: string | null } }>;
      };
      const content = payload.choices?.[0]?.message?.content?.trim();

      if (content) {
        return { content, provider: provider.id };
      }

      providerFailures.push(`${provider.id}: empty response`);
    } catch (error) {
      providerFailures.push(`${provider.id}: ${error instanceof Error ? error.message : "request failed"}`);
    }
  }

  throw new Error(`Portfolio assistant providers unavailable (${providerFailures.join("; ")}).`);
}
