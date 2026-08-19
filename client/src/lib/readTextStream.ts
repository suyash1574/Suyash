export async function readTextStream(
  stream: ReadableStream<Uint8Array>,
  onChunk: (text: string) => void
) {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let completeText = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      if (!chunk) continue;
      completeText += chunk;
      onChunk(completeText);
    }

    const finalChunk = decoder.decode();
    if (finalChunk) {
      completeText += finalChunk;
      onChunk(completeText);
    }

    return completeText;
  } finally {
    reader.releaseLock();
  }
}
