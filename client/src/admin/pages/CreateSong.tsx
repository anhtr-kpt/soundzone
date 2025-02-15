import { Asterisk } from "lucide-react";

const CreateSong = () => {
  return (
    <div>
      <form className="">
        <div className="relative space-y-2">
          <label htmlFor="title" className="flex font-semibold text-[15px]">
            Title
            <Asterisk strokeWidth={1.5} size={10} className="text-red-500" />:
          </label>
          <input
            type="text"
            id="title"
            className="w-full max-w-md py-2 px-4 bg-placeholder rounded-lg"
            placeholder="Song title"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateSong;
