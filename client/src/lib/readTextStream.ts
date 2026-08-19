export async function readTextStream(
  stream: ReadableStream<Uint8Array>,
  onChunk: (text: string) => void
) {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let completeText = "";
  let pendingEventData = "";

  const applyEvent = (event: string) => {
    const dataLine = event
      .split("\n")
      .find(line => line.startsWith("data:"));
    if (!dataLine) return;

    const eventData = dataLine.slice(5).trim();
    if (!eventData || eventData === "[DONE]") return;

    const payload = JSON.parse(eventData) as { token?: string; error?: string };
    if (payload.error) throw new Error(payload.error);
    if (!payload.token) return;

    completeText += payload.token;
    onChunk(completeText);
  };

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      pendingEventData += decoder.decode(value, { stream: true });
      const events = pendingEventData.split("\n\n");
      pendingEventData = events.pop() ?? "";
      events.forEach(applyEvent);
    }

    const finalChunk = decoder.decode();
    pendingEventData += finalChunk;
    if (pendingEventData.trim()) applyEvent(pendingEventData);

    return completeText;
  } finally {
    reader.releaseLock();
  }
}
