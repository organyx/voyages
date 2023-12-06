import { createMocks } from "node-mocks-http";
import getAll from "./getAll";
import * as voyage from "~/server/voyage";

describe("GET /api/voyage/getAll", () => {
  it("should return 200 OK", async () => {
    vi.spyOn(voyage, "getAllVoyages").mockImplementation(() => {
      return Promise.resolve([]);
    });
    const { req, res } = createMocks({
      method: "GET",
    });

    await getAll(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual([]);
  });

  it("should return 500", async () => {
    vi.spyOn(voyage, "getAllVoyages").mockImplementation(() => {
      return Promise.resolve(null);
    });
    const { req, res } = createMocks({
      method: "GET",
    });

    await getAll(req, res);

    expect(res._getStatusCode()).toBe(500);
  });
});
