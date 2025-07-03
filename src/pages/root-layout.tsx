import { Header } from "@/widgets/header";
import { Main } from "@/widgets/main";
import s from "./root-layout.module.scss";

const RootLayout = () => {
  return (
    <div className={s.root}>
      <Header />
      <div>
        <Main />
      </div>
    </div>
  );
};
export default RootLayout;
