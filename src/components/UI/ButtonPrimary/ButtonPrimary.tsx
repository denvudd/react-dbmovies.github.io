import React from "react";
import styles from "./ButtonPrimary.module.scss";
import classNames from "classnames";

interface ButtonPrimaryProps {
  rounded?: boolean;
  children: React.ReactNode;
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({ rounded, children }) => {
  const buttonClassName = classNames(styles.button, {
    [styles.rounded]: rounded,
  });

  return <button className={buttonClassName}>{children}</button>;
};

export default ButtonPrimary;
