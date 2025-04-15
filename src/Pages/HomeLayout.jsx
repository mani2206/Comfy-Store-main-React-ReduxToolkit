import { Outlet, useNavigation } from "react-router-dom";
import { Header, Navbar } from "../Components";
import { Loading } from "../Pages";

const HomeLayout = () => {
  const navigate = useNavigation();

  const isPageLoading = navigate.state === "loading";

  return (
    <>
      <Header />
      <Navbar />
      {isPageLoading ? (
        <Loading />
      ) : (
        <section className="align-element py-20">
          <Outlet />
        </section>
      )}
    </>
  );
};
export default HomeLayout;
