import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const EditTodo = ({ todo, onSave, onCancel }) => {
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    if (editText.trim() !== "") {
      onSave({ ...todo, text: editText });
    }
  };

  return (
    <div className="flex items-center">
      <Input
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSave()}
        autoFocus
      />
      <Button onClick={handleSave} className="ml-2">
        Save
      </Button>
      <Button onClick={onCancel} className="ml-2" variant="outline">
        Cancel
      </Button>
    </div>
  );
};

export default EditTodo;