import { useState } from "react";
import { CreditCard, Lock } from "lucide-react";
import { Input } from "../../../components/ui";
import FormSection from "./FormSection";
import SelectField from "./SelectField";
import CheckRow from "./CheckRow";
import { boxInput } from "./fieldStyle";

const methods = ["Credit Card", "Cash on Delivery"];

// পেমেন্ট। ডেমো: কার্ডের তথ্য কোথাও সংরক্ষণ বা পাঠানো হয় না।
// আসল পেমেন্টের জন্য Stripe-এর মতো সেবার নিজস্ব ফর্ম ব্যবহার করতে হবে।
const PaymentForm = () => {
  const [method, setMethod] = useState("Credit Card");

  return (
    <FormSection title="Payment">
      <SelectField
        name="method"
        value={method}
        onChange={(e) => setMethod(e.target.value)}
        options={methods}
        leftIcon={
          method === "Credit Card" && (
            <span className="flex h-6 w-10 items-center justify-center rounded bg-[#0A2C5E] text-white">
              <CreditCard size={14} />
            </span>
          )
        }
      />

      {method === "Credit Card" && (
        <div className="bg-neutral-100 p-4">
          <div className="flex flex-col gap-3">
            <div className="relative">
              <Input
                name="cardNumber"
                placeholder="Card Number"
                inputMode="numeric"
                autoComplete="cc-number"
                className={boxInput}
              />
              <Lock size={18} className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-neutral-500" />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Input name="expiry" placeholder="Expiration Date" autoComplete="cc-exp" className={boxInput} />
              <Input name="cvc" placeholder="Security Code" inputMode="numeric" autoComplete="cc-csc" className={boxInput} />
            </div>

            <Input name="cardName" placeholder="Card Holder Name" autoComplete="cc-name" className={boxInput} />

            <div className="pt-2">
              <CheckRow name="saveCard" label="Save This Info For Future" />
            </div>
          </div>
        </div>
      )}
    </FormSection>
  );
};

export default PaymentForm;