// বড় চৌকো চেকবক্স + লেখা (ডিজাইনের "Save This Info For Future")
const CheckRow = ({ name, label }) => (
  <label className="flex cursor-pointer items-center gap-4 text-sm text-neutral-500">
    <input type="checkbox" name={name} className="h-7 w-7 shrink-0 cursor-pointer accent-black" />
    {label}
  </label>
);

export default CheckRow;