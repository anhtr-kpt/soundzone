import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateGenreMutation } from "@/store/api/genreApi";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
  description: z
    .string()
    .min(1, "Bio is required")
    .max(500, "Bio cannot exceed 500 characters")
    .trim(),
});

const CreateGenrePage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const [createGenre, { isLoading }] = useCreateGenreMutation();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await createGenre({
        name: values.name,
        description: values.description,
      }).unwrap();

      if (response.success) {
        toast.success(response.message);
        form.reset();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h3 className="capitalize text-2xl font-semibold text-center mb-8">
        Create new genre
      </h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel required>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} className="text-sm" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about genre"
                    className="resize-none text-sm"
                    rows={1}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex justify-center mt-6">
            <Button type="submit" size="lg">
              Create new genre
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateGenrePage;
