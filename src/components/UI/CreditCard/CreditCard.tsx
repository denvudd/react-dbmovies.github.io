import React from "react";

import Link from "next/link";
import Image from "next/image";
import { generateShimmer } from "@/utils/generateShimmer";

import styles from "./CreditCard.module.scss";

interface CreditCardProps {
  id: number;
  name: string;
  poster: string | null;
  character?: string;
  job?: string;
}

const CreditCard: React.FC<CreditCardProps> = ({
  id,
  name,
  poster,
  character,
  job,
}) => {
  return (
    <li className={styles.item}>
      <Link href={`/`} className={styles.poster}>
        <Image
          width={66}
          height={66}
          src={
            poster
              ? `https://image.tmdb.org/t/p/w66_and_h66_face${poster}`
              : "https://placehold.co/66x66/png/?text=Not+Found"
          }
          alt={`${name} poster`}
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${generateShimmer(
            138,
            175,
            100,
            100
          )}`}
        ></Image>
      </Link>
      <div className={styles.text}>
        <Link href={`/`}>{name}</Link>
        <span>
          {job && <p>{job}</p>}
          {character && <p>{character}</p>}
        </span>
      </div>
    </li>
  );
};

export default CreditCard;
