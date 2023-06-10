import React from "react";
import styles from "./ButtonTMDB.module.scss";
import classNames from "classnames";

type ButtonType = "primary" | "secondary" | "success" | "failure";
interface ButtonPrimaryProps {
  type: ButtonType;
  rounded?: boolean;
  roundedSize?: number;
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

const ButtonTMDB: React.FC<ButtonPrimaryProps> = ({
  rounded,
  type = "primary",
  roundedSize = 20,
  children,
  disabled,
  onClick,
}) => {
  const buttonClassName = classNames(styles.button, {
    [styles.rounded]: rounded,
    [`button-${type}`]: type,
  });

  return (
    <button
      className={buttonClassName}
      onClick={onClick}
      style={rounded ? { borderRadius: `${roundedSize}px` } : {}}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ButtonTMDB;
