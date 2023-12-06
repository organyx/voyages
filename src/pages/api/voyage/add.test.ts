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
      body: {
        vesselId: "123",
        scheduledDeparture: new Date().toISOString(),
        scheduledArrival: new Date().toISOString(),
        portOfDischarge: "Port of Discharge",
        portOfLoading: "Port of Loading",
        unitTypes: ["1", "2", "3", "4", "5"],
      },
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
      body: {
        vesselId: "123",
        scheduledDeparture: new Date().toISOString(),
        scheduledArrival: new Date().toISOString(),
        portOfDischarge: "Port of Discharge",
        portOfLoading: "Port of Loading",
        unitTypes: ["1", "2", "3", "4", "5"],
      },
    });

    await add(req, res);

    expect(res._getStatusCode()).toBe(404);
  });
});
