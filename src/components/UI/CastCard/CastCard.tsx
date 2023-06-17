import React from "react";

import { Card, Typography } from "antd";
import Link from "next/link";
import Image from "next/image";
import { generateShimmer } from "@/utils/generateShimmer";

import styles from "./CardCard.module.scss";

interface CastCardProps {
  id: number;
  imgUrl: string;
  name: string;
  character: string;
}

const CastCard: React.FC<CastCardProps> = ({
  id,
  imgUrl,
  name,
  character,
}) => {
  const { Title, Paragraph } = Typography;
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
          <Title level={5} className={styles.cartTitle}>
            {name}
          </Title>
        </Link>
        <Paragraph ellipsis={{ rows: 2 }}>{character}</Paragraph>
      </Card>
    </div>
  );
};

export default CastCard;
