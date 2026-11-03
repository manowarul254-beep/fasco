// ফর্মের এক একটা অংশ: বড় সেরিফ শিরোনাম + (ডানে ঐচ্ছিক কিছু) + ভেতরের ঘরগুলো
const FormSection = ({ title, aside, children }) => (
  <section>
    <div className="mb-6 flex items-end justify-between gap-4">
      <h2 className="font-heading text-3xl font-bold text-muted lg:text-4xl">{title}</h2>
      {aside}
    </div>
    {children}
  </section>
);

export default FormSection;