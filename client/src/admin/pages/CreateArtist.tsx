import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { urlRegex } from "@/types";
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
import { IUploadResponse } from "@/types";
import { ImageUpload } from "../components/ImageUpload";
import { useState } from "react";
import { useCreateArtist } from "@/hooks/useArtists";

const formSchema = z.object({
  fullName: z.string().min(1, "Full name is required").trim(),
  stageName: z.string().min(1, "Stage name is required").trim(),
  bio: z
    .string()
    .min(1, "Bio is required")
    .max(500, "Bio cannot exceed 500 characters")
    .trim(),
  avatarUrl: z
    .object({
      url: z.string(),
      publicId: z.string(),
    })
    .nullable(),
  bannerUrl: z
    .object({
      url: z.string(),
      publicId: z.string(),
    })
    .nullable(),
  dateOfBirth: z.date({
    required_error: "A date of birth is required",
  }),
  socialLinks: z
    .object({
      facebook: z.string().regex(urlRegex, "Invalid URL format").optional(),
      instagram: z.string().regex(urlRegex, "Invalid URL format").optional(),
      youtube: z.string().regex(urlRegex, "Invalid URL format").optional(),
    })
    .optional(),
});

const CreateArtist = () => {
  const [error, setError] = useState<string>("");

  // const { data: artists, isLoading, error } = useArtists();

  const createArtist = useCreateArtist();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div>
      <h3 className="capitalize text-2xl font-semibold text-center mb-8">
        Create new artist
      </h3>
      <button
        onClick={() =>
          createArtist.mutate({
            name: "New User",
            email: "new@example.com",
          })
        }
      >
        Add User
      </button>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-4 lg:space-y-0 lg:flex lg:[&_div]:flex-1 lg:space-x-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel required>Full name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Full name"
                      {...field}
                      className="text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stageName"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel required>Stage name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Stage name"
                      {...field}
                      className="text-sm"
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
                <FormItem>
                  <FormLabel required>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal text-sm",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto size-4 opacity-50" />
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
          </div>
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about artist"
                    className="resize-none text-sm"
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="avatarUrl"
            render={() => (
              <FormItem>
                <FormLabel required>Avatar</FormLabel>
                <FormControl>
                  <ImageUpload
                    onUploadComplete={(response: IUploadResponse) => {
                      form.setValue("avatarUrl", response);
                    }}
                    onUploadError={(error: Error) => {
                      setError(error.message);
                    }}
                    type="avatar"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bannerUrl"
            render={() => (
              <FormItem>
                <FormLabel required>Banner</FormLabel>
                <FormControl>
                  <ImageUpload
                    onUploadComplete={(response: IUploadResponse) => {
                      form.setValue("bannerUrl", response);
                    }}
                    onUploadError={(error: Error) => {
                      setError(error.message);
                    }}
                    type="banner"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="socialLinks.facebook"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Facebook</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Facebook URL"
                    {...field}
                    className="text-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="socialLinks.instagram"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Instagram</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Instagram URL"
                    {...field}
                    className="text-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="socialLinks.youtube"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>YouTube</FormLabel>
                <FormControl>
                  <Input
                    placeholder="YouTube URL"
                    {...field}
                    className="text-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex justify-center mt-6">
            <Button type="submit" size="lg">
              Create new artist
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateArtist;
