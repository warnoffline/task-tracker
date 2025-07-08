import styles from "./header.module.scss";

const Header = () => {
  return (
    <div className={styles.header}>
      <img className={styles.header__img} src="/logo.png" alt="" />
    </div>
  );
};

export default Header;
