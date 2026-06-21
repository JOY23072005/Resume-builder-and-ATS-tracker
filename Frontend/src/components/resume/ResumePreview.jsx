import ClassicTemplate from "../../templates/ClassicTemplate";

export default function ResumePreview({
  data,
}) {
  return (
    <div className="bg-card border rounded-2xl p-8">

      <ClassicTemplate
        data={data}
      />

    </div>
  );
}