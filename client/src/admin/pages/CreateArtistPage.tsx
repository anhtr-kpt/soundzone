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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Upload } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { UploadResponse, urlRegex } from "@/types/common.types";
import { useState } from "react";
import { CLOUDINARY_CONFIG } from "@/config/cloudinary";
import axios from "axios";
import { useCreateArtistMutation } from "@/store/api/artistApi";

const formSchema = z.object({
  realName: z.string().min(1, "Real name is required").trim(),
  stageName: z.string().min(1, "Stage name is required").trim(),
  biography: z.string().min(1, "Biography is required").trim(),
  dateOfBirth: z.coerce.date({
    required_error: "A date of birth is required",
  }),
  socialLinks: z
    .object({
      facebook: z.string().regex(urlRegex, "Invalid URL format").optional(),
      instagram: z.string().regex(urlRegex, "Invalid URL format").optional(),
      youtube: z.string().regex(urlRegex, "Invalid URL format").optional(),
    })
    .optional(),
  avatar: z.any().refine((val) => val !== null, "Avatar is required"),
});

const CreateArtistPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      avatar: null,
    },
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [createArtist, { isLoading }] = useCreateArtistMutation();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (!selectedFile) {
        form.setError("avatar", {
          type: "manual",
          message: "Avatar is required",
        });
        return;
      }

      const uploadResponse = await uploadToCloudinary(selectedFile);

      const response = await createArtist({
        ...values,
        avatarUrl: uploadResponse.secure_url,
      }).unwrap();

      if (response.success) {
        form.reset();
        setPreview("");
        setSelectedFile(null);
      }
    } catch (error) {
      console.error("Error when submitting form:", error);
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    form.setValue("avatar", file);
    form.clearErrors("avatar");

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  };

  const uploadToCloudinary = async (file: File): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_CONFIG.uploadPreset as string);

    try {
      const response = await axios.post(CLOUDINARY_CONFIG.uploadUrl, formData);
      return response.data;
    } catch (error) {
      console.error("Upload to Cloudinary failed:", error);
      throw error;
    }
  };

  return (
    <div>
      <h3 className="capitalize text-2xl font-semibold text-center mb-8">
        Create new artist
      </h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-4 lg:space-y-0 lg:flex lg:[&_div]:flex-1 lg:space-x-4">
            <FormField
              control={form.control}
              name="realName"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel required>Real name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Real name"
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
            name="biography"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Biography</FormLabel>
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
            name="avatar"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Avatar</FormLabel>
                <FormControl>
                  <div className="space-y-4 mx-auto">
                    <div className="flex flex-col gap-4">
                      {preview && (
                        <div className="border border-neutral-200 dark:border-neutral-800 w-fit rounded-full">
                          <img
                            src={preview}
                            alt="Preview"
                            className="aspect-square size-64 rounded-full"
                          />
                        </div>
                      )}
                      <div className="mx-auto">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                          id={`avatar-upload`}
                        />
                        <label
                          htmlFor={`avatar-upload`}
                          className="rounded-md transition-colors h-9 inline-flex px-5 py-1 items-center justify-center gap-2 text-sm font-medium border border-neutral-200 bg-white hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50"
                        >
                          <Upload strokeWidth={1.5} size={18} />
                          <span className="">Upload avatar</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
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

export default CreateArtistPage;
