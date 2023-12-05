import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'


const formSchema = z.object({
  scheduledDeparture: z.string({ required_error: 'Departure is required' }).min(3).max(50),
  scheduledArrival: z.string({ required_error: 'Arrival is required' }).min(3).max(50),
  portOfLoading: z.string({ required_error: 'Port of loading is required' }).min(3).max(50),
  portOfDischarge: z.string({ required_error: 'Port of discharge is required' }).min(3).max(50),
  vesselId: z.string({ required_error: 'Vessel is required' }).min(3, { message: 'Vessel is required' }).max(50),
})

export function VoyageForm() {
  type FormValues = z.infer<typeof formSchema>
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      portOfLoading: '',
      portOfDischarge: '',
      vesselId: '',
    },
  })

  function onSubmit(data: FormValues) {
    console.log(data)
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

        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  )
}