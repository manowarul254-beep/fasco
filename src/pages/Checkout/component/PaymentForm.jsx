
import { useState } from "react";
import { CreditCard, Lock } from "lucide-react";
import { Input } from "../../../components/ui";
import FormSection from "./FormSection";
import SelectField from "./SelectField";
import CheckRow from "./CheckRow";
import { boxInput } from "./fieldStyle";

const methods = ["Credit Card", "Cash on Delivery"];

const PaymentForm = () => {
  const [method, setMethod] = useState("Credit Card");

  return (
    <FormSection title="Payment">
      <div className="w-full min-w-0 max-w-full">
        <SelectField
          name="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          options={methods}
          leftIcon={
            method === "Credit Card" && (
              <span className="flex h-6 w-10 shrink-0 items-center justify-center rounded bg-[#0A2C5E] text-white">
                <CreditCard size={14} />
              </span>
            )
          }
        />

        {method === "Credit Card" && (
          <div className="mt-3 w-full min-w-0 max-w-full box-border bg-neutral-100 p-3 sm:p-4">
            <div className="flex w-full min-w-0 flex-col gap-3">
              {/* Card Number */}
              <div className="relative w-full min-w-0">
                <Input
                  name="cardNumber"
                  placeholder="Card Number"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  className={`${boxInput} !w-full !min-w-0 !max-w-full !box-border !pr-12`}
                />

                <Lock
                  size={18}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500"
                />
              </div>

              {/* Expiration Date & Security Code */}
              <div className="grid w-full min-w-0 grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="w-full min-w-0">
                  <Input
                    name="expiry"
                    placeholder="Expiration Date"
                    autoComplete="cc-exp"
                    className={`${boxInput} !w-full !min-w-0 !max-w-full !box-border`}
                  />
                </div>

                <div className="w-full min-w-0">
                  <Input
                    name="cvc"
                    placeholder="Security Code"
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    className={`${boxInput} !w-full !min-w-0 !max-w-full !box-border`}
                  />
                </div>
              </div>

              {/* Card Holder Name */}
              <div className="w-full min-w-0">
                <Input
                  name="cardName"
                  placeholder="Card Holder Name"
                  autoComplete="cc-name"
                  className={`${boxInput} !w-full !min-w-0 !max-w-full !box-border`}
                />
              </div>

              <div className="w-full min-w-0 pt-2">
                <CheckRow
                  name="saveCard"
                  label="Save This Info For Future"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </FormSection>
  );
};

export default PaymentForm;
