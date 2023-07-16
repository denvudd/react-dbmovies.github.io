import React from "react";
import { useGetPersonCombinedCreditsQuery } from "@/redux/api/people/slice";

import { List, Typography } from "antd";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { RightOutlined } from "@ant-design/icons";
import classNames from "classnames";
import MediaElementCard from "@/components/UI/cards/MediaElementCard/MediaElementCard";
import PersonDetailsCredits from "./PersonDetailsCredits/PersonDetailsCredits";
import type {
  CombinedCastMovie,
  CombinedCastTV,
  CombinedCrewMovie,
  CombinedCrewTV,
} from "@/redux/api/people/types";

import styles from "./PersonDetailsRight.module.scss";

interface PersonDetailsRightProps {
  id: number;
  name: string;
  biography: string | null;
  known_for_department: string;
}

type CombinedCast = CombinedCastMovie | CombinedCastTV;
type CombinedCrew = CombinedCrewMovie | CombinedCrewTV;

const PersonDetailsRight: React.FC<PersonDetailsRightProps> = ({
  id,
  name,
  biography,
  known_for_department,
}) => {
  const { data: combinedCredits, isLoading: isCombinedCreditsLoading } =
    useGetPersonCombinedCreditsQuery({ id, params: "language=uk-UA" });
  const [expand, setExpand] = React.useState(false);
  const [knownFor, setKnownFor] = React.useState<
    | CombinedCastMovie[]
    | CombinedCastTV[]
    | CombinedCrewMovie[]
    | CombinedCrewTV[]
  >([]);

  const filterByDepartment = (department: string) => {
    if (combinedCredits && combinedCredits.crew) {
      const crewCombined =
        combinedCredits.crew as unknown as CombinedCrewMovie[];
      const formattedCrew = [...crewCombined]
        .filter((crew) => crew.department === department)
        .sort((a, b) => a.vote_count + b.vote_count)
        .slice(0, 8);
      setKnownFor(formattedCrew);
    } else {
      return null;
    }
  };

  React.useEffect(() => {
    const isActing =
      combinedCredits &&
      combinedCredits.cast &&
      known_for_department === "Acting";

    if (isActing) {
      const castCombined =
        combinedCredits.cast as unknown as CombinedCastMovie[];
      const formattedCast = [...castCombined]
        .sort((a, b) => a.vote_count + b.vote_count)
        .slice(0, 8);
      setKnownFor(formattedCast);
    } else if (combinedCredits && combinedCredits.crew) {
      filterByDepartment(known_for_department);
    } else {
      return;
    }
  }, [combinedCredits]);

  const elementTypeChecker = (element: CombinedCast | CombinedCrew) => {
    const { id, poster_path, overview, vote_average } = element;

    switch (element.media_type) {
      case "movie":
        return (
          <MediaElementCard
            id={id}
            title={element.title}
            imgUrl={
              poster_path
                ? `https://image.tmdb.org/t/p/w220_and_h330_face/${poster_path}`
                : `https://placehold.co/260x390/png/?text=No+Image`
            }
            description={overview}
            voteAverage={vote_average}
            release={element.release_date}
            type="movie"
            size="small"
          />
        );
      case "tv":
        return (
          <MediaElementCard
            id={id}
            title={element.name}
            imgUrl={
              poster_path
                ? `https://image.tmdb.org/t/p/w220_and_h330_face/${poster_path}`
                : `https://placehold.co/260x390/png/?text=No+Image`
            }
            description={overview}
            voteAverage={vote_average}
            release={element.first_air_date}
            type="tv"
            size="small"
          />
        );
      default:
        return "Not found";
    }
  };

  return (
    <div className={styles.container}>
      <section className={styles.inner}>
        <div className={styles.title}>
          <h2>
            <Link href={`/person/${id}`}>{name}</Link>
          </h2>
        </div>
        <div
          className={classNames(styles.about, {
            [styles.fullWrapper]: true,
            [styles.aboutExpanded]: expand,
          })}
        >
          <h3>Біографія</h3>
          {!expand && (
            <Typography.Paragraph
              ellipsis={{
                rows: 2,
                expandable: true,
                onExpand: () => setExpand(true),
                symbol: (
                  <span className={styles.readMore}>
                    Читати більше{" "}
                    <span>
                      <RightOutlined />
                    </span>
                  </span>
                ),
              }}
            >
              {biography ? biography : `Відсутня біографія для ${name}.`}
            </Typography.Paragraph>
          )}
          {expand && (
            <ReactMarkdown className={styles.biographyMarkdown}>
              {biography ? biography : `Відсутня біографія для ${name}.`}
            </ReactMarkdown>
          )}
        </div>
      </section>
      <section className={styles.fullWrapper}>
        <h3>Відомий (-а) за</h3>
        <div className={styles.knownFor}>
          <div className={"scroller-wrapper scroller-with-overflow"}>
            <List
              itemLayout="horizontal"
              className={"scroller"}
              dataSource={knownFor}
              grid={{ gutter: 20 }}
              loading={isCombinedCreditsLoading}
              renderItem={(element: CombinedCast | CombinedCrew) => (
                <List.Item className={styles.card} key={element.id}>
                  {elementTypeChecker(element)}
                </List.Item>
              )}
            />
          </div>
        </div>
      </section>
      <section className={styles.fullWrapper}>
        {combinedCredits &&
          (combinedCredits.cast.length || combinedCredits.crew.length) ? (
            <PersonDetailsCredits
              known_for_department={known_for_department}
              cast={combinedCredits.cast}
              crew={combinedCredits.crew}
            />
          ) : <div className="empty-text--default">Немає даних для цієї людини.</div>}
      </section>
    </div>
  );
};

export default PersonDetailsRight;
