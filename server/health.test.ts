import { describe, expect, it } from "vitest";
import { getHealthPayload } from "./health";

describe("getHealthPayload", () => {
  it("returns a stable public health response", () => {
    const payload = getHealthPayload(new Date("2026-08-19T00:00:00.000Z"));

    expect(payload).toEqual({
      status: "ok",
      service: "suyash-portfolio-api",
      timestamp: "2026-08-19T00:00:00.000Z",
    });
  });
});
