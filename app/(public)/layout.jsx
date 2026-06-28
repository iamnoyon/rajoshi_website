import PublicLayout from "@/components/layouts/public/PublicLayout";

export const metadata = {
  title: "EcommerceStore - Shop the Best Products Online",
  description:
    "Discover amazing products at great prices. Free shipping on orders over $50.",
};

export default function PublicRootLayout({ children }) {
  return <PublicLayout>{children}</PublicLayout>;
}
