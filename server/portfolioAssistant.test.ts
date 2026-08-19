import { describe, expect, it, vi } from "vitest";
import { getPortfolioAssistantReply, isPortfolioAssistantConfigured } from "./portfolioAssistant";

const visitorMessage = [{ role: "user" as const, content: "What work is Suyash looking for?" }];

describe("portfolio assistant provider selection", () => {
  it("prefers NVIDIA NIM when it returns a valid response", async () => {
    const fetcher = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ choices: [{ message: { content: "NIM response" } }] }), { status: 200 })
    );

    const reply = await getPortfolioAssistantReply(visitorMessage, {
      fetcher,
      env: { NVIDIA_NIM_API_KEY: "test-nim", GROQ_API_KEY: "test-groq" },
    });

    expect(reply).toEqual({ content: "NIM response", provider: "nvidia-nim" });
    expect(fetcher).toHaveBeenCalledTimes(1);
    expect(fetcher.mock.calls[0]?.[0]).toContain("integrate.api.nvidia.com");
  });

  it("falls back to Groq if NVIDIA NIM is unavailable", async () => {
    const fetcher = vi
      .fn()
      .mockResolvedValueOnce(new Response("unavailable", { status: 503 }))
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ choices: [{ message: { content: "Groq response" } }] }), { status: 200 })
      );

    const reply = await getPortfolioAssistantReply(visitorMessage, {
      fetcher,
      env: { NVIDIA_NIM_API_KEY: "test-nim", GROQ_API_KEY: "test-groq" },
    });

    expect(reply).toEqual({ content: "Groq response", provider: "groq" });
    expect(fetcher.mock.calls[1]?.[0]).toContain("api.groq.com");
  });

  it("recognizes when at least one server-side provider is configured", () => {
    expect(isPortfolioAssistantConfigured({ GROQ_API_KEY: "test-groq" })).toBe(true);
    expect(isPortfolioAssistantConfigured({})).toBe(false);
  });
});
