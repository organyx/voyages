import { createMocks } from "node-mocks-http";
import deleteHandler from "./delete";
import * as voyage from "~/server/voyage";
import * as utils from "~/utils";

describe("DELETE /api/voyage/delete", () => {
  it("should return 204", async () => {
    vi.spyOn(voyage, "deleteVoyage").mockImplementation(() => {
      return Promise.resolve({ id: "1" } as voyage.VoyageWithVessel);
    });

    vi.spyOn(utils, "randomNetworkError").mockImplementation(() => {
      return false;
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

    vi.spyOn(utils, "randomNetworkError").mockImplementation(() => {
      return false;
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
