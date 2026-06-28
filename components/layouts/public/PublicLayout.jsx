import PublicHeader from "./PublicHeader";
import PublicFooter from "./PublicFooter";

export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <PublicHeader />
      <main className="flex-1">{children}</main>
      <PublicFooter />
    </div>
  );
}
