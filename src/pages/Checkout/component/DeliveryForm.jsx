import { Input } from "../../../components/ui";
import FormSection from "./FormSection";
import SelectField from "./SelectField";
import CheckRow from "./CheckRow";
import { boxInput } from "./fieldStyle";

// দেশের তালিকা: আরও দেশ লাগলে এখানে যোগ করুন
const countries = ["Bangladesh", "United States", "United Kingdom", "Canada", "India"];

// ডেলিভারির ঠিকানা
const DeliveryForm = () => (
  <FormSection title="Delivery">
    <div className="flex flex-col gap-4">
      <SelectField name="country" placeholder="Country / Region" options={countries} required />

      <div className="grid gap-4 sm:grid-cols-2">
        <Input name="firstName" placeholder="First Name" required className={boxInput} />
        <Input name="lastName" placeholder="Last Name" required className={boxInput} />
      </div>

      <Input name="address" placeholder="Address" required className={boxInput} />

      <div className="grid gap-4 sm:grid-cols-2">
        <Input name="city" placeholder="City" required className={boxInput} />
        <Input name="zip" placeholder="Postal Code" className={boxInput} />
      </div>

      <CheckRow name="saveInfo" label="Save This Info For Future" />
    </div>
  </FormSection>
);

export default DeliveryForm;