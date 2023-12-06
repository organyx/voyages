import { createMocks } from "node-mocks-http";
import deleteHandler from "./delete";
import * as voyage from "~/server/voyage";

describe("DELETE /api/voyage/delete", () => {
  it("should return 204", async () => {
    vi.spyOn(voyage, "deleteVoyage").mockImplementation(() => {
      return Promise.resolve({ id: "1" } as voyage.VoyageWithVessel);
    });

    vi.spyOn(global.Math, "random").mockImplementation(() => {
      return 0;
    });

    const { req, res } = createMocks({
      method: "DELETE",
      query: {
        id: "1",
      },
    });

    await deleteHandler(req, res);

    expect(res._getStatusCode()).toBe(204);
  });

  it("should return 404", async () => {
    vi.spyOn(voyage, "deleteVoyage").mockImplementation(() => {
      return Promise.resolve(null);
    });

    vi.spyOn(global.Math, "random").mockImplementation(() => {
      return 0;
    });

    const { req, res } = createMocks({
      method: "DELETE",
      query: {
        id: "1",
      },
    });

    await deleteHandler(req, res);

    expect(res._getStatusCode()).toBe(404);
  });
});
