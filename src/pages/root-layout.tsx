import { Header } from "@/widgets/header";
import { Main } from "@/widgets/main";
import styles from "./root-layout.module.scss";

const RootLayout = () => {
  return (
    <div className={styles.root}>
      <Header />
      <div>
        <Main />
      </div>
    </div>
  );
};
export default RootLayout;
