import React from "react";

import Link from "next/link";
import Image from "next/image";
import { generateShimmer } from "@/utils/generateShimmer";
import type {
  AggregateCastMember,
  AggregateCrewMember,
} from "@/redux/api/tv/types";
import type { CastMember, CrewMember } from "@/redux/api/types/common";
import type { CSSProperties } from "react";

import styles from "./CreditCard.module.scss";

interface CreditCardProps {
  id: number;
  name: string;
  poster: string | null;

  character?: string | AggregateCastMember["roles"] | CastMember["character"];
  job?: string | AggregateCrewMember["jobs"] | CrewMember["job"];
  type?: "movie" | "tv";
  style?: CSSProperties;
}

const CreditCard: React.FC<CreditCardProps> = ({
  id,
  name,
  poster,
  character,
  job,
  type = "movie",
  style,
}) => {
  return (
    <li className={styles.item} style={style}>
      <Link href={`/person/${id}`} className={styles.poster}>
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
        />
      </Link>
      <div className={styles.text}>
        <Link href={`/person/${id}`}>{name}</Link>
        <span>
          {type === "movie" && job && <p>{job as string}</p>}
          {type === "tv" &&
            job &&
            typeof job !== "string" &&
            job.length !== 0 &&
            job.map((job, index, array) => {
              const jobText =
                index === array.length - 1 ? (
                  <p key={job.credit_id}>
                    {job.job} <span>({job.episode_count} серій) </span>
                  </p>
                ) : (
                  <p key={job.credit_id}>
                    {job.job} <span>({job.episode_count} серій), </span>
                  </p>
                );
              return jobText;
            })}
          {type === "movie" && character && <p>{character as string}</p>}
          {type === "tv" &&
            character &&
            typeof character !== "string" &&
            character.length !== 0 &&
            character.map((character, index, array) => {
              const jobText =
                index === array.length - 1 ? (
                  <p key={character.credit_id}>
                    {character.character}{" "}
                    <span>({character.episode_count} серій) </span>
                  </p>
                ) : (
                  <p key={character.credit_id}>
                    {character.character}{" "}
                    <span>({character.episode_count} серій), </span>
                  </p>
                );
              return jobText;
            })}
        </span>
      </div>
    </li>
  );
};

export default CreditCard;
