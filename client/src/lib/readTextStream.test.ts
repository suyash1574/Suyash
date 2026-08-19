import { describe, expect, it } from "vitest";
import { readTextStream } from "./readTextStream";

describe("readTextStream", () => {
  it("progressively reports accumulated UTF-8 response text", async () => {
    const encoder = new TextEncoder();
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(encoder.encode("Suyash builds "));
        controller.enqueue(encoder.encode("practical AI systems."));
        controller.close();
      },
    });
    const updates: string[] = [];

    const result = await readTextStream(stream, text => updates.push(text));

    expect(updates).toEqual(["Suyash builds ", "Suyash builds practical AI systems."]);
    expect(result).toBe("Suyash builds practical AI systems.");
  });
});
