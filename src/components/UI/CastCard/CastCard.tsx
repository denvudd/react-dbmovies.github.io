import React from "react";

import { Card, Typography } from "antd";
import Link from "next/link";
import Image from "next/image";
import { generateShimmer } from "@/utils/generateShimmer";
import type { AggregateCastMember } from "@/redux/api/tv/types";
import type { CastMember } from "@/redux/api/types/common";

import styles from "./CastCard.module.scss";

interface CastCardProps {
  id: number;
  imgUrl: string;
  name: string;
  character?: string | AggregateCastMember["roles"] | CastMember["character"];
  mediaType: "movie" | "tv";
}

const CastCard: React.FC<CastCardProps> = ({
  id,
  imgUrl,
  name,
  character,
  mediaType,
}) => {
  const { Paragraph } = Typography;
  return (
    <div>
      <Card
        hoverable
        size="small"
        className={styles.card}
        cover={
          <Link href={`/`}>
            <Image
              className={styles.cardImage}
              alt="alt"
              width={138}
              height={175}
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${generateShimmer(
                138,
                175,
                100,
                100
              )}`}
              src={imgUrl}
            />
          </Link>
        }
      >
        <Link href={`/`}>
          <p className={styles.title}>{name}</p>
        </Link>
        <Paragraph ellipsis={{ rows: 2 }} className={styles.character}>
          {mediaType === "movie" && character && <p>{character as string}</p>}
          {mediaType === "tv" &&
            character &&
            typeof character !== "string" &&
            character.length !== 0 && (
              <p>
                {character[0].character} <br />{" "}
                <span>{character[0].episode_count} серій</span>
              </p>
            )}
        </Paragraph>
      </Card>
    </div>
  );
};

export default CastCard;
