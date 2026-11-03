import { Link } from "react-router-dom";
import { Input } from "../../../components/ui";
import FormSection from "./FormSection";
import { boxInput } from "./fieldStyle";

// যোগাযোগ: ইমেইল + "Have an account? Create Account"
const ContactForm = () => (
  <FormSection
    title="Contact"
    aside={
      <p className="pb-1 text-sm text-black">
        Have an account?{" "}
        <Link to="/signup" className="text-blue-600 hover:underline">Create Account</Link>
      </p>
    }
  >
    <Input type="email" name="email" placeholder="Email Address" required className={boxInput} />
  </FormSection>
);

export default ContactForm;