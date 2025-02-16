import FormField from "../components/FormField";

const CreateSong = () => {
  return (
    <div>
      <form className="">
        <FormField
          inputId="song-title"
          inputName="Title"
          inputPlaceholder="Title"
          inputType="text"
        />
      </form>
    </div>
  );
};

export default CreateSong;
