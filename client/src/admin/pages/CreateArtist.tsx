import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { urlRegex } from "@/types";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { IUploadResponse } from "@/types";
import { ImageUpload } from "../components/ImageUpload";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(1, "Artist name is required").trim(),
  bio: z
    .string()
    .min(1, "Song bio is required")
    .max(500, "Bio cannot exceed 500 characters")
    .trim(),
  avatarUrl: z
    .object({
      url: z.string(),
      publicId: z.string(),
    })
    .nullable(),
  bannerUrl: z
    .string()
    .min(1, "Banner URL is required")
    .regex(urlRegex, "Invalid banner URL format"),
  dateOfBirth: z.date({
    required_error: "A date of birth is required",
  }),
  isVerified: z.boolean().default(false),
});

const CreateArtist = () => {
  const [error, setError] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div>
      <h3 className="capitalize text-2xl font-semibold">Create new artist</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <div className="space-y-1">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="avatarUrl"
            render={({ field }) => (
              <FormItem>
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Avatar</FormLabel>
                </div>
                <FormControl>
                  <Input
                    type="file"
                    // checked={field.value}
                    // onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          /> */}
          <ImageUpload
            onUploadComplete={(response: IUploadResponse) => {
              form.setValue("avatarUrl", response);
            }}
            onUploadError={(error: Error) => {
              setError(error.message);
            }}
          />
          <FormField
            control={form.control}
            name="isVerified"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Marketing emails</FormLabel>
                  <FormDescription>
                    Receive emails about new products, features, and more.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateArtist;
