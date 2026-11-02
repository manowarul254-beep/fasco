
import { Container } from "../../components/ui";
import PageHeader from "../../components/shared/PageHeader";

const CheckoutPage = () => {
  return (
    <>
      <PageHeader
        title="Checkout"
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Checkout" },
        ]}
      />

      <Container as="section" className="py-16">
        <h2 className="text-2xl font-semibold text-black">
          Checkout Page
        </h2>

        <p className="mt-3 text-neutral-500">
          Complete your order here.
        </p>
      </Container>
    </>
  );
};

export default CheckoutPage;
