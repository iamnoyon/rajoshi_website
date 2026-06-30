import PublicLayout from "@/components/layouts/PublicLayout";
import AccountGuard from "@/components/providers/AccountGuard";

export const metadata = {
  title: "My Account - EcommerceStore",
  description: "Manage your account, orders, and more.",
};

export default function AccountGroupLayout({ children }) {
  return (
    <PublicLayout>
      <AccountGuard>{children}</AccountGuard>
    </PublicLayout>
  );
}
