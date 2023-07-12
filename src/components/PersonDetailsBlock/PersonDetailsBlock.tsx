import type { PersonDetails } from "@/redux/api/people/types";
import React from "react";
import PersonDetailsLeft from "./PersonDetailsLeft/PersonDetailsLeft";
import styles from "./PersonDetailsBlock.module.scss";
import DetailLayout from "@/layouts/DetailsLayout";
import PersonDetailsRight from "./PersonDetailsRight/PersonDetailsRight";

interface PersonDetailsBlockProps {
  id: number;
  data: PersonDetails;
}

const PersonDetailsBlock: React.FC<PersonDetailsBlockProps> = ({
  id,
  data,
}) => {
  const {
    name,
    also_known_as,
    biography,
    birthday,
    deathday,
    gender,
    homepage,
    imdb_id,
    known_for_department,
    place_of_birth,
    profile_path,
  } = data;

  return (
    <>
      {data && (
        <div className="app-container">
          <div className={styles.wrapper}>
            <DetailLayout>
              <div className="panel-details">
                <div className={styles.container}>
                  <div className={styles.leftColumn}>
                    <PersonDetailsLeft
                      id={id}
                      gender={gender}
                      also_known_as={also_known_as}
                      place_of_birth={place_of_birth}
                      birthday={birthday}
                      deathday={deathday}
                      known_for_department={known_for_department}
                      profile_path={profile_path}
                      name={name}
                    />
                  </div>
                  <div className={styles.rightColumn}>
                    <PersonDetailsRight
                      id={id}
                      known_for_department={known_for_department}
                      name={name}
                      biography={biography}
                    />
                  </div>
                </div>
              </div>
            </DetailLayout>
          </div>
        </div>
      )}
    </>
  );
};

export default PersonDetailsBlock;
