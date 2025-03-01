import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import { colorRegex } from "@/types";
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
import { HexColorPicker } from "react-colorful";
import { randomColor } from "@/utils/randomColor";

const formSchema = z.object({
  title: z.string().min(1, "Title is required").trim(),
  description: z
    .string()
    .min(1, "Bio is required")
    .max(500, "Bio cannot exceed 500 characters")
    .trim(),
  // color: z.string().regex(colorRegex, "Invalid color format"),
});

const CreateGenrePage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      color: randomColor(),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
            name="title"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel required>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} className="text-sm" />
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
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Color</FormLabel>
                <FormControl>
                  <HexColorPicker
                    color={field.value}
                    onChange={field.onChange}
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
