import React from "react";

import CreditCard from "../../../UI/cards/CreditCard/CreditCard";
import { v4 as uuidv4 } from "uuid";
import { checkDepartmentName } from "@/utils/checkDepartmentName";
import type {
  AggregateCrewMember,
  TVAggregateCreditsApiResponse,
} from "@/redux/api/tv/types";
import type { ConfigurationJobsApiResponse } from "@/redux/api/configuration/types";

import styles from "./TVCreditsBlock.module.scss";
interface TVCastBlockProps {
  crew: TVAggregateCreditsApiResponse["crew"];
  cast: TVAggregateCreditsApiResponse["cast"];
  jobs: ConfigurationJobsApiResponse;
}

interface CrewByDepartment {
  [key: string]: AggregateCrewMember[];
}

const TVCastBlock: React.FC<TVCastBlockProps> = ({ cast, crew, jobs }) => {
  const departments = jobs.map((job) => job.department);
  console.log(departments);

  const crewByDepartment = crew.reduce(
    (acc: CrewByDepartment, member: AggregateCrewMember) => {
      const { department } = member;
      if (!acc[department]) {
        acc[department] = [];
      }
      acc[department].push(member);
      return acc;
    },
    {}
  );

  return (
    <div className={styles.cast}>
      <div className="app-container">
        <div className={styles.inner}>
          <section className={styles.panel}>
            <h3>
              Акторський склад серіалу <span>{cast.length}</span>
            </h3>
            <ol className={styles.people}>
              {cast.map((cast) => (
                <CreditCard
                  id={cast.id}
                  key={cast.id}
                  name={cast.name}
                  poster={cast.profile_path}
                  character={cast.roles}
                  type="tv"
                />
              ))}
            </ol>
          </section>
          <section className={styles.panel}>
            <h3>
              Знімальна група серіалу <span>{crew.length}</span>
            </h3>
            {departments &&
              departments.length !== 0 &&
              jobs &&
              departments.reverse().map((department) => {
                if (crewByDepartment[department]) {
                  return (
                    <div className={styles.crewWrapper}>
                      <h4>{checkDepartmentName(department)}</h4>
                      <ol className={styles.people}>
                        {crewByDepartment[department].map((crew) => (
                          <CreditCard
                            id={crew.id}
                            key={uuidv4()}
                            name={crew.name}
                            poster={crew.profile_path}
                            job={crew.jobs}
                            type="tv"
                          />
                        ))}
                      </ol>
                    </div>
                  );
                }
              })}
          </section>
        </div>
      </div>
    </div>
  );
};

export default TVCastBlock;
