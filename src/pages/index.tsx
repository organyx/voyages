import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import Head from "next/head";
import Layout from "~/components/layout";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { fetchData } from "~/utils";
import { Button } from "~/components/ui/button";
import { TABLE_DATE_FORMAT } from "~/constants";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { Badge } from "~/components/ui/badge";
import { toast } from "~/components/ui/use-toast";
import { type VoyageWithVessel } from "~/server/voyage";

export default function Home() {
  const { data: voyages } = useQuery<VoyageWithVessel[]>(["voyages"], () =>
    fetchData("voyage/getAll")
  );

  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (voyageId: string) => {
      const response = await fetch(`/api/voyage/delete?id=${voyageId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the voyage");
      }
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["voyages"]);
      },

      onError: (error: Error) => {
        console.error(error);
        toast({
          title: "Failed to delete the voyage",
          description: error.message,
          className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 bg-red-500 text-white",
        });
      },
    }
  );

  const handleDelete = (voyageId: string) => {
    mutation.mutate(voyageId);
  };

  return (
    <>
      <Head>
        <title>Voyages | DFDS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Table aria-describedby="tableDesc" aria-labelledby="tableTitle">
          <TableCaption id="tableTitle" className="caption-top">Voyages</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead scope="col">Departure</TableHead>
              <TableHead scope="col">Arrival</TableHead>
              <TableHead scope="col">Port of loading</TableHead>
              <TableHead scope="col">Port of discharge</TableHead>
              <TableHead scope="col">Vessel</TableHead>
              <TableHead scope="col">Unit Types</TableHead>
              <TableHead scope="col">&nbsp;</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {voyages?.map((voyage) => (
              <TableRow key={voyage.id}>
                <TableCell headers="departure">
                  {format(
                    new Date(voyage.scheduledDeparture),
                    TABLE_DATE_FORMAT
                  )}
                </TableCell>
                <TableCell headers="arrival">
                  {format(new Date(voyage.scheduledArrival), TABLE_DATE_FORMAT)}
                </TableCell>
                <TableCell headers="portOfLoading">{voyage.portOfLoading}</TableCell>
                <TableCell headers="portOfDischarge">{voyage.portOfDischarge}</TableCell>
                <TableCell headers="vessel">{voyage.vessel.name}</TableCell>
                <TableCell headers="unitTypes">
                  {voyage.units.length > 0 ? (<Popover>
                    <PopoverTrigger><Badge>{voyage.units.length}</Badge></PopoverTrigger>
                    <PopoverContent>
                      <ul>
                        {voyage.units.map(unit =>
                          <li key={unit.id}>{unit.name} ({unit.defaultLength})</li>
                        )}
                      </ul>
                    </PopoverContent>
                  </Popover>)
                    :
                    <Badge>0</Badge>}
                </TableCell>
                <TableCell headers="delete">
                  <Button
                    onClick={() => handleDelete(voyage.id)}
                    variant="outline"
                  >
                    X
                  </Button>
                </TableCell>
              </TableRow>
            ))}

          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={7} id="tableDesc">
                A table of voyages
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Layout>
    </>
  );
}
