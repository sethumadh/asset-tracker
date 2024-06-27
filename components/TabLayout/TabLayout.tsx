import Header from "../Searchbar/Header/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-4xl mx-auto  my-4 px-4 py-4">
      <Header />
      <main>{children}</main>
    </div>
  );
}
