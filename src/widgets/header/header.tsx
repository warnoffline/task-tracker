import s from "./header.module.scss";

const Header = () => {
  return (
    <div className={s.header}>
      <img className={s.header__img} src="/logo.png" alt="" />
    </div>
  );
};

export default Header;
