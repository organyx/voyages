import { createMocks } from "node-mocks-http";
import add from "./add";
import * as voyage from "~/server/voyage";

describe("POST /api/voyage/add", () => {
  it("should return 201", async () => {
    vi.spyOn(voyage, "createVoyage").mockImplementation(() => {
      return Promise.resolve({ id: "1" } as voyage.VoyageWithVessel);
    });
    const { req, res } = createMocks({
      method: "POST",
    });

    await add(req, res);

    expect(res._getStatusCode()).toBe(201);
  });

  it("should return 404", async () => {
    vi.spyOn(voyage, "createVoyage").mockImplementation(() => {
      return Promise.resolve(null);
    });
    const { req, res } = createMocks({
      method: "POST",
    });

    await add(req, res);

    expect(res._getStatusCode()).toBe(404);
  });
});
