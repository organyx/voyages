import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { type Vessel } from '@prisma/client'
import { fetchData } from '~/utils'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import { toast } from '../ui/use-toast'


const formSchema = z.object({
  scheduledDeparture: z.string({ required_error: 'Departure is required' }).min(3).max(50),
  scheduledArrival: z.string({ required_error: 'Arrival is required' }).min(3).max(50),
  portOfLoading: z.string({ required_error: 'Port of loading is required' }).min(3).max(50),
  portOfDischarge: z.string({ required_error: 'Port of discharge is required' }).min(3).max(50),
  vesselId: z.string({ required_error: 'Vessel is required' }).min(3, { message: 'Vessel is required' }).max(50),
})

type VoyageFormProps = {
  setIsSheetOpen: (isOpen: boolean) => void
}

export function VoyageForm({ setIsSheetOpen }: VoyageFormProps) {
  type FormValues = z.infer<typeof formSchema>

  const { data: vessels } = useQuery<Vessel[]>(["vessels"], () =>
    fetchData("vessel/getAll")
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      portOfLoading: '',
      portOfDischarge: '',
      vesselId: '',
    },
  })

  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (voyage: FormValues) => {
      const response = await fetch(`/api/voyage/add`, {
        method: "POST",
        body: JSON.stringify(voyage),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to add a new voyage");
      }
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["voyages"]);
        toast({
          title: "Success",
          description: 'Voyage added successfully',
          className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 bg-green-500 text-white",
        })
      },
    }
  );

  function onSubmit(data: FormValues) {
    console.log(data)

    if (new Date(data.scheduledDeparture) > new Date(data.scheduledArrival)) {
      form.setError('scheduledDeparture', {
        type: 'manual',
        message: 'Departure should be before arrival'
      })
      toast({
        title: "Failed to add a new voyage",
        description: 'Departure should be before arrival',
        className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 bg-red-500 text-white",
      })
      return
    }

    mutation.mutate({
      scheduledDeparture: data.scheduledDeparture,
      scheduledArrival: data.scheduledArrival,
      portOfLoading: data.portOfLoading,
      portOfDischarge: data.portOfDischarge,
      vesselId: data.vesselId,
    });

    setIsSheetOpen(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="scheduledDeparture"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Departure</FormLabel>
              <FormControl>
                <Input type='datetime-local' {...field} />
              </FormControl>
              <FormDescription>
                The date and time of departure
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="scheduledArrival"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Arrival</FormLabel>
              <FormControl>
                <Input type='datetime-local' {...field} />
              </FormControl>
              <FormDescription>
                The date and time of arrival
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="portOfLoading"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Port of Loading</FormLabel>
              <FormControl>
                <Input placeholder='' type='text' {...field} />
              </FormControl>
              <FormDescription>
                Port of loading
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="portOfDischarge"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Port of Discharge</FormLabel>
              <FormControl>
                <Input placeholder='' type='text'{...field} />
              </FormControl>
              <FormDescription>
                Port of discharge
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="vesselId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vessel</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value} required>
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder="Select a vessel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Vessels</SelectLabel>
                      {vessels?.map((vessel) => (
                        <SelectItem key={vessel.id} value={vessel.id}>
                          {vessel.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>
                Vessel
              </FormDescription>
            </FormItem>
          )}
        />

        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  )
}